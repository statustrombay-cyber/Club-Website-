"""Enhanced original recording: source cleanup -> motion compensation -> ESPCN x2.
Requires OpenCV contrib, Pillow/numpy, imageio-ffmpeg; production needs none.
Model: https://github.com/fannymonori/TF-ESPCN/blob/master/export/ESPCN_x2.pb
Download through GitHub API to an external path; pass ESPCN_MODEL=/path/model.pb.
No generated replacement face. Neural super-resolution is not recovered detail.
"""
from pathlib import Path
import importlib.util,subprocess,os,hashlib,tempfile,json
import imageio_ffmpeg
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('sequences',ROOT/'tools/build-frame-sequences.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
model=Path(os.environ['ESPCN_MODEL']);digest=hashlib.sha256(model.read_bytes()).hexdigest()
assert digest=='59f77351e1d7c0057bf6fe088b4a8a07e42c468c8c8aebb674a6b4ea1823221d'
sr=m.cv2.dnn_superres.DnnSuperResImpl_create();sr.readModel(str(model));sr.setModel('espcn',2)
raw=m.frames('animated (96).webp');cursor=m.cv2.cvtColor(raw[0][72:111,437:467],m.cv2.COLOR_RGB2GRAY)
clean=[m.flower_clean(a,i,cursor) for i,a in enumerate(raw[:40])]
ff=imageio_ffmpeg.get_ffmpeg_exe();out=ROOT/'assets/media/flower-scroll.mp4'
with tempfile.TemporaryDirectory(prefix='flower-build-') as tmp:
    intermediate=Path(tmp)/'smooth.mkv'
    cmd=[ff,'-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','640x478','-r','12','-i','pipe:0','-vf','minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1:me=hexbs:search_param=24','-t','3.333333','-c:v','ffv1',str(intermediate)]
    p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    for a in clean+[clean[-1]]*4:p.stdin.write(a.tobytes())
    p.stdin.close();assert p.wait()==0
    cmd=[ff,'-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1280x956','-r','60','-i','pipe:0','-an','-c:v','libx264','-preset','slow','-crf','18','-g','6','-keyint_min','6','-bf','0','-pix_fmt','yuv420p','-movflags','+faststart',str(out)]
    p=subprocess.Popen(cmd,stdin=subprocess.PIPE);source=imageio_ffmpeg.read_frames(str(intermediate));next(source);count=0
    for data in source:
        a=m.np.frombuffer(data,dtype='uint8').reshape(478,640,3)
        enhanced=sr.upsample(m.cv2.cvtColor(a,m.cv2.COLOR_RGB2BGR))
        p.stdin.write(m.cv2.cvtColor(enhanced,m.cv2.COLOR_BGR2RGB).tobytes());count+=1
    p.stdin.close();assert p.wait()==0
assert count==200 and out.stat().st_size<10000000
# Matching enhanced initial poster; no poster -> video resolution/colour jump.
poster=sr.upsample(m.cv2.cvtColor(clean[0],m.cv2.COLOR_RGB2BGR))
m.Image.fromarray(m.cv2.cvtColor(poster,m.cv2.COLOR_BGR2RGB)).save(ROOT/'assets/media/flower-poster.webp',quality=94,method=6)
(ROOT/'assets/media/flower-enhancement.json').write_text(json.dumps({'width':1280,'height':956,'frames':count,'fps':60,'duration':count/60,'sourceFrames':[0,39],'sourceSha256':hashlib.sha256((ROOT/'animated (96).webp').read_bytes()).hexdigest(),'upscale':'ESPCN x2 neural super-resolution','modelSha256':digest,'motion':'FFmpeg motion-compensated interpolation; not AI-generated poses','rasterCardText':False},indent=2)+'\n')
print('Enhanced:',count,'frames, 1280×956, 60fps;',out.stat().st_size,'bytes')
