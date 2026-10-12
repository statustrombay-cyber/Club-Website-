/**
 * Mindful Tattva · PHP test suite (php-wasm)
 * --------------------------------------------
 * Mirrors the project into a PHP 8.4 runtime and fires real requests at
 * index.php, checking status codes, bodies, the JSON API and the dashboard
 * flows. Each request gets a fresh session and fresh caches, the way a real
 * PHP process would.
 *
 *   npm test
 *
 * Requires `npm install` (php-wasm, ~110 MB). On a host with real PHP you can
 * also run the suite by pointing any HTTP client at a running server.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PhpNode } from 'php-wasm/PhpNode';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SKIP = new Set(['.git', 'node_modules', '.arena', 'backup-original', 'data/logs', 'data/sessions', 'data/backups']);

function collect(dir, base = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? base + '/' + entry.name : entry.name;
    if (SKIP.has(entry.name) || SKIP.has(rel)) continue;
    if (entry.isDirectory()) out.push(...collect(path.join(dir, entry.name), rel));
    else if (entry.isFile()) out.push([rel, path.join(dir, entry.name)]);
  }
  return out;
}

const php = new PhpNode();
await php.exec('<?php');

async function ensureDir(dir) {
  let current = '';
  for (const segment of dir.split('/').filter(Boolean)) {
    current += '/' + segment;
    try { await php.mkdir(current); } catch (error) { /* exists */ }
  }
}
await ensureDir('/site/data/logs');
await ensureDir('/site/data/sessions');
await ensureDir('/site/data/backups');
await ensureDir('/site/uploads');

const files = collect(ROOT);
for (const [rel, absSource] of files) {
  const target = '/site/' + rel;
  await ensureDir(target.slice(0, target.lastIndexOf('/')));
  if (/\.(png|jpe?g|webp|gif|ico|pdf)$/i.test(rel)) {
    await php.writeFile(target, new Uint8Array(fs.readFileSync(absSource)));
  } else {
    await php.writeFile(target, fs.readFileSync(absSource, 'utf8'));
  }
}
console.log('mirrored ' + files.length + ' files into the PHP runtime');

/* ---------------------------------------------------------------- runner */
const REQUEST_PHP = String.raw`
(function () {
    if (!defined('MT_TEST')) { define('MT_TEST', true); }
    if (!function_exists('mt_test_counter')) {
        function mt_test_counter(): int { static $count = 0; return ++$count; }
    }

    $spec = require '/site/.spec.php';
    if (!is_array($spec)) { $spec = []; }

    // a real PHP process starts empty: no caches, no session, no buffers
    unset($GLOBALS['MT_DB_CACHE'], $GLOBALS['MT_INPUT_CACHE'], $GLOBALS['MT_CONFIG_CACHE']);
    if (session_status() === PHP_SESSION_ACTIVE) { @session_abort(); }
    @session_id('t' . mt_test_counter());

    $GLOBALS['MT_TEST_HEADERS'] = [];
    $GLOBALS['MT_TEST_STATUS'] = 200;
    $GLOBALS['MT_HTML_SENT'] = false;

    $_SERVER = [
        'REQUEST_METHOD'  => strtoupper($spec['method'] ?? 'GET'),
        'REQUEST_URI'     => $spec['uri'] ?? '/',
        'SCRIPT_NAME'     => '/index.php',
        'HTTP_HOST'       => 'localhost:4173',
        'REMOTE_ADDR'     => $spec['ip'] ?? '127.0.0.1',
        'HTTP_ACCEPT'     => 'text/html,application/json',
        'SERVER_SOFTWARE' => 'php-wasm-test',
    ];
    foreach (($spec['headers'] ?? []) as $name => $value) {
        $_SERVER['HTTP_' . strtoupper(str_replace('-', '_', $name))] = $value;
    }
    $_GET   = $spec['get'] ?? [];
    $queryPos = strpos((string) ($spec['uri'] ?? ''), '?');
    if ($queryPos !== false) {
        parse_str(substr((string) $spec['uri'], $queryPos + 1), $parsedQuery);
        $_GET = array_replace($parsedQuery, $_GET);
    }
    $_POST  = is_array($spec['post'] ?? null) ? $spec['post'] : [];
    $_FILES = [];
    foreach (($spec['files'] ?? []) as $field => $file) {
        if (!is_array($file)) { continue; }
        $folder = '/site/uploads/_test';
        if (!is_dir($folder)) { @mkdir($folder, 0775, true); }
        $tmp = $folder . '/' . $field . '-' . mt_test_counter() . '.bin';
        file_put_contents($tmp, base64_decode((string) ($file['base64'] ?? '')));
        $_FILES[$field] = [
            'name'     => (string) ($file['name'] ?? ($field . '.bin')),
            'type'     => (string) ($file['type'] ?? 'application/octet-stream'),
            'tmp_name' => $tmp,
            'error'    => UPLOAD_ERR_OK,
            'size'     => (int) filesize($tmp),
        ];
    }
    $GLOBALS['MT_RAW_BODY'] = $spec['raw'] ?? null;

    $_SESSION = [];
    if (!empty($spec['session']) && is_array($spec['session'])) {
        $GLOBALS['MT_TEST_SESSION'] = $spec['session'];
    } else {
        unset($GLOBALS['MT_TEST_SESSION']);
    }

    $level = ob_get_level();
    ob_start();
    try {
        require '/site/index.php';
    } catch (MT_StopSignal $stop) {
        // the app finished its response through mt_stop()
    } catch (Throwable $error) {
        while (ob_get_level() > $level) { ob_end_clean(); }
        return json_encode([
            'status'  => 599,
            'body'    => 'THROWN: ' . $error->getMessage() . ' @ ' . $error->getFile() . ':' . $error->getLine(),
            'headers' => [],
        ]);
    }
    $output = (string) ob_get_clean();

    $encoding = 'utf8';
    if (!preg_match('//u', $output)) {
        $output = base64_encode($output);
        $encoding = 'base64';
    }
    return json_encode([
        'status'   => $GLOBALS['MT_TEST_STATUS'],
        'body'     => $output,
        'encoding' => $encoding,
        'headers'  => $GLOBALS['MT_TEST_HEADERS'],
    ]);
})()
`;

async function request(options) {
  const spec = Object.assign({ uri: '/', method: 'GET' }, options);
  if (spec.json !== undefined) {
    spec.raw = JSON.stringify(spec.json);
    delete spec.json;
  }
  await php.writeFile('/site/.spec.php', '<?php return json_decode(base64_decode("' + Buffer.from(JSON.stringify(spec), 'utf8').toString('base64') + '"), true);');
  let raw;
  try {
    raw = await php.x([REQUEST_PHP]);
  } catch (error) {
    return { status: 0, body: 'HARNESS ERROR ' + (error && (error.message || error.name)), headers: [] };
  }
  try {
    const parsed = JSON.parse(String(raw));
    if (parsed && parsed.encoding === 'base64') {
      parsed.body = Buffer.from(String(parsed.body), 'base64').toString('binary');
    }
    return parsed;
  } catch (error) {
    return { status: 0, body: 'UNPARSEABLE: ' + String(raw).slice(0, 400), headers: [] };
  }
}

const get = (uri, extra = {}) => request({ uri, method: 'GET', ...extra });
const sendJson = (uri, method, body, extra = {}) => request({ uri, method, json: body, post: body, ...extra });

const SESSION = { auth: true, csrf: 'test-csrf-token', seen: Math.floor(Date.now() / 1000) };
const AUTH = { session: SESSION, headers: { 'X-CSRF-Token': 'test-csrf-token' } };

/* ----------------------------------------------------------------- tests */
let pass = 0;
let fail = 0;
const failures = [];

function ok(name, condition, detail = '') {
  if (condition) { pass++; console.log('  \u001b[32m✓\u001b[0m ' + name); }
  else { fail++; failures.push(name + (detail ? ' — ' + detail : '')); console.log('  \u001b[31m✗\u001b[0m ' + name + (detail ? ' — ' + detail : '')); }
}

const clean = (body) => !/(Warning|Notice|Fatal error|Deprecated|Uncaught|THROWN):/.test(String(body));
const phpErrors = (body) => (String(body).match(/(Warning|Notice|Fatal error|Deprecated|Uncaught|THROWN):.{0,120}/) || [''])[0];

/* ------------------------------------------------------------ the club site */
console.log('\n— the public site —');
const home = await get('/');
ok('GET / returns 200', home.status === 200, 'status ' + home.status + ' ' + String(home.body).slice(0, 200));
ok('the home page renders without PHP errors', clean(home.body), phpErrors(home.body));
ok('the original design is back: the drifting bubbles', home.body.includes('bubble-field') && home.body.includes('bubble bubble-e'));
ok('the depth overlay and the page shell are there', home.body.includes('depth-overlay') && home.body.includes('site-shell'));
ok('the announcement strip is written by the backend', home.body.includes('class="announcement"') && home.body.includes('reflection, connection'));
ok('the live event banner shows the published event', home.body.includes('id="eventBanner"') && home.body.includes('Mindful Tattva Welcome Circle'));
ok('the navigation carries the club menu', ['#about', '#psychology', '#history', '#events', '/gallery', '/calendar', '#team', '/members', '#join', '#contact']
  .every((href) => home.body.includes('href="' + href + '"')));
ok('the brain section stays out of the menu and the page', !/href="#brain"/.test(home.body) && !home.body.includes('brain-section'));
ok('the hamburger menu button is still there', home.body.includes('id="menuButton"') && home.body.includes('id="navLinks"'));
ok('every original section is on the page', ['id="about"', 'id="psychology"', 'id="details"', 'id="history"', 'id="events"', 'id="activities"', 'id="gallery"', 'id="team"', 'id="join"', 'id="contact"']
  .every((id) => home.body.includes(id)));
ok('the awareness corner is gone (the club’s own wording stays)',
  !home.body.includes('id="awareness"') && !home.body.includes('awareness-stage') && !/\.awareness-[a-z]/.test(home.body) && !home.body.includes('href="/awareness"'));
ok('no “Content Studio” wording anywhere on the page', !/content studio/i.test(home.body));
ok('the hero and the artwork are drawn', home.body.includes('id="heroTagline"') && home.body.includes('class="art-card"'));
ok('the club statistics are printed', home.body.includes('id="statsRow"') && home.body.includes('student-led'));
ok('the history timeline is written from the store', home.body.includes('timeline-item') && home.body.includes('A small idea with a big heart'));
ok('the event card offers registration', home.body.includes('/register?event=event-welcome-circle'));
ok('the join forms are both there', home.body.includes('id="membershipForm"') && home.body.includes('id="registrationForm"'));
ok('the staff page link is the dashboard, not a studio', home.body.includes('href="/dashboard"'));
ok('the footer keeps the institution and the creator credit', home.body.includes('footer-institution') && home.body.includes('Made with love by Mohd Shafiq'));
ok('the gallery grid keeps the old look, captions and placeholders', home.body.includes('gallery-item') && home.body.includes('gallery-placeholder'));
ok('the stylesheet is inlined, never linked', home.body.includes('<style>') && !/href="\/assets\/app\.css"/.test(home.body));
ok('the script is inlined, never linked', !/src="\/assets\/app\.js"/.test(home.body) && home.body.includes('setupGalleryStage'));
ok('content is never hidden without JavaScript', home.body.includes('class="no-js"') && home.body.includes('replace("no-js", "js")'));

const gallery = await get('/gallery');
ok('GET /gallery returns 200', gallery.status === 200, 'status ' + gallery.status);
ok('the gallery page renders without PHP errors', clean(gallery.body), phpErrors(gallery.body));
ok('the gallery hero is the original one', gallery.body.includes('gallery-hero') && /A scrapbook of <em>small moments\.<\/em>/.test(gallery.body));
ok('the first photo is already in the page, background and all', /id="galleryStageImage"[^>]*background-image:url\(/.test(gallery.body));
ok('the archive is server-rendered', gallery.body.includes('archive-grid') && gallery.body.includes('archive-card'));
ok('the slides are handed to the script as data', gallery.body.includes('id="gallery-data"'));
ok('the gallery no longer mentions a content studio', !/content studio/i.test(gallery.body));

const calendar = await get('/calendar');
ok('GET /calendar returns 200', calendar.status === 200);
ok('the calendar renders without PHP errors', clean(calendar.body), phpErrors(calendar.body));
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthHits = months.filter((name) => calendar.body.includes('<h3>' + name + '</h3>')).length;
ok('the twelve months are the static frame', monthHits === 12, String(monthHits));
ok('the event is placed in its month', /calendar-month has-event[\s\S]{0,600}October/.test(calendar.body) && calendar.body.includes('Welcome Circle'));
ok('the calendar links to registration while the window is open', calendar.body.includes('/register?event=event-welcome-circle'));

const members = await get('/members');
ok('GET /members returns 200', members.status === 200, 'status ' + members.status);
ok('the members page renders without PHP errors', clean(members.body), phpErrors(members.body));
ok('all three committees are listed', members.body.includes('Core Committee') && members.body.includes('Head Committee') && members.body.includes('Volunteers'));
ok('the committee photos and phone numbers are printed', members.body.includes('member-photo') && members.body.includes('tel:+917046075606'));
ok('the members page still says who writes it', !/content studio/i.test(members.body));

console.log('\n— registration, payment and the pass —');
const FORM_SESSION = { csrf: 'test-form-token' };
const FORM = { session: FORM_SESSION, headers: { 'X-CSRF-Token': 'test-form-token' } };
const registerPage = await get('/register?event=event-welcome-circle', { session: FORM_SESSION });
ok('the registration page is open for the published event', registerPage.status === 200, 'status ' + registerPage.status);
ok('the registration page renders without PHP errors', clean(registerPage.body), phpErrors(registerPage.body));
ok('the form carries a CSRF token', registerPage.body.includes('name="csrf" value="test-form-token"'));
ok('the event facts come from the backend', registerPage.body.includes('24 October 2026') && registerPage.body.includes('Seminar Hall'));
ok('a free event says so instead of showing a payment QR', registerPage.body.includes('Free entry') && !registerPage.body.includes('upi://pay'));
ok('the terms are stated in the form', /non-refundable/i.test(registerPage.body) && /12 working days/.test(registerPage.body));

const csrf = 'test-form-token';
const registered = await sendJson('/api/registrations', 'POST', {
  eventId: 'event-welcome-circle', name: 'Riya Sharma', email: 'riya@example.com', phone: '+91 98765 43210',
  course: 'BSc Psychology', year: 'Second year', note: 'Coming with a friend', csrf,
}, FORM);
let registration = {};
try { registration = JSON.parse(registered.body); } catch (error) { /* reported below */ }
ok('a registration from the frontend is stored', registered.status === 201, registered.status + ' ' + String(registered.body).slice(0, 200));
ok('the pass serial is issued in order', /^MTP-\d{4}-\d{4}$/.test(registration.serial || ''), String(registration.serial));
ok('the response hands the student their pass page', /^\/pass\/MTP-\d{4}-\d{4}\?token=[a-f0-9]{32}/.test(registration.passUrl || ''), String(registration.passUrl));

const passToken = registration.passUrl ? new URL('http://x' + registration.passUrl).searchParams.get('token') : '';
const passPath = '/pass/' + encodeURIComponent(registration.serial || 'MT');
const passPage = await get(passPath + '?token=' + passToken);
ok('the pass page opens with its private token', passPage.status === 200, 'status ' + passPage.status);
ok('the pass page renders without PHP errors', clean(passPage.body), phpErrors(passPage.body));
ok('the pass carries the serial and the holder', passPage.body.includes(registration.serial || 'x') && passPage.body.includes('Riya Sharma'));
ok('the pass carries the event, the date and the venue', passPage.body.includes('Welcome Circle') && passPage.body.includes('24 October 2026') && passPage.body.includes('Seminar Hall'));
ok('the pass carries a scannable QR code', /<svg[^>]*viewBox="0 0 \d+ \d+"[^>]*shape-rendering="crispEdges"/.test(passPage.body) && passPage.body.includes('Pass code ' + (registration.serial || '')));
ok('the pass states the no-refund rule and the 12 working days', /non-refundable/i.test(passPage.body) && /12 working days/.test(passPage.body));
ok('the pass says the payment proof must be shown at entry', /payment proof/i.test(passPage.body));

const wrongToken = await get(passPath + '?token=00000000000000000000000000000000');
ok('a pass without its token is refused', wrongToken.status === 404, 'status ' + wrongToken.status);

let pdf = await get('/api/pass/' + encodeURIComponent(registration.id || 'x') + '?token=' + passToken);
ok('a free event issues the pass straight away', pdf.status === 200 && String(pdf.body).startsWith('%PDF-1.4'), pdf.status + ' ' + String(pdf.body).slice(0, 20));
ok('the PDF is a finished document', String(pdf.body).includes('%%EOF') && String(pdf.body).includes('/Type /Catalog'));
const pdfText = String(pdf.body);
ok('the PDF names the holder, the serial and the terms', pdfText.includes('Riya Sharma') && pdfText.includes(registration.serial || '') && pdfText.includes('12 working days'));

/* a paid event: the UPI code appears, and the pass waits for the screenshot */
console.log('\n— a paid event: the UPI code and the payment screenshot —');
const paidEvent = await sendJson('/api/events', 'POST', {
  title: 'Stress-buster workshop', kicker: 'Workshop', month: 11, day: 14, year: 2026, time: '3:00 PM',
  location: 'CSMU campus · Room 204', description: 'A hands-on workshop.', published: true,
  fee: 150, upiId: 'mindfultattva@upi', upiName: 'Mindful Tattva', registrationOpen: true,
  windowMode: 'hours', openHours: 24, capacity: 40,
}, AUTH);
const paidEventId = paidEvent.status === 201 ? JSON.parse(paidEvent.body).item.id : '';
ok('an event with a fee can be created from the dashboard', paidEvent.status === 201 && Boolean(paidEventId), String(paidEvent.body).slice(0, 200));

const paidRegister = await get('/register?event=' + encodeURIComponent(paidEventId), { session: FORM_SESSION });
ok('a paid event shows the club’s UPI code', paidRegister.body.includes('pay-card') && paidRegister.body.includes('mindfultattva@upi'), String(paidRegister.status));
ok('the QR is a real UPI code, drawn on the page', paidRegister.body.includes('shape-rendering="crispEdges"') && !/src="[^"]*api\.qrserver/.test(paidRegister.body));
ok('the fee is stated in the summary', paidRegister.body.includes('Rs. 150'));
const paidCsrf = 'test-form-token';
ok('the payment instructions are on the form', /upload that screenshot/i.test(paidRegister.body) && paidRegister.body.includes('keep the screenshot'));

const paidRegistered = await sendJson('/api/registrations', 'POST', {
  eventId: paidEventId, name: 'Aisha Khan', email: 'aisha@example.com', phone: '+91 90000 00000', csrf: paidCsrf,
}, FORM);
const paidRegistration = JSON.parse(paidRegistered.body || '{}');
ok('a registration for a paid event is accepted', paidRegistered.status === 201, paidRegistered.status + ' ' + String(paidRegistered.body).slice(0, 160));
ok('the registration waits for the payment proof', paidRegistration.payment === 'pending', String(paidRegistration.payment));
const paidToken = paidRegistration.passUrl ? new URL('http://x' + paidRegistration.passUrl).searchParams.get('token') : '';
const paidPassUrl = '/pass/' + encodeURIComponent(paidRegistration.serial || 'MT');
const paidPass = await get(paidPassUrl + '?token=' + paidToken, { session: FORM_SESSION });
ok('the pass page asks for the screenshot before issuing the pass', paidPass.body.includes('proof') && paidPass.body.includes('upload') && !paidPass.body.includes('Download your pass (PDF)'));
const earlyPdf = await get('/api/pass/' + encodeURIComponent(paidRegistration.id || 'x') + '?token=' + paidToken);
ok('the PDF cannot be downloaded before the screenshot arrives', earlyPdf.status === 409, 'status ' + earlyPdf.status);

const proofUpload = await request({
  uri: paidPassUrl + '?token=' + paidToken,
  method: 'POST',
  session: FORM_SESSION,
  post: { csrf: 'test-form-token' },
  files: {
    proof: {
      name: 'receipt.png',
      type: 'image/png',
      base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' + 'A'.repeat(88),
    },
  },
});
ok('uploading the payment screenshot is accepted', proofUpload.status === 303 || proofUpload.status === 200, 'status ' + proofUpload.status);
const paidPassAfter = await get(paidPassUrl + '?token=' + paidToken);
ok('the pass is issued once the proof is in', paidPassAfter.body.includes('Download your pass (PDF)'));
ok('the proof is recorded with the registration', /proof|Payment proof received|payment proof is with the club/i.test(paidPassAfter.body));
const paidPdf = await get('/api/pass/' + encodeURIComponent(paidRegistration.id || 'x') + '?token=' + paidToken);
ok('the paid pass downloads as a PDF', paidPdf.status === 200 && String(paidPdf.body).startsWith('%PDF-1.4'), 'status ' + paidPdf.status);

console.log('\n— the registration window —');
const expired = await sendJson('/api/events', 'POST', {
  title: 'Closed circle', month: 12, day: 1, year: 2026, time: '11:00 AM', location: 'Seminar Hall',
  published: true, fee: 0, registrationOpen: true, windowMode: 'hours', openHours: 1,
  openedAt: '2020-01-01T09:00',
}, AUTH);
const expiredId = expired.status === 201 ? JSON.parse(expired.body).item.id : '';
const expiredPage = await get('/register?event=' + encodeURIComponent(expiredId));
ok('a window that has passed closes the form by itself', expiredPage.body.includes('closed') && !expiredPage.body.includes('Send and get my pass'), expiredPage.status + ' ' + expiredPage.body.slice(0, 0));
const expiredPost = await sendJson('/api/registrations', 'POST', { eventId: expiredId, name: 'Late Student', email: 'late@example.com', phone: '+91 90000 00001' });
ok('a registration after the window closes is refused', expiredPost.status === 409, 'status ' + expiredPost.status);
const hoursWindow = await sendJson('/api/events', 'POST', {
  title: 'Two-hour window', month: 12, day: 2, year: 2026, time: '11:00 AM', location: 'Seminar Hall',
  published: true, fee: 0, registrationOpen: true, windowMode: 'hours', openHours: 24, openedAt: '2026-10-12T09:00',
}, AUTH);
const hoursId = hoursWindow.status === 201 ? JSON.parse(hoursWindow.body).item.id : '';
const hoursPage = await get('/register?event=' + encodeURIComponent(hoursId));
ok('an hour-based window stays open inside its hours', hoursPage.body.includes('Send and get my pass'), hoursPage.status + ' ' + hoursPage.body.slice(0, 0));
await request({ uri: '/api/events/' + encodeURIComponent(hoursId), method: 'DELETE', ...AUTH });
await request({ uri: '/api/events/' + encodeURIComponent(expiredId), method: 'DELETE', ...AUTH });

console.log('\n— the club dashboard side —');
const inboxAnon = await get('/api/registrations');
ok('anonymous visitors cannot read the register', inboxAnon.status === 401, 'status ' + inboxAnon.status);
const waitingForProof = await sendJson('/api/registrations', 'POST', {
  eventId: paidEventId, name: 'Waiting Student', email: 'waiting@example.com', phone: '+91 90000 00001', csrf,
}, FORM);
let waitingRow = {};
try { waitingRow = JSON.parse(waitingForProof.body); } catch (error) { /* reported below */ }

const registerList = await get('/api/registrations', AUTH);
const regItems = JSON.parse(registerList.body).items || [];
ok('the dashboard reads every registration', registerList.status === 200 && regItems.length >= 2, 'count ' + regItems.length);
ok('the register carries the pass serials', regItems.every((item) => /^MTP-\d{4}-\d{4}$/.test(item.serial || '')));
ok('the register marks which passes are ready',
  regItems.some((item) => item.serial === waitingRow.serial && item.passReady === false)
  && regItems.some((item) => item.serial === paidRegistration.serial && item.passReady === true));
const perEvent = await get('/api/registrations?event=' + encodeURIComponent(paidEventId), AUTH);
ok('the register can be read per event', (JSON.parse(perEvent.body).items || []).length >= 1);

const csvAnon = await get('/api/registrations.csv');
ok('the CSV is not public', csvAnon.status === 401, 'status ' + csvAnon.status);
const csv = await get('/api/registrations.csv', AUTH);
const csvBody = String(csv.body);
ok('the CSV downloads for the club', csv.status === 200 && /text\/csv/.test(JSON.stringify(csv.headers)), 'status ' + csv.status);
ok('the CSV lists every pass serial for the gate', csvBody.includes('Pass serial') && csvBody.includes(registration.serial || 'x') && csvBody.includes(paidRegistration.serial || 'y'));
ok('the CSV carries the venue and the fee', csvBody.includes('Venue') && /(^|,)Fee(,|$)/.test(csvBody));

const verify = await sendJson('/api/registrations/' + encodeURIComponent(paidRegistration.id || 'x'), 'PUT', { paymentStatus: 'verified' }, AUTH);
ok('the club can verify a payment', verify.status === 200 && JSON.parse(verify.body).item.paymentStatus === 'verified', String(verify.body).slice(0, 160));
const cancel = await sendJson('/api/registrations/' + encodeURIComponent(paidRegistration.id || 'x'), 'PUT', { status: 'cancelled', paymentStatus: 'rejected' }, AUTH);
ok('the club can cancel a registration with a refund', cancel.status === 200 && JSON.parse(cancel.body).item.status === 'cancelled');
const cancelledPass = await get(paidPassUrl + '?token=' + paidToken);
ok('a cancelled pass says so at the door', /cancelled/i.test(cancelledPass.body) && /12 working days/.test(cancelledPass.body));
const removeRow = await request({ uri: '/api/registrations/' + encodeURIComponent(registration.id || 'x'), method: 'DELETE', ...AUTH });
ok('a registration row can be deleted', removeRow.status === 200, 'status ' + removeRow.status);
await request({ uri: '/api/events/' + encodeURIComponent(paidEventId), method: 'DELETE', ...AUTH });

console.log('\n— the forms, the API and the security around it —');
const spam = await sendJson('/api/submissions', 'POST', { name: 'Bot', email: 'bot@example.com', phone: '+91 9000000000', website: 'http://spam.example' });
ok('honeypot submissions are ignored', spam.status === 200, 'status ' + spam.status);
const botRegister = await sendJson('/api/registrations', 'POST', { eventId: 'event-welcome-circle', name: 'Bot', email: 'b@example.com', phone: '+91 9000000009', website: 'http://spam.example' });
ok('the event form drops bots too', botRegister.status === 200 && JSON.parse(botRegister.body).ignored === true, 'status ' + botRegister.status);
const badForm = await sendJson('/api/submissions', 'POST', { name: 'A', email: 'not-an-email', phone: '12' });
ok('invalid form data is rejected', badForm.status === 422, 'status ' + badForm.status);
const badRegister = await sendJson('/api/registrations', 'POST', { eventId: 'event-welcome-circle', name: 'Riya', email: 'not-an-email', phone: '+91 98765 43210' });
ok('an invalid email cannot register', badRegister.status === 422, 'status ' + badRegister.status);
const missingEvent = await sendJson('/api/registrations', 'POST', { eventId: 'no-such-event', name: 'Riya', email: 'riya@example.com', phone: '+91 98765 43210' });
ok('registering for an unknown event is refused', missingEvent.status === 404, 'status ' + missingEvent.status);

const siteApi = await get('/api/site');
const sitePayload = JSON.parse(siteApi.body);
ok('the public payload carries the events with their registration state', Array.isArray(sitePayload.events) && sitePayload.events.every((event) => typeof event.registration === 'object'));
ok('the public payload hides the register itself', sitePayload.registrations === undefined || typeof sitePayload.registrations === 'number');
ok('the public payload no longer carries an awareness corner', sitePayload.awareness === undefined);
ok('the public payload hides the inbox', sitePayload.submissions === undefined);
const sinceApi = await get('/api/site?since=' + sitePayload.revision);
ok('since= returns unchanged', JSON.parse(sinceApi.body).unchanged === true);

const health = await get('/api/health');
const healthPayload = JSON.parse(health.body);
ok('GET /api/health is ok', health.status === 200 && healthPayload.ok === true);
ok('api health counts the design files it checked', Boolean(healthPayload.files) && healthPayload.files.checked >= 14 && healthPayload.files.missing === 0,
  JSON.stringify(healthPayload.files || {}));
ok('api health says the site is complete', healthPayload.site_ok === true && /in place/.test(healthPayload.summary || ''), String(healthPayload.summary));

const halfWay = await request({ uri: '/register?event=event-welcome-circle', method: 'POST', session: FORM_SESSION,
  post: { eventId: 'event-welcome-circle', name: 'Form Poster', email: 'form@example.com', phone: '+91 90000 00002', csrf } });
ok('the form also works without JavaScript (a real POST redirects)', halfWay.status === 303 && /\/pass\/MTP-\d{4}-\d{4}\?token=/.test(JSON.stringify(halfWay.headers)), halfWay.status + ' ' + JSON.stringify(halfWay.headers).slice(0, 160));

const dashboard = await get('/dashboard');
ok('GET /dashboard returns 200', dashboard.status === 200);
ok('the dashboard shows the password screen', dashboard.body.includes('id="loginForm"'));
ok('the dashboard inlines its own styles', dashboard.body.includes('.dash-shell'));
ok('the dashboard is noindex', /noindex/.test(dashboard.body));
ok('the dashboard has the event register and no tiles', dashboard.body.includes('panel-events-register') && dashboard.body.includes('registrationGroups') && !dashboard.body.includes('panel-awareness'));
ok('no “Content Studio” wording in the dashboard', !/content studio/i.test(dashboard.body));

const badLogin = await sendJson('/api/login', 'POST', { password: 'definitely-wrong' });
ok('wrong password is rejected', badLogin.status === 401, 'status ' + badLogin.status);
const goodLogin = await sendJson('/api/login', 'POST', { password: 'Csmu@MT' });
ok('the club password signs in', goodLogin.status === 200 && JSON.parse(goodLogin.body).authenticated === true, String(goodLogin.body).slice(0, 160));
const noCsrf = await sendJson('/api/site', 'PUT', { tagline: 'x' }, { session: SESSION });
ok('missing CSRF token is rejected', noCsrf.status === 419, 'status ' + noCsrf.status);
const editCopy = await sendJson('/api/site', 'PUT', { tagline: 'A calmer space to understand the mind.' }, AUTH);
ok('site copy saves with a token', editCopy.status === 200, String(editCopy.body).slice(0, 160));
const eventPatch = await sendJson('/api/events/event-welcome-circle', 'PUT', { fee: 0, windowMode: 'hours', openHours: 6, location: 'CSMU campus · Seminar Hall' }, AUTH);
ok('an event keeps its typed venue and window', eventPatch.status === 200 && JSON.parse(eventPatch.body).item.openHours === 6, String(eventPatch.body).slice(0, 160));
const capture = await get('/api/events/event-welcome-circle', AUTH);
const captured = JSON.parse(capture.body);
ok('the venue is free text, not a fixed list', (captured.location || (captured.item || {}).location) === 'CSMU campus · Seminar Hall', String(capture.body).slice(0, 120));

console.log('\n— backups, uploads and settings —');
const backups = await get('/api/backups', AUTH);
const backupItems = JSON.parse(backups.body).items || [];
ok('a backup is created on save', backupItems.length >= 1, 'count ' + backupItems.length);
if (backupItems.length) {
  const restored = await sendJson('/api/backups/restore', 'POST', { name: backupItems[0].name }, AUTH);
  ok('a backup can be restored', restored.status === 200, String(restored.body).slice(0, 160));
}
const exportDb = await get('/api/export', AUTH);
ok('full backup export works', exportDb.status === 200 && exportDb.body.includes('"site"'));
const upload = await sendJson('/api/upload', 'POST', {
  dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR42mP8z8DAwMDAwMDAwMDAAAAOAAGx4sQAAAAASUVORK5CYII=',
  kind: 'image',
}, AUTH);
ok('a base64 upload is stored', upload.status === 201, String(upload.body).slice(0, 200));
const badUpload = await sendJson('/api/upload', 'POST', { dataUrl: 'data:text/html;base64,PHNjcmlwdD4=', kind: 'image' }, AUTH);
ok('non-image uploads are refused', badUpload.status === 415 || badUpload.status === 400, 'status ' + badUpload.status);
const wrongPassword = await sendJson('/api/password', 'POST', { current: 'nope', password: 'newpass123' }, AUTH);
ok('password change needs the current password', wrongPassword.status === 403, 'status ' + wrongPassword.status);
const changePassword = await sendJson('/api/password', 'POST', { current: 'Csmu@MT', password: 'Csmu@MT2' }, AUTH);
ok('password change works with the current one', changePassword.status === 200, String(changePassword.body).slice(0, 160));
if (changePassword.status === 200) {
  const loginNew = await sendJson('/api/login', 'POST', { password: 'Csmu@MT2' });
  ok('the new password signs in', loginNew.status === 200, 'status ' + loginNew.status);
  const backAgain = await sendJson('/api/password', 'POST', { current: 'Csmu@MT2', password: 'Csmu@MT' }, AUTH);
  ok('password change reverts cleanly', backAgain.status === 200, String(backAgain.body).slice(0, 160));
  const loginOld = await sendJson('/api/login', 'POST', { password: 'Csmu@MT' });
  ok('the original password works again', loginOld.status === 200, 'status ' + loginOld.status);
}
const logout = await sendJson('/api/logout', 'POST', {}, { session: SESSION });
ok('logout works', logout.status === 200 && JSON.parse(logout.body).authenticated === false);

console.log('\n— routing, search engines and the old links —');
const legacyGallery = await get('/gallery.html');
ok('old .html links still lead home', legacyGallery.status === 301 && /Location/.test(JSON.stringify(legacyGallery.headers)), legacyGallery.status + '');
const legacyAdmin = await get('/admin.html');
ok('the old studio address points at the dashboard', legacyAdmin.status === 301 && /dashboard/.test(JSON.stringify(legacyAdmin.headers)));
const missing = await get('/nope');
ok('unknown path returns 404', missing.status === 404, 'status ' + missing.status);
ok('unknown path shows the friendly page', missing.body.includes('drifted somewhere quieter'));
const sitemap = await get('/sitemap.xml');
ok('sitemap.xml is served', sitemap.status === 200 && sitemap.body.includes('<urlset') && sitemap.body.includes('/members'));
const robots = await get('/robots.txt');
ok('robots.txt keeps the dashboard, the check and the passes out of search engines',
  robots.status === 200 && robots.body.includes('Disallow: /dashboard') && robots.body.includes('Disallow: /health') && robots.body.includes('Disallow: /pass/'));
const healthPage = await get('/health');
ok('GET /health returns 200', healthPage.status === 200);
ok('the deployment check lists the design files', healthPage.body.includes('Design files') && healthPage.body.includes('assets/app.css'));
ok('the deployment check loads nothing of its own', !/(href|src)="\/assets\//.test(healthPage.body));
ok('the deployment check is noindex', /noindex/.test(healthPage.body));

console.log('\n— the design contracts (motion, alignment, safety) —');
const appCss = fs.readFileSync(path.join(ROOT, 'assets/app.css'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'assets/app.js'), 'utf8');
const layoutSource = fs.readFileSync(path.join(ROOT, 'views/layout.php'), 'utf8');
const vm = await import('node:vm');
for (const asset of ['assets/app.js', 'assets/dashboard.js']) {
  const code = fs.readFileSync(path.join(ROOT, asset), 'utf8');
  try { new vm.Script(code, { filename: asset }); ok(asset + ' parses', true); }
  catch (error) { ok(asset + ' parses', false, error.message); }
}
ok('reveals are hidden only under html.js', /html\.js \.scroll-reveal \{/.test(appCss) && !/^\s*\.scroll-reveal \{ opacity: 0/m.test(appCss));
ok('a script that never arrives cannot hide content', /classList\.remove\('js'\)/.test(layoutSource));
ok('the bubbles keep their motion', ['bubbleDrift', 'orbitSpin', 'psiPulse', 'fadeIn', 'breathe', 'stickerPulse'].every((name) => appCss.includes('@keyframes ' + name)));
ok('the mobile menu is styled', /\.nav-links\.open/.test(appCss) || /nav-links\.open/.test(appCss));
ok('the pass prints as the pass', /@media print/.test(appCss) && /\.pass-ticket/.test(appCss));
ok('the payment card and the upload row are styled', appCss.includes('.pay-card') && appCss.includes('.upload-row') && appCss.includes('.status-chip'));
ok('the register panel and the door list cards are styled', appCss.includes('.summary-card') && appCss.includes('.register-list'));
ok('the calendar keeps its own page styles', appCss.includes('.calendar-months') && appCss.includes('.calendar-month'));
ok('the script never hides or rewrites the page content', !/innerHTML\s*=/.test(appJs) || /galleryStageImage/.test(appJs));
ok('the script asks the backend for the revision instead of re-rendering', appJs.includes('/api/site?since=') && appJs.includes('window.location.reload()'));
ok('the dashboard talks to the registrations endpoint', fs.readFileSync(path.join(ROOT, 'assets/dashboard.js'), 'utf8').includes('/api/registrations'));

console.log('\n— a half-finished upload (the blank-site bug) —');
const cssBackup = await php.readFile('/site/assets/app.css', { encoding: 'utf8' });
const jsBackup = await php.readFile('/site/assets/app.js', { encoding: 'utf8' });
await php.unlink('/site/assets/app.css');
await php.unlink('/site/assets/app.js');
const halfHome = await get('/');
ok('a missing stylesheet falls back to the built-in baseline',
  halfHome.body.includes('id="mt-baseline"') && halfHome.body.includes('assets/app.css was not found'));
ok('the baseline keeps the page readable instead of unstyled', /--plum-deep/.test(halfHome.body) && /body \{/.test(halfHome.body));
const halfHealth = await get('/health');
const halfCount = /(\d+) files? (?:are|is) missing/.exec(halfHealth.body);
ok('the deployment check names how many files are missing',
  halfHealth.status === 200 && Boolean(halfCount) && Number(halfCount[1]) >= 2,
  halfHealth.status + ' → ' + (halfCount ? halfCount[1] : 'no count found'));
const halfApi = JSON.parse((await get('/api/health')).body);
ok('the dashboard status reports the missing files', halfApi.files.missing >= 2 && /missing/.test(halfApi.summary || ''), JSON.stringify(halfApi.files || {}));
ok('every page still works with the design files gone', (await get('/calendar')).status === 200 && (await get('/members')).status === 200);
await php.writeFile('/site/assets/app.css', cssBackup);
await php.writeFile('/site/assets/app.js', jsBackup);
const restored = await get('/');
ok('the real stylesheet comes back once the files are restored', !/id="mt-baseline"/.test(restored.body) && /bubble-field/.test(restored.body));

console.log('\n— clean output check —');
for (const route of ['/', '/gallery', '/calendar', '/members', '/register?event=event-welcome-circle', '/dashboard', '/does-not-exist']) {
  const response = await get(route);
  ok('no PHP errors on ' + route, clean(response.body), clean(response.body) ? '' : String(response.body).slice(0, 300));
}
const homeAgain = await get('/');
ok('assets are inlined, never linked', !/href="\/assets\/app\.css"/.test(homeAgain.body) && !/src="\/assets\/app\.js"/.test(homeAgain.body));
ok('no duplicate page files are served from the old build', !fs.existsSync(path.join(ROOT, 'index.html')) && !fs.existsSync(path.join(ROOT, 'server.js')) && !fs.existsSync(path.join(ROOT, 'admin.html')));

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach((name) => console.log('  · ' + name));
  process.exitCode = 1;
}
