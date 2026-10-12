<?php
/**
 * /pass with no code — the student is simply reminded where their pass link is.
 *
 * The club deliberately cannot look a pass up by serial: the link the student
 * saved is the only key, so nobody can open someone else's pass page.
 *
 * @var array  $site
 */
?>
<section class="section panel-section verify-section" id="pass-lookup">
  <div class="container">
    <div class="club-panel verify-panel">
      <span class="eyebrow plain">Mindful Tattva · event pass</span>
      <h1 class="display">Find your pass</h1>
      <p class="muted">
        Your pass opens from the private link you were given when you registered — it looks like
        <code>…/pass/MT-XXXXX-XXXXX-XXXXX-XXXXX</code>. Bookmark it, or keep the page on your phone.
      </p>
      <p class="muted">
        Lost the link? Write to
        <?php if (trim((string) ($site['email'] ?? '')) !== ''): ?>
          <a href="mailto:<?= e((string) $site['email']) ?>"><?= e((string) $site['email']) ?></a>
        <?php else: ?>
          the club team
        <?php endif; ?>
        with the name, phone number and email you registered with — the club will re-issue your pass.
      </p>
      <div class="btn-row" style="margin-top:22px">
        <a class="outline-button" href="/calendar">What's on</a>
        <a class="outline-button" href="/">Back to the club</a>
      </div>
    </div>
  </div>
</section>
