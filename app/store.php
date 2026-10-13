<?php
/**
 * Mindful Tattva · JSON data store
 * --------------------------------
 * One JSON document is the whole database. Reads are lock-free (atomic rename
 * means readers never see a half-written file), writes take an exclusive lock,
 * keep a timestamped backup of the previous version and bump a revision number
 * that the front-end uses to know when something changed.
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

const MT_COLLECTIONS = ['history', 'team', 'events', 'gallery'];

/** Groups a member can belong to, in the order the members page shows them. */
const MT_TEAM_GROUPS = ['management', 'heads', 'volunteers'];

/** How a registration window can close. */
const MT_WINDOW_MODES = ['date', 'hours'];

function mt_db_defaults(): array
{
    return [
        'revision'    => 1,
        'updatedAt'   => gmdate('c'),
        'site'        => [],
        'history'       => [],
        'team'          => [],
        'events'        => [],
        'gallery'       => [],
        'registrations' => [],
        'submissions'   => [],
        'settings'      => ['frontendRegistration' => true],
    ];
}

/** Load the database (cached per request). */
function mt_db(bool $fresh = false): array
{
    if ($fresh) {
        $GLOBALS['MT_DB_CACHE'] = null;
    }
    if (!empty($GLOBALS['MT_DB_CACHE']) && is_array($GLOBALS['MT_DB_CACHE'])) {
        return $GLOBALS['MT_DB_CACHE'];
    }

    $data = [];
    if (is_file(MT_DB_FILE)) {
        $raw = @file_get_contents(MT_DB_FILE);
        if (is_string($raw) && $raw !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                $data = $decoded;
            } else {
                mt_log('Database JSON could not be decoded; falling back to defaults.');
            }
        }
    }

    $db = array_replace_recursive(mt_db_defaults(), $data);
    foreach (MT_COLLECTIONS as $collection) {
        if (!is_array($db[$collection])) {
            $db[$collection] = [];
        }
        $db[$collection] = array_values($db[$collection]);
    }
    if (!is_array($db['submissions'])) {
        $db['submissions'] = [];
    }
    if (!is_array($db['registrations'])) {
        $db['registrations'] = [];
    }
    $db['registrations'] = array_values($db['registrations']);
    /* Older rows carried a plain-text pass token. It is never handed out, never
       printed and never needed again: drop it the moment the store is read, so
       it cannot leak through an API response or a backup. */
    foreach ($db['registrations'] as $index => $registration) {
        if (isset($db['registrations'][$index]['token'])) {
            unset($db['registrations'][$index]['token']);
        }
    }
    if (!is_array($db['site'])) {
        $db['site'] = [];
    }
    $db['revision'] = max(1, (int) ($db['revision'] ?? 1));
    $GLOBALS['MT_DB_CACHE'] = $db;
    return $db;
}

function mt_db_write(array $db): bool
{
    $db['revision'] = max(1, (int) ($db['revision'] ?? 1)) + 1;
    $db['updatedAt'] = gmdate('c');
    $db = array_replace_recursive(mt_db_defaults(), $db);

    if (!is_dir(MT_DATA)) {
        @mkdir(MT_DATA, 0775, true);
    }

    $json = json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        mt_log('Database encode failed: ' . json_last_error_msg());
        return false;
    }

    // Keep the last good copy so a bad save can always be rolled back.
    if (is_file(MT_DB_FILE)) {
        $backups = MT_DATA . '/backups';
        if (!is_dir($backups)) {
            @mkdir($backups, 0775, true);
        }
        @copy(MT_DB_FILE, $backups . '/site-' . date('Ymd-His') . '.json');
        $existing = glob($backups . '/site-*.json') ?: [];
        if (count($existing) > 20) {
            sort($existing);
            foreach (array_slice($existing, 0, count($existing) - 20) as $old) {
                @unlink($old);
            }
        }
    }

    $temp = MT_DB_FILE . '.' . bin2hex(random_bytes(4)) . '.tmp';
    if (@file_put_contents($temp, $json, LOCK_EX) === false) {
        mt_log('Database write failed (temp file).');
        return false;
    }
    if (!@rename($temp, MT_DB_FILE)) {
        @unlink($temp);
        mt_log('Database rename failed.');
        return false;
    }
    mt_db(true);
    return true;
}

/**
 * Serialise a read-modify-write cycle so two admins saving at once cannot
 * overwrite each other. Returns a callable that commits the change.
 */
function mt_db_transaction(callable $mutator)
{
    if (!is_dir(MT_DATA)) {
        @mkdir(MT_DATA, 0775, true);
    }
    $lockFile = MT_DATA . '/.store.lock';
    $handle = fopen($lockFile, 'c');
    if ($handle === false) {
        mt_fail(500, 'Could not open the data store.');
        return null;
    }
    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        mt_fail(503, 'The data store is busy. Please try again.');
        return null;
    }

    try {
        $db = mt_db(true);
        $result = $mutator($db);
        if ($result === false) {
            flock($handle, LOCK_UN);
            fclose($handle);
            return false;
        }
        if (!mt_db_write($db)) {
            mt_fail(500, 'Could not save your changes.');
        }
        flock($handle, LOCK_UN);
        fclose($handle);
        return $result;
    } catch (Throwable $error) {
        flock($handle, LOCK_UN);
        fclose($handle);
        throw $error;
    }
}

function mt_next_id(string $prefix = 'item'): string
{
    return $prefix . '-' . base_convert((string) time(), 10, 36) . '-' . bin2hex(random_bytes(3));
}

function mt_collection(string $name): bool
{
    return in_array($name, MT_COLLECTIONS, true);
}

/**
 * Whitelist + normalise one collection item. Unknown keys are dropped so the
 * dashboard can never inject arbitrary JSON into the store.
 */
function mt_sanitize_item(string $collection, array $input, array $existing = []): array
{
    $item = $existing;

    switch ($collection) {
        case 'history':
            $item['year']  = mt_clean_text($input['year'] ?? ($existing['year'] ?? ''), 80);
            $item['title'] = mt_clean_text($input['title'] ?? ($existing['title'] ?? ''), 160);
            $item['body']  = mt_clean_text($input['body'] ?? ($existing['body'] ?? ''), 600);
            break;

        case 'team':
            $item['name']       = mt_clean_text($input['name'] ?? ($existing['name'] ?? ''), 120);
            $item['role']       = mt_clean_text($input['role'] ?? ($existing['role'] ?? ''), 120);
            $item['bio']        = mt_clean_text($input['bio'] ?? ($existing['bio'] ?? ''), 500);
            $item['phone']      = mt_clean_text($input['phone'] ?? ($existing['phone'] ?? ''), 40);
            $item['email']      = mt_clean_text($input['email'] ?? ($existing['email'] ?? ''), 160);
            $item['image']      = mt_safe_image($input['image'] ?? ($existing['image'] ?? ''));
            $item['group']      = in_array(($input['group'] ?? ($existing['group'] ?? 'management')), ['management', 'heads', 'volunteers'], true)
                ? ($input['group'] ?? ($existing['group'] ?? 'management'))
                : 'management';
            $item['groupLabel'] = mt_clean_text($input['groupLabel'] ?? ($existing['groupLabel'] ?? mt_group_label($item['group'])), 80);
            $item['showOnHome'] = mt_truthy($input['showOnHome'] ?? ($existing['showOnHome'] ?? true));
            $item['order']      = (int) ($input['order'] ?? ($existing['order'] ?? 0));
            break;

        case 'events':
            $item['title']           = mt_clean_text($input['title'] ?? ($existing['title'] ?? ''), 180);
            $item['kicker']          = mt_clean_text($input['kicker'] ?? ($existing['kicker'] ?? ''), 80);
            $item['description']     = mt_clean_text($input['description'] ?? ($existing['description'] ?? ''), 1200);
            $item['image']           = mt_safe_image($input['image'] ?? ($existing['image'] ?? ''));
            $item['attachment']      = mt_safe_url($input['attachment'] ?? ($existing['attachment'] ?? ''), true);
            $item['registrationUrl'] = mt_safe_url($input['registrationUrl'] ?? ($existing['registrationUrl'] ?? ''));
            $item['published']       = mt_truthy($input['published'] ?? ($existing['published'] ?? false));

            /* The date: the month is the club calendar's, chosen from a fixed
             * list; the day and the year are typed in. Everything else about an
             * event — time, venue, notes — is free text, because an event can
             * happen anywhere. */
            $month = (int) ($input['month'] ?? ($existing['month'] ?? 0));
            $item['month'] = ($month >= 1 && $month <= 12) ? $month : (int) date('n');
            $day = (int) ($input['day'] ?? ($existing['day'] ?? 0));
            $item['day']  = ($day >= 1 && $day <= 31) ? $day : 0;
            $year = (int) ($input['year'] ?? ($existing['year'] ?? 0));
            $item['year'] = ($year >= 2000 && $year <= 2100) ? $year : (int) date('Y');
            $item['time']     = mt_clean_text($input['time'] ?? ($existing['time'] ?? ''), 60);
            $item['location'] = mt_clean_text($input['location'] ?? ($existing['location'] ?? ''), 180);
            $item['date']     = mt_event_date_display($item);

            /* Money and the payment details the pass and the QR use. */
            $item['fee']     = max(0, (float) ($input['fee'] ?? ($existing['fee'] ?? 0)));
            $item['upiId']   = mt_clean_text($input['upiId'] ?? ($existing['upiId'] ?? ''), 120);
            $item['upiName'] = mt_clean_text($input['upiName'] ?? ($existing['upiName'] ?? ''), 120);

            /* When registration opens and closes. */
            $item['registrationOpen'] = mt_truthy($input['registrationOpen'] ?? ($existing['registrationOpen'] ?? true));
            $mode = (string) ($input['windowMode'] ?? ($existing['windowMode'] ?? 'date'));
            $item['windowMode'] = in_array($mode, MT_WINDOW_MODES, true) ? $mode : 'date';
            $closesAt = mt_clean_text($input['closesAt'] ?? ($existing['closesAt'] ?? ''), 40);
            $item['closesAt'] = $closesAt;
            $hours = (int) ($input['openHours'] ?? ($existing['openHours'] ?? 24));
            $item['openHours'] = max(1, min(24, $hours > 0 ? $hours : 24));
            $openedAt = mt_clean_text($input['openedAt'] ?? ($existing['openedAt'] ?? ''), 40);
            $item['openedAt'] = $openedAt !== '' ? $openedAt : mt_now_iso();
            $item['capacity'] = max(0, (int) ($input['capacity'] ?? ($existing['capacity'] ?? 0)));

            /* Every event carries its own number. It is the club's filing
               system: photos are filed under it, and nothing from one event
               ever lands in another. New events are numbered by the API. */
            $number = (int) ($input['number'] ?? ($existing['number'] ?? 0));
            $item['number'] = max(0, $number);
            break;

        case 'gallery':
            $item['caption'] = mt_clean_text($input['caption'] ?? ($existing['caption'] ?? ''), 300);
            $item['alt']     = mt_clean_text($input['alt'] ?? ($existing['alt'] ?? ''), 300);
            /* Which event this photo belongs to. The id is the real link; the
               free-text label stays for photos that arrived before events were
               numbered. */
            $item['eventId'] = mt_clean_text($input['eventId'] ?? ($existing['eventId'] ?? ''), 80);
            $item['event']   = mt_clean_text($input['event'] ?? ($existing['event'] ?? ''), 180);
            $item['date']    = mt_clean_text($input['date'] ?? ($existing['date'] ?? ''), 80);
            $item['image']   = mt_safe_image($input['image'] ?? ($existing['image'] ?? ''));
            $item['order']   = (int) ($input['order'] ?? ($existing['order'] ?? 0));
            break;

    }

    if (empty($item['order'])) {
        $item['order'] = (int) ($existing['order'] ?? 0);
        if ($item['order'] <= 0) {
            $item['order'] = (int) substr((string) (int) (microtime(true) * 1000), -6);
        }
    }

    return $item;
}

function mt_group_label(string $group): string
{
    return match ($group) {
        'management' => 'Core Committee',
        'heads'      => 'Head Committee',
        'volunteers' => 'Volunteers',
        default      => 'Core Committee',
    };
}

function mt_truthy($value): bool
{
    if (is_bool($value)) {
        return $value;
    }
    if (is_string($value)) {
        return in_array(strtolower($value), ['1', 'true', 'on', 'yes'], true);
    }
    return (bool) $value;
}

/** Public payload: everything people may see, never the inbox. */
function mt_public_db(array $db): array
{
    $events = [];
    foreach ($db['events'] as $event) {
        $window = mt_event_window($event);
        $event['registration'] = [
            'open'     => $window['open'],
            'closesAt' => $window['closesAt'],
            'label'    => $window['label'],
            'fee'      => mt_event_fee($event),
            'seatsLeft'=> mt_event_seats_left($db, $event),
        ];
        $events[] = $event;
    }

    $public = [
        'revision'  => (int) $db['revision'],
        'updatedAt' => $db['updatedAt'] ?? gmdate('c'),
        'site'      => $db['site'],
        'history'   => $db['history'],
        'team'      => $db['team'],
        'events'    => $events,
        'gallery'   => $db['gallery'],
        'settings'  => ['frontendRegistration' => (bool) ($db['settings']['frontendRegistration'] ?? true)],
    ];
    /* Only the numbers, never the people: the registration list stays private. */
    $public['counts'] = [
        'gallery'       => count($db['gallery']),
        'team'          => count($db['team']),
        'events'        => count($db['events']),
        'registrations' => count($db['registrations']),
    ];
    return $public;
}

function mt_submission_new(array $input): array
{
    return [
        'id'          => mt_next_id('submission'),
        'type'        => (($input['type'] ?? '') === 'club-registration') ? 'club-registration' : 'membership',
        'name'        => mt_clean_text($input['name'] ?? '', 120),
        'email'       => mt_clean_text($input['email'] ?? '', 160),
        'phone'       => mt_clean_text($input['phone'] ?? '', 40),
        'course'      => mt_clean_text($input['course'] ?? '', 160),
        'year'        => mt_clean_text($input['year'] ?? '', 60),
        'event'       => mt_clean_text($input['event'] ?? '', 180),
        'interests'   => mt_clean_text($input['interests'] ?? '', 600),
        'message'     => mt_clean_text($input['message'] ?? '', 1200),
        'submittedAt' => gmdate('c'),
    ];
}
