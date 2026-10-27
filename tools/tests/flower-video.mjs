// Real wheel/touch + native decoder regression, including the previously
// collapsed reduced-motion and disabled Data Saver paths.
import{chromium}from'playwright-core';import assert from'node:assert/strict';import fs from'node:fs';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/tmp/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS;if(dest)fs.mkdirSync(dest,{recursive:true});
try{for(const width of[390,1440])for(const mode of['normal','reduced','saveData']){
 const p=await b.newPage({viewport:{width,height:900},isMobile:width<600,hasTouch:width<600,reducedMotion:mode==='reduced'?'reduce':'no-preference'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 if(mode==='saveData')await p.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true}}));
 await p.goto(base+'/#top-section');await p.waitForFunction(()=>document.querySelector('.flower-video').dataset.videoReady==='true');
 assert.ok(await p.locator('.flower-prologue').evaluate(e=>e.offsetHeight>innerHeight*4),'track must not collapse to the next section');
 const start=await p.screenshot();await p.mouse.wheel(0,350);await p.waitForTimeout(700);
 assert.ok(await p.locator('.flower-stage').evaluate(e=>Math.abs(e.getBoundingClientRect().top)<2),'actual wheel holds the movie on screen');
 if(mode!=='reduced')assert.ok(await p.locator('.flower-film').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).a>1.04),'first scroll visibly zooms in');
 await p.mouse.wheel(0,500);await p.waitForFunction(()=>document.querySelector('.flower-video').currentTime>.3);
 assert.notDeepEqual(await p.screenshot(),start);assert.ok(await p.locator('#heroVideo').evaluate(e=>e.paused&&!e.currentSrc));
 for(const value of[.6,.9,.25]){
  await p.locator('.flower-prologue').evaluate((e,n)=>scrollTo(0,(e.offsetHeight-innerHeight)*n),value);
  await p.waitForFunction(()=>{const e=document.querySelector('.flower-video');return !e.seeking&&Math.abs(e.currentTime*48-Number(e.dataset.targetFrame))<2;});
  assert.ok(await p.locator('.flower-stage').evaluate(e=>Math.abs(e.getBoundingClientRect().top)<2));
  if(dest)await p.screenshot({path:`${dest}/flower-${width}-${mode}-${value}.png`});
 }
 assert.equal(await p.locator('.wing-left').evaluate(e=>getComputedStyle(e).filter),'none');assert.equal(await p.locator('.wing-right').evaluate(e=>getComputedStyle(e).filter),'none');
 if(width<600){const c=await p.context().newCDPSession(p),before=await p.evaluate(()=>scrollY);await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:250,y:650,id:1}]});await c.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:250,y:300,id:1}]});await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(700);assert.ok(await p.evaluate(y=>scrollY>y,before));}
 await p.locator('#club-intro').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY));await p.waitForTimeout(500);assert.ok(await p.evaluate(()=>document.body.classList.contains('horse-era')));assert.deepEqual(errors,[]);
 console.log(JSON.stringify({width,mode,decoder:'native H264',wheel:'pinned/zooming',reverse:'passed',errors}));await p.close();
}
 const p=await b.newPage({viewport:{width:390,height:900}});
 await p.route('**/flower-scroll.mp4',route=>route.abort());await p.goto(base+'/#top-section');
 await p.waitForFunction(()=>document.querySelector('.flower-canvas').dataset.sequenceReady==='true');
 await p.mouse.wheel(0,450);await p.waitForFunction(()=>Number(document.querySelector('.flower-canvas').dataset.displayedFrame)>1);
 assert.ok(await p.locator('.flower-stage').evaluate(e=>Math.abs(e.getBoundingClientRect().top)<2));
 assert.equal(await p.locator('.flower-video').evaluate(e=>getComputedStyle(e).opacity),'0');
 console.log('Blocked MP4: frame fallback moves and keeps the same pinned track');await p.close();
 const warm=await b.newPage();for(let i=0;i<2;i++){await warm.goto(base+'/#top-section');await warm.waitForFunction(()=>document.querySelector('.flower-video').dataset.videoReady==='true');}console.log('Warm reload: native video appears without depending on a future loadeddata event');await warm.close();
}finally{await b.close();}
