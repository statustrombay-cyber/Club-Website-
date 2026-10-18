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
# Keep the original atlas layout, newspaper stock and shred UVs. Replace the
# promotional newspaper tiles with the club's existing psychology archive.
im=Image.open(work/'moneyShredsAtlas.png').convert('RGBA')
papers=[('Sigmund Freud','Dreams and the unconscious','1900','Freud made dreams and unconscious processes central to psychoanalytic thought. His historical influence invites discussion, not unquestioning agreement with every theory.'),('Carl Rogers','Person-centred therapy','1951','Rogers emphasised empathy, congruence and unconditional positive regard in the therapeutic relationship. Listening carefully remains a starting point for understanding another person.'),('William James','The stream of consciousness','1890','James helped shape early psychology by describing the changing flow of conscious experience. Attention and habit remain enduring questions.'),('Gratitude research','Small practices, thoughtful questions','2023','Diniz and colleagues reviewed 64 randomised trials of gratitude practices. Findings differ across studies. Evidence asks for careful interpretation.'),('Across cultures','Many lives, many contexts','2025','A gratitude meta-analysis included 24,804 participants in 28 countries. The average wellbeing effect was small. Context and individual experience matter.'),('Mindful Tattva','Stay curious. Stay human.','THE CLUB','Listen. Notice. Make room. A psychology club is a place to explore ideas, share experiences and keep asking thoughtful questions together.')]
boxes=[(0,0,492,912),(492,0,492,912),(982,0,492,912),(0,911,491,1137),(492,913,490,1135),(983,912,491,911)]
for (x,y,w,h),(who,title,year,body) in zip(boxes,papers):
 tile=Image.new('RGBA',(w,h),(213,208,181,255));d=ImageDraw.Draw(tile);d.rectangle((12,12,w-13,h-13),outline='#4c5144',width=2);d.text((25,25),'THE MINDFUL CHRONICLE',font=fit(d,'THE MINDFUL CHRONICLE',w-50,35),fill='#272e25');d.line((25,75,w-25,75),fill='#4c5144',width=2);d.text((25,90),year,font=font(20),fill='#394235');yy=para(d,who,25,130,w-50,49,'#1e261e');yy=para(d,title,25,yy+18,w-50,38,'#293329');d.line((25,yy+15,w-25,yy+15),fill='#4c5144');yy+=36
 para(d,body+' Psychology keeps asking new questions. A theory can shape a conversation without being the final word. '+body,25,yy,w-50,24,'#343d30',maxy=h-90)
 d.text((25,h-55),'Mindful Tattva · psychology archive',font=font(19),fill='#47503f');im.paste(tile,(x,y))
# Keep the supplied banknote island unchanged. Runtime bills use the original
# compressed KTX2, not this derived newspaper-only atlas.
im.save(out/'club-money-papers.webp',lossless=True)
# Replace fictional university credentials with real club archive articles;
# keep every original paper tile boundary, deformation, strip and camera path.
im=Image.open(work/'certAtlas.png').convert('RGBA');boxes=[(0,0),(658,0),(1316,0),(0,512),(0,1024),(0,1536),(658,1536),(1316,1536)]
for idx,(x,y) in enumerate(boxes):
 who,title,year,body=papers[idx%len(papers)];tile=Image.new('RGBA',(658,512),(224,219,195,255));d=ImageDraw.Draw(tile);d.rectangle((12,12,645,499),outline='#4c5144',width=2);d.text((28,23),'THE MINDFUL CHRONICLE',font=fit(d,'THE MINDFUL CHRONICLE',600,36),fill='#242d21');d.line((28,70,628,70),fill='#4c5144',width=2);d.text((28,84),year,font=font(19),fill='#394235');yy=para(d,who,28,120,600,43,'#293329');yy=para(d,title,28,yy+8,600,30,'#293329');para(d,body,28,yy+20,600,22,'#343d30',maxy=440);d.text((28,470),'Mindful Tattva · psychology archive',font=font(18),fill='#47503f');im.paste(tile,(x,y))
im.save(out/'club-archive.webp',lossless=True)
