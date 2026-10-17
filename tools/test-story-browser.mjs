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
import {screenshotPixels} from './png-pixels.mjs';
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
  if(await p.locator('.story-enhanced').count())await p.waitForFunction(progress=>Math.abs(+document.querySelector('.mind-story').style.getPropertyValue('--story-progress')-progress)<.003,progress,{timeout:25000});
}
async function pixels(p) {return screenshotPixels(await p.screenshot({timeout:60000}));}
async function ready(p){await p.waitForFunction(()=>document.querySelector('.mind-story').dataset.storyRenderer==='webgl',null,{timeout:18000});await p.waitForFunction(()=>+document.querySelector('.mind-story').dataset.renderFrame>0);}
try {
  if(group('audio')){
    const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.addInitScript(()=>{
      window.__audioTrace=[];window.__permissionRequests=0;
      const AC=window.AudioContext||window.webkitAudioContext,create=AC.prototype.createBufferSource;
      AC.prototype.createBufferSource=function(){const source=create.call(this),start=source.start,stop=source.stop;source.start=function(...args){window.__audioTrace.push({kind:'start',loop:this.loop,duration:this.buffer&&this.buffer.duration});return start.apply(this,args);};source.stop=function(...args){window.__audioTrace.push({kind:'stop',loop:this.loop});return stop.apply(this,args);};return source;};
      DeviceOrientationEvent.requestPermission=()=>{window.__permissionRequests++;return Promise.resolve('granted');};
    });
    await p.goto(BASE+'/',{waitUntil:'load'});await p.locator('#soundButton').click();
    await p.waitForFunction(()=>window.__audioTrace.some(e=>e.kind==='start'&&!e.loop&&e.duration>4&&e.duration<6));
    ok(await p.locator('#splash').isVisible(),'sound gesture starts galloping while the splash still runs; never skips it');
    await p.waitForFunction(()=>document.getElementById('splash').hidden,null,{timeout:11000});
    ok(await p.evaluate(()=>window.__audioTrace.some(e=>e.kind==='stop'&&!e.loop)),'intro exit stops its gallop');
    await at(p,.09);await ready(p);await p.waitForTimeout(800);
    ok(await p.evaluate(()=>window.__audioTrace.some(e=>e.kind==='start'&&!e.loop&&e.duration>2&&e.duration<3)),'impact triggers the decoded glass effect, not a later arbitrary cue');
    await at(p,.16);await p.waitForFunction(()=>window.__audioTrace.some(e=>e.kind==='start'&&e.loop));
    ok(await p.locator('#soundButton').getAttribute('data-chapter-audio')==='on','foreboding loop plays only in the active chapter');
    const y=await p.locator('.mind-story').getAttribute('data-hand-yaw');await p.locator('[data-enable-tilt]').click();
    ok(await p.evaluate(()=>window.__permissionRequests===1),'phone tilt permission is requested by the explicit button gesture');
    await p.evaluate(()=>{const send=(gamma,beta)=>{const e=new Event('deviceorientation');Object.defineProperties(e,{gamma:{value:gamma},beta:{value:beta}});dispatchEvent(e);};send(0,0);send(25,0);});await p.waitForTimeout(1000);
    ok(await p.locator('.mind-story').getAttribute('data-hand-yaw')!==y&&+(await p.locator('.mind-story').getAttribute('data-glass-x'))>0,'moving the phone right moves the articulated hand and glass right');
    const overlap=await p.evaluate(()=>{const a=document.querySelector('[data-enable-tilt]').getBoundingClientRect(),b=document.querySelector('.to-top')?.getBoundingClientRect();return b&&a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;});
    ok(!overlap,'tilt control does not collide with the return-to-top button');
    await p.locator('[data-enable-tilt]').click();ok(await p.evaluate(()=>window.__permissionRequests===1)&&await p.locator('[data-enable-tilt]').getAttribute('aria-pressed')==='false','turning tilt off never requests permission again');
    await p.evaluate(()=>{DeviceOrientationEvent.requestPermission=()=>Promise.resolve('denied');});await p.locator('[data-enable-tilt]').click();ok(await p.locator('[data-enable-tilt]').textContent()==='Tilt not allowed','denied sensor permission leaves scroll/pointer fallback operational');
    await p.locator('#soundButton').click();ok(await p.locator('#soundButton').getAttribute('data-sound')==='off','mute acts directly, without a butterfly delay');
    await p.locator('#soundButton').click();await p.waitForTimeout(100);ok(await p.locator('#soundButton').getAttribute('data-sound')==='on','visitor can explicitly re-enable sound');
    await at(p,.95);await at(p,.999);await p.waitForTimeout(100);
    ok(await p.locator('#soundButton').getAttribute('data-chapter-audio')==='off'&&await p.evaluate(()=>window.__audioTrace.filter(e=>e.kind==='stop'&&e.loop).length>=2),'chapter exit silences/stops the score, including a rapid exit during its fade');
    const hoofCount=await p.evaluate(()=>window.__audioTrace.filter(e=>e.kind==='start'&&!e.loop&&e.duration>4).length);await p.locator('#join').evaluate(e=>e.scrollIntoView({behavior:'instant'}));await p.waitForTimeout(400);
    ok(await p.evaluate(()=>window.__audioTrace.filter(e=>e.kind==='start'&&!e.loop&&e.duration>4).length)===hoofCount,'no gallop or other late intro effect follows the chapter');
    ok(!errors.length,'audio and tilt have no uncaught errors: '+errors.join('; '));await p.close();
  }
  for (const width of group('story') ? [320,390,768,1440] : []) {
    const p=await b.newPage({viewport:{width,height:844}}),errors=[];
    p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/shader|WebGLProgram/.test(m.text()))errors.push(m.text());});
    await p.goto(BASE+'/#top',{waitUntil:'load'});
    ok(await p.locator('.story-pending').count(),`${width}: DOM-ready boot reserves the chapter without loading WebGL into the hero`);
    await at(p,.09);await ready(p);await p.waitForTimeout(900);const glass=await pixels(p);
    const initial=await p.locator('.mind-story').evaluate(r=>({...r.dataset}));
    ok(initial.storyPhase==='glass'&&glass.dark>glass.samples*.1&&glass.white>20,`${width}: hand, curtain and thick glass actually render in WebGL`);
    await at(p,.16);const forward=await p.locator('.mind-story').evaluate(r=>({...r.dataset}));
    ok(+forward.cameraZ<+initial.cameraZ&&forward.factY===initial.factY,`${width}: camera advances through stationary-height facts, not upward-scrolling panels`);
    const bounds=await p.locator('.story-stage').evaluate(el=>{const r=el.getBoundingClientRect(),c=el.querySelector('canvas').getBoundingClientRect();return {top:r.top,height:r.height,screen:innerHeight,canvasTop:c.top,canvasBottom:c.bottom};});
    ok(Math.abs(bounds.top)<2&&Math.abs(bounds.height-bounds.screen)<2&&bounds.canvasTop<=0&&bounds.canvasBottom>=bounds.screen,`${width}: renderer covers the complete viewport without a strip`);
    await at(p,.42);const bill=await pixels(p);
    ok(bill.white>60&&bill.signature!==glass.signature&&await p.locator('.mind-story').getAttribute('data-bill-count')==='4',`${width}: four three-dimensional Freud dollar props are present`);
    await at(p,.565);const burnt=await pixels(p);ok(burnt.white<bill.white*.35,`${width}: irregular fire consumes the notes`);
    await at(p,.66);ok(await p.locator('.story-type > span').evaluateAll(es=>es.every(e=>+getComputedStyle(e).opacity>.98)),`${width}: the human statement is readable`);
    await at(p,.78);const paper=await pixels(p);await at(p,.88);const strips=await pixels(p);
    ok(paper.white>60&&paper.dark>paper.samples*.2,`${width}: flooding pages retain a visible deep tunnel`);
    ok(strips.signature!==paper.signature&&await p.locator('.mind-story').getAttribute('data-strip-count')==='16',`${width}: sheets peel into long wavering strips, not polygon confetti`);
    if(OUT)await p.screenshot({path:OUT+`/story-3d-${width}.png`,timeout:60000});
    await at(p,.999);ok(await p.locator('.story-canvas').evaluate(c=>+getComputedStyle(c).opacity)<.001&&await p.locator('#heroVideo').count()===1,`${width}: scene becomes transparent over the original herd`);
    await at(p,.09);ok(await p.locator('.mind-story').getAttribute('data-camera-z')===initial.cameraZ,`${width}: reverse scrolling restores the depth choreography`);
    ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}: no horizontal overflow`);
    await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(150);
    ok(!await p.locator('.story-enhanced').count()&&await p.locator('.story-shard').first().isVisible(),`${width}: changing motion preference restores actual readable HTML`);
    ok(await p.locator('.story-track').evaluate(e=>e.offsetHeight<innerHeight*4),`${width}: static mode has no empty runway`);
    ok(!errors.length,`${width}: no JavaScript or shader errors: ${errors.join('; ')}`);await p.close();
  }
  for (const mode of group('fallback') ? ['404','corrupt','held','engine-404','no-canvas','no-observer','no-js','save-data'] : []) {
    const p=await b.newPage({viewport:{width:390,height:844},javaScriptEnabled:mode!=='no-js'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
    if(mode==='no-canvas')await p.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=()=>null;});
    if(mode==='no-observer')await p.addInitScript(()=>{delete window.IntersectionObserver;});
    if(mode==='save-data')await p.addInitScript(()=>{Object.defineProperty(navigator,'connection',{value:{saveData:true}});});
    if(['404','corrupt','held'].includes(mode))await p.route('**/assets/story/hand-rig.glb',route=>mode==='held'?new Promise(()=>{}):route.fulfill({status:mode==='404'?404:200,contentType:'model/gltf-binary',body:'invalid-model'}));
    if(mode==='engine-404')await p.route('**/assets/vendor/story-3d.js',route=>route.fulfill({status:404,body:''}));
    await p.goto(BASE+'/#top',{waitUntil:'load'});
    if(mode==='no-observer'){await at(p,.42);await ready(p);ok((await pixels(p)).white>40,'no observer: scroll-only scene loading and real rendering work');}
    else{if(!['no-js','save-data'].includes(mode)){await at(p,.12);await p.waitForFunction(()=>document.querySelector('.mind-story').dataset.storyRenderer==='static',null,{timeout:15000});}
      ok(!await p.locator('.story-enhanced,.story-pending').count(),`${mode}: failure opens into real HTML`);
      ok(await p.locator('.story-track').evaluate(e=>e.offsetHeight<innerHeight*4),`${mode}: no dead scroll runway`);}
    ok(!errors.length,`${mode}: no uncaught errors`);await p.close();
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
      await at(p, .42); await ready(p); await p.waitForFunction(()=>document.querySelector('.nav-butterfly').classList.contains('butterfly-away'),null,{timeout:15000});
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
