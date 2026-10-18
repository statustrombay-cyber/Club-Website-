/* Native scroll is the animation driver, including on Data Saver/reduced-motion
   devices. Those preferences reduce idle work; they must not turn this chapter
   into an unexplained sheet of facts. */
(function(){'use strict';
 function startStory(){
  const root=document.querySelector('.mind-story');if(!root)return;
  const track=root.querySelector('.story-track'),canvas=root.querySelector('.story-canvas');
  root.style.setProperty('--story-track-height',Math.round(innerHeight*6.6)+'px');
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
  let instance=null,loading=false,generation=0,enginePromise=null,retries=0,retryTimer=0,failed=false;
  const status=document.createElement('p');status.className='story-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.hidden=true;root.querySelector('.story-stage').append(status);
  function announce(text){status.textContent=text;status.hidden=!text;}
  function staticStory(reason){
   const anchor=document.elementFromPoint(innerWidth/2,Math.min(innerHeight-1,innerHeight*.55)),keep=anchor&&anchor!==document.body&&anchor!==document.documentElement&&!root.contains(anchor),before=keep?anchor.getBoundingClientRect().top:0;
   generation++;if(instance)instance.dispose();instance=null;root.classList.remove('story-pending','story-enhanced','story-reference');root.dataset.storyRenderer='static';root.dataset.storyState='fallback';root.dataset.storyError=reason||'WebGL unavailable';
   root.querySelectorAll('.story-type > span').forEach(el=>{el.style.removeProperty('opacity');el.style.removeProperty('transform');});
   announce('The animated scene could not start. The text version is shown below.');
   if(keep&&anchor.isConnected){const shift=anchor.getBoundingClientRect().top-before;if(Math.abs(shift)>1)scrollBy({top:shift,behavior:'instant'});}
  }
  function engine(){
   if(window.MTStory3D)return Promise.resolve();if(enginePromise)return enginePromise;
   enginePromise=new Promise((resolve,reject)=>{
    const script=document.createElement('script');script.src='/index.php?scene-asset=engine';script.async=true;script.fetchPriority='low';
    // Mobile downloads are allowed to finish. The former 12s timeout reproduced
    // a permanent HTML-only scene even when the script arrived two seconds later.
    const timer=setTimeout(()=>{script.remove();reject(Error('3D engine timed out after 60 seconds'));},60000);
    script.onload=()=>{clearTimeout(timer);window.MTStory3D?resolve():reject(Error('3D engine did not register'));};
    script.onerror=()=>{clearTimeout(timer);script.remove();reject(Error('3D engine unavailable'));};document.head.append(script);
   }).catch(error=>{enginePromise=null;throw error;});return enginePromise;
  }
  function failure(error){
   if(failed)return;failed=true;const reason=error?.message||String(error||'WebGL unavailable');console.error('Club animated story:',error);
   root.dataset.storyError=reason;
   // A transient download failure gets one bounded retry without collapsing
   // and expanding the chapter's reserved scroll space underneath the reader.
   if(!reason.includes('WebGL context lost')&&retries++<1){
    generation++;instance?.dispose();instance=null;root.classList.remove('story-enhanced','story-reference');root.classList.add('story-pending');root.dataset.storyState='retrying';root.dataset.storyRenderer='loading';announce('');
    retryTimer=setTimeout(()=>{failed=false;near();},2000);
   }else staticStory(reason);
  }
  async function prepare(){
   if(loading||instance||failed)return;loading=true;const ticket=generation;
   root.classList.add('story-pending');root.dataset.storyState='loading';announce('');
   try{
    await engine();if(ticket!==generation)return;
    const scene=await window.MTStory3D.create(root);
    if(ticket!==generation){scene.dispose();return;}instance=scene;root.dataset.storyState='ready';delete root.dataset.storyError;announce('');
   }catch(error){failure(error);}finally{loading=false;}
  }
  const header=document.querySelector('.nav-wrap');
  let viewportWidth=0,viewportHeight=0;
  function lockViewport(){
   const width=document.documentElement.clientWidth;
   if(width!==viewportWidth){
    root.style.removeProperty('--story-viewport-height');
    viewportHeight=Math.ceil(Math.max(innerHeight,window.visualViewport?.height||0,root.querySelector('.story-stage').clientHeight));
    viewportWidth=width;
   }else viewportHeight=Math.max(viewportHeight,Math.ceil(innerHeight));
   root.style.setProperty('--story-viewport-height',viewportHeight+'px');
  }
  function immersion(){
   const r=track.getBoundingClientRect(),active=r.top<=72&&r.bottom>0;
   document.body.classList.toggle('story-immersive',active);
   root.dataset.storyCovered=String(active&&(-r.top/Math.max(1,track.offsetHeight-root.querySelector('.story-stage').clientHeight))<.94);
   if(header){header.inert=active;if(active)header.setAttribute('aria-hidden','true');else header.removeAttribute('aria-hidden');}
  }
  function near(){lockViewport();immersion();const r=track.getBoundingClientRect();if(r.top<innerHeight+2800&&r.bottom>-2800)prepare();}
  function configure(){root.dataset.storyReducedMotion=String(motion.matches);root.dataset.storySaveData=String(!!connection?.saveData);instance?.resize();near();}
  root.addEventListener('mt:story-fallback',event=>failure(event.detail?.error||Error('WebGL scene stopped')));
  addEventListener('scroll',near,{passive:true});addEventListener('resize',near,{passive:true});
  canvas.addEventListener('webglcontextrestored',()=>{failed=false;retries=0;near();});
  addEventListener('online',()=>{clearTimeout(retryTimer);failed=false;retries=0;near();});
  if(motion.addEventListener)motion.addEventListener('change',configure);else if(motion.addListener)motion.addListener(configure);
  if(connection?.addEventListener)connection.addEventListener('change',configure);
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting))prepare();},{rootMargin:'2800px'});observer.observe(track);}
  root.classList.add('story-pending');configure();
  // Fetch the engine immediately, then warm models/shaders while the visitor
  // reads the opening. Offscreen scenes do not run an animation loop.
  engine().then(()=>{
   if('requestIdleCallback'in window)requestIdleCallback(()=>prepare(),{timeout:1600});
   else setTimeout(prepare,500);
  }).catch(()=>{});
  const brand=document.querySelector('.brand-chapter');
  if(brand&&'IntersectionObserver'in window){const warm=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){prepare();warm.disconnect();}},{rootMargin:'600px'});warm.observe(brand);}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startStory,{once:true});else startStory();
})();
