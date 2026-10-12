const $ = (selector) => document.querySelector(selector);

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const safeUrl = (value = '') => {
  const url = String(value).trim();
  if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) return url;
  return '#';
};

const safeImage = (value = '') => {
  const url = String(value).trim();
  if (/^data:image\//i.test(url) || /^https?:\/\//i.test(url) || /^\/assets\/[\w./-]+$/i.test(url)) return url;
  return '';
};
const safeAttachment = (value = '') => {
  const url = String(value).trim();
  if (/^data:application\/pdf(?:;[^,]*)?,/i.test(url) || /^https?:\/\//i.test(url) || /^\/assets\/[\w./-]+\.pdf(?:$|[?#])/i.test(url)) return url;
  return '';
};

const initials = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'MT';

function setText(selector, value) { const el = $(selector); if (el) el.textContent = value || ''; }

function renderSite(data) {
  const site = data.site || {};
  document.title = `${site.clubName || 'Mindful Tattva'} · Psychology Club`;
  setText('#announcement', site.announcement);
  setText('#brandName', site.clubName);
  setText('#footerName', site.clubName);
  const markText = site.shortName || initials(site.clubName);
  for (const selector of ['#brandMark', '#footerMark']) {
    const mark = $(selector);
    if (!mark) continue;
    if (safeImage(site.logoImage)) {
      const logo = mark.querySelector('img');
      if (logo && !/^\/assets\//i.test(safeImage(site.logoImage))) {
        logo.src = safeImage(site.logoImage);
        logo.alt = `${site.clubName || 'Mindful Tattva'} logo`;
      } else if (!logo) {
        mark.textContent = '';
        mark.style.backgroundImage = `url('${safeImage(site.logoImage).replaceAll("'", '%27')}')`;
        mark.style.backgroundSize = 'contain';
        mark.style.backgroundPosition = 'center';
        mark.style.backgroundRepeat = 'no-repeat';
      }
      mark.style.backgroundColor = 'transparent';
      mark.style.boxShadow = 'none';
    } else if (!mark.querySelector('img')) {
      mark.textContent = markText;
      mark.style.backgroundImage = '';
      mark.style.backgroundSize = '';
      mark.style.backgroundPosition = '';
      mark.style.backgroundRepeat = '';
      mark.style.backgroundColor = '';
      mark.style.boxShadow = '';
    }
  }
  setText('#heroEyebrow', site.eyebrow);
  const tagline = esc(site.tagline || '').replace(/\b(understand|mind|mindful|notice|space)\b/i, '<em>$&</em>');
  $('#heroTagline').innerHTML = tagline;
  setText('#heroIntro', site.intro);
  setText('#heroUniversity', site.universityName);
  setText('#heroDepartment', site.department);
  setText('#aboutDepartment', site.department);
  setText('#aboutUniversity', site.universityName);
  setText('#contactUniversityName', site.universityName);
  setText('#contactDepartmentName', `${site.department || ''} · Psychology Club`);
  setText('#aboutHeading', site.aboutHeading);
  setText('#aboutBody', site.aboutBody);
  setText('#clubDescription', site.clubDescription);
  setText('#missionText', site.mission);
  setText('#visionText', site.vision);
  setText('#benefitsText', site.memberBenefits);
  setText('#joiningIntro', site.joiningIntro);
  setText('#registrationIntro', site.registrationIntro);
  setText('#contactNote', site.contactNote);

  const instagramUrl = safeUrl(site.instagramUrl);
  const instagramText = site.instagramHandle || 'Instagram';
  for (const element of ['#instagramNav', '#instagramContact']) {
    const el = $(element);
    if (el) { el.href = instagramUrl; el.textContent = instagramText; }
  }
  const email = site.email || '';
  const emailEl = $('#emailContact');
  if (emailEl) { emailEl.href = email ? `mailto:${email}` : '#'; emailEl.textContent = email || 'Add club email'; }
  const phone = site.clubPhone || '';
  const phoneEl = $('#phoneContact');
  if (phoneEl) { phoneEl.href = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '#'; phoneEl.textContent = phone || 'Add club phone'; }
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address || site.universityName || '')}`;
  const aboutAddress = $('#aboutAddress');
  if (aboutAddress) { aboutAddress.href = mapUrl; aboutAddress.textContent = site.address ? `${site.address} ↗` : 'Add university address ↗'; }
  const address = $('#addressContact');
  if (address) { address.href = mapUrl; address.textContent = site.address || 'Add university address'; }
  const map = $('#addressMap');
  if (map) map.href = mapUrl;
  setText('#addressSource', site.addressSource ? `${site.addressSource} · ${site.universityWebsite || ''}` : '');

  $('#statsRow').innerHTML = (site.stats || []).map(stat => `<div class="stat"><strong>${esc(stat.value)}</strong><span>${esc(stat.label)}</span></div>`).join('');
  renderHistory(data.history || []);
  renderEvents(data.events || []);
  renderCalendar(data.events || []);
  renderEventBanner(data.events || []);
  renderGallery(data.gallery || []);
  renderTeam(data.team || []);
  setupScrollEffects();
  setupDepthAtmosphere();
}

function setupDepthAtmosphere() {
  if (window.__mindfulDepthAtmosphere) return;
  window.__mindfulDepthAtmosphere = true;
  const update = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    const opacity = Math.max(0, Math.min(.5, (progress - .08) * .62));
    document.documentElement.style.setProperty('--depth-opacity', opacity.toFixed(3));
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function setupScrollEffects() {
  const targets = document.querySelectorAll('.section, .detail-card, .event-card, .gallery-item, .team-card, .calendar-item');
  if (!('IntersectionObserver' in window)) { targets.forEach(target => target.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
  targets.forEach((target, index) => { if (!target.classList.contains('scroll-reveal')) { target.classList.add('scroll-reveal'); target.style.transitionDelay = `${Math.min(index * 35, 280)}ms`; } observer.observe(target); });
}

function renderHistory(items) {
  const list = $('#historyList');
  if (!list) return;
  list.innerHTML = items.length ? items.map(item => `
    <article class="timeline-item">
      <span class="timeline-dot"></span>
      <div class="timeline-year">${esc(item.year)}</div>
      <div><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></div>
    </article>`).join('') : '<div class="team-empty"><div><strong>The story is just beginning.</strong><p>Add your first milestone from the Content Studio.</p></div></div>';
}

function visualStyle(image) {
  const src = safeImage(image);
  return src ? ` style="background-image:url('${src.replaceAll("'", '%27')}')"` : '';
}

function renderEvents(items) {
  const grid = $('#eventGrid');
  if (!grid) return;
  grid.innerHTML = items.length ? items.map(event => `
    <article class="event-card">
      <div class="card-visual${safeImage(event.image) ? ' has-image' : ''}"${visualStyle(event.image)}><span class="visual-label">${esc(event.kicker || 'Mindful Tattva')}</span></div>
      <div class="event-body">
        <div class="event-date">${esc(event.date || 'Date to be announced')}</div>
        <h3>${esc(event.title)}</h3>
        <p>${esc(event.description)}</p>
        ${event.registrationUrl ? `<a class="event-link" href="${esc(safeUrl(event.registrationUrl))}" target="_blank" rel="noreferrer">View details ↗</a>` : '<span class="event-link">Details coming soon</span>'}
        ${safeAttachment(event.attachment) ? `<a class="event-link" href="${esc(safeAttachment(event.attachment))}" target="_blank" rel="noreferrer">View brochure / poster ↗</a>` : ''}
      </div>
    </article>`).join('') : '<div class="team-empty"><div><strong>No new events are scheduled.</strong><p>Visit the yearly activities page for future Mindful Tattva activities.</p></div></div>';
}

function renderCalendar(items) {
  const grid = $('#calendarGrid');
  if (!grid) return;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const activeItems = items.filter(item => item.title && item.date && !/^add date$/i.test(item.date));
  const monthIndex = value => {
    const parsed = Date.parse(value || '');
    if (!Number.isNaN(parsed)) return new Date(parsed).getMonth();
    const lower = String(value || '').toLowerCase();
    return months.findIndex(month => lower.includes(month.toLowerCase()));
  };
  grid.classList.add('annual-calendar-grid');
  grid.innerHTML = months.map((month, index) => {
    const monthEvents = activeItems.filter(event => monthIndex(event.date) === index);
    return `<article class="annual-month${monthEvents.length ? ' has-events' : ''}"><div class="annual-month-head"><span>${String(index + 1).padStart(2, '0')}</span><h3>${month}</h3></div><div class="annual-month-events">${monthEvents.length ? monthEvents.map(event => `<div class="annual-event"><strong>${esc(event.title)}</strong><span>${esc(event.date)} · ${esc(event.time || 'Time to be announced')}</span><small>⌖ ${esc(event.location || 'Location to be announced')}</small></div>`).join('') : '<span class="annual-empty">No events planned</span>'}</div></article>`;
  }).join('');
}

function renderEventBanner(items) {
  const title = $('#eventBannerTitle');
  const details = $('#eventBannerDetails');
  const pulse = $('.event-banner-pulse');
  const current = items.find(item => item.published === true);
  if (current) {
    if (title) title.textContent = current.title;
    if (details) details.textContent = `${current.date || 'Date to be announced'} · ${current.time || 'Time to be announced'} · ${current.location || 'Location to be announced'}`;
    if (pulse) pulse.style.background = 'var(--sage)';
  } else {
    if (title) title.textContent = 'No new events are scheduled';
    if (details) details.textContent = 'Watch this space for the next Mindful Tattva activity.';
    if (pulse) pulse.style.background = 'var(--terracotta)';
  }
}

function renderGallery(items) {
  const grid = $('#galleryGrid');
  if (!grid) return;
  grid.innerHTML = items.length ? items.map(item => `
    <figure class="gallery-item">
      <div class="gallery-visual${safeImage(item.image) ? ' has-image' : ''}"${visualStyle(item.image)} role="img" aria-label="${esc(item.alt || item.caption || 'Mindful Tattva gallery photo')}">
        ${!safeImage(item.image) ? `<span class="gallery-placeholder">Photo placeholder</span>` : ''}
      </div>
      <figcaption class="gallery-caption">${esc(item.caption)}</figcaption>
    </figure>`).join('') : '<div class="team-empty"><div><strong>Your gallery will live here.</strong><p>Upload event photos from the Content Studio to make this scrapbook yours.</p></div></div>';
}

function renderTeam(items) {
  const grid = $('#teamGrid');
  if (!grid) return;
  const homepageMembers = items.filter(member => member.group === 'management' && member.showOnHome !== false);
  grid.innerHTML = homepageMembers.length ? homepageMembers.map(member => `
    <article class="team-card">
      <div class="team-avatar${safeImage(member.image) ? ' has-image' : ''}"${visualStyle(member.image)}><span>${safeImage(member.image) ? '' : 'MT'}</span></div>
      <h3>${esc(member.name)}</h3>
      <div class="team-role">${esc(member.role || 'Core team')}</div>
      <p class="team-bio">${esc(member.bio || '')}</p>
      ${member.phone ? `<a class="team-phone" href="tel:${esc(member.phone.replace(/[^+\d]/g, ''))}">${esc(member.phone)} ↗</a>` : ''}
    </article>`).join('') : '<div class="team-empty"><div><strong>Core team, coming soon.</strong><p>Choose which Core Committee member photos should appear on the homepage from the Content Studio.</p></div></div>';
}

async function submitClubForm(form) {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  if (status) status.textContent = 'Sending…';
  if (button) button.disabled = true;
  const payload = Object.fromEntries(new FormData(form).entries());
  payload.type = form.dataset.formType || 'membership';
  try {
    const response = await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Please try again');
    form.reset();
    if (status) status.textContent = 'Received — the Mindful Tattva team will get back to you soon ✓';
  } catch (error) {
    if (status) status.textContent = error.message || 'Could not submit right now. Please try again.';
  } finally {
    if (button) button.disabled = false;
  }
}

document.querySelectorAll('.club-form').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  submitClubForm(form);
}));

async function load() {
  try {
    const response = await fetch('/api/site', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load site content');
    renderSite(await response.json());
  } catch (error) {
    console.error(error);
  }
}

$('#menuButton')?.addEventListener('click', () => $('#navLinks')?.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => $('#navLinks')?.classList.remove('open')));
load();

try {
  const stream = new EventSource('/api/stream');
  stream.addEventListener('site-update', event => {
    try { renderSite(JSON.parse(event.data)); } catch (_) {}
  });
} catch (_) {}
