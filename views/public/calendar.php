<?php
/**
 * The yearly activities calendar.
 *
 * The twelve months are the frame; everything inside them — day, year, time,
 * venue, fee and how to register — is set by the club.
 *
 * @var array $db    Whole content store.
 * @var array $site  Club copy.
 */
$byMonth = array_fill(0, 12, []);
foreach (mt_sorted($db['events'] ?? []) as $event) {
    if (empty($event['published'])) {
        continue;
    }
    $index = mt_event_month_index($event);
    if ($index >= 0 && $index < 12) {
        $byMonth[$index][] = $event;
    }
}
$openEvents = mt_open_events($db);
?>
<section class="hero calendar-hero">
  <div class="container">
    <div class="eyebrow">Mindful Tattva / the year ahead</div>
    <h1>Future activities, held in view.</h1>
    <p>A calm place to find the workshops, conversations and club initiatives planned across the year. Dates can change, so keep returning here for the latest live update.</p>
  </div>
</section>

<div class="container calendar-content">
  <div class="calendar-intro">
    <div><div class="eyebrow">Yearly activities</div><h2>One year. Twelve invitations.</h2></div>
    <div>
      <span class="calendar-chip"><span>12</span> months in this calendar</span>
      <p>Every listed activity includes its date, time, venue and a short note — and a way to register while the window is open.</p>
    </div>
  </div>

  <section class="calendar-months" id="monthGrid" aria-live="polite">
    <?php foreach (MT_MONTHS as $index => $month): ?>
      <?= mt_month_card($index, $month, $byMonth[$index]) ?>
    <?php endforeach; ?>
  </section>

  <section class="calendar-details">
    <?php foreach (array_slice($openEvents, 0, 2) as $open): ?>
      <a class="calendar-card calendar-link-card" href="/register?event=<?= e((string) $open['id']) ?>">
        <div class="eyebrow">Registration open</div>
        <h2><?= e((string) $open['title']) ?></h2>
        <p><?= e(mt_event_line($open)) ?> — <?= e(mt_event_fee($open) > 0 ? mt_money(mt_event_fee($open)) : 'Free entry') ?></p>
        <span>Register and get your pass ↗</span>
      </a>
    <?php endforeach; ?>
    <a class="calendar-card calendar-link-card" href="/gallery">
      <div class="eyebrow">Stay close</div>
      <h2>Follow the next thread.</h2>
      <p>For announcements and small moments between activities, visit the club’s gallery and Instagram.</p>
      <span>Explore the event gallery ↗</span>
    </a>
    <a class="calendar-card calendar-link-card" href="/#join">
      <div class="eyebrow">Take part</div>
      <h2>Want to help make it happen?</h2>
      <p>Membership is open to every student at the university — bring an idea, a question or simply your presence.</p>
      <span>Join Mindful Tattva ↗</span>
    </a>
  </section>
</div>
