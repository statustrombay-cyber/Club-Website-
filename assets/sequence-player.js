/* Bounded native-scroll film player. Original camera motion is in the source
   frames; WebGL interpolates adjacent dense samples, not unrelated still poses.
   No autonomous playback, scroll interception, framework or remote dependency. */
(function(){'use strict';
 window.MTFrameSequence={create};
 function create(canvas,options){
  if(!canvas)return null;
  const cache=new Map(),jobs=new Map(),failures=new Map();let manifest=null,wanted=0,current=0,active=false,raf=0,last=0,renderer=null,lost=false,disposed=false,painted=false;
  function shader(gl,type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
  function init(){
   try{
    const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
    if(gl){
     const p=gl.createProgram(),vs=shader(gl,gl.VERTEX_SHADER,'attribute vec2 a; varying vec2 uv; void main(){uv=vec2((a.x+1.)*.5,(1.-a.y)*.5);gl_Position=vec4(a,0.,1.);}'),fs=shader(gl,gl.FRAGMENT_SHADER,'precision mediump float; varying vec2 uv; uniform sampler2D first; uniform sampler2D second; uniform float blend; uniform vec2 crop; void main(){vec2 q=(uv-.5)*crop+.5;gl_FragColor=mix(texture2D(first,q),texture2D(second,q),blend);}');
     gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error('Film program unavailable');gl.useProgram(p);
     const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
     const a=gl.getAttribLocation(p,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
     const textures=[0,1].map(unit=>{const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t;});
     gl.uniform1i(gl.getUniformLocation(p,'first'),0);gl.uniform1i(gl.getUniformLocation(p,'second'),1);
     renderer={gl,textures,buffer,p,vs,fs,blend:gl.getUniformLocation(p,'blend'),crop:gl.getUniformLocation(p,'crop'),uploaded:[-1,-1]};canvas.dataset.renderer='webgl';return;
    }
   }catch(e){canvas.dataset.sequenceError=e.message;}
   const ctx=canvas.getContext('2d',{alpha:false});if(ctx){renderer={ctx};canvas.dataset.renderer='canvas2d';}
  }
  function stats(){canvas.dataset.cacheFrames=String(cache.size);canvas.dataset.pendingFrames=String(jobs.size);}
  function close(image){image?.close?.();}
  function trim(limit=20){
   const keys=[...cache.keys()].sort((a,b)=>Math.min(Math.abs(a-current),Math.abs(a-wanted))-Math.min(Math.abs(b-current),Math.abs(b-wanted)));
   keys.slice(limit).forEach(k=>{close(cache.get(k));cache.delete(k);});stats();
  }
  function schedule(){if(active&&!disposed&&!document.hidden&&!raf)raf=requestAnimationFrame(tick);}
  function list(){
   const direction=wanted>=current?1:-1,base=Math.floor(current),end=Math.round(wanted),out=[];
   const add=n=>{n=Math.max(0,Math.min(manifest.count-1,n));if(!out.includes(n))out.push(n);};
   add(base);add(base+1);add(base+direction*2);add(end);
   for(let i=1;i<=7;i++){add(base+direction*i);add(end+i);add(end-i);}
   return out.slice(0,20);
  }
  function pump(){
   if(!manifest||!active||disposed||document.hidden)return;
   for(const index of list()){
    if(jobs.size>=4)break;if(cache.has(index)||jobs.has(index)||(failures.get(index)||0)>Date.now())continue;
    const control=new AbortController();jobs.set(index,control);stats();
    fetch(manifest.pattern.replace('{frame}',String(index).padStart(4,'0')),{signal:control.signal,priority:index===Math.floor(current)?'high':'low'})
    .then(r=>{if(!r.ok)throw Error('Film frame '+r.status);return r.blob();})
    .then(async blob=>{
     if(window.createImageBitmap)return createImageBitmap(blob);
     const image=new Image(),url=URL.createObjectURL(blob);image.src=url;try{await image.decode();return image;}finally{URL.revokeObjectURL(url);}
    })
    .then(image=>{if(disposed||control.signal.aborted){close(image);return;}cache.set(index,image);trim();schedule();})
    .catch(error=>{if(error.name!=='AbortError'){canvas.dataset.sequenceError=error.message;failures.set(index,Date.now()+3000);}})
    .finally(()=>{if(jobs.get(index)===control)jobs.delete(index);stats();if(!control.signal.aborted)pump();});
   }
  }
  function draw(position){
   if(!renderer||lost||!manifest)return false;
   let first=Math.floor(position),second=Math.min(manifest.count-1,first+1),mix=position-first;
   if(!cache.has(first)||!cache.has(second)){
    const near=[...cache.keys()].sort((a,b)=>Math.abs(a-position)-Math.abs(b-position))[0];
    if(near===undefined||Math.abs(near-position)>2.5)return false;
    first=second=near;mix=0;
   }
   const width=Math.max(1,canvas.clientWidth),height=Math.max(1,canvas.clientHeight),dpr=Math.min(devicePixelRatio||1,1.25,Math.sqrt(1400000/(width*height)));
   const w=Math.round(width*dpr),h=Math.round(height*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
   const source=manifest.width/manifest.height,aspect=width/height,crop=aspect>source?[1,source/aspect]:[aspect/source,1];
   if(renderer.gl){
    const r=renderer,g=r.gl;g.viewport(0,0,w,h);g.useProgram(r.p);
    [first,second].forEach((index,unit)=>{g.activeTexture(g.TEXTURE0+unit);g.bindTexture(g.TEXTURE_2D,r.textures[unit]);if(r.uploaded[unit]!==index){g.texImage2D(g.TEXTURE_2D,0,g.RGB,g.RGB,g.UNSIGNED_BYTE,cache.get(index));r.uploaded[unit]=index;}});
    g.uniform2f(r.crop,crop[0],crop[1]);g.uniform1f(r.blend,mix);g.drawArrays(g.TRIANGLE_STRIP,0,4);
   }else{
    const c=renderer.ctx,sw=manifest.width*crop[0],sh=manifest.height*crop[1],sx=(manifest.width-sw)/2,sy=(manifest.height-sh)/2;
    c.globalAlpha=1;c.drawImage(cache.get(first),sx,sy,sw,sh,0,0,w,h);if(mix){c.globalAlpha=mix;c.drawImage(cache.get(second),sx,sy,sw,sh,0,0,w,h);c.globalAlpha=1;}
   }
   const shown=first===second?first:first+mix;canvas.dataset.displayedFrame=shown.toFixed(2);canvas.dataset.sequenceReady='true';canvas.style.opacity='1';painted=true;options.onFrame?.(shown);return true;
  }
  function tick(now){
   raf=0;if(!active||document.hidden||disposed)return;
   const dt=last?Math.min(64,now-last):16;last=now;
   const step=Math.max(-2.5,Math.min(2.5,(wanted-current)*(1-Math.exp(-dt/75))));
   const next=Math.abs(wanted-current)<.025?wanted:current+step;
   const ready=draw(next);if(ready)current=next;else if(!painted)draw(current);
   pump();if(ready&&Math.abs(current-wanted)>.025)schedule();else last=0;
  }
  function setFrame(value){wanted=Math.max(0,Math.min((manifest?.count||options.count)-1,value));canvas.dataset.targetFrame=wanted.toFixed(2);pump();schedule();}
  function setActive(value){
   active=!!value;if(active){if(!renderer&&!lost)init();pump();schedule();}else{cancelAnimationFrame(raf);raf=0;last=0;jobs.forEach(c=>c.abort());jobs.clear();trim(2);}
  }
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;canvas.style.opacity='0';painted=false;});
  canvas.addEventListener('webglcontextrestored',()=>{lost=false;init();schedule();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0;}else schedule();});
  const observer=new ResizeObserver(()=>schedule());observer.observe(canvas);
  fetch(options.manifest).then(r=>{if(!r.ok)throw Error('Film manifest unavailable');return r.json();}).then(data=>{manifest=data;canvas.dataset.frameCount=String(data.count);pump();schedule();}).catch(e=>{canvas.dataset.sequenceError=e.message;});
  return {setFrame,setActive,get frameCount(){return manifest?.count||options.count;},dispose(){disposed=true;setActive(false);observer.disconnect();cache.forEach(close);cache.clear();if(renderer?.gl){const r=renderer,g=r.gl;r.textures.forEach(t=>g.deleteTexture(t));g.deleteBuffer(r.buffer);g.deleteProgram(r.p);g.deleteShader(r.vs);g.deleteShader(r.fs);}}};
 }
})();
