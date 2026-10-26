"""Validate exported frame counts/provenance and full RGB TV integrity.
Pillow required. Optional development regression, not a hosting dependency.
"""
from pathlib import Path
import hashlib,json
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
for folder,reference,count,size in [('flower-sequence','animated (96).webp',157,(960,717)),('tv-sequence','animated (46).webp',75,(405,384))]:
    root=ROOT/'assets/media'/folder
    manifest=json.loads((root/'manifest.json').read_text())
    assert manifest['count']==count
    assert manifest['sourceSha256']==hashlib.sha256((ROOT/reference).read_bytes()).hexdigest()
    assert len(list(root.glob('*.webp')))==count
    for index in range(count):
        image=Image.open(root/f'{index:04}.webp');image.load()
        assert image.size==size
        assert 'A' not in image.getbands(),'No alpha holes or segmented CRT edges allowed'
        assert image.getbbox()==(0,0,*size),'Frame must cover its entire image'
    if folder=='tv-sequence':
        assert manifest['sourceFrames']==75 and manifest['alpha'] is False
        assert count==Image.open(ROOT/reference).n_frames,'Never hold/drop character poses'
    else:assert manifest['usedSourceFrames']==[0,39] and manifest['interpolation']=='bidirectional-optical-flow-4x'
    print(folder,':',count,'frames, original-source hash verified, full RGB, dimensions PASS')
