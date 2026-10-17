"""Original synthesized effects/score, no speech or third-party recordings.
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
# Four-beat, asymmetrical hoof strikes: dirt/wood transient, chest resonance,
# short scuff and small stereo/velocity variations rather than a metronome click.
a=np.zeros((int(SR*4.8),2));t=np.arange(int(.26*SR))/SR
for k in range(8):
 for j,offset in enumerate([0,.11,.245,.365]):
  start=k*.60+offset
  n=rng.normal(size=len(t));lp=np.convolve(n,np.ones(8)/8,mode='same')
  f=160+j*27+rng.uniform(-13,13)
  hoof=.45*np.sin(2*np.pi*f*t+1.1)*np.exp(-t*52)+.22*np.sin(2*np.pi*(f*2.73)*t)*np.exp(-t*78)
  hoof+=.6*(n-lp)*np.exp(-t*440)+.18*lp*np.exp(-t*29)+.34*np.sin(2*np.pi*72*t)*np.exp(-t*32)
  place(a,hoof,start,(-.4 if j%2 else .4),[.85,1,.72,1.15][j])
a*=np.minimum(np.arange(len(a))/700,1)[:,None]*np.minimum((len(a)-np.arange(len(a)))/5000,1)[:,None];save('intro-gallop',a)
# One violent initial crash, followed by bouncing, very short glass resonances.
a=np.zeros((int(SR*2.5),2));t=np.arange(int(.4*SR))/SR;n=rng.normal(size=len(t));burst=n*np.exp(-t*28)+.5*np.sin(2*np.pi*95*t)*np.exp(-t*38);place(a,burst,0,0,1.1)
for k in range(90):
 delay=rng.uniform(.012,.22) if k<50 else rng.uniform(.18,1.5);d=rng.uniform(.08,.65);t=np.arange(int(d*SR))/SR;f=rng.uniform(1700,10600)
 ping=(np.sin(2*np.pi*f*t)+.26*np.sin(2*np.pi*f*1.414*t))*np.exp(-t*rng.uniform(12,55));ping*=np.minimum(t*3000,1)
 place(a,ping,delay,rng.uniform(-.9,.9),rng.uniform(.025,.16)*(1-delay/2.1))
save('glass-impact',a)
# Restrained cinematic D-minor drone: detuned bow-like harmonics, a slow low
# pulse and sparse descending upper notes. Rendered as a 24s original loop.
duration=24;t=np.arange(int(SR*duration))/SR;a=np.zeros((len(t),2))
for ch in range(2):
 for f,amp in [(73.416,.35),(110,.13),(146.832,.18),(155.563,.035),(220,.06)]:
  drift=np.sin(t*.21+ch)*.8+np.sin(t*.09)*.35
  for h in range(1,7):
   phase=2*np.pi*(f*(1+(ch-.5)*.0012))*h*t+drift*h*.12
   a[:,ch]+=amp/h**1.65*np.sin(phase)*(.65+.12*np.sin(t*.26+h))
 a[:,ch]+=.07*np.sin(2*np.pi*36.708*t)*(np.sin(t*np.pi/1.5)**8)
for k,f in enumerate([293.664,277.183,220,207.652,293.664,277.183,220,146.832]):
 tt=np.arange(int(5*SR))/SR;s=(np.sin(2*np.pi*f*tt)+.25*np.sin(2*np.pi*f*2.01*tt))*np.exp(-tt*.95)*(1-np.exp(-tt*20))*.09
 place(a,s,k*3,rng.uniform(-.6,.6))
fade=np.minimum(t/.12,1)*np.minimum((duration-t)/.12,1);a*=fade[:,None];save('chapter-foreboding',a)
print('Rendered original gallop, glass and foreboding score:', [(p.name,p.stat().st_size) for p in out.glob('*.mp3')])
