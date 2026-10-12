<?php
/**
 * Event registration.
 *
 * Everything on this page is set by the club: the date, time and venue are
 * typed in by the club, the fee decides whether the club's UPI code appears,
 * and the window decides whether the form is open at all.
 *
 * The student is asked for the least the club needs and nothing else, and the
 * terms they accept are printed right where they send the form.
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
$fee = mt_event_fee($event);
$paid = $fee > 0;
$state = mt_event_registration_state($db, $event);
$seats = mt_event_seats_left($db, $event);
$email = trim((string) ($site['email'] ?? ''));
?>
<section class="section panel-section register-section" id="register">
  <div class="container">

    <header class="register-hero">
      <div class="register-hero-copy">
        <span class="eyebrow plain">Event registration</span>
        <h1 class="display"><?= e((string) $event['title']) ?></h1>
        <p><?= e(mt_event_line($event)) ?></p>
      </div>
      <div class="register-hero-badge">
        <span class="badge-label"><?= $paid ? 'Registration fee' : 'Entry' ?></span>
        <strong><?= e($paid ? mt_money($fee) : 'Free') ?></strong>
        <small><?= e($state['label']) ?></small>
      </div>
    </header>

    <div class="register-grid">

      <aside class="register-aside">
        <div class="fact-card">
          <h3>The details</h3>
          <dl class="fact-list">
            <div><dt>Date</dt><dd><?= e(mt_event_date_display($event)) ?></dd></div>
            <div><dt>Time</dt><dd><?= e(trim((string) ($event['time'] ?? '')) !== '' ? (string) $event['time'] : 'To be announced') ?></dd></div>
            <div><dt>Venue</dt><dd><?= e(trim((string) ($event['location'] ?? '')) !== '' ? (string) $event['location'] : 'To be announced') ?></dd></div>
            <div><dt>Fee</dt><dd class="fact-fee"><?= e($paid ? mt_money($fee) : 'Free entry') ?></dd></div>
            <?php if ($seats !== null): ?>
              <div><dt>Seats left</dt><dd><?= (int) $seats ?></dd></div>
            <?php endif; ?>
          </dl>
        </div>

        <?php if ($paid): ?>
          <div class="pay-card is-compact">
            <div class="pay-qr"><?= mt_qr_svg(mt_upi_link($event), 168, 'UPI payment code for ' . (string) $event['title']) ?></div>
            <div class="pay-copy">
              <h4>Pay <?= e(mt_money($fee)) ?></h4>
              <p>Scan with any UPI app, or pay to the club's UPI ID.</p>
              <span class="pay-upi"><?= e(trim((string) ($event['upiId'] ?? '')) !== '' ? (string) $event['upiId'] : 'The UPI ID is being set up — please ask the club team') ?></span>
            </div>
          </div>
          <ol class="step-list">
            <li>Send this form.</li>
            <li>Pay <strong><?= e(mt_money($fee)) ?></strong> and keep the screenshot.</li>
            <li>Upload the screenshot on the page that opens next — the pass is issued right after.</li>
            <li>At the door, show the pass <strong>and</strong> the payment proof.</li>
          </ol>
        <?php else: ?>
          <div class="fact-card is-soft">
            <h3>Free to attend</h3>
            <p>Nothing to pay. Your pass is issued the moment you send this form — carry it at the door, printed or on your phone.</p>
          </div>
        <?php endif; ?>
      </aside>

      <div class="register-form-col">
        <?php if (!empty($errors['form'])): ?>
          <div class="field-error form-banner"><?= e($errors['form']) ?></div>
        <?php endif; ?>

        <?php if (!$state['open']): ?>
          <div class="fact-card">
            <h3>Registration is closed</h3>
            <p><?= e($state['label']) ?> The form closes by itself at the time the club set, so the door list always
              matches the register.</p>
            <?php if ($email !== ''): ?>
              <p class="muted">Write to <a href="mailto:<?= e($email) ?>"><?= e($email) ?></a> and the club team will help
                you.</p>
            <?php endif; ?>
            <div class="btn-row">
              <a class="outline-button" href="/calendar">Club calendar</a>
              <a class="outline-button" href="/">Back to the club</a>
            </div>
          </div>
        <?php else: ?>
          <form class="register-form" method="post" action="/register?event=<?= e((string) $event['id']) ?>"
                data-ajax-form="/api/registrations" data-form-type="event-registration" novalidate>
            <input type="hidden" name="eventId" value="<?= e((string) $event['id']) ?>">
            <input type="hidden" name="csrf" value="<?= e($csrf) ?>">
            <div class="honeypot" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

            <div class="form-grid">
              <label class="field-span-2">Full name
                <input name="name" required placeholder="Your name" autocomplete="off" value="<?= e((string) ($values['name'] ?? '')) ?>">
              </label>
              <?php if (!empty($errors['name'])): ?><div class="field-error field-span-2"><?= e($errors['name']) ?></div><?php endif; ?>

              <label>Email address
                <input name="email" type="email" required placeholder="you@example.com" autocomplete="off" inputmode="email" value="<?= e((string) ($values['email'] ?? '')) ?>">
              </label>
              <label>Phone number
                <input name="phone" type="tel" required placeholder="+91 …" autocomplete="off" inputmode="tel" value="<?= e((string) ($values['phone'] ?? '')) ?>">
              </label>
              <label>Course / programme
                <input name="course" placeholder="Your programme" autocomplete="off" value="<?= e((string) ($values['course'] ?? '')) ?>">
              </label>
              <label>Year of study
                <input name="year" placeholder="First year" autocomplete="off" value="<?= e((string) ($values['year'] ?? '')) ?>">
              </label>
            </div>

            <?php if (!empty($errors['email'])): ?><div class="field-error"><?= e($errors['email']) ?></div><?php endif; ?>
            <?php if (!empty($errors['phone'])): ?><div class="field-error"><?= e($errors['phone']) ?></div><?php endif; ?>

            <button class="solid-button register-submit" type="submit">
              <?= $paid ? 'Send and continue to payment ↗' : 'Send and get my pass ↗' ?>
            </button>
            <div class="form-status" aria-live="polite"></div>

            <div class="terms-note">
              <strong>Terms &amp; conditions</strong>
              <ul>
                <li>By registering you agree to follow the terms and conditions of the event.</li>
                <li>The registration fee is <strong>non-refundable</strong>.</li>
                <li>Decisions of the club about the event are final. The club may cancel the event or change the date
                  or venue without prior notice.</li>
                <li>If the club cancels the event, the fee is refunded within <strong>24 working days</strong>.</li>
                <li>One pass per person, valid for this event only; carry a photo ID.</li>
              </ul>
            </div>
          </form>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>
