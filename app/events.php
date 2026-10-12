<?php
/**
 * Mindful Tattva · events, registration windows and passes
 * ---------------------------------------------------------
 * Everything the club needs to run a registration:
 *
 *   · an event's date (month from the calendar, day and year typed in),
 *     its venue as free text, its fee and its UPI details
 *   · a registration window that closes itself — either at a set date and
 *     time, or a number of hours (1–24) after the club opened it
 *   · a registration record with a pass serial number, a private token,
 *     the payment status and the screenshot the student uploaded
 *   · the CSV the team keeps at the door
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

const MT_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** The club's clock — every window and serial is judged in Mumbai time. */
function mt_timezone(): DateTimeZone
{
    static $zone = null;
    if ($zone === null) {
        $zone = new DateTimeZone(defined('MT_TIMEZONE') ? MT_TIMEZONE : 'Asia/Kolkata');
    }
    return $zone;
}

function mt_now(): DateTimeImmutable
{
    return new DateTimeImmutable('now', mt_timezone());
}

function mt_now_iso(): string
{
    return mt_now()->format('Y-m-d\TH:i');
}

/** Parse a stored local date-time ("2026-10-24T18:00" or "2026-10-24"). */
function mt_parse_local(?string $value): ?DateTimeImmutable
{
    $value = trim((string) $value);
    if ($value === '') {
        return null;
    }
    foreach (['Y-m-d\TH:i', 'Y-m-d H:i', 'Y-m-d\TH:i:s', 'Y-m-d'] as $format) {
        $date = DateTimeImmutable::createFromFormat($format, $value, mt_timezone());
        if ($date instanceof DateTimeImmutable) {
            return $date;
        }
    }
    try {
        return new DateTimeImmutable($value, mt_timezone());
    } catch (Throwable $error) {
        return null;
    }
}

/** "24 October 2026" — built from the month, day and year the club typed in. */
function mt_event_date_display(array $event): string
{
    $month = (int) ($event['month'] ?? 0);
    $day   = (int) ($event['day'] ?? 0);
    $year  = (int) ($event['year'] ?? 0);
    if ($month < 1 || $month > 12) {
        return mt_clean_text($event['date'] ?? '', 80);
    }
    $label = MT_MONTHS[$month - 1];
    if ($day >= 1 && $day <= 31) {
        return $day . ' ' . $label . ($year > 0 ? ' ' . $year : '');
    }
    return $label . ($year > 0 ? ' ' . $year : '');
}

/** 0–11 for the yearly calendar, or -1 when the event has no month yet. */
function mt_event_month_index(array $event): int
{
    $month = (int) ($event['month'] ?? 0);
    return ($month >= 1 && $month <= 12) ? $month - 1 : -1;
}

/** "24 October 2026 · 4:00 PM · CSMU campus · Seminar Hall" */
function mt_event_line(array $event): string
{
    $parts = array_filter([
        mt_event_date_display($event),
        trim((string) ($event['time'] ?? '')),
        trim((string) ($event['location'] ?? '')),
    ], static fn($part) => $part !== '');
    return implode(' · ', $parts);
}

function mt_event_fee(array $event): float
{
    return round(max(0, (float) ($event['fee'] ?? 0)), 2);
}

function mt_event_is_paid(array $event): bool
{
    return mt_event_fee($event) > 0;
}

/** "Rs. 150" / "Free entry" — used on cards, the pass and the CSV. */
function mt_money(float $amount): string
{
    if ($amount <= 0) {
        return 'Free';
    }
    return 'Rs. ' . number_format($amount, ($amount === floor($amount)) ? 0 : 2);
}

function mt_event_find(array $db, string $id): ?array
{
    foreach ($db['events'] as $event) {
        if ((string) ($event['id'] ?? '') === $id) {
            return $event;
        }
    }
    return null;
}

/** The event the announcement banner shows: published, soonest first. */
function mt_featured_event(array $db): ?array
{
    $candidates = [];
    foreach ($db['events'] as $event) {
        if (empty($event['published'])) {
            continue;
        }
        $candidates[] = $event;
    }
    if (!$candidates) {
        return null;
    }
    usort($candidates, static function (array $a, array $b): int {
        $monthA = mt_event_month_index($a);
        $monthB = mt_event_month_index($b);
        if ($monthA !== $monthB) {
            return $monthA <=> $monthB;
        }
        return ((int) ($a['day'] ?? 0)) <=> ((int) ($b['day'] ?? 0));
    });
    return $candidates[0];
}

/**
 * Is registration open? Two ways to close a window, both self-closing:
 *   · "date"  — the club picked the date and time it shuts
 *   · "hours" — it shuts N hours (1–24) after the club opened it
 *
 * @return array{open: bool, closesAt: ?string, label: string, reason: string}
 */
function mt_event_window(array $event): array
{
    if (empty($event['registrationOpen'])) {
        return ['open' => false, 'closesAt' => null, 'label' => 'Registration is closed for this event.', 'reason' => 'closed'];
    }

    $mode = (string) ($event['windowMode'] ?? 'date');

    if ($mode === 'hours') {
        $opened = mt_parse_local($event['openedAt'] ?? '');
        if (!$opened) {
            $opened = mt_now();
        }
        $hours = max(1, min(24, (int) ($event['openHours'] ?? 24)));
        $closes = $opened->modify('+' . $hours . ' hour');
    } else {
        $closes = mt_parse_local($event['closesAt'] ?? '');
        if (!$closes) {
            return ['open' => true, 'closesAt' => null, 'label' => 'Registration is open.', 'reason' => 'always'];
        }
    }

    $iso = $closes->format('Y-m-d\TH:i');
    if (mt_now() >= $closes) {
        return [
            'open'     => false,
            'closesAt' => $iso,
            'label'    => 'Registration closed on ' . $closes->format('j F Y, g:i A') . '.',
            'reason'   => 'expired',
        ];
    }

    $left = mt_now()->diff($closes);
    $soon = ($left->days === 0 && $left->h < 12);
    return [
        'open'     => true,
        'closesAt' => $iso,
        'label'    => $soon
            ? 'Registration closes in ' . max(1, (int) ceil(($closes->getTimestamp() - mt_now()->getTimestamp()) / 3600)) . ' hour(s), on ' . $closes->format('j F, g:i A') . '.'
            : 'Registration closes on ' . $closes->format('j F Y, g:i A') . '.',
        'reason'   => 'open',
    ];
}

/** Seats left, or null when the club did not set a limit. */
function mt_event_seats_left(array $db, array $event): ?int
{
    $capacity = (int) ($event['capacity'] ?? 0);
    if ($capacity <= 0) {
        return null;
    }
    $taken = 0;
    foreach ($db['registrations'] as $registration) {
        if ((string) ($registration['eventId'] ?? '') === (string) ($event['id'] ?? '')
            && ($registration['status'] ?? 'confirmed') !== 'cancelled') {
            $taken++;
        }
    }
    return max(0, $capacity - $taken);
}

/** Why a form is (or is not) accepting a registration right now. */
function mt_event_registration_state(array $db, array $event): array
{
    if (empty($db['settings']['frontendRegistration'])) {
        return ['open' => false, 'reason' => 'disabled', 'label' => 'Online registration is paused. Please contact the club team.'];
    }
    $window = mt_event_window($event);
    if (!$window['open']) {
        return ['open' => false, 'reason' => $window['reason'], 'label' => $window['label']];
    }
    $seats = mt_event_seats_left($db, $event);
    if ($seats !== null && $seats <= 0) {
        return ['open' => false, 'reason' => 'full', 'label' => 'This event is full. Please contact the club team.'];
    }
    return ['open' => true, 'reason' => 'open', 'label' => $window['label']];
}

/** The events a visitor can still register for, soonest first. */
function mt_open_events(array $db): array
{
    $open = [];
    foreach ($db['events'] as $event) {
        $state = mt_event_registration_state($db, $event);
        if ($state['open']) {
            $event['_window'] = $state;
            $open[] = $event;
        }
    }
    usort($open, static function (array $a, array $b): int {
        return mt_event_month_index($a) <=> mt_event_month_index($b) ?: ((int) ($a['day'] ?? 0)) <=> ((int) ($b['day'] ?? 0));
    });
    return $open;
}

/* ------------------------------------------------------------------ passes */

/** MTP-2026-0007 — one serial per registration, in the order they arrive. */
function mt_registration_serial(array $db): string
{
    $year = mt_now()->format('Y');
    $highest = 0;
    foreach ($db['registrations'] as $registration) {
        $serial = (string) ($registration['serial'] ?? '');
        if (preg_match('/^MTP-' . $year . '-(\d+)$/', $serial, $match)) {
            $highest = max($highest, (int) $match[1]);
        }
    }
    return 'MTP-' . $year . '-' . str_pad((string) ($highest + 1), 4, '0', STR_PAD_LEFT);
}

function mt_registration_token(): string
{
    return bin2hex(random_bytes(16));
}

/**
 * Build a registration record from the public form.
 *
 * @return array{record: array, error: ?string}
 */
function mt_registration_new(array $db, array $event, array $input): array
{
    $name  = mt_clean_text($input['name'] ?? '', 120);
    $email = mt_clean_text($input['email'] ?? '', 160);
    $phone = mt_clean_text($input['phone'] ?? '', 40);

    if ($name === '' || $email === '' || $phone === '') {
        return ['record' => [], 'error' => 'Please add your name, email address and phone number.'];
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['record' => [], 'error' => 'That email address does not look right.'];
    }
    if (preg_match_all('/\d/', $phone) < 8) {
        return ['record' => [], 'error' => 'That phone number does not look right.'];
    }

    $fee = mt_event_fee($event);
    $now = mt_now()->format('Y-m-d\TH:i');

    return ['error' => null, 'record' => [
        'id'              => mt_next_id('reg'),
        'serial'          => mt_registration_serial($db),
        'token'           => mt_registration_token(),
        'eventId'         => (string) ($event['id'] ?? ''),
        'eventTitle'      => (string) ($event['title'] ?? ''),
        'eventDate'       => mt_event_date_display($event),
        'eventTime'       => (string) ($event['time'] ?? ''),
        'eventVenue'      => (string) ($event['location'] ?? ''),
        'eventFee'        => $fee,
        'eventUpi'        => (string) ($event['upiId'] ?? ''),
        'name'            => $name,
        'email'           => $email,
        'phone'           => $phone,
        'course'          => mt_clean_text($input['course'] ?? '', 160),
        'year'            => mt_clean_text($input['year'] ?? '', 60),
        'note'            => mt_clean_text($input['note'] ?? '', 600),
        'paymentStatus'   => $fee > 0 ? 'pending' : 'not-required',
        'proofPath'       => '',
        'proofUploadedAt' => '',
        'passIssuedAt'    => $fee > 0 ? '' : $now,
        'status'          => 'confirmed',
        'createdAt'       => $now,
        'updatedAt'       => $now,
    ]];
}

function mt_registration_find(array $db, string $id): ?array
{
    foreach ($db['registrations'] as $registration) {
        if ((string) ($registration['id'] ?? '') === $id) {
            return $registration;
        }
    }
    return null;
}

/** Find a registration by the serial printed on the pass. */
function mt_registration_by_serial(array $db, string $serial): ?array
{
    foreach ($db['registrations'] as $registration) {
        if (strcasecmp((string) ($registration['serial'] ?? ''), $serial) === 0) {
            return $registration;
        }
    }
    return null;
}

/** A pass link is only valid with the private token that was made with it. */
function mt_registration_by_token(array $db, string $id, string $token): ?array
{
    $registration = mt_registration_find($db, $id);
    if (!$registration) {
        return null;
    }
    $expected = (string) ($registration['token'] ?? '');
    if ($expected === '' || $token === '' || !hash_equals($expected, $token)) {
        return null;
    }
    return $registration;
}

/** A pass exists only once it has been earned: paid events need the proof. */
function mt_registration_pass_ready(array $registration): bool
{
    $fee = (float) ($registration['eventFee'] ?? 0);
    if ($fee <= 0) {
        return true;
    }
    return in_array((string) ($registration['paymentStatus'] ?? ''), ['submitted', 'verified'], true);
}

function mt_payment_label(string $status): string
{
    return match ($status) {
        'not-required' => 'Free event — nothing to pay',
        'pending'      => 'Payment pending — upload your screenshot',
        'submitted'    => 'Payment proof received — awaiting the club',
        'verified'     => 'Payment verified by the club',
        'rejected'     => 'Payment proof was not accepted — please upload again',
        default        => 'Payment pending',
    };
}

/** The UPI string a payment app understands, and our QR carries. */
function mt_upi_link(array $event, ?array $registration = null): string
{
    $params = [
        'pa' => (string) ($event['upiId'] ?? ($registration['eventUpi'] ?? '')),
        'pn' => (string) ($event['upiName'] ?? '') !== '' ? (string) $event['upiName'] : (string) ($event['title'] ?? 'Mindful Tattva'),
        'cu' => 'INR',
    ];
    $fee = mt_event_fee($event);
    if ($fee > 0) {
        $params['am'] = number_format($fee, 2, '.', '');
    }
    $title = trim((string) ($event['title'] ?? ''));
    $serial = (string) ($registration['serial'] ?? '');
    $note = trim($title . ($serial !== '' ? ' ' . $serial : ''));
    if ($note !== '') {
        $params['tn'] = mb_substr($note, 0, 60);
    }
    return 'upi://pay?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986);
}

/* --------------------------------------------------------------- the CSV */

/** The door list: every registration with its serial, ready for a spreadsheet. */
function mt_registrations_csv(array $db): string
{
    $columns = [
        'serial'        => 'Pass serial',
        'name'          => 'Name',
        'phone'         => 'Phone',
        'email'         => 'Email',
        'course'        => 'Course',
        'year'          => 'Year of study',
        'eventTitle'    => 'Event',
        'eventDate'     => 'Event date',
        'eventTime'     => 'Event time',
        'eventVenue'    => 'Venue',
        'fee'           => 'Fee',
        'paymentStatus' => 'Payment status',
        'paymentLabel'  => 'Payment note',
        'passReady'     => 'Pass ready',
        'status'        => 'Registration status',
        'proofPath'     => 'Payment screenshot',
        'createdAt'     => 'Registered at',
        'note'          => 'Student note',
    ];

    $rows = [];
    $rows[] = array_values($columns);
    $registrations = $db['registrations'];
    usort($registrations, static fn(array $a, array $b): int => strcmp((string) ($b['createdAt'] ?? ''), (string) ($a['createdAt'] ?? '')));

    foreach ($registrations as $registration) {
        $row = [];
        foreach ($columns as $key => $label) {
            switch ($key) {
                case 'fee':
                    $value = number_format((float) ($registration['eventFee'] ?? 0), 2, '.', '');
                    break;
                case 'paymentLabel':
                    $value = mt_payment_label((string) ($registration['paymentStatus'] ?? 'pending'));
                    break;
                case 'passReady':
                    $value = mt_registration_pass_ready($registration) ? 'yes' : 'no';
                    break;
                default:
                    $value = (string) ($registration[$key] ?? '');
            }
            $row[] = $value;
        }
        $rows[] = $row;
    }

    $handle = fopen('php://temp', 'r+');
    if ($handle === false) {
        return '';
    }
    /* Excel reads a BOM happily; a spreadsheet should open straight away. */
    fwrite($handle, "\xEF\xBB\xBF");
    foreach ($rows as $row) {
        fputcsv($handle, $row, ',', '"', '\\');
    }
    rewind($handle);
    $csv = (string) stream_get_contents($handle);
    fclose($handle);
    return $csv;
}

/* --------------------------------------------------- the payment screenshot */

/**
 * Take the payment screenshot a student uploads, after checking it really is an
 * image or a PDF and not something that could be executed on the server.
 *
 * @return array{path: ?string, error: ?string}
 */
function mt_registration_receive_proof(array $registration): array
{
    $file = $_FILES['proof'] ?? null;
    if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return ['path' => null, 'error' => 'Please choose the screenshot of your payment first.'];
    }
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        return ['path' => null, 'error' => 'That upload did not finish. Please try again.'];
    }

    $tmp = (string) ($file['tmp_name'] ?? '');
    if ($tmp === '' || !is_uploaded_file($tmp) && !mt_headless()) {
        return ['path' => null, 'error' => 'That upload could not be read.'];
    }

    $maxBytes = (int) (mt_config()['max_upload_bytes'] ?? 4 * 1024 * 1024);
    $size = (int) (@filesize($tmp) ?: 0);
    if ($size <= 0) {
        return ['path' => null, 'error' => 'That file is empty. Please choose the screenshot again.'];
    }
    if ($size > $maxBytes) {
        return ['path' => null, 'error' => 'That file is larger than ' . round($maxBytes / 1048576, 1) . 'MB. A photo of the receipt is enough.'];
    }

    $allowed = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp', IMAGETYPE_GIF => 'gif'];
    $info = @getimagesize($tmp);
    if ($info !== false && isset($allowed[(int) $info[2]])) {
        $extension = $allowed[(int) $info[2]];
    } else {
        $head = (string) @file_get_contents($tmp, false, null, 0, 5);
        if (!str_starts_with($head, '%PDF')) {
            return ['path' => null, 'error' => 'Please upload a screenshot or receipt: JPG, PNG, WEBP, GIF or PDF.'];
        }
        $extension = 'pdf';
    }

    $folder = MT_UPLOADS . '/proofs/' . date('Y') . '/' . date('m');
    if (!is_dir($folder) && !@mkdir($folder, 0775, true)) {
        return ['path' => null, 'error' => 'The uploads folder is not writable, so the proof cannot be stored. Please write to the club.'];
    }

    $serial = preg_replace('/[^A-Za-z0-9\-]/', '', (string) ($registration['serial'] ?? 'pass')) ?? 'pass';
    $name = $serial . '-' . date('Ymd') . '-' . bin2hex(random_bytes(4)) . '.' . $extension;
    $target = $folder . '/' . $name;
    if (!@move_uploaded_file($tmp, $target) && !@rename($tmp, $target) && !@copy($tmp, $target)) {
        return ['path' => null, 'error' => 'The screenshot could not be stored. Please try again.'];
    }
    @chmod($target, 0644);

    return ['path' => '/uploads/proofs/' . date('Y') . '/' . date('m') . '/' . $name, 'error' => null];
}
