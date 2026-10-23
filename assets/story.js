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
  // Never parse the large engine, decode models or compile WebGL programs in
  // the middle of the paint/ring splash. Preload may download without executing.
  const introReady=new Promise(resolve=>{
   if(!document.documentElement.classList.contains('intro-cover'))return resolve();
   window.addEventListener('mt:intro-ready',()=>requestAnimationFrame(()=>requestAnimationFrame(resolve)),{once:true});
   // Same accessibility/failure escape as the splash; no permanently held scene.
   setTimeout(resolve,7000);
  });
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
    await introReady;await engine();if(ticket!==generation)return;
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
   if(root.style.getPropertyValue('--story-viewport-height')!==viewportHeight+'px')root.style.setProperty('--story-viewport-height',viewportHeight+'px');
  }
  function immersion(r){
   r=r||track.getBoundingClientRect();const active=r.top<=0&&r.bottom>0;
   document.body.classList.toggle('story-immersive',active);
   document.documentElement.classList.toggle('story-immersive',active);
   const progress=Math.max(0,Math.min(1,-r.top/Math.max(1,track.offsetHeight-viewportHeight)));
   // Paint belongs to native scrolling, not the slower asynchronous GPU loop.
   root.dataset.storyPaint=progress>.975?'herd':progress>=.49?'money-paper':'hand-glass';
   root.style.setProperty('--story-canvas-opacity',String(1-Math.max(0,Math.min(1,(progress-.97)/.03))));
   root.dataset.storyCovered=String(active&&progress<.94);
   window.MTStoryInputs?.setChapterActive(active&&progress<1);
   if(header){header.inert=active;if(active)header.setAttribute('aria-hidden','true');else header.removeAttribute('aria-hidden');}
  }
  function near(){const r=track.getBoundingClientRect();immersion(r);if(r.top<innerHeight+1600&&r.bottom>-1600)prepare();}
  function resizeViewport(){lockViewport();near();}
  function configure(){root.dataset.storyReducedMotion=String(motion.matches);root.dataset.storySaveData=String(!!connection?.saveData);instance?.resize();resizeViewport();}
  root.addEventListener('mt:story-fallback',event=>failure(event.detail?.error||Error('WebGL scene stopped')));
  addEventListener('scroll',near,{passive:true});addEventListener('resize',resizeViewport,{passive:true});
  window.visualViewport?.addEventListener('resize',resizeViewport,{passive:true});
  window.visualViewport?.addEventListener('scroll',()=>immersion(),{passive:true});
  canvas.addEventListener('webglcontextrestored',()=>{failed=false;retries=0;near();});
  addEventListener('online',()=>{clearTimeout(retryTimer);failed=false;retries=0;near();});
  if(motion.addEventListener)motion.addEventListener('change',configure);else if(motion.addListener)motion.addListener(configure);
  if(connection?.addEventListener)connection.addEventListener('change',configure);
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting))prepare();},{rootMargin:'1600px'});observer.observe(track);}
  root.classList.add('story-pending');configure();
  // Do not initialise WebGL, decode models or run a second video while the
  // visitor is on the hero/forms. Warm only on approach to this chapter.
  const brand=document.querySelector('.brand-chapter');
  if(brand&&'IntersectionObserver'in window){const warm=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){prepare();warm.disconnect();}},{rootMargin:'600px'});warm.observe(brand);}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startStory,{once:true});else startStory();
})();
