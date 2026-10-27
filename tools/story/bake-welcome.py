"""Re-letter the supplied title using its own raster glyphs, not a guessed font.
Requires Pillow. Input: a lossless GPU decode of the supplied texts.ktx2.
Only derived club artwork is written; the supplied atlas is never modified.
"""
from PIL import Image,ImageFilter
import numpy as np
from pathlib import Path
import argparse
p=argparse.ArgumentParser();p.add_argument('source',type=Path);args=p.parse_args()
src=Image.open(args.source).convert('RGBA');assert src.size==(3072,3072)
# Coordinates measured on the 1536px inspection copy; sample ORIGINAL pixels.
# Serif w/h from "who", a/e/r from "Paper": same source lettering family.
rects={'w':(27,595,91,669),'h':(94,577,144,669),'a':(587,577,641,660),'e':(705,577,765,660),'r':(761,577,804,660)}
glyphs={}
for char,(x,y,x2,y2) in rects.items():
    glyph=src.crop((x*2,y*2,x2*2,y2*2));alpha=glyph.getchannel('A')
    # Isolate the letter's connected ink, excluding a neighbouring serif/glow.
    ink=np.array(alpha)>235;seen=np.zeros(ink.shape,dtype=bool);components=[]
    for yy,xx in zip(*np.where(ink)):
        if seen[yy,xx]:continue
        todo=[(yy,xx)];seen[yy,xx]=True;component=[]
        while todo:
            y0,x0=todo.pop();component.append((y0,x0))
            for dy in [-1,0,1]:
                for dx in [-1,0,1]:
                    y1,x1=y0+dy,x0+dx
                    if 0<=y1<ink.shape[0] and 0<=x1<ink.shape[1] and ink[y1,x1] and not seen[y1,x1]:seen[y1,x1]=True;todo.append((y1,x1))
        components.append(component)
    component=max(components,key=len);mask=np.zeros(ink.shape,dtype=np.uint8)
    for yy,xx in component:mask[yy,xx]=255
    support=Image.fromarray(mask).filter(ImageFilter.MaxFilter(3))
    alpha=np.minimum(np.array(alpha),np.array(support));alpha=Image.fromarray(alpha)
    box=alpha.getbbox();assert box,char
    glyph=Image.new('RGBA',glyph.size,'white');glyph.putalpha(alpha);glyphs[char]=glyph.crop(box)

def word(text,height):
    # h is the ascender reference; x-height letters retain their source ratio.
    scale=height/glyphs['h'].height;gap=round(4*scale)
    chars=[None if c==' ' else glyphs[c].resize((round(glyphs[c].width*scale),round(glyphs[c].height*scale)),Image.Resampling.LANCZOS) for c in text]
    width=sum(c.width if c else round(height*.27) for c in chars)+gap*(len(chars)-1)
    out=Image.new('RGBA',(width,height))
    x=0
    for char in chars:
        if char:out.alpha_composite(char,(x,height-char.height));x+=char.width+gap
        else:x+=round(height*.27)+gap
    return out
# Preserve exactly the former title's UV rectangle and two-line hierarchy.
tile=Image.new('RGBA',(945,372));top=word('we are',68);main=word('here',270)
assert top.width<945 and main.width<945
tile.alpha_composite(top,((945-top.width)//2,2));tile.alpha_composite(main,((945-main.width)//2,98))
atlas=Image.new('RGBA',(2048,2048));atlas.alpha_composite(tile,(1093,558))
root=Path(__file__).resolve().parents[2];atlas.save(root/'assets/reference/assets/atlases/club-welcome.webp',lossless=True)
