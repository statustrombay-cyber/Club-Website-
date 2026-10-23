#!/usr/bin/env python3
"""Optional development-only atlas rebuild (Pillow); inputs are not deployed."""
from PIL import Image
from pathlib import Path
import json,hashlib
ROOT=Path(__file__).resolve().parents[1]
import os
os.chdir(ROOT)
p=Path('tools/references/wire-motion.json');study=json.loads(p.read_text())
for kind,meta in study['models'].items():
 source=Image.open(f'tools/references/wires/wire-{kind}.webp');n=source.n_frames;cols=8;rows=(n+cols-1)//cols;primary=Image.new('RGBA',(328*cols,220*rows));fallback=Image.new('RGBA',(112*cols,76*rows));times=[]
 for i in range(n):
  source.seek(i);frame=source.convert('RGBA');primary.paste(frame,((i%cols)*328,(i//cols)*220));small=frame.resize((112,76),Image.Resampling.LANCZOS);small.putalpha(small.getchannel('A').point(lambda a:round(a/17)*17));fallback.paste(small,((i%cols)*112,(i//cols)*76));times.append(source.info['duration'])
 main=Path(f'assets/motion/wire-{kind}-atlas.webp');primary.save(main,lossless=True,method=6)
 # Fixed pale RGB plus sixteen alpha levels; palette PNG compresses small atlases.
 alpha=fallback.getchannel('A');indexed=Image.frombytes('P',fallback.size,alpha.point(lambda a:round(a/17)).tobytes());indexed.putpalette([v for j in range(256) for v in (215,207,229)]);indexed.info['transparency']=bytes(min(j*17,255) for j in range(256));inline=Path(f'assets/motion/wire-{kind}-atlas-inline.png');indexed.save(inline,optimize=True,bits=4)
 meta.pop('inlineMotion',None);meta['atlas']={'columns':cols,'frames':n,'frameWidth':328,'frameHeight':220,'fallbackFrameWidth':112,'fallbackFrameHeight':76,'durations':times,'bytes':main.stat().st_size,'sha256':hashlib.sha256(main.read_bytes()).hexdigest(),'inlineBytes':inline.stat().st_size,'inlineSha256':hashlib.sha256(inline.read_bytes()).hexdigest()}
 print(kind,main.stat().st_size,inline.stat().st_size)
study['delivery']='A canvas clock draws the original recorded poses from static sprite atlases; no native animated-image playback and no per-wire IntersectionObserver source switching. Embedded small atlases animate while the full-resolution static atlases load, and after network failures. Reduced-motion and no-script visitors retain silhouettes.'
p.write_text(json.dumps(study,indent=2)+'\n')
