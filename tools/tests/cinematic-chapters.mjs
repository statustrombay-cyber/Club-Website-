/** Restored backup hero/herd + retained TV + immediate story-exit butterfly.
 * Sensor events are simulated, not physical iOS permission testing. */
import{chromium}from'playwright-core';import assert from'node:assert/strict';import fs from'node:fs';import{execFileSync}from'node:child_process';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/tmp/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS;if(dest)fs.mkdirSync(dest,{recursive:true});
// The requested baseline is the last pre-flower checkpoint, not a newer flower variant.
const baseline=execFileSync('git',['show','8e37e6f:views/public/home.php'],{encoding:'utf8'}),current=fs.readFileSync('views/public/home.php','utf8');
const hero=s=>s.slice(s.indexOf('<section class="hero hero-with-video"'),s.indexOf('\n<?php\n/* A thin band'));
assert.equal(hero(current),hero(baseline),'the entire opening markup/art/copy must be the backup hero');
const oldJs=execFileSync('git',['show','8e37e6f:assets/app.js'],{encoding:'utf8'}),js=fs.readFileSync('assets/app.js','utf8');
const horse=s=>s.slice(s.indexOf('  function setupHeroVideo()'),s.indexOf('  function start()',s.indexOf('  function setupHeroVideo()')));
assert.equal(horse(js),horse(oldJs),'horse playback/recovery is exactly the backup code');
try{for(const width of[390,768,1440]){
 const p=await b.newPage({viewport:{width,height:900},isMobile:width<600,hasTouch:width<600}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('**/*scene-asset=engine',()=>{});
 await p.goto(base+'/#top-section');await p.waitForFunction(()=>{const v=document.querySelector('#heroVideo');return !v.paused&&v.currentTime>.1;});
 assert.equal(await p.locator('[class*="flower-"]').count(),0);assert.equal(await p.locator('.hero-art').count(),1);assert.ok(await p.locator('#heroTagline').isVisible());
 if(dest)await p.screenshot({path:`${dest}/classic-hero-${width}.png`});
 await p.locator('.story-track').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY+e.offsetHeight*.3));
 await p.waitForFunction(()=>document.body.classList.contains('story-immersive'));await p.waitForFunction(()=>document.querySelector('.nav-butterfly').dataset.butterflyState==='away',null,{timeout:12000});
 await p.locator('.tv-chapter').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY+2));
 await p.waitForFunction(()=>!document.body.classList.contains('story-immersive'));
 await p.waitForFunction(()=>{const e=document.querySelector('.nav-butterfly'),r=e.getBoundingClientRect();return getComputedStyle(e).visibility==='visible'&&getComputedStyle(e).opacity==='1'&&r.right>0&&r.bottom>0;},null,{timeout:1500});
 await p.waitForFunction(()=>document.querySelector('.nav-butterfly').dataset.butterflyState==='perched',null,{timeout:2500});
 await p.waitForFunction(()=>document.querySelector('.tv-canvas').dataset.sequenceReady==='true');
 assert.equal(await p.locator('.tv-canvas').getAttribute('data-frame-count'),'75');assert.equal(await p.locator('.tv-person').evaluate(e=>getComputedStyle(e).clipPath),'none');
 await p.mouse.move(5,230);await p.waitForFunction(()=>+document.querySelector('.tv-canvas').dataset.displayedFrame<5);
 await p.mouse.move(width-5,240);await p.waitForFunction(()=>+document.querySelector('.tv-canvas').dataset.displayedFrame>69);
 await p.waitForTimeout(700);
 for(const gamma of[-20,20]){await p.evaluate(gamma=>{const e=new Event('deviceorientation');Object.defineProperties(e,{gamma:{value:gamma},beta:{value:0}});dispatchEvent(e);},gamma);await p.waitForFunction(v=>Math.abs(+document.querySelector('.tv-canvas').dataset.displayedFrame-v)<2,37+gamma/25*37);}
 // null/blocked sensor readings must never reset the pointer/pose.
 const before=await p.locator('.tv-chapter').getAttribute('data-tv-target');await p.evaluate(()=>{const e=new Event('deviceorientation');Object.defineProperties(e,{gamma:{value:null},beta:{value:null}});dispatchEvent(e);});assert.equal(await p.locator('.tv-chapter').getAttribute('data-tv-target'),before);
 await p.locator('#tvHeading').click();await p.waitForTimeout(800);assert.notEqual(await p.locator('.nav-butterfly').getAttribute('data-butterfly-state'),'away','TV is not a butterfly-exit zone');
 if(width<600){const cdp=await p.context().newCDPSession(p),y=await p.evaluate(()=>scrollY);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:330,y:220,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:60,y:220,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForFunction(()=>document.querySelector('.tv-chapter').dataset.tvInput==='touch'&&+document.querySelector('.tv-canvas').dataset.displayedFrame<30);assert.equal(await p.evaluate(()=>scrollY),y);}
 await p.waitForTimeout(800);assert.equal(await p.locator('.nav-butterfly').getAttribute('data-butterfly-state'),'perched');assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
 if(dest)await p.screenshot({path:`${dest}/retained-tv-${width}.png`});console.log(JSON.stringify({width,hero:'backup exact',horse:'playing',butterfly:'returned within 1.5s; stays in TV',cursor:'left/right',gyro:'left/right/null-safe',errors}));await p.close();
}
 for(const mode of['reduced','saveData','landscape']){
  const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:mode==='reduced'?'reduce':'no-preference'});
  if(mode==='saveData')await p.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true}}));
  if(mode==='landscape')await p.addInitScript(()=>Object.defineProperty(screen.orientation,'angle',{value:90}));
  await p.goto(base+'/#mind');await p.locator('.tv-chapter').scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('.tv-canvas').dataset.sequenceReady==='true');
  await p.mouse.move(10,200);await p.waitForFunction(()=>+document.querySelector('.tv-canvas').dataset.displayedFrame<6);
  await p.waitForTimeout(700);await p.evaluate(()=>{const e=new Event('deviceorientation');Object.defineProperties(e,{gamma:{value:20},beta:{value:-20}});dispatchEvent(e);});await p.waitForFunction(()=>+document.querySelector('.tv-canvas').dataset.displayedFrame>63);
  console.log(JSON.stringify({mode,explicitPointerAndGyro:'PASS'}));await p.close();
 }
}finally{await b.close();}
