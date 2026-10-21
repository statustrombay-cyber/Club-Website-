/* Capture real chapter gestures BEFORE the deferred engine loads. No controls,
   background music, synthetic activation, or stored permission preferences. */
(function(){
 'use strict';
 if(window.MTStoryInputs)return;
 const inputs=window.MTStoryInputs={motionState:'waiting',motionSample:null,motionError:'',audioError:''};
 let motionRequest=null,lastTouchEnd=-Infinity,previousAudioSession='auto';
 inputs.chapterActive=false;
 inputs.setChapterActive=function(active){
  active=!!active;if(active===inputs.chapterActive)return;inputs.chapterActive=active;
  // Safari's default ambient audio session can obey the ringer switch even
  // with a running context. Playback is chapter-scoped, never site-wide.
  try{if(navigator.audioSession){if(active){previousAudioSession=navigator.audioSession.type;navigator.audioSession.type='playback';}else navigator.audioSession.type=previousAudioSession;}}catch(_){}
 };
 function currentContext(){
  const mixer=window.Howler?.ctx,shared=window.__mtStoryAudioContext;
  return mixer&&mixer.state!=='closed'?mixer:shared&&shared.state!=='closed'?shared:null;
 }
 function unlockAudio(){
  const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
  try{
   const ctx=currentContext()||new Ctx();window.__mtStoryAudioContext=ctx;
   if(ctx.state!=='running'){
    // A resume issued by a non-activating touch can stay pending indefinitely.
    // Never let that promise suppress the next eligible real gesture.
    // The one silent sample is an unlock, never a recording or site-wide bed.
    try{const source=ctx.createBufferSource();source.buffer=ctx.createBuffer(1,1,22050);source.connect(ctx.destination);source.onended=()=>source.disconnect();source.start(0);}catch(_){}
    const result=ctx.resume();
    Promise.resolve(result).then(()=>{inputs.audioError='';},error=>{inputs.audioError=error?.name||'resume failed';});
   }
   const mixer=window.Howler;
   if(mixer?.ctx===ctx&&typeof mixer._autoResume==='function')mixer._autoResume();
  }catch(error){inputs.audioError=error?.name||'Audio unavailable';}
 }
 function storyVisible(){
  const track=document.querySelector('.story-track');if(!track||document.hidden)return false;
  const rect=track.getBoundingClientRect();return rect.top<innerHeight&&rect.bottom>0;
 }
 function requestMotion(){
  if(motionRequest||['granted','active','denied','blocked','unavailable','insecure'].includes(inputs.motionState))return;
  if(!window.isSecureContext){inputs.motionState='insecure';return;}
  const Orientation=window.DeviceOrientationEvent;
  if(!Orientation){inputs.motionState='unavailable';return;}
  if(typeof Orientation.requestPermission!=='function'){
   // Unsupported Generic Sensor feature names can report false even when
   // native DeviceOrientation is usable. Only diagnose recognised restrictions;
   // a native requestPermission API must make its own authoritative decision.
   const policy=document.permissionsPolicy||document.featurePolicy;
   let blocked=false;try{const known=policy?.features?.();blocked=!!known&&['accelerometer','gyroscope'].some(name=>known.includes(name)&&!policy.allowsFeature(name));}catch(_){}
   inputs.motionState=blocked?'blocked':'listening';return;
  }
  inputs.motionState='requesting';
  try{
   // Synchronous invocation inside touchend/click/activation-key, never after
   // models, promises or shader compilation have consumed the user gesture.
   const result=Orientation.requestPermission();
   motionRequest=Promise.resolve(result).then(permission=>{
    inputs.motionState=permission==='granted'?(inputs.motionSample?'active':'granted'):'denied';inputs.motionError='';
   },error=>{
    // NotAllowedError can mean a non-activating scroll/touch, NOT a refusal.
    // Allow a later real tap to retry; an explicit 'denied' is never re-prompted.
    inputs.motionState='waiting';inputs.motionError=error?.name||'Motion unavailable';
   }).finally(()=>{motionRequest=null;});
  }catch(error){inputs.motionState='waiting';inputs.motionError=error?.name||'Motion unavailable';}
 }
 function activate(event){
  if(!event.isTrusted)return;
  unlockAudio();
  if(event.type==='touchend')lastTouchEnd=performance.now();
  // A touch also emits a compatibility click: never ask twice for one tap.
  const motionGesture=event.type==='touchend'||event.type==='click'&&performance.now()-lastTouchEnd>800||event.type==='keydown'&&(event.key==='Enter'||event.key===' ');
  if(motionGesture&&(matchMedia('(any-pointer: coarse)').matches||navigator.maxTouchPoints>0))requestMotion();
 }
 function orientation(event){
  if(!Number.isFinite(event.beta)||!Number.isFinite(event.gamma))return;
  inputs.motionSample={beta:event.beta,gamma:event.gamma,absolute:!!event.absolute};inputs.motionState='active';
 }
 // The broker also retains a calibration sample if consent/sensors arrive
 // before the WebGL assets finish. The scene listens to subsequent OS events.
 window.addEventListener('deviceorientation',orientation,{passive:true});
 for(const type of ['pointerdown','touchstart','touchend','click','keydown'])window.addEventListener(type,activate,{capture:true,passive:true});
 document.addEventListener('visibilitychange',()=>{
  inputs.motionSample=null;inputs.setChapterActive(!document.hidden&&storyVisible());
  if(!document.hidden){const ctx=currentContext();if(ctx&&ctx.state!=='running')Promise.resolve(ctx.resume()).catch(()=>{});}
 });
})();
