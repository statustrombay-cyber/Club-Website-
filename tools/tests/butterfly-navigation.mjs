/** Rendered click destinations, real captured mouse/touch drags and nav layout.
 * No physical-phone/FPS claim. npm run preview; optional browser/artifact paths. */
import{chromium}from'playwright-core';import assert from'node:assert/strict';import fs from'node:fs';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173',dest=process.env.TEST_ARTIFACTS,report={layouts:[],interactions:[],errors:[]};if(dest)fs.mkdirSync(dest,{recursive:true});
async function center(p){return p.locator('.nav-butterfly').evaluate(e=>{const b=e.getBoundingClientRect();return{x:b.x+b.width/2,y:b.y+b.height/2,state:e.dataset.butterflyState};});}
async function waitState(p,state){await p.waitForFunction(s=>document.querySelector('.nav-butterfly').dataset.butterflyState===s,state,{timeout:12000});}
try{
 for(const width of [320,360,390,768,1024,1100,1101,1280,1440]){
  const p=await browser.newPage({viewport:{width,height:844}});p.on('pageerror',e=>report.errors.push(e.message));await p.goto(base+'/calendar');
  const g=await p.evaluate(()=>{const rect=s=>document.querySelector(s).getBoundingClientRect().toJSON();return{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,menu:rect('#menuButton'),brand:rect('.brand'),nav:rect('.nav'),links:rect('#navLinks'),display:getComputedStyle(document.querySelector('.mobile-nav-toggle')).display};});
  assert.equal(g.scrollWidth,width,'navigation cannot widen the viewport');
  if(width<=1100){
   assert.equal(g.display,'block');assert.ok(Math.abs(g.menu.right-g.nav.right)<1,'hamburger is at the right edge, never in a middle flex slot');assert.ok(g.menu.left>=g.brand.right+8);
   await p.locator('#menuButton').click();await p.waitForFunction(()=>document.querySelector('.mobile-nav-toggle').open);
   assert.ok(await p.locator('#navLinks').isVisible());await p.waitForFunction(()=>document.querySelector('#menuButton').getAttribute('aria-expanded')==='true');
   const open=await p.locator('.menu-icon i').first().evaluate(e=>getComputedStyle(e).transform);assert.notEqual(open,'none','opened hamburger becomes a cross');
   const bounds=await p.locator('#navLinks').boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=width+1);
   await p.locator('#navLinks a').first().focus();await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.querySelector('.mobile-nav-toggle').open);
   assert.ok(await p.locator('#menuButton').evaluate(e=>document.activeElement===e),'Escape returns focus to menu control');
  }else{assert.equal(g.display,'none');assert.ok(g.links.left>g.brand.right+8&&g.links.right<=g.nav.right+1);assert.ok(await p.locator('#navLinks').isVisible());}
  report.layouts.push({width,menuRight:g.menu.right,navRight:g.nav.right,display:g.display});if(dest&&[390,1024,1440].includes(width))await p.screenshot({path:`${dest}/nav-${width}.png`});await p.close();
 }
 for(const width of [390,1440]){
  const mobile=width<600,p=await browser.newPage({viewport:{width,height:844},isMobile:mobile,hasTouch:mobile});p.on('pageerror',e=>report.errors.push(e.message));await p.goto(base+'/calendar');await waitState(p,'perched');
  const home=await center(p),scrollBefore=await p.evaluate(()=>scrollY),cdp=mobile?await p.context().newCDPSession(p):null;
  async function down(dx=0,dy=0){const c=await center(p);c.x+=dx;c.y+=dy;if(mobile)await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:c.x,y:c.y,id:1}]});else{await p.mouse.move(c.x,c.y);await p.mouse.down();}await waitState(p,'dragging');}
  async function move(x,y){if(mobile)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y,id:1}]});else await p.mouse.move(x,y,{steps:5});await p.waitForTimeout(150);}
  async function up(cancel=false){if(mobile)await cdp.send('Input.dispatchTouchEvent',{type:cancel?'touchCancel':'touchEnd',touchPoints:[]});else if(cancel)await p.locator('.butterfly-grip').evaluate(e=>e.dispatchEvent(new PointerEvent('pointercancel',{pointerId:1})));else await p.mouse.up();}
  await down();
  const points=[[width*.7,280],[width*.35,480],[width*.8,650]];
  for(const[x,y]of points){await move(x,y);const c=await center(p);assert.ok(Math.hypot(c.x-x,c.y-y)<9,'captured butterfly follows the actual finger/mouse, not an old click target');assert.equal(await p.evaluate(()=>scrollY),scrollBefore,'drag must not scroll the document');}
  const wings=await p.locator('.wing-left').evaluate(e=>({animation:getComputedStyle(e).animationName,transform:getComputedStyle(e).transform}));assert.equal(wings.animation,'photoWingLeft');await p.waitForTimeout(70);assert.notEqual(await p.locator('.wing-left').evaluate(e=>getComputedStyle(e).transform),wings.transform,'wings actually flap during the hold');
  if(dest)await p.screenshot({path:`${dest}/drag-${width}.png`});await up();await waitState(p,'perched');const returned=await center(p);assert.ok(Math.hypot(home.x-returned.x,home.y-returned.y)<2,'release returns smoothly to the current header perch');
  // Grab a wing off-centre, then lose capture: preserve the grab offset and
  // never activate whatever happens to be underneath the released pointer.
  await p.locator('.butterfly-grip').evaluate(e=>e.addEventListener('pointerdown',event=>window.__gripPointer=event.pointerId,{once:true}));
  const offset=(mobile?82:108)*.35;await down(offset,0);await move(width*.5+offset,410);
  const offcenter=await center(p);assert.ok(Math.hypot(offcenter.x-width*.5,offcenter.y-410)<9,'grabbing a wing preserves the grab offset without jumping to the pointer centre');
  await p.locator('.butterfly-grip').evaluate(e=>e.releasePointerCapture(window.__gripPointer));await move(width*.55,430);await up();await waitState(p,'perched');
  await down();await move(width*.5,400);if(mobile)await up(true);else{await p.evaluate(()=>dispatchEvent(new Event('blur')));await p.mouse.up();}await waitState(p,'perched');
  // Keyboard alternative, and no stale capture blocking a subsequent drag.
  await p.locator('.butterfly-grip').focus();await p.keyboard.press('ArrowDown');await waitState(p,'dragging');await p.keyboard.press('ArrowRight');await p.keyboard.press('Escape');await waitState(p,'perched');
  await p.evaluate(()=>{window.__hits=[];window.__activations=0;document.addEventListener('mt:butterfly-hit',e=>__hits.push({id:e.detail.target.id,point:e.detail.point}));const b=document.createElement('button');b.id='flight-target';b.type='button';b.textContent='Test target';b.style.cssText='position:fixed;left:70px;top:350px;width:150px;height:48px;z-index:70';b.addEventListener('click',()=>__activations++);document.body.append(b);});
  await p.mouse.click(89,365);await p.locator('#flight-target').evaluate(e=>e.style.top='650px');
  await p.waitForFunction(()=>window.__activations===1);const hit=await p.evaluate(()=>__hits.find(x=>x.id==='flight-target'));
  assert.ok(hit&&Math.hypot(hit.point.x-89,hit.point.y-365)<1,'click landing is the frozen original pointer point even when the target moves');await p.waitForTimeout(200);assert.equal(await p.evaluate(()=>__activations),1,'button activates once, without replay recursion');
  await p.locator('#flight-target').evaluate(e=>e.remove());await waitState(p,'perched');
  // Plain page taps are feedback, not swallowed native events.
  await p.evaluate(()=>{const e=document.createElement('div');e.id='plain-tap';e.textContent='Page space';e.style.cssText='position:fixed;left:80px;top:360px;width:150px;height:40px;z-index:70';document.body.append(e);});await p.mouse.click(110,375);await p.waitForFunction(()=>__hits.some(x=>x.id==='plain-tap'));const plain=await p.evaluate(()=>__hits.find(x=>x.id==='plain-tap'));assert.ok(Math.hypot(plain.point.x-110,plain.point.y-375)<1);await p.locator('#plain-tap').evaluate(e=>e.remove());
  if(mobile){
   await waitState(p,'perched');const menu=await p.locator('#menuButton').boundingBox();
   await p.locator('#menuButton').click();await p.keyboard.press('Escape');
   await p.waitForFunction(()=>__hits.some(x=>x.id==='menuButton'));
   const tapped=await p.evaluate(()=>__hits.find(x=>x.id==='menuButton'));
   assert.ok(Math.hypot(tapped.point.x-(menu.x+menu.width/2),tapped.point.y-(menu.y+menu.height/2))<1,'menu toggle receives the exact tap destination without delayed native toggling');
   await p.setViewportSize({width:1440,height:844});await p.waitForTimeout(80);
   assert.ok(await p.locator('#navLinks').isVisible());assert.ok(!await p.locator('.mobile-nav-toggle').evaluate(e=>e.open));
   await p.setViewportSize({width:390,height:844});await p.waitForTimeout(80);
   assert.ok(!await p.locator('#navLinks').isVisible(),'crossing desktop breakpoint does not reopen a stale mobile panel');
  }
  report.interactions.push({width,dragPoints:points,returned,clickHit:hit,plainHit:plain});await p.close();
 }
 // Real registration fields retain a small left-side companion and typing.
 const form=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});form.on('pageerror',e=>report.errors.push(e.message));await form.goto(base+'/register?event=event-welcome-circle');
 const field=form.locator('input[name="name"]').first();await field.scrollIntoViewIfNeeded();await field.focus();await waitState(form,'companion');
 const relative=await field.evaluate(e=>{const a=e.getBoundingClientRect(),b=document.querySelector('.butterfly-flight').getBoundingClientRect();return{field:a.toJSON(),photo:b.toJSON()};});assert.ok(relative.photo.right<=relative.field.left+2,'companion photo remains to the LEFT of focused input');
 await field.fill('Riya Sharma');assert.equal(await field.inputValue(),'Riya Sharma');await form.keyboard.press('Backspace');assert.ok(await form.locator('.nav-butterfly').evaluate(e=>e.classList.contains('butterfly-typing')));
 if(dest)await form.screenshot({path:`${dest}/field-companion.png`});await form.close();
 // Reduced motion still permits direct manipulation, but not forced flapping.
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto(base+'/calendar');await waitState(reduced,'perched');
 const rc=await center(reduced);await reduced.mouse.move(rc.x,rc.y);await reduced.mouse.down();await waitState(reduced,'dragging');await reduced.mouse.move(200,400);await reduced.waitForTimeout(80);
 assert.ok(Math.hypot((await center(reduced)).x-200,(await center(reduced)).y-400)<1);
 assert.equal(await reduced.locator('.wing-left').evaluate(e=>getComputedStyle(e).animationName),'none');
 await reduced.mouse.up();await waitState(reduced,'perched');await reduced.emulateMedia({media:'print'});assert.equal(await reduced.locator('.nav-butterfly').evaluate(e=>getComputedStyle(e).display),'none','interactive butterfly never prints over a pass');await reduced.close();
 // Native fallback still exposes the menu at tablet widths with JavaScript off.
 const nojs=await browser.newPage({viewport:{width:1024,height:844},javaScriptEnabled:false});await nojs.goto(base+'/calendar');await nojs.locator('#menuButton').click();assert.ok(await nojs.locator('#navLinks').isVisible());await nojs.close();
 assert.deepEqual(report.errors,[]);console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
