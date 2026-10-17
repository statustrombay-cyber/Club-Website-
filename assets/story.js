/* DOM-ready, lazy local WebGL boot. Real HTML remains the fallback. The scene
   bundle is deliberately external/lazy, not inlined into the opening hero. */
(function(){'use strict';
 function startStory(){
  const root=document.querySelector('.mind-story');if(!root)return;
  const track=root.querySelector('.story-track'),stage=root.querySelector('.story-stage');
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
  let instance=null,loading=false,failed=false,generation=0,observer=null;
  const low=()=>motion.matches||connection&&connection.saveData;
  function staticStory(){generation++;if(instance)instance.dispose();instance=null;root.classList.remove('story-pending','story-enhanced');root.dataset.storyRenderer='static';root.querySelectorAll('.story-type > span').forEach(el=>{el.style.removeProperty('opacity');el.style.removeProperty('transform');});window.dispatchEvent(new CustomEvent('mt:story-audio',{detail:{progress:-1}}));}
  function engine(){return new Promise((resolve,reject)=>{if(window.MTStory3D){resolve();return;}const script=document.createElement('script'),timer=setTimeout(()=>reject(Error('3D engine timed out')),12000);script.src='/assets/vendor/story-3d.js';script.onload=()=>{clearTimeout(timer);resolve();};script.onerror=()=>{clearTimeout(timer);reject(Error('3D engine unavailable'));};document.head.append(script);});}
  async function prepare(){
   if(loading||instance||failed||low())return;loading=true;const ticket=generation;
   try{
    if(document.fonts)await Promise.race([Promise.all([document.fonts.load('400 48px "Story Bodoni"'),document.fonts.load('400 48px "Story Script"')]).catch(()=>{}),new Promise(resolve=>setTimeout(resolve,1200))]);
    await engine();if(ticket!==generation||low())return;
    const scene=await window.MTStory3D.create(root);
    if(ticket!==generation||low()){scene.dispose();root.classList.remove('story-pending','story-enhanced');root.dataset.storyRenderer='static';return;}instance=scene;
   }catch(_){failed=true;staticStory();}finally{loading=false;}
  }
  function near(){if(low()||failed)return;const r=track.getBoundingClientRect();if(r.top<innerHeight+1200&&r.bottom>-1200)prepare();}
  function configure(){if(low()||failed){staticStory();return;}root.classList.add('story-pending');near();}
  root.addEventListener('mt:story-fallback',()=>{failed=true;staticStory();});
  addEventListener('scroll',near,{passive:true});addEventListener('resize',near,{passive:true});
  if(motion.addEventListener)motion.addEventListener('change',configure);else if(motion.addListener)motion.addListener(configure);
  if(connection&&connection.addEventListener)connection.addEventListener('change',configure);
  if('IntersectionObserver'in window){observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting))prepare();},{rootMargin:'1200px'});observer.observe(track);}
  configure();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startStory,{once:true});else startStory();
})();
