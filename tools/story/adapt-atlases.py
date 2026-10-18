from PIL import Image,ImageDraw,ImageFont,ImageOps
from fontTools.ttLib import TTFont
from pathlib import Path
import re,html
import argparse
parser=argparse.ArgumentParser(description='Bake club artwork into the recovered 2048px atlas UV islands. Requires Pillow, fonttools and brotli; source-dir contains spcAtlas.png, moneyShredsAtlas.png and certAtlas.png exported from the captured KTX2 textures.')
parser.add_argument('--source-dir',type=Path,required=True)
parser.add_argument('--work-dir',type=Path,required=True)
args=parser.parse_args()
root=Path(__file__).resolve().parents[2];work=args.source_dir;args.work_dir.mkdir(parents=True,exist_ok=True);out=root/'assets/reference/assets/atlases'
f=TTFont(root/'assets/fonts/bodoni-moda-latin.woff2');f.flavor=None;f.save(args.work_dir/'bodoni.ttf')
def font(n):return ImageFont.truetype(str(args.work_dir/'bodoni.ttf'),n)
def fit(draw,text,w,maxsize):
 n=maxsize
 while draw.textlength(text,font=font(n))>w and n>14:n-=1
 return font(n)
def para(draw,text,x,y,w,size,fill,leading=None,maxy=None):
 ff=font(size);line='';step=leading or round(size*1.25)
 for word in text.split():
  new=(line+' '+word).strip()
  if draw.textlength(new,font=ff)>w and line:
   draw.text((x,y),line,font=ff,fill=fill);y+=step;line=word
   if maxy and y>maxy:return y
  else:line=new
 if not maxy or y<=maxy:draw.text((x,y),line,font=ff,fill=fill)
 return y+step
# Six original UV islands; don't alter the recovered glass geometry or UVs.
im=Image.open(work/'spcAtlas.png').convert('RGBA')
regions=[(0,0,856,381,False),(881,0,860,518,False),(1765,0,735,283,True),(0,699,1024,363,False),(1042,737,952,502,False),(563,1073,975,370,True)]
copy=[('you are','not alone.','Listen. Notice. Make room.'),('6.86%','higher life-satisfaction scores','in the two studies reviewed'),('24,804','participants. 28 countries.','one gratitude meta-analysis'),('64 trials','exploring gratitude','Diniz et al. · 2023'),('small acts.','real connection.','Make room for another mind.'),('stay curious.','stay human.','There is more to every mind.')]
for (x,y,w,h,rot),lines in zip(regions,copy):
 tile=Image.new('RGBA',(w,h));d=ImageDraw.Draw(tile); yy=0
 for j,text in enumerate(lines):
  maxsize=int(h*(.50 if j==0 else .23 if j==1 else .14));ff=fit(d,text,w-20,maxsize);bb=d.textbbox((0,0),text,font=ff);d.text((10,yy-bb[1]),text,font=ff,fill='white');yy+=bb[3]-bb[1]+h*.035
 if rot:tile=tile.transpose(Image.Transpose.ROTATE_270)
 im.paste(tile,(x,y))
im.save(out/'club-fragments.webp',lossless=True)
# Preserve the supplied six newspaper islands and quote/photo/column layout.
# These are editorial summaries, never invented quotations attributed as speech.
im=Image.open(work/'moneyShredsAtlas.png').convert('RGBA')
profiles=[
 ('Sigmund Freud','Psychoanalysis','Dreams open questions about the unconscious.','Dreams and unconscious processes were central to Freud’s psychoanalytic thought. His historical influence invites discussion, not unquestioning agreement with every theory. Psychology continues to examine how memories, feelings and experience shape a person.','freud'),
 ('Carl Rogers','Person-centred therapy','To understand a person, begin by listening.','Rogers placed the person’s experience and the therapeutic relationship at the centre of his approach. Empathy, congruence and unconditional positive regard became important ideas in person-centred therapy. Listening begins with curiosity and respect.','rogers'),
 ('William James','Attention and habit','Attention and habit shape our stream of thought.','The Principles of Psychology explored attention, habit, emotion and the flow of conscious experience. James helped shape early psychology by asking how thought changes from one moment to another. These questions still invite careful observation.','james'),
 ('Sigmund Freud','Dreams and meaning','A theory can open a question without being the final word.','The Interpretation of Dreams made the study of dreams a landmark in the history of psychoanalysis. A historical idea can shape a conversation while remaining open to criticism. Reflection is a starting point for inquiry rather than proof of a theory.','freud'),
 ('Carl Rogers','Empathy and experience','Empathy makes room for another person’s world.','A person is more than a label. Rogers emphasised the importance of understanding another person’s frame of reference. A student community can practise attentive listening and respectful conversation without confusing peer support with professional therapy.','rogers'),
 ('William James','The changing mind','What catches our attention? What becomes a habit?','The stream of consciousness describes experience as changing and continuous. Attention selects some things while others recede. Everyday habits show how repeated actions can become familiar patterns. Psychology keeps asking how experience and action connect.','james')]
portraits={name:Image.open(root/'assets/story/portraits'/f'{name}.webp').convert('RGB') for name in ['freud','rogers','james']}
ink='#20271f';stock=(230,226,208,255)
def columns(d,text,x,y,w,h,size=20,count=2):
 gap=12;cw=(w-gap*(count-1))//count;ff=font(size);words=(text+' ')*16;words=words.split();pos=0
 for col in range(count):
  yy=y
  while yy+size*1.15<=y+h:
   line=''
   while pos<len(words) and d.textlength((line+' '+words[pos]).strip(),font=ff)<=cw:
    line=(line+' '+words[pos]).strip();pos+=1
   if not line:break
   d.text((x+col*(cw+gap),yy),line,font=ff,fill=ink);yy+=round(size*1.16)
def photo(tile,name,box):
 x,y,w,h=box;im=ImageOps.fit(portraits[name],(w,h),method=Image.Resampling.LANCZOS,centering=(.5,.32));tile.paste(im,(x,y));ImageDraw.Draw(tile).rectangle((x,y,x+w,y+h),outline=ink,width=2)
boxes=[(0,0,492,912),(492,0,492,912),(982,0,492,912),(0,911,491,1137),(492,913,490,1135),(983,912,491,911)]
for (x,y,w,h),(who,topic,headline,body,name) in zip(boxes,profiles):
 tile=Image.new('RGBA',(w,h),stock);d=ImageDraw.Draw(tile)
 # Same hierarchy as the supplied source: dense opening columns, oversized
 # editorial thought, a square B/W portrait and name row, then dense body ink.
 d.text((18,10),'THE MINDFUL TATTVA JOURNAL',font=fit(d,'THE MINDFUL TATTVA JOURNAL',w-36,25),fill=ink)
 d.line((18,45,w-18,45),fill=ink,width=2)
 yy=para(d,headline,20,63,w-40,35,ink,leading=36)
 py=max(205,min(yy+12,230));photo(tile,name,(24,py,w-48,385))
 d.text((24,py+400),who,font=font(32),fill=ink)
 d.text((24,py+442),topic,font=font(20),fill=ink)
 columns(d,body,18,py+482,w-36,h-py-492,19)
 im.paste(tile,(x,y))
# The source banknote island is unchanged; bills still use the original KTX2.
im.save(out/'club-money-papers.webp',quality=88,method=6)
# All eight landscape UV islands remain in their supplied positions. Each gets
# photographed editorial content; do not replace them with blank certificates.
im=Image.open(work/'certAtlas.png').convert('RGBA');boxes=[(0,0),(658,0),(1316,0),(0,512),(0,1024),(0,1536),(658,1536),(1316,1536)]
for idx,(x,y) in enumerate(boxes):
 who,topic,headline,body,name=profiles[idx%len(profiles)];tile=Image.new('RGBA',(658,512),stock);d=ImageDraw.Draw(tile)
 d.text((16,8),'THE MINDFUL TATTVA JOURNAL',font=font(19),fill=ink);d.text((460,13),'READ · THINK · DISCUSS',font=font(13),fill=ink);d.line((12,40,646,40),fill=ink,width=2)
 yy=para(d,headline,17,52,622,32,ink,leading=33)
 py=max(135,yy+10);photo(tile,name,(18,py,242,278))
 d.text((18,py+285),who,font=fit(d,who,245,23),fill=ink);para(d,topic,282,445,355,17,ink)
 columns(d,body,282,py,355,302,16,2)
 d.line((12,474,646,474),fill=ink);d.text((18,482),'MINDFUL TATTVA · HISTORY, IDEAS AND HUMAN EXPERIENCE',font=font(14),fill=ink)
 im.paste(tile,(x,y))
im.save(out/'club-archive.webp',quality=88,method=6)
