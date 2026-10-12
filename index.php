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
 *   /dashboard            password-protected club dashboard
 *   /api/…                JSON API used by the pages and the dashboard
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

if ($route === 'dashboard' || $route === 'dashboard.php' || $route === 'admin' || $route === 'admin.php') {
    $dashboardVars = [
        'site'     => mt_db()['site'],
        'db'       => mt_db(),
        'csrf'     => mt_csrf_token(),
        'authed'   => mt_authenticated(),
        'noindex'  => true,
    ];
    mt_send_html(mt_inline_assets(mt_render('dashboard', $dashboardVars)));
    return;
}

mt_public_page($route);
