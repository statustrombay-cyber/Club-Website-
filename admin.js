const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let state = null;
let updatingFromStream = false;
let offlineMode = false;
const LOCAL_STATE_KEY = 'mindful-tattva-content-studio';

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const safeImage = (value = '') => /^data:image\//i.test(String(value)) || /^https?:\/\//i.test(String(value)) || /^\/assets\/[\w./-]+$/i.test(String(value));
const safeAttachment = (value = '') => /^data:application\/pdf(?:;[^,]*)?,/i.test(String(value)) || /^https?:\/\//i.test(String(value)) || /^\/assets\/[\w./-]+\.pdf(?:$|[?#])/i.test(String(value));
function attachmentMarkup(value) { return safeAttachment(value) ? `<a class="attachment-preview" href="${esc(value)}" target="_blank" rel="noreferrer">Open brochure / poster ↗</a>` : '<span class="attachment-empty">No PDF attached</span>'; }
const makeId = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(16).slice(2, 8)}`;
const calendarMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthOptions = selected => calendarMonths.map((month, index) => `<option value="${index}" ${String(selected) === String(index) ? 'selected' : ''}>${month}</option>`).join('');
function eventParts(item = {}) {
  const raw = String(item.date || '');
  const match = raw.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)(?:\s+(\d{4}))?/i);
  const parsedMonth = calendarMonths.findIndex(month => raw.toLowerCase().includes(month.toLowerCase()));
  const month = item.month !== undefined && item.month !== '' ? String(item.month) : parsedMonth >= 0 ? String(parsedMonth) : '';
  return { month, day: String(item.day || (match ? match[1] : '') || ''), year: String(item.year || (match ? match[3] : '') || '') };
}
function composedEventDate(month, day, year) {
  const name = calendarMonths[Number(month)];
  if (!name) return '';
  return [String(day || '').trim(), name, String(year || '').trim()].filter(Boolean).join(' ');
}

function flash(message, isError = false) {
  const el = $('#saveMessage');
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? '#a85050' : '';
  clearTimeout(flash.timer);
  flash.timer = setTimeout(() => { el.textContent = ''; }, 2600);
}

async function api(url, options = {}) {
  try {
    const response = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || 'Something went wrong');
    return body;
  } catch (error) {
    // The editor is also useful in a downloaded/static preview. Keep the live API
    // as the first path, but let CRUD continue in a local draft when no server is available.
    offlineMode = true;
    throw error;
  }
}

function inputValue(root, field) {
  const element = $(`[data-field="${field}"]`, root);
  if (!element) return '';
  return element.type === 'checkbox' ? element.checked : element.value;
}
function itemPayload(root, fields) { return Object.fromEntries(fields.map(field => [field, inputValue(root, field)])); }
function imageStyle(value) { return safeImage(value) ? ` style="background-image:url('${String(value).replaceAll("'", '%27')}')"` : ''; }

function readEditorCollection(type) {
  const rootId = type === 'team' ? 'teamEditor' : type === 'events' ? 'eventsEditor' : 'galleryEditor';
  const fields = type === 'team' ? ['name', 'role', 'group', 'bio', 'phone', 'image', 'showOnHome'] : type === 'events' ? ['title', 'date', 'month', 'day', 'year', 'time', 'location', 'kicker', 'description', 'published', 'image', 'attachment', 'registrationUrl'] : ['caption', 'alt', 'image'];
  return $$('.editor-item', $(`#${rootId}`)).filter(card => card.dataset.id && card.dataset.type === type).map(card => ({ id: card.dataset.id, ...itemPayload(card, fields) }));
}

function readLocalState() {
  try { return JSON.parse(localStorage.getItem(LOCAL_STATE_KEY) || 'null'); } catch (_) { return null; }
}
function persistLocalState(data) {
  try { localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(data)); } catch (_) {}
}
function editorStateFromMarkup() {
  return { site: {}, team: readEditorCollection('team'), events: readEditorCollection('events'), gallery: readEditorCollection('gallery'), submissions: [] };
}
function ensureLocalState() {
  if (state) return state;
  state = readLocalState() || editorStateFromMarkup();
  return state;
}
function saveLocalCollection(type, id, body) {
  const local = ensureLocalState();
  const collection = local[type] || (local[type] = []);
  const index = collection.findIndex(item => item.id === id);
  if (index < 0) collection.push({ ...body, id });
  else collection[index] = { ...collection[index], ...body, id };
  state = local;
  persistLocalState(local);
  renderAll(local);
}

function renderSiteForm(site) {
  const form = $('#siteForm');
  if (!form) return;
  for (const [key, value] of Object.entries(site || {})) {
    const field = form.elements.namedItem(key);
    if (field && typeof value === 'string') field.value = value;
  }
  const statsEditor = $('#statsEditor');
  if (statsEditor) {
    const stats = site.stats || [];
    statsEditor.innerHTML = [0, 1, 2].map(index => {
      const stat = stats[index] || { value: '', label: '' };
      return `<label><span>Number ${index + 1}</span><input data-stat-index="${index}" data-stat-field="value" value="${esc(stat.value)}" placeholder="01"></label><label><span>Label ${index + 1}</span><input data-stat-index="${index}" data-stat-field="label" value="${esc(stat.label)}" placeholder="shared space"></label>`;
    }).join('');
  }
  const logoPreview = $('#logoPreview');
  if (logoPreview) {
    if (safeImage(site.logoImage)) { logoPreview.classList.remove('empty'); logoPreview.textContent = ''; logoPreview.style.backgroundImage = `url('${String(site.logoImage).replaceAll("'", '%27')}')`; }
    else { logoPreview.classList.add('empty'); logoPreview.textContent = site.shortName || 'MT'; logoPreview.style.backgroundImage = ''; }
  }
}

function renderTeam(items) {
  $('#teamEditor').innerHTML = items.length ? items.map((item, index) => `
    <article class="editor-item" data-id="${esc(item.id)}" data-type="team">
      <div class="item-top"><span class="item-label">Member ${String(index + 1).padStart(2, '0')}</span><div class="item-actions"><button type="button" class="text-button" data-action="save-item">Save</button><button type="button" class="text-button remove-button" data-action="delete-item">Delete</button></div></div>
      <div class="form-grid two compact">
        <label>Name<input data-field="name" value="${esc(item.name)}" placeholder="Member name"></label>
        <label>Role<input data-field="role" value="${esc(item.role)}" placeholder="President · Core team"></label>
        <label>Contact number<input data-field="phone" value="${esc(item.phone)}" placeholder="+91 ..."></label>
        <label>Member group<select data-field="group"><option value="management" ${item.group === 'management' ? 'selected' : ''}>Core Committee</option><option value="heads" ${item.group === 'heads' ? 'selected' : ''}>Head Committee</option><option value="volunteers" ${item.group === 'volunteers' ? 'selected' : ''}>Volunteers</option></select></label>
        <label class="span-2">Short bio<textarea data-field="bio" rows="3" placeholder="A one or two line introduction..."></textarea></label>
        ${item.group === 'management' ? `<label class="publish-toggle span-2"><input type="checkbox" data-field="showOnHome" ${item.showOnHome !== false ? 'checked' : ''}> Show this Core Committee member on the homepage</label>` : ''}
      </div>
      <div class="file-row"><div class="preview-thumb${safeImage(item.image) ? '' : ' empty'}"${imageStyle(item.image)}>✦</div><input type="hidden" data-field="image" value="${esc(item.image)}"><input type="file" accept="image/png,image/jpeg,image/webp" data-upload="image" aria-label="Upload member photo"></div>
    </article>`).join('') : emptyEditor('Core team is ready for names', 'Add the first member when you have the names and photos.');
  items.forEach((item, index) => {
    const card = $$('.editor-item', $('#teamEditor'))[index];
    const bio = $('[data-field="bio"]', card); if (bio) bio.value = item.bio || '';
  });
}

function renderEvents(items) {
  $('#eventsEditor').innerHTML = items.length ? items.map((item, index) => {
    const parts = eventParts(item);
    return `
    <article class="editor-item" data-id="${esc(item.id)}" data-type="events">
      <div class="item-top"><span class="item-label">Event ${String(index + 1).padStart(2, '0')}</span><div class="item-actions"><button type="button" class="text-button" data-action="save-item">Save</button><button type="button" class="text-button remove-button" data-action="delete-item">Delete</button></div></div>
      <div class="form-grid two compact">
        <label>Event title<input data-field="title" value="${esc(item.title)}" placeholder="Workshop title"></label>
        <label>Month<select data-field="month"><option value="">Choose month</option>${monthOptions(parts.month)}</select></label>
        <label>Day / date<input data-field="day" value="${esc(parts.day)}" placeholder="24"></label>
        <label>Year<input data-field="year" value="${esc(parts.year)}" placeholder="2026" inputmode="numeric"></label>
        <label>Time<input data-field="time" value="${esc(item.time)}" placeholder="4:00 PM"></label>
        <label>Where is it happening?<input data-field="location" value="${esc(item.location)}" placeholder="CSMU campus · Room 204"></label>
        <label>Short label<input data-field="kicker" value="${esc(item.kicker)}" placeholder="Workshop"></label>
        <label>Registration / details URL<input data-field="registrationUrl" value="${esc(item.registrationUrl)}" placeholder="https://..."></label>
        <label class="span-2">Description<textarea data-field="description" rows="3" placeholder="What is this event about?"></textarea></label>
        <label class="publish-toggle span-2"><input type="checkbox" data-field="published" ${item.published === true ? 'checked' : ''}> Show this event in the live current-events banner</label>
      </div>
      <div class="file-row event-file-row"><div class="event-image-upload"><div class="preview-thumb${safeImage(item.image) ? '' : ' empty'}"${imageStyle(item.image)}>✦</div><input type="hidden" data-field="image" value="${esc(item.image)}"><input type="file" accept="image/png,image/jpeg,image/webp" data-upload="image" aria-label="Upload event photo"><small>Event image · automatically normalized</small></div><div class="event-attachment-upload">${attachmentMarkup(item.attachment)}<input type="hidden" data-field="attachment" value="${esc(item.attachment)}"><input type="file" accept="application/pdf" data-upload="attachment" aria-label="Upload event brochure or poster PDF"><small>Brochure or poster PDF · event section only</small></div></div>
    </article>`;
  }).join('') : emptyEditor('No events yet', 'Add your first workshop, talk or gathering.');
  items.forEach((item, index) => {
    const card = $$('.editor-item', $('#eventsEditor'))[index];
    const body = $('[data-field="description"]', card); if (body) body.value = item.description || '';
  });
}

function renderGallery(items) {
  $('#galleryEditor').innerHTML = items.length ? items.map((item, index) => `
    <article class="editor-item" data-id="${esc(item.id)}" data-type="gallery">
      <div class="item-top"><span class="item-label">Photo ${String(index + 1).padStart(2, '0')}</span><div class="item-actions"><button type="button" class="text-button" data-action="save-item">Save</button><button type="button" class="text-button remove-button" data-action="delete-item">Delete</button></div></div>
      <div class="form-grid compact">
        <label>Caption<input data-field="caption" value="${esc(item.caption)}" placeholder="A meaningful moment"></label>
        <label>Alt text<input data-field="alt" value="${esc(item.alt)}" placeholder="Describe the photo"></label>
      </div>
      <div class="file-row"><div class="preview-thumb${safeImage(item.image) ? '' : ' empty'}"${imageStyle(item.image)}>✦</div><input type="hidden" data-field="image" value="${esc(item.image)}"><input type="file" accept="image/png,image/jpeg,image/webp" data-upload="image" aria-label="Upload gallery photo"></div>
    </article>`).join('') : emptyEditor('Your gallery is waiting', 'Add photos from events and campus moments.');
}

function emptyEditor(title, body) { return `<div class="editor-item"><strong style="font-family:var(--font-display);font-size:1.45rem;font-weight:400">${esc(title)}</strong><p style="margin:.4rem 0 0;color:var(--ink-soft);font-size:.82rem">${esc(body)}</p></div>`; }

function renderSubmissions(items) {
  const grid = $('#submissionsEditor');
  if (!grid) return;
  grid.innerHTML = items.length ? items.map(item => `
    <article class="submission-card" data-id="${esc(item.id)}">
      <div class="submission-card-head"><div><span class="submission-type">${esc(item.type === 'club-registration' ? 'Club registration' : 'Membership interest')}</span><h3>${esc(item.name)}</h3></div><button class="text-button remove-button" data-action="delete-submission">Delete</button></div>
      <div class="submission-meta"><a href="mailto:${esc(item.email)}">${esc(item.email)}</a><a href="tel:${esc(item.phone.replace(/[^+\d]/g, ''))}">${esc(item.phone)}</a>${item.course ? `<span>${esc(item.course)}${item.year ? ` · ${esc(item.year)}` : ''}</span>` : ''}${item.event ? `<span>Event: ${esc(item.event)}</span>` : ''}</div>
      ${item.interests ? `<p><strong>Interests:</strong> ${esc(item.interests)}</p>` : ''}${item.message ? `<p><strong>Message:</strong> ${esc(item.message)}</p>` : ''}
      <small class="submission-time">${esc(new Date(item.submittedAt).toLocaleString())}</small>
    </article>`).join('') : emptyEditor('No submissions yet', 'Membership and club registration responses will appear here.');
}

function renderAll(data) {
  state = data;
  renderSiteForm(data.site || {});
  renderTeam(data.team || []);
  renderEvents(data.events || []);
  renderGallery(data.gallery || []);
  renderSubmissions(data.submissions || []);
}

async function loadData() {
  try {
    const [site, submissions] = await Promise.all([api('/api/site'), api('/api/submissions')]);
    site.submissions = submissions;
    renderAll(site);
  } catch (error) {
    const saved = readLocalState();
    if (saved) renderAll(saved);
    else { state = editorStateFromMarkup(); renderAll(state); }
    flash('Live API unavailable — local editor mode is ready', true);
  }
}

async function saveSite() {
  const form = $('#siteForm');
  if (!form) return;
  const body = Object.fromEntries(new FormData(form).entries());
  const statInputs = $$('[data-stat-index]', form);
  if (statInputs.length) body.stats = [0, 1, 2].map(index => ({ value: $(`[data-stat-index="${index}"][data-stat-field="value"]`, form)?.value || '', label: $(`[data-stat-index="${index}"][data-stat-field="label"]`, form)?.value || '' }));
  try { await api('/api/site', { method: 'PUT', body: JSON.stringify(body) }); flash('Instagram details saved ✓'); await loadData(); }
  catch (error) {
    if (!offlineMode) return flash(error.message, true);
    const local = ensureLocalState(); local.site = { ...(local.site || {}), ...body }; state = local; persistLocalState(local); flash('Saved to this browser ✓');
  }
}

async function saveItem(card) {
  if (!card || !card.dataset.type || !card.dataset.id) return flash('This item is not ready to save', true);
  const type = card.dataset.type;
  const fields = type === 'team' ? ['name', 'role', 'group', 'bio', 'phone', 'image', 'showOnHome'] : type === 'events' ? ['title', 'date', 'month', 'day', 'year', 'time', 'location', 'kicker', 'description', 'published', 'image', 'attachment', 'registrationUrl'] : ['caption', 'alt', 'image'];
  const body = itemPayload(card, fields);
  if (type === 'events') body.date = composedEventDate(body.month, body.day, body.year) || body.date || 'Date to be announced';
  try { await api(`/api/${type}/${encodeURIComponent(card.dataset.id)}`, { method: 'PUT', body: JSON.stringify(body) }); flash('Saved ✓'); await loadData(); }
  catch (error) {
    if (!offlineMode) return flash(error.message, true);
    saveLocalCollection(type, card.dataset.id, body);
    flash('Saved to this browser ✓');
  }
}

async function addItem(type) {
  const defaults = {
    team: { name: 'New member', role: 'Core team', group: 'management', groupLabel: 'Core Committee', bio: 'Add a short introduction.', phone: '', image: '', showOnHome: true },
    events: { title: 'New event', date: '', month: '', day: '', year: '', time: 'Add time', location: 'Add location', kicker: 'Mindful Tattva', description: 'Add event details.', published: false, image: '', attachment: '', registrationUrl: '' },
    gallery: { caption: 'New memory', alt: 'Describe this photo', image: '' }
  };
  if (!defaults[type]) return;
  try { await api(`/api/${type}`, { method: 'POST', body: JSON.stringify(defaults[type]) }); flash('Added ✓'); await loadData(); }
  catch (error) {
    if (!offlineMode) return flash(error.message, true);
    const item = { ...defaults[type], id: makeId(type === 'events' ? 'event' : type === 'team' ? 'team' : 'gallery') };
    const local = ensureLocalState(); (local[type] || (local[type] = [])).push(item); state = local; persistLocalState(local); renderAll(local); flash(`${type === 'team' ? 'Member' : type === 'events' ? 'Event' : 'Photo'} added to this browser ✓`);
  }
}

async function deleteItem(card) {
  if (!confirm('Remove this item from the website?')) return;
  try { await api(`/api/${card.dataset.type}/${encodeURIComponent(card.dataset.id)}`, { method: 'DELETE' }); flash('Removed'); await loadData(); }
  catch (error) {
    if (!offlineMode) return flash(error.message, true);
    const local = ensureLocalState(); local[card.dataset.type] = (local[card.dataset.type] || []).filter(item => item.id !== card.dataset.id); state = local; persistLocalState(local); renderAll(local); flash('Removed from this browser');
  }
}

async function deleteSubmission(card) {
  if (!confirm('Delete this form submission?')) return;
  try { await api(`/api/submissions/${encodeURIComponent(card.dataset.id)}`, { method: 'DELETE' }); flash('Submission deleted'); await loadData(); }
  catch (error) { flash(error.message, true); }
}

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function fileToCroppedDataUrl(file) {
  const source = await fileToDataUrl(file);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const side = Math.min(image.naturalWidth, image.naturalHeight);
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1200;
      const context = canvas.getContext('2d');
      if (!context) return reject(new Error('Canvas unavailable'));
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, 1200, 1200);
      resolve(canvas.toDataURL('image/jpeg', .86));
    };
    image.onerror = reject;
    image.src = source;
  });
}

document.addEventListener('click', async event => {
  const saveButton = event.target.closest('.save-section');
  if (saveButton) return saveSite();
  const actionButton = event.target.closest('[data-action]');
  if (actionButton) {
    const card = actionButton.closest('.editor-item, .submission-card');
    if (actionButton.dataset.action === 'save-item') return saveItem(card);
    if (actionButton.dataset.action === 'delete-item') return deleteItem(card);
    if (actionButton.dataset.action === 'delete-submission') return deleteSubmission(card);
  }
  const addButton = event.target.closest('[id^="add"]');
  if (addButton) {
    const type = addButton.id === 'addTeam' ? 'team' : addButton.id === 'addEvent' ? 'events' : 'gallery';
    return addItem(type);
  }
});

document.addEventListener('change', async event => {
  const siteUpload = event.target.closest('[data-site-upload]');
  if (siteUpload && siteUpload.files?.[0]) {
    try {
      const dataUrl = await fileToDataUrl(siteUpload.files[0]);
      const field = $('#siteForm').elements.namedItem(siteUpload.dataset.siteUpload);
      if (field) field.value = dataUrl;
      const preview = $('#logoPreview');
      if (preview) { preview.classList.remove('empty'); preview.style.backgroundImage = `url('${dataUrl}')`; preview.textContent = ''; }
      flash('Logo attached — save Brand & Story to publish ✓');
    } catch (error) { flash('Could not read that logo', true); }
    return;
  }
  const upload = event.target.closest('[data-upload]');
  if (!upload || !upload.files?.[0]) return;
  const card = upload.closest('.editor-item');
  try {
    const isAttachment = upload.dataset.upload === 'attachment';
    const dataUrl = isAttachment ? await fileToDataUrl(upload.files[0]) : await fileToCroppedDataUrl(upload.files[0]);
    const field = $(`[data-field="${upload.dataset.upload}"]`, card);
    if (field) field.value = dataUrl;
    if (isAttachment) {
      const link = $('.attachment-preview', card);
      const empty = $('.attachment-empty', card);
      if (link) { link.href = dataUrl; link.textContent = 'Open brochure / poster ↗'; }
      else if (empty) { empty.outerHTML = `<a class="attachment-preview" href="${esc(dataUrl)}" target="_blank" rel="noreferrer">Open brochure / poster ↗</a>`; }
      flash('PDF attached — save this event to publish ✓');
    } else {
      const preview = $('.preview-thumb', card);
      if (preview) { preview.classList.remove('empty'); preview.style.backgroundImage = `url('${dataUrl}')`; preview.textContent = ''; }
      flash('Photo attached — save this card to publish ✓');
    }
  } catch (error) { flash(upload.dataset.upload === 'attachment' ? 'Could not read that PDF' : 'Could not read that image', true); }
});

document.addEventListener('input', event => {
  const target = event.target;
  if (target.matches('[data-field="image"]')) {
    const card = target.closest('.editor-item');
    const preview = $('.preview-thumb', card);
    if (preview && safeImage(target.value)) { preview.classList.remove('empty'); preview.style.backgroundImage = `url('${target.value.replaceAll("'", '%27')}')`; preview.textContent = ''; }
  }
});

$$('.studio-nav a').forEach(link => link.addEventListener('click', () => {
  $$('.studio-nav a').forEach(item => item.classList.remove('active'));
  link.classList.add('active');
}));

function connectStream() {
  if (window.mindfulStream) return;
  try {
    const stream = new EventSource('/api/stream');
    window.mindfulStream = stream;
    stream.addEventListener('site-update', event => {
      try {
        state = JSON.parse(event.data);
        $('#syncStatus').innerHTML = '<span class="live-dot"></span> Live sync on';
        // Keep a person’s current field edits intact; a saved change is refreshed by its own action.
      } catch (_) {}
    });
    stream.onerror = () => { $('#syncStatus').innerHTML = '<span class="live-dot" style="background:#e5ae48"></span> Reconnecting…'; };
  } catch (_) {}
}

(async function initStudio() {
  await loadData();
  connectStream();
})();
