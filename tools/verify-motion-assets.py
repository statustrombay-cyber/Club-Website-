#!/usr/bin/env python3
"""Optional decoded-asset audit (Python 3 + Pillow); never needs the recording.

    python tools/verify-motion-assets.py
    python tools/verify-motion-assets.py --build-inline

The compact APNGs are exact-frame alpha downsamplings of the shipped WebPs,
not synthetic rotations. --build-inline reproducibly regenerates only those
three APNGs; update wire-motion.json checksums if the originals ever change.
"""
from collections import deque
from hashlib import sha256
from pathlib import Path
import json
import sys
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MOTION = ROOT / 'assets/motion'
study = json.loads((ROOT / 'tools/references/wire-motion.json').read_text())
size = (112, 76)
palette = [v for _ in range(256) for v in (215, 207, 229)]
transparency = bytes(min(j * 17, 255) for j in range(256))

for kind, info in study['models'].items():
    source = Image.open(MOTION / f'wire-{kind}.webp')
    target = MOTION / f'wire-{kind}-inline.png'
    if '--build-inline' in sys.argv:
        frames, durations = [], []
        for frame in range(source.n_frames):
            source.seek(frame)
            alpha = source.convert('RGBA').resize(size, Image.Resampling.LANCZOS).getchannel('A')
            indexed = Image.frombytes('P', size, alpha.point(lambda v: round(v / 17)).tobytes())
            indexed.putpalette(palette)
            indexed.info['transparency'] = transparency
            frames.append(indexed)
            durations.append(source.info['duration'])
        frames[0].save(target, save_all=True, append_images=frames[1:], duration=durations,
                       loop=0, disposal=0, blend=0, optimize=True, bits=4)
    decoded = Image.open(target)
    assert decoded.n_frames == source.n_frames == info['frames'], kind
    assert decoded.info['loop'] == 0 and decoded.size == size, kind
    assert sha256(target.read_bytes()).hexdigest() == info['inlineMotion']['sha256'], kind
    different, duration = set(), 0
    for frame in range(source.n_frames):
        source.seek(frame)
        decoded.seek(frame)
        expected = source.convert('RGBA').resize(size, Image.Resampling.LANCZOS).getchannel('A')
        expected = expected.point(lambda v: round(v / 17) * 17)
        actual = decoded.convert('RGBA').getchannel('A')
        assert actual.tobytes() == expected.tobytes(), (kind, frame, 'pose mismatch')
        assert abs(decoded.info['duration'] - source.info['duration']) < .001, (kind, frame)
        duration += decoded.info['duration']
        different.add(actual.tobytes())
    assert len(different) == source.n_frames and abs(duration - info['durationMs']) < .001
    print(f'{kind}: {len(different)} different decoded poses; every frame and delay matches')

# Eight-connected components, including the faint antialiased edges: touching
# neighbours would merge here. This uses only Pillow and Python's standard lib.
ribbons = Image.open(MOTION / 'reference-ribbons.webp').convert('RGBA')
width, height = ribbons.size
pixels = bytearray(ribbons.getchannel('A').point(lambda v: 1 if v else 0).tobytes())
areas = []
for start in range(len(pixels)):
    if not pixels[start]:
        continue
    pixels[start] = 0
    queue, area = deque([start]), 0
    while queue:
        at = queue.popleft()
        area += 1
        x, y = at % width, at // width
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if not (dx or dy) or not (0 <= x + dx < width and 0 <= y + dy < height):
                    continue
                neighbour = at + dy * width + dx
                if pixels[neighbour]:
                    pixels[neighbour] = 0
                    queue.append(neighbour)
    areas.append(area)
assert len(areas) == 45 and min(areas) > 100, (len(areas), min(areas))
print('ribbons: 45 separate continuous strands, including every positive-alpha edge')
