"""One fast-start, all-intra H264 file from ORIGINAL recorded frames.
No optical-flow synthesis or crossfades. Python tooling is not deployed.
"""
from pathlib import Path
import importlib.util, subprocess
import imageio_ffmpeg
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('sequences',ROOT/'tools/build-frame-sequences.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
raw=m.frames('animated (96).webp')
cursor=m.cv2.cvtColor(raw[0][72:111,437:467],m.cv2.COLOR_RGB2GRAY)
out=ROOT/'assets/media/flower-scroll.mp4'
cmd=[imageio_ffmpeg.get_ffmpeg_exe(),'-y','-f','rawvideo','-pix_fmt','rgb24','-s','640x478','-r','12','-i','pipe:0','-an','-c:v','libx264','-preset','slow','-crf','15','-g','1','-pix_fmt','yuv420p','-movflags','+faststart',str(out)]
p=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=subprocess.PIPE)
for i,a in enumerate(raw[:40]):p.stdin.write(m.flower_clean(a,i,cursor).tobytes())
p.stdin.close();error=p.stderr.read();assert p.wait()==0,error.decode()
print('Built original 40 frames, 640×478, 12fps, all-intra, no flow blending:',out.stat().st_size,'bytes')
