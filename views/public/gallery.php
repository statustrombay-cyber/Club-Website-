<?php
/**
 * The event gallery — the club's photo album.
 *
 * The first photo and the whole archive are written by PHP, so the page is
 * complete before any script runs; the script only takes over the stage after.
 *
 * @var array $db    Whole content store.
 * @var array $site  Club copy.
 */
$photos = mt_sorted($db['gallery'] ?? []);
$slides = [];
foreach ($photos as $item) {
    $image = mt_safe_image($item['image'] ?? '');
    $caption = trim((string) ($item['caption'] ?? '')) !== '' ? (string) $item['caption'] : 'Mindful Tattva memory';
    $slides[] = [
        'caption' => $caption,
        'kicker'  => trim((string) ($item['event'] ?? $item['kicker'] ?? '')) !== '' ? (string) ($item['event'] ?? $item['kicker']) : 'Mindful Tattva memory',
        'image'   => $image,
        'alt'     => trim((string) ($item['alt'] ?? '')) !== '' ? (string) $item['alt'] : $caption,
    ];
}
$first = $slides[0] ?? null;
$stage = $first && $first['image'] !== '';
$galleryJson = json_encode(
    ['slides' => $slides],
    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
);
?>
<section class="gallery-hero">
  <div class="container">
    <div class="eyebrow" style="color:#f0b287">Mindful Tattva / event gallery</div>
    <h1 class="display">A scrapbook of <em>small moments.</em></h1>
    <p>As the club grows, workshops, circles, campus conversations and shared pauses will find their way here.</p>
  </div>
</section>

<section class="gallery-shell" id="gallery">
  <div class="container">
    <div class="gallery-showcase">
      <div class="gallery-stage" id="galleryStage">
        <div class="gallery-stage-image<?= $stage ? ' has-image' : '' ?>" id="galleryStageImage" role="img"
             aria-label="<?= e($first['alt'] ?? 'Gallery photo') ?>"<?= mt_background_style($first['image'] ?? '') ?>></div>
        <div class="gallery-stage-copy">
          <small id="galleryStageKicker"><?= e($first['kicker'] ?? 'Mindful Tattva memory') ?></small>
          <h2 id="galleryStageCaption"><?= e($first['caption'] ?? 'Your first club memory') ?></h2>
          <div class="gallery-controls">
            <button class="gallery-control" id="galleryPrev" aria-label="Previous photo">←</button>
            <span class="gallery-counter" id="galleryCounter">01 / <?= str_pad((string) max(1, count($slides)), 2, '0', STR_PAD_LEFT) ?></span>
            <button class="gallery-control" id="galleryNext" aria-label="Next photo">→</button>
          </div>
        </div>
      </div>
      <aside class="gallery-side-note">
        <div>
          <div class="eyebrow">Keep the thread</div>
          <h2>Every gathering leaves a trace.</h2>
          <p>Photos are uploaded by the club team from the dashboard, so this page turns into a living archive of the
            people, ideas and moments that shape Mindful Tattva.</p>
        </div>
        <div class="mini-psi">Ψ</div>
      </aside>
    </div>

    <div class="gallery-archive">
      <div class="gallery-archive-head">
        <div><div class="eyebrow">The archive</div><h2>Look back,<br>feel forward.</h2></div>
        <p><?= e((string) ($site['galleryIntro'] ?? 'Photos and captions added by the club appear here automatically.')) ?></p>
      </div>
      <div class="archive-grid" id="archiveGrid">
        <?php if ($slides): ?>
          <?php foreach ($slides as $slide): ?>
            <?= mt_archive_card($slide) ?>
          <?php endforeach; ?>
        <?php else: ?>
          <?= mt_gallery_empty('No event photos yet.', 'The first photo the club uploads will begin the archive.') ?>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>
<script type="application/json" id="gallery-data"><?= $galleryJson ?></script>
