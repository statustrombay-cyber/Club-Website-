<?php
/**
 * Mindful Tattva · view rendering + asset inlining
 * ------------------------------------------------
 * Pages are plain PHP templates. The finished HTML is post-processed so every
 * stylesheet and script is inlined into the document — one request, no missing
 * assets, works in previews, block-storage hosts and even offline.
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

function mt_render(string $template, array $vars = []): string
{
    $file = MT_VIEWS . '/' . ltrim($template, '/') . '.php';
    if (!is_file($file)) {
        mt_log('Missing template: ' . $template);
        return '';
    }
    extract($vars, EXTR_SKIP);
    ob_start();
    try {
        include $file;
    } catch (Throwable $error) {
        ob_end_clean();
        throw $error;
    }
    return (string) ob_get_clean();
}

/** A full page = view + layout, with every local asset inlined. */
function mt_page(string $template, array $vars = []): string
{
    $db   = mt_db();
    $vars = array_replace([
        'site'  => $db['site'],
        'db'    => $db,
        'route' => mt_route(),
        'year'  => date('Y'),
    ], $vars);

    $vars['content'] = mt_render($template, $vars);
    $html = mt_render('layout', $vars);
    return mt_inline_assets($html);
}

/** Replace <link>/<script> references to local files with their contents. */
function mt_inline_assets(string $html): string
{
    $html = preg_replace_callback(
        '#<link\s+rel="stylesheet"\s+href="([^"]+)"\s*/?>#i',
        static function (array $m): string {
            $path = mt_local_asset_path($m[1]);
            if ($path !== null) {
                return '<style>' . "\n" . (string) file_get_contents($path) . "\n" . '</style>';
            }
            /* The main stylesheet belongs to the site but is not on this server
             * (usually a half-finished upload): fall back to the built-in
             * baseline so visitors get a readable page instead of raw HTML. */
            if (mt_is_main_stylesheet($m[1])) {
                mt_log('Missing stylesheet, using the built-in baseline: ' . $m[1]);
                return '<style id="mt-baseline">' . "\n" . mt_baseline_css() . "\n" . '</style>';
            }
            return $m[0];
        },
        $html
    ) ?? $html;

    $html = preg_replace_callback(
        '#<script\s+src="([^"]+)"([^>]*)></script>#i',
        static function (array $m): string {
            $path = mt_local_asset_path($m[1]);
            if ($path === null) {
                return $m[0];
            }
            $attributes = trim((string) $m[2]);
            $keep = '';
            if (stripos($attributes, 'defer') !== false) {
                $keep .= ' defer';
            }
            return '<script' . $keep . '>' . "\n" . (string) file_get_contents($path) . "\n" . '</script>';
        },
        $html
    ) ?? $html;

    return $html;
}

function mt_local_asset_path(string $url): ?string
{
    $clean = parse_url($url, PHP_URL_PATH);
    if (!is_string($clean) || $clean === '') {
        return null;
    }
    if (!str_starts_with($clean, '/assets/')) {
        return null;
    }
    $candidate = realpath(MT_ROOT . $clean);
    if ($candidate === false || !is_file($candidate)) {
        return null;
    }
    if (!str_starts_with($candidate, MT_ASSETS . DIRECTORY_SEPARATOR)) {
        return null;
    }
    return $candidate;
}

/** Is this the site's own main stylesheet (the one the baseline stands in for)? */
function mt_is_main_stylesheet(string $url): bool
{
    $clean = parse_url($url, PHP_URL_PATH);
    return is_string($clean) && $clean === '/assets/app.css';
}

/**
 * A small built-in baseline, used only when assets/app.css cannot be read on
 * the server. It is not the design — it simply keeps the page legible, warm and
 * obviously "ours" instead of a blank sheet of raw HTML.
 */
function mt_baseline_css(): string
{
    return <<<'CSS'
/* Built-in baseline: assets/app.css was not found on this server.
   Upload the assets folder to get the real design — see /health. */
:root { --ink:#2b2422; --ink-soft:#6c625d; --plum:#4e3155; --plum-deep:#34213d;
  --terracotta:#c86f58; --cream:#f9f5f0; --sand:#f1e8df; --paper:#fff;
  --line:rgba(78,49,85,.14); --font-display:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --font-body:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif; }
*,*::before,*::after { box-sizing:border-box; }
body { margin:0; background:var(--cream); color:var(--ink); font:17px/1.7 var(--font-body); }
img,video { max-width:100%; height:auto; }
h1,h2,h3,h4 { font-family:var(--font-display); line-height:1.2; color:var(--plum-deep); margin:0 0 .5em; }
h1 { font-size:clamp(1.9rem,4.4vw,3rem); } h2 { font-size:clamp(1.5rem,3.4vw,2.2rem); }
h3 { font-size:1.2rem; } p { margin:0 0 1em; } a { color:var(--plum); }
.container { width:min(1140px,92vw); margin-inline:auto; }
.section { padding:56px 0; }
.eyebrow { display:inline-block; font-size:.74rem; letter-spacing:.18em; text-transform:uppercase;
  color:var(--terracotta); font-weight:600; }
.lede { font-size:1.08rem; color:var(--ink-soft); max-width:62ch; }
.site-header { background:var(--paper); border-bottom:1px solid var(--line); position:sticky; top:0; z-index:20; }
.nav-bar { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:14px 0; flex-wrap:wrap; }
.brand { display:inline-flex; align-items:center; gap:10px; text-decoration:none; color:var(--plum-deep); }
.brand-mark img,.brand-mark { width:42px; height:42px; border-radius:12px; object-fit:cover; display:grid; place-items:center; }
.site-nav { display:flex; flex-wrap:wrap; gap:14px; align-items:center; }
.site-nav a { text-decoration:none; font-size:.92rem; font-weight:500; }
.menu-toggle { display:none; }
.nav-action,.solid-button,.outline-button { display:inline-block; padding:11px 20px; border-radius:999px; text-decoration:none;
  font-weight:600; font-size:.92rem; border:1px solid var(--line); background:var(--paper); color:var(--plum-deep); }
.solid-button { background:var(--plum-deep); color:#fff; border-color:var(--plum-deep); }
.btn-row { display:flex; flex-wrap:wrap; gap:12px; }
.site-footer { background:var(--paper); border-top:1px solid var(--line); margin-top:48px; padding:34px 0; }
.footer-grid,.footer-base { display:flex; flex-wrap:wrap; gap:22px; justify-content:space-between; }
.footer-base { border-top:1px solid var(--line); margin-top:22px; padding-top:16px; font-size:.86rem; color:var(--ink-soft); }
.footer-contact { display:flex; flex-direction:column; gap:6px; }
.footer-contact a { color:var(--plum); text-decoration:none; }
.field,.form-grid input,.form-grid select,.form-grid textarea,form input,form textarea,form select {
  width:100%; padding:12px 14px; border:1px solid var(--line); border-radius:12px; background:var(--paper);
  font:inherit; color:inherit; }
form label { display:block; font-size:.84rem; font-weight:600; margin-bottom:6px; }
.card,.gallery-card,.team-card,.event-card,.month-card,.tile,.editor-card { background:var(--paper);
  border:1px solid var(--line); border-radius:18px; padding:18px; }
.grid,.team-grid,.gallery-grid,.detail-grid,.event-grid,.calendar-months { display:grid; gap:18px;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); }
.announcement { background:var(--plum-deep); color:#fff; text-align:center; font-size:.9rem; padding:8px 0; }
.honeypot { position:absolute; left:-9999px; }
CSS;
}

/** Send finished HTML with gzip, caching headers and a stable ETag. */
function mt_send_html(string $html, int $status = 200, array $headers = []): void
{
    $etag = '"' . substr(sha1($html . MT_VERSION), 0, 20) . '"';
    $ifNoneMatch = trim((string) ($_SERVER['HTTP_IF_NONE_MATCH'] ?? ''));

    // Nothing changed since the last visit: send a bare 304.
    if ($status === 200 && !empty($_SERVER['REQUEST_METHOD']) && $ifNoneMatch === $etag) {
        if (mt_headless()) {
            $GLOBALS['MT_TEST_STATUS'] = 304;
            $GLOBALS['MT_TEST_HEADERS'][] = ['ETag', $etag];
            $GLOBALS['MT_HTML_SENT'] = true;
            return;
        }
        if (!headers_sent()) {
            http_response_code(304);
        }
        mt_header('ETag', $etag);
        $GLOBALS['MT_HTML_SENT'] = true;
        return;
    }

    if (mt_headless()) {
        $GLOBALS['MT_TEST_STATUS'] = $status;
        $GLOBALS['MT_TEST_HEADERS'][] = ['Content-Type', 'text/html; charset=utf-8'];
        $GLOBALS['MT_TEST_HEADERS'][] = ['ETag', $etag];
        $GLOBALS['MT_TEST_HEADERS'][] = ['X-Content-Type-Options', 'nosniff'];
        $GLOBALS['MT_TEST_HEADERS'][] = ['Referrer-Policy', 'strict-origin-when-cross-origin'];
        $GLOBALS['MT_TEST_HEADERS'][] = ['Vary', 'Accept-Encoding'];
        foreach ($headers as $name => $value) {
            $GLOBALS['MT_TEST_HEADERS'][] = [$name, $value];
        }
        $GLOBALS['MT_HTML_SENT'] = true;
        echo $html;
        mt_stop();
    }

    if (!headers_sent()) {
        http_response_code($status);
        mt_header('Content-Type', 'text/html; charset=utf-8');
        mt_header('ETag', $etag);
        mt_header('X-Content-Type-Options', 'nosniff');
        mt_header('Referrer-Policy', 'strict-origin-when-cross-origin');
        mt_header('Vary', 'Accept-Encoding');
        foreach ($headers as $name => $value) {
            mt_header($name, $value);
        }
    }
    $GLOBALS['MT_HTML_SENT'] = true;
    echo $html;
}

/** Public pages. Keeps the router readable. */
function mt_public_page(string $route): void
{
    switch ($route) {
        case 'home':
        case 'index.php':
            mt_send_html(mt_page('public/home', ['pageTitle' => null]));
            return;

        case 'gallery':
        case 'gallery.php':
            mt_send_html(mt_page('public/gallery', ['pageTitle' => 'Event gallery', 'bodyClass' => 'gallery-page']));
            return;

        case 'calendar':
        case 'calendar.php':
            mt_send_html(mt_page('public/calendar', ['pageTitle' => 'Yearly activities', 'bodyClass' => 'calendar-page']));
            return;

        case 'members':
        case 'members.php':
            mt_send_html(mt_page('public/members', ['pageTitle' => 'Our members', 'bodyClass' => 'members-page']));
            return;

        case 'register':
        case 'register.php':
            mt_public_register();
            return;

        case 'pass':
        case 'pass.php':
            mt_public_pass();
            return;

        case 'verify':
            mt_public_verify('');
            return;

        /* Deployment check. Handy right after an upload: it lists every design
         * file the site needs and whether it reached the server. It is built to
         * work even when nothing else loads, so it is safe to open any time. */
        case 'health':
        case 'health.php':
            mt_send_html(
                mt_render('public/health', ['report' => mt_health_report()]),
                200,
                ['X-Robots-Tag' => 'noindex, nofollow']
            );
            return;

        case 'sitemap.xml':
            mt_public_sitemap();
            return;

        case 'robots.txt':
            mt_json_raw(
                200,
                /* Nothing private is named here: the pages that need it carry their own
                   noindex, and pointing a crawler at a private path only advertises it. */
                "User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n",
                ['Content-Type' => 'text/plain; charset=utf-8']
            );
            return;

        default:
            if (str_starts_with($route, 'verify/')) {
                mt_public_verify(substr($route, 7));
                return;
            }
            mt_send_html(mt_page('public/not-found', ['pageTitle' => 'Page not found']), 404);
    }
}

/**
 * The registration form for one event.
 *
 * The event comes from the query string, the window and the fee come from the
 * backend, and the whole thing posts back here when JavaScript is switched off.
 */
function mt_public_register(): void
{
    $db = mt_db();
    $eventId = trim((string) ($_GET['event'] ?? ''));
    $event = $eventId !== '' ? mt_event_find($db, $eventId) : null;

    if ($event === null) {
        $open = mt_open_events($db);
        if (count($open) === 1) {
            $event = $open[0];
        } elseif ($open) {
            mt_send_html(mt_page('public/register-list', [
                'pageTitle'  => 'Event registration',
                'openEvents' => $open,
            ]));
            return;
        } else {
            mt_send_html(mt_page('public/not-found', [
                'pageTitle' => 'No event is open',
                'message'   => 'No event is open for registration at the moment. The club calendar has everything that is planned.',
            ]), 404);
            return;
        }
    }

    $errors = [];
    $values = [];

    if (mt_method() === 'POST') {
        $values = mt_input();
        if (trim((string) ($values['website'] ?? '')) !== '') {
            // A bot filled the hidden field: pretend it worked and keep the register clean.
            mt_send_html(mt_page('public/register', [
                'pageTitle'  => 'Event registration',
                'event'      => $event,
                'csrf'       => mt_csrf_token(),
                'errors'     => [],
                'values'     => [],
                'openEvents' => mt_open_events($db),
            ]));
            return;
        }
        if (!mt_csrf_ok((string) ($values['csrf'] ?? ''))) {
            $errors['form'] = 'The form expired. Please send it again.';
        } else {
            $state = mt_event_registration_state($db, $event);
            if (!$state['open']) {
                $errors['form'] = $state['label'];
            } else {
                $result = mt_registration_new($db, $event, $values);
                if ($result['error'] !== null) {
                    $errors['form'] = $result['error'];
                } else {
                    $record = $result['record'];
                    mt_db_transaction(static function (array &$database) use ($record): bool {
                        $database['registrations'][] = $record;
                        return true;
                    });
                    /* The student keeps this link: /pass/<private code>. The code
                       itself is never printed, drawn in a QR or listed anywhere. */
                    mt_redirect('/pass/' . rawurlencode($result['code']) . '?new=1');
                    return;
                }
            }
        }
    }

    mt_send_html(mt_page('public/register', [
        'pageTitle'  => 'Register · ' . (string) $event['title'],
        'event'      => $event,
        'csrf'       => mt_csrf_token(),
        'errors'     => $errors,
        'values'     => $values,
        'openEvents' => mt_open_events($db),
    ]));
}

/**
 * The student's pass page.
 *
 * The link is /pass/<private code>: the code in the URL is the only key, it is
 * stored as a hash, and it is never shown on the page, in the QR code, in the
 * PDF or in the club dashboard. Students who have the link open it any time.
 */
function mt_public_pass(): void
{
    $db = mt_db();
    $code = trim((string) ($_GET['code'] ?? $_GET['pass'] ?? ''));
    if ($code === '') {
        /* No code in the link: this browser already opened a pass, so it can
           carry on with the one it remembers. Anything else is asked for the
           link it saved — the club cannot look a pass up for anyone. */
        mt_session();
        $remembered = (string) ($_SESSION['pass'] ?? '');
        $registration = $remembered !== '' ? mt_registration_by_code_hash($db, $remembered) : null;
        if ($registration === null) {
            mt_send_html(mt_page('public/pass-lookup', [
                'pageTitle' => 'Find your pass',
                'message'   => null,
            ]), 200);
            return;
        }
        $code = '';
    } else {
        $registration = mt_registration_by_code($db, $code);
    }
    if ($registration === null) {
        mt_throttle_hit('pass-lookup');
        mt_send_html(mt_page('public/not-found', [
            'pageTitle' => 'Pass not found',
            'message'   => 'That pass link is not valid. Open the link you were given when you registered, or write to the club team and they will help.',
        ]), 404);
        return;
    }

    $registrationId = (string) $registration['id'];
    $message = null;

    if (mt_method() === 'POST') {
        $input = mt_input();
        if (!mt_csrf_ok((string) ($input['csrf'] ?? ''))) {
            $message = 'That upload expired. Please choose the screenshot again.';
        } else {
            $upload = mt_registration_receive_proof($registration);
            if ($upload['error'] !== null) {
                $message = $upload['error'];
            } else {
                mt_db_transaction(static function (array &$database) use ($registrationId, $upload): bool {
                    foreach ($database['registrations'] as $index => $existing) {
                        if ((string) ($existing['id'] ?? '') !== $registrationId) {
                            continue;
                        }
                        $database['registrations'][$index]['paymentStatus'] = 'submitted';
                        $database['registrations'][$index]['proofPath'] = $upload['path'];
                        $database['registrations'][$index]['proofUploadedAt'] = mt_now_iso();
                        $database['registrations'][$index]['updatedAt'] = mt_now_iso();
                        /* This is the moment the pass is earned: the serial, the
                           seat and the pass are all issued together, and not
                           a second before the payment proof is in. */
                        if ((string) ($existing['serial'] ?? '') === '') {
                            $eventForSerial = mt_event_find($database, (string) ($existing['eventId'] ?? ''));
                            $database['registrations'][$index]['serial'] = mt_registration_serial($database, $eventForSerial ?? []);
                        }
                        $database['registrations'][$index]['passIssuedAt'] = mt_now_iso();
                        $database['registrations'][$index]['status'] = 'confirmed';
                    }
                    return true;
                });
                mt_redirect('/pass?paid=1');
                return;
            }
        }
        $registration = mt_registration_by_code(mt_db(), $code) ?? $registration;
    }

    $event = mt_event_find(mt_db(), (string) ($registration['eventId'] ?? ''));

    /* Remember whose pass this browser is looking at, so neither the PDF link
       nor the upload form ever has to print the private code. */
    mt_session();
    $_SESSION['pass'] = (string) ($registration['passCodeHash'] ?? '');
    mt_session_flush();

    mt_send_html(mt_page('public/pass', [
        'pageTitle'      => mt_registration_pass_ready($registration)
            ? 'Your pass · ' . (string) $registration['serial']
            : 'Payment · ' . (string) $registration['eventTitle'],
        'registration'   => $registration,
        'event'          => $event ?? [],
        'code'           => '',
        'pdfToken'       => '',
        'message'        => $message,
        'stage'          => mt_registration_stage($registration),
        'justRegistered' => !empty($_GET['new']),
        'justPaid'       => !empty($_GET['paid']),
    ]));
}

/**
 * /verify/<public id> — what a scanned pass QR opens.
 *
 * Public on purpose: anyone holding a pass (a student, a club member at the
 * door, a stranger who found it) can confirm the pass is genuine. It shows the
 * holder's masked name, the event, the seat state and nothing else — no
 * contact details, no serial of anyone else, no pass codes.
 */
function mt_public_verify(string $publicId): void
{
    $publicId = trim($publicId);
    if ($publicId === '' && isset($_GET['id'])) {
        $publicId = trim((string) $_GET['id']);
    }

    $db = mt_db();
    $registration = null;
    if ($publicId !== '') {
        foreach ($db['registrations'] as $candidate) {
            if (hash_equals((string) ($candidate['publicId'] ?? ''), $publicId)) {
                $registration = $candidate;
                break;
            }
        }
    }

    if ($registration === null) {
        mt_send_html(mt_page('public/verify', [
            'pageTitle' => 'Pass',
            'checked'   => $publicId !== '',
            'verdict'   => 'unknown',
            'registration' => [],
            'event'     => [],
        ]), $publicId === '' ? 200 : 404);
        return;
    }

    $event = mt_event_find($db, (string) ($registration['eventId'] ?? '')) ?? [];
    $ready = mt_registration_pass_ready($registration);
    $cancelled = (string) ($registration['status'] ?? '') === 'cancelled';

    mt_send_html(mt_page('public/verify', [
        'pageTitle'    => 'Pass',
        'checked'      => true,
        'verdict'      => $cancelled ? 'cancelled' : ($ready ? 'valid' : 'pending'),
        'registration' => $registration,
        'event'        => $event,
    ]), 200);
}

function mt_public_sitemap(): void
{
    $base = mt_base_url();
    $urls = ['', 'gallery', 'calendar', 'members'];
    $xml  = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    foreach ($urls as $url) {
        $loc = $url === '' ? $base . '/' : $base . '/' . $url;
        $xml .= "  <url><loc>" . e($loc) . "</loc><changefreq>weekly</changefreq></url>\n";
    }
    $xml .= "</urlset>\n";
    mt_json_raw(200, $xml, ['Content-Type' => 'application/xml; charset=utf-8']);
}

function mt_base_url(): string
{
    $host = (string) ($_SERVER['HTTP_HOST'] ?? 'localhost');
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $base = rtrim(str_replace('\\', '/', dirname((string) ($_SERVER['SCRIPT_NAME'] ?? '/'))), '/');
    return $scheme . '://' . $host . ($base === '/' ? '' : $base);
}
