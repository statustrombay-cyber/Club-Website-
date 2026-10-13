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
$photos = mt_sorted(mt_gallery_photos($db['gallery'] ?? []));

/* Every event keeps its own album. A photo is filed under the event the club
   chose for it, so photos from one gathering can never appear inside another:
   Event 1 · Welcome Circle, Event 2 · …, and anything the club has not filed
   yet stays in a separate "not filed yet" group at the end. */
$events = mt_events_for_display($db);
$byEvent = [];
$unfiled = [];
foreach ($photos as $item) {
    $eventId = trim((string) ($item['eventId'] ?? ''));
    $label   = trim((string) ($item['event'] ?? ''));
    $matched = null;
    foreach ($events as $event) {
        $sameId   = $eventId !== '' && (string) ($event['id'] ?? '') === $eventId;
        $sameName = $eventId === '' && $label !== '' && strcasecmp($label, (string) ($event['title'] ?? '')) === 0;
        if ($sameId || $sameName) {
            $matched = (string) ($event['id'] ?? '');
            break;
        }
    }
    if ($matched === null) {
        $unfiled[] = $item;
        continue;
    }
    $byEvent[$matched][] = $item;
}

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

/* The album, grouped: each event first (in number order), then anything unfiled. */
$albums = [];
foreach ($events as $event) {
    $eventId = (string) ($event['id'] ?? '');
    $eventPhotos = $byEvent[$eventId] ?? [];
    if (!$eventPhotos) {
        continue;
    }
    /* each photo knows which album it is in, so the tile wears its number */
    $tagged = [];
    foreach ($eventPhotos as $photoRow) {
        $photoRow['eventLabel'] = mt_event_label($event);
        $tagged[] = $photoRow;
    }
    $albums[] = [
        'label'  => mt_event_label($event),
        'title'  => (string) ($event['title'] ?? ''),
        'meta'   => mt_event_line($event),
        'photos' => $tagged,
    ];
}
if ($unfiled) {
    $albums[] = [
        'label'  => 'Not filed yet',
        'title'  => 'Photos waiting for their event',
        'meta'   => 'The club will file these under an event from the club area.',
        'photos' => $unfiled,
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
          <p>Photos are added by the club team, so this page turns into a living archive of the
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
      <?php if ($albums): ?>
        <?php foreach ($albums as $album): ?>
          <section class="album">
            <header class="album-head">
              <span class="album-number"><?= e($album['label']) ?></span>
              <div>
                <h3><?= e($album['title']) ?></h3>
                <p><?= e($album['meta']) ?></p>
              </div>
              <span class="album-count"><?= count($album['photos']) ?> <?= count($album['photos']) === 1 ? 'photo' : 'photos' ?></span>
            </header>
            <div class="archive-grid" id="archiveGrid">
              <?php foreach ($album['photos'] as $photo): ?>
                <?= mt_archive_card($photo) ?>
              <?php endforeach; ?>
            </div>
          </section>
        <?php endforeach; ?>
      <?php else: ?>
        <div class="archive-grid">
          <?= mt_gallery_empty('No event photos yet.', 'The first photo the club uploads will begin the archive.') ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<?= mt_photo_frame() ?>
<script type="application/json" id="gallery-data"><?= $galleryJson ?></script>
