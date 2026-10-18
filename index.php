<?php
/**
 * Mindful Tattva · front controller
 * ---------------------------------
 *   php -S 0.0.0.0:4173 index.php      (development / preview)
 *   Apache with mod_rewrite / any PHP host: drop the folder in and it works.
 *
 * Routes
 *   /                     public website (home)
 *   /gallery /calendar    public pages
 *   /members              the member directory
 *   /register?event=…     event registration
 *   /pass/<serial>        a student's own event pass
 *   /dashboard            sign-in page (signed out) → the club area
 *   /dashboard/overview   club area, one page per section:
 *   /dashboard/team       overview · site copy · team · events · gallery …
 *   /api/…                JSON API used by the pages and the club area
 *   /uploads/…            files uploaded from the dashboard
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

require_once __DIR__ . '/app/bootstrap.php';

mt_boot();

$route = mt_route();

/* The PHP built-in server does not serve static files when a router script is
 * used, so hand assets straight back to it. */
if (PHP_SAPI === 'cli-server' && mt_is_static_file($route)) {
    return false;
}

/* Public scene delivery/check routes, also used by PHP shared hosting. */
if ($route === 'scene-assets.php') {
    require_once MT_APP . '/scene-assets.php';
    mt_scene_asset_handle();
    return;
}
if ($route === 'scene-check.php') {
    mt_header('Content-Type', 'text/html; charset=utf-8');
    mt_header('Cache-Control', 'no-store');
    mt_header('X-Robots-Tag', 'noindex, nofollow');
    require MT_VIEWS . '/public/scene-check.php';
    return;
}

if (str_starts_with($route, 'api/')) {
    mt_api_handle($route);
    return;
}

/* The club's old pages, printed on posters and past passes, still lead home. */
$legacy = [
    'index.html'    => '/',
    'gallery.html'  => '/gallery',
    'members.html'  => '/members',
    'calendar.html' => '/calendar',
    'admin.html'    => '/dashboard',
];
if (isset($legacy[$route])) {
    mt_redirect($legacy[$route], 301);
    return;
}

/* /pass/<private code> — the student's own pass. The code in the link is the
 * only key: it is 20 random characters, stored as a hash, and never printed on
 * the pass, drawn in a QR code or listed in the club dashboard. */
if (str_starts_with($route, 'pass/')) {
    $_GET['code'] = substr($route, 5);
    $route = 'pass';
}

/* /verify/<public id> — what a scanned pass QR opens. Public on purpose: it
 * says a pass is real without giving anything away. */
if (str_starts_with($route, 'verify/')) {
    $route = 'verify/' . substr($route, 7);
}

if (str_starts_with($route, 'register')) {
    $route = 'register';
}

/* The club area is two pages, not one:
 *   · signed out — a sign-in page and nothing else, so no dashboard markup,
 *     no site copy and no registrations are ever sent to a browser that has
 *     not signed in;
 *   · signed in — one page per section: /dashboard/overview, /team, /events,
 *     /gallery … The old single-page shell is gone. */
$dashboardPanel = null;
if ($route === 'dashboard' || $route === 'dashboard.php' || $route === 'admin' || $route === 'admin.php') {
    $dashboardPanel = 'overview';
} elseif (str_starts_with($route, 'dashboard/')) {
    $dashboardPanel = trim(substr($route, 10), '/');
}

if ($dashboardPanel !== null) {
    $known = ['overview', 'copy', 'team', 'events', 'events-register', 'gallery', 'inbox', 'data'];
    if ($dashboardPanel !== 'overview' && !in_array($dashboardPanel, $known, true)) {
        $dashboardPanel = 'overview';
    }

    if (!mt_authenticated()) {
        /* A bookmarked section link is not an error — it just sends the club
           to the sign-in page and, once in, straight on to where they meant
           to go. */
        if ($route !== 'dashboard' && $route !== 'dashboard.php') {
            $_SESSION['mt_after_login'] = '/dashboard/' . ($dashboardPanel === 'overview' ? 'overview' : $dashboardPanel);
        }
        mt_send_html(mt_inline_assets(mt_render('login', [
            'club'    => (string) (mt_db()['site']['clubName'] ?? 'Mindful Tattva'),
            'noindex' => true,
        ])));
        return;
    }

    if ($route === 'dashboard' || $route === 'dashboard.php' || $dashboardPanel === 'overview') {
        if ($dashboardPanel === 'overview' && $route !== 'dashboard/overview') {
            mt_redirect('/dashboard/overview', 303);
            return;
        }
    }

    mt_send_html(mt_inline_assets(mt_render('dashboard', [
        'site'    => mt_db()['site'],
        'db'      => mt_db(),
        'csrf'    => mt_csrf_token(),
        'authed'  => true,
        'noindex' => true,
        'panel'   => $dashboardPanel,
    ])));
    return;
}

mt_public_page($route);
