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
 *   /awareness            mental health awareness corner
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
