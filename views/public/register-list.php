<?php
/**
 * Shown at /register with no event chosen, when more than one event is open:
 * the student picks where they are going.
 *
 * @var array $db          Whole content store.
 * @var array $site        Club copy.
 * @var array $openEvents  The events still accepting registrations.
 */
?>
<section class="section panel-section" id="register">
  <div class="container">
    <div class="calendar-intro" style="margin-bottom:26px">
      <div>
        <div class="eyebrow">Event registration</div>
        <h2 class="display" style="margin:9px 0 0">Which circle are you joining?</h2>
      </div>
      <p>Choose an event to register for. Each registration gets its own pass, and a paid event shows the club's UPI
        code as soon as you pick it.</p>
    </div>

    <div class="event-grid">
      <?php foreach ($openEvents as $event): ?>
        <?= mt_event_card($event) ?>
      <?php endforeach; ?>
    </div>

    <div class="club-panel" style="margin-top:26px">
      <h3>Nothing here fits right now?</h3>
      <p class="muted">The club calendar shows everything that is planned, and the home page has the membership form if
        you would rather join the club first.</p>
      <div class="btn-row">
        <a class="outline-button" href="/calendar">Open the calendar ↗</a>
        <a class="outline-button" href="/#join">Join the club ↗</a>
      </div>
    </div>
  </div>
</section>
