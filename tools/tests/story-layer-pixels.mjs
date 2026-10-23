/** Real rendered regressions for the off-camera title and detached scroll layer.
 * Exercise the production DPR branch, but do NOT call software GL a phone FPS test.
 * Run with npm run preview; optional CHROMIUM_PATH and TEST_ARTIFACTS.
 */
import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {screenshotPixels} from '../png-pixels.mjs';
import {warmStory} from './browser-story.mjs';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS,reports=[];
if(dest)fs.mkdirSync(dest,{recursive:true});
function count(shot,box,predicate){const {pixels,width,height,channels}=screenshotPixels(shot);let n=0;for(let y=Math.floor(height*box[1]);y<height*box[3];y++)for(let x=Math.floor(width*box[0]);x<width*box[2];x++){const i=(y*width+x)*channels;if(predicate(pixels[i],pixels[i+1],pixels[i+2]))n++;}return n;}
const white=(r,g,b)=>r>215&&g>215&&b>215,red=(r,g,b)=>r>90&&g<r*.35&&b<r*.35;
try{
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:844},isMobile:width<600,hasTouch:width<600,deviceScaleFactor:2}),errors=[],report={width};
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   // Same production sizing code as hardware, running on the runner's GL.
   const get=WebGL2RenderingContext.prototype.getExtension;
   WebGL2RenderingContext.prototype.getExtension=function(n){return n==='WEBGL_debug_renderer_info'?null:get.call(this,n)};
   window.__trackReads=0;const rect=Element.prototype.getBoundingClientRect;
   Element.prototype.getBoundingClientRect=function(){if(this.classList.contains('story-track'))__trackReads++;return rect.call(this)};
  });
  await page.goto(base+'/');await warmStory(page);
  async function jump(p){await page.locator('.story-track').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*p,behavior:'instant'}),p);await page.waitForFunction(p=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-p)<.005,p,{timeout:40000});return page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));}
  // Offscreen fixed geometry must NOT mean offscreen drawing or covering forms.
  assert.equal(await page.locator('.story-stage').evaluate(e=>getComputedStyle(e).position),'fixed');
  assert.ok(await page.evaluate(()=>!document.elementFromPoint(innerWidth/2,innerHeight/2).closest('.mind-story')),'native chapter clip prevents the fixed layer from intercepting the hero');
  for(const progress of [.1,.48,.76]){
   await page.locator('.brand-chapter').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*p,behavior:'instant'}),progress);await page.waitForTimeout(150);
   assert.ok(await page.locator('.brand-chapter-stage').evaluate(e=>getComputedStyle(e).backgroundColor==='rgba(0, 0, 0, 0)'&&e.getBoundingClientRect().top<=1&&e.getBoundingClientRect().bottom>=innerHeight-1),'rings and Manifest share one full-height parent paint');
   assert.ok(await page.locator('.nav-wrap').evaluate(e=>getComputedStyle(e).visibility==='hidden'),'no dark header rectangle over the rings or Manifest');
   if(dest)await page.screenshot({path:`${dest}/brand-${width}-${progress}.png`});
  }
  // First fracture, not a later chapter: the requested words must paint pixels.
  await jump(.015);await page.waitForFunction(()=>JSON.parse(document.querySelector('.mind-story').dataset.storyNative||'{}').shatterEnabled);
  await page.waitForTimeout(650);
  const fractureShot=await page.screenshot();report.breakTitlePixels=count(fractureShot,[.1,.32,.9,.65],white);
  assert.ok(report.breakTitlePixels>width,'white title ink is actually painted as the glass breaks, not only marked visible');
  if(dest)fs.writeFileSync(`${dest}/break-title-${width}.png`,fractureShot);
  const state=await jump(.19);await page.waitForTimeout(150);
  assert.deepEqual(state.textViewport,[width,844],'text camera receives physical pass sizes and resolves to CSS viewport coordinates');
  assert.ok(Math.abs(state.welcomeY)<state.textViewport[1]/2,'title sits inside the camera');
  const shot=await page.screenshot();report.centeredTitlePixels=count(shot,[.1,.32,.9,.65],white);
  assert.ok(report.centeredTitlePixels>width,'the centered title paints actual white letter pixels at production DPR');
  if(dest)fs.writeFileSync(`${dest}/centered-title-${width}.png`,shot);
  await jump(.3);await page.waitForTimeout(250);
  assert.equal((await page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative))).shardDepth,0);
  const before=await page.evaluate(()=>__trackReads);await page.waitForTimeout(400);
  report.idleTrackReads=await page.evaluate(n=>__trackReads-n,before);assert.ok(report.idleTrackReads<=2,'no track layout read on each idle GPU frame');
  // Native clipping must follow scrolling immediately, independently of scene RAF.
  await page.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-innerHeight*.5,behavior:'instant'}));await page.waitForTimeout(180);
  const entry=await page.screenshot();
  assert.equal(count(entry,[0,0,1,.48],red),0,'viewport-fixed red canvas is clipped above the chapter on reverse exit');
  assert.ok(count(entry,[0,.6,1,1],red)>width,'the same canvas remains painted inside the visible chapter');
  if(dest)fs.writeFileSync(`${dest}/clipped-entry-${width}.png`,entry);
  for(const p of [.04,.3,.08,.4,.05]){
   await jump(p);const rect=await page.locator('.story-stage').evaluate(e=>({position:getComputedStyle(e).position,top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom}));
   assert.equal(rect.position,'fixed');assert.equal(rect.top,0);assert.ok(rect.bottom>=844,'one viewport layer persists across reversals');
  }
  await page.locator('.mind-story').evaluate(e=>scrollTo({top:e.getBoundingClientRect().bottom+scrollY+10,behavior:'instant'}));await page.waitForTimeout(200);
  assert.ok(await page.evaluate(()=>!document.elementFromPoint(innerWidth/2,innerHeight/2).closest('.mind-story')),'chapter clip releases the herd and following content');
  assert.deepEqual(errors,[]);reports.push({...report,errors});await page.close();
 }
 console.log(JSON.stringify(reports,null,2));
}finally{await browser.close();}
