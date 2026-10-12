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

    $margin = 48.0;
    $inner = $width - $margin * 2;

    /* the card itself: header band, holder, event, facts, terms, footer */
    $rect($margin, 118, $inner, 582, [1, 1, 1]);
    $ops[] = sprintf('%.3f %.3f %.3f RG 1.2 w %.2f %.2f %.2f %.2f re S', $plum[0], $plum[1], $plum[2], $margin, 118, $inner, 582);
    $rect($margin, 630, $inner, 70, $plum);
    $text($margin + 22, 670, $club, 20, true, [1, 0.976, 0.949]);
    $text($margin + 22, 654, $department . ($university !== '' ? ' · ' . $university : ''), 9, false, [0.95, 0.87, 0.79]);
    $text($width - $margin - 22 - mt_pdf_width('EVENT PASS', 11, true), 670, 'EVENT PASS', 11, true, [0.957, 0.757, 0.561]);

    /* who and which event */
    $y = 596.0;
    $text($margin + 22, $y, 'PASS HOLDER', 8, true, $terracotta);
    $text($margin + 22, $y - 26, (string) ($registration['name'] ?? ''), 26, true, $plum);
    $meta = array_filter([
        trim((string) ($registration['course'] ?? '')),
        trim((string) ($registration['year'] ?? '')),
        trim((string) ($registration['phone'] ?? '')),
        trim((string) ($registration['email'] ?? '')),
    ], static fn($part) => $part !== '');
    $text($margin + 22, $y - 42, implode(' · ', $meta), 9, false, $soft);

    $y -= 78;
    $text($margin + 22, $y, 'EVENT', 8, true, $terracotta);
    $titleLines = mt_pdf_wrap((string) ($event['title'] ?? $registration['eventTitle'] ?? ''), 16, $inner - 190, true);
    $titleY = $y - 22;
    foreach (array_slice($titleLines, 0, 2) as $titleLine) {
        $text($margin + 22, $titleY, $titleLine, 16, true, $plum);
        $titleY -= 19;
    }
    $text($margin + 22, $titleY, mt_event_line($event), 10, false, $ink);

    /* the facts, in two columns */
    $facts = [
        ['DATE', (string) ($registration['eventDate'] ?? '')],
        ['TIME', (string) ($registration['eventTime'] ?? '')],
        ['VENUE', (string) ($registration['eventVenue'] ?? '')],
        ['FEE', mt_money((float) ($registration['eventFee'] ?? 0))],
        ['PAYMENT', mt_payment_label((string) ($registration['paymentStatus'] ?? 'pending'))],
        ['PASS SERIAL', (string) ($registration['serial'] ?? '')],
    ];
    $columnWidth = 150.0;
    $factY = $titleY - 40;
    foreach ($facts as $index => [$label, $value]) {
        $column = $index % 2;
        $row = intdiv($index, 2);
        $x = $margin + 22 + $column * ($columnWidth + 16);
        $rowY = $factY - $row * 42;
        $text($x, $rowY, $label, 7.5, true, $terracotta);
        $wrapped = mt_pdf_wrap($value, 10.5, $columnWidth - 6);
        $text($x, $rowY - 14, $wrapped[0] ?? '', 10.5, false, $ink);
    }

    /* the QR code, top right of the card body */
    $qrSize = 148.0;
    $qrX = $width - $margin - 22 - $qrSize;
    $qrY = 414.0;
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
    $text($qrX, $qrY - 20, 'Scan to check this pass', 8, true, $terracotta);
    $text($qrX, $qrY - 32, 'opens the club site', 8, false, $soft);

    /* the rules every pass carries */
    $rulesY = 322.0;
    $rect($margin + 22, 176, $inner - 44, 146, $sand);
    $text($margin + 34, $rulesY, 'ENTRY & REFUND TERMS', 8.5, true, $plum);
    $ruleLines = [
        'Show this pass and your payment proof (the screenshot you uploaded) at the entry desk. Entry is given only when the pass serial matches the club register.',
        'This pass is for one person, for this event only, and cannot be sold or transferred. Please bring a photo ID for verification.',
        'Registration fees are non-refundable. By registering you agree to the terms and conditions of the event.',
        'Decisions of the club about the event are final. The club may cancel the event or change the date or venue without prior notice.',
        'If the club cancels the event, the fee is refunded within 24 working days.',
    ];
    $lineY = $rulesY - 16;
    foreach ($ruleLines as $rule) {
        foreach (mt_pdf_wrap($rule, 8.6, $inner - 68) as $wrapped) {
            $text($margin + 34, $lineY, $wrapped, 8.6, false, $ink);
            $lineY -= 11;
        }
        $lineY -= 3;
    }

    /* footer */
    $line($margin + 22, 170, $width - $margin - 22, 170, [0.86, 0.84, 0.83]);
    $text($margin + 22, 152, 'Registered on ' . (string) ($registration['createdAt'] ?? ''), 8.5, false, $soft);
    $text($margin + 22, 138, 'Check this pass: ' . $siteUrl . '/verify/' . (string) ($registration['publicId'] ?? ''), 8.5, false, $soft);
    $issued = 'Issued by ' . $club . ' · ' . $university;
    $text($width - $margin - 22 - mt_pdf_width($issued, 8.5), 152, $issued, 8.5, false, $soft);

    /* below the card: the pass in plain words, for the door team */
    $text($margin, 92, 'Mindful Tattva · event pass · ' . (string) ($registration['serial'] ?? ''), 9, true, $plum);
    $noteLines = mt_pdf_wrap((string) ($site['contactNote'] ?? ''), 9, $inner);
    if (isset($noteLines[0])) {
        $text($margin, 76, $noteLines[0], 9, false, $soft);
    }

    $content = implode("\n", $ops);

    /* ------------------------------------------------------------------ file */
    $objects = [];
    $objects[] = '<< /Type /Catalog /Pages 2 0 R >>';
    $objects[] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
    $objects[] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' . round($width, 2) . ' ' . round($height, 2) . '] '
        . '/Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>';
    $objects[] = "<< /Length " . strlen($content) . " >>\nstream\n" . $content . "\nendstream";
    $objects[] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
    $objects[] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';

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
