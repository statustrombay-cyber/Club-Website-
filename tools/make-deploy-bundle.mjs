/**
 * Mindful Tattva · deploy bundle builder
 * --------------------------------------
 * Builds one flat ZIP you can upload straight into the site's folder on the
 * server (htdocs on InfinityFree and friends) and unpack there.
 *
 *   node tools/make-deploy-bundle.mjs                 → deploy-bundle.zip
 *   node tools/make-deploy-bundle.mjs uploads/preview-deploy-bundle.zip
 *
 * What it packs: the code and the design files (index.php, .htaccess, app/,
 * views/, assets/, uploads/.htaccess).
 * What it never packs: data/ and uploads/ — those hold the club's own content,
 * password and photos *on the server*, so a deploy can never wipe them.
 *
 * Folder permissions 755, file permissions 644, no build step, no compression
 * surprises: this is a plain ZIP any hosting file manager can open.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const UPDATE = process.argv.includes('--update');
const OUT = path.resolve(ROOT, process.argv.slice(2).find(a => !a.startsWith('--')) || (UPDATE ? 'deploy-bundle-update.zip' : 'deploy-bundle.zip'));
const UNCHANGED_MEDIA = new Set(['assets/media/horses-running.mp4', 'assets/media/horses-desktop.mp4', 'assets/media/horses-mobile.mp4']);

const DIRS = ['app', 'views', 'assets'];
const FILES = ['index.php', '.htaccess', 'uploads/.htaccess'];
const SKIP_DIRS = new Set(['.git', 'node_modules', '.arena', 'data', 'tools', 'data/logs', 'data/sessions', 'data/backups']);
const SKIP_FILES = /^(\.DS_Store|Thumbs\.db)$|\.(swp|zip)$/i;

/* ------------------------------------------------------------------ collect */
function walk(dir, base = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const rel = base ? base + '/' + entry.name : entry.name;
    if (SKIP_DIRS.has(entry.name) || SKIP_FILES.test(entry.name) || (UPDATE && UNCHANGED_MEDIA.has(rel))) continue;
    if (entry.isDirectory()) {
      out.push({ rel, abs: path.join(dir, entry.name), dir: true });
      out.push(...walk(path.join(dir, entry.name), rel));
    } else if (entry.isFile()) {
      out.push({ rel, abs: path.join(dir, entry.name), dir: false });
    }
  }
  return out;
}

const entries = [];
for (const dir of DIRS) {
  if (!fs.existsSync(path.join(ROOT, dir))) continue;
  entries.push({ rel: dir, abs: path.join(ROOT, dir), dir: true });
  entries.push(...walk(path.join(ROOT, dir), dir));
}
for (const file of FILES) {
  const abs = path.join(ROOT, file);
  if (fs.existsSync(abs)) entries.push({ rel: file, abs, dir: false });
  const parent = path.dirname(file);
  if (parent !== '.' && !entries.some((e) => e.rel === parent)) {
    entries.push({ rel: parent, abs: path.join(ROOT, parent), dir: true });
  }
}

if (UPDATE) {
  entries.push({rel: 'UPDATE-INSTRUCTIONS.txt', dir: false, data: Buffer.from(
    'UPDATE PACKAGE — EXISTING CLUB WEBSITE ONLY\n\n' +
    'Extract over the existing site; do not delete its folders first.\n' +
    'This package reuses the three unchanged horse MP4s already installed in assets/media/.\n' +
    'It does not remove or replace your data/, uploads/ or existing media.\n' +
    'For a fresh install use Club-Website-deploy.zip, which includes all required media.\n'
  )});
}

/* --------------------------------------------------------------------- crc */
const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  return table;
})();

function crc32(buffer) {
  let crc = -1;
  for (let i = 0; i < buffer.length; i++) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buffer[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

/* ---------------------------------------------------------------------- zip */
function buildZip(items) {
  const chunks = [];
  const central = [];
  let offset = 0;

  const push = (buffer) => { chunks.push(buffer); offset += buffer.length; };

  for (const item of items) {
    const name = Buffer.from(item.dir ? item.rel + '/' : item.rel, 'utf8');
    const raw = item.dir ? Buffer.alloc(0) : (item.data || fs.readFileSync(item.abs));
    const deflated = item.dir ? Buffer.alloc(0) : zlib.deflateRawSync(raw, { level: 9 });
    const useDeflate = !item.dir && deflated.length < raw.length;
    const body = useDeflate ? deflated : raw;
    const method = useDeflate ? 8 : 0;
    const crc = crc32(raw);
    const mode = item.dir ? 0o40755 : 0o100644;

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);          // version needed to extract
    local.writeUInt16LE(0x0800, 6);      // UTF-8 file names
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(0, 10);          // mod time
    local.writeUInt16LE(0x21, 12);       // mod date (1980-01-01)
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);

    const localOffset = offset;
    push(local);
    push(name);
    push(body);

    const record = Buffer.alloc(46);
    record.writeUInt32LE(0x02014b50, 0);
    record.writeUInt16LE(0x031e, 4);     // made by: UNIX, version 3.0
    record.writeUInt16LE(20, 6);         // version needed
    record.writeUInt16LE(0x0800, 8);
    record.writeUInt16LE(method, 10);
    record.writeUInt16LE(0, 12);
    record.writeUInt16LE(0x21, 14);
    record.writeUInt32LE(crc, 16);
    record.writeUInt32LE(body.length, 20);
    record.writeUInt32LE(raw.length, 24);
    record.writeUInt16LE(name.length, 28);
    record.writeUInt16LE(0, 30);         // extra
    record.writeUInt16LE(0, 32);         // comment
    record.writeUInt16LE(0, 34);         // disk
    record.writeUInt16LE(0, 36);         // internal attributes
    record.writeUInt32LE((mode << 16) >>> 0, 38); // external attributes (permissions)
    record.writeUInt32LE(localOffset, 42);

    central.push(record, name);
  }

  const centralSize = central.reduce((total, buffer) => total + buffer.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(items.length, 8);
  end.writeUInt16LE(items.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  return Buffer.concat([...chunks, ...central, end]);
}

/* --------------------------------------------------------------------- main */
const zip = buildZip(entries);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, zip);

const bytes = entries.reduce((total, item) => total + (item.dir ? 0 : (item.data ? item.data.length : fs.statSync(item.abs).size)), 0);
console.log('packed    ' + entries.filter((e) => !e.dir).length + ' files (' + (bytes / 1024 / 1024).toFixed(2) + ' MB raw)');
console.log('bundle    ' + path.relative(ROOT, OUT) + ' (' + (zip.length / 1024 / 1024).toFixed(2) + ' MB)');
console.log(UPDATE ? 'UPDATE ONLY: extract over the installed site without deleting folders. Existing horse MP4s are required.' : 'Full install: upload into the site folder (htdocs/), extract, then open /health.');
