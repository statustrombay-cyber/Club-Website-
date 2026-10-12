<?php
/**
 * Public photo gallery.
 *
 * @var array $site
 * @var array $db
 */
$site    = $site ?? [];
$db      = $db ?? mt_db();
$gallery = array_values(array_filter($db['gallery'] ?? [], static fn($item) => mt_safe_image($item['image'] ?? '') !== ''));
$events  = array_values(array_unique(array_filter(array_map(static fn($item) => trim((string) ($item['event'] ?? '')), $gallery))));
?>

<section class="cal-hero">
  <div class="container">
    <span class="eyebrow">Mindful Tattva · photo album</span>
    <h1 class="display">A scrapbook of <em style="color:var(--terracotta);font-style:normal">small moments.</em></h1>
    <p class="lede">Workshops, circles, campus conversations and the quiet pauses in between. Click any photo to open it in the full-frame viewer.</p>
  </div>
</section>

<section class="section section-tight" id="gallery">
  <div class="container" data-gallery-toolbar>
    <div class="gallery-toolbar">
      <div class="chip-row" data-render="gallery-filters">
        <span class="chip is-active"><?= count($gallery) ?> photo<?= count($gallery) === 1 ? '' : 's' ?></span>
      </div>
      <label class="chip" style="display:flex;align-items:center;gap:8px;cursor:text">
        <span aria-hidden="true">⌕</span>
        <input data-gallery-search type="search" placeholder="Search captions" aria-label="Search photos"
               style="border:0;background:transparent;outline:none;width:170px;font-size:.82rem">
      </label>
    </div>

    <div class="gallery-grid" data-render="gallery">
      <?php if ($gallery): ?>
        <?php foreach ($gallery as $index => $item): ?><?= mt_gallery_card($item, $index) ?><?php endforeach; ?>
      <?php else: ?>
        <div class="empty-state">
          <strong>The album is warming up.</strong>
          <p>As soon as the club team uploads event photos from the dashboard, they will appear here in full frame.</p>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>
