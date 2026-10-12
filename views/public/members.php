<?php
/**
 * The members page: the vision card and the directory, group by group.
 *
 * @var array $db    Whole content store.
 * @var array $site  Club copy.
 */
$grouped = [];
foreach (MT_TEAM_GROUPS as $group) {
    $grouped[$group] = [];
}
foreach (mt_sorted(mt_named_team($db['team'] ?? [])) as $person) {
    $group = (string) ($person['group'] ?? 'management');
    if (!isset($grouped[$group])) {
        $group = 'management';
    }
    $grouped[$group][] = $person;
}
$bodyClass = 'members-page';
?>
<section class="members-hero">
  <div class="container members-hero-grid">
    <div>
      <div class="eyebrow">The people who hold the space</div>
      <h1 class="display">Meet the minds behind <em>Mindful Tattva.</em></h1>
      <p class="members-hero-copy">This is a living directory of the students who organise, imagine and care for the psychology club at <?= e((string) ($site['universityName'] ?? '')) ?>.</p>
      <div class="members-hero-actions">
        <a class="solid-button" href="#members">Meet the members ↘</a>
        <a class="outline-button" href="/#join">Join the club</a>
      </div>
    </div>
    <div class="psi-orbit" aria-label="Psi symbol for psychology">
      <span class="psi-dot psi-dot-one"></span><span class="psi-dot psi-dot-two"></span><span class="psi-mark">Ψ</span>
    </div>
  </div>
</section>

<section class="members-vision" id="vision">
  <div class="container vision-card">
    <div>
      <div class="vision-label">Our members page vision</div>
      <h2>Many minds.<br>One gentle direction.</h2>
    </div>
    <p id="memberVision"><?= e((string) ($site['memberVision'] ?? '')) ?></p>
  </div>
</section>

<section class="member-directory" id="members">
  <div class="container">
    <div class="member-directory-head">
      <div><div class="eyebrow">People &amp; pathways</div><h2>Find the right<br>circle.</h2></div>
      <p>The Core Committee and Head Committee hold the foundation of the club. Volunteers keep the circle open for students who want to contribute.</p>
    </div>
    <div id="memberGroups">
      <?php foreach (MT_TEAM_GROUPS as $group): ?>
        <?= mt_member_group($group, $grouped[$group] ?? []) ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>
