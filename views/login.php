<?php
/**
 * The club sign-in page.
 *
 * This is the only thing served at /dashboard until the club password is
 * right: no dashboard markup, no site copy, no registrations. The password is
 * checked by POST /api/login; when it comes back good the browser is sent to
 * the dashboard proper.
 *
 * @var bool   $noindex
 * @var string $club
 */
$club = $club ?? 'Mindful Tattva';
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Sign in · <?= e($club) ?></title>
  <meta name="theme-color" content="#34213d">
  <!-- the club logo in the tab, the same one the public site shows -->
  <link rel="icon" href="/assets/img/favicon-48.png" sizes="48x48" type="image/png">
  <link rel="icon" href="/assets/img/favicon-192.png" sizes="192x192" type="image/png">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png">
  <link rel="stylesheet" href="/assets/app.css">
  <link rel="stylesheet" href="/assets/manage.css">
</head>
<body class="dash-body login-body">

  <div class="ambient" aria-hidden="true">
    <span class="ambient-blob ambient-blob-a"></span>
    <span class="ambient-blob ambient-blob-b"></span>
  </div>

  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <main class="login-wrap">
    <form class="login-card" id="loginForm" autocomplete="on">
      <span class="eyebrow plain">Club dashboard</span>
      <h1>Welcome back.</h1>
      <p>This area is only for the <?= e($club) ?> team. Enter the club password to manage the website content.</p>
      <label>Club password
        <input type="password" name="password" id="loginPassword" autocomplete="current-password" required placeholder="••••••••">
      </label>
      <button class="btn btn-solid" type="submit">Sign in</button>
      <div class="login-error" id="loginError" role="alert"></div>
      <p class="login-hint">Forgot it? Ask the club president — the password is kept on the server, never on this page.</p>
      <a class="event-link" href="/">← Back to the website</a>
    </form>
  </main>

  <script type="application/json" id="dash-bootstrap"><?= json_encode(
      ['authed' => false, 'csrf' => '', 'revision' => 0, 'site' => [], 'panel' => 'login'],
      JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
  ) ?></script>
  <script src="/assets/manage.js"></script>
</body>
</html>
