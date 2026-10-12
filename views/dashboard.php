<?php
/**
 * Club dashboard shell. All data is loaded through the JSON API.
 *
 * @var array  $site
 * @var bool   $authed
 * @var string $csrf
 */
$site   = $site ?? [];
$authed = $authed ?? false;
$csrf   = $csrf ?? '';
$club   = (string) ($site['clubName'] ?? 'Mindful Tattva');
$sections = [
    ['overview', 'Overview'],
    ['copy', 'Site copy'],
    ['team', 'Team members'],
    ['events', 'Events &amp; calendar'],
    ['gallery', 'Photo album'],
    ['awareness', 'Awareness tiles'],
    ['inbox', 'Registrations'],
    ['data', 'Backups &amp; settings'],
];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Club dashboard · <?= e($club) ?></title>
  <meta name="theme-color" content="#34213d">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/app.css">
  <link rel="stylesheet" href="/assets/dashboard.css">
</head>
<body class="dash-body">

  <div class="ambient" aria-hidden="true">
    <span class="ambient-blob ambient-blob-a"></span>
    <span class="ambient-blob ambient-blob-b"></span>
  </div>

  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <!-- ------------------------------------------------------------ sign in -->
  <section class="login-wrap" id="loginView" <?= $authed ? 'hidden' : '' ?>>
    <form class="login-card" id="loginForm" autocomplete="on">
      <span class="eyebrow plain">Club dashboard</span>
      <h1>Welcome back.</h1>
      <p>This area is only for the Mindful Tattva team. Enter the club password to manage the website content.</p>
      <label>Club password
        <input type="password" name="password" id="loginPassword" autocomplete="current-password" required placeholder="••••••••">
      </label>
      <button class="btn btn-solid" type="submit">Sign in</button>
      <div class="login-error" id="loginError" role="alert"></div>
      <p class="login-hint">Forgot it? Ask the club president or check <code>data/config.php</code> on the server.</p>
      <a class="event-link" href="/">← Back to the website</a>
    </form>
  </section>

  <!-- ---------------------------------------------------------- dashboard -->
  <div class="dash-shell" id="appView" <?= $authed ? '' : 'hidden' ?>>
    <aside class="dash-side">
      <a class="brand" href="/" target="_blank" rel="noreferrer">
        <span class="brand-mark"><?= e((string) ($site['shortName'] ?? 'MT')) ?></span>
        <span class="brand-text"><strong><?= e($club) ?></strong><small>Club dashboard</small></span>
      </a>

      <nav class="dash-nav" id="dashNav" aria-label="Dashboard sections">
        <?php foreach ($sections as $index => [$key, $label]): ?>
          <button type="button" data-panel="<?= e($key) ?>" class="<?= $index === 0 ? 'is-active' : '' ?>">
            <span class="dot"></span><?= $label ?>
          </button>
        <?php endforeach; ?>
      </nav>

      <div class="dash-side-foot">
        <span>Signed in · <?= e(date('d M Y')) ?></span>
        <a href="/" target="_blank" rel="noreferrer">Open the website ↗</a>
        <a href="/gallery" target="_blank" rel="noreferrer">Open photo album ↗</a>
        <button type="button" id="logoutButton">Sign out</button>
      </div>
    </aside>

    <main class="dash-main">
      <div class="dash-top">
        <div>
          <span class="eyebrow plain">Mindful Tattva · admin</span>
          <h1 id="panelTitle">Overview</h1>
        </div>
        <div class="dash-status">
          <span class="pulse" aria-hidden="true"></span>
          <span id="revisionLabel">revision —</span>
          <button class="btn-sm" type="button" id="refreshButton">Refresh</button>
        </div>
      </div>

      <section class="panel is-active" id="panel-overview">
        <div class="stat-cards" id="overviewStats"></div>
        <div class="note-card" id="overviewNote"></div>
        <div class="editor-grid" id="overviewRecent"></div>
      </section>

      <section class="panel" id="panel-copy">
        <div class="panel-head">
          <div><h2>Site copy</h2><p>Words visitors read on the website. Save a group and it updates instantly — no republishing needed.</p></div>
          <div class="row-actions">
            <button class="btn-sm primary" type="button" data-save-copy="all">Save all text</button>
          </div>
        </div>
        <div class="editor-grid" id="copyEditors"></div>
      </section>

      <section class="panel" id="panel-team">
        <div class="panel-head">
          <div><h2>Team members</h2><p>Core committee, head committee and volunteers. Volunteers show only their name and contact details on the website.</p></div>
          <button class="btn-sm primary" type="button" id="addTeam">+ Add member</button>
        </div>
        <div class="editor-grid" id="teamEditors"></div>
      </section>

      <section class="panel" id="panel-events">
        <div class="panel-head">
          <div><h2>Events &amp; calendar</h2><p>Pick a month and type the day and year — the yearly calendar places the event automatically. Tick “Publish” to feature it on the home page.</p></div>
          <button class="btn-sm primary" type="button" id="addEvent">+ Add event</button>
        </div>
        <div class="editor-grid" id="eventEditors"></div>
      </section>

      <section class="panel" id="panel-gallery">
        <div class="panel-head">
          <div><h2>Photo album</h2><p>Upload event photos. Captions are optional and completely yours — whatever you type here is exactly what visitors see, and photos without a caption simply show as photos.</p></div>
          <button class="btn-sm primary" type="button" id="addPhoto">+ Add photo</button>
        </div>
        <div class="editor-grid" id="galleryEditors"></div>
      </section>

      <section class="panel" id="panel-awareness">
        <div class="panel-head">
          <div><h2>Awareness tiles</h2><p>These tiles scroll with the page on the home page. Write your own numbers, notes and pictures — the artwork can be replaced with any image you upload.</p></div>
          <button class="btn-sm primary" type="button" id="addTile">+ Add tile</button>
        </div>
        <div class="editor-grid" id="awarenessEditors"></div>
      </section>

      <section class="panel" id="panel-inbox">
        <div class="panel-head">
          <div><h2>Registrations</h2><p>Every membership and event registration sent from the website lands here — this inbox is never shown on the public site.</p></div>
          <div class="row-actions">
            <button class="btn-sm" type="button" id="exportCsv">Download CSV</button>
            <button class="btn-sm danger" type="button" id="clearInbox">Clear all</button>
          </div>
        </div>
        <div id="submissionList" style="display:grid;gap:14px"></div>
      </section>

      <section class="panel" id="panel-data">
        <div class="panel-head">
          <div><h2>Backups &amp; settings</h2><p>Every save keeps a copy of the previous version, so any change can be rolled back. You can also download a full backup before making big edits.</p></div>
          <div class="row-actions">
            <a class="btn-sm primary" href="/api/export">Download full backup</a>
          </div>
        </div>

        <div class="editor-grid">
          <div class="editor-card">
            <div class="editor-card-head"><span>Restore</span></div>
            <h3>Roll back to an earlier version</h3>
            <div class="backup-list" id="backupList"></div>
          </div>

          <div class="editor-card">
            <div class="editor-card-head"><span>Import</span></div>
            <h3>Upload a backup file</h3>
            <p class="muted" style="font-size:.84rem">Restores content, team, events, photos and awareness tiles from a <code>.json</code> backup.</p>
            <div class="upload-row">
              <input type="file" accept="application/json,.json" id="importFile">
              <button class="btn-sm primary" type="button" id="importButton">Import file</button>
            </div>
          </div>

          <div class="editor-card">
            <div class="editor-card-head"><span>Security</span></div>
            <h3>Change the club password</h3>
            <div class="form-grid one">
              <label>Current password<input type="password" id="currentPassword" autocomplete="current-password"></label>
              <label>New password<input type="password" id="newPassword" autocomplete="new-password"></label>
              <label>Repeat new password<input type="password" id="repeatPassword" autocomplete="new-password"></label>
            </div>
            <div class="row-actions"><button class="btn-sm primary" type="button" id="changePassword">Update password</button></div>
          </div>

          <div class="editor-card">
            <div class="editor-card-head"><span>System</span></div>
            <h3>Server status</h3>
            <div id="healthBox" class="muted" style="font-size:.86rem">Checking…</div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <script type="application/json" id="dash-bootstrap"><?= json_encode([
      'authed'   => $authed,
      'csrf'     => $csrf,
      'revision' => (int) (($db['revision'] ?? 1)),
      'site'     => $site,
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?></script>
  <script src="/assets/dashboard.js"></script>
</body>
</html>
