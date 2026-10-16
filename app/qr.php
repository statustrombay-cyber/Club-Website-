<?php
/**
 * Mindful Tattva · QR codes, in plain PHP
 * ---------------------------------------
 * The club's passes and payment codes must work on shared hosting: no GD, no
 * Composer, no calls to anybody else's server. So the encoder lives here.
 *
 * It produces byte-mode QR symbols at error-correction level L, versions 1 to
 * 10 (up to 271 characters — far more than a UPI link or a pass serial needs).
 * The matrix is what matters: it is drawn as an SVG for the website and as
 * vector squares inside the PDF pass.
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

/**
 * Version table, error correction level L.
 * version => [ecc codewords per block, [[block count, data codewords per block], …]]
 */
function mt_qr_versions(): array
{
    return [
        1  => [7,  [[1, 19]]],
        2  => [10, [[1, 34]]],
        3  => [15, [[1, 55]]],
        4  => [20, [[1, 80]]],
        5  => [26, [[1, 108]]],
        6  => [18, [[2, 68]]],
        7  => [20, [[2, 78]]],
        8  => [24, [[2, 97]]],
        9  => [30, [[2, 116]]],
        10 => [18, [[2, 68], [2, 69]]],
    ];
}

/** Alignment pattern centres per version. */
function mt_qr_alignments(): array
{
    return [
        1 => [], 2 => [6, 18], 3 => [6, 22], 4 => [6, 26], 5 => [6, 30],
        6 => [6, 34], 7 => [6, 22, 38], 8 => [6, 24, 42], 9 => [6, 26, 46], 10 => [6, 28, 50],
    ];
}

/* ------------------------------------------------------------ Galois field */

function mt_qr_gf(): array
{
    static $tables = null;
    if ($tables !== null) {
        return $tables;
    }
    $exp = array_fill(0, 512, 0);
    $log = array_fill(0, 256, 0);
    $value = 1;
    for ($i = 0; $i < 255; $i++) {
        $exp[$i] = $value;
        $log[$value] = $i;
        $value <<= 1;
        if ($value & 0x100) {
            $value ^= 0x11d;
        }
    }
    for ($i = 255; $i < 512; $i++) {
        $exp[$i] = $exp[$i - 255];
    }
    return $tables = ['exp' => $exp, 'log' => $log];
}

function mt_qr_gf_mul(int $a, int $b): int
{
    if ($a === 0 || $b === 0) {
        return 0;
    }
    $tables = mt_qr_gf();
    return $tables['exp'][$tables['log'][$a] + $tables['log'][$b]];
}

/** Reed–Solomon generator polynomial of the given degree. */
function mt_qr_generator(int $degree): array
{
    $poly = [1];
    for ($i = 0; $i < $degree; $i++) {
        $next = array_fill(0, count($poly) + 1, 0);
        foreach ($poly as $index => $coefficient) {
            $next[$index] ^= mt_qr_gf_mul($coefficient, 1);
            $next[$index + 1] ^= mt_qr_gf_mul($coefficient, mt_qr_gf()['exp'][$i]);
        }
        $poly = $next;
    }
    return $poly;
}

/** The error-correction codewords for one block of data. */
function mt_qr_ecc(array $data, int $count): array
{
    $generator = mt_qr_generator($count);
    $remainder = array_fill(0, $count, 0);
    foreach ($data as $byte) {
        $factor = $byte ^ $remainder[0];
        array_shift($remainder);
        $remainder[] = 0;
        for ($i = 0; $i < $count; $i++) {
            $remainder[$i] ^= mt_qr_gf_mul($generator[$i + 1], $factor);
        }
    }
    return $remainder;
}

/* ------------------------------------------------------------------ blocks */

function mt_qr_data_codewords(int $version): int
{
    $table = mt_qr_versions()[$version];
    $total = 0;
    foreach ($table[1] as [$blocks, $perBlock]) {
        $total += $blocks * $perBlock;
    }
    return $total;
}

/** Byte-mode capacity in characters. */
function mt_qr_capacity(int $version): int
{
    $bits = mt_qr_data_codewords($version) * 8;
    $header = 4 + ($version >= 10 ? 16 : 8);
    return (int) floor(($bits - $header) / 8);
}

function mt_qr_pick_version(int $length): int
{
    foreach (array_keys(mt_qr_versions()) as $version) {
        if ($length <= mt_qr_capacity($version)) {
            return (int) $version;
        }
    }
    throw new RuntimeException('The QR content is too long (' . $length . ' characters).');
}

/** Text → data codewords (byte mode, then the pads). */
function mt_qr_encode_data(string $text, int $version): array
{
    $bytes = array_values(unpack('C*', $text) ?: []);
    $bits = [];
    $push = static function (int $value, int $length) use (&$bits): void {
        for ($i = $length - 1; $i >= 0; $i--) {
            $bits[] = ($value >> $i) & 1;
        }
    };

    $push(0b0100, 4);                                   // byte mode
    $push(count($bytes), $version >= 10 ? 16 : 8);      // character count
    foreach ($bytes as $byte) {
        $push($byte, 8);
    }

    $capacity = mt_qr_data_codewords($version) * 8;
    $terminator = min(4, $capacity - count($bits));
    $push(0, max(0, $terminator));
    while (count($bits) % 8 !== 0) {
        $bits[] = 0;
    }
    $codewords = [];
    for ($i = 0; $i < count($bits); $i += 8) {
        $byte = 0;
        for ($j = 0; $j < 8; $j++) {
            $byte = ($byte << 1) | $bits[$i + $j];
        }
        $codewords[] = $byte;
    }
    $pads = [0xec, 0x11];
    $padIndex = 0;
    while (count($codewords) < $capacity / 8) {
        $codewords[] = $pads[$padIndex % 2];
        $padIndex++;
    }
    return $codewords;
}

/** Split into blocks, add error correction, then interleave both. */
function mt_qr_interleave(array $codewords, int $version): array
{
    [$eccPerBlock, $groups] = mt_qr_versions()[$version];
    $dataBlocks = [];
    $eccBlocks = [];
    $offset = 0;
    foreach ($groups as [$count, $perBlock]) {
        for ($i = 0; $i < $count; $i++) {
            $block = array_slice($codewords, $offset, $perBlock);
            $offset += $perBlock;
            $dataBlocks[] = $block;
            $eccBlocks[] = mt_qr_ecc($block, $eccPerBlock);
        }
    }

    $result = [];
    $longest = max(array_map('count', $dataBlocks));
    for ($i = 0; $i < $longest; $i++) {
        foreach ($dataBlocks as $block) {
            if (isset($block[$i])) {
                $result[] = $block[$i];
            }
        }
    }
    for ($i = 0; $i < $eccPerBlock; $i++) {
        foreach ($eccBlocks as $block) {
            if (isset($block[$i])) {
                $result[] = $block[$i];
            }
        }
    }
    return $result;
}

/* ------------------------------------------------------------------ matrix */

function mt_qr_format_bits(int $mask): int
{
    $data = (0b01 << 3) | $mask;         // 01 = error correction level L
    $value = $data << 10;
    for ($i = 14; $i >= 10; $i--) {
        if ($value & (1 << $i)) {
            $value ^= 0x537 << ($i - 10);
        }
    }
    return (($data << 10) | $value) ^ 0x5412;
}

function mt_qr_version_bits(int $version): int
{
    $value = $version << 12;
    for ($i = 17; $i >= 12; $i--) {
        if ($value & (1 << $i)) {
            $value ^= 0x1f25 << ($i - 12);
        }
    }
    return ($version << 12) | $value;
}

/**
 * The finished matrix: a list of rows, each a list of 0/1 modules.
 *
 * @return array{matrix: array<int, array<int, int>>, size: int, version: int}
 */
function mt_qr_matrix(string $text, int $mask = 0): array
{
    if ($text === '') {
        throw new RuntimeException('Nothing to encode.');
    }
    $version = mt_qr_pick_version(mt_strlen_bytes($text));
    $size = 17 + 4 * $version;

    $matrix = [];
    $reserved = [];
    for ($row = 0; $row < $size; $row++) {
        $matrix[$row] = array_fill(0, $size, 0);
        $reserved[$row] = array_fill(0, $size, false);
    }
    $set = static function (int $row, int $col, int $value) use (&$matrix, &$reserved): void {
        $matrix[$row][$col] = $value;
        $reserved[$row][$col] = true;
    };

    /* finder patterns + separators */
    $finder = static function (int $row, int $col) use ($set, $size): void {
        for ($r = -1; $r <= 7; $r++) {
            for ($c = -1; $c <= 7; $c++) {
                $y = $row + $r;
                $x = $col + $c;
                if ($y < 0 || $y >= $size || $x < 0 || $x >= $size) {
                    continue;
                }
                $inside = ($r >= 0 && $r <= 6 && $c >= 0 && $c <= 6);
                $dark = false;
                if ($inside) {
                    $dark = ($r === 0 || $r === 6 || $c === 0 || $c === 6)
                        || ($r >= 2 && $r <= 4 && $c >= 2 && $c <= 4);
                }
                $set($y, $x, $dark ? 1 : 0);
            }
        }
    };
    $finder(0, 0);
    $finder(0, $size - 7);
    $finder($size - 7, 0);

    /* timing patterns */
    for ($i = 8; $i <= $size - 9; $i++) {
        $set(6, $i, $i % 2 === 0 ? 1 : 0);
        $set($i, 6, $i % 2 === 0 ? 1 : 0);
    }

    /* alignment patterns */
    $centres = mt_qr_alignments()[$version];
    foreach ($centres as $rowCentre) {
        foreach ($centres as $colCentre) {
            if (($rowCentre === 6 && $colCentre === 6)
                || ($rowCentre === 6 && $colCentre === $size - 7)
                || ($rowCentre === $size - 7 && $colCentre === 6)) {
                continue; // overlaps a finder
            }
            for ($r = -2; $r <= 2; $r++) {
                for ($c = -2; $c <= 2; $c++) {
                    $dark = (max(abs($r), abs($c)) !== 1);
                    $set($rowCentre + $r, $colCentre + $c, $dark ? 1 : 0);
                }
            }
        }
    }

    /* the dark module, and the format areas */
    $set($size - 8, 8, 1);
    for ($i = 0; $i <= 8; $i++) {
        if (!$reserved[8][$i]) {
            $set(8, $i, 0);
        }
        if (!$reserved[$i][8]) {
            $set($i, 8, 0);
        }
    }
    for ($i = 0; $i < 8; $i++) {
        $set(8, $size - 1 - $i, 0);
        $set($size - 1 - $i, 8, 0);
    }
    if ($version >= 7) {
        for ($i = 0; $i < 18; $i++) {
            $row = intdiv($i, 3);
            $col = $size - 11 + ($i % 3);
            $set($row, $col, 0);
            $set($col, $row, 0);
        }
    }

    /* data placement: two-module columns, right to left, dodging the timing column */
    $codewords = mt_qr_interleave(mt_qr_encode_data($text, $version), $version);
    $bitIndex = 0;
    $totalBits = count($codewords) * 8;
    $upward = true;
    for ($col = $size - 1; $col > 0; $col -= 2) {
        if ($col === 6) {
            $col = 5;
        }
        for ($i = 0; $i < $size; $i++) {
            $row = $upward ? $size - 1 - $i : $i;
            foreach ([$col, $col - 1] as $x) {
                if ($reserved[$row][$x]) {
                    continue;
                }
                $bit = 0;
                if ($bitIndex < $totalBits) {
                    $bit = ($codewords[intdiv($bitIndex, 8)] >> (7 - ($bitIndex % 8))) & 1;
                }
                $matrix[$row][$x] = $bit;
                $bitIndex++;
            }
        }
        $upward = !$upward;
    }

    /* masking (mask 0: invert where row + column is even) */
    if ($mask === 0) {
        for ($row = 0; $row < $size; $row++) {
            for ($col = 0; $col < $size; $col++) {
                if ($reserved[$row][$col]) {
                    continue;
                }
                if (($row + $col) % 2 === 0) {
                    $matrix[$row][$col] ^= 1;
                }
            }
        }
    }

    /* Format information, in both places. The fifteen bits are written
     * most-significant first, out from each finder pattern (ISO/IEC 18004,
     * figure 25): copy one along row 8 and up column 8, copy two beside the
     * bottom-left finder. */
    $format = mt_qr_format_bits($mask);
    $bit = static fn(int $index): int => ($format >> $index) & 1;

    for ($i = 0; $i <= 5; $i++) {       // bits 14…9 along row 8, beside the top-left finder
        $matrix[8][$i] = $bit(14 - $i);
    }
    $matrix[8][7] = $bit(8);
    $matrix[8][8] = $bit(7);
    $matrix[7][8] = $bit(6);
    for ($i = 0; $i <= 5; $i++) {       // bits 5…0 up column 8
        $matrix[$i][8] = $bit($i);
    }

    for ($i = 0; $i <= 7; $i++) {       // bits 14…7 up column 8, beside the bottom-left finder
        $matrix[$size - 1 - $i][8] = $bit(14 - $i);
    }
    for ($i = 0; $i <= 6; $i++) {       // bits 6…0 along row 8, beside the top-right finder
        $matrix[8][$size - 7 + $i] = $bit(6 - $i);
    }
    $matrix[$size - 8][8] = 1;          // the dark module always stays dark

    if ($version >= 7) {
        $versionBits = mt_qr_version_bits($version);
        for ($i = 0; $i < 18; $i++) {
            $bit = ($versionBits >> $i) & 1;
            $row = intdiv($i, 3);
            $col = $size - 11 + ($i % 3);
            $matrix[$col][$row] = $bit;
            $matrix[$row][$col] = $bit;
        }
    }

    return ['matrix' => $matrix, 'size' => $size, 'version' => $version];
}

function mt_strlen_bytes(string $text): int
{
    return function_exists('mb_strlen') ? mb_strlen($text, '8bit') : strlen($text);
}

/** Inline SVG of the symbol, ready to drop into a page or a print sheet. */
function mt_qr_svg(string $text, int $pixel = 160, string $label = 'QR code'): string
{
    try {
        $qr = mt_qr_matrix($text);
    } catch (Throwable $error) {
        mt_log('QR could not be made: ' . $error->getMessage());
        return '<span class="qr-failed" aria-hidden="true"></span>';
    }
    $modules = $qr['size'];
    $quiet = 4;
    $total = $modules + $quiet * 2;
    $parts = [];
    for ($row = 0; $row < $modules; $row++) {
        $col = 0;
        while ($col < $modules) {
            if ($qr['matrix'][$row][$col] !== 1) {
                $col++;
                continue;
            }
            $run = 1;
            while ($col + $run < $modules && $qr['matrix'][$row][$col + $run] === 1) {
                $run++;
            }
            $parts[] = '<rect x="' . ($col + $quiet) . '" y="' . ($row + $quiet) . '" width="' . $run . '" height="1"/>';
            $col += $run;
        }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' . e($label) . '"'
        . ' width="' . $pixel . '" height="' . $pixel . '" viewBox="0 0 ' . $total . ' ' . $total . '"'
        . ' shape-rendering="crispEdges"><rect width="' . $total . '" height="' . $total . '" fill="#ffffff"/>'
        . '<g fill="#2b2422">' . implode('', $parts) . '</g></svg>';
}
