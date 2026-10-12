const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 4173);
const HOST = '0.0.0.0';
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, 'data', 'site.json');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SESSION_TTL = 24 * 60 * 60 * 1000;
const sessions = new Map();
const clients = new Set();

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

async function readDb() {
  return JSON.parse(await fsp.readFile(DATA_FILE, 'utf8'));
}

async function writeDb(db) {
  await fsp.mkdir(path.dirname(DATA_FILE), { recursive: true });
  const temp = `${DATA_FILE}.tmp`;
  await fsp.writeFile(temp, JSON.stringify(db, null, 2));
  await fsp.rename(temp, DATA_FILE);
  broadcast(db);
}

function id(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;
}

function json(res, status, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    ...extraHeaders
  });
  res.end(body);
}

function cookies(req) {
  return Object.fromEntries((req.headers.cookie || '').split(';').filter(Boolean).map(pair => {
    const index = pair.indexOf('=');
    return [pair.slice(0, index).trim(), decodeURIComponent(pair.slice(index + 1).trim())];
  }));
}

function sessionFor(req) {
  const token = cookies(req).mt_admin;
  if (!token) return false;
  const created = sessions.get(token);
  if (!created || Date.now() - created > SESSION_TTL) {
    sessions.delete(token);
    return false;
  }
  return true;
}

function requireAuth(req, res) {
  // Password protection is intentionally disabled for the setup phase.
  return true;
}

function methodNotAllowed(res) {
  json(res, 405, { error: 'Method not allowed' });
}

function publicDb(db) {
  const { submissions, ...publicData } = db;
  return publicData;
}

function broadcast(db) {
  const message = `event: site-update\ndata: ${JSON.stringify(publicDb(db))}\n\n`;
  for (const client of clients) {
    try { client.write(message); } catch (_) { clients.delete(client); }
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > 32 * 1024 * 1024) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      data += chunk;
    });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (_) { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function getCollection(db, collection) {
  if (!['history', 'team', 'events', 'gallery'].includes(collection)) return null;
  return db[collection];
}

async function handleApi(req, res, pathname) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  if (pathname === '/api/session' && req.method === 'GET') {
    return json(res, 200, { authenticated: true, passwordRequired: false });
  }

  if (pathname === '/api/logout' && req.method === 'POST') {
    const token = cookies(req).mt_admin;
    if (token) sessions.delete(token);
    return json(res, 200, { ok: true }, { 'Set-Cookie': 'mt_admin=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0' });
  }

  if (pathname === '/api/stream' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(': connected\n\n');
    clients.add(res);
    const heartbeat = setInterval(() => {
      try { res.write(': heartbeat\n\n'); } catch (_) { clearInterval(heartbeat); clients.delete(res); }
    }, 25000);
    req.on('close', () => { clearInterval(heartbeat); clients.delete(res); });
    return;
  }

  let db;
  try { db = await readDb(); } catch (error) { return json(res, 500, { error: error.message }); }
  if (!Array.isArray(db.submissions)) db.submissions = [];

  const submissionMatch = pathname.match(/^\/api\/submissions(?:\/([^/]+))?$/);
  if (submissionMatch) {
    const [, submissionId] = submissionMatch;
    if (req.method === 'GET') {
      if (!requireAuth(req, res)) return;
      return json(res, 200, db.submissions);
    }
    if (req.method === 'POST' && !submissionId) {
      try {
        const body = await readBody(req);
        const type = body.type === 'club-registration' ? 'club-registration' : 'membership';
        const item = {
          id: id('submission'),
          type,
          name: String(body.name || '').slice(0, 120),
          email: String(body.email || '').slice(0, 160),
          phone: String(body.phone || '').slice(0, 40),
          course: String(body.course || '').slice(0, 160),
          year: String(body.year || '').slice(0, 60),
          interests: String(body.interests || '').slice(0, 500),
          message: String(body.message || '').slice(0, 1000),
          event: String(body.event || '').slice(0, 160),
          submittedAt: new Date().toISOString()
        };
        if (!item.name || !item.email || !item.phone) return json(res, 400, { error: 'Name, email and phone are required' });
        db.submissions.unshift(item);
        await writeDb(db);
        return json(res, 201, { ok: true, id: item.id });
      } catch (error) { return json(res, 400, { error: error.message }); }
    }
    if (req.method === 'DELETE' && submissionId) {
      if (!requireAuth(req, res)) return;
      const index = db.submissions.findIndex(item => item.id === submissionId);
      if (index < 0) return json(res, 404, { error: 'Submission not found' });
      db.submissions.splice(index, 1);
      await writeDb(db);
      return json(res, 200, { ok: true });
    }
    return methodNotAllowed(res);
  }

  if (pathname === '/api/site' && req.method === 'GET') return json(res, 200, publicDb(db));
  if (pathname === '/api/site' && req.method === 'PUT') {
    if (!requireAuth(req, res)) return;
    try {
      const body = await readBody(req);
      db.site = { ...db.site, ...body };
      await writeDb(db);
      return json(res, 200, publicDb(db));
    } catch (error) { return json(res, 400, { error: error.message }); }
  }

  const match = pathname.match(/^\/api\/(history|team|events|gallery)(?:\/([^/]+))?$/);
  if (!match) return json(res, 404, { error: 'API route not found' });
  const [, collectionName, itemId] = match;
  const collection = getCollection(db, collectionName);
  if (!collection) return json(res, 404, { error: 'Collection not found' });
  if (req.method !== 'GET' && !requireAuth(req, res)) return;

  try {
    if (req.method === 'GET') return json(res, 200, collection);
    if (req.method === 'POST' && !itemId) {
      const body = await readBody(req);
      const item = { ...body, id: body.id || id(collectionName.slice(0, -1)) };
      collection.push(item);
      await writeDb(db);
      return json(res, 201, item);
    }
    if ((req.method === 'PUT' || req.method === 'PATCH') && itemId) {
      const index = collection.findIndex(item => item.id === itemId);
      if (index < 0) return json(res, 404, { error: 'Item not found' });
      const body = await readBody(req);
      collection[index] = { ...collection[index], ...body, id: itemId };
      await writeDb(db);
      return json(res, 200, collection[index]);
    }
    if (req.method === 'DELETE' && itemId) {
      const index = collection.findIndex(item => item.id === itemId);
      if (index < 0) return json(res, 404, { error: 'Item not found' });
      collection.splice(index, 1);
      await writeDb(db);
      return json(res, 200, { ok: true });
    }
    return methodNotAllowed(res);
  } catch (error) {
    return json(res, 400, { error: error.message });
  }
}

async function serveStatic(req, res, pathname) {
  let relative = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  if (relative === 'admin') relative = 'admin.html';
  const filePath = path.resolve(PUBLIC_DIR, relative);
  if (!filePath.startsWith(PUBLIC_DIR)) return json(res, 403, { error: 'Forbidden' });
  try {
    const stat = await fsp.stat(filePath);
    if (!stat.isFile()) throw new Error('Not a file');
    const type = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    fs.createReadStream(filePath).pipe(res);
  } catch (_) {
    json(res, 404, { error: 'Not found' });
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) return handleApi(req, res, url.pathname);
  return serveStatic(req, res, url.pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`Mindful Tattva is live at http://${HOST}:${PORT}`);
});
