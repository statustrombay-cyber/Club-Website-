// Real-browser regression: dark brand-band CSS must not conceal the departure.
import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/tmp/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
try {
 for(const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:844}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto((process.env.TEST_URL||'http://localhost:4173')+'/calendar');
  await page.evaluate(()=>dispatchEvent(new Event('mt:intro-ready')));
  await page.waitForFunction(()=>document.querySelector('.nav-butterfly').dataset.butterflyState==='perched');
  await page.evaluate(()=>{const dark=document.createElement('div');dark.className='black-chapter';dark.id='test-dark';dark.style.cssText='position:fixed;inset:0;background:#0b0b0d;z-index:2';document.body.append(dark);document.body.classList.add('is-black-chapter');dispatchEvent(new Event('scroll'));});
  await page.waitForFunction(()=>document.querySelector('.nav-butterfly').dataset.butterflyState==='leaving');
  await page.waitForTimeout(1400);
  const during=await page.locator('.nav-butterfly').evaluate(e=>({opacity:getComputedStyle(e).opacity,visibility:getComputedStyle(e).visibility,rect:e.getBoundingClientRect().toJSON(),state:e.dataset.butterflyState}));
  assert.equal(during.opacity,'1');assert.equal(during.visibility,'visible');assert.equal(during.state,'leaving');assert.ok(during.rect.right>0&&during.rect.bottom>0,'the butterfly remains visibly airborne during its slow bank');
  await page.waitForFunction(()=>document.querySelector('.nav-butterfly').dataset.butterflyState==='away');
  const end=await page.locator('.nav-butterfly').boundingBox();assert.ok(end.x+end.width<0&&end.y+end.height<0,'hide only beyond the upper-left corner');
  await page.evaluate(()=>{document.querySelector('#test-dark').remove();document.body.classList.remove('is-black-chapter');dispatchEvent(new Event('scroll'));});
  await page.waitForFunction(()=>document.querySelector('.nav-butterfly').dataset.butterflyState==='perched');
  assert.deepEqual(errors,[]);console.log(JSON.stringify({width,during,state:'PASS'}));await page.close();
 }
}finally{await browser.close();}
