/** First-screen compositor geometry, actual splash animation and bounded warmup.
 * Real browser/touch/pixel checks, NOT a physical-device FPS certification. */
import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {screenshotPixels} from '../png-pixels.mjs';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS,reports=[];
if(dest)fs.mkdirSync(dest,{recursive:true});
function noBlankBottom(png){const a=screenshotPixels(png);let blank=0;for(let y=a.height-30;y<a.height;y++){let whites=0;for(let x=0;x<a.width;x++){let i=(y*a.width+x)*a.channels;if(a.pixels[i]>245&&a.pixels[i+1]>245&&a.pixels[i+2]>245)whites++;}if(whites/a.width>.98)blank++;}assert.ok(blank<6,'no full-width blank white peel at the first-screen bottom');}
try{
 for(const width of [390,1440]){
  const p=await b.newPage({viewport:{width,height:844},isMobile:width<600,hasTouch:width<600}),errors=[],requests=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.url().includes('scene-asset='))requests.push(r.url());});
  // Deliberately hang optional warmup: the splash MUST NOT await its response.
  await p.route('**/*scene-asset=engine',()=>{});
  await p.goto(base+'/',{waitUntil:'domcontentloaded'});
  await p.mouse.click(20,210);assert.ok(await p.locator('.nav-butterfly').evaluate(e=>!e.classList.contains('butterfly-arrived')),'tapping the splash never starts a hidden click flight or cancels the authored entrance');
  await p.waitForTimeout(1100);
  const first=await p.locator('.splash').evaluate(e=>({stars:getComputedStyle(e,'::before').transform,hidden:e.hidden,time:performance.now()}));
  await p.waitForTimeout(450);
  const during=await p.evaluate(()=>({stars:getComputedStyle(document.querySelector('.splash'),'::before').transform,playing:!document.querySelector('#heroVideo').paused,engine:!!window.MTStory3D,wire:[...document.querySelectorAll('[data-wire-object]')].some(e=>e.dataset.wireState==='motion'),bubbles:getComputedStyle(document.querySelector('.bubble')).animationPlayState}));
  assert.notEqual(first.stars,during.stars,'composited stars actually advance behind the painted word');
  assert.ok(!during.playing&&!during.engine&&!during.wire,'no hidden movie/3D/wire animation competes with splash paint');
  assert.equal(during.bubbles,'paused','background decoration pauses under the splash');
  if(dest)await p.screenshot({path:`${dest}/splash-${width}.png`});
  await p.waitForFunction(()=>document.body.classList.contains('intro-revealed'),null,{timeout:7000});
  const revealedMs=await p.evaluate(()=>performance.now());assert.ok(revealedMs<7000,'the intro exits without waiting for a hanging warmup');
  assert.equal(await p.locator('.site-shell').evaluate(e=>e.inert),false);
  assert.ok(requests.length<=1&&requests.every(u=>u.endsWith('scene-asset=engine')),'at most one passive bundle request; no model/decoder/texture bulk loading');
  assert.ok(await p.locator('#heroVideo').evaluate(v=>v.paused&&!v.currentSrc),'horse stays deferred behind the flower opening');
  assert.ok(await p.locator('.flower-poster').evaluate(e=>e.complete&&e.naturalWidth>=960),'the clean flower image is decoded at the first screen');
  assert.equal(await p.locator('.drift-blob').first().evaluate(e=>getComputedStyle(e).filter),'none');
  assert.equal(await p.locator('.psi-quote').count(),0,'the removed lens wheel does not return');
  const geometry=[];let largest=844;
  for(const h of [754,928,754,844]){
   await p.setViewportSize({width,height:h});await p.waitForTimeout(80);largest=Math.max(largest,h);
   const g=await p.locator('.hero-media').evaluate(e=>({top:e.getBoundingClientRect().top,height:e.clientHeight,viewport:innerHeight,transform:getComputedStyle(e).transform}));
   assert.equal(g.top,0);assert.equal(g.height,largest,'media plane never shrinks/re-crops during toolbar reversal');assert.notEqual(g.transform,'none');geometry.push(g);
  }
  if(width<600){
   const cdp=await p.context().newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
   for(const distance of [-500,400,-300]){
    const gesture=cdp.send('Input.synthesizeScrollGesture',{x:180,y:distance>0?200:600,yDistance:distance,speed:2400,gestureSourceType:'touch'});
    for(let i=0;i<2;i++){await p.waitForTimeout(50);noBlankBottom(await p.screenshot());}
    await gesture;
   }
   await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
  }else{
   for(const distance of [500,-400,300]){await p.mouse.wheel(0,distance);await p.waitForTimeout(70);noBlankBottom(await p.screenshot());}
  }
  await p.locator('#contact').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY,behavior:'instant'}));await p.waitForTimeout(150);
  assert.equal(await p.locator('.hero').getAttribute('data-motion-state'),'idle','offscreen hero decorative timelines are paused');
  assert.ok(await p.locator('#contact').evaluate(e=>e.checkVisibility({checkOpacity:true})),'motion budgets never hide essential content');
  await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(200);
  assert.equal(await p.locator('.hero').getAttribute('data-motion-state'),'active','decoration resumes when its section returns');
  if(dest)await p.screenshot({path:`${dest}/hero-${width}.png`});assert.deepEqual(errors,[]);
  reports.push({width,revealedMs:Math.round(revealedMs),warmupRequests:requests.length,geometry,errors});await p.close();
 }
 for(const mode of ['saveData','reduced','anchor']){
  const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:mode==='reduced'?'reduce':'no-preference'}),requests=[];
  p.on('request',r=>{if(r.url().includes('scene-asset=engine'))requests.push(r.url());});
  if(mode==='saveData')await p.addInitScript(()=>Object.defineProperty(navigator,'connection',{configurable:true,value:{saveData:true,effectiveType:'4g'}}));
  await p.goto(base+'/'+(mode==='anchor'?'#join':''));await p.waitForFunction(()=>document.body.classList.contains('intro-revealed'));await p.waitForTimeout(1800);
  // A join anchor may legitimately approach the later scene: only enforce the
  // no-speculative-download rule on pages which remain at their first screen.
  if(mode!=='anchor')assert.equal(requests.length,0,'no speculative bandwidth under '+mode);
  if(mode==='reduced'||mode==='anchor')assert.ok(await p.locator('#splash').evaluate(e=>e.hidden),'direct links and reduced motion bypass the intro');
  reports.push({mode,engineRequests:requests.length});await p.close();
 }
 // A slow app.js download used to miss animationend and start a NEW 6.5s
 // lock after the CSS splash had already faded. Never restart that deadline.
 const late=await b.newPage({viewport:{width:390,height:844}});
 // Production inlines app.js. Externalize only that script in this fault
 // injection so its execution can really arrive AFTER the CSS animation ends.
 await late.route(base+'/',async route=>{
  const response=await route.fetch();let body=await response.text();
  body=body.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/g,(all,attrs,code)=>code.includes('function setupSplash()')?'<script'+attrs+' src="/assets/app.js"></script>':all);
  await route.fulfill({response,body});
 });
 await late.route('**/assets/app.js',async r=>{await new Promise(resolve=>setTimeout(resolve,6000));await r.continue();});
 await late.goto(base+'/',{waitUntil:'domcontentloaded'});
 await late.waitForFunction(()=>document.body.classList.contains('intro-revealed'),null,{timeout:1500});
 const lateReady=await late.evaluate(()=>({time:performance.now(),inert:document.querySelector('.site-shell').inert,cover:document.documentElement.classList.contains('intro-cover')}));
 assert.ok(lateReady.time<8000&&!lateReady.inert&&!lateReady.cover,'late JS releases immediately, without a second splash lock');
 reports.push({mode:'late-script',...lateReady});await late.close();
 console.log(JSON.stringify(reports,null,2));
}finally{await b.close();}
