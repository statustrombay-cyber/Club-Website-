import {warmStory} from './browser-story.mjs';
/** Rendered splash scheduling, source motion, navigation parity and HiDPI print. */
import{chromium}from'playwright-core';import assert from'node:assert/strict';import fs from'node:fs';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS;if(dest)fs.mkdirSync(dest,{recursive:true});
try{
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{window.__gyroPermissionCalls=0;const D=function(){};D.requestPermission=()=>{window.__gyroPermissionCalls++;return Promise.resolve('granted');};Object.defineProperty(window,'DeviceOrientationEvent',{configurable:true,value:D});});
 await p.goto(base+'/');await p.waitForTimeout(2000);
 assert.ok(await p.evaluate(()=>document.documentElement.classList.contains('intro-cover')&&!window.MTStory3D),'the large engine never executes over splash paint');
 assert.equal(await p.locator('[data-wire-object] canvas').evaluateAll(es=>es.filter(e=>e.dataset.wireState==='motion').length),0);
 await warmStory(p);await p.waitForFunction(()=>document.body.classList.contains('intro-revealed')&&document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 async function jump(page,progress){await page.locator('.story-track').evaluate((e,v)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*v,behavior:'instant'}),progress);await page.waitForFunction(v=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-v)<.005,progress,{timeout:30000});return page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));}
 await jump(p,.01);await p.locator('.story-stage').click({position:{x:15,y:15}});
 await p.waitForFunction(()=>window.__gyroPermissionCalls===1&&window.Howler?.ctx?.state==='running'&&JSON.parse(document.querySelector('.mind-story').dataset.storyNative||'{}').playing?.includes('stage2-ambient'),null,{timeout:10000});
 assert.ok(await p.evaluate(()=>window.Howler._howls.some(h=>h._src.includes('scene-asset=story-ambient')&&h._state==='loaded'&&h.playing())),'first-touch story ambience is decoded and playing');
 await p.evaluate(()=>{const e=new Event('deviceorientation');Object.defineProperties(e,{beta:{value:0},gamma:{value:0},absolute:{value:true}});dispatchEvent(e);});
 await p.waitForFunction(()=>JSON.parse(document.querySelector('.mind-story').dataset.storyNative||'{}').gyro===true,null,{timeout:5000});
 const cameraBeforeSensor=await p.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative).renderCamera);
 await p.evaluate(()=>{const e=new Event('deviceorientation');Object.defineProperties(e,{beta:{value:14},gamma:{value:12},absolute:{value:true}});dispatchEvent(e);});
 await p.waitForFunction(before=>JSON.parse(document.querySelector('.mind-story').dataset.storyNative||'{}').renderCamera.some((value,index)=>Math.abs(value-before[index])>.001),cameraBeforeSensor,{timeout:5000});
 const cameraAfterSensor=await p.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative).renderCamera);
 assert.ok(cameraAfterSensor.some((value,index)=>Math.abs(value-cameraBeforeSensor[index])>.001),'a permitted orientation input moves the scene camera');
 const first=await jump(p,.19);assert.ok(first.welcomeVisible&&first.welcomeText==='we are here');assert.ok(first.welcomeWidth<=390*.9+1,'the mobile title stays within the centered safe width');assert.equal(first.welcomeX,0,'the mobile title remains centered');assert.ok(Math.abs(first.welcomeY)<844*.1,'the mobile title is actually INSIDE the camera, not falsely visible above it');if(dest)await p.screenshot({path:dest+'/mobile-welcome.png'});
 const early=await jump(p,.25),later=await jump(p,.4);assert.ok(later.glassY>early.glassY,'the original shards travel UP with forward scrolling');assert.ok(later.shardDepth===0,'portrait glass returns to the original closer camera distance');
 assert.equal(await p.locator('.story-stage').evaluate(e=>getComputedStyle(e).position),'fixed');
 const reverse=await jump(p,.3);assert.equal(reverse.breakCount,later.breakCount);assert.ok(reverse.glassEnabled&&reverse.visibleFactOverlays===6&&!reverse.shatterEnabled);
 // A real trusted tap must unlock the same context used by the deferred engine,
 // then the first-touch story bed should actually play on mobile.
 await jump(p,.05);await p.locator('.story-stage').click({position:{x:15,y:15}});
 await p.waitForFunction(()=>window.Howler?.ctx?.state==='running'&&JSON.parse(document.querySelector('.mind-story').dataset.storyNative||'{}').playing?.includes('stage2-ambient'),null,{timeout:12000});
 assert.ok(await p.evaluate(()=>window.Howler._howls.some(h=>h._src.includes('scene-asset=story-ambient')&&h._state==='loaded'&&h.playing())),'the restored ambient file is decoded and playing');
 assert.equal(await p.evaluate(()=>window.Howler.ctx===window.__mtStoryAudioContext),true,'the page and story share their unlocked audio context');
 const paperState=await jump(p,.68);assert.ok(paperState.papers>0&&paperState.shreds>0,'the provided magazine pages and paper shreds are rendered in the later chapter');
 const paperCameraBefore=paperState.renderCamera;
 await p.evaluate(()=>{const e=new Event('deviceorientation');Object.defineProperties(e,{beta:{value:-11},gamma:{value:-14},absolute:{value:true}});dispatchEvent(e);});
 await p.waitForFunction(before=>JSON.parse(document.querySelector('.mind-story').dataset.storyNative||'{}').renderCamera.some((value,index)=>Math.abs(value-before[index])>.001),paperCameraBefore,{timeout:5000});
 assert.ok(await p.locator('.mind-story').evaluate((e,before)=>JSON.parse(e.dataset.storyNative).renderCamera.some((value,index)=>Math.abs(value-before[index])>.001),paperCameraBefore),'the gyro also moves the camera across the original magazine and shred scene');
 if(dest)await p.screenshot({path:dest+'/mobile-reverse-facts.png'});await p.close();
 const wide=await b.newPage({viewport:{width:1440,height:900}});await wide.goto(base+'/calendar');
 const styles=await wide.locator('.nav-links').evaluate(e=>{const get=a=>{const s=getComputedStyle(a);return{color:s.color,weight:s.fontWeight,padding:s.padding,background:s.backgroundColor,shadow:s.boxShadow,animation:s.animationName};};return{lens:get(e.querySelector('.nav-lens')),ordinary:get(e.querySelector('a:not(.nav-lens):not(.nav-action)'))};});assert.deepEqual(styles.lens,styles.ordinary,'desktop Lens styling is identical to ordinary links');
 await wide.goto(base+'/');await warmStory(wide);await wide.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 const desktopTitle=await jump(wide,.19);assert.ok(desktopTitle.welcomeVisible&&desktopTitle.welcomeText==='we are here');assert.ok(desktopTitle.welcomeWidth<=1440*.9+1,'the desktop title stays within the centered safe width');assert.equal(desktopTitle.welcomeX,0,'the desktop title remains centered');assert.ok(Math.abs(desktopTitle.welcomeY)<900*.1,'the desktop title is actually INSIDE the camera');
 const desktopCamera=desktopTitle.renderCamera;await wide.mouse.move(1320,130);await wide.waitForFunction(before=>JSON.parse(document.querySelector('.mind-story').dataset.storyNative).renderCamera.some((value,index)=>Math.abs(value-before[index])>.001),desktopCamera,{timeout:5000});
 if(dest)await wide.screenshot({path:dest+'/desktop-welcome.png'});await wide.close();
 const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
 const navPage=await c.newPage();await navPage.goto(base+'/calendar');await navPage.locator('#menuButton').click();
 const mobileLens=navPage.locator('#navLinks .nav-lens');assert.ok(await mobileLens.isVisible(),'mobile Lens link is exposed in the opened menu');
 await mobileLens.click();await navPage.waitForFunction(()=>location.pathname==='/'&&location.hash==='#psychology');
 assert.equal(await navPage.locator('#psychology').count(),1,'mobile Lens link reaches its target section');await navPage.close();
 // Exercise the hardware-quality branch using the runner's software GL; no FPS claim.
 await c.addInitScript(()=>{const get=WebGL2RenderingContext.prototype.getExtension;WebGL2RenderingContext.prototype.getExtension=function(name){return name==='WEBGL_debug_renderer_info'?null:get.call(this,name)};});
 const sharp=await c.newPage();sharp.on('pageerror',e=>errors.push(e.message));await sharp.goto(base+'/#human-story');await sharp.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 const print=await jump(sharp,.9);assert.ok(print.pixelRatio>=1&&print.pixelRatio<=1.35,'adaptive quality stays within the mobile GPU budget');
 assert.ok(await sharp.locator('.story-canvas').evaluate(e=>e.width>=e.parentElement.clientWidth),'mobile rendering retains HiDPI output while capping GPU load');
 const image=await sharp.evaluate(async()=>{const u=performance.getEntriesByType('resource').find(e=>e.name.includes('club-editorials.webp')).name;const im=new Image();im.src=u;await im.decode();return{width:im.naturalWidth,height:im.naturalHeight};});assert.deepEqual(image,{width:4096,height:4096});
 if(dest)await sharp.screenshot({path:dest+'/mobile-hidpi-papers.png'});assert.deepEqual(errors,[]);console.log(JSON.stringify({splashDeferred:true,upwardGlass:true,navigationParity:styles,printRatio:print.pixelRatio,printTexture:image,errors},null,2));await c.close();
}finally{await b.close();}
