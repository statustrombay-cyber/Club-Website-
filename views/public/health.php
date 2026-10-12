<?php
/**
 * Deployment check — a self-contained page (no stylesheet, no script, nothing
 * to load) so it stays readable even when the upload went wrong; that is
 * exactly the situation it exists for.
 *
 * @var array $report  From mt_health_report().
 */
$report  = $report ?? mt_health_report();
$missing = $report['missing'];
$counts  = $report['counts'];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Deployment check · Mindful Tattva</title>
  <meta name="theme-color" content="#34213d">
  <style>
    :root {
      --ink: #2b2422; --ink-soft: #6c625d; --plum: #4e3155; --plum-deep: #34213d;
      --sage-deep: #7d9179; --ochre: #d7a246; --cream: #f9f5f0; --sand: #f1e8df;
      --line: rgba(78, 49, 85, .14); --shadow: 0 18px 44px rgba(52, 33, 61, .1);
      --font-display: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
      --font-body: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 34px 18px 60px; background: var(--cream); color: var(--ink);
           font: 16px/1.6 var(--font-body); -webkit-text-size-adjust: 100%; }
    .wrap { max-width: 880px; margin: 0 auto; }
    h1 { font-family: var(--font-display); font-size: clamp(1.7rem, 4vw, 2.4rem); line-height: 1.15;
         margin: 10px 0 8px; color: var(--plum-deep); }
    h2 { font-family: var(--font-display); font-size: 1.15rem; margin: 0 0 12px; color: var(--plum-deep); }
    p { margin: 0 0 12px; color: var(--ink-soft); }
    .eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: .72rem; letter-spacing: .18em;
               text-transform: uppercase; color: var(--plum); font-weight: 600; }
    .card { background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: 22px;
            box-shadow: var(--shadow); margin-top: 18px; }
    .verdict { border-radius: 20px; padding: 20px 22px; margin-top: 18px; border: 1px solid var(--line); }
    .verdict.good { background: #f2f6f0; border-color: rgba(125, 145, 121, .4); }
    .verdict.bad  { background: #fdf4ee; border-color: rgba(215, 162, 70, .45); }
    .verdict strong { display: block; font-family: var(--font-display); font-size: 1.3rem; margin-bottom: 6px;
                      color: var(--plum-deep); }
    ul { list-style: none; margin: 0; padding: 0; }
    li { display: flex; gap: 12px; align-items: flex-start; padding: 9px 0; border-top: 1px solid var(--line); }
    li:first-child { border-top: 0; }
    .dot { flex: 0 0 auto; width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center;
           font-size: .72rem; color: #fff; margin-top: 2px; }
    .dot.yes { background: var(--sage-deep); }
    .dot.no  { background: #c86f58; }
    .row-main { flex: 1 1 auto; min-width: 0; }
    .row-main b { font-weight: 600; }
    .row-sub { font-family: var(--mono); font-size: .78rem; color: var(--ink-soft); word-break: break-all; }
    .row-size { flex: 0 0 auto; font-size: .78rem; color: var(--ink-soft); font-family: var(--mono); }
    code { font-family: var(--mono); font-size: .9em; background: var(--sand); padding: 1px 5px; border-radius: 6px; }
    ol { margin: 0; padding-left: 20px; color: var(--ink-soft); }
    ol li { display: list-item; border-top: 0; padding: 4px 0; }
    .facts { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
    .fact { background: var(--sand); border-radius: 12px; padding: 10px 14px; font-size: .84rem; }
    .fact b { display: block; font-family: var(--font-display); font-size: 1.2rem; color: var(--plum-deep); }
    .links { margin-top: 22px; display: flex; flex-wrap: wrap; gap: 10px; }
    .links a { text-decoration: none; color: var(--plum-deep); border: 1px solid var(--line);
               background: #fff; padding: 9px 16px; border-radius: 999px; font-size: .9rem; font-weight: 600; }
    .foot { margin-top: 18px; font-size: .82rem; color: var(--ink-soft); }
    @media (max-width: 520px) { li { flex-wrap: wrap; } .row-size { display: none; } }
  </style>
</head>
<body>
  <div class="wrap">
    <span class="eyebrow">Mindful Tattva · deployment check</span>
    <h1><?= $report['ok'] ? 'Everything the website needs is here.' : 'A few files are missing on this server.' ?></h1>
    <p>
      This page lists every picture, stylesheet and script the club website uses, and checks it
      straight on the server. It loads nothing from the website itself, so it still works when the
      design files are missing.
    </p>

    <?php if ($missing): ?>
      <div class="verdict bad">
        <strong><?= count($missing) ?> file<?= count($missing) === 1 ? ' is' : 's are' ?> missing</strong>
        <p>
          The website will look unstyled — plain text with no colours — until these files are uploaded.
          Open the <b>assets</b> folder of the project, and copy its contents into the <code>assets</code>
          folder next to <code>index.php</code> on the server, keeping the same names:
          <code>app.css</code>, <code>app.js</code>, <code>dashboard.css</code>, <code>dashboard.js</code>
          and the folders <code>img/</code> and <code>photos/</code>.
        </p>
        <p>Folders <code>755</code>, files <code>644</code>. Then reload this page — the list below should turn green.</p>
      </div>
    <?php else: ?>
      <div class="verdict good">
        <strong>All <?= count($report['files']) ?> design files are present</strong>
        <p>Stylesheets, scripts and images are all on the server, so the public website and the club
           dashboard will render as designed.</p>
      </div>
    <?php endif; ?>

    <div class="card">
      <h2>Design files</h2>
      <ul>
        <?php foreach ($report['files'] as $file): ?>
          <li>
            <span class="dot <?= $file['exists'] ? 'yes' : 'no' ?>" aria-hidden="true"><?= $file['exists'] ? '✓' : '✕' ?></span>
            <span class="row-main">
              <b><?= e($file['label']) ?></b>
              <span class="row-sub"><?= e($file['path']) ?><?= $file['exists'] ? '' : ' — missing' ?></span>
            </span>
            <span class="row-size"><?= $file['exists'] ? e($file['size']) : '—' ?></span>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>

    <div class="card">
      <h2>Server</h2>
      <ul>
        <?php foreach ($report['checks'] as $check): ?>
          <li>
            <span class="dot <?= $check['ok'] ? 'yes' : 'no' ?>" aria-hidden="true"><?= $check['ok'] ? '✓' : '✕' ?></span>
            <span class="row-main">
              <b><?= e($check['label']) ?></b>
              <span class="row-sub"><?= e($check['detail']) ?></span>
            </span>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>

    <div class="card">
      <h2>What the site is holding right now</h2>
      <div class="facts">
        <span class="fact"><b><?= (int) $counts['revision'] ?></b> content revision</span>
        <span class="fact"><b><?= (int) $counts['team'] ?></b> team members</span>
        <span class="fact"><b><?= (int) $counts['events'] ?></b> events</span>
        <span class="fact"><b><?= (int) $counts['photos'] ?></b> photos</span>
        <span class="fact"><b><?= (int) ($counts['registrations'] ?? 0) ?></b> event registrations</span>
        <span class="fact"><b><?= (int) $counts['forms'] ?></b> form messages</span>
      </div>
    </div>

    <div class="links">
      <a href="/">← Back to the website</a>
      <a href="/dashboard">Club dashboard</a>
      <a href="/health">Check again</a>
    </div>
    <p class="foot">Mindful Tattva · backend <?= e(MT_VERSION) ?>. This page is not linked from the public site and is not indexed by search engines.</p>
  </div>
</body>
</html>
