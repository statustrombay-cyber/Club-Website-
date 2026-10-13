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

/* The club's photos, in the order the club set: order 1 first, order 2 next.
   There are no categories any more — a photo is just a photo with a caption,
   so the gallery is one strip and the club decides what leads it. The same
   list is what the stage turns through. */
$slides = mt_gallery_slides($db['gallery'] ?? []);
?>
<section class="gallery-hero">
  <div class="container">
    <div class="eyebrow" style="color:var(--gold)">Mindful Tattva / event gallery</div>
    <h1 class="display">A scrapbook of <em>small moments.</em></h1>
    <p>As the club grows, workshops, circles, campus conversations and shared pauses will find their way here.</p>
  </div>
</section>

<section class="gallery-shell" id="gallery">
  <div class="container">
    <div class="gallery-showcase">
      <?= mt_gallery_stage($slides) ?>
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
      <?php if ($slides): ?>
        <div class="archive-grid" id="archiveGrid">
          <?php foreach ($photos as $photo): ?>
            <?= mt_archive_card($photo) ?>
          <?php endforeach; ?>
        </div>
      <?php else: ?>
        <div class="archive-grid">
          <?= mt_gallery_empty('No photos yet.', 'The first photo the club uploads will begin the album.') ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<?= mt_photo_frame() ?>
<?= mt_gallery_data($slides) ?>
