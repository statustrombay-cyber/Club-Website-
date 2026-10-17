"""Bake eight caption-free painted hand poses from user HD part 01.
Usage: python tools/references/bake-hand-poses.py /outside/part-01.mp4 /outside/old-hand.webp
Recover old alpha matte from 6d7aa13:assets/story/hand.webp; source clips stay outside runtime.
Optical flow transfers the manually traced matte; SIFT registers the original crop.
"""
import cv2,numpy as np
from PIL import Image
import sys
from pathlib import Path
study=Path(sys.argv[3]) if len(sys.argv)>3 else Path(sys.argv[1]).parent
study.mkdir(parents=True,exist_ok=True)
old=np.array(Image.open(sys.argv[2]).convert('RGBA'));v=cv2.VideoCapture(sys.argv[1])
def get(t):
 v.set(cv2.CAP_PROP_POS_MSEC,t*1000);ok,bgr=v.read();assert ok
 hsv=cv2.cvtColor(bgr,cv2.COLOR_BGR2HSV);m=((hsv[:,:,1]<75)&(hsv[:,:,2]>140)).astype('uint8')*255;m[:1030]=0;m[1510:]=0;m[:,:220]=0
 return cv2.inpaint(bgr,cv2.dilate(m,np.ones((3,3),np.uint8)),5,cv2.INPAINT_TELEA)
base=get(.65);sift=cv2.SIFT_create();k1,d1=sift.detectAndCompute(cv2.cvtColor(old[:,:,:3],cv2.COLOR_RGB2GRAY),(old[:,:,3]>230).astype('uint8')*255);k2,d2=sift.detectAndCompute(cv2.cvtColor(base,cv2.COLOR_BGR2GRAY),None)
matches=cv2.BFMatcher().knnMatch(d1,d2,k=2);good=[a for a,b in matches if a.distance<.65*b.distance];print('Matches',len(good))
p1=np.float32([k1[m.queryIdx].pt for m in good]);p2=np.float32([k2[m.trainIdx].pt for m in good]);M,inliers=cv2.estimateAffinePartial2D(p1,p2);print(M,'inliers',inliers.sum());mask=cv2.warpAffine(old[:,:,3],M,(base.shape[1],base.shape[0]));cv2.imwrite(str(study/'reg-mask.png'),mask)
roi=(slice(560,2180),slice(320,1080));base=base[roi];mask=mask[roi];small=(380,810);bg=cv2.resize(cv2.cvtColor(base,cv2.COLOR_BGR2GRAY),small);bm=cv2.resize(mask,small);frames=[]
for t in [0,.08,.16,.24,.32,.40,.48,.56]:
 f=get(t)[roi];gray=cv2.resize(cv2.cvtColor(f,cv2.COLOR_BGR2GRAY),small);flow=cv2.calcOpticalFlowFarneback(gray,bg,None,.5,5,31,6,7,1.5,0);xx,yy=np.meshgrid(np.arange(small[0],dtype=np.float32),np.arange(small[1],dtype=np.float32));alpha=cv2.remap(bm,xx+flow[:,:,0],yy+flow[:,:,1],cv2.INTER_LINEAR)
 alpha=cv2.resize(alpha,(f.shape[1],f.shape[0]));alpha=cv2.GaussianBlur(alpha,(3,3),.6);alpha=(alpha.astype(float)*np.minimum((len(alpha)-np.arange(len(alpha)))/150,1)[:,None]).astype('uint8');im=Image.fromarray(np.dstack([cv2.cvtColor(f,cv2.COLOR_BGR2RGB),alpha])).resize((380,810),Image.Resampling.LANCZOS);frames.append(im)
atlas=Image.new('RGBA',(1520,1620));proof=Image.new('RGB',(1520,810),'#430b08')
for i,im in enumerate(frames):atlas.paste(im,((i%4)*380,(i//4)*810))
for i,im in enumerate(frames[::2]):proof.paste(im,(i*380,0),im)
atlas.save('assets/story/hand-painted-poses.webp',quality=88,method=6);proof.save(study/'painted-poses.jpg')
