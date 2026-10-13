<?php
/**
 * Mindful Tattva · PHP backend bootstrap
 * --------------------------------------
 * Small, dependency-free foundation: paths, error handling, json helpers,
 * sessions, CSRF, rate limiting and tiny view/asset helpers.
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

if (!defined('MT_VERSION')) {
    define('MT_VERSION', '2.0.0');
    define('MT_ROOT', dirname(__DIR__));
    define('MT_APP', MT_ROOT . '/app');
    define('MT_VIEWS', MT_ROOT . '/views');
    define('MT_DATA', MT_ROOT . '/data');
    define('MT_UPLOADS', MT_ROOT . '/uploads');
    define('MT_ASSETS', MT_ROOT . '/assets');
    define('MT_DB_FILE', MT_DATA . '/site.json');
    define('MT_LOG_DIR', MT_DATA . '/logs');
    define('MT_SESSION_NAME', 'mt_admin');
    define('MT_SESSION_HOURS', 12);
    /* A dashboard session dies after 12 quiet hours, and in any case after a
       full day — a forgotten browser on a shared computer cannot stay open. */
    define('MT_SESSION_MAX_HOURS', 24);
}

/* -------------------------------------------------------------------------
 * Multibyte fallbacks — the site must run on hosts without ext-mbstring.
 * ---------------------------------------------------------------------- */
if (!function_exists('mb_strlen')) {
    function mb_strlen($string, ?string $encoding = null): int
    {
        $chars = preg_split('//u', (string) $string, -1, PREG_SPLIT_NO_EMPTY);
        return $chars === false ? strlen((string) $string) : count($chars);
    }
}

if (!function_exists('mb_substr')) {
    function mb_substr($string, int $start, ?int $length = null, ?string $encoding = null): string
    {
        $chars = preg_split('//u', (string) $string, -1, PREG_SPLIT_NO_EMPTY);
        if ($chars === false) {
            return (string) substr((string) $string, $start, $length ?? PHP_INT_MAX);
        }
        return implode('', array_slice($chars, $start, $length));
    }
}

if (!function_exists('mb_strtoupper')) {
    function mb_strtoupper($string, ?string $encoding = null): string
    {
        return preg_replace_callback('/[a-z]/', static fn(array $m): string => strtoupper($m[0]), (string) $string) ?? (string) $string;
    }
}

if (!function_exists('mb_strtolower')) {
    function mb_strtolower($string, ?string $encoding = null): string
    {
        return preg_replace_callback('/[A-Z]/', static fn(array $m): string => strtolower($m[0]), (string) $string) ?? (string) $string;
    }
}

require_once MT_APP . '/store.php';
require_once MT_APP . '/health.php';
require_once MT_APP . '/events.php';
require_once MT_APP . '/qr.php';
require_once MT_APP . '/passes.php';
require_once MT_APP . '/cards.php';
require_once MT_APP . '/pages.php';
require_once MT_APP . '/api.php';

/* -------------------------------------------------------------------------
 * Error handling: never leak stack traces to visitors, always log them.
 * ---------------------------------------------------------------------- */
function mt_boot(): void
{
    // Only the test harness turns warnings into hard failures.
    $testing = defined('MT_TEST');

    if (!$testing) {
        ini_set('display_errors', '0');
        ini_set('display_startup_errors', '0');
        error_reporting(E_ALL);
    } else {
        error_reporting(E_ALL);
    }

    if (!is_dir(MT_LOG_DIR)) {
        @mkdir(MT_LOG_DIR, 0775, true);
    }
    ini_set('log_errors', '1');
    ini_set('error_log', MT_LOG_DIR . '/php-error.log');

    set_error_handler(static function (int $severity, string $message, string $file = '', int $line = 0): bool {
        if (!(error_reporting() & $severity)) {
            return false;
        }
        // While testing, surface everything. On a live server, log and carry on
        // so one stray warning can never take a page down.
        $critical = in_array($severity, [E_USER_ERROR, E_RECOVERABLE_ERROR, E_CORE_ERROR, E_COMPILE_ERROR], true);
        if (defined('MT_TEST') || $critical) {
            throw new ErrorException($message, 0, $severity, $file, $line);
        }
        mt_log('PHP ' . $severity . ': ' . $message . ' @ ' . $file . ':' . $line);
        return true;
    });

    set_exception_handler(static function (Throwable $error): void {
        mt_log('Uncaught: ' . $error->getMessage() . ' @ ' . $error->getFile() . ':' . $error->getLine());
        mt_fail(500, 'Something went wrong on the server.');
    });

    register_shutdown_function(static function (): void {
        $error = error_get_last();
        if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
            mt_log('Fatal: ' . $error['message'] . ' @ ' . $error['file'] . ':' . $error['line']);
            if (!headers_sent() && !mt_is_html_done()) {
                mt_fail(500, 'Something went wrong on the server.');
            }
        }
    });
}

function mt_is_html_done(): bool
{
    if (mt_headless()) {
        return !empty($GLOBALS['MT_HTML_SENT']);
    }
    return headers_sent();
}

function mt_log(string $message): void
{
    if (!is_dir(MT_LOG_DIR)) {
        @mkdir(MT_LOG_DIR, 0775, true);
    }
    @file_put_contents(
        MT_LOG_DIR . '/app.log',
        '[' . date('Y-m-d H:i:s') . '] ' . $message . PHP_EOL,
        FILE_APPEND
    );
}

/* -------------------------------------------------------------------------
 * Requests & output
 * ---------------------------------------------------------------------- */
if (!class_exists('MT_StopSignal', false)) {
    /**
     * Thrown instead of calling exit() while the test harness is running, so a
     * finished response can never fall through into more rendering.
     */
    class MT_StopSignal extends RuntimeException
    {
    }
}

/** Finish the current response for good. */
function mt_stop(): void
{
    mt_session_flush();
    if (mt_headless()) {
        throw new MT_StopSignal('response-sent');
    }
    exit;
}

/** True when an external runner (preview server / test harness) owns the response. */
function mt_headless(): bool
{
    return defined('MT_HEADLESS') || defined('MT_TEST');
}

function mt_header(string $name, string $value): void
{
    if (mt_headless()) {
        $GLOBALS['MT_TEST_HEADERS'][] = [$name, $value];
        return;
    }
    header($name . ': ' . $value, true);
}

function mt_json_raw(int $status, string $body, array $extraHeaders = []): void
{
    if (mt_headless()) {
        $GLOBALS['MT_TEST_STATUS'] = $status;
        // Report the real headers to the runner. Without this the preview server
        // falls back to text/html for every JSON, robots.txt and sitemap.xml
        // response — and a browser left to guess at the type may sniff it.
        $GLOBALS['MT_TEST_HEADERS'][] = ['Content-Type', 'application/json; charset=utf-8'];
        $GLOBALS['MT_TEST_HEADERS'][] = ['Cache-Control', 'no-store, max-age=0'];
        $GLOBALS['MT_TEST_HEADERS'][] = ['X-Content-Type-Options', 'nosniff'];
        // Extra headers are appended last so an explicit type wins.
        foreach ($extraHeaders as $name => $value) {
            $GLOBALS['MT_TEST_HEADERS'][] = [(string) $name, (string) $value];
        }
    } elseif (!headers_sent()) {
        http_response_code($status);
        mt_header('Content-Type', 'application/json; charset=utf-8');
        mt_header('Cache-Control', 'no-store, max-age=0');
        foreach ($extraHeaders as $name => $value) {
            mt_header((string) $name, (string) $value);
        }
    }
    echo $body;
    mt_stop();
}

function mt_json(int $status, $payload, array $extraHeaders = []): void
{
    $flags = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;
    $body  = json_encode($payload, $flags);
    if ($body === false) {
        $body = '{"error":"Could not encode response"}';
        $status = 500;
    }
    mt_json_raw($status, $body, $extraHeaders);
}

function mt_ok($payload = null, int $status = 200): void
{
    mt_json($status, $payload === null ? ['ok' => true] : $payload);
}

function mt_fail(int $status, string $message): void
{
    mt_json($status, ['ok' => false, 'error' => $message]);
}

/** Read the JSON body of a request (falls back to form encoding). */
/** Send the visitor to another page and stop. */
function mt_redirect(string $url, int $status = 303): void
{
    if (mt_headless()) {
        $GLOBALS['MT_TEST_STATUS'] = $status;
        $GLOBALS['MT_TEST_HEADERS'][] = ['Location', $url];
        $GLOBALS['MT_HTML_SENT'] = true;
        mt_stop();
    }
    if (!headers_sent()) {
        http_response_code($status);
        header('Location: ' . $url, true, $status);
    }
    echo 'Redirecting to ' . e($url) . '…';
    mt_stop();
}

function mt_input(): array
{
    if (isset($GLOBALS['MT_INPUT_CACHE']) && is_array($GLOBALS['MT_INPUT_CACHE'])) {
        return $GLOBALS['MT_INPUT_CACHE'];
    }

    $raw = $GLOBALS['MT_RAW_BODY'] ?? file_get_contents('php://input');
    $raw = is_string($raw) ? $raw : '';
    $data = [];

    if ($raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $data = $decoded;
        } elseif (!empty($_POST)) {
            $data = $_POST;
        }
    } elseif (!empty($_POST)) {
        $data = $_POST;
    }

    $GLOBALS['MT_INPUT_CACHE'] = $data;
    return $data;
}

function mt_method(): string
{
    $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
    $override = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] ?? (mt_input()['_method'] ?? null);
    if (in_array($method, ['POST', 'PUT', 'PATCH'], true) && is_string($override)) {
        $override = strtoupper($override);
        if (in_array($override, ['PUT', 'PATCH', 'DELETE'], true)) {
            return $override;
        }
    }
    return $method;
}

function mt_route(): string
{
    $uri = (string) ($_SERVER['REQUEST_URI'] ?? '/');
    $path = parse_url($uri, PHP_URL_PATH);
    $path = is_string($path) ? $path : '/';

    // Support installs inside a sub-directory (e.g. /club/…).
    $base = rtrim(str_replace('\\', '/', dirname((string) ($_SERVER['SCRIPT_NAME'] ?? '/'))), '/');
    if ($base !== '' && $base !== '/' && str_starts_with($path, $base)) {
        $path = substr($path, strlen($base));
    }

    $path = trim(rawurldecode($path), '/');
    return $path === '' ? 'home' : $path;
}

/** Static file pass-through for the PHP built-in server. */
function mt_is_static_file(string $route): bool
{
    if ($route === '') {
        return false;
    }
    $candidate = realpath(MT_ROOT . '/' . $route);
    if ($candidate === false || !is_file($candidate)) {
        return false;
    }
    if (!str_starts_with($candidate, MT_ROOT . DIRECTORY_SEPARATOR)) {
        return false;
    }
    return (bool) preg_match('#\.(css|js|mjs|png|jpe?g|webp|gif|svg|ico|pdf|woff2?|ttf|txt|map|json|mp4|m4v|mov|webm)$#i', $candidate);
}

/* -------------------------------------------------------------------------
 * Sessions, auth, CSRF
 * ---------------------------------------------------------------------- */
function mt_session(): void
{
    // An external adapter (see tools/preview-server.mjs) hands over the visitor's
    // session exactly once per request. It also keeps the site working on hosts
    // without ext-session, where PHP cannot start a real session at all.
    if (isset($GLOBALS['MT_SESSION_ADAPTER']) && is_array($GLOBALS['MT_SESSION_ADAPTER'])) {
        $_SESSION = $GLOBALS['MT_SESSION_ADAPTER'];
        unset($GLOBALS['MT_SESSION_ADAPTER']);
        return;
    }

    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    if (!mt_headless()) {
        if (!is_dir(MT_DATA . '/sessions')) {
            @mkdir(MT_DATA . '/sessions', 0775, true);
        }
        // Session settings can only change before any output has been flushed.
        if (!headers_sent()) {
            if (is_dir(MT_DATA . '/sessions') && is_writable(MT_DATA . '/sessions')) {
                session_save_path(MT_DATA . '/sessions');
            }
            session_name(MT_SESSION_NAME);
            session_set_cookie_params([
                'lifetime' => MT_SESSION_HOURS * 3600,
                'path'     => '/',
                'httponly' => true,
                'samesite' => 'Lax',
                'secure'   => !empty($_SERVER['HTTPS']),
            ]);
        }
        session_start();
        return;
    }

    // Headless runners own the cookies, so they supply the session state once.
    if (session_status() !== PHP_SESSION_ACTIVE) {
        @session_start();
    }
    if (!empty($GLOBALS['MT_TEST_SESSION']) && is_array($GLOBALS['MT_TEST_SESSION'])) {
        $_SESSION = $GLOBALS['MT_TEST_SESSION'];
        unset($GLOBALS['MT_TEST_SESSION']);
    }
}

/** Hand the session back to an adapter so it can be stored between requests. */
function mt_session_flush(): void
{
    $save = $GLOBALS['MT_SESSION_SAVE'] ?? null;
    if (is_callable($save) && is_array($_SESSION ?? null)) {
        $save($_SESSION);
    }
    /* Headless runners (the preview server and the test suite) own their own
       session store, so they are handed the state the request ended with. */
    if (is_array($_SESSION ?? null)) {
        $GLOBALS['MT_SESSION_OUT'] = $_SESSION;
    }
}

function mt_csrf_token(): string
{
    mt_session();
    if (empty($_SESSION['csrf']) || !is_string($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(24));
        mt_session_flush();
    }
    return $_SESSION['csrf'];
}

function mt_csrf_ok(?string $token): bool
{
    mt_session();
    $expected = $_SESSION['csrf'] ?? null;
    return is_string($expected) && is_string($token) && $token !== '' && hash_equals($expected, $token);
}

function mt_config(bool $fresh = false): array
{
    if ($fresh) {
        $GLOBALS['MT_CONFIG_CACHE'] = null;
    }
    if (!empty($GLOBALS['MT_CONFIG_CACHE']) && is_array($GLOBALS['MT_CONFIG_CACHE'])) {
        return $GLOBALS['MT_CONFIG_CACHE'];
    }
    $file = MT_DATA . '/config.php';
    $config = [];
    if (is_file($file)) {
        /** @noinspection PhpIncludeInspection */
        $loaded = include $file;
        if (is_array($loaded)) {
            $config = $loaded;
        }
    }
    if (!empty($_SERVER['MT_ADMIN_PASSWORD'])) {
        $config['admin_password'] = (string) $_SERVER['MT_ADMIN_PASSWORD'];
    }
    $GLOBALS['MT_CONFIG_CACHE'] = $config;
    return $config;
}

function mt_password_ok(string $password): bool
{
    $config = mt_config();
    $hash = (string) ($config['admin_password_hash'] ?? '');
    if ($hash !== '' && password_verify($password, $hash)) {
        return true;
    }
    $plain = (string) ($config['admin_password'] ?? '');
    if ($plain !== '' && hash_equals($plain, $password)) {
        return true;
    }
    return false;
}

function mt_authenticated(): bool
{
    mt_session();
    if (empty($_SESSION['auth']) || $_SESSION['auth'] !== true) {
        return false;
    }

    // 1. twelve quiet hours, or a full day in total, whichever comes first
    $seen = (int) ($_SESSION['seen'] ?? 0);
    if ($seen > 0 && (time() - $seen) > MT_SESSION_HOURS * 3600) {
        mt_logout();
        return false;
    }
    $started = (int) ($_SESSION['started'] ?? $seen);
    if ($started > 0 && (time() - $started) > MT_SESSION_MAX_HOURS * 3600) {
        mt_logout();
        return false;
    }

    // 2. the session has to belong to this device and this password generation
    $expected = (string) ($_SESSION['fingerprint'] ?? '');
    if ($expected === '' || !hash_equals($expected, mt_session_fingerprint())) {
        mt_logout();
        return false;
    }

    $_SESSION['seen'] = time();
    return true;
}

function mt_require_auth(): void
{
    if (!mt_authenticated()) {
        mt_fail(401, 'Please sign in to the club dashboard first.');
    }

    /* Plain reads are protected by the session alone. The dashboard downloads
       the register and the backup with ordinary links, and a link cannot send
       a header — asking for the token there answered every download with
       "your session expired". Anything that changes what the club has stored
       still has to carry the token. */
    if (!in_array(strtoupper(mt_method()), ['GET', 'HEAD', 'OPTIONS'], true)) {
        mt_require_csrf();
    }
}

function mt_require_csrf(): void
{
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? (mt_input()['csrf'] ?? null);
    if (!mt_csrf_ok(is_string($token) ? $token : null)) {
        mt_fail(419, 'Your session expired. Please refresh the dashboard and try again.');
    }
}

/**
 * Stamp a session with the device that signed in, so a copied cookie is not a
 * key all by itself.
 *
 * The stamp is the browser's user-agent plus the club's current session
 * generation. It is stable for the device that signed in — the club is never
 * locked out mid-evening — but a cookie copied to another device, or one left
 * over from before a password change, stops working.
 */
function mt_session_fingerprint(): string
{
    $agent = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');
    return hash('sha256', 'mindful-tattva-session|' . $agent . '|' . mt_session_generation());
}

/** Bumping this number (on a password change) signs every device out. */
function mt_session_generation(): int
{
    return max(1, (int) (mt_config()['session_generation'] ?? 1));
}

function mt_login_success(): void
{
    mt_session();
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_regenerate_id(true);
    }
    $_SESSION['auth'] = true;
    $_SESSION['seen'] = time();
    $_SESSION['started'] = time();
    $_SESSION['fingerprint'] = mt_session_fingerprint();
    $_SESSION['csrf'] = bin2hex(random_bytes(24));
    mt_session_flush();
}

function mt_logout(): void
{
    mt_session();
    unset($_SESSION['auth'], $_SESSION['seen'], $_SESSION['started'], $_SESSION['fingerprint']);
    $_SESSION['csrf'] = bin2hex(random_bytes(24));
    mt_session_flush();
}

/** Very small file-backed throttle: 7 failed attempts per IP per 10 minutes. */
function mt_throttle_check(string $bucket, int $limit, int $windowSeconds): bool
{
    $file = MT_DATA . '/logs/throttle.json';
    $now = time();
    $data = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
    $key = $bucket . '|' . mt_client_ip();
    $hits = array_values(array_filter((array) ($data[$key] ?? []), static fn($t) => ($now - (int) $t) < $windowSeconds));
    $data[$key] = $hits;
    foreach (array_keys($data) as $existing) {
        if (empty($data[$existing])) {
            unset($data[$existing]);
        }
    }
    $data['_seen'] = $now;
    @file_put_contents($file, json_encode($data), LOCK_EX);
    return count($hits) < $limit;
}

function mt_throttle_hit(string $bucket): void
{
    $file = MT_DATA . '/logs/throttle.json';
    if (!is_dir(dirname($file))) {
        @mkdir(dirname($file), 0775, true);
    }
    $data = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
    $key = $bucket . '|' . mt_client_ip();
    $data[$key] = array_values(array_filter((array) ($data[$key] ?? []), static fn($t) => (time() - (int) $t) < 600));
    $data[$key][] = time();
    @file_put_contents($file, json_encode($data), LOCK_EX);
}

function mt_throttle_clear(string $bucket): void
{
    $file = MT_DATA . '/logs/throttle.json';
    if (!is_file($file)) {
        return;
    }
    $data = json_decode((string) @file_get_contents($file), true);
    if (!is_array($data)) {
        return;
    }
    unset($data[$bucket . '|' . mt_client_ip()]);
    @file_put_contents($file, json_encode($data), LOCK_EX);
}

function mt_client_ip(): string
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    return substr($ip, 0, 45);
}

/* -------------------------------------------------------------------------
 * Tiny helpers
 * ---------------------------------------------------------------------- */
function e($value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Escape + keep a safe subset of inline markup out of user text. */
function mt_clean_text($value, int $maxLength = 4000): string
{
    $text = (string) $value;
    $text = str_replace(["\r\n", "\r"], "\n", $text);
    $text = preg_replace('/[^\P{C}\n]+/u', '', $text) ?? '';
    // Content is plain text everywhere, so never store markup: complete HTML
    // tags are removed on the way in (and every output is escaped again).
    $text = preg_replace('#</?[a-zA-Z][^>]*>#', '', $text) ?? $text;
    $text = trim($text);
    return mb_substr($text, 0, $maxLength);
}

/** Accept only http(s)/data-image/relative asset URLs. */
function mt_safe_url(?string $value, bool $allowData = false): string
{
    $url = trim((string) $value);
    if ($url === '') {
        return '';
    }
    if (preg_match('#^(https?://|mailto:|tel:)#i', $url)) {
        return $url;
    }
    if ($allowData && preg_match('#^data:image/(png|jpe?g|webp|gif|svg\+xml);base64,[a-z0-9+/=\s]+$#i', $url)) {
        return $url;
    }
    if (preg_match('#^/[A-Za-z0-9._/\-]*$#', $url) && strpos($url, '..') === false) {
        return $url;
    }
    return '';
}

function mt_safe_image(?string $value): string
{
    return mt_safe_url($value, true);
}
