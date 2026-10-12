<?php
/**
 * The student's own pass page.
 *
 * Three states, in order:
 *   1. a paid event and nothing uploaded yet — show the UPI code and ask for
 *      the screenshot of the payment
 *   2. the screenshot is in — the pass is ready to download
 *   3. a free event — the pass is ready straight away
 *
 * @var array  $registration
 * @var array  $event
 * @var array  $site
 * @var string $token
 * @var string|null $message
 * @var bool   $justRegistered
 */
$fee = (float) ($registration['eventFee'] ?? 0);
$paid = $fee > 0;
$ready = mt_registration_pass_ready($registration);
$status = (string) ($registration['paymentStatus'] ?? 'pending');
$chipClass = match ($status) {
    'verified'     => 'is-verified',
    'submitted'    => 'is-submitted',
    'rejected'     => 'is-rejected',
    'not-required' => 'is-free',
    default        => 'is-pending',
};
$passUrl = '/pass/' . rawurlencode((string) $registration['serial']) . '?token=' . rawurlencode($token);
?>
<section class="pass-shell" id="pass">
  <div class="container" style="width:min(760px, calc(100% - 36px)); margin:0 auto">

    <?php if ($justRegistered): ?>
      <div class="club-panel" style="margin-bottom:26px">
        <div class="eyebrow">Registration received</div>
        <h2><?= $paid ? 'One step left — pay and upload the screenshot.' : 'You are registered. Your pass is ready.' ?></h2>
        <p>
          <?php if ($paid): ?>
            Your seat is held for <strong><?= e((string) $registration['serial']) ?></strong>. Pay
            <strong><?= e(mt_money($fee)) ?></strong> to the club's UPI ID and upload the screenshot below — the pass
            is issued the moment it arrives.
          <?php else: ?>
            Nothing to pay: this event is free. Keep this pass with you at the door — printed or on your phone.
          <?php endif; ?>
        </p>
        <p class="muted">Bookmark or photograph this page: the link carries your private pass token.</p>
      </div>
    <?php endif; ?>

    <?php if (!empty($message)): ?>
      <div class="club-panel" style="margin-bottom:26px"><p class="muted" style="margin:0"><?= e($message) ?></p></div>
    <?php endif; ?>

    <?php if ((string) ($registration['status'] ?? 'confirmed') === 'cancelled'): ?>
      <div class="club-panel" style="margin-bottom:26px">
        <div class="eyebrow">Cancelled</div>
        <h3>This registration was cancelled.</h3>
        <p class="muted" style="margin:0">The pass is no longer valid at the door. If the club cancelled the event, the fee is
          returned within <strong>12 working days</strong> to the account the payment came from.</p>
      </div>
    <?php endif; ?>

    <article class="pass-ticket">
      <header class="pass-head">
        <div class="pass-club">
          <img src="<?= e(mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg') ?>" alt="">
          <span>
            <small><?= e((string) ($site['clubName'] ?? 'Mindful Tattva')) ?> · event pass</small>
            <strong><?= e((string) ($site['department'] ?? '')) ?></strong>
          </span>
        </div>
        <div class="pass-serial">
          <small>Pass serial</small>
          <strong><?= e((string) $registration['serial']) ?></strong>
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
            <div><dt>Registered</dt><dd><?= e((string) $registration['createdAt']) ?></dd></div>
            <div><dt>Contact</dt><dd><?= e((string) $registration['phone']) ?></dd></div>
          </dl>
        </div>
        <div class="pass-qr"><?= mt_qr_svg(mt_pass_code($registration), 148, 'Pass code ' . (string) $registration['serial']) ?></div>
      </div>

      <div class="pass-rules">
        <strong>Entry &amp; refund terms</strong>
        <ul>
          <li>Show this pass <strong>and your payment proof</strong> at the entry desk. Entry is given only when the pass serial matches the club register.</li>
          <li>One person, this event only. The pass cannot be sold or transferred — please carry a photo ID.</li>
          <li>The fee is <strong>non-refundable</strong>. It is returned only if the club cancels the event, within <strong>12 working days</strong>.</li>
          <li>The club may change the time or venue and will tell you on the number and email you registered with.</li>
        </ul>
      </div>

      <div class="pass-actions">
        <?php if ($ready): ?>
          <a class="solid-button" href="/api/pass/<?= e(rawurlencode((string) $registration['id'])) ?>?token=<?= e(rawurlencode($token)) ?>">Download your pass (PDF) ↗</a>
        <?php else: ?>
          <span class="status-chip <?= e($chipClass) ?>"><?= e(mt_payment_label($status)) ?></span>
        <?php endif; ?>
        <button class="outline-button" type="button" data-print>Print this pass</button>
        <a class="outline-button" href="<?= e($passUrl) ?>">Refresh this page</a>
        <a class="outline-button" href="/calendar">Club calendar</a>
      </div>
      <p class="pass-note">
        Keep this link private — anyone who has it can download your pass.
        <?php if ($paid && $ready): ?>
          The fee for this event is <strong><?= e(mt_money($fee)) ?></strong> and the payment proof you uploaded is attached to your registration in the club register.
        <?php endif; ?>
      </p>
    </article>

    <?php if ($paid): ?>
      <div class="club-panel" style="margin-top:26px">
        <div class="eyebrow">Step <?= $ready ? '2 (done)' : '2' ?></div>
        <h3><?= $ready ? 'Payment proof received' : 'Pay ' . e(mt_money($fee)) . ' and upload the screenshot' ?></h3>

        <?php if (!$ready): ?>
          <div class="pay-card">
            <div class="pay-qr"><?= mt_qr_svg(mt_upi_link($event ?: $registration, $registration), 190, 'UPI payment code') ?></div>
            <div class="pay-copy">
              <h4>Scan to pay <?= e(mt_money($fee)) ?></h4>
              <p>Use any UPI app. Write this serial in the payment note if you can:</p>
              <span class="pay-upi"><?= e((string) ($registration['eventUpi'] ?: ($event['upiId'] ?? ''))) ?></span>
              <ol class="pay-steps">
                <li>Pay the exact amount: <strong><?= e(mt_money($fee)) ?></strong>.</li>
                <li>Take a screenshot of the receipt.</li>
                <li>Upload it below — JPG, PNG, WEBP, GIF or PDF, up to the club's upload limit.</li>
              </ol>
            </div>
          </div>

          <form method="post" action="<?= e($passUrl) ?>" enctype="multipart/form-data" class="upload-row">
            <input type="hidden" name="csrf" value="<?= e(mt_csrf_token()) ?>">
            <label>Payment screenshot<input type="file" name="proof" accept="image/*,application/pdf" required></label>
            <span class="upload-file-name muted"></span>
            <button class="solid-button" type="submit">Upload proof and get my pass ↗</button>
            <p class="pass-note">Your screenshot is stored with your registration and is only seen by the club team.</p>
          </form>
        <?php else: ?>
          <p class="muted">
            Your payment proof is with the club team. The pass above is valid for entry: show it along with the same
            screenshot at the door.
            <?php if ($status === 'verified'): ?>
              A club member has already checked this payment.
            <?php else: ?>
              The club checks payments before the event; if anything looks unclear they will call
              <strong><?= e((string) $registration['phone']) ?></strong>.
            <?php endif; ?>
          </p>
          <div class="btn-row">
            <a class="solid-button" href="/api/pass/<?= e(rawurlencode((string) $registration['id'])) ?>?token=<?= e(rawurlencode($token)) ?>">Download your pass (PDF) ↗</a>
            <a class="outline-button" href="/register?event=<?= e((string) $registration['eventId']) ?>">Register someone else</a>
          </div>
        <?php endif; ?>
      </div>
    <?php endif; ?>

    <div class="club-panel" style="margin-top:26px">
      <h3>The club's help line</h3>
      <p class="muted">
        <?php if (trim((string) ($site['email'] ?? '')) !== ''): ?>
          Write to <a href="mailto:<?= e((string) $site['email']) ?>"><?= e((string) $site['email']) ?></a>
        <?php endif; ?>
        <?php if (trim((string) ($site['clubPhone'] ?? '')) !== ''): ?>
          · call <a href="tel:<?= e(preg_replace('/[^+\d]/', '', (string) $site['clubPhone']) ?? '') ?>"><?= e((string) $site['clubPhone']) ?></a>
        <?php endif; ?>
        — quoting your pass serial <strong><?= e((string) $registration['serial']) ?></strong>.
      </p>
      <p class="muted">If you are struggling and need to speak to someone right now: Tele-MANAS 14416 (free, 24×7) or
        KIRAN 1800-599-0019.</p>
    </div>
  </div>
</section>
