/** Rendered splash scheduling, source motion, navigation parity and HiDPI print. */
import{chromium}from'playwright-core';import assert from'node:assert/strict';import fs from'node:fs';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS;if(dest)fs.mkdirSync(dest,{recursive:true});
try{
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'/');await p.waitForTimeout(2000);
 assert.ok(await p.evaluate(()=>document.documentElement.classList.contains('intro-cover')&&!window.MTStory3D),'the large engine never executes over splash paint');
 assert.equal(await p.locator('[data-wire-object] canvas').evaluateAll(es=>es.filter(e=>e.dataset.wireState==='motion').length),0);
 await p.waitForFunction(()=>document.body.classList.contains('intro-revealed')&&document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 async function jump(page,progress){await page.locator('.story-track').evaluate((e,v)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*v,behavior:'instant'}),progress);await page.waitForFunction(v=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-v)<.005,progress,{timeout:30000});return page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));}
 const first=await jump(p,.19);assert.ok(first.welcomeVisible&&first.welcomeText==='we are here');assert.ok(first.welcomeWidth<=390*.9+1,'the mobile title stays within the centered safe width');assert.equal(first.welcomeX,0,'the mobile title remains centered');
 const early=await jump(p,.25),later=await jump(p,.4);assert.ok(later.glassY>early.glassY,'the original shards travel UP with forward scrolling');assert.equal(later.shardDepth,0,'mobile glass stays at the previous closer authored distance');
 assert.equal(await p.locator('.story-stage').evaluate(e=>getComputedStyle(e).position),'fixed');
 const reverse=await jump(p,.3);assert.equal(reverse.breakCount,later.breakCount);assert.ok(reverse.glassEnabled&&reverse.visibleFactOverlays===6&&!reverse.shatterEnabled);
 // A real trusted tap must unlock the same context used by the deferred engine,
 // then the first-touch story bed should actually play on mobile.
 await jump(p,.05);await p.locator('.story-stage').click({position:{x:15,y:15}});
 await p.waitForFunction(()=>window.Howler?.ctx?.state==='running'&&JSON.parse(document.querySelector('.mind-story').dataset.storyNative||'{}').playing?.includes('stage2-ambient'),null,{timeout:12000});
 assert.ok(await p.evaluate(()=>window.Howler._howls.some(h=>h._src.includes('amb_stage2-3.mp3')&&h._state==='loaded'&&h.playing())),'the restored ambient file is decoded and playing');
 assert.equal(await p.evaluate(()=>window.Howler.ctx===window.__mtStoryAudioContext),true,'the page and story share their unlocked audio context');
 if(dest)await p.screenshot({path:dest+'/mobile-reverse-facts.png'});await p.close();
 const wide=await b.newPage({viewport:{width:1440,height:900}});await wide.goto(base+'/calendar');
 const styles=await wide.locator('.nav-links').evaluate(e=>{const get=a=>{const s=getComputedStyle(a);return{color:s.color,weight:s.fontWeight,padding:s.padding,background:s.backgroundColor,shadow:s.boxShadow,animation:s.animationName};};return{lens:get(e.querySelector('.nav-lens')),ordinary:get(e.querySelector('a:not(.nav-lens):not(.nav-action)'))};});assert.deepEqual(styles.lens,styles.ordinary,'desktop Lens styling is identical to ordinary links');
 await wide.goto(base+'/');await wide.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 const desktopTitle=await jump(wide,.19);assert.ok(desktopTitle.welcomeVisible&&desktopTitle.welcomeText==='we are here');assert.ok(desktopTitle.welcomeWidth<=1440*.9+1,'the desktop title stays within the centered safe width');assert.equal(desktopTitle.welcomeX,0,'the desktop title remains centered');await wide.close();
 const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
 const navPage=await c.newPage();await navPage.goto(base+'/calendar');await navPage.locator('#menuButton').click();
 const mobileLens=navPage.locator('#navLinks .nav-lens');assert.ok(await mobileLens.isVisible(),'mobile Lens link is exposed in the opened menu');
 await mobileLens.click();await navPage.waitForFunction(()=>location.pathname==='/'&&location.hash==='#psychology');
 assert.equal(await navPage.locator('#psychology').count(),1,'mobile Lens link reaches its target section');await navPage.close();
 // Exercise the hardware-quality branch using the runner's software GL; no FPS claim.
 await c.addInitScript(()=>{const get=WebGL2RenderingContext.prototype.getExtension;WebGL2RenderingContext.prototype.getExtension=function(name){return name==='WEBGL_debug_renderer_info'?null:get.call(this,name)};});
 const sharp=await c.newPage();sharp.on('pageerror',e=>errors.push(e.message));await sharp.goto(base+'/#human-story');await sharp.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 const print=await jump(sharp,.9);assert.equal(print.pixelRatio,2);
 assert.ok(await sharp.locator('.story-canvas').evaluate(e=>e.width>=e.parentElement.clientWidth*2),'actual backing store is native HiDPI, not enlarged 1x pixels');
 const image=await sharp.evaluate(async()=>{const u=performance.getEntriesByType('resource').find(e=>e.name.includes('club-editorials.webp')).name;const im=new Image();im.src=u;await im.decode();return{width:im.naturalWidth,height:im.naturalHeight};});assert.deepEqual(image,{width:4096,height:4096});
 if(dest)await sharp.screenshot({path:dest+'/mobile-hidpi-papers.png'});assert.deepEqual(errors,[]);console.log(JSON.stringify({splashDeferred:true,upwardGlass:true,navigationParity:styles,printRatio:print.pixelRatio,printTexture:image,errors},null,2));await c.close();
}finally{await b.close();}
