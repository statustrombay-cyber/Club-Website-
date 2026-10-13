<?php
/**
 * Shared shell for the public site: the two slow glows behind everything, the
 * announcement strip, the live event banner, the floating navigation and the
 * footer with both logos.
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
/* The route name only: a private pass link must never end up in the markup,
   and neither should a query string. */
$routeClass = preg_replace('/[^a-z0-9-]/', '', strtolower(explode('/', $route)[0])) ?: 'page';
$bodyClass = trim(($bodyClass ?? '') . ' page-' . $routeClass);
$clubName  = (string) ($site['clubName'] ?? 'Mindful Tattva');
$department = (string) ($site['department'] ?? '');
$university = (string) ($site['universityName'] ?? '');
$fullTitle = $pageTitle ? $pageTitle . ' · ' . $clubName : $clubName . ' · Psychology Club';
$description = (string) ($site['intro'] ?? '');
$logo      = mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg';
$instagram = mt_safe_url($site['instagramUrl'] ?? '');
$email     = trim((string) ($site['email'] ?? ''));
$phone     = trim((string) ($site['clubPhone'] ?? ''));
$address   = trim((string) ($site['address'] ?? ''));
$mapUrl    = 'https://www.google.com/maps/search/?api=1&query=' . urlencode($address !== '' ? $address : $university);
$banner    = mt_featured_event($db);
$year      = date('Y');

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
  <meta name="theme-color" content="#08080b">
  <meta name="color-scheme" content="dark">
  <link rel="icon" href="/assets/img/favicon-48.png" sizes="48x48" type="image/png">
  <link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="/assets/img/favicon-192.png" sizes="192x192" type="image/png">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png">
  <meta property="og:type" content="website">
  <meta property="og:title" content="<?= e($fullTitle) ?>">
  <meta property="og:description" content="<?= e(mb_substr($description, 0, 180)) ?>">
  <meta property="og:image" content="<?= e($logo) ?>">
  <link rel="stylesheet" href="/assets/app.css">
</head>
<body class="<?= e($bodyClass) ?>">

  <?php /* Two slow glows and a grain sheet. They sit behind every word, are
           never in front of anything, and go completely still for a visitor
           who has asked their device for less movement. */ ?>
  <div class="ambient" aria-hidden="true">
    <span class="ambient-blob ambient-blob-a"></span>
    <span class="ambient-blob ambient-blob-b"></span>
  </div>
  <div class="read-progress" aria-hidden="true"><i id="readProgress"></i></div>

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
          <span class="brand-mark" id="brandMark"><img src="<?= e($logo) ?>" alt="<?= e($clubName) ?> logo" loading="lazy" decoding="async"></span>
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

    <a class="to-top" id="toTop" href="#top" aria-label="Back to top">↑</a>

    <?php /* The foot of every page: the club's name running, then everything
             the club asked to keep here — the club's own crest, the
             university's mark with its campus address, and the copyright. */ ?>
    <footer class="footer">
      <div class="container">
        <span class="footer-name" aria-hidden="true"><?= e($clubName) ?></span>
        <div class="footer-row">
          <a class="brand" href="/">
            <span class="brand-mark" id="footerMark"><img src="<?= e($logo) ?>" alt="<?= e($clubName) ?> logo" loading="lazy" decoding="async"></span>
            <span class="brand-name" id="footerName"><?= e($clubName) ?></span>
          </a>
          <div class="footer-institution">
            <img src="/assets/img/university-logo.png" alt="<?= e($university) ?>" loading="lazy" decoding="async">
            <span><?= e($department) ?><?= $department !== '' ? ' · ' : '' ?>Psychology Club<?= $university !== '' ? ' · ' . e($university) : '' ?></span>
          </div>
          <div class="footer-links">
            <a href="/members">Members</a>
            <a href="/gallery">Gallery</a>
            <a href="/calendar">Calendar</a>
            <?php if ($instagram !== ''): ?><a href="<?= e($instagram) ?>" target="_blank" rel="noreferrer noopener">Instagram</a><?php endif; ?>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>

        <div class="footer-logos">
          <img class="footer-logo-club" src="<?= e($logo) ?>" alt="<?= e($clubName) ?> logo" loading="lazy" decoding="async">
          <img src="/assets/img/university-logo.png" alt="<?= e($university) ?>" loading="lazy" decoding="async">
          <img src="/assets/img/csmu-seal.png" alt="<?= e($university) ?> seal" loading="lazy" decoding="async">
        </div>
        <?php if ($address !== ''): ?>
          <div class="footer-address">
            <?= e($university) ?> · <?= e($address) ?><?php if ($email !== ''): ?> · <a href="mailto:<?= e($email) ?>"><?= e($email) ?></a><?php endif; ?><?php if ($phone !== ''): ?> · <?= e($phone) ?><?php endif; ?>
          </div>
        <?php endif; ?>

        <div class="footer-legal">
          <span>© <?= e($clubName) ?> <?= e($year) ?></span>
          <span><?= e($university) ?></span>
          <span>All rights reserved</span>
        </div>
        <div class="creator-credit"><span class="credit-heart" aria-hidden="true">♥</span> Made with love by Mohd Shafiq · Vice President</div>
      </div>
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
