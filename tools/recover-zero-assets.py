#!/usr/bin/env python3
"""Termux/Python 3: download public narrative assets, WITHOUT running site JS.
No pip, browser, login, cookies, tokens, or Monolith required.
Run: python recover-zero-assets.py
This follows literal HTML/CSS/JS asset references; it is not a full browser capture.
"""
import argparse
from collections import deque
import gzip
import hashlib
import html
import ipaddress
import json
from pathlib import Path
import re
import string
import time
import urllib.error
import urllib.parse
import urllib.request
import zipfile

SOURCE = 'https://why.zero.university/'
MAX_FILE = 25 * 1024 * 1024
MAX_TOTAL = 100 * 1024 * 1024
EXTENSIONS = re.compile(r'\.(?:m?js|css|json|gltf|glb|drc|bin|wasm|ktx2?|basis|hdr|exr|apng|png|jpe?g|webp|avif|gif|svg|woff2?|ttf|otf|mp3|wav|ogg|m4a|aac|opus|flac|mp4|webm)$', re.I)
STRINGS = re.compile(r'''"((?:[^"\\]|\\.){1,2000})"|'((?:[^'\\]|\\.){1,2000})'|`([^`\r\n]{1,2000})`''')


def public_url(url):
    p = urllib.parse.urlsplit(url)
    if p.scheme not in ('http', 'https') or not p.hostname or p.username or p.password:
        return False
    host = p.hostname.lower()
    if host == 'localhost' or host.endswith(('.localhost', '.local', '.internal')):
        return False
    try:
        return ipaddress.ip_address(host).is_global
    except ValueError:
        return True


def references(text, base):
    """Static references only; do not evaluate downloaded JavaScript."""
    candidates = []
    for match in STRINGS.finditer(text):
        raw = next(v for v in match.groups() if v is not None)
        raw = html.unescape(raw).replace('\\/', '/').replace('\\u002f', '/').replace('\\u002F', '/')
        candidates.append(raw)
    candidates.extend(re.findall(r'url\(\s*[\'\"]?([^\s)\'\"]+)', text, re.I))
    # Unquoted HTML attributes, including module scripts.
    candidates.extend(re.findall(r'(?:src|href)\s*=\s*([^\s\'\"<>`]+)', text, re.I))
    found = set()
    for raw in candidates:
        if raw.startswith(('data:', 'blob:', '#')) or '${' in raw or len(raw) > 2000:
            continue
        try:
            asset_path = urllib.parse.urlsplit(raw).path
        except ValueError:
            continue
        if not EXTENSIONS.search(asset_path):
            continue
        # Vite's dependency tables use root-relative "assets/..." entries.
        parent = urllib.parse.urljoin(base, '/') if raw.startswith('assets/') else base
        url = urllib.parse.urldefrag(urllib.parse.urljoin(parent, raw))[0]
        if public_url(url):
            found.add(url)
    return sorted(found, key=lambda u: (not urllib.parse.urlsplit(u).path.endswith(('.js', '.mjs', '.css', '.json', '.gltf')), u))


def download(url):
    request = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (compatible; PublicAssetRecovery/1.0)',
        'Accept-Encoding': 'identity',
    })
    with urllib.request.urlopen(request, timeout=35) as response:
        if not public_url(response.url):
            raise ValueError('Non-public redirect refused')
        body = response.read(MAX_FILE + 1)
        if response.headers.get('Content-Encoding', '').lower() == 'gzip':
            body = gzip.decompress(body)
        if len(body) > MAX_FILE:
            raise ValueError('Response exceeds 25 MiB limit')
        return body, response.headers.get('Content-Type', ''), response.url


def capture(output, fetch=download, source=SOURCE):
    output = Path(output)
    output.mkdir(parents=True, exist_ok=True)
    (output / 'files').mkdir(exist_ok=True)
    pending = deque([source])
    seen, saved, failed = set(), [], []
    total = 0
    while pending and len(seen) < 1500:
        url = pending.popleft()
        if url in seen:
            continue
        seen.add(url)
        try:
            body, mime, final_url = fetch(url)
            if len(body) > MAX_FILE or total + len(body) > MAX_TOTAL:
                raise ValueError('Download size limit reached')
            is_main = url == source
            text_like = is_main or urllib.parse.urlsplit(final_url).path.lower().endswith(('.js', '.mjs', '.css', '.json', '.gltf'))
            text = body.decode('utf-8', errors='replace') if text_like else ''
            if is_main:
                if urllib.parse.urlsplit(final_url).hostname != urllib.parse.urlsplit(source).hostname:
                    raise ValueError('The narrative redirected to a different website: ' + final_url)
                if re.search(r'<title>\s*Zero\s*[—-]\s*Learn', text, re.I) or re.search(r'content=[\'\"]Framer', text, re.I):
                    raise ValueError('This is the Framer marketing homepage, not the hand/glass narrative')
                if not re.search(r'<script\b[^>]*\bsrc\s*=', text, re.I):
                    raise ValueError('No external scene scripts found; this may be a stripped HTML save or access challenge')
            elif body.lstrip().lower().startswith((b'<!doctype html', b'<html')):
                raise ValueError('Asset URL returned HTML rather than an asset')
            digest = hashlib.sha256(body).hexdigest()
            basename = re.sub(r'[^a-zA-Z0-9._-]', '_', Path(urllib.parse.urlsplit(final_url).path).name)[:100] or 'index.html'
            filename = 'files/' + digest[:16] + '-' + basename
            (output / filename).write_bytes(body)
            total += len(body)
            saved.append({'url': url, 'final_url': final_url, 'file': filename, 'bytes': len(body), 'sha256': digest, 'content_type': mime})
            print('Saved', len(body), basename, flush=True)
            if text_like:
                pending.extend(references(text, final_url))
        except (urllib.error.URLError, OSError, ValueError) as error:
            failed.append({'url': url, 'error': str(error)})
            print('Not saved:', url, str(error), flush=True)
            if url == source:
                raise RuntimeError('Narrative page unavailable. No usable capture was made.') from error
    report = {
        'source': source, 'captured_at_unix': int(time.time()), 'bytes': total,
        'method': 'Static public resource discovery; downloaded JS was NOT executed.',
        'limitations': 'Computed URLs, interaction-only requests, worker runtime requests and shaders assembled at runtime can be missing. This is not a browser full-scroll capture.',
        'queue_remaining': len(pending), 'resources': saved, 'failed': failed,
    }
    (output / 'manifest.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    (output / 'READ-ME.txt').write_text(
        'Public asset recovery from ' + source + '\n'
        'Not an offline replay or guaranteed complete scene. See manifest.json for URLs and failures.\n'
        'No browser profile, request cookies, or authentication headers are exported.\n'
        'Review resource URLs/bodies before sharing: they can contain identifiers or public API keys.\n'
        'Public availability is not an automatic reuse license.\n', encoding='utf-8')
    return report


def package(folder, split_mb=20):
    folder = Path(folder)
    archive = folder.with_suffix('.zip')
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
        for p in sorted(folder.rglob('*')):
            if p.is_file():
                z.write(p, p.relative_to(folder))
    print('\nZIP:', archive, archive.stat().st_size, 'bytes')
    chunk_size = max(1, int(split_mb * 1024 * 1024))
    if archive.stat().st_size > chunk_size:
        with archive.open('rb') as src:
            for a in string.ascii_lowercase:
                for b in string.ascii_lowercase:
                    chunk = src.read(chunk_size)
                    if not chunk:
                        return archive
                    p = Path(str(archive) + '.part-' + a + b)
                    p.write_bytes(chunk)
                    print('UPLOAD PART:', p)
    else:
        print('Upload this ZIP directly; splitting is unnecessary.')
    return archive


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', default='zero-narrative-' + time.strftime('%Y%m%d-%H%M%S'))
    args = parser.parse_args()
    output = Path(args.output).resolve()
    repo = Path(__file__).resolve().parent.parent
    if (repo / '.git').exists() and (output == repo or repo in output.parents):
        parser.error('Choose --output outside the website repository')
    if output.exists():
        parser.error('Output already exists; choose a fresh folder')
    try:
        report = capture(output)
    except RuntimeError as error:
        parser.exit(1, str(error) + '\nCheck the network and keep the URL exactly https://why.zero.university/\n')
    package(output)
    print('Recovered', len(report['resources']), 'resources;', len(report['failed']), 'unresolved candidates.')
    print('This is static extraction, not proof that all runtime assets are present.')


if __name__ == '__main__':
    main()
