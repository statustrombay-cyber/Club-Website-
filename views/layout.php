<?php
/**
 * Shared shell for the public site: the drifting bubbles, the depth overlay,
 * the announcement strip, the live event banner, the navigation and the footer.
 *
 * @var string $content   Rendered page body.
 * @var array  $site      Club copy from the store.
 * @var array  $db        Whole content store.
 * @var string $route     Current route.
 * @var string|null $pageTitle
 * @var string|null $bodyClass
 */
$site      = $site ?? [];
$db        = $db ?? mt_db();
$route     = $route ?? 'home';
$bodyClass = trim(($bodyClass ?? '') . ' page-' . $route);
$clubName  = (string) ($site['clubName'] ?? 'Mindful Tattva');
$department = (string) ($site['department'] ?? '');
$fullTitle = $pageTitle ? $pageTitle . ' · ' . $clubName : $clubName . ' · Psychology Club';
$description = (string) ($site['intro'] ?? '');
$logo      = mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg';
$instagram = mt_safe_url($site['instagramUrl'] ?? '');
$email     = trim((string) ($site['email'] ?? ''));
$phone     = trim((string) ($site['clubPhone'] ?? ''));
$address   = trim((string) ($site['address'] ?? ''));
$mapUrl    = 'https://www.google.com/maps/search/?api=1&query=' . urlencode($address !== '' ? $address : (string) ($site['universityName'] ?? ''));
$banner    = mt_featured_event($db);

$nav = [
    ['/#about', 'About'],
    ['/#psychology', 'The lens'],
    ['/#history', 'Our story'],
    ['/#events', 'Events'],
    ['/gallery', 'Gallery'],
    ['/calendar', 'Calendar'],
    ['/#team', 'Core team'],
    ['/members', 'Members'],
    ['/#join', 'Join'],
    ['/#contact', 'Contact'],
];
?>
<!doctype html>
<html lang="en" class="no-js">
<script>document.documentElement.className = document.documentElement.className.replace("no-js", "js");</script>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($fullTitle) ?></title>
  <meta name="description" content="<?= e(mb_substr($description, 0, 180)) ?>">
  <meta name="theme-color" content="#403634">
  <meta name="color-scheme" content="light">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="<?= e($logo) ?>">
  <meta property="og:type" content="website">
  <meta property="og:title" content="<?= e($fullTitle) ?>">
  <meta property="og:description" content="<?= e(mb_substr($description, 0, 180)) ?>">
  <meta property="og:image" content="<?= e($logo) ?>">
  <link rel="stylesheet" href="/assets/app.css">
</head>
<body class="<?= e($bodyClass) ?>">

  <div class="bubble-field" aria-hidden="true">
    <span class="bubble bubble-a"></span><span class="bubble bubble-b"></span><span class="bubble bubble-c"></span>
    <span class="bubble bubble-d"></span><span class="bubble bubble-e"></span><span class="bubble bubble-f"></span>
    <span class="bubble bubble-g"></span>
  </div>
  <div class="depth-overlay" aria-hidden="true"></div>

  <div class="site-shell">
    <?php if (trim((string) ($site['announcement'] ?? '')) !== ''): ?>
      <div class="announcement" id="announcement"><?= e((string) $site['announcement']) ?></div>
    <?php endif; ?>

    <?php if ($banner): ?>
      <div class="event-banner" id="eventBanner">
        <div class="event-banner-inner">
          <span class="event-banner-pulse"></span>
          <strong id="eventBannerTitle"><?= e((string) ($banner['title'] ?? '')) ?></strong>
          <span id="eventBannerDetails"><?= e(mt_event_line($banner)) ?></span>
        </div>
      </div>
    <?php endif; ?>

    <header class="nav-wrap">
      <div class="container nav">
        <a class="brand" href="/" aria-label="<?= e($clubName) ?> home">
          <span class="brand-mark" id="brandMark"><img src="<?= e($logo) ?>" alt="<?= e($clubName) ?> logo"></span>
          <span class="brand-name" id="brandName"><?= e($clubName) ?></span>
        </a>
        <button class="menu-button" id="menuButton" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">☰</button>
        <nav class="nav-links" id="navLinks" aria-label="Main">
          <?php foreach ($nav as [$href, $label]): ?>
            <?php
              /* On the home page the anchors stay on the page; elsewhere they point home. */
              $isAnchor = str_starts_with($href, '/#');
              $target = $isAnchor && $route === 'home' ? substr($href, 1) : $href;
            ?>
            <a href="<?= e($target) ?>"><?= e($label) ?></a>
          <?php endforeach; ?>
          <?php if ($instagram !== ''): ?>
            <a class="nav-action" id="instagramNav" href="<?= e($instagram) ?>" target="_blank" rel="noreferrer noopener">Instagram ↗</a>
          <?php endif; ?>
        </nav>
      </div>
    </header>

    <main id="top"><?= $content ?></main>

    <footer class="footer">
      <div class="container footer-row">
        <a class="brand" href="/">
          <span class="brand-mark" id="footerMark"><img src="<?= e($logo) ?>" alt="<?= e($clubName) ?> logo"></span>
          <span class="brand-name" id="footerName"><?= e($clubName) ?></span>
        </a>
        <div class="footer-institution">
          <img src="/assets/img/university-logo.png" alt="<?= e((string) ($site['universityName'] ?? '')) ?>">
          <span><?= e($department) ?> · Psychology Club</span>
        </div>
        <div class="footer-links">
          <a href="/members">Members</a>
          <a href="/gallery">Gallery</a>
          <a href="/calendar">Calendar</a>
          <a href="/dashboard">Club dashboard</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
      <div class="container creator-credit"><span class="credit-heart" aria-hidden="true">♥</span> Made with love by Mohd Shafiq · Vice President</div>
    </footer>
  </div>

  <script type="application/json" id="mt-bootstrap"><?= json_encode(
      ['revision' => (int) ($db['revision'] ?? 0)],
      JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
  ) ?></script>
  <!-- If this file never arrives, the "js" class is dropped again: the reveal
       animations only hide content under html.js, so nothing can get stuck. -->
  <script src="/assets/app.js" onerror="document.documentElement.classList.remove('js')"></script>
</body>
</html>
