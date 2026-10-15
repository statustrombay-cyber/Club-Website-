<?php
/**
 * Mindful Tattva · server-side cards
 * ----------------------------------
 * Every card on the site is written here, in the markup the original design
 * used, so the page is complete before any script runs.
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

function mt_initials(string $name): string
{
    $parts = preg_split('/\s+/', trim($name)) ?: [];
    $letters = '';
    foreach (array_slice(array_filter($parts), 0, 2) as $part) {
        $letters .= mb_strtoupper(mb_substr($part, 0, 1));
    }
    return $letters !== '' ? $letters : 'MT';
}

function mt_sorted(array $items): array
{
    usort($items, static fn($a, $b) => ((int) ($a['order'] ?? 0)) <=> ((int) ($b['order'] ?? 0)));
    return $items;
}

/** An inline background-image declaration, or '' when there is no picture. */
/** A headline the way the original design wrote it: one word carried in <em>. */
function mt_emphasise(string $text): string
{
    $clean = trim($text);
    if ($clean === '') {
        return '';
    }
    if (stripos($clean, '<em>') !== false) {
        /* The club typed its own emphasis: keep exactly that. */
        return strip_tags($clean, '<em>');
    }
    $escaped = e($clean);
    $keywords = ['mind', 'minds', 'mindful', 'pause', 'notice', 'understand', 'circle', 'calm'];
    foreach ($keywords as $keyword) {
        $pattern = '/\b(' . preg_quote($keyword, '/') . ')\b/i';
        if (preg_match($pattern, $escaped)) {
            return preg_replace($pattern, '<em>$1</em>', $escaped, 1) ?? $escaped;
        }
    }
    $words = preg_split('/\s+/', $escaped) ?: [];
    $last = array_pop($words);
    if ($last === null) {
        return $escaped;
    }
    return implode(' ', $words) . ' <em>' . $last . '</em>';
}

function mt_background_style(string $image, string $alt = ''): string
{
    if ($image === '') {
        return '';
    }
    return ' style="background-image:url(\'' . str_replace(["'", '</style'], ['%27', ''], $image) . '\')"';
}

/**
 * An event card: the club's own visual, the date, the facts, and — when the
 * backend has opened registration — the way in.
 */
function mt_event_card(array $event, ?array $registration = null): string
{
    $db = mt_db();
    $image = mt_safe_image($event['image'] ?? '');
    $fee = mt_event_fee($event);
    $state = mt_event_registration_state($db, $event);
    $seats = mt_event_seats_left($db, $event);
    $label = trim((string) ($event['kicker'] ?? '')) !== '' ? (string) $event['kicker'] : 'Club gathering';
    $facts = array_filter([
        trim((string) ($event['time'] ?? '')),
        trim((string) ($event['location'] ?? '')),
    ], static fn($part) => $part !== '');
    ob_start(); ?>
      <article class="event-card">
        <div class="card-visual<?= $image !== '' ? ' has-image' : '' ?>"<?= mt_background_style($image) ?>>
          <span class="visual-label"><?= e($label) ?></span>
          <?php if ((int) ($event['number'] ?? 0) > 0): ?><span class="visual-number"><?= e(mt_event_label($event)) ?></span><?php endif; ?>
        </div>
        <div class="event-body">
          <div class="event-date"><?= e(mt_event_date_display($event)) ?></div>
          <h3><?= e((string) ($event['title'] ?? 'Mindful Tattva activity')) ?></h3>
          <?php if (trim((string) ($event['description'] ?? '')) !== ''): ?>
            <p><?= e((string) $event['description']) ?></p>
          <?php endif; ?>
          <?php if ($facts): ?>
            <span class="event-link"><?= e(implode(', ', $facts)) ?></span>
          <?php endif; ?>

          <div class="event-actions">
            <span class="event-fee<?= $fee > 0 ? '' : ' is-free' ?>"><?= e($fee > 0 ? mt_money($fee) : 'Free entry') ?></span>
            <?php if ($state['open']): ?>
              <?php if ($registration && mt_registration_pass_ready($registration)): ?>
                <a class="solid-button" href="/pass">Your pass ↗</a>
              <?php else: ?>
                <a class="solid-button" href="/register?event=<?= e((string) $event['id']) ?>">Register ↗</a>
              <?php endif; ?>
            <?php else: ?>
              <span class="status-chip is-closed">Registration closed</span>
            <?php endif; ?>
            <?php if ($seats !== null): ?>
              <span class="event-window"><?= (int) $seats ?> seat<?= $seats === 1 ? '' : 's' ?> left</span>
            <?php endif; ?>
          </div>
          <span class="event-window<?= $state['open'] ? '' : ' is-closed' ?>"><?= e($state['label']) ?></span>
        </div>
      </article>
    <?php
    return (string) ob_get_clean();
}

/**
 * The club's name, running across the page between two blocks.
 *
 * Two identical halves in one track, each word carrying its own trailing space
 * instead of a gap, so the run loops without a seam. Decoration only: no link,
 * nothing for a screen reader, and it holds still for anyone who asks for less
 * motion (the stylesheet decides that).
 */
function mt_brand_band(string $name): string
{
    $name = trim($name);
    if ($name === '') {
        return '';
    }
    ob_start(); ?>
  <div class="brand-band" aria-hidden="true">
    <div class="brand-band-track">
      <?php for ($copy = 0; $copy < 2; $copy++): ?>
        <?php for ($i = 0; $i < 4; $i++): ?><span><?= e($name) ?></span><?php endfor; ?>
      <?php endfor; ?>
    </div>
  </div>
    <?php
    return (string) ob_get_clean();
}

/** Seven-circle mark, shared by the opening, splash and scroll sequence. */
function mt_reference_rings(bool $interactive = false, string $class = ''): string
{
    ob_start(); ?>
    <svg class="reference-rings <?= e($class) ?>" viewBox="-90 -90 780 780" aria-hidden="true" focusable="false">
      <g class="brand-ring-turn">
        <circle cx="300" cy="300" r="100"/>
        <?php for ($ring = 0; $ring < 6; $ring++):
            $angle = deg2rad($ring * 60 - 90);
            $x = 300 + 100 * cos($angle); $y = 300 + 100 * sin($angle); ?>
        <circle <?= $interactive ? 'data-ring="' . $ring . '"' : '' ?> cx="<?= round($x, 3) ?>" cy="<?= round($y, 3) ?>" r="100" style="--rx:<?= round(cos($angle) * 170, 3) ?>px;--ry:<?= round(sin($angle) * 170, 3) ?>px"/>
        <?php endfor; ?>
      </g>
    </svg>
    <?php return (string) ob_get_clean();
}

/** Club portrait badge: decorative, never covers a name or a face. */
function mt_portrait_badge(): string
{
    return '<span class="portrait-badge" aria-hidden="true">' . mt_reference_rings() . '</span>';
}

/** Changed motion artwork gets a new URL despite the host's long image cache. */
function mt_motion_url(string $filename): string
{
    $url = '/assets/motion/' . $filename;
    $file = MT_ROOT . $url;
    return is_file($file) ? $url . '?v=' . substr((string) hash_file('sha256', $file), 0, 12) : $url;
}

/** Broad blue/violet ribbon field measured against the new 66.5s recording. */
function mt_blue_waves(): string
{
    return '<img class="blue-waves reference-ribbons" src="' . mt_motion_url('reference-ribbons.webp') . '" alt="" width="720" height="1240" loading="lazy" decoding="async" aria-hidden="true">';
}

/** Small antialiased cutouts preserve the actual observed wire silhouettes.
 *  The full recording is never served or included in site downloads. */
function mt_manifest_object(string $type): string
{
    if (!in_array($type, ['orbit', 'prism', 'sphere'], true)) {
        return '';
    }
    $still = mt_motion_url('wire-' . $type . '-still.webp');
    $motion = mt_motion_url('wire-' . $type . '.webp');
    return '<i class="mind-object object-' . $type . '" data-wire-object="' . $type . '" aria-hidden="true"><img src="' . $still . '" data-still-src="' . $still . '" data-motion-src="' . $motion . '" alt="" width="164" height="110" loading="lazy" decoding="async"></i>';
}

/** One continuous sticky scene: assemble the rings, then introduce the words. */
function mt_brand_chapter(string $name): string
{
    ob_start(); ?>
  <section class="brand-chapter black-chapter" aria-label="Seven connected rings">
    <div class="brand-chapter-stage">
      <?= mt_reference_rings(true, 'brand-rings') ?>
      <div class="manifest-chapter" aria-labelledby="manifestHeading">
        <h2 id="manifestHeading">
          <span class="manifest-row">ControlYour</span>
          <span class="manifest-row">Mind <?= mt_manifest_object('orbit') ?></span>
          <span class="manifest-row"><?= mt_manifest_object('prism') ?> <em>Manifest</em></span>
          <span class="manifest-row">Your</span>
          <span class="manifest-row"><?= mt_manifest_object('sphere') ?> Reality</span>
        </h2>
      </div>
    </div>
  </section>
    <?php return (string) ob_get_clean();
}

/** One name-only closing interlude, directly before Contact. */
function mt_brand_finale(string $name): string
{
    ob_start(); ?>
  <section class="brand-finale black-chapter" aria-label="<?= e($name) ?>">
    <div class="brand-finale-stage">
      <?= mt_blue_waves() ?>
      <p class="brand-finale-intro">The Psychology Club</p>
      <?= mt_brand_band($name) ?>
    </div>
  </section>
    <?php return (string) ob_get_clean();
}

/** A core team card on the home page. */
function mt_team_card(array $member): string
{
    $image = mt_safe_image($member['image'] ?? '');
    $name = (string) ($member['name'] ?? 'Mindful Tattva member');
    $role = trim((string) ($member['role'] ?? ''));
    $phone = trim((string) ($member['phone'] ?? ''));
    ob_start(); ?>
      <article class="team-card portrait-card">
        <?= mt_portrait_badge() ?>
        <div class="team-avatar<?= $image !== '' ? ' has-image' : '' ?>" role="img"
             aria-label="<?= e($name) ?> <?= $image !== '' ? 'photo' : 'placeholder' ?>"<?= mt_background_style($image) ?>><span><?= e(mt_initials($name)) ?></span></div>
        <h3><?= e($name) ?></h3>
        <?php if ($role !== ''): ?><div class="team-role"><?= e($role) ?></div><?php endif; ?>
        <?php if (trim((string) ($member['bio'] ?? '')) !== ''): ?>
          <p class="team-bio"><?= e((string) $member['bio']) ?></p>
        <?php endif; ?>
        <?php if ($phone !== ''): ?>
          <a class="team-phone" href="tel:<?= e(preg_replace('/[^+\d]/', '', $phone) ?? '') ?>"><?= e($phone) ?> ↗</a>
        <?php endif; ?>
      </article>
    <?php
    return (string) ob_get_clean();
}

/** One frame in the home page gallery grid. */
function mt_gallery_item(array $item): string
{
    $image = mt_safe_image($item['image'] ?? '');
    $caption = trim((string) ($item['caption'] ?? 'Mindful Tattva memory'));
    $alt = trim((string) ($item['alt'] ?? '')) !== '' ? (string) $item['alt'] : $caption;
    ob_start(); ?>
      <figure class="gallery-item portrait-card">
        <?= mt_portrait_badge() ?>
        <?php if ($image !== ''): ?>
          <button type="button" class="gallery-visual has-image" aria-label="Open <?= e($alt) ?> full size"<?= mt_background_style($image, $alt) ?>>
            <span class="gallery-zoom" aria-hidden="true">⤢</span>
          </button>
        <?php else: ?>
          <div class="gallery-visual" role="img" aria-label="<?= e($alt) ?>"><span class="gallery-placeholder">Photo placeholder</span></div>
        <?php endif; ?>
        <figcaption class="gallery-caption"><?= e($caption) ?></figcaption>
      </figure>
    <?php
    return (string) ob_get_clean();
}

/**
 * The club's photos, in the order the club set: order 1 first, order 2 next.
 * There are no categories any more — a photo is a caption and a place in the
 * queue — and this one list feeds the slideshow, the strip and the archive.
 */
function mt_gallery_slides(array $items): array
{
    $slides = [];
    foreach (mt_sorted(mt_gallery_photos($items)) as $item) {
        $image = mt_safe_image($item['image'] ?? '');
        if ($image === '') {
            continue;
        }
        $caption = trim((string) ($item['caption'] ?? '')) !== '' ? (string) $item['caption'] : 'Mindful Tattva memory';
        $slides[] = [
            'caption' => $caption,
            'image'   => $image,
            'alt'     => trim((string) ($item['alt'] ?? '')) !== '' ? (string) $item['alt'] : $caption,
        ];
    }
    return $slides;
}

/** The same list as JSON, so the script can turn the pages of the album. */
function mt_gallery_data(array $slides): string
{
    $json = json_encode(
        ['slides' => array_values($slides)],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
    );
    return '<script type="application/json" id="gallery-data">' . $json . '</script>';
}

/**
 * The photo stage: one big picture, its caption, the pages of the album and
 * the arrows. The picture is written by PHP, so the stage is complete before
 * any script runs, and it is drawn whole — the stylesheet lays a softened copy
 * of the same photo behind it, so a tall photo or a square crest can never sit
 * in a block of flat colour.
 */
function mt_gallery_stage(array $slides, string $kicker = 'Mindful Tattva gallery', string $class = ''): string
{
    $first = $slides[0] ?? null;
    $stage = is_array($first) && mt_safe_image($first['image'] ?? '') !== '';
    $total = max(1, count($slides));
    $alt   = $stage ? (string) $first['alt'] : 'Gallery photo';
    ob_start(); ?>
      <div class="gallery-stage<?= $class !== '' ? ' ' . e($class) : '' ?>" id="galleryStage">
        <?= mt_portrait_badge() ?>
        <div class="gallery-stage-image<?= $stage ? ' has-image' : '' ?>" id="galleryStageImage" role="img"
             aria-label="<?= e($alt) ?>"<?= mt_background_style($stage ? (string) $first['image'] : '') ?>></div>
        <div class="gallery-stage-copy">
          <small id="galleryStageKicker"><?= e($stage ? $kicker : 'The album is waiting') ?></small>
          <h2 id="galleryStageCaption"><?= e($stage ? (string) $first['caption'] : 'Your first club memory') ?></h2>
          <?php if ($total > 1): ?>
            <div class="gallery-thumbs" id="galleryThumbs" aria-label="Every photo in the album">
              <?php foreach ($slides as $index => $slide): ?>
                <button type="button" class="gallery-thumb<?= $index === 0 ? ' is-current' : '' ?>" data-slide="<?= (int) $index ?>"
                        aria-label="Show photo <?= (int) $index + 1 ?>: <?= e((string) $slide['caption']) ?>"<?= mt_background_style((string) $slide['image']) ?>></button>
              <?php endforeach; ?>
            </div>
          <?php endif; ?>
          <div class="gallery-controls">
            <button class="gallery-control" id="galleryPrev" aria-label="Previous photo"<?= $total > 1 ? '' : ' disabled' ?>>←</button>
            <span class="gallery-counter" id="galleryCounter">01 / <?= str_pad((string) $total, 2, '0', STR_PAD_LEFT) ?></span>
            <button class="gallery-control" id="galleryNext" aria-label="Next photo"<?= $total > 1 ? '' : ' disabled' ?>>→</button>
          </div>
        </div>
      </div>
    <?php
    return (string) ob_get_clean();
}

/**
 * Only the rows the club has actually finished belong on the public site.
 *
 * The dashboard lets the club add a row first and fill it in afterwards, so a
 * half-written row must never be published: a photo with no picture, a person
 * with no name, an activity with no title are all still "not written yet".
 */
function mt_finished_rows(array $items, array $required): array
{
    $rows = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }
        $ready = true;
        foreach ($required as $key) {
            if (trim((string) ($item[$key] ?? '')) === '') {
                $ready = false;
                break;
            }
        }
        if ($ready) {
            $rows[] = $item;
        }
    }
    return $rows;
}

/** Every gallery photo that has a picture behind it. */
function mt_gallery_photos(array $items): array
{
    return mt_finished_rows($items, ['image']);
}

/** Every team member who actually has a name. */
function mt_named_team(array $items): array
{
    return mt_finished_rows($items, ['name']);
}

/** A card inside the gallery page's archive grid. */
function mt_archive_card(array $item): string
{
    $image = mt_safe_image($item['image'] ?? '');
    $caption = trim((string) ($item['caption'] ?? 'Mindful Tattva memory'));
    $alt = trim((string) ($item['alt'] ?? '')) !== '' ? (string) $item['alt'] : $caption;
    ob_start(); ?>
      <article class="archive-card portrait-card">
        <?= mt_portrait_badge() ?>
        <button type="button" class="archive-image" aria-label="Open <?= e($alt) ?> full size"<?= mt_background_style($image, $alt) ?>>
          <span class="gallery-zoom" aria-hidden="true">⤢</span>
        </button>
        <div class="archive-caption"><?= e($caption) ?></div>
      </article>
    <?php
    return (string) ob_get_clean();
}

/** The frame a photo opens into: one big picture, its caption, and a way out. */
function mt_photo_frame(): string
{
    ob_start(); ?>
      <div class="photo-frame" id="photoFrame" role="dialog" aria-modal="true" aria-label="Photo" hidden>
        <button type="button" class="photo-frame-close" id="photoFrameClose" aria-label="Close the photo">✕</button>
        <figure class="photo-frame-card">
          <img id="photoFrameImage" alt="" decoding="async">
          <figcaption>
            <span id="photoFrameCaption"></span>
            <span class="photo-frame-hint">Tap anywhere to close</span>
          </figcaption>
        </figure>
      </div>
    <?php
    return (string) ob_get_clean();
}

/** The four-part "what the gallery will hold" list, drawn when there is nothing yet. */
function mt_gallery_empty(string $title, string $note): string
{
    ob_start(); ?>
      <div class="gallery-empty">
        <div><strong><?= e($title) ?></strong><p><?= e($note) ?></p></div>
      </div>
    <?php
    return (string) ob_get_clean();
}

/** A month block on the calendar page: the frame is fixed, the events are the club's. */
function mt_month_card(int $index, string $month, array $events): string
{
    ob_start(); ?>
      <article class="calendar-month<?= $events ? ' has-event' : '' ?>">
        <div class="calendar-month-head">
          <span class="calendar-month-number"><?= str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) ?></span>
          <h3><?= e($month) ?></h3>
        </div>
        <div class="calendar-event-list">
          <?php if ($events): ?>
            <?php foreach ($events as $event): ?>
              <article class="calendar-event">
                <div class="calendar-event-date">
                  <?php if ((int) ($event['number'] ?? 0) > 0): ?><span class="calendar-event-number"><?= e(mt_event_label($event)) ?></span> — <?php endif; ?>
                  <?= e(mt_event_date_display($event)) ?>
                </div>
                <h4><?= e((string) ($event['title'] ?? 'Mindful Tattva activity')) ?></h4>
                <p><?= e(trim((string) ($event['time'] ?? '')) !== '' ? (string) $event['time'] : 'Time to be confirmed') ?>
                  — <?= e(trim((string) ($event['location'] ?? '')) !== '' ? (string) $event['location'] : 'Location to be confirmed') ?></p>
                <?php if (trim((string) ($event['description'] ?? '')) !== ''): ?>
                  <p><?= e((string) $event['description']) ?></p>
                <?php endif; ?>
                <?php $brochure = mt_safe_url($event['brochureUrl'] ?? $event['attachment'] ?? ''); ?>
                <?php if ($brochure !== ''): ?>
                  <a class="calendar-event-brochure" href="<?= e($brochure) ?>" target="_blank" rel="noreferrer noopener">View brochure / poster ↗</a>
                <?php endif; ?>
              </article>
            <?php endforeach; ?>
          <?php else: ?>
            <div class="calendar-empty-note">No activities planned yet.<br>Check back for the next thread.</div>
          <?php endif; ?>
        </div>
      </article>
    <?php
    return (string) ob_get_clean();
}

/** One person in the members directory. */
function mt_member_card(array $person, int $number, bool $volunteersOnly = false): string
{
    $image = mt_safe_image($person['image'] ?? '');
    $name = (string) ($person['name'] ?? 'Mindful Tattva member');
    $role = trim((string) ($person['role'] ?? ''));
    $phone = trim((string) ($person['phone'] ?? ''));
    $showPhoto = !$volunteersOnly;
    ob_start(); ?>
      <article class="member-card portrait-card<?= $showPhoto && $image !== '' ? ' has-photo' : '' ?>">
        <span class="member-number"><?= str_pad((string) $number, 2, '0', STR_PAD_LEFT) ?></span>
        <?php if ($showPhoto): ?>
          <?= mt_portrait_badge() ?>
          <?php if ($image !== ''): ?>
            <div class="member-photo" role="img" aria-label="<?= e($name) ?> photo"<?= mt_background_style($image) ?>></div>
          <?php else: ?>
            <div class="member-photo member-photo-placeholder" role="img" aria-label="Mindful Tattva placeholder">MT</div>
          <?php endif; ?>
        <?php endif; ?>
        <h4><?= e($name) ?></h4>
        <?php if ($showPhoto && $role !== ''): ?><div class="member-role"><?= e($role) ?></div><?php endif; ?>
        <?php if ($phone !== ''): ?>
          <a class="member-phone" href="tel:<?= e(preg_replace('/[^+\d]/', '', $phone) ?? '') ?>"><?= e($phone) ?> ↗</a>
        <?php endif; ?>
      </article>
    <?php
    return (string) ob_get_clean();
}

/** The empty state of a members group. */
function mt_member_empty(string $title, string $note): string
{
    ob_start(); ?>
      <div class="member-empty">
        <div><strong><?= e($title) ?></strong><p><?= e($note) ?></p></div>
      </div>
    <?php
    return (string) ob_get_clean();
}

/**
 * A whole members group: heading, then either cards or the empty state.
 *
 * @param array $people Members in this group, already sorted.
 */
function mt_member_group(string $group, array $people): string
{
    $labels = [
        'management' => ['kicker' => '01 · Core', 'label' => 'Core Committee'],
        'heads'      => ['kicker' => '02 · Organizing team', 'label' => 'Head Committee'],
        'volunteers' => ['kicker' => '03 · Community', 'label' => 'Volunteers'],
    ];
    $empty = [
        'management' => ['Core Committee members will appear here.', 'The club is introducing the team for this year — come back soon.'],
        'heads'      => ['Head Committee will be added soon.', 'The organizing team for this year is being introduced shortly.'],
        'volunteers' => ['The circle is open.', 'Write to the club team and volunteer for the next event.'],
    ];
    $info = $labels[$group] ?? $labels['management'];
    $empties = $empty[$group] ?? $empty['management'];
    $volunteersOnly = $group === 'volunteers';

    ob_start(); ?>
      <section class="member-group">
        <div class="member-group-head">
          <div>
            <div class="member-group-kicker"><?= e($info['kicker']) ?></div>
            <h3><?= e($info['label']) ?></h3>
          </div>
        </div>
        <?php if ($people): ?>
          <div class="member-cards">
            <?php foreach (array_values($people) as $index => $person): ?>
              <?= mt_member_card($person, $index + 1, $volunteersOnly) ?>
            <?php endforeach; ?>
          </div>
        <?php else: ?>
          <?= mt_member_empty($empties[0], $empties[1]) ?>
        <?php endif; ?>
      </section>
    <?php
    return (string) ob_get_clean();
}
