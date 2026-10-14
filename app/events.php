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
    /* Commas, not the floating middots: the club asked for the stray dots
       between the details to go. */
    return implode(', ', $parts);
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

/** Seats taken by passes that exist. A seat is only held by a real pass. */
function mt_event_seats_taken(array $db, array $event): int
{
    $taken = 0;
    foreach ($db['registrations'] as $registration) {
        if ((string) ($registration['eventId'] ?? '') !== (string) ($event['id'] ?? '')) {
            continue;
        }
        if (($registration['status'] ?? 'confirmed') === 'cancelled') {
            continue;
        }
        if (mt_registration_pass_ready($registration)) {
            $taken++;
        }
    }
    return $taken;
}

/** Waiting to pay: registrations that do not hold a seat yet. */
function mt_event_seats_waiting(array $db, array $event): int
{
    $waiting = 0;
    foreach ($db['registrations'] as $registration) {
        if ((string) ($registration['eventId'] ?? '') !== (string) ($event['id'] ?? '')) {
            continue;
        }
        if (($registration['status'] ?? 'confirmed') === 'cancelled') {
            continue;
        }
        if (!mt_registration_pass_ready($registration)) {
            $waiting++;
        }
    }
    return $waiting;
}

/** Seats left, or null when the club did not set a limit. Only issued passes count. */
function mt_event_seats_left(array $db, array $event): ?int
{
    $capacity = (int) ($event['capacity'] ?? 0);
    if ($capacity <= 0) {
        return null;
    }
    return max(0, $capacity - mt_event_seats_taken($db, $event));
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

/**
 * MTP-2026-0007 — the serial the club reads at the door.
 *
 * It is issued when the pass is earned (right away for a free event, after the
 * payment screenshot arrives for a paid one), never while a seat is unpaid.
 */
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

/**
 * The private code in the student's pass link: MT-7K4QP-2XZ87-9M3RT-W6HDX.
 *
 * Twenty characters from a 32-letter alphabet (~100 bits), so it cannot be
 * guessed or walked through. The letters I, L, O and U and the digits 0 and 1
 * are left out so nothing can be misread from a screen. Only its SHA-256 hash
 * is ever stored, and the code itself is never printed on the pass, drawn in a
 * QR code, or listed in the club dashboard.
 */
function mt_registration_code(): string
{
    $alphabet = '23456789ABCDEFGHJKMNPQRSTVWXYZ';
    $groups = [];
    for ($group = 0; $group < 4; $group++) {
        $chunk = '';
        for ($index = 0; $index < 5; $index++) {
            $chunk .= $alphabet[random_int(0, strlen($alphabet) - 1)];
        }
        $groups[] = $chunk;
    }
    return 'MT-' . implode('-', $groups);
}

/** Only the hash of a pass code is kept, so a copy of the file is not a key. */
function mt_registration_code_hash(string $code): string
{
    return hash('sha256', 'mindful-tattva-pass|' . strtoupper(trim($code)));
}

/** Loose shape check before hashing a code someone pasted in. */
function mt_registration_code_looks_valid(string $code): bool
{
    return (bool) preg_match('/^MT(-[2-9A-HJ-NP-Z]{4,6}){3,4}$/i', trim($code));
}

/** Find the registration a stored code hash belongs to. */
function mt_registration_by_code_hash(array $db, string $hash): ?array
{
    if ($hash === '') {
        return null;
    }
    foreach ($db['registrations'] as $registration) {
        $stored = (string) ($registration['passCodeHash'] ?? '');
        if ($stored !== '' && hash_equals($stored, $hash)) {
            return $registration;
        }
    }
    return null;
}

/** Find the registration a pass link belongs to. */
function mt_registration_by_code(array $db, string $code): ?array
{
    if (!mt_registration_code_looks_valid($code)) {
        return null;
    }
    $hash = mt_registration_code_hash($code);
    foreach ($db['registrations'] as $registration) {
        if (hash_equals((string) ($registration['passCodeHash'] ?? ''), $hash)) {
            return $registration;
        }
    }
    return null;
}

/**
 * A public, unguessable handle for the verification page. It travels in the QR
 * code, so anyone — including a stranger who finds a lost pass — can check the
 * pass is real without seeing the holder's contact details.
 */
function mt_registration_public_id(array $db): string
{
    do {
        $id = 'v' . bin2hex(random_bytes(9));
        $taken = false;
        foreach ($db['registrations'] as $registration) {
            if ((string) ($registration['publicId'] ?? '') === $id) {
                $taken = true;
                break;
            }
        }
    } while ($taken);
    return $id;
}

/** Where a scanned pass QR lands: our own page, no sign-in, no app needed. */
function mt_verify_url(array $registration): string
{
    $publicId = trim((string) ($registration['publicId'] ?? ''));
    if ($publicId === '') {
        return mt_base_url() . '/verify';
    }
    return mt_base_url() . '/verify/' . rawurlencode($publicId);
}

/**
 * The number an event is filed under.
 *
 * Events are numbered in the order they were added (1, 2, 3 …). The number is
 * the club's own filing system: photos are filed under it, the calendar and
 * the event cards show it, and nothing from one event is ever shown inside
 * another. Numbers are never reused, so a deleted event leaves a gap instead
 * of shuffling the rest.
 */
function mt_events_numbered(array $events): array
{
    $used = [];
    foreach ($events as $event) {
        $number = (int) ($event['number'] ?? 0);
        if ($number > 0) {
            $used[$number] = true;
        }
    }
    $next = $used ? (max(array_keys($used)) + 1) : 1;
    foreach ($events as $index => $event) {
        if ((int) ($event['number'] ?? 0) > 0) {
            continue;
        }
        /* An older event with no number keeps its place in the list. */
        while (isset($used[$next])) {
            $next++;
        }
        $events[$index]['number'] = $next;
        $used[$next] = true;
        $next++;
    }

    return $events;
}

/** The next free event number, for a brand-new event. */
function mt_next_event_number(array $events): int
{
    $numbered = mt_events_numbered($events);
    $highest = 0;
    foreach ($numbered as $event) {
        $highest = max($highest, (int) ($event['number'] ?? 0));
    }

    return $highest + 1;
}

/** "Event 3" — how the club and the site refer to one event. */
function mt_event_label(array $event): string
{
    $number = (int) ($event['number'] ?? 0);

    return $number > 0 ? 'Event ' . $number : 'Event';
}

/** Every event, numbered, ready to be shown. */
function mt_events_for_display(array $database): array
{
    return mt_sorted(mt_events_numbered($database['events'] ?? []));
}

/** One event by its id, or null. */
function mt_event_by_id(array $database, string $id): ?array
{
    foreach (($database['events'] ?? []) as $event) {
        if ((string) ($event['id'] ?? '') === $id) {
            return $event;
        }
    }

    return null;
}

/** "A••••  S••••" — enough to recognise yourself, not enough to abuse. */
function mt_mask_name(string $name): string
{
    $parts = preg_split('/\s+/', trim($name)) ?: [];
    $parts = array_values(array_filter($parts, static fn(string $part): bool => $part !== ''));
    if ($parts === []) {
        return 'A registered student';
    }
    $masked = [];
    foreach ($parts as $part) {
        $first = mb_substr($part, 0, 1);
        $rest = max(0, mb_strlen($part) - 1);
        $masked[] = $first . str_repeat('•', min($rest, 6));
    }
    return implode(' ', $masked);
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
    /* A free event is settled the moment the form is sent. A paid one is only
       confirmed — with its serial, its seat and its pass — once the payment
       screenshot has arrived. */
    $free = $fee <= 0;
    $code = mt_registration_code();

    return ['error' => null, 'record' => [
        'id'              => mt_next_id('reg'),
        'serial'          => $free ? mt_registration_serial($db) : '',
        'publicId'        => mt_registration_public_id($db),
        'passCodeHash'    => mt_registration_code_hash($code),
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
        'paymentStatus'   => $free ? 'not-required' : 'pending',
        'proofPath'       => '',
        'proofUploadedAt' => '',
        'passIssuedAt'    => $free ? $now : '',
        'status'          => $free ? 'confirmed' : 'pending-payment',
        'createdAt'       => $now,
        'updatedAt'       => $now,
    ], 'code' => $code];
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

/** A pass page is only for the student who holds the code in their link. */
function mt_registration_by_token(array $db, string $id, string $token): ?array
{
    $registration = mt_registration_by_code($db, $token);
    if ($registration === null) {
        return null;
    }
    if ($id !== '' && (string) ($registration['id'] ?? '') !== $id
        && strcasecmp((string) ($registration['serial'] ?? ''), $id) !== 0) {
        return null;
    }
    return $registration;
}

/**
 * A pass exists only once it has been earned.
 *
 * A paid seat is confirmed — and only then gets its serial, its seat and its
 * pass — when the payment screenshot arrives. Until that moment the student has
 * a link that asks for the payment, and nothing else.
 */
function mt_registration_pass_ready(array $registration): bool
{
    if ((string) ($registration['status'] ?? '') === 'cancelled') {
        return false;
    }
    $fee = (float) ($registration['eventFee'] ?? 0);
    if ($fee <= 0) {
        return true;
    }
    if ((string) ($registration['serial'] ?? '') === '') {
        return false;
    }
    return in_array((string) ($registration['paymentStatus'] ?? ''), ['submitted', 'verified'], true);
}

/** What the student's link shows right now. */
function mt_registration_stage(array $registration): string
{
    if ((string) ($registration['status'] ?? '') === 'cancelled') {
        return 'cancelled';
    }
    $fee = (float) ($registration['eventFee'] ?? 0);
    if ($fee <= 0) {
        return 'ready';
    }
    $status = (string) ($registration['paymentStatus'] ?? 'pending');
    if ($status === 'rejected') {
        return 'proof-rejected';
    }
    if (in_array($status, ['submitted', 'verified'], true) && (string) ($registration['serial'] ?? '') !== '') {
        return 'ready';
    }
    return 'pay';
}

function mt_payment_label(string $status): string
{
    return match ($status) {
        'not-required'    => 'Free event — nothing to pay',
        'pending'         => 'Payment pending — the seat is not held yet',
        'submitted'       => 'Payment proof received — awaiting the club',
        'verified'        => 'Payment verified by the club',
        'rejected'        => 'Payment proof was not accepted — please upload again',
        default           => 'Payment pending',
    };
}

/** The registration is only a placeholder until the payment screenshot lands. */
function mt_registration_is_provisional(array $registration): bool
{
    return !mt_registration_pass_ready($registration);
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
        'seat'          => 'Seat held',
        'verifyUrl'     => 'Pass check link',
        'createdAt'     => 'Registered at',
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
                case 'seat':
                    $value = mt_registration_pass_ready($registration) ? 'held' : 'not held yet';
                    break;
                case 'verifyUrl':
                    $value = mt_registration_pass_ready($registration) ? mt_verify_url($registration) : '';
                    break;
                case 'serial':
                    $value = (string) ($registration['serial'] ?? '');
                    if ($value === '') {
                        $value = 'not issued yet';
                    }
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

    /* A phone screenshot of a UPI receipt is a few hundred KB. Anything much
       bigger is either not a screenshot or a mistake, and it would sit on the
       club's hosting for its lifetime — so payment proofs get their own, small
       ceiling (2 MB by default). */
    $config = mt_config();
    $maxBytes = (int) ($config['max_proof_bytes'] ?? 2 * 1024 * 1024);
    $size = (int) (@filesize($tmp) ?: 0);
    if ($size <= 0) {
        return ['path' => null, 'error' => 'That file is empty. Please choose the screenshot again.'];
    }
    if ($size > $maxBytes) {
        return [
            'path'  => null,
            'error' => 'That file is ' . round($size / 1048576, 1) . 'MB; a screenshot only needs to be up to '
                . round($maxBytes / 1048576, 1) . 'MB. Please send a screenshot of the receipt rather than a photo.',
        ];
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
