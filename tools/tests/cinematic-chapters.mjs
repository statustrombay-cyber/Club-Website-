/** Actual GPU frames, reversible camera, no blank handoff, complete TV footage.
 * Uses original media; simulated touch/gyro are not physical Safari testing. */
import{chromium}from'playwright-core';import assert from'node:assert/strict';import fs from'node:fs';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/tmp/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS,report=[];if(dest)fs.mkdirSync(dest,{recursive:true});
const expected=p=>(p<.16?p/.16:p<.55?1+(p-.16)/.39*16:17+(p-.55)/.45*22)*4;
async function jump(p,value){await p.locator('.flower-prologue').evaluate((e,n)=>scrollTo({top:(e.offsetHeight-innerHeight)*n,behavior:'instant'}),value);await p.waitForFunction(n=>Math.abs(+document.querySelector('.flower-video').dataset.displayedFrame-n)<1.5,expected(value),{timeout:20000});}
try{
 for(const width of [390,768,1440]){
  const p=await browser.newPage({viewport:{width,height:900},isMobile:width<600,hasTouch:width<600}),errors=[],horse=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(/horses-.*\.mp4/.test(r.url()))horse.push(r.url());});
  await p.route('**/*scene-asset=engine',()=>{});await p.goto(base+'/#top-section');
  await p.waitForFunction(()=>document.querySelector('.flower-video').dataset.videoReady==='true');
  assert.ok(await p.locator('.flower-video').evaluate(e=>e.readyState>=2&&e.paused&&e.videoWidth===1280));
  assert.equal(await p.locator('.flower-stage #heroTagline').count(),0,'no headline overlays the first face');assert.deepEqual(horse,[]);
  if(width<=1100){await p.locator('#menuButton').click();assert.ok(await p.locator('#navLinks').isVisible());await p.keyboard.press('Escape');}
  const first=await p.screenshot();if(dest)fs.writeFileSync(`${dest}/sequence-start-${width}.png`,first);
  const visited=[];
  for(const value of [.18,.33,.48,.63,.78,.93]){await jump(p,value);visited.push(+(await p.locator('.flower-video').getAttribute('data-displayed-frame')));}
  assert.ok(visited.every((v,i)=>i===0||v>visited[i-1]),'the actual rendered camera advances through many intermediate frames');
  const end=await p.screenshot();assert.notDeepEqual(end,first);
  const cards=await p.locator('.flower-hand-cards').boundingBox();assert.ok(cards.x>=-1&&cards.x+cards.width<=width+1,'all three hand cards fit even on mobile');assert.match(await p.locator('.flower-hand-cards').innerText(),/Notice[\s\S]*Connect[\s\S]*Grow/);
  assert.ok(await p.locator('#heroVideo').evaluate(e=>e.paused&&!e.currentSrc),'no horse decoder runs before the girl sequence finishes');
  await jump(p,1);await p.waitForFunction(()=>{const v=document.querySelector('#heroVideo');return !v.paused&&v.currentTime>.1;},null,{timeout:15000});
  assert.ok(horse.length>0,'horse starts at the girl end, not after the later TV');
  await p.locator('#club-intro').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-95,behavior:'instant'}));await p.waitForTimeout(100);
  assert.ok(await p.locator('#heroTagline').isVisible());assert.equal(await p.locator('#heroTagline').evaluate(e=>getComputedStyle(e).opacity),'1');if(dest)await p.screenshot({path:`${dest}/immediate-herd-${width}.png`});
  // Rapid reversals must finish at the newest request, not a stale fetch result.
  for(const value of [.75,.15,.85,.25])await p.locator('.flower-prologue').evaluate((e,n)=>scrollTo(0,(e.offsetHeight-innerHeight)*n),value);
  await jump(p,.25);assert.ok(await p.locator('#heroVideo').evaluate(e=>e.paused));assert.equal(await p.locator('.hero-media').evaluate(e=>getComputedStyle(e).visibility),'hidden');
  assert.equal(await p.locator('.flower-canvas').getAttribute('data-renderer'),'video2d','normal flower presentation is held canvas, not an exposed decoder');
  await jump(p,.5);if(dest)await p.screenshot({path:`${dest}/camera-mid-${width}.png`});
  await p.locator('.tv-chapter').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY+2));
  await p.waitForFunction(()=>document.querySelector('.tv-canvas').dataset.sequenceReady==='true');
  assert.equal(await p.locator('.tv-canvas').getAttribute('data-frame-count'),'75');assert.equal(await p.locator('.tv-canvas').getAttribute('data-renderer'),'webgl');assert.equal(await p.locator('.tv-person').evaluate(e=>getComputedStyle(e).clipPath),'none');
  assert.equal(await p.locator('.tv-poster').evaluate(e=>e.naturalWidth),405);assert.equal(await p.locator('.tv-poster').evaluate(e=>e.naturalHeight),384);
  await p.mouse.move(width*.1,210);await p.mouse.move(width*.92,320,{steps:12});await p.waitForFunction(()=>+document.querySelector('.tv-canvas').dataset.displayedFrame>65);
  await p.mouse.move(width*.08,240,{steps:12});await p.waitForFunction(()=>+document.querySelector('.tv-canvas').dataset.displayedFrame<35);
  await p.evaluate(()=>{for(const gamma of[0,25]){const e=new Event('deviceorientation');Object.defineProperty(e,'gamma',{value:gamma});dispatchEvent(e);}});await p.waitForFunction(()=>+document.querySelector('.tv-canvas').dataset.displayedFrame>60);
  if(width<600){const cdp=await p.context().newCDPSession(p),before=await p.evaluate(()=>scrollY);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:320,y:220,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:90,y:220,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForFunction(()=>+document.querySelector('.tv-canvas').dataset.displayedFrame<45);assert.equal(await p.evaluate(()=>scrollY),before);}
  await p.waitForFunction(()=>document.querySelector('.nav-butterfly').dataset.butterflyState==='away',null,{timeout:12000});await p.locator('#tvHeading').click();await p.waitForTimeout(700);assert.equal(await p.locator('.nav-butterfly').getAttribute('data-butterfly-state'),'away');
  if(dest)await p.screenshot({path:`${dest}/complete-tv-${width}.png`});
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);report.push({width,visited,horseRequests:horse.length,errors});await p.close();
 }
 for(const mode of ['nojs','reduced','noWebGL']){
  const p=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:mode!=='nojs',reducedMotion:mode==='reduced'?'reduce':'no-preference'});
  if(mode==='noWebGL')await p.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(name,...args){return /webgl/.test(name)?null:get.call(this,name,...args);};});
  await p.goto(base+'/#top-section');assert.ok(await p.locator('.flower-poster').evaluate(e=>e.complete&&e.naturalWidth===1280));
  await p.locator('#club-intro').scrollIntoViewIfNeeded();assert.ok(await p.locator('#heroTagline').isVisible());
  if(mode==='noWebGL'){await p.evaluate(()=>scrollTo(0,0));await p.waitForFunction(()=>document.querySelector('.flower-video').dataset.videoReady==='true');}
  await p.close();
 }
 console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
