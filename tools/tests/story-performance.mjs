/** Work-budget regressions, not an emulated/physical-phone FPS promise. */
import {chromium} from 'playwright-core';import assert from 'node:assert/strict';import fs from 'node:fs';
import {warmStory} from './browser-story.mjs';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS,report={checks:[],errors:[]};if(dest)fs.mkdirSync(dest,{recursive:true});
function check(v,text){assert.ok(v,text);report.checks.push(text);}
try{
 const p=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});p.on('pageerror',e=>report.errors.push(e.message));
 await p.addInitScript(()=>{window.__draws=0;window.__tasks=[];for(const name of ['drawElements','drawArrays']){const fn=WebGL2RenderingContext.prototype[name];WebGL2RenderingContext.prototype[name]=function(...args){__draws++;return fn.apply(this,args)};}new PerformanceObserver(l=>__tasks.push(...l.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true});});
 await p.goto(base+'/');await p.waitForFunction(()=>document.body.classList.contains('intro-revealed'));await p.waitForTimeout(1800);
 check(await p.evaluate(()=>!window.MTStory3D&&!performance.getEntriesByType('resource').some(e=>e.name.includes('scene-asset=engine'))),'hero/splash does not download or execute the WebGL engine');
 check(await p.evaluate(()=>__draws===0&&document.querySelectorAll('video').length===1),'hero has no hidden story GL work or second video decoder');
 check(await p.evaluate(()=>(()=>{const urls=[...document.querySelectorAll('[data-wire-object]')].map(e=>new URL(e.dataset.atlasSrc,location.href).href);return urls.length===3&&!performance.getEntriesByType('resource').some(e=>urls.includes(e.name));})()),'large rotating-wire atlas downloads wait for chapter approach');
 report.heroLongTasks=await p.evaluate(()=>__tasks);
 await warmStory(p);await p.waitForTimeout(350);const before=await p.evaluate(()=>__draws);await p.waitForTimeout(450);
 check(await p.evaluate(n=>__draws===n&&[...document.querySelectorAll('video:not(#heroVideo)')].every(e=>e.paused),before),'a warmed offscreen story stops all drawing and hidden video playback');
 await p.touchscreen.tap(20,210);await p.waitForTimeout(200);
 check(await p.evaluate(()=>[...document.querySelectorAll('video:not(#heroVideo)')].every(e=>e.paused)),'later ordinary hero taps cannot restart the hidden prefetch video');
 for(const height of [928,754,844]){
  await p.setViewportSize({width:390,height});await p.locator('.brand-chapter').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.7,behavior:'instant'}));await p.waitForTimeout(150);
  const rect=await p.locator('.brand-chapter-stage').evaluate(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,viewport:innerHeight}));
  check(Math.abs(rect.bottom-rect.viewport)<1,'rings/Manifest stage fills the current '+height+'px viewport without a bottom band');
  if(dest)await p.screenshot({path:`${dest}/manifest-${height}.png`});
 }
 await p.waitForFunction(()=>[...document.querySelectorAll('[data-wire-object]')].every(e=>['motion','fallback-motion'].includes(e.dataset.wireState)));
 const wireFrames=await p.locator('[data-wire-object]').evaluateAll(es=>es.map(e=>e.dataset.wireFrame));await p.waitForTimeout(220);
 check(await p.locator('[data-wire-object]').evaluateAll((es,before)=>es.length===3&&es.every((e,i)=>e.dataset.wireFrame!==before[i]),wireFrames),'all three original wire clocks animate after deferred loading');
 report.approachLongTasks=await p.evaluate(()=>__tasks);await p.close();
 // Exercise the hardware quality path with deliberately delayed callbacks.
 // This is controlled workload injection, not a benchmark of the software GPU.
 const c=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
 await c.addInitScript(()=>{const get=WebGL2RenderingContext.prototype.getExtension;WebGL2RenderingContext.prototype.getExtension=function(name){return name==='WEBGL_debug_renderer_info'?null:get.call(this,name)};const raf=requestAnimationFrame;window.requestAnimationFrame=cb=>raf(()=>setTimeout(()=>cb(performance.now()),45));});
 const slow=await c.newPage();slow.on('pageerror',e=>report.errors.push(e.message));await slow.goto(base+'/#human-story');
 await slow.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:70000});
 await slow.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*.7,behavior:'instant'}));
 await slow.waitForFunction(()=>{const s=JSON.parse(document.querySelector('.mind-story').dataset.storyNative||'{}');return s.phase===2&&s.pixelRatio>=1&&s.pixelRatio<1.35},null,{timeout:20000}).catch(async error=>{console.error(await slow.evaluate(()=>({data:{...document.querySelector('.mind-story').dataset},scrollY,top:document.querySelector('.story-track').getBoundingClientRect().top,draws:window.__draws})));throw error;});
 const state=await slow.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));
 check(state.papers===16&&state.shreds===6,'slow-frame adaptation retains all original papers/shreds');report.adaptedPixelRatio=state.pixelRatio;
 check(await slow.evaluate(()=>performance.getEntriesByType('resource').some(e=>e.name.includes('club-editorials.webp'))),'adaptive rendering retains the full printed atlas rather than substituting low-res sheets');
 await c.close();assert.deepEqual(report.errors,[]);console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
