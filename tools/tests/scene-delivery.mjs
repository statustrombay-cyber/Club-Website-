/** Read-only real-browser checks of the public hosting diagnostic. */
import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const slim=process.env.CHROMIUM_PATH?null:(await import('@sparticuz/chromium')).default;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||await slim.executablePath(),args:slim?slim.args.filter(a=>a!=='--single-process'):['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.TEST_URL||'http://localhost:4173';
try{
 for(const mode of ['normal','html-response','forbidden']){
  const broken=mode!=='normal';
  const context=await browser.newContext({viewport:{width:390,height:844}});
  if(broken)await context.route('**/index.php?scene-asset=basis-wasm',r=>r.fulfill({status:mode==='forbidden'?403:200,contentType:'text/html',body:'<html>Hosting protection page instead of WASM</html>'}));
  const page=await context.newPage();await page.goto(base+'/index.php?scene-check=1');
  await page.waitForFunction(()=>document.body.dataset.checkComplete==='true',null,{timeout:90000});
  const report=JSON.parse(await page.locator('#report').textContent());
  assert.equal(report.checks.length,15);
  assert.equal(report.failures,broken?1:0,JSON.stringify(report));
  if(broken){const failure=report.checks.find(c=>!c.ok);assert.equal(failure.name,'basis-wasm');assert.match(failure.detail,mode==='forbidden'?/HTTP 403: the host denied/:/Wrong response size/);assert.match(failure.detail,/requested \/index\.php\?scene-asset=basis-wasm/);}
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  console.log(JSON.stringify({mode,...report}));await context.close();
 }
}finally{await browser.close();}
