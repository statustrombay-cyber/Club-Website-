/** Optional real-browser regression: early warmup, actual reverse fade frames,
 * and a new forward visit. Use the same browser setup as reference-story.mjs.
 * No production timing threshold: local software-GPU timing is not phone proof.
 */
import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto((process.env.TEST_URL||'http://localhost:4173')+'/');
 await page.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 const warm=await page.evaluate(()=>({timeMs:Math.round(performance.now()),scrollY,top:document.querySelector('.story-track').getBoundingClientRect().top,hidden:document.querySelector('.story-status').hidden,warm:document.querySelector('.mind-story').dataset.storyWarm}));
 assert.equal(warm.scrollY,0);assert.ok(warm.top>844);assert.ok(warm.hidden);assert.equal(warm.warm,'true');
 async function jump(progress){
  await page.locator('.story-track').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*p,behavior:'instant'}),progress);
  await page.waitForFunction(p=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-p)<.005,progress,{timeout:30000});
 }
 await jump(.13);await jump(.3);await page.waitForTimeout(300);
 const samples=await page.evaluate(()=>new Promise(resolve=>{
  const frames=[],start=performance.now(),root=document.querySelector('.mind-story'),track=root.querySelector('.story-track');
  scrollTo({top:track.getBoundingClientRect().top+scrollY+(track.offsetHeight-innerHeight)*.28,behavior:'instant'});
  function tick(){const s=JSON.parse(root.dataset.storyNative);frames.push({opacity:s.glassOpacity,breaks:s.breakCount});if(performance.now()-start<1500)requestAnimationFrame(tick);else resolve(frames);}requestAnimationFrame(tick);
 }));
 const opacity=[...new Set(samples.map(s=>s.opacity))];
 assert.ok(opacity.some(v=>v>0&&v<1),'at least one actually rendered intermediate glass fade');
 assert.equal(samples.at(-1).opacity,0);assert.equal(new Set(samples.map(s=>s.breaks)).size,1);
 const count=samples.at(-1).breaks;
 await jump(.08);await jump(.14);
 assert.equal(await page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative).breakCount),count);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(350);await jump(.13);
 const reentry=await page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));
 assert.ok(!reentry.glassDismissed&&reentry.shatterEnabled);assert.equal(reentry.breakCount,count+1);
 // Keep navigation hidden even while only the story's last sliver is visible.
 await page.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().bottom+scrollY-innerHeight*.25,behavior:'instant'}));
 await page.waitForTimeout(350);
 assert.ok(await page.locator('.nav-wrap').evaluate(e=>e.inert&&getComputedStyle(e).visibility==='hidden'));
 await page.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().bottom+scrollY+10,behavior:'instant'}));
 await page.waitForTimeout(350);
 assert.ok(await page.locator('.nav-wrap').evaluate(e=>!e.inert&&getComputedStyle(e).visibility==='visible'));
 assert.deepEqual(errors,[]);console.log(JSON.stringify({warm,opacity,reverseBreaks:count,newVisitBreaks:reentry.breakCount,errors},null,2));
}finally{await browser.close();}
