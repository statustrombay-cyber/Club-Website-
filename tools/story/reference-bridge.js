// Native club scroll feeds the recovered scene's own animation/camera/shader math.
// This is appended to reference-core.js before bundling: internal original names
// are retained to keep the adaptation auditable against the supplied bundle.
window.MTStory3D={async create(root){
 const canvas=root.querySelector('.story-canvas'),track=root.querySelector('.story-track'),stage=root.querySelector('.story-stage');
 const renderer=new Zo({canvas,alpha:true,antialias:false,powerPreference:'high-performance'});
 const gl=renderer.getContext(),dbg=gl.getExtension('WEBGL_debug_renderer_info'),software=dbg&&/swiftshader|llvmpipe|software/i.test(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
 const scene=new $o(),camera=new Ir(innerWidth<768?40:30,1,.1,120);scene.add(camera);camera.position.z=.5;
 renderer.setClearColor(0,0);renderer.toneMapping=0;renderer.outputColorSpace=fe;
 const loader=new _g(renderer);
 loader.manager.setURLModifier(url=>/^(?:data:|blob:|https?:)/.test(url)||url.startsWith('/assets/reference/')?url:'/assets/reference/'+url.replace(/^\//,''));
 loader.stageAssets.initial=loader.stageAssets.initial.filter(a=>['humanHandsAtlas','spcAtlas','textsAtlas','handMatcap'].includes(a.key));
 loader.stageAssets.stage4=[];loader.stageAssets.worldMap=[];
 const clubAtlases={spcAtlas:'club-fragments.webp',moneyShredsAtlas:'club-money-papers.webp',certAtlas:'club-archive.webp'};
 for(const asset of Object.values(loader.stageAssets).flat())if(clubAtlases[asset.key]){asset.type='texture';asset.path='assets/atlases/'+clubAtlases[asset.key];asset.mipmaps=false;}
 for(const asset of [...loader.mandatoryAssets,...Object.values(loader.stageAssets).flat()])if(asset.path)asset.path='/assets/reference/'+asset.path.replace(/^\//,'');
 const loaded=await Promise.all([loader.loadMandatoryAssets(),loader.loadStageAssets('initial'),loader.loadStageAssets('stage2'),loader.loadStageAssets('stage3')]);
 for(const key of ['handsModel2','cameraModel2','glassShatter','allShards','humanHandsAtlas','spcAtlas','moneyShredsAtlas','certAtlas'])if(!loader.getAsset(key))throw Error('Missing original scene asset: '+key);
 loader.flushUploads();loader.disposeTextures=()=>{}; // Retained for reversible native scrolling.
 const composer=new o_(renderer),renderPass=new s_(scene,camera);renderPass.clear=true;composer.addPass(renderPass);
 const bg=u_();composer.addPass(bg);Yg(bg,'A','stage2Background2',loader,true);Yg(bg,'B','stage2Background2',loader,true);
 const glass=new Y_(renderer,1,1);composer.addPass(glass);
 const lens=new nv();lens._forcedOff=true;lens.uniforms.uEnabled.value=0;composer.addPass(lens);
 const fg=g_();composer.addPass(fg);fg.uniforms.uNoiseStrength.value=.04;
 const text=new w_(renderer,1,1);composer.addPass(text);text.textScene.visible=false;
 const shatter=new G_(renderer,1,1);composer.addPass(shatter);shatter.enabled=false;
 const white=new As(new Uint8Array([255,255,255,255]),1,1,E);white.needsUpdate=true;
 const rig=new Wg(camera);window.addEventListener('deviceorientation',rig._handleGyro,{passive:true});
 const noop=()=>{},ui=new Proxy({},{get:()=>noop});
 const ctx={scene,camera,renderer,assetLoader:loader,ui,bgPass:bg,fgPass:fg,lensBlurPass:lens,frostingPass:{enabled:false,active:false},glassShardPass:glass,shatterPass:shatter,textPass:text,textScene:text.textScene,whiteTex:white,renderPass,_composer:composer,cameraRig:rig,components:{},preWarmed:{},_xpReplaySkip:true,_frameProf:{update:0,render:0},_tempVec3:new K(),_tempQuat:new Ct(),_ethHandWorldPos:new K(),godRaysState:{rects:null},scrollManager:{setHeld:noop},_onMouseMove:e=>rig.onMouseMove(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2)};
 // No initial loader, HUD, progress/XP, logo, cookie store, forms or original UI.
 // Only these recovered tracks are eligible, and only inside this chapter.
 for(const key of Object.keys(wg))if(!['glass-shatter','stage2-ambient','money-burn'].includes(key))delete wg[key];
 X.setEnabled(false);X.preload();
 let alive=true,phase=-1,busy=false,raf=0,prevTime=0,lastDraw=0,p=0,visible=false,width=0,height=0,resizeNeeded=true;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const nativeDispose=loader.dispose.bind(loader);
 function resize(){resizeNeeded=true;schedule();}
 function applySize(){
  resizeNeeded=false;const w=stage.clientWidth,h=stage.clientHeight,dpr=software?(w<600?.65:.5):Math.min(devicePixelRatio||1,1.5);
  if(w===width&&h===height&&renderer.getPixelRatio()===dpr)return;
  width=w;height=h;ctx._vw=w;ctx._vh=h;camera.fov=w<768?40:30;camera.aspect=w/h;camera.updateProjectionMatrix();
  renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);composer.setPixelRatio(dpr);composer.setSize(w,h);glass.setSize(w,h);shatter.setSize(w,h);text.setSize(w,h);lens.setSize(w*dpr,h*dpr);
  bg.uniforms.uViewportAspect.value=w/h;fg.uniforms.uViewportAspect.value=w/h;Zg(bg,w/h);Zg(fg,w/h);
  if(phase===1)Wb.resize(ctx,w,h);
 }
 ctx.applyPixelRatioOverride=()=>{}; // The original gate must not clear the backing store asynchronously.
 function schedule(){if(alive&&!raf)raf=requestAnimationFrame(frame);}
 function measure(){const r=track.getBoundingClientRect();visible=r.top<innerHeight&&r.bottom>0;p=clamp(-r.top/Math.max(1,track.offsetHeight-stage.clientHeight));}
 async function change(next){
  if(busy||phase===next)return;busy=true;
  try{
   if(phase===0)sx.teardown(ctx);
   if(phase===1)Wb.teardown(ctx);
   if(phase===2){Xx.teardown(ctx);ctx.components={};ctx._stage3DeferredStarted=false;}
   if(next===0||next===1){
    if(!ctx.components.handsModel){ctx.preWarmed.handsModel2=new Lb(loader);ctx.preWarmed.glassShards=Gb(loader);}
    if(next===0){
     rig.setEnabled(false);
     ctx._gateElapsed=3;await sx.enter(ctx);ctx._gateElapsed=3;
     sx.update(ctx,0,0);
     const hand=ctx.components.handsModel;if(hand?.cameraRef){hand.cameraRef.updateWorldMatrix(true,false);hand.cameraRef.getWorldPosition(camera.position);hand.cameraRef.getWorldQuaternion(camera.quaternion);}
    }else{
     if(!ctx.components.handsModel){Kb(ctx);Yg(bg,'A','stage2Background2',loader,true);Yg(fg,'B','stage2Foreground',loader,false);fg.uniforms.uProgress.value=1;const video=Dv();ctx._stage2Video=video;ctx._stage2VideoTex=new sc(video);ctx._stage2VideoTex.colorSpace=W;kv(video,()=>{if(phase===1){Jg(bg,'A',ctx._stage2VideoTex,true,true);bg.uniforms.uLinearizeA.value=1;}});const hand=ctx.components.handsModel;hand.group.visible=true;hand.scrub(Xb/hand.duration);hand.update(0);}
     await Wb.enter(ctx);bg.uniforms.uOpacity.value=1;bg.uniforms.uProgress.value=0;fg.uniforms.uOpacity.value=1;ctx._gateHandProgress=Xb/ctx.components.handsModel.duration;const hand=ctx.components.handsModel;hand.scrub(ctx._gateHandProgress);hand.update(0);hand.cameraRef?.getWorldPosition(camera.position);hand.cameraRef?.getWorldQuaternion(camera.quaternion);
    }
   }else{
    ctx._stage3DeferredStarted=false;await Xx.enter(ctx);
    if(ctx.components.portalCircle)ctx.components.portalCircle.visible=false;
    // Build the original paper/shred objects once, not in an uncancellable
    // deferred callback that can attach objects to the wrong phase on reversal.
    ctx._stage3DeferredStarted=true;eS(ctx);nS(ctx);rS(ctx);uS(ctx);
   }
   phase=next;root.dataset.storyPhase=['hand-glass','glass-facts','money-paper'][phase];
  }finally{busy=false;schedule();}
 }
 function stopAudio(){ctx._billBurnAudioIds=null;root.dataset.storyAudio='silent';X.setEnabled(false);X.stop('stage2-ambient',{fadeOut:0});X.stop('money-burn',{fadeOut:0});root.dataset.storyPlaying=JSON.stringify([...X._howls].filter(([,h])=>h.playing()).map(([k])=>k));}
 function frame(now){
  raf=0;if(!alive)return;const dt=Math.min(.05,Math.max(0,(now-prevTime)/1000));prevTime=now;
  measure();if(!visible){stopAudio();ctx._stage2Video?.pause();return;}
  if(software&&now-lastDraw<48&&!resizeNeeded){schedule();return;}lastDraw=now;
  if(resizeNeeded)applySize();
  const next=p<.18?0:p<.49?1:2;
  if(next!==phase){change(next).catch(fail);return;}
  if(busy){schedule();return;}
  X.setEnabled(true);root.dataset.storyAudio='chapter-only';if(phase>0&&!X._ambientActive.has('stage2-ambient'))X.play('stage2-ambient');ctx._stage2Video&&Ov(ctx._stage2Video);
  const local=phase===0?clamp(p/.18):phase===1?clamp((p-.18)/.31):clamp((p-.49)/.51)*.84;
  if(phase===0){ctx._gateElapsed=3+local*Jb;ctx._gateHandElapsed=local*Jb*Zb;sx.update(ctx,now/1000,0);}
  else if(phase===1){Wb.scrub(ctx,local);Wb.update(ctx,now/1000,dt);}
  else{Xx.scrub(ctx,local);Xx.update(ctx,now/1000,dt);if(ctx.components.portalCircle)ctx.components.portalCircle.visible=false;}
  ctx.components.textLayout?.update?.(ctx._scrollProgress||0,dt);text.textScene.visible=false;
  fg.uniforms.uTime.value=now/1000;fg.uniforms.uEnableNoise.value=2;fg.uniforms.uNoiseOffset.value.set(0,0);
  loader.chunkedUploader?.tick();text.enabled=false;
  composer.render(dt);rig.restore();
  root.dataset.storyProgress=p.toFixed(4);
  root.dataset.storyNative=JSON.stringify({phase,hand:!!ctx.components.handsModel,camera:camera.position.toArray(),papers:ctx.components.certMeshes?.length||0,shreds:ctx.components.shredMeshes?.length||0,gyro:rig.gyroActive,portalVisible:!!ctx.components.portalCircle?.visible,sourceTextVisible:text.textScene.visible,audioEnabled:X.isEnabled(),playing:[...X._howls].filter(([,h])=>h.playing()).map(([k])=>k),glassY:ctx.components.glassShards?.shards[0]?.position.y});
  root.style.setProperty('--reference-end',String(clamp((p-.90)/.04)*(1-clamp((p-.97)/.03))));
  canvas.style.opacity=String(1-clamp((p-.97)/.03));root.dataset.storyPhase=p>.975?'herd':['hand-glass','glass-facts','money-paper'][phase];
  schedule();
 }
 function gesture(e){if(e.isTrusted)X.unlockNow();}
 function pointer(e){if(visible)rig.onMouseMove(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);}
 function scroll(){schedule();}
 function visibility(){if(document.hidden){stopAudio();if(raf)cancelAnimationFrame(raf);raf=0;}else schedule();}
 function contextLost(e){e.preventDefault();fail(Error('WebGL context lost'));}
 function fail(error){console.error('Recovered chapter:',error);dispose();root.dispatchEvent(new CustomEvent('mt:story-fallback'));}
 function dispose(){if(!alive)return;alive=false;if(raf)cancelAnimationFrame(raf);stopAudio();rig.dispose();window.removeEventListener('deviceorientation',rig._handleGyro);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',resize);window.visualViewport?.removeEventListener('resize',resize);window.removeEventListener('pointermove',pointer);window.removeEventListener('pointerdown',gesture,true);window.removeEventListener('touchend',gesture,true);window.removeEventListener('keydown',gesture,true);document.removeEventListener('visibilitychange',visibility);ctx._stage2Video&&Av(ctx._stage2Video);ctx._stage2VideoPrefetch&&Av(ctx._stage2VideoPrefetch);composer.dispose();renderer.dispose();nativeDispose();X.stopAll();for(const howl of X._howls.values())howl.unload();X._howls.clear();if(X._ctxWatch&&vg.Howler.ctx)vg.Howler.ctx.removeEventListener('statechange',X._ctxWatch);X._ctxWatch=null;X._armed=false;X.suspendContext();canvas.removeEventListener('webglcontextlost',contextLost);canvas.style.removeProperty('opacity');root.classList.remove('story-reference');}
 // A prior grant can be reused without opening a new permission prompt. On
 // browsers that require a fresh grant, passive sensor events simply stay absent.
 X.unlockNow();
 window.addEventListener('pointerdown',gesture,true);window.addEventListener('touchend',gesture,true);window.addEventListener('keydown',gesture,true);
 window.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',resize,{passive:true});window.visualViewport?.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',visibility);
 canvas.addEventListener('webglcontextlost',contextLost);
 applySize();ctx.preWarmed.handsModel2=new Lb(loader);ctx.preWarmed.glassShards=Gb(loader);
 shatter.prewarm(renderer,camera,ctx.preWarmed.handsModel2.handRef,loader.getAsset('glassShatter'),loader.assets.animations.glassShatter);glass.prewarm(renderer,camera);
 ctx._stage2VideoPrefetch=Dv();
 root.classList.add('story-reference','story-enhanced');root.classList.remove('story-pending');root.dataset.storyRenderer='webgl';root.dataset.storySource='recovered-original';
 await change(0);schedule();return{dispose,resize};
}};
