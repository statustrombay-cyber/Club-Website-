/** Actual browser/DSP regression: early gestures, 48kHz, hosted MP3, gyro,
 * context resume, one-shot fracture, offscreen silence and permission refusal.
 * Orientation events are simulated sensor input, not a physical iPhone test. */
import{chromium}from'playwright-core';import assert from'node:assert/strict';import fs from'node:fs';
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS;
if(dest)fs.mkdirSync(dest,{recursive:true});
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader','--autoplay-policy=document-user-activation-required']});
const report={checks:[],errors:[]};function check(condition,message){assert.ok(condition,message);report.checks.push(message);}
try{
 const c=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 await c.addInitScript(()=>{
  const AC=window.AudioContext||window.webkitAudioContext;
  window.AudioContext=class extends AC{constructor(options={}){super({...options,sampleRate:48000});}
   resume(){this.resumeCalls=(this.resumeCalls||0)+1;if(this.resumeCalls===1)return new Promise(()=>{});return super.resume();}
  };
  Object.defineProperty(navigator,'audioSession',{value:{type:'auto'}});
  Object.defineProperty(document,'permissionsPolicy',{value:{features:()=>['camera','microphone'],allowsFeature:()=>false}});
  window.__motionCalls=[];const D=window.DeviceOrientationEvent;
  D.requestPermission=()=>{window.__motionCalls.push({type:window.event?.type,active:navigator.userActivation?.isActive});return window.__motionCalls.length===1?Promise.reject(new DOMException('Gesture required','NotAllowedError')):Promise.resolve('granted');};
  window.__soundStarts=[];const start=AudioBufferSourceNode.prototype.start;
  AudioBufferSourceNode.prototype.start=function(...args){const src=window.Howler?._howls.find(h=>h._sounds.some(s=>s._node?.bufferSource===this))?._src;if(src)window.__soundStarts.push({src,state:this.context.state});return start.apply(this,args);};
 });
 // Keep the engine deferred until two natural taps and sensor samples arrive.
 let release;const held=new Promise(r=>{release=r;});
 await c.route('**/index.php?scene-asset=engine',async route=>{await held;await route.continue();});
 // Original audio remains on disk, but the story must also survive hosts that
 // deny direct MP3 paths. All three recordings use the existing PHP allowlist.
 await c.route(/\/assets\/reference\/.*\.mp3(?:\?|$)/,route=>route.fulfill({status:403,body:'direct media denied'}));
 const p=await c.newPage();p.on('pageerror',e=>report.errors.push(e.message));
 await p.goto(base+'/',{waitUntil:'domcontentloaded'});
 check(await p.evaluate(()=>document.querySelector('.story-track').getBoundingClientRect().top>innerHeight),'the first real taps occur BEFORE the story, not on its canvas');
 await p.touchscreen.tap(24,210);await p.waitForFunction(()=>MTStoryInputs.motionState==='waiting'&&MTStoryInputs.motionError==='NotAllowedError');
 await p.waitForFunction(()=>window.__mtStoryAudioContext.state==='running');check(true,'a pending non-activating resume does not swallow the first eligible touch release');
 await p.touchscreen.tap(24,210);await p.waitForFunction(()=>MTStoryInputs.motionState==='granted'&&window.__mtStoryAudioContext.state==='running');
 check(await p.evaluate(()=>document.permissionsPolicy.allowsFeature('gyroscope')===false&&MTStoryInputs.motionState==='granted'),'unknown Generic Sensor policy features do not suppress native DeviceOrientation permission');
 check(await p.evaluate(()=>!window.MTStory3D),'early activation is captured before engine execution');
 check(await p.evaluate(()=>window.__motionCalls.length===2&&window.__motionCalls.every(c=>c.type==='touchend'||c.type==='click')),'native consent uses release/click, and a gesture rejection can retry');
 const sensor={send:async(_method,values)=>p.evaluate(v=>dispatchEvent(new DeviceOrientationEvent('deviceorientation',{...v,absolute:true})),values)};await sensor.send('orientation',{alpha:0,beta:0,gamma:0});
 await p.waitForFunction(()=>MTStoryInputs.motionSample!==null);
 await p.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY,behavior:'instant'}));release();
 await p.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:60000});
 check(await p.evaluate(()=>Howler.ctx===window.__mtStoryAudioContext&&Howler.ctx.state==='running'&&Howler.ctx.sampleRate===48000),'48kHz shared context remains live through mixer initialization');
 async function jump(value){await p.locator('.story-track').evaluate((e,v)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.story-stage').clientHeight)*v,behavior:'instant'}),value);await p.waitForFunction(v=>Math.abs(+document.querySelector('.mind-story').dataset.storyProgress-Math.min(1,Math.max(0,v)))<.005,value,{timeout:30000});return p.locator('.mind-story').evaluate(e=>JSON.parse(e.dataset.storyNative));}
 await p.evaluate(()=>{const ctx=Howler.ctx,a=ctx.createAnalyser();a.fftSize=2048;Howler.masterGain.disconnect(ctx.destination);Howler.masterGain.connect(a);a.connect(ctx.destination);window.__storyAnalyser=a;});
 async function peak(){return p.evaluate(()=>new Promise(resolve=>{let best=0,n=0;const samples=new Float32Array(__storyAnalyser.fftSize);function read(){__storyAnalyser.getFloatTimeDomainData(samples);for(const v of samples)best=Math.max(best,Math.abs(v));if(++n<18)requestAnimationFrame(read);else resolve(best)}read()}));}
 await jump(.13);await p.waitForFunction(()=>Howler._howls.some(h=>h._src.includes('scene-asset=story-ambient')&&h.playing()));
 check(await p.evaluate(()=>navigator.audioSession.type==='playback'),'Safari playback session is scoped to the visible chapter');
 const ambientPeak=await peak();check(ambientPeak>1e-5,'original ambience produces nonzero DSP samples, not just playing flags');
 const initialBreaks=await p.evaluate(()=>window.__soundStarts.filter(s=>s.src.includes('scene-asset=story-glass')).length);
 check(initialBreaks===1,'the original glass sound actually starts exactly once');
 await jump(.3);await sensor.send('DeviceOrientation.setDeviceOrientationOverride',{alpha:0,beta:14,gamma:12});
 await p.waitForFunction(()=>{const s=JSON.parse(document.querySelector('.mind-story').dataset.storyNative);return s.gyro&&s.renderCamera.some((v,i)=>Math.abs(v-s.camera[i])>.001)});
 check(true,'permitted sensor input offsets the rendered glass camera even with reduced idle motion');
 if(dest)await p.screenshot({path:dest+'/mobile-glass-gyro.png'});
 await jump(.60);await p.waitForFunction(()=>window.__soundStarts.some(s=>s.src.includes('scene-asset=story-burn')));
 check(true,'the original burn recording starts in the burn chapter');
 await jump(.68);await sensor.send('DeviceOrientation.setDeviceOrientationOverride',{alpha:0,beta:-12,gamma:-14});
 await p.waitForFunction(()=>{const s=JSON.parse(document.querySelector('.mind-story').dataset.storyNative);return s.phase===2&&s.papers===16&&s.shreds===6&&s.renderCamera.some((v,i)=>Math.abs(v-s.camera[i])>.001)});
 check(true,'the original paper/shred scene also receives the gyro offset');
 if(dest)await p.screenshot({path:dest+'/mobile-paper-gyro.png'});
 await jump(.3);await p.evaluate(()=>Howler.ctx.suspend());await p.touchscreen.tap(24,210);
 await p.waitForFunction(()=>Howler.ctx.state==='running');check(await peak()>1e-5,'a real tap resumes the same suspended mixer with audible signal');
 await jump(.08);check(await p.evaluate(()=>window.__soundStarts.filter(s=>s.src.includes('scene-asset=story-glass')).length)===initialBreaks,'reverse scroll does not replay a deferred fracture sound');
 await jump(1.01);await p.waitForTimeout(200);
 check(await p.evaluate(()=>Howler._howls.every(h=>!h.playing())),'every track stops at the chapter exit');
 check(await peak()<1e-6,'the chapter exit is actually silent at the DSP output');
 check(await p.evaluate(()=>navigator.audioSession.type==='auto'),'the chapter restores the prior audio session at exit');
 check(await p.evaluate(()=>window.__motionCalls.length)===2,'chapter transitions never re-prompt for motion consent');
 report.ambientPeak=ambientPeak;await c.close();
 // Explicit refusal stays refused. Sensor-null events are not a fake grant.
 const refusal=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await refusal.addInitScript(()=>{window.__motionCalls=0;DeviceOrientationEvent.requestPermission=()=>{window.__motionCalls++;return Promise.resolve('denied')};});
 await refusal.route('**/index.php?scene-asset=engine',r=>r.abort());const denied=await refusal.newPage();
 await denied.goto(base+'/#human-story',{waitUntil:'domcontentloaded'});await denied.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY,behavior:'instant'}));
 await denied.touchscreen.tap(24,210);await denied.waitForFunction(()=>MTStoryInputs.motionState==='denied');await denied.touchscreen.tap(24,210);
 check(await denied.evaluate(()=>window.__motionCalls===1&&MTStoryInputs.motionState==='denied'),'explicit denial is respected without repeated prompts');
 await refusal.close();assert.deepEqual(report.errors,[]);console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
