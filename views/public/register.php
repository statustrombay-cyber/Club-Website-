<?php
/**
 * Event registration.
 *
 * Everything on this page comes from the backend: the date, time and venue are
 * typed in by the club, the fee decides whether the club's UPI code appears,
 * and the window decides whether the form is open at all.
 *
 * @var array  $event       The event being registered for.
 * @var string $csrf        CSRF token.
 * @var array  $errors      What went wrong, if anything.
 * @var array  $values      What the student already typed.
 * @var array  $openEvents  Other events still open.
 * @var array  $db          Whole content store.
 * @var array  $site        Club copy.
 */
$errors = $errors ?? [];
$values = $values ?? [];
$openEvents = $openEvents ?? [];
$fee = mt_event_fee($event);
$paid = $fee > 0;
$state = mt_event_registration_state($db, $event);
$seats = mt_event_seats_left($db, $event);
$email = trim((string) ($site['email'] ?? ''));
?>
<section class="section panel-section" id="register">
  <div class="container">
    <div class="calendar-intro" style="margin-bottom:26px">
      <div>
        <div class="eyebrow">Event registration</div>
        <h2 class="display" style="margin:9px 0 0"><?= e((string) $event['title']) ?></h2>
      </div>
      <p><?= e(mt_event_line($event)) ?></p>
    </div>

    <div class="club-panel">
      <div class="summary-card">
        <div class="summary-row"><small>Date</small><strong><?= e(mt_event_date_display($event)) ?></strong></div>
        <div class="summary-row"><small>Time</small><strong><?= e(trim((string) ($event['time'] ?? '')) !== '' ? (string) $event['time'] : 'To be announced') ?></strong></div>
        <div class="summary-row"><small>Venue</small><strong><?= e(trim((string) ($event['location'] ?? '')) !== '' ? (string) $event['location'] : 'To be announced') ?></strong></div>
        <div class="summary-row"><small>Registration</small><strong><?= e($state['label']) ?></strong></div>
        <?php if ($seats !== null): ?>
          <div class="summary-row"><small>Seats left</small><strong><?= (int) $seats ?></strong></div>
        <?php endif; ?>
        <div class="summary-total">
          <span>Registration fee</span>
          <span><?= e($paid ? mt_money($fee) : 'Free entry') ?></span>
        </div>
      </div>

      <?php if (!empty($errors['form'])): ?>
        <div class="field-error" style="margin-bottom:12px"><?= e($errors['form']) ?></div>
      <?php endif; ?>

      <?php if (!$state['open']): ?>
        <p class="muted"><?= e($state['label']) ?> Registration closes by itself at the time the club set, so the door list
          always matches the register.
          <?php if ($email !== ''): ?>
            Write to <a href="mailto:<?= e($email) ?>"><?= e($email) ?></a> and the club team will help you.
          <?php endif; ?>
        </p>
        <?php if ($openEvents): ?>
          <h3>Other events that are open</h3>
          <ul class="register-list" style="color:var(--plum-deep)">
            <?php foreach ($openEvents as $open): ?>
              <li style="background:#f7f2ed;border-color:var(--line)">
                <div style="color:var(--plum-deep)">
                  <strong style="color:var(--plum-deep)"><?= e((string) $open['title']) ?></strong>
                  <span style="color:var(--ink-soft)"><?= e(mt_event_line($open)) ?></span>
                </div>
                <a class="solid-button" href="/register?event=<?= e((string) $open['id']) ?>">Register ↗</a>
              </li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      <?php else: ?>

        <?php if ($paid): ?>
          <div class="pay-card">
            <div class="pay-qr"><?= mt_qr_svg(mt_upi_link($event), 190, 'UPI payment code for ' . (string) $event['title']) ?></div>
            <div class="pay-copy">
              <h4>Pay <?= e(mt_money($fee)) ?> to register</h4>
              <p>Scan this code with any UPI app, or pay to the club's UPI ID:</p>
              <span class="pay-upi"><?= e(trim((string) ($event['upiId'] ?? '')) !== '' ? (string) $event['upiId'] : 'The UPI ID is being set up — please ask the club team') ?></span>
              <ol class="pay-steps">
                <li>Fill this form and send it.</li>
                <li>Pay <?= e(mt_money($fee)) ?> and keep the screenshot or receipt.</li>
                <li>Upload that screenshot on your pass page — it is the next step after this form.</li>
                <li>Carry the pass and the payment proof to the event. Entry is given only with both.</li>
              </ol>
            </div>
          </div>
        <?php else: ?>
          <p class="muted">This event is free to attend. Your pass is issued the moment you send this form — carry it at
            the door, printed or on your phone.</p>
        <?php endif; ?>

        <form method="post" action="/register?event=<?= e((string) $event['id']) ?>" data-ajax-form="/api/registrations" data-form-type="event-registration" data-success-message="Registered ✓">
          <input type="hidden" name="eventId" value="<?= e((string) $event['id']) ?>">
          <input type="hidden" name="csrf" value="<?= e($csrf) ?>">
          <div class="honeypot" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

          <label>Full name<input name="name" required placeholder="Your name" autocomplete="name" value="<?= e((string) ($values['name'] ?? '')) ?>"></label>
          <?php if (!empty($errors['name'])): ?><div class="field-error"><?= e($errors['name']) ?></div><?php endif; ?>
          <div class="form-row">
            <label>Email address<input name="email" type="email" required placeholder="you@example.com" autocomplete="email" value="<?= e((string) ($values['email'] ?? '')) ?>"></label>
            <label>Phone number<input name="phone" type="tel" required placeholder="+91 ..." autocomplete="tel" value="<?= e((string) ($values['phone'] ?? '')) ?>"></label>
          </div>
          <div class="form-row">
            <label>Course / programme<input name="course" placeholder="Your programme" value="<?= e((string) ($values['course'] ?? '')) ?>"></label>
            <label>Year of study<input name="year" placeholder="First year" value="<?= e((string) ($values['year'] ?? '')) ?>"></label>
          </div>
          <label>Anything the club should know?<textarea name="note" rows="3" placeholder="Accessibility needs, questions…"><?= e((string) ($values['note'] ?? '')) ?></textarea></label>

          <button class="solid-button" type="submit"><?= $paid ? 'Send and continue to payment ↗' : 'Send and get my pass ↗' ?></button>
          <div class="form-status" aria-live="polite"></div>
          <p class="pass-note">
            By registering you accept the terms printed on the pass: the fee is <strong>non-refundable</strong>, and is
            returned only if the club cancels the event — within <strong>12 working days</strong>. The pass is valid for
            one person, for this event only.
          </p>
        </form>
      <?php endif; ?>
    </div>

    <div class="club-panel">
      <h3>How the pass works</h3>
      <ol class="pay-steps">
        <li>Send this form — you get your own pass page with a serial number like <strong>MTP-2026-0007</strong>.</li>
        <li><?= $paid ? 'Pay the fee and upload the screenshot on that page.' : 'Your pass is ready straight away, because this event is free.' ?></li>
        <li>Download the pass as a PDF, or show it on your phone at the door.</li>
        <li>At entry, show the pass <strong>and</strong> your payment proof. The club matches your serial against its register.</li>
      </ol>
      <p class="muted">Keep your pass link private — anyone who has it can download your pass.</p>
      <div class="btn-row">
        <a class="outline-button" href="/calendar">Club calendar</a>
        <a class="outline-button" href="/#join">Join the club</a>
      </div>
    </div>
  </div>
</section>
