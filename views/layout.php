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
<script>document.documentElement.className = document.documentElement.className.replace("no-js", "js");</script>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($fullTitle) ?></title>
  <meta name="description" content="<?= e(mb_substr($description, 0, 180)) ?>">
  <meta name="theme-color" content="#403634">
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
</head>
<body class="<?= e($bodyClass) ?>">

  <?php /* The club's own front door. The name sweeps in from the right, settles,
           drifts slowly to the left, and the solid screen lifts away to reveal
           the site. It is pure decoration: it is skipped entirely for anyone who
           asks for less motion, it goes away on its own without JavaScript, and
           any tap or key press skips it straight away. It belongs to the front
           page only — never to the club area, a pass or a check page. */ ?>
  <?php if ($splash): ?>
    <div class="splash" id="splash" aria-hidden="true">
      <div class="splash-copy">
        <span class="splash-welcome">Welcome to Club</span>
        <span class="splash-name"><?= e($clubName) ?></span>
      </div>
    </div>
  <?php endif; ?>

  <div class="bubble-field" aria-hidden="true">
    <span class="bubble bubble-a"></span><span class="bubble bubble-b"></span><span class="bubble bubble-c"></span>
    <span class="bubble bubble-d"></span><span class="bubble bubble-e"></span><span class="bubble bubble-f"></span>
    <span class="bubble bubble-g"></span>
  </div>
  <div class="gold-thread" aria-hidden="true">
    <span class="thread-rail"></span><span class="thread-fill" id="threadFill"></span>
    <span class="thread-bead" id="threadBead"></span>
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
  <div class="read-progress" aria-hidden="true"><i id="readProgress"></i></div>

  <?php /* The club's horses, behind every public page. A still frame is always
           there and the compressed clip plays over it — muted, in a loop —
           pinned to the window, so the herd keeps running while the visitor
           scrolls and every block reads through a thin film of its own paper.
           It is never dark and never in front of a word. */ ?>
  <div class="hero-media" aria-hidden="true">
    <img class="hero-still" id="heroStill" src="/assets/media/horses-running-poster.jpg" alt="" decoding="async">
    <video class="hero-video" id="heroVideo" muted loop playsinline autoplay preload="auto"
           poster="/assets/media/horses-running-poster.jpg" tabindex="-1">
      <source src="/assets/media/horses-running.mp4" type="video/mp4">
    </video>
  </div>

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
          <?php /* The club's butterfly. She rides beside the club's name on the
                   pinned bar and beats her wings the whole time the page is read.
                   A real butterfly from above: two pairs of scalloped wings with
                   cream spots, a slim body, antennae. Drawn here as paths, so she
                   costs the page nothing and stays crisp at any size. */ ?>
          <span class="nav-butterfly" aria-hidden="true">
            <svg viewBox="0 0 40 36" focusable="false">
              <defs>
                <linearGradient id="bfFore" x1="0.1" y1="0" x2="0.9" y2="1">
                  <stop offset="0" stop-color="#f6cf87"/><stop offset="0.55" stop-color="#e39a6d"/><stop offset="1" stop-color="#c4705f"/>
                </linearGradient>
                <linearGradient id="bfHind" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#e8a56c"/><stop offset="1" stop-color="#b25f56"/>
                </linearGradient>
                <radialGradient id="bfGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stop-color="rgba(255,244,222,.95)"/><stop offset="1" stop-color="rgba(255,244,222,0)"/>
                </radialGradient>
              </defs>
              <ellipse cx="20" cy="19" rx="17" ry="15" fill="url(#bfGlow)" opacity=".55"/>
              <g class="bf-wing bf-wing-left">
                <path d="M18.6 13.4C15.4 6.6 10.4 2.4 5.8 2.9 1.6 3.4-.1 7.5 2.2 10.9 4.6 14.5 10.6 16.2 18.6 13.4Z" fill="url(#bfFore)"/>
                <path d="M18.4 15.1C12.2 13.9 5.8 15.4 4 19.4 2 24 5.9 27.6 10.4 26.1 14.4 24.8 17.4 20.4 18.4 15.1Z" fill="url(#bfHind)"/>
                <path d="M18.5 20.5C17 25.1 15.4 29.4 12.6 32.2 11.4 33.4 9.8 32.6 10.2 31.1 11 27.6 14.2 23.4 18.5 20.5Z" fill="url(#bfHind)" opacity=".85"/>
                <circle cx="8.4" cy="7.2" r="1.5" fill="#fff6e6" opacity=".9"/>
                <circle cx="12.4" cy="10.2" r="1" fill="#fff6e6" opacity=".75"/>
                <circle cx="9" cy="21.4" r="1.3" fill="#fff6e6" opacity=".8"/>
              </g>
              <g class="bf-wing bf-wing-right">
                <path d="M18.6 13.4C15.4 6.6 10.4 2.4 5.8 2.9 1.6 3.4-.1 7.5 2.2 10.9 4.6 14.5 10.6 16.2 18.6 13.4Z" fill="url(#bfFore)"/>
                <path d="M18.4 15.1C12.2 13.9 5.8 15.4 4 19.4 2 24 5.9 27.6 10.4 26.1 14.4 24.8 17.4 20.4 18.4 15.1Z" fill="url(#bfHind)"/>
                <path d="M18.5 20.5C17 25.1 15.4 29.4 12.6 32.2 11.4 33.4 9.8 32.6 10.2 31.1 11 27.6 14.2 23.4 18.5 20.5Z" fill="url(#bfHind)" opacity=".85"/>
                <circle cx="8.4" cy="7.2" r="1.5" fill="#fff6e6" opacity=".9"/>
                <circle cx="12.4" cy="10.2" r="1" fill="#fff6e6" opacity=".75"/>
                <circle cx="9" cy="21.4" r="1.3" fill="#fff6e6" opacity=".8"/>
              </g>
              <g class="bf-body" fill="#4a2f45">
                <path d="M20.6 12.6c1.5 3 1.5 10.6 0 13.6-1.5-3-1.5-10.6 0-13.6Z"/>
                <circle cx="20.6" cy="11.4" r="1.7"/>
                <path d="M19.8 10.2C18.7 7.4 17.3 5.8 15.6 5" fill="none" stroke="#4a2f45" stroke-width="1" stroke-linecap="round"/>
                <path d="M21.4 10.2c1.1-2.8 2.5-4.4 4.2-5.2" fill="none" stroke="#4a2f45" stroke-width="1" stroke-linecap="round"/>
              </g>
            </svg>
          </span>
        </a>
        <button class="menu-button" id="menuButton" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">☰</button>
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
