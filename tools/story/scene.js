import * as T from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { newspaper } from './paper.js';
import { jaggedShape, shapeWithUV, shredGeometry } from './geometry.js';
import { paperVertex, paperFragment, billVertex, billFragment } from './shaders.js';
const clamp=T.MathUtils.clamp,mix=T.MathUtils.lerp;
const smooth=(a,b,x)=>{const u=clamp((x-a)/(b-a),0,1);return u*u*(3-2*u);};
const rand=n=>{const r=Math.sin(n*127.1+31.7)*43758.5453;return r-Math.floor(r);};
const textureCanvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
const announce=(type,detail)=>window.dispatchEvent(new CustomEvent(type,{detail}));
const loadImage=src=>new Promise((resolve,reject)=>{const im=new Image(),timer=setTimeout(()=>reject(Error('Illustration timed out')),8000);im.onload=async()=>{try{if(im.decode)await im.decode();clearTimeout(timer);resolve(im);}catch(e){clearTimeout(timer);reject(e);}};im.onerror=()=>{clearTimeout(timer);reject(Error('Illustration unavailable'));};im.src=src;});
const canvasTexture=c=>{const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t;};


window.MTStory3D={async create(root){
 const track=root.querySelector('.story-track'),stage=root.querySelector('.story-stage'),canvas=root.querySelector('.story-canvas');
 const words=[...root.querySelector('.story-type').children];
 let renderer;
 try{renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:false});}catch(e){throw Error('WebGL unavailable');}
 const gl=renderer.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info'),software=debug&&/swiftshader|llvmpipe|software/i.test(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL));renderer.transmissionResolutionScale=.5;
 renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.setClearColor(0x030807,1);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(43,1,.06,220);camera.position.z=12;
 scene.add(new T.HemisphereLight(0xffdfc1,0x250305,.4));
 const key=new T.DirectionalLight(0xffe1c0,1.4);key.position.set(-4,6,12);scene.add(key);
 const rim=new T.DirectionalLight(0xff3b14,1.8);rim.position.set(4,2,-3);scene.add(rim);
 const fill=new T.DirectionalLight(0xc0e4ff,.35);fill.position.set(4,0,6);scene.add(fill);
 const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
 const bloom=new UnrealBloomPass(new T.Vector2(512,512),.18,.35,1.5);composer.addPass(bloom);composer.addPass(new OutputPass());
 let disposed=false,frame=0,visible=false,last=0,time=0,p=0,W=1,H=1,mobile=false;
 let impactStart=-1,impactFired=false,ready=false,measureNeeded=true,resizeNeeded=true,lastInput=performance.now();
 const cleanup=[],motion=matchMedia('(prefers-reduced-motion: reduce)');
 const on=(target,name,fn,options)=>{target.addEventListener(name,fn,options);cleanup.push(()=>target.removeEventListener(name,fn,options));};
 const objects={glass:new T.Group(),money:new T.Group(),paper:new T.Group(),hand:new T.Group()};Object.values(objects).forEach(g=>scene.add(g));
 
 const [noteImage,curtainImage,rogers,james,handImage]=await Promise.all(['/assets/reference/assets/textures/original-banknote.webp','/assets/story/velvet-curtain.webp','/assets/story/rogers-engraving.webp','/assets/story/james-engraving.webp','/assets/story/hand-painted-poses.webp'].map(loadImage)).catch(e=>{composer.dispose();renderer.dispose();throw e;});
 if(disposed)throw Error('Scene was disposed while loading');
 const curtains=canvasTexture(curtainImage),green=textureCanvas(32,64),gg=green.getContext('2d'),gradient=gg.createRadialGradient(16,27,2,16,32,38);gradient.addColorStop(0,'#183d2c');gradient.addColorStop(.5,'#071e14');gradient.addColorStop(1,'#010503');gg.fillStyle=gradient;gg.fillRect(0,0,32,64);
 const greenTexture=canvasTexture(green);scene.background=curtains;
 const portraits=[rogers,james],paperTextures=[...root.querySelectorAll('[data-story-paper]')].map((article,i)=>canvasTexture(newspaper(article,i,noteImage,portraits)));
 const noteTexture=canvasTexture(noteImage);

 // Baked painted poses extracted from the user's HD footage. No generic XR
 // glove, synthetic finger jitter or mouse/gyro shake. A shallow relief mesh
 // keeps the artwork in the depth scene while preserving its original light.
 const handTexture=canvasTexture(handImage),handUniforms={uMap:{value:handTexture},uPose:{value:0},uPale:{value:0}};
 const handShape=new T.PlaneGeometry(3.5,7.46,16,32),handPos=handShape.attributes.position;
 for(let i=0;i<handPos.count;i++){const x=handPos.getX(i),y=handPos.getY(i);handPos.setZ(i,Math.sin((x/3.5+.5)*Math.PI)*Math.sin((y/7.46+.5)*Math.PI)*.22);}
 const hand=new T.Mesh(handShape,new T.ShaderMaterial({uniforms:handUniforms,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`uniform sampler2D uMap;uniform float uPose,uPale;varying vec2 vUv;
 vec4 pose(float i){vec2 tile=vec2(mod(i,4.),1.-floor(i/4.));return texture2D(uMap,(vUv+tile)/vec2(4.,2.));}
 void main(){float i=floor(uPose);vec4 a=pose(i),b=pose(min(7.,i+1.));float f=fract(uPose),alpha=mix(a.a,b.a,f);if(alpha<.025)discard;vec3 c=mix(a.rgb*a.a,b.rgb*b.a,f)/max(alpha,.001);c=mix(c,vec3(dot(c,vec3(.3,.59,.11)))*1.1,uPale);gl_FragColor=vec4(c,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}));objects.hand.add(hand);

 const glassMaterial=new T.MeshPhysicalMaterial({color:0xffffff,metalness:0,roughness:.018,transmission:1,thickness:.028,ior:1.51,transparent:true,opacity:1,envMapIntensity:0,side:T.DoubleSide,depthWrite:false});
 const labels=[],chips=[];
 const intactPane=new T.Mesh(new T.PlaneGeometry(20,20),glassMaterial.clone());intactPane.material.envMapIntensity=.12;intactPane.position.z=6;objects.glass.add(intactPane);
 function labelTexture(article){
  const c=textureCanvas(1024,720),g=c.getContext('2d');g.textAlign='center';g.fillStyle='#fff9ee';g.shadowColor='#180707';g.shadowBlur=3;g.shadowOffsetY=1;
  const title=article.querySelector('h2,h3'),message=article.classList.contains('story-shard-message');
  const lines=title.innerText.trim().split('\n');g.font='400 '+(message?142:188)+'px "Story Bodoni",Georgia';
  const y=message?260:280;lines.forEach((line,i)=>g.fillText(line,512,y+i*(message?139:120),800));
  const body=article.querySelector('p');if(body){g.font='400 62px "Story Bodoni",Georgia';let yy=message?540:410;body.innerText.split('\n').forEach(line=>{g.fillText(line,512,yy,760);yy+=66;});}
  const note=article.querySelector('.story-shard-note');if(note){g.font='400 29px sans-serif';const words=note.innerText.split(/\s+/);let line='',yy=570;for(const word of words){const test=line+' '+word;if(g.measureText(test).width>760&&line){g.fillText(line,512,yy);line=word;yy+=40;}else line=test;}g.fillText(line,512,yy);}
  return canvasTexture(c);
 }
 [...root.querySelectorAll('.story-shard')].forEach((article,i)=>{
  const shape=jaggedShape(i),group=new T.Group(),plate=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:.044,bevelEnabled:true,bevelThickness:.010,bevelSize:.009,bevelSegments:2,steps:1,curveSegments:1}),glassMaterial);
  group.add(plate);const ink=new T.Mesh(shapeWithUV(shape),new T.MeshBasicMaterial({map:labelTexture(article),transparent:true,depthWrite:false,side:T.DoubleSide,toneMapped:false}));ink.position.z=.058;ink.renderOrder=3;group.add(ink);
  const edges=new T.LineSegments(new T.EdgesGeometry(plate.geometry,28),new T.LineBasicMaterial({color:0xfcebe0,transparent:true,opacity:.65}));group.add(edges);
  group.position.z=6-i*5;group.userData.index=i;objects.glass.add(group);labels.push(group);
 });
 for(let i=0;i<24;i++){
  const shape=new T.Shape(),r=.07+rand(i*4)*.21;shape.moveTo(-r,-r*.7);shape.lineTo(r*.8,-r*.2);shape.lineTo(r*.2,r);shape.lineTo(-r*.6,r*.3);shape.closePath();
  const mesh=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:true,bevelSize:.004,bevelThickness:.005,bevelSegments:1}),glassMaterial);objects.glass.add(mesh);chips.push(mesh);
 }
 // Four individual American-dollar art notes with surface curl and multi-edge
 // procedural burning. The camera approaches them; they do not scroll upward.
 const bills=[];
 for(let i=0;i<4;i++){
  const uniforms={uTime:{value:0},uSeed:{value:i*2.1},uMap:{value:noteTexture},uBurn:{value:0},uOpacity:{value:1}};
  const material=new T.ShaderMaterial({uniforms,vertexShader:billVertex,fragmentShader:billFragment,side:T.DoubleSide,transparent:true});
  const mesh=new T.Mesh(new T.PlaneGeometry(3.9,1.66,36,14),material);mesh.rotation.set([.28,-.3,.2,-.12][i],[.16,-.27,.2,-.1][i],[-.22,.38,-.43,.1][i]);mesh.position.set([-.25,1.1,-1.15,.3][i],[.15,1.55,-1.7,-.25][i],[-2,-8,-14,-20][i]);objects.money.add(mesh);bills.push(mesh);
 }
 const emberGeometry=new T.BufferGeometry(),emberPositions=new Float32Array(110*3);emberGeometry.setAttribute('position',new T.BufferAttribute(emberPositions,3));
 const embers=new T.Points(emberGeometry,new T.ShaderMaterial({uniforms:{uOpacity:{value:0}},transparent:true,depthWrite:false,blending:T.AdditiveBlending,vertexShader:'varying float vDepth;void main(){vec4 p=modelViewMatrix*vec4(position,1.);vDepth=-p.z;gl_PointSize=clamp(24./max(1.,vDepth),1.,8.);gl_Position=projectionMatrix*p;}',fragmentShader:'uniform float uOpacity;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(5.,1.5,.08,pow(1.-d*2.,2.)*uOpacity);}'}));objects.money.add(embers);
 // Dozens of original newspaper pages fill a deep corridor. Every page is a
 // connected sheet at rest, becoming sixteen independently waving long strips.
 const pages=[],geometry=shredGeometry(24,28),pageCount=matchMedia('(max-width: 600px)').matches?52:76;
 for(let i=0;i<pageCount;i++){
  const seed=i*1.71;
  const uniforms={uMap:{value:paperTextures[i%paperTextures.length]},uTime:{value:0},uTear:{value:0},uSeed:{value:seed},uOpacity:{value:1}};
  const material=new T.ShaderMaterial({uniforms,vertexShader:paperVertex,fragmentShader:paperFragment,side:T.DoubleSide,transparent:true});
  const mesh=new T.Mesh(geometry,material);mesh.userData={seed,size:1.1+rand(i*5)*1.4,x:(rand(i*13+7)-.5)*11,y:(rand(i*17+3)-.5)*9,z:-35-rand(i*19+9)*95,rx:(rand(i*23)-.5)*1.7,ry:(rand(i*29)-.5)*2.1,rz:(rand(i*31)-.5)*6.28};objects.paper.add(mesh);pages.push(mesh);
 }
 const backdrop=new T.Mesh(new T.PlaneGeometry(2,2),new T.ShaderMaterial({uniforms:{uCurtain:{value:curtains},uGreen:{value:greenTexture},uBlend:{value:0}},depthWrite:false,depthTest:false,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,.999,1.);}',fragmentShader:'uniform sampler2D uCurtain,uGreen;uniform float uBlend;varying vec2 vUv;void main(){gl_FragColor=mix(texture2D(uCurtain,vUv),texture2D(uGreen,vUv),uBlend);}'}));backdrop.frustumCulled=false;backdrop.renderOrder=-100;scene.add(backdrop);scene.background=null;
 function resize(){resizeNeeded=true;measureNeeded=true;schedule();}
 function applyResize(){
  resizeNeeded=false;const w=Math.max(1,stage.clientWidth),h=Math.max(1,stage.clientHeight),small=w<600,dpr=software?(small?.85:.5):Math.min(devicePixelRatio||1,1.25);
  if(w===W&&h===H&&renderer.getPixelRatio()===dpr)return false;
  W=w;H=h;mobile=small;bloom.enabled=!software&&!mobile;
  // Changing backing dimensions clears WebGL. Do it only on real size changes
  // and inside the SAME frame that redraws, never on every URL-bar event.
  if(renderer.getPixelRatio()!==dpr){renderer.setPixelRatio(dpr);composer.setPixelRatio(dpr);}
  renderer.setSize(W,H,false);composer.setSize(W,H);camera.aspect=W/H;camera.fov=mobile?43:37;camera.updateProjectionMatrix();measureNeeded=true;return true;
 }
 function measure(){const r=track.getBoundingClientRect();visible=r.top<innerHeight&&r.bottom>0;p=clamp(-r.top/Math.max(1,track.offsetHeight-H),0,1);measureNeeded=false;}
 function cameraRail(progress){
  // The original glass chapter is a vertical scroll. Only money/paper travel
  // forward through the lens; do not force the entire story down one Z rail.
  if(progress<.375)return 12;
  if(progress<.60)return mix(12,-26,smooth(.375,.60,progress));
  return mix(-26,-114,smooth(.64,.99,progress));
 }
 function updateHand(now){
  objects.hand.visible=p<.395;
  const elapsed=impactStart<0?0:clamp((now-impactStart)/350,0,1),raise=1-Math.pow(1-elapsed,3),retire=smooth(.29,.39,p);
  objects.hand.position.set(mobile?.12:.6,mix(-9.5,-1.72,raise)-retire*.9,3+Math.sin(elapsed*Math.PI)*1.1-retire*1.0);
  objects.hand.rotation.set(0,mix(-.06,.10,retire),mix(-.15,0,raise));objects.hand.scale.setScalar(mix(1,.78,retire));
  handUniforms.uPose.value=smooth(.09,.30,p)*7;handUniforms.uPale.value=retire*.9;
 }
 function updateGlass(now){
  objects.glass.visible=p<.40;
  const burst=impactStart<0?0:1-Math.pow(1-clamp((now-impactStart-150)/220,0,1),3);intactPane.visible=impactStart<0||now-impactStart<155;
  const vertical=smooth(.11,.365,p)*22;
  labels.forEach((g,i)=>{
   g.position.set((i%2?-.32:.30)*(mobile?1:2.8),.35-i*3.85+vertical,6.1-(i%3)*.15);
   g.rotation.set(i%2?-.09:.07,i%2?.15:-.12,i%2?-.12:.10);
   g.scale.setScalar(mobile?.96:1.18);g.visible=burst>.03&&Math.abs(g.position.y)<6.3;g.children[1].material.opacity=1-smooth(3.7,6.3,Math.abs(g.position.y));
  });
  chips.forEach((mesh,i)=>{
   const a=i*2.399963,r=1.3+rand(i*8)*3.6;mesh.visible=burst>.01;
   mesh.position.set(Math.cos(a)*r*burst,Math.sin(a)*r*burst+vertical*.28,5.7-rand(i*3)*3.5);
   mesh.rotation.set(i+burst*1.8,i*1.6+burst*2,i*.73+burst);mesh.scale.setScalar(mobile?1:1.6);
  });
 }
 function updateMoney(){
  objects.money.visible=p>.355&&p<.585;
  bills.forEach((bill,i)=>{
   const u=bill.material.uniforms;u.uTime.value=time;u.uBurn.value=smooth(.405+i*.012,.555+i*.004,p);u.uOpacity.value=smooth(.355,.39,p)*(1-smooth(.56,.585,p));
   bill.scale.setScalar(mobile?1:1.55);bill.rotation.y=[.16,-.27,.2,-.1][i]+Math.sin(time*.23+i)*.09;bill.rotation.x=[.28,-.3,.2,-.12][i]+Math.sin(time*.31+i)*.06;
  });
  const a=emberGeometry.attributes.position;
  for(let i=0;i<110;i++){const d=(time*.22+rand(i*17))%1;a.setXYZ(i,(rand(i*8)-.5)*(mobile?4:9)+Math.sin(time+i)*.08,(rand(i*7)-.5)*5+d*1.8,-1-rand(i*11)*20);}
  a.needsUpdate=true;embers.material.uniforms.uOpacity.value=smooth(.405,.46,p)*(1-smooth(.55,.585,p));
 }
 function updatePapers(){
  objects.paper.visible=p>.615&&p<.999;
  const flight=smooth(.62,.97,p)*4.3;
  pages.forEach((page,i)=>{
   const d=page.userData,age=Math.max(0,flight-rand(i*37)*.8),throwSpeed=1.8+rand(i*41)*2.6;
   // Independent thrown sheets, not a ring/grid/corridor. Several cross the
   // optical axis and pass above/beside the camera at unrelated depths.
   page.position.set(d.x*(mobile?.48:1.45)+Math.sin(age*1.2+d.seed)*.45,d.y-2+throwSpeed*age-.52*age*age,d.z+age*(1+rand(i*43)*2));
   page.rotation.set(d.rx+age*.22*Math.sin(d.seed),d.ry+age*.26*Math.cos(d.seed),d.rz+age*(rand(i*47)-.5)*.35);
   page.scale.setScalar(d.size*(mobile?1:1.45));
   const distance=camera.position.z-page.position.z;
   page.material.uniforms.uTear.value=smooth(.70+rand(i*53)*.055,.88+rand(i*59)*.04,p)*1.42*(1-smooth(5,22,distance));
   page.material.uniforms.uTime.value=time;page.material.uniforms.uOpacity.value=smooth(.615,.68,p)*(1-smooth(.97,.998,p))*smooth(.5,1.6,distance);
   page.visible=distance>.5&&distance<100;
  });
 }
 function render(now){
  frame=0;if(disposed||document.hidden)return;
  const resized=resizeNeeded?applyResize():false,changed=measureNeeded;
  if(measureNeeded)measure();
  if(!visible){document.body.classList.remove('in-psychology-story');last=0;return;}
  document.body.classList.add('in-psychology-story');
  if(!resized&&!changed&&now-last<(software?50:(now-lastInput<1000?16:33))){schedule();return;}
  const dt=last?Math.min(now-last,100):33;last=now;time+=dt/1000;
  if(p<.042){impactStart=-1;impactFired=false;}
  if(p>=.063&&impactStart<0){impactStart=p>.13?now-800:now;}
  const cue=impactStart>=0&&!impactFired&&now-impactStart>=155;
  if(cue)impactFired=true;
  camera.position.set(0,0,cameraRail(p));camera.lookAt(0,0,camera.position.z-12);
  const greenMix=smooth(.325,.39,p);backdrop.material.uniforms.uBlend.value=greenMix;
  // The full-frame background shader crossfades curtain to green without a pale intermediary frame.
  key.position.z=camera.position.z+5;rim.position.z=camera.position.z-5;fill.position.z=camera.position.z+3;
  key.intensity=mix(1.4,1.1,greenMix);rim.color.set(greenMix>.5?0x749c70:0xff3b14);
  updateHand(now);updateGlass(now);updateMoney();updatePapers();
  words.forEach((word,i)=>{const enter=smooth([.49,.545,.59][i],[.535,.59,.65][i],p),leave=smooth(.705,.755,p);word.style.opacity=(enter*(1-leave)).toFixed(3);word.style.transform='translateZ(0) scale('+mix(.88,1.14,smooth(.49,.75,p)).toFixed(3)+')';});
  const phase=p<.385?'glass':p<.58?'freud':p<.71?'human':p<.965?'newspaper':'herd';root.dataset.storyPhase=phase;root.dataset.cameraZ=camera.position.z.toFixed(3);root.dataset.handYaw=objects.hand.rotation.y.toFixed(4);root.dataset.glassX=labels[0].position.x.toFixed(4);root.dataset.factY=labels[0].position.y.toFixed(4);root.dataset.stripCount='24';root.dataset.pageCount=String(pages.length);root.dataset.renderFrame=String(renderer.info.render.frame);root.dataset.billCount='4';root.style.setProperty('--story-progress',p.toFixed(5));
  canvas.style.opacity=(1-smooth(.945,.998,p)).toFixed(4);
  if(phase==='herd')document.body.classList.remove('is-black-chapter');
  try{composer.render();}catch(_){root.dispatchEvent(new CustomEvent('mt:story-fallback'));return;}
  if(cue&&p<.14)announce('mt:glass-impact',{progress:p});
  if(p<.999&&(p>=.385||impactStart>=0&&now-impactStart<450))schedule();
 }
 function schedule(){if(ready&&!frame&&!disposed&&!document.hidden)frame=requestAnimationFrame(render);}
 on(window,'scroll',()=>{lastInput=performance.now();measureNeeded=true;schedule();},{passive:true});
 on(window,'resize',resize,{passive:true});if(window.visualViewport)on(window.visualViewport,'resize',resize,{passive:true});
 on(document,'visibilitychange',()=>{last=0;measureNeeded=true;if(!document.hidden)schedule();});
 on(canvas,'webglcontextlost',e=>{e.preventDefault();root.dispatchEvent(new CustomEvent('mt:story-fallback'));});
 const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;if(observer)observer.observe(stage);
 function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);cleanup.forEach(fn=>fn());if(observer)observer.disconnect();document.body.classList.remove('in-psychology-story');scene.traverse(n=>{if(n.geometry)n.geometry.dispose();if(n.material){for(const m of [].concat(n.material))m.dispose();}});[curtains,greenTexture,noteTexture,...paperTextures,handTexture].forEach(t=>t.dispose());composer.dispose();renderer.dispose();canvas.style.removeProperty('opacity');}
 applyResize();measure();scene.updateMatrixWorld(true);
 // Warm decoded images/atlases individually before the chapter is visible.
 // Program compilation alone does not upload textures; first-frame uploads
 // were otherwise blocking the impact even after the engine had downloaded.
 for(const texture of [curtains,greenTexture,noteTexture,handTexture,...paperTextures,...labels.map(g=>g.children[1].material.map)]){
  await new Promise(resolve=>requestAnimationFrame(()=>{if(!disposed)renderer.initTexture(texture);resolve();}));
 }

 let compileTimer;try{await Promise.race([renderer.compileAsync(scene,camera),new Promise((_,reject)=>{compileTimer=setTimeout(()=>reject(Error('Shader compilation timed out')),12000);})]);}catch(error){dispose();throw error;}finally{clearTimeout(compileTimer);}
 root.classList.remove('story-pending');root.classList.add('story-enhanced');root.dataset.storyRenderer='webgl';ready=true;resize();measure();schedule();
 return {dispose,renderer:'webgl'};
}};
