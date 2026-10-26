/** Actual rendered chapter order, reversible scroll camera, local TV frames,
 * touch/pointer/gyro samples and gated horse playback. No physical-sensor claim. */
import {chromium} from 'playwright-core';import assert from 'node:assert/strict';import fs from 'node:fs';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/tmp/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS,report=[];if(dest)fs.mkdirSync(dest,{recursive:true});
try{
 for(const width of [390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900},isMobile:width<600,hasTouch:width<600}),errors=[],horseRequests=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/horses-.*\.mp4/.test(r.url()))horseRequests.push(r.url());});
  // Reserve the existing chapter, without competing GPU work in this suite.
  await page.route('**/*scene-asset=engine',()=>{});
  await page.goto(base+'/#top-section');await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>document.querySelector('.flower-portrait').complete);
  assert.equal(await page.locator('.psi-core,.psi-quotes').count(),0);
  assert.equal(await page.locator('#heroTagline').evaluate(e=>getComputedStyle(e).opacity),'0','opening is empty before the hand sequence');
  assert.equal(await page.locator('.hero-actions').evaluate(e=>e.inert),true,'hidden hero actions cannot catch keyboard focus');
  assert.equal(await page.locator('#heroVideo').evaluate(e=>e.currentSrc),'');assert.deepEqual(horseRequests,[]);
  if(width<=1100){await page.locator('#menuButton').click();assert.ok(await page.locator('#navLinks').isVisible(),'the first-screen hamburger still exposes its links');await page.keyboard.press('Escape');}
  const initial=await page.screenshot();if(dest)fs.writeFileSync(`${dest}/flower-start-${width}.png`,initial);
  await page.locator('.flower-prologue').evaluate(e=>scrollTo({top:(e.offsetHeight-innerHeight)*.35,behavior:'instant'}));
  await page.waitForFunction(()=>+document.querySelector('.flower-prologue').dataset.flowerProgress>.34);
  assert.ok(await page.locator('.flower-unfold').evaluate(e=>+getComputedStyle(e).opacity)>.8,'the woman extends her arm before the copy appears');
  assert.equal(await page.locator('#heroTagline').evaluate(e=>getComputedStyle(e).opacity),'0');
  await page.locator('.flower-prologue').evaluate(e=>scrollTo({top:(e.offsetHeight-innerHeight)*.98,behavior:'instant'}));
  await page.waitForFunction(()=>+document.querySelector('.flower-prologue').dataset.flowerProgress>.975);
  assert.ok(await page.locator('#heroTagline').evaluate(e=>+getComputedStyle(e).opacity)>.99);
  assert.equal(await page.locator('.hero-actions').evaluate(e=>e.inert),false);
  assert.ok(await page.locator('.flower-hand').evaluate(e=>+getComputedStyle(e).opacity)>.99);
  const later=await page.screenshot();assert.notDeepEqual(later,initial,'actual rendered scene changes, not just diagnostic attributes');if(dest)fs.writeFileSync(`${dest}/flower-copy-${width}.png`,later);
  if(width===390){await page.setViewportSize({width,height:754});await page.waitForTimeout(250);const actions=await page.locator('.hero-actions').boundingBox();assert.ok(actions.y+actions.height<754-10,'toolbar shrink never clips the revealed actions below the visible viewport');await page.setViewportSize({width,height:900});}
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>+document.querySelector('.flower-prologue').dataset.flowerProgress<.005);
  assert.equal(await page.locator('#heroTagline').evaluate(e=>getComputedStyle(e).opacity),'0','reverse scroll restores the empty portrait');
  await page.locator('.tv-chapter').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY+2,behavior:'instant'}));
  await page.waitForFunction(()=>document.querySelector('.tv-chapter').classList.contains('tv-ready'));
  const order=await page.evaluate(()=>{const top=s=>document.querySelector(s).getBoundingClientRect().top+scrollY;return[top('.flower-prologue'),top('.brand-chapter'),top('.mind-story'),top('.tv-chapter'),top('#join')];});assert.ok(order.every((n,i)=>i===0||n>order[i-1]));
  assert.equal(await page.locator('.tv-chapter').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(165, 164, 159)','TV has its own opaque background, not a transparent paper film');
  assert.ok(await page.locator('#heroVideo').evaluate(e=>e.paused&&!e.currentSrc));
  await page.mouse.move(width*.12,200);await page.mouse.move(width*.92,350,{steps:10});
  await page.waitForFunction(()=>+document.querySelector('.tv-sprite').dataset.frame>65);
  const rightFrame=await page.locator('.tv-sprite').getAttribute('data-frame');
  await page.mouse.move(width*.08,280,{steps:10});await page.waitForFunction(()=>+document.querySelector('.tv-sprite').dataset.frame<35);
  const leftFrame=await page.locator('.tv-sprite').getAttribute('data-frame');assert.notEqual(rightFrame,leftFrame);
  await page.evaluate(()=>{for(const gamma of [0,25]){const e=new Event('deviceorientation');Object.defineProperty(e,'gamma',{value:gamma});dispatchEvent(e);}});
  await page.waitForFunction(()=>+document.querySelector('.tv-sprite').dataset.frame>60);
  if(width<600){
   const cdp=await page.context().newCDPSession(page),before=await page.evaluate(()=>scrollY);
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:320,y:220,id:1}]});
   await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:90,y:220,id:1}]});
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   await page.waitForFunction(()=>+document.querySelector('.tv-sprite').dataset.frame<45);assert.equal(await page.evaluate(()=>scrollY),before,'horizontal TV scrubbing does not move the document');
  }
  await page.waitForFunction(()=>document.querySelector('.nav-butterfly').dataset.butterflyState==='away',null,{timeout:12000});
  await page.locator('#tvHeading').click();await page.waitForTimeout(700);
  assert.equal(await page.locator('.nav-butterfly').getAttribute('data-butterfly-state'),'away','tapping the TV chapter never summons the butterfly back over it');
  assert.equal(await page.locator('.butterfly-grip').evaluate(e=>getComputedStyle(e).visibility),'hidden','the invisible grip cannot enter the keyboard tab order');
  if(dest)await page.screenshot({path:`${dest}/tv-scene-${width}.png`});
  await page.locator('.tv-chapter').evaluate(e=>scrollTo({top:e.getBoundingClientRect().bottom+scrollY+2,behavior:'instant'}));
  await page.waitForFunction(()=>{const v=document.querySelector('#heroVideo');return !v.paused&&v.currentTime>.15;},null,{timeout:12000});
  assert.ok(horseRequests.length>0);assert.equal(await page.locator('.hero-media').evaluate(e=>getComputedStyle(e).visibility),'visible');
  await page.locator('.tv-chapter').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY+2,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('#heroVideo').paused);
  assert.equal(await page.locator('.hero-media').evaluate(e=>getComputedStyle(e).visibility),'hidden','reverse into the TV hides and pauses the herd');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
  report.push({width,order,rightFrame,leftFrame,horseRequests:horseRequests.length,errors});await page.close();
 }
 for(const viewport of [{width:320,height:640},{width:844,height:390}]){
  const p=await browser.newPage({viewport});await p.goto(base+'/#top-section');
  await p.locator('.flower-prologue').evaluate(e=>scrollTo({top:(e.offsetHeight-innerHeight)*.98,behavior:'instant'}));
  await p.waitForFunction(()=>+document.querySelector('.flower-prologue').dataset.flowerProgress>.975);
  const bounds=await p.locator('.hero-actions').boundingBox();assert.ok(bounds.y>=65&&bounds.y+bounds.height<viewport.height-10,'small/landscape view keeps actions inside the screen');assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.close();
 }
 for(const mode of ['nojs','reduced']){
  const p=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:mode!=='nojs',reducedMotion:mode==='reduced'?'reduce':'no-preference'});await p.goto(base+'/#top-section');
  assert.ok(await p.locator('#heroTagline').evaluate(e=>+getComputedStyle(e).opacity)>.99,mode+' keeps essential copy readable');
  assert.ok(await p.locator('.flower-prologue').evaluate(e=>e.offsetHeight<innerHeight*1.8),mode+' does not leave an empty long camera track');
  if(mode==='nojs'){await p.locator('#menuButton').click();assert.ok(await p.locator('#navLinks').isVisible());}
  await p.close();
 }
 console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
