<?php
/**
 * Mindful Tattva · server-side card markup
 * ----------------------------------------
 * These helpers echo exactly the same markup the JavaScript uses for live
 * updates, so a page rendered by PHP and a page updated in the browser look
 * identical. Content is always visible before any script runs.
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

function mt_event_card(array $event): string
{
    $image = mt_safe_image($event['image'] ?? '');
    ob_start(); ?>
      <article class="event-card reveal">
        <?php if ($image !== ''): ?>
          <div class="event-media">
            <img src="<?= e($image) ?>" alt="<?= e((string) ($event['title'] ?? 'Event')) ?>" loading="lazy">
            <span class="kicker"><?= e((string) ($event['kicker'] ?? 'Mindful Tattva')) ?></span>
          </div>
        <?php endif; ?>
        <div class="event-body">
          <div class="event-date"><?= e((string) ($event['date'] ?? '') !== '' ? (string) $event['date'] : 'Date to be announced') ?></div>
          <h3><?= e((string) ($event['title'] ?? 'Mindful Tattva activity')) ?></h3>
          <?php if (!empty($event['description'])): ?><p><?= e((string) $event['description']) ?></p><?php endif; ?>
          <div class="event-facts">
            <?php if (!empty($event['time'])): ?><span>◷ <?= e((string) $event['time']) ?></span><?php endif; ?>
            <?php if (!empty($event['location'])): ?><span>⌖ <?= e((string) $event['location']) ?></span><?php endif; ?>
          </div>
          <?php $link = mt_safe_url($event['registrationUrl'] ?? ''); ?>
          <?php if ($link !== ''): ?>
            <a class="event-link" href="<?= e($link) ?>" target="_blank" rel="noreferrer noopener">View details ↗</a>
          <?php endif; ?>
        </div>
      </article>
    <?php
    return (string) ob_get_clean();
}

function mt_team_card(array $member, bool $volunteersOnly = false): string
{
    $image = mt_safe_image($member['image'] ?? '');
    $name  = (string) ($member['name'] ?? 'Mindful Tattva member');
    $role  = (string) ($member['role'] ?? ($volunteersOnly ? 'Volunteer' : 'Core team'));
    $phone = (string) ($member['phone'] ?? '');
    $email = (string) ($member['email'] ?? '');
    ob_start(); ?>
      <article class="team-card reveal">
        <div class="team-avatar">
          <?php if ($image !== ''): ?>
            <img src="<?= e($image) ?>" alt="<?= e($name) ?>" loading="lazy">
          <?php else: ?>
            <?= e(mt_initials($name)) ?>
          <?php endif; ?>
        </div>
        <h3><?= e($name) ?></h3>
        <div class="team-role"><?= e($role !== '' ? $role : 'Core team') ?></div>
        <?php if (!$volunteersOnly && !empty($member['bio'])): ?><p><?= e((string) $member['bio']) ?></p><?php endif; ?>
        <?php if (($phone !== '' || $email !== '')): ?>
          <div class="team-contact">
            <?php if ($phone !== ''): ?>
              <a href="tel:<?= e(preg_replace('/[^+\d]/', '', $phone) ?? '') ?>"><?= e($phone) ?></a>
            <?php endif; ?>
            <?php if ($email !== ''): ?>
              <a href="mailto:<?= e($email) ?>"><?= e($email) ?></a>
            <?php endif; ?>
          </div>
        <?php endif; ?>
      </article>
    <?php
    return (string) ob_get_clean();
}

function mt_gallery_card(array $item, int $index): string
{
    $image   = mt_safe_image($item['image'] ?? '');
    if ($image === '') {
        return '';
    }
    // A caption is shown only when the club typed one for this photo. The event
    // or date on its own becomes a small badge instead of a caption block.
    $caption = trim((string) ($item['caption'] ?? ''));
    $meta    = trim((string) ($item['event'] ?? '') !== '' ? (string) $item['event'] : (string) ($item['date'] ?? ''));
    $alt     = trim((string) ($item['alt'] ?? ''));
    ob_start(); ?>
      <figure class="gallery-card reveal">
        <button type="button" data-gallery-open="<?= $index ?>" aria-label="Open photo<?= $caption !== '' ? ': ' . e($caption) : '' ?>">
          <img src="<?= e($image) ?>" alt="<?= e($alt !== '' ? $alt : ($caption !== '' ? $caption : 'Mindful Tattva photo')) ?>" loading="lazy" decoding="async">
        </button>
        <?php if ($caption !== ''): ?>
          <figcaption>
            <strong><?= e($caption) ?></strong>
            <?php if ($meta !== ''): ?><span><?= e($meta) ?></span><?php endif; ?>
          </figcaption>
        <?php elseif ($meta !== ''): ?>
          <span class="gallery-badge"><?= e($meta) ?></span>
        <?php endif; ?>
      </figure>
    <?php
    return (string) ob_get_clean();
}

function mt_tile(array $tile, int $index): string
{
    $image = mt_safe_image($tile['image'] ?? '');
    ob_start(); ?>
        <article class="tile<?= $image === '' ? ' tile-plain' : '' ?>" data-awareness-open="<?= $index ?>" tabindex="0" role="button" aria-label="Read more: <?= e((string) ($tile['title'] ?? 'Mental health note')) ?>">
          <?php if ($image !== ''): ?>
            <img src="<?= e($image) ?>" alt="<?= e((string) ($tile['title'] ?? 'Awareness illustration')) ?>" loading="lazy" decoding="async">
          <?php else: ?>
            <span class="tile-pattern" aria-hidden="true"></span>
          <?php endif; ?>
          <span class="tile-open" aria-hidden="true">+</span>
          <div class="tile-copy">
            <small><?= e((string) ($tile['eyebrow'] ?? 'Awareness')) ?></small>
            <strong><?= e((string) ($tile['title'] ?? '')) ?></strong>
            <?php if (!empty($tile['stat'])): ?>
              <em><?= e((string) $tile['stat']) ?></em>
            <?php endif; ?>
          </div>
        </article>
    <?php
    return (string) ob_get_clean();
}

/** Two rails of tiles; small sets are repeated so the rails never look empty. */
function mt_awareness_rails(array $tiles, int $minPerRail = 2): string
{
    $tiles = array_values($tiles);
    if (!$tiles) {
        return '';
    }

    // Alternate the tiles between two rails, so four tiles give two unique
    // tiles per rail and the page scroll can slide the rails sideways.
    $rails = [[], []];
    foreach ($tiles as $index => $tile) {
        $rails[$index % 2][] = [$index, $tile];
    }

    $html = '';
    foreach ($rails as $railIndex => $railTiles) {
        if (!$railTiles) {
            // An odd tile count can leave a rail empty: mirror the other one.
            $railTiles = $rails[$railIndex === 0 ? 1 : 0];
        }
        if (count($railTiles) < $minPerRail) {
            $repeat = (int) ceil($minPerRail / max(1, count($railTiles)));
            $railTiles = array_merge(...array_fill(0, $repeat, $railTiles));
        }
        $cards = '';
        foreach ($railTiles as $entry) {
            $cards .= mt_tile($entry[1], (int) $entry[0]);
        }
        $html .= '<div class="rail" data-rail="' . $railIndex . '">' . $cards . '</div>';
    }

    return $html;
}

function mt_month_card(int $index, string $month, array $events): string
{
    ob_start(); ?>
        <article class="month-card<?= $events ? ' has-events' : '' ?> reveal">
          <div class="month-head">
            <span><?= str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) ?></span>
            <h3><?= e($month) ?></h3>
          </div>
          <div class="month-events">
            <?php if ($events): ?>
              <?php foreach ($events as $event): ?>
                <div class="month-event">
                  <strong><?= e((string) $event['title']) ?></strong>
                  <span><?= e((string) $event['date']) ?><?= !empty($event['time']) ? ' · ' . e((string) $event['time']) : '' ?></span>
                  <?php if (!empty($event['location'])): ?><small>⌖ <?= e((string) $event['location']) ?></small><?php endif; ?>
                </div>
              <?php endforeach; ?>
            <?php else: ?>
              <span class="month-empty">Open for new ideas</span>
            <?php endif; ?>
          </div>
        </article>
    <?php
    return (string) ob_get_clean();
}

function mt_month_index(string $value): int
{
    $value = trim($value);
    if ($value === '') {
        return -1;
    }
    $timestamp = strtotime($value);
    if ($timestamp !== false) {
        return (int) date('n', $timestamp) - 1;
    }
    foreach (['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as $index => $month) {
        if (stripos($value, $month) !== false) {
            return $index;
        }
    }
    return -1;
}

function mt_form(string $type, array $options = []): void
{
    $fields = $options['fields'] ?? [];
    ?>
    <form class="club-form<?= !empty($options['dark']) ? ' dark' : '' ?>" data-form="<?= e($type) ?>" novalidate>
      <div class="form-kicker"><?= e($options['kicker'] ?? '') ?></div>
      <h3><?= e($options['title'] ?? '') ?></h3>
      <p><?= e($options['note'] ?? '') ?></p>

      <div class="field-row">
        <label>Full name<input name="name" required autocomplete="name" placeholder="Your name"></label>
        <label>Email<input name="email" type="email" required autocomplete="email" placeholder="you@example.com"></label>
      </div>

      <div class="field-row">
        <label>Phone / WhatsApp<input name="phone" type="tel" required autocomplete="tel" placeholder="+91 …"></label>
        <?php if (in_array('course', $fields, true)): ?>
          <label>Course / programme<input name="course" placeholder="Your programme"></label>
        <?php else: ?>
          <label>Event or activity<input name="event" placeholder="Event name, or general registration"></label>
        <?php endif; ?>
      </div>

      <?php if (in_array('course', $fields, true)): ?>
        <div class="field-row">
          <label>Year of study<input name="year" placeholder="First year"></label>
          <label>What interests you?<input name="interests" placeholder="Workshops, wellbeing, research…"></label>
        </div>
      <?php endif; ?>

      <label><?= in_array('course', $fields, true) ? 'Anything you would like to add?' : 'Message' ?>
        <textarea name="message" rows="3" placeholder="Tell the team a little more…"></textarea>
      </label>

      <div class="honeypot" aria-hidden="true">
        <label>Website<input name="website" tabindex="-1" autocomplete="off"></label>
      </div>

      <button class="btn btn-solid" type="submit"><?= e($options['button'] ?? 'Send') ?></button>
      <div class="form-status" role="status" aria-live="polite"></div>
    </form>
    <?php
}
