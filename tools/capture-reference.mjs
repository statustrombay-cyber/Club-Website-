/** Public-response capture, equivalent to a DevTools resource saver. Run locally
 * with access to why.zero.university; NEVER upload a browser profile/cookies.
 * npm install --no-save --package-lock=false playwright-core
 * Launch your own Chrome with --remote-debugging-port=9222 and a fresh temporary
 * profile, then: node tools/capture-reference.mjs /outside/project/zero-capture
 * Finish every interactive gate and scroll all the way to the end; press Enter
 * in THIS terminal only when done. Only response bodies/URLs are saved: no
 * cookies, auth headers, localStorage or private application/backend source.
 */
import {chromium} from 'playwright-core';
import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';import readline from 'node:readline/promises';
const out=path.resolve(process.argv[2]||'../zero-reference-capture');
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
if(out===repo||out.startsWith(repo+path.sep))throw Error('Capture outside the entire project/deployment tree');
const browser=await chromium.connectOverCDP(process.env.MT_CDP_URL||'http://127.0.0.1:9222');
const page=browser.contexts().flatMap(c=>c.pages()).find(p=>/^https:\/\/why\.zero\.university\//.test(p.url()));
if(!page)throw Error('Open https://why.zero.university/ in the debug Chrome first');
await fs.mkdir(out,{recursive:true});let total=0;const jobs=new Set(),manifest=[];
const context=page.context();
const saveResponse=response=>{
 const work=(async()=>{try{
  const url=new URL(response.url());if(!['http:','https:'].includes(url.protocol)||!response.ok())return;
  const body=await response.body();if(body.length>30*1024*1024||total+body.length>150*1024*1024)return;
  const sha=createHash('sha256').update(body).digest('hex'),ext=path.extname(url.pathname).replace(/[^.a-z0-9]/gi,'').slice(0,12),file=sha+ext;
  total+=body.length; // Reserve before awaiting disk I/O; concurrent responses share the cap.
  await fs.writeFile(path.join(out,file),body);manifest.push({url:url.href,file,bytes:body.length,sha256:sha,contentType:response.headers()['content-type']||''});console.log(response.status(),body.length,url.pathname);
 }catch(error){console.warn('Not captured:',response.url(),error.message);}})();jobs.add(work);work.finally(()=>jobs.delete(work));
};
context.on('response',saveResponse); // Includes worker/service-worker responses in this fresh profile.
console.log('Capture armed. Reload that tab; complete draw/hold gates and scroll to the VERY END.');
const rl=readline.createInterface({input:process.stdin,output:process.stdout});await rl.question('When complete, press Enter here to finish: ');rl.close();context.off('response',saveResponse);await Promise.allSettled([...jobs]);
await fs.writeFile(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2));
console.log(`Saved ${manifest.length} public responses / ${Math.round(total/1024)} KiB in ${out}. No request headers or browser storage exported.`);await browser.close();
