/* DOM-ready, lazy local WebGL boot. Real HTML remains the fallback. The scene
   bundle is deliberately external/lazy, not inlined into the opening hero. */
(function(){'use strict';
 function startStory(){
  const root=document.querySelector('.mind-story');if(!root)return;
  const track=root.querySelector('.story-track');
  // Freeze scroll-space once. Mobile URL-bar/visualViewport changes must resize
  // the drawing surface, never the length of the document below the chapter.
  root.style.setProperty('--story-track-height',Math.round(innerHeight*6.6)+'px');
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
  let instance=null,loading=false,failed=false,generation=0,observer=null,lastScrollAt=performance.now(),prefetched=false;
  const low=()=>motion.matches||connection&&connection.saveData;
  function staticStory(){
   // If a late network/context/motion fallback shrinks an earlier chapter,
   // preserve the actual content currently under the visitor, not its old Y.
   const anchor=document.elementFromPoint(innerWidth/2,Math.min(innerHeight-1,innerHeight*.55)),keep=anchor&&anchor!==document.body&&anchor!==document.documentElement&&!root.contains(anchor),before=keep?anchor.getBoundingClientRect().top:0;
   generation++;if(instance)instance.dispose();instance=null;root.classList.remove('story-pending','story-enhanced');root.dataset.storyRenderer='static';root.querySelectorAll('.story-type > span').forEach(el=>{el.style.removeProperty('opacity');el.style.removeProperty('transform');});
   if(keep&&anchor.isConnected){const shift=anchor.getBoundingClientRect().top-before;if(Math.abs(shift)>1)scrollBy({top:shift,behavior:'instant'});}
  }
  function engine(){return new Promise((resolve,reject)=>{if(window.MTStory3D){resolve();return;}const script=document.createElement('script'),timer=setTimeout(()=>reject(Error('3D engine timed out')),12000);script.src='/assets/vendor/story-3d.js';script.onload=()=>{clearTimeout(timer);resolve();};script.onerror=()=>{clearTimeout(timer);reject(Error('3D engine unavailable'));};document.head.append(script);});}
  function warmDownloads(){
   if(prefetched)return;prefetched=true;
   for(const [url,kind] of [['/assets/vendor/story-3d.js','script'],['/assets/story/hand-painted-poses.webp','image'],['/assets/story/velvet-curtain.webp','image'],['/assets/story/freud-note.webp','image']]){const link=document.createElement('link');link.rel='preload';link.as=kind;link.href=url;document.head.append(link);}
  }
  function idleOrVisible(){return new Promise(resolve=>{function check(){const r=track.getBoundingClientRect();if(low()||r.top<innerHeight&&r.bottom>0||performance.now()-lastScrollAt>280)resolve();else setTimeout(check,80);}check();});}
  async function prepare(){
   if(loading||instance||failed||low())return;loading=true;const ticket=generation;warmDownloads();
   try{
    // Download early, but do not parse/build a GPU scene during rapid deck/wire input.
    await idleOrVisible();if(ticket!==generation||low())return;
    // Fetch/parse the engine in parallel with fonts, not after a font timeout.
    const fonts=document.fonts?Promise.race([Promise.all([document.fonts.load('400 48px "Story Bodoni"'),document.fonts.load('400 48px "Story Script"')]).catch(()=>{}),new Promise(resolve=>setTimeout(resolve,500))]):Promise.resolve();
    await Promise.all([engine(),fonts]);if(ticket!==generation||low())return;
    const scene=await window.MTStory3D.create(root);
    if(ticket!==generation||low()){scene.dispose();root.classList.remove('story-pending','story-enhanced');root.dataset.storyRenderer='static';return;}instance=scene;
   }catch(_){failed=true;staticStory();}finally{loading=false;}
  }
  function near(){if(low()||failed)return;const r=track.getBoundingClientRect();if(r.top<innerHeight+2800&&r.bottom>-2800)prepare();}
  function configure(){if(low()||failed){staticStory();return;}root.classList.add('story-pending');near();}
  root.addEventListener('mt:story-fallback',()=>{failed=true;staticStory();});
  addEventListener('scroll',()=>{lastScrollAt=performance.now();near();},{passive:true});addEventListener('resize',near,{passive:true});
  if(motion.addEventListener)motion.addEventListener('change',configure);else if(motion.addListener)motion.addListener(configure);
  if(connection&&connection.addEventListener)connection.addEventListener('change',configure);
  if('IntersectionObserver'in window){observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting))prepare();},{rootMargin:'2800px'});observer.observe(track);}
  configure();
  // Prewarm while the reader is still in the earlier rings/wires, not at impact.
  const brand=document.querySelector('.brand-chapter');
  if(brand&&'IntersectionObserver'in window){const warm=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){prepare();warm.disconnect();}},{rootMargin:'600px'});warm.observe(brand);}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startStory,{once:true});else startStory();
})();
