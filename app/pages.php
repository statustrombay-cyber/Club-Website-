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
.btn,.nav-pill,.awareness-tab { display:inline-block; padding:11px 20px; border-radius:999px; text-decoration:none;
  font-weight:600; font-size:.92rem; border:1px solid var(--line); background:var(--paper); color:var(--plum-deep); }
.btn-solid { background:var(--plum-deep); color:#fff; border-color:var(--plum-deep); }
.btn-ghost { background:transparent; }
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
.grid,.card-grid,.team-grid,.gallery-grid,.month-grid,.awareness-grid { display:grid; gap:18px;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); }
.announcement { background:var(--plum-deep); color:#fff; text-align:center; font-size:.9rem; padding:8px 0; }
.ambient,.scroll-progress,.lightbox,.honeypot { display:none; }
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
    $db = mt_db();

    switch ($route) {
        case 'home':
        case 'index.php':
            mt_send_html(mt_page('public/home', ['pageTitle' => null]));
            return;

        case 'gallery':
        case 'gallery.php':
            mt_send_html(mt_page('public/gallery', [
                'pageTitle'  => 'Photo gallery',
                'pageIntro'  => 'Moments, workshops and quiet circles from Mindful Tattva.',
            ]));
            return;

        /* The member roster is intentionally kept inside the dashboard.
         * To publish the page again, restore these two lines:
         *   case 'members':
         *   case 'members.php':
         *       mt_send_html(mt_page('public/members', ['pageTitle' => 'Our members']));
         *       return;
         */

        case 'calendar':
        case 'calendar.php':
            mt_send_html(mt_page('public/calendar', ['pageTitle' => 'Club calendar']));
            return;

        case 'awareness':
        case 'awareness.php':
            mt_send_html(mt_page('public/awareness', ['pageTitle' => 'Mental health awareness']));
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
                "User-agent: *\nAllow: /\nDisallow: /dashboard\nDisallow: /health\nSitemap: /sitemap.xml\n",
                ['Content-Type' => 'text/plain; charset=utf-8']
            );
            return;

        default:
            mt_send_html(mt_page('public/not-found', ['pageTitle' => 'Page not found']), 404);
    }
}

function mt_public_sitemap(): void
{
    $base = mt_base_url();
    $urls = ['', 'gallery', 'calendar', 'awareness'];
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
