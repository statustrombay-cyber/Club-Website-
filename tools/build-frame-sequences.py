"""Extract the supplied recordings, not AI keyframes or segmented characters.
Pillow + numpy + OpenCV required only to rebuild. Runtime needs none of them.
Flower: reference camera/hand portion, 4x bidirectional optical-flow samples.
TV: all 75 recorded poses, full RGB casing/background, no alpha/matting.
Baked reference UI is cleaned/relabelled; missing underlying footage or eye
animation is not invented. The unrelated flower site's outro is not replayed.
"""
from pathlib import Path
import json, hashlib
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'assets/media'
cv2.setNumThreads(2); cv2.setRNGSeed(0)
fontroot=Path('/usr/share/fonts/truetype/dejavu')
def font(size):
    return ImageFont.truetype(str(fontroot/'DejaVuSerif.ttf'),size)
def frames(name):
    im=Image.open(ROOT/name);out=[]
    for i in range(im.n_frames):im.seek(i);out.append(np.array(im.convert('RGB')))
    return out

def cursor_clean(rgb,template,index,tv=False):
    gray=cv2.cvtColor(rgb,cv2.COLOR_RGB2GRAY)
    best=(-1,(0,0))
    for k in ([1,3,5,7,9] if tv else [1]):
        r=cv2.matchTemplate(gray,cv2.GaussianBlur(template,(k,k),0),cv2.TM_CCOEFF_NORMED)
        _,score,_,position=cv2.minMaxLoc(r)
        if score>best[0]:best=(score,position)
    x,y=(368,281) if tv and index==60 else (389,324) if not tv and index==36 else best[1]
    # A cursor-shaped repair, NOT a rectangular patch through the CRT case.
    shape=((template<85)|(template>222)).astype('uint8')*255
    shape=cv2.dilate(shape,np.ones((5,5),np.uint8))
    if not tv: shape[:]=255
    h,w=shape.shape;mask=np.zeros_like(gray)
    h=min(h,mask.shape[0]-y);w=min(w,mask.shape[1]-x)
    if h>0 and w>0:mask[y:y+h,x:x+w]=shape[:h,:w]
    return cv2.inpaint(rgb,mask,3,cv2.INPAINT_TELEA)

def flower_clean(rgb,i,template):
    rgb=cursor_clean(rgb,template,i)
    mask=np.zeros(rgb.shape[:2],np.uint8)
    mask[10:39,8:95]=255;mask[10:40,450:630]=255
    rgb=cv2.inpaint(rgb,mask,5,cv2.INPAINT_TELEA)
    im=Image.fromarray(rgb)
    if i<=12:
        # The foreign site's opaque bottom-left intro card cannot be recovered.
        # Feather it into the original dark floral corner, without a new face.
        a=Image.new('L',im.size);ImageDraw.Draw(a).rectangle((0,315,213,478),fill=255)
        a=a.filter(ImageFilter.GaussianBlur(20))
        im=Image.composite(Image.new('RGB',im.size,(4,5,6)),im,a)
    if i>=14:
        # Preserve the recorded hand and card geometry, replace only card copy.
        opacity=min(1,max(0,(i-17)/7))
        if opacity:
            layer=Image.new('RGBA',im.size);d=ImageDraw.Draw(layer)
            for x,title,lines in [(172,'Notice',['Meet your inner world.','Make room for curiosity.']),
                                  (272,'Connect',['Listen with care.','Find your people.']),
                                  (372,'Grow',['Carry kindness forward.','One small step at a time.'])]:
                d.rectangle((x,166,x+94,316),fill=(83,69,78,int(255*opacity)))
                d.text((x+6,270),title,font=font(12),fill=(255,243,243,int(255*opacity)))
                for row,line in enumerate(lines):d.text((x+6,288+row*10),line,font=font(6),fill=(244,228,234,int(255*opacity)))
            im=Image.alpha_composite(im.convert('RGBA'),layer).convert('RGB')
    return np.array(im)

def save_frame(rgb,path):
    im=Image.fromarray(rgb).resize((960,717),Image.Resampling.LANCZOS)
    im=im.filter(ImageFilter.UnsharpMask(radius=.7,percent=55,threshold=4))
    im.save(path,quality=89,method=5)

flower=frames('animated (96).webp');tv=frames('animated (46).webp')
# Same desktop cursor, sampled from the TV reference (no generated patch asset).
cursor=cv2.cvtColor(tv[0][152:193,262:293],cv2.COLOR_RGB2GRAY)
flower_cursor=cv2.cvtColor(flower[0][72:111,437:467],cv2.COLOR_RGB2GRAY)
clean=[flower_clean(a,i,flower_cursor) for i,a in enumerate(flower[:40])]
directory=OUT/'flower-sequence';directory.mkdir(exist_ok=True)
flow=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
y,x=np.mgrid[0:478,0:640].astype('float32');count=0
for i in range(len(clean)-1):
    a,b=clean[i],clean[i+1]
    ga,gb=[cv2.cvtColor(v,cv2.COLOR_RGB2GRAY) for v in [a,b]]
    ab=flow.calc(ga,gb,None);ba=flow.calc(gb,ga,None)
    for sub in range(4):
        t=sub/4
        if sub==0:out=a
        else:
            wa=cv2.remap(a,x-ab[:,:,0]*t,y-ab[:,:,1]*t,cv2.INTER_LINEAR,borderMode=cv2.BORDER_REFLECT)
            wb=cv2.remap(b,x-ba[:,:,0]*(1-t),y-ba[:,:,1]*(1-t),cv2.INTER_LINEAR,borderMode=cv2.BORDER_REFLECT)
            out=cv2.addWeighted(wa,1-t,wb,t,0)
        save_frame(out,directory/f'{count:04}.webp');count+=1
save_frame(clean[-1],directory/f'{count:04}.webp');count+=1
save_frame(clean[0],OUT/'flower-poster.webp')
manifest={'count':count,'width':960,'height':717,'pattern':'/assets/media/flower-sequence/{frame}.webp','sourceFrames':75,'usedSourceFrames':[0,39],'interpolation':'bidirectional-optical-flow-4x','sourceSha256':hashlib.sha256((ROOT/'animated (96).webp').read_bytes()).hexdigest()}
(directory/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')

directory=OUT/'tv-sequence';directory.mkdir(exist_ok=True)
for i,a in enumerate(tv):
    a=cursor_clean(a,cursor,i,True)
    # Foreign copy is entirely left of the CRT; replace that background strip.
    for row in range(155,318):a[row,230:325]=np.median(a[row,580:630],axis=0).astype('uint8')
    im=Image.fromarray(a).crop((235,90,640,474))
    im.save(directory/f'{i:04}.webp',quality=94,method=5)
    if i==0:im.save(OUT/'tv-man-poster.webp',quality=94,method=5)
(directory/'manifest.json').write_text(json.dumps({'count':75,'width':405,'height':384,'pattern':'/assets/media/tv-sequence/{frame}.webp','sourceFrames':75,'alpha':False,'sourceSha256':hashlib.sha256((ROOT/'animated (46).webp').read_bytes()).hexdigest()},indent=2)+'\n')
print('Built',count,'dense flower frames and all 75 full, opaque TV frames.')
