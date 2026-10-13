<?php
/**
 * The home page — the club's own words and pictures, laid out in the design
 * the club chose: an airy letter-spaced opening, the rings that close in as
 * you scroll, the four steps, the wide feature lines, the member and campus
 * splits, the club's name running down the page, then the events, the album,
 * the story, the team and the two forms.
 *
 * Everything here is written by PHP from the club's content, so the dashboard
 * changes it all without touching this file.
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
$clubName   = (string) ($site['clubName'] ?? 'Mindful Tattva');
$university = (string) ($site['universityName'] ?? '');
$department = (string) ($site['department'] ?? '');

/* Pictures for the two big splits. The club's own album comes first; when the
   album is still empty the campus picture stands in, so the page is never
   left with a hole in it. */
$stackPhotos = [];
foreach ($gallerySlides as $slide) {
    if (count($stackPhotos) >= 3) break;
    $src = mt_safe_image($slide['image'] ?? ($slide['src'] ?? ''));
    if ($src !== '') $stackPhotos[] = ['src' => $src, 'caption' => (string) ($slide['caption'] ?? '')];
}
foreach ([['/assets/photos/campus.jpg', 'Our campus'], ['/assets/photos/mt-club-logo.jpg', $clubName]] as [$fallback, $caption]) {
    if (count($stackPhotos) >= 3) break;
    $stackPhotos[] = ['src' => $fallback, 'caption' => $caption];
}
$stackPhoto = static fn(int $index): array => $stackPhotos[$index] ?? $stackPhotos[0];

/* The club's name, letter-spaced, for the bands that carry it down the page. */
$nameRun = [];
for ($copy = 0; $copy < 6; $copy++) $nameRun[] = $clubName;
$clubWords = ['mind', 'body', 'connection', 'curiosity', 'growth', 'community', 'kindness', 'a pause'];
?>
<section class="hero" id="top-section">
  <div class="hero-veil" aria-hidden="true"></div>
  <i class="hero-comet" aria-hidden="true"></i>
  <div class="container hero-grid">
    <div class="fade-in">
      <div class="eyebrow" id="heroEyebrow"><?= e((string) ($site['eyebrow'] ?? '')) ?></div>
      <h1 class="display-air" id="heroTagline"><?= e($clubName) ?></h1>
      <p class="display" style="margin:22px 0 20px;font-size:clamp(1.5rem,3.4vw,2.7rem);max-width:22ch"><?= mt_emphasise((string) ($site['tagline'] ?? '')) ?></p>
      <p class="hero-copy" id="heroIntro"><?= e((string) ($site['intro'] ?? '')) ?></p>
      <div class="hero-actions">
        <a class="solid-button" href="#events">Explore the club <span>↘</span></a>
        <a class="outline-button" href="#join">Join <?= e($clubName) ?></a>
      </div>
      <div class="hero-meta">
        <div><strong id="heroUniversity"><?= e($university) ?></strong><span id="heroDepartment"><?= e($department) ?></span></div>
        <div><strong>Student-led</strong><span>curiosity, care and community</span></div>
      </div>
    </div>
    <div class="hero-art fade-in" aria-label="Abstract Mindful Tattva artwork">
      <div class="art-card">
        <div class="art-sun"></div>
        <div class="art-orbit"></div>
        <div class="art-copy"><small>mind · body · connection</small><strong>pause<br>and notice.</strong></div>
      </div>
      <div class="art-note">You are allowed to take up space.</div>
      <div class="art-sticker">come as<br>you are</div>
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
?>
<div class="values-marquee mq-band" aria-hidden="true">
  <div class="values-track">
    <?php for ($copy = 0; $copy < 4; $copy++): ?>
      <div class="values-run">
        <?php foreach ($clubWords as $word): ?><span><?= e($word) ?></span><i>✦</i><?php endforeach; ?>
      </div>
    <?php endfor; ?>
  </div>
</div>

<?php /* The rings: they begin far apart and come closer as the section crosses
         the window, the club's name and the psi steady in the middle. */ ?>
<section class="ring-stage" id="psychology" aria-label="The psychology lens">
  <span class="ring ring-1" aria-hidden="true"></span>
  <span class="ring ring-2" aria-hidden="true"></span>
  <span class="ring ring-3" aria-hidden="true"></span>
  <span class="ring ring-4" aria-hidden="true"></span>
  <div class="ring-core">
    <span class="psi" aria-hidden="true">Ψ</span>
    <span class="air-line">the psychology lens</span>
    <h2 class="reveal-words">A club for the lives we are actually living.</h2>
    <p>Psychology is not only something we study. It is how we notice our thoughts, hold space for another person, move through change and build a life that feels more like our own.</p>
  </div>
</section>

<section class="section" id="about">
  <div class="container about-grid">
    <div class="about-note">
      <div class="mini-mark">✦</div>
      <p><?= e($clubName) ?> is the psychology club under the <strong id="aboutDepartment"><?= e($department) ?></strong> at <strong id="aboutUniversity"><?= e($university) ?></strong>.</p>
      <?php if ($address !== ''): ?>
        <a class="about-address" id="aboutAddress" href="<?= e($mapUrl) ?>" target="_blank" rel="noreferrer"><?= e($address) ?> ↗</a>
      <?php endif; ?>
    </div>
    <div class="about-copy">
      <div class="eyebrow">A little about us</div>
      <h3 id="aboutHeading" class="reveal-words"><?= e((string) ($site['aboutHeading'] ?? '')) ?></h3>
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

<?php /* How the club works — four numbered cards, the way the design the club
         chose opens its "how it works" section. */ ?>
<section class="section section-tint" id="how">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">How the club works</div><h2 class="display">Four small habits, one steadier mind.</h2></div>
      <p>A circle is only as good as the attention in the room. These are the four things every Mindful Tattva gathering is built around.</p>
    </div>
    <ol class="step-list">
      <li>
        <span class="step-number">01</span>
        <div class="step-icon">◌</div>
        <h3>Notice</h3>
        <p>Pause long enough to meet your inner world with a little more honesty and kindness.</p>
      </li>
      <li>
        <span class="step-number">02</span>
        <div class="step-icon">◒</div>
        <h3>Connect</h3>
        <p>Turn conversations into bridges — between ideas, people and the many parts of ourselves.</p>
      </li>
      <li>
        <span class="step-number">03</span>
        <div class="step-icon">✦</div>
        <h3>Grow</h3>
        <p>Carry what you learn into everyday choices, relationships and the campus community.</p>
      </li>
      <li>
        <span class="step-number">04</span>
        <div class="step-icon">◎</div>
        <h3>Belong</h3>
        <p>Find the people who think about the mind the way you do — and keep showing up for them.</p>
      </li>
    </ol>
  </div>
</section>

<section class="section" id="details">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">More than a club</div><h2 class="display reveal-words">A place to learn, listen and leave a little more grounded.</h2></div>
      <p id="clubDescription"><?= e((string) ($site['clubDescription'] ?? '')) ?></p>
    </div>
    <div class="feature-stack">
      <div class="feature-block">
        <span class="feature-icon" aria-hidden="true">Ψ</span>
        <h3>The lens</h3>
        <p>Everyday life, looked at through psychology — attention, emotion, relationships, change.</p>
      </div>
      <div class="feature-block">
        <span class="feature-icon" aria-hidden="true">✎</span>
        <h3>Workshops &amp; hands-on sessions</h3>
        <p>Short, practical sessions led by students, for students, with something to take home.</p>
      </div>
      <div class="feature-block">
        <span class="feature-icon" aria-hidden="true">◍</span>
        <h3>Discussion circles &amp; peer learning</h3>
        <p>A room where a question is welcome before an answer is, and nobody has to perform.</p>
      </div>
      <div class="feature-block">
        <span class="feature-icon" aria-hidden="true">❖</span>
        <h3>Awareness &amp; community initiatives</h3>
        <p>Taking mental wellbeing out of the club room and into the rest of the campus.</p>
      </div>
    </div>
  </div>
</section>

<?php /* The two big splits: one for the members, one for the campus. The club's
         own words on the left, its own pictures on the right. */ ?>
<section class="section section-tint" id="members">
  <div class="container split-section">
    <div class="split-copy">
      <div class="split-label">For members</div>
      <h2 class="reveal-words">Find your place in the circle.</h2>
      <p id="benefitsText"><?= e((string) ($site['memberBenefits'] ?? '')) ?></p>
      <p id="memberVision" class="muted"><?= e((string) ($site['memberVision'] ?? '')) ?></p>
      <div class="btn-row" style="margin-top:24px">
        <a class="solid-button" href="#join">Join the club <span>↘</span></a>
        <a class="outline-button" href="/members">Meet the members</a>
      </div>
    </div>
    <div class="device-stack">
      <figure class="stack-item tall" style="margin:0">
        <img src="<?= e($stackPhoto(0)['src']) ?>" alt="<?= e($stackPhoto(0)['caption'] ?: $clubName . ' members') ?>" loading="lazy" decoding="async">
      </figure>
      <div class="stack-note">student-led · always</div>
    </div>
  </div>
</section>

<section class="section" id="campus">
  <div class="container split-section is-flipped">
    <div class="split-copy">
      <div class="split-label">For the campus</div>
      <h2 class="reveal-words">Psychology, out of the textbook.</h2>
      <p id="missionText"><?= e((string) ($site['mission'] ?? '')) ?></p>
      <p id="visionText"><?= e((string) ($site['vision'] ?? '')) ?></p>
      <div class="btn-row" style="margin-top:24px">
        <a class="outline-button" href="#contact">Work with us</a>
        <a class="outline-button" href="/calendar">See the year ahead</a>
      </div>
    </div>
    <div class="device-stack">
      <figure class="stack-item wide" style="margin:0">
        <img src="<?= e($stackPhoto(1)['src']) ?>" alt="<?= e($stackPhoto(1)['caption'] ?: $university) ?>" loading="lazy" decoding="async">
      </figure>
      <figure class="stack-item small" style="margin:0">
        <img src="<?= e($stackPhoto(2)['src']) ?>" alt="<?= e($stackPhoto(2)['caption'] ?: $university) ?>" loading="lazy" decoding="async">
      </figure>
      <div class="stack-note"><?= e($department ?: 'our department') ?></div>
    </div>
  </div>
</section>

<div class="logo-medallion" aria-hidden="true">
  <img src="<?= e(mt_safe_image($site['logoImage'] ?? '') ?: '/assets/photos/mt-club-logo.jpg') ?>" alt="" loading="lazy" decoding="async">
  <span><?= e($clubName) ?></span>
</div>

<?php /* The club's name running down the page: three columns, the middle one
         slower and in the club's gold, the outer two plain. Decoration only. */ ?>
<div class="name-runner" aria-hidden="true">
  <div class="name-column">
    <div class="name-track">
      <?php foreach ($nameRun as $run): ?><span><?= e($run) ?></span><?php endforeach; ?>
      <?php foreach ($nameRun as $run): ?><span><?= e($run) ?></span><?php endforeach; ?>
    </div>
  </div>
  <div class="name-column mid big up">
    <div class="name-track">
      <?php foreach ($nameRun as $run): ?><span><?= e($run) ?></span><?php endforeach; ?>
      <?php foreach ($nameRun as $run): ?><span><?= e($run) ?></span><?php endforeach; ?>
    </div>
  </div>
  <div class="name-column">
    <div class="name-track">
      <?php foreach ($nameRun as $run): ?><span><?= e($run) ?></span><?php endforeach; ?>
      <?php foreach ($nameRun as $run): ?><span><?= e($run) ?></span><?php endforeach; ?>
    </div>
  </div>
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

<section class="section" id="activities">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">The year ahead</div><h2 class="display">Keep the next thread in view.</h2></div>
      <p>See every month, scheduled activity and live event detail on the dedicated yearly activities page.<br><a class="event-link" href="/calendar">View full yearly activities ↗</a></p>
    </div>
    <div class="calendar-teaser">
      <div>
        <div class="eyebrow">A compact preview</div>
        <h3 style="margin:8px 0 6px;font-family:var(--font-display);font-size:clamp(1.5rem,3vw,2.3rem);font-weight:400">Twelve months, one calm place.</h3>
        <p style="margin:0;font-size:.8rem">Upcoming dates, times and details — without taking over the homepage.</p>
      </div>
      <a class="solid-button" href="/calendar" style="flex:0 0 auto">View full calendar ↗</a>
    </div>
  </div>
</section>

<section class="section section-tint" id="gallery">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">Event gallery</div><h2 class="display"><?= e((string) ($site['galleryHeading'] ?? 'Small moments. Big meaning.')) ?></h2></div>
      <p><?= e((string) ($site['galleryIntro'] ?? 'Photos from your events will turn this space into a living scrapbook of the club.')) ?><br><a class="event-link" href="/gallery">Open the full gallery ↗</a></p>
    </div>
    <?= mt_gallery_stage($gallerySlides, 'Mindful Tattva gallery', 'stage-feature') ?>
    <?php if (count($gallery) > 1): ?>
      <div class="gallery-grid" id="galleryGrid" style="margin-top:18px">
        <?php foreach ($gallery as $item): ?>
          <?= mt_gallery_item($item) ?>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</section>

<?= mt_photo_frame() ?>
<?= mt_gallery_data($gallerySlides) ?>

<section class="section" id="history">
  <div class="container history-wrap">
    <div class="history-intro">
      <div class="eyebrow">Our story</div>
      <h2 class="display reveal-words">Every meaningful space begins with a first step.</h2>
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

<section class="section" id="join">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">Your next step</div><h2 class="display reveal-words">Join the club, start the conversation.</h2></div>
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
                  <span class="register-fee"><?= e(mt_event_fee($open) > 0 ? mt_money(mt_event_fee($open)) . ' · UPI payment' : 'Free entry') ?></span>
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

<section class="section section-plum" id="contact">
  <div class="container contact-grid">
    <div class="contact-copy">
      <div class="eyebrow">Stay in the loop</div>
      <h2 class="display reveal-words">Let’s keep the conversation going.</h2>
      <p id="contactNote"><?= e((string) ($site['contactNote'] ?? '')) ?></p>
    </div>
    <div class="contact-card">
      <div class="contact-row university-contact-row">
        <div class="contact-icon">⌘</div>
        <img class="contact-seal" src="/assets/img/university-logo.png" alt="<?= e($university) ?> logo" loading="lazy" decoding="async">
        <div>
          <small>Our institution</small>
          <strong class="contact-university-name" id="contactUniversityName"><?= e($university) ?></strong>
          <span id="contactDepartmentName"><?= e($department) ?> · Psychology Club</span>
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

<?php /* The last invitation, the way the design the club chose ends: one big
         centred panel with the two rings behind it. */ ?>
<section class="section" id="next">
  <div class="container">
    <div class="cta-panel">
      <span class="cta-halo" aria-hidden="true"></span>
      <span class="cta-halo h2" aria-hidden="true"></span>
      <div class="eyebrow">Your next circle</div>
      <h2 class="reveal-words">Come as you are. Leave a little steadier.</h2>
      <p><?= e((string) ($site['joiningIntro'] ?? '')) ?></p>
      <div class="btn-row">
        <a class="solid-button" href="#join">Join <?= e($clubName) ?> <span>↘</span></a>
        <a class="outline-button" href="/gallery">See the album</a>
      </div>
    </div>
  </div>
</section>
