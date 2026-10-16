#!/usr/bin/env python3
"""Decoded-asset audit (Python 3 + Pillow); run in the cloned repository.
Every static atlas tile is compared with its original recorded pose. Inputs
live in tools/references/wires (development only), never in the deploy ZIP.
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
for kind, info in study['models'].items():
    source = Image.open(ROOT / 'tools/references/wires' / f'wire-{kind}.webp')
    meta = info['atlas']
    primary = Image.open(MOTION / f'wire-{kind}-atlas.webp').convert('RGBA')
    fallback = Image.open(MOTION / f'wire-{kind}-atlas-inline.png').convert('RGBA')
    assert source.n_frames == meta['frames']
    different = set()
    for i in range(source.n_frames):
        source.seek(i)
        x, y = i % 8 * 328, i // 8 * 220
        actual = primary.crop((x,y,x+328,y+220)).getchannel('A')
        expected = source.convert('RGBA').getchannel('A')
        assert actual.tobytes() == expected.tobytes(), (kind,i,'full-resolution pose')
        x, y = i % 8 * 112, i // 8 * 76
        actual = fallback.crop((x,y,x+112,y+76)).getchannel('A')
        expected = source.convert('RGBA').resize((112,76),Image.Resampling.LANCZOS).getchannel('A').point(lambda v:round(v/17)*17)
        assert actual.tobytes() == expected.tobytes(), (kind,i,'embedded pose')
        assert source.info['duration'] == meta['durations'][i]
        different.add(actual.tobytes())
    assert len(different) == source.n_frames
    print(f'{kind}: {len(different)} distinct poses; every full/embedded atlas tile matches')

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
