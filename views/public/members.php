<?php
/**
 * Member list page.
 *
 * NOTE: this page is intentionally NOT linked in the public navigation and its
 * route is disabled in app/pages.php, because the club asked for the member
 * roster to stay inside the dashboard. To publish it again, add
 * `case 'members':` back to mt_public_page() and add a link in the layout.
 *
 * @var array $site
 * @var array $db
 */
$site    = $site ?? [];
$db      = $db ?? mt_db();
$members = mt_sorted($db['team'] ?? []);
$groups  = [
    'management' => ['Core Committee', 'The students who lead the club and keep it moving.'],
    'heads'      => ['Head Committee', 'Coordinators for outreach, events, design and research.'],
    'volunteers' => ['Volunteers', 'The hands and hearts behind every activity.'],
];
?>

<section class="cal-hero">
  <div class="container">
    <span class="eyebrow">Mindful Tattva · our people</span>
    <h1 class="display">Many minds. One gentle direction.</h1>
    <p class="lede">Everyone who makes space for curiosity, care and community at <?= e((string) ($site['universityName'] ?? 'the university')) ?>.</p>
  </div>
</section>

<section class="section section-tight">
  <div class="container">
    <?php foreach ($groups as $key => [$label, $note]): ?>
      <?php $list = array_values(array_filter($members, static fn($member) => ($member['group'] ?? 'management') === $key)); ?>
      <div class="member-group">
        <div class="member-group-head">
          <h2><?= e($label) ?></h2>
          <span><?= count($list) ?> member<?= count($list) === 1 ? '' : 's' ?> · <?= e($note) ?></span>
        </div>
        <div class="team-grid" data-render="team" data-team-scope="<?= e($key === 'management' ? 'all' : $key) ?>">
          <?php if ($list): ?>
            <?php foreach ($list as $member): ?><?= mt_team_card($member, $key === 'volunteers') ?><?php endforeach; ?>
          <?php else: ?>
            <div class="empty-state"><strong>No names here yet.</strong><p>This group will fill up as the club grows.</p></div>
          <?php endif; ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>
