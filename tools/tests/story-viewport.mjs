import {warmStory} from './browser-story.mjs';
/** Actual viewport/paint and essential-content checks; no production FPS claim.
 * Run against npm run preview with optional CHROMIUM_PATH / TEST_ARTIFACTS.
 */
import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {screenshotPixels} from '../png-pixels.mjs';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS,report={frames:[],errors:[]};
if(dest)fs.mkdirSync(dest,{recursive:true});
function noWhiteBand(shot){const {pixels,width,height,channels}=screenshotPixels(shot);let rows=0;for(let y=height-60;y<height;y++){let white=0;for(let x=0;x<width;x++){const i=(y*width+x)*channels;if(pixels[i]>240&&pixels[i+1]>240&&pixels[i+2]>240)white++;}if(white/width>.97)rows++;}assert.ok(rows<8,'no full-width white band painted at viewport bottom');}
try{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(base+'/',{waitUntil:'domcontentloaded'});
 const splash=await page.locator('.splash').evaluate(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,viewport:innerHeight}));
 assert.ok(splash.top<=0&&splash.bottom>=splash.viewport);
 assert.equal(await page.locator('meta[name=theme-color]').getAttribute('content'),'#09090b','native splash/browser underpaint matches the black background');
 await page.setViewportSize({width:390,height:928});
 const splashShot=await page.screenshot();noWhiteBand(splashShot);if(dest)fs.writeFileSync(`${dest}/splash-resize.png`,splashShot);
 await page.waitForFunction(()=>document.body.classList.contains('intro-revealed'));
 assert.equal(await page.locator('meta[name=theme-color]').getAttribute('content'),'#403634');
 await warmStory(page);await page.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 const originalHeight=await page.locator('.story-track').evaluate(e=>e.offsetHeight);
 for(const [progress,height]of [[.08,928],[.35,844],[.68,754],[.8,844],[.4,928],[.82,754],[.93,844]]){
  await page.setViewportSize({width:390,height});
  await page.locator('.story-track').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*p,behavior:'instant'}),progress);
  await page.waitForFunction(p=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-p)<.005,progress,{timeout:30000});
  const geometry=await page.locator('.story-stage').evaluate(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,height:e.clientHeight,viewport:innerHeight,backing:e.querySelector('canvas').height}));
  assert.ok(geometry.top<=1&&geometry.bottom>=height-1,'stage covers the visual viewport while browser bars resize');
  assert.equal(await page.locator('.story-track').evaluate(e=>e.offsetHeight),originalHeight,'scroll reservation never changes with toolbar');
  const shot=await page.screenshot();noWhiteBand(shot);if(dest)fs.writeFileSync(`${dest}/story-${progress}-${height}.png`,shot);
  report.frames.push({progress,...geometry});
 }
 // Both directions, including paper -> facts and the transparent herd tail.
 // Capture during native touch gestures, while a slower main thread is busy.
 const cdp=await context.newCDPSession(page);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:2});
 report.touchGestures=[];
 for(const [start,distance,label] of [[.3,-1100,'down-facts-to-papers'],[.94,1500,'up-papers'],[.65,1700,'up-papers-to-facts'],[.4,1400,'up-facts-to-opening'],[.994,650,'up-from-herd']]){
  await page.locator('.story-track').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*p,behavior:'instant'}),start);
  await page.waitForFunction(p=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-p)<.005,start);
  const gesture=cdp.send('Input.synthesizeScrollGesture',{x:190,y:distance>0?180:650,yDistance:distance,speed:2600,gestureSourceType:'touch'});
  for(let frame=0;frame<3;frame++){
   await page.waitForTimeout(60);const shot=await page.screenshot();noWhiteBand(shot);
   if(dest)fs.writeFileSync(`${dest}/${label}-${frame}.png`,shot);
  }
  await gesture;report.touchGestures.push(label);
 }
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 // Ordinary trusted interaction unlocks existing audio; no Sound/permission UI.
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(250);
 await page.mouse.click(5,200);
 await page.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*.13,behavior:'instant'}));
 await page.waitForFunction(()=>{const s=JSON.parse(document.querySelector('.mind-story').dataset.storyNative||'{}');return s.phase===0&&s.breakCount>0&&s.playing?.includes('stage2-ambient');});
 report.musicWithBreak=true;
 await page.locator('.mind-story').evaluate(e=>scrollTo({top:e.getBoundingClientRect().bottom+scrollY-innerHeight,behavior:'instant'}));
 await page.waitForTimeout(300);
 const gap=await page.locator('.mind-story').evaluate(e=>e.nextElementSibling.getBoundingClientRect().top-e.getBoundingClientRect().bottom);
 assert.ok(Math.abs(gap)<1,'next section starts exactly at story boundary');
 assert.equal(await page.locator('.mind-story').getAttribute('data-story-audio'),'silent','the transparent tail cannot play music over the next section');
 assert.equal(await page.locator('.mind-story').getAttribute('data-story-covered'),'false','the transparent exit releases the underlying herd');
 const exitGeometry=await page.locator('.mind-story').evaluate(e=>({height:e.offsetHeight,track:e.querySelector('.story-track').offsetHeight,after:getComputedStyle(e,'::after').content}));
 assert.ok(Math.abs(exitGeometry.height-exitGeometry.track)<1,'no extra viewport-sized black spacer after the actual story');
 assert.ok(await page.locator('#heroVideo').evaluate(e=>!e.paused),'the same underlying herd resumes before the transparent exit');
 if(dest)await page.screenshot({path:`${dest}/story-exit.png`});
 for(const selector of ['#about','#membershipForm']){
  await page.locator(selector).evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-80,behavior:'instant'}));
  const content=await page.locator(selector).evaluate(e=>({opacity:getComputedStyle(e).opacity,text:e.textContent,visible:e.checkVisibility({checkOpacity:true}),top:e.getBoundingClientRect().top}));
  assert.equal(content.opacity,'1','essential content is immediately visible, with no reveal wait');assert.ok(content.visible);
  if(selector==='#about')assert.match(content.text,/Department of Applied Social Science[\s\S]*Chhatrapati Shivaji Maharaj University/);
  else{assert.ok(await page.locator('#membershipForm input[name=name]').isEditable());assert.ok(await page.locator('#membershipForm button[type=submit]').isVisible());}
  if(dest)await page.screenshot({path:`${dest}/${selector.slice(1)}.png`});
 }
 const desktop=await browser.newContext({viewport:{width:1440,height:900}}),wide=await desktop.newPage();
 wide.on('pageerror',e=>report.errors.push(e.message));await wide.goto(base+'/');
 await warmStory(wide);await wide.waitForFunction(()=>document.body.classList.contains('intro-revealed')&&document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 report.desktopWheel=[];
 for(const [start,delta] of [[.3,1500],[.94,-1500],[.65,-1700],[.4,-1400],[.994,-650]]){
  await wide.locator('.story-track').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*p,behavior:'instant'}),start);
  await wide.waitForFunction(p=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-p)<.005,start);
  await wide.mouse.move(720,450);await wide.mouse.wheel(0,delta);
  for(let frame=0;frame<3;frame++){
   await wide.waitForTimeout(60);const shot=await wide.screenshot();noWhiteBand(shot);
   if(dest)fs.writeFileSync(`${dest}/desktop-wheel-${start}-${frame}.png`,shot);
  }
  assert.ok(await wide.locator('.story-stage').evaluate(e=>e.getBoundingClientRect().bottom>=innerHeight-1),'desktop viewport stays covered after upward wheel');
  report.desktopWheel.push({start,delta});
 }
 await desktop.close();
 assert.deepEqual(report.errors,[]);console.log(JSON.stringify(report,null,2));await context.close();
}finally{await browser.close();}
