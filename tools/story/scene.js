import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { newspaper } from './paper.js';
import { jaggedShape, shapeWithUV, armGeometry, shredGeometry } from './geometry.js';
import { paperVertex, paperFragment, billVertex, billFragment } from './shaders.js';
const clamp=T.MathUtils.clamp,mix=T.MathUtils.lerp;
const smooth=(a,b,x)=>{const u=clamp((x-a)/(b-a),0,1);return u*u*(3-2*u);};
const rand=n=>{const r=Math.sin(n*127.1+31.7)*43758.5453;return r-Math.floor(r);};
const textureCanvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
const announce=(type,detail)=>window.dispatchEvent(new CustomEvent(type,{detail}));
const loadImage=src=>new Promise((resolve,reject)=>{const im=new Image(),timer=setTimeout(()=>reject(Error('Illustration timed out')),8000);im.onload=()=>{clearTimeout(timer);resolve(im);};im.onerror=()=>{clearTimeout(timer);reject(Error('Illustration unavailable'));};im.src=src;});
const canvasTexture=c=>{const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t;};
const gltfLoad=src=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Hand model timed out')),8000);new GLTFLoader().load(src,g=>{clearTimeout(timer);resolve(g);},null,e=>{clearTimeout(timer);reject(e);});});

window.MTStory3D={async create(root){
 const track=root.querySelector('.story-track'),stage=root.querySelector('.story-stage'),canvas=root.querySelector('.story-canvas');
 const words=[...root.querySelector('.story-type').children];
 let renderer;
 try{renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:false});}catch(e){throw Error('WebGL unavailable');}
 const gl=renderer.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info'),software=debug&&/swiftshader|llvmpipe|software/i.test(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL));renderer.transmissionResolutionScale=.5;
 renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.setClearColor(0x030807,1);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(43,1,.06,220);camera.position.z=12;
 const pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment(),environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
 scene.add(new T.HemisphereLight(0xffdfc1,0x250305,.4));
 const key=new T.DirectionalLight(0xffe1c0,1.4);key.position.set(-4,6,12);scene.add(key);
 const rim=new T.DirectionalLight(0xff3b14,1.8);rim.position.set(4,2,-3);scene.add(rim);
 const fill=new T.DirectionalLight(0xc0e4ff,.35);fill.position.set(4,0,6);scene.add(fill);
 const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
 const bloom=new UnrealBloomPass(new T.Vector2(512,512),.18,.35,1.5);composer.addPass(bloom);composer.addPass(new OutputPass());
 let disposed=false,frame=0,visible=false,last=0,time=0,p=0,W=1,H=1,mobile=false,lastAudio=-1;
 let impactStart=-1,impactFired=false,ready=false,measureNeeded=true,tiltX=0,tiltY=0,aimX=0,aimY=0,scrollSway=0,lastScroll=scrollY,lastInput=performance.now();
 const cleanup=[],motion=matchMedia('(prefers-reduced-motion: reduce)');
 const on=(target,name,fn,options)=>{target.addEventListener(name,fn,options);cleanup.push(()=>target.removeEventListener(name,fn,options));};
 const objects={glass:new T.Group(),money:new T.Group(),paper:new T.Group(),hand:new T.Group()};Object.values(objects).forEach(g=>scene.add(g));
 
 const [handFile,noteImage,curtainImage,rogers,james,skinImage]=await Promise.all([gltfLoad('/assets/story/hand-rig.glb'),loadImage('/assets/story/freud-note.webp'),loadImage('/assets/story/velvet-curtain.webp'),loadImage('/assets/story/rogers-engraving.webp'),loadImage('/assets/story/james-engraving.webp'),loadImage('/assets/story/hand-skin.webp')]).catch(e=>{composer.dispose();renderer.dispose();environment.dispose();throw e;});
 if(disposed)throw Error('Scene was disposed while loading');
 const curtains=canvasTexture(curtainImage),green=textureCanvas(32,64),gg=green.getContext('2d'),gradient=gg.createRadialGradient(16,27,2,16,32,38);gradient.addColorStop(0,'#183d2c');gradient.addColorStop(.5,'#071e14');gradient.addColorStop(1,'#010503');gg.fillStyle=gradient;gg.fillRect(0,0,32,64);
 const greenTexture=canvasTexture(green);scene.background=curtains;
 const portraits=[rogers,james],paperTextures=[...root.querySelectorAll('[data-story-paper]')].map((article,i)=>canvasTexture(newspaper(article,i,noteImage,portraits)));
 const noteTexture=canvasTexture(noteImage);

 // Real skinned hand. The WebXR asset stores its joints as siblings; attach
 // them into anatomical chains while preserving their bind-space transforms.
 const model=handFile.scene;model.updateMatrixWorld(true);
 const wrist=model.getObjectByName('wrist');
 for(const names of [['thumb-metacarpal','thumb-phalanx-proximal','thumb-phalanx-distal','thumb-tip'],...['index','middle','ring','pinky'].map(n=>[n+'-finger-metacarpal',n+'-finger-phalanx-proximal',n+'-finger-phalanx-intermediate',n+'-finger-phalanx-distal',n+'-finger-tip'])]){
  let parent=wrist;for(const name of names){const joint=model.getObjectByName(name);if(joint){parent.attach(joint);parent=joint;}}
 }
 const bones=[];model.traverse(n=>{if(n.isBone)bones.push({node:n,rest:n.quaternion.clone()});});
 const pores=textureCanvas(256,256),pg=pores.getContext('2d'),po=pg.createImageData(256,256);for(let i=0;i<po.data.length;i+=4){const v=120+rand(i)*26;po.data[i]=po.data[i+1]=po.data[i+2]=v;po.data[i+3]=255;}pg.putImageData(po,0,0);const poreTexture=new T.CanvasTexture(pores);poreTexture.wrapS=poreTexture.wrapT=T.RepeatWrapping;poreTexture.repeat.set(5,8);
 const skinTexture=canvasTexture(skinImage);
 const skin=new T.MeshPhysicalMaterial({map:skinTexture,color:0xffffff,roughness:.56,metalness:0,clearcoat:.035,clearcoatRoughness:.6,envMapIntensity:.15,bumpMap:skinTexture,bumpScale:.00018});
 model.traverse(n=>{if(n.isMesh){const pos=n.geometry.attributes.position,uv=[];for(let i=0;i<pos.count;i++)uv.push((pos.getZ(i)+.0785)/.146,(.078-pos.getY(i))/.212);n.geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));n.material=skin;n.frustumCulled=false;}});
 const wristPosition=wrist.getWorldPosition(new T.Vector3());model.position.sub(wristPosition);
 const orient=new T.Group();orient.rotation.set(0,Math.PI/2,Math.PI);orient.scale.setScalar(18);orient.add(model);objects.hand.add(orient);
 const armMaterial=skin.clone();armMaterial.bumpMap=poreTexture;armMaterial.bumpScale=.005;
 const armShape=armGeometry(),armUV=armShape.attributes.uv,armPos=armShape.attributes.position;for(let i=0;i<armUV.count;i++){const t=armUV.getY(i);armUV.setXY(i,.60+(armPos.getX(i)+.02)/2.628,.02+.11*Math.exp(-t*15));}
 const arm=new T.Mesh(armShape,armMaterial);arm.position.set(.02,.08,-.14);arm.scale.set(1,1,.65);objects.hand.add(arm);
 // Stage edges are never a cropped photograph. The forearm is a tapered 3D
 // surface and the shoulder end remains beyond the camera's framing.
 const handHome=new T.Quaternion().setFromEuler(new T.Euler(.07,-.24,-.12));

 const glassMaterial=new T.MeshPhysicalMaterial({color:0xffffff,metalness:0,roughness:.018,transmission:1,thickness:.028,ior:1.51,transparent:true,opacity:1,envMapIntensity:.4,iridescence:.32,iridescenceIOR:1.31,side:T.DoubleSide,depthWrite:false});
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
 for(let i=0;i<44;i++){
  const shape=new T.Shape(),r=.07+rand(i*4)*.21;shape.moveTo(-r,-r*.7);shape.lineTo(r*.8,-r*.2);shape.lineTo(r*.2,r);shape.lineTo(-r*.6,r*.3);shape.closePath();
  const mesh=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:true,bevelSize:.004,bevelThickness:.005,bevelSegments:1}),glassMaterial);objects.glass.add(mesh);chips.push(mesh);
 }
 // Four individual American-dollar art notes with surface curl and multi-edge
 // procedural burning. The camera approaches them; they do not scroll upward.
 const bills=[];
 for(let i=0;i<4;i++){
  const uniforms={uTime:{value:0},uSeed:{value:i*2.1},uMap:{value:noteTexture},uBurn:{value:0},uOpacity:{value:1}};
  const material=new T.ShaderMaterial({uniforms,vertexShader:billVertex,fragmentShader:billFragment,side:T.DoubleSide,transparent:true});
  const mesh=new T.Mesh(new T.PlaneGeometry(3.9,1.66,36,14),material);mesh.rotation.set([.28,-.3,.2,-.12][i],[.16,-.27,.2,-.1][i],[-.22,.38,-.43,.1][i]);mesh.position.set([-.25,1.1,-1.15,.3][i],[.15,1.55,-1.7,-.25][i],[-27,-31.5,-36,-40.5][i]);objects.money.add(mesh);bills.push(mesh);
 }
 const emberGeometry=new T.BufferGeometry(),emberPositions=new Float32Array(110*3);emberGeometry.setAttribute('position',new T.BufferAttribute(emberPositions,3));
 const embers=new T.Points(emberGeometry,new T.ShaderMaterial({uniforms:{uOpacity:{value:0}},transparent:true,depthWrite:false,blending:T.AdditiveBlending,vertexShader:'varying float vDepth;void main(){vec4 p=modelViewMatrix*vec4(position,1.);vDepth=-p.z;gl_PointSize=clamp(24./max(1.,vDepth),1.,8.);gl_Position=projectionMatrix*p;}',fragmentShader:'uniform float uOpacity;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(5.,1.5,.08,pow(1.-d*2.,2.)*uOpacity);}'}));objects.money.add(embers);
 // Dozens of original newspaper pages fill a deep corridor. Every page is a
 // connected sheet at rest, becoming sixteen independently waving long strips.
 const pages=[],geometry=shredGeometry(16,28),pageCount=matchMedia('(max-width: 600px)').matches?48:72;
 for(let i=0;i<pageCount;i++){
  const seed=i*1.71,angle=i*2.399963,radius=1.8+rand(i*7)*2.5;
  const uniforms={uMap:{value:paperTextures[i%paperTextures.length]},uTime:{value:0},uTear:{value:0},uSeed:{value:seed},uOpacity:{value:1}};
  const material=new T.ShaderMaterial({uniforms,vertexShader:paperVertex,fragmentShader:paperFragment,side:T.DoubleSide,transparent:true});
  const mesh=new T.Mesh(geometry,material);mesh.userData={angle,radius,seed,size:.75+rand(i*5)*.80};mesh.rotation.set((rand(i*2)-.5)*.6,(rand(i*3)-.5)*.8,(rand(i*9)-.5)*1.0);mesh.position.z=-48-i*1.75;objects.paper.add(mesh);pages.push(mesh);
 }
 const backdrop=new T.Mesh(new T.PlaneGeometry(2,2),new T.ShaderMaterial({uniforms:{uCurtain:{value:curtains},uGreen:{value:greenTexture},uBlend:{value:0}},depthWrite:false,depthTest:false,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,.999,1.);}',fragmentShader:'uniform sampler2D uCurtain,uGreen;uniform float uBlend;varying vec2 vUv;void main(){gl_FragColor=mix(texture2D(uCurtain,vUv),texture2D(uGreen,vUv),uBlend);}'}));backdrop.frustumCulled=false;backdrop.renderOrder=-100;scene.add(backdrop);scene.background=null;
 function resize(){
  if(disposed)return;W=Math.max(1,stage.clientWidth);H=Math.max(1,stage.clientHeight);mobile=W<600;
  renderer.setPixelRatio(software?(mobile?.85:.5):Math.min(devicePixelRatio||1,mobile?1.25:1.25));bloom.enabled=!software&&!mobile;renderer.setSize(W,H,false);composer.setPixelRatio(renderer.getPixelRatio());composer.setSize(W,H);camera.aspect=W/H;camera.fov=mobile?43:37;camera.updateProjectionMatrix();measureNeeded=true;schedule();
 }
 function measure(){const r=track.getBoundingClientRect();visible=r.top<innerHeight&&r.bottom>0;p=clamp(-r.top/Math.max(1,track.offsetHeight-H),0,1);measureNeeded=false;}
 function cameraRail(progress){
  if(progress<.125)return 12;
  if(progress<.385){const q=clamp((progress-.125)/.26,0,1)*6,j=Math.floor(q);return 12-(j+smooth(.18,.93,q-j))*5;}
  if(progress<.575)return mix(-18,-42,smooth(.385,.575,progress));
  return mix(-42,-120,smooth(.64,.99,progress));
 }
 function updateHand(now){
  if(p>=.39){objects.hand.visible=false;return;}objects.hand.visible=true;
  let strike=impactStart<0?0:1-Math.pow(1-clamp((now-impactStart)/260,0,1),4);
  if(p>.13)strike=1;
  const retire=smooth(.25,.385,p),move=Math.sin(time*.43)*.16+tiltX*.45+scrollSway*.16;
  objects.hand.position.set(mobile?.20+move+smooth(.12,.24,p)*.55:.48+move+smooth(.12,.24,p)*.7,mix(-8,-1.75,strike)-retire*1.4,camera.position.z-8+Math.sin(Math.PI*clamp(impactStart<0?0:(now-impactStart)/270,0,1))*1.8-retire*2.3);
  objects.hand.quaternion.copy(handHome);objects.hand.rotateY(tiltX*.10+Math.sin(time*.3)*.11+retire*.52);objects.hand.rotateZ(tiltX*-.09+scrollSway*.05);
  objects.hand.scale.setScalar(mix(1,.54,retire));
  skin.color.setRGB(mix(.8,.72,retire),mix(.75,.76,retire),mix(.68,.76,retire));armMaterial.color.copy(skin.color);
  for(const bone of bones){bone.node.quaternion.copy(bone.rest);if(/phalanx/.test(bone.node.name)){const bend=.10+Math.sin(time*.5+bone.node.name.length)*.07+smooth(.10,.24,p)*.42;bone.node.rotateX(-bend*(bone.node.name.includes('intermediate')?1.4:1));}}
 }
 function updateGlass(now){
  objects.glass.visible=p<.40;
  const burst=impactStart<0?0:1-Math.pow(1-clamp((now-impactStart-130)/240,0,1),3);intactPane.visible=impactStart<0||now-impactStart<135;
  for(let i=0;i<labels.length;i++){
   const g=labels[i],tilt=Math.sin(time*.32+i)*.018;
   g.position.x=(mobile?.10:1.25)*(i%2?-.42:.42)+tiltX*.35+scrollSway*.20;g.position.y=i===0?.58:(i%2?-.27:.25);
   // Zero sustained y travel: the camera, not the facts, moves forward.
   g.position.z=6-i*5+burst*(i===0?.15:.08);
   g.rotation.set((i%2?-.07:.06)+tilt,(i%2?.13:-.10)+tiltX*.035,(i%2?-.12:.09)+tilt);
   const size=mobile?.90:1.15;g.scale.setScalar(size);const distance=camera.position.z-g.position.z;g.visible=burst>.03&&distance>1.3&&distance<11.5;g.children[1].material.opacity=1-smooth(8.5,11.5,distance);
  }
  chips.forEach((mesh,i)=>{
   const angle=i*2.399963,r=1.3+rand(i*8)*3.6;mesh.visible=burst>.01;
   mesh.position.set(Math.cos(angle)*r*burst,Math.sin(angle)*r*burst,6-(i%6)*5+Math.sin(i*7)*burst*2);
   mesh.rotation.set(i+burst*1.8+time*.06,i*1.6+burst*2,i*.73+burst);mesh.scale.setScalar(mobile?1:1.6);
  });
 }
 function updateMoney(){
  objects.money.visible=p>.355&&p<.585;
  bills.forEach((bill,i)=>{
   const u=bill.material.uniforms;u.uTime.value=time;u.uBurn.value=smooth(.405+i*.012,.555+i*.004,p);u.uOpacity.value=smooth(.355,.39,p)*(1-smooth(.56,.585,p));
   bill.scale.setScalar(mobile?1:1.55);bill.rotation.y=[.16,-.27,.2,-.1][i]+Math.sin(time*.23+i)*.09;bill.rotation.x=[.28,-.3,.2,-.12][i]+Math.sin(time*.31+i)*.06;
  });
  const a=emberGeometry.attributes.position;
  for(let i=0;i<110;i++){const d=(time*.22+rand(i*17))%1;a.setXYZ(i,(rand(i*8)-.5)*(mobile?4:9)+Math.sin(time+i)*.08,(rand(i*7)-.5)*5+d*1.8,-25-rand(i*11)*17);}
  a.needsUpdate=true;embers.material.uniforms.uOpacity.value=smooth(.405,.46,p)*(1-smooth(.55,.585,p));
 }
 function updatePapers(){
  objects.paper.visible=p>.615&&p<.999;
  pages.forEach((page,i)=>{
   const {angle,radius,size,seed}=page.userData;
   const spread=mobile?1:2.1;page.position.x=Math.cos(angle)*radius*spread;page.position.y=Math.sin(angle)*radius*1.25;
   page.scale.setScalar(size*(mobile?1:1.6));
   const distance=camera.position.z-page.position.z;
   page.material.uniforms.uTear.value=smooth(.72,.88,p)*(1-smooth(4,20,distance));
   page.material.uniforms.uTime.value=time;page.material.uniforms.uOpacity.value=smooth(.615,.69,p)*(1-smooth(.97,.998,p));
   page.visible=distance>2.5&&distance<85;
  });
 }
 function render(now){
  frame=0;if(disposed||document.hidden)return;
  if(measureNeeded)measure();
  if(!visible){document.body.classList.remove('in-psychology-story');if(lastAudio!==-1){announce('mt:story-audio',{progress:-1});lastAudio=-1;}last=0;return;}
  document.body.classList.add('in-psychology-story');
  if(now-last<(now-lastInput<350?30:55)){schedule();return;}
  const dt=last?Math.min(now-last,100):33;last=now;time+=dt/1000;tiltX=mix(tiltX,aimX,1-Math.exp(-dt/280));tiltY=mix(tiltY,aimY,1-Math.exp(-dt/280));scrollSway*=Math.exp(-dt/420);
  if(p<.042){impactStart=-1;impactFired=false;}
  if(p>=.063&&impactStart<0){impactStart=p>.13?now-800:now;}
  if(impactStart>=0&&!impactFired&&now-impactStart>=135){impactFired=true;if(p<.14)announce('mt:glass-impact',{progress:p});}
  camera.position.set(tiltX*.16+scrollSway*.08,tiltY*.11,cameraRail(p));camera.lookAt(tiltX*.08,tiltY*.04,camera.position.z-12);
  const greenMix=smooth(.325,.39,p);backdrop.material.uniforms.uBlend.value=greenMix;
  // The full-frame background shader crossfades curtain to green without a pale intermediary frame.
  key.position.z=camera.position.z+5;rim.position.z=camera.position.z-5;fill.position.z=camera.position.z+3;
  key.intensity=mix(1.4,1.1,greenMix);rim.color.set(greenMix>.5?0x749c70:0xff3b14);
  updateHand(now);updateGlass(now);updateMoney();updatePapers();
  words.forEach((word,i)=>{const enter=smooth([.49,.545,.59][i],[.535,.59,.65][i],p),leave=smooth(.705,.755,p);word.style.opacity=(enter*(1-leave)).toFixed(3);word.style.transform='translateZ(0) scale('+mix(.88,1.14,smooth(.49,.75,p)).toFixed(3)+')';});
  const phase=p<.385?'glass':p<.58?'freud':p<.71?'human':p<.965?'newspaper':'herd';root.dataset.storyPhase=phase;root.dataset.cameraZ=camera.position.z.toFixed(3);root.dataset.handYaw=objects.hand.rotation.y.toFixed(4);root.dataset.glassX=labels[0].position.x.toFixed(4);root.dataset.factY=labels[0].position.y.toFixed(4);root.dataset.stripCount='16';root.dataset.pageCount=String(pages.length);root.dataset.renderFrame=String(renderer.info.render.frame);root.dataset.billCount='4';root.style.setProperty('--story-progress',p.toFixed(5));
  canvas.style.opacity=(1-smooth(.945,.998,p)).toFixed(4);
  if(phase==='herd')document.body.classList.remove('is-black-chapter');
  try{composer.render();}catch(_){root.dispatchEvent(new CustomEvent('mt:story-fallback'));return;}
  if(Math.abs(lastAudio-p)>.0005||lastAudio===-1){announce('mt:story-audio',{progress:p});lastAudio=p;}
  if(p<.999)schedule();
 }
 function schedule(){if(ready&&!frame&&!disposed&&!document.hidden)frame=requestAnimationFrame(render);}
 on(window,'scroll',()=>{const dy=scrollY-lastScroll;scrollSway=clamp(scrollSway+dy*.002,-1,1);lastScroll=scrollY;lastInput=performance.now();measureNeeded=true;schedule();},{passive:true});
 on(window,'pointermove',e=>{if(e.pointerType==='touch')return;aimX=clamp((e.clientX/W-.5)*2,-1,1);aimY=clamp((e.clientY/H-.5)*2,-1,1);schedule();},{passive:true});
 on(window,'resize',resize,{passive:true});if(window.visualViewport)on(window.visualViewport,'resize',resize,{passive:true});
 on(document,'visibilitychange',()=>{last=0;measureNeeded=true;if(document.hidden){announce('mt:story-audio',{progress:-1});}else schedule();});
 on(canvas,'webglcontextlost',e=>{e.preventDefault();root.dispatchEvent(new CustomEvent('mt:story-fallback'));});
 const tiltButton=root.querySelector('[data-enable-tilt]');let gyro=false,neutral=null;
 async function enableTilt(){
  try{
   if(gyro){gyro=false;neutral=null;aimX=aimY=0;tiltButton.setAttribute('aria-pressed','false');tiltButton.textContent='Enable tilt';return;}
   if(typeof DeviceOrientationEvent==='undefined')return;
   const permission=typeof DeviceOrientationEvent.requestPermission==='function'?await DeviceOrientationEvent.requestPermission():'granted';
   if(permission!=='granted'){tiltButton.textContent='Tilt not allowed';tiltButton.setAttribute('aria-pressed','false');return;}
   gyro=true;neutral=null;tiltButton.setAttribute('aria-pressed',String(gyro));tiltButton.textContent=gyro?'Tilt on':'Enable tilt';
  }catch(_){tiltButton.textContent='Tilt unavailable';}
 }
 if(tiltButton){tiltButton.hidden=!matchMedia('(pointer: coarse)').matches||typeof DeviceOrientationEvent==='undefined';on(tiltButton,'click',enableTilt);}
 on(window,'deviceorientation',e=>{if(!gyro||!visible||e.gamma===null)return;const angle=((screen.orientation&&screen.orientation.angle)||window.orientation||0)*Math.PI/180,x=e.gamma*Math.cos(angle)+e.beta*Math.sin(angle),y=e.beta*Math.cos(angle)-e.gamma*Math.sin(angle);if(!neutral)neutral={x,y};aimX=clamp((x-neutral.x)/28,-1,1);aimY=clamp((y-neutral.y)/35,-.7,.7);schedule();},{passive:true});
 const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;if(observer)observer.observe(stage);
 function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);cleanup.forEach(fn=>fn());if(observer)observer.disconnect();announce('mt:story-audio',{progress:-1});document.body.classList.remove('in-psychology-story');scene.traverse(n=>{if(n.geometry)n.geometry.dispose();if(n.material){for(const m of [].concat(n.material))m.dispose();}});[curtains,greenTexture,noteTexture,...paperTextures,poreTexture,skinTexture,environment].forEach(t=>t.dispose());composer.dispose();renderer.dispose();canvas.style.removeProperty('opacity');}
 resize();measure();scene.updateMatrixWorld(true);
 let compileTimer;try{await Promise.race([renderer.compileAsync(scene,camera),new Promise((_,reject)=>{compileTimer=setTimeout(()=>reject(Error('Shader compilation timed out')),12000);})]);}catch(error){dispose();throw error;}finally{clearTimeout(compileTimer);}
 root.classList.remove('story-pending');root.classList.add('story-enhanced');root.dataset.storyRenderer='webgl';ready=true;resize();measure();schedule();
 return {dispose,renderer:'webgl'};
}};
