<?php
/**
 * Shared page shell: head, ambient decoration, navigation and footer.
 *
 * @var string $content  Rendered page body.
 * @var array  $site     Site copy from the data store.
 * @var string $route    Current route.
 * @var string|null $pageTitle
 */
$site        = $site ?? [];
$clubName    = (string) ($site['clubName'] ?? 'Mindful Tattva');
$route       = $route ?? 'home';
$isHome      = $route === 'home';
$fullTitle   = $pageTitle ? $pageTitle . ' · ' . $clubName : $clubName . ' · Psychology Club';
$description = (string) ($site['intro'] ?? '');
$logo        = mt_safe_image($site['logoImage'] ?? '');
$instagram   = mt_safe_url($site['instagramUrl'] ?? '');
$announce    = trim((string) ($site['announcement'] ?? ''));
$clubPhone   = trim((string) ($site['clubPhone'] ?? ''));
$uniSite     = mt_safe_url($site['universityWebsite'] ?? '');
$email       = (string) ($site['email'] ?? '');
$nav = [
    ['/#' . 'about', 'About'],
    ['/#awareness', 'Awareness'],
    ['/#events', 'Events'],
    ['/gallery', 'Gallery'],
    ['/calendar', 'Calendar'],
    ['/#join', 'Join'],
    ['/#contact', 'Contact'],
];
?>
<!doctype html>
<html lang="en" class="no-js">
<!-- The script tag below upgrades this to "js": the reveal animations only
     hide content when JavaScript is actually running. -->
<script>document.documentElement.className = document.documentElement.className.replace("no-js", "js");</script>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($fullTitle) ?></title>
  <meta name="description" content="<?= e(mb_substr($description, 0, 180)) ?>">
  <meta name="theme-color" content="#34213d">
  <meta name="color-scheme" content="light">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="<?= e($logo !== '' ? $logo : '/assets/img/csmu-seal.png') ?>">
  <meta property="og:type" content="website">
  <meta property="og:title" content="<?= e($fullTitle) ?>">
  <meta property="og:description" content="<?= e(mb_substr($description, 0, 180)) ?>">
  <?php if ($logo !== ''): ?>
  <meta property="og:image" content="<?= e($logo) ?>">
  <?php endif; ?>
  <link rel="stylesheet" href="/assets/app.css">
</head>
<body class="page-<?= e($route) ?><?= $isHome ? ' is-home' : '' ?>">

  <div class="scroll-progress" aria-hidden="true"><span id="scrollProgress"></span></div>

  <div class="ambient" aria-hidden="true">
    <span class="ambient-blob ambient-blob-a"></span>
    <span class="ambient-blob ambient-blob-b"></span>
    <span class="ambient-blob ambient-blob-c"></span>
    <span class="ambient-grain"></span>
  </div>

  <?php if ($announce !== ''): ?>
    <aside class="announcement" role="note">
      <div class="container"><span aria-hidden="true">✦</span> <span><?= e($announce) ?></span> <span aria-hidden="true">✦</span></div>
    </aside>
  <?php endif; ?>

  <header class="site-header" id="siteHeader">
    <div class="container nav-bar">
      <a class="brand" href="/" aria-label="<?= e($clubName) ?> home">
        <span class="brand-mark">
          <?php if ($logo !== ''): ?>
            <img src="<?= e($logo) ?>" alt="<?= e($clubName) ?> logo" width="42" height="42">
          <?php else: ?>
            <?= e((string) ($site['shortName'] ?? 'MT')) ?>
          <?php endif; ?>
        </span>
        <span class="brand-text">
          <strong><?= e($clubName) ?></strong>
          <small><?= e((string) ($site['department'] ?? '')) ?></small>
        </span>
      </a>

      <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="siteNav" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>

      <nav class="site-nav" id="siteNav" aria-label="Main">
        <?php foreach ($nav as [$href, $label]): ?>
          <a href="<?= e($href) ?>"><?= e($label) ?></a>
        <?php endforeach; ?>
        <?php if ($instagram !== ''): ?>
          <a class="nav-pill" href="<?= e($instagram) ?>" target="_blank" rel="noreferrer noopener">Instagram ↗</a>
        <?php endif; ?>
      </nav>
    </div>
  </header>

  <?php if ($route !== 'awareness'): ?>
    <a class="awareness-tab" id="awarenessTab" href="<?= $isHome ? '#awareness' : '/awareness' ?>" hidden>
      <span aria-hidden="true">♡</span> Awareness corner
    </a>
  <?php endif; ?>

  <main id="main"><?= $content ?></main>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <span class="brand-mark">
          <?php if ($logo !== ''): ?>
            <img src="<?= e($logo) ?>" alt="" width="42" height="42">
          <?php else: ?>
            <?= e((string) ($site['shortName'] ?? 'MT')) ?>
          <?php endif; ?>
        </span>
        <div>
          <strong><?= e($clubName) ?></strong>
          <span><?= e((string) ($site['department'] ?? '')) ?></span>
        </div>
      </div>

      <div class="footer-links">
        <a href="/#about">About</a>
        <a href="/#awareness">Awareness</a>
        <a href="/gallery">Gallery</a>
        <a href="/calendar">Calendar</a>
        <a href="/#join">Join the club</a>
      </div>

      <div class="footer-contact">
        <?php if ($email !== ''): ?>
          <a href="mailto:<?= e($email) ?>"><?= e($email) ?></a>
        <?php endif; ?>
        <?php if ($clubPhone !== ''): ?>
          <a href="tel:<?= e(preg_replace('/[^+\d]/', '', $clubPhone) ?? '') ?>"><?= e($clubPhone) ?></a>
        <?php endif; ?>
        <?php if ($instagram !== ''): ?>
          <a href="<?= e($instagram) ?>" target="_blank" rel="noreferrer noopener"><?= e((string) ($site['instagramHandle'] ?? 'Instagram')) ?></a>
        <?php endif; ?>
        <?php if ($uniSite !== ''): ?>
          <a href="<?= e($uniSite) ?>" target="_blank" rel="noreferrer noopener">University website ↗</a>
        <?php endif; ?>
        <a href="https://www.google.com/maps/search/?api=1&amp;query=<?= e(urlencode((string) ($site['address'] ?? ''))) ?>" target="_blank" rel="noreferrer noopener">University campus ↗</a>
      </div>
    </div>

    <div class="container footer-base">
      <p><?= e((string) ($site['universityName'] ?? '')) ?> · <?= e((string) ($site['department'] ?? '')) ?></p>
      <p class="footer-credit">Made with care by <strong>Mohd Shafiq</strong> · Vice President <span class="heart" aria-hidden="true">♥</span></p>
    </div>
  </footer>

  <div class="lightbox" id="lightbox" hidden aria-modal="true" role="dialog" aria-label="Photo viewer">
    <div class="lightbox-backdrop" data-lightbox-close></div>
    <div class="lightbox-frame">
      <button class="lightbox-close" data-lightbox-close aria-label="Close viewer">✕</button>
      <button class="lightbox-nav lightbox-prev" data-lightbox-prev aria-label="Previous photo">←</button>
      <figure class="lightbox-figure">
        <img id="lightboxImage" alt="">
        <figcaption id="lightboxCaption" class="lightbox-caption" hidden></figcaption>
        <div id="lightboxBody" class="lightbox-body" hidden></div>
      </figure>
      <button class="lightbox-nav lightbox-next" data-lightbox-next aria-label="Next photo">→</button>
      <div class="lightbox-count" id="lightboxCount"></div>
    </div>
  </div>

  <script type="application/json" id="mt-bootstrap"><?= json_encode(mt_public_db($db ?? mt_db()), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?></script>
  <!-- If this file never arrives (a half-finished upload), the "js" class is
       dropped again: the stylesheet hides the reveal animations only under
       html.js, so content can never stay invisible because a script is missing. -->
  <script src="/assets/app.js" onerror="document.documentElement.classList.remove('js')"></script>
</body>
</html>
