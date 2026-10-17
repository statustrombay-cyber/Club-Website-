"""Retained synthesized glass cue only, no music or other effects.
Run with numpy + imageio-ffmpeg. Seeded rendering makes the assets reproducible.
"""
import numpy as np, wave, subprocess, pathlib
from imageio_ffmpeg import get_ffmpeg_exe
SR=44100;rng=np.random.default_rng(17026);out=pathlib.Path('assets/audio');out.mkdir(exist_ok=True)
def place(dst,sample,t,pan=0,gain=1):
 i=int(t*SR);n=min(len(sample),len(dst)-i)
 if n>0: dst[i:i+n,0]+=sample[:n]*np.sqrt((1-pan)/2)*gain;dst[i:i+n,1]+=sample[:n]*np.sqrt((1+pan)/2)*gain
def save(name,a):
 peak=np.max(np.abs(a));a=np.tanh(a/(peak or 1)*1.3)*.80
 p=pathlib.Path('/tmp/'+name+'.wav')
 with wave.open(str(p),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((a*32767).astype('<i2').tobytes())
 subprocess.run([get_ffmpeg_exe(),'-hide_banner','-loglevel','error','-y','-i',str(p),'-codec:a','libmp3lame','-q:a','4',str(out/(name+'.mp3'))],check=True);p.unlink()
# Preserve the retained cue's seeded noise sequence from the original authoring
# run without rendering or writing any of the removed intro/music assets.
for _ in range(32):rng.normal(size=int(.26*SR));rng.uniform(-13,13)
# One violent initial crash, followed by bouncing, very short glass resonances.
a=np.zeros((int(SR*2.5),2));t=np.arange(int(.4*SR))/SR;n=rng.normal(size=len(t));burst=n*np.exp(-t*28)+.5*np.sin(2*np.pi*95*t)*np.exp(-t*38);place(a,burst,0,0,1.1)
for k in range(90):
 delay=rng.uniform(.012,.22) if k<50 else rng.uniform(.18,1.5);d=rng.uniform(.08,.65);t=np.arange(int(d*SR))/SR;f=rng.uniform(1700,10600)
 ping=(np.sin(2*np.pi*f*t)+.26*np.sin(2*np.pi*f*1.414*t))*np.exp(-t*rng.uniform(12,55));ping*=np.minimum(t*3000,1)
 place(a,ping,delay,rng.uniform(-.9,.9),rng.uniform(.025,.16)*(1-delay/2.1))
save('glass-impact',a)
print('Rendered glass-impact.mp3 only')
