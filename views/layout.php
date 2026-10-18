<?php
/**
 * Shared shell for the public site: the drifting bubbles, the announcement
 * strip, the live event banner, the navigation and the footer.
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
$fullTitle = $pageTitle ? $pageTitle . ' — ' . $clubName : $clubName . ' — Psychology Club';
$description = (string) ($site['intro'] ?? '');
$logo      = mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg';
$instagram = mt_safe_url($site['instagramUrl'] ?? '');
$email     = trim((string) ($site['email'] ?? ''));
$phone     = trim((string) ($site['clubPhone'] ?? ''));
$address   = trim((string) ($site['address'] ?? ''));
$mapUrl    = 'https://www.google.com/maps/search/?api=1&query=' . urlencode($address !== '' ? $address : (string) ($site['universityName'] ?? ''));
$banner    = mt_featured_event($db);
/* The welcome screen belongs to the front page and nowhere else: a student
   opening a pass or a check page must never wait for decoration. */
$splash    = in_array($route, ['home', 'index.php'], true);

$nav = [
    ['/#about', 'About', ''],
    ['/#psychology', 'The lens', 'nav-lens'],
    ['/#history', 'Our story', ''],
    ['/#events', 'Events', ''],
    ['/gallery', 'Gallery', ''],
    ['/calendar', 'Calendar', ''],
    ['/#team', 'Core team', ''],
    ['/members', 'Members', ''],
    ['/#join', 'Join', ''],
    ['/#contact', 'Contact', ''],
];
?>
<!doctype html>
<html lang="en" class="no-js">
<script>document.documentElement.className = document.documentElement.className.replace("no-js", "js"); if (location.hash.length > 1) document.documentElement.classList.add("section-entry");</script>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($fullTitle) ?></title>
  <meta name="description" content="<?= e(mb_substr($description, 0, 180)) ?>">
  <meta name="theme-color" content="#403634">
  <?php if ($splash): ?><script>if (!location.hash) { document.documentElement.classList.add('intro-cover'); document.querySelector('meta[name="theme-color"]').content='#09090b'; }</script><?php endif; ?>
  <meta name="color-scheme" content="light">
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
  <?php if ($splash): ?>
    <link rel="preload" as="script" href="/index.php?scene-asset=engine" fetchpriority="low">
    <link rel="stylesheet" href="/assets/story.css">
    <script src="/assets/audio.js" defer></script>
    <script src="/assets/story.js" defer></script>
  <?php endif; ?>
</head>
<body class="<?= e($bodyClass) ?>">


  <?php /* The seven circles assemble automatically, then the veil dissolves.
           CSS also dismisses it without JavaScript. Motion preferences and
           direct section links are respected; ordinary taps never dismiss the splash. */ ?>
  <?php if ($splash): ?>
    <div class="splash" id="splash" aria-hidden="true">
      <div class="splash-copy">
        <div class="splash-ring-intro"><?= mt_reference_rings(false, 'splash-rings') ?></div>
        <?= file_get_contents(MT_ASSETS . '/motion/intro-word.svg') ?>
      </div>
    </div>
  <?php endif; ?>



  <div class="bubble-field" aria-hidden="true">
    <span class="bubble bubble-a"></span><span class="bubble bubble-b"></span><span class="bubble bubble-c"></span>
    <span class="bubble bubble-d"></span><span class="bubble bubble-e"></span><span class="bubble bubble-f"></span>
    <span class="bubble bubble-g"></span>
  </div>
  <?php /* Decoration that never stops: warm lights drifting behind every
           block, a scatter of sparkles and a few soft petals falling through
           them. It sits behind the words, it cannot be clicked, and it eases
           upward as the page is read — so the page keeps breathing while it is
           scrolled. A visitor who asks for less motion gets it still. */ ?>
  <div class="drift-field" id="driftField" aria-hidden="true">
    <span class="drift-blob blob-a"></span><span class="drift-blob blob-b"></span><span class="drift-blob blob-c"></span>
    <span class="drift-sparkle sparkle-a"></span><span class="drift-sparkle sparkle-b"></span>
    <span class="drift-sparkle sparkle-c"></span><span class="drift-sparkle sparkle-d"></span>
    <span class="drift-sparkle sparkle-e"></span><span class="drift-sparkle sparkle-f"></span>
    <span class="drift-sparkle sparkle-g"></span><span class="drift-sparkle sparkle-h"></span>
    <span class="drift-petal petal-a"></span><span class="drift-petal petal-b"></span>
    <span class="drift-petal petal-c"></span><span class="drift-petal petal-d"></span>
    <span class="drift-petal petal-e"></span><span class="drift-petal petal-f"></span>
  </div>

  <?php /* The club's horses, behind every public page. A still frame is always
           there and the compressed clip plays over it — muted, in a loop —
           pinned to the window, so the herd keeps running while the visitor
           scrolls and every block reads through a thin film of its own paper.
           It is never dark and never in front of a word. */ ?>
  <div class="hero-media" aria-hidden="true">
    <img class="hero-still" id="heroStill" src="/assets/media/horses-running-poster.jpg" alt="" decoding="async">
    <video class="hero-video" id="heroVideo" muted loop playsinline autoplay preload="auto" data-desktop-src="/assets/media/horses-desktop.mp4" data-mobile-src="/assets/media/horses-mobile.mp4"
           poster="/assets/media/horses-running-poster.jpg" tabindex="-1">
      <source src="/assets/media/horses-mobile.mp4" media="(prefers-reduced-motion: no-preference) and (max-width: 900px)" type="video/mp4">
      <source src="/assets/media/horses-desktop.mp4" media="(prefers-reduced-motion: no-preference)" type="video/mp4">
      <?php /* The 1440px master stays in assets; the player selects one lighter
               fast-start rendition before making any media request. */ ?>
    </video>
  </div>

  <?php /* Viewport flight layer: it never changes brand/menu layout or intercepts a click. */ ?>
  <span class="nav-butterfly" aria-hidden="true">
    <span class="butterfly-flight">
      <img class="butterfly-wing wing-left" src="/assets/img/butterfly-flight.png" alt="" width="626" height="428" decoding="async">
      <img class="butterfly-wing wing-right" src="/assets/img/butterfly-flight.png" alt="" width="626" height="428" decoding="async">
      <img class="butterfly-body" src="/assets/img/butterfly-flight.png" alt="" width="626" height="428" decoding="async">
    </span>
  </span>

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
        <button type="button" class="menu-button" id="menuButton" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">☰</button>
        <nav class="nav-links" id="navLinks" aria-label="Main">
          <?php foreach ($nav as [$href, $label, $class]): ?>
            <?php
              /* On the home page the anchors stay on the page; elsewhere they point home. */
              $isAnchor = str_starts_with($href, '/#');
              $target = $isAnchor && $route === 'home' ? substr($href, 1) : $href;
            ?>
            <a href="<?= e($target) ?>"<?= $class !== '' ? ' class="' . e($class) . '"' : '' ?>><?= e($label) ?></a>
          <?php endforeach; ?>
          <?php if ($instagram !== ''): ?>
            <a class="nav-action" id="instagramNav" href="<?= e($instagram) ?>" target="_blank" rel="noreferrer noopener">Instagram ↗</a>
          <?php endif; ?>
        </nav>
      </div>
    </header>

    <main id="top"><?= $content ?></main>

    <a class="to-top" id="toTop" href="#top" aria-label="Back to top">↑</a>

    <footer class="footer">
      <div class="container footer-row">
        <a class="brand" href="/">
          <span class="brand-mark" id="footerMark"><img src="<?= e($logo) ?>" alt="<?= e($clubName) ?> logo" loading="lazy" decoding="async"></span>
          <span class="brand-name" id="footerName"><?= e($clubName) ?></span>
        </a>
        <div class="footer-institution">
          <img src="/assets/img/university-logo.png" alt="<?= e((string) ($site['universityName'] ?? '')) ?>" loading="lazy" decoding="async">
          <span><?= e($department) ?> — Psychology Club</span>
          <?php if ($address !== '' && !in_array($routeClass, ['pass', 'verify'], true)): ?><a class="footer-address" href="<?= e($mapUrl) ?>" target="_blank" rel="noopener noreferrer"><?= e($address) ?></a><?php endif; ?>
          <?php if ($email !== ''): ?><a href="mailto:<?= e($email) ?>"><?= e($email) ?></a><?php endif; ?>
          <?php if ($instagram !== ''): ?><a href="<?= e($instagram) ?>" target="_blank" rel="noopener noreferrer"><?= e((string) ($site['instagramHandle'] ?? 'Instagram')) ?> ↗</a><?php endif; ?>
        </div>
        <div class="footer-links">
          <a href="/members">Members</a>
          <a href="/gallery">Gallery</a>
          <a href="/calendar">Calendar</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
      <div class="container creator-credit"><span class="credit-heart" aria-hidden="true">♥</span> Made with love by Mohd Shafiq — Vice President</div>
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
