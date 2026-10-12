<?php
/**
 * Mindful Tattva · JSON API
 * -------------------------
 * Every mutating route needs a signed-in session + CSRF token. Public routes
 * are read-only plus the two registration forms.
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

function mt_api_handle(string $route): void
{
    $method = mt_method();
    $parts  = explode('/', trim($route, '/'));
    // $parts = ['api', resource, ?id]

    if (($parts[0] ?? '') !== 'api') {
        mt_fail(404, 'Unknown endpoint.');
        return;
    }

    $resource = $parts[1] ?? '';
    $id       = $parts[2] ?? null;

    switch ($resource) {
        case 'health':
            mt_json(200, [
                'ok'       => true,
                'php'      => PHP_VERSION,
                'version'  => MT_VERSION,
                'revision' => mt_db()['revision'],
                'writable' => [
                    'data'    => is_writable(MT_DATA) || is_writable(dirname(MT_DATA)),
                    'uploads' => is_dir(MT_UPLOADS) ? is_writable(MT_UPLOADS) : is_writable(MT_ROOT),
                ],
            ]);
            return;

        case 'session':
            mt_session();
            mt_json(200, [
                'authenticated' => mt_authenticated(),
                'csrf'          => mt_csrf_token(),
                'revision'      => mt_db()['revision'],
                'club'          => (string) (mt_db()['site']['clubName'] ?? 'Mindful Tattva'),
            ]);
            return;

        case 'login':
            mt_api_login();
            return;

        case 'logout':
            mt_session();
            if ($method !== 'POST') {
                mt_fail(405, 'Method not allowed.');
                return;
            }
            mt_logout();
            mt_ok(['authenticated' => false, 'csrf' => mt_csrf_token()]);
            return;

        case 'site':
            mt_api_site($method);
            return;

        case 'submissions':
            mt_api_submissions($method, $id);
            return;

        case 'upload':
            mt_api_upload();
            return;

        case 'password':
            mt_api_password();
            return;

        case 'export':
            mt_require_auth();
            $db = mt_db(true);
            mt_json_raw(200, (string) json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), [
                'Content-Disposition' => 'attachment; filename="mindful-tattva-backup-' . date('Y-m-d-His') . '.json"',
            ]);
            return;

        case 'import':
            mt_api_import();
            return;

        case 'backups':
            mt_api_backups($method, $id);
            return;

        default:
            if (mt_collection($resource)) {
                mt_api_collection($resource, $method, $id);
                return;
            }
            mt_fail(404, 'Unknown endpoint.');
    }
}

/* -------------------------------------------------------------------------
 * Auth
 * ---------------------------------------------------------------------- */
function mt_api_login(): void
{
    if (mt_method() !== 'POST') {
        mt_fail(405, 'Method not allowed.');
        return;
    }

    $input = mt_input();
    $password = (string) ($input['password'] ?? '');

    if (!mt_throttle_check('login', 7, 600)) {
        mt_log('Login throttled for ' . mt_client_ip());
        mt_fail(429, 'Too many attempts. Please wait a few minutes and try again.');
        return;
    }

    if ($password === '' || !mt_password_ok($password)) {
        mt_throttle_hit('login');
        usleep(400000); // slow brute-force attempts down a little
        mt_fail(401, 'That club password is not correct.');
        return;
    }

    mt_throttle_clear('login');
    mt_login_success();
    mt_ok([
        'authenticated' => true,
        'csrf'          => mt_csrf_token(),
        'revision'      => mt_db(true)['revision'],
    ]);
}

/* -------------------------------------------------------------------------
 * Site copy
 * ---------------------------------------------------------------------- */
function mt_api_site(string $method): void
{
    if ($method === 'GET') {
        $db = mt_db();
        $since = isset($_GET['since']) ? (int) $_GET['since'] : null;
        if ($since !== null && $since === (int) $db['revision']) {
            mt_json(200, ['ok' => true, 'unchanged' => true, 'revision' => $since]);
            return;
        }
        mt_json(200, mt_public_db($db));
        return;
    }

    if ($method === 'PUT' || $method === 'PATCH') {
        mt_require_auth();
        $input = mt_input();
        $allowed = mt_site_field_whitelist();
        $patch = [];
        foreach ($input as $key => $value) {
            if (!in_array($key, $allowed, true)) {
                continue;
            }
            if ($key === 'stats') {
                if (is_array($value)) {
                    $stats = [];
                    foreach (array_slice($value, 0, 6) as $stat) {
                        if (!is_array($stat)) {
                            continue;
                        }
                        $stats[] = [
                            'value' => mt_clean_text($stat['value'] ?? '', 24),
                            'label' => mt_clean_text($stat['label'] ?? '', 60),
                        ];
                    }
                    $patch['stats'] = $stats;
                }
                continue;
            }
            $patch[$key] = mt_clean_text($value, 1600);
        }

        if (!$patch) {
            mt_fail(400, 'Nothing to save.');
            return;
        }

        mt_db_transaction(function (array &$db) use ($patch): array {
            $db['site'] = array_replace($db['site'], $patch);
            return ['saved' => array_keys($patch)];
        });

        mt_json(200, ['ok' => true, 'revision' => mt_db(true)['revision'], 'site' => mt_db(true)['site']]);
        return;
    }

    mt_fail(405, 'Method not allowed.');
}

function mt_site_field_whitelist(): array
{
    return [
        'clubName', 'shortName', 'logoImage', 'eyebrow', 'tagline', 'intro', 'announcement',
        'aboutHeading', 'aboutBody', 'clubDescription', 'mission', 'vision', 'memberBenefits',
        'joiningIntro', 'registrationIntro', 'contactNote', 'instagramHandle', 'instagramUrl',
        'email', 'clubPhone', 'universityName', 'department', 'address', 'universityWebsite',
        'addressSource', 'stats', 'awarenessEyebrow', 'awarenessHeading', 'awarenessIntro',
        'awarenessNote', 'galleryHeading', 'galleryIntro', 'membersHeading', 'membersIntro',
        'calendarHeading', 'calendarIntro', 'joinHeading', 'formsHeading', 'footerNote',
    ];
}

/* -------------------------------------------------------------------------
 * Collections
 * ---------------------------------------------------------------------- */
function mt_api_collection(string $collection, string $method, ?string $id): void
{
    if ($method === 'GET') {
        $db = mt_db();
        if ($id !== null) {
            foreach ($db[$collection] as $item) {
                if (($item['id'] ?? '') === $id) {
                    mt_json(200, $item);
                    return;
                }
            }
            mt_fail(404, 'That item no longer exists.');
            return;
        }
        mt_json(200, ['ok' => true, 'items' => $db[$collection], 'revision' => $db['revision']]);
        return;
    }

    mt_require_auth();
    $input = mt_input();

    if ($method === 'POST' && $id === null) {
        $result = mt_db_transaction(function (array &$db) use ($collection, $input): array {
            $item = mt_sanitize_item($collection, $input);
            $item['id'] = mt_next_id(substr($collection, 0, -1));
            $db[$collection][] = $item;
            return $item;
        });
        mt_json(201, ['ok' => true, 'item' => $result, 'revision' => mt_db(true)['revision']]);
        return;
    }

    if (($method === 'PUT' || $method === 'PATCH') && $id !== null) {
        $found = false;
        $result = mt_db_transaction(function (array &$db) use ($collection, $id, $input, &$found) {
            foreach ($db[$collection] as $index => $existing) {
                if (($existing['id'] ?? '') !== $id) {
                    continue;
                }
                $found = true;
                $item = mt_sanitize_item($collection, $input, $existing);
                $item['id'] = $id;
                $db[$collection][$index] = $item;
                return $item;
            }
            return false;
        });

        if (!$found) {
            mt_fail(404, 'That item no longer exists.');
            return;
        }
        mt_json(200, ['ok' => true, 'item' => $result, 'revision' => mt_db(true)['revision']]);
        return;
    }

    if ($method === 'DELETE' && $id !== null) {
        $removed = false;
        mt_db_transaction(function (array &$db) use ($collection, $id, &$removed) {
            foreach ($db[$collection] as $index => $existing) {
                if (($existing['id'] ?? '') === $id) {
                    array_splice($db[$collection], $index, 1);
                    $removed = true;
                    break;
                }
            }
            return true;
        });
        if (!$removed) {
            mt_fail(404, 'That item no longer exists.');
            return;
        }
        mt_json(200, ['ok' => true, 'revision' => mt_db(true)['revision']]);
        return;
    }

    mt_fail(405, 'Method not allowed.');
}

/* -------------------------------------------------------------------------
 * Registrations / contact forms
 * ---------------------------------------------------------------------- */
function mt_api_submissions(string $method, ?string $id): void
{
    if ($method === 'POST' && $id === null) {
        if (!mt_throttle_check('submit', 12, 300)) {
            mt_fail(429, 'That is a lot of submissions at once — please try again shortly.');
            return;
        }
        $input = mt_input();
        $item  = mt_submission_new($input);

        $errors = [];
        if ($item['name'] === '') {
            $errors[] = 'name';
        }
        if (!filter_var($item['email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'email';
        }
        $digits = preg_replace('/\D+/', '', $item['phone']) ?? '';
        if (strlen($digits) < 8) {
            $errors[] = 'phone';
        }
        if ($errors) {
            mt_json(422, ['ok' => false, 'error' => 'Please add a valid name, email address and phone number.', 'fields' => $errors]);
            return;
        }

        // Silently drop obvious spam bots that fill the hidden field.
        if (trim((string) ($input['website'] ?? '')) !== '') {
            mt_ok(['ok' => true, 'id' => 'ignored']);
            return;
        }

        mt_throttle_hit('submit');
        mt_db_transaction(function (array &$db) use ($item): array {
            array_unshift($db['submissions'], $item);
            $db['submissions'] = array_slice($db['submissions'], 0, 2000);
            return $item;
        });
        mt_json(201, ['ok' => true, 'id' => $item['id']]);
        return;
    }

    mt_require_auth();

    if ($method === 'GET') {
        $db = mt_db();
        mt_json(200, ['ok' => true, 'items' => $db['submissions'], 'count' => count($db['submissions'])]);
        return;
    }

    if ($method === 'DELETE' && $id !== null) {
        $removed = false;
        mt_db_transaction(function (array &$db) use ($id, &$removed) {
            foreach ($db['submissions'] as $index => $existing) {
                if (($existing['id'] ?? '') === $id) {
                    array_splice($db['submissions'], $index, 1);
                    $removed = true;
                    break;
                }
            }
            return true;
        });
        if (!$removed) {
            mt_fail(404, 'That registration was not found.');
            return;
        }
        mt_ok(['revision' => mt_db(true)['revision']]);
        return;
    }

    // Bulk clear, used by the dashboard with explicit confirmation.
    if ($method === 'DELETE' && $id === null) {
        mt_db_transaction(function (array &$db): array {
            $db['submissions'] = [];
            return true;
        });
        mt_ok(['revision' => mt_db(true)['revision']]);
        return;
    }

    mt_fail(405, 'Method not allowed.');
}

/* -------------------------------------------------------------------------
 * Uploads — small photos and PDFs only
 * ---------------------------------------------------------------------- */
function mt_api_upload(): void
{
    if (mt_method() !== 'POST') {
        mt_fail(405, 'Method not allowed.');
        return;
    }
    mt_require_auth();

    $maxBytes = (int) (mt_config()['max_upload_bytes'] ?? 4 * 1024 * 1024);
    $kind  = strtolower((string) ($_POST['kind'] ?? (mt_input()['kind'] ?? 'image')));
    $error = null;
    $tmp   = '';
    $original = '';

    if (!empty($_FILES['file']) && is_array($_FILES['file'])) {
        $file = $_FILES['file'];
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            mt_fail(400, 'The upload did not complete. Please try again.');
            return;
        }
        $tmp      = (string) ($file['tmp_name'] ?? '');
        $original = (string) ($file['name'] ?? 'upload');
        if (filesize($tmp) > $maxBytes) {
            mt_fail(413, 'That file is larger than ' . round($maxBytes / 1048576, 1) . 'MB. Please compress it first.');
            return;
        }
    } else {
        $input = mt_input();
        $dataUrl = (string) ($input['dataUrl'] ?? '');
        if (preg_match('#^data:([a-z0-9/+.\-]+);base64,(.+)$#is', $dataUrl, $m)) {
            $decoded = base64_decode(preg_replace('/\s+/', '', $m[2]) ?? '', true);
            if ($decoded === false || strlen($decoded) > $maxBytes) {
                mt_fail(413, 'That image could not be read or is too large.');
                return;
            }
            $tmp = tempnam(sys_get_temp_dir(), 'mtupload');
            if ($tmp === false) {
                mt_fail(500, 'The server could not accept the upload.');
                return;
            }
            file_put_contents($tmp, $decoded);
            $original = 'pasted-image';
        } else {
            mt_fail(400, 'No file was uploaded.');
            return;
        }
    }

    $info  = @getimagesize($tmp);
    $isPdf = false;
    if ($info === false) {
        $head  = (string) @file_get_contents($tmp, false, null, 0, 5);
        $isPdf = str_starts_with($head, '%PDF');
    }

    $allowedImages = [
        IMAGETYPE_JPEG => 'jpg',
        IMAGETYPE_PNG  => 'png',
        IMAGETYPE_WEBP => 'webp',
        IMAGETYPE_GIF  => 'gif',
    ];

    if ($kind === 'pdf') {
        if (!$isPdf) {
            @unlink($tmp);
            mt_fail(415, 'That file is not a PDF.');
            return;
        }
        $extension = 'pdf';
    } else {
        if ($info === false || !isset($allowedImages[(int) $info[2]])) {
            @unlink($tmp);
            mt_fail(415, 'Please choose a JPG, PNG, WEBP or GIF image.');
            return;
        }
        $extension = $allowedImages[(int) $info[2]];
    }

    $folder = MT_UPLOADS . '/' . date('Y') . '/' . date('m');
    if (!is_dir($folder) && !@mkdir($folder, 0775, true)) {
        @unlink($tmp);
        mt_fail(500, 'The uploads folder is not writable.');
        return;
    }

    $name = date('Ymd') . '-' . bin2hex(random_bytes(5)) . '.' . $extension;
    $target = $folder . '/' . $name;
    if (!@rename($tmp, $target) && !@copy($tmp, $target)) {
        @unlink($tmp);
        mt_fail(500, 'The upload could not be stored.');
        return;
    }
    @unlink($tmp);
    @chmod($target, 0644);

    mt_json(201, [
        'ok'       => true,
        'url'      => '/uploads/' . date('Y') . '/' . date('m') . '/' . $name,
        'bytes'    => filesize($target),
        'kind'     => $kind === 'pdf' ? 'pdf' : 'image',
        'original' => substr($original, 0, 120),
        'revision' => mt_db(true)['revision'],
    ]);
    return;
}

/* -------------------------------------------------------------------------
 * Backups
 * ---------------------------------------------------------------------- */
function mt_api_backups(string $method, ?string $id): void
{
    mt_require_auth();
    $folder = MT_DATA . '/backups';

    if ($method === 'GET') {
        $files = [];
        foreach (glob($folder . '/site-*.json') ?: [] as $file) {
            $files[] = [
                'name'  => basename($file),
                'bytes' => filesize($file),
                'taken' => date('Y-m-d H:i', (int) filemtime($file)),
            ];
        }
        usort($files, static fn($a, $b) => strcmp($b['name'], $a['name']));
        mt_json(200, ['ok' => true, 'items' => $files, 'current' => mt_db(true)['revision']]);
        return;
    }

    if ($method === 'POST' && $id === 'restore') {
        $input = mt_input();
        $name = basename((string) ($input['name'] ?? ''));
        $file = $folder . '/' . $name;
        if (!preg_match('/^site-\d{8}-\d{6}\.json$/', $name) || !is_file($file)) {
            mt_fail(404, 'That backup was not found.');
            return;
        }
        $decoded = json_decode((string) file_get_contents($file), true);
        if (!is_array($decoded)) {
            mt_fail(422, 'That backup file is damaged.');
            return;
        }
        mt_db_write($decoded);
        mt_ok(['restored' => $name, 'revision' => mt_db(true)['revision']]);
        return;
    }

    mt_fail(405, 'Method not allowed.');
}

function mt_api_import(): void
{
    if (mt_method() !== 'POST') {
        mt_fail(405, 'Method not allowed.');
        return;
    }
    mt_require_auth();

    $input = mt_input();
    $payload = $input['db'] ?? $input;
    if (!is_array($payload) || !isset($payload['site'])) {
        mt_fail(422, 'That does not look like a Mindful Tattva backup file.');
        return;
    }

    $clean = mt_db_defaults();
    $clean['site'] = is_array($payload['site']) ? $payload['site'] : [];
    foreach (MT_COLLECTIONS as $collection) {
        foreach ((array) ($payload[$collection] ?? []) as $item) {
            if (is_array($item)) {
                $clean[$collection][] = mt_sanitize_item($collection, $item);
            }
        }
    }
    foreach ((array) ($payload['submissions'] ?? []) as $item) {
        if (is_array($item)) {
            $clean['submissions'][] = $item;
        }
    }

    mt_db_write($clean);
    mt_ok(['imported' => true, 'revision' => mt_db(true)['revision']]);
}

/* -------------------------------------------------------------------------
 * Password change (written to data/config.php)
 * ---------------------------------------------------------------------- */
function mt_api_password(): void
{
    if (mt_method() !== 'POST') {
        mt_fail(405, 'Method not allowed.');
        return;
    }
    mt_require_auth();

    $input    = mt_input();
    $current  = (string) ($input['current'] ?? '');
    $password = (string) ($input['password'] ?? '');

    if (!mt_password_ok($current)) {
        mt_fail(403, 'The current password is not correct.');
        return;
    }
    if (strlen($password) < 6) {
        mt_fail(422, 'Please use at least 6 characters.');
        return;
    }

    $config = mt_config(true);
    $config['admin_password_hash'] = password_hash($password, PASSWORD_DEFAULT);
    unset($config['admin_password']);

    if (!mt_write_config($config)) {
        mt_fail(500, 'The password could not be saved. Is the data folder writable?');
        return;
    }

    mt_log('Admin password changed from ' . mt_client_ip());
    mt_ok(['updated' => true]);
}

function mt_write_config(array $config): bool
{
    if (!is_dir(MT_DATA)) {
        @mkdir(MT_DATA, 0775, true);
    }
    $body = "<?php\n"
        . "/**\n"
        . " * Mindful Tattva · local settings\n"
        . " * Keep this file out of version control on a live server.\n"
        . " */\n\n"
        . "return " . var_export($config, true) . ";\n";

    $temp = MT_DATA . '/config.php.' . bin2hex(random_bytes(4)) . '.tmp';
    if (@file_put_contents($temp, $body, LOCK_EX) === false) {
        return false;
    }
    @chmod($temp, 0640);
    if (!@rename($temp, MT_DATA . '/config.php')) {
        @unlink($temp);
        return false;
    }
    return true;
}
