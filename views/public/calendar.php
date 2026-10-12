<?php
/**
 * Club calendar: every month of the year at a glance.
 *
 * @var array $site
 * @var array $db
 */
$site   = $site ?? [];
$db     = $db ?? mt_db();
$months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
$events = array_values(array_filter($db['events'] ?? [], static fn($event) => trim((string) ($event['title'] ?? '')) !== '' && trim((string) ($event['date'] ?? '')) !== ''));

$byMonth = array_fill(0, 12, []);
foreach ($events as $event) {
    $index = mt_month_index((string) $event['date']);
    if ($index >= 0 && $index < 12) {
        $byMonth[$index][] = $event;
    }
}
$planned = count($events);
?>

<section class="cal-hero">
  <div class="container">
    <span class="eyebrow">The year ahead</span>
    <h1 class="display">One year. Twelve invitations.</h1>
    <p class="lede">Every planned Mindful Tattva activity with its date, time and location — kept in one calm place instead of scattered posts.</p>
    <div class="hero-stat-row">
      <div class="stat-chip"><strong><?= (int) $planned ?></strong><span>activities planned</span></div>
      <div class="stat-chip"><strong>12</strong><span>months in view</span></div>
      <div class="stat-chip"><strong>1</strong><span>club, growing</span></div>
    </div>
  </div>
</section>

<section class="section section-tight">
  <div class="container">
    <div class="month-grid" data-render="calendar">
      <?php foreach ($months as $index => $month): ?>
        <?= mt_month_card($index, $month, $byMonth[$index]) ?>
      <?php endforeach; ?>
    </div>

    <div class="teaser reveal" style="margin-top:34px">
      <div>
        <span class="eyebrow">Want to take part?</span>
        <h3>Register for an activity.</h3>
        <p>Send the club team your details and they will keep you posted about the next gathering, workshop or circle.</p>
      </div>
      <a class="btn btn-solid" href="/#join">Register now ↗</a>
    </div>
  </div>
</section>
