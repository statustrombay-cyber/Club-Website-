import {warmStory} from './browser-story.mjs';
/** Public site acceptance: actual rendered content, native navigation,
 * continuous video and completed original paper travel on both viewport sizes.
 * Uses an isolated browser, never submits personal data to the preview store.
 */
import {chromium} from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const dest=process.env.TEST_ARTIFACTS||new URL('./mindful-site-audit/', 'file://'+(process.env.TMPDIR||'/tmp')+'/').pathname,base=process.env.TEST_URL||'http://localhost:4173';fs.mkdirSync(dest,{recursive:true});
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const report=[];
try{for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900},isMobile:width<600,hasTouch:width<600}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(const route of ['/','/calendar','/members','/gallery']){
  const start=Date.now();const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);
  const item={width,route,errors};
  const video=page.locator('#heroVideo');
  if(route==='/'){
   await page.waitForFunction(()=>document.body.classList.contains('intro-revealed'));
   assert.ok(await video.evaluate(e=>e.paused&&!e.currentSrc),'flowers, not horses, open home');
   await page.locator('.tv-chapter').evaluate(e=>scrollTo({top:e.getBoundingClientRect().bottom+scrollY+5,behavior:'instant'}));
  }
  await page.waitForFunction(()=>document.querySelector('#heroVideo').currentTime>.15,null,{timeout:15000});
  item.firstVideoFrameMs=await page.evaluate(()=>Math.round(performance.now()));
  const before=await video.evaluate(e=>e.currentTime);await page.waitForTimeout(700);
  assert.ok(await video.evaluate((e,t)=>e.currentTime>t+.1&&!e.paused&&!e.hidden,before),'horse frames continuously advance');
  if(route==='/'){
   await page.waitForFunction(()=>document.body.classList.contains('intro-revealed'));
   await warmStory(page);await page.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
   for(const id of ['team','contact','join']){
    await page.locator('#'+id).evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-90,behavior:'instant'}));
    assert.equal(await page.locator('#'+id).evaluate(e=>getComputedStyle(e).opacity),'1');
    await page.screenshot({path:`${dest}/${width}-${id}.png`});
   }
   assert.match(await page.locator('#team').innerText(),/Tanisha[\s\S]*President[\s\S]*70460[\s\S]*Mohd Shafiq[\s\S]*Vice President[\s\S]*8104553395/i);
   assert.ok(await page.locator('#team .team-avatar.has-image').count()>0);
   assert.equal(await page.locator('#emailContact').getAttribute('href'),'mailto:mindfultattva@csmu.ac.in');
   assert.match(await page.locator('#instagramContact').getAttribute('href'),/instagram.com/);
   assert.match(await page.locator('.footer-address').innerText(),/410206/);
   item.phases=[];
   for(const progress of [.13,.3,.65,.8,.94,.994]){
    await page.locator('.story-track').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*p,behavior:'instant'}),progress);
    await page.waitForFunction(p=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-p)<.005,progress,{timeout:30000});
    const state=await page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));
    assert.equal(state.phase,progress<.18?0:progress<.49?1:2);
    if(progress===.65)assert.ok(await page.locator('.story-burn-title').evaluate(e=>+getComputedStyle(e).opacity)>.5,'post-burn mindful tattva title actually visible');
    if(progress===.8)assert.ok(await video.evaluate(e=>e.paused),'do not decode the hidden herd behind an opaque GPU chapter');
    if(progress===.994){assert.ok(state.paperProgress>.98);assert.ok(state.paperClearance>2,'all paper centres have passed the camera with a full sheet-size clearance');}
    await page.screenshot({path:`${dest}/${width}-story-${progress}.png`});item.phases.push(state);
   }
   await page.locator('.tv-chapter').evaluate(e=>scrollTo({top:e.getBoundingClientRect().bottom+scrollY+10,behavior:'instant'}));
   await page.waitForFunction(()=>!document.querySelector('#heroVideo').paused);const t=await video.evaluate(e=>e.currentTime);await page.waitForTimeout(700);assert.ok(await video.evaluate((e,t)=>e.currentTime>t+.1,t),'horse keeps moving after the story AND the TV chapter');
   await page.screenshot({path:`${dest}/${width}-horse-exit.png`});
   // Real navigation starts on this same click, not a delayed synthetic replay.
   await page.locator('.footer').scrollIntoViewIfNeeded();
   item.nativeNavigation=await page.locator('.footer-links a[href="/calendar"]').evaluate(e=>{const event=new MouseEvent('click',{bubbles:true,cancelable:true});e.dispatchEvent(event);return !event.defaultPrevented;});
   assert.ok(item.nativeNavigation,'calendar link is not intercepted by a butterfly timer');
   await page.waitForURL('**/calendar');
  }else{
   if(route==='/calendar'){
    assert.equal(await page.locator('.calendar-month').count(),12);
    assert.ok(await page.locator('.calendar-event').count()>0,'published sample is listed even after its deadline');
    const openRegistration=page.locator('.calendar-month a[href="/register?event=event-welcome-circle"]');
    const gaps=await page.locator('.calendar-chip').evaluate(e=>({top:e.getBoundingClientRect().top-e.closest('.calendar-content').previousElementSibling.getBoundingClientRect().bottom,bottom:e.nextElementSibling.getBoundingClientRect().top-e.getBoundingClientRect().bottom}));
    assert.ok(gaps.top>=30&&gaps.bottom>=16,'calendar chip has breathing room above and below');
    await page.locator('.calendar-event').first().scrollIntoViewIfNeeded();
    assert.ok(await page.locator('.calendar-month').evaluateAll(nodes=>nodes.every(e=>e.getBoundingClientRect().right<=innerWidth+1&&e.getBoundingClientRect().left>=-1)),'all twelve month boxes fit after the sample is scrolled into view');
    if(await openRegistration.count()){await openRegistration.click();await page.waitForURL(/\/register\?event=/);assert.ok(await page.locator('input[name="email"]').isEditable());}
    else {await page.goto(base+'/register?event=event-welcome-circle');assert.equal(await page.locator('input[name="email"]').count(),0,'expired sample cannot register');assert.match(await page.locator('main').innerText(),/closed|ended/i);}
    await page.goto(base+'/calendar');
   }
   if(route==='/members')assert.match(await page.locator('#members').innerText(),/Tanisha[\s\S]*Mohd Shafiq/);
   if(route==='/gallery'){
    assert.ok(await page.locator('.gallery-stage-image.has-image').count()>0);
    await page.locator('.gallery-stage-image.has-image').click();
    await page.locator('#photoFrame:not([hidden])').waitFor();
    assert.ok(await page.locator('#photoFrameImage').getAttribute('src'));
    await page.keyboard.press('Escape');assert.ok(await page.locator('#photoFrame').isHidden());
    assert.equal((await page.request.get(base+'/uploads/club-logo-test.jpg')).status(),200);
   }
   await page.screenshot({path:`${dest}/${width}-${route.slice(1)}.png`});
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow');
  assert.deepEqual(errors,[]);item.elapsedMs=Date.now()-start;report.push(item);console.log(JSON.stringify(item));
 }
 await page.close();
}}finally{await browser.close();fs.writeFileSync(dest+'/report.json',JSON.stringify(report,null,2));}
