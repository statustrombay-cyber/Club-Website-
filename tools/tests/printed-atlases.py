"""Check all fourteen source paper UV islands, not just the image filenames.
Requires Pillow; run after tools/story/adapt-atlases.py.
"""
from PIL import Image, ImageStat
from pathlib import Path
import hashlib
root=Path(__file__).resolve().parents[2]
folder=root/'assets/reference/assets/atlases'
portrait_boxes=[(0,0,492,912),(492,0,492,912),(982,0,492,912),(0,911,491,1137),(492,913,490,1135),(983,912,491,911)]
landscape_boxes=[(0,0,658,512),(658,0,658,512),(1316,0,658,512),(0,512,658,512),(0,1024,658,512),(0,1536,658,512),(658,1536,658,512),(1316,1536,658,512)]
for name,boxes in [('club-money-papers.webp',portrait_boxes),('club-archive.webp',landscape_boxes)]:
    im=Image.open(folder/name).convert('RGB')
    assert im.size==(2048,2048)
    for index,(x,y,w,h) in enumerate(boxes):
        tile=im.crop((x,y,x+w,y+h))
        assert ImageStat.Stat(tile.convert('L')).stddev[0]>25,(name,index,'blank sheet')
        if h>600:
            photograph=tile.crop((30,250,440,575))
            text=tile.crop((10,0,w-10,180))
        else:
            photograph=tile.crop((25,155,245,400))
            text=tile.crop((285,170,630,430))
        assert ImageStat.Stat(photograph.convert('L')).stddev[0]>30,(name,index,'missing photo')
        assert ImageStat.Stat(text.convert('L')).stddev[0]>20,(name,index,'missing text')
    print(name,': all',len(boxes),'UV islands have photographic and printed detail')
for name in ['freud','rogers','james']:
    im=Image.open(root/'assets/story/portraits'/f'{name}.webp').convert('RGB')
    assert all(abs(r-g)<=2 and abs(g-b)<=2 for r,g,b in (im.get_flattened_data() if hasattr(im, "get_flattened_data") else im.getdata())),name+' is not black and white'
assert hashlib.sha256((folder/'leather-money-shreds.ktx2').read_bytes()).hexdigest()=='f39a1df7fcdcca5b512a327ff78cf118bcd96be27c1dbad845e71b4efeb54f5e'
print('Three local B/W photographs verified; original burning-banknote KTX2 remains byte-identical.')
