<?php
/**
 * /verify/<public id> — the page a scanned pass opens.
 *
 * A student at the door scans the code on the pass with an ordinary phone lens
 * scanner and lands here. The page answers one question — is this pass true —
 * and nothing else: no steps, no instructions, no contact details, no site
 * address. Only the club sees how a pass is kept and checked.
 *
 * @var string $verdict      valid | pending | cancelled | unknown
 * @var array  $registration
 * @var array  $event
 */
$verdict = $verdict ?? 'unknown';
$registration = $registration ?? [];
$event = $event ?? [];

$verdictText = [
    'valid'     => ['This pass is verified as true.', 'is-valid'],
    'pending'   => ['This pass is not active yet.', 'is-pending'],
    'cancelled' => ['This pass is no longer valid.', 'is-cancelled'],
    'unknown'   => ['This pass could not be found.', 'is-unknown'],
][$verdict] ?? ['This pass could not be found.', 'is-unknown'];
?>
<section class="section panel-section verify-section" id="verify">
  <div class="container">
    <div class="club-panel verify-panel">
      <span class="eyebrow plain">Mindful Tattva</span>
      <h1 class="display"><?= e($verdictText[0]) ?></h1>

      <?php if ($verdict === 'valid' || $verdict === 'pending' || $verdict === 'cancelled'): ?>
        <div class="verify-verdict <?= e($verdictText[1]) ?>">
          <span class="verify-mark" aria-hidden="true"><?= $verdict === 'valid' ? '✓' : ($verdict === 'cancelled' ? '✕' : '…') ?></span>
          <div>
            <strong><?= e(mt_mask_name((string) ($registration['name'] ?? ''))) ?></strong>
            <span><?= e((string) ($registration['eventTitle'] ?? '')) ?></span>
            <span><?= e(mt_event_line($event ?: $registration)) ?></span>
          </div>
        </div>
        <?php if ($verdict !== 'valid'): ?>
          <p class="muted">Please speak to the club team at the door.</p>
        <?php endif; ?>
      <?php else: ?>
        <p class="muted">Please speak to the club team at the door.</p>
      <?php endif; ?>

      <div class="btn-row" style="margin-top:22px">
        <a class="outline-button" href="/">Back to the club</a>
      </div>
    </div>
  </div>
</section>
