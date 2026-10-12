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
            if ($path === null) {
                return $m[0];
            }
            return '<style>' . "\n" . (string) file_get_contents($path) . "\n" . '</style>';
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

        case 'sitemap.xml':
            mt_public_sitemap();
            return;

        case 'robots.txt':
            mt_json_raw(200, "User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n", ['Content-Type' => 'text/plain; charset=utf-8']);
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
