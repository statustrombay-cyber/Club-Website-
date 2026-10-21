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
 // Restricted shared hosts may reject direct WASM/KTX2/GLB requests. Route
 // only these known public files through PHP; no arbitrary-path/file proxy.
 const hosted={
  'vendor/basis/basis_transcoder.wasm':'basis-wasm','vendor/draco/draco_decoder.wasm':'draco-wasm',
  'assets/atlases/human_hands.ktx2':'hand-atlas','assets/atlases/texts.ktx2':'texts-atlas','assets/atlases/leather-money-shreds.ktx2':'money-atlas','assets/atlases/board-certificates.ktx2':'certificate-atlas',
  'assets/models/human_hand_2.glb':'hand-model','assets/models/camera_2.glb':'camera-model',
  'assets/models/stage2_glass-shatter.glb':'fracture-model','assets/models/glass_shards.glb':'shard-model','assets/models/tunnel_new_new.glb':'tunnel-model'
 };
 loader.manager.setURLModifier(url=>{
  if(/^(?:data:|blob:)/.test(url))return url;
  const path=url.replace(/^\/assets\/reference\//,'');
  if(hosted[path])return '/index.php?scene-asset='+hosted[path];
  return /^(?:https?:|\/assets\/reference\/)/.test(url)?url:'/assets/reference/'+url.replace(/^\//,'');
 });
 loader.stageAssets.initial=loader.stageAssets.initial.filter(a=>['humanHandsAtlas','spcAtlas','handMatcap'].includes(a.key));
 loader.stageAssets.initial.push({type:'texture',key:'clubWelcomeAtlas',path:'assets/atlases/club-welcome.webp',mipmaps:true});
 loader.mandatoryAssets=loader.mandatoryAssets.filter(a=>a.key==='frosting');
 loader.stageAssets.stage4=[];loader.stageAssets.worldMap=[];
 loader.stageAssets.stage3.push({type:'texture',key:'clubPaperAtlas',path:'assets/atlases/club-editorials.webp?v=__CLUB_EDITORIAL_REVISION__',mipmaps:true});
 const clubAtlases={spcAtlas:'club-fragments.webp'}; // Degrees keep the supplied compressed atlas.
 for(const asset of Object.values(loader.stageAssets).flat())if(clubAtlases[asset.key]){asset.type='texture';asset.path='assets/atlases/'+clubAtlases[asset.key];asset.mipmaps=asset.key==='certAtlas';}
 for(const asset of [...loader.mandatoryAssets,...Object.values(loader.stageAssets).flat()])if(asset.path)asset.path='/assets/reference/'+asset.path.replace(/^\//,'');
 const required=keys=>{for(const key of keys)if(!loader.getAsset(key))throw Error('Missing original scene asset: '+key);};
 // Decode the original recordings alongside models, not after the first break.
 const audioAssets={'stage2-ambient':'story-ambient','glass-shatter':'story-glass','money-burn':'story-burn'};
 for(const key of Object.keys(wg)){if(!audioAssets[key])delete wg[key];else{wg[key].src='/index.php?scene-asset='+audioAssets[key];wg[key].preload=true;}}
 X.setEnabled(false);X.preload();
 const audioWarmup=X.decodeAll();
 // Let the hand/glass render before the later paper textures finish downloading.
 const openingReady=Promise.all([loader.loadMandatoryAssets(),loader.loadStageAssets('initial'),loader.loadStageAssets('stage2')]);
 const stage3Ready=openingReady.then(()=>loader.loadStageAssets('stage3')).then(()=>{
  const printed=loader.getAsset('clubPaperAtlas');
  if(printed){printed.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());printed.needsUpdate=true;}
 });
 stage3Ready.catch(()=>{}); // Observed again before this stage is entered.
 try{await openingReady;
 // An unavailable sound must never hold the visual scene indefinitely.
 await Promise.race([audioWarmup,new Promise(resolve=>setTimeout(resolve,650))]);
 required(['handsModel2','cameraModel2','glassShatter','allShards','humanHandsAtlas','spcAtlas','clubWelcomeAtlas']);
 }catch(error){loader.dispose();renderer.dispose();throw error;}
 loader.flushUploads();loader.disposeTextures=()=>{}; // Retained for reversible native scrolling.
 const composer=new o_(renderer),renderPass=new s_(scene,camera);renderPass.clear=true;composer.addPass(renderPass);
 const bg=u_();composer.addPass(bg);Yg(bg,'A','stage2Background2',loader,true);Yg(bg,'B','stage2Background2',loader,true);
 const glass=new Y_(renderer,1,1);composer.addPass(glass);
 const lens=new nv();lens._forcedOff=true;lens.enabled=false;lens.uniforms.uEnabled.value=0;composer.addPass(lens);
 const fg=g_();composer.addPass(fg);fg.uniforms.uNoiseStrength.value=.008;
 const text=new w_(renderer,1,1);composer.addPass(text);text.enabled=false;text.textScene.visible=false;
 const shatter=new G_(renderer,1,1);composer.addPass(shatter);shatter.enabled=false;
 const white=new As(new Uint8Array([255,255,255,255]),1,1,E);white.needsUpdate=true;
 const rig=new Wg(camera);window.addEventListener('deviceorientation',rig._handleGyro,{passive:true});
 if(window.MTStoryInputs?.motionSample)rig._handleGyro(window.MTStoryInputs.motionSample);
 const noop=()=>{},ui=new Proxy({},{get:()=>noop});
 const ctx={scene,camera,renderer,assetLoader:loader,ui,bgPass:bg,fgPass:fg,lensBlurPass:lens,frostingPass:{enabled:false,active:false},glassShardPass:glass,shatterPass:shatter,textPass:text,textScene:text.textScene,whiteTex:white,renderPass,_composer:composer,cameraRig:rig,components:{},preWarmed:{},_xpReplaySkip:true,_frameProf:{update:0,render:0},_tempVec3:new K(),_tempQuat:new Ct(),_ethHandWorldPos:new K(),godRaysState:{rects:null},scrollManager:{setHeld:noop},_onMouseMove:e=>rig.onMouseMove(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2)};
 // No initial loader, HUD, progress/XP, logo, cookie store, forms or original UI.
 // Only these recovered tracks are eligible, and only inside this chapter.
 let paperTime=0,gateAuto=false,gateClock=0,gateLastTime=null,lastRenderedProgress=null,gateMax=0,fractureSpent=false,glassOpacity=1;
 let alive=true,phase=-1,busy=false,raf=0,prevTime=0,lastDraw=0,p=0,chapterTop=Infinity,visible=false,width=0,height=0,resizeNeeded=true,qualityDpr=Infinity,slowFrames=0,qualityChangedAt=0;
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 const constrained=()=>reduced()||!!navigator.connection?.saveData;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const nativeDispose=loader.dispose.bind(loader);
 function resize(){resizeNeeded=true;schedule();}
 function applySize(){
  resizeNeeded=false;const w=stage.clientWidth,h=stage.clientHeight,dpr=software?(w<600?.65:.5):Math.min(devicePixelRatio||1,constrained()?1:(w<768?1.35:1.75),qualityDpr);
  if(w===width&&h===height&&renderer.getPixelRatio()===dpr)return;
  width=w;height=h;ctx._vw=w;ctx._vh=h;camera.fov=w<768?40:30;camera.aspect=w/h;camera.updateProjectionMatrix();
  renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);composer.setPixelRatio(dpr);composer.setSize(w,h);glass.setSize(w,h);shatter.setSize(w,h);text.setSize(w,h);lens.setSize(w*dpr,h*dpr);
  bg.uniforms.uViewportAspect.value=w/h;fg.uniforms.uViewportAspect.value=w/h;Zg(bg,w/h);Zg(fg,w/h);
  ctx.components.textLayout?.resize(w,h);
  const welcome=ctx.components.textLayout?.sprites?.[0];if(welcome)welcome.userData.storyBaseY=welcome.position.y;
  if(phase===1)Wb.resize(ctx,w,h);
 }
 function placeWelcome(){const welcome=ctx.components.textLayout?.sprites?.[0];if(!welcome)return;if(!Number.isFinite(welcome.userData.storyBaseY))welcome.userData.storyBaseY=welcome.position.y;welcome.position.y=welcome.userData.storyBaseY+height*(width<768?.22:.48);}
 ctx.applyPixelRatioOverride=()=>{}; // The original gate must not clear the backing store asynchronously.
 function schedule(){if(alive&&!raf)raf=requestAnimationFrame(frame);}
 function measure(){const r=track.getBoundingClientRect();chapterTop=r.top;visible=r.top<innerHeight&&r.bottom>0;p=clamp(-r.top/Math.max(1,track.offsetHeight-stage.clientHeight));
  if(r.top>=innerHeight&&fractureSpent){fractureSpent=false;glassOpacity=1;if(ctx.components.glassShards)ctx.components.glassShards.group.visible=true;gateMax=0;gateClock=0;gateAuto=true;lastRenderedProgress=null;ctx._gateShatterStarted=false;ctx._gateShatterSfxFired=false;if(ctx.components.handsModel)ctx.preWarmed.handsModel2=ctx.components.handsModel;if(ctx.components.glassShards)ctx.preWarmed.glassShards=ctx.components.glassShards;}
  if(lastRenderedProgress!==null&&p<lastRenderedProgress-.0003){fractureSpent=true;gateAuto=false;gateLastTime=null;}
 }
 async function change(next){
  if(busy||phase===next)return;busy=true;
  if(next===0){gateAuto=phase<0&&!fractureSpent;gateClock=0;gateLastTime=null;if(fractureSpent)gateMax=1;}
  try{
   if(phase===0){sx.teardown(ctx);if(next===2)Wb.teardown(ctx);}
   if(phase===1&&next!==0)Wb.teardown(ctx);
   if(phase===2){Xx.teardown(ctx);ctx.components={};ctx._stage3DeferredStarted=false;}
   if(next===0||next===1){
    if(!ctx.components.handsModel){ctx.preWarmed.handsModel2=new Lb(loader);ctx.preWarmed.glassShards=Gb(loader);}
    if(next===0){
     rig.setEnabled(true);rig.influence=1;
     ctx._gateElapsed=3;await sx.enter(ctx);ctx._gateElapsed=3;
     if(fractureSpent){ctx._gateShatterStarted=true;ctx._gateShatterSfxFired=true;if(!ctx.components.handsModel)Kb(ctx);ctx.components.handsModel.group.visible=true;ctx._gateHandProgress=Xb/ctx.components.handsModel.duration;Yg(bg,'A','stage2Background2',loader,true);Yg(fg,'B','stage2Foreground',loader,false);fg.uniforms.uProgress.value=1;fg.uniforms.uExposure.value=1;fg.uniforms.uContrast.value=1;fg.uniforms.uRedTint.value=0;bg.uniforms.uZoom.value=1;bg.uniforms.uOpacity.value=1;bg.uniforms.uProgress.value=0;shatter.enabled=false;Wb.scrub(ctx,0);Wb.update(ctx,0,0);}else sx.update(ctx,0,0);
     const hand=ctx.components.handsModel;if(hand?.cameraRef){hand.cameraRef.updateWorldMatrix(true,false);hand.cameraRef.getWorldPosition(camera.position);hand.cameraRef.getWorldQuaternion(camera.quaternion);}
    }else{
     if(!ctx.components.handsModel){Kb(ctx);Yg(bg,'A','stage2Background2',loader,true);Yg(fg,'B','stage2Foreground',loader,false);fg.uniforms.uProgress.value=1;const video=Dv();ctx._stage2Video=video;ctx._stage2VideoTex=new sc(video);ctx._stage2VideoTex.colorSpace=W;kv(video,()=>{if(phase===1){Jg(bg,'A',ctx._stage2VideoTex,true,true);bg.uniforms.uLinearizeA.value=1;}});const hand=ctx.components.handsModel;hand.group.visible=true;hand.scrub(Xb/hand.duration);hand.update(0);}
     await Wb.enter(ctx);bg.uniforms.uOpacity.value=1;bg.uniforms.uProgress.value=0;fg.uniforms.uOpacity.value=1;ctx._gateHandProgress=Xb/ctx.components.handsModel.duration;const hand=ctx.components.handsModel;hand.scrub(ctx._gateHandProgress);hand.update(0);hand.cameraRef?.getWorldPosition(camera.position);hand.cameraRef?.getWorldQuaternion(camera.quaternion);
    }
   }else{
    // A fast jump may bypass Wb.enter, the source's normal grade reset.
    // Never carry its pre-fracture black exposure/zoom into the paper stage.
    fg.uniforms.uExposure.value=1;fg.uniforms.uContrast.value=1;fg.uniforms.uRedTint.value=0;bg.uniforms.uZoom.value=1;
    await stage3Ready;required(['moneyShredsAtlas','certAtlas','clubPaperAtlas','tunnelModel']);
    paperTime=0;ctx._stage3DeferredStarted=false;await Xx.enter(ctx);
    if(ctx.components.portalCircle)ctx.components.portalCircle.visible=false;
    // Build the original paper/shred objects once, not in an uncancellable
    // deferred callback that can attach objects to the wrong phase on reversal.
    ctx._stage3DeferredStarted=true;eS(ctx);nS(ctx);rS(ctx);
   }
   phase=next;glass.enabled=next===1;root.dataset.storyPhase=['hand-glass','glass-facts','money-paper'][phase];
  }finally{busy=false;schedule();}
 }
 function stopAudio(){ctx._billBurnAudioIds=null;root.dataset.storyAudio='silent';X.setEnabled(false);X.stop('stage2-ambient',{fadeOut:0});X.stop('money-burn',{fadeOut:0});root.dataset.storyPlaying=JSON.stringify([...X._howls].filter(([,h])=>h.playing()).map(([k])=>k));}
 function frame(now){
  raf=0;if(!alive)return;const gap=prevTime?now-prevTime:0,dt=reduced()?0:Math.min(.05,Math.max(0,gap/1000));prevTime=now;
  measure();if(!visible||document.hidden){gateLastTime=null;stopAudio();ctx._stage2Video?.pause();ctx._stage2VideoPrefetch?.pause();return;}
  // Do not keep rendering a fully transparent WebGL tail over the next page.
  if(p>=1){stopAudio();ctx._stage2Video?.pause();root.style.setProperty('--reference-end','0');root.style.setProperty('--burn-title','0');root.dataset.storyPhase='herd';root.dataset.storyProgress='1.0000';lastRenderedProgress=p;return;}
  if(software&&now-lastDraw<48&&!resizeNeeded){schedule();return;}lastDraw=now;
  // Back off fill rate on sustained slow hardware frames, not on one shader
  // compile/tab switch. Keep the original geometry and full 4096px print atlas.
  if(!software&&width&&gap>0){
   slowFrames=gap>34?slowFrames+1:Math.max(0,slowFrames-1);
   if((slowFrames>=20||slowFrames>=3&&gap>100)&&now-qualityChangedAt>1500&&renderer.getPixelRatio()>1){qualityDpr=Math.max(1,renderer.getPixelRatio()-.2);qualityChangedAt=now;slowFrames=0;resizeNeeded=true;}
  }
  if(resizeNeeded)applySize();
  const next=p<.18?0:p<.49?1:2;
  if(next!==phase){change(next).catch(fail);return;}
  if(busy){schedule();return;}
  X.setEnabled(true);root.dataset.storyAudio=X.isUnlocked()?'chapter-only':'awaiting-gesture';if(!X._ambientActive.has('stage2-ambient'))X.play('stage2-ambient');if(ctx._stage2Video){if(reduced()||phase===2)ctx._stage2Video.pause();else if(ctx._stage2Video.paused)Ov(ctx._stage2Video);}
  const local=phase===0?clamp(p/.18):phase===1?clamp((p-.18)/.31):clamp((p-.49)/.51);
  if(phase===0){
   // The supplied gate is a three-second automatic fracture, not a frozen
   // frame waiting for another scroll. Scroll can still fast-forward it, and
   // backwards navigation keeps the fact fragments, never another fracture.
   if(fractureSpent)gateAuto=false;
   if(gateAuto&&!reduced()&&chapterTop<=Math.min(100,height*.12)){if(gateLastTime!==null)gateClock+=(now-gateLastTime)/1000;gateLastTime=now;}else gateLastTime=null;
   const gateProgress=Math.max(gateMax,gateAuto&&!reduced()?Math.max(local,clamp(gateClock/Jb)):local);gateMax=gateProgress;
   if(fractureSpent){Wb.scrub(ctx,0);Wb.update(ctx,now/1000,dt);}else{ctx._gateElapsed=3+gateProgress*Jb;ctx._gateHandElapsed=gateProgress*Jb*Zb;sx.update(ctx,now/1000,0);rig.update(dt);}
  }
  else if(phase===1){Wb.scrub(ctx,local);Wb.update(ctx,now/1000,dt);}
  else{paperTime+=dt;Xx.scrub(ctx,local);Xx.update(ctx,paperTime,dt);if(ctx.components.portalCircle)ctx.components.portalCircle.visible=false;}
  if(ctx.components.glassShards){
   ctx.components.glassShards._reducedMotion=reduced();
   // Fit portrait screens without changing desktop or the paper camera path.
   // Restore the last portrait fit: real tilt must not magnify the edge facts
   // off a narrow screen. Desktop retains its authored viewing distance.
   ctx.components.glassShards.group.position.z=width<768?-Math.max(0,.55*(height/width-1.2)):0;
  }
  if(phase===0)ctx.components.textLayout?.update?.(0,dt);
  placeWelcome();
  text.textScene.visible=!!ctx.components.textLayout?.hasVisibleSprites&&(phase===1||phase===0&&gateMax>.3);
  fg.uniforms.uTime.value=reduced()?0:now/1000;fg.uniforms.uEnableNoise.value=reduced()?0:2;fg.uniforms.uNoiseOffset.value.set(0,0);
  // The break and its sound are one-shot on reverse. The independent glass
  // pass, shard geometry and printed fact overlays remain fully visible.
  glassOpacity=1;
  shatter._compositeMaterial.uniforms.uStoryGlassAlpha.value=fractureSpent?0:1;
  glass.uniforms.uStoryGlassAlpha.value=1;
  const shards=ctx.components.glassShards;
  if(shards){shards.group.visible=true;if(shards._overlayMaterial)shards._overlayMaterial.opacity=1;}
  if(fractureSpent){shatter.enabled=false;X.stop('glass-shatter',{fadeOut:0});}
  glass.enabled=phase===1||(phase===0&&fractureSpent);
  loader.chunkedUploader?.tick();text.enabled=text.textScene.visible;
  lastRenderedProgress=p;const renderCamera=camera.position.toArray();composer.render(dt);rig.restore();
  root.dataset.storyProgress=p.toFixed(4);
  root.dataset.storyNative=JSON.stringify({phase,frameGap:gap,slowFrames,gateAuto,gateClock,fractureSpent,glassOpacity,glassEnabled:glass.enabled,visibleFactOverlays:glass.enabled&&shards?.group.visible?glass._overlayProxies.filter(({proxy})=>proxy.visible&&proxy.material.opacity>0).length:0,degreeShred:ctx.components.certMaterials?.[0]?.uniforms.uShredProgress.value,degreeOpacity:ctx.components.certMaterials?.[0]?.uniforms.uOpacity.value,editorialOpacity:ctx.components.shredMaterials?.[0]?.uniforms.uOpacity.value,gateMax,breakCount:ctx._storyBreakCount||0,renderCamera,shatterEnabled:shatter.enabled,shatterTime:shatter._actions[0]?.time,handTime:ctx.components.handsModel?._scrubProgress,hand:!!ctx.components.handsModel,camera:camera.position.toArray(),paperProgress:phase===2?local:0,paperClearance:phase===2?camera.position.z-Math.max(...[...(ctx.components.certMeshes||[]),...(ctx.components.shredMeshes||[])].map(m=>m.position.z)):null,papers:ctx.components.certMeshes?.length||0,shreds:ctx.components.shredMeshes?.length||0,gyro:rig.gyroActive,gyroPermission:window.MTStoryInputs?.motionState||'waiting',audioContext:vg.Howler.ctx?.state||'unavailable',audioUnlocked:X.isUnlocked(),portalVisible:!!ctx.components.portalCircle?.visible,sourceTextVisible:text.textScene.visible,welcomeVisible:text.textScene.visible,welcomeText:text.textScene.visible?'we are here':'',welcomeWidth:ctx.components.textLayout?.sprites?.[0]?.scale.x||0,welcomeX:ctx.components.textLayout?.sprites?.[0]?.position.x||0,welcomeY:ctx.components.textLayout?.sprites?.[0]?.position.y||0,pixelRatio:renderer.getPixelRatio(),shardDepth:shards?.group.position.z,audioEnabled:X.isEnabled(),playing:[...X._howls].filter(([,h])=>h.playing()).map(([k])=>k),glassY:ctx.components.glassShards?.shards[0]?.position.y});
  root.style.setProperty('--burn-title',String(phase===2?clamp((local-.28)/.04)*(1-clamp((local-.38)/.05)):0));
  root.style.setProperty('--burn-title-scale',String(1+(phase===2?clamp((local-.28)/.15)*.12:0)));
  root.style.setProperty('--reference-end',String(clamp((p-.90)/.04)*(1-clamp((p-.97)/.03))));
  root.dataset.storyPhase=p>.975?'herd':['hand-glass','glass-facts','money-paper'][phase];
  schedule();
 }
 function gesture(e){if(e.isTrusted)X.unlockNow();}
 function pointer(e){if(visible&&e.pointerType!=='touch')rig.onMouseMove(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);}
 function scroll(){schedule();}
 function visibility(){rig.recenterGyro();if(document.hidden){gateLastTime=null;stopAudio();ctx._stage2Video?.pause();ctx._stage2VideoPrefetch?.pause();if(raf)cancelAnimationFrame(raf);raf=0;}else schedule();}
 function contextLost(e){e.preventDefault();fail(Error('WebGL context lost'));}
 function fail(error){console.error('Recovered chapter:',error);dispose();root.dispatchEvent(new CustomEvent('mt:story-fallback',{detail:{error}}));}
 function dispose(){if(!alive)return;alive=false;if(raf)cancelAnimationFrame(raf);stopAudio();rig.dispose();window.removeEventListener('deviceorientation',rig._handleGyro);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',resize);window.visualViewport?.removeEventListener('resize',resize);window.removeEventListener('pointermove',pointer);window.removeEventListener('mousemove',ctx._onMouseMove);window.removeEventListener('pointerdown',gesture,true);window.removeEventListener('touchend',gesture,true);window.removeEventListener('keydown',gesture,true);document.removeEventListener('visibilitychange',visibility);ctx._stage2Video&&Av(ctx._stage2Video);ctx._stage2VideoPrefetch&&Av(ctx._stage2VideoPrefetch);composer.dispose();renderer.dispose();nativeDispose();X.stopAll();for(const howl of X._howls.values())howl.unload();X._howls.clear();if(X._ctxWatch&&vg.Howler.ctx)vg.Howler.ctx.removeEventListener('statechange',X._ctxWatch);X._ctxWatch=null;X._armed=false;X.suspendContext();canvas.removeEventListener('webglcontextlost',contextLost);canvas.style.removeProperty('opacity');root.classList.remove('story-reference');}
 // Silent warmup can arm the mixer, but only a real page gesture can unlock
 // browser audio or obtain native motion consent. The early broker survives
 // slow downloads; no custom Sound/Tilt/Gyro controls are installed.
 X.unlockNow();
 window.addEventListener('pointerdown',gesture,true);window.addEventListener('touchend',gesture,true);window.addEventListener('keydown',gesture,true);
 window.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',resize,{passive:true});window.visualViewport?.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',visibility);
 canvas.addEventListener('webglcontextlost',contextLost);
 applySize();ctx.preWarmed.handsModel2=new Lb(loader);ctx.preWarmed.glassShards=Gb(loader);
 await shatter.prewarm(renderer,camera,ctx.preWarmed.handsModel2.handRef,loader.getAsset('glassShatter'),loader.assets.animations.glassShatter);
 await new Promise(resolve=>requestAnimationFrame(resolve));
 await glass.prewarm(renderer,camera);
 ctx._stage2VideoPrefetch=Dv('',false);
 root.classList.add('story-reference','story-enhanced');root.classList.remove('story-pending');root.dataset.storyRenderer='webgl';root.dataset.storySource='recovered-original';
 measure();await change(p<.18?0:p<.49?1:2);
 // Pay first-use shader compilation/upload during the early offscreen warmup,
 // not the first scroll into the chapter.
 if(!visible){composer.render(0);rig.restore();}
 root.dataset.storyWarm='true';schedule();return{dispose,resize};
}};
