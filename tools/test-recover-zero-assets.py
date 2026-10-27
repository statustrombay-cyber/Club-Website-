"""Offline fixtures; never requests the original website or executes its code."""
import contextlib
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
import zipfile

spec = importlib.util.spec_from_file_location('recovery', Path(__file__).with_name('recover-zero-assets.py'))
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)


class RecoveryTests(unittest.TestCase):
    def test_literal_module_vite_css_gltf_audio_and_failure_discovery(self):
        source = r.SOURCE
        fixtures = {
            source: b'<script type="module" src="/assets/index.js"></script><link href="/assets/main.css">',
            source + 'assets/index.js': b'import "./hand.js";const deps=["assets/glass.js"];new URL("./hand.glb",import.meta.url);const noise="http://[";const sound="/audio/crash.mp3";throw Error("DO NOT EXECUTE")',
            source + 'assets/hand.js': b'const texture="/textures/hand.ktx2";const absent="/missing.png";const remote="https://127.0.0.1/private.png";',
            source + 'assets/glass.js': b'const audio="/audio/after.ogg";',
            source + 'assets/main.css': b'@font-face{src:url(./font.woff2)}',
            source + 'assets/hand.glb': b'glTFfixture',
            source + 'assets/font.woff2': b'wOF2fixture',
            source + 'textures/hand.ktx2': b'ktx fixture',
            source + 'audio/crash.mp3': b'ID3fixture',
            source + 'audio/after.ogg': b'OggSfixture',
        }
        requested = []

        def fetch(url):
            requested.append(url)
            if url not in fixtures:
                raise OSError('Fixture not found')
            return fixtures[url], 'application/octet-stream', url

        with tempfile.TemporaryDirectory() as tmp, contextlib.redirect_stdout(io.StringIO()):
            output = Path(tmp) / 'capture'
            report = r.capture(output, fetch)
            self.assertEqual(len(report['resources']), len(fixtures))
            self.assertEqual(len(report['failed']), 1)
            self.assertNotIn('https://127.0.0.1/private.png', requested)
            self.assertEqual(report['queue_remaining'], 0)
            for item in report['resources']:
                body = (output / item['file']).read_bytes()
                self.assertEqual(body, fixtures[item['url']])
                self.assertEqual(hashlib.sha256(body).hexdigest(), item['sha256'])
            self.assertEqual(json.loads((output / 'manifest.json').read_text())['source'], source)
            archive = r.package(output)
            with zipfile.ZipFile(archive) as z:
                self.assertIsNone(z.testzip())
                self.assertIn('manifest.json', z.namelist())

    def test_marketing_homepage_is_not_misrepresented_as_narrative(self):
        for body, final in [(b'<title>Zero - Learn. Build. Get Hired.</title><script src="/index.js"></script>', r.SOURCE), (b'<html>wrong redirect</html>', 'https://www.zero.university/')]:
            with self.subTest(final=final), tempfile.TemporaryDirectory() as tmp, contextlib.redirect_stdout(io.StringIO()):
                with self.assertRaises(RuntimeError):
                    r.capture(Path(tmp) / 'capture', lambda url: (body, 'text/html', final))

    def test_script_stripped_save_is_rejected(self):
        with tempfile.TemporaryDirectory() as tmp, contextlib.redirect_stdout(io.StringIO()):
            with self.assertRaises(RuntimeError):
                r.capture(Path(tmp) / 'capture', lambda url: (b'<script></script>', 'text/html', url))

    def test_url_safety_and_escaped_asset_references(self):
        for url in ['file:///etc/passwd', 'https://user:password@example.org/file.png', 'http://localhost/a.js', 'http://192.168.0.1/a.js', 'http://[::1]/a.js']:
            self.assertFalse(r.public_url(url))
        refs = r.references(r'const t="\/textures\/hand.webp"; const x="/audio/crash.mp3?v=1&amp;x=2";', r.SOURCE)
        self.assertIn(r.SOURCE + 'textures/hand.webp', refs)
        self.assertIn(r.SOURCE + 'audio/crash.mp3?v=1&x=2', refs)

    def test_splits_reassemble_byte_identically(self):
        with tempfile.TemporaryDirectory() as tmp, contextlib.redirect_stdout(io.StringIO()):
            folder = Path(tmp) / 'capture'
            folder.mkdir()
            (folder / 'fixture.bin').write_bytes(bytes(range(256)) * 100)
            archive = r.package(folder, split_mb=1 / 4096)
            parts = sorted(Path(tmp).glob('*.part-*'))
            self.assertGreater(len(parts), 1)
            self.assertEqual(b''.join(p.read_bytes() for p in parts), archive.read_bytes())


if __name__ == '__main__':
    unittest.main()
