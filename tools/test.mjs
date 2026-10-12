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
    $_FILES = $spec['files'] ?? [];
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

    return json_encode([
        'status'  => $GLOBALS['MT_TEST_STATUS'],
        'body'    => $output,
        'headers' => $GLOBALS['MT_TEST_HEADERS'],
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
    return JSON.parse(String(raw));
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

console.log('\n— public pages —');
const home = await get('/');
ok('GET / returns 200', home.status === 200, 'status ' + home.status + ' ' + String(home.body).slice(0, 200));
ok('home has the club name', /Mindful Tattva/.test(home.body));
ok('home inlines the stylesheet', home.body.includes('<style>') && home.body.includes('.awareness-stage'));
ok('home inlines the script', home.body.includes('initAwarenessRails'));
ok('home renders both awareness rails', home.body.includes('data-rail="0"') && home.body.includes('data-rail="1"'));
ok('home renders four awareness tiles', (home.body.match(/data-awareness-open="/g) || []).length >= 4);
ok('home renders both forms', home.body.includes('data-form="membership"') && home.body.includes('data-form="club-registration"'));
ok('home has the photo viewer', home.body.includes('id="lightbox"'));
ok('home renders without PHP errors', !/(Warning|Notice|Fatal error|Deprecated|THROWN):/.test(home.body), (home.body.match(/(Warning|Notice|Fatal error|Deprecated|THROWN):.{0,140}/) || [''])[0]);
ok('“Content Studio” wording is gone', !/content studio/i.test(home.body));
ok('the awareness section is scroll-driven', home.body.includes('data-awareness-stage') && home.body.includes('data-rail-progress'));

const gallery = await get('/gallery');
ok('GET /gallery returns 200', gallery.status === 200, 'status ' + gallery.status + ' ' + String(gallery.body).slice(0, 140));
ok('gallery renders cards or an empty state', /gallery-card|empty-state/.test(gallery.body));
ok('gallery has a search field', gallery.body.includes('data-gallery-search'));
ok('gallery photos have no floating caption wrapper', !/gallery-caption/.test(gallery.body));

const calendar = await get('/calendar');
ok('GET /calendar returns 200', calendar.status === 200);
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const monthHits = monthNames.filter((name) => calendar.body.includes('<h3>' + name + '</h3>')).length;
ok('calendar renders twelve months', monthHits === 12, String(monthHits));

const awarenessPage = await get('/awareness');
ok('GET /awareness returns 200', awarenessPage.status === 200);
ok('awareness page lists helplines', awarenessPage.body.includes('14416'));

const membersPage = await get('/members');
ok('the member roster page is not public', membersPage.status === 404, 'status ' + membersPage.status);

const dash = await get('/dashboard');
ok('GET /dashboard returns 200', dash.status === 200, 'status ' + dash.status);
ok('dashboard shows the password screen', dash.body.includes('id="loginForm"'));
ok('dashboard inlines its dashboard styles', dash.body.includes('.dash-shell'));
ok('dashboard is noindex', /noindex/.test(dash.body));
ok('dashboard has no public Content Studio wording', !/content studio/i.test(dash.body));

const missing = await get('/nope');
ok('unknown path returns 404', missing.status === 404, 'status ' + missing.status);
ok('unknown path shows the friendly page', missing.body.includes('drifted somewhere quieter'));

const sitemap = await get('/sitemap.xml');
ok('sitemap.xml is served', sitemap.status === 200 && sitemap.body.includes('<urlset'));

const robots = await get('/robots.txt');
ok('robots.txt is served', robots.status === 200 && robots.body.includes('Sitemap: /sitemap.xml'));
ok('robots.txt keeps the dashboard and the check out of search engines',
  robots.body.includes('Disallow: /dashboard') && robots.body.includes('Disallow: /health'));

const healthPage = await get('/health');
ok('GET /health returns 200', healthPage.status === 200, 'status ' + healthPage.status);
ok('the deployment check lists the design files', healthPage.body.includes('Design files') && healthPage.body.includes('assets/app.css'));
ok('the deployment check loads nothing of its own', !/(href|src)="\/assets\//.test(healthPage.body));
ok('the deployment check is noindex', /noindex/.test(healthPage.body));

console.log('\n— public API —');
const siteApi = await get('/api/site');
ok('GET /api/site returns 200', siteApi.status === 200);
let sitePayload = {};
try { sitePayload = JSON.parse(siteApi.body); } catch (e) { /* reported below */ }
ok('site payload has content and a revision', Boolean(sitePayload.site && sitePayload.revision), String(siteApi.body).slice(0, 140));
ok('site payload hides the inbox', sitePayload.submissions === undefined);
ok('site payload carries four awareness tiles', Array.isArray(sitePayload.awareness) && sitePayload.awareness.length === 4);

const sinceApi = await get('/api/site?since=' + sitePayload.revision);
ok('since= returns unchanged', JSON.parse(sinceApi.body).unchanged === true);

const health = await get('/api/health');
ok('GET /api/health is ok', health.status === 200 && JSON.parse(health.body).ok === true);
const healthPayload = JSON.parse(health.body);
ok('api health counts the design files it checked',
  Boolean(healthPayload.files) && healthPayload.files.checked >= 14 && healthPayload.files.missing === 0,
  JSON.stringify(healthPayload.files || {}));
ok('api health says the site is complete', healthPayload.site_ok === true && /in place/.test(healthPayload.summary || ''), String(healthPayload.summary));

const session = await get('/api/session');
ok('anonymous session reports false', JSON.parse(session.body).authenticated === false);

const subAnon = await get('/api/submissions');
ok('anonymous inbox read is blocked', subAnon.status === 401, 'status ' + subAnon.status + ' body=' + String(subAnon.body).slice(0, 160));

console.log('\n— sign in —');
const badLogin = await sendJson('/api/login', 'POST', { password: 'definitely-wrong' });
ok('wrong password is rejected', badLogin.status === 401, 'status ' + badLogin.status);
const goodLogin = await sendJson('/api/login', 'POST', { password: 'Csmu@MT' });
ok('the club password signs in', goodLogin.status === 200 && JSON.parse(goodLogin.body).authenticated === true, String(goodLogin.body).slice(0, 160));

console.log('\n— protected writes —');
const noCsrf = await sendJson('/api/site', 'PUT', { tagline: 'x' }, { session: SESSION });
ok('missing CSRF token is rejected', noCsrf.status === 419, 'status ' + noCsrf.status + ' body=' + String(noCsrf.body).slice(0, 160));

const editCopy = await sendJson('/api/site', 'PUT', { tagline: 'A softer space to understand the mind.' }, AUTH);
ok('site copy saves with a token', editCopy.status === 200, String(editCopy.body).slice(0, 160));

const badCollection = await sendJson('/api/hackers', 'POST', {}, AUTH);
ok('unknown collection is refused', badCollection.status === 404, 'status ' + badCollection.status);

const addTile = await sendJson('/api/awareness', 'POST', {
  eyebrow: 'Test tile', title: 'A tile written by the test suite', stat: '1 in 7',
  body: 'Body copy', takeaway: 'Takeaway', source: 'Test', order: 99,
}, AUTH);
ok('a new awareness tile is created', addTile.status === 201, String(addTile.body).slice(0, 160));
const tileId = addTile.status === 201 ? JSON.parse(addTile.body).item.id : '';

const patchTile = await sendJson('/api/awareness/' + tileId, 'PUT', { title: 'Renamed tile' }, AUTH);
ok('the tile can be edited', patchTile.status === 200 && JSON.parse(patchTile.body).item.title === 'Renamed tile', String(patchTile.body).slice(0, 140));

const deleteTile = await request({ uri: '/api/awareness/' + tileId, method: 'DELETE', ...AUTH });
ok('the tile can be deleted', deleteTile.status === 200, 'status ' + deleteTile.status);

const addPhoto = await sendJson('/api/gallery', 'POST', { caption: '<script>alert(1)</script>', alt: 'x', image: 'javascript:alert(1)' }, AUTH);
const photoItem = JSON.parse(addPhoto.body).item;
ok('HTML in a caption is stored as plain text', !photoItem.caption.includes('<script>'), photoItem.caption);
ok('unsafe image URLs are dropped', photoItem.image === '', JSON.stringify(photoItem.image));
await request({ uri: '/api/gallery/' + photoItem.id, method: 'DELETE', ...AUTH });

const upload = await sendJson('/api/upload', 'POST', {
  dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR42mP8z8DAwMDAwMDAwMDAAAAOAAGx4sQAAAAASUVORK5CYII=',
  kind: 'image',
}, AUTH);
ok('a base64 upload is stored', upload.status === 201, String(upload.body).slice(0, 200));
let uploadedUrl = '';
try { uploadedUrl = JSON.parse(upload.body).url || ''; } catch (e) { /* ignore */ }
ok('upload returns a real path', /^\/uploads\/\d{4}\/\d{2}\/[\w.-]+\.png$/.test(uploadedUrl), uploadedUrl);

const badUpload = await sendJson('/api/upload', 'POST', { dataUrl: 'data:text/html;base64,PHNjcmlwdD4=', kind: 'image' }, AUTH);
ok('non-image uploads are refused', badUpload.status === 415 || badUpload.status === 400, 'status ' + badUpload.status);

console.log('\n— registrations —');
const spam = await sendJson('/api/submissions', 'POST', { name: 'Bot', email: 'bot@example.com', phone: '+91 9000000000', website: 'http://spam.example' });
ok('honeypot submissions are ignored', spam.status === 200, 'status ' + spam.status);

const badForm = await sendJson('/api/submissions', 'POST', { name: 'A', email: 'not-an-email', phone: '12' });
ok('invalid form data is rejected', badForm.status === 422, 'status ' + badForm.status);

const goodForm = await sendJson('/api/submissions', 'POST', {
  name: 'Riya Sharma', email: 'riya@example.com', phone: '+91 98765 43210',
  course: 'BSc Psychology', year: 'Second year', interests: 'Workshops', message: 'Hi!', type: 'membership',
});
ok('a valid registration is stored', goodForm.status === 201, String(goodForm.body).slice(0, 160));

const inbox = await get('/api/submissions', AUTH);
const inboxItems = JSON.parse(inbox.body).items || [];
ok('the registration appears in the dashboard inbox', inboxItems.length === 1 && inboxItems[0].name === 'Riya Sharma', 'count ' + inboxItems.length);
ok('the public site never exposes the inbox', !(await get('/api/site')).body.includes('riya@example.com'));

if (inboxItems.length) {
  const delSub = await request({ uri: '/api/submissions/' + inboxItems[0].id, method: 'DELETE', ...AUTH });
  ok('a registration can be deleted', delSub.status === 200, 'status ' + delSub.status);
}

console.log('\n— backups & settings —');
const backups = await get('/api/backups', AUTH);
const backupItems = JSON.parse(backups.body).items || [];
ok('a backup is created on save', backupItems.length >= 1, 'count ' + backupItems.length);

if (backupItems.length) {
  const restored = await sendJson('/api/backups/restore', 'POST', { name: backupItems[0].name }, AUTH);
  ok('a backup can be restored', restored.status === 200, String(restored.body).slice(0, 160));
}

const exportDb = await get('/api/export', AUTH);
ok('full backup export works', exportDb.status === 200 && exportDb.body.includes('"site"'));

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

console.log('\n— front-end scripts & gallery rules —');
const vm = await import('node:vm');
for (const asset of ['assets/app.js', 'assets/dashboard.js']) {
  const code = fs.readFileSync(path.join(ROOT, asset), 'utf8');
  try {
    new vm.Script(code, { filename: asset });
    ok(asset + ' parses', true);
  } catch (error) {
    ok(asset + ' parses', false, error.message);
  }
}

const captioned = await sendJson('/api/gallery', 'POST', { caption: 'Founders circle, first meet', event: 'Founders circle', image: '/assets/photos/campus.jpg', alt: 'Circle of chairs' }, AUTH);
const captionedItem = JSON.parse(captioned.body).item;
const bare = await sendJson('/api/gallery', 'POST', { event: 'Stress-buster week', image: '/assets/img/csmu-seal.png', alt: 'Seal' }, AUTH);
const bareItem = JSON.parse(bare.body).item;
const galleryPage = await get('/gallery');
const captionedBlock = new RegExp('<strong>Founders circle, first meet</strong>').test(galleryPage.body);
const bareCaption = new RegExp('<strong>Stress-buster week</strong>').test(galleryPage.body);
const bareBadge = galleryPage.body.includes('class="gallery-badge">Stress-buster week<');
ok('a typed caption is printed', captionedBlock);
ok('no caption is invented for a photo without one', !bareCaption);
ok('an event name without a caption shows as a badge', bareBadge);
ok('every photo has a full-frame viewer button', (galleryPage.body.match(/data-gallery-open="/g) || []).length >= 2);
await request({ uri: '/api/gallery/' + captionedItem.id, method: 'DELETE', ...AUTH });
await request({ uri: '/api/gallery/' + bareItem.id, method: 'DELETE', ...AUTH });

console.log('\n— motion & styling contracts —');
const homeSource = (await get('/')).body;
ok('content is never hidden without JavaScript', homeSource.includes('class="no-js"') && homeSource.includes('replace("no-js", "js")'));
const appCss = fs.readFileSync(path.join(ROOT, 'assets/app.css'), 'utf8');
ok('reveals are hidden only under html.js', /html\.js \.reveal \{/.test(appCss) && !/^\s*\.reveal \{ opacity: 0/m.test(appCss));
const appJs = fs.readFileSync(path.join(ROOT, 'assets/app.js'), 'utf8');
ok('the script reveals with the class the stylesheet animates', appJs.includes("classList.add('is-visible')") && !appJs.includes("'is-in'"));
const layoutSource = fs.readFileSync(path.join(ROOT, 'views/layout.php'), 'utf8');
ok('a script that never arrives cannot hide content', /classList\.remove\('js'\)/.test(layoutSource));
ok('the awareness rails move left to right while scrolling', appJs.includes('translate3d(') && /lag = index % 2 === 0 \? 1 : 0\.62/.test(appJs));
ok('the gallery badge only replaces a missing caption', appCss.includes('.gallery-badge') && appJs.includes('gallery-badge'));
ok('the lightbox locks the page while open', appCss.includes('body.lightbox-open'));

console.log('\n— awareness corner —');
const awareHome = (await get('/')).body;
ok('the awareness tab is on the public pages', awareHome.includes('id="awarenessTab"'));
ok('the tab points at the awareness corner', awareHome.includes('href="#awareness"'));
const awarePage = (await get('/awareness')).body;
ok('the awareness page has no self-linked tab', !awarePage.includes('id="awarenessTab"'));
ok('the awareness page keeps the helplines visible', awarePage.includes('14416') && awarePage.includes('KIRAN'));
ok('awareness tiles link to a full note', awareHome.includes('class="tile') && awareHome.includes('data-awareness-open="0"'));

console.log('\n— a half-finished upload (the blank-site bug) —');
/* Exactly what the live server looked like: the assets folder was there, its
   files were not. The site must stay readable and the check must say so. */
const cssBackup = await php.readFile('/site/assets/app.css', { encoding: 'utf8' });
const jsBackup = await php.readFile('/site/assets/app.js', { encoding: 'utf8' });
await php.unlink('/site/assets/app.css');
await php.unlink('/site/assets/app.js');

const halfHome = await get('/');
ok('a missing stylesheet falls back to the built-in baseline',
  halfHome.body.includes('id="mt-baseline"') && halfHome.body.includes('assets/app.css was not found'));
ok('the baseline keeps the page readable instead of unstyled',
  /--plum-deep/.test(halfHome.body) && /body \{/.test(halfHome.body));
const halfHealth = await get('/health');
const halfCount = /(\d+) files? (?:are|is) missing/.exec(halfHealth.body);
ok('the deployment check names how many files are missing',
  halfHealth.status === 200 && Boolean(halfCount) && Number(halfCount[1]) >= 2,
  halfHealth.status + ' → ' + (halfCount ? halfCount[1] : 'no count found'));
const halfApi = JSON.parse((await get('/api/health')).body);
ok('the dashboard status reports the missing files',
  halfApi.files.missing >= 2 && /missing/.test(halfApi.summary || ''), JSON.stringify(halfApi.files || {}));
ok('every page still works with the design files gone', (await get('/gallery')).status === 200);

await php.writeFile('/site/assets/app.css', cssBackup);
await php.writeFile('/site/assets/app.js', jsBackup);
const restored = await get('/');
ok('the real stylesheet comes back once the files are restored', !/id="mt-baseline"/.test(restored.body) && /\.awareness-stage/.test(restored.body));

console.log('\n— clean output check —');
for (const route of ['/', '/gallery', '/calendar', '/awareness', '/dashboard', '/does-not-exist']) {
  const response = await get(route);
  const clean = !/(Warning|Notice|Fatal error|Deprecated|Uncaught|THROWN):/.test(response.body);
  ok('no PHP errors on ' + route, clean, clean ? '' : String(response.body).slice(0, 300));
}
const homeAgain = await get('/');
ok('assets are inlined, never linked', !/href="\/assets\/app\.css"/.test(homeAgain.body) && !/src="\/assets\/app\.js"/.test(homeAgain.body));
ok('the dashboard link is not in the public footer', !/href="\/dashboard"/.test(homeAgain.body));

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach((name) => console.log('  · ' + name));
  process.exitCode = 1;
}
