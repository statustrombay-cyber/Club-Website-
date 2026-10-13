/* Delete the records my earlier probe runs left behind, so the store is the
   club's own content again. */
const BASE = process.argv[2] || 'http://localhost:4173';
let cookies = {};
const cookieHeader = () => Object.entries(cookies).map(([k, v]) => k + '=' + v).join('; ');
async function req(path, { method = 'GET', json, csrf } = {}) {
  const headers = {}; if (Object.keys(cookies).length) headers.Cookie = cookieHeader();
  if (csrf) headers['X-CSRF-Token'] = csrf;
  if (json) headers['Content-Type'] = 'application/json';
  const response = await fetch(BASE + path, { method, headers, body: json ? JSON.stringify(json) : undefined, redirect: 'manual' });
  for (const line of (response.headers.getSetCookie ? response.headers.getSetCookie() : [])) {
    const [pair] = line.split(';'); const at = pair.indexOf('=');
    if (at > 0) cookies[pair.slice(0, at)] = pair.slice(at + 1);
  }
  const text = await response.text();
  try { return { status: response.status, body: JSON.parse(text) }; } catch (e) { return { status: response.status, body: text }; }
}
const login = await req('/api/login', { method: 'POST', json: { password: 'Csmu@MT' } });
const csrf = login.body.csrf;
const removed = { registrations: 0, events: 0, gallery: 0, submissions: 0 };

const registrations = await req('/api/registrations');
for (const item of (registrations.body.items || [])) {
  if (['deploy@example.com', 'paid@example.com', 'shape@example.com'].includes(String(item.email || '')) || /Deploy|Shape/.test(String(item.name || ''))) {
    const done = await req('/api/registrations/' + item.id, { method: 'DELETE', csrf });
    if (done.status === 200) removed.registrations += 1;
  }
}
const events = await req('/api/events');
for (const item of (events.body.items || [])) {
  if (/^(Deploy|Shape)/.test(String(item.title || ''))) {
    const done = await req('/api/events/' + item.id, { method: 'DELETE', csrf });
    if (done.status === 200) removed.events += 1;
  }
}
const gallery = await req('/api/gallery');
for (const item of (gallery.body.items || [])) {
  if (/^(Deploy|Recaptioned|Welcome Circle)/.test(String(item.caption || ''))) {
    const done = await req('/api/gallery/' + item.id, { method: 'DELETE', csrf });
    if (done.status === 200) removed.gallery += 1;
  }
}
const submissions = await req('/api/submissions');
for (const item of (submissions.body.items || [])) {
  if (/deploy|join@example\.com|shape@example\.com/i.test(JSON.stringify(item))) {
    const done = await req('/api/submissions/' + item.id, { method: 'DELETE', csrf });
    if (done.status === 200) removed.submissions += 1;
  }
}
console.log('cleaned:', JSON.stringify(removed));
console.log('left — registrations:', (await req('/api/registrations')).body.count, '· events:', ((await req('/api/events')).body.items || []).length, '· gallery:', ((await req('/api/gallery')).body.items || []).length, '· submissions:', ((await req('/api/submissions')).body.items || []).length);
