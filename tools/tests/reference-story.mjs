/** Optional real-browser regression test. Start `npm run preview` first.
 * npm i --no-save --package-lock=false playwright-core @sparticuz/chromium
 * CHROMIUM_PATH may point to a locally installed Chrome instead.
 * Generated screenshots/reports belong outside the deployment tree.
 */
import {chromium} from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',report={checks:0,viewports:[],errors:[]},dest=process.env.TEST_ARTIFACTS;
if(dest)fs.mkdirSync(dest,{recursive:true});
const check=(condition,message)=>{assert.ok(condition,message);report.checks++;};
try{
 for(const viewport of [{width:390,height:844},{width:1440,height:900}]){
  const mobile=viewport.width<600,context=await browser.newContext({viewport,isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1});
  await context.addInitScript(()=>{
   window.__permissionCalls=0;
   if(window.DeviceOrientationEvent)DeviceOrientationEvent.requestPermission=()=>{window.__permissionCalls++;return Promise.resolve('granted');};
   window.__activeAudio=new Set();
   const proto=window.AudioBufferSourceNode?.prototype;
   if(proto){const start=proto.start,stop=proto.stop;proto.start=function(...args){window.__activeAudio.add(this);this.addEventListener('ended',()=>window.__activeAudio.delete(this),{once:true});return start.apply(this,args);};proto.stop=function(...args){window.__activeAudio.delete(this);return stop.apply(this,args);};}
  });
  await context.route(/\/assets\/reference\/.*\.(?:wasm|ktx2|glb)(?:\?|$)/,r=>r.fulfill({status:500,contentType:'text/html',body:'Host rejects direct binary URL'}));
  const page=await context.newPage(),issues=[];
  page.on('pageerror',e=>issues.push(e.stack));
  page.on('console',m=>{if(m.type()==='error')issues.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)issues.push(`${r.status()} ${r.url()}`);});
  page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:')&&!r.url().startsWith('blob:'))issues.push('External request '+r.url());});
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(6500);
  await page.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY,behavior:'instant'}));
  await page.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storySource==='recovered-original',null,{timeout:60000});
  const jump=async progress=>{
   await page.locator('.story-track').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*p,behavior:'instant'}),progress);
   await page.waitForFunction(p=>{const e=document.querySelector('.mind-story');return Math.abs(Number(e.dataset.storyProgress)-p)<.005;},progress,{timeout:30000});
   await page.waitForTimeout(350);
   return page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));
  };
  const still=await jump(0);await page.waitForTimeout(900);
  const idle=await page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));
  check(idle.gateAuto&&idle.gateClock>still.gateClock&&(idle.handTime>still.handTime||still.gateClock>=3&&idle.shatterTime>0),'the original automatic fracture runs/completes while scroll is held still');
  await jump(.24); // Rewind to test the source fracture scrub independently of autoplay.
  const intact=await jump(.03),broken=await jump(.13);
  check(intact.shatterEnabled&&broken.shatterEnabled,'the actual shatter render pass is enabled, not just text');
  check(broken.shatterTime>intact.shatterTime,'the original fracture animation advances');
  check(broken.handTime!==intact.handTime,'the original animated hand moves');
  // Exercise the application's passive sensor-input path. Synthetic input is
  // not a claim that this desktop runner has a physical phone gyroscope.
  await page.evaluate(()=>dispatchEvent(new DeviceOrientationEvent('deviceorientation',{alpha:0,beta:10,gamma:0})));await page.waitForTimeout(180);
  await page.evaluate(()=>dispatchEvent(new DeviceOrientationEvent('deviceorientation',{alpha:0,beta:25,gamma:18})));await page.waitForTimeout(800);
  const tilt=await page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));
  check(tilt.gyro,'allowed sensor-shaped input reaches the original camera rig');
  check(tilt.renderCamera.some((v,i)=>Math.abs(v-tilt.camera[i])>.00001),'gyro input changes the rendered camera even during the first hand/glass phase');
  await jump(.24);await page.mouse.click(4,200);await page.waitForTimeout(200);
  let prevY=Infinity,prevP=0;
  for(const [p,phase]of [[.03,0],[.08,0],[.19,1],[.25,1],[.37,1],[.48,1],[.50,2],[.60,2],[.75,2],[.90,2],[.99,2],[.80,2],[.40,1],[.08,0]]){
   const state=await jump(p);check(state.phase===phase,`correct recovered phase at ${p}`);check(!state.portalVisible,'no white fallback portal');check(!state.sourceTextVisible,'no source-site advertising overlay');
   if(phase===1&&p<.49){check(state.hand,'original hand retained');if(p>=.19&&p<=.48){if(p>prevP)check(state.glassY<prevY,'glass descends with forward scroll');prevY=state.glassY;prevP=p;}}
   if(phase===2)check(state.papers===16&&state.shreds===6,'original independently deformed papers and shred meshes');
   if(dest&&[.08,.25,.60,.75,.90,.99,.40].includes(p))await page.screenshot({path:`${dest}/${viewport.width}-${p}.png`});
  }
  check(await page.evaluate(()=>window.__permissionCalls===0),'no permission prompt');
  check(await page.locator('[id="loader"], [id="xp"], .waitlist-form, .sound-toggle, .gyro-toggle').count()===0,'no captured loader, HUD or controls');
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow');
  // Dynamic browser-bar/orientation resizing must not move downstream content.
  const trackHeight=await page.locator('.story-track').evaluate(e=>e.offsetHeight);
  await page.setViewportSize({width:viewport.width,height:viewport.height-90});await page.waitForTimeout(500);
  check(await page.locator('.story-track').evaluate(e=>e.offsetHeight)===trackHeight,'URL-bar resize keeps reserved scroll height');
  check(await page.locator('.story-canvas').evaluate(e=>e.clientHeight>=e.parentElement.clientHeight),'canvas covers viewport without a pale bottom strip');
  await jump(.70);await page.mouse.click(4,200);await page.waitForTimeout(500);
  const active=await page.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));
  check(active.audioEnabled,'audio eligible only inside chapter');check(active.playing.includes('stage2-ambient'),'original chapter ambience plays after an ordinary trusted interaction');
  await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await page.waitForTimeout(500);
  check(await page.locator('.mind-story').getAttribute('data-story-audio')==='silent','chapter exit silences mixer');
  check(await page.evaluate(()=>window.__activeAudio.size===0),'no live WebAudio sources outside chapter');
  await jump(.35);await page.evaluate(()=>document.querySelector('.story-canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true})));await page.waitForTimeout(300);
  check(await page.locator('.mind-story').getAttribute('data-story-renderer')==='static','context loss restores accessible HTML');
  const unexpected=issues.filter(e=>!e.includes('WebGL context lost'));
  report.errors.push(...unexpected);check(unexpected.length===0,'no asset, JS, shader or external-network errors: '+unexpected.join('\n'));
  report.viewports.push({viewport,trackHeight});await context.close();
 }
 // Preferences reduce idle work, but do not replace the requested scroll
 // animation with sheets. Delayed script reproduces the old 12-second failure.
 for(const mode of ['reduced-motion','save-data','slow-engine']){
  const c=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:mode==='reduced-motion'?'reduce':'no-preference'});
  if(mode==='save-data')await c.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true,addEventListener(){}}}));
  const p=await c.newPage();if(mode==='slow-engine')await p.route('**/index.php?scene-asset=engine',async r=>{await new Promise(resolve=>setTimeout(resolve,14000));await r.continue();});
  await p.goto(base+'/#human-story');
  await p.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:70000});
  check(await p.locator('.story-canvas').isVisible(),mode+' retains visible WebGL');
  check(await p.locator('.mind-story').getAttribute('data-story-renderer')==='webgl',mode+' does not silently fall back');
  await c.close();
 }
 console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
