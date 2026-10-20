"""Inspect a GitHub-equivalent export in memory; never create a deployment ZIP.

Usage: python3 tools/tests/source-export.py [commit-or-tree]
A staged candidate can be checked by passing the output of `git write-tree`.
"""
import base64
import hashlib
import io
from pathlib import Path
import re
import subprocess
import sys
import tarfile

root = Path(__file__).resolve().parents[2]
revision = sys.argv[1] if len(sys.argv) > 1 else 'HEAD'
archive = subprocess.check_output(['git', 'archive', '--format=tar', revision], cwd=root)
with tarfile.open(fileobj=io.BytesIO(archive)) as tar:
    members = {m.name: m for m in tar.getmembers() if m.isfile()}
    for name in ['index.php', '.htaccess', 'README.md', 'app/.htaccess',
                 'data/.htaccess', 'uploads/.htaccess', 'scene-check.php',
                 'scene-assets.php', 'app/scene-assets.php', 'app/scene-manifest.php',
                 'views/public/scene-check.php', 'assets/story.js', 'app/club-content.php', 'uploads/club-logo-test.jpg']:
        assert name in members, f'Required runtime file absent: {name}'
    for name in ['data/site.json', 'data/config.php', 'package.json', 'package-lock.json']:
        assert name not in members, f'Live settings or dev-only file exported: {name}'
    assert not any(n.startswith('tools/') for n in members), 'Development source exported'
    assert not any(n.lower().endswith('.zip') for n in members), 'Nested ZIP exported'
    assert not any(re.fullmatch(r'cartier-part-\d{3}', n) or ('/' not in n and n.lower().endswith('.glb')) for n in members), 'Cartier study uploads exported into the club runtime'
    for suffix, size in [('running', 9938593), ('desktop', 3831086), ('mobile', 1894350)]:
        name = f'assets/media/horses-{suffix}.mp4'
        assert members[name].size == size, f'Horse clip absent/changed: {name}'
    for name, member in members.items():
        limit = 10000 if name.endswith('.htaccess') else (
            1000000 if name.lower().endswith(('.php', '.js', '.html', '.htm')) else 10000000)
        assert member.size <= limit, f'Exceeds conservative InfinityFree file limit: {name}'
    manifest = tar.extractfile(members['app/scene-manifest.php']).read().decode()
    entries = re.findall(r"'([a-z-]+)'=>\['path'=>'([^']+)'.*?'bytes'=>(\d+),'sha256'=>'([a-f0-9]+)','chunks'=>\[([^]]+)\]", manifest)
    assert len(entries) == 12
    for key, original, size, digest, chunk_list in entries:
        data = bytearray()
        for filename in re.findall(r"'([^']+)'", chunk_list):
            name = 'app/scene-payloads/' + filename
            chunk = tar.extractfile(members[name]).read().decode()
            encoded = re.search(r"return '([A-Za-z0-9+/=]+)';", chunk).group(1)
            data.extend(base64.b64decode(encoded, validate=True))
        assert len(data) == int(size), f'Truncated exported payload: {key}'
        assert hashlib.sha256(data).hexdigest() == digest, f'Wrong exported hash: {key}'
        assert bytes(data) == tar.extractfile(members[original]).read(), f'Export mismatch: {key}'
    print(f'GitHub-equivalent export verified in memory: {len(members)} files, '
          '12 exact scene payloads, all horse clips, no nested ZIP, no live data/password '
          'overwrite, no development tooling, all files within host size limits.')
