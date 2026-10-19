/** Rendered forward/reverse regression. No software-GPU FPS claim. */
import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto((process.env.TEST_URL||'http://localhost:4173')+'/');
 await page.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 const warm=await page.evaluate(()=>({scrollY,top:document.querySelector('.story-track').getBoundingClientRect().top,hidden:document.querySelector('.story-status').hidden,warm:document.querySelector('.mind-story').dataset.storyWarm}));
 assert.equal(warm.scrollY,0);assert.ok(warm.top>900);assert.ok(warm.hidden);assert.equal(warm.warm,'true');
 async function jump(progress){
  await page.locator('.story-track').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*p,behavior:'instant'}),progress);
  await page.waitForFunction(p=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-p)<.005,progress,{timeout:30000});
  return page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));
 }
 await page.waitForFunction(()=>document.body.classList.contains('intro-revealed'));
 await jump(.13);await jump(.3);
 const samples=await page.evaluate(()=>new Promise(resolve=>{
  const frames=[],start=performance.now(),root=document.querySelector('.mind-story'),track=root.querySelector('.story-track');
  scrollTo({top:track.getBoundingClientRect().top+scrollY+(track.offsetHeight-root.querySelector('.story-stage').clientHeight)*.28,behavior:'instant'});
  function tick(){const s=JSON.parse(root.dataset.storyNative);frames.push({opacity:s.glassOpacity,glass:s.glassEnabled,facts:s.visibleFactOverlays,breaks:s.breakCount,shatter:s.shatterEnabled,playing:s.playing});if(performance.now()-start<900)requestAnimationFrame(tick);else resolve(frames);}requestAnimationFrame(tick);
 }));
 assert.ok(samples.every(s=>s.opacity===1&&s.glass&&s.facts===6),'every reverse frame retains the actual shard pass and all fact overlays');
 assert.equal(new Set(samples.map(s=>s.breaks)).size,1);
 assert.ok(samples.slice(-3).every(s=>!s.shatter&&!s.playing.includes('glass-shatter')),'reverse frames have no fracture pass or glass-breaking sound');
 const count=samples.at(-1).breaks;
 for(const progress of [.08,.14,.75,.9,.64,.5,.4,.08]){
  const state=await jump(progress);
  assert.equal(state.breakCount,count);assert.ok(!state.shatterEnabled);
  if(progress<.49)assert.ok(state.glassEnabled&&state.visibleFactOverlays===6&&state.glassOpacity===1);
  if(progress===.64||progress===.5){assert.equal(state.degreeShred,0);assert.equal(state.degreeOpacity,0);assert.equal(state.editorialOpacity,0,'reverse through burn cannot leave opaque later papers in front');}
 }
 // A deliberate completely new visit may run its opening once again.
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(350);const reentry=await jump(.13);
 assert.ok(!reentry.fractureSpent&&reentry.shatterEnabled);assert.equal(reentry.breakCount,count+1);
 await page.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().bottom+scrollY-innerHeight*.25,behavior:'instant'}));await page.waitForTimeout(250);
 assert.ok(await page.locator('.nav-wrap').evaluate(e=>e.inert&&getComputedStyle(e).visibility==='hidden'));
 await page.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().bottom+scrollY+10,behavior:'instant'}));await page.waitForTimeout(250);
 assert.ok(await page.locator('.nav-wrap').evaluate(e=>!e.inert&&getComputedStyle(e).visibility==='visible'));
 assert.deepEqual(errors,[]);console.log(JSON.stringify({width,warm,reverseFrames:samples.length,reverseBreaks:count,newVisitBreaks:reentry.breakCount,errors}));await page.close();
 }
}finally{await browser.close();}
