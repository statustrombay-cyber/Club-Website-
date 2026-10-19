from PIL import Image,ImageDraw,ImageFont,ImageOps
from fontTools.ttLib import TTFont
from pathlib import Path
import argparse
parser=argparse.ArgumentParser(description='Bake club artwork into the recovered 2048px atlas UV islands. Requires Pillow, fonttools and brotli; source-dir contains spcAtlas.png and moneyShredsAtlas.png exported from the supplied KTX2 textures. Degrees are never rebaked.')
parser.add_argument('--source-dir',type=Path,required=True)
parser.add_argument('--work-dir',type=Path,required=True)
parser.add_argument('--papers-only',action='store_true',help='Leave the existing glass-fact artwork byte-identical.')
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
if not args.papers_only:
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
 gap=12;cw=(w-gap*(count-1))//count;ff=font(size);words=text.split();pos=0
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
reading_note=('Ideas from the history of psychology deserve both curiosity and critical thought. '
 'Ask what an idea helps us notice, how it was studied and where its limits lie. '
 'A familiar name is not a substitute for evidence. Different approaches can offer different questions. '
 'In a student community, listening is a practice: leave room for another person to finish, '
 'ask before offering advice and respect what they choose not to share. '
 'Peer conversation is not a diagnosis or a replacement for professional care. '
 'Read thoughtfully. Discuss respectfully. There is more to every mind.')
for (x,y,w,h),(who,topic,headline,body,name) in zip(boxes,profiles):
 # Paste into the six original magazine rectangles, not into the degree atlas.
 # Keep the source hierarchy: opening small print, large editorial thought,
 # photograph/name row and closing columns. These thoughts are clearly labelled
 # editorial writing, not quotations invented for the historical psychologists.
 tile=Image.new('RGBA',(w,h),stock);d=ImageDraw.Draw(tile)
 d.text((16,5),'MINDFUL TATTVA · HISTORY OF PSYCHOLOGY',font=fit(d,'MINDFUL TATTVA · HISTORY OF PSYCHOLOGY',w-32,19),fill=ink)
 columns(d,body,16,36,w-32,136,17)
 d.line((16,181,w-16,181),fill=ink,width=2)
 d.text((18,190),'EDITORIAL PERSPECTIVE',font=font(15),fill=ink)
 para(d,headline,18,221,w-36,50,ink,leading=52,maxy=435)
 photo(tile,name,(20,490,250,284))
 para(d,who,286,518,w-302,30,ink,leading=34)
 para(d,topic,286,625,w-302,21,ink,leading=26)
 d.text((20,785),'READ · THINK · DISCUSS',font=font(17),fill=ink)
 columns(d,body+' '+reading_note,16,819,w-32,h-829,17)
 im.paste(tile,(x,y))
# Bills still sample the supplied original KTX2, including its banknote island.
# Degree meshes also sample their ORIGINAL KTX2 unchanged.
im.save(out/'club-editorials.webp',quality=94,method=6)
