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
$panel  = $panel ?? 'overview';
$sections = [
    ['overview', 'Overview'],
    ['copy', 'Site copy'],
    ['team', 'Team members'],
    ['events', 'Events &amp; calendar'],
    ['events-register', 'Event registrations'],
    ['gallery', 'Photo album'],
    ['inbox', 'Forms inbox'],
    ['data', 'Backups &amp; settings'],
];
$panelKeys  = array_column($sections, 0);
$panelTitles = array_column($sections, 1);
$panelIndex = array_search($panel, $panelKeys, true);
$panelIndex = $panelIndex === false ? 0 : $panelIndex;
$panel = $panelKeys[$panelIndex];
$panelTitle = $panelTitles[$panelIndex];
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
  <link rel="stylesheet" href="/assets/manage.css">
</head>
<body class="dash-body">

  <div class="ambient" aria-hidden="true">
    <span class="ambient-blob ambient-blob-a"></span>
    <span class="ambient-blob ambient-blob-b"></span>
  </div>

  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <!-- ---------------------------------------------------------- dashboard -->
  <div class="dash-shell" id="appView">
    <aside class="dash-side">
      <a class="brand" href="/" target="_blank" rel="noreferrer">
        <span class="brand-mark"><?= e((string) ($site['shortName'] ?? 'MT')) ?></span>
        <span class="brand-text"><strong><?= e($club) ?></strong><small>Club area</small></span>
      </a>

      <nav class="dash-nav" id="dashNav" aria-label="Dashboard sections">
        <?php foreach ($sections as [$key, $label]): ?>
          <a href="/dashboard/<?= e($key) ?>" class="<?= $key === $panel ? 'is-active' : '' ?>"<?= $key === $panel ? ' aria-current="page"' : '' ?>>
            <span class="dot"></span><?= $label ?>
          </a>
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
          <span class="eyebrow plain"><?= e($club) ?> · club area</span>
          <h1 id="panelTitle"><?= $panelTitle ?></h1>
        </div>
        <div class="dash-status">
          <span class="pulse" aria-hidden="true"></span>
          <span id="revisionLabel">revision —</span>
          <button class="btn-sm" type="button" id="refreshButton">Refresh</button>
        </div>
      </div>

      <?php if ($panel === 'overview'): ?>
      <section class="panel is-active" id="panel-overview">
        <div class="stat-cards" id="overviewStats"></div>
        <div class="note-card" id="overviewNote"></div>
        <div class="editor-grid" id="overviewRecent"></div>
      </section>
      <?php endif; ?>

      <?php if ($panel === 'copy'): ?>
      <section class="panel is-active" id="panel-copy">
        <div class="panel-head">
          <div><h2>Site copy</h2><p>Words visitors read on the website. Save a group and it updates instantly — no republishing needed.</p></div>
          <div class="row-actions">
            <button class="btn-sm primary" type="button" data-save-copy="all">Save all text</button>
          </div>
        </div>
        <div class="editor-grid" id="copyEditors"></div>
      </section>
      <?php endif; ?>

      <?php if ($panel === 'team'): ?>
      <section class="panel is-active" id="panel-team">
        <div class="panel-head">
          <div><h2>Team members</h2><p>Core committee, head committee and volunteers. Volunteers show only their name and contact details on the website.</p></div>
          <button class="btn-sm primary" type="button" id="addTeam">+ Add member</button>
        </div>
        <div class="editor-grid" id="teamEditors"></div>
      </section>
      <?php endif; ?>

      <?php if ($panel === 'events'): ?>
      <section class="panel is-active" id="panel-events">
        <div class="panel-head">
          <div><h2>Events &amp; calendar</h2><p>Pick the month (it places the event in the yearly calendar) and type the day and year, the time and the venue.
            Set a fee and the UPI ID and the registration form shows the payment QR code; set the window and registration closes by itself.</p></div>
          <button class="btn-sm primary" type="button" id="addEvent">+ Add event</button>
        </div>
        <div class="editor-grid" id="eventEditors"></div>
      </section>
      <?php endif; ?>

      <?php if ($panel === 'events-register'): ?>
      <section class="panel is-active" id="panel-events-register">
        <div class="panel-head">
          <div><h2>Event registrations</h2><p>Every student who registers from the website, grouped by event. A seat is held only once a pass has been issued:
            for a paid event that means the payment screenshot arrived — students “waiting to pay” hold no seat and have no serial yet.
            Check a payment here, cancel with a refund, open a student's pass check page, or download the door list — it carries every serial number for matching entries at the gate.</p></div>
          <div class="row-actions">
            <a class="btn-sm primary" href="/api/registrations.csv">Download registrations CSV (serials)</a>
            <button class="btn-sm" type="button" id="exportPassCsv">Download door list</button>
          </div>
        </div>
        <div id="registrationGroups" style="display:grid;gap:14px"></div>
      </section>
      <?php endif; ?>

      <?php if ($panel === 'gallery'): ?>
      <section class="panel is-active" id="panel-gallery">
        <div class="panel-head">
          <div><h2>Photo album (gallery)</h2><p>This is the club's gallery management: upload event photos here, then write the caption, the album label, the date and the order.
            Captions are optional and completely yours — whatever you type here is exactly what visitors see, and photos without a caption simply show as photos.
            Every photo you add appears on the website's gallery page at once.</p></div>
          <div class="row-actions">
            <a class="btn-sm" href="/gallery" target="_blank" rel="noreferrer">Open the gallery ↗</a>
            <button class="btn-sm primary" type="button" id="addPhoto">+ Add photo</button>
          </div>
        </div>
        <div class="editor-grid" id="galleryEditors"></div>
      </section>
      <?php endif; ?>

      <?php if ($panel === 'inbox'): ?>
      <section class="panel is-active" id="panel-inbox">
        <div class="panel-head">
          <div><h2>Forms inbox</h2><p>Membership interest and general messages sent from the website. Event registrations live in their own tab, with their passes.</p></div>
          <div class="row-actions">
            <button class="btn-sm" type="button" id="exportCsv">Download CSV</button>
            <button class="btn-sm danger" type="button" id="clearInbox">Clear all</button>
          </div>
        </div>
        <div id="submissionList" style="display:grid;gap:14px"></div>
      </section>
      <?php endif; ?>

      <?php if ($panel === 'data'): ?>
      <section class="panel is-active" id="panel-data">
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
            <p class="muted" style="font-size:.84rem">Restores the site copy, team, events, photos and registrations from a <code>.json</code> backup.</p>
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
      <?php endif; ?>
    </main>
  </div>

  <script type="application/json" id="dash-bootstrap"><?= json_encode([
      'authed'   => $authed,
      'csrf'     => $csrf,
      'revision' => (int) (($db['revision'] ?? 1)),
      'site'     => $authed ? $site : [],
      'panel'    => $panel,
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?></script>
  <script src="/assets/manage.js"></script>
</body>
</html>
