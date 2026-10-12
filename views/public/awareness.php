<?php
/**
 * Mental health awareness page: the tile rails plus every note in full.
 *
 * @var array $site
 * @var array $db
 */
$site      = $site ?? [];
$db        = $db ?? mt_db();
$awareness = mt_sorted($db['awareness'] ?? []);
?>

<section class="cal-hero">
  <div class="container">
    <span class="eyebrow"><?= e((string) ($site['awarenessEyebrow'] ?? 'Mental health awareness')) ?></span>
    <h1 class="display"><?= e((string) ($site['awarenessHeading'] ?? 'Mental health is not a theory.')) ?></h1>
    <p class="lede"><?= e((string) ($site['awarenessIntro'] ?? '')) ?></p>
  </div>
</section>

<?php if ($awareness): ?>
<section class="awareness section section-tight">
  <div class="awareness-stage" data-awareness-stage style="--tiles: <?= max(1, count($awareness)) ?>">
    <div class="awareness-sticky">
      <div class="container awareness-layout">
        <div class="awareness-copy">
          <span class="eyebrow">How it reaches us</span>
          <h2 class="display">Keep scrolling — the tiles move with you.</h2>
          <p>Each tile is one honest observation about how pressure, loneliness and stress show up around us. Tap a tile to read the full note.</p>
          <div class="awareness-note">
            <strong>If someone needs help tonight</strong>
            <?= e((string) ($site['awarenessNote'] ?? '')) ?>
          </div>
          <div class="awareness-hint" aria-hidden="true">
            <span class="dots"><i></i><i></i><i></i></span>
            <span>Scroll to keep them moving</span>
          </div>
        </div>

        <div class="awareness-rails" data-render="awareness">
          <?= mt_awareness_rails($awareness) ?>
        </div>
      </div>
    </div>
  </div>
  <div class="awareness-progress" aria-hidden="true"><span data-rail-progress></span></div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">The notes in full</span>
        <h2 class="display">Read slowly. Share generously.</h2>
      </div>
      <p>Everything below is written to be read once, remembered later and passed on to someone who might need it this week.</p>
    </div>

    <div class="grid-3">
      <?php foreach ($awareness as $index => $tile): ?>
        <article class="lens-card reveal">
          <?php $image = mt_safe_image($tile['image'] ?? ''); ?>
          <?php if ($image !== ''): ?>
            <img src="<?= e($image) ?>" alt="<?= e((string) ($tile['title'] ?? '')) ?>" loading="lazy"
                 style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:18px;margin-bottom:18px">
          <?php endif; ?>
          <div class="index"><?= e((string) ($tile['eyebrow'] ?? 'Awareness')) ?></div>
          <h3 style="margin-top:10px"><?= e((string) ($tile['title'] ?? '')) ?></h3>
          <?php if (!empty($tile['stat'])): ?>
            <p style="color:var(--terracotta);font-weight:700"><?= e((string) $tile['stat']) ?></p>
          <?php endif; ?>
          <?php if (!empty($tile['source'])): ?>
            <p class="muted" style="font-size:.72rem;letter-spacing:.1em;text-transform:uppercase">Source: <?= e((string) $tile['source']) ?></p>
          <?php endif; ?>
          <?php if (!empty($tile['body'])): ?><p><?= e((string) $tile['body']) ?></p><?php endif; ?>
          <?php if (!empty($tile['takeaway'])): ?>
            <p style="margin-top:12px"><strong><?= e((string) $tile['takeaway']) ?></strong></p>
          <?php endif; ?>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php else: ?>
<section class="section">
  <div class="container">
    <div class="empty-state">
      <strong>The awareness corner is being written.</strong>
      <p>Fresh mental health notes and illustrations are on the way from the club team.</p>
    </div>
  </div>
</section>
<?php endif; ?>

<section class="section section-plum">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">Support, right now</span>
        <h2 class="display">Asking for help is maintenance, not weakness.</h2>
      </div>
      <p>If you or a friend are struggling, these free helplines are answered by trained counsellors. Talking to your campus counsellor or a trusted teacher counts too.</p>
    </div>

    <div class="grid-3">
      <article class="detail-card" style="background:rgba(255,248,239,.08);border-color:rgba(255,248,239,.18)">
        <span style="color:var(--coral)">Tele-MANAS · 24×7</span>
        <h3 style="color:#fff8ef">14416</h3>
        <p style="color:rgba(247,238,230,.78)">Government of India national mental health helpline. Free, confidential, in many languages.</p>
      </article>
      <article class="detail-card" style="background:rgba(255,248,239,.08);border-color:rgba(255,248,239,.18)">
        <span style="color:var(--coral)">KIRAN helix</span>
        <h3 style="color:#fff8ef">1800-599-0019</h3>
        <p style="color:rgba(247,238,230,.78)">Toll-free mental health support helpline from the Ministry of Social Justice.</p>
      </article>
      <article class="detail-card" style="background:rgba(255,248,239,.08);border-color:rgba(255,248,239,.18)">
        <span style="color:var(--coral)">On campus</span>
        <h3 style="color:#fff8ef">Your counsellor</h3>
        <p style="color:rgba(247,238,230,.78)">Every university has student support services. Walk in, or ask a faculty member to help you find one.</p>
      </article>
    </div>
  </div>
</section>
