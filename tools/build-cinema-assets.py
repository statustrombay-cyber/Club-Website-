"""Build runtime-only media from the supplied TV screen recording and clean
reference-derived flower keyframes. Pillow and opencv-python-headless required; no runtime Python needed.
Usage: python tools/build-cinema-assets.py /path/to/clean-flower-keyframes
The flower keyframes are AI-cleaned reconstructions, not recovered raw video.
"""
from pathlib import Path
import sys
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/media'
OUT.mkdir(exist_ok=True)
source = Path(sys.argv[1])
for name in ['flower-portrait', 'flower-unfold', 'flower-hand']:
    image = Image.open(source / (name + '.jpg')).convert('RGB')
    image.save(OUT / (name + '.webp'), quality=91, method=6)

# Isolate the actual recorded character; do not export Mainframe's UI, words,
# logo or cursor. Three bounded 2025x1870 atlases avoid oversized GPU textures.
cv2.setNumThreads(2)
recording = Image.open(ROOT / 'animated (46).webp')
recording.seek(0)
reference = np.array(recording.convert('RGB'))
cursor = cv2.cvtColor(reference[152:193,262:293], cv2.COLOR_RGB2GRAY)
W, H = 405, 374
# Only use frames whose recorded mouse pointer is outside the character.
clean_poses = list(range(18)) + list(range(41,59)) + list(range(69,75))
cache = {}
for sheet in range(3):
    atlas = Image.new('RGBA', (W * 5, H * 5))
    for tile in range(25):
        index = sheet * 25 + tile
        # Resample only clean source poses: no baked cursor on the CRT/coat.
        source_index = clean_poses[round(index / 74 * (len(clean_poses)-1))]
        if source_index not in cache:
            recording.seek(source_index)
            rgb = np.array(recording.convert('RGB'))
            gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
            match = cv2.matchTemplate(gray,cursor,cv2.TM_CCOEFF_NORMED)
            _, _, _, (x,y) = cv2.minMaxLoc(match)
            mask = np.zeros(gray.shape,np.uint8)
            cv2.rectangle(mask,(325,108),(550,316),cv2.GC_PR_FGD,-1)
            body = np.array([[370,300],[500,300],[640,365],[640,474],
                             [242,474],[256,400],[287,354]],np.int32)
            cv2.fillPoly(mask,[body],cv2.GC_PR_FGD)
            mask[140:260,375:480] = cv2.GC_FGD
            mask[360:474,325:570] = cv2.GC_FGD
            cv2.grabCut(rgb,mask,None,np.zeros((1,65)),np.zeros((1,65)),4,cv2.GC_INIT_WITH_MASK)
            foreground = np.where((mask==1)|(mask==3),255,0).astype('uint8')
            contours,_ = cv2.findContours(foreground,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
            alpha = np.zeros_like(foreground)
            cv2.drawContours(alpha,[max(contours,key=cv2.contourArea)],-1,255,-1)
            # Preserve the light-grey side of the CRT, which colour matting alone
            # mistakes for its grey background. Never include cursor edges in hull.
            edges = cv2.Canny(gray,12,35)
            edges[max(0,y-4):y+47,max(0,x-4):x+37] = 0
            contours,_ = cv2.findContours(edges[108:310,325:550],cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)
            points = np.vstack([c for c in contours if cv2.arcLength(c,False)>8])
            hull = cv2.convexHull(points)
            hull[:,:,0] += 325; hull[:,:,1] += 108
            cv2.drawContours(alpha,[hull],-1,255,-1)
            image = Image.fromarray(rgb).convert('RGBA')
            image.putalpha(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(.45)))
            image = image.crop((235,100,640,474))
            image = image.filter(ImageFilter.UnsharpMask(radius=.7,percent=90,threshold=3))
            cache[source_index] = image
        image = cache[source_index]
        atlas.alpha_composite(image, ((tile % 5) * W, (tile // 5) * H))
        if index == 0:
            image.save(OUT / 'tv-man-poster.webp', quality=94, method=6)
    atlas.save(OUT / ('tv-man-atlas-' + str(sheet) + '.webp'), quality=90, method=6)
print('Built three clean flower keyframes, three bounded TV atlases and a TV poster.')
