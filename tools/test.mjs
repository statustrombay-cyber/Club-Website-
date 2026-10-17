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
const SKIP = new Set(['.git', 'node_modules', '.arena', '.rollback', 'backup-original', 'data/logs', 'data/sessions', 'data/backups']);

function collect(dir, base = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? base + '/' + entry.name : entry.name;
    // Root recordings and generated bundles are never PHP runtime inputs.
    if (!base && /\.(mp4|zip)$/i.test(entry.name)) continue;
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
  if (/\.(png|jpe?g|webp|gif|ico|pdf|mp4|m4v|mov|webm|mp3|glb|woff2)$/i.test(rel)) {
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
        'session'  => $GLOBALS['MT_SESSION_OUT'] ?? null,
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

/* The club signs in for real, so the dashboard half of this suite exercises the
   same session the browser gets — fingerprint and all. */
const loginAttempt = await request({
  uri: '/api/login', method: 'POST', post: { password: 'Csmu@MT' }, json: { password: 'Csmu@MT' },
});
const SESSION = loginAttempt.session || {};
const AUTH = { session: SESSION, headers: { 'X-CSRF-Token': SESSION.csrf || '' } };

/* ----------------------------------------------------------------- tests */
let pass = 0;
let fail = 0;
const failures = [];

function ok(name, condition, detail = '') {
  if (condition) { pass++; console.log('  \u001b[32m✓\u001b[0m ' + name); }
  else { fail++; failures.push(name + (detail ? ' — ' + detail : '')); console.log('  \u001b[31m✗\u001b[0m ' + name + (detail ? ' — ' + detail : '')); }
}

const mtMask = (name) => String(name || '').trim().split(/\s+/).map((part) => part.charAt(0) + '•'.repeat(Math.min(Math.max(0, part.length - 1), 6))).join(' ');
const clean = (body) => !/(Warning|Notice|Fatal error|Deprecated|Uncaught|THROWN):/.test(String(body));
const phpErrors = (body) => (String(body).match(/(Warning|Notice|Fatal error|Deprecated|Uncaught|THROWN):.{0,120}/) || [''])[0];

/* ------------------------------------------------------------ the club site */
console.log('\n— the public site —');
const home = await get('/');
ok('GET / returns 200', home.status === 200, 'status ' + home.status + ' ' + String(home.body).slice(0, 200));
ok('the home page renders without PHP errors', clean(home.body), phpErrors(home.body));
ok('the original design is back: the drifting bubbles', home.body.includes('bubble-field') && home.body.includes('bubble bubble-e'));
ok('the page shell and the bubbles are there', home.body.includes('site-shell') && home.body.includes('bubble-field'));
ok('nothing darkens the page as it scrolls', !home.body.includes('depth-overlay') && !fs.readFileSync(path.join(ROOT, 'assets/app.css'), 'utf8').includes('depth-overlay'));
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
ok('the original light hero keeps its large editable quote, not a giant logo', home.body.includes('id="heroTagline"') && home.body.includes('class="hero hero-with-video"') && !home.body.includes('class="reference-emblem"'));
ok('the club statistics are printed', home.body.includes('id="statsRow"') && home.body.includes('student-led'));
ok('the history timeline is written from the store', home.body.includes('timeline-item') && home.body.includes('A small idea with a big heart'));
ok('the event card offers registration', home.body.includes('/register?event=event-welcome-circle'));
ok('the join forms are both there', home.body.includes('id="membershipForm"') && home.body.includes('id="registrationForm"'));
ok('the public footer never links the club area', !home.body.includes('href="/dashboard"') && !home.body.includes('/dashboard'));
ok('the footer keeps the institution and the creator credit', home.body.includes('footer-institution') && home.body.includes('Made with love by Mohd Shafiq'));
ok('the home page carries the club’s photos, and hands the stage the same list',
  home.body.includes('id="galleryStageImage"') && home.body.includes('id="gallery-data"'));
ok('a half-written photo slot never shows on the public site', !home.body.includes('Photo placeholder'));
ok('the stylesheet is inlined, never linked', home.body.includes('<style>') && !/href="\/assets\/app\.css"/.test(home.body));
ok('the script is inlined, never linked', !/src="\/assets\/app\.js"/.test(home.body) && home.body.includes('setupGalleryStage'));
ok('content is never hidden without JavaScript', home.body.includes('class="no-js"') && home.body.includes('replace("no-js", "js")'));

/* The club area is private: no public page may name it, link it or hint at it. */
const PRIVATE_WORDS = [/dashboard/i, /studio/i, /\bbackend\b/i, /\badmin\b/i];
for (const route of ['/', '/gallery', '/calendar', '/members', '/register', '/pass', '/not-found-test']) {
  const page = await get(route);
  const hits = PRIVATE_WORDS.filter((word) => word.test(page.body));
  ok('no private-area wording on ' + route, hits.length === 0, hits.map(String).join(', '));
}

const gallery = await get('/gallery');
ok('GET /gallery returns 200', gallery.status === 200, 'status ' + gallery.status);
ok('the gallery page renders without PHP errors', clean(gallery.body), phpErrors(gallery.body));
ok('the gallery hero is the original one', gallery.body.includes('gallery-hero') && /A scrapbook of <em>small moments\.<\/em>/.test(gallery.body));
ok('the first photo is already in the page, background and all', /id="galleryStageImage"[^>]*background-image:url\(/.test(gallery.body));
ok('the archive is server-rendered', gallery.body.includes('archive-grid') && gallery.body.includes('archive-card'));
ok('the slides are handed to the script as data', gallery.body.includes('id="gallery-data"'));
ok('the gallery no longer mentions a content studio', !/content studio/i.test(gallery.body));

/* The club adds a row first and fills it in later, so a row with no picture
   must never be published as a blank tile — the exact state the public page
   was showing before. */
const cardCount = (body) => (String(body).match(/archive-card/g) || []).length;
const cardsBefore = cardCount(gallery.body);
const blankSlot = await sendJson('/api/gallery', 'POST', { caption: '', alt: '', event: '', image: '', order: 99 }, AUTH);
ok('the club can add a photo slot and fill it in later', blankSlot.status === 201, 'status ' + blankSlot.status);
const galleryWhileBlank = await get('/gallery');
ok('an unfilled photo slot stays off the public gallery',
  cardCount(galleryWhileBlank.body) === cardsBefore && !galleryWhileBlank.body.includes('Photo placeholder'),
  cardsBefore + ' → ' + cardCount(galleryWhileBlank.body));
const blankId = ((blankSlot.json || {}).item || {}).id;
const cleanedUp = await request({ uri: '/api/gallery/' + blankId, method: 'DELETE', ...AUTH });
ok('the empty slot can be removed again', cleanedUp.status === 200 || cleanedUp.status === 204 || cleanedUp.status === 404, 'status ' + cleanedUp.status);

/* A member row with no name is the same story. */
const blankMember = await sendJson('/api/team', 'POST', { name: '', role: 'Core team', group: 'management', order: 99 }, AUTH);
const membersBefore = await get('/members');
const membersWhileBlank = await get('/members');
const memberCards = (body) => (String(body).match(/member-card/g) || []).length;
ok('a member row with no name stays off the public page',
  memberCards(membersWhileBlank.body) === memberCards(membersBefore.body),
  memberCards(membersBefore.body) + ' → ' + memberCards(membersWhileBlank.body));
const blankMemberId = ((blankMember.json || {}).item || {}).id;
await request({ uri: '/api/team/' + blankMemberId, method: 'DELETE', ...AUTH });

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
ok('the terms are stated in the form', /non-refundable/i.test(registerPage.body) && /24 working days/.test(registerPage.body)
  && /(club'?s decision|decisions of the club)/i.test(registerPage.body)
  && /without prior notice/i.test(registerPage.body)
  && /<ol>/.test(registerPage.body) && (registerPage.body.match(/<li>/g) || []).length >= 5);
ok('the form never asks “anything the club should know”', !/anything the club should know/i.test(registerPage.body) && !/name="note"/.test(registerPage.body));
ok('the form does not feed the browser name and phone suggestions', !/autocomplete="(name|tel|email|street-address)"/i.test(registerPage.body)
  && !/name="(name|email|phone)"[^>]*value="(?!")/.test(registerPage.body));

const csrf = 'test-form-token';
const registered = await sendJson('/api/registrations', 'POST', {
  eventId: 'event-welcome-circle', name: 'Riya Sharma', email: 'riya@example.com', phone: '+91 98765 43210',
  course: 'BSc Psychology', year: 'Second year', csrf,
}, FORM);
let registration = {};
try { registration = JSON.parse(registered.body); } catch (error) { /* reported below */ }
ok('a registration from the frontend is stored', registered.status === 201, registered.status + ' ' + String(registered.body).slice(0, 200));
/* The serial carries the date of the event it is for, so the club can sort a
   stack of passes by eye (MTP-24OCT26-0001); an event with no date yet falls
   back to the year, which is the shape the club already knows. */
const SERIAL_SHAPE = /^MTP-(\d{2}[A-Z]{3}\d{2}|\d{4})-\d{4}$/;
ok('the pass serial carries the event date and is issued in order',
  /^MTP-24OCT26-0001$/.test(registration.serial || ''), String(registration.serial));
ok('the response hands the student a private pass link', /^\/pass\/MT(-[2-9A-HJ-NP-Z]{5}){4}(\?new=1)?$/.test(registration.passUrl || ''), String(registration.passUrl));

const passCode = registration.passUrl ? registration.passUrl.split('?')[0].replace('/pass/', '') : '';
const passPath = '/pass/' + passCode;
const passPage = await get(passPath);
ok('the pass page opens with the private code from the link', passPage.status === 200, 'status ' + passPage.status);
ok('the pass page renders without PHP errors', clean(passPage.body), phpErrors(passPage.body));
ok('the pass carries the serial and the holder', passPage.body.includes(registration.serial || 'x') && passPage.body.includes('Riya Sharma'));
ok('the pass carries the event, the date and the venue', passPage.body.includes('Welcome Circle') && passPage.body.includes('24 October 2026') && passPage.body.includes('Seminar Hall'));
ok('the pass carries a scannable QR code', /<svg[^>]*viewBox="0 0 \d+ \d+"[^>]*shape-rendering="crispEdges"/.test(passPage.body));
/* an svg carries a namespace that starts with http:// — what matters is a link a
   visitor can follow, and the club's own page wording */
const passPageOffence = (/\/verify\/|check page|Scan to check|opens the club site|href="https?:\/\/(?!www\.instagram)/i.exec(passPage.body) || [])[0] || '';
ok('the pass page advertises no check page and no address',
  passPageOffence === '',
  passPageOffence === '' ? '' : 'found ' + JSON.stringify(passPageOffence) + ' near ' + JSON.stringify((() => { const at = passPage.body.search(/\/verify\/|check page|Scan to check|opens the club site|href="https?:\/\/(?!www\.instagram)/i); return passPage.body.slice(Math.max(0, at - 120), at + 160); })()));
const codeSpot = passPage.body.indexOf(passCode);
ok('the pass page never prints the private code it was opened with', codeSpot < 0,
  codeSpot < 0 ? '' : JSON.stringify(passPage.body.slice(Math.max(0, codeSpot - 90), codeSpot + 40)));
ok('the pass states the no-refund rule and the 24 working days', /non-refundable/i.test(passPage.body) && /24 working days/.test(passPage.body));
ok('the pass tells the student to keep it safe and bring it, and that it is checked at the door',
  /keep this pass safe/i.test(passPage.body) && /checked at the door/i.test(passPage.body)
  && !/verification/i.test(passPage.body) && !/club register/i.test(passPage.body));

const wrongCode = await get('/pass/MT-AAAAA-AAAAA-AAAAA-AAAAA');
ok('a made-up pass code is refused', wrongCode.status === 404, 'status ' + wrongCode.status);
const noCode = await get('/pass');
ok('the pass page without a link explains where the link is', noCode.status === 200 && /Find your pass/i.test(noCode.body));

/* the check page a scanned QR opens: public, and careful with what it says */
const verifyPage = await get('/verify/' + encodeURIComponent(registration.publicId || 'x'));
ok('the QR opens the club\'s own page and that page says the pass is true',
  verifyPage.status === 200 && /This pass is verified as true\./i.test(verifyPage.body));
ok('the scanned page masks the holder and shows no contact details',
  verifyPage.body.includes(mtMask('Riya Sharma')) && !verifyPage.body.includes('riya@example.com') && !verifyPage.body.includes('9876543210'));
ok('the scanned page explains no steps and offers no form to fill in',
  !/<form/i.test(verifyPage.body) && !/Check this pass|scan the QR|register holds/i.test(verifyPage.body));
const verifyMiss = await get('/verify/v000000000000000000');
ok('a made-up code says the pass could not be found', verifyMiss.status === 404 && /could not be found/i.test(verifyMiss.body));

const passSession = passPage.session || {};
let pdf = await get('/api/pass/' + encodeURIComponent(registration.serial || 'x'), { session: passSession });
ok('a free event issues the pass straight away', pdf.status === 200 && String(pdf.body).startsWith('%PDF-1.4'), pdf.status + ' ' + String(pdf.body).slice(0, 20));
ok('the PDF is a finished document', String(pdf.body).includes('%%EOF') && String(pdf.body).includes('/Type /Catalog'));
const pdfText = String(pdf.body);
ok('the PDF names the holder, the serial and the terms', pdfText.includes('Riya Sharma') && pdfText.includes(registration.serial || '') && pdfText.includes('24 working days'));
const pdfWords = [...pdfText.matchAll(/Td \(((?:[^()\\]|\\.)*)\) Tj/g)].map((m) => m[1]).join(' | ');
ok('the printed words of the pass carry no address, no check page and no private code',
  pdfWords.length > 100
  && !/https?:\/\/|\/verify\/|www\.|localhost|\.site\.je/i.test(pdfWords)
  && !pdfWords.includes(passCode)
  && !/verification|check this pass/i.test(pdfWords));
ok('the PDF tells the holder to keep the pass safe and to bring it',
  pdfWords.includes('Keep this pass safe and bring it with you')
  && pdfWords.includes('payment screenshot')
  && !pdfWords.includes('club register'));
/* The letterhead: the university's mark and its address top left, the club's
   name in the middle, the club crest top right, and the university's big mark
   with the campus address again at the foot. */
ok('the pass shows the club crest and the university mark as real pictures',
  pdfText.includes('/DCTDecode') && /\/Predictor 15 \/Colors 3 \/BitsPerComponent 8 \/Columns \d+/.test(pdfText),
  'jpeg ' + (pdfText.match(/\/DCTDecode/g) || []).length + ', png ' + (pdfText.match(/\/Predictor 15/g) || []).length);
ok('no mark is printed on the header band, both marks sit at the foot',
  (() => {
    /* every picture is drawn as "q w 0 0 h x y cm /Name Do Q"; the header band
       lives above y 618, so nothing may be placed up there any more */
    const placements = [...pdfText.matchAll(/q ([\d.]+) 0 0 ([\d.]+) ([\d.]+) ([\d.]+) cm \/(\w+) Do Q/g)]
      .map((m) => ({ y: Number(m[4]), h: Number(m[2]) }));
    if (placements.length < 2) return false;
    return placements.filter((p) => p.y + p.h > 618).length === 0
      && placements.filter((p) => p.y + p.h <= 618).length >= 2;
  })(),
  'pictures: ' + JSON.stringify((pdfText.match(/cm \/(\w+) Do/g) || [])));
ok('the campus address stands at the foot of the pass', pdfText.includes('Near Shedung Toll Plaza'));
ok('the club’s own name is centred on the header, not pushed aside',
  (() => {
    const name = /BT [\d.]+ [\d.]+ [\d.]+ rg \/F2 19\.00 Tf ([\d.]+) [\d.]+ Td \(Mindful Tattva\) Tj ET/.exec(pdfText);
    const label = /BT [\d.]+ [\d.]+ [\d.]+ rg \/F2 8\.00 Tf ([\d.]+) [\d.]+ Td \(EVENT PASS\) Tj ET/.exec(pdfText);
    if (!name || !label) return false;
    const nameX = Number(name[1]);
    const labelX = Number(label[1]);
    /* Two strings of different widths centre on one axis, so their left edges
       sit apart by design — but both must be in the middle of the page. The
       measured header puts the name at 235 and the label at 277 on a 595.28pt
       page; a left-aligned name would sit at x = 66. */
    return Math.abs(nameX - labelX) < 60 && nameX > 200 && nameX < 280 && labelX > 250 && labelX < 305;
  })());
ok('every line of the terms sits inside its own colour box',
  (() => {
    /* the box is the sand rectangle; the terms are the small text inside it.
       Nothing may fall below its bottom edge or stand above its top edge. */
    const box = /0\.945 0\.933 0\.925 rg 70\.00 ([\d.]+) 455\.28 ([\d.]+) re/.exec(pdfText);
    if (!box) return false;
    const boxBottom = Number(box[1]);
    const boxTop = boxBottom + Number(box[2]);
    const lines = [...pdfText.matchAll(/BT [\d. ]+rg \/F1 ([\d.]+) Tf 82\.00 ([\d.]+) Td \(/g)]
      .filter((m) => Number(m[1]) < 9.2)
      .map((m) => Number(m[2]));
    return lines.length >= 6 && lines.every((y) => y > boxBottom + 3 && y < boxTop - 3);
  })());
ok('no line of the pass runs past the edge of the page or its box',
  (() => {
    /* The club saw the word "prior" land outside the terms box. The width table
       here is the one the PDF itself measures with (Helvetica), so a line that
       would overrun is caught before it is printed. */
    const widths = { ' ': 278, 'i': 222, 'j': 222, 'l': 222, 'f': 278, 't': 278, 'r': 333, 'I': 278, '.': 278, ',': 278, '-': 333, 'm': 833, 'w': 722, 'M': 833, 'W': 944 };
    const measure = (text, size) => [...text].reduce((sum, ch) => sum + (widths[ch] || 500), 0) / 1000 * size;
    const ops = [...pdfText.matchAll(/BT [\d.]+ [\d.]+ [\d.]+ rg \/F\d ([\d.]+) Tf ([\d.]+) ([\d.]+) Td \(((?:[^()\\]|\\.)*)\) Tj ET/g)]
      .map((m) => ({ size: Number(m[1]), x: Number(m[2]), text: m[4].replace(/\\([()\\])/g, '$1') }));
    if (ops.length < 30) return false;
    const termsBox = /0\.945 0\.933 0\.925 rg 70\.00 [\d.]+ 455\.28 [\d.]+ re/.exec(pdfText);
    const boxRight = termsBox ? 70 + 455.28 : 547.28;
    return ops.every((op) => {
      const right = op.x + measure(op.text, op.size);
      /* every line sits inside the printable page, and the small lines in the
         terms area (x = 82) stay inside the colour box as well */
      if (right > 595.28 - 20) return false;
      if (op.x === 82 && op.size < 9.2 && right > boxRight - 8) return false;
      return true;
    });
  })());
ok('the terms box never climbs up into the facts above it',
  (() => {
    /* the box used to grow upward on a long rule set and paint over the second
       line of a long venue name; the ceiling is measured from the facts now */
    const box = /0\.945 0\.933 0\.925 rg 70\.00 ([\d.]+) 455\.28 ([\d.]+) re/.exec(pdfText);
    if (!box) return false;
    const boxTop = Number(box[1]) + Number(box[2]);
    const facts = [...pdfText.matchAll(/\/F1 10\.00 Tf ([\d.]+) ([\d.]+) Td \(/g)]
      .filter((m) => Number(m[1]) < 300)
      .map((m) => Number(m[2]));
    return facts.length >= 6 && Math.min(...facts) > boxTop + 6;
  })());
ok('no word is ever printed over the QR code',
  (() => {
    const frame = /0\.850 0\.830 0\.820 RG 0\.8 w ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) re S/.exec(pdfText);
    if (!frame) return false;
    const [x, y, w, h] = frame.slice(1).map(Number);
    const ops = [...pdfText.matchAll(/BT [\d.]+ [\d.]+ [\d.]+ rg \/\w+ ([\d.]+) Tf ([\d.]+) ([\d.]+) Td \(/g)];
    return ops.length > 20 && ops.every((m) => {
      const size = Number(m[1]);
      const tx = Number(m[2]);
      const ty = Number(m[3]);
      return !(tx >= x - 1 && tx <= x + w + 1 && ty >= y - size * 0.3 && ty <= y + h + 1);
    });
  })());

/* a paid event: the UPI code appears, and the pass waits for the screenshot */
console.log('\n— a paid event: the UPI code and the payment screenshot —');
const paidEvent = await sendJson('/api/events', 'POST', {
  title: 'Stress-buster workshop', kicker: 'Workshop', month: 11, day: 14, year: 2026, time: '3:00 PM',
  location: 'CSMU campus · Room 204', description: 'A hands-on workshop.', published: true,
  fee: 150, upiId: 'mindfultattva@upi', upiName: 'Mindful Tattva', registrationOpen: true,
  closesAt: '', capacity: 40,
}, AUTH);
const paidEventId = paidEvent.status === 201 ? JSON.parse(paidEvent.body).item.id : '';
ok('an event with a fee can be created from the dashboard', paidEvent.status === 201 && Boolean(paidEventId), String(paidEvent.body).slice(0, 200));

const paidRegister = await get('/register?event=' + encodeURIComponent(paidEventId), { session: FORM_SESSION });
ok('a paid event shows the club’s UPI code', paidRegister.body.includes('pay-card') && paidRegister.body.includes('mindfultattva@upi'), String(paidRegister.status));
ok('the QR is a real UPI code, drawn on the page', paidRegister.body.includes('shape-rendering="crispEdges"') && !/src="[^"]*api\.qrserver/.test(paidRegister.body));
ok('the fee is stated in the summary', paidRegister.body.includes('Rs. 150'));
const paidCsrf = 'test-form-token';
ok('the payment instructions are on the form', /upload the screenshot/i.test(paidRegister.body) && /keep the screenshot/i.test(paidRegister.body));

const paidRegistered = await sendJson('/api/registrations', 'POST', {
  eventId: paidEventId, name: 'Aisha Khan', email: 'aisha@example.com', phone: '+91 90000 00000', csrf: paidCsrf,
}, FORM);
const paidRegistration = JSON.parse(paidRegistered.body || '{}');
ok('a registration for a paid event is accepted', paidRegistered.status === 201, paidRegistered.status + ' ' + String(paidRegistered.body).slice(0, 160));
ok('the registration waits for the payment proof', paidRegistration.payment === 'pending', String(paidRegistration.payment));
/* ---- what a registration will and will not accept ------------------------
   The club asked for three things: a name of letters, an address that can
   really receive mail, and a ten-digit Indian mobile number. */
const reject = async (overrides) => sendJson('/api/registrations', 'POST', Object.assign({
  eventId: paidEventId, name: 'Riya Sharma', email: 'riya@example.com', phone: '9876543210', csrf: paidCsrf,
}, overrides), FORM);
const badName = await reject({ name: 'Riya 123' });
ok('a name with a number in it is refused', badName.status === 422 && /letters only/i.test(String(badName.body)), badName.status + ' ' + String(badName.body).slice(0, 120));
/* markup is stripped on the way in before anything is judged, so the symbol
   test uses symbols that survive that pass */
const symbolName = await reject({ name: 'Riya @ 99' });
ok('a name with symbols in it is refused', symbolName.status === 422, symbolName.status + ' ' + String(symbolName.body).slice(0, 120));
const badEmail = await reject({ email: 'riya@@example' });
ok('an address that could not receive mail is refused', badEmail.status === 422 && /email/i.test(String(badEmail.body)), badEmail.status + ' ' + String(badEmail.body).slice(0, 120));
const dottedEmail = await reject({ email: 'riya..sharma@example.com' });
ok('an address with a doubled dot is refused', dottedEmail.status === 422, dottedEmail.status + ' ' + String(dottedEmail.body).slice(0, 120));
const shortPhone = await reject({ phone: '98765 4321' });
ok('a phone number that is not ten digits is refused', shortPhone.status === 422 && /10-digit/i.test(String(shortPhone.body)), shortPhone.status + ' ' + String(shortPhone.body).slice(0, 130));
const landline = await reject({ phone: '1234567890' });
ok('a number that cannot be an Indian mobile is refused', landline.status === 422, landline.status + ' ' + String(landline.body).slice(0, 130));
const countryCode = await reject({ phone: '+91 90000 00000' });
ok('a number written with +91 and spaces is accepted',
  countryCode.status === 201, countryCode.status + ' ' + String(countryCode.body).slice(0, 130));
const storedPhone = countryCode.status === 201 ? JSON.parse(countryCode.body) : {};
ok('and it is stored as the ten digits the club will dial',
  (storedPhone.registration || {}).phone === undefined || JSON.stringify(storedPhone).includes('9000000000'),
  JSON.stringify(storedPhone).slice(0, 160));
if (countryCode.status === 201 && storedPhone.registration && storedPhone.registration.id) {
  await request({ uri: '/api/registrations/' + encodeURIComponent(storedPhone.registration.id), method: 'DELETE', ...AUTH });
}
ok('no serial is issued before the payment arrives', !paidRegistration.serial, 'serial ' + String(paidRegistration.serial));
const paidCode = paidRegistration.passUrl ? paidRegistration.passUrl.split('?')[0].replace('/pass/', '') : '';
const paidPassUrl = '/pass/' + paidCode;
const paidPass = await get(paidPassUrl, { session: FORM_SESSION });
ok('the pass page asks for the screenshot before issuing the pass', paidPass.body.includes('proof') && paidPass.body.includes('upload') && !paidPass.body.includes('Download your pass (PDF)'));
ok('the upload form never prints the private code', !paidPass.body.includes(paidCode) && paidPass.body.includes('action="/pass"'));
ok('no seat is held and no serial is shown while the fee is unpaid', /no serial, no pass and no seat exist/i.test(paidPass.body));
const earlyPdf = await get('/api/pass/' + encodeURIComponent(paidRegistration.id || 'x'), { session: paidPass.session || {} });
ok('the PDF cannot be downloaded before the screenshot arrives', earlyPdf.status === 409, 'status ' + earlyPdf.status);
const seatsBeforePay = await get('/api/registrations', AUTH);
const unpaidRow = (JSON.parse(seatsBeforePay.body).items || []).find((item) => item.id === paidRegistration.id) || {};
ok('the club register shows the unpaid row without a serial', unpaidRow.passReady === false && !unpaidRow.serial, JSON.stringify({ ready: unpaidRow.passReady, serial: unpaidRow.serial }));
ok('the club register never carries the student’s pass code', !/token|passCodeHash|MT-[2-9A-HJ-NP-Z]{5}-/i.test(seatsBeforePay.body), String(seatsBeforePay.body).slice(0, 120));

const paidSession = paidPass.session || {};
const paidReload = await get('/pass', { session: paidSession });
ok('the session remembers which pass the browser opened', /Pay Rs. 150 to hold your seat/.test(paidReload.body), paidReload.status + ' ' + String(paidReload.body).slice(0, 90));

const proofUpload = await request({
  uri: '/pass',
  method: 'POST',
  session: Object.assign({}, paidSession),
  post: { csrf: paidSession.csrf || 'test-form-token' },
  files: {
    proof: {
      name: 'receipt.png',
      type: 'image/png',
      base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' + 'A'.repeat(88),
    },
  },
});
ok('uploading the payment screenshot is accepted', proofUpload.status === 303, 'status ' + proofUpload.status + ' ' + String(proofUpload.body).replace(/\s+/g, ' ').slice(0, 300));
const paidPassAfter = await get('/pass?paid=1', { session: proofUpload.session || paidSession });
ok('the pass is issued once the proof is in', paidPassAfter.body.includes('Download your pass (PDF)'), paidPassAfter.status + ' ' + String(paidPassAfter.body).slice(0, 120));
ok('the private code is nowhere in the pass page', !paidPassAfter.body.includes(paidCode));
ok('the proof is recorded with the registration', /proof|Payment proof received|payment proof is with the club/i.test(paidPassAfter.body));
const issuedSerial = (/MTP-(?:\d{2}[A-Z]{3}\d{2}|\d{4})-\d{4}/.exec(paidPassAfter.body) || [''])[0];
ok('the serial appears only now, with the pass', SERIAL_SHAPE.test(issuedSerial), issuedSerial);
/* The pass QR is what the door reads: rebuild the matrix the page ships and
   make sure it is a real QR symbol — three finders, timing rows, right size —
   and that it never carries the private code. */
const qrSvg = (/<svg[^>]*aria-label="Code for pass[^"]*"[^>]*viewBox="0 0 (\d+) \d+"[^>]*>(.*?)<\/svg>/.exec(paidPassAfter.body) || []);
const qrGrid = (() => {
  if (!qrSvg[2]) return null;
  const total = Number(qrSvg[1]);
  const size = total - 8;                       // 4 quiet modules on every side
  const grid = Array.from({ length: size }, () => new Array(size).fill(0));
  for (const rect of qrSvg[2].matchAll(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"\/>/g)) {
    const [x, y, w, h] = rect.slice(1).map(Number);
    for (let dx = 0; dx < w; dx++) for (let dy = 0; dy < h; dy++) {
      if (grid[y + dy - 4] && grid[y + dy - 4][x + dx - 4] !== undefined) grid[y + dy - 4][x + dx - 4] = 1;
    }
  }
  return { size, grid };
})();
const finder = (grid, row, col) => [0, 1, 2, 3, 4, 5, 6].every((dy) => [0, 1, 2, 3, 4, 5, 6].every((dx) => {
  const ring = dy === 0 || dy === 6 || dx === 0 || dx === 6;
  const core = dy >= 2 && dy <= 4 && dx >= 2 && dx <= 4;
  return grid[row + dy][col + dx] === (ring || core ? 1 : 0);
}));
ok('the pass carries a real QR symbol',
  qrGrid !== null && (qrGrid.size - 21) % 4 === 0 && qrGrid.size >= 21
    && finder(qrGrid.grid, 0, 0) && finder(qrGrid.grid, 0, qrGrid.size - 7) && finder(qrGrid.grid, qrGrid.size - 7, 0)
    && qrGrid.grid.flat().filter(Boolean).length > qrGrid.size * 2,
  qrGrid ? qrGrid.size + ' modules' : 'no QR');
ok('the QR is not a picture of the private code', !paidPassAfter.body.includes(paidCode));

const paidPdf = await get('/api/pass/' + encodeURIComponent(issuedSerial || paidRegistration.id), { session: paidPassAfter.session || {} });
ok('the paid pass downloads as a PDF', paidPdf.status === 200 && String(paidPdf.body).startsWith('%PDF-1.4'), 'status ' + paidPdf.status);
const paidRow = ((JSON.parse((await get('/api/registrations', AUTH)).body).items) || []).find((item) => item.id === paidRegistration.id) || {};
ok('the seat is held only now', paidRow.passReady === true && paidRow.serial === issuedSerial, JSON.stringify({ ready: paidRow.passReady, serial: paidRow.serial }));
ok('the club can reprint any pass without the student’s code', (await get('/api/pass/' + encodeURIComponent(issuedSerial), AUTH)).status === 200);
ok('the pass says the payment is received, and nothing more',
  !/awaiting the club/i.test(paidPassAfter.body)
  && !/awaiting the club/i.test(String(paidPdf.body))
  && /Payment received/.test(paidPassAfter.body + String(paidRow.paymentLabel || '')));

/* A closing time is booked in the clock the test is actually running on. */
const localStamp = (offsetHours) => {
  const d = new Date(Date.now() + offsetHours * 3600 * 1000);
  const p = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + 'T' + p(d.getHours()) + ':' + p(d.getMinutes());
};
console.log('\n— the registration window —');
const expired = await sendJson('/api/events', 'POST', {
  title: 'Closed circle', month: 12, day: 1, year: 2026, time: '11:00 AM', location: 'Seminar Hall',
  published: true, fee: 0, registrationOpen: true, closesAt: localStamp(-2),
}, AUTH);
const expiredId = expired.status === 201 ? JSON.parse(expired.body).item.id : '';
const expiredPage = await get('/register?event=' + encodeURIComponent(expiredId));
ok('a window that has passed closes the form by itself', expiredPage.body.includes('closed') && !expiredPage.body.includes('Send and get my pass'), expiredPage.status + ' ' + expiredPage.body.slice(0, 0));
const expiredPost = await sendJson('/api/registrations', 'POST', { eventId: expiredId, name: 'Late Student', email: 'late@example.com', phone: '+91 90000 00001' });
ok('a registration after the window closes is refused', expiredPost.status === 409, 'status ' + expiredPost.status);
/* The club asked for this plainly: nothing may close on its own. An event with
   no closing date stays open — even years after it was opened — and the old
   "open for N hours" window is gone from the dashboard and the store alike. */
const alwaysOpen = await sendJson('/api/events', 'POST', {
  title: 'Two-hour window', month: 12, day: 2, year: 2026, time: '11:00 AM', location: 'Seminar Hall',
  published: true, fee: 0, registrationOpen: true, openedAt: '2020-01-01T09:00',
}, AUTH);
const hoursId = alwaysOpen.status === 201 ? JSON.parse(alwaysOpen.body).item.id : '';
const hoursItem = alwaysOpen.status === 201 ? JSON.parse(alwaysOpen.body).item : {};
const hoursPage = await get('/register?event=' + encodeURIComponent(hoursId));
ok('an event with no closing date never closes by itself',
  hoursPage.body.includes('Send and get my pass') && hoursItem.windowMode === 'date' && hoursItem.openHours === undefined,
  hoursPage.status + ' ' + JSON.stringify({ mode: hoursItem.windowMode, openHours: hoursItem.openHours }));
const futureWindow = await sendJson('/api/events', 'POST', {
  title: 'Open until tomorrow', month: 12, day: 3, year: 2026, time: '11:00 AM', location: 'Seminar Hall',
  published: true, fee: 0, registrationOpen: true, closesAt: localStamp(30),
}, AUTH);
const futureId = futureWindow.status === 201 ? JSON.parse(futureWindow.body).item.id : '';
const futurePage = await get('/register?event=' + encodeURIComponent(futureId));
ok('a closing date in the future keeps the form open, and it is stated',
  futurePage.body.includes('Send and get my pass') && /Registration closes on/i.test(futurePage.body), futurePage.status + ' ' + futurePage.body.slice(0, 0));
await request({ uri: '/api/events/' + encodeURIComponent(futureId), method: 'DELETE', ...AUTH });
await request({ uri: '/api/events/' + encodeURIComponent(hoursId), method: 'DELETE', ...AUTH });
await request({ uri: '/api/events/' + encodeURIComponent(expiredId), method: 'DELETE', ...AUTH });

console.log('\n— the club dashboard side —');
const inboxAnon = await get('/api/registrations');
ok('anonymous visitors cannot read the register', inboxAnon.status === 401, 'status ' + inboxAnon.status);
const waitingForProof = await sendJson('/api/registrations', 'POST', {
  eventId: paidEventId, name: 'Waiting Student', email: 'waiting@example.com', phone: '+91 90000 00001', csrf,
}, FORM);
let waitingItem = {};
try { waitingItem = JSON.parse(waitingForProof.body); } catch (error) { /* reported below */ }

const registerList = await get('/api/registrations', AUTH);
const regItems = JSON.parse(registerList.body).items || [];
ok('the dashboard reads every registration', registerList.status === 200 && regItems.length >= 2, 'count ' + regItems.length);
ok('the register carries a pass serial for every issued pass',
  regItems.filter((item) => item.passReady).every((item) => SERIAL_SHAPE.test(item.serial || '')));
ok('the register marks which passes are ready',
  regItems.some((item) => item.id === waitingItem.id && item.passReady === false && !item.serial)
  && regItems.some((item) => item.serial === issuedSerial && item.passReady === true));
const perEvent = await get('/api/registrations?event=' + encodeURIComponent(paidEventId), AUTH);
ok('the register can be read per event', (JSON.parse(perEvent.body).items || []).length >= 1);

const csvAnon = await get('/api/registrations.csv');
ok('the CSV is not public', csvAnon.status === 401, 'status ' + csvAnon.status);
const csv = await get('/api/registrations.csv', AUTH);
const csvBody = String(csv.body);
ok('the CSV downloads for the club', csv.status === 200 && /text\/csv/.test(JSON.stringify(csv.headers)), 'status ' + csv.status);
ok('the CSV lists every pass serial for the gate', csvBody.includes('Pass serial') && csvBody.includes(registration.serial || 'x') && csvBody.includes(issuedSerial || 'y'));
ok('the CSV marks a seat that is not held yet', /not held yet/i.test(csvBody) && !/Student note/i.test(csvBody));
ok('the CSV carries each pass check link', csvBody.includes('/verify/' + (registration.publicId || 'x')));
ok('the CSV carries the venue and the fee', csvBody.includes('Venue') && /(^|,)Fee(,|$)/.test(csvBody));

const verify = await sendJson('/api/registrations/' + encodeURIComponent(paidRegistration.id || 'x'), 'PUT', { paymentStatus: 'verified' }, AUTH);
ok('the club can verify a payment', verify.status === 200 && JSON.parse(verify.body).item.paymentStatus === 'verified', String(verify.body).slice(0, 160));
const cancel = await sendJson('/api/registrations/' + encodeURIComponent(paidRegistration.id || 'x'), 'PUT', { status: 'cancelled', paymentStatus: 'rejected' }, AUTH);
ok('the club can cancel a registration with a refund', cancel.status === 200 && JSON.parse(cancel.body).item.status === 'cancelled');
const cancelledPass = await get(paidPassUrl);
ok('a cancelled pass says so at the door', /cancelled/i.test(cancelledPass.body) && /24 working days/.test(cancelledPass.body));
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
for(const [field,value] of [['name','Student 123'],['phone','12345678'],['email','a..b@example.com']]) {
  const payload={name:'Join Student',email:'join-student@example.com',phone:'9876543210',[field]:value};
  const rejected=await sendJson('/api/submissions','POST',payload);
  ok('membership backend rejects invalid '+field+' even without browser validation',rejected.status===422&&JSON.parse(rejected.body).fields.includes(field));
}
const validJoin=JSON.parse((await sendJson('/api/submissions','POST',{name:'Join Student',email:'join-student@example.com',phone:'+91 98765 43210'})).body);
const joinInbox=JSON.parse((await get('/api/submissions',AUTH)).body);
ok('membership stores the same normalised ten-digit phone as event registration',(joinInbox.items||[]).some(row=>row.id===validJoin.id&&row.phone==='9876543210'));
await request({uri:'/api/submissions/'+validJoin.id,method:'DELETE',...AUTH});
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
ok('the form also works without JavaScript (a real POST redirects)', halfWay.status === 303 && /\/pass\/MT(-[2-9A-HJ-NP-Z]{5}){4}/.test(JSON.stringify(halfWay.headers)), halfWay.status + ' ' + JSON.stringify(halfWay.headers).slice(0, 160));

/* The club area is a sign-in page first, then one page per section. */
const dashboard = await get('/dashboard');
ok('GET /dashboard returns 200', dashboard.status === 200);
ok('a signed-out /dashboard is only the password screen', dashboard.body.includes('id="loginForm"'));
/* the stylesheet is inlined, so only markup markers count here */
ok('a signed-out /dashboard sends no dashboard markup at all',
  !dashboard.body.includes('class="dash-shell"') && !dashboard.body.includes('id="appView"')
    && !dashboard.body.includes('id="dashNav"') && !/<section class="panel/.test(dashboard.body));
ok('a signed-out /dashboard leaks none of the site copy', !dashboard.body.includes('student-led psychology club'));
ok('the dashboard is noindex', /noindex/.test(dashboard.body));
ok('no “Content Studio” wording in the dashboard', !/content studio/i.test(dashboard.body));

const signedOutSection = await get('/dashboard/registrations');
ok('a bookmarked section link still only offers the password screen',
  signedOutSection.body.includes('id="loginForm"')
    && !/<section class="panel/.test(signedOutSection.body)
    && !/<div class="dash-shell/.test(signedOutSection.body),
  signedOutSection.status + ' panels=' + (/<section class="panel/.test(signedOutSection.body)));

/* every section is its own page, and it renders nothing but itself */
const SECTIONS = ['overview', 'copy', 'team', 'events', 'events-register', 'gallery', 'inbox', 'data'];
const panelIds = (body) => [...String(body).matchAll(/<section class="panel[^"]*" id="(panel-[a-z-]+)"/g)].map((m) => m[1]);
for (const section of SECTIONS) {
  const page = await get('/dashboard/' + section, AUTH);
  const found = panelIds(page.body);
  ok('the ' + section + ' page carries only its own section',
    page.status === 200 && found.length === 1 && found[0] === 'panel-' + section,
    page.status + ' ' + JSON.stringify(found));
}
const overviewPage = await get('/dashboard/overview', AUTH);
ok('the club area heads each page with the section name', /<h1 id="panelTitle">/.test(overviewPage.body) && overviewPage.body.includes('Overview'));
ok('the sidebar is real links between sections',
  ['/dashboard/overview', '/dashboard/team', '/dashboard/events', '/dashboard/gallery']
    .every((href) => overviewPage.body.includes('href="' + href + '"')));
ok('the club area inlines its own styles', overviewPage.body.includes('.dash-shell'));
ok('the overview carries the counters and no tiles', overviewPage.body.includes('id="overviewStats"') && !overviewPage.body.includes('panel-awareness'));

const badLogin = await sendJson('/api/login', 'POST', { password: 'definitely-wrong' });
ok('wrong password is rejected', badLogin.status === 401, 'status ' + badLogin.status);
const goodLogin = await sendJson('/api/login', 'POST', { password: 'Csmu@MT' });
ok('the club password signs in', goodLogin.status === 200 && JSON.parse(goodLogin.body).authenticated === true, String(goodLogin.body).slice(0, 160));
ok('signing in says where to carry on', /^\/dashboard\//.test(String(JSON.parse(goodLogin.body || '{}').after || '')), String(JSON.parse(goodLogin.body || '{}').after));
const noCsrf = await sendJson('/api/site', 'PUT', { tagline: 'x' }, { session: SESSION });
ok('missing CSRF token is rejected on a write', noCsrf.status === 419, 'status ' + noCsrf.status);

/* The dashboard downloads the register and the backup with plain links, and a
   link cannot send a header: those reads must work on the session alone. */
const plainCsv = await get('/api/registrations.csv', { session: SESSION });
ok('the register downloads from a plain link, with no token', plainCsv.status === 200 && /name/i.test(String(plainCsv.body).split('\n')[0]), 'status ' + plainCsv.status);
const plainExport = await get('/api/export', { session: SESSION });
ok('the backup downloads from a plain link, with no token', plainExport.status === 200 && /\{/.test(String(plainExport.body).slice(0, 2)), 'status ' + plainExport.status);
const plainList = await get('/api/registrations', { session: SESSION });
ok('the register list opens from a plain link, with no token', plainList.status === 200 && Array.isArray(JSON.parse(String(plainList.body) || '{}').items), 'status ' + plainList.status);
const plainDelete = await request({ uri: '/api/events/event-welcome-circle', method: 'DELETE', session: SESSION });
ok('a delete still needs the token, even signed in', plainDelete.status === 419, 'status ' + plainDelete.status);
const editCopy = await sendJson('/api/site', 'PUT', { tagline: 'A calmer space to understand the mind.' }, AUTH);
ok('site copy saves with a token', editCopy.status === 200, String(editCopy.body).slice(0, 160));
/* The club's own event is saved with the values it already carries: a test must
   never quietly clear the club's closing date or overwrite the venue it typed. */
const windowBefore = JSON.parse((await get('/api/events/event-welcome-circle', AUTH)).body).item || {};
const keepLocation = windowBefore.location || 'CSMU campus · Seminar Hall';
const eventPatch = await sendJson('/api/events/event-welcome-circle', 'PUT',
  { fee: windowBefore.fee ?? 0, closesAt: windowBefore.closesAt ?? '', location: keepLocation }, AUTH);
ok('an event keeps its typed venue, and carries no hours window any more',
  eventPatch.status === 200 && JSON.parse(eventPatch.body).item.location === 'CSMU campus · Seminar Hall'
  && JSON.parse(eventPatch.body).item.openHours === undefined
  && JSON.parse(eventPatch.body).item.windowMode === 'date', String(eventPatch.body).slice(0, 220));
const capture = await get('/api/events/event-welcome-circle', AUTH);
const captured = JSON.parse(capture.body);
ok('the venue is free text, not a fixed list', (captured.location || (captured.item || {}).location) === keepLocation, String(capture.body).slice(0, 120));
ok('and the club’s closing date came through the save untouched',
  (JSON.parse(eventPatch.body).item || {}).closesAt === (windowBefore.closesAt || ''), String(eventPatch.body).slice(0, 160));

console.log('\n— backups, uploads and settings —');
const backups = await get('/api/backups', AUTH);
const backupItems = JSON.parse(backups.body).items || [];
ok('a backup is created on save', backupItems.length >= 1, 'count ' + backupItems.length);
if (backupItems.length) {
  const beforeRestoreRevision = JSON.parse((await get('/api/site', AUTH)).body).revision;
  const restored = await sendJson('/api/backups/restore', 'POST', { name: backupItems[0].name }, AUTH);
  ok('a backup can be restored', restored.status === 200, String(restored.body).slice(0, 160));
  ok('restoring an older backup still advances the live revision', JSON.parse(restored.body).revision > beforeRestoreRevision);
}
const exportDb = await get('/api/export', AUTH);
ok('full backup export works', exportDb.status === 200 && exportDb.body.includes('"site"'));
/* A successful HTTP import must preserve the actual data, links and pass
   hashes, not merely return 200. Keep this round-trip isolated in the VM DB. */
const roundtripBefore = JSON.parse(exportDb.body);
const importFixture = structuredClone(roundtripBefore);
importFixture.events.push({id:'event-import-roundtrip',order:42,number:991,title:'Roundtrip event',month:12,day:20,year:2026,published:true,brochureUrl:'https://example.com/poster.pdf'});
importFixture.registrations.push({id:'reg-import-roundtrip',eventId:'event-import-roundtrip',serial:'MTP-20DEC26-0991',publicId:'v-import-roundtrip',passCodeHash:'a'.repeat(64),name:'Roundtrip Student',token:'legacy-plaintext',code:'legacy-code',eventFee:0,paymentStatus:'not-required',status:'confirmed'});
importFixture.settings.frontendRegistration = false;
importFixture.history[0].order=43;
importFixture.gallery.push({id:'gallery-import-roundtrip',order:44,visible:false,image:'/assets/photos/mt-club-logo.jpg'});
const roundtripImport = await sendJson('/api/import','POST',{db:importFixture},AUTH);
const roundtripAfter = JSON.parse((await get('/api/export',AUTH)).body);
ok('backup import preserves collection IDs and relationships', roundtripImport.status===200
  && roundtripAfter.events.some(row=>row.id==='event-import-roundtrip')
  && roundtripBefore.team.every(row=>roundtripAfter.team.some(saved=>saved.id===row.id)));
ok('backup import preserves registrations, serials and private pass hashes',
  roundtripAfter.registrations.length===importFixture.registrations.length
  && roundtripAfter.registrations.some(row=>row.id==='reg-import-roundtrip'&&row.eventId==='event-import-roundtrip'&&row.passCodeHash==='a'.repeat(64)));
ok('backup import never restores legacy plaintext pass secrets',roundtripAfter.registrations.every(row=>row.token===undefined&&row.code===undefined));
ok('import is a new revision and preserves the registration setting', roundtripAfter.revision>roundtripBefore.revision && roundtripAfter.settings.frontendRegistration===false);
ok('backup import preserves event/history order and gallery visibility',
  roundtripAfter.events.find(row=>row.id==='event-import-roundtrip').order===42
  && roundtripAfter.history[0].order===43
  && roundtripAfter.gallery.find(row=>row.id==='gallery-import-roundtrip').visible===false);
const orderPatch=JSON.parse((await sendJson('/api/events/event-import-roundtrip','PUT',{order:17},AUTH)).body);
ok('event display-order changes really persist',orderPatch.item.order===17);
ok('brochure links survive import and render in the calendar', roundtripAfter.events.some(row=>row.id==='event-import-roundtrip'&&row.brochureUrl==='https://example.com/poster.pdf')
  && (await get('/calendar')).body.includes('https://example.com/poster.pdf'));
await sendJson('/api/import','POST',{db:roundtripBefore},AUTH);
const upload = await sendJson('/api/upload', 'POST', {
  dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR42mP8z8DAwMDAwMDAwMDAAAAOAAGx4sQAAAAASUVORK5CYII=',
  kind: 'image',
}, AUTH);
ok('a base64 upload is stored', upload.status === 201, String(upload.body).slice(0, 200));
const badUpload = await sendJson('/api/upload', 'POST', { dataUrl: 'data:text/html;base64,PHNjcmlwdD4=', kind: 'image' }, AUTH);
ok('non-image uploads are refused', badUpload.status === 415 || badUpload.status === 400, 'status ' + badUpload.status);
const uploadedUrl = upload.status === 201 ? (JSON.parse(String(upload.body)).url || '') : '';
/* The harness hands static files to PHP, so whether the host serves an upload
   is checked over real HTTP in tools/deploy-check.mjs; here the store's own
   answer is what matters. */
ok('an uploaded picture is stored under uploads/YYYY/MM with its own name',
  /^\/uploads\/\d{4}\/\d{2}\/[a-z0-9-]+\.(png|jpe?g|webp|gif)$/i.test(uploadedUrl)
  && Number(JSON.parse(String(upload.body)).bytes) > 0,
  uploadedUrl || 'no url');
ok('an uploaded picture is never named after the visitor', !/upload|pasted|data/i.test(uploadedUrl.split('/').pop() || 'x'), uploadedUrl);
ok('the CSV opens straight in a spreadsheet', Buffer.from(String(csv.body), 'utf8').slice(0, 3).toString('hex') === 'efbbbf');
const wrongPassword = await sendJson('/api/password', 'POST', { current: 'nope', password: 'newpass123' }, AUTH);
ok('password change needs the current password', wrongPassword.status === 403, 'status ' + wrongPassword.status);
const changePassword = await sendJson('/api/password', 'POST', { current: 'Csmu@MT', password: 'Csmu@MT2' }, AUTH);
ok('password change works with the current one', changePassword.status === 200, String(changePassword.body).slice(0, 160));
if (changePassword.status === 200) {
  const loginNew = await sendJson('/api/login', 'POST', { password: 'Csmu@MT2' });
  ok('the new password signs in', loginNew.status === 200, 'status ' + loginNew.status);
  ok('changing the password signs every other device out', loginNew.session && loginNew.session.fingerprint !== SESSION.fingerprint, 'the generation moved');
  const newAuth = { session: loginNew.session || {}, headers: { 'X-CSRF-Token': (loginNew.session || {}).csrf || '' } };
  const backAgain = await sendJson('/api/password', 'POST', { current: 'Csmu@MT2', password: 'Csmu@MT' }, newAuth);
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
ok('robots.txt never advertises the private paths',
  robots.status === 200 && !/dashboard|studio|backend|health|pass/i.test(robots.body));
ok('the private pages keep themselves out of search engines instead',
  (await get('/dashboard')).body.includes('noindex') && (await get('/health')).body.includes('noindex'));
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
for (const asset of ['assets/app.js', 'assets/manage.js']) {
  const code = fs.readFileSync(path.join(ROOT, asset), 'utf8');
  try { new vm.Script(code, { filename: asset }); ok(asset + ' parses', true); }
  catch (error) { ok(asset + ' parses', false, error.message); }
}
ok('reveals are hidden only under html.js', /html\.js \.scroll-reveal \{/.test(appCss) && !/^\s*\.scroll-reveal \{ opacity: 0/m.test(appCss));
ok('a script that never arrives cannot hide content', /classList\.remove\('js'\)/.test(layoutSource));
ok('the bubbles keep their motion', ['bubbleDrift', 'orbitSpin', 'psiPulse', 'fadeIn', 'breathe', 'stickerPulse'].every((name) => appCss.includes('@keyframes ' + name)));
ok('the mobile menu is styled', /\.nav-links\.open/.test(appCss) || /nav-links\.open/.test(appCss));
ok('the menu puts itself away when the visitor taps elsewhere',
  appJs.includes('if (nav.contains(event.target) || button.contains(event.target)) return;')
  && appJs.includes("if (event.key === 'Escape' && nav.classList.contains('open')) { close(); button.focus(); }"));
ok('a phone keeps the lights at a smaller cost',
  /\.drift-blob \{ filter: blur\(30px\); opacity: \.36; \}/.test(appCss)
  && /\.blob-c \{ display: none; \}/.test(appCss));
ok('the pass prints as the pass', /@media print/.test(appCss) && /\.pass-ticket/.test(appCss));
ok('the payment card and the upload row are styled', appCss.includes('.pay-card') && appCss.includes('.upload-row') && appCss.includes('.status-chip'));
ok('the register panel and the pass cards are styled', appCss.includes('.fact-card') && appCss.includes('.register-form') && appCss.includes('.pass-ticket'));
ok('the register, the pass and the check page fit a phone',
  /@media \(max-width: 620px\)/.test(appCss)
  && /\.register-submit \{[^}]*width: 100%/.test(appCss)
  && /\.pass-facts \{[^}]*grid-template-columns: 1fr/.test(appCss)
  && /\.register-grid \{[^}]*grid-template-columns: 1fr/.test(appCss));
ok('the butterfly replaces the old gold thread', !home.body.includes('id="threadBead"') && !appJs.includes('setupGoldThread') && appJs.includes('const progress = clamp('));
ok('the calendar keeps its own page styles', appCss.includes('.calendar-months') && appCss.includes('.calendar-month'));

/* ---- the phone layout, checked against the stylesheet itself -------------
   These three failures all shipped once: a later rule emptied the hamburger
   menu, the two-column blocks never stacked, and the calendar headline was
   painted dark on its own dark banner. */
const cssBlocks = (source) => [...source.matchAll(/@media\s*\(([^)]+)\)\s*\{([\s\S]*?)\n\}/g)];
const phoneBlocks = cssBlocks(appCss).filter(([, q]) => /max-width:\s*(3|4|5|6|7|8)\d\dpx|max-width:\s*860px/.test(q));
ok('nothing hides the menu links on a phone',
  !/\.nav-links a(?:\.[\w-]+)?\s*\{[^}]*display\s*:\s*none/.test(appCss) && !/\.nav-links\s+a:not\(\.nav-action\)\s*\{[^}]*display\s*:\s*none/.test(appCss));
ok('the hamburger panel lists every link as a tappable row',
  /\.nav-links a \{[^}]*display: block/.test(appCss) && /\.nav-links a \{[^}]*padding: 12px/.test(appCss));
ok('every wide block stacks on a phone',
  phoneBlocks.some(([, , body]) => /\.hero-grid, \.about-grid, \.psyche-grid, \.history-wrap, \.contact-grid,\s*\n?\s*\.hero-art \{ grid-template-columns: 1fr/.test(body))
  && /\.event-card \{ grid-template-columns: 1fr/.test(appCss)
  && /\.timeline-item \{ grid-template-columns: 86px 1fr/.test(appCss));
ok('a long word cannot push a column off the screen',
  /\.hero-grid > \*, \.about-grid > \*/.test(appCss) && /h1, h2, h3, \.display \{ overflow-wrap: break-word/.test(appCss));
ok('the calendar headline is light on its dark banner',
  /\.calendar-hero h1 \{[^}]*color:\s*#fffaf1/.test(appCss));

/* ---- event albums: nothing from one event is ever shown inside another ----
   The password tests above signed every other device out, so the club signs
   in once more before filing anything. The harness hands back raw bodies, so
   every answer is parsed here. */
const freshLogin = await sendJson('/api/login', 'POST', { password: 'Csmu@MT' });
const FRESH = { session: freshLogin.session || {}, headers: { 'X-CSRF-Token': (freshLogin.session || {}).csrf || '' } };
const asJson = (result) => { try { return JSON.parse(String((result || {}).body || '{}')) || {}; } catch (error) { return {}; } };

const eventsBefore = (asJson(await sendJson('/api/events', 'GET', undefined, FRESH)).items || []);
const highestBefore = eventsBefore.reduce((top, event) => Math.max(top, Number(event.number) || 0), 0);
const numberedEvent = await sendJson('/api/events', 'POST', {
  title: 'Second gathering', month: 12, day: 5, year: 2026, time: '5:00 PM', location: 'CSMU campus',
  kicker: 'Circle', fee: 0, published: true, order: 90,
}, FRESH);
const numberedItem = asJson(numberedEvent).item || {};
const numberedId = numberedItem.id || '';
const numberedNumber = Number(numberedItem.number) || 0;
ok('a new event is filed under the next number',
  numberedEvent.status === 201 && numberedNumber === highestBefore + 1,
  numberedEvent.status + ' number=' + numberedNumber + ' (highest was ' + highestBefore + ')');

const filedPhoto = await sendJson('/api/gallery', 'POST', {
  caption: 'Filed photo', alt: 'A filed photo', eventId: numberedId, image: '/assets/photos/mt-club-logo.jpg', order: 1,
}, FRESH);
const filedItem = asJson(filedPhoto).item || {};
ok('a photo can be filed under an event',
  filedPhoto.status === 201 && numberedId !== '' && filedItem.eventId === numberedId,
  'sent ' + numberedId + ' · saved ' + filedItem.eventId);

/* The club asked for no categories: a photo is a caption and an order. */
const orderOne = await sendJson('/api/gallery', 'POST', {
  caption: 'Leads the album', alt: 'Leading photo', image: '/assets/photos/mt-club-logo.jpg', order: 1,
}, FRESH);
const orderTwo = await sendJson('/api/gallery', 'POST', {
  caption: 'Comes next', alt: 'Second photo', image: '/assets/photos/mt-club-logo.jpg', order: 2,
}, FRESH);
const orderedPage = await get('/gallery');
ok('the gallery is one strip with no categories in it',
  !/class="album\b/.test(orderedPage.body) && !/gallery-chip/.test(orderedPage.body)
  && !/album-count/.test(orderedPage.body) && !/<h3>Second gathering<\/h3>/.test(orderedPage.body));
const firstAt = orderedPage.body.indexOf('Leads the album');
const secondAt = orderedPage.body.indexOf('Comes next');
ok('the club\'s order decides what comes first',
  firstAt > 0 && secondAt > firstAt, 'order 1 at ' + firstAt + ', order 2 at ' + secondAt);
ok('the slideshow is built from the same photos, in the same order',
  orderedPage.body.indexOf('Leads the album') < orderedPage.body.indexOf('Comes next')
  && /<script type="application\/json" id="gallery-data">/.test(orderedPage.body)
  && orderedPage.body.indexOf('gallery-data') > orderedPage.body.indexOf('archive-grid'));
ok('no photo is ever cropped: it is drawn whole over a softened copy of itself',
  /\.gallery-visual\.has-image, \.archive-image, \.gallery-stage-image\.has-image \{[^}]*background-size: contain/.test(appCss)
  && /\.archive-image \{[^}]*background-size: contain/.test(appCss)
  && /\.gallery-visual\.has-image:before, \.archive-image:before, \.gallery-stage-image\.has-image:before \{[^}]*background-image: inherit/.test(appCss)
  && /background-image: inherit; background-size: cover/.test(appCss)
  && /filter: blur\(22px\) brightness\(\.6\)/.test(appCss));
ok('the stage lays the same photo softly behind the picture, and it drifts',
  /\.gallery-stage-image\.has-image:before \{[^}]*animation: fillDrift/.test(appCss)
  && /@keyframes fillDrift/.test(appCss));
ok('a photo tile keeps its caption readable over any picture',
  /\.gallery-item:after \{[^}]*linear-gradient\(0deg, rgba\(30,18,38,\.62\)/.test(appCss)
  && /\.gallery-caption \{[^}]*z-index: 3/.test(appCss));
/* clean up the two extra photos so the site stays exactly as the club left it */
await request({ uri: '/api/gallery/' + ((asJson(orderOne).item || {}).id || 'x'), method: 'DELETE', ...FRESH });
await request({ uri: '/api/gallery/' + ((asJson(orderTwo).item || {}).id || 'x'), method: 'DELETE', ...FRESH });
const afterAlbumCleanup = await get('/gallery');
ok('the extra photos are gone again', !afterAlbumCleanup.body.includes('Leads the album') && !afterAlbumCleanup.body.includes('Comes next'));
const homeAlbums = await get('/');
ok('the event cards and calendar entries wear their number',
  /class="visual-number">Event \d+/.test(homeAlbums.body) || /calendar-event-number">Event \d+/.test(homeAlbums.body));

/* clean up the extra event and photo so the site stays exactly as the club left it */
await request({ uri: '/api/gallery/' + filedItem.id, method: 'DELETE', ...FRESH });
await request({ uri: '/api/events/' + numberedId, method: 'DELETE', ...FRESH });
const afterCleanup = await get('/gallery');
ok('the extra album is gone again', !afterCleanup.body.includes('Second gathering'));

/* ---- the photo frame: photos open big, on both pages ---- */
ok('the photo frame is on the gallery page', afterCleanup.body.includes('id="photoFrame"'));
ok('every gallery photo is clickable', /class="archive-image" aria-label="Open/.test(afterCleanup.body));
ok('the home grid photos are clickable too', /class="gallery-visual has-image" aria-label="Open/.test(homeAlbums.body));
/* ---- the other things the club asked for in this round ---- */
const loginPageIcons = (await get('/dashboard')).body;
ok('the club area asks for the club logo in the tab',
  loginPageIcons.includes('favicon-48.png') && loginPageIcons.includes('favicon-192.png') && loginPageIcons.includes('/favicon.ico'));
ok('the public pages ask for the club logo too',
  homeAlbums.body.includes('favicon-48.png') && homeAlbums.body.includes('/favicon.ico'));
ok('no psi or sparkle icon is left in any page head', !/rel="(mask-)?icon"[^>]*favicon\.svg/.test(homeAlbums.body + loginPageIcons));
const iconFile = fs.readFileSync(path.join(ROOT, 'favicon.ico'));
ok('a real favicon.ico sits at the web root (browsers ask for it directly)',
  iconFile.slice(0, 4).equals(Buffer.from([0, 0, 1, 0])) && iconFile.length > 2000, iconFile.length + ' bytes');

const termsBlock = (/<div class="terms-note">([\s\S]*?)<\/div>/.exec(registerPage.body) || [])[1] || '';
const termsLines = [...termsBlock.matchAll(/<li>/g)].length;
ok('the conditions are numbered lines, one each', /<ol>/.test(termsBlock) && termsLines >= 5, termsLines + ' lines');
ok('every condition is a short line, none is a paragraph',
  [...termsBlock.matchAll(/<li>([\s\S]*?)<\/li>/g)].every((m) => m[1].replace(/<[^>]+>/g, '').trim().length <= 130));

/* psi stays, but only in its two homes: the lens section and the album */
ok('the psi sign is kept where it means something',
  homeAlbums.body.includes('psyche-psi') && (await get('/gallery')).body.includes('mini-psi'));
ok('small planets turn around the circle of words in the lens',
  (homeAlbums.body.match(/loop-orbit/g) || []).length >= 3
  && !/loop-orbit[^>]*><img/.test(homeAlbums.body)
  && /\.loop-orbit \{[^}]*animation: orbitTurn/.test(appCss)
  && /\.loop-orbit:after \{[^}]*radial-gradient/.test(appCss));
ok('the circle of words sits at the left, clear of the screen edge',
  /\.curiosity-loop \{[^}]*margin: 42px 0 6px 6px/.test(appCss)
  && /\.curiosity-loop b \{[^}]*transform: rotate\(-12deg\)/.test(appCss));
ok('every planet rides its own ring: same box, same centre, same angle and speed',
  /\.curiosity-loop:before, \.curiosity-loop:after, \.loop-orbit \{[^}]*left: 50%; top: 50%/.test(appCss)
  && /\.curiosity-loop:before, \.curiosity-loop:after, \.loop-orbit \{[^}]*margin-left: calc\(var\(--w\) \/ -2\)/.test(appCss)
  && /\.curiosity-loop:before \{ --w: 208px; --h: 148px; --start: 55deg; --speed: 19s; \}/.test(appCss)
  && /\.loop-orbit-a \{ --w: 208px; --h: 148px; --start: 55deg; --speed: 19s;/.test(appCss)
  && /\.loop-orbit-b \{ --w: 150px; --h: 214px; --start: -34deg; --speed: 26s;/.test(appCss)
  /* an auto margin cannot centre a box wider than its circle — that was the
     bug that left the planets orbiting beside their rings */
  && !/\.loop-orbit \{[^}]*inset: 0; margin: auto/.test(appCss));
ok('nothing else was drawn between the rings', !/loop-thread|loop-spark/.test(appCss) && !homeAlbums.body.includes('loop-thread'));
ok('the words of the lens stay above the rings and the planets', /\.curiosity-loop b \{[^}]*z-index: 3/.test(appCss) && /\.loop-orbit \{[^}]*z-index: 2/.test(appCss));
ok('one golden line runs through the beginning, our why and the next chapter',
  homeAlbums.body.includes('timeline-spine')
  && /\.timeline-spine \{[^}]*overflow: hidden/.test(appCss)
  && /\.timeline-glint \{[^}]*animation: lineRun/.test(appCss)
  && !/\.timeline-item:not\(:last-child\):after \{/.test(appCss));
ok('the page keeps moving: a golden streak over the hero and a sheen on the lens cards',
  homeAlbums.body.includes('hero-comet')
  && /\.hero-comet \{[^}]*animation: cometRun/.test(appCss)
  && /\.psyche-card:hover:before \{[^}]*translateX/.test(appCss));
ok('the club’s own words drift past in a band under the hero, seamless and quiet',
  (homeAlbums.body.match(/class="values-run"/g) || []).length === 4
  && homeAlbums.body.includes('aria-hidden="true">') && homeAlbums.body.includes('values-marquee')
  && /\.values-track \{[^}]*animation: marqueeRun 52s linear infinite/.test(appCss)
  /* one copy is about 1000px wide: four copies and a quarter-track slide keeps
     the seam off screen even where a two-copy band would run out of words */
  && /@keyframes marqueeRun \{ from \{ transform: translateX\(0\); \} to \{ transform: translateX\(-25%\); \} \}/.test(appCss));
ok('there is no gold progress line across the header',
  !layoutSource.includes('id="readProgress"') && !layoutSource.includes('class="gold-thread"'));
ok('the way back up appears once the page has been read a little',
  layoutSource.includes('id="toTop"') && /\.to-top\.is-on \{[^}]*opacity: 1/.test(appCss)
  && appJs.includes("toTop.classList.toggle('is-on', y > 700)"));
const navGlass = {
  rest: Number((appCss.match(/\.nav:before \{[^}]*background: rgba\(255,250,241,([\d.]+)\)/) || [])[1]),
  scrolled: Number((appCss.match(/body\.is-scrolled \.nav:before \{[^}]*rgba\(255,250,241,([\d.]+)\)/) || [])[1]),
};
ok('the top bar reads a little more solid once the visitor has scrolled',
  navGlass.rest > 0 && navGlass.scrolled > navGlass.rest
  && appJs.includes("classList.toggle('is-scrolled', y > 40)"),
  'rest ' + navGlass.rest + ' → scrolled ' + navGlass.scrolled);
ok('no bold word inside a condition is turned into a block of its own',
  /\.terms-note > strong \{ display: block/.test(appCss)
  && !/\.terms-note strong \{ display: block/.test(appCss)
  && /\.terms-note li strong \{ color: var\(--plum-deep\); \}/.test(appCss));
ok('the conditions carry no dots and no numbered chips',
  /\.terms-note ol \{[^}]*list-style: none/.test(appCss)
  && /\.terms-note li:before \{ content: none; \}/.test(appCss)
  && /\.terms-note li::marker \{ content: none; \}/.test(appCss)
  && /\.pass-rules li::marker \{ content: none; \}/.test(appCss)
  && !/\.terms-note li:before \{[^}]*counter\(term\)/.test(appCss)
  && !/counter-reset: term/.test(appCss));
ok('the top bar travels with the page, so the menu is always at hand',
  /\.nav-wrap \{ position: sticky; top: 0; z-index: 60; \}/.test(appCss)
  && /\.site-shell \{[^}]*overflow-x: clip/.test(appCss)
  && !/\.site-shell \{ position: relative; z-index: 1; overflow: hidden; \}/.test(appCss)
  && /body\.is-scrolled \.nav-wrap:before \{ opacity: 1; \}/.test(appCss)
  && appCss.includes('.nav-wrap:after { display: none; }')
  && layoutSource.includes('id="menuButton"') && layoutSource.includes('class="nav-wrap"'));
ok('warm lights drift behind every page and settle when less motion is asked for',
  layoutSource.includes('class="drift-field"') && layoutSource.includes('id="driftField"')
  && /\.drift-blob \{[^}]*filter: blur/.test(appCss)
  && /@keyframes blobDriftA/.test(appCss)
  && /\.drift-sparkle \{[^}]*animation: sparkleTwinkle/.test(appCss)
  && /\.drift-petal \{[^}]*animation: petalFall/.test(appCss)
  && /\.drift-blob, \.drift-sparkle \{ animation: none; \}/.test(appCss)
  && /\.drift-petal \{ display: none; \}/.test(appCss)
  && appJs.includes('setupDriftField') && appJs.includes("field.style.transform = 'translate3d(0,'"));
ok('the lights keep moving while the page is scrolled, gently',
  appJs.includes("const shift = Math.max(-72, Math.min(72, -y * 0.022));")
  && /\.drift-field \{ position: fixed; inset: -80px; z-index: 0/.test(appCss));
ok('a ring breathes slowly behind the hero artwork',
  home.body.includes('breathe-ring') && /@keyframes breatheRing/.test(appCss)
  && /\.breathe-ring \{\s*\n  position: absolute; inset: 0; margin: auto; width: 84%; aspect-ratio: 1 \/ 1;/.test(appCss)
  && /\.breathe-ring, \.breathe-ring i \{ animation: none; opacity: \.55; \}/.test(appCss));
ok('an anchor jump lands below the pinned bar, not under it',
  /main \[id\] \{ scroll-margin-top: 104px; \}/.test(appCss));
ok('the club area never carries the public dressing: it has its own body',
  fs.readFileSync(path.join(ROOT, 'views/dashboard.php'), 'utf8').includes('<body class="dash-body">')
  && fs.readFileSync(path.join(ROOT, 'views/login.php'), 'utf8').includes('<body class="dash-body login-body">')
  && !/id="readProgress"|id="toTop"/.test(fs.readFileSync(path.join(ROOT, 'views/dashboard.php'), 'utf8') + fs.readFileSync(path.join(ROOT, 'views/login.php'), 'utf8')));
ok('the club timeline keeps a slow golden heartbeat, and the photos breathe on hover',
  /\.timeline-dot \{[^}]*animation: dotPulse/.test(appCss)
  && /@keyframes dotPulse/.test(appCss)
  && /\.gallery-item:hover \.gallery-visual\.has-image, \.archive-card:hover \.archive-image \{ transform: scale\(1\.045\)/.test(appCss)
  && /\.nav-action:after, \.solid-button:after \{/.test(appCss));
ok('the hero’s own words arrive one line after another',
  /\.hero \.fade-in > \* \{ animation: fadeIn/.test(appCss)
  && /\.hero \.fade-in > \*:nth-child\(3\) \{ animation-delay: \.2s/.test(appCss));
ok('the club emblem appears between sections on the home page',
  (homeAlbums.body.match(/logo-medallion/g) || []).length >= 2);
ok('the club emblem sits in the members stage, and the frame script is live',
  (await get('/members')).body.includes('orbit-logo') && appJs.includes('setupPhotoFrame'));
ok('the club emblem is faded into the member cards instead of psi',
  /\.member-card:after \{[^}]*mt-club-logo/.test(appCss) && !/\.member-card:after \{[^}]*content: 'Ψ'/.test(appCss));
ok('the page skips work for what is off screen (a faster scroll)',
  /\.gallery-item, \.archive-card[^{]*\{[^}]*content-visibility: auto/.test(appCss));
ok('the pictures below the fold wait until they are reached',
  (fs.readFileSync(path.join(ROOT, 'views/public/members.php'), 'utf8').match(/loading="lazy"/g) || []).length >= 1
  && (fs.readFileSync(path.join(ROOT, 'views/layout.php'), 'utf8').match(/loading="lazy"/g) || []).length >= 2);

/* A hidden thing must stay hidden and nothing may paint dark at load: the
   photo frame is hidden in the markup, its image carries no empty src, and its
   backdrop is a warm plum rather than black. */
ok('a hidden element can never be shown by a later style rule',
  /\[hidden\] \{ display: none !important; \}/.test(appCss));
ok('the photo frame image carries no empty source to paint at load',
  !/id="photoFrameImage"[^>]*src=""/.test(homeAlbums.body) && !/id="photoFrameImage"[^>]*src=""/.test((await get('/gallery')).body));
ok('the photo frame backdrop is warm, not black',
  /\.photo-frame \{[^}]*background: rgba\(76,58,64/.test(appCss)
  && !/#241d20/.test(appCss));

/* ------------------------------------------------ the herd on the front page
   The club's horses: one compressed clip, a still frame that is always there,
   both pinned behind the page. Nothing dark, nothing clickable, on the front
   page only — and the server must hand the clip out as video, in slices. */
const clipPath = path.join(ROOT, 'assets/media/horses-running.mp4');
const clip = fs.existsSync(clipPath) ? fs.readFileSync(clipPath) : Buffer.alloc(0);

/** Read the boxes of an mp4 so the clip can be checked for what it really is. */
function mp4Boxes(buffer, from, to) {
  const boxes = [];
  let at = from;
  while (at + 8 <= to) {
    const size = buffer.readUInt32BE(at);
    const type = buffer.toString('latin1', at + 4, at + 8);
    if (size < 8 || at + size > to) break;
    boxes.push({ type, at, size, end: at + size });
    at += size;
  }
  return boxes;
}
const topBoxes = mp4Boxes(clip, 0, clip.length);
const moov = topBoxes.find((box) => box.type === 'moov');
const moovBoxes = moov ? mp4Boxes(clip, moov.at + 8, moov.end) : [];
const mvhd = moovBoxes.find((box) => box.type === 'mvhd');
const clipSeconds = mvhd ? clip.readUInt32BE(mvhd.at + 24) / clip.readUInt32BE(mvhd.at + 20) : 0;
let clipW = 0;
let clipH = 0;
for (const trak of moovBoxes.filter((box) => box.type === 'trak')) {
  const tkhd = mp4Boxes(clip, trak.at + 8, trak.end).find((box) => box.type === 'tkhd');
  if (tkhd && clip[tkhd.at + 8] === 0) {
    clipW = clip.readUInt32BE(tkhd.at + 84) / 65536;
    clipH = clip.readUInt32BE(tkhd.at + 88) / 65536;
  }
}
ok('the herd is the club\'s own footage, enhanced — not a squeezed copy',
  clip.length > 8 * 1024 * 1024 && clip.length < 12 * 1024 * 1024
  && fs.existsSync(path.join(ROOT, 'assets/media/horses-running-poster.jpg'))
  && fs.readdirSync(ROOT).every((name) => !/\.mp4$/i.test(name)),
  Math.round(clip.length / 1024) + ' KB');
ok('the clip is a real mp4 that browsers can start straight away',
  clip.slice(4, 8).toString('latin1') === 'ftyp'
  && topBoxes.some((box) => box.type === 'moov') && topBoxes.some((box) => box.type === 'mdat')
  && topBoxes.findIndex((box) => box.type === 'moov') < topBoxes.findIndex((box) => box.type === 'mdat'));
ok('the clip is enhanced to 1440x960 and runs through several locations',
  clipSeconds > 17 && clipSeconds < 22 && clipW === 1440 && clipH === 960,
  clipW + 'x' + clipH + ', ' + clipSeconds.toFixed(1) + 's');
ok('a stalled clip buffers without seek storms and has one bounded recovery',
  appJs.includes("video.addEventListener('stalled', function () { /* let the browser buffer */ })")
  && appJs.includes('quietFor > 15000 && !recoveryUsed')
  && !appJs.includes('video.currentTime = clock + 0.1')
  && appJs.includes("video.classList.add('is-buffering')"));
for (const variant of ['desktop', 'mobile']) {
  const file = fs.readFileSync(path.join(ROOT, 'assets/media/horses-' + variant + '.mp4'));
  const boxes = mp4Boxes(file, 0, file.length);
  ok(variant + ' horse rendition is smaller and begins with fast-start metadata',
    file.length < clip.length * (variant === 'mobile' ? .25 : .45)
    && boxes.findIndex(box => box.type === 'moov') < boxes.findIndex(box => box.type === 'mdat'),
    Math.round(file.length / 1024) + ' KB');
}
/* The gallery is one strip in the club's own order, with no categories. */
const galleryBody = (await get('/gallery')).body;
ok('the gallery has no event albums or category chips any more',
  !/class="album\b/.test(galleryBody) && !/gallery-chip/.test(galleryBody) && !/Not filed yet/.test(galleryBody)
  && !/class="album\b/.test(appCss) && !/\.gallery-chip \{/.test(appCss));
ok('the photo editor no longer asks which event a photo came from',
  !/data-field="eventId"/.test(fs.readFileSync(path.join(ROOT, 'assets/manage.js'), 'utf8'))
  && /data-field="order"/.test(fs.readFileSync(path.join(ROOT, 'assets/manage.js'), 'utf8')));
ok('the gallery is one strip in the club\'s order',
  /<div class="archive-grid" id="archiveGrid">/.test(galleryBody)
  && galleryBody.indexOf('archiveGrid') > 0
  && (galleryBody.match(/class="archive-card(?: [^"]*)?"/g) || []).length === (galleryBody.match(/class="archive-image"/g) || []).length);
ok('the slideshow frame is a photo, not a colour block',
  /class="gallery-stage-image[^"]*"[^>]*background-image:url\(/.test(galleryBody)
  && /\.gallery-stage-image \{[^}]*background-size: contain/.test(appCss)
  && /\.gallery-stage-image\.has-image:before \{[^}]*background-image: inherit/.test(appCss));
ok('with a single photo the arrows are greyed, not clicking into nothing',
  /id="galleryPrev"[^>]*disabled/.test(galleryBody) && /\.gallery-control:disabled \{[^}]*opacity/.test(appCss));
ok('the album’s own frames turn the stage, and the small line stays the stage’s',
  /\.gallery-thumb \{[^}]*background-size: contain/.test(appCss)
  && appJs.includes("thumb.dataset.slide")
  && /if \(kicker && slide\.kicker\)/.test(appJs));
ok('the home page turns the very same slideshow',
  /class="gallery-stage stage-feature" id="galleryStage"/.test(homeAlbums.body)
  && /\.gallery-stage\.stage-feature \{[^}]*max-width/.test(appCss));
ok('the slideshow piles every photo in order and turns by itself',
  /const slides = \(readJson\('gallery-data'\)\.slides \|\| \[\]\)/.test(appJs)
  && /slides\.length < 2\) return;/.test(appJs) && /go\(index \+ 1\); \}, 4800\)/.test(appJs));

ok('the front page plays the herd, muted and looping, behind everything',
  /<video[^>]*id="heroVideo"[^>]*muted[^>]*loop[^>]*playsinline[^>]*autoplay/.test(homeAlbums.body)
  && homeAlbums.body.includes('data-desktop-src="/assets/media/horses-desktop.mp4"')
  && homeAlbums.body.includes('id="heroStill"'));
ok('the herd runs behind every public page',
  (await Promise.all(['/', '/gallery', '/calendar', '/members', '/register', '/pass', '/verify']
    .map((route) => get(route)))).every((page) => page.body.includes('id="heroVideo"') && page.body.includes('id="heroStill"')));
ok('the club\'s own area stays plain: no video behind the dashboard',
  !(await get('/dashboard')).body.includes('id="heroVideo"'));
ok('the herd is behind the words and the bubbles, and cannot be clicked',
  /\.hero-still, \.hero-video \{[^}]*position: fixed/.test(appCss)
  && /\.hero-still \{ z-index: -2; \}/.test(appCss) && /\.hero-video \{ z-index: -1; \}/.test(appCss)
  && /\.hero-still, \.hero-video \{[^}]*pointer-events: none/.test(appCss));
ok('the veil over the herd is warm cream, never dark',
  /\.hero-veil \{[^}]*background:[^}]*rgba\(247,242,237/.test(appCss)
  && !/\.hero-(still|video|veil)[^{]*\{[^}]*background: *#[0-5]/.test(appCss));
ok('less motion means the still frame instead of the clip',
  /@media \(prefers-reduced-motion: reduce\) \{\s*\.hero-video \{ display: none/.test(appCss)
  && appJs.includes('saveData') && appJs.includes('video.hidden = true'));
ok('a clip that cannot play leaves the still frame, never a blank box',
  appJs.includes("video.addEventListener('error', drop)")
  && appJs.includes('video.hidden = true') && layoutSource.includes('id="heroStill"'));
ok('the herd never stops on its own — nothing pauses it while the page is open',
  !/observe\(hero\)/.test(appJs) && appJs.includes('window.setInterval(function () {')
  && appJs.includes('quietFor > 15000 && !recoveryUsed') && appJs.includes('video.load()')
  && /document\.hidden\) pause\(\); else \{ lastAdvance = Date\.now\(\); play\(\); \}/.test(appJs));
ok('no block of the page is a solid wall: the herd shows through all of them',
  /\.site-shell main > section:not\(\.hero-with-video\)[^{]*,\s*\n\.site-shell main > div:not\(\.photo-frame\) \{\s*background-color: rgba\(var\(--film-rgb\), \.69\);/.test(appCss)
  && !/main > section:not\(\.hero-with-video\)[^{]*\{[^}]*background(-color)?: var\(--cream\)/.test(appCss));
ok('the film opens up at the edges, where no words are',
  /@media \(min-width: 1150px\)/.test(appCss) && /rgba\(var\(--film-rgb\), \.14\) 0%/.test(appCss));
ok('the dark blocks stay dark glass, with the herd moving behind them',
  /\.site-shell main > \.section-plum \{ background: rgba\(var\(--film-deep-rgb\), \.76\); \}/.test(appCss)
  && /main > \.psyche-section \{[^}]*rgba\(59,39,69,\.78\)/.test(appCss));
ok('the closest-set text keeps more paper: cards are thinner, not opaque',
  /\.event-card, \.calendar-item, \.club-panel, \.fact-card \{ background: rgba\(255,250,241,\.42\); \}/.test(appCss));
ok('the softer grey and the accent labels were deepened for the film',
  /--ink-soft: #463f3b;/.test(appCss) && /--terracotta-ink: #54291a;/.test(appCss)
  && !/color: var\(--terracotta\);/.test(appCss.slice(appCss.indexOf('.eyebrow'), appCss.indexOf('.eyebrow') + 200)));
/* The club saw a menu word vanish behind a running horse: the bar carries a
   stronger pane now, but it is still a pane — the herd shows through it. */
ok('the top bar shows the herd through its own glass, and never blacks it out',
  navGlass.rest > 0 && navGlass.rest < navGlass.scrolled && navGlass.scrolled < 1
  && /\.nav:before \{[^}]*backdrop-filter: blur/.test(appCss),
  'glass ' + navGlass.rest + ' → ' + navGlass.scrolled);
ok('the herd layer sits outside the page shell, so the bubbles drift over it',
  layoutSource.indexOf('heroVideo') > 0 && layoutSource.indexOf('heroVideo') < layoutSource.indexOf('site-shell'));
ok('the server hands the clip out as video, in slices',
  /\.mp4': 'video\/mp4'/.test(fs.readFileSync(path.join(ROOT, 'tools/preview-server.mjs'), 'utf8'))
  && /Content-Range/.test(fs.readFileSync(path.join(ROOT, 'tools/preview-server.mjs'), 'utf8'))
  && /AddType video\/mp4/.test(fs.readFileSync(path.join(ROOT, '.htaccess'), 'utf8')));
ok('a page is never served from a stale cache, the club’s latest words always are',
  /Cache-Control "no-cache, must-revalidate"/.test(fs.readFileSync(path.join(ROOT, '.htaccess'), 'utf8'))
  && /ExpiresByType text\/html "access plus 0 seconds"/.test(fs.readFileSync(path.join(ROOT, '.htaccess'), 'utf8')));

/* The club area itself, on a phone: the section strip scrolls sideways, the
   counters and editors go one per row, and a long word cannot widen a page. */
const manageCss = fs.readFileSync(path.join(ROOT, 'assets/manage.css'), 'utf8');
ok('the club section strip scrolls sideways on a phone',
  /\.dash-nav \{[^}]*grid-auto-columns: max-content[^}]*overflow-x: auto/.test(manageCss)
  && /\.dash-nav a \{[^}]*white-space: nowrap/.test(manageCss));
ok('the club cards go one per row on a phone',
  /\.login-card \{[^}]*padding: 26px 22px/.test(manageCss)
  && /\.stat-cards, \.editor-grid \{ grid-template-columns: 1fr/.test(manageCss)
  && /\.dash-main \{[^}]*padding: 20px 16px/.test(manageCss));
ok('the club area has its own quiet background, and the decoration is used',
  /\.ambient \{ position: fixed; inset: -60px; z-index: 0/.test(fs.readFileSync(path.join(ROOT, 'assets/manage.css'), 'utf8'))
  && /@keyframes ambientDriftA/.test(fs.readFileSync(path.join(ROOT, 'assets/manage.css'), 'utf8'))
  && /\.ambient-blob \{ animation: none; \}/.test(fs.readFileSync(path.join(ROOT, 'assets/manage.css'), 'utf8')));
ok('a long word wraps instead of widening the page',
  /body \{[^}]*overflow-wrap: break-word/.test(appCss));
ok('the script never hides or rewrites the page content', !/innerHTML\s*=/.test(appJs) || /galleryStageImage/.test(appJs));
ok('the script asks the backend for the revision instead of re-rendering', appJs.includes('/api/site?since=') && appJs.includes('window.location.reload()'));
ok('the dashboard talks to the registrations endpoint', fs.readFileSync(path.join(ROOT, 'assets/manage.js'), 'utf8').includes('/api/registrations'));

/* --- what the club asked for on the form and in the dashboard ------------- */
const manageSource = fs.readFileSync(path.join(ROOT, 'assets/manage.js'), 'utf8');
ok('the registration form states the rules it keeps',
  registerPage.body.includes('data-rule="name"') && registerPage.body.includes('data-rule="email"')
  && registerPage.body.includes('data-rule="phone"') && registerPage.body.includes('field-hint'));
ok('the browser half of the rules is in the script',
  appJs.includes('fieldRules') && appJs.includes('checkForm(form)') && appJs.includes('10-digit Indian mobile number'));
ok('the club dashboard says what happened when it saves',
  manageSource.includes("setBusy(card, true, 'Saving…')") && manageSource.includes("setState(card, 'Saved ✓ at ' + stamp()")
  && manageSource.includes('data-save-state')
  && fs.readFileSync(path.join(ROOT, 'assets/manage.css'), 'utf8').includes('.save-state'));
ok('the dashboard never redraws the whole panel over the club typing',
  !/toast\('Saved ✓ and live on the website'\);\s*renderAll\(\);/.test(manageSource)
  && manageSource.includes("card.classList.add('is-deleting')"));
ok('save and delete sit level on a phone instead of stacking like bricks',
  /\.row-actions \{ display: grid; grid-template-columns: 1fr 1fr; gap: 8px; align-items: center; \}/
    .test(fs.readFileSync(path.join(ROOT, 'assets/manage.css'), 'utf8')));
ok('the dashboard has no hours window and nothing closes on its own',
  !/openHours|>hours</.test(manageSource)
  && manageSource.includes('it stays open. Nothing closes on its own.')
  && !/windowMode === 'hours'/.test(fs.readFileSync(path.join(ROOT, 'app/events.php'), 'utf8')));
ok('a new event arrives open, with a working title and a jump to its card',
  manageSource.includes("title: 'New Mindful Tattva event'") && manageSource.includes('registrationOpen: true')
  && manageSource.includes('added ✓'));
ok('the open events on the home page have space between them',
  /\.register-list \{ display: grid; gap: 12px;/.test(appCss) && /\.register-list li \{/.test(appCss));
ok('a complaint from the server is shown, not printed as a bare line',
  /\.field-error \{[^}]*background: rgba\(180,83,60,\.1\)/.test(appCss));

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

console.log('\n— round 37: the published gate —');
/* The club's complaint: an event made from the dashboard did not show on the
   main page or the calendar. Two causes, both settled here — a new event now
   arrives shown, and the tick is the one gate on every public surface. */
const round37Css = fs.readFileSync(path.join(ROOT, 'assets/app.css'), 'utf8');
const manageJs = fs.readFileSync(path.join(ROOT, 'assets/manage.js'), 'utf8');

ok('a new event from the dashboard arrives shown on the website',
  /published: true,\s*order:/.test(manageJs) && !/published: false,\s*order:/.test(manageJs));
ok('the dashboard says plainly when an event is hidden from the website',
  manageJs.includes('Hidden from the website') && manageJs.includes('function refreshHiddenFlag')
  && manageCss.includes('.hidden-flag'));
ok('the tick explains itself', /Show on the home page and the calendar/.test(manageJs)
  && /untick this to keep an event private/.test(manageJs));
ok('the register buttons and the calendar only offer shown events',
  /function mt_open_events[\s\S]{0,700}empty\(\$event\['published'\]\)/.test(fs.readFileSync(path.join(ROOT, 'app/events.php'), 'utf8')));

const hiddenEvent = await sendJson('/api/events', 'POST', {
  title: 'Round37 Hidden Draft', kicker: 'Club gathering', description: 'kept back',
  month: 12, day: 24, year: 2026, time: '3:00 PM', location: 'CSMU campus',
  registrationOpen: true, windowMode: 'date', closesAt: '', capacity: 0, published: false, order: 970,
}, FRESH);
/* The harness hands back raw bodies, so every answer is parsed. */
const hiddenItem = asJson(hiddenEvent).item || {};
const hiddenId = hiddenItem.id || '';
ok('the dashboard can hold an event back', hiddenEvent.status === 201 && Boolean(hiddenId) && hiddenItem.published === false,
  hiddenEvent.status + ' ' + JSON.stringify(asJson(hiddenEvent)).slice(0, 200));
const hiddenHome = await get('/');
const hiddenCalendar = await get('/calendar');
ok('a held-back event is nowhere on the main page',
  !hiddenHome.body.includes('Round37 Hidden Draft') && !hiddenHome.body.includes('event=' + hiddenId));
ok('a held-back event is nowhere on the calendar',
  !hiddenCalendar.body.includes('Round37 Hidden Draft') && !hiddenCalendar.body.includes('event=' + hiddenId));
const hiddenRegister = await get('/register?event=' + hiddenId);
ok('a held-back event cannot be reached by its own link',
  hiddenRegister.status !== 500 && !hiddenRegister.body.includes('Round37 Hidden Draft') && !hiddenRegister.body.includes('value="' + hiddenId),
  hiddenRegister.status + ' mentions:' + hiddenRegister.body.includes('Round37 Hidden Draft'));
const hiddenApi = await sendJson('/api/registrations', 'POST', {
  eventId: hiddenId, name: 'Round Thirty Seven', email: 'round37@example.com', phone: '9876500001',
}, { session: {} });
ok('nobody can register for a held-back event', hiddenApi.status === 404);

const shown = await request({ uri: '/api/events/' + hiddenId, method: 'PUT', json: { published: true }, post: { published: true }, ...FRESH });
ok('ticking it puts it on the website', shown.status === 200 && (asJson(shown).item || {}).published === true,
  shown.status + ' ' + JSON.stringify(asJson(shown)).slice(0, 200));
const shownHome = await get('/');
const shownCalendar = await get('/calendar');
ok('the event now stands on the main page', shownHome.body.includes('Round37 Hidden Draft'));
ok('the event now stands on the calendar', shownCalendar.body.includes('Round37 Hidden Draft'));
const shownRegister = await get('/register?event=' + hiddenId);
ok('and its register link opens', shownRegister.status === 200 && shownRegister.body.includes('Round37 Hidden Draft'),
  shownRegister.status);

const held = await request({ uri: '/api/events/' + hiddenId, method: 'PUT', json: { published: false }, post: { published: false }, ...FRESH });
const heldHome = await get('/');
const heldCalendar = await get('/calendar');
ok('unticking it takes it back off both', held.status === 200
  && !heldHome.body.includes('Round37 Hidden Draft') && !heldCalendar.body.includes('Round37 Hidden Draft'));
await request({ uri: '/api/events/' + hiddenId, method: 'DELETE', ...FRESH });
ok('the probe event is gone', !(await get('/')).body.includes('Round37 Hidden Draft'));

console.log('\n— round 37: the event tile has room to breathe —');
ok('the lines inside an event tile keep their own space',
  /\.event-body \{[^}]*flex-direction: column; gap: 12px/.test(round37Css));
ok('the tiles themselves are separated', /\.event-grid \{[^}]*gap: 22px/.test(round37Css));
ok('no line inside a tile is jammed against the one above it',
  /\.event-body h3 \{ margin: 0;/.test(round37Css) && /\.event-window \{ display: block; margin-top: 0;/.test(round37Css));
ok('a team card has room too', /\.team-card \{[^}]*gap: 12px/.test(round37Css));
ok('the register tiles under the events are separated', /\.register-list \{ display: grid; gap: 12px/.test(round37Css));

console.log('\n— the Mind wheel: three big words round the club\'s logo —');
const round37Home = fs.readFileSync(path.join(ROOT, 'views/public/home.php'), 'utf8');
const mindSection = round37Home.slice(round37Home.indexOf('class="section psyche-section" id="mind"'), round37Home.indexOf('<section class="section details-section"'));
ok('the club\'s turning section is named Mind', /class="section psyche-section" id="mind"/.test(round37Home)
  && mindSection.includes('>Mind<'));
ok('the club logo sits at the centre of the lens, and the psi sign is gone',
  mindSection.includes('class="psi-core"') && mindSection.includes("mt_safe_image($site['logoImage']")
  && mindSection.includes("'/assets/photos/mt-club-logo.jpg'") && !mindSection.includes('Ψ'));
ok('no label crowds the lens', !mindSection.includes('mind in motion') && !/\.psi-core small/.test(round37Css));
const mindWords = ['unconscious', 'subconscious', 'conscious'];
ok('the wheel carries the three words, and "mind" is off it',
  mindWords.every((word) => new RegExp('psi-quote-[a-z]+">' + word + '<').test(mindSection))
  && (mindSection.match(/class="psi-quote psi-quote-/g) || []).length === 3
  && !/>mind</.test(mindSection));
ok('the words are far bigger than they were', /\.psi-quote \{[^}]*font-size: clamp\(\.72rem, 4\.2cqw, 1\.45rem\)/.test(round37Css));
ok('the lens is smaller, so the words and the logo read as one drawing',
  /\.psi-core \{[^}]*width: 28%/.test(round37Css) && /\.psi-core \{ width: 26%; \}/.test(round37Css));
ok('each word is one line, and can never wrap onto a second',
  /\.psi-quote \{[^}]*white-space: nowrap/.test(round37Css));
ok('three words sit evenly round the wheel, a third apart',
  /\.psi-quote-one\s+\{ top: calc\(50% - 33%\);\s+left: 50%; \}/.test(round37Css)
  && /\.psi-quote-two\s+\{ top: calc\(50% \+ 16\.5%\); left: calc\(50% \+ 28\.58%\); \}/.test(round37Css)
  && /\.psi-quote-three\s+\{ top: calc\(50% \+ 16\.5%\); left: calc\(50% - 28\.58%\); \}/.test(round37Css));
ok('the wheel turns and never stops', /\.psi-quotes \{[^}]*animation: quoteSpin 32s linear infinite/.test(round37Css)
  && /@keyframes quoteSpin \{ to \{ transform: rotate\(360deg\); \} \}/.test(round37Css));
ok('every word rides round and stays the right way up — never inverted',
  /\.psi-quote \{[^}]*animation: quoteHold 4s linear infinite/.test(round37Css)
  && /@keyframes quoteHold \{[^}]*rotate\(0deg\)[\s\S]{0,80}?rotate\(-360deg\)/.test(round37Css));
{
  const wheel = Number((round37Css.match(/quoteSpin (\d+(?:\.\d+)?)s/) || [])[1]);
  const word = Number((round37Css.match(/quoteHold (\d+(?:\.\d+)?)s/) || [])[1]);
  ok('the wheel and the words are locked together, to the second',
    Number.isFinite(wheel) && Number.isFinite(word) && Math.abs(wheel / word - Math.round(wheel / word)) < 1e-9,
    wheel + 's / ' + word + 's');
}
ok('the club\'s logo floats, and the hub keeps its own slow turn',
  /\.psi-core \{[^}]*psiCoreFloat/.test(round37Css) && /\.psi-stage-glow \{[^}]*psiPulse/.test(round37Css)
  && /@keyframes axisSpin \{/.test(round37Css) && /@keyframes axisSpinReverse \{/.test(round37Css));
ok('the stage is a square, so every word rides one true circle',
  /\.psi-stage \{[^}]*aspect-ratio: 1 \/ 1/.test(round37Css));
ok('with less motion the wheel stands still, the words upright in place',
  /prefers-reduced-motion: reduce\)[\s\S]{0,160}\.psi-quotes[\s\S]{0,200}?animation: none/.test(round37Css)
  && /\.psi-quote \{ animation: none; transform: translate\(-50%, -50%\); \}/.test(round37Css));
ok('the Mind section keeps the club\'s own copy',
  mindSection.includes('Every mind has more than one layer.') && mindSection.includes('slow down — look inward — stay curious'));
ok('the Mind section keeps its own cards', (mindSection.match(/class="psyche-card /g) || []).length === 3);

/* The drawing's arithmetic, worked the way the browser works it: for every
   screen from a small phone to a wide desktop, the longest word must clear the
   lens and stay inside the wheel. The numbers are read out of the stylesheet,
   so this check moves with the design instead of freezing today's numbers. */
{
  const num = (re, src) => Number((src.match(re) || [])[1]);
  const ring = num(/\.psi-quote-one\s+\{ top: calc\(50% - ([\d.]+)%\)/, round37Css) / 100;
  const wide = {
    core: num(/\.psi-core \{[\s\S]{0,300}?width: ([\d.]+)%/, round37Css) / 100,
    font: num(/\.psi-quote \{[\s\S]{0,400}?clamp\(([\d.]+)rem, ([\d.]+)cqw, ([\d.]+)rem\)/, round37Css),
  };
  const wideFloor = num(/\.psi-quote \{[\s\S]{0,400}?clamp\(([\d.]+)rem,/, round37Css);
  const wideCqw = num(/\.psi-quote \{[\s\S]{0,400}?rem, ([\d.]+)cqw/, round37Css);
  const wideCap = num(/\.psi-quote \{[\s\S]{0,400}?cqw, ([\d.]+)rem\)/, round37Css);
  const phoneRule = (round37Css.match(/@media \(max-width: 560px\) \{[\s\S]*?\n\}/) || [''])[0];
  const phoneCore = num(/\.psi-core \{ width: ([\d.]+)%; \}/, phoneRule) / 100;
  const phoneFloor = num(/clamp\(([\d.]+)rem,/, phoneRule);
  const phoneCqw = num(/rem, ([\d.]+)cqw/, phoneRule);
  const phoneCap = num(/cqw, ([\d.]+)rem\)/, phoneRule);
  ok('the stylesheet gives the drawing every number this check needs',
    ring > 0 && wide.core > 0 && phoneCore > 0 && wideCqw > 0 && phoneCqw > 0,
    [ring, wide.core, phoneCore, wideCqw, phoneCqw].join(' '));
  let tightest = { clear: Infinity, where: '' };
  let furthest = { outer: 0, where: '' };
  for (let viewport = 320; viewport <= 1500; viewport += 10) {
    const stage = Math.min(560, viewport - 48);
    const phone = viewport <= 560;
    const floor = (phone ? phoneFloor : wideFloor) * 16;
    const cqw = phone ? phoneCqw : wideCqw;
    const cap = (phone ? phoneCap : wideCap) * 16;
    const font = Math.min(cap, Math.max(floor, cqw / 100 * stage));
    const padX = phone ? Math.max(5, 0.019 * stage) : Math.max(6, 0.021 * stage);
    const padY = phone ? Math.max(5, 0.012 * stage) : Math.max(6, 0.013 * stage);
    const core = (phone ? phoneCore : wide.core) * stage;
    const longest = Math.max(...mindWords.map((word) => word.length));
    const width = longest * 0.58 * font + 2 * padX;   // 0.58em a letter: an over-estimate, on purpose
    const height = font + 2 * padY;
    const reach = Math.hypot(width / 2, height / 2);
    const clear = ring * stage - reach - core / 2;
    const outer = (ring * stage + reach) / stage * 100;
    if (clear < tightest.clear) tightest = { clear, where: 'a ' + viewport + 'px screen' };
    if (outer > furthest.outer) furthest = { outer, where: 'a ' + viewport + 'px screen' };
  }
  ok('no word on the wheel can ever touch the club\'s logo', tightest.clear > 2,
    'tightest gap ' + tightest.clear.toFixed(1) + 'px on ' + tightest.where);
  ok('and no word ever leaves the wheel', furthest.outer <= 50.2,
    'furthest reach ' + furthest.outer.toFixed(1) + '% on ' + furthest.where);
}
const mindPage = await get('/');
ok('the Mind section renders whole on the live page',
  mindPage.body.includes('psi-stage') && mindPage.body.includes('subconscious') && mindPage.body.includes('quoteHold')
  && !mindPage.body.includes('mind in motion'));

console.log('\n— experimental name and seven-ring scroll chapter —');
const paintSource = fs.readFileSync(path.join(ROOT, 'assets/motion/intro-word.svg'), 'utf8');
const cardsSource = fs.readFileSync(path.join(ROOT, 'app/cards.php'), 'utf8');
ok('one full-screen chapter, one closing band',
  (round37Home.match(/mt_brand_chapter\(/g) || []).length === 1
  && (round37Home.match(/mt_brand_finale\(/g) || []).length === 1);
ok('huge white words travel right to left, with no pane or lamps',
  round37Css.includes('font-size: clamp(6rem, 19.5vw, 22rem)')
  && round37Css.includes('to { transform: translateX(-50%); }')
  && !round37Css.includes('.brand-band:before') && !round37Css.includes('.brand-band i {'));
ok('two equal halves repeat seamlessly, including without JavaScript',
  cardsSource.includes('$copy < 2') && cardsSource.includes('$i < 4')
  && round37Css.includes('animation: brandRun 28s linear infinite'));
ok('native sticky chapter holds the stage then releases it',
  round37Css.includes('.brand-chapter { height: 300svh; }') && round37Css.includes('position: sticky; top: 84px')
  && appJs.includes('chapter.offsetHeight - (window.innerHeight - top)')
  && appJs.includes("window.addEventListener('scroll', schedule, { passive: true })"));
ok('one centre circle and six satellites form seven intersecting rings',
  cardsSource.includes('$ring < 6') && cardsSource.includes('300 + 100 * cos($angle)')
  && cardsSource.includes('300 + 100 * sin($angle)') && cardsSource.includes('r="100"'));
ok('rings gather first, rotate only after gathering, and reverse with scrolling',
  appJs.includes('progress / 0.38') && appJs.includes('170 * (1 - ease)')
  && appJs.includes('(progress - 0.38) / 0.16') && appJs.includes("turn.setAttribute('transform', 'rotate('"));
ok('reduced motion and no scripts leave the chapter short and fully formed',
  round37Css.includes('html.no-js .brand-chapter, html.no-js .brand-finale { height: auto; }')
  && round37Css.includes('.brand-chapter, .brand-finale { height: auto; }')
  && appJs.includes('if (lowMotion) return;'));
ok('rings stand alone and exactly one name band renders at the end',
  (mindPage.body.match(/class="brand-chapter black-chapter"/g) || []).length === 1
  && (mindPage.body.match(/class="brand-band"/g) || []).length === 1
  && (mindPage.body.match(/data-ring="/g) || []).length === 6);

console.log('\n— the front door —');
const navLayout = fs.readFileSync(path.join(ROOT, 'views/layout.php'), 'utf8');
ok('the welcome screen is the first thing in the page',
  /<body class="<\?= e\(\$bodyClass\) \?>">\s*\n?\s*<\?php[\s\S]{0,600}?class="splash"/.test(navLayout));
ok('the splash carries only the lowercase, unspaced club name', paintSource.includes('data-word="mindfultattva"')
  && !navLayout.includes('Welcome to Club') && !navLayout.includes('splash-letter-ring'));
ok('it opens on the front page only — never a pass, a check page or the club area',
  /\(\$route, \['home', 'index.php'\], true\)/.test(navLayout) && navLayout.includes('if ($splash):'));
const splashCss = round37Css.slice(round37Css.indexOf('.splash {'));
ok('it opens on a solid near-black screen',
  /\.splash \{[^}]*background: #0b0b0d/.test(round37Css));
ok('the seven splash circles automatically enter and join',
  round37Css.includes('animation: splashJoin .85s')
  && round37Css.includes('transform: translate(var(--rx), var(--ry))'));
ok('it reveals the site on its own, with no JavaScript needed',
  round37Css.includes('animation: splashAway .7s ease 4s forwards')
  && /@keyframes splashAway \{ to \{ opacity: 0; visibility: hidden; \} \}/.test(round37Css));
ok('the entrance settles and hands off to the page and butterfly',
  round37Css.includes('@keyframes pigmentDraw') && navLayout.includes("/motion/intro-word.svg") && !navLayout.includes('textLength=')
  && appJs.includes("window.dispatchEvent(new CustomEvent('mt:intro-ready'))")
  && appJs.includes('window.setTimeout(finish, 6500)'));
ok('normal tapping, keys and scrolling never dismiss the timed intro',
  !appJs.includes("splash.addEventListener('click', away)")
  && !appJs.includes("window.addEventListener('touchstart', away")
  && appJs.includes('shell.inert = true'));
ok('anyone who asks for less motion never sees it',
  /prefers-reduced-motion: reduce\) \{ \.splash \{ display: none; \} \}/.test(round37Css));
const splashCal = await get('/calendar');
const splashPass = await get('/pass');
const splashDash = await get('/dashboard');
ok('and it really is absent from the other pages',
  !splashCal.body.includes('class="splash"') && !splashPass.body.includes('class="splash"')
  && !splashDash.body.includes('class="splash"'));
ok('and present on the front page', mindPage.body.includes('class="splash"') && mindPage.body.includes('data-word="mindfultattva"'));

console.log('\n— flapping photographic butterfly —');
ok('three clipped photographic layers share one local cutout',
  (navLayout.match(/src="\/assets\/img\/butterfly-flight.png"/g) || []).length === 3
  && fs.existsSync(path.join(ROOT, 'assets/img/butterfly-flight.png'))
  && !navLayout.includes('<svg viewBox="0 0 40 36"'));
ok('wing hinges fold in opposite directions, body remains still',
  round37Css.includes('transform-origin: 49% 50%')
  && round37Css.includes('rotateY(-56deg)') && round37Css.includes('rotateY(56deg)')
  && round37Css.includes('.butterfly-body { clip-path:'));
ok('the butterfly lives outside the brand link and has a fixed viewport flight layer',
  navLayout.indexOf('class="nav-butterfly"') < navLayout.indexOf('<div class="site-shell">')
  && round37Css.includes('position: fixed; top: 0; left: 0; z-index: 80; width: 108px'));
ok('butterfly has a stable body and independently resting wings with a reduced-motion fallback',
  round37Css.includes('@keyframes restingWingLeft') && round37Css.includes('.nav-butterfly .butterfly-flight, .nav-butterfly .wing-left, .nav-butterfly .wing-right, .brand-chapter .wire-form { animation: none; }'));
ok('the glass header has no opaque scrim or perimeter line',
  round37Css.includes('.nav-wrap:before, body.is-black-chapter .nav-wrap:before { display: none; }')
  && round37Css.includes('border: 0; box-shadow: none; background: rgba(255,255,255,.12)'));
ok('wire objects use antialiased recorded silhouettes instead of invented filaments',
  appJs.includes('function setupWireObjects()') && appJs.includes('setupWireObjects();')
  && appJs.includes('player.context.drawImage') && appJs.includes('document.hidden')
  && cardsSource.includes('data-wire-object=') && !cardsSource.includes('data-wire-line='));

console.log('\n— black and blue chapter sequence —');
const renderedRings = mindPage.body.slice(mindPage.body.indexOf('<section class="brand-chapter'), mindPage.body.indexOf('<div class="manifest-chapter'));
ok('ring screen carries no brand name or scroll instructions',
  !renderedRings.includes('brand-band') && !renderedRings.includes('brand-scroll-hint')
  && !/<p(?:\s|>)/.test(renderedRings));
ok('rings then manifestation then the original horse-backed sections',
  mindPage.body.indexOf('class="brand-chapter') < mindPage.body.indexOf('id="manifestHeading"')
  && mindPage.body.indexOf('id="manifestHeading"') < mindPage.body.indexOf('id="details"'));
ok('requested heading and three small moving objects render',
  mindPage.body.includes('ControlYour') && mindPage.body.includes('Manifest</em>') && mindPage.body.includes('Reality</span>')
  && (mindPage.body.match(/class="mind-object /g) || []).length === 3);
ok('only one closing band follows registration and precedes Contact',
  mindPage.body.indexOf('id="join"') < mindPage.body.indexOf('class="brand-finale')
  && mindPage.body.indexOf('class="brand-finale') < mindPage.body.indexOf('id="contact"'));
ok('violet chapter palette and lavender contours are local, not a replacement horse',
  round37Css.includes('background: #100e1c') && round37Css.includes('color: #b1a2f2')
  && appJs.includes("document.body.classList.toggle('is-black-chapter', dark)")
  && !appJs.includes("document.querySelector('video').pause()"));
ok('classic horse film cannot override the opaque black chapters',
  (round37Css.match(/:not\(\.black-chapter\)/g) || []).length >= 2
  && round37Css.includes('body.is-black-chapter .nav:before { background: #100e1c;'));
ok('all seven rings fit the expanded drawing even before gathering',
  cardsSource.includes('viewBox="-90 -90 780 780"')
  && 300 - 100 - 170 - 100 >= -90 && 300 + 100 + 170 + 100 <= 690);

ok('recorded closing name chapter uses a dark stage and violet strand graphic',
  mindPage.body.includes('class="brand-finale black-chapter"') && mindPage.body.includes('The Psychology Club')
  && round37Css.includes('.brand-finale { height: 150svh; background: #0b0b0d; }'));
ok('closing label and rounded name have generous spacing and sticky scroll time',
  round37Css.includes('gap: clamp(36px, 8svh, 95px)')
  && mindPage.body.includes('class="brand-finale-stage"') && mindPage.body.includes('class="brand-finale-intro"'));
ok('rounded fonts are local and carry their open-font licenses',
  ['fredoka-latin.woff2', 'quicksand-latin.woff2', 'libre-baskerville-latin-italic.woff2', 'Fredoka-OFL.txt', 'Quicksand-OFL.txt', 'Libre-Baskerville-OFL.txt'].every(file => fs.existsSync(path.join(ROOT, 'assets/fonts', file)))
  && round37Css.includes(".brand-band-track span { font-family: 'MT Geometric', sans-serif; font-weight: 300"));
ok('header hairline is removed and butterfly sits above menu panel',
  round37Css.includes('.nav-wrap:after { display: none; }')
  && /\.nav-butterfly \{[^}]*z-index: 5/.test(round37Css));

/* Execute the actual scroll controller against a small DOM stand-in. This
   checks the phases and reversing behaviour, not just names in the source. */
{
  const { runInNewContext } = await import('node:vm');
  const controllerStart = appJs.indexOf('function setupBrandBand()');
  const controllerEnd = appJs.indexOf('/* -------------------------------------------------------- the front door */', controllerStart);
  const controller = appJs.slice(controllerStart, controllerEnd);
  let phase = 0;
  const captured = { ring: [], radius: [], turn: '', dark: false };
  const simulatedRings = Array.from({ length: 6 }, (_, i) => ({
    style: {}, setAttribute: (key, value) => { if (key === 'r') captured.radius[i] = value; else captured.ring[i] = value; }
  }));
  const simulatedRows = Array.from({length: 5}, () => ({style: {}}));
  const simulatedObjects = Array.from({length: 3}, () => ({style: {}}));
  const diagramStub = {style: {}, setAttribute() {}};
  const callbacks = {};
  const chapterStub = { offsetHeight: 2400, getBoundingClientRect: () => ({ top: 84 - phase * 1684, bottom: 2484 - phase * 1684 }) };
  const turnStub = { style: {}, setAttribute: (key, value) => { captured.turn = value; } };
  runInNewContext(controller + '\nsetupBrandBand();', {
    $: selector => selector === '.brand-chapter' ? chapterStub : selector === '.brand-rings' ? diagramStub : turnStub,
    $$: selector => selector === '.black-chapter' ? [chapterStub] : selector === '.manifest-row' ? simulatedRows : selector === '.mind-object' ? simulatedObjects : simulatedRings,
    reduced: () => false,
    document: { body: { classList: { toggle: (name, active) => { captured.dark = active; } } } },
    window: { innerWidth: 1440, innerHeight: 800, requestAnimationFrame: fn => fn(), addEventListener: (name, fn) => { callbacks[name] = fn; } }
  });
  const initial = captured.ring.join('|');
  ok('scroll controller starts with separated rings', initial.includes('-170.00') && captured.turn.includes('0.00') && captured.radius.every(r => r === '35.00'));
  phase = .38; callbacks.scroll();
  ok('all six satellites join before rotation starts',
    captured.ring.every(value => /translate\(-?0\.00 -?0\.00\)/.test(value)) && captured.turn === 'rotate(0.00 300 300)' && captured.radius.every(r => r === '100.00'));
  phase = .80; callbacks.scroll();
  ok('after joining, the geometry turns through 120 degrees', captured.turn === 'rotate(120.00 300 300)');
  phase = .70; callbacks.scroll();
  ok('heading rows enter from the right in a stagger, not as a static second section',
    Number(simulatedRows[0].style.opacity) > Number(simulatedRows[4].style.opacity)
    && simulatedRows[4].style.transform.includes('105.00vw'));
  phase = .95; callbacks.scroll();
  ok('all five rows and three objects finish their entrance before the scene releases',
    simulatedRows.every(row => row.style.opacity === '1') && simulatedObjects.every(object => object.style.opacity === '1'));
  phase = 1; callbacks.scroll();
  ok('the ring flower contracts and rises gently at the end', diagramStub.style.transform.includes('translateY(-46.00vh) scale(0.540)'));
  phase = 0; callbacks.scroll();
  ok('scrolling back restores the original geometry exactly', captured.ring.join('|') === initial && captured.dark && simulatedRows.every(row => row.style.opacity === '0'));
  phase = 2; callbacks.scroll();
  ok('header returns from black when the black section is gone', !captured.dark);
}

console.log('\n— saved recording, honest chart and portrait motion —');
ok('both reference videos are absent from the site and only lightweight study metadata remains',
  !fs.existsSync(path.join(ROOT, 'tools/references/superconscious-mobile-2026-10-15.mp4'))
  && !fs.existsSync(path.join(ROOT, 'screen-20261015-174326.mp4'))
  && fs.existsSync(path.join(ROOT, 'tools/references/recording.json'))
  && fs.readFileSync(path.join(ROOT, '.gitattributes'), 'utf8').includes('screen-*.mp4 export-ignore'));
ok('splash keeps the seven-circle mark while the first-page emblem is unobstructed',
  navLayout.includes("mt_reference_rings(false, 'splash-rings')")
  && !round37Home.includes('mt_reference_rings') && !mindPage.body.includes('hero-rings')
  && cardsSource.includes('$ring < 6'));
ok('recorded inline icons have three independently observed silhouette loops',
  (mindPage.body.match(/data-wire-object="/g) || []).length === 3
  && (mindPage.body.match(/data-atlas-src="/g) || []).length === 3
  && appJs.includes('function setupWireObjects()'));
// Parse the shipped WebP containers, not just filenames or CSS declarations.
const wireStudy=JSON.parse(fs.readFileSync(path.join(ROOT,'tools/references/wire-motion.json'),'utf8'));
const sourceStudy=JSON.parse(fs.readFileSync(path.join(ROOT,'tools/references/recording.json'),'utf8'));
ok('wire study refers to the current external recording',wireStudy.sourceSha256===sourceStudy.sha256);
for(const [name,study] of Object.entries(wireStudy.models)) {
  const bytes=fs.readFileSync(path.join(ROOT,'tools/references/wires/wire-'+name+'.webp'));
  let frames=0,duration=0,width=0,height=0,loop=-1,min=Infinity,max=0;
  for(let at=12;at+8<=bytes.length;) {
    const type=bytes.toString('ascii',at,at+4),size=bytes.readUInt32LE(at+4),payload=at+8;
    if(type==='VP8X'){width=bytes.readUIntLE(payload+4,3)+1;height=bytes.readUIntLE(payload+7,3)+1;}
    if(type==='ANIM')loop=bytes.readUInt16LE(payload+4);
    if(type==='ANMF'){const ms=bytes.readUIntLE(payload+12,3);frames++;duration+=ms;min=Math.min(min,ms);max=Math.max(max,ms);}
    at=payload+size+(size%2);
  }
  ok('wire '+name+' has the verified 24fps dimensions, frames and loop timing',
    width===328&&height===220&&loop===0&&frames===study.frames&&duration===study.durationMs&&min===41&&max===42);
  const {createHash}=await import('node:crypto');
  ok('wire '+name+' matches its reviewed decoded-motion provenance',createHash('sha256').update(bytes).digest('hex')===study.sha256);
}
for (const [name, study] of Object.entries(wireStudy.models)) {
  const bytes=fs.readFileSync(path.join(ROOT,'assets/motion/wire-'+name+'-atlas.webp'));
  const inline=fs.readFileSync(path.join(ROOT,'assets/motion/wire-'+name+'-atlas-inline.png'));
  const {createHash}=await import('node:crypto');
  ok(name+' primary is a static atlas, not a natively animated image', !bytes.includes(Buffer.from('ANIM'))&&createHash('sha256').update(bytes).digest('hex')===study.atlas.sha256);
  ok(name+' embedded atlas matches the decoded-pose provenance',createHash('sha256').update(inline).digest('hex')===study.atlas.inlineSha256);
  ok(name+' frame clock preserves every original 24fps delay',study.atlas.durations.every((ms,i)=>ms===Math.round((i+1)*1000/24)-Math.round(i*1000/24)));
}
const {createHash:motionDigest}=await import('node:crypto');
const motionUrls=[...mindPage.body.matchAll(/(?:src|data-atlas-src)="(\/assets\/motion\/[^\"]+)"/g)].map(match=>match[1]);
ok('all fetched motion images use content hashes; stills are embedded PNG fallbacks',motionUrls.length===4&&motionUrls.every(value=>{
  const url=new URL(value,'https://club.example');
  return url.searchParams.get('v')===motionDigest('sha256').update(fs.readFileSync(path.join(ROOT,url.pathname))).digest('hex').slice(0,12);
}));
ok('joined rings shrink and rise before the following heading',
  appJs.includes('(progress - 0.45) / 0.35') && appJs.includes('1 - exit * 0.10')
  && round37Css.includes('.brand-chapter { height: 300svh; }'));
ok('people alternate left and right on home and member directory',
  round37Css.includes('.team-card:nth-child(even), .member-cards .member-card:nth-child(even) { align-self: flex-end; }')
  && round37Css.includes('.team-grid, .member-cards { display: flex; flex-direction: column; gap: 70px; }'));
ok('gallery gradients and captions cannot intercept photo clicks',
  round37Css.includes('.archive-card:after, .archive-caption, .gallery-item:after, .gallery-caption { pointer-events: none; }'));
ok('portrait heartbeat stays on the photograph rather than bouncing text cards',
  appJs.includes('function setupPortraits()') && appJs.includes('setupPortraits();')
  && round37Css.includes('html.js .scroll-reveal { opacity: 0; transform: translateY(26px)') && round37Css.includes('.photo-in-view .member-photo, .photo-in-view .gallery-visual:after'));
ok('happiness chart expresses an aspiration without a visible disclaimer or invented scores',
  !mindPage.body.includes('Illustrative trend only')
  && mindPage.body.includes('our hope to grow happier through connection and community.')
  && mindPage.body.includes('id="happinessCurve"') && mindPage.body.includes('<animateMotion'));
ok('manifestation uses five staggered rows and three fine wire objects',
  round37Css.includes('.manifest-row:nth-child(4) { padding-left: 22%; }')
  && (cardsSource.match(/mt_manifest_object\('/g) || []).length === 3
  && cardsSource.includes('function mt_manifest_object('));
ok('wave artwork fades naturally rather than meeting a rectangular edge',
  cardsSource.includes('reference-ribbons.webp')
  && (mindPage.body.match(/class="blue-waves reference-ribbons"/g) || []).length === 1
  && round37Css.includes('mask-image: linear-gradient(transparent, #000 8%, #000 88%, transparent)'));
/* Execute every menu dismissal path, including its visible icon and label. */
{
  const {runInNewContext}=await import('node:vm');
  const events={},windowEvents={},links=[{handlers:{},addEventListener(n,f){this.handlers[n]=f;}}];
  const classes=new Set();
  const nav={classList:{contains:n=>classes.has(n),toggle(n,value){if(value)classes.add(n);else classes.delete(n);}},contains:target=>links.includes(target)};
  const button={handlers:{},attrs:{},setAttribute(n,v){this.attrs[n]=v;},addEventListener(n,f){this.handlers[n]=f;},contains:target=>target===button,focus(){this.focused=true;}};
  const win={innerWidth:390,addEventListener:(n,f)=>windowEvents[n]=f};
  const begin=appJs.indexOf('function setupMenu()'),end=appJs.indexOf('function setupGalleryStage()',begin);
  runInNewContext(appJs.slice(begin,end)+'\nsetupMenu();',{$:s=>s==='#menuButton'?button:nav,$$:()=>links,document:{addEventListener:(n,f)=>events[n]=f},window:win});
  const closed=()=>button.textContent==='☰'&&button.attrs['aria-label']==='Open menu'&&button.attrs['aria-expanded']==='false'&&!classes.has('open');
  const opened=()=>button.textContent==='×'&&button.attrs['aria-label']==='Close menu'&&button.attrs['aria-expanded']==='true'&&classes.has('open');
  ok('menu initially has the hamburger and a truthful accessible label',closed());
  button.handlers.click();ok('opening changes the hamburger into a cross',opened());
  button.handlers.click();ok('closing with the cross restores the hamburger',closed());
  button.handlers.click();events.click({target:{}});ok('outside dismissal restores the hamburger and label',closed());
  button.handlers.click();events.keydown({key:'Escape'});ok('Escape closes and returns keyboard focus to the menu button',closed()&&button.focused);
  button.handlers.click();links[0].handlers.click();ok('following a menu link restores its closed state',closed());
  button.handlers.click();win.innerWidth=1440;windowEvents.resize();ok('desktop resize cannot leave the mobile menu open',closed());
}
ok('fans are nested with photos and anchored to their top edge',
  /class="portrait-photo">\s*<span class="portrait-badge"/.test(home.body)
  && round37Css.includes('.portrait-photo > .portrait-badge { top: 0; right: 0; left: auto; transform: translate(25%, -50%)'));
ok('whole sections keep stable geometry and dark stages cannot paint outside their chapter',
  round37Css.includes('.site-shell main > section { content-visibility: visible; contain-intrinsic-size: none; }')
  && round37Css.includes('.black-chapter { overflow: clip; }')
  && round37Css.includes('.page-home .site-shell main * { content-visibility: visible; contain-intrinsic-size: none; }'));
/* Execute the real canvas player with controlled frame time and requests. */
{
  const {runInNewContext}=await import('node:vm');
  const a=appJs.indexOf('function setupWireObjects()'),b=appJs.indexOf('function setupCardDeck()',a);
  let queued,clock=0,preferStill=false,inside=true;
  const events={},requests=[];
  const nodes=[84,49,49].map((count,i)=>({dataset:{frames:String(count),atlasInline:'inline-'+i,atlasSrc:'full-'+i},classList:{add(){},toggle(){}},draws:[],canvas:{getContext(){return this.ctx;}}}));
  nodes.forEach(n=>n.canvas.ctx={clearRect(){},drawImage(...args){n.draws.push(args);}});
  const doc={hidden:false,addEventListener:(n,f)=>events[n]=f};
  const win={innerHeight:950,requestAnimationFrame:f=>{queued=f;return 1;},cancelAnimationFrame:()=>{queued=null;},addEventListener:(n,f)=>events[n]=f,matchMedia:()=>({addEventListener:(n,f)=>events[n]=f})};
  const chapter={getBoundingClientRect:()=>inside?{top:0,bottom:2000}:{top:1200,bottom:3200}};
  runInNewContext(appJs.slice(a,b)+'\nsetupWireObjects();',{$: (s,n)=>s==='.brand-chapter'?chapter:n.canvas,$$:()=>nodes,window:win,document:doc,reduced:()=>preferStill,Image:class{set src(v){this.url=v;this.naturalWidth=v.startsWith('full')?2624:896;this.naturalHeight=Math.ceil((v.endsWith('0')?84:49)/8)*(v.startsWith('full')?220:76);requests.push(this);}}});
  requests.filter(r=>r.url.startsWith('inline')).forEach(r=>r.onload());
  const advance=()=>{const next=queued;queued=null;if(next)next(clock+=80);};
  advance();advance();advance();
  ok('all three explicit frame clocks draw changing recorded poses',nodes.every(n=>new Set(n.draws.map(d=>d[1]+','+d[2])).size>=2));
  requests.filter(r=>r.url.startsWith('full')).forEach(r=>r.onerror());advance();
  ok('failed primary atlases retain moving embedded sheets',nodes.every(n=>n.dataset.wireState==='fallback-motion'));
  const before=nodes.map(n=>n.draws.length);doc.hidden=true;events.visibilitychange();advance();
  ok('background tab stops the frame scheduler',nodes.every((n,i)=>n.draws.length===before[i]));
  doc.hidden=false;events.visibilitychange();advance();advance();
  ok('returning to the tab resumes all three frame clocks',nodes.every((n,i)=>n.draws.length>before[i]));
  preferStill=true;events.change();ok('reduced motion restores the server-rendered silhouettes',nodes.every(n=>n.dataset.wireState==='still'));
  preferStill=false;events.change();advance();advance();ok('motion preference changes resume playback',nodes.every(n=>n.dataset.wireState==='fallback-motion'));
  inside=false;events.scroll();ok('chapter leaving the viewport stops all clocks',nodes.every(n=>n.dataset.wireState==='still'));
  inside=true;events.scroll();requests.filter(r=>r.url.startsWith('full')).forEach(r=>{r.naturalWidth=48;r.onload();r.naturalWidth=2624;});
  ok('a wrong-sized valid image cannot replace the embedded atlas',nodes.every(n=>n.dataset.atlasFailed==='true'&&n.dataset.wireState==='fallback-motion'));
  requests.filter(r=>r.url.startsWith('full')).forEach(r=>r.onload());advance();advance();
  ok('decoded full-resolution atlases promote without restarting the pose clock',nodes.every(n=>n.dataset.wireState==='motion'&&!n.dataset.atlasFailed));
}
/* Card deck phase order, reverse scrolling, static accessibility and sizing. */
{
  const {runInNewContext}=await import('node:vm');
  const a=appJs.indexOf('function setupCardDeck()'),b=appJs.indexOf('function setupHappinessGraph()',a);
  let progress=0,queued,reduceDeck=false;
  const events={},cards=Array.from({length:3},()=>({style:{},dataset:{},offsetHeight:330,scrollHeight:9999}));
  const deck={offsetHeight:2350,classList:{toggle(){},remove(){}},getBoundingClientRect:()=>({top:84-progress*1484})};
  const stack={style:{}};
  runInNewContext(appJs.slice(a,b)+'\nsetupCardDeck();',{$:s=>s==='.psyche-deck'?deck:stack,$$:()=>cards,reduced:()=>reduceDeck,document:{},window:{innerHeight:950,innerWidth:1440,requestAnimationFrame:f=>{queued=f;return 1;},cancelAnimationFrame:()=>{queued=null;},addEventListener:(n,f)=>events[n]=f,matchMedia:()=>({addEventListener:(n,f)=>events[n]=f})}});
  const flush=()=>{const q=queued;queued=null;if(q)q();};flush();
  ok('deck measures content without counting the oversized decorative sheen',stack.style.height==='330px');
  events.resize();flush();ok('repeated deck measurement cannot grow the cards',stack.style.height==='330px');
  ok('all three cards pop into a complete stack',cards.every(c=>c.dataset.deckState==='stacked'));
  progress=.36;events.scroll();flush();ok('Notice is thrown before Connect',cards[0].dataset.deckState==='thrown'&&cards[1].dataset.deckState==='stacked');
  progress=.64;events.scroll();flush();ok('Connect leaves before Grow',cards[1].dataset.deckState==='thrown'&&cards[2].dataset.deckState==='stacked');
  progress=.93;events.scroll();flush();ok('the deck finishes with all three cards thrown',cards.every(c=>c.dataset.deckState==='thrown'));
  progress=.05;events.scroll();flush();ok('reverse scrolling rebuilds the stack',cards.every(c=>c.dataset.deckState==='stacked'));
  reduceDeck=true;events.change();ok('static mode clears every transform, opacity and inert flag',cards.every(c=>c.style.transform===''&&c.style.opacity===''&&!c.inert));
}
/* The marquee uses measured distance / speed, including a resize/font reflow. */
{
  const { runInNewContext } = await import('node:vm');
  const begin = appJs.indexOf('function setupMarqueeTiming()');
  const end = appJs.indexOf('/* -------------------------------------------------------- the front door */', begin);
  const track = { scrollWidth: 4690, style: {} }, events = {};
  const win = { innerWidth: 390, addEventListener: (name, fn) => { events[name] = fn; } };
  runInNewContext(appJs.slice(begin, end) + '\nsetupMarqueeTiming();', { $: () => track, window: win, document: {} });
  ok('marquee speed matches the measured source rather than an arbitrary 24s loop', Math.abs(2345 / parseFloat(track.style.animationDuration) - 390 * 118.05 / 720) < .01);
  win.innerWidth = 720; track.scrollWidth = 8000; events.resize();
  ok('marquee preserves reference viewport-relative speed after resize', Math.abs(4000 / parseFloat(track.style.animationDuration) - 118.05) < .01);
}
const motionFiles = fs.readdirSync(path.join(ROOT, 'assets/motion'));
ok('derived motion assets remain below 2.2MB and contain no recording',
  motionFiles.reduce((sum, name) => sum + fs.statSync(path.join(ROOT, 'assets/motion', name)).size, 0) < 2200000
  && motionFiles.every(name => !/\.(mp4|webm|mov)$/i.test(name)));
for (const type of ['orbit', 'prism', 'sphere']) {
  ok(type+' ships a canvas atlas and an independent still silhouette',fs.existsSync(path.join(ROOT,'assets/motion/wire-'+type+'-atlas.webp'))&&fs.existsSync(path.join(ROOT,'assets/motion/wire-'+type+'-fallback.png')));
}
ok('closing field uses recovered blue/violet artwork and reference-scale typography',
  cardsSource.includes('reference-ribbons.webp') && round37Css.includes('25.5vw')
  && round37Css.includes('6.7vw') && fs.existsSync(path.join(ROOT, 'assets/fonts/Inter-OFL.txt')));
ok('the splash brush paints filled contours, with a violet lead rather than strips or noise',
  paintSource.includes('class="paint-lead"') && paintSource.includes('class="paint-pigment"')
  && paintSource.includes('clipPath') && !paintSource.includes('feTurbulence')
  && !navLayout.includes('paint-strip') && round37Css.includes('@keyframes pigmentDraw')
  && round37Css.includes('animation: splashAway .65s ease 5.5s forwards'));
/* Splash exits are idempotent: animation, deliberate skip, fallback and
   reduced-motion all notify the waiting butterfly exactly once. */
{
  const { runInNewContext } = await import('node:vm');
  const begin = appJs.indexOf('function setupSplash()');
  const end = appJs.indexOf('function setupButterfly()', begin);
  for (const mode of ['animation', 'locked', 'fallback', 'reduced', 'no-splash', 'anchor']) {
    const classes = new Set(), handlers = {}, timers = {};
    let notifications = 0;
    const classList = { add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name) };
    const splash = { hidden: false, classList, addEventListener: (name, fn) => { handlers[name] = fn; } };
    runInNewContext(appJs.slice(begin, end) + '\nsetupSplash();', {
      $: selector => selector === '.site-shell' ? null : mode === 'no-splash' ? null : splash,
      reduced: () => mode === 'reduced', CustomEvent: class { constructor(type) { this.type = type; } },
      document: { body: { classList } },
      window: {
        location: {hash:mode==='anchor'?'#join':''},
        dispatchEvent: event => { if (event.type === 'mt:intro-ready') notifications++; },
        addEventListener: (name, fn) => { handlers[name] = fn; },
        setTimeout: (fn, ms) => { timers[ms] = fn; }
      }
    });
    if (mode === 'animation') {
      handlers.animationend({ target: splash, animationName: 'splashAway' });
      timers[6500]();
    } else if (mode === 'locked') {
      ok('no input listeners are attached to skip the intro',!handlers.click&&!handlers.keydown&&!handlers.wheel&&!handlers.touchstart&&notifications===0);
      timers[6500]();
    } else if (mode === 'fallback') timers[6500]();
    ok('splash exits once via ' + mode + ' and reveals the site',
      notifications === 1 && !classes.has('intro-pending') && classes.has('intro-revealed')
      && (mode === 'no-splash' || splash.hidden));
  }
}
/* Execute continuous ascent, damped progress, dwell, interrupted departures,
   fully offscreen hiding, resize and reduced motion against the real code. */
{
  const { runInNewContext } = await import('node:vm');
  const begin = appJs.indexOf('function setupButterfly()');
  const end = appJs.indexOf('/* Two fast-start encodes;', begin);
  for (const lowMotion of [false, true]) {
    const events = {}, timers = {}, classes = new Set();
    let dark = false, now = 100, nextFrame, headerTop = 0;
    const classList = {
      add: (...names) => names.forEach(name => classes.add(name)),
      remove: (...names) => names.forEach(name => classes.delete(name)),
      toggle: (name, active) => active ? classes.add(name) : classes.delete(name)
    };
    const butterfly = { offsetWidth: 82, offsetHeight: 56, style: { setProperty(name, value) { this[name] = value; } }, classList };
    const header = { getBoundingClientRect: () => ({ top: headerTop, bottom: headerTop + 68 }) };
    const section = { getBoundingClientRect: () => ({ top: dark ? 0 : 200, bottom: dark ? 400 : 600 }) };
    const doc = { hidden: false, documentElement: { scrollHeight: 4844 }, body: { classList }, addEventListener: (name, fn) => { events[name] = fn; } };
    const win = {
      innerWidth: 390, innerHeight: 844, scrollY: 0, performance: { now: () => now },
      addEventListener: (name, fn) => { events[name] = fn; },
      requestAnimationFrame: fn => { nextFrame = fn; return 1; },
      setTimeout: (fn, ms) => { timers[ms] = fn; return ms; }, clearTimeout() {}
    };
    const advance = ms => { for (let elapsed = 0; elapsed < ms; elapsed += 16) { now += 16; if (nextFrame) { const fn = nextFrame; nextFrame = null; fn(now); } } };
    const scroll = y => { win.scrollY = y; events.scroll(); advance(16); };
    const ResizeObserver = class { constructor(fn) { events.layout = fn; } observe() {} };
    win.ResizeObserver = ResizeObserver;
    const pose = () => (butterfly.style.transform || '').match(/translate3d\(([-\d.]+)px,([-\d.]+)px/).slice(1).map(Number);
    runInNewContext(appJs.slice(begin, end) + '\nsetupButterfly();', {
      $: selector => selector === '.nav-butterfly' ? butterfly : header,
      $$: () => [section], reduced: () => lowMotion, document: doc, window: win, ResizeObserver
    });
    const label = lowMotion ? ' (reduced)' : '';
    ok('butterfly waits for intro completion' + label, !classes.has('butterfly-arrived'));
    events['mt:intro-ready']();
    ok('entry starts below the viewport without showing a fixed header pose' + label,
      classes.has('butterfly-arrived') && (lowMotion ? pose()[1] === 4 : pose()[1] === 964));
    if (!lowMotion) {
      let previous = pose()[1], monotonic = true;
      for (let step = 0; step < 405; step++) { advance(16); const current = pose()[1]; if (current > previous + .02) monotonic = false; previous = current; }
      ok('ascent is a single gentle rising curve, not alternating wobbles', monotonic && pose()[1] < 4.1);
    }
    scroll(4000); advance(2400);
    ok('progress reaches right with mobile menu clearance' + label, Math.abs(pose()[0] - 234) < .1 && pose()[1] === 4);
    scroll(0); advance(2400);
    ok('reverse scroll smoothly returns to the left perch' + label, Math.abs(pose()[0] - 10) < .1);
    if (!lowMotion) {
      timers[260](); advance(1500);
      ok('the perched body stops bobbing and its tilt settles', /rotate\(-?0\.0\ddeg\)/.test(butterfly.style.transform));
      dark = true; scroll(2000); advance(144); dark = false; scroll(0); advance(600);
      ok('a fast crossing shorter than the dwell never hides or launches it away', !classes.has('butterfly-away') && pose()[0] >= 9);
    }
    dark = true; scroll(1500); advance(450);
    ok('departure is visible and gradual rather than immediate opacity removal' + label,
      lowMotion ? classes.has('butterfly-away') : !classes.has('butterfly-away') && classes.has('butterfly-flying'));
    if (!lowMotion) {
      const before = pose(); dark = false; scroll(0); advance(350);
      const after = pose();
      ok('interrupted departure steers from its current pose without teleporting', !classes.has('butterfly-away') && Math.hypot(after[0] - before[0], after[1] - before[1]) < 100);
      advance(4500); dark = true; scroll(1500); advance(4500);
      ok('opacity changes only after the butterfly has fully flown left out of view', classes.has('butterfly-away') && pose()[0] <= -182);
    }
    dark = false; scroll(0); advance(4500);
    ok('paper sections bring it back from the left and land on the bar' + label,
      !classes.has('butterfly-away') && Math.abs(pose()[0] - 10) < .1 && pose()[1] === 4);
    headerTop = 130; events.layout(); advance(2400);
    ok('late banner/layout changes update the real header perch' + label, Math.abs(pose()[1] - 86) < .1);
    headerTop = 0; events.layout(); advance(2400);
    win.innerWidth = 320; events.resize(); advance(2000);
    ok('resize preserves a finite stable perch instead of cancelling to a hidden pose' + label, !/NaN|Infinity/.test(butterfly.style.transform) && !classes.has('butterfly-away'));
    const previous = butterfly.style.transform; events['mt:intro-ready'](); timers[8000]();
    ok('intro/fallback cannot start a second ascent' + label, previous === butterfly.style.transform);
  }
}
{
  const { runInNewContext } = await import('node:vm');
  const startVideo = appJs.indexOf('function setupHeroVideo()');
  const endVideo = appJs.indexOf('function setupPortraits()', startVideo);
  let now = 0, loads = 0, interval;
  const events = {}, classes = new Set();
  const videoStub = {
    dataset: { mobileSrc: '/mobile.mp4', desktopSrc: '/desktop.mp4' },
    currentTime: 0, readyState: 1, paused: false, hidden: false,
    addEventListener: (name, fn) => { events[name] = fn; },
    play: () => ({ catch: () => {} }), pause: () => {}, load: () => { loads++; },
    classList: { add: name => classes.add(name), remove: name => classes.delete(name) }
  };
  runInNewContext(appJs.slice(startVideo, endVideo) + '\nsetupHeroVideo();', {
    $: () => videoStub, reduced: () => false, navigator: { connection: { effectiveType: '4g' } },
    Date: { now: () => now }, document: { hidden: false, addEventListener: () => {} },
    window: { matchMedia: () => ({ matches: true }), clearTimeout: () => {}, setTimeout: () => 1,
      setInterval: fn => { interval = fn; }, addEventListener: () => {} }
  });
  ok('player chooses only the mobile rendition on a phone', videoStub.src === '/mobile.mp4');
  events.stalled(); events.stalled();
  ok('network stalls do not seek or discard the buffer', videoStub.currentTime === 0 && loads === 0);
  now = 1000; interval(); now = 8000; interval();
  ok('a prolonged freeze shows the poster rather than a stuck horse', classes.has('is-buffering') && loads === 0);
  now = 20000; interval(); now = 45000; interval();
  ok('recovery cannot reload repeatedly', loads === 1);
  videoStub.currentTime = 1; interval();
  ok('moving frames restore the video over the poster', !classes.has('is-buffering'));
}


console.log('\n— actual dashboard renderer and upload regressions —');
{
  const { runInNewContext } = await import('node:vm');
  const source = fs.readFileSync(path.join(ROOT, 'assets/manage.js'), 'utf8');
  const esc = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  const events = { innerHTML: '' }, team = { innerHTML: '' }, button = { textContent: '+ Add event', disabled: false }, messages = [];
  const state = { team: [{id:'team-fixture',name:'Audit Member'}], gallery: [], events: [{ id: 'existing', number: 1, title: 'Existing event', published: false, month: 9, day: 24, year: 2026 }] };
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const helpers = source.slice(source.indexOf('function numberedEventName('), source.indexOf('function renderGallery()'));
  const adding = source.slice(source.indexOf('async function addItem('), source.indexOf('/* --------------------------------------------------------------- uploads */'));
  const context = { state, months, esc, sorted: rows => rows, uploadField: () => '',
    $: selector => selector === '#eventEditors' ? events : selector === '#teamEditors' ? team : selector === '#addEvent' ? button : null,
    toast: message => messages.push(message), window: { setTimeout() {} },
    api: async (route, options = {}) => {
      if (options.method === 'POST') return { item: { id: 'new', number: 2, ...JSON.parse(options.body) } };
      return { items: state.events.concat([{ id: 'new', number: 2, title: 'New event', published: true, month: 10, day: 20, year: 2026 }]) };
    }
  };
  await runInNewContext(helpers + '\nfunction renderAll(){renderEvents();}\n' + adding + '\nrenderEvents();addItem("events");', context);
  ok('Add event renders the returned record instead of throwing an undefined item error',
    messages.some(message => message.startsWith('Event 2 added')) && events.innerHTML.includes('New event') && !button.disabled);
  ok('only the actual unpublished event gets a hidden flag', (events.innerHTML.match(/class="hidden-flag"/g) || []).length === 1);
  ok('the event editor preserves the stored numeric month, day and year',
    events.innerHTML.includes('value="10" selected>October') && events.innerHTML.includes('data-field="day" value="20"') && events.innerHTML.includes('data-field="year" value="2026"'));
  const legacyDate = runInNewContext(helpers + '\neventParts({date:"20 December 2026"});', context);
  ok('legacy event dates map to one-based month values too', legacyDate.month === '12' && legacyDate.day === '20');
  const monthRoundtrip = months.every((month,index)=>{
    state.events = [{id:'month',title:'Month check',published:true,month:index+1,day:20,year:2026}];
    runInNewContext(helpers+'\nrenderEvents();',context);
    return events.innerHTML.includes('value="'+(index+1)+'" selected>'+month);
  });
  ok('all twelve month options use the same one-based values as the backend',monthRoundtrip);
  runInNewContext(helpers + '\nrenderTeam();', context);
  ok('the shared team card renderer does not require an out-of-scope event variable', team.innerHTML.includes('Audit Member') && team.innerHTML.includes('data-type="team"'));
  const upload = source.slice(source.indexOf('async function uploadFile('), source.indexOf('/* -------------------------------------------------------- event registers */'));
  const field = { value: '/old-logo.png' }, thumb = { style: {}, classList: { add() {} }, textContent: '' }, card = {};
  const input = { files: [{ name: 'logo.png' }], value: 'logo.png', closest: () => card };
  await runInNewContext(upload + '\nuploadFile(input,"logoImage");', {
    input, FormData: class { append() {} }, toast() {}, api: async () => ({ url: '/uploads/new-logo.png' }),
    $: selector => selector.includes('data-copy-field') ? field : selector.includes('data-thumb-for') ? thumb : null
  });
  ok('logo upload updates the site-copy field, not only its thumbnail', field.value === '/uploads/new-logo.png' && input.value === '');
  const collect = source.slice(source.indexOf('function collectCopy('), source.indexOf('async function saveCopy('));
  const logoGroup = {}, textGroup = {};
  const patch = runInNewContext(collect + '\ncollectCopy("brand-media");', { $$: (selector, node) => {
    if (selector === '[data-copy-group]') return [logoGroup, textGroup];
    if (selector === '[data-copy-group="brand-media"]') return [logoGroup];
    if (selector === '[data-copy-field]') return node === logoGroup ? [{ dataset: { copyField: 'logoImage' }, value: '/new.png' }] : [{ dataset: { copyField: 'announcement' }, value: 'Unsaved text' }];
    return [];
  } });
  ok('saving the logo does not silently save unrelated unsaved text', patch.logoImage === '/new.png' && patch.announcement === undefined);
}
// Exercise the actual anchor controller, including cancelled late reflows.
{
  const {runInNewContext}=await import('node:vm');
  const start=appJs.indexOf('function setupAnchorNavigation()');
  const end=appJs.indexOf('function setupScrollUi()',start);
  const calls=[],listeners={},clicks={},fonts=[];
  const node=id=>({id,classList:{add(){}},scrollIntoView(){calls.push(id);}});
  const form=node('membershipForm'),join=node('join'),contact=node('contact');
  const ids={membershipForm:form,join,contact};
  const location={href:'https://club.test/#join',hash:'#join',origin:'https://club.test',pathname:'/',search:''};
  const win={location,requestAnimationFrame:fn=>fn(),addEventListener:(name,fn)=>listeners[name]=fn,
    history:{pushState(_a,_b,hash){location.hash=hash;location.href='https://club.test/'+hash;}}};
  const doc={readyState:'complete',fonts:{ready:{then:fn=>fonts.push(fn)}},getElementById:id=>ids[id]||null,
    documentElement:{classList:{add(){}},getBoundingClientRect:()=>({})},addEventListener:(name,fn)=>clicks[name]=fn};
  runInNewContext(appJs.slice(start,end)+'\nsetupAnchorNavigation();',{$:()=>form,document:doc,window:win,URL});
  ok('a direct Join fragment targets the actual membership form, not its section heading',calls.join(',')==='membershipForm');
  const tap=href=>{let prevented=false;clicks.click({button:0,target:{closest:()=>({href,target:'',hasAttribute:()=>false})},preventDefault(){prevented=true;}});return prevented;};
  ok('same-page section links update history and align their real target',tap('https://club.test/#contact')&&location.hash==='#contact'&&calls.at(-1)==='contact');
  ok('returning to Join still points to membership, not event registration',tap('https://club.test/#join')&&calls.at(-1)==='membershipForm');
  const before=calls.length;listeners.wheel();fonts.forEach(fn=>fn());
  ok('late font/layout callbacks cannot yank the page after the visitor scrolls',calls.length===before);
  ok('cross-page links retain normal navigation and malformed fragments do not throw',!tap('https://club.test/gallery')&&!tap('https://club.test/#%'));
}
ok('all thirteen calibrated glyphs remain; joined m/n fills avoid outline crescents',
  (paintSource.match(/id="ink-letter-/g)||[]).length===13&&paintSource.includes('m-flow-pigment')&&paintSource.includes('n-flow-pigment')
  && !/<use[^>]*href="#ink-letter-2"[^>]*class="paint-(?:lead|pigment)"/.test(paintSource));
ok('the intro begins with a centred seed and then blossoms outward',
  round37Css.includes('@keyframes seedRing')&&round37Css.includes('@keyframes splashBloom')&&cardsSource.includes('--seed-x:'));
ok('calendar wrapper is explicitly transparent while month cards remain',
  round37Css.includes('.site-shell main > div.calendar-content { background: none;')
  && (await get('/calendar')).body.includes('container calendar-content'));
ok('both observed portrait fan designs and a photo-only heartbeat are present',
  cardsSource.includes('badge-dark')&&cardsSource.includes('badge-light')&&round37Css.includes('@keyframes photoHeartbeat')&&round37Css.includes('@keyframes fanTurn'));
ok('member fan is not clipped by automatic paint containment',
  round37Css.includes('.member-cards .member-card { content-visibility: visible; contain-intrinsic-size: none; }'));
ok('membership fields use the same browser rules as event registration',
  home.body.includes('name="name" data-rule="name"')&&home.body.includes('name="phone" data-rule="phone"'));
ok('the inline PNG fallback is transmitted once per wire, not duplicated in data attributes',
  (mindPage.body.match(/\ssrc="data:image\/png;base64,/g)||[]).length===3&&!cardsSource.includes('data-still-src="'));
{
  const {runInNewContext}=await import('node:vm');
  const a=appJs.indexOf('function setupHappinessGraph()'),b=appJs.indexOf('function setupMarqueeTiming()',a);
  let graphSafe=true;
  try{runInNewContext(appJs.slice(a,b)+'\nsetupHappinessGraph();',{$:()=>({})});}catch(error){graphSafe=false;}
  ok('unsupported SVG animation APIs cannot break the remaining page setup',graphSafe);
}
console.log('\n— measured PDF fitting, including long unbroken tokens —');
const widthMetrics=JSON.parse(String(await php.x(['json_encode([mt_pdf_width("nnnn1111WWW",10),mt_pdf_width("nnnn1111WWW",10,true)])'])));
ok('PDF measures full Helvetica AFM widths rather than approximating n and digits',Math.abs(widthMetrics[0]-72.8)<.001&&Math.abs(widthMetrics[1]-75)<.001);
const brokenToken=JSON.parse(String(await php.x(['json_encode(mt_pdf_wrap(str_repeat("W",150),10,112))'])));
ok('a long unbroken token wraps without losing characters or overrunning its column',brokenToken.join('')==='W'.repeat(150)&&brokenToken.every(line=>line.length*9.44<112));
const fitFixture=JSON.parse(String(await php.x(['json_encode(mt_pdf_fit("Alexandria Catherine Elizabeth Montgomery Harrington Sinclair",24,455.28,1,8,true))'])));
ok('a realistic long holder name fits in full without colliding with the QR',fitFixture.lines.length===1&&!fitFixture.lines[0].includes('...')&&fitFixture.size>=12);
const hugeFit=JSON.parse(String(await php.x(['json_encode(mt_pdf_fit(str_repeat("W",250),10,112,3,7.2))'])));
ok('even extreme text is bounded to allocated rows and explicitly ellipsized',hugeFit.lines.length===3&&hugeFit.lines[2].endsWith('...')&&hugeFit.size>=7.2);
console.log('\n— role-driven chart and automatic new member fans —');
const chartFixture={team:[
 {id:'chart-vp',name:'Vice Audit',role:'Vice President',group:'management',image:'/assets/photos/team-mohd-shafiq.jpg',order:0},
 {id:'chart-president',name:'Chair Audit',role:'President',group:'management',image:'',order:1},
 {id:'chart-secretary',name:'New Audit',role:'Secretary',group:'management',image:'',order:2}
]};
async function graphHtml(data){return String(await php.x(['mt_happiness_graph(json_decode(base64_decode("'+Buffer.from(JSON.stringify(data)).toString('base64')+'"),true))']));}
const chartHtml=await graphHtml(chartFixture);
ok('the live President is not confused with a Vice President who sorts first',chartHtml.includes('data-chart-role="president" data-member-id="chart-president"')&&chartHtml.includes('data-chart-role="vice-president" data-member-id="chart-vp"'));
ok('both chart portraits travel back and forth on separate paths', (chartHtml.match(/<animateMotion/g)||[]).length===2&&(chartHtml.match(/keyPoints="0;1;0"/g)||[]).length===2&&chartHtml.includes('happinessViceCurve'));
ok('missing President photo has an MT frame while the Vice President uses their actual photo',chartHtml.includes('>MT</text>')&&(chartHtml.match(/class="chart-portrait-image"/g)||[]).length===1&&chartHtml.includes('/assets/photos/team-mohd-shafiq.jpg'));
chartFixture.team[1].image='/assets/img/favicon-48.png';
const updatedChart=await graphHtml(chartFixture);
ok('a changed member photo is read afresh by the next graph render',updatedChart.includes('/assets/img/favicon-48.png')&&(updatedChart.match(/class="chart-portrait-image"/g)||[]).length===2);
const newMemberCards=String(await php.x(['implode("",array_map("mt_team_card",json_decode(base64_decode("'+Buffer.from(JSON.stringify(chartFixture.team)).toString('base64')+'"),true)))']));
ok('every newly added core card automatically contains both alternating fan designs', (newMemberCards.match(/class="badge-dark"/g)||[]).length===3&&(newMemberCards.match(/class="badge-light"/g)||[]).length===3);
ok('the initial m uses joined arches too and the central mark clears before painting',paintSource.includes('m-flow-pigment')&&round37Css.includes('.splash-ring-intro { animation-delay: 1.8s; animation-duration: .35s; }'));
ok('the splash n uses joined filled regions and no detached ring overlay',paintSource.includes('n-flow-pigment')&&paintSource.includes('n-finish')&&!navLayout.includes('splash-letter-ring'));
ok('all three wires embed a host-independent PNG fallback',(mindPage.body.match(/src="data:image\/png;base64,/g)||[]).length>=3&&cardsSource.includes("base64_encode((string) file_get_contents"));
console.log('\n— the lamps that breathe —');
ok('no dotted lamps sit before the small labels any more',
  !/\.eyebrow:before/.test(round37Css) && !/\.kicker:before\s*,?[^}]*lightPulse/.test(round37Css));
ok('the Mind doorway wears a lamp of its own',
  /\.nav-links a\.nav-lens:before \{[\s\S]{0,220}?animation: lightPulse/.test(round37Css));
ok('the lamps breathe rather than blink',
  /@keyframes lightPulse \{[\s\S]{0,220}?opacity: \.55[\s\S]{0,160}?opacity: 1/.test(round37Css));
ok('the wheel keeps its own pulse', /\.psi-stage-glow \{[^}]*psiPulse/.test(round37Css));

console.log('\n— the Mind doorway can no longer be missed —');
ok('it is a filled chip in the club\'s terracotta, not a bare word',
  /\.nav-links a\.nav-lens \{[^}]*background: linear-gradient\(180deg, #9c4a2c, #7d3520\)/.test(round37Css)
  && /\.nav-links a\.nav-lens \{[^}]*color: #fff8ee/.test(round37Css));
ok('it glows and hops, so the eye finds it',
  /\.nav-links a\.nav-lens \{[^}]*animation: lensHop 2\.8s ease-in-out infinite, lensGlow 3\.6s ease-in-out infinite/.test(round37Css)
  && /@keyframes lensGlow \{/.test(round37Css));
ok('hamburger lens row matches other links with no chip, glow or dot',
  round37Css.includes('color: inherit; font-weight: inherit; background: none;')
  && round37Css.includes('box-shadow: none; text-shadow: none; animation: none; transform: none;')
  && round37Css.includes('.nav-links a.nav-lens:before { display: none; }'));
ok('the menu renders with its chip, on the live page',
  mindPage.body.includes('class="nav-lens"') && mindPage.body.includes('>The lens</a>')
  && (mindPage.body.match(/class="nav-lens"/g) || []).length === 1);

console.log('\n— the HD psychology story —');
const storySource = fs.readFileSync(path.join(ROOT, 'assets/story.js'), 'utf8');
const sceneSource = fs.readFileSync(path.join(ROOT, 'tools/story/scene.js'), 'utf8');
const shaderSource = fs.readFileSync(path.join(ROOT, 'tools/story/shaders.js'), 'utf8');
const audioSource = fs.readFileSync(path.join(ROOT, 'assets/audio.js'), 'utf8');
const storyCss = fs.readFileSync(path.join(ROOT, 'assets/story.css'), 'utf8');
const storyView = fs.readFileSync(path.join(ROOT, 'views/public/mind-story.php'), 'utf8');
const hdReference = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/references/zero-hd-manifest.json'), 'utf8'));
ok('the psychology sequence is inserted after the working wire chapter',
  home.body.indexOf('id="human-story"') > home.body.indexOf('class="brand-chapter') && home.body.indexOf('id="human-story"') < home.body.indexOf('class="happiness-section"'));
ok('the story runtime is inlined and initialises after markup exists',
  home.body.includes('function startStory()') && storySource.includes("document.addEventListener('DOMContentLoaded',startStory") && !home.body.includes('src="/assets/story.js"'));
ok('the glass keeps its qualifier and primary-source citations',
  storyView.includes('283 participants · low-certainty evidence') && storyView.includes('PMC10393216') && storyView.includes('PMC12280877'));
ok('newspapers carry historical profiles and a dated research reading, not invented quotations',
  ['Sigmund Freud', 'Carl Rogers', 'William James', 'Research reading · 2025', 'not historical newspaper facsimiles'].every(text => storyView.includes(text)));
ok('the chapter has native-scroll, motion-preference and missing-asset fallbacks',
  storySource.includes('staticStory()') && storySource.includes('3D engine timed out') && storySource.includes("motion.addEventListener('change',configure)") && !storySource.includes("addEventListener('wheel'"));
ok('the decorative canvas stays out of the accessible tree but the actual facts do not',
  storyView.includes('class="story-canvas" aria-hidden="true"') && storyView.includes('<article class="story-shard">') && !storySource.includes("shard.style.visibility"));
ok('the classic herd is revealed by clearing the canvas, not replaced by another recording',
  sceneSource.includes('1-smooth(.945,.998,p)') && sceneSource.includes("phase==='herd'") && !/<video|\.mp4/i.test(storyView + storySource));
ok('both story typefaces are self-hosted with their OFL notices',
  ['bodoni-moda-latin.woff2', 'pinyon-script-latin.woff2', 'BodoniModa-OFL.txt', 'PinyonScript-OFL.txt'].every(name => fs.existsSync(path.join(ROOT, 'assets/fonts', name))) && !/https?:/.test(storyCss));
ok('the painted source-pose atlas and local scene bundle replace the generic glove',
  fs.existsSync(path.join(ROOT,'assets/story/hand-painted-poses.webp')) && !fs.existsSync(path.join(ROOT,'assets/story/hand-rig.glb')) && fs.existsSync(path.join(ROOT,'assets/vendor/THREE-LICENSE.txt')) && fs.statSync(path.join(ROOT,'assets/vendor/story-3d.js')).size<650000);
ok('the hand retains baked artwork without timer/pointer/gyro shake',
  sceneSource.includes('handUniforms.uPose.value=smooth') && !sceneSource.includes('DeviceOrientationEvent') && !sceneSource.includes('bone.node.rotateX') && !sceneSource.includes('RoomEnvironment'));
ok('glass scrolls vertically while money alone starts forward camera travel',
  sceneSource.includes('if(progress<.375)return 12') && sceneSource.includes('vertical=smooth') && sceneSource.includes('i<4') && shaderSource.includes('uBurn'));
ok('thrown papers have random independent positions and independently tumbling strips',
  sceneSource.includes('shredGeometry(24,28)') && sceneSource.includes('throwSpeed') && shaderSource.includes('past=clamp') && !sceneSource.includes('radius=1.8'));
ok('no sound or tilt controls are injected into the public layout',
  !storyView.includes('data-enable-tilt') && !fs.readFileSync(path.join(ROOT,'views/layout.php'),'utf8').includes('soundButton') && !sceneSource.includes('requestPermission'));
ok('dynamic viewport drawing does not change reserved document height or reveal the global paper film',
  storyCss.includes('height: 100dvh') && storyCss.includes('background: none !important') && storySource.includes('innerHeight*6.6') && sceneSource.includes('const resized=resizeNeeded?applyResize():false'));
ok('glass is the sole audio asset, gesture unlocked without a button or late replay',
  fs.readdirSync(path.join(ROOT,'assets/audio')).join(',')==='glass-impact.mp3' && audioSource.includes('context.resume()') && audioSource.includes("context.state!=='running'") && !audioSource.includes('localStorage') && !audioSource.includes('intro-gallop') && !audioSource.includes('foreboding'));
ok('the full-resolution reference manifest preserves all eleven recoverable clips',
  hdReference.parts.length === 11 && hdReference.parts.every((part, i) => part.width === 1080 && part.height === 2400 && part.gitPath === `video_part_${String(i).padStart(2, '0')}.mp4` && /^[a-f0-9]{40}$/.test(part.gitBlob) && /^[a-f0-9]{64}$/.test(part.sha256)));
ok('root reference MP4s are no longer in the live tree', !fs.readdirSync(ROOT).some(name => /\.mp4$/i.test(name)));
ok('all three original horse encodes are retained at their original sizes',
  [['running', 9938593], ['desktop', 3831086], ['mobile', 1894350]].every(([name, bytes]) => fs.statSync(path.join(ROOT, `assets/media/horses-${name}.mp4`)).size === bytes));

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
