/** Cold fast-scroll regression against the PHP-hosted loader. Run after starting
 * npm run preview. Optional browser setup: see reference-story.mjs.
 * Images/reports must stay outside the public tree (TEST_ARTIFACTS).
 */
import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {screenshotPixels} from '../png-pixels.mjs';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',reports=[];
try{
 for(const viewport of [{width:390,height:844},{width:1440,height:900}]){
  const context=await browser.newContext({viewport,isMobile:viewport.width<600,hasTouch:viewport.width<600}),errors=[],requests=[];
  // This reproduces the host restrictions the last failed update overlooked.
  await context.route(/\/assets\/(?:vendor\/story-3d\.js|reference\/.*\.(?:wasm|ktx2|glb))(?:\?|$)/,r=>r.fulfill({status:403,contentType:'text/html',body:'Direct scene file denied by host'}));
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
  await page.goto(base+'/#human-story',{waitUntil:'domcontentloaded'});
  // Jump straight past both opening phases before waiting for the engine.
  await page.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*.79,behavior:'instant'}));
  assert.ok(await page.locator('.story-status').isHidden(),'no loading banner on a fast entry');
  await page.waitForFunction(()=>{const e=document.querySelector('.mind-story'),s=JSON.parse(e?.dataset.storyNative||'{}');return e?.dataset.storyState==='ready'&&s.phase===2&&s.papers===16&&s.shreds===6;},null,{timeout:60000});
  const timings=await page.evaluate(()=>({readyMs:Math.round(performance.now()),requests:performance.getEntriesByType('resource').filter(e=>e.name.includes('scene-asset=')).map(e=>({file:new URL(e.name).searchParams.get('scene-asset'),startMs:Math.round(e.startTime),endMs:Math.round(e.responseEnd)}))}));
  assert.ok(await page.locator('.story-canvas').isVisible());
  assert.equal(await page.locator('.story-research').count(),0);
  assert.ok(await page.locator('.nav-wrap').evaluate(e=>e.inert&&getComputedStyle(e).visibility==='hidden'));
  assert.ok(await page.locator('.nav-butterfly').evaluate(e=>getComputedStyle(e).visibility==='hidden'));
  assert.ok(requests.some(url=>url.endsWith('/index.php?scene-asset=engine')));
  assert.ok(!requests.some(url=>/\/assets\/(?:vendor\/story-3d\.js|reference\/.*\.(?:wasm|ktx2|glb))(?:\?|$)/.test(url)),'no requests to host-blocked direct files');
  assert.ok(!requests.some(url=>url.includes('scene-asset=texts-atlas')),'unused advertising atlas is not downloaded');
  const shot=await page.screenshot(),pixels=screenshotPixels(shot);
  assert.ok(pixels.signature>pixels.samples*100,'paper phase paints actual non-black pixels after skipped phases');
  if(process.env.TEST_ARTIFACTS){fs.mkdirSync(process.env.TEST_ARTIFACTS,{recursive:true});fs.writeFileSync(`${process.env.TEST_ARTIFACTS}/fast-entry-${viewport.width}.png`,shot);}
  // Also jump rapidly between phases rather than testing only ordered scrolling.
  for(const progress of [.04,.8,.25,.79]){
   await page.locator('.story-track').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*p,behavior:'instant'}),progress);
   await page.waitForFunction(p=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-p)<.005,progress);
   if(progress>.49)assert.ok(screenshotPixels(await page.screenshot()).signature>pixels.samples*100,'paper stage remains painted after a direct jump from the opening');
  }

  assert.deepEqual(errors,[]);reports.push({viewport,...timings,errors});await context.close();
 }
 console.log(JSON.stringify(reports,null,2));
}finally{await browser.close();}
