/**
 * Mindful Tattva · local preview server (PHP 8.4 via WebAssembly)
 * ---------------------------------------------------------------
 * For machines that have Node.js but no PHP installed (containers, preview
 * sandboxes, laptops). It boots the real PHP application from index.php inside
 * a WebAssembly runtime, serves static files straight from disk and talks to
 * the same JSON files the production site uses.
 *
 *   npm install      # once
 *   npm run preview  # http://localhost:4173
 *
 * Nothing in this file is required in production — on a normal host the site
 * runs with `php -S 0.0.0.0:4173 index.php` or Apache, using the very same
 * index.php and data folder.
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '0.0.0.0';
const SESSION_FILE = path.join(ROOT, 'data', 'preview-sessions.json');

let phpModule;
try {
  ({ PhpNode: phpModule } = await import('php-wasm/PhpNode'));
} catch (error) {
  console.error('\nphp-wasm is not installed. Run:\n\n  npm install\n\nthen start the preview again.\n');
  process.exit(1);
}

/* ------------------------------------------------------------- virtual FS */
const SKIP_DIRS = new Set(['.git', 'node_modules', '.arena', '.rollback', 'backup-original', 'tools/references', 'data/logs', 'data/sessions', 'data/tmp-uploads']);

function collectSourceFiles(dir, base = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? base + '/' + entry.name : entry.name;
    // Root recordings and generated bundles are never PHP runtime inputs.
    if (!base && /\.(mp4|zip)$/i.test(entry.name)) continue;
    if (SKIP_DIRS.has(entry.name) || SKIP_DIRS.has(rel)) continue;
    if (entry.isDirectory()) out.push(...collectSourceFiles(path.join(dir, entry.name), rel));
    else if (entry.isFile()) out.push(rel);
  }
  return out;
}

const php = new phpModule();
await php.exec('<?php');

async function ensureDir(dir) {
  let current = '';
  for (const segment of dir.split('/').filter(Boolean)) {
    current += '/' + segment;
    try { await php.mkdir(current); } catch (error) { /* exists */ }
  }
}

const VFS = '/site';
await ensureDir(VFS + '/data/logs');
await ensureDir(VFS + '/data/sessions');
await ensureDir(VFS + '/data/backups');
await ensureDir(VFS + '/uploads');

const TEXT_EXT = /\.(php|css|js|mjs|json|svg|txt|md|htaccess|webmanifest)$/i;
const sourceFiles = collectSourceFiles(ROOT);

async function syncFileIntoRuntime(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return;
  const target = VFS + '/' + rel;
  await ensureDir(path.dirname(target));
  if (TEXT_EXT.test(rel) || !/\./.test(path.basename(rel))) {
    await php.writeFile(target, fs.readFileSync(abs, 'utf8'));
  } else {
    await php.writeFile(target, new Uint8Array(fs.readFileSync(abs)));
  }
}

const fileStamps = new Map();
function stampOf(rel) {
  try {
    const stat = fs.statSync(path.join(ROOT, rel));
    return stat.mtimeMs + ':' + stat.size;
  } catch (error) {
    return '';
  }
}

for (const rel of sourceFiles) {
  await syncFileIntoRuntime(rel);
  fileStamps.set(rel, stampOf(rel));
}
console.log(`preview: mirrored ${sourceFiles.length} project files into PHP 8.4 (wasm)`);

/** Pick up edits made while the preview is running. */
async function resyncChangedFiles() {
  const current = collectSourceFiles(ROOT);
  for (const rel of current) {
    const stamp = stampOf(rel);
    if (fileStamps.has(rel) && fileStamps.get(rel) === stamp) continue;
    await syncFileIntoRuntime(rel);
    fileStamps.set(rel, stamp);
    console.log('preview: reloaded ' + rel);
  }
}

/** Copy files the app changed inside the runtime back to the real project. */
const WRITE_BACK = ['data/site.json', 'data/config.php'];

/** The store numbers every save, so a lower number on this side means the copy
 *  on disk is newer (edited while the preview was running, or written by hand).
 *  In that case the runtime copy must never win. */
function revisionOf(text) {
  try {
    const parsed = JSON.parse(text);
    const value = Number(parsed && parsed.revision);
    return Number.isFinite(value) ? value : null;
  } catch (error) {
    return null;
  }
}

async function writeBackToDisk() {
  for (const rel of WRITE_BACK) {
    try {
      const bytes = await php.readFile(VFS + '/' + rel);
      const text = typeof bytes === 'string' ? bytes : Buffer.from(Object.values(bytes)).toString('utf8');
      const abs = path.join(ROOT, rel);
      if (fs.existsSync(abs) && fs.readFileSync(abs, 'utf8') === text) continue;
      if (rel.endsWith('site.json') && fs.existsSync(abs)) {
        const onDisk = revisionOf(fs.readFileSync(abs, 'utf8'));
        const inRuntime = revisionOf(text);
        if (onDisk !== null && inRuntime !== null && inRuntime < onDisk) {
          console.log(`preview: kept data/site.json on disk (revision ${onDisk} is newer than ${inRuntime})`);
          continue;
        }
      }
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, text);
    } catch (error) { /* file not written */ }
  }
  // backups + uploads are append-only, so mirror any new ones
  for (const dir of ['data/backups', 'uploads']) {
    await mirrorBackDirectory(dir);
  }
}

async function mirrorBackDirectory(rel) {
  let entries = [];
  try {
    entries = await php.readdir(VFS + '/' + rel, { withFileTypes: true });
  } catch (error) {
    return;
  }
  for (const entry of entries) {
    if (!entry || entry.name === '.' || entry.name === '..') continue;
    const childRel = rel + '/' + entry.name;
    if (entry.isFolder) {
      await mirrorBackDirectory(childRel);
      continue;
    }
    if (fs.existsSync(path.join(ROOT, childRel))) continue;
    try {
      const bytes = await php.readFile(VFS + '/' + childRel);
      const buffer = typeof bytes === 'string' ? Buffer.from(bytes, 'utf8') : Buffer.from(bytes);
      const abs = path.join(ROOT, childRel);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, buffer);
      console.log('preview: saved ' + childRel + ' to disk');
    } catch (error) { /* unreadable, skip */ }
  }
}

/* ------------------------------------------------------------- sessions */
function readSessions() {
  try { return JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8')); } catch (error) { return {}; }
}
function writeSessions(data) {
  try {
    fs.mkdirSync(path.dirname(SESSION_FILE), { recursive: true });
    fs.writeFileSync(SESSION_FILE, JSON.stringify(data));
  } catch (error) { /* ignore */ }
}

/* -------------------------------------------------------------- PHP run */
const REQUEST_PHP = String.raw`
(function () {
    if (!defined('MT_HEADLESS')) { define('MT_HEADLESS', true); }
    if (!function_exists('mt_preview_counter')) {
        function mt_preview_counter(): int { static $count = 0; return ++$count; }
    }

    $spec = require '/site/.preview-spec.php';
    if (!is_array($spec)) { $spec = []; }

    unset($GLOBALS['MT_DB_CACHE'], $GLOBALS['MT_INPUT_CACHE'], $GLOBALS['MT_CONFIG_CACHE']);
    if (session_status() === PHP_SESSION_ACTIVE) { @session_abort(); }

    $GLOBALS['MT_TEST_HEADERS'] = [];
    $GLOBALS['MT_TEST_STATUS'] = 200;
    $GLOBALS['MT_HTML_SENT'] = false;

    $_SERVER = [
        'REQUEST_METHOD'  => strtoupper($spec['method'] ?? 'GET'),
        'REQUEST_URI'     => $spec['uri'] ?? '/',
        'SCRIPT_NAME'     => '/index.php',
        'HTTP_HOST'       => $spec['host'] ?? 'localhost',
        'REMOTE_ADDR'     => $spec['ip'] ?? '127.0.0.1',
        'HTTP_ACCEPT'     => $spec['accept'] ?? 'text/html',
        'SERVER_SOFTWARE' => 'mindful-tattva-preview',
    ];
    if (!empty($spec['acceptEncoding'])) { $_SERVER['HTTP_ACCEPT_ENCODING'] = $spec['acceptEncoding']; }
    if (!empty($spec['ifNoneMatch'])) { $_SERVER['HTTP_IF_NONE_MATCH'] = $spec['ifNoneMatch']; }
    foreach (($spec['headers'] ?? []) as $name => $value) {
        $_SERVER['HTTP_' . strtoupper(str_replace('-', '_', $name))] = $value;
    }

    $_GET = [];
    $queryPos = strpos((string) ($spec['uri'] ?? ''), '?');
    if ($queryPos !== false) { parse_str(substr((string) $spec['uri'], $queryPos + 1), $_GET); }
    $_POST  = is_array($spec['post'] ?? null) ? $spec['post'] : [];
    $_FILES = $spec['files'] ?? [];
    $GLOBALS['MT_RAW_BODY'] = $spec['raw'] ?? null;

    $_SESSION = is_array($spec['session'] ?? null) ? $spec['session'] : [];
    $GLOBALS['MT_SESSION_ADAPTER'] = $_SESSION;
    $GLOBALS['MT_SESSION_SAVE'] = function (array $session) {
        $GLOBALS['MT_PREVIEW_SESSION'] = $session;
    };

    $level = ob_get_level();
    ob_start();
    try {
        require '/site/index.php';
    } catch (MT_StopSignal $stop) {
        // response finished through mt_stop()
    } catch (Throwable $error) {
        while (ob_get_level() > $level) { ob_end_clean(); }
        return json_encode([
            'status'  => 599,
            'body'    => '<pre>PHP error: ' . htmlspecialchars($error->getMessage()) . "\n"
                       . htmlspecialchars($error->getFile() . ':' . $error->getLine()) . '</pre>',
            'headers' => [],
            'session' => $GLOBALS['MT_PREVIEW_SESSION'] ?? null,
        ]);
    }
    $output = (string) ob_get_clean();

    /* A PDF is not valid UTF-8, so it is handed over base64-encoded and the
       Node side turns it back into bytes before it reaches the browser. */
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
        'session'  => $GLOBALS['MT_PREVIEW_SESSION'] ?? null,
    ]);
})()
`;

let queue = Promise.resolve();
function runPhp(spec) {
  const task = async () => {
    await php.writeFile('/site/.preview-spec.php', '<?php return json_decode(base64_decode("' + Buffer.from(JSON.stringify(spec), 'utf8').toString('base64') + '"), true);');
    const raw = await php.x([REQUEST_PHP]);
    try {
      const parsed = JSON.parse(String(raw));
      if (parsed && parsed.encoding === 'base64') {
        parsed.buffer = Buffer.from(String(parsed.body), 'base64');
      }
      return parsed;
    } catch (error) {
      return { status: 500, body: '<pre>Preview runtime error: ' + String(raw).slice(0, 400) + '</pre>', headers: [] };
    }
  };
  const result = queue.then(task, task);
  queue = result.catch(() => {});
  return result;
}

/* ------------------------------------------------------------ http layer */
const MIME = {
  '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2', '.mjs': 'text/javascript; charset=utf-8', '.md': 'text/plain; charset=utf-8',
  '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm',
};

function sendFile(res, filePath, req) {
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const etag = '"' + stat.size.toString(16) + '-' + stat.mtimeMs.toString(16) + '"';
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, { ETag: etag });
    return res.end();
  }

  /* A video is not downloaded in one piece: the browser asks for a slice at a
     time, and Safari refuses to play at all unless the answer is a real 206
     with a Content-Range. So answer the range that was asked for. */
  let start = 0;
  let end = stat.size - 1;
  let partial = false;
  const asked = /^bytes=(\d*)-(\d*)$/.exec(String(req.headers.range || '').trim());
  if (asked && !(asked[1] === '' && asked[2] === '')) {
    const from = asked[1];
    const to = asked[2];
    start = from === '' ? Math.max(0, stat.size - Number(to)) : Number(from);
    end = from === '' || to === '' ? stat.size - 1 : Math.min(Number(to), stat.size - 1);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= stat.size) {
      res.writeHead(416, { 'Content-Range': 'bytes */' + stat.size, 'Accept-Ranges': 'bytes' });
      return res.end();
    }
    partial = true;
  }

  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Length': end - start + 1,
    'Accept-Ranges': 'bytes',
    ETag: etag,
    'Cache-Control': 'no-cache',
  };
  if (partial) headers['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size;
  res.writeHead(partial ? 206 : 200, headers);
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(filePath, { start, end }).pipe(res);
}

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', () => resolve(Buffer.alloc(0)));
  });
}

/** Very small multipart parser — enough for the dashboard's photo uploads. */
async function parseMultipart(buffer, contentType) {
  const match = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType || '');
  if (!match) return { fields: {}, files: {} };
  const boundary = '--' + (match[1] || match[2]).trim();
  const parts = buffer.toString('binary').split(boundary).slice(1, -1);
  const fields = {};
  const files = {};

  for (const part of parts) {
    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd < 0) continue;
    const rawHeaders = part.slice(0, headerEnd);
    const content = part.slice(headerEnd + 4).replace(/\r\n$/, '');
    const nameMatch = /name="([^"]+)"/i.exec(rawHeaders);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    const fileMatch = /filename="([^"]*)"/i.exec(rawHeaders);

    if (fileMatch && fileMatch[1]) {
      const typeMatch = /Content-Type:\s*([^\r\n]+)/i.exec(rawHeaders);
      // PHP's upload handling works inside its own filesystem, so the staged
      // file has to live there too (this is what a real SAPI provides).
      const tempName = 'preview-upload-' + crypto.randomBytes(6).toString('hex') + (path.extname(fileMatch[1] || '') || '.bin');
      const tempPath = VFS + '/data/tmp-uploads/' + tempName;
      await ensureDir(VFS + '/data/tmp-uploads');
      await php.writeFile(tempPath, new Uint8Array(Buffer.from(content, 'binary')));
      files[name] = { name: fileMatch[1], type: (typeMatch ? typeMatch[1] : 'application/octet-stream').trim(), tmp_name: tempPath, error: 0, size: Buffer.from(content, 'binary').length };
    } else {
      fields[name] = Buffer.from(content, 'binary').toString('utf8');
    }
  }
  return { fields, files };
}

const server = http.createServer(async (req, res) => {
  await resyncChangedFiles().catch(() => {});
  const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  const pathname = decodeURIComponent(url.pathname);

  // static assets straight from disk (the PHP runtime never sees them)
  if (/^\/(assets|uploads)\//.test(pathname) || pathname === '/favicon.ico') {
    const candidate = path.join(ROOT, pathname);
    if (candidate.startsWith(ROOT) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return sendFile(res, candidate, req);
    }
  }

  const raw = await readBody(req);
  const cookies = Object.fromEntries((req.headers.cookie || '').split(';').filter(Boolean).map((pair) => {
    const index = pair.indexOf('=');
    return [pair.slice(0, index).trim(), decodeURIComponent(pair.slice(index + 1).trim())];
  }));

  const sessions = readSessions();
  let sessionId = cookies.mt_admin || '';
  let newCookie = false;
  if (!sessionId) {
    sessionId = crypto.randomBytes(18).toString('hex');
    newCookie = true;
  }
  const sessionData = sessions[sessionId] || {};

  let post = {};
  const files = {};
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('application/json') && raw.length) {
    try { post = JSON.parse(raw.toString('utf8')); } catch (error) { post = {}; }
  } else if (contentType.includes('multipart/form-data')) {
    const parsed = await parseMultipart(raw, contentType);
    Object.assign(post, parsed.fields);
    Object.assign(files, parsed.files);
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    Object.entries(Object.fromEntries(new URLSearchParams(raw.toString('utf8')))).forEach(([key, value]) => { post[key] = value; });
  }

  const spec = {
    method: req.method,
    uri: req.url,
    host: req.headers.host || 'localhost',
    ip: req.socket.remoteAddress || '127.0.0.1',
    accept: req.headers.accept || 'text/html',
    acceptEncoding: req.headers['accept-encoding'] || '',
    ifNoneMatch: req.headers['if-none-match'] || '',
    headers: {
      'X-CSRF-Token': req.headers['x-csrf-token'] || '',
      'Content-Type': contentType,
      Cookie: req.headers.cookie || '',
    },
    post,
    files,
    raw: raw.length ? raw.toString('utf8') : null,
    session: sessionData,
  };

  let result;
  try {
    result = await runPhp(spec);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('preview runtime crashed: ' + (error && error.message));
  }

  const headers = { 'X-Powered-By': 'Mindful Tattva preview (PHP ' + '8.4 wasm)' };
  for (const [name, value] of result.headers || []) {
    headers[name] = value;
  }
  if (!headers['Content-Type'] && !headers['content-type']) {
    headers['Content-Type'] = 'text/html; charset=utf-8';
  }

  if (result.session && Object.keys(result.session).length) {
    sessions[sessionId] = result.session;
  } else if (sessions[sessionId]) {
    sessions[sessionId] = {};
  }
  writeSessions(sessions);

  headers['Set-Cookie'] = 'mt_admin=' + sessionId + '; Path=/; HttpOnly; SameSite=Lax';
  if (result.buffer) {
    headers['Content-Length'] = String(result.buffer.length);
  }
  res.writeHead(result.status || 200, headers);
  res.end(result.buffer || result.body || '');

  writeBackToDisk().catch(() => {});
});

await writeBackToDisk().catch(() => {});

server.listen(PORT, HOST, () => {
  console.log(`\n  Mindful Tattva is live at  http://localhost:${PORT}`);
  console.log(`  Club dashboard:            http://localhost:${PORT}/dashboard\n`);
});

process.on('SIGINT', async () => {
  console.log('\npreview: saving changes…');
  await writeBackToDisk().catch(() => {});
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await writeBackToDisk().catch(() => {});
  process.exit(0);
});
