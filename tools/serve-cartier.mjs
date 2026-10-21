#!/usr/bin/env node
/**
 * Preview server for the Mindfultattva (reconstructed) build in /cartier.
 *
 * Static only — no PHP, no framework, no dependencies:
 *   node tools/serve-cartier.mjs [port] [--dir=cartier]
 *
 * It serves the folder as the web root, sends the right content types for the
 * 3D/asset formats the experience loads (wasm, exr, glb, ktx2, webp…) and falls
 * back to index.html so client-side routes such as /santos-and-tortue work when
 * opened directly or refreshed.
 */
import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');

const args = process.argv.slice(2);
const dirArg = args.find((a) => a.startsWith('--dir='));
const rootDir = path.resolve(repo, dirArg ? dirArg.slice(6) : 'cartier');
const portArg = args.find((a) => /^\d+$/.test(a));
const PORT = Number(portArg || process.env.PORT || 4180);
const HOST = process.env.HOST || '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ktx2': 'image/ktx2',
  '.exr': 'image/x-exr',
  '.hdr': 'image/vnd.radiance',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.3dl': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

const exists = async (p) => {
  try {
    const st = await fsp.stat(p);
    return st;
  } catch {
    return null;
  }
};

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const clean = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const full = path.join(root, clean);
  return full.startsWith(root) ? full : root;
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Cache-Control': 'no-cache', ...headers });
  res.end(body);
}

async function serveFile(req, res, filePath, stat) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';
  const size = stat.size;
  const headers = {
    'Content-Type': type,
    'Accept-Ranges': 'bytes',
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
    'Cross-Origin-Resource-Policy': 'cross-origin',
  };

  // Byte-range support (video scrubbing, large model streaming).
  const range = req.headers.range;
  if (range && /^bytes=/.test(range)) {
    const [startRaw, endRaw] = range.replace(/bytes=/, '').split('-');
    let start = parseInt(startRaw, 10);
    let end = endRaw ? parseInt(endRaw, 10) : size - 1;
    if (Number.isNaN(start)) start = 0;
    if (Number.isNaN(end) || end >= size) end = size - 1;
    if (start > end) {
      res.writeHead(416, { 'Content-Range': `bytes */${size}` });
      return res.end();
    }
    headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
    headers['Content-Length'] = end - start + 1;
    res.writeHead(206, headers);
    if (req.method === 'HEAD') return res.end();
    return createReadStream(filePath, { start, end }).pipe(res);
  }

  headers['Content-Length'] = size;
  res.writeHead(200, headers);
  if (req.method === 'HEAD') return res.end();
  createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method Not Allowed');
  }

  let urlPath = req.url || '/';
  if (urlPath === '/') urlPath = '/index.html';

  const target = safeJoin(rootDir, urlPath);
  const stat = await exists(target);

  if (stat && stat.isFile()) {
    return serveFile(req, res, target, stat);
  }

  // Directory: try its index.html.
  if (stat && stat.isDirectory()) {
    const idx = path.join(target, 'index.html');
    const idxStat = await exists(idx);
    if (idxStat && idxStat.isFile()) return serveFile(req, res, idx, idxStat);
  }

  // A missing asset should stay a 404 so broken paths are visible in the console.
  const looksLikeFile = /\.[a-z0-9]{2,6}$/i.test(urlPath.split('?')[0]);
  if (looksLikeFile) {
    return send(res, 404, `Not found: ${urlPath}`, { 'Content-Type': 'text/plain; charset=utf-8' });
  }

  // Otherwise: client-side route → index.html
  const shell = path.join(rootDir, 'index.html');
  const shellStat = await exists(shell);
  if (!shellStat) return send(res, 500, 'index.html missing');
  return serveFile(req, res, shell, shellStat);
});

server.listen(PORT, HOST, () => {
  console.log(`Mindfultattva preview → http://${HOST}:${PORT}  (root: ${rootDir})`);
});
