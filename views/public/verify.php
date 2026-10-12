<?php
/**
 * /verify/<public id> — the page a scanned pass opens.
 *
 * Anyone can open it: a student showing the pass, a club member at the door, or
 * a stranger who found a lost pass. It answers one question — is this pass real,
 * and for which event — without ever printing a pass code, a phone number or an
 * email address.
 *
 * @var bool   $checked
 * @var string $verdict      valid | pending | cancelled | unknown
 * @var array  $registration
 * @var array  $event
 * @var array  $site
 */
$checked = $checked ?? false;
$verdict = $verdict ?? 'unknown';
$registration = $registration ?? [];
$event = $event ?? [];
$site = $site ?? [];

$verdictText = [
    'valid'     => ['This pass is real.', 'is-valid'],
    'pending'   => ['Payment not finished yet.', 'is-pending'],
    'cancelled' => ['This pass was cancelled.', 'is-cancelled'],
    'unknown'   => [$checked ? 'No pass matches this code.' : 'Check a pass.', 'is-unknown'],
][$verdict] ?? ['Check a pass.', 'is-unknown'];
?>
<section class="section panel-section verify-section" id="verify">
  <div class="container">
    <div class="club-panel verify-panel">
      <span class="eyebrow plain">Mindful Tattva · pass check</span>
      <h1 class="display"><?= e($verdictText[0]) ?></h1>

      <?php if ($verdict === 'valid'): ?>
        <div class="verify-verdict <?= e($verdictText[1]) ?>">
          <span class="verify-mark" aria-hidden="true">✓</span>
          <div>
            <strong><?= e(mt_mask_name((string) ($registration['name'] ?? ''))) ?></strong>
            <span><?= e((string) ($registration['eventTitle'] ?? '')) ?></span>
            <span><?= e(mt_event_line($event ?: $registration)) ?></span>
          </div>
        </div>
        <p class="muted">The club's register holds this pass and its serial. Contact details are deliberately not shown
          here — only the club can see them.</p>
      <?php elseif ($verdict === 'pending'): ?>
        <div class="verify-verdict <?= e($verdictText[1]) ?>">
          <span class="verify-mark" aria-hidden="true">…</span>
          <div>
            <strong><?= e(mt_mask_name((string) ($registration['name'] ?? ''))) ?></strong>
            <span><?= e((string) ($registration['eventTitle'] ?? '')) ?></span>
            <span>The registration exists, but the payment is not confirmed yet, so no pass has been issued.</span>
          </div>
        </div>
      <?php elseif ($verdict === 'cancelled'): ?>
        <div class="verify-verdict <?= e($verdictText[1]) ?>">
          <span class="verify-mark" aria-hidden="true">✕</span>
          <div>
            <strong><?= e(mt_mask_name((string) ($registration['name'] ?? ''))) ?></strong>
            <span><?= e((string) ($registration['eventTitle'] ?? '')) ?></span>
            <span>Entry is not allowed with this pass.</span>
          </div>
        </div>
      <?php else: ?>
        <p class="muted">
          Scan the QR code printed on a Mindful Tattva event pass, or open the link under it, and this page will show
          whether the pass is real. Nothing about the holder is shown — only the event and the pass state.
        </p>
        <form class="verify-form" method="get" action="/verify">
          <label>Pass link or code
            <input type="text" name="id" placeholder="Paste the link from the pass QR" autocomplete="off">
          </label>
          <button class="solid-button" type="submit">Check this pass</button>
          <div class="form-status" aria-live="polite"></div>
        </form>
      <?php endif; ?>

      <div class="btn-row" style="margin-top:22px">
        <a class="outline-button" href="/">Back to the club</a>
        <a class="outline-button" href="/calendar">What's on</a>
      </div>
    </div>
  </div>
</section>
