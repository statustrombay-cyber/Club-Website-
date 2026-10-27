"""Rebuild the retained full-RGB TV recording (Pillow/numpy/OpenCV only)."""
from pathlib import Path
import hashlib,json
import cv2
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'assets/media'
cv2.setNumThreads(2)
def frames(name):
    im=Image.open(ROOT/name);out=[]
    for i in range(im.n_frames):im.seek(i);out.append(np.array(im.convert('RGB')))
    return out
def cursor_clean(rgb,template,index):
    gray=cv2.cvtColor(rgb,cv2.COLOR_RGB2GRAY)
    best=(-1,(0,0))
    for k in [1,3,5,7,9]:
        r=cv2.matchTemplate(gray,cv2.GaussianBlur(template,(k,k),0),cv2.TM_CCOEFF_NORMED)
        _,score,_,position=cv2.minMaxLoc(r)
        if score>best[0]:best=(score,position)
    x,y=(368,281) if index==60 else best[1]
    # A cursor-shaped repair, NOT a rectangular patch through the CRT case.
    shape=((template<85)|(template>222)).astype('uint8')*255
    shape=cv2.dilate(shape,np.ones((5,5),np.uint8))
    h,w=shape.shape;mask=np.zeros_like(gray)
    h=min(h,mask.shape[0]-y);w=min(w,mask.shape[1]-x)
    if h>0 and w>0:mask[y:y+h,x:x+w]=shape[:h,:w]
    return cv2.inpaint(rgb,mask,3,cv2.INPAINT_TELEA)

if __name__=='__main__':
    tv=frames('animated (46).webp')
    cursor=cv2.cvtColor(tv[0][152:193,262:293],cv2.COLOR_RGB2GRAY)
    directory=OUT/'tv-sequence';directory.mkdir(exist_ok=True)
    for i,a in enumerate(tv):
        a=cursor_clean(a,cursor,i)
        # Foreign copy is entirely left of the CRT; replace that background strip.
        for row in range(155,318):a[row,230:325]=np.median(a[row,580:630],axis=0).astype('uint8')
        im=Image.fromarray(a).crop((235,90,640,474))
        im.save(directory/f'{i:04}.webp',quality=94,method=5)
        if i==0:im.save(OUT/'tv-man-poster.webp',quality=94,method=5)
    (directory/'manifest.json').write_text(json.dumps({'count':75,'width':405,'height':384,'pattern':'/assets/media/tv-sequence/{frame}.webp','sourceFrames':75,'alpha':False,'sourceSha256':hashlib.sha256((ROOT/'animated (46).webp').read_bytes()).hexdigest()},indent=2)+'\n')
    print('Built all 75 opaque TV frames')
