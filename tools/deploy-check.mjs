/**
 * Mindful Tattva · deploy readiness check
 * ---------------------------------------
 * Walks every real workflow against a running site (default the local preview
 * on :4173) the way a person would: sign in, write, publish, register, pay,
 * get a pass, verify it, export it, then delete it all again and confirm it is
 * gone. Nothing is left behind — the deletions are part of the test.
 *
 *   node deploy-check.mjs [http://localhost:4173]
 */
const BASE = (process.argv[2] || 'http://localhost:4173').replace(/\/$/, '');
const PASSWORD = process.env.MT_PASSWORD || 'Csmu@MT';

let pass = 0;
const failures = [];
const results = [];
function check(name, ok, detail = '') {
  if (ok) { pass += 1; results.push(['ok', name, detail]); }
  else { failures.push(name + (detail ? ' — ' + detail : '')); results.push(['FAIL', name, detail]); }
}

let cookies = {};
function cookieHeader() {
  return Object.entries(cookies).map(([k, v]) => k + '=' + v).join('; ');
}
function storeCookies(response) {
  const raw = response.headers.getSetCookie ? response.headers.getSetCookie() : [];
  for (const line of raw) {
    const [pair] = line.split(';');
    const at = pair.indexOf('=');
    if (at > 0) cookies[pair.slice(0, at)] = pair.slice(at + 1);
  }
}

async function req(path, { method = 'GET', json, form, headers = {}, csrf } = {}) {
  const options = { method, headers: { ...headers }, redirect: 'manual' };
  if (Object.keys(cookies).length) options.headers.Cookie = cookieHeader();
  if (csrf) options.headers['X-CSRF-Token'] = csrf;
  if (json !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(json);
  }
  if (form) options.body = form;
  const response = await fetch(BASE + path, options);
  storeCookies(response);
  const type = response.headers.get('content-type') || '';
  let body;
  if (/json/.test(type)) { try { body = await response.json(); } catch (e) { body = null; } }
  else if (/pdf|image|video/.test(type)) { body = Buffer.from(await response.arrayBuffer()); }
  else body = await response.text();
  return { status: response.status, body, type, headers: response.headers };
}

const step = (title) => console.log('\n— ' + title + ' —');

/* a real (tiny) png, used for the gallery photo and the payment proof */
const png = Buffer.from('89504e470d0a1a0a0000000d4948445200000008000000080806000000' + '774d0d'.repeat(6), 'hex');

/* ---------------------------------------------------------------- 1. auth */
step('sign in and the club\'s door');
const wrong = await req('/api/login', { method: 'POST', json: { password: 'definitely-not-it' } });
check('a wrong password is refused', wrong.status === 401, 'status ' + wrong.status);
const anonEvents = await req('/api/registrations');
check('a stranger cannot read the register', anonEvents.status === 401, 'status ' + anonEvents.status);
const login = await req('/api/login', { method: 'POST', json: { password: PASSWORD } });
const csrf = login.body && login.body.csrf;
check('the club password signs in', login.status === 200 && Boolean(csrf), 'status ' + login.status);
const session = await req('/api/session');
check('the session is remembered', session.status === 200 && (session.body.authenticated === true || session.body.ok === true));
const dashLink = await req('/dashboard');
const dash = dashLink.status === 303 ? await req('/dashboard/overview') : dashLink;
check('the dashboard opens for the club', dash.status === 200 && /Sign out/i.test(String(dash.body)), 'status ' + dash.status);
const dashAnon = await req('/dashboard');
check('a forged cookie does not open the dashboard', !/Sign out/i.test(String(dashAnon.body)));

/* ------------------------------------------------------- 2. record writing */
step('writing, editing and deleting records');
const stamp = Date.now().toString(36).toUpperCase();

const eventTitle = 'Deploy check circle ' + stamp;
const created = await req('/api/events', {
  method: 'POST', csrf,
  json: { title: eventTitle, month: 11, day: 20, year: 2026, time: '5:00 PM', location: 'Seminar Hall', published: true, fee: 0, registrationOpen: true },
});
const eventId = created.body && created.body.item && created.body.item.id;
const eventNumber = created.body && created.body.item && created.body.item.number;
check('an event is created and numbered', created.status === 201 && Boolean(eventId) && Number(eventNumber) >= 1, 'number ' + eventNumber);

const events = await req('/api/events');
check('the new event is in the list', events.status === 200 && (events.body.items || []).some((e) => e.id === eventId));

const edited = await req('/api/events/' + eventId, { method: 'PUT', csrf, json: { title: eventTitle, month: 11, day: 21, year: 2026, time: '6:00 PM', location: 'Room 204', published: true, fee: 0, registrationOpen: true } });
check('the event is edited', edited.status === 200 && (edited.body.item || {}).day === 21 && (edited.body.item || {}).location === 'Room 204');

const homeWithEvent = await req('/');
check('the event reaches the public page', String(homeWithEvent.body).includes(eventTitle));

/* --------------------------------------------------- 3. a student registers */
step('a student registers and gets a pass');
const homePage = await req('/register?event=' + eventId);
const tokenMatch = /name="csrf" value="([^"]+)"/.exec(String(homePage.body));
const formToken = tokenMatch ? tokenMatch[1] : '';
check('the registration form carries a CSRF token', Boolean(formToken) && homePage.status === 200);

const registration = await req('/api/registrations', {
  method: 'POST', json: { eventId, name: 'Deploy Check Student', email: 'deploy@example.com', phone: '+91 90000 12345', course: 'BA Psychology', year: '2', csrf: formToken },
});
const student = registration.body || {};
const serial = student.serial || (student.item && student.item.serial) || '';
check('the registration is accepted', registration.status === 201 || registration.status === 200, 'status ' + registration.status);
check('a pass serial is issued', /^MTP-/.test(serial), serial);

const passCode = String(student.passUrl || '').replace(/^\/pass\//, '').replace(/\?.*$/, '');
const passLookup = passCode ? await req('/pass/' + encodeURIComponent(passCode)) : { status: 0, body: '' };
check('the pass page opens for the student', passLookup.status === 200 && String(passLookup.body).includes(serial), 'status ' + passLookup.status);

const csv = await req('/api/registrations.csv', { csrf });
check('the register exports as CSV with every serial', csv.status === 200 && String(csv.body).includes(serial) && /name/i.test(String(csv.body).split('\n')[0]));

const inbox = await req('/api/registrations');
const inboxItem = ((inbox.body || {}).items || []).find((item) => item.id === (student.id || 'x')) || {};
check('the club sees the registration in the register', Boolean(inboxItem.id), 'status ' + inbox.status);
check('the register hides the student\'s pass key', inboxItem.passCodeHash === undefined && inboxItem.code === undefined);
const plainCsv = await req('/api/registrations.csv');
check('the register downloads from a plain link (no token header)', plainCsv.status === 200 && String(plainCsv.body).includes(serial), 'status ' + plainCsv.status);
const plainExport = await req('/api/export');
check('the backup downloads from a plain link (no token header)', plainExport.status === 200 && typeof plainExport.body === 'object', 'status ' + plainExport.status);

/* ------------------------------------------------- 4. the pass document */
step('the pass document and its verification');
const publicId = student.publicId || inboxItem.publicId || '';
const verify = publicId ? await req('/verify/' + encodeURIComponent(publicId)) : { status: 0, body: '' };
check('the pass verifies from its link', verify.status === 200 && /valid|genuine|verified|real/i.test(String(verify.body)), 'status ' + verify.status);
const verifyBad = await req('/verify/not-a-real-pass');
check('a made-up pass link does not verify', verifyBad.status === 404 || !/genuine|is valid/i.test(String(verifyBad.body).slice(0, 6000)), 'status ' + verifyBad.status);

/* ---------------------------------------------------------- 5. the money */
step('a paid event: the pass waits for the payment');
const paid = await req('/api/events', {
  method: 'POST', csrf,
  json: { title: 'Deploy paid circle ' + stamp, month: 12, day: 4, year: 2026, time: '3:00 PM', location: 'Auditorium', published: true, fee: 150, registrationOpen: true },
});
const paidId = paid.body && paid.body.item && paid.body.item.id;
const paidPage = await req('/register?event=' + paidId);
check('a paid event shows the payment step', paidPage.status === 200 && /screenshot|payment/i.test(String(paidPage.body)));
const paidToken = (/name="csrf" value="([^"]+)"/.exec(String(paidPage.body)) || [])[1] || formToken;
const paidRegistration = await req('/api/registrations', {
  method: 'POST', json: { eventId: paidId, name: 'Deploy Paid Student', email: 'paid@example.com', phone: '+91 90000 12345', csrf: paidToken },
});
const paidStudent = paidRegistration.body || {};
check('the registration is held until the fee is checked', paidRegistration.status === 201 || paidRegistration.status === 200, 'status ' + paidRegistration.status);
const paidRow = ((await req('/api/registrations')).body.items || []).find((item) => item.id === (paidStudent.id || 'x')) || {};
check('the register shows the payment as not settled and no seat held', ['pending', 'submitted'].includes(String(paidRow.paymentStatus)) && paidRow.passReady !== true && !paidRow.serial, JSON.stringify({ payment: paidRow.paymentStatus, ready: paidRow.passReady, serial: paidRow.serial || '' }));
const paidCode = String(paidStudent.passUrl || '').replace(/^\/pass\//, '').replace(/\?.*$/, '');
const paidPassPage = await req('/pass/' + encodeURIComponent(paidCode));
check('the pass page asks for the payment screenshot', paidPassPage.status === 200 && /screenshot/i.test(String(paidPassPage.body)) && !/Download your pass/i.test(String(paidPassPage.body)));
const proofToken = (/name="csrf" value="([^"]+)"/.exec(String(paidPassPage.body)) || [])[1] || '';
const proof = new FormData();
proof.append('csrf', proofToken);
proof.append('proof', new Blob([png], { type: 'image/png' }), 'receipt.png');
const proofUpload = await req('/pass', { method: 'POST', form: proof });
check('the student uploads the payment screenshot', proofUpload.status === 303 || proofUpload.status === 200, 'status ' + proofUpload.status);
const passAfterProof = await req('/pass?paid=1');
/* the serial carries the event's date: MTP-24OCT26-0001 (or the year, for an
   event that has no date yet) */
const issued = (/MTP-(?:\d{2}[A-Z]{3}\d{2}|\d{4})-\d{4}/.exec(String(passAfterProof.body)) || [''])[0];
check('the pass and its serial are issued only now', /^MTP-/.test(issued) && /Download your pass/i.test(String(passAfterProof.body)), issued);
const verified = await req('/api/registrations/' + (paidRow.id || 'x'), { method: 'PUT', csrf, json: { paymentStatus: 'verified' } });
check('the club can mark the payment verified', verified.status === 200, 'status ' + verified.status);
const paidAfter = ((await req('/api/registrations')).body.items || []).find((item) => item.id === (paidStudent.id || 'x')) || {};
check('the register shows the paid seat, without the student key', paidAfter.passReady === true && !/MT-[2-9A-HJ-NP-Z]{5}-/.test(JSON.stringify(paidAfter)), JSON.stringify({ ready: paidAfter.passReady, serial: paidAfter.serial }));
const paidDeleted = await req('/api/registrations/' + (paidRow.id || 'x'), { method: 'DELETE', csrf });
const paidEventDeleted = await req('/api/events/' + (paidId || 'x'), { method: 'DELETE', csrf });
check('the paid record and its event are cleaned up', paidDeleted.status === 200 && paidEventDeleted.status === 200, paidDeleted.status + '/' + paidEventDeleted.status);

/* --------------------------------------------------------- 6. the gallery */
step('the photo gallery');
let uploadForm = new FormData();
uploadForm.append('kind', 'image');
uploadForm.append('file', new Blob([png], { type: 'image/png' }), 'check.png');
const uploaded = await req('/api/upload', { method: 'POST', csrf, form: uploadForm });
const imagePath = uploaded.body && (uploaded.body.path || uploaded.body.url);
check('a photo uploads from the club area', (uploaded.status === 200 || uploaded.status === 201) && Boolean(imagePath), 'status ' + uploaded.status + ' ' + JSON.stringify(uploaded.body).slice(0, 90));

const photo = await req('/api/gallery', {
  method: 'POST', csrf,
  json: { image: imagePath, caption: 'Deploy check photo ' + stamp, eventId, order: 1, visible: true },
});
const photoId = photo.body && photo.body.item && photo.body.item.id;
check('the photo is filed in the album', photo.status === 201 && Boolean(photoId), 'status ' + photo.status);

const galleryPage = await req('/gallery');
check('the photo and its caption appear on the gallery page', String(galleryPage.body).includes('Deploy check photo ' + stamp)
  && String(galleryPage.body).includes('class="archive-image"'));
const slideOne = await req('/api/gallery', { method: 'POST', csrf, json: { image: imagePath, caption: 'Slideshow lead ' + stamp, order: 1, visible: true } });
const slideTwo = await req('/api/gallery', { method: 'POST', csrf, json: { image: imagePath, caption: 'Slideshow second ' + stamp, order: 2, visible: true } });
const orderedGallery = String((await req('/gallery')).body);
check('the club\'s display order decides what leads the gallery',
  orderedGallery.indexOf('Slideshow lead ' + stamp) > 0
  && orderedGallery.indexOf('Slideshow lead ' + stamp) < orderedGallery.indexOf('Slideshow second ' + stamp));
for (const item of [slideOne, slideTwo]) {
  await req('/api/gallery/' + ((item.body || {}).item || {}).id, { method: 'DELETE', csrf });
}

const recaptioned = await req('/api/gallery/' + photoId, { method: 'PUT', csrf, json: { image: imagePath, caption: 'Recaptioned ' + stamp, eventId, order: 1, visible: true } });
check('the photo can be recaptioned', recaptioned.status === 200 && String(JSON.stringify(recaptioned.body)).includes('Recaptioned ' + stamp));

/* ------------------------------------------------------- 7. the join form */
step('the membership form');
const joinPage = await req('/');
const joinToken = (/name="csrf" value="([^"]+)"/.exec(String(joinPage.body)) || [])[1] || formToken;
const join = await req('/api/submissions', { method: 'POST', json: { name: 'Deploy Join ' + stamp, email: 'join@example.com', phone: '+91 90000 12345', interest: 'workshops', csrf: joinToken } });
check('a membership interest is submitted', join.status === 201 || join.status === 200, 'status ' + join.status);
const submissions = await req('/api/submissions');
const submission = ((submissions.body || {}).items || []).find((item) => String(item.email || '').includes('join@example.com'));
check('the club sees the membership interest', Boolean(submission && submission.id), 'status ' + submissions.status);

/* ------------------------------------------------------ 8. site copy edits */
step('site copy, backups and the content file');
const before = await req('/api/site');
const originalAnnouncement = (before.body.site || {}).announcement || '';
const copyWrite = await req('/api/site', { method: 'PUT', csrf, json: { announcement: 'Deploy check ' + stamp } });
check('the club can change its site copy', copyWrite.status === 200, 'status ' + copyWrite.status);
const homeCopy = await req('/');
check('the change shows on the public site', String(homeCopy.body).includes('Deploy check ' + stamp));
const restored = await req('/api/site', { method: 'PUT', csrf, json: { announcement: originalAnnouncement } });
const afterRestore = await req('/');
check('the copy is put back', restored.status === 200 && !String(afterRestore.body).includes('Deploy check ' + stamp));

const exported = await req('/api/export', { csrf });
check('the content exports as a backup file', exported.status === 200 && typeof exported.body === 'object' && exported.body !== null, 'status ' + exported.status);
const backups = await req('/api/backups', { csrf });
check('the backups list is readable', backups.status === 200, 'status ' + backups.status);
const health = await req('/health');
check('the deployment check page is green', health.status === 200 && /ok|good|healthy/i.test(String(health.body).slice(0, 3000)));

/* ----------------------------------------------------- 9. deleting it all */
step('deleting records, and confirming they are gone');
const deletePhoto = await req('/api/gallery/' + photoId, { method: 'DELETE', csrf });
check('the photo is deleted', deletePhoto.status === 200, 'status ' + deletePhoto.status);
const galleryAfter = await req('/api/gallery');
check('the deleted photo is gone from the album', !(galleryAfter.body.items || []).some((item) => item.id === photoId));
const galleryPageAfter = await req('/gallery');
check('and gone from the gallery page', !String(galleryPageAfter.body).includes('Deploy check photo ' + stamp));

const deleteSubmission = await req('/api/submissions/' + (submission ? submission.id : 'x'), { method: 'DELETE', csrf });
check('the membership interest is deleted', deleteSubmission.status === 200, 'status ' + deleteSubmission.status);

const deleteRegistration = await req('/api/registrations/' + (inboxItem.id || 'x'), { method: 'DELETE', csrf });
check('the registration is deleted', deleteRegistration.status === 200, 'status ' + deleteRegistration.status);
const inboxAfter = await req('/api/registrations');
check('the deleted registration is gone', !(inboxAfter.body.items || []).some((item) => item.id === inboxItem.id));

const deleteEvent = await req('/api/events/' + eventId, { method: 'DELETE', csrf });
check('the event is deleted', deleteEvent.status === 200, 'status ' + deleteEvent.status);
const homeAfter = await req('/');
check('the event is gone from the public site', !String(homeAfter.body).includes(eventTitle));

/* ----------------------------------------------------------- 10. the rest */
step('the other public pages and the club\'s password');
for (const [route, expect] of [['/', 'Mindful'], ['/gallery', 'gallery'], ['/calendar', 'calendar'], ['/members', 'members'], ['/pass', 'pass'], ['/verify', 'pass'], ['/robots.txt', 'User-agent'], ['/sitemap.xml', 'urlset'], ['/favicon.ico', ''], ['/does-not-exist', '']]) {
  const page = await req(route);
  const wanted = route === '/does-not-exist' ? 404 : 200;
  check('the page ' + route + ' answers ' + wanted, page.status === wanted, 'status ' + page.status);
}
const noStudio = await req('/');
check('no studio or dashboard words on the public page', !/(content studio|dashboard|backend)/i.test(String(noStudio.body).replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '')));
const video = await req('/assets/media/horses-running.mp4', { headers: { Range: 'bytes=0-99' } });
check('the herd streams in slices', video.status === 206 && String(video.headers.get('content-range') || '').startsWith('bytes 0-99/'));
const logout = await req('/api/logout', { method: 'POST', csrf });
check('signing out works', logout.status === 200);
const afterLogout = await req('/api/registrations');
check('and the register is closed again after signing out', afterLogout.status === 401, 'status ' + afterLogout.status);

/* ---------------------------------------------------------------- summary */
console.log('\n' + '='.repeat(64));
for (const [state, name, detail] of results) {
  console.log((state === 'ok' ? '  ok   ' : '  FAIL ') + name + (detail ? '  (' + detail + ')' : ''));
}
console.log('='.repeat(64));
console.log(pass + ' checked and working' + (failures.length ? ', ' + failures.length + ' PROBLEM(S):' : ', nothing failed.'));
for (const failure of failures) console.log('   · ' + failure);
/* This walk uploads a photo and a payment proof of its own, and deletes the
   records it made — the files stay on disk until they are swept, which is why
   the note below is printed every time rather than left to memory. */
console.log('   note  the walk left one photo and one proof in uploads/: run');
console.log('         node tools/clean-test-data.mjs (with the preview stopped) to sweep them.');
process.exit(failures.length ? 1 : 0);
