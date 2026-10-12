<?php
/**
 * Public home page.
 *
 * @var array $site
 * @var array $db
 */
$site     = $site ?? [];
$db       = $db ?? mt_db();
$gallery  = array_values(array_filter($db['gallery'] ?? [], static fn($item) => mt_safe_image($item['image'] ?? '') !== ''));
$events   = array_values(array_filter($db['events'] ?? [], static fn($item) => trim((string) ($item['title'] ?? '')) !== ''));
$awareness = mt_sorted($db['awareness'] ?? []);
$team     = mt_sorted($db['team'] ?? []);
$heroImage = mt_safe_image($awareness[0]['image'] ?? '') ?: mt_safe_image($site['logoImage'] ?? '');
$instagram = mt_safe_url($site['instagramUrl'] ?? '');
$clubPhone = trim((string) ($site['clubPhone'] ?? ''));
$universityWebsite = mt_safe_url($site['universityWebsite'] ?? '');
$email     = (string) ($site['email'] ?? '');
$address   = (string) ($site['address'] ?? '');
$marquee   = ['notice what you feel', 'curiosity opens doors', 'connection changes the story', 'ask for help early', 'you are allowed to take up space'];
?>

<section class="hero" id="top">
  <div class="container hero-grid">
    <div class="hero-copy">
      <span class="eyebrow"><?= e((string) ($site['eyebrow'] ?? 'Psychology Club')) ?></span>
      <h1 class="display"><?= e((string) ($site['tagline'] ?? 'A softer space to understand the mind.')) ?></h1>
      <p class="lede"><?= e((string) ($site['intro'] ?? '')) ?></p>

      <div class="btn-row" style="margin-top:30px">
        <a class="btn btn-solid" href="#awareness">Mental health awareness <span aria-hidden="true">↘</span></a>
        <a class="btn btn-ghost" href="#join">Join Mindful Tattva</a>
      </div>

      <div class="hero-stat-row" data-render="stats">
        <?php foreach ((array) ($site['stats'] ?? []) as $stat): ?>
          <div class="stat-chip">
            <strong><?= e((string) ($stat['value'] ?? '')) ?></strong>
            <span><?= e((string) ($stat['label'] ?? '')) ?></span>
          </div>
        <?php endforeach; ?>
      </div>

      <div class="hero-meta">
        <div><strong><?= e((string) ($site['universityName'] ?? '')) ?></strong><span><?= e((string) ($site['department'] ?? '')) ?></span></div>
        <div><strong>Student-led</strong><span>open to every course and every year</span></div>
      </div>
    </div>

    <div class="hero-art">
      <div class="hero-card">
        <?php if ($heroImage !== ''): ?>
          <img src="<?= e($heroImage) ?>" alt="Mindful Tattva illustration" width="900" height="1080">
        <?php endif; ?>
        <div class="hero-card-copy">
          <small>mind · body · connection</small>
          <strong>pause, notice,<br>stay curious.</strong>
        </div>
      </div>
      <div class="hero-note">A club about the minds we actually live in — not just the ones in textbooks.</div>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    <?php for ($i = 0; $i < 2; $i++): ?>
      <?php foreach ($marquee as $word): ?><span><?= e($word) ?></span><?php endforeach; ?>
    <?php endfor; ?>
  </div>
</div>

<section class="section section-tint" id="about">
  <div class="container about-grid">
    <div class="about-note reveal">
      <div class="mini-mark" aria-hidden="true">✦</div>
      <p><?= e((string) ($site['clubName'] ?? 'Mindful Tattva')) ?> is the psychology club under the
        <strong><?= e((string) ($site['department'] ?? '')) ?></strong> at
        <strong><?= e((string) ($site['universityName'] ?? '')) ?></strong>.</p>
      <?php if ($address !== ''): ?>
        <a href="https://www.google.com/maps/search/?api=1&amp;query=<?= e(urlencode($address)) ?>" target="_blank" rel="noreferrer noopener"><?= e($address) ?> ↗</a>
      <?php endif; ?>
    </div>

    <div class="about-copy reveal">
      <span class="eyebrow">A little about us</span>
      <h3><?= e((string) ($site['aboutHeading'] ?? '')) ?></h3>
      <p><?= e((string) ($site['aboutBody'] ?? '')) ?></p>
    </div>
  </div>
</section>

<section class="section" id="lens">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">The psychology lens</span>
        <h2 class="display">A club for the lives we are actually living.</h2>
      </div>
      <p>Psychology is not only something we study. It is how we notice our thoughts, hold space for another person, move through change and build a life that feels more like our own.</p>
    </div>

    <div class="grid-3">
      <article class="lens-card reveal">
        <div class="index">01</div>
        <div class="glyph" aria-hidden="true">◌</div>
        <h3>Notice</h3>
        <p>Pause long enough to meet your inner world with a little more honesty and a lot more kindness.</p>
      </article>
      <article class="lens-card reveal">
        <div class="index">02</div>
        <div class="glyph" aria-hidden="true">◒</div>
        <h3>Connect</h3>
        <p>Turn conversations into bridges — between ideas, between people, between the many parts of ourselves.</p>
      </article>
      <article class="lens-card reveal">
        <div class="index">03</div>
        <div class="glyph" aria-hidden="true">✦</div>
        <h3>Grow</h3>
        <p>Carry what you learn into everyday choices, relationships and the campus community around you.</p>
      </article>
    </div>
  </div>
</section>

<section class="section section-tint" id="details">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">More than a club</span>
        <h2 class="display">A place to learn, listen and leave a little more grounded.</h2>
      </div>
      <p><?= e((string) ($site['clubDescription'] ?? '')) ?></p>
    </div>

    <div class="detail-grid">
      <article class="detail-card warm reveal">
        <span>Our mission</span>
        <h3>Make psychology approachable.</h3>
        <p><?= e((string) ($site['mission'] ?? '')) ?></p>
      </article>
      <article class="detail-card sage reveal">
        <span>Our vision</span>
        <h3>Empathy in action.</h3>
        <p><?= e((string) ($site['vision'] ?? '')) ?></p>
      </article>
      <article class="detail-card plum reveal">
        <span>What members experience</span>
        <h3>Find your people and your pace.</h3>
        <p><?= e((string) ($site['memberBenefits'] ?? '')) ?></p>
      </article>
    </div>
  </div>
</section>

<section class="section" id="history">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">Our story</span>
        <h2 class="display">Every meaningful space begins with a first step.</h2>
      </div>
      <p>The club is still young, and this timeline grows with it. Milestones, people and memories will be added here as Mindful Tattva finds its rhythm.</p>
    </div>

    <div class="timeline" data-render="history">
      <?php foreach ((array) ($db['history'] ?? []) as $entry): ?>
        <article class="timeline-item reveal">
          <div class="timeline-year"><?= e((string) ($entry['year'] ?? '')) ?></div>
          <h3><?= e((string) ($entry['title'] ?? '')) ?></h3>
          <p><?= e((string) ($entry['body'] ?? '')) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section section-tint" id="events">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">Gatherings &amp; experiences</span>
        <h2 class="display">Good things happen when we make time for them.</h2>
      </div>
      <p>Workshops, conversations, quiet pauses and every little event that brings our community closer together.</p>
    </div>

    <div class="event-grid" data-render="events">
      <?php if ($events): ?>
        <?php foreach ($events as $event): ?><?= mt_event_card($event) ?><?php endforeach; ?>
      <?php else: ?>
        <div class="empty-state"><strong>No events are scheduled right now.</strong><p>New activities will be published here as soon as the club team announces them.</p></div>
      <?php endif; ?>
    </div>
  </div>
</section>

<section class="section" id="calendar">
  <div class="container">
    <div class="teaser reveal">
      <div>
        <span class="eyebrow">The year ahead</span>
        <h3>Twelve months, one calm place.</h3>
        <p>Every planned activity, with its date, time and location — kept in one quiet calendar instead of scattered posts.</p>
      </div>
      <a class="btn btn-solid" href="/calendar">Open the club calendar ↗</a>
    </div>
  </div>
</section>

<section class="section section-tint" id="gallery">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">Photo album</span>
        <h2 class="display"><?= e((string) ($site['galleryHeading'] ?? 'Every gathering leaves a trace.')) ?></h2>
      </div>
      <p><?= e((string) ($site['galleryIntro'] ?? '')) ?></p>
    </div>

    <div class="gallery-grid" data-render="gallery-preview" data-limit="6">
      <?php if ($gallery): ?>
        <?php foreach (array_slice($gallery, 0, 6) as $index => $item): ?><?= mt_gallery_card($item, $index) ?><?php endforeach; ?>
      <?php else: ?>
        <div class="empty-state"><strong>Photo album is warming up.</strong><p>Club photos will appear here as soon as the team uploads them.</p></div>
      <?php endif; ?>
    </div>

    <div class="reveal-more"><a class="btn btn-ghost" href="/gallery">See every photo ↗</a></div>
  </div>
</section>

<!-- ===================== awareness: scroll-driven tile rails ============== -->
<section class="awareness section" id="awareness">
  <div class="container section-head">
    <div>
      <span class="eyebrow"><?= e((string) ($site['awarenessEyebrow'] ?? 'Mental health awareness')) ?></span>
      <h2 class="display"><?= e((string) ($site['awarenessHeading'] ?? 'Mental health is not a theory.')) ?></h2>
    </div>
    <p><?= e((string) ($site['awarenessIntro'] ?? '')) ?></p>
  </div>

  <div class="awareness-stage" data-awareness-stage style="--tiles: <?= max(1, count($awareness)) ?>">
    <div class="awareness-sticky">
      <div class="container awareness-layout">
        <div class="awareness-copy">
          <span class="eyebrow">How it reaches us</span>
          <h2 class="display">Four quiet truths about the mind on campus.</h2>
          <p>Stress rarely announces itself. It hides in skipped classes, shorter tempers, longer nights and the sentences we never say out loud. Keep scrolling — these tiles move with you.</p>

          <div class="awareness-note">
            <strong>If someone needs help tonight</strong>
            <?= e((string) ($site['awarenessNote'] ?? '')) ?>
          </div>

          <div class="awareness-hint" aria-hidden="true">
            <span class="dots"><i></i><i></i><i></i></span>
            <span>Scroll — the tiles keep moving</span>
          </div>
        </div>

        <div class="awareness-rails" data-render="awareness">
          <?= mt_awareness_rails($awareness) ?>
        </div>
      </div>
    </div>
  </div>

  <div class="awareness-progress" aria-hidden="true"><span data-rail-progress></span></div>
</section>

<section class="section section-tint" id="team">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">People behind the pause</span>
        <h2 class="display">Meet the core team.</h2>
      </div>
      <p>The students who hold the space, plan the circles and keep the club warm and welcoming for everyone.</p>
    </div>

    <div class="team-grid" data-render="team" data-team-scope="home">
      <?php
      $coreTeam = array_values(array_filter($team, static fn($member) => ($member['group'] ?? 'management') === 'management' && ($member['showOnHome'] ?? true) !== false));
      ?>
      <?php if ($coreTeam): ?>
        <?php foreach ($coreTeam as $member): ?><?= mt_team_card($member) ?><?php endforeach; ?>
      <?php else: ?>
        <div class="empty-state"><strong>Team profiles are on the way.</strong><p>The club team will publish names and roles soon.</p></div>
      <?php endif; ?>
    </div>
  </div>
</section>

<section class="section" id="join">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">Your next step</span>
        <h2 class="display">Join the club, start the conversation.</h2>
      </div>
      <p>Two quick forms: become a member of Mindful Tattva, or register for a specific activity. Both go straight to the club team.</p>
    </div>

    <div class="forms-grid">
      <?php mt_form('membership', [
          'kicker' => 'Membership / join the club',
          'title'  => 'Find your place in the circle.',
          'note'   => (string) ($site['joiningIntro'] ?? ''),
          'button' => 'Send membership interest ↗',
          'fields' => ['course'],
      ]); ?>

      <?php mt_form('club-registration', [
          'kicker' => 'Club / event registration',
          'title'  => 'Register for the next experience.',
          'note'   => (string) ($site['registrationIntro'] ?? ''),
          'button' => 'Submit registration ↗',
          'dark'   => true,
      ]); ?>
    </div>
  </div>
</section>

<section class="section section-plum" id="contact">
  <div class="container contact-grid">
    <div class="reveal">
      <span class="eyebrow">Stay in the loop</span>
      <h2 class="display" style="margin:16px 0 18px">Let&rsquo;s keep the conversation going.</h2>
      <p class="lede"><?= e((string) ($site['contactNote'] ?? '')) ?></p>
    </div>

    <div class="contact-card reveal">
      <div class="contact-row">
        <img class="contact-seal" src="/assets/img/csmu-seal.png" alt="<?= e((string) ($site['universityName'] ?? '')) ?> seal" width="46" height="46">
        <div>
          <small>Our institution</small>
          <strong><?= e((string) ($site['universityName'] ?? '')) ?></strong>
          <div style="font-size:.8rem;opacity:.75"><?= e((string) ($site['department'] ?? '')) ?> · Psychology club</div>
        </div>
      </div>

      <?php if ($instagram !== ''): ?>
        <div class="contact-row">
          <div class="icon" aria-hidden="true">◎</div>
          <div><small>Instagram</small><a href="<?= e($instagram) ?>" target="_blank" rel="noreferrer noopener"><?= e((string) ($site['instagramHandle'] ?? 'Instagram')) ?> ↗</a></div>
        </div>
      <?php endif; ?>

      <?php if ($email !== ''): ?>
        <div class="contact-row">
          <div class="icon" aria-hidden="true">@</div>
          <div><small>Email the club</small><a href="mailto:<?= e($email) ?>"><?= e($email) ?></a></div>
        </div>
      <?php endif; ?>

      <?php if ($clubPhone !== ''): ?>
        <div class="contact-row">
          <div class="icon" aria-hidden="true">☎</div>
          <div><small>Club phone</small><a href="tel:<?= e(preg_replace('/[^+\d]/', '', $clubPhone) ?? '') ?>"><?= e($clubPhone) ?></a></div>
        </div>
      <?php endif; ?>

      <?php if ($universityWebsite !== ''): ?>
        <div class="contact-row">
          <div class="icon" aria-hidden="true">↗</div>
          <div><small>University website</small><a href="<?= e($universityWebsite) ?>" target="_blank" rel="noreferrer noopener">Visit csmu.ac.in ↗</a></div>
        </div>
      <?php endif; ?>

      <?php if ($address !== ''): ?>
        <div class="contact-row">
          <div class="icon" aria-hidden="true">⌖</div>
          <div>
            <small>Find us on campus</small>
            <a href="https://www.google.com/maps/search/?api=1&amp;query=<?= e(urlencode($address)) ?>" target="_blank" rel="noreferrer noopener"><?= e($address) ?> ↗</a>
          </div>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>
