/* One glass cue only. No buttons, music, gallop, orientation permission or
   delayed replay. A trusted interaction unlocks Web Audio where required. */
(function(){'use strict';
 function boot(){
  let context,buffer,decoded,active=null,lastImpact=-Infinity;
  const bytes=fetch('/assets/audio/glass-impact.mp3').then(r=>{if(!r.ok)throw Error('No glass cue');return r.arrayBuffer();}).catch(()=>null);
  async function unlock(){
   try{
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    if(!context)context=new AC();
    const resumed=context.resume();
    if(!decoded)decoded=bytes.then(data=>data?context.decodeAudioData(data):null).then(b=>{buffer=b;}).catch(()=>{});
    await resumed;
   }catch(_){}
  }
  function stop(){if(active){try{active.stop();}catch(_){}active=null;}}
  for(const name of ['pointerdown','touchend','keydown'])document.addEventListener(name,e=>{if(e.isTrusted)unlock();},{passive:true});
  window.addEventListener('mt:glass-impact',()=>{
   // Never wait for a suspended context or a slow decode: that would produce a
   // late crash unrelated to the first visible broken-glass frame.
   if(!context||context.state!=='running'||!buffer||document.hidden||performance.now()-lastImpact<2500)return;
   stop();lastImpact=performance.now();const s=context.createBufferSource(),g=context.createGain();s.buffer=buffer;g.gain.value=.48;s.connect(g).connect(context.destination);s.onended=()=>{s.disconnect();g.disconnect();if(active===s)active=null;};s.start();active=s;
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();if(context)context.suspend().catch(()=>{});}});
  window.addEventListener('pagehide',()=>{stop();if(context)context.suspend().catch(()=>{});});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
