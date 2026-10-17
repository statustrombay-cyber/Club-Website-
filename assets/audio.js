/* Three requested cues only. Web Audio is unlocked by a real visitor gesture;
   the intro is never replayed late, and no audio follows the story chapter. */
(function(){'use strict';
 function boot(){
  const button=document.getElementById('soundButton');if(!button)return;
  let context,master,enabled=true,loading=false,horse=null,drone=null,droneGain=null,progress=-1,lastImpact=-100,introDone=!!location.hash,buffers={};
  try{enabled=localStorage.getItem('mt-sound')!=='off';}catch(_){}
  function ui(){const live=enabled&&context&&context.state==='running';button.setAttribute('aria-pressed',live?'true':'false');button.setAttribute('aria-label',live?'Mute sound':'Enable sound');button.dataset.sound=live?'on':'off';button.querySelector('span').textContent=live?'Sound on':'Sound';}
  function source(buffer,loop=false){const node=context.createBufferSource();node.buffer=buffer;node.loop=loop;return node;}
  function intro(){
   const splash=document.getElementById('splash');
   if(!enabled||!context||context.state!=='running'||introDone||horse||!buffers.horse||!splash||splash.hidden)return;
   const node=source(buffers.horse),gain=context.createGain();gain.gain.value=.7;node.connect(gain).connect(master);node.start();horse={node,gain};
  }
  function music(){
   if(!context||context.state!=='running'||!buffers.drone)return;
   const allowed=enabled&&progress>.10&&progress<.94&&!document.hidden;
   if(allowed&&!drone){drone=source(buffers.drone,true);droneGain=context.createGain();droneGain.gain.value=0;drone.connect(droneGain).connect(master);drone.start();}
   const outside=progress<0||progress>=.985||document.hidden||!enabled;
   if(droneGain)droneGain.gain.setTargetAtTime(allowed?.22:0,context.currentTime,outside?.008:.35);
   if(outside&&drone){droneGain.gain.cancelScheduledValues(context.currentTime);droneGain.gain.setValueAtTime(0,context.currentTime);drone.stop(context.currentTime+.02);drone=null;droneGain=null;}
   button.dataset.chapterAudio=allowed?'on':'off';
  }
  async function unlock(){
   if(!enabled)return;
   try{
    if(!context){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;context=new AC();master=context.createGain();master.gain.value=.5;master.connect(context.destination);context.addEventListener('statechange',ui);}
    // resume is called synchronously from pointer/keyboard or sound-button events.
    const resumed=context.resume();
    if(!loading){loading=true;[['horse','intro-gallop'],['glass','glass-impact'],['drone','chapter-foreboding']].forEach(async([key,name])=>{try{const response=await fetch('/assets/audio/'+name+'.mp3');if(!response.ok)throw Error();buffers[key]=await context.decodeAudioData(await response.arrayBuffer());if(key==='horse')intro();if(key==='drone')music();}catch(_){button.dataset.audioError='unavailable';}});}
    await resumed;master.gain.setTargetAtTime(enabled?.5:0,context.currentTime,.08);ui();intro();music();
   }catch(_){ui();}
  }
  function stopHorse(){introDone=true;if(horse){try{horse.gain.gain.setTargetAtTime(0,context.currentTime,.035);horse.node.stop(context.currentTime+.18);}catch(_){}horse=null;}}
  button.addEventListener('click',()=>{if(context&&context.state==='running'&&enabled){enabled=false;try{localStorage.setItem('mt-sound','off');}catch(_){}master.gain.setTargetAtTime(0,context.currentTime,.06);stopHorse();music();ui();}else{enabled=true;try{localStorage.setItem('mt-sound','on');}catch(_){}unlock();}});
  ['pointerdown','keydown'].forEach(name=>document.addEventListener(name,e=>{if(e.target.closest&&e.target.closest('#soundButton'))return;if(enabled)unlock();},{passive:true}));
  window.addEventListener('mt:intro-ready',stopHorse);
  window.addEventListener('mt:story-audio',e=>{progress=e.detail.progress;music();});
  window.addEventListener('mt:glass-impact',()=>{
   if(!enabled||!context||context.state!=='running'||!buffers.glass||document.hidden||performance.now()-lastImpact<2500)return;
   lastImpact=performance.now();const node=source(buffers.glass);node.connect(master);node.start();
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopHorse();music();if(context)context.suspend().catch(()=>{});}else if(context&&enabled)context.resume().then(()=>{ui();music();}).catch(()=>{});});
  window.addEventListener('pagehide',()=>{stopHorse();progress=-1;music();if(context)context.suspend().catch(()=>{});});
  ui();
  // Do not promise autoplay. Eligible browsers may allow it; otherwise the
  // button and first deliberate interaction unlock sound, never a late gallop.
  if(enabled)unlock();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
