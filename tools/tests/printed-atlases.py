"""Pixel checks on the six intact sheets; degrees and money stay original.
Requires Pillow. No portrait claim is made from filenames or variance alone.
"""
from PIL import Image, ImageStat, ImageOps, ImageChops
from pathlib import Path
import hashlib, re
root=Path(__file__).resolve().parents[2]
folder=root/'assets/reference/assets/atlases'
boxes=[(0,0,492,912),(492,0,492,912),(982,0,492,912),(0,911,491,1137),(492,913,490,1135),(983,912,491,911)]
im=Image.open(folder/'club-editorials.webp').convert('RGB')
assert im.size==(2048,2048)
for index,((x,y,w,h),name) in enumerate(zip(boxes,['freud','rogers','james']*2)):
    tile=im.crop((x,y,x+w,y+h))
    expected=ImageOps.fit(Image.open(root/'assets/story/portraits'/f'{name}.webp').convert('RGB'),(250,284),method=Image.Resampling.LANCZOS,centering=(.5,.32))
    actual=tile.crop((20,490,270,774))
    # Ignore only the two-pixel printed border, not the actual photograph.
    error=ImageStat.Stat(ImageChops.difference(actual.crop((3,3,247,281)),expected.crop((3,3,247,281)))).mean
    assert max(error)<8,(index,name,'photo pixels do not match',error)
    assert ImageStat.Stat(tile.crop((18,221,w-18,450)).convert('L')).stddev[0]>20,(index,'missing editorial thought')
    assert ImageStat.Stat(tile.crop((16,36,w-16,172)).convert('L')).stddev[0]>15,(index,'missing opening columns')
    print(index,name,': actual portrait pixels and editorial print verified')
for name in ['freud','rogers','james']:
    portrait=Image.open(root/'assets/story/portraits'/f'{name}.webp').convert('RGB')
    assert all(abs(r-g)<=2 and abs(g-b)<=2 for r,g,b in (portrait.get_flattened_data() if hasattr(portrait,"get_flattened_data") else portrait.getdata())),name+' is not black and white'
assert hashlib.sha256((folder/'leather-money-shreds.ktx2').read_bytes()).hexdigest()=='f39a1df7fcdcca5b512a327ff78cf118bcd96be27c1dbad845e71b4efeb54f5e'
bridge=(root/'tools/story/reference-bridge.js').read_text()
assert "'assets/atlases/board-certificates.ktx2':'certificate-atlas'" in bridge
assert 'certAtlas:' not in bridge,'degree atlas must never be replaced with editorials'
assert not (folder/'club-archive.webp').exists()
print('All six actual photographs verified. Original banknote and compressed degree path preserved.')
assert hashlib.sha256((folder/'board-certificates.ktx2').read_bytes()).hexdigest()=='c9630e784f1473f8cdeac2cde4c331723d08d68a324b688d938395fc30e804a2'
core=(root/'tools/story/reference-core.js').read_text()
for start,end,digest in [
 ('function Cx(','var Dx =','b2dcce95e76bf5edfa093c4f4af289dc76ed774129d20aed1fb62e8af81f5cd4'),
 ('function eS(','var tS =','1fdaee4f05e60b795f7e17af537040902574344ae078781e3bf5a1e4bc510866'),
 ('Zx = [','function eS(','351c26400bd8c8bcfa92616bec0f725846d0213a4aae20b6b6629b77f4744f37'),
 ('var tS =','function nS(','15f65c28754ee84f12309c927ecdf745984c9ee134ac5c4f8098d94c893d815b')]:
    source=core[core.index(start):core.index(end,core.index(start))]
    assert hashlib.sha256(re.sub(r'\s+','',source).encode()).hexdigest()==digest,(start,'original choreography or shred shader changed')
assert 's3 = c2 * 2;' in core and 'hv(t2, 0.45, 0.9) * 2.5' in core
assert all('s2['+str(i)+'] + t2 * '+v in core for i,v in enumerate(['c2','l2','u2']))
print('Original ZIP degree bytes, strip shader/geometry, magazine flight poses and degree motion formulas verified.')

# Only the editorial texture selection/printed-paper lighting differ here.
# Geometry, UVs, waviness, seeds, sizes and flying poses are source-identical.
editorials=core[core.index('function nS('):core.index('function rS(',core.index('function nS('))]
editorials=editorials.replace('e36.assetLoader.getAsset(`clubPaperAtlas`) || ','').replace('matcapStrength: 0.35, ','')
assert hashlib.sha256(re.sub(r'\s+','',editorials).encode()).hexdigest()=='a946ceaa493c038b807d89fcb3eeb1cd58889cc67872b563d734b950e23b3390'
