<?php
/** A public, read-only scene delivery check; no accounts/server configuration. */
$manifestPath = MT_APP . '/scene-manifest.php';
if (!is_file($manifestPath)) {
    mt_json_raw(503, 'The scene hosting package is incomplete. Upload the complete update package.', ['Content-Type' => 'text/plain; charset=utf-8']);
}
$sceneManifest = require $manifestPath;
$checks = [];
foreach ($sceneManifest as $id => $asset) {
    $checks[] = ['id' => $id, 'bytes' => $asset['bytes'], 'sha256' => $asset['sha256']];
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Animated scene check · Mindful Tattva</title>
<style>body{max-width:800px;margin:40px auto;padding:0 20px;background:#f7f2ed;color:#302a27;font:16px/1.6 system-ui,sans-serif}h1{font:38px/1.2 Georgia,serif}li{padding:8px 0;border-bottom:1px solid #302a2720}.pass{color:#20613e}.fail{color:#9a2b27}pre{padding:18px;background:#fff;white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.7 monospace}a{color:#633d2b}button{padding:9px 15px;cursor:pointer}</style></head><body>
<h1>Animated scene check</h1><p>This checks the files your browser actually receives, not just whether they exist on the server. No Java, Node.js or server-side JavaScript installation is needed.</p>
<p id="summary" role="status">Checking this browser and the scene uploads…</p><ul id="results"></ul><p><a href="/#human-story">Open the animated section</a> · <button type="button" onclick="location.reload()">Run again</button></p>
<p>If a check fails, the report below names the affected component. It contains no passwords, student records or private server paths.</p><pre id="report" tabindex="0">Running…</pre>
<script>
(async function(){
 const assets=<?= json_encode($checks, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES) ?>;
 const report={host:location.host,secure:window.isSecureContext,checks:[]};let failures=0;
 function result(name,ok,detail){report.checks.push({name,ok,detail});if(!ok)failures++;const li=document.createElement('li');li.className=ok?'pass':'fail';li.textContent=(ok?'PASS — ':'FAIL — ')+name+(detail?' · '+detail:'');document.querySelector('#results').append(li);document.querySelector('#report').textContent=JSON.stringify(report,null,2);}
 try{const canvas=document.createElement('canvas'),gl=canvas.getContext('webgl2');result('Browser WebGL 2',!!gl,gl?'Available':'Enable hardware acceleration or use a browser/device with WebGL 2 support.');gl?.getExtension('WEBGL_lose_context')?.loseContext();}catch(error){result('Browser WebGL 2',false,error.message);}
 try{result('Browser WebAssembly',typeof WebAssembly==='object'&&WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0])),'Runs in the browser, not on the PHP server.');}catch(error){result('Browser WebAssembly',false,error.message);}
 try{await new Promise((resolve,reject)=>{const url=URL.createObjectURL(new Blob(['postMessage("ready")'],{type:'text/javascript'})),worker=new Worker(url),timer=setTimeout(()=>{worker.terminate();URL.revokeObjectURL(url);reject(Error('Worker did not start'));},5000);worker.onmessage=()=>{clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);resolve();};worker.onerror=event=>{clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);reject(Error(event.message||'Worker blocked'));};});result('Browser decoder worker',true,'Available');}catch(error){result('Browser decoder worker',false,error.message);}
 for(const asset of assets){
  try{
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),60000);let response;
   try{response=await fetch('/scene-assets.php?asset='+encodeURIComponent(asset.id),{cache:'no-store',signal:controller.signal});}finally{clearTimeout(timer);}
   if(!response.ok)throw Error('HTTP '+response.status+' — '+(await response.text()).slice(0,120));
   const bytes=await response.arrayBuffer();if(bytes.byteLength!==asset.bytes)throw Error('Wrong response size: '+bytes.byteLength+'; expected '+asset.bytes+'. The host may have returned a protection/error page.');
   if(!crypto.subtle)throw Error('Integrity check requires HTTPS.');
   const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
   if(digest!==asset.sha256)throw Error('Uploaded bytes do not match this package.');
   if(asset.id.endsWith('-wasm')&&!WebAssembly.validate(bytes))throw Error('Not a valid WebAssembly decoder.');
   result(asset.id,true,bytes.byteLength+' bytes; SHA-256 matches');
  }catch(error){result(asset.id,false,error.message);}
 }
 try{await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='/scene-assets.php?asset=engine';script.onload=()=>window.MTStory3D?.create?resolve():reject(Error('Engine API missing'));script.onerror=()=>reject(Error('Script blocked or unavailable'));document.head.append(script);});result('Three.js scene engine executes',true,'Original scene adapter registered');}catch(error){result('Three.js scene engine executes',false,error.message);}
 document.querySelector('#summary').textContent=failures?failures+' check(s) failed. Select the report below to share the exact error.':'All delivery and browser-capability checks passed. Open the animated section to check its movement.';
 report.failures=failures;document.querySelector('#report').textContent=JSON.stringify(report,null,2);document.body.dataset.checkComplete='true';document.body.dataset.checkFailures=String(failures);
})();
</script></body></html>
