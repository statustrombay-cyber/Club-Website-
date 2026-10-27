"""Developer-only source cleanup + enhanced media integrity regression.
Requires build dependencies; never deployed. Decode all frames, not metadata only.
"""
from pathlib import Path
import importlib.util,hashlib,json
import imageio_ffmpeg
import numpy as np
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('sequences',ROOT/'tools/build-frame-sequences.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
meta=json.loads((ROOT/'assets/media/flower-enhancement.json').read_text())
assert (meta['width'],meta['height'],meta['fps'],meta['frames'])==(1280,956,60,200)
assert meta['sourceSha256']==hashlib.sha256((ROOT/'animated (96).webp').read_bytes()).hexdigest()
assert meta['rasterCardText'] is False
raw=m.frames('animated (96).webp');cursor=m.cv2.cvtColor(raw[0][72:111,437:467],m.cv2.COLOR_RGB2GRAY)
for i in range(40):
    a=m.flower_clean(raw[i],i,cursor)
    if i<=12:
        assert np.all(a[318:464,14:196]==[4,5,6]),'Recorded billboard was only dimmed, not erased'
        assert np.all(a[410:451,175:216]==[4,5,6]),'Recorded purple arrow still exists'
    if i>=17:
        for x in [172,272,372]:
            for y in range(265,315):
                assert np.all(a[y,x+3:x+94]==a[y,x+3]),'Video must contain blank footers, not duplicate type'
movie=ROOT/'assets/media/flower-scroll.mp4';assert movie.stat().st_size<10000000
reader=imageio_ffmpeg.read_frames(str(movie));info=next(reader);assert info['size']==(1280,956) and info['fps']==60
count=0
for data in reader:
    a=np.frombuffer(data,dtype='uint8');assert a.mean()>10,'Encoded black frame';count+=1
assert count==200
b=movie.read_bytes();assert b.index(b'moov')<b.index(b'mdat')
print('PASS: all 200 enhanced frames decoded; 60fps/1280x956/fast-start; no encoded black frame; original-source SHA; billboard/arrow fully removed; all 23 card-frame footers have zero raster text.')
