/* ==========================================================================
   Mindful Tattva · club dashboard
   Talks to the PHP JSON API. Nothing here is public-facing.
   ========================================================================== */
(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const esc = (value) => String(value == null ? '' : value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let boot = { authed: false, csrf: '', revision: 0, site: {} };
  try {
    const node = $('#dash-bootstrap');
    if (node) boot = Object.assign(boot, JSON.parse(node.textContent || '{}'));
  } catch (error) { /* fall back to defaults */ }

  const state = {
    csrf: boot.csrf || '',
    site: boot.site || {},
    revision: Number(boot.revision) || 0,
    team: [],
    events: [],
    gallery: [],
    awareness: [],
    submissions: [],
    backups: [],
  };

  /* --------------------------------------------------------------- helpers */
  function toast(message, isError = false) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.toggle('is-error', !!isError);
    el.classList.add('is-shown');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('is-shown'), 3200);
  }

  function imageUrl(value) {
    const url = String(value || '').trim();
    if (!url) return '';
    if (/^data:image\//i.test(url)) return url;
    if (/^https?:\/\//i.test(url)) return url;
    if (/^\/[A-Za-z0-9._/-]*$/.test(url) && !url.includes('..')) return url;
    return '';
  }

  async function api(path, options = {}) {
    const headers = Object.assign({ Accept: 'application/json' }, options.headers || {});
    if (options.body && !(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    if (state.csrf) headers['X-CSRF-Token'] = state.csrf;

    const response = await fetch(path, Object.assign({}, options, { headers }));
    const payload = await response.json().catch(() => ({}));

    if (response.status === 401) {
      showLogin();
      throw new Error('Please sign in again.');
    }
    if (response.status === 419) {
      toast('Your session expired — signing you in again.', true);
      showLogin();
      throw new Error(payload.error || 'Session expired.');
    }
    if (!response.ok) {
      throw new Error(payload.error || 'Something went wrong.');
    }
    if (typeof payload.revision === 'number') updateRevision(payload.revision);
    return payload;
  }

  function updateRevision(revision) {
    state.revision = revision;
    const label = $('#revisionLabel');
    if (label) label.textContent = 'revision ' + revision + ' · live';
  }

  function showLogin() {
    $('#loginView')?.removeAttribute('hidden');
    $('#appView')?.setAttribute('hidden', '');
    state.csrf = '';
  }

  function showApp() {
    $('#loginView')?.setAttribute('hidden', '');
    $('#appView')?.removeAttribute('hidden');
  }

  /* ------------------------------------------------------------- sign in */
  function initLogin() {
    const form = $('#loginForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const error = $('#loginError');
      const button = $('button[type="submit"]', form);
      if (error) error.textContent = '';
      if (button) button.disabled = true;
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: $('#loginPassword').value }),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.authenticated) {
          throw new Error(payload.error || 'That password did not work.');
        }
        state.csrf = payload.csrf || '';
        updateRevision(payload.revision || 0);
        form.reset();
        showApp();
        await loadAll();
        toast('Signed in ✓');
      } catch (error) {
        if (error) error.message = error.message || 'Could not sign in.';
        const box = $('#loginError');
        if (box) box.textContent = error.message;
      } finally {
        if (button) button.disabled = false;
      }
    });
  }

  async function logout() {
    try {
      await api('/api/logout', { method: 'POST', body: JSON.stringify({}) });
    } catch (error) { /* signing out anyway */ }
    state.csrf = '';
    showLogin();
    toast('Signed out');
  }

  /* ----------------------------------------------------------------- data */
  async function loadAll() {
    const [site, team, events, gallery, awareness, submissions, backups] = await Promise.all([
      api('/api/site'),
      api('/api/team'),
      api('/api/events'),
      api('/api/gallery'),
      api('/api/awareness'),
      api('/api/submissions'),
      api('/api/backups').catch(() => ({ items: [] })),
    ]);

    state.site = site.site || {};
    state.team = team.items || [];
    state.events = events.items || [];
    state.gallery = gallery.items || [];
    state.awareness = awareness.items || [];
    state.submissions = submissions.items || [];
    state.backups = backups.items || [];
    updateRevision(site.revision || state.revision);

    renderAll();
  }

  function renderAll() {
    renderCopy();
    renderTeam();
    renderEvents();
    renderGallery();
    renderAwareness();
    renderSubmissions();
    renderBackups();
    renderOverview();
  }

  /* ------------------------------------------------------------ navigation */
  function initNav() {
    const nav = $('#dashNav');
    if (!nav) return;
    nav.addEventListener('click', (event) => {
      const button = event.target.closest('[data-panel]');
      if (!button) return;
      const panel = button.dataset.panel;
      $$('.dash-nav button').forEach((item) => item.classList.toggle('is-active', item === button));
      $$('.panel').forEach((section) => section.classList.toggle('is-active', section.id === 'panel-' + panel));
      const title = $('#panelTitle');
      if (title) title.textContent = button.textContent.trim();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------- overview */
  function renderOverview() {
    const stats = $('#overviewStats');
    if (stats) {
      stats.innerHTML = [
        ['Photo album', state.gallery.length],
        ['Team members', state.team.length],
        ['Events', state.events.length],
        ['Awareness tiles', state.awareness.length],
        ['New registrations', state.submissions.length],
      ].map(([label, value]) => `<div class="stat-card"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('');
    }

    const note = $('#overviewNote');
    if (note) {
      const latest = state.submissions[0];
      note.innerHTML = latest
        ? `<strong>Latest registration:</strong> ${esc(latest.name)} (${esc(latest.email)}) — ${esc(latest.type === 'membership' ? 'membership interest' : 'event registration')} on ${esc(new Date(latest.submittedAt).toLocaleString())}.`
        : '<strong>No registrations yet.</strong> Membership and event forms from the website will appear in the Registrations tab.';
    }

    const recent = $('#overviewRecent');
    if (recent) {
      recent.innerHTML = state.submissions.slice(0, 3).map(submissionCard).join('')
        || '<div class="editor-card"><h3>Getting started</h3><p class="muted" style="font-size:.86rem">Add team members, publish an event, upload a few photos and write your first awareness tile. Every change appears on the website immediately.</p></div>';
    }
  }

  /* ------------------------------------------------------------ site copy */
  const COPY_GROUPS = [
    { id: 'brand', title: 'Brand & hero', fields: [['clubName', 'Club name'], ['shortName', 'Short name (initials)'], ['eyebrow', 'Eyebrow line'], ['tagline', 'Hero headline'], ['intro', 'Hero introduction', 'textarea'], ['announcement', 'Announcement strip']] },
    { id: 'about', title: 'About, mission & vision', fields: [['aboutHeading', 'About heading'], ['aboutBody', 'About paragraph', 'textarea'], ['clubDescription', 'Club description', 'textarea'], ['mission', 'Mission', 'textarea'], ['vision', 'Vision', 'textarea'], ['memberBenefits', 'What members experience', 'textarea']] },
    { id: 'awareness', title: 'Awareness corner', fields: [['awarenessEyebrow', 'Eyebrow'], ['awarenessHeading', 'Heading'], ['awarenessIntro', 'Introduction', 'textarea'], ['awarenessNote', 'Helpline note', 'textarea']] },
    { id: 'gallery', title: 'Photo album copy', fields: [['galleryHeading', 'Album heading'], ['galleryIntro', 'Album note', 'textarea']] },
    { id: 'forms', title: 'Join forms & contact note', fields: [['joiningIntro', 'Membership form note', 'textarea'], ['registrationIntro', 'Registration form note', 'textarea'], ['contactNote', 'Contact section note', 'textarea']] },
    { id: 'contact', title: 'Contact, social & university', fields: [['email', 'Club email'], ['clubPhone', 'Club phone (optional)'], ['instagramHandle', 'Instagram handle'], ['instagramUrl', 'Instagram URL'], ['universityName', 'University name'], ['department', 'Department'], ['address', 'Campus address', 'textarea'], ['universityWebsite', 'University website']] },
  ];

  function renderCopy() {
    const wrap = $('#copyEditors');
    if (!wrap) return;

    wrap.innerHTML = COPY_GROUPS.map((group) => `
      <div class="editor-card" data-copy-group="${group.id}">
        <div class="editor-card-head">
          <span>${esc(group.title)}</span>
          <button class="btn-sm primary" type="button" data-save-copy="${group.id}">Save</button>
        </div>
        <div class="form-grid one">
          ${group.fields.map(([key, label, type]) => `
            <label>${esc(label)}
              ${type === 'textarea'
                ? `<textarea data-copy-field="${key}" rows="3">${esc(state.site[key] || '')}</textarea>`
                : `<input data-copy-field="${key}" value="${esc(state.site[key] || '')}">`}
            </label>`).join('')}
        </div>
      </div>`).join('') + `
      <div class="editor-card" data-copy-group="brand-media">
        <div class="editor-card-head">
          <span>Logo & hero stats</span>
          <button class="btn-sm primary" type="button" data-save-copy="brand-media">Save</button>
        </div>
        <div class="upload-row">
          <div class="thumb ${imageUrl(state.site.logoImage) ? 'has-image' : ''}" data-thumb-for="logoImage"
               style="${imageUrl(state.site.logoImage) ? `background-image:url('${imageUrl(state.site.logoImage)}')` : ''}">
            ${imageUrl(state.site.logoImage) ? '' : 'logo'}
          </div>
          <input type="file" accept="image/png,image/jpeg,image/webp" data-upload-field="logoImage" aria-label="Upload club logo">
          <input class="url-input" data-copy-field="logoImage" value="${esc(state.site.logoImage || '')}" placeholder="…or paste an image URL">
        </div>
        <div class="form-grid one">
          ${[0, 1, 2].map((index) => {
            const stat = (state.site.stats || [])[index] || { value: '', label: '' };
            return `
              <div class="form-grid">
                <label>Stat ${index + 1} number<input data-stat-index="${index}" data-stat-field="value" value="${esc(stat.value)}" placeholder="01"></label>
                <label>Stat ${index + 1} label<input data-stat-index="${index}" data-stat-field="label" value="${esc(stat.label)}" placeholder="shared space"></label>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }

  function collectCopy(groupId) {
    const patch = {};
    const groups = groupId === 'all' || groupId === 'brand-media'
      ? $$('[data-copy-group]')
      : $$(`[data-copy-group="${groupId}"]`);

    groups.forEach((group) => {
      $$('[data-copy-field]', group).forEach((field) => {
        patch[field.dataset.copyField] = field.value;
      });
    });

    const stats = [];
    $$('[data-stat-index]').forEach((field) => {
      const index = Number(field.dataset.statIndex);
      stats[index] = stats[index] || { value: '', label: '' };
      stats[index][field.dataset.statField] = field.value;
    });
    if (stats.length && (groupId === 'all' || groupId === 'brand-media')) {
      patch.stats = stats.filter(Boolean);
    }
    return patch;
  }

  async function saveCopy(groupId) {
    const patch = collectCopy(groupId);
    if (!Object.keys(patch).length) return;
    try {
      const result = await api('/api/site', { method: 'PUT', body: JSON.stringify(patch) });
      state.site = result.site || state.site;
      toast('Saved ✓ the website is updated');
    } catch (error) {
      toast(error.message, true);
    }
  }

  /* ------------------------------------------------------- generic editors */
  function sorted(items) {
    return items.slice().sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  }

  function uploadField(key, label, value) {
    const url = imageUrl(value);
    return `
      <div class="upload-row span-2">
        <div class="thumb ${url ? 'has-image' : ''}" data-thumb-for="${key}"
             style="${url ? `background-image:url('${url}')` : ''}">${url ? '' : 'photo'}</div>
        <input type="file" accept="image/png,image/jpeg,image/webp" data-upload-field="${key}" aria-label="Upload ${esc(label)}">
        <input class="url-input" data-field="${key}" value="${esc(value || '')}" placeholder="…or paste an image URL">
      </div>`;
  }

  function cardShell(type, id, label, index, body) {
    return `
      <article class="editor-card" data-type="${type}" data-id="${esc(id)}">
        <div class="editor-card-head">
          <span>${esc(label)} ${String(index + 1).padStart(2, '0')}</span>
          <div class="row-actions">
            <button class="btn-sm primary" type="button" data-save-item>Save</button>
            <button class="btn-sm danger" type="button" data-delete-item>Delete</button>
          </div>
        </div>
        ${body}
      </article>`;
  }

  function renderTeam() {
    const wrap = $('#teamEditors');
    if (!wrap) return;
    wrap.innerHTML = sorted(state.team).map((item, index) => cardShell('team', item.id, 'Member', index, `
      <div class="form-grid">
        <label>Name<input data-field="name" value="${esc(item.name)}" placeholder="Member name"></label>
        <label>Role<input data-field="role" value="${esc(item.role)}" placeholder="President · Core team"></label>
        <label>Group
          <select data-field="group">
            <option value="management" ${item.group === 'management' ? 'selected' : ''}>Core Committee</option>
            <option value="heads" ${item.group === 'heads' ? 'selected' : ''}>Head Committee</option>
            <option value="volunteers" ${item.group === 'volunteers' ? 'selected' : ''}>Volunteers</option>
          </select>
        </label>
        <label>Phone<input data-field="phone" value="${esc(item.phone)}" placeholder="+91 …"></label>
        <label>Email (optional)<input data-field="email" value="${esc(item.email || '')}" placeholder="name@csmu.ac.in"></label>
        <label>Display order<input data-field="order" type="number" value="${esc(item.order ?? 0)}"></label>
        <label class="span-2">Short bio<textarea data-field="bio" rows="3">${esc(item.bio)}</textarea></label>
        <label class="span-2"><span><input type="checkbox" data-field="showOnHome" ${item.showOnHome !== false ? 'checked' : ''}> Show on the home page</span></label>
      </div>
      ${uploadField('image', 'member photo', item.image)}`)).join('')
      || '<div class="editor-card"><h3>No members yet.</h3><p class="muted">Use “+ Add member” to create the first profile.</p></div>';
  }

  function eventParts(item = {}) {
    const raw = String(item.date || '');
    const match = raw.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)(?:\s+(\d{4}))?/i);
    const parsedMonth = months.findIndex((month) => raw.toLowerCase().includes(month.toLowerCase()));
    return {
      month: parsedMonth >= 0 ? String(parsedMonth) : '',
      day: match ? match[1] : '',
      year: match && match[3] ? match[3] : '',
    };
  }

  function renderEvents() {
    const wrap = $('#eventEditors');
    if (!wrap) return;
    wrap.innerHTML = sorted(state.events).map((item, index) => {
      const parts = eventParts(item);
      return cardShell('events', item.id, 'Event', index, `
        <div class="form-grid">
          <label class="span-2">Title<input data-field="title" value="${esc(item.title)}" placeholder="Workshop title"></label>
          <label>Month
            <select data-field="month">
              ${months.map((month, i) => `<option value="${i}" ${String(parts.month) === String(i) ? 'selected' : ''}>${month}</option>`).join('')}
            </select>
          </label>
          <label>Day<input data-field="day" value="${esc(parts.day)}" placeholder="24" inputmode="numeric"></label>
          <label>Year<input data-field="year" value="${esc(parts.year)}" placeholder="2026" inputmode="numeric"></label>
          <label>Time<input data-field="time" value="${esc(item.time)}" placeholder="4:00 PM"></label>
          <label>Location<input data-field="location" value="${esc(item.location)}" placeholder="CSMU campus · Seminar Hall"></label>
          <label>Label<input data-field="kicker" value="${esc(item.kicker)}" placeholder="Workshop"></label>
          <label class="span-2">Description<textarea data-field="description" rows="3">${esc(item.description)}</textarea></label>
          <label class="span-2">External registration link (optional)<input data-field="registrationUrl" value="${esc(item.registrationUrl)}" placeholder="https://…"></label>
          <label class="span-2"><span><input type="checkbox" data-field="published" ${item.published === true ? 'checked' : ''}> Publish on the home page banner</span></label>
        </div>
        ${uploadField('image', 'event photo', item.image)}`);
    }).join('') || '<div class="editor-card"><h3>No events yet.</h3><p class="muted">Use “+ Add event” to plan the next activity.</p></div>';
  }

  function renderGallery() {
    const wrap = $('#galleryEditors');
    if (!wrap) return;
    wrap.innerHTML = sorted(state.gallery).map((item, index) => cardShell('gallery', item.id, 'Photo', index, `
      <div class="form-grid one">
        <label>Caption <span class="muted" style="font-weight:400">(leave empty to show the photo with no caption)</span>
          <input data-field="caption" value="${esc(item.caption)}" placeholder="Optional — what is this photo about?">
        </label>
        <label>Album label <span class="muted" style="font-weight:400">(groups photos on the gallery page)</span>
          <input data-field="event" value="${esc(item.event || '')}" placeholder="e.g. Welcome Circle">
        </label>
        <div class="form-grid">
          <label>Date (optional)<input data-field="date" value="${esc(item.date || '')}" placeholder="24 October 2026"></label>
          <label>Display order<input data-field="order" type="number" value="${esc(item.order ?? 0)}"></label>
        </div>
        <label>Alt text for screen readers<input data-field="alt" value="${esc(item.alt)}" placeholder="Describe the photo briefly"></label>
      </div>
      ${uploadField('image', 'photo', item.image)}`)).join('')
      || '<div class="editor-card"><h3>No photos yet.</h3><p class="muted">Use “+ Add photo” and upload the first picture — the album fills itself.</p></div>';
  }

  function renderAwareness() {
    const wrap = $('#awarenessEditors');
    if (!wrap) return;
    wrap.innerHTML = sorted(state.awareness).map((item, index) => cardShell('awareness', item.id, 'Tile', index, `
      <div class="form-grid">
        <label>Eyebrow<input data-field="eyebrow" value="${esc(item.eyebrow)}" placeholder="Everyday truth · 01"></label>
        <label>Display order<input data-field="order" type="number" value="${esc(item.order ?? 0)}"></label>
        <label class="span-2">Title<input data-field="title" value="${esc(item.title)}" placeholder="A short, honest headline"></label>
        <label class="span-2">One-line fact or number<input data-field="stat" value="${esc(item.stat)}" placeholder="About 1 in 7 young people…"></label>
        <label class="span-2">Source (optional)<input data-field="source" value="${esc(item.source)}" placeholder="WHO / UNICEF"></label>
        <label class="span-2">Full note<textarea data-field="body" rows="4">${esc(item.body)}</textarea></label>
        <label class="span-2">Takeaway line<textarea data-field="takeaway" rows="2">${esc(item.takeaway)}</textarea></label>
      </div>
      ${uploadField('image', 'tile illustration', item.image)}`)).join('')
      || '<div class="editor-card"><h3>No awareness tiles yet.</h3><p class="muted">Add a tile to start the awareness corner.</p></div>';
  }

  /* -------------------------------------------------- item save and delete */
  function readItem(card) {
    const type = card.dataset.type;
    const body = {};
    $$('[data-field]', card).forEach((field) => {
      body[field.dataset.field] = field.type === 'checkbox' ? field.checked : field.value;
    });

    if (type === 'events') {
      const month = Number(body.month);
      const name = months[month];
      if (name) {
        body.date = [String(body.day || '').trim(), name, String(body.year || '').trim()].filter(Boolean).join(' ');
      }
    }
    delete body.month;
    delete body.day;
    delete body.year;
    return body;
  }

  async function saveItem(card) {
    if (!card) return;
    const type = card.dataset.type;
    const id = card.dataset.id;
    const body = readItem(card);
    try {
      const result = await api(`/api/${type}/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(body) });
      const list = state[type] || [];
      const index = list.findIndex((item) => item.id === id);
      if (index >= 0 && result.item) list[index] = result.item;
      toast('Saved ✓ and live on the website');
      renderAll();
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function deleteItem(card) {
    if (!card) return;
    const type = card.dataset.type;
    const id = card.dataset.id;
    if (!window.confirm('Delete this item? This cannot be undone (a backup is kept in Backups & settings).')) return;
    try {
      await api(`/api/${type}/${encodeURIComponent(id)}`, { method: 'DELETE' });
      state[type] = (state[type] || []).filter((item) => item.id !== id);
      toast('Deleted');
      renderAll();
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function addItem(type) {
    const defaults = {
      team: { name: 'New member', role: 'Core team', group: 'management', phone: '', bio: '', image: '', showOnHome: true, order: (state.team.length + 1) * 10 },
      events: { title: 'New activity', month: '', day: '', year: '', time: 'Time to be announced', location: 'CSMU campus', kicker: 'Mindful Tattva', description: '', image: '', published: false, order: (state.events.length + 1) * 10 },
      gallery: { caption: '', alt: '', event: '', date: '', image: '', order: (state.gallery.length + 1) * 10 },
      awareness: { eyebrow: 'Everyday truth', title: 'New awareness tile', stat: '', source: '', body: '', takeaway: '', image: '', order: (state.awareness.length + 1) * 10 },
    };
    try {
      await api(`/api/${type}`, { method: 'POST', body: JSON.stringify(defaults[type]) });
      toast('Added — now fill in the details and press Save');
      const fresh = await api(`/api/${type}`);
      state[type] = fresh.items || [];
      renderAll();
    } catch (error) {
      toast(error.message, true);
    }
  }

  /* --------------------------------------------------------------- uploads */
  async function uploadFile(input, key) {
    const file = input.files && input.files[0];
    if (!file) return;
    const card = input.closest('.editor-card') || $('#copyEditors');
    try {
      toast('Uploading…');
      const form = new FormData();
      form.append('file', file);
      form.append('kind', 'image');
      const result = await api('/api/upload', { method: 'POST', body: form });
      const field = card ? $(`[data-field="${key}"]`, card) : null;
      if (field) field.value = result.url;
      const thumb = card ? $(`[data-thumb-for="${key}"]`, card) : null;
      if (thumb) {
        thumb.classList.add('has-image');
        thumb.style.backgroundImage = `url('${result.url}')`;
        thumb.textContent = '';
      }
      toast('Photo uploaded ✓ press Save to publish it');
    } catch (error) {
      toast(error.message, true);
    } finally {
      input.value = '';
    }
  }

  /* ----------------------------------------------------------- submissions */
  function submissionCard(item) {
    const when = item.submittedAt ? new Date(item.submittedAt).toLocaleString() : '';
    const rows = [
      ['Email', item.email],
      ['Phone', item.phone],
      ['Course', item.course],
      ['Year', item.year],
      ['Event', item.event],
      ['Interests', item.interests],
      ['Message', item.message],
    ].filter(([, value]) => String(value || '').trim() !== '');

    return `
      <article class="submission" data-submission="${esc(item.id)}">
        <div class="submission-head">
          <div>
            <strong>${esc(item.name)}</strong>
            <div class="muted" style="font-size:.8rem">${esc(when)}</div>
          </div>
          <div class="row-actions">
            <span class="tag ${item.type === 'membership' ? 'membership' : ''}">${esc(item.type === 'membership' ? 'Membership' : 'Event registration')}</span>
            <button class="btn-sm danger" type="button" data-delete-submission>Delete</button>
          </div>
        </div>
        <dl>
          ${rows.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}
        </dl>
        <div class="links">
          <a href="mailto:${esc(item.email)}">Reply by email ↗</a>
          ${item.phone ? `<a href="tel:${esc(String(item.phone).replace(/[^+\d]/g, ''))}">Call ${esc(item.phone)} ↗</a>` : ''}
        </div>
      </article>`;
  }

  function renderSubmissions() {
    const list = $('#submissionList');
    if (!list) return;
    list.innerHTML = state.submissions.length
      ? state.submissions.map(submissionCard).join('')
      : '<div class="editor-card"><h3>Inbox is empty.</h3><p class="muted">New membership and registration forms will land here automatically.</p></div>';
  }

  function exportCsv() {
    if (!state.submissions.length) {
      toast('There is nothing to export yet.');
      return;
    }
    const columns = ['submittedAt', 'type', 'name', 'email', 'phone', 'course', 'year', 'event', 'interests', 'message'];
    const cell = (value) => '"' + String(value == null ? '' : value).replaceAll('"', '""') + '"';
    const csv = [columns.join(',')].concat(
      state.submissions.map((item) => columns.map((column) => cell(item[column])).join(','))
    ).join('\r\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mindful-tattva-registrations.csv';
    link.click();
    URL.revokeObjectURL(link.href);
    toast('CSV downloaded');
  }

  async function clearInbox() {
    if (!state.submissions.length) return;
    if (!window.confirm('Delete every registration in the inbox? Download a CSV first if you need a copy.')) return;
    try {
      await api('/api/submissions', { method: 'DELETE' });
      state.submissions = [];
      renderAll();
      toast('Inbox cleared');
    } catch (error) {
      toast(error.message, true);
    }
  }

  /* --------------------------------------------------------------- backups */
  function renderBackups() {
    const list = $('#backupList');
    if (!list) return;
    list.innerHTML = state.backups.length
      ? state.backups.slice(0, 12).map((backup) => `
        <div class="backup-row">
          <span>${esc(backup.taken)} · ${Math.round(Number(backup.bytes) / 1024)} KB</span>
          <button class="btn-sm" type="button" data-restore="${esc(backup.name)}">Restore</button>
        </div>`).join('')
      : '<p class="muted" style="font-size:.86rem">No backups yet — one is created automatically on every save.</p>';
  }

  async function restore(name) {
    if (!window.confirm('Replace the current website content with this backup?')) return;
    try {
      await api('/api/backups/restore', { method: 'POST', body: JSON.stringify({ name }) });
      await loadAll();
      toast('Backup restored ✓');
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function importFile() {
    const input = $('#importFile');
    const file = input && input.files && input.files[0];
    if (!file) {
      toast('Choose a backup file first.', true);
      return;
    }
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      await api('/api/import', { method: 'POST', body: JSON.stringify({ db: parsed }) });
      input.value = '';
      await loadAll();
      toast('Backup imported ✓');
    } catch (error) {
      toast('That file could not be imported: ' + error.message, true);
    }
  }

  async function changePassword() {
    const current = $('#currentPassword');
    const next = $('#newPassword');
    const repeat = $('#repeatPassword');
    if (next.value.length < 6) {
      toast('Use at least 6 characters for the new password.', true);
      return;
    }
    if (next.value !== repeat.value) {
      toast('The two new passwords do not match.', true);
      return;
    }
    try {
      await api('/api/password', {
        method: 'POST',
        body: JSON.stringify({ current: current.value, password: next.value }),
      });
      current.value = next.value = repeat.value = '';
      toast('Password updated ✓');
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function loadHealth() {
    const box = $('#healthBox');
    if (!box) return;
    try {
      const health = await api('/api/health');
      const files = health.files || { checked: 0, missing: 0 };
      const missing = Number(files.missing) || 0;
      box.innerHTML = `
        <div>PHP ${esc(health.php)} · backend ${esc(health.version)}</div>
        <div>Data folder writable: <strong>${health.writable && health.writable.data ? 'yes' : 'no'}</strong></div>
        <div>Uploads folder writable: <strong>${health.writable && health.writable.uploads ? 'yes' : 'no'}</strong></div>
        <div>Content revision: <strong>${esc(health.revision)}</strong></div>
        <div>Website files: <strong>${missing
          ? '⚠ ' + missing + ' missing'
          : esc(files.checked) + ' found'}</strong></div>
        <div style="margin-top:8px"><a href="/health">Open the deployment check →</a></div>`;
    } catch (error) {
      box.textContent = 'Status unavailable: ' + error.message;
    }
  }

  /* ------------------------------------------------------------ delegation */
  function initActions() {
    document.addEventListener('click', (event) => {
      const target = event.target;

      const copyButton = target.closest('[data-save-copy]');
      if (copyButton) return saveCopy(copyButton.dataset.saveCopy);

      const saveButton = target.closest('[data-save-item]');
      if (saveButton) return saveItem(saveButton.closest('.editor-card'));

      const deleteButton = target.closest('[data-delete-item]');
      if (deleteButton) return deleteItem(deleteButton.closest('.editor-card'));

      const submissionDelete = target.closest('[data-delete-submission]');
      if (submissionDelete) {
        const card = submissionDelete.closest('[data-submission]');
        if (card && window.confirm('Delete this registration?')) {
          api(`/api/submissions/${encodeURIComponent(card.dataset.submission)}`, { method: 'DELETE' })
            .then(() => { state.submissions = state.submissions.filter((item) => item.id !== card.dataset.submission); renderAll(); toast('Deleted'); })
            .catch((error) => toast(error.message, true));
        }
        return;
      }

      const restoreButton = target.closest('[data-restore]');
      if (restoreButton) return restore(restoreButton.dataset.restore);
    });

    document.addEventListener('change', (event) => {
      const upload = event.target.closest('[data-upload-field]');
      if (upload) return uploadFile(upload, upload.dataset.uploadField);
    });

    $('#addTeam')?.addEventListener('click', () => addItem('team'));
    $('#addEvent')?.addEventListener('click', () => addItem('events'));
    $('#addPhoto')?.addEventListener('click', () => addItem('gallery'));
    $('#addTile')?.addEventListener('click', () => addItem('awareness'));
    $('#exportCsv')?.addEventListener('click', exportCsv);
    $('#clearInbox')?.addEventListener('click', clearInbox);
    $('#importButton')?.addEventListener('click', importFile);
    $('#changePassword')?.addEventListener('click', changePassword);
    $('#logoutButton')?.addEventListener('click', logout);
    $('#refreshButton')?.addEventListener('click', () => loadAll().then(() => toast('Refreshed ✓')).catch((error) => toast(error.message, true)));
  }

  /* -------------------------------------------------------------- start-up */
  async function start() {
    initNav();
    initLogin();
    initActions();

    if (!boot.authed) {
      showLogin();
      return;
    }

    try {
      const session = await api('/api/session');
      if (!session.authenticated) {
        showLogin();
        return;
      }
      state.csrf = session.csrf || state.csrf;
      updateRevision(session.revision || state.revision);
      showApp();
      await loadAll();
      loadHealth();
    } catch (error) {
      showLogin();
      const box = $('#loginError');
      if (box) box.textContent = error.message;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
