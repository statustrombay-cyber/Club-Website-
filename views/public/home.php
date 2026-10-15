<?php
/**
 * The home page — the club's original design, with every word and picture
 * written by PHP from the club's own content.
 *
 * @var array $db    Whole content store.
 * @var array $site  Club copy.
 */
$site       = $db['site'];
$events     = array_values(array_filter(mt_events_numbered($db['events'] ?? []), static fn($event) => !empty($event['published'])));
$openEvents = mt_open_events($db);
$history    = mt_sorted($db['history'] ?? []);
$numbered   = mt_events_numbered($db['events'] ?? []);
/* The same photos a visitor meets on the gallery page, in the club's order:
   the stage turns through all of them, and the strip below shows the first
   few — so the home page opens the album instead of hiding it. */
$gallery       = array_slice(mt_sorted(mt_gallery_photos($db['gallery'] ?? [])), 0, 6);
$gallerySlides = mt_gallery_slides($db['gallery'] ?? []);
$team       = array_values(array_filter(
    mt_sorted(mt_named_team($db['team'] ?? [])),
    static fn($person) => ($person['group'] ?? 'management') === 'management'
));
$stats      = is_array($site['stats'] ?? null) ? $site['stats'] : [];
$instagram  = mt_safe_url($site['instagramUrl'] ?? '');
$address    = trim((string) ($site['address'] ?? ''));
$mapUrl     = 'https://www.google.com/maps/search/?api=1&query=' . urlencode($address);
$email      = trim((string) ($site['email'] ?? ''));
$phone      = trim((string) ($site['clubPhone'] ?? ''));
?>
<section class="hero hero-with-video reference-hero" id="top-section">
  <div class="reference-stars" aria-hidden="true"></div>
  <div class="container hero-grid">
    <div class="reference-opening">
      <h1 class="reference-name" id="heroName"><?= e((string) ($site['clubName'] ?? 'Mindful Tattva')) ?></h1>
      <p class="reference-subtitle" id="heroEyebrow"><?= e((string) ($site['eyebrow'] ?? 'The Psychology Club')) ?></p>
      <div class="reference-emblem">
        <img src="<?= e(mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg') ?>" alt="<?= e((string) ($site['clubName'] ?? 'Mindful Tattva')) ?> emblem" width="240" height="240" decoding="async">
      </div>
      <p class="reference-tagline" id="heroTagline"><?= mt_emphasise((string) ($site['tagline'] ?? '')) ?></p>
      <p class="hero-copy" id="heroIntro"><?= e((string) ($site['intro'] ?? '')) ?></p>
      <div class="hero-actions"><a class="solid-button" href="#events">Explore the club ↘</a><a class="outline-button" href="#join">Join Mindful Tattva</a></div>
      <div class="hero-meta"><div><strong id="heroUniversity"><?= e((string) ($site['universityName'] ?? '')) ?></strong><span id="heroDepartment"><?= e((string) ($site['department'] ?? '')) ?></span></div></div>
    </div>
  </div>
</section>

<?php
/* A thin band of the club's own words drifting past under the hero: four
   copies side by side, sliding exactly one copy across, so the loop has no
   seam. (Four, not two: one copy is about 1000px wide, and on a screen wider
   than that a two-copy band runs out of words at the seam. Every extra copy is
   one more period of the same pattern, so nothing looks repeated.) It is
   decoration, so it stays out of the reading order. */
$clubWords = ['mind', 'body', 'connection', 'curiosity', 'growth', 'community', 'kindness', 'a pause'];
?>
<div class="values-marquee" aria-hidden="true">
  <div class="values-track">
    <?php for ($copy = 0; $copy < 4; $copy++): ?>
      <div class="values-run">
        <?php foreach ($clubWords as $word): ?><span><?= e($word) ?></span><i>✦</i><?php endforeach; ?>
      </div>
    <?php endfor; ?>
  </div>
</div>

<section class="section section-tint" id="about">
  <div class="container about-grid">
    <div class="about-note">
      <div class="mini-mark">✦</div>
      <p>Mindful Tattva is the psychology club under the <strong id="aboutDepartment"><?= e((string) ($site['department'] ?? '')) ?></strong> at <strong id="aboutUniversity"><?= e((string) ($site['universityName'] ?? '')) ?></strong>.</p>
      <?php if ($address !== ''): ?>
        <a class="about-address" id="aboutAddress" href="<?= e($mapUrl) ?>" target="_blank" rel="noreferrer"><?= e($address) ?> ↗</a>
      <?php endif; ?>
    </div>
    <div class="about-copy">
      <div class="eyebrow">A little about us</div>
      <h3 id="aboutHeading"><?= e((string) ($site['aboutHeading'] ?? '')) ?></h3>
      <p id="aboutBody"><?= e((string) ($site['aboutBody'] ?? '')) ?></p>
      <?php if ($stats): ?>
        <div class="stat-row" id="statsRow">
          <?php foreach ($stats as $stat): ?>
            <div class="stat"><strong><?= e((string) ($stat['value'] ?? '')) ?></strong><span><?= e((string) ($stat['label'] ?? '')) ?></span></div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<section class="section psyche-section" id="mind">
  <?php /* The club's own stage: their logo held in a big round lens at the
           centre, with four words of the mind riding a wheel around it like a
           ferris wheel — the wheel turns, the words travel and never tip over,
           so every one of them can be read at every moment. The words are real
           text, the turning is CSS only, and it stops for anyone who asks for
           less motion. */ ?>
  <span id="psychology" aria-hidden="true"></span>
  <div class="container psyche-grid">
    <div class="psyche-copy">
      <div class="eyebrow">Mind</div>
      <h2 class="display">Every mind has more than one layer.</h2>
      <p>Mindful Tattva makes space for the questions beneath the surface: what we notice, what we carry
        and how connection changes the story.</p>
      <div class="psi-focus-note"><span></span><strong>slow down — look inward — stay curious</strong></div>
    </div>
    <div class="psi-stage" role="img" aria-label="The Mindful Tattva logo at the centre of a turning wheel that carries three words around it: unconscious, subconscious, conscious.">
      <div class="psi-stage-glow" aria-hidden="true"></div>
      <div class="psi-quotes" aria-hidden="true">
        <span class="psi-quote psi-quote-one">unconscious</span>
        <span class="psi-quote psi-quote-two">subconscious</span>
        <span class="psi-quote psi-quote-three">conscious</span>
      </div>
      <div class="psi-core">
        <img src="<?= e(mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg') ?>"
             alt="<?= e((string) ($site['clubName'] ?? 'Mindful Tattva')) ?> logo" loading="lazy" decoding="async">
      </div>
    </div>
  </div>

  <div class="container">
    <div class="psyche-cards">
      <article class="psyche-card psyche-card-one"><span class="psyche-index">01</span><div class="psyche-icon">◌</div><h3>Notice</h3><p>Pause long enough to meet your inner world with a little more honesty and kindness.</p></article>
      <article class="psyche-card psyche-card-two"><span class="psyche-index">02</span><div class="psyche-icon">◒</div><h3>Connect</h3><p>Turn conversations into bridges—between ideas, people and the many parts of ourselves.</p></article>
      <article class="psyche-card psyche-card-three"><span class="psyche-index">03</span><div class="psyche-icon">✦</div><h3>Grow</h3><p>Carry what you learn into everyday choices, relationships and the campus community.</p></article>
    </div>
  </div>
</section>

<?= mt_brand_chapter((string) ($site['clubName'] ?? 'Mindful Tattva')) ?>

<section class="happiness-section" aria-labelledby="happinessHeading">
  <div class="happiness-copy"><div class="eyebrow">Connection · belonging · growth</div><h2 id="happinessHeading">Club happiness index</h2><p>Making space for a happier campus, one conversation at a time.</p></div>
  <div class="happiness-chart" role="img" aria-label="An upward curve symbolising our hope to grow happier through connection and community.">
    <svg viewBox="0 0 600 280" aria-hidden="true"><defs><linearGradient id="happyFill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c8acef" stop-opacity=".3"/><stop offset="1" stop-color="#c8acef" stop-opacity="0"/></linearGradient></defs><path d="M25 235H575M25 175H575M25 115H575M25 55H575" class="chart-grid"/><path d="M25 230 C90 235 90 130 160 165 S240 190 285 110 S365 135 415 75 S495 105 575 30 L575 265H25Z" fill="url(#happyFill)"/><path id="happinessCurve" d="M25 230 C90 235 90 130 160 165 S240 190 285 110 S365 135 415 75 S495 105 575 30" class="happiness-line"/><circle r="5" fill="#ebd3ff" class="happiness-dot"><animateMotion dur="7s" repeatCount="indefinite" path="M25 230 C90 235 90 130 160 165 S240 190 285 110 S365 135 415 75 S495 105 575 30"/></circle></svg>
  </div>
</section>

<section class="section details-section" id="details">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">More than a club</div><h2 class="display">A place to learn, listen and leave a little more grounded.</h2></div>
      <p id="clubDescription"><?= e((string) ($site['clubDescription'] ?? '')) ?></p>
    </div>
    <div class="detail-grid">
      <article class="detail-card detail-card-warm"><span>Our mission</span><h3>Make psychology approachable.</h3><p id="missionText"><?= e((string) ($site['mission'] ?? '')) ?></p></article>
      <article class="detail-card detail-card-sage"><span>Our vision</span><h3>Empathy in action.</h3><p id="visionText"><?= e((string) ($site['vision'] ?? '')) ?></p></article>
      <article class="detail-card detail-card-plum"><span>What members experience</span><h3>Find your people and your pace.</h3><p id="benefitsText"><?= e((string) ($site['memberBenefits'] ?? '')) ?></p></article>
    </div>
  </div>
</section>

<section class="section history-section" id="history">
  <div class="container history-wrap">
    <div class="history-intro">
      <div class="eyebrow">Our history</div>
      <h2 class="display">Every meaningful space begins with a first step.</h2>
      <p>This timeline grows with the club — milestones, people and memories are added by the club team.</p>
    </div>
    <div class="timeline" id="historyList">
      <?php if (count($history) > 1): ?><span class="timeline-spine" aria-hidden="true"><i class="timeline-glint"></i></span><?php endif; ?>
      <?php foreach ($history as $entry): ?>
        <article class="timeline-item">
          <span class="timeline-dot"></span>
          <div class="timeline-year"><?= e((string) ($entry['year'] ?? '')) ?></div>
          <div><h3><?= e((string) ($entry['title'] ?? '')) ?></h3><p><?= e((string) ($entry['body'] ?? ($entry['description'] ?? ''))) ?></p></div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>


<div class="logo-medallion" aria-hidden="true">
  <img src="<?= e(mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg') ?>" alt="" loading="lazy" decoding="async">
  <span>Mindful Tattva</span>
</div>

<section class="section section-tint" id="events">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">Gatherings &amp; experiences</div><h2 class="display">Good things happen when we make time for them.</h2></div>
      <p>Workshops, conversations, quiet pauses and every little event that brings our community closer. Register here and
        your pass is issued for the door.</p>
    </div>
    <?php if ($events): ?>
      <div class="event-grid" id="eventGrid">
        <?php foreach ($events as $event): ?>
          <?= mt_event_card($event) ?>
        <?php endforeach; ?>
      </div>
    <?php else: ?>
      <div class="club-panel" id="eventGrid">
        <div class="eyebrow">No new events are scheduled</div>
        <h3>The next circle is still being planned.</h3>
        <p class="muted">Announcements appear here the moment the club publishes an event — with its date, time, venue,
          fee and how to register.</p>
      </div>
    <?php endif; ?>
    <?php if ($openEvents): ?>
      <div class="btn-row" style="margin-top:26px">
        <?php foreach ($openEvents as $open): ?>
          <a class="solid-button" href="/register?event=<?= e((string) $open['id']) ?>">Register for <?= e((string) $open['title']) ?> ↗</a>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</section>

<section class="section calendar-section" id="activities">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">The year ahead</div><h2 class="display">Keep the next thread in view.</h2></div>
      <p>See every month, scheduled activity and live event detail on the dedicated yearly activities page.<br><a class="event-link" href="/calendar">View full yearly activities ↗</a></p>
    </div>
    <div class="calendar-teaser" style="display:flex;align-items:center;justify-content:space-between;gap:24px;padding:24px 27px;border:1px solid rgba(78,49,85,.13);border-radius:20px;background:var(--cream);box-shadow:0 13px 30px rgba(61,39,66,.06)">
      <div>
        <div class="eyebrow">A compact preview</div>
        <h3 style="margin:8px 0 6px;color:var(--plum-deep);font-family:var(--font-display);font-size:clamp(1.7rem,3vw,2.5rem);font-weight:400">Twelve months, one calm place.</h3>
        <p style="margin:0;color:var(--ink-soft);font-size:.8rem">Upcoming dates, times and details — without taking over the homepage.</p>
      </div>
      <a class="solid-button" href="/calendar" style="flex:0 0 auto">View full calendar ↗</a>
    </div>
  </div>
</section>

<section class="section" id="gallery">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">Event gallery</div><h2 class="display"><?= e((string) ($site['galleryHeading'] ?? 'Small moments. Big meaning.')) ?></h2></div>
      <p><?= e((string) ($site['galleryIntro'] ?? 'Photos from your events will turn this space into a living scrapbook of the club.')) ?><br><a class="event-link" href="/gallery">Open the full gallery ↗</a></p>
    </div>
    <?= mt_gallery_stage($gallerySlides, 'Mindful Tattva gallery', 'stage-feature') ?>
    <?php if (count($gallery) > 1): ?>
      <div class="gallery-grid" id="galleryGrid">
        <?php foreach ($gallery as $item): ?>
          <?= mt_gallery_item($item) ?>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</section>


<div class="logo-medallion" aria-hidden="true">
  <img src="<?= e(mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg') ?>" alt="" loading="lazy" decoding="async">
  <span>Mindful Tattva</span>
</div>

<?= mt_photo_frame() ?>
<?= mt_gallery_data($gallerySlides) ?>

<section class="section section-tint" id="team">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">People behind the pause</div><h2 class="display">Meet the core team.</h2></div>
      <p>Names, roles, photos and member contact numbers are kept up to date by the club team.</p>
    </div>
    <div class="team-grid" id="teamGrid">
      <?php foreach ($team as $member): ?>
        <?= mt_team_card($member) ?>
      <?php endforeach; ?>
    </div>
    <div class="btn-row" style="margin-top:26px"><a class="outline-button" href="/members">See everyone in the club ↗</a></div>
  </div>
</section>

<section class="section join-section" id="join">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">Your next step</div><h2 class="display">Join the club, start the conversation.</h2></div>
      <p>Choose the path that fits you. Membership is for students who want to be part of the community; event
        registration issues your pass for a specific gathering.</p>
    </div>
    <div class="forms-grid">
      <form class="club-form" id="membershipForm" data-form-type="membership" data-ajax-form="/api/submissions"
            data-success-message="Thank you — the club team will write back soon ✓">
        <div class="form-kicker">Membership / join the club</div>
        <h3>Find your place in the circle.</h3>
        <p id="joiningIntro"><?= e((string) ($site['joiningIntro'] ?? '')) ?></p>
        <label>Full name<input name="name" required placeholder="Your name" autocomplete="name"></label>
        <div class="form-row">
          <label>Email address<input name="email" type="email" required placeholder="you@example.com" autocomplete="email"></label>
          <label>Phone number<input name="phone" type="tel" required placeholder="+91 ..." autocomplete="tel"></label>
        </div>
        <div class="form-row">
          <label>Course / programme<input name="course" placeholder="Your programme"></label>
          <label>Year of study<input name="year" placeholder="First year"></label>
        </div>
        <label>What interests you?<textarea name="interests" rows="3" placeholder="Workshops, research, mental wellbeing, events..."></textarea></label>
        <div class="honeypot" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <button class="solid-button" type="submit">Send membership interest ↗</button>
        <div class="form-status" aria-live="polite"></div>
      </form>

      <article class="club-form club-form-dark" id="registrationForm">
        <div class="form-kicker">Club / event registration</div>
        <h3>Register for the next experience.</h3>
        <p id="registrationIntro"><?= e((string) ($site['registrationIntro'] ?? '')) ?></p>
        <?php if ($openEvents): ?>
          <ul class="register-list">
            <?php foreach ($openEvents as $open): ?>
              <li>
                <div>
                  <strong><?= e((string) $open['title']) ?></strong>
                  <span><?= e(mt_event_line($open)) ?></span>
                  <span class="register-fee"><?= e(mt_event_fee($open) > 0 ? mt_money(mt_event_fee($open)) . ' — UPI payment' : 'Free entry') ?></span>
                </div>
                <a class="solid-button" href="/register?event=<?= e((string) $open['id']) ?>">Register ↗</a>
              </li>
            <?php endforeach; ?>
          </ul>
        <?php else: ?>
          <p class="muted">Registration opens as soon as the club publishes an event. Meanwhile, leave your details in the
            membership form and you will hear first.</p>
        <?php endif; ?>
        <p class="pass-note">Every registration gets its own single-event pass: your serial, the date, the venue and the
          club's QR code. The pass is a PDF you can print or show on your phone at the door.</p>
        <?php if ($email !== ''): ?>
          <p class="muted">Questions? Write to <a href="mailto:<?= e($email) ?>"><?= e($email) ?></a><?= $phone !== '' ? ' or call ' . e($phone) : '' ?>.</p>
        <?php endif; ?>
      </article>
    </div>
  </div>
</section>

<?= mt_brand_finale((string) ($site['clubName'] ?? 'Mindful Tattva')) ?>

<section class="section section-plum" id="contact">
  <div class="container contact-grid">
    <div class="contact-copy">
      <div class="eyebrow" style="color:#e89b79">Stay in the loop</div>
      <h2 class="display">Let’s keep the conversation going.</h2>
      <p id="contactNote"><?= e((string) ($site['contactNote'] ?? '')) ?></p>
    </div>
    <div class="contact-card">
      <div class="contact-row university-contact-row">
        <div class="contact-icon">⌘</div>
        <img class="contact-seal" src="/assets/img/csmu-seal.png" alt="<?= e((string) ($site['universityName'] ?? '')) ?> seal" loading="lazy" decoding="async">
        <div>
          <small>Our institution</small>
          <strong class="contact-university-name" id="contactUniversityName"><?= e((string) ($site['universityName'] ?? '')) ?></strong>
          <span id="contactDepartmentName"><?= e((string) ($site['department'] ?? '')) ?> — Psychology Club</span>
        </div>
      </div>
      <?php if ($instagram !== ''): ?>
        <div class="contact-row">
          <div class="contact-icon">◎</div>
          <div><small>Instagram</small><a id="instagramContact" href="<?= e($instagram) ?>" target="_blank" rel="noreferrer"><?= e((string) ($site['instagramHandle'] ?? 'Instagram')) ?> ↗</a></div>
        </div>
      <?php endif; ?>
      <?php if ($email !== ''): ?>
        <div class="contact-row">
          <div class="contact-icon">@</div>
          <div><small>Email</small><a id="emailContact" href="mailto:<?= e($email) ?>"><?= e($email) ?></a></div>
        </div>
      <?php endif; ?>
      <?php if ($phone !== ''): ?>
        <div class="contact-row">
          <div class="contact-icon">✆</div>
          <div><small>Phone</small><a id="phoneContact" href="tel:<?= e(preg_replace('/[^+\d]/', '', $phone) ?? '') ?>"><?= e($phone) ?></a></div>
        </div>
      <?php endif; ?>
      <?php if ($address !== ''): ?>
        <div class="contact-row">
          <div class="contact-icon">⌖</div>
          <div>
            <small>Find us at the university</small>
            <a id="addressContact" href="<?= e($mapUrl) ?>" target="_blank" rel="noreferrer"><?= e($address) ?></a>
            <a id="addressMap" href="<?= e($mapUrl) ?>" target="_blank" rel="noreferrer">Open in maps ↗</a>
          </div>
        </div>
        <?php if (trim((string) ($site['addressSource'] ?? '')) !== ''): ?>
          <div class="address-source" id="addressSource">Address source: <?= e((string) $site['addressSource']) ?></div>
        <?php endif; ?>
      <?php endif; ?>
    </div>
  </div>
</section>
