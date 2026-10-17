/** Real Chromium checks for the HD-reference story and butterfly hand-offs.
 * Run npm run preview first. Optional MT_BASE_URL / CHROME_EXECUTABLE_PATH.
 * Requires the same optional playwright-core / @sparticuz/chromium packages as
 * test-motion-browser.mjs. API writes and native uploads are intercepted; this
 * audit never adds a member, registration or file to the club's live store.
 */
import { chromium } from 'playwright-core';
import c from '@sparticuz/chromium';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const BASE = process.env.MT_BASE_URL || 'http://localhost:4173';
const OUT = process.env.MT_SCREENSHOT_DIR;
const GROUP = process.env.MT_STORY_GROUP || 'all';
const group = name => GROUP === 'all' || GROUP === name;
if (OUT) fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME_EXECUTABLE_PATH || await c.executablePath(), args: c.args.filter(a => a !== '--single-process') });
let checks = 0;
function ok(value, message) { assert.ok(value, message); checks++; console.log('PASS', message); }
async function at(p, progress) {
  await p.evaluate(progress => {
    const track = document.querySelector('.story-track');
    scrollTo({ top: track.getBoundingClientRect().top + scrollY + (track.offsetHeight - innerHeight) * progress, behavior: 'instant' });
  }, progress);
  await p.waitForTimeout(180);
}
async function pixels(p) {
  return p.evaluate(() => {
    const c = document.querySelector('.story-canvas'), g = c.getContext('2d'), data = g.getImageData(0, 0, c.width, c.height).data;
    let white = 0, opaque = 0, signature = 0;
    for (let i = 0; i < data.length; i += 256) {
      if (data[i + 3] > 10) opaque++;
      if (data[i] > 150 && data[i + 1] > 150 && data[i + 2] > 125 && data[i + 3] > 100) white++;
      signature = (signature + data[i] * 3 + data[i + 1] * 7 + data[i + 2] * 11) % 1000000007;
    }
    return { white, opaque, signature };
  });
}
try {
  for (const width of group('story') ? [320, 390, 768, 1440] : []) {
    const p = await b.newPage({ viewport: { width, height: 844 } });
    const errors = []; p.on('pageerror', error => errors.push(error.message));
    await p.goto(BASE + '/#top', { waitUntil: 'load' });
    ok(await p.locator('.mind-story.story-enhanced').count(), `${width}: inlined head script initialises after the DOM`);
    await at(p, .12);
    await p.waitForFunction(() => document.querySelector('.story-canvas').getContext('2d').getImageData(1, 1, 1, 1).data[0] > 0);
    await p.waitForTimeout(300);
    const y = await p.locator('.story-shard').nth(1).evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
    const glass = await pixels(p);
    ok(await p.locator('.mind-story').getAttribute('data-story-phase') === 'glass', `${width}: hand and glass phase responds to scroll`);
    await at(p, .405); const bill = await pixels(p);
    ok(bill.white > 40 && bill.signature !== glass.signature, `${width}: Freud artwork is actually drawn, not a placeholder`);
    await at(p, .545); const burned = await pixels(p);
    ok(burned.white < bill.white * .35, `${width}: scroll burns away the note's pixels`);
    await at(p, .66);
    ok(await p.locator('.story-type > span').evaluateAll(els => els.every(el => +getComputedStyle(el).opacity > .98)), `${width}: the complete club/human statement is readable`);
    await at(p, .735); const paper = await pixels(p);
    ok(paper.white > 90 && await p.locator('.mind-story').getAttribute('data-story-phase') === 'newspaper', `${width}: illustrated psychology newspapers render`);
    await at(p, .84); const torn = await pixels(p);
    ok(torn.signature !== paper.signature, `${width}: torn pieces change positions and curl in perspective`);
    await at(p, .999); const herd = await pixels(p);
    ok(herd.opaque === 0 && await p.locator('#heroVideo').count() === 1, `${width}: illustration clears completely to reveal the original herd`);
    await at(p, .12);
    const restored = await p.locator('.story-shard').nth(1).evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
    ok(Math.abs(y - restored) < 2, `${width}: reverse scrolling restores the glass choreography`);
    ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}: no horizontal page overflow`);
    if (OUT) await p.screenshot({ path: `${OUT}/story-${width}.png` });
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.waitForTimeout(100);
    ok(!await p.locator('.mind-story.story-enhanced').count() && await p.locator('.story-shard').first().isVisible(), `${width}: changing to reduced motion restores a readable static story`);
    ok(await p.locator('.story-track').evaluate(el => el.offsetHeight < innerHeight * 4), `${width}: static mode has no six-screen empty scroll trap`);
    ok(errors.length === 0, `${width}: no JavaScript errors: ${errors.join('; ')}`);
    await p.close();
  }
  // Asset and platform failures must retain real HTML, rather than a black stage.
  for (const mode of group('fallback') ? ['404', 'corrupt', 'held', 'no-canvas', 'no-observer', 'no-js'] : []) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled: mode !== 'no-js' });
    const errors = []; p.on('pageerror', e => errors.push(e.message));
    if (mode === 'no-canvas') await p.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
    if (mode === 'no-observer') await p.addInitScript(() => { delete window.IntersectionObserver; });
    if (['404', 'corrupt', 'held'].includes(mode)) await p.route('**/assets/story/hand.webp', route => mode === 'held' ? new Promise(() => {}) : route.fulfill({ status: mode === '404' ? 404 : 200, contentType: 'image/webp', body: 'not-an-image' }));
    await p.goto(BASE + '/#top', { waitUntil: 'load' });
    if (mode === 'no-observer') {
      await at(p, .42); await p.waitForTimeout(700);
      ok((await pixels(p)).white > 40, 'no observer: scroll-only loading and rendering work');
    } else {
      if (['404', 'corrupt', 'held'].includes(mode)) {
        await at(p, .12);
        await p.waitForFunction(() => !document.querySelector('.mind-story').classList.contains('story-enhanced'), null, { timeout: 11000 });
      }
      ok(!await p.locator('.mind-story.story-enhanced').count(), `${mode}: enhancement fails open to real HTML`);
      ok(await p.locator('.story-track').evaluate(el => el.offsetHeight < innerHeight * 4), `${mode}: no dead scroll runway`);
    }
    ok(errors.length === 0, `${mode}: no uncaught script errors`);
    await p.close();
  }
  for (const [width, route, formSelector, api] of group('forms') ? [
    [390, '/#join', '#membershipForm', '/api/submissions'],
    [1440, '/#join', '#membershipForm', '/api/submissions'],
    [390, '/register?event=event-welcome-circle', '.register-form', '/api/registrations'],
    [1440, '/register?event=event-welcome-circle', '.register-form', '/api/registrations']
  ] : []) {
    const p = await b.newPage({ viewport: { width, height: 844 } });
    const calls = [], timeline = [], errors = [];
    p.on('pageerror', e => errors.push(e.message));
    await p.exposeFunction('auditHit', () => timeline.push('hit'));
    await p.addInitScript(() => document.addEventListener('mt:butterfly-hit', () => window.auditHit()));
    let fail = false;
    await p.route('**' + api, async route => {
      timeline.push('post'); calls.push(route.request().postDataJSON());
      await route.fulfill({ status: fail ? 422 : 201, contentType: 'application/json', body: JSON.stringify(fail ? { error: 'Audit retry message' } : { message: 'Audit received' }) });
    });
    await p.goto(BASE + route, { waitUntil: 'load' });
    const form = p.locator(formSelector), name = form.locator('[name="name"]');
    await name.fill('Riya 123'); await form.locator('[name="email"]').fill('riya@example.com'); await form.locator('[name="phone"]').fill('9876543210');
    await form.evaluate(form => form.requestSubmit()); await p.waitForTimeout(650);
    ok(calls.length === 0, `${width}: invalid names never submit during a butterfly dive`);
    await name.fill('Riya Sharma'); await name.focus(); await p.waitForTimeout(700);
    const perch = await p.evaluate(selector => {
      const field = document.querySelector(selector + ' [name="name"]').getBoundingClientRect();
      const butterfly = document.querySelector('.butterfly-flight').getBoundingClientRect();
      return { right: butterfly.right, left: butterfly.left, field: field.left, cy: butterfly.y + butterfly.height / 2, fy: field.y + field.height / 2 };
    }, formSelector);
    ok(perch.left >= -1 && perch.right <= perch.field + 1 && Math.abs(perch.cy - perch.fy) < 8, `${width}: photographic companion perches LEFT of the field without covering it`);
    await name.press('Backspace');
    ok(await p.locator('.nav-butterfly.butterfly-typing').count(), `${width}: backspace triggers wing flaps`);
    await name.fill('Riya Sharma');
    const before = await p.locator('.nav-butterfly').evaluate(el => el.style.transform);
    await form.locator('[name="email"]').focus(); await p.waitForTimeout(90);
    const during = await p.locator('.nav-butterfly').evaluate(el => el.style.transform);
    ok(before !== during && await p.locator('.nav-butterfly.butterfly-flying').count(), `${width}: the companion flies between fields`);
    await p.waitForTimeout(600); timeline.length = 0;
    await form.evaluate(form => { form.requestSubmit(); form.requestSubmit(); });
    await p.waitForTimeout(900);
    ok(calls.length === 1 && timeline.indexOf('hit') >= 0 && timeline.indexOf('hit') < timeline.indexOf('post'), `${width}: one validated submission happens AFTER the button hit`);
    ok(calls[0].name === 'Riya Sharma' && calls[0].email === 'riya@example.com' && calls[0].phone === '9876543210', `${width}: payload and event-specific fields survive the flight`);
    ok(!await form.locator('button[type="submit"]').isDisabled() && (await form.locator('.form-status').textContent()).includes('Audit received'), `${width}: success feedback and button recovery remain intact`);
    await name.fill('Riya Sharma'); await form.locator('[name="email"]').fill('riya@example.com'); await form.locator('[name="phone"]').fill('9876543210'); fail = true;
    await form.evaluate(form => form.requestSubmit()); await p.waitForTimeout(900);
    ok(!await form.locator('button[type="submit"]').isDisabled() && (await form.locator('.form-status').textContent()).includes('Audit retry message'), `${width}: errors leave the form ready to retry`);
    if (formSelector === '#membershipForm') {
      await name.focus(); await p.waitForTimeout(650);
      await at(p, .42); await p.waitForTimeout(3500);
      ok(await p.locator('.nav-butterfly.butterfly-away').count(), `${width}: a focused but offscreen field cannot hold the butterfly over a dark chapter`);
      await name.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' })); await p.waitForTimeout(750);
      ok(!await p.locator('.nav-butterfly.butterfly-away').count(), `${width}: returning to the still-focused field restores its companion`);
    }
    ok(errors.length === 0, `${width}: no companion/form errors: ${errors.join('; ')}`);
    if (OUT) await p.screenshot({ path: `${OUT}/form-companion-${width}.png` });
    await p.close();
  }
  for (const width of group('navigation') ? [390, 1440] : []) {
    const p = await b.newPage({ viewport: { width, height: 844 } });
    const timeline = [];
    await p.exposeFunction('auditHit', () => timeline.push('hit'));
    await p.addInitScript(() => document.addEventListener('mt:butterfly-hit', () => window.auditHit()));
    p.on('request', req => { if (req.isNavigationRequest() && new URL(req.url()).pathname === '/calendar') timeline.push('navigate'); });
    await p.goto(BASE + '/#top', { waitUntil: 'load' });
    if (width < 1100) { await p.locator('#menuButton').click(); await p.waitForFunction(() => document.querySelector('#menuButton').getAttribute('aria-expanded') === 'true'); }
    timeline.length = 0;
    await Promise.all([p.waitForURL('**/calendar'), p.locator('#navLinks a[href="/calendar"]').click()]);
    ok(timeline.indexOf('hit') >= 0 && timeline.indexOf('hit') < timeline.indexOf('navigate'), `${width}: Calendar navigation waits for the butterfly hit`);
    const untouched = await p.evaluate(() => {
      const results = [];
      const configurations = [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { button: 1 }, { target: '_blank' }, { download: 'x' }, { href: 'https://example.org/' }];
      for (const config of configurations) {
        const a = document.createElement('a'); a.href = '/calendar'; a.textContent = 'Native semantics';
        for (const key of ['target', 'download', 'href']) if (key in config) a.setAttribute(key, config[key]);
        a.addEventListener('click', event => { results.push(!event.defaultPrevented); event.preventDefault(); });
        document.body.append(a); a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...config })); a.remove();
      }
      return results;
    });
    ok(untouched.length === 7 && untouched.every(Boolean), `${width}: modifier, new-tab, download and external-link semantics stay native`);
    if (width < 1100) { await p.locator('#menuButton').click(); await p.waitForFunction(() => document.querySelector('#menuButton').getAttribute('aria-expanded') === 'true'); }
    await Promise.all([p.waitForURL('**/#join'), p.locator('#navLinks a[href="/#join"]').click()]);
    await p.waitForTimeout(500);
    ok(await p.locator('#membershipForm').evaluate(el => Math.abs(el.getBoundingClientRect().top) < 160) && await p.locator('#splash').evaluate(el => el.hidden), `${width}: Calendar Join still lands at membership without the splash`);
    await p.close();
  }
  for (const mode of group('navigation') ? ['stopped-clock', 'hidden-tab', 'reduced'] : []) {
    const p = await b.newPage({ viewport: { width: 1440, height: 844 }, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
    if (mode === 'stopped-clock') await p.addInitScript(() => { window.requestAnimationFrame = () => 1; });
    if (mode === 'hidden-tab') await p.addInitScript(() => { Object.defineProperty(document, 'hidden', { get: () => true }); });
    let hits = 0;
    await p.exposeFunction('auditHit', () => hits++);
    await p.addInitScript(() => document.addEventListener('mt:butterfly-hit', () => window.auditHit()));
    await p.goto(BASE + '/calendar', { waitUntil: 'load' });
    await Promise.all([p.waitForURL('**/gallery', { timeout: 5000 }), p.locator('#navLinks a[href="/gallery"]').click()]);
    ok(new URL(p.url()).pathname === '/gallery', `${mode}: a stalled or disabled animation cannot block navigation`);
    if (mode === 'reduced') ok(hits === 0, 'reduced: navigation does not wait for an animated dive');
    await p.close();
  }
  // Exercise a real native multipart form with the production handler. The
  // fixture exists only inside this browser route, and the endpoint is mocked.
  if (group('upload')) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    const html = await (await p.request.get(BASE + '/#top')).text();
    const fixture = '<form class="proof-form" action="/audit-proof" method="post" enctype="multipart/form-data" style="position:relative;background:white;padding:40px"><input name="csrf" type="hidden" value="audit-only"><input type="file" name="proof" required><button type="submit">Upload proof</button></form>';
    await p.route('**/audit-fixture', route => route.fulfill({ contentType: 'text/html', body: html.replace('<script type="application/json" id="mt-bootstrap">', fixture + '<script type="application/json" id="mt-bootstrap">') }));
    const requests = [], hits = [];
    await p.exposeFunction('auditHit', () => hits.push('hit'));
    await p.addInitScript(() => document.addEventListener('mt:butterfly-hit', () => window.auditHit()));
    await p.route('**/audit-proof', async route => { requests.push({ body: route.request().postData(), type: route.request().headers()['content-type'], hit: hits.length }); await route.fulfill({ contentType: 'text/html', body: 'Audit upload received' }); });
    await p.goto(BASE + '/audit-fixture#top', { waitUntil: 'load' });
    await p.locator('.proof-form button').click(); await p.waitForTimeout(650);
    ok(requests.length === 0 && hits.length === 0, 'native upload: missing-file validation happens before any dive');
    await p.locator('.proof-form input[type="file"]').setInputFiles({ name: 'audit-proof.png', mimeType: 'image/png', buffer: Buffer.from('audit-only-file') });
    await Promise.all([p.waitForURL('**/audit-proof'), p.locator('.proof-form button').click()]);
    ok(requests.length === 1 && requests[0].hit > 0 && requests[0].type.includes('multipart/form-data'), 'native upload: exactly one multipart POST follows the hit');
    ok(requests[0].body.includes('audit-only') && requests[0].body.includes('audit-proof.png') && requests[0].body.includes('audit-only-file'), 'native upload: CSRF, filename and file bytes are preserved');
    await p.close();
  }
  console.log('TOTAL', checks);
} finally { await b.close(); }
