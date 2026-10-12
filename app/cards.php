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
        </div>
        <div class="event-body">
          <div class="event-date"><?= e(mt_event_date_display($event)) ?></div>
          <h3><?= e((string) ($event['title'] ?? 'Mindful Tattva activity')) ?></h3>
          <?php if (trim((string) ($event['description'] ?? '')) !== ''): ?>
            <p><?= e((string) $event['description']) ?></p>
          <?php endif; ?>
          <?php if ($facts): ?>
            <span class="event-link"><?= e(implode(' · ', $facts)) ?></span>
          <?php endif; ?>

          <div class="event-actions">
            <span class="event-fee<?= $fee > 0 ? '' : ' is-free' ?>"><?= e($fee > 0 ? mt_money($fee) : 'Free entry') ?></span>
            <?php if ($state['open']): ?>
              <?php if ($registration): ?>
                <a class="solid-button" href="/pass/<?= e(rawurlencode((string) $registration['serial'])) ?>?token=<?= e(rawurlencode((string) $registration['token'])) ?>">Your pass ↗</a>
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

/** A core team card on the home page. */
function mt_team_card(array $member): string
{
    $image = mt_safe_image($member['image'] ?? '');
    $name = (string) ($member['name'] ?? 'Mindful Tattva member');
    $role = trim((string) ($member['role'] ?? ''));
    $phone = trim((string) ($member['phone'] ?? ''));
    ob_start(); ?>
      <article class="team-card">
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
      <figure class="gallery-item">
        <?php if ($image !== ''): ?>
          <div class="gallery-visual has-image" role="img" aria-label="<?= e($alt) ?>"<?= mt_background_style($image, $alt) ?>></div>
        <?php else: ?>
          <div class="gallery-visual" role="img" aria-label="<?= e($alt) ?>"><span class="gallery-placeholder">Photo placeholder</span></div>
        <?php endif; ?>
        <figcaption class="gallery-caption"><?= e($caption) ?></figcaption>
      </figure>
    <?php
    return (string) ob_get_clean();
}

/** A card inside the gallery page's archive grid. */
function mt_archive_card(array $item): string
{
    $image = mt_safe_image($item['image'] ?? '');
    $caption = trim((string) ($item['caption'] ?? 'Mindful Tattva memory'));
    $alt = trim((string) ($item['alt'] ?? '')) !== '' ? (string) $item['alt'] : $caption;
    ob_start(); ?>
      <article class="archive-card">
        <div class="archive-image" role="img" aria-label="<?= e($alt) ?>"<?= mt_background_style($image, $alt) ?>></div>
        <div class="archive-caption"><?= e($caption) ?></div>
      </article>
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
                <div class="calendar-event-date"><?= e(mt_event_date_display($event)) ?></div>
                <h4><?= e((string) ($event['title'] ?? 'Mindful Tattva activity')) ?></h4>
                <p><?= e(trim((string) ($event['time'] ?? '')) !== '' ? (string) $event['time'] : 'Time to be confirmed') ?>
                  · <?= e(trim((string) ($event['location'] ?? '')) !== '' ? (string) $event['location'] : 'Location to be confirmed') ?></p>
                <?php if (trim((string) ($event['description'] ?? '')) !== ''): ?>
                  <p><?= e((string) $event['description']) ?></p>
                <?php endif; ?>
                <?php $brochure = mt_safe_url($event['brochureUrl'] ?? ''); ?>
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
      <article class="member-card<?= $showPhoto && $image !== '' ? ' has-photo' : '' ?>">
        <span class="member-number"><?= str_pad((string) $number, 2, '0', STR_PAD_LEFT) ?></span>
        <?php if ($showPhoto): ?>
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
        'management' => ['Core Committee members will appear here.', 'Members can be added from the club dashboard.'],
        'heads'      => ['Head Committee will be added soon.', 'Members can be added from the club dashboard.'],
        'volunteers' => ['The circle is open.', 'Volunteers can be added from the club dashboard.'],
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
