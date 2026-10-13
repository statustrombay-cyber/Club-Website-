<?php
/**
 * The student's own pass page.
 *
 * The link is /pass/<private code>. The code is the only key, it is stored as
 * a hash, and it is never printed here, drawn in the QR code, put in the PDF or
 * listed in the club dashboard — so a screenshot of this page gives nothing
 * away beyond the serial the club already reads at the door.
 *
 * Three stages:
 *   1. pay       — a paid seat, waiting for the payment screenshot
 *   2. ready     — the pass itself
 *   3. cancelled — the club cancelled the registration or the event
 *
 * @var array       $registration
 * @var array       $event
 * @var array       $site
 * @var string      $code        The private code from the link (never printed).
 * @var string|null $message
 * @var string      $stage
 * @var bool        $justRegistered
 * @var bool        $justPaid
 */
$stage = $stage ?? mt_registration_stage($registration);
$fee = (float) ($registration['eventFee'] ?? 0);
$paid = $fee > 0;
$ready = $stage === 'ready';
$status = (string) ($registration['paymentStatus'] ?? 'pending');
$chipClass = match ($status) {
    'verified'     => 'is-verified',
    'submitted'    => 'is-submitted',
    'rejected'     => 'is-rejected',
    'not-required' => 'is-free',
    default        => 'is-pending',
};
$serial = trim((string) ($registration['serial'] ?? ''));
$verifyUrl = mt_verify_url($registration);
$verifyPath = '/verify/' . rawurlencode((string) ($registration['publicId'] ?? ''));
/* The PDF is fetched by serial: this browser already holds the pass code in its
   session, so the link on the page never has to print it. */
$pdfPath = '/api/pass/' . rawurlencode($serial !== '' ? $serial : (string) $registration['id']);
?>
<section class="pass-shell" id="pass">
  <div class="container pass-container">

    <?php if ($justRegistered): ?>
      <div class="club-panel pass-intro">
        <span class="eyebrow plain">Registration received</span>
        <h2><?= $paid ? 'One step left — pay and upload the screenshot.' : 'You are registered. Your pass is ready.' ?></h2>
        <?php if ($paid): ?>
          <p>Pay <strong><?= e(mt_money($fee)) ?></strong> to the club's UPI ID below and upload the screenshot.
            <strong>The pass is issued the moment the payment proof arrives</strong> — until then no serial is
            printed and no seat is held.</p>
        <?php else: ?>
          <p>Nothing to pay — this event is free. Keep this pass with you at the door, printed or on your phone.</p>
        <?php endif; ?>
        <p class="muted">Save this page (bookmark it, or keep the link you were sent). Only you have it — the club cannot
          re-create it for you, and nobody can see your pass without it.</p>
      </div>
    <?php endif; ?>

    <?php if (!empty($message)): ?>
      <div class="club-panel pass-intro"><p class="muted" style="margin:0"><?= e($message) ?></p></div>
    <?php endif; ?>

    <?php if ($justPaid && $ready): ?>
      <div class="club-panel pass-intro is-good">
        <span class="eyebrow plain">Payment proof received</span>
        <h2>Your pass is issued.</h2>
        <p>Serial <strong><?= e($serial) ?></strong> is now in the club register. Download the PDF below — it is the
          pass you show at the door, along with the same screenshot.</p>
      </div>
    <?php endif; ?>

    <?php if ($stage === 'cancelled'): ?>
      <div class="club-panel pass-intro is-warning">
        <span class="eyebrow plain">Cancelled</span>
        <h2>This registration was cancelled.</h2>
        <p>The pass is no longer valid at the door. If the club cancelled the event, the fee is refunded within
          <strong>24 working days</strong> to the account the payment came from.</p>
      </div>
    <?php endif; ?>

    <?php if ($stage === 'pay' || $stage === 'proof-rejected'): ?>

      <div class="club-panel pay-panel">
        <span class="eyebrow plain">Step 2 of 2 · payment</span>
        <h2><?= e($stage === 'proof-rejected' ? 'Please upload the screenshot again' : 'Pay ' . mt_money($fee) . ' to hold your seat') ?></h2>
        <?php if ($stage === 'proof-rejected'): ?>
          <p class="muted">The club could not accept the last screenshot. A clear screenshot of the payment receipt is
            enough — it is only checked by the club team.</p>
        <?php else: ?>
          <p class="muted">No serial, no pass and no seat exist until this screenshot arrives. That is how the club
            keeps the door list honest.</p>
        <?php endif; ?>

        <div class="pay-card">
          <div class="pay-qr"><?= mt_qr_svg(mt_upi_link($event ?: $registration, $registration), 190, 'UPI payment code') ?></div>
          <div class="pay-copy">
            <h4>Scan to pay <?= e(mt_money($fee)) ?></h4>
            <p>Use any UPI app and pay the exact amount.</p>
            <span class="pay-upi"><?= e((string) ($registration['eventUpi'] ?: ($event['upiId'] ?? ''))) ?></span>
            <ol class="pay-steps">
              <li>Pay <strong><?= e(mt_money($fee)) ?></strong> — a screenshot of the receipt is your proof.</li>
              <li>Upload it below. JPG, PNG, WEBP, GIF or PDF, up to 2&nbsp;MB — a phone screenshot is far smaller.</li>
              <li>The pass is issued immediately after, with its serial and its QR code.</li>
            </ol>
          </div>
        </div>

        <!-- the upload posts to /pass with no code in the HTML: this browser
             already holds the pass it opened -->
        <form class="upload-row proof-form" method="post" action="/pass"
              enctype="multipart/form-data">
          <input type="hidden" name="csrf" value="<?= e(mt_csrf_token()) ?>">
          <label>Payment screenshot
            <input type="file" name="proof" accept="image/png,image/jpeg,image/webp,image/gif,application/pdf" required>
          </label>
          <span class="upload-file-name muted"></span>
          <button class="solid-button" type="submit">Upload proof and get my pass ↗</button>
          <p class="pass-note">Your screenshot is stored with this registration and is only seen by the club team.</p>
        </form>
      </div>

    <?php else: ?>

      <article class="pass-ticket">
        <header class="pass-head">
          <div class="pass-club">
            <img src="<?= e(mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg') ?>" alt="" loading="lazy" decoding="async">
            <span>
              <small><?= e((string) ($site['clubName'] ?? 'Mindful Tattva')) ?> · event pass</small>
              <strong><?= e((string) ($site['department'] ?? '')) ?></strong>
            </span>
          </div>
          <div class="pass-serial">
            <small>Pass serial</small>
            <strong><?= e($serial !== '' ? $serial : 'Issued on payment') ?></strong>
          </div>
        </header>

        <div class="pass-body">
          <div>
            <h2 class="pass-name"><?= e((string) $registration['name']) ?></h2>
            <div class="pass-event"><?= e((string) $registration['eventTitle']) ?></div>
            <dl class="pass-facts">
              <div><dt>Date</dt><dd><?= e((string) $registration['eventDate']) ?></dd></div>
              <div><dt>Time</dt><dd><?= e((string) ($registration['eventTime'] ?: 'To be announced')) ?></dd></div>
              <div><dt>Venue</dt><dd><?= e((string) ($registration['eventVenue'] ?: 'To be announced')) ?></dd></div>
              <div><dt>Fee</dt><dd><?= e($paid ? mt_money($fee) : 'Free entry') ?></dd></div>
              <div><dt>Payment</dt><dd><?= e(mt_payment_label($status)) ?></dd></div>
              <div><dt>Registered</dt><dd><?= e((string) $registration['createdAt']) ?></dd></div>
            </dl>
          </div>
          <div class="pass-qr">
            <?= mt_qr_svg(mt_pass_qr_link($registration), 148, 'Verification code for pass ' . $serial) ?>
            <span class="pass-qr-note">Scan to check</span>
          </div>
        </div>

        <div class="pass-rules">
          <strong>Entry &amp; refund terms</strong>
          <ul>
            <li>Show this pass <strong>and your payment proof</strong> at the entry desk. Entry is given only when the
              pass serial matches the club register.</li>
            <li>One person, this event only. The pass cannot be sold or transferred — please carry a photo ID.</li>
            <li>By registering you agree to the terms and conditions of the event. The fee is
              <strong>non-refundable</strong>.</li>
            <li>Decisions of the club about the event are final. The club may cancel the event or change the date or
              venue without prior notice.</li>
            <li>If the club cancels the event, the fee is refunded within <strong>24 working days</strong>.</li>
          </ul>
        </div>

        <div class="pass-actions">
          <?php if ($ready): ?>
            <a class="solid-button" href="<?= e($pdfPath) ?>">Download your pass (PDF) ↗</a>
            <a class="outline-button" href="<?= e($verifyPath) ?>" target="_blank" rel="noreferrer">Open the check page ↗</a>
          <?php else: ?>
            <span class="status-chip <?= e($chipClass) ?>"><?= e(mt_payment_label($status)) ?></span>
          <?php endif; ?>
          <button class="outline-button" type="button" data-print>Print this pass</button>
          <a class="outline-button" href="/calendar">Club calendar</a>
        </div>
        <p class="pass-note">
          <?php if ($ready): ?>
            Anyone can confirm this pass is real by scanning its code — that page shows the event and the pass state,
            never your contact details. Keep this link to yourself: it is the only way to open this page.
          <?php else: ?>
            The pass is issued once the payment screenshot arrives.
          <?php endif; ?>
        </p>
      </article>

    <?php endif; ?>

    <div class="club-panel pass-intro">
      <h3>The club's help line</h3>
      <p class="muted">
        <?php if (trim((string) ($site['email'] ?? '')) !== ''): ?>
          Write to <a href="mailto:<?= e((string) $site['email']) ?>"><?= e((string) $site['email']) ?></a>
        <?php endif; ?>
        <?php if (trim((string) ($site['clubPhone'] ?? '')) !== ''): ?>
          · call <a href="tel:<?= e(preg_replace('/[^+\d]/', '', (string) $site['clubPhone']) ?? '') ?>"><?= e((string) $site['clubPhone']) ?></a>
        <?php endif; ?>
        <?php if ($serial !== ''): ?>
          — quoting your pass serial <strong><?= e($serial) ?></strong>.
        <?php else: ?> — quoting the name and phone number you registered with.
        <?php endif; ?>
      </p>
      <p class="muted">If you are struggling and need to speak to someone right now: Tele-MANAS 14416 (free, 24×7) or
        KIRAN 1800-599-0019.</p>
    </div>
  </div>
</section>
