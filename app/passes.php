<?php
/**
 * Mindful Tattva · the event pass, as a PDF
 * -----------------------------------------
 * A pass is one page, printed or shown on a phone at the door. It is written
 * by hand — no library, no extension — because the club's hosting must be able
 * to serve it without installing anything.
 *
 * Every pass carries the pass serial, the student, the event with its date,
 * time and venue, the fee and its payment state, a QR code of the serial and
 * the two rules that matter: bring the payment proof, and no refunds unless
 * the club cancels the event (then within 24 working days).
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

/** Text that PDF's built-in fonts can draw, in WinAnsi. */
function mt_pdf_text(string $value): string
{
    $map = [
        '₹' => 'Rs. ', '–' => '-', '—' => '-', '‑' => '-', '·' => '-',
        '’' => "'", '‘' => "'", '“' => '"', '”' => '"', '…' => '...',
        '→' => '->', '←' => '<-', '♥' => '<3', '✦' => '*', 'Ψ' => 'Psi',
        '∞' => 'infinity', '×' => 'x', '✕' => 'x', '⌖' => '@', '✓' => 'ok',
    ];
    $value = strtr($value, $map);
    $value = preg_replace('/[^\x20-\x7E]/u', '', $value) ?? '';
    return trim($value);
}

/** Escape for a PDF literal string. */
function mt_pdf_escape(string $value): string
{
    return str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], mt_pdf_text($value));
}

/** Rough width of a string in the given font size (Helvetica metrics). */
function mt_pdf_width(string $text, float $size, bool $bold = false): float
{
    $widths = $bold
        ? [' ' => 278, 'i' => 278, 'j' => 278, 'l' => 278, 'f' => 333, 't' => 333, 'r' => 389, 'I' => 278, '.' => 278, ',' => 278, '-' => 333, 'm' => 889, 'w' => 778, 'M' => 833, 'W' => 944]
        : [' ' => 278, 'i' => 222, 'j' => 222, 'l' => 222, 'f' => 278, 't' => 278, 'r' => 333, 'I' => 278, '.' => 278, ',' => 278, '-' => 333, 'm' => 833, 'w' => 722, 'M' => 833, 'W' => 944];
    $total = 0.0;
    foreach (preg_split('//u', mt_pdf_text($text), -1, PREG_SPLIT_NO_EMPTY) ?: [] as $char) {
        $total += $widths[$char] ?? ($bold ? 556 : 500);
    }
    return $total / 1000 * $size;
}

/** Wrap a paragraph to a column width. */
function mt_pdf_wrap(string $text, float $size, float $maxWidth, bool $bold = false): array
{
    $words = preg_split('/\s+/', mt_pdf_text($text)) ?: [];
    $lines = [];
    $line = '';
    foreach ($words as $word) {
        $candidate = $line === '' ? $word : $line . ' ' . $word;
        if (mt_pdf_width($candidate, $size, $bold) <= $maxWidth || $line === '') {
            $line = $candidate;
        } else {
            $lines[] = $line;
            $line = $word;
        }
    }
    if ($line !== '') {
        $lines[] = $line;
    }
    return $lines;
}

/**
 * A JPEG, read without any library: the picture stays a JPEG in the PDF
 * (/DCTDecode), so nothing is re-compressed and the file stays small. Only the
 * marker that carries the size and the colour space has to be read by hand.
 *
 * @return array{w:int, h:int, n:int, data:string}|null
 */
function mt_pdf_jpeg(string $path): ?array
{
    if (!is_file($path)) {
        return null;
    }
    $bytes = (string) file_get_contents($path);
    $length = strlen($bytes);
    if ($length < 4 || substr($bytes, 0, 2) !== "\xFF\xD8") {
        return null;
    }
    $offset = 2;
    while ($offset + 9 < $length) {
        if ($bytes[$offset] !== "\xFF") {
            $offset++;
            continue;
        }
        $marker = ord($bytes[$offset + 1]);
        if ($marker === 0xD8 || $marker === 0x01 || ($marker >= 0xD0 && $marker <= 0xD7)) {
            $offset += 2;
            continue;
        }
        $size = (ord($bytes[$offset + 2]) << 8) | ord($bytes[$offset + 3]);
        /* any start-of-frame marker carries the picture's own numbers */
        if ($marker >= 0xC0 && $marker <= 0xCF && $marker !== 0xC4 && $marker !== 0xC8 && $marker !== 0xCC) {
            $height = (ord($bytes[$offset + 5]) << 8) | ord($bytes[$offset + 6]);
            $width  = (ord($bytes[$offset + 7]) << 8) | ord($bytes[$offset + 8]);
            $parts  = ord($bytes[$offset + 9]);
            if ($width < 1 || $height < 1 || $parts < 1) {
                return null;
            }
            return ['w' => $width, 'h' => $height, 'n' => $parts, 'jpeg' => true, 'data' => $bytes];
        }
        $offset += 2 + $size;
    }
    return null;
}

/**
 * A PNG, without decompressing anything at all.
 *
 * A PNG's IDAT chunks are already one continuous zlib stream of filtered
 * scanlines — which is exactly what PDF's /FlateDecode reads when it is told to
 * expect PNG predictors. So the stream is handed over as it is and the viewer
 * does the inflating: no zlib, no GD, no extension of any kind needed on the
 * club's host, and not a byte of the logo is touched on the way through.
 *
 * Only the straightforward shapes a logo comes in are handled — 8-bit RGB or
 * greyscale, not interlaced. A picture with an alpha channel has its
 * transparency mixed into every sample at the source, so that one is only
 * understood when the host happens to have zlib; otherwise its space is left
 * empty and the pass still comes out. (The university's own mark is shipped as
 * a print copy without alpha for exactly this reason.)
 *
 * @return array{w:int, h:int, colors:int, data:string, flate:bool}|null
 */
function mt_pdf_png(string $path): ?array
{
    if (!is_file($path)) {
        return null;
    }
    $bytes = (string) file_get_contents($path);
    if (strncmp($bytes, "\x89PNG\r\n\x1A\n", 8) !== 0) {
        return null;
    }
    $width = $height = $depth = $color = $interlace = 0;
    $idat = '';
    $offset = 8;
    $length = strlen($bytes);
    while ($offset + 8 <= $length) {
        $size = unpack('N', substr($bytes, $offset, 4))[1];
        $type = substr($bytes, $offset + 4, 4);
        $chunk = substr($bytes, $offset + 8, $size);
        if ($type === 'IHDR') {
            $header = unpack('Nw/Nh/Cd/Cc/Ccomp/Cfilter/Cinterlace', $chunk);
            $width = (int) $header['w'];
            $height = (int) $header['h'];
            $depth = (int) $header['d'];
            $color = (int) $header['c'];
            $interlace = (int) $header['interlace'];
        } elseif ($type === 'IDAT') {
            $idat .= $chunk;
        } elseif ($type === 'IEND') {
            break;
        }
        $offset += 12 + $size;
    }
    if ($width < 1 || $height < 1 || $idat === '') {
        return null;
    }
    if ($interlace === 0 && $depth === 8 && ($color === 2 || $color === 0)) {
        return [
            'w'      => $width,
            'h'      => $height,
            'colors' => $color === 2 ? 3 : 1,
            'data'   => $idat,
            'flate'  => true,
        ];
    }
    /* a picture with transparency: only decodable where zlib is present */
    $rgb = mt_pdf_png_pixels($bytes, $width, $height, $depth, $color, $idat);
    return $rgb === null ? null : ['w' => $rgb['w'], 'h' => $rgb['h'], 'colors' => 3, 'data' => $rgb['data'], 'flate' => false];
}

/**
 * The fallback for a transparent PNG, used only when the host has zlib: the
 * pixels are inflated by hand, laid over white (a pass is printed on paper, so
 * transparency has nothing behind it) and shrunk to the size the pass draws.
 *
 * @return array{w:int, h:int, data:string}|null
 */
function mt_pdf_png_pixels(string $bytes, int $width, int $height, int $depth, int $color, string $idat, int $maxWidth = 900): ?array
{
    if ($depth !== 8 || ($color !== 2 && $color !== 6) || !function_exists('gzuncompress')) {
        return null;
    }
    $raw = @gzuncompress($idat);
    $channels = $color === 6 ? 4 : 3;
    $stride = $width * $channels;
    if ($raw === false || strlen($raw) < ($stride + 1) * $height) {
        return null;
    }

    $rgb = str_repeat("\x00", $width * $height * 3);
    $previous = str_repeat("\x00", $stride);
    $position = 0;
    for ($row = 0; $row < $height; $row++) {
        $filter = ord($raw[$position++]);
        $line = substr($raw, $position, $stride);
        $position += $stride;
        $fixed = '';
        for ($i = 0; $i < $stride; $i++) {
            $value = ord($line[$i]);
            $left = $i >= $channels ? ord($fixed[$i - $channels]) : 0;
            $up = ord($previous[$i]);
            $upLeft = $i >= $channels ? ord($previous[$i - $channels]) : 0;
            switch ($filter) {
                case 1: $value += $left; break;
                case 2: $value += $up; break;
                case 3: $value += intdiv($left + $up, 2); break;
                case 4:
                    $p = $left + $up - $upLeft;
                    $pa = abs($p - $left);
                    $pb = abs($p - $up);
                    $pc = abs($p - $upLeft);
                    $value += ($pa <= $pb && $pa <= $pc) ? $left : (($pb <= $pc) ? $up : $upLeft);
                    break;
            }
            $fixed .= chr($value & 0xFF);
        }
        $previous = $fixed;
        for ($x = 0; $x < $width; $x++) {
            $index = $x * $channels;
            $r = ord($fixed[$index]);
            $g = ord($fixed[$index + 1]);
            $b = ord($fixed[$index + 2]);
            if ($channels === 4) {
                $alpha = ord($fixed[$index + 3]);
                if ($alpha !== 255) {
                    $r = intdiv($r * $alpha + 255 * (255 - $alpha), 255);
                    $g = intdiv($g * $alpha + 255 * (255 - $alpha), 255);
                    $b = intdiv($b * $alpha + 255 * (255 - $alpha), 255);
                }
            }
            $put = ($row * $width + $x) * 3;
            $rgb[$put] = chr($r);
            $rgb[$put + 1] = chr($g);
            $rgb[$put + 2] = chr($b);
        }
    }

    $targetWidth = min($width, max(120, $maxWidth));
    if ($targetWidth < $width) {
        $ratio = $width / $targetWidth;
        $targetHeight = max(1, (int) round($height / $ratio));
        $small = '';
        for ($y = 0; $y < $targetHeight; $y++) {
            $y0 = (int) floor($y * $height / $targetHeight);
            $y1 = max($y0 + 1, (int) floor(($y + 1) * $height / $targetHeight));
            for ($x = 0; $x < $targetWidth; $x++) {
                $x0 = (int) floor($x * $width / $targetWidth);
                $x1 = max($x0 + 1, (int) floor(($x + 1) * $width / $targetWidth));
                $r = $g = $b = $count = 0;
                for ($sy = $y0; $sy < $y1; $sy++) {
                    $rowBase = $sy * $width * 3;
                    for ($sx = $x0; $sx < $x1; $sx++) {
                        $at = $rowBase + $sx * 3;
                        $r += ord($rgb[$at]);
                        $g += ord($rgb[$at + 1]);
                        $b += ord($rgb[$at + 2]);
                        $count++;
                    }
                }
                $small .= chr(intdiv($r, $count)) . chr(intdiv($g, $count)) . chr(intdiv($b, $count));
            }
        }
        $rgb = $small;
        $width = $targetWidth;
        $height = $targetHeight;
    }

    return ['w' => $width, 'h' => $height, 'data' => $rgb];
}

/**
 * What the QR code on a pass carries: the club's own verification page.
 *
 * Scanning it with any camera — Google Lens included — opens
 * /verify/<id> and shows whether the pass is real, without an app, a login or
 * any personal detail beyond the holder's masked name.
 */
function mt_pass_qr_link(array $registration): string
{
    return mt_verify_url($registration);
}

/**
 * The finished PDF, as bytes.
 *
 * @param array $registration The registration record.
 * @param array $event        The event it belongs to (may be empty).
 * @param array $site         Club copy for the letterhead.
 */
function mt_pass_pdf(array $registration, array $event, array $site): string
{
    $width = 595.28;   // A4 portrait
    $height = 841.89;
    $plum = [0.204, 0.129, 0.239];
    $terracotta = [0.667, 0.435, 0.373];
    $ink = [0.180, 0.161, 0.157];
    $soft = [0.420, 0.376, 0.361];
    $sand = [0.945, 0.933, 0.925];

    $club = (string) ($site['clubName'] ?? 'Mindful Tattva');
    $university = (string) ($site['universityName'] ?? '');
    $department = (string) ($site['department'] ?? '');
    $siteUrl = preg_replace('#^https?://#', '', mt_base_url()) ?? mt_base_url();

    $ops = [];
    $text = static function (float $x, float $y, string $value, float $size, bool $bold, array $color) use (&$ops): void {
        if (mt_pdf_text($value) === '') {
            return;
        }
        $ops[] = sprintf(
            'BT %.3f %.3f %.3f rg /%s %.2f Tf %.2f %.2f Td (%s) Tj ET',
            $color[0], $color[1], $color[2], $bold ? 'F2' : 'F1', $size, $x, $y, mt_pdf_escape($value)
        );
    };
    $rect = static function (float $x, float $y, float $w, float $h, array $color) use (&$ops): void {
        $ops[] = sprintf('%.3f %.3f %.3f rg %.2f %.2f %.2f %.2f re f', $color[0], $color[1], $color[2], $x, $y, $w, $h);
    };
    $line = static function (float $x1, float $y1, float $x2, float $y2, array $color, float $thickness = 0.7) use (&$ops): void {
        $ops[] = sprintf('%.3f %.3f %.3f RG %.2f w %.2f %.2f m %.2f %.2f l S', $color[0], $color[1], $color[2], $thickness, $x1, $y1, $x2, $y2);
    };

    /* ------------------------------------------------------------------ the
       club's own marks. The crest is a JPEG and goes in as it is; the
       university's is a PNG and is laid over white and shrunk. Both are looked
       for in the club's own folders, and a mark that cannot be read simply
       leaves its space empty — a pass must always come out. */
    $images = [];
    $drawImage = static function (float $x, float $y, float $w, float $h, array $image) use (&$ops, &$images): void {
        $name = 'Im' . (count($images) + 1);
        $images[] = $image;
        $ops[] = sprintf('q %.2f 0 0 %.2f %.2f %.2f cm /%s Do Q', $w, $h, $x, $y, $name);
    };
    $imageFor = static function (string $url, bool $jpeg) use ($site): ?array {
        $paths = [];
        if ($url !== '') {
            $clean = (string) parse_url($url, PHP_URL_PATH);
            $candidate = realpath(MT_ROOT . $clean);
            if ($candidate !== false && is_file($candidate)) {
                $paths[] = $candidate;
            }
        }
        if ($jpeg) {
            $fallback = realpath(MT_ROOT . '/assets/photos/mt-club-logo.jpg');
            if ($fallback !== false) {
                $paths[] = $fallback;
            }
        } else {
            /* the print copy of the university's mark: the same logo, without
               the transparency a PDF cannot describe here, and no bigger than
               the pass draws it */
            $print = realpath(MT_ROOT . '/assets/img/university-logo-print.png');
            if ($print !== false) {
                $paths[] = $print;
            }
        }
        foreach ($paths as $path) {
            $image = $jpeg ? mt_pdf_jpeg($path) : mt_pdf_png($path);
            if ($image !== null) {
                return $image;
            }
        }
        return null;
    };
    $universityDefault = (string) ($site['universityLogo'] ?? '') === '';
    $universityImage = $imageFor($universityDefault ? '/assets/img/university-logo.png' : (string) $site['universityLogo'], false);
    $crestImage = $imageFor((string) ($site['logoImage'] ?? ''), true);
    $address = trim((string) ($site['address'] ?? ''));

    $margin = 48.0;
    $inner = $width - $margin * 2;
    $box = $width - $margin;

    /* the card itself: header band, holder, event, facts, terms, footer */
    $rect($margin, 130, $inner, 564, [1, 1, 1]);
    $ops[] = sprintf('%.3f %.3f %.3f RG 1.2 w %.2f %.2f %.2f %.2f re S', $plum[0], $plum[1], $plum[2], $margin, 130, $inner, 564);
    $rect($margin, 618, $inner, 76, $plum);

    /* ------------------------------------------------------------------ the
       club and the university, in their places: the university's mark and its
       address top left, the club name in the middle, the club's crest top
       right. */
    $crestTop = 36.0;
    if ($crestImage) {
        $drawImage($box - 18 - $crestTop, 640, $crestTop, $crestTop, $crestImage);
    }
    if ($universityImage) {
        $uniTop = 24.0;
        $uniWide = $uniTop * ($universityImage['w'] / max(1, $universityImage['h']));
        $drawImage($margin + 18, 666, $uniWide, $uniTop, $universityImage);
    }
    $text($margin + 18, 656, $university, 7.6, true, [0.976, 0.945, 0.910]);
    /* wrapped narrow enough that the first line always stops well before the
       pass label in the middle of the band */
    $addressLines = mt_pdf_wrap($address, 6.2, 168);
    $addressY = 646;
    foreach (array_slice($addressLines, 0, 3) as $addressLine) {
        $text($margin + 18, $addressY, $addressLine, 6.2, false, [0.902, 0.831, 0.769]);
        $addressY -= 7.4;
    }
    $nameWidth = mt_pdf_width($club, 17, true);
    $text(($width - $nameWidth) / 2, 664, $club, 17, true, [1, 0.976, 0.949]);
    $passLabel = 'EVENT PASS';
    $text(($width - mt_pdf_width($passLabel, 8, true)) / 2, 648, $passLabel, 8, true, [0.957, 0.757, 0.561]);

    /* who and which event */
    $y = 586.0;
    $text($margin + 22, $y, 'PASS HOLDER', 8, true, $terracotta);
    $text($margin + 22, $y - 24, (string) ($registration['name'] ?? ''), 24, true, $plum);
    $meta = array_filter([
        trim((string) ($registration['course'] ?? '')),
        trim((string) ($registration['year'] ?? '')),
        trim((string) ($registration['phone'] ?? '')),
        trim((string) ($registration['email'] ?? '')),
    ], static fn($part) => $part !== '');
    $text($margin + 22, $y - 40, implode(' - ', $meta), 9, false, $soft);

    $y -= 70;
    $text($margin + 22, $y, 'EVENT', 8, true, $terracotta);
    $titleLines = mt_pdf_wrap((string) ($event['title'] ?? $registration['eventTitle'] ?? ''), 15, 300, true);
    $titleY = $y - 21;
    foreach (array_slice($titleLines, 0, 2) as $titleLine) {
        $text($margin + 22, $titleY, $titleLine, 15, true, $plum);
        $titleY -= 18;
    }
    $text($margin + 22, $titleY, mt_event_line($event), 9.5, false, $ink);

    /* the facts: two columns down the left of the card, clear of the QR box */
    $facts = [
        ['DATE', (string) ($registration['eventDate'] ?? '')],
        ['TIME', (string) ($registration['eventTime'] ?? '')],
        ['VENUE', (string) ($registration['eventVenue'] ?? '')],
        ['FEE', mt_money((float) ($registration['eventFee'] ?? 0))],
        ['PAYMENT', mt_payment_label((string) ($registration['paymentStatus'] ?? 'pending'))],
        ['PASS SERIAL', (string) ($registration['serial'] ?? '')],
    ];
    $columnWidth = 118.0;
    $factY = $titleY - 30;
    foreach ($facts as $index => [$label, $value]) {
        $column = $index % 2;
        $row = intdiv($index, 2);
        $x = $margin + 22 + $column * ($columnWidth + 14);
        $rowY = $factY - $row * 38;
        $text($x, $rowY, $label, 7.5, true, $terracotta);
        $wrapped = mt_pdf_wrap($value, 10, $columnWidth - 6);
        $text($x, $rowY - 13, $wrapped[0] ?? '', 10, false, $ink);
    }

    /* the QR code: its own frame in the top right of the card body, with the
       facts to its left and the terms below it — nothing is allowed to run
       into it */
    $qrSize = 128.0;
    $qrX = $box - 16 - $qrSize;
    $qrY = 424.0;
    $rect($qrX - 8, $qrY - 8, $qrSize + 16, $qrSize + 16, [1, 1, 1]);
    $ops[] = sprintf('%.3f %.3f %.3f RG 0.8 w %.2f %.2f %.2f %.2f re S', 0.85, 0.83, 0.82, $qrX - 8, $qrY - 8, $qrSize + 16, $qrSize + 16);
    try {
        $qr = mt_qr_matrix(mt_pass_qr_link($registration));
        $modules = $qr['size'];
        $module = $qrSize / $modules;
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
                $rect(
                    $qrX + $col * $module,
                    $qrY + ($modules - 1 - $row) * $module,
                    $run * $module + 0.2,
                    $module + 0.2,
                    [0.09, 0.09, 0.09]
                );
                $col += $run;
            }
        }
    } catch (Throwable $error) {
        mt_log('Pass QR could not be drawn: ' . $error->getMessage());
    }
    $qrCaption = 'Scan to check this pass';
    $text($qrX + ($qrSize - mt_pdf_width($qrCaption, 8, true)) / 2, $qrY - 20, $qrCaption, 8, true, $terracotta);
    $qrNote = 'opens the club site';
    $text($qrX + ($qrSize - mt_pdf_width($qrNote, 8)) / 2, $qrY - 31, $qrNote, 8, false, $soft);

    /* the rules every pass carries */
    $ruleLines = [
        'Show this pass and your payment proof (the screenshot you uploaded) at the entry desk. Entry is given only when the pass serial matches the club register.',
        'This pass is for one person, for this event only, and cannot be sold or transferred. Please bring a photo ID for verification.',
        'Registration fees are non-refundable. By registering you agree to the terms and conditions of the event.',
        'Decisions of the club about the event are final. The club may cancel the event or change the date or venue without prior notice.',
        'If the club cancels the event, the fee is refunded within 24 working days.',
    ];
    $ruleRows = [];
    foreach ($ruleLines as $rule) {
        foreach (mt_pdf_wrap($rule, 8.6, $inner - 68) as $ruleRow) {
            $ruleRows[] = $ruleRow;
        }
    }
    $boxTop = 330.0;
    $boxHeight = 34.0 + count($ruleRows) * 11 + (count($ruleLines) - 1) * 3;
    $rect($margin + 22, $boxTop - $boxHeight, $inner - 44, $boxHeight, $sand);
    $text($margin + 34, $boxTop - 20, 'ENTRY & REFUND TERMS', 8.5, true, $plum);
    $lineY = $boxTop - 34;
    foreach ($ruleLines as $rule) {
        foreach (mt_pdf_wrap($rule, 8.6, $inner - 68) as $wrapped) {
            $text($margin + 34, $lineY, $wrapped, 8.6, false, $ink);
            $lineY -= 11;
        }
        $lineY -= 3;
    }

    /* footer inside the card */
    $line($margin + 22, 178, $box - 22, 178, [0.86, 0.84, 0.83]);
    $text($margin + 22, 162, 'Registered on ' . (string) ($registration['createdAt'] ?? ''), 8.5, false, $soft);
    $text($margin + 22, 149, 'Check this pass: ' . $siteUrl . '/verify/' . (string) ($registration['publicId'] ?? ''), 8.5, false, $soft);
    $serial = (string) ($registration['serial'] ?? '');
    $issued = 'Issued by ' . $club . ($serial !== '' ? ' - ' . $serial : '');
    $text($box - 22 - mt_pdf_width($issued, 8.5), 162, $issued, 8.5, false, $soft);

    /* ------------------------------------------------------------------ under
       the card: the club's crest and its name on the left, the university's
       mark on the right with the campus address beneath it. */
    $line($margin, 118, $box, 118, [0.86, 0.84, 0.83]);
    if ($crestImage) {
        $drawImage($margin, 68, 32, 32, $crestImage);
    }
    $text($margin + 42, 92, $club, 11, true, $plum);
    $text($margin + 42, 79, $department, 7.6, false, $soft);
    $text($margin + 42, 68, $siteUrl, 7.2, false, $soft);
    if ($universityImage) {
        $bigTop = 54.0;
        $bigWide = $bigTop * ($universityImage['w'] / max(1, $universityImage['h']));
        $drawImage($box - $bigWide, 52, $bigWide, $bigTop, $universityImage);
    }
    /* the campus address, right under the university's own mark */
    $footLines = array_slice(mt_pdf_wrap($address, 7.4, $inner - 170), 0, 3);
    $footY = 42 - (count($footLines) - 1) * 10.5;
    foreach ($footLines as $footLine) {
        $text($box - mt_pdf_width($footLine, 7.4), $footY, $footLine, 7.4, false, $soft);
        $footY += 10.5;
    }

    $content = implode("\n", $ops);

    /* ------------------------------------------------------------------ file */
    $objects = [];
    $objects[] = '<< /Type /Catalog /Pages 2 0 R >>';
    $objects[] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
    $xobjects = [];
    foreach (array_keys($images) as $index) {
        /* 7, 8, ... are the pictures: 1-6 are already spoken for below */
        $xobjects[] = '/Im' . ($index + 1) . ' ' . (7 + $index) . ' 0 R';
    }
    $resourceBits = '/Font << /F1 5 0 R /F2 6 0 R >>';
    if ($xobjects) {
        $resourceBits .= ' /XObject << ' . implode(' ', $xobjects) . ' >>';
    }
    $objects[] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' . round($width, 2) . ' ' . round($height, 2) . '] '
        . '/Resources << ' . $resourceBits . ' >> /Contents 4 0 R >>';
    $objects[] = "<< /Length " . strlen($content) . " >>\nstream\n" . $content . "\nendstream";
    $objects[] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
    $objects[] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
    foreach ($images as $image) {
        if (isset($image['jpeg']) && $image['jpeg'] === true) {
            /* a JPEG goes in untouched */
            $objects[] = '<< /Type /XObject /Subtype /Image /Width ' . $image['w'] . ' /Height ' . $image['h']
                . ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' . strlen($image['data']) . " >>\nstream\n"
                . $image['data'] . "\nendstream";
            continue;
        }
        /* a PNG's own stream, with the PNG predictors PDF understands */
        $space = $image['colors'] === 1 ? '/DeviceGray' : '/DeviceRGB';
        $parms = '/DecodeParms << /Predictor 15 /Colors ' . $image['colors'] . ' /BitsPerComponent 8 /Columns ' . $image['w'] . ' >>';
        if (!empty($image['flate'])) {
            $objects[] = '<< /Type /XObject /Subtype /Image /Width ' . $image['w'] . ' /Height ' . $image['h']
                . ' /ColorSpace ' . $space . ' /BitsPerComponent 8 /Filter /FlateDecode ' . $parms
                . ' /Length ' . strlen($image['data']) . " >>\nstream\n" . $image['data'] . "\nendstream";
            continue;
        }
        $packed = gzcompress($image['data'], 9);
        $objects[] = '<< /Type /XObject /Subtype /Image /Width ' . $image['w'] . ' /Height ' . $image['h']
            . ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ' . strlen($packed) . " >>\nstream\n"
            . $packed . "\nendstream";
    }

    $pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
    $offsets = [];
    foreach ($objects as $index => $object) {
        $offsets[$index + 1] = strlen($pdf);
        $pdf .= ($index + 1) . " 0 obj\n" . $object . "\nendobj\n";
    }
    $xrefOffset = strlen($pdf);
    $count = count($objects) + 1;
    $pdf .= 'xref' . "\n" . '0 ' . $count . "\n" . "0000000000 65535 f \n";
    foreach ($offsets as $offset) {
        $pdf .= str_pad((string) $offset, 10, '0', STR_PAD_LEFT) . " 00000 n \n";
    }
    $pdf .= 'trailer << /Size ' . $count . ' /Root 1 0 R >>' . "\nstartxref\n" . $xrefOffset . "\n%%EOF\n";

    return $pdf;
}

/** Send a finished pass to the browser as a download. */
function mt_pass_send(array $registration, array $event, array $site, bool $inline = false): void
{
    $pdf = mt_pass_pdf($registration, $event, $site);
    $name = 'mindful-tattva-pass-' . preg_replace('/[^A-Za-z0-9\-]/', '', (string) ($registration['serial'] ?? 'pass')) . '.pdf';
    $headers = [
        'Content-Type'        => 'application/pdf',
        'Content-Disposition' => ($inline ? 'inline' : 'attachment') . '; filename="' . $name . '"',
        'Cache-Control'       => 'no-store, max-age=0',
        'Content-Length'      => (string) strlen($pdf),
    ];
    if (mt_headless()) {
        $GLOBALS['MT_TEST_STATUS'] = 200;
        foreach ($headers as $header => $value) {
            $GLOBALS['MT_TEST_HEADERS'][] = [$header, $value];
        }
        echo $pdf;
        mt_stop();
    }
    if (!headers_sent()) {
        http_response_code(200);
        foreach ($headers as $header => $value) {
            header($header . ': ' . $value, true);
        }
    }
    echo $pdf;
    mt_stop();
}
