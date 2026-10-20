/* The story engine is loaded lazily after the intro. Resume one shared Web
   AudioContext directly inside a real gesture so mobile browsers never leave
   the chapter silent; this installs no controls and emits no sound by itself. */
(function(){
 'use strict';
 let unlocking=false;
 function unlock(event){
  if(!event.isTrusted||unlocking)return;
  const Ctx=window.AudioContext||window.webkitAudioContext;
  if(!Ctx)return;
  let ctx=window.__mtStoryAudioContext||window.Howler?.ctx;
  try{
   if(!ctx){ctx=new Ctx();window.__mtStoryAudioContext=ctx;}
   if(ctx.state==='suspended'){
    unlocking=true;
    try{
     const buffer=ctx.createBuffer(1,1,22050),source=ctx.createBufferSource();
     source.buffer=buffer;source.connect(ctx.destination);source.start(0);
    }catch(_){/* resume below is still useful on browsers without silent unlock */}
    const resumed=ctx.resume?.();
    if(resumed&&typeof resumed.then==='function')resumed.catch(()=>{}).finally(()=>{unlocking=false;});
    else unlocking=false;
   }
   const howler=window.Howler;
   if(howler&&howler.ctx===ctx&&typeof howler._autoResume==='function')howler._autoResume();
  }catch(_){unlocking=false;}
 }
 window.addEventListener('pointerdown',unlock,{capture:true,passive:true});
 window.addEventListener('touchend',unlock,{capture:true,passive:true});
 window.addEventListener('keydown',unlock,{capture:true});
})();
