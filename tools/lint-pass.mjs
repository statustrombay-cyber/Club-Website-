/* tools/lint-pass.mjs — put one PHP file through the same runtime the suite uses,
   so a compile error is caught with its message instead of a blank page. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PhpNode } from 'php-wasm/PhpNode';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const TARGET = process.argv[2] || 'app/passes.php';
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
for (const dir of ['/site/data/logs', '/site/data/sessions', '/site/data/backups', '/site/uploads']) await ensureDir(dir);
for (const [rel, abs] of collect(ROOT)) {
  const target = '/site/' + rel;
  await ensureDir(target.slice(0, target.lastIndexOf('/')));
  if (/\.(png|jpe?g|webp|gif|ico|pdf|mp4|m4v|mov|webm|mp3|glb|woff2)$/i.test(rel)) await php.writeFile(target, new Uint8Array(fs.readFileSync(abs)));
  else await php.writeFile(target, fs.readFileSync(abs, 'utf8'));
}

/* One statement, so the whole thing runs: a parse error is catchable, and a
   file that never gets to its own end is reported as the fatal it is.
   A view is loaded the way the front controller loads it — the club's own
   bootstrap first, then the file — so a view that needs the club's helpers has
   them, exactly as it does in the browser. */
const needsBootstrap = /^views\//.test(TARGET);
const prelude = needsBootstrap
  ? 'require "/site/app/bootstrap.php"; $db = mt_db(); $site = $db["site"]; $route = "home"; $content = "";'
    + ' $event = $db["events"][0] ?? []; $registration = $db["registrations"][0] ?? []; $person = [];'
    + ' ob_start(); require "/site/' + TARGET + '"; ob_end_clean();'
  : 'require "/site/' + TARGET + '";';
await php.exec('(function () { try { ' + prelude + ' file_put_contents("/site/.lint.txt", "OK: ' + TARGET + ' loads clean"); } catch (Throwable $e) { file_put_contents("/site/.lint.txt", "FAIL: " . get_class($e) . ": " . $e->getMessage() . " @ line " . $e->getLine()); } })();');
let verdict = 'FAIL: nothing was written — a fatal at compile time (a redeclaration, or a variable both a parameter and a closure capture)';
try { verdict = (await php.readFile('/site/.lint.txt', { encoding: 'utf8' })).slice(0, 500); } catch (error) { /* keep the default */ }
console.log(verdict);
process.exit(verdict.startsWith('OK') ? 0 : 1);
