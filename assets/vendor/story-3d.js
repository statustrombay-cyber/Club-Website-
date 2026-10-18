(()=>{var Yp=Object.defineProperty;var jp=(e,t,i)=>t in e?Yp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var Cu=(e,t,i)=>jp(e,typeof t!="symbol"?t+"":t,i);var Kp=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);var Jp="attached",yi=1e3,Li=1001,Dn=1002,si=1003,Bc=1004,Rc=1005,qe=1006,Pc=1007,$a=1008,Gt=1009,kl=1014,Da=1015,Ua=1016,Gl=1020,mt=1023,Lc=1026,Zp=1027,Ta=1028,ps=1030,$p=33776,ef=33779,tf=35840,rf=35842,af=36196,sf=37492,nf=37496,of=37808,Mu=37812,lf=36492,Dc=2200,uf=2201,hf=2202,Is=2300,za=2301,so=2302,wa=2400,ba=2401,Un=2402,Hl=2500,cf=2501,Uc=3e3,Nc=3001,df=3200,pf=3201,Ye="srgb",Ct="srgb-linear",zl="display-p3",Xn="display-p3-linear",Nn="linear",Fn="srgb",Iu="rec709",no=7680,Fc=35044;var ff=1035,Ts=2e3,ta=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let i=t.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Qt="00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."),Tu=1234567,vs=Math.PI/180,Va=180/Math.PI;function Di(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Qt[e&255]+Qt[e>>8&255]+Qt[e>>16&255]+Qt[e>>24&255]+"-"+Qt[t&255]+Qt[t>>8&255]+"-"+Qt[t>>16&15|64]+Qt[t>>24&255]+"-"+Qt[i&63|128]+Qt[i>>8&255]+"-"+Qt[i>>16&255]+Qt[i>>24&255]+Qt[r&255]+Qt[r>>8&255]+Qt[r>>16&255]+Qt[r>>24&255]).toLowerCase()}function Ht(e,t,i){return Math.max(t,Math.min(i,e))}function Vl(e,t){return(e%t+t)%t}function Af(e,t,i,r,a){return r+(e-t)*(a-r)/(i-t)}function mf(e,t,i){return e===t?0:(i-e)/(t-e)}function xs(e,t,i){return(1-i)*e+i*t}function gf(e,t,i,r){return xs(e,t,1-Math.exp(-i*r))}function _f(e,t=1){return t-Math.abs(Vl(e,t*2)-t)}function vf(e,t,i){return e<=t?0:e>=i?1:(e=(e-t)/(i-t),e*e*(3-2*e))}function xf(e,t,i){return e<=t?0:e>=i?1:(e=(e-t)/(i-t),e*e*e*(e*(e*6-15)+10))}function Ef(e,t){return e+Math.floor(Math.random()*(t-e+1))}function yf(e,t){return e+Math.random()*(t-e)}function Sf(e){return e*(.5-Math.random())}function Cf(e){e!==void 0&&(Tu=e);let t=Tu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Mf(e){return e*vs}function If(e){return e*Va}function hl(e){return(e&e-1)==0&&e!==0}function Tf(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Qn(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function wf(e,t,i,r,a){let s=Math.cos,n=Math.sin,o=s(i/2),u=n(i/2),h=s((t+r)/2),d=n((t+r)/2),l=s((t-r)/2),c=n((t-r)/2),p=s((r-t)/2),f=n((r-t)/2);switch(a){case"XYX":e.set(o*d,u*l,u*c,o*h);break;case"YZY":e.set(u*c,o*d,u*l,o*h);break;case"ZXZ":e.set(u*l,u*c,o*d,o*h);break;case"XZX":e.set(o*d,u*f,u*p,o*h);break;case"YXY":e.set(u*p,o*d,u*f,o*h);break;case"ZYZ":e.set(u*f,u*p,o*d,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Oi(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error("Invalid component type.")}}function $e(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error("Invalid component type.")}}var bf={DEG2RAD:vs,RAD2DEG:Va,generateUUID:Di,clamp:Ht,euclideanModulo:Vl,mapLinear:Af,inverseLerp:mf,lerp:xs,damp:gf,pingpong:_f,smoothstep:vf,smootherstep:xf,randInt:Ef,randFloat:yf,randFloatSpread:Sf,seededRandom:Cf,degToRad:Mf,radToDeg:If,isPowerOfTwo:hl,ceilPowerOfTwo:Tf,floorPowerOfTwo:Qn,setQuaternionFromProperEuler:wf,normalize:$e,denormalize:Oi},oe=class Qc{constructor(t=0,i=0){Qc.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let i=this.x,r=this.y,a=t.elements;return this.x=a[0]*i+a[3]*r+a[6],this.y=a[1]*i+a[4]*r+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this}clampScalar(t,i){return this.x=Math.max(t,Math.min(i,this.x)),this.y=Math.max(t,Math.min(i,this.y)),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(t,Math.min(i,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(t)/i;return Math.acos(Ht(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){let r=Math.cos(i),a=Math.sin(i),s=this.x-t.x,n=this.y-t.y;return this.x=s*r-n*a+t.x,this.y=s*a+n*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ze=class Oc{constructor(t,i,r,a,s,n,o,u,h){Oc.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,a,s,n,o,u,h)}set(t,i,r,a,s,n,o,u,h){let d=this.elements;return d[0]=t,d[1]=a,d[2]=o,d[3]=i,d[4]=s,d[5]=u,d[6]=r,d[7]=n,d[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){let r=t.elements,a=i.elements,s=this.elements,n=r[0],o=r[3],u=r[6],h=r[1],d=r[4],l=r[7],c=r[2],p=r[5],f=r[8],m=a[0],g=a[3],A=a[6],_=a[1],v=a[4],x=a[7],C=a[2],y=a[5],T=a[8];return s[0]=n*m+o*_+u*C,s[3]=n*g+o*v+u*y,s[6]=n*A+o*x+u*T,s[1]=h*m+d*_+l*C,s[4]=h*g+d*v+l*y,s[7]=h*A+d*x+l*T,s[2]=c*m+p*_+f*C,s[5]=c*g+p*v+f*y,s[8]=c*A+p*x+f*T,this}multiplyScalar(t){let i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){let t=this.elements,i=t[0],r=t[1],a=t[2],s=t[3],n=t[4],o=t[5],u=t[6],h=t[7],d=t[8];return i*n*d-i*o*h-r*s*d+r*o*u+a*s*h-a*n*u}invert(){let t=this.elements,i=t[0],r=t[1],a=t[2],s=t[3],n=t[4],o=t[5],u=t[6],h=t[7],d=t[8],l=d*n-o*h,c=o*u-d*s,p=h*s-n*u,f=i*l+r*c+a*p;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/f;return t[0]=l*m,t[1]=(a*h-d*r)*m,t[2]=(o*r-a*n)*m,t[3]=c*m,t[4]=(d*i-a*u)*m,t[5]=(a*s-o*i)*m,t[6]=p*m,t[7]=(r*u-h*i)*m,t[8]=(n*i-r*s)*m,this}transpose(){let t,i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,a,s,n,o){let u=Math.cos(s),h=Math.sin(s);return this.set(r*u,r*h,-r*(u*n+h*o)+n+t,-a*h,a*u,-a*(-h*n+u*o)+o+i,0,0,1),this}scale(t,i){return this.premultiply(oo.makeScale(t,i)),this}rotate(t){return this.premultiply(oo.makeRotation(-t)),this}translate(t,i){return this.premultiply(oo.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){let i=this.elements,r=t.elements;for(let a=0;a<9;a++)if(i[a]!==r[a])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){let r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}},oo=new ze;function kc(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function ws(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Bf(){let e=ws("canvas");return e.style.display="block",e}var wu={};function Es(e){e in wu||(wu[e]=!0,console.warn(e))}var bu=new ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Bu=new ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Vs={[Ct]:{transfer:Nn,primaries:Iu,toReference:e=>e,fromReference:e=>e},[Ye]:{transfer:Fn,primaries:Iu,toReference:e=>e.convertSRGBToLinear(),fromReference:e=>e.convertLinearToSRGB()},[Xn]:{transfer:Nn,primaries:"p3",toReference:e=>e.applyMatrix3(Bu),fromReference:e=>e.applyMatrix3(bu)},[zl]:{transfer:Fn,primaries:"p3",toReference:e=>e.convertSRGBToLinear().applyMatrix3(Bu),fromReference:e=>e.applyMatrix3(bu).convertLinearToSRGB()}},Rf=new Set([Ct,Xn]),Ke={enabled:!0,_workingColorSpace:Ct,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(e){if(!Rf.has(e))throw Error(`Unsupported working color space, "${e}".`);this._workingColorSpace=e},convert:function(e,t,i){if(this.enabled===!1||t===i||!t||!i)return e;let r=Vs[t].toReference,a=Vs[i].fromReference;return a(r(e))},fromWorkingColorSpace:function(e,t){return this.convert(e,this._workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this._workingColorSpace)},getPrimaries:function(e){return Vs[e].primaries},getTransfer:function(e){return e===""?Nn:Vs[e].transfer}};function Na(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function lo(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var ra,Gc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ra===void 0&&(ra=ws("canvas")),ra.width=e.width,ra.height=e.height;let i=ra.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ra}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ws("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=Na(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Na(t[i]/255)*255):t[i]=Na(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Pf=0,Hc=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Di(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,n=r.length;s<n;s++)r[s].isDataTexture?a.push(uo(r[s].image)):a.push(uo(r[s]))}else a=uo(r);i.url=a}return t||(e.images[this.uuid]=i),i}};function uo(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Gc.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Lf=0,Dt=class Tn extends ta{constructor(t=Tn.DEFAULT_IMAGE,i=Tn.DEFAULT_MAPPING,r=Li,a=Li,s=qe,n=$a,o=mt,u=Gt,h=Tn.DEFAULT_ANISOTROPY,d=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=Di(),this.name="",this.source=new Hc(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=s,this.minFilter=n,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=u,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(Es("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===3001?Ye:""),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==300)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case yi:t.x-=Math.floor(t.x);break;case Li:t.x=t.x<0?0:1;break;case Dn:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x-=Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case yi:t.y-=Math.floor(t.y);break;case Li:t.y=t.y<0?0:1;break;case Dn:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y-=Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Es("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace==="srgb"?Nc:Uc}set encoding(t){Es("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===3001?Ye:""}};Dt.DEFAULT_IMAGE=null,Dt.DEFAULT_MAPPING=300,Dt.DEFAULT_ANISOTROPY=1;var et=class zc{constructor(t=0,i=0,r=0,a=1){zc.prototype.isVector4=!0,this.x=t,this.y=i,this.z=r,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,a){return this.x=t,this.y=i,this.z=r,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w===void 0?1:t.w,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let i=this.x,r=this.y,a=this.z,s=this.w,n=t.elements;return this.x=n[0]*i+n[4]*r+n[8]*a+n[12]*s,this.y=n[1]*i+n[5]*r+n[9]*a+n[13]*s,this.z=n[2]*i+n[6]*r+n[10]*a+n[14]*s,this.w=n[3]*i+n[7]*r+n[11]*a+n[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,a,s,n=.01,o=.1,u=t.elements,h=u[0],d=u[4],l=u[8],c=u[1],p=u[5],f=u[9],m=u[2],g=u[6],A=u[10];if(Math.abs(d-c)<n&&Math.abs(l-m)<n&&Math.abs(f-g)<n){if(Math.abs(d+c)<o&&Math.abs(l+m)<o&&Math.abs(f+g)<o&&Math.abs(h+p+A-3)<o)return this.set(1,0,0,0),this;i=Math.PI;let v=(h+1)/2,x=(p+1)/2,C=(A+1)/2,y=(d+c)/4,T=(l+m)/4,b=(f+g)/4;return v>x&&v>C?v<n?(r=0,a=.707106781,s=.707106781):(r=Math.sqrt(v),a=y/r,s=T/r):x>C?x<n?(r=.707106781,a=0,s=.707106781):(a=Math.sqrt(x),r=y/a,s=b/a):C<n?(r=.707106781,a=.707106781,s=0):(s=Math.sqrt(C),r=T/s,a=b/s),this.set(r,a,s,i),this}let _=Math.sqrt((g-f)*(g-f)+(l-m)*(l-m)+(c-d)*(c-d));return Math.abs(_)<.001&&(_=1),this.x=(g-f)/_,this.y=(l-m)/_,this.z=(c-d)/_,this.w=Math.acos((h+p+A-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this.z=Math.max(t.z,Math.min(i.z,this.z)),this.w=Math.max(t.w,Math.min(i.w,this.w)),this}clampScalar(t,i){return this.x=Math.max(t,Math.min(i,this.x)),this.y=Math.max(t,Math.min(i,this.y)),this.z=Math.max(t,Math.min(i,this.z)),this.w=Math.max(t,Math.min(i,this.w)),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(t,Math.min(i,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Df=class extends ta{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);let r={width:e,height:t,depth:1};i.encoding!==void 0&&(Es("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===3001?Ye:""),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qe,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Dt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Hc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},jt=class extends Df{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Vc=class extends Dt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=si,this.minFilter=si,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Wc=class extends Dt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=si,this.minFilter=si,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},_t=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,n){let o=i[r+0],u=i[r+1],h=i[r+2],d=i[r+3],l=a[s+0],c=a[s+1],p=a[s+2],f=a[s+3];if(n===0){e[t+0]=o,e[t+1]=u,e[t+2]=h,e[t+3]=d;return}if(n===1){e[t+0]=l,e[t+1]=c,e[t+2]=p,e[t+3]=f;return}if(d!==f||o!==l||u!==c||h!==p){let m=1-n,g=o*l+u*c+h*p+d*f,A=g>=0?1:-1,_=1-g*g;if(_>2**-52){let x=Math.sqrt(_),C=Math.atan2(x,g*A);m=Math.sin(m*C)/x,n=Math.sin(n*C)/x}let v=n*A;if(o=o*m+l*v,u=u*m+c*v,h=h*m+p*v,d=d*m+f*v,m===1-n){let x=1/Math.sqrt(o*o+u*u+h*h+d*d);o*=x,u*=x,h*=x,d*=x}}e[t]=o,e[t+1]=u,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,a,s){let n=i[r],o=i[r+1],u=i[r+2],h=i[r+3],d=a[s],l=a[s+1],c=a[s+2],p=a[s+3];return e[t]=n*p+h*d+o*c-u*l,e[t+1]=o*p+h*l+u*d-n*c,e[t+2]=u*p+h*c+n*l-o*d,e[t+3]=h*p-n*d-o*l-u*c,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,a=e._z,s=e._order,n=Math.cos,o=Math.sin,u=n(i/2),h=n(r/2),d=n(a/2),l=o(i/2),c=o(r/2),p=o(a/2);switch(s){case"XYZ":this._x=l*h*d+u*c*p,this._y=u*c*d-l*h*p,this._z=u*h*p+l*c*d,this._w=u*h*d-l*c*p;break;case"YXZ":this._x=l*h*d+u*c*p,this._y=u*c*d-l*h*p,this._z=u*h*p-l*c*d,this._w=u*h*d+l*c*p;break;case"ZXY":this._x=l*h*d-u*c*p,this._y=u*c*d+l*h*p,this._z=u*h*p+l*c*d,this._w=u*h*d-l*c*p;break;case"ZYX":this._x=l*h*d-u*c*p,this._y=u*c*d+l*h*p,this._z=u*h*p-l*c*d,this._w=u*h*d+l*c*p;break;case"YZX":this._x=l*h*d+u*c*p,this._y=u*c*d+l*h*p,this._z=u*h*p-l*c*d,this._w=u*h*d-l*c*p;break;case"XZY":this._x=l*h*d-u*c*p,this._y=u*c*d-l*h*p,this._z=u*h*p+l*c*d,this._w=u*h*d+l*c*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],n=t[5],o=t[9],u=t[2],h=t[6],d=t[10],l=i+n+d;if(l>0){let c=.5/Math.sqrt(l+1);this._w=.25/c,this._x=(h-o)*c,this._y=(a-u)*c,this._z=(s-r)*c}else if(i>n&&i>d){let c=2*Math.sqrt(1+i-n-d);this._w=(h-o)/c,this._x=.25*c,this._y=(r+s)/c,this._z=(a+u)/c}else if(n>d){let c=2*Math.sqrt(1+n-i-d);this._w=(a-u)/c,this._x=(r+s)/c,this._y=.25*c,this._z=(o+h)/c}else{let c=2*Math.sqrt(1+d-i-n);this._w=(s-r)/c,this._x=(a+u)/c,this._y=(o+h)/c,this._z=.25*c}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<2**-52?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ht(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,n=t._x,o=t._y,u=t._z,h=t._w;return this._x=i*h+s*n+r*u-a*o,this._y=r*h+s*o+a*n-i*u,this._z=a*h+s*u+i*o-r*n,this._w=s*h-i*n-r*o-a*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,a=this._z,s=this._w,n=s*e._w+i*e._x+r*e._y+a*e._z;if(n<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,n=-n):this.copy(e),n>=1)return this._w=s,this._x=i,this._y=r,this._z=a,this;let o=1-n*n;if(o<=2**-52){let c=1-t;return this._w=c*s+t*this._w,this._x=c*i+t*this._x,this._y=c*r+t*this._y,this._z=c*a+t*this._z,this.normalize(),this}let u=Math.sqrt(o),h=Math.atan2(u,n),d=Math.sin((1-t)*h)/u,l=Math.sin(t*h)/u;return this._w=s*d+this._w*l,this._x=i*d+this._x*l,this._y=r*d+this._y*l,this._z=a*d+this._z*l,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),a=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(a),i*Math.cos(a),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class qc{constructor(t=0,i=0,r=0){qc.prototype.isVector3=!0,this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(Ru.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(Ru.setFromAxisAngle(t,i))}applyMatrix3(t){let i=this.x,r=this.y,a=this.z,s=t.elements;return this.x=s[0]*i+s[3]*r+s[6]*a,this.y=s[1]*i+s[4]*r+s[7]*a,this.z=s[2]*i+s[5]*r+s[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let i=this.x,r=this.y,a=this.z,s=t.elements,n=1/(s[3]*i+s[7]*r+s[11]*a+s[15]);return this.x=(s[0]*i+s[4]*r+s[8]*a+s[12])*n,this.y=(s[1]*i+s[5]*r+s[9]*a+s[13])*n,this.z=(s[2]*i+s[6]*r+s[10]*a+s[14])*n,this}applyQuaternion(t){let i=this.x,r=this.y,a=this.z,s=t.x,n=t.y,o=t.z,u=t.w,h=2*(n*a-o*r),d=2*(o*i-s*a),l=2*(s*r-n*i);return this.x=i+u*h+n*l-o*d,this.y=r+u*d+o*h-s*l,this.z=a+u*l+s*d-n*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let i=this.x,r=this.y,a=this.z,s=t.elements;return this.x=s[0]*i+s[4]*r+s[8]*a,this.y=s[1]*i+s[5]*r+s[9]*a,this.z=s[2]*i+s[6]*r+s[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this.z=Math.max(t.z,Math.min(i.z,this.z)),this}clampScalar(t,i){return this.x=Math.max(t,Math.min(i,this.x)),this.y=Math.max(t,Math.min(i,this.y)),this.z=Math.max(t,Math.min(i,this.z)),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(t,Math.min(i,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){let r=t.x,a=t.y,s=t.z,n=i.x,o=i.y,u=i.z;return this.x=a*u-s*o,this.y=s*n-r*u,this.z=r*o-a*n,this}projectOnVector(t){let i=t.lengthSq();if(i===0)return this.set(0,0,0);let r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return ho.copy(this).projectOnVector(t),this.sub(ho)}reflect(t){return this.sub(ho.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(t)/i;return Math.acos(Ht(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let i=this.x-t.x,r=this.y-t.y,a=this.z-t.z;return i*i+r*r+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){let a=Math.sin(i)*t;return this.x=a*Math.sin(r),this.y=Math.cos(i)*t,this.z=a*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){let i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){let i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=a,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,i=Math.random()*Math.PI*2,r=Math.sqrt(1-t**2);return this.x=r*Math.cos(i),this.y=r*Math.sin(i),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ho=new P,Ru=new _t,Ui=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,n=a.count;s<n;s++)e.isMesh===!0?e.getVertexPosition(s,Ti):Ti.fromBufferAttribute(a,s),Ti.applyMatrix4(e.matrixWorld),this.expandByPoint(Ti);else e.boundingBox===void 0?(i.boundingBox===null&&i.computeBoundingBox(),Ws.copy(i.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Ws.copy(e.boundingBox)),Ws.applyMatrix4(e.matrixWorld),this.union(Ws)}let r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ti),Ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(is),qs.subVectors(this.max,is),aa.subVectors(e.a,is),sa.subVectors(e.b,is),na.subVectors(e.c,is),hr.subVectors(sa,aa),cr.subVectors(na,sa),Lr.subVectors(aa,na);let t=[0,-hr.z,hr.y,0,-cr.z,cr.y,0,-Lr.z,Lr.y,hr.z,0,-hr.x,cr.z,0,-cr.x,Lr.z,0,-Lr.x,-hr.y,hr.x,0,-cr.y,cr.x,0,-Lr.y,Lr.x,0];return!co(t,aa,sa,na,qs)||(t=[1,0,0,0,1,0,0,0,1],!co(t,aa,sa,na,qs))?!1:(Xs.crossVectors(hr,cr),t=[Xs.x,Xs.y,Xs.z],co(t,aa,sa,na,qs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ji[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ji[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ji[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ji[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ji[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ji[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ji[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ji[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ji),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},ji=[new P,new P,new P,new P,new P,new P,new P,new P],Ti=new P,Ws=new Ui,aa=new P,sa=new P,na=new P,hr=new P,cr=new P,Lr=new P,is=new P,qs=new P,Xs=new P,Dr=new P;function co(e,t,i,r,a){for(let s=0,n=e.length-3;s<=n;s+=3){Dr.fromArray(e,s);let o=a.x*Math.abs(Dr.x)+a.y*Math.abs(Dr.y)+a.z*Math.abs(Dr.z),u=t.dot(Dr),h=i.dot(Dr),d=r.dot(Dr);if(Math.max(-Math.max(u,h,d),Math.min(u,h,d))>o)return!1}return!0}var Uf=new Ui,rs=new P,po=new P,qi=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t===void 0?Uf.setFromPoints(e).getCenter(i):i.copy(t);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rs.subVectors(e,this.center);let t=rs.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(rs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rs.copy(e.center).add(po)),this.expandByPoint(rs.copy(e.center).sub(po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ki=new P,fo=new P,Ys=new P,dr=new P,Ao=new P,js=new P,mo=new P,Yn=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ki)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ki.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ki.copy(this.origin).addScaledVector(this.direction,t),Ki.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){fo.copy(e).add(t).multiplyScalar(.5),Ys.copy(t).sub(e).normalize(),dr.copy(this.origin).sub(fo);let a=e.distanceTo(t)*.5,s=-this.direction.dot(Ys),n=dr.dot(this.direction),o=-dr.dot(Ys),u=dr.lengthSq(),h=Math.abs(1-s*s),d,l,c,p;if(h>0)if(d=s*o-n,l=s*n-o,p=a*h,d>=0)if(l>=-p)if(l<=p){let f=1/h;d*=f,l*=f,c=d*(d+s*l+2*n)+l*(s*d+l+2*o)+u}else l=a,d=Math.max(0,-(s*l+n)),c=-d*d+l*(l+2*o)+u;else l=-a,d=Math.max(0,-(s*l+n)),c=-d*d+l*(l+2*o)+u;else l<=-p?(d=Math.max(0,-(-s*a+n)),l=d>0?-a:Math.min(Math.max(-a,-o),a),c=-d*d+l*(l+2*o)+u):l<=p?(d=0,l=Math.min(Math.max(-a,-o),a),c=l*(l+2*o)+u):(d=Math.max(0,-(s*a+n)),l=d>0?a:Math.min(Math.max(-a,-o),a),c=-d*d+l*(l+2*o)+u);else l=s>0?-a:a,d=Math.max(0,-(s*l+n)),c=-d*d+l*(l+2*o)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(fo).addScaledVector(Ys,l),c}intersectSphere(e,t){Ki.subVectors(e.center,this.origin);let i=Ki.dot(this.direction),r=Ki.dot(Ki)-i*i,a=e.radius*e.radius;if(r>a)return null;let s=Math.sqrt(a-r),n=i-s,o=i+s;return o<0?null:n<0?this.at(o,t):this.at(n,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,n,o,u=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,l=this.origin;return u>=0?(i=(e.min.x-l.x)*u,r=(e.max.x-l.x)*u):(i=(e.max.x-l.x)*u,r=(e.min.x-l.x)*u),h>=0?(a=(e.min.y-l.y)*h,s=(e.max.y-l.y)*h):(a=(e.max.y-l.y)*h,s=(e.min.y-l.y)*h),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),d>=0?(n=(e.min.z-l.z)*d,o=(e.max.z-l.z)*d):(n=(e.max.z-l.z)*d,o=(e.min.z-l.z)*d),i>o||n>r)||((n>i||i!==i)&&(i=n),(o<r||r!==r)&&(r=o),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ki)!==null}intersectTriangle(e,t,i,r,a){Ao.subVectors(t,e),js.subVectors(i,e),mo.crossVectors(Ao,js);let s=this.direction.dot(mo),n;if(s>0){if(r)return null;n=1}else if(s<0)n=-1,s=-s;else return null;dr.subVectors(this.origin,e);let o=n*this.direction.dot(js.crossVectors(dr,js));if(o<0)return null;let u=n*this.direction.dot(Ao.cross(dr));if(u<0||o+u>s)return null;let h=-n*dr.dot(mo);return h<0?null:this.at(h/s,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ke=class cl{constructor(t,i,r,a,s,n,o,u,h,d,l,c,p,f,m,g){cl.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,a,s,n,o,u,h,d,l,c,p,f,m,g)}set(t,i,r,a,s,n,o,u,h,d,l,c,p,f,m,g){let A=this.elements;return A[0]=t,A[4]=i,A[8]=r,A[12]=a,A[1]=s,A[5]=n,A[9]=o,A[13]=u,A[2]=h,A[6]=d,A[10]=l,A[14]=c,A[3]=p,A[7]=f,A[11]=m,A[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new cl().fromArray(this.elements)}copy(t){let i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){let i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){let i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){let i=this.elements,r=t.elements,a=1/oa.setFromMatrixColumn(t,0).length(),s=1/oa.setFromMatrixColumn(t,1).length(),n=1/oa.setFromMatrixColumn(t,2).length();return i[0]=r[0]*a,i[1]=r[1]*a,i[2]=r[2]*a,i[3]=0,i[4]=r[4]*s,i[5]=r[5]*s,i[6]=r[6]*s,i[7]=0,i[8]=r[8]*n,i[9]=r[9]*n,i[10]=r[10]*n,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){let i=this.elements,r=t.x,a=t.y,s=t.z,n=Math.cos(r),o=Math.sin(r),u=Math.cos(a),h=Math.sin(a),d=Math.cos(s),l=Math.sin(s);if(t.order==="XYZ"){let c=n*d,p=n*l,f=o*d,m=o*l;i[0]=u*d,i[4]=-u*l,i[8]=h,i[1]=p+f*h,i[5]=c-m*h,i[9]=-o*u,i[2]=m-c*h,i[6]=f+p*h,i[10]=n*u}else if(t.order==="YXZ"){let c=u*d,p=u*l,f=h*d,m=h*l;i[0]=c+m*o,i[4]=f*o-p,i[8]=n*h,i[1]=n*l,i[5]=n*d,i[9]=-o,i[2]=p*o-f,i[6]=m+c*o,i[10]=n*u}else if(t.order==="ZXY"){let c=u*d,p=u*l,f=h*d,m=h*l;i[0]=c-m*o,i[4]=-n*l,i[8]=f+p*o,i[1]=p+f*o,i[5]=n*d,i[9]=m-c*o,i[2]=-n*h,i[6]=o,i[10]=n*u}else if(t.order==="ZYX"){let c=n*d,p=n*l,f=o*d,m=o*l;i[0]=u*d,i[4]=f*h-p,i[8]=c*h+m,i[1]=u*l,i[5]=m*h+c,i[9]=p*h-f,i[2]=-h,i[6]=o*u,i[10]=n*u}else if(t.order==="YZX"){let c=n*u,p=n*h,f=o*u,m=o*h;i[0]=u*d,i[4]=m-c*l,i[8]=f*l+p,i[1]=l,i[5]=n*d,i[9]=-o*d,i[2]=-h*d,i[6]=p*l+f,i[10]=c-m*l}else if(t.order==="XZY"){let c=n*u,p=n*h,f=o*u,m=o*h;i[0]=u*d,i[4]=-l,i[8]=h*d,i[1]=c*l+m,i[5]=n*d,i[9]=p*l-f,i[2]=f*l-p,i[6]=o*d,i[10]=m*l+c}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Nf,t,Ff)}lookAt(t,i,r){let a=this.elements;return oi.subVectors(t,i),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),pr.crossVectors(r,oi),pr.lengthSq()===0&&(Math.abs(r.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),pr.crossVectors(r,oi)),pr.normalize(),Ks.crossVectors(oi,pr),a[0]=pr.x,a[4]=Ks.x,a[8]=oi.x,a[1]=pr.y,a[5]=Ks.y,a[9]=oi.y,a[2]=pr.z,a[6]=Ks.z,a[10]=oi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){let r=t.elements,a=i.elements,s=this.elements,n=r[0],o=r[4],u=r[8],h=r[12],d=r[1],l=r[5],c=r[9],p=r[13],f=r[2],m=r[6],g=r[10],A=r[14],_=r[3],v=r[7],x=r[11],C=r[15],y=a[0],T=a[4],b=a[8],E=a[12],I=a[1],B=a[5],G=a[9],X=a[13],R=a[2],D=a[6],N=a[10],z=a[14],Y=a[3],W=a[7],J=a[11],K=a[15];return s[0]=n*y+o*I+u*R+h*Y,s[4]=n*T+o*B+u*D+h*W,s[8]=n*b+o*G+u*N+h*J,s[12]=n*E+o*X+u*z+h*K,s[1]=d*y+l*I+c*R+p*Y,s[5]=d*T+l*B+c*D+p*W,s[9]=d*b+l*G+c*N+p*J,s[13]=d*E+l*X+c*z+p*K,s[2]=f*y+m*I+g*R+A*Y,s[6]=f*T+m*B+g*D+A*W,s[10]=f*b+m*G+g*N+A*J,s[14]=f*E+m*X+g*z+A*K,s[3]=_*y+v*I+x*R+C*Y,s[7]=_*T+v*B+x*D+C*W,s[11]=_*b+v*G+x*N+C*J,s[15]=_*E+v*X+x*z+C*K,this}multiplyScalar(t){let i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){let t=this.elements,i=t[0],r=t[4],a=t[8],s=t[12],n=t[1],o=t[5],u=t[9],h=t[13],d=t[2],l=t[6],c=t[10],p=t[14],f=t[3],m=t[7],g=t[11],A=t[15];return f*(+s*u*l-a*h*l-s*o*c+r*h*c+a*o*p-r*u*p)+m*(+i*u*p-i*h*c+s*n*c-a*n*p+a*h*d-s*u*d)+g*(+i*h*l-i*o*p-s*n*l+r*n*p+s*o*d-r*h*d)+A*(-a*o*d-i*u*l+i*o*c+a*n*l-r*n*c+r*u*d)}transpose(){let t=this.elements,i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){let a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=i,a[14]=r),this}invert(){let t=this.elements,i=t[0],r=t[1],a=t[2],s=t[3],n=t[4],o=t[5],u=t[6],h=t[7],d=t[8],l=t[9],c=t[10],p=t[11],f=t[12],m=t[13],g=t[14],A=t[15],_=l*g*h-m*c*h+m*u*p-o*g*p-l*u*A+o*c*A,v=f*c*h-d*g*h-f*u*p+n*g*p+d*u*A-n*c*A,x=d*m*h-f*l*h+f*o*p-n*m*p-d*o*A+n*l*A,C=f*l*u-d*m*u-f*o*c+n*m*c+d*o*g-n*l*g,y=i*_+r*v+a*x+s*C;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/y;return t[0]=_*T,t[1]=(m*c*s-l*g*s-m*a*p+r*g*p+l*a*A-r*c*A)*T,t[2]=(o*g*s-m*u*s+m*a*h-r*g*h-o*a*A+r*u*A)*T,t[3]=(l*u*s-o*c*s-l*a*h+r*c*h+o*a*p-r*u*p)*T,t[4]=v*T,t[5]=(d*g*s-f*c*s+f*a*p-i*g*p-d*a*A+i*c*A)*T,t[6]=(f*u*s-n*g*s-f*a*h+i*g*h+n*a*A-i*u*A)*T,t[7]=(n*c*s-d*u*s+d*a*h-i*c*h-n*a*p+i*u*p)*T,t[8]=x*T,t[9]=(f*l*s-d*m*s-f*r*p+i*m*p+d*r*A-i*l*A)*T,t[10]=(n*m*s-f*o*s+f*r*h-i*m*h-n*r*A+i*o*A)*T,t[11]=(d*o*s-n*l*s-d*r*h+i*l*h+n*r*p-i*o*p)*T,t[12]=C*T,t[13]=(d*m*a-f*l*a+f*r*c-i*m*c-d*r*g+i*l*g)*T,t[14]=(f*o*a-n*m*a-f*r*u+i*m*u+n*r*g-i*o*g)*T,t[15]=(n*l*a-d*o*a+d*r*u-i*l*u-n*r*c+i*o*c)*T,this}scale(t){let i=this.elements,r=t.x,a=t.y,s=t.z;return i[0]*=r,i[4]*=a,i[8]*=s,i[1]*=r,i[5]*=a,i[9]*=s,i[2]*=r,i[6]*=a,i[10]*=s,i[3]*=r,i[7]*=a,i[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,a))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){let i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){let r=Math.cos(i),a=Math.sin(i),s=1-r,n=t.x,o=t.y,u=t.z,h=s*n,d=s*o;return this.set(h*n+r,h*o-a*u,h*u+a*o,0,h*o+a*u,d*o+r,d*u-a*n,0,h*u-a*o,d*u+a*n,s*u*u+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,a,s,n){return this.set(1,r,s,0,t,1,n,0,i,a,1,0,0,0,0,1),this}compose(t,i,r){let a=this.elements,s=i._x,n=i._y,o=i._z,u=i._w,h=s+s,d=n+n,l=o+o,c=s*h,p=s*d,f=s*l,m=n*d,g=n*l,A=o*l,_=u*h,v=u*d,x=u*l,C=r.x,y=r.y,T=r.z;return a[0]=(1-(m+A))*C,a[1]=(p+x)*C,a[2]=(f-v)*C,a[3]=0,a[4]=(p-x)*y,a[5]=(1-(c+A))*y,a[6]=(g+_)*y,a[7]=0,a[8]=(f+v)*T,a[9]=(g-_)*T,a[10]=(1-(c+m))*T,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,i,r){let a=this.elements,s=oa.set(a[0],a[1],a[2]).length(),n=oa.set(a[4],a[5],a[6]).length(),o=oa.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),t.x=a[12],t.y=a[13],t.z=a[14],wi.copy(this);let u=1/s,h=1/n,d=1/o;return wi.elements[0]*=u,wi.elements[1]*=u,wi.elements[2]*=u,wi.elements[4]*=h,wi.elements[5]*=h,wi.elements[6]*=h,wi.elements[8]*=d,wi.elements[9]*=d,wi.elements[10]*=d,i.setFromRotationMatrix(wi),r.x=s,r.y=n,r.z=o,this}makePerspective(t,i,r,a,s,n,o=Ts){let u=this.elements,h=2*s/(i-t),d=2*s/(r-a),l=(i+t)/(i-t),c=(r+a)/(r-a),p,f;if(o===2e3)p=-(n+s)/(n-s),f=-2*n*s/(n-s);else if(o===2001)p=-n/(n-s),f=-n*s/(n-s);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return u[0]=h,u[4]=0,u[8]=l,u[12]=0,u[1]=0,u[5]=d,u[9]=c,u[13]=0,u[2]=0,u[6]=0,u[10]=p,u[14]=f,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(t,i,r,a,s,n,o=Ts){let u=this.elements,h=1/(i-t),d=1/(r-a),l=1/(n-s),c=(i+t)*h,p=(r+a)*d,f,m;if(o===2e3)f=(n+s)*l,m=-2*l;else if(o===2001)f=s*l,m=-1*l;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return u[0]=2*h,u[4]=0,u[8]=0,u[12]=-c,u[1]=0,u[5]=2*d,u[9]=0,u[13]=-p,u[2]=0,u[6]=0,u[10]=m,u[14]=-f,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(t){let i=this.elements,r=t.elements;for(let a=0;a<16;a++)if(i[a]!==r[a])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){let r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}},oa=new P,wi=new ke,Nf=new P(0,0,0),Ff=new P(1,1,1),pr=new P,Ks=new P,oi=new P,Pu=new ke,Lu=new _t,ea=class Xc{constructor(t=0,i=0,r=0,a=Xc.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,a=this._order){return this._x=t,this._y=i,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let a=t.elements,s=a[0],n=a[4],o=a[8],u=a[1],h=a[5],d=a[9],l=a[2],c=a[6],p=a[10];switch(i){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-n,s)):(this._x=Math.atan2(c,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(u,h)):(this._y=Math.atan2(-l,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-l,p),this._z=Math.atan2(-n,h)):(this._y=0,this._z=Math.atan2(u,s));break;case"ZYX":this._y=Math.asin(-Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(c,p),this._z=Math.atan2(u,s)):(this._x=0,this._z=Math.atan2(-n,h));break;case"YZX":this._z=Math.asin(Ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-d,h),this._y=Math.atan2(-l,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ht(n,-1,1)),Math.abs(n)<.9999999?(this._x=Math.atan2(c,h),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return Pu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Pu,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Lu.setFromEuler(this),this.setFromQuaternion(Lu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ea.DEFAULT_ORDER="XYZ";var Yc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},Qf=0,Du=new P,la=new _t,Ji=new ke,Js=new P,as=new P,Of=new P,kf=new _t,Uu=new P(1,0,0),Nu=new P(0,1,0),Fu=new P(0,0,1),Gf={type:"added"},Hf={type:"removed"},wt=class wn extends ta{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wn.DEFAULT_UP.clone();let t=new P,i=new ea,r=new _t,a=new P(1,1,1);function s(){r.setFromEuler(i,!1)}function n(){i.setFromQuaternion(r,void 0,!1)}i._onChange(s),r._onChange(n),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new ke},normalMatrix:{value:new ze}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return la.setFromAxisAngle(t,i),this.quaternion.multiply(la),this}rotateOnWorldAxis(t,i){return la.setFromAxisAngle(t,i),this.quaternion.premultiply(la),this}rotateX(t){return this.rotateOnAxis(Uu,t)}rotateY(t){return this.rotateOnAxis(Nu,t)}rotateZ(t){return this.rotateOnAxis(Fu,t)}translateOnAxis(t,i){return Du.copy(t).applyQuaternion(this.quaternion),this.position.add(Du.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Uu,t)}translateY(t){return this.translateOnAxis(Nu,t)}translateZ(t){return this.translateOnAxis(Fu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ji.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Js.copy(t):Js.set(t,i,r);let a=this.parent;this.updateWorldMatrix(!0,!1),as.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ji.lookAt(as,Js,this.up):Ji.lookAt(Js,as,this.up),this.quaternion.setFromRotationMatrix(Ji),a&&(Ji.extractRotation(a.matrixWorld),la.setFromRotationMatrix(Ji),this.quaternion.premultiply(la.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Gf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(Hf)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ji.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ji.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ji),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,a=this.children.length;r<a;r++){let s=this.children[r].getObjectByProperty(t,i);if(s!==void 0)return s}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let a=this.children;for(let s=0,n=a.length;s<n;s++)a[s].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,t,Of),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,kf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,a=i.length;r<a;r++){let s=i[r];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),i===!0){let a=this.children;for(let s=0,n=a.length;s<n;s++){let o=a[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxGeometryCount=this._maxGeometryCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function s(o,u){return o[u.uuid]===void 0&&(o[u.uuid]=u.toJSON(t)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let u=o.shapes;if(Array.isArray(u))for(let h=0,d=u.length;h<d;h++){let l=u[h];s(t.shapes,l)}else s(t.shapes,u)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let u=0,h=this.material.length;u<h;u++)o.push(s(t.materials,this.material[u]));a.material=o}else a.material=s(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){let u=this.animations[o];a.animations.push(s(t.animations,u))}}if(i){let o=n(t.geometries),u=n(t.materials),h=n(t.textures),d=n(t.images),l=n(t.shapes),c=n(t.skeletons),p=n(t.animations),f=n(t.nodes);o.length>0&&(r.geometries=o),u.length>0&&(r.materials=u),h.length>0&&(r.textures=h),d.length>0&&(r.images=d),l.length>0&&(r.shapes=l),c.length>0&&(r.skeletons=c),p.length>0&&(r.animations=p),f.length>0&&(r.nodes=f)}return r.object=a,r;function n(o){let u=[];for(let h in o){let d=o[h];delete d.metadata,u.push(d)}return u}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let a=t.children[r];this.add(a.clone())}return this}};wt.DEFAULT_UP=new P(0,1,0),wt.DEFAULT_MATRIX_AUTO_UPDATE=!0,wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bi=new P,Zi=new P,go=new P,$i=new P,ua=new P,ha=new P,Qu=new P,_o=new P,vo=new P,xo=new P,Zs=!1,$s=class Gr{constructor(t=new P,i=new P,r=new P){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,a){a.subVectors(r,i),bi.subVectors(t,i),a.cross(bi);let s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(t,i,r,a,s){bi.subVectors(a,i),Zi.subVectors(r,i),go.subVectors(t,i);let n=bi.dot(bi),o=bi.dot(Zi),u=bi.dot(go),h=Zi.dot(Zi),d=Zi.dot(go),l=n*h-o*o;if(l===0)return s.set(0,0,0),null;let c=1/l,p=(h*u-o*d)*c,f=(n*d-o*u)*c;return s.set(1-p-f,f,p)}static containsPoint(t,i,r,a){return this.getBarycoord(t,i,r,a,$i)===null?!1:$i.x>=0&&$i.y>=0&&$i.x+$i.y<=1}static getUV(t,i,r,a,s,n,o,u){return Zs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Zs=!0),this.getInterpolation(t,i,r,a,s,n,o,u)}static getInterpolation(t,i,r,a,s,n,o,u){return this.getBarycoord(t,i,r,a,$i)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(s,$i.x),u.addScaledVector(n,$i.y),u.addScaledVector(o,$i.z),u)}static isFrontFacing(t,i,r,a){return bi.subVectors(r,i),Zi.subVectors(t,i),bi.cross(Zi).dot(a)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,a){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,i,r,a){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return bi.subVectors(this.c,this.b),Zi.subVectors(this.a,this.b),bi.cross(Zi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Gr.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Gr.getBarycoord(t,this.a,this.b,this.c,i)}getUV(t,i,r,a,s){return Zs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Zs=!0),Gr.getInterpolation(t,this.a,this.b,this.c,i,r,a,s)}getInterpolation(t,i,r,a,s){return Gr.getInterpolation(t,this.a,this.b,this.c,i,r,a,s)}containsPoint(t){return Gr.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Gr.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){let r=this.a,a=this.b,s=this.c,n,o;ua.subVectors(a,r),ha.subVectors(s,r),_o.subVectors(t,r);let u=ua.dot(_o),h=ha.dot(_o);if(u<=0&&h<=0)return i.copy(r);vo.subVectors(t,a);let d=ua.dot(vo),l=ha.dot(vo);if(d>=0&&l<=d)return i.copy(a);let c=u*l-d*h;if(c<=0&&u>=0&&d<=0)return n=u/(u-d),i.copy(r).addScaledVector(ua,n);xo.subVectors(t,s);let p=ua.dot(xo),f=ha.dot(xo);if(f>=0&&p<=f)return i.copy(s);let m=p*h-u*f;if(m<=0&&h>=0&&f<=0)return o=h/(h-f),i.copy(r).addScaledVector(ha,o);let g=d*f-p*l;if(g<=0&&l-d>=0&&p-f>=0)return Qu.subVectors(s,a),o=(l-d)/(l-d+(p-f)),i.copy(a).addScaledVector(Qu,o);let A=1/(g+m+c);return n=m*A,o=c*A,i.copy(r).addScaledVector(ua,n).addScaledVector(ha,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},jc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fr={h:0,s:0,l:0},en={h:0,s:0,l:0};function Eo(e,t,i){return i<0&&(i+=1),i>1&&--i,i<1/6?e+(t-e)*6*i:i<1/2?t:i<2/3?e+(t-e)*6*(2/3-i):e}var ye=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ye){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=Vl(e,1),t=Ht(t,0,1),i=Ht(i,0,1),t===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=Eo(s,a,e+1/3),this.g=Eo(s,a,e),this.b=Eo(s,a,e-1/3)}return Ke.toWorkingColorSpace(this,r),this}setStyle(e,t=Ye){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,s=r[1],n=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(n))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(n))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(n))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ye){let i=jc[e.toLowerCase()];return i===void 0?console.warn("THREE.Color: Unknown color "+e):this.setHex(i,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Na(e.r),this.g=Na(e.g),this.b=Na(e.b),this}copyLinearToSRGB(e){return this.r=lo(e.r),this.g=lo(e.g),this.b=lo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ye){return Ke.fromWorkingColorSpace(Ot.copy(this),e),Math.round(Ht(Ot.r*255,0,255))*65536+Math.round(Ht(Ot.g*255,0,255))*256+Math.round(Ht(Ot.b*255,0,255))}getHexString(e=Ye){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Ot.copy(this),t);let i=Ot.r,r=Ot.g,a=Ot.b,s=Math.max(i,r,a),n=Math.min(i,r,a),o,u,h=(n+s)/2;if(n===s)o=0,u=0;else{let d=s-n;switch(u=h<=.5?d/(s+n):d/(2-s-n),s){case i:o=(r-a)/d+(r<a?6:0);break;case r:o=(a-i)/d+2;break;case a:o=(i-r)/d+4;break}o/=6}return e.h=o,e.s=u,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=Ye){Ke.fromWorkingColorSpace(Ot.copy(this),e);let t=Ot.r,i=Ot.g,r=Ot.b;return e==="srgb"?`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,i){return this.getHSL(fr),this.setHSL(fr.h+e,fr.s+t,fr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(fr),e.getHSL(en);let i=xs(fr.h,en.h,t),r=xs(fr.s,en.s,t),a=xs(fr.l,en.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ot=new ye;ye.NAMES=jc;var zf=0,zi=class extends ta{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Di(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ye(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=no,this.stencilZFail=no,this.stencilZPass=no,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==0&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==204&&(i.blendSrc=this.blendSrc),this.blendDst!==205&&(i.blendDst=this.blendDst),this.blendEquation!==100&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(i.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let s=[];for(let n in a){let o=a[n];delete o.metadata,s.push(o)}return s}if(t){let a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Si=class extends zi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Mt=new P,tn=new oe,ot=class{constructor(e,t,i=!1){if(Array.isArray(e))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=i,this.usage=Fc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Da,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix3(e),this.setXY(t,tn.x,tn.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Oi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=$e(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),r=$e(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),r=$e(r,this.array),a=$e(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},Kc=class extends ot{constructor(e,t,i){super(new Uint16Array(e),t,i)}},Jc=class extends ot{constructor(e,t,i){super(new Uint32Array(e),t,i)}},ei=class extends ot{constructor(e,t,i){super(new Float32Array(e),t,i)}},Vf=0,vi=new ke,yo=new wt,ca=new P,li=new Ui,ss=new Ui,Rt=new P,ni=class Zc extends ta{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(kc(t)?Jc:Kc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){let i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);let r=this.attributes.normal;if(r!==void 0){let s=new ze().getNormalMatrix(t);r.applyNormalMatrix(s),r.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return vi.makeRotationFromQuaternion(t),this.applyMatrix4(vi),this}rotateX(t){return vi.makeRotationX(t),this.applyMatrix4(vi),this}rotateY(t){return vi.makeRotationY(t),this.applyMatrix4(vi),this}rotateZ(t){return vi.makeRotationZ(t),this.applyMatrix4(vi),this}translate(t,i,r){return vi.makeTranslation(t,i,r),this.applyMatrix4(vi),this}scale(t,i,r){return vi.makeScale(t,i,r),this.applyMatrix4(vi),this}lookAt(t){return yo.lookAt(t),yo.updateMatrix(),this.applyMatrix4(yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ca).negate(),this.translate(ca.x,ca.y,ca.z),this}setFromPoints(t){let i=[];for(let r=0,a=t.length;r<a;r++){let s=t[r];i.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ei(i,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ui);let t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,a=i.length;r<a;r++){let s=i[r];li.setFromBufferAttribute(s),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qi);let t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(t){let r=this.boundingSphere.center;if(li.setFromBufferAttribute(t),i)for(let s=0,n=i.length;s<n;s++){let o=i[s];ss.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(li.min,ss.min),li.expandByPoint(Rt),Rt.addVectors(li.max,ss.max),li.expandByPoint(Rt)):(li.expandByPoint(ss.min),li.expandByPoint(ss.max))}li.getCenter(r);let a=0;for(let s=0,n=t.count;s<n;s++)Rt.fromBufferAttribute(t,s),a=Math.max(a,r.distanceToSquared(Rt));if(i)for(let s=0,n=i.length;s<n;s++){let o=i[s],u=this.morphTargetsRelative;for(let h=0,d=o.count;h<d;h++)Rt.fromBufferAttribute(o,h),u&&(ca.fromBufferAttribute(t,h),Rt.add(ca)),a=Math.max(a,r.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let r=t.array,a=i.position.array,s=i.normal.array,n=i.uv.array,o=a.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ot(new Float32Array(4*o),4));let u=this.getAttribute("tangent").array,h=[],d=[];for(let I=0;I<o;I++)h[I]=new P,d[I]=new P;let l=new P,c=new P,p=new P,f=new oe,m=new oe,g=new oe,A=new P,_=new P;function v(I,B,G){l.fromArray(a,I*3),c.fromArray(a,B*3),p.fromArray(a,G*3),f.fromArray(n,I*2),m.fromArray(n,B*2),g.fromArray(n,G*2),c.sub(l),p.sub(l),m.sub(f),g.sub(f);let X=1/(m.x*g.y-g.x*m.y);isFinite(X)&&(A.copy(c).multiplyScalar(g.y).addScaledVector(p,-m.y).multiplyScalar(X),_.copy(p).multiplyScalar(m.x).addScaledVector(c,-g.x).multiplyScalar(X),h[I].add(A),h[B].add(A),h[G].add(A),d[I].add(_),d[B].add(_),d[G].add(_))}let x=this.groups;x.length===0&&(x=[{start:0,count:r.length}]);for(let I=0,B=x.length;I<B;++I){let G=x[I],X=G.start,R=G.count;for(let D=X,N=X+R;D<N;D+=3)v(r[D+0],r[D+1],r[D+2])}let C=new P,y=new P,T=new P,b=new P;function E(I){T.fromArray(s,I*3),b.copy(T);let B=h[I];C.copy(B),C.sub(T.multiplyScalar(T.dot(B))).normalize(),y.crossVectors(b,B);let G=y.dot(d[I])<0?-1:1;u[I*4]=C.x,u[I*4+1]=C.y,u[I*4+2]=C.z,u[I*4+3]=G}for(let I=0,B=x.length;I<B;++I){let G=x[I],X=G.start,R=G.count;for(let D=X,N=X+R;D<N;D+=3)E(r[D+0]),E(r[D+1]),E(r[D+2])}}computeVertexNormals(){let t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new ot(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let c=0,p=r.count;c<p;c++)r.setXYZ(c,0,0,0);let a=new P,s=new P,n=new P,o=new P,u=new P,h=new P,d=new P,l=new P;if(t)for(let c=0,p=t.count;c<p;c+=3){let f=t.getX(c+0),m=t.getX(c+1),g=t.getX(c+2);a.fromBufferAttribute(i,f),s.fromBufferAttribute(i,m),n.fromBufferAttribute(i,g),d.subVectors(n,s),l.subVectors(a,s),d.cross(l),o.fromBufferAttribute(r,f),u.fromBufferAttribute(r,m),h.fromBufferAttribute(r,g),o.add(d),u.add(d),h.add(d),r.setXYZ(f,o.x,o.y,o.z),r.setXYZ(m,u.x,u.y,u.z),r.setXYZ(g,h.x,h.y,h.z)}else for(let c=0,p=i.count;c<p;c+=3)a.fromBufferAttribute(i,c+0),s.fromBufferAttribute(i,c+1),n.fromBufferAttribute(i,c+2),d.subVectors(n,s),l.subVectors(a,s),d.cross(l),r.setXYZ(c+0,d.x,d.y,d.z),r.setXYZ(c+1,d.x,d.y,d.z),r.setXYZ(c+2,d.x,d.y,d.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)Rt.fromBufferAttribute(t,i),Rt.normalize(),t.setXYZ(i,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function t(o,u){let h=o.array,d=o.itemSize,l=o.normalized,c=new h.constructor(u.length*d),p=0,f=0;for(let m=0,g=u.length;m<g;m++){p=o.isInterleavedBufferAttribute?u[m]*o.data.stride+o.offset:u[m]*d;for(let A=0;A<d;A++)c[f++]=h[p++]}return new ot(c,d,l)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let i=new Zc,r=this.index.array,a=this.attributes;for(let o in a){let u=a[o],h=t(u,r);i.setAttribute(o,h)}let s=this.morphAttributes;for(let o in s){let u=[],h=s[o];for(let d=0,l=h.length;d<l;d++){let c=h[d],p=t(c,r);u.push(p)}i.morphAttributes[o]=u}i.morphTargetsRelative=this.morphTargetsRelative;let n=this.groups;for(let o=0,u=n.length;o<u;o++){let h=n[o];i.addGroup(h.start,h.count,h.materialIndex)}return i}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let u=this.parameters;for(let h in u)u[h]!==void 0&&(t[h]=u[h]);return t}t.data={attributes:{}};let i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});let r=this.attributes;for(let u in r){let h=r[u];t.data.attributes[u]=h.toJSON(t.data)}let a={},s=!1;for(let u in this.morphAttributes){let h=this.morphAttributes[u],d=[];for(let l=0,c=h.length;l<c;l++){let p=h[l];d.push(p.toJSON(t.data))}d.length>0&&(a[u]=d,s=!0)}s&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);let n=this.groups;n.length>0&&(t.data.groups=JSON.parse(JSON.stringify(n)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let i={};this.name=t.name;let r=t.index;r!==null&&this.setIndex(r.clone(i));let a=t.attributes;for(let h in a){let d=a[h];this.setAttribute(h,d.clone(i))}let s=t.morphAttributes;for(let h in s){let d=[],l=s[h];for(let c=0,p=l.length;c<p;c++)d.push(l[c].clone(i));this.morphAttributes[h]=d}this.morphTargetsRelative=t.morphTargetsRelative;let n=t.groups;for(let h=0,d=n.length;h<d;h++){let l=n[h];this.addGroup(l.start,l.count,l.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let u=t.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ou=new ke,Ur=new Yn,rn=new qi,ku=new P,da=new P,pa=new P,fa=new P,So=new P,an=new P,sn=new oe,nn=new oe,on=new oe,Gu=new P,Hu=new P,zu=new P,ln=new P,un=new P,dt=class extends wt{constructor(e=new ni,t=new Si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let s=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=r}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let n=this.morphTargetInfluences;if(a&&n){an.set(0,0,0);for(let o=0,u=a.length;o<u;o++){let h=n[o],d=a[o];h!==0&&(So.fromBufferAttribute(d,e),s?an.addScaledVector(So,h):an.addScaledVector(So.sub(t),h))}t.add(an)}return t}raycast(e,t){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),rn.copy(i.boundingSphere),rn.applyMatrix4(a),Ur.copy(e.ray).recast(e.near),!(rn.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(rn,ku)===null||Ur.origin.distanceToSquared(ku)>(e.far-e.near)**2))&&(Ou.copy(a).invert(),Ur.copy(e.ray).applyMatrix4(Ou),!(i.boundingBox!==null&&Ur.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ur)))}_computeIntersections(e,t,i){let r,a=this.geometry,s=this.material,n=a.index,o=a.attributes.position,u=a.attributes.uv,h=a.attributes.uv1,d=a.attributes.normal,l=a.groups,c=a.drawRange;if(n!==null)if(Array.isArray(s))for(let p=0,f=l.length;p<f;p++){let m=l[p],g=s[m.materialIndex],A=Math.max(m.start,c.start),_=Math.min(n.count,Math.min(m.start+m.count,c.start+c.count));for(let v=A,x=_;v<x;v+=3){let C=n.getX(v),y=n.getX(v+1),T=n.getX(v+2);r=hn(this,g,e,i,u,h,d,C,y,T),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let p=Math.max(0,c.start),f=Math.min(n.count,c.start+c.count);for(let m=p,g=f;m<g;m+=3){let A=n.getX(m),_=n.getX(m+1),v=n.getX(m+2);r=hn(this,s,e,i,u,h,d,A,_,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(o!==void 0)if(Array.isArray(s))for(let p=0,f=l.length;p<f;p++){let m=l[p],g=s[m.materialIndex],A=Math.max(m.start,c.start),_=Math.min(o.count,Math.min(m.start+m.count,c.start+c.count));for(let v=A,x=_;v<x;v+=3){let C=v,y=v+1,T=v+2;r=hn(this,g,e,i,u,h,d,C,y,T),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let p=Math.max(0,c.start),f=Math.min(o.count,c.start+c.count);for(let m=p,g=f;m<g;m+=3){let A=m,_=m+1,v=m+2;r=hn(this,s,e,i,u,h,d,A,_,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Wf(e,t,i,r,a,s,n,o){let u;if(u=t.side===1?r.intersectTriangle(n,s,a,!0,o):r.intersectTriangle(a,s,n,t.side===0,o),u===null)return null;un.copy(o),un.applyMatrix4(e.matrixWorld);let h=i.ray.origin.distanceTo(un);return h<i.near||h>i.far?null:{distance:h,point:un.clone(),object:e}}function hn(e,t,i,r,a,s,n,o,u,h){e.getVertexPosition(o,da),e.getVertexPosition(u,pa),e.getVertexPosition(h,fa);let d=Wf(e,t,i,r,da,pa,fa,ln);if(d){a&&(sn.fromBufferAttribute(a,o),nn.fromBufferAttribute(a,u),on.fromBufferAttribute(a,h),d.uv=$s.getInterpolation(ln,da,pa,fa,sn,nn,on,new oe)),s&&(sn.fromBufferAttribute(s,o),nn.fromBufferAttribute(s,u),on.fromBufferAttribute(s,h),d.uv1=$s.getInterpolation(ln,da,pa,fa,sn,nn,on,new oe),d.uv2=d.uv1),n&&(Gu.fromBufferAttribute(n,o),Hu.fromBufferAttribute(n,u),zu.fromBufferAttribute(n,h),d.normal=$s.getInterpolation(ln,da,pa,fa,Gu,Hu,zu,new P),d.normal.dot(r.direction)>0&&d.normal.multiplyScalar(-1));let l={a:o,b:u,c:h,normal:new P,materialIndex:0};$s.getNormal(da,pa,fa,l.normal),d.face=l}return d}var Wl=class $c extends ni{constructor(t=1,i=1,r=1,a=1,s=1,n=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:a,heightSegments:s,depthSegments:n};let o=this;a=Math.floor(a),s=Math.floor(s),n=Math.floor(n);let u=[],h=[],d=[],l=[],c=0,p=0;f("z","y","x",-1,-1,r,i,t,n,s,0),f("z","y","x",1,-1,r,i,-t,n,s,1),f("x","z","y",1,1,t,r,i,a,n,2),f("x","z","y",1,-1,t,r,-i,a,n,3),f("x","y","z",1,-1,t,i,r,a,s,4),f("x","y","z",-1,-1,t,i,-r,a,s,5),this.setIndex(u),this.setAttribute("position",new ei(h,3)),this.setAttribute("normal",new ei(d,3)),this.setAttribute("uv",new ei(l,2));function f(m,g,A,_,v,x,C,y,T,b,E){let I=x/T,B=C/b,G=x/2,X=C/2,R=y/2,D=T+1,N=b+1,z=0,Y=0,W=new P;for(let J=0;J<N;J++){let K=J*B-X;for(let U=0;U<D;U++)W[m]=(U*I-G)*_,W[g]=K*v,W[A]=R,h.push(W.x,W.y,W.z),W[m]=0,W[g]=0,W[A]=y>0?1:-1,d.push(W.x,W.y,W.z),l.push(U/T),l.push(1-J/b),z+=1}for(let J=0;J<b;J++)for(let K=0;K<T;K++){let U=c+K+D*J,j=c+K+D*(J+1),re=c+(K+1)+D*(J+1),ce=c+(K+1)+D*J;u.push(U,j,ce),u.push(j,re,ce),Y+=6}o.addGroup(p,Y,E),p+=Y,c+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $c(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Wa(e){let t={};for(let i in e){t[i]={};for(let r in e[i]){let a=e[i][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=a.clone():Array.isArray(a)?t[i][r]=a.slice():t[i][r]=a}}return t}function Yt(e){let t={};for(let i=0;i<e.length;i++){let r=Wa(e[i]);for(let a in r)t[a]=r[a]}return t}function qf(e){let t=[];for(let i=0;i<e.length;i++)t.push(e[i].clone());return t}function ed(e){return e.getRenderTarget()===null?e.outputColorSpace:Ke.workingColorSpace}var td={clone:Wa,merge:Yt},Xf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,lt=class extends zi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xf,this.fragmentShader=Yf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wa(e.uniforms),this.uniformsGroups=qf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},id=class extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=Ts}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},zt=class extends id{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Va*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Va*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(vs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let o=s.fullWidth,u=s.fullHeight;a+=s.offsetX*r/o,t-=s.offsetY*i/u,r*=s.width/o,i*=s.height/u}let n=this.filmOffset;n!==0&&(a+=e*n/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Aa=-90,ma=1,jf=class extends wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new zt(Aa,ma,e,t);r.layers=this.layers,this.add(r);let a=new zt(Aa,ma,e,t);a.layers=this.layers,this.add(a);let s=new zt(Aa,ma,e,t);s.layers=this.layers,this.add(s);let n=new zt(Aa,ma,e,t);n.layers=this.layers,this.add(n);let o=new zt(Aa,ma,e,t);o.layers=this.layers,this.add(o);let u=new zt(Aa,ma,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,n,o]=t;for(let u of t)this.remove(u);if(e===2e3)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),n.up.set(0,1,0),n.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===2001)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),n.up.set(0,-1,0),n.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,s,n,o,u,h]=this.children,d=e.getRenderTarget(),l=e.getActiveCubeFace(),c=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let f=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,a),e.setRenderTarget(i,1,r),e.render(t,s),e.setRenderTarget(i,2,r),e.render(t,n),e.setRenderTarget(i,3,r),e.render(t,o),e.setRenderTarget(i,4,r),e.render(t,u),i.texture.generateMipmaps=f,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(d,l,c),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},rd=class extends Dt{constructor(e,t,i,r,a,s,n,o,u,h){e=e===void 0?[]:e,t=t===void 0?301:t,super(e,t,i,r,a,s,n,o,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Kf=class extends jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Es("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===3001?Ye:""),this.texture=new rd(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps===void 0?!1:t.generateMipmaps,this.texture.minFilter=t.minFilter===void 0?qe:t.minFilter}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Wl(5,5,5),a=new lt({name:"CubemapFromEquirect",uniforms:Wa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=t;let s=new dt(r,a),n=t.minFilter;return t.minFilter===1008&&(t.minFilter=qe),new jf(1,10,this).update(e,s),t.minFilter=n,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,i,r){let a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}},Co=new P,Jf=new P,Zf=new ze,Hr=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Co.subVectors(i,t).cross(Jf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Co),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Zf.getNormalMatrix(e),r=this.coplanarPoint(Co).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Nr=new qi,cn=new P,ql=class{constructor(e=new Hr,t=new Hr,i=new Hr,r=new Hr,a=new Hr,s=new Hr){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){let n=this.planes;return n[0].copy(e),n[1].copy(t),n[2].copy(i),n[3].copy(r),n[4].copy(a),n[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ts){let i=this.planes,r=e.elements,a=r[0],s=r[1],n=r[2],o=r[3],u=r[4],h=r[5],d=r[6],l=r[7],c=r[8],p=r[9],f=r[10],m=r[11],g=r[12],A=r[13],_=r[14],v=r[15];if(i[0].setComponents(o-a,l-u,m-c,v-g).normalize(),i[1].setComponents(o+a,l+u,m+c,v+g).normalize(),i[2].setComponents(o+s,l+h,m+p,v+A).normalize(),i[3].setComponents(o-s,l-h,m-p,v-A).normalize(),i[4].setComponents(o-n,l-d,m-f,v-_).normalize(),t===2e3)i[5].setComponents(o+n,l+d,m+f,v+_).normalize();else if(t===2001)i[5].setComponents(n,d,f,_).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Nr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nr)}intersectsSprite(e){return Nr.center.set(0,0,0),Nr.radius=.7071067811865476,Nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(cn.x=r.normal.x>0?e.max.x:e.min.x,cn.y=r.normal.y>0?e.max.y:e.min.y,cn.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(cn)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function ad(){let e=null,t=!1,i=null,r=null;function a(s,n){i(s,n),r=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&i!==null&&(r=e.requestAnimationFrame(a),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(s){i=s},setContext:function(s){e=s}}}function $f(e,t){let i=t.isWebGL2,r=new WeakMap;function a(h,d){let l=h.array,c=h.usage,p=l.byteLength,f=e.createBuffer();e.bindBuffer(d,f),e.bufferData(d,l,c),h.onUploadCallback();let m;if(l instanceof Float32Array)m=e.FLOAT;else if(l instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(i)m=e.HALF_FLOAT;else throw Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else m=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=e.SHORT;else if(l instanceof Uint32Array)m=e.UNSIGNED_INT;else if(l instanceof Int32Array)m=e.INT;else if(l instanceof Int8Array)m=e.BYTE;else if(l instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:h.version,size:p}}function s(h,d,l){let c=d.array,p=d._updateRange,f=d.updateRanges;if(e.bindBuffer(l,h),p.count===-1&&f.length===0&&e.bufferSubData(l,0,c),f.length!==0){for(let m=0,g=f.length;m<g;m++){let A=f[m];i?e.bufferSubData(l,A.start*c.BYTES_PER_ELEMENT,c,A.start,A.count):e.bufferSubData(l,A.start*c.BYTES_PER_ELEMENT,c.subarray(A.start,A.start+A.count))}d.clearUpdateRanges()}p.count!==-1&&(i?e.bufferSubData(l,p.offset*c.BYTES_PER_ELEMENT,c,p.offset,p.count):e.bufferSubData(l,p.offset*c.BYTES_PER_ELEMENT,c.subarray(p.offset,p.offset+p.count)),p.count=-1),d.onUploadCallback()}function n(h){return h.isInterleavedBufferAttribute&&(h=h.data),r.get(h)}function o(h){h.isInterleavedBufferAttribute&&(h=h.data);let d=r.get(h);d&&(e.deleteBuffer(d.buffer),r.delete(h))}function u(h,d){if(h.isGLBufferAttribute){let c=r.get(h);(!c||c.version<h.version)&&r.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);let l=r.get(h);if(l===void 0)r.set(h,a(h,d));else if(l.version<h.version){if(l.size!==h.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(l.buffer,h,d),l.version=h.version}}return{get:n,remove:o,update:u}}var ia=class sd extends ni{constructor(t=1,i=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:a};let s=t/2,n=i/2,o=Math.floor(r),u=Math.floor(a),h=o+1,d=u+1,l=t/o,c=i/u,p=[],f=[],m=[],g=[];for(let A=0;A<d;A++){let _=A*c-n;for(let v=0;v<h;v++){let x=v*l-s;f.push(x,-_,0),m.push(0,0,1),g.push(v/o),g.push(1-A/u)}}for(let A=0;A<u;A++)for(let _=0;_<o;_++){let v=_+h*A,x=_+h*(A+1),C=_+1+h*(A+1),y=_+1+h*A;p.push(v,x,y),p.push(x,C,y)}this.setIndex(p),this.setAttribute("position",new ei(f,3)),this.setAttribute("normal",new ei(m,3)),this.setAttribute("uv",new ei(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sd(t.width,t.height,t.widthSegments,t.heightSegments)}},Le={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif

#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_fragment:`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );

	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},ne={common:{diffuse:{value:new ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new ye(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Qi={basic:{uniforms:Yt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Le.meshbasic_vert,fragmentShader:Le.meshbasic_frag},lambert:{uniforms:Yt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ye(0)}}]),vertexShader:Le.meshlambert_vert,fragmentShader:Le.meshlambert_frag},phong:{uniforms:Yt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ye(0)},specular:{value:new ye(1118481)},shininess:{value:30}}]),vertexShader:Le.meshphong_vert,fragmentShader:Le.meshphong_frag},standard:{uniforms:Yt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag},toon:{uniforms:Yt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new ye(0)}}]),vertexShader:Le.meshtoon_vert,fragmentShader:Le.meshtoon_frag},matcap:{uniforms:Yt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Le.meshmatcap_vert,fragmentShader:Le.meshmatcap_frag},points:{uniforms:Yt([ne.points,ne.fog]),vertexShader:Le.points_vert,fragmentShader:Le.points_frag},dashed:{uniforms:Yt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Le.linedashed_vert,fragmentShader:Le.linedashed_frag},depth:{uniforms:Yt([ne.common,ne.displacementmap]),vertexShader:Le.depth_vert,fragmentShader:Le.depth_frag},normal:{uniforms:Yt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Le.meshnormal_vert,fragmentShader:Le.meshnormal_frag},sprite:{uniforms:Yt([ne.sprite,ne.fog]),vertexShader:Le.sprite_vert,fragmentShader:Le.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Le.background_vert,fragmentShader:Le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Le.backgroundCube_vert,fragmentShader:Le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Le.cube_vert,fragmentShader:Le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Le.equirect_vert,fragmentShader:Le.equirect_frag},distanceRGBA:{uniforms:Yt([ne.common,ne.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Le.distanceRGBA_vert,fragmentShader:Le.distanceRGBA_frag},shadow:{uniforms:Yt([ne.lights,ne.fog,{color:{value:new ye(0)},opacity:{value:1}}]),vertexShader:Le.shadow_vert,fragmentShader:Le.shadow_frag}};Qi.physical={uniforms:Yt([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new ye(0)},specularColor:{value:new ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag};var dn={r:0,b:0,g:0};function eA(e,t,i,r,a,s,n){let o=new ye(0),u=s===!0?0:1,h,d,l=null,c=0,p=null;function f(g,A){let _=!1,v=A.isScene===!0?A.background:null;v&&v.isTexture&&(v=(A.backgroundBlurriness>0?i:t).get(v)),v===null?m(o,u):v&&v.isColor&&(m(v,1),_=!0);let x=e.xr.getEnvironmentBlendMode();x==="additive"?r.buffers.color.setClear(0,0,0,1,n):x==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,n),(e.autoClear||_)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),v&&(v.isCubeTexture||v.mapping===306)?(d===void 0&&(d=new dt(new Wl(1,1,1),new lt({name:"BackgroundCubeMaterial",uniforms:Wa(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,y,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),d.material.uniforms.envMap.value=v,d.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,d.material.toneMapped=Ke.getTransfer(v.colorSpace)!==Fn,(l!==v||c!==v.version||p!==e.toneMapping)&&(d.material.needsUpdate=!0,l=v,c=v.version,p=e.toneMapping),d.layers.enableAll(),g.unshift(d,d.geometry,d.material,0,0,null)):v&&v.isTexture&&(h===void 0&&(h=new dt(new ia(2,2),new lt({name:"BackgroundMaterial",uniforms:Wa(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(h)),h.material.uniforms.t2D.value=v,h.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,h.material.toneMapped=Ke.getTransfer(v.colorSpace)!==Fn,v.matrixAutoUpdate===!0&&v.updateMatrix(),h.material.uniforms.uvTransform.value.copy(v.matrix),(l!==v||c!==v.version||p!==e.toneMapping)&&(h.material.needsUpdate=!0,l=v,c=v.version,p=e.toneMapping),h.layers.enableAll(),g.unshift(h,h.geometry,h.material,0,0,null))}function m(g,A){g.getRGB(dn,ed(e)),r.buffers.color.setClear(dn.r,dn.g,dn.b,A,n)}return{getClearColor:function(){return o},setClearColor:function(g,A=1){o.set(g),u=A,m(o,u)},getClearAlpha:function(){return u},setClearAlpha:function(g){u=g,m(o,u)},render:f}}function tA(e,t,i,r){let a=e.getParameter(e.MAX_VERTEX_ATTRIBS),s=r.isWebGL2?null:t.get("OES_vertex_array_object"),n=r.isWebGL2||s!==null,o={},u=g(null),h=u,d=!1;function l(R,D,N,z,Y){let W=!1;if(n){let J=m(z,N,D);h!==J&&(h=J,p(h.object)),W=A(R,z,N,Y),W&&_(R,z,N,Y)}else{let J=D.wireframe===!0;(h.geometry!==z.id||h.program!==N.id||h.wireframe!==J)&&(h.geometry=z.id,h.program=N.id,h.wireframe=J,W=!0)}Y!==null&&i.update(Y,e.ELEMENT_ARRAY_BUFFER),(W||d)&&(d=!1,b(R,D,N,z),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,i.get(Y).buffer))}function c(){return r.isWebGL2?e.createVertexArray():s.createVertexArrayOES()}function p(R){return r.isWebGL2?e.bindVertexArray(R):s.bindVertexArrayOES(R)}function f(R){return r.isWebGL2?e.deleteVertexArray(R):s.deleteVertexArrayOES(R)}function m(R,D,N){let z=N.wireframe===!0,Y=o[R.id];Y===void 0&&(Y={},o[R.id]=Y);let W=Y[D.id];W===void 0&&(W={},Y[D.id]=W);let J=W[z];return J===void 0&&(J=g(c()),W[z]=J),J}function g(R){let D=[],N=[],z=[];for(let Y=0;Y<a;Y++)D[Y]=0,N[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:N,attributeDivisors:z,object:R,attributes:{},index:null}}function A(R,D,N,z){let Y=h.attributes,W=D.attributes,J=0,K=N.getAttributes();for(let U in K)if(K[U].location>=0){let j=Y[U],re=W[U];if(re===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(re=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(re=R.instanceColor)),j===void 0||j.attribute!==re||re&&j.data!==re.data)return!0;J++}return h.attributesNum!==J||h.index!==z}function _(R,D,N,z){let Y={},W=D.attributes,J=0,K=N.getAttributes();for(let U in K)if(K[U].location>=0){let j=W[U];j===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(j=R.instanceColor));let re={};re.attribute=j,j&&j.data&&(re.data=j.data),Y[U]=re,J++}h.attributes=Y,h.attributesNum=J,h.index=z}function v(){let R=h.newAttributes;for(let D=0,N=R.length;D<N;D++)R[D]=0}function x(R){C(R,0)}function C(R,D){let N=h.newAttributes,z=h.enabledAttributes,Y=h.attributeDivisors;N[R]=1,z[R]===0&&(e.enableVertexAttribArray(R),z[R]=1),Y[R]!==D&&((r.isWebGL2?e:t.get("ANGLE_instanced_arrays"))[r.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,D),Y[R]=D)}function y(){let R=h.newAttributes,D=h.enabledAttributes;for(let N=0,z=D.length;N<z;N++)D[N]!==R[N]&&(e.disableVertexAttribArray(N),D[N]=0)}function T(R,D,N,z,Y,W,J){J===!0?e.vertexAttribIPointer(R,D,N,Y,W):e.vertexAttribPointer(R,D,N,z,Y,W)}function b(R,D,N,z){if(r.isWebGL2===!1&&(R.isInstancedMesh||z.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();let Y=z.attributes,W=N.getAttributes(),J=D.defaultAttributeValues;for(let K in W){let U=W[K];if(U.location>=0){let j=Y[K];if(j===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(j=R.instanceColor)),j!==void 0){let re=j.normalized,ce=j.itemSize,ge=i.get(j);if(ge===void 0)continue;let _e=ge.buffer,Me=ge.type,Ce=ge.bytesPerElement,De=r.isWebGL2===!0&&(Me===e.INT||Me===e.UNSIGNED_INT||j.gpuType===1013);if(j.isInterleavedBufferAttribute){let O=j.data,vt=O.stride,Ge=j.offset;if(O.isInstancedInterleavedBuffer){for(let de=0;de<U.locationSize;de++)C(U.location+de,O.meshPerAttribute);R.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let de=0;de<U.locationSize;de++)x(U.location+de);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let de=0;de<U.locationSize;de++)T(U.location+de,ce/U.locationSize,Me,re,vt*Ce,(Ge+ce/U.locationSize*de)*Ce,De)}else{if(j.isInstancedBufferAttribute){for(let O=0;O<U.locationSize;O++)C(U.location+O,j.meshPerAttribute);R.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let O=0;O<U.locationSize;O++)x(U.location+O);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let O=0;O<U.locationSize;O++)T(U.location+O,ce/U.locationSize,Me,re,ce*Ce,ce/U.locationSize*O*Ce,De)}}else if(J!==void 0){let re=J[K];if(re!==void 0)switch(re.length){case 2:e.vertexAttrib2fv(U.location,re);break;case 3:e.vertexAttrib3fv(U.location,re);break;case 4:e.vertexAttrib4fv(U.location,re);break;default:e.vertexAttrib1fv(U.location,re)}}}}y()}function E(){G();for(let R in o){let D=o[R];for(let N in D){let z=D[N];for(let Y in z)f(z[Y].object),delete z[Y];delete D[N]}delete o[R]}}function I(R){if(o[R.id]===void 0)return;let D=o[R.id];for(let N in D){let z=D[N];for(let Y in z)f(z[Y].object),delete z[Y];delete D[N]}delete o[R.id]}function B(R){for(let D in o){let N=o[D];if(N[R.id]===void 0)continue;let z=N[R.id];for(let Y in z)f(z[Y].object),delete z[Y];delete N[R.id]}}function G(){X(),d=!0,h!==u&&(h=u,p(h.object))}function X(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:l,reset:G,resetDefaultState:X,dispose:E,releaseStatesOfGeometry:I,releaseStatesOfProgram:B,initAttributes:v,enableAttribute:x,disableUnusedAttributes:y}}function iA(e,t,i,r){let a=r.isWebGL2,s;function n(d){s=d}function o(d,l){e.drawArrays(s,d,l),i.update(l,s,1)}function u(d,l,c){if(c===0)return;let p,f;if(a)p=e,f="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),f="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[f](s,d,l,c),i.update(l,s,c)}function h(d,l,c){if(c===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<c;f++)this.render(d[f],l[f]);else{p.multiDrawArraysWEBGL(s,d,0,l,0,c);let f=0;for(let m=0;m<c;m++)f+=l[m];i.update(f,s,1)}}this.setMode=n,this.render=o,this.renderInstances=u,this.renderMultiDraw=h}function rA(e,t,i){let r;function a(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(T){if(T==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let n=typeof WebGL2RenderingContext<"u"&&e.constructor.name==="WebGL2RenderingContext",o=i.precision===void 0?"highp":i.precision,u=s(o);u!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",u,"instead."),o=u);let h=n||t.has("WEBGL_draw_buffers"),d=i.logarithmicDepthBuffer===!0,l=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),c=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),m=e.getParameter(e.MAX_VERTEX_ATTRIBS),g=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),A=e.getParameter(e.MAX_VARYING_VECTORS),_=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),v=c>0,x=n||t.has("OES_texture_float"),C=v&&x,y=n?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:n,drawBuffers:h,getMaxAnisotropy:a,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:d,maxTextures:l,maxVertexTextures:c,maxTextureSize:p,maxCubemapSize:f,maxAttributes:m,maxVertexUniforms:g,maxVaryings:A,maxFragmentUniforms:_,vertexTextures:v,floatFragmentTextures:x,floatVertexTextures:C,maxSamples:y}}function aA(e){let t=this,i=null,r=0,a=!1,s=!1,n=new Hr,o=new ze,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(l,c){let p=l.length!==0||c||r!==0||a;return a=c,r=l.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(l,c){i=d(l,c,0)},this.setState=function(l,c,p){let f=l.clippingPlanes,m=l.clipIntersection,g=l.clipShadows,A=e.get(l);if(!a||f===null||f.length===0||s&&!g)s?d(null):h();else{let _=s?0:r,v=_*4,x=A.clippingState||null;u.value=x,x=d(f,c,v,p);for(let C=0;C!==v;++C)x[C]=i[C];A.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=_}};function h(){u.value!==i&&(u.value=i,u.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function d(l,c,p,f){let m=l===null?0:l.length,g=null;if(m!==0){if(g=u.value,f!==!0||g===null){let A=p+m*4,_=c.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<A)&&(g=new Float32Array(A));for(let v=0,x=p;v!==m;++v,x+=4)n.copy(l[v]).applyMatrix4(_,o),n.normal.toArray(g,x),g[x+3]=n.constant}u.value=g,u.needsUpdate=!0}return t.numPlanes=m,t.numIntersection=0,g}}function sA(e){let t=new WeakMap;function i(n,o){return o===303?n.mapping=301:o===304&&(n.mapping=302),n}function r(n){if(n&&n.isTexture){let o=n.mapping;if(o===303||o===304)if(t.has(n)){let u=t.get(n).texture;return i(u,n.mapping)}else{let u=n.image;if(u&&u.height>0){let h=new Kf(u.height/2);return h.fromEquirectangularTexture(e,n),t.set(n,h),n.addEventListener("dispose",a),i(h.texture,n.mapping)}else return null}}return n}function a(n){let o=n.target;o.removeEventListener("dispose",a);let u=t.get(o);u!==void 0&&(t.delete(o),u.dispose())}function s(){t=new WeakMap}return{get:r,dispose:s}}var Qs=class extends id{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-e,s=i+e,n=r+t,o=r-t;if(this.view!==null&&this.view.enabled){let u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=u*this.view.offsetX,s=a+u*this.view.width,n-=h*this.view.offsetY,o=n-h*this.view.height}this.projectionMatrix.makeOrthographic(a,s,n,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ba=4,Vu=[.125,.215,.35,.446,.526,.582],Wr=20,Mo=new Qs,Wu=new ye,Io=null,To=0,wo=0,zr=(1+Math.sqrt(5))/2,ga=1/zr,qu=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,zr,ga),new P(0,zr,-ga),new P(ga,0,zr),new P(-ga,0,zr),new P(zr,ga,0),new P(-zr,ga,0)],Xu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Io=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),this._setSize(256);let a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ju(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Io,To,wo),e.scissorTest=!1,pn(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Io=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel();let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:qe,minFilter:qe,generateMipmaps:!1,type:Ua,format:mt,colorSpace:Ct,depthBuffer:!1},r=Yu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yu(e,t,i);let{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nA(a)),this._blurMaterial=oA(a,e,t)}return r}_compileMaterial(e){let t=new dt(this._lodPlanes[0],e);this._renderer.compile(t,Mo)}_sceneToCubeUV(e,t,i,r){let a=new zt(90,1,t,i),s=[1,-1,1,1,1,1],n=[1,1,1,-1,-1,-1],o=this._renderer,u=o.autoClear,h=o.toneMapping;o.getClearColor(Wu),o.toneMapping=0,o.autoClear=!1;let d=new Si({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),l=new dt(new Wl,d),c=!1,p=e.background;p?p.isColor&&(d.color.copy(p),e.background=null,c=!0):(d.color.copy(Wu),c=!0);for(let f=0;f<6;f++){let m=f%3;m===0?(a.up.set(0,s[f],0),a.lookAt(n[f],0,0)):m===1?(a.up.set(0,0,s[f]),a.lookAt(0,n[f],0)):(a.up.set(0,s[f],0),a.lookAt(0,0,n[f]));let g=this._cubeSize;pn(r,m*g,f>2?g:0,g,g),o.setRenderTarget(r),c&&o.render(l,a),o.render(e,a)}l.geometry.dispose(),l.material.dispose(),o.toneMapping=h,o.autoClear=u,e.background=p}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ju());let a=r?this._cubemapMaterial:this._equirectMaterial,s=new dt(this._lodPlanes[0],a),n=a.uniforms;n.envMap.value=e;let o=this._cubeSize;pn(t,0,0,3*o,2*o),i.setRenderTarget(t),i.render(s,Mo)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),s=qu[(r-1)%qu.length];this._blur(e,r-1,r,a,s)}t.autoClear=i}_blur(e,t,i,r,a){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,r,"latitudinal",a),this._halfBlur(s,e,i,i,r,"longitudinal",a)}_halfBlur(e,t,i,r,a,s,n){let o=this._renderer,u=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new dt(this._lodPlanes[r],u),d=u.uniforms,l=this._sizeLods[i]-1,c=isFinite(a)?Math.PI/(2*l):2*Math.PI/(2*Wr-1),p=a/c,f=isFinite(a)?1+Math.floor(3*p):Wr;f>Wr&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Wr}`);let m=[],g=0;for(let v=0;v<Wr;++v){let x=v/p,C=Math.exp(-x*x/2);m.push(C),v===0?g+=C:v<f&&(g+=2*C)}for(let v=0;v<m.length;v++)m[v]=m[v]/g;d.envMap.value=e.texture,d.samples.value=f,d.weights.value=m,d.latitudinal.value=s==="latitudinal",n&&(d.poleAxis.value=n);let{_lodMax:A}=this;d.dTheta.value=c,d.mipInt.value=A-i;let _=this._sizeLods[r];pn(t,3*_*(r>A-Ba?r-A+Ba:0),4*(this._cubeSize-_),3*_,2*_),o.setRenderTarget(t),o.render(h,Mo)}};function nA(e){let t=[],i=[],r=[],a=e,s=e-Ba+1+Vu.length;for(let n=0;n<s;n++){let o=2**a;i.push(o);let u=1/o;n>e-Ba?u=Vu[n-e+Ba-1]:n===0&&(u=0),r.push(u);let h=1/(o-2),d=-h,l=1+h,c=[d,d,l,d,l,l,d,d,l,l,d,l],p=new Float32Array(108),f=new Float32Array(72),m=new Float32Array(36);for(let A=0;A<6;A++){let _=A%3*2/3-1,v=A>2?0:-1,x=[_,v,0,_+2/3,v,0,_+2/3,v+1,0,_,v,0,_+2/3,v+1,0,_,v+1,0];p.set(x,18*A),f.set(c,12*A);let C=[A,A,A,A,A,A];m.set(C,6*A)}let g=new ni;g.setAttribute("position",new ot(p,3)),g.setAttribute("uv",new ot(f,2)),g.setAttribute("faceIndex",new ot(m,1)),t.push(g),a>Ba&&a--}return{lodPlanes:t,sizeLods:i,sigmas:r}}function Yu(e,t,i){let r=new jt(e,t,i);return r.texture.mapping=306,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function pn(e,t,i,r,a){e.viewport.set(t,i,r,a),e.scissor.set(t,i,r,a)}function oA(e,t,i){let r=new Float32Array(Wr),a=new P(0,1,0);return new lt({name:"SphericalGaussianBlur",defines:{n:Wr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ju(){return new lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ku(){return new lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function lA(e){let t=new WeakMap,i=null;function r(o){if(o&&o.isTexture){let u=o.mapping,h=u===303||u===304,d=u===301||u===302;if(h||d)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let l=t.get(o);return i===null&&(i=new Xu(e)),l=h?i.fromEquirectangular(o,l):i.fromCubemap(o,l),t.set(o,l),l.texture}else{if(t.has(o))return t.get(o).texture;{let l=o.image;if(h&&l&&l.height>0||d&&l&&a(l)){i===null&&(i=new Xu(e));let c=h?i.fromEquirectangular(o):i.fromCubemap(o);return t.set(o,c),o.addEventListener("dispose",s),c.texture}else return null}}}return o}function a(o){let u=0;for(let h=0;h<6;h++)o[h]!==void 0&&u++;return u===6}function s(o){let u=o.target;u.removeEventListener("dispose",s);let h=t.get(u);h!==void 0&&(t.delete(u),h.dispose())}function n(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:n}}function uA(e){let t={};function i(r){if(t[r]!==void 0)return t[r];let a;switch(r){case"WEBGL_depth_texture":a=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=e.getExtension(r)}return t[r]=a,a}return{has:function(r){return i(r)!==null},init:function(r){r.isWebGL2?(i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance")):(i("WEBGL_depth_texture"),i("OES_texture_float"),i("OES_texture_half_float"),i("OES_texture_half_float_linear"),i("OES_standard_derivatives"),i("OES_element_index_uint"),i("OES_vertex_array_object"),i("ANGLE_instanced_arrays")),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture")},get:function(r){let a=i(r);return a===null&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function hA(e,t,i,r){let a={},s=new WeakMap;function n(l){let c=l.target;c.index!==null&&t.remove(c.index);for(let f in c.attributes)t.remove(c.attributes[f]);for(let f in c.morphAttributes){let m=c.morphAttributes[f];for(let g=0,A=m.length;g<A;g++)t.remove(m[g])}c.removeEventListener("dispose",n),delete a[c.id];let p=s.get(c);p&&(t.remove(p),s.delete(c)),r.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,i.memory.geometries--}function o(l,c){return a[c.id]===!0||(c.addEventListener("dispose",n),a[c.id]=!0,i.memory.geometries++),c}function u(l){let c=l.attributes;for(let f in c)t.update(c[f],e.ARRAY_BUFFER);let p=l.morphAttributes;for(let f in p){let m=p[f];for(let g=0,A=m.length;g<A;g++)t.update(m[g],e.ARRAY_BUFFER)}}function h(l){let c=[],p=l.index,f=l.attributes.position,m=0;if(p!==null){let _=p.array;m=p.version;for(let v=0,x=_.length;v<x;v+=3){let C=_[v+0],y=_[v+1],T=_[v+2];c.push(C,y,y,T,T,C)}}else if(f!==void 0){let _=f.array;m=f.version;for(let v=0,x=_.length/3-1;v<x;v+=3){let C=v+0,y=v+1,T=v+2;c.push(C,y,y,T,T,C)}}else return;let g=new(kc(c)?Jc:Kc)(c,1);g.version=m;let A=s.get(l);A&&t.remove(A),s.set(l,g)}function d(l){let c=s.get(l);if(c){let p=l.index;p!==null&&c.version<p.version&&h(l)}else h(l);return s.get(l)}return{get:o,update:u,getWireframeAttribute:d}}function cA(e,t,i,r){let a=r.isWebGL2,s;function n(p){s=p}let o,u;function h(p){o=p.type,u=p.bytesPerElement}function d(p,f){e.drawElements(s,f,o,p*u),i.update(f,s,1)}function l(p,f,m){if(m===0)return;let g,A;if(a)g=e,A="drawElementsInstanced";else if(g=t.get("ANGLE_instanced_arrays"),A="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[A](s,f,o,p*u,m),i.update(f,s,m)}function c(p,f,m){if(m===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let A=0;A<m;A++)this.render(p[A]/u,f[A]);else{g.multiDrawElementsWEBGL(s,f,0,o,p,0,m);let A=0;for(let _=0;_<m;_++)A+=f[_];i.update(A,s,1)}}this.setMode=n,this.setIndex=h,this.render=d,this.renderInstances=l,this.renderMultiDraw=c}function dA(e){let t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(s,n,o){switch(i.calls++,n){case e.TRIANGLES:i.triangles+=s/3*o;break;case e.LINES:i.lines+=s/2*o;break;case e.LINE_STRIP:i.lines+=o*(s-1);break;case e.LINE_LOOP:i.lines+=o*s;break;case e.POINTS:i.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n);break}}function a(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:a,update:r}}function pA(e,t){return e[0]-t[0]}function fA(e,t){return Math.abs(t[1])-Math.abs(e[1])}function AA(e,t,i){let r={},a=new Float32Array(8),s=new WeakMap,n=new et,o=[];for(let h=0;h<8;h++)o[h]=[h,0];function u(h,d,l){let c=h.morphTargetInfluences;if(t.isWebGL2===!0){let p=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,f=p===void 0?0:p.length,m=s.get(d);if(m===void 0||m.count!==f){let _=function(){X.dispose(),s.delete(d),d.removeEventListener("dispose",_)};m!==void 0&&m.texture.dispose();let v=d.morphAttributes.position!==void 0,x=d.morphAttributes.normal!==void 0,C=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],T=d.morphAttributes.normal||[],b=d.morphAttributes.color||[],E=0;v===!0&&(E=1),x===!0&&(E=2),C===!0&&(E=3);let I=d.attributes.position.count*E,B=1;I>t.maxTextureSize&&(B=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);let G=new Float32Array(I*B*4*f),X=new Vc(G,I,B,f);X.type=Da,X.needsUpdate=!0;let R=E*4;for(let D=0;D<f;D++){let N=y[D],z=T[D],Y=b[D],W=I*B*4*D;for(let J=0;J<N.count;J++){let K=J*R;v===!0&&(n.fromBufferAttribute(N,J),G[W+K+0]=n.x,G[W+K+1]=n.y,G[W+K+2]=n.z,G[W+K+3]=0),x===!0&&(n.fromBufferAttribute(z,J),G[W+K+4]=n.x,G[W+K+5]=n.y,G[W+K+6]=n.z,G[W+K+7]=0),C===!0&&(n.fromBufferAttribute(Y,J),G[W+K+8]=n.x,G[W+K+9]=n.y,G[W+K+10]=n.z,G[W+K+11]=Y.itemSize===4?n.w:1)}}m={count:f,texture:X,size:new oe(I,B)},s.set(d,m),d.addEventListener("dispose",_)}let g=0;for(let _=0;_<c.length;_++)g+=c[_];let A=d.morphTargetsRelative?1:1-g;l.getUniforms().setValue(e,"morphTargetBaseInfluence",A),l.getUniforms().setValue(e,"morphTargetInfluences",c),l.getUniforms().setValue(e,"morphTargetsTexture",m.texture,i),l.getUniforms().setValue(e,"morphTargetsTextureSize",m.size)}else{let p=c===void 0?0:c.length,f=r[d.id];if(f===void 0||f.length!==p){f=[];for(let v=0;v<p;v++)f[v]=[v,0];r[d.id]=f}for(let v=0;v<p;v++){let x=f[v];x[0]=v,x[1]=c[v]}f.sort(fA);for(let v=0;v<8;v++)v<p&&f[v][1]?(o[v][0]=f[v][0],o[v][1]=f[v][1]):(o[v][0]=2**53-1,o[v][1]=0);o.sort(pA);let m=d.morphAttributes.position,g=d.morphAttributes.normal,A=0;for(let v=0;v<8;v++){let x=o[v],C=x[0],y=x[1];C!==2**53-1&&y?(m&&d.getAttribute("morphTarget"+v)!==m[C]&&d.setAttribute("morphTarget"+v,m[C]),g&&d.getAttribute("morphNormal"+v)!==g[C]&&d.setAttribute("morphNormal"+v,g[C]),a[v]=y,A+=y):(m&&d.hasAttribute("morphTarget"+v)===!0&&d.deleteAttribute("morphTarget"+v),g&&d.hasAttribute("morphNormal"+v)===!0&&d.deleteAttribute("morphNormal"+v),a[v]=0)}let _=d.morphTargetsRelative?1:1-A;l.getUniforms().setValue(e,"morphTargetBaseInfluence",_),l.getUniforms().setValue(e,"morphTargetInfluences",a)}}return{update:u}}function mA(e,t,i,r){let a=new WeakMap;function s(u){let h=r.render.frame,d=u.geometry,l=t.get(u,d);if(a.get(l)!==h&&(t.update(l),a.set(l,h)),u.isInstancedMesh&&(u.hasEventListener("dispose",o)===!1&&u.addEventListener("dispose",o),a.get(u)!==h&&(i.update(u.instanceMatrix,e.ARRAY_BUFFER),u.instanceColor!==null&&i.update(u.instanceColor,e.ARRAY_BUFFER),a.set(u,h))),u.isSkinnedMesh){let c=u.skeleton;a.get(c)!==h&&(c.update(),a.set(c,h))}return l}function n(){a=new WeakMap}function o(u){let h=u.target;h.removeEventListener("dispose",o),i.remove(h.instanceMatrix),h.instanceColor!==null&&i.remove(h.instanceColor)}return{update:s,dispose:n}}var nd=class extends Dt{constructor(e,t,i,r,a,s,n,o,u,h){if(h=h===void 0?Lc:h,h!==1026&&h!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===1026&&(i=kl),i===void 0&&h===1027&&(i=Gl),super(null,r,a,s,n,o,h,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=n===void 0?si:n,this.minFilter=o===void 0?si:o,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},od=new Dt,ld=new nd(1,1);ld.compareFunction=515;var ud=new Vc,hd=new Wc,cd=new rd,Ju=[],Zu=[],$u=new Float32Array(16),eh=new Float32Array(9),th=new Float32Array(4);function es(e,t,i){let r=e[0];if(r<=0||r>0)return e;let a=t*i,s=Ju[a];if(s===void 0&&(s=new Float32Array(a),Ju[a]=s),t!==0){r.toArray(s,0);for(let n=1,o=0;n!==t;++n)o+=i,e[n].toArray(s,o)}return s}function bt(e,t){if(e.length!==t.length)return!1;for(let i=0,r=e.length;i<r;i++)if(e[i]!==t[i])return!1;return!0}function Bt(e,t){for(let i=0,r=t.length;i<r;i++)e[i]=t[i]}function jn(e,t){let i=Zu[t];i===void 0&&(i=new Int32Array(t),Zu[t]=i);for(let r=0;r!==t;++r)i[r]=e.allocateTextureUnit();return i}function gA(e,t){let i=this.cache;i[0]!==t&&(e.uniform1f(this.addr,t),i[0]=t)}function _A(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bt(i,t))return;e.uniform2fv(this.addr,t),Bt(i,t)}}function vA(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(bt(i,t))return;e.uniform3fv(this.addr,t),Bt(i,t)}}function xA(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bt(i,t))return;e.uniform4fv(this.addr,t),Bt(i,t)}}function EA(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(bt(i,t))return;e.uniformMatrix2fv(this.addr,!1,t),Bt(i,t)}else{if(bt(i,r))return;th.set(r),e.uniformMatrix2fv(this.addr,!1,th),Bt(i,r)}}function yA(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(bt(i,t))return;e.uniformMatrix3fv(this.addr,!1,t),Bt(i,t)}else{if(bt(i,r))return;eh.set(r),e.uniformMatrix3fv(this.addr,!1,eh),Bt(i,r)}}function SA(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(bt(i,t))return;e.uniformMatrix4fv(this.addr,!1,t),Bt(i,t)}else{if(bt(i,r))return;$u.set(r),e.uniformMatrix4fv(this.addr,!1,$u),Bt(i,r)}}function CA(e,t){let i=this.cache;i[0]!==t&&(e.uniform1i(this.addr,t),i[0]=t)}function MA(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bt(i,t))return;e.uniform2iv(this.addr,t),Bt(i,t)}}function IA(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(bt(i,t))return;e.uniform3iv(this.addr,t),Bt(i,t)}}function TA(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bt(i,t))return;e.uniform4iv(this.addr,t),Bt(i,t)}}function wA(e,t){let i=this.cache;i[0]!==t&&(e.uniform1ui(this.addr,t),i[0]=t)}function bA(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bt(i,t))return;e.uniform2uiv(this.addr,t),Bt(i,t)}}function BA(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(bt(i,t))return;e.uniform3uiv(this.addr,t),Bt(i,t)}}function RA(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bt(i,t))return;e.uniform4uiv(this.addr,t),Bt(i,t)}}function PA(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a);let s=this.type===e.SAMPLER_2D_SHADOW?ld:od;i.setTexture2D(t||s,a)}function LA(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture3D(t||hd,a)}function DA(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTextureCube(t||cd,a)}function UA(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture2DArray(t||ud,a)}function NA(e){switch(e){case 5126:return gA;case 35664:return _A;case 35665:return vA;case 35666:return xA;case 35674:return EA;case 35675:return yA;case 35676:return SA;case 5124:case 35670:return CA;case 35667:case 35671:return MA;case 35668:case 35672:return IA;case 35669:case 35673:return TA;case 5125:return wA;case 36294:return bA;case 36295:return BA;case 36296:return RA;case 35678:case 36198:case 36298:case 36306:case 35682:return PA;case 35679:case 36299:case 36307:return LA;case 35680:case 36300:case 36308:case 36293:return DA;case 36289:case 36303:case 36311:case 36292:return UA}}function FA(e,t){e.uniform1fv(this.addr,t)}function QA(e,t){let i=es(t,this.size,2);e.uniform2fv(this.addr,i)}function OA(e,t){let i=es(t,this.size,3);e.uniform3fv(this.addr,i)}function kA(e,t){let i=es(t,this.size,4);e.uniform4fv(this.addr,i)}function GA(e,t){let i=es(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,i)}function HA(e,t){let i=es(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,i)}function zA(e,t){let i=es(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,i)}function VA(e,t){e.uniform1iv(this.addr,t)}function WA(e,t){e.uniform2iv(this.addr,t)}function qA(e,t){e.uniform3iv(this.addr,t)}function XA(e,t){e.uniform4iv(this.addr,t)}function YA(e,t){e.uniform1uiv(this.addr,t)}function jA(e,t){e.uniform2uiv(this.addr,t)}function KA(e,t){e.uniform3uiv(this.addr,t)}function JA(e,t){e.uniform4uiv(this.addr,t)}function ZA(e,t,i){let r=this.cache,a=t.length,s=jn(i,a);bt(r,s)||(e.uniform1iv(this.addr,s),Bt(r,s));for(let n=0;n!==a;++n)i.setTexture2D(t[n]||od,s[n])}function $A(e,t,i){let r=this.cache,a=t.length,s=jn(i,a);bt(r,s)||(e.uniform1iv(this.addr,s),Bt(r,s));for(let n=0;n!==a;++n)i.setTexture3D(t[n]||hd,s[n])}function em(e,t,i){let r=this.cache,a=t.length,s=jn(i,a);bt(r,s)||(e.uniform1iv(this.addr,s),Bt(r,s));for(let n=0;n!==a;++n)i.setTextureCube(t[n]||cd,s[n])}function tm(e,t,i){let r=this.cache,a=t.length,s=jn(i,a);bt(r,s)||(e.uniform1iv(this.addr,s),Bt(r,s));for(let n=0;n!==a;++n)i.setTexture2DArray(t[n]||ud,s[n])}function im(e){switch(e){case 5126:return FA;case 35664:return QA;case 35665:return OA;case 35666:return kA;case 35674:return GA;case 35675:return HA;case 35676:return zA;case 5124:case 35670:return VA;case 35667:case 35671:return WA;case 35668:case 35672:return qA;case 35669:case 35673:return XA;case 5125:return YA;case 36294:return jA;case 36295:return KA;case 36296:return JA;case 35678:case 36198:case 36298:case 36306:case 35682:return ZA;case 35679:case 36299:case 36307:return $A;case 35680:case 36300:case 36308:case 36293:return em;case 36289:case 36303:case 36311:case 36292:return tm}}var rm=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=NA(t.type)}},am=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=im(t.type)}},sm=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let a=0,s=r.length;a!==s;++a){let n=r[a];n.setValue(e,t[n.id],i)}}},bo=/(\w+)(\])?(\[|\.)?/g;function ih(e,t){e.seq.push(t),e.map[t.id]=t}function nm(e,t,i){let r=e.name,a=r.length;for(bo.lastIndex=0;;){let s=bo.exec(r),n=bo.lastIndex,o=s[1],u=s[2]==="]",h=s[3];if(u&&(o|=0),h===void 0||h==="["&&n+2===a){ih(i,h===void 0?new rm(o,e,t):new am(o,e,t));break}else{let d=i.map[o];d===void 0&&(d=new sm(o),ih(i,d)),i=d}}}var bn=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let a=e.getActiveUniform(t,r);nm(a,e.getUniformLocation(t,a.name),this)}}setValue(e,t,i,r){let a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){let n=t[a],o=i[n.id];o.needsUpdate!==!1&&n.setValue(e,o.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,a=e.length;r!==a;++r){let s=e[r];s.id in t&&i.push(s)}return i}};function rh(e,t,i){let r=e.createShader(t);return e.shaderSource(r,i),e.compileShader(r),r}var om=37297,lm=0;function um(e,t){let i=e.split(`
`),r=[],a=Math.max(t-6,0),s=Math.min(t+6,i.length);for(let n=a;n<s;n++){let o=n+1;r.push(`${o===t?">":" "} ${o}: ${i[n]}`)}return r.join(`
`)}function hm(e){let t=Ke.getPrimaries(Ke.workingColorSpace),i=Ke.getPrimaries(e),r;switch(t===i?r="":t==="p3"&&i==="rec709"?r="LinearDisplayP3ToLinearSRGB":t==="rec709"&&i==="p3"&&(r="LinearSRGBToLinearDisplayP3"),e){case Ct:case Xn:return[r,"LinearTransferOETF"];case Ye:case zl:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",e),[r,"LinearTransferOETF"]}}function ah(e,t,i){let r=e.getShaderParameter(t,e.COMPILE_STATUS),a=e.getShaderInfoLog(t).trim();if(r&&a==="")return"";let s=/ERROR: 0:(\d+)/.exec(a);if(s){let n=parseInt(s[1]);return i.toUpperCase()+`

`+a+`

`+um(e.getShaderSource(t),n)}else return a}function cm(e,t){let i=hm(t);return`vec4 ${e}( vec4 value ) { return ${i[0]}( ${i[1]}( value ) ); }`}function dm(e,t){let i;switch(t){case 1:i="Linear";break;case 2:i="Reinhard";break;case 3:i="OptimizedCineon";break;case 4:i="ACESFilmic";break;case 6:i="AgX";break;case 5:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+e+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}function pm(e){return[e.extensionDerivatives||e.envMapCubeUVHeight||e.bumpMap||e.normalMapTangentSpace||e.clearcoatNormalMap||e.flatShading||e.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(e.extensionShaderTextureLOD||e.envMap||e.transmission)&&e.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ra).join(`
`)}function fm(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ra).join(`
`)}function Am(e){let t=[];for(let i in e){let r=e[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function mm(e,t){let i={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){let s=e.getActiveAttrib(t,a),n=s.name,o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),i[n]={type:s.type,location:e.getAttribLocation(t,n),locationSize:o}}return i}function Ra(e){return e!==""}function sh(e,t){let i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nh(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var gm=/^[ \t]*#include +<([\w\d./]+)>/gm;function dl(e){return e.replace(gm,vm)}var _m=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function vm(e,t){let i=Le[t];if(i===void 0){let r=_m.get(t);if(r!==void 0)i=Le[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw Error("Can not resolve #include <"+t+">")}return dl(i)}var xm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function oh(e){return e.replace(xm,Em)}function Em(e,t,i,r){let a="";for(let s=parseInt(t);s<parseInt(i);s++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function lh(e){let t="precision "+e.precision+` float;
precision `+e.precision+" int;";return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function ym(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===1?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===2?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===3&&(t="SHADOWMAP_TYPE_VSM"),t}function Sm(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case 301:case 302:t="ENVMAP_TYPE_CUBE";break;case 306:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Cm(e){let t="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===302&&(t="ENVMAP_MODE_REFRACTION"),t}function Mm(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case 0:t="ENVMAP_BLENDING_MULTIPLY";break;case 1:t="ENVMAP_BLENDING_MIX";break;case 2:t="ENVMAP_BLENDING_ADD";break}return t}function Im(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**i,112)),texelHeight:r,maxMip:i}}function Tm(e,t,i,r){let a=e.getContext(),s=i.defines,n=i.vertexShader,o=i.fragmentShader,u=ym(i),h=Sm(i),d=Cm(i),l=Mm(i),c=Im(i),p=i.isWebGL2?"":pm(i),f=fm(i),m=Am(s),g=a.createProgram(),A,_,v=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(A=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,m].filter(Ra).join(`
`),A.length>0&&(A+=`
`),_=[p,"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,m].filter(Ra).join(`
`),_.length>0&&(_+=`
`)):(A=[lh(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,m,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors&&i.isWebGL2?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0&&i.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",i.morphTargetsCount>0&&i.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0&&i.isWebGL2?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+u:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.useLegacyLights?"#define LEGACY_LIGHTS":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.logarithmicDepthBuffer&&i.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ra).join(`
`),_=[p,lh(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,m,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.envMap?"#define "+d:"",i.envMap?"#define "+l:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+u:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.useLegacyLights?"#define LEGACY_LIGHTS":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.logarithmicDepthBuffer&&i.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping===0?"":"#define TONE_MAPPING",i.toneMapping===0?"":Le.tonemapping_pars_fragment,i.toneMapping===0?"":dm("toneMapping",i.toneMapping),i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Le.colorspace_pars_fragment,cm("linearToOutputTexel",i.outputColorSpace),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Ra).join(`
`)),n=dl(n),n=sh(n,i),n=nh(n,i),o=dl(o),o=sh(o,i),o=nh(o,i),n=oh(n),o=oh(o),i.isWebGL2&&i.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,A=[f,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+A,_=["precision mediump sampler2DArray;","#define varying in",i.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let x=v+A+n,C=v+_+o,y=rh(a,a.VERTEX_SHADER,x),T=rh(a,a.FRAGMENT_SHADER,C);a.attachShader(g,y),a.attachShader(g,T),i.index0AttributeName===void 0?i.morphTargets===!0&&a.bindAttribLocation(g,0,"position"):a.bindAttribLocation(g,0,i.index0AttributeName),a.linkProgram(g);function b(G){if(e.debug.checkShaderErrors){let X=a.getProgramInfoLog(g).trim(),R=a.getShaderInfoLog(y).trim(),D=a.getShaderInfoLog(T).trim(),N=!0,z=!0;if(a.getProgramParameter(g,a.LINK_STATUS)===!1)if(N=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,g,y,T);else{let Y=ah(a,y,"vertex"),W=ah(a,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(g,a.VALIDATE_STATUS)+`

Program Info Log: `+X+`
`+Y+`
`+W)}else X===""?(R===""||D==="")&&(z=!1):console.warn("THREE.WebGLProgram: Program Info Log:",X);z&&(G.diagnostics={runnable:N,programLog:X,vertexShader:{log:R,prefix:A},fragmentShader:{log:D,prefix:_}})}a.deleteShader(y),a.deleteShader(T),E=new bn(a,g),I=mm(a,g)}let E;this.getUniforms=function(){return E===void 0&&b(this),E};let I;this.getAttributes=function(){return I===void 0&&b(this),I};let B=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=a.getProgramParameter(g,om)),B},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(g),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=lm++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=T,this}var wm=0,bm=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Bm(e),t.set(e,i)),i}},Bm=class{constructor(e){this.id=wm++,this.code=e,this.usedTimes=0}};function Rm(e,t,i,r,a,s,n){let o=new Yc,u=new bm,h=[],d=a.isWebGL2,l=a.logarithmicDepthBuffer,c=a.vertexTextures,p=a.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(E){return E===0?"uv":`uv${E}`}function g(E,I,B,G,X){let R=G.fog,D=X.geometry,N=E.isMeshStandardMaterial?G.environment:null,z=(E.isMeshStandardMaterial?i:t).get(E.envMap||N),Y=z&&z.mapping===306?z.image.height:null,W=f[E.type];E.precision!==null&&(p=a.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let J=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,K=J===void 0?0:J.length,U=0;D.morphAttributes.position!==void 0&&(U=1),D.morphAttributes.normal!==void 0&&(U=2),D.morphAttributes.color!==void 0&&(U=3);let j,re,ce,ge;if(W){let xt=Qi[W];j=xt.vertexShader,re=xt.fragmentShader}else j=E.vertexShader,re=E.fragmentShader,u.update(E),ce=u.getVertexShaderID(E),ge=u.getFragmentShaderID(E);let _e=e.getRenderTarget(),Me=X.isInstancedMesh===!0,Ce=X.isBatchedMesh===!0,De=!!E.map,O=!!E.matcap,vt=!!z,Ge=!!E.aoMap,de=!!E.lightMap,Ee=!!E.bumpMap,Te=!!E.normalMap,Re=!!E.displacementMap,Pe=!!E.emissiveMap,w=!!E.metalnessMap,S=!!E.roughnessMap,k=E.anisotropy>0,ie=E.clearcoat>0,$=E.iridescence>0,ee=E.sheen>0,Ae=E.transmission>0,Q=k&&!!E.anisotropyMap,Z=ie&&!!E.clearcoatMap,ue=ie&&!!E.clearcoatNormalMap,ve=ie&&!!E.clearcoatRoughnessMap,te=$&&!!E.iridescenceMap,tt=$&&!!E.iridescenceThicknessMap,Qe=ee&&!!E.sheenColorMap,we=ee&&!!E.sheenRoughnessMap,fe=!!E.specularMap,pe=!!E.specularColorMap,Oe=!!E.specularIntensityMap,it=Ae&&!!E.transmissionMap,Xe=Ae&&!!E.thicknessMap,rt=!!E.gradientMap,ae=!!E.alphaMap,L=E.alphaTest>0,se=!!E.alphaHash,he=!!E.extensions,be=!!D.attributes.uv1,xe=!!D.attributes.uv2,at=!!D.attributes.uv3,ut=0;return E.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(ut=e.toneMapping),{isWebGL2:d,shaderID:W,shaderType:E.type,shaderName:E.name,vertexShader:j,fragmentShader:re,defines:E.defines,customVertexShaderID:ce,customFragmentShaderID:ge,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Ce,instancing:Me,instancingColor:Me&&X.instanceColor!==null,supportsVertexTextures:c,outputColorSpace:_e===null?e.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:Ct,map:De,matcap:O,envMap:vt,envMapMode:vt&&z.mapping,envMapCubeUVHeight:Y,aoMap:Ge,lightMap:de,bumpMap:Ee,normalMap:Te,displacementMap:c&&Re,emissiveMap:Pe,normalMapObjectSpace:Te&&E.normalMapType===1,normalMapTangentSpace:Te&&E.normalMapType===0,metalnessMap:w,roughnessMap:S,anisotropy:k,anisotropyMap:Q,clearcoat:ie,clearcoatMap:Z,clearcoatNormalMap:ue,clearcoatRoughnessMap:ve,iridescence:$,iridescenceMap:te,iridescenceThicknessMap:tt,sheen:ee,sheenColorMap:Qe,sheenRoughnessMap:we,specularMap:fe,specularColorMap:pe,specularIntensityMap:Oe,transmission:Ae,transmissionMap:it,thicknessMap:Xe,gradientMap:rt,opaque:E.transparent===!1&&E.blending===1,alphaMap:ae,alphaTest:L,alphaHash:se,combine:E.combine,mapUv:De&&m(E.map.channel),aoMapUv:Ge&&m(E.aoMap.channel),lightMapUv:de&&m(E.lightMap.channel),bumpMapUv:Ee&&m(E.bumpMap.channel),normalMapUv:Te&&m(E.normalMap.channel),displacementMapUv:Re&&m(E.displacementMap.channel),emissiveMapUv:Pe&&m(E.emissiveMap.channel),metalnessMapUv:w&&m(E.metalnessMap.channel),roughnessMapUv:S&&m(E.roughnessMap.channel),anisotropyMapUv:Q&&m(E.anisotropyMap.channel),clearcoatMapUv:Z&&m(E.clearcoatMap.channel),clearcoatNormalMapUv:ue&&m(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(E.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&m(E.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&m(E.iridescenceThicknessMap.channel),sheenColorMapUv:Qe&&m(E.sheenColorMap.channel),sheenRoughnessMapUv:we&&m(E.sheenRoughnessMap.channel),specularMapUv:fe&&m(E.specularMap.channel),specularColorMapUv:pe&&m(E.specularColorMap.channel),specularIntensityMapUv:Oe&&m(E.specularIntensityMap.channel),transmissionMapUv:it&&m(E.transmissionMap.channel),thicknessMapUv:Xe&&m(E.thicknessMap.channel),alphaMapUv:ae&&m(E.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Te||k),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,vertexUv1s:be,vertexUv2s:xe,vertexUv3s:at,pointsUvs:X.isPoints===!0&&!!D.attributes.uv&&(De||ae),fog:!!R,useFog:E.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:l,skinning:X.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:U,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numClippingPlanes:n.numPlanes,numClipIntersection:n.numIntersection,dithering:E.dithering,shadowMapEnabled:e.shadowMap.enabled&&B.length>0,shadowMapType:e.shadowMap.type,toneMapping:ut,useLegacyLights:e._useLegacyLights,decodeVideoTexture:De&&E.map.isVideoTexture===!0&&Ke.getTransfer(E.map.colorSpace)==="srgb",premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===2,flipSided:E.side===1,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:he&&E.extensions.derivatives===!0,extensionFragDepth:he&&E.extensions.fragDepth===!0,extensionDrawBuffers:he&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:he&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:he&&E.extensions.clipCullDistance&&r.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||r.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||r.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||r.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function A(E){let I=[];if(E.shaderID?I.push(E.shaderID):(I.push(E.customVertexShaderID),I.push(E.customFragmentShaderID)),E.defines!==void 0)for(let B in E.defines)I.push(B),I.push(E.defines[B]);return E.isRawShaderMaterial===!1&&(_(I,E),v(I,E),I.push(e.outputColorSpace)),I.push(E.customProgramCacheKey),I.join()}function _(E,I){E.push(I.precision),E.push(I.outputColorSpace),E.push(I.envMapMode),E.push(I.envMapCubeUVHeight),E.push(I.mapUv),E.push(I.alphaMapUv),E.push(I.lightMapUv),E.push(I.aoMapUv),E.push(I.bumpMapUv),E.push(I.normalMapUv),E.push(I.displacementMapUv),E.push(I.emissiveMapUv),E.push(I.metalnessMapUv),E.push(I.roughnessMapUv),E.push(I.anisotropyMapUv),E.push(I.clearcoatMapUv),E.push(I.clearcoatNormalMapUv),E.push(I.clearcoatRoughnessMapUv),E.push(I.iridescenceMapUv),E.push(I.iridescenceThicknessMapUv),E.push(I.sheenColorMapUv),E.push(I.sheenRoughnessMapUv),E.push(I.specularMapUv),E.push(I.specularColorMapUv),E.push(I.specularIntensityMapUv),E.push(I.transmissionMapUv),E.push(I.thicknessMapUv),E.push(I.combine),E.push(I.fogExp2),E.push(I.sizeAttenuation),E.push(I.morphTargetsCount),E.push(I.morphAttributeCount),E.push(I.numDirLights),E.push(I.numPointLights),E.push(I.numSpotLights),E.push(I.numSpotLightMaps),E.push(I.numHemiLights),E.push(I.numRectAreaLights),E.push(I.numDirLightShadows),E.push(I.numPointLightShadows),E.push(I.numSpotLightShadows),E.push(I.numSpotLightShadowsWithMaps),E.push(I.numLightProbes),E.push(I.shadowMapType),E.push(I.toneMapping),E.push(I.numClippingPlanes),E.push(I.numClipIntersection),E.push(I.depthPacking)}function v(E,I){o.disableAll(),I.isWebGL2&&o.enable(0),I.supportsVertexTextures&&o.enable(1),I.instancing&&o.enable(2),I.instancingColor&&o.enable(3),I.matcap&&o.enable(4),I.envMap&&o.enable(5),I.normalMapObjectSpace&&o.enable(6),I.normalMapTangentSpace&&o.enable(7),I.clearcoat&&o.enable(8),I.iridescence&&o.enable(9),I.alphaTest&&o.enable(10),I.vertexColors&&o.enable(11),I.vertexAlphas&&o.enable(12),I.vertexUv1s&&o.enable(13),I.vertexUv2s&&o.enable(14),I.vertexUv3s&&o.enable(15),I.vertexTangents&&o.enable(16),I.anisotropy&&o.enable(17),I.alphaHash&&o.enable(18),I.batching&&o.enable(19),E.push(o.mask),o.disableAll(),I.fog&&o.enable(0),I.useFog&&o.enable(1),I.flatShading&&o.enable(2),I.logarithmicDepthBuffer&&o.enable(3),I.skinning&&o.enable(4),I.morphTargets&&o.enable(5),I.morphNormals&&o.enable(6),I.morphColors&&o.enable(7),I.premultipliedAlpha&&o.enable(8),I.shadowMapEnabled&&o.enable(9),I.useLegacyLights&&o.enable(10),I.doubleSided&&o.enable(11),I.flipSided&&o.enable(12),I.useDepthPacking&&o.enable(13),I.dithering&&o.enable(14),I.transmission&&o.enable(15),I.sheen&&o.enable(16),I.opaque&&o.enable(17),I.pointsUvs&&o.enable(18),I.decodeVideoTexture&&o.enable(19),E.push(o.mask)}function x(E){let I=f[E.type],B;if(I){let G=Qi[I];B=td.clone(G.uniforms)}else B=E.uniforms;return B}function C(E,I){let B;for(let G=0,X=h.length;G<X;G++){let R=h[G];if(R.cacheKey===I){B=R,++B.usedTimes;break}}return B===void 0&&(B=new Tm(e,I,E,s),h.push(B)),B}function y(E){if(--E.usedTimes===0){let I=h.indexOf(E);h[I]=h[h.length-1],h.pop(),E.destroy()}}function T(E){u.remove(E)}function b(){u.dispose()}return{getParameters:g,getProgramCacheKey:A,getUniforms:x,acquireProgram:C,releaseProgram:y,releaseShaderCache:T,programs:h,dispose:b}}function Pm(){let e=new WeakMap;function t(s){let n=e.get(s);return n===void 0&&(n={},e.set(s,n)),n}function i(s){e.delete(s)}function r(s,n,o){e.get(s)[n]=o}function a(){e=new WeakMap}return{get:t,remove:i,update:r,dispose:a}}function Lm(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function uh(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function hh(){let e=[],t=0,i=[],r=[],a=[];function s(){t=0,i.length=0,r.length=0,a.length=0}function n(l,c,p,f,m,g){let A=e[t];return A===void 0?(A={id:l.id,object:l,geometry:c,material:p,groupOrder:f,renderOrder:l.renderOrder,z:m,group:g},e[t]=A):(A.id=l.id,A.object=l,A.geometry=c,A.material=p,A.groupOrder=f,A.renderOrder=l.renderOrder,A.z=m,A.group=g),t++,A}function o(l,c,p,f,m,g){let A=n(l,c,p,f,m,g);p.transmission>0?r.push(A):p.transparent===!0?a.push(A):i.push(A)}function u(l,c,p,f,m,g){let A=n(l,c,p,f,m,g);p.transmission>0?r.unshift(A):p.transparent===!0?a.unshift(A):i.unshift(A)}function h(l,c){i.length>1&&i.sort(l||Lm),r.length>1&&r.sort(c||uh),a.length>1&&a.sort(c||uh)}function d(){for(let l=t,c=e.length;l<c;l++){let p=e[l];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:i,transmissive:r,transparent:a,init:s,push:o,unshift:u,finish:d,sort:h}}function Dm(){let e=new WeakMap;function t(r,a){let s=e.get(r),n;return s===void 0?(n=new hh,e.set(r,[n])):a>=s.length?(n=new hh,s.push(n)):n=s[a],n}function i(){e=new WeakMap}return{get:t,dispose:i}}function Um(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new P,color:new ye};break;case"SpotLight":i={position:new P,direction:new P,color:new ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new P,color:new ye,distance:0,decay:0};break;case"HemisphereLight":i={direction:new P,skyColor:new ye,groundColor:new ye};break;case"RectAreaLight":i={color:new ye,position:new P,halfWidth:new P,halfHeight:new P};break}return e[t.id]=i,i}}}function Nm(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":i={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":i={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=i,i}}}var Fm=0;function Qm(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Om(e,t){let i=new Um,r=Nm(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)a.probe.push(new P);let s=new P,n=new ke,o=new ke;function u(d,l){let c=0,p=0,f=0;for(let G=0;G<9;G++)a.probe[G].set(0,0,0);let m=0,g=0,A=0,_=0,v=0,x=0,C=0,y=0,T=0,b=0,E=0;d.sort(Qm);let I=l===!0?Math.PI:1;for(let G=0,X=d.length;G<X;G++){let R=d[G],D=R.color,N=R.intensity,z=R.distance,Y=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)c+=D.r*N*I,p+=D.g*N*I,f+=D.b*N*I;else if(R.isLightProbe){for(let W=0;W<9;W++)a.probe[W].addScaledVector(R.sh.coefficients[W],N);E++}else if(R.isDirectionalLight){let W=i.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity*I),R.castShadow){let J=R.shadow,K=r.get(R);K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,a.directionalShadow[m]=K,a.directionalShadowMap[m]=Y,a.directionalShadowMatrix[m]=R.shadow.matrix,x++}a.directional[m]=W,m++}else if(R.isSpotLight){let W=i.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(D).multiplyScalar(N*I),W.distance=z,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,a.spot[A]=W;let J=R.shadow;if(R.map&&(a.spotLightMap[T]=R.map,T++,J.updateMatrices(R),R.castShadow&&b++),a.spotLightMatrix[A]=J.matrix,R.castShadow){let K=r.get(R);K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,a.spotShadow[A]=K,a.spotShadowMap[A]=Y,y++}A++}else if(R.isRectAreaLight){let W=i.get(R);W.color.copy(D).multiplyScalar(N),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),a.rectArea[_]=W,_++}else if(R.isPointLight){let W=i.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity*I),W.distance=R.distance,W.decay=R.decay,R.castShadow){let J=R.shadow,K=r.get(R);K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,K.shadowCameraNear=J.camera.near,K.shadowCameraFar=J.camera.far,a.pointShadow[g]=K,a.pointShadowMap[g]=Y,a.pointShadowMatrix[g]=R.shadow.matrix,C++}a.point[g]=W,g++}else if(R.isHemisphereLight){let W=i.get(R);W.skyColor.copy(R.color).multiplyScalar(N*I),W.groundColor.copy(R.groundColor).multiplyScalar(N*I),a.hemi[v]=W,v++}}_>0&&(t.isWebGL2?e.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=ne.LTC_FLOAT_1,a.rectAreaLTC2=ne.LTC_FLOAT_2):(a.rectAreaLTC1=ne.LTC_HALF_1,a.rectAreaLTC2=ne.LTC_HALF_2):e.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=ne.LTC_FLOAT_1,a.rectAreaLTC2=ne.LTC_FLOAT_2):e.has("OES_texture_half_float_linear")===!0?(a.rectAreaLTC1=ne.LTC_HALF_1,a.rectAreaLTC2=ne.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),a.ambient[0]=c,a.ambient[1]=p,a.ambient[2]=f;let B=a.hash;(B.directionalLength!==m||B.pointLength!==g||B.spotLength!==A||B.rectAreaLength!==_||B.hemiLength!==v||B.numDirectionalShadows!==x||B.numPointShadows!==C||B.numSpotShadows!==y||B.numSpotMaps!==T||B.numLightProbes!==E)&&(a.directional.length=m,a.spot.length=A,a.rectArea.length=_,a.point.length=g,a.hemi.length=v,a.directionalShadow.length=x,a.directionalShadowMap.length=x,a.pointShadow.length=C,a.pointShadowMap.length=C,a.spotShadow.length=y,a.spotShadowMap.length=y,a.directionalShadowMatrix.length=x,a.pointShadowMatrix.length=C,a.spotLightMatrix.length=y+T-b,a.spotLightMap.length=T,a.numSpotLightShadowsWithMaps=b,a.numLightProbes=E,B.directionalLength=m,B.pointLength=g,B.spotLength=A,B.rectAreaLength=_,B.hemiLength=v,B.numDirectionalShadows=x,B.numPointShadows=C,B.numSpotShadows=y,B.numSpotMaps=T,B.numLightProbes=E,a.version=Fm++)}function h(d,l){let c=0,p=0,f=0,m=0,g=0,A=l.matrixWorldInverse;for(let _=0,v=d.length;_<v;_++){let x=d[_];if(x.isDirectionalLight){let C=a.directional[c];C.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(A),c++}else if(x.isSpotLight){let C=a.spot[f];C.position.setFromMatrixPosition(x.matrixWorld),C.position.applyMatrix4(A),C.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(A),f++}else if(x.isRectAreaLight){let C=a.rectArea[m];C.position.setFromMatrixPosition(x.matrixWorld),C.position.applyMatrix4(A),o.identity(),n.copy(x.matrixWorld),n.premultiply(A),o.extractRotation(n),C.halfWidth.set(x.width*.5,0,0),C.halfHeight.set(0,x.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){let C=a.point[p];C.position.setFromMatrixPosition(x.matrixWorld),C.position.applyMatrix4(A),p++}else if(x.isHemisphereLight){let C=a.hemi[g];C.direction.setFromMatrixPosition(x.matrixWorld),C.direction.transformDirection(A),g++}}}return{setup:u,setupView:h,state:a}}function ch(e,t){let i=new Om(e,t),r=[],a=[];function s(){r.length=0,a.length=0}function n(d){r.push(d)}function o(d){a.push(d)}function u(d){i.setup(r,d)}function h(d){i.setupView(r,d)}return{init:s,state:{lightsArray:r,shadowsArray:a,lights:i},setupLights:u,setupLightsView:h,pushLight:n,pushShadow:o}}function km(e,t){let i=new WeakMap;function r(s,n=0){let o=i.get(s),u;return o===void 0?(u=new ch(e,t),i.set(s,[u])):n>=o.length?(u=new ch(e,t),o.push(u)):u=o[n],u}function a(){i=new WeakMap}return{get:r,dispose:a}}var Gm=class extends zi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Hm=class extends zi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},zm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Wm(e,t,i){let r=new ql,a=new oe,s=new oe,n=new et,o=new Gm({depthPacking:pf}),u=new Hm,h={},d=i.maxTextureSize,l={0:1,1:0,2:2},c=new lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:zm,fragmentShader:Vm}),p=c.clone();p.defines.HORIZONTAL_PASS=1;let f=new ni;f.setAttribute("position",new ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new dt(f,c),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let A=this.type;this.render=function(y,T,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||y.length===0)return;let E=e.getRenderTarget(),I=e.getActiveCubeFace(),B=e.getActiveMipmapLevel(),G=e.state;G.setBlending(0),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let X=A!==3&&this.type===3,R=A===3&&this.type!==3;for(let D=0,N=y.length;D<N;D++){let z=y[D],Y=z.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;a.copy(Y.mapSize);let W=Y.getFrameExtents();if(a.multiply(W),s.copy(Y.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(s.x=Math.floor(d/W.x),a.x=s.x*W.x,Y.mapSize.x=s.x),a.y>d&&(s.y=Math.floor(d/W.y),a.y=s.y*W.y,Y.mapSize.y=s.y)),Y.map===null||X===!0||R===!0){let K=this.type===3?{}:{minFilter:si,magFilter:si};Y.map!==null&&Y.map.dispose(),Y.map=new jt(a.x,a.y,K),Y.map.texture.name=z.name+".shadowMap",Y.camera.updateProjectionMatrix()}e.setRenderTarget(Y.map),e.clear();let J=Y.getViewportCount();for(let K=0;K<J;K++){let U=Y.getViewport(K);n.set(s.x*U.x,s.y*U.y,s.x*U.z,s.y*U.w),G.viewport(n),Y.updateMatrices(z,K),r=Y.getFrustum(),x(T,b,Y.camera,z,this.type)}Y.isPointLightShadow!==!0&&this.type===3&&_(Y,b),Y.needsUpdate=!1}A=this.type,g.needsUpdate=!1,e.setRenderTarget(E,I,B)};function _(y,T){let b=t.update(m);c.defines.VSM_SAMPLES!==y.blurSamples&&(c.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,c.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new jt(a.x,a.y)),c.uniforms.shadow_pass.value=y.map.texture,c.uniforms.resolution.value=y.mapSize,c.uniforms.radius.value=y.radius,e.setRenderTarget(y.mapPass),e.clear(),e.renderBufferDirect(T,null,b,c,m,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,e.setRenderTarget(y.map),e.clear(),e.renderBufferDirect(T,null,b,p,m,null)}function v(y,T,b,E){let I=null,B=b.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(B!==void 0)I=B;else if(I=b.isPointLight===!0?u:o,e.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){let G=I.uuid,X=T.uuid,R=h[G];R===void 0&&(R={},h[G]=R);let D=R[X];D===void 0&&(D=I.clone(),R[X]=D,T.addEventListener("dispose",C)),I=D}if(I.visible=T.visible,I.wireframe=T.wireframe,E===3?I.side=T.shadowSide===null?T.side:T.shadowSide:I.side=T.shadowSide===null?l[T.side]:T.shadowSide,I.alphaMap=T.alphaMap,I.alphaTest=T.alphaTest,I.map=T.map,I.clipShadows=T.clipShadows,I.clippingPlanes=T.clippingPlanes,I.clipIntersection=T.clipIntersection,I.displacementMap=T.displacementMap,I.displacementScale=T.displacementScale,I.displacementBias=T.displacementBias,I.wireframeLinewidth=T.wireframeLinewidth,I.linewidth=T.linewidth,b.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let G=e.properties.get(I);G.light=b}return I}function x(y,T,b,E,I){if(y.visible===!1)return;if(y.layers.test(T.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&I===3)&&(!y.frustumCulled||r.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,y.matrixWorld);let G=t.update(y),X=y.material;if(Array.isArray(X)){let R=G.groups;for(let D=0,N=R.length;D<N;D++){let z=R[D],Y=X[z.materialIndex];if(Y&&Y.visible){let W=v(y,Y,E,I);y.onBeforeShadow(e,y,T,b,G,W,z),e.renderBufferDirect(b,null,G,W,y,z),y.onAfterShadow(e,y,T,b,G,W,z)}}}else if(X.visible){let R=v(y,X,E,I);y.onBeforeShadow(e,y,T,b,G,R,null),e.renderBufferDirect(b,null,G,R,y,null),y.onAfterShadow(e,y,T,b,G,R,null)}}let B=y.children;for(let G=0,X=B.length;G<X;G++)x(B[G],T,b,E,I)}function C(y){y.target.removeEventListener("dispose",C);for(let T in h){let b=h[T],E=y.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}function qm(e,t,i){let r=i.isWebGL2;function a(){let L=!1,se=new et,he=null,be=new et(0,0,0,0);return{setMask:function(xe){he!==xe&&!L&&(e.colorMask(xe,xe,xe,xe),he=xe)},setLocked:function(xe){L=xe},setClear:function(xe,at,ut,xt,mi){mi===!0&&(xe*=xt,at*=xt,ut*=xt),se.set(xe,at,ut,xt),be.equals(se)===!1&&(e.clearColor(xe,at,ut,xt),be.copy(se))},reset:function(){L=!1,he=null,be.set(-1,0,0,0)}}}function s(){let L=!1,se=null,he=null,be=null;return{setTest:function(xe){xe?Ce(e.DEPTH_TEST):De(e.DEPTH_TEST)},setMask:function(xe){se!==xe&&!L&&(e.depthMask(xe),se=xe)},setFunc:function(xe){if(he!==xe){switch(xe){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}he=xe}},setLocked:function(xe){L=xe},setClear:function(xe){be!==xe&&(e.clearDepth(xe),be=xe)},reset:function(){L=!1,se=null,he=null,be=null}}}function n(){let L=!1,se=null,he=null,be=null,xe=null,at=null,ut=null,xt=null,mi=null;return{setTest:function(je){L||(je?Ce(e.STENCIL_TEST):De(e.STENCIL_TEST))},setMask:function(je){se!==je&&!L&&(e.stencilMask(je),se=je)},setFunc:function(je,Ni,Fi){(he!==je||be!==Ni||xe!==Fi)&&(e.stencilFunc(je,Ni,Fi),he=je,be=Ni,xe=Fi)},setOp:function(je,Ni,Fi){(at!==je||ut!==Ni||xt!==Fi)&&(e.stencilOp(je,Ni,Fi),at=je,ut=Ni,xt=Fi)},setLocked:function(je){L=je},setClear:function(je){mi!==je&&(e.clearStencil(je),mi=je)},reset:function(){L=!1,se=null,he=null,be=null,xe=null,at=null,ut=null,xt=null,mi=null}}}let o=new a,u=new s,h=new n,d=new WeakMap,l=new WeakMap,c={},p={},f=new WeakMap,m=[],g=null,A=!1,_=null,v=null,x=null,C=null,y=null,T=null,b=null,E=new ye(0,0,0),I=0,B=!1,G=null,X=null,R=null,D=null,N=null,z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,W=0,J=e.getParameter(e.VERSION);J.indexOf("WebGL")===-1?J.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),Y=W>=2):(W=parseFloat(/^WebGL (\d)/.exec(J)[1]),Y=W>=1);let K=null,U={},j=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),ce=new et().fromArray(j),ge=new et().fromArray(re);function _e(L,se,he,be){let xe=new Uint8Array(4),at=e.createTexture();e.bindTexture(L,at),e.texParameteri(L,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(L,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ut=0;ut<he;ut++)r&&(L===e.TEXTURE_3D||L===e.TEXTURE_2D_ARRAY)?e.texImage3D(se,0,e.RGBA,1,1,be,0,e.RGBA,e.UNSIGNED_BYTE,xe):e.texImage2D(se+ut,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,xe);return at}let Me={};Me[e.TEXTURE_2D]=_e(e.TEXTURE_2D,e.TEXTURE_2D,1),Me[e.TEXTURE_CUBE_MAP]=_e(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(Me[e.TEXTURE_2D_ARRAY]=_e(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Me[e.TEXTURE_3D]=_e(e.TEXTURE_3D,e.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),u.setClear(1),h.setClear(0),Ce(e.DEPTH_TEST),u.setFunc(3),Pe(!1),w(1),Ce(e.CULL_FACE),Te(0);function Ce(L){c[L]!==!0&&(e.enable(L),c[L]=!0)}function De(L){c[L]!==!1&&(e.disable(L),c[L]=!1)}function O(L,se){return p[L]===se?!1:(e.bindFramebuffer(L,se),p[L]=se,r&&(L===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=se),L===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=se)),!0)}function vt(L,se){let he=m,be=!1;if(L)if(he=f.get(se),he===void 0&&(he=[],f.set(se,he)),L.isWebGLMultipleRenderTargets){let xe=L.texture;if(he.length!==xe.length||he[0]!==e.COLOR_ATTACHMENT0){for(let at=0,ut=xe.length;at<ut;at++)he[at]=e.COLOR_ATTACHMENT0+at;he.length=xe.length,be=!0}}else he[0]!==e.COLOR_ATTACHMENT0&&(he[0]=e.COLOR_ATTACHMENT0,be=!0);else he[0]!==e.BACK&&(he[0]=e.BACK,be=!0);be&&(i.isWebGL2?e.drawBuffers(he):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(he))}function Ge(L){return g===L?!1:(e.useProgram(L),g=L,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};if(r)de[103]=e.MIN,de[104]=e.MAX;else{let L=t.get("EXT_blend_minmax");L!==null&&(de[103]=L.MIN_EXT,de[104]=L.MAX_EXT)}let Ee={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function Te(L,se,he,be,xe,at,ut,xt,mi,je){if(L===0){A===!0&&(De(e.BLEND),A=!1);return}if(A===!1&&(Ce(e.BLEND),A=!0),L!==5){if(L!==_||je!==B){if((v!==100||y!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,y=100),je)switch(L){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}x=null,C=null,T=null,b=null,E.set(0,0,0),I=0,_=L,B=je}return}xe||(xe=se),at||(at=he),ut||(ut=be),(se!==v||xe!==y)&&(e.blendEquationSeparate(de[se],de[xe]),v=se,y=xe),(he!==x||be!==C||at!==T||ut!==b)&&(e.blendFuncSeparate(Ee[he],Ee[be],Ee[at],Ee[ut]),x=he,C=be,T=at,b=ut),(xt.equals(E)===!1||mi!==I)&&(e.blendColor(xt.r,xt.g,xt.b,mi),E.copy(xt),I=mi),_=L,B=!1}function Re(L,se){L.side===2?De(e.CULL_FACE):Ce(e.CULL_FACE);let he=L.side===1;se&&(he=!he),Pe(he),L.blending===1&&L.transparent===!1?Te(0):Te(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),u.setFunc(L.depthFunc),u.setTest(L.depthTest),u.setMask(L.depthWrite),o.setMask(L.colorWrite);let be=L.stencilWrite;h.setTest(be),be&&(h.setMask(L.stencilWriteMask),h.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),h.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),k(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Ce(e.SAMPLE_ALPHA_TO_COVERAGE):De(e.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(L){G!==L&&(L?e.frontFace(e.CW):e.frontFace(e.CCW),G=L)}function w(L){L===0?De(e.CULL_FACE):(Ce(e.CULL_FACE),L!==X&&(L===1?e.cullFace(e.BACK):L===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),X=L}function S(L){L!==R&&(Y&&e.lineWidth(L),R=L)}function k(L,se,he){L?(Ce(e.POLYGON_OFFSET_FILL),(D!==se||N!==he)&&(e.polygonOffset(se,he),D=se,N=he)):De(e.POLYGON_OFFSET_FILL)}function ie(L){L?Ce(e.SCISSOR_TEST):De(e.SCISSOR_TEST)}function $(L){L===void 0&&(L=e.TEXTURE0+z-1),K!==L&&(e.activeTexture(L),K=L)}function ee(L,se,he){he===void 0&&(he=K===null?e.TEXTURE0+z-1:K);let be=U[he];be===void 0&&(be={type:void 0,texture:void 0},U[he]=be),(be.type!==L||be.texture!==se)&&(K!==he&&(e.activeTexture(he),K=he),e.bindTexture(L,se||Me[L]),be.type=L,be.texture=se)}function Ae(){let L=U[K];L!==void 0&&L.type!==void 0&&(e.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Q(){try{e.compressedTexImage2D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{e.compressedTexImage3D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{e.texSubImage2D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{e.texSubImage3D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Qe(){try{e.texStorage2D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function we(){try{e.texStorage3D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{e.texImage2D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(){try{e.texImage3D.apply(e,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(L){ce.equals(L)===!1&&(e.scissor(L.x,L.y,L.z,L.w),ce.copy(L))}function it(L){ge.equals(L)===!1&&(e.viewport(L.x,L.y,L.z,L.w),ge.copy(L))}function Xe(L,se){let he=l.get(se);he===void 0&&(he=new WeakMap,l.set(se,he));let be=he.get(L);be===void 0&&(be=e.getUniformBlockIndex(se,L.name),he.set(L,be))}function rt(L,se){let he=l.get(se).get(L);d.get(se)!==he&&(e.uniformBlockBinding(se,he,L.__bindingPointIndex),d.set(se,he))}function ae(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),r===!0&&(e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),c={},K=null,U={},p={},f=new WeakMap,m=[],g=null,A=!1,_=null,v=null,x=null,C=null,y=null,T=null,b=null,E=new ye(0,0,0),I=0,B=!1,G=null,X=null,R=null,D=null,N=null,ce.set(0,0,e.canvas.width,e.canvas.height),ge.set(0,0,e.canvas.width,e.canvas.height),o.reset(),u.reset(),h.reset()}return{buffers:{color:o,depth:u,stencil:h},enable:Ce,disable:De,bindFramebuffer:O,drawBuffers:vt,useProgram:Ge,setBlending:Te,setMaterial:Re,setFlipSided:Pe,setCullFace:w,setLineWidth:S,setPolygonOffset:k,setScissorTest:ie,activeTexture:$,bindTexture:ee,unbindTexture:Ae,compressedTexImage2D:Q,compressedTexImage3D:Z,texImage2D:fe,texImage3D:pe,updateUBOMapping:Xe,uniformBlockBinding:rt,texStorage2D:Qe,texStorage3D:we,texSubImage2D:ue,texSubImage3D:ve,compressedTexSubImage2D:te,compressedTexSubImage3D:tt,scissor:Oe,viewport:it,reset:ae}}function Xm(e,t,i,r,a,s,n){let o=a.isWebGL2,u=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap,l,c=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(w,S){return p?new OffscreenCanvas(w,S):ws("canvas")}function m(w,S,k,ie){let $=1;if((w.width>ie||w.height>ie)&&($=ie/Math.max(w.width,w.height)),$<1||S===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){let ee=S?Qn:Math.floor,Ae=ee($*w.width),Q=ee($*w.height);l===void 0&&(l=f(Ae,Q));let Z=k?f(Ae,Q):l;return Z.width=Ae,Z.height=Q,Z.getContext("2d").drawImage(w,0,0,Ae,Q),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+Ae+"x"+Q+")."),Z}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function g(w){return hl(w.width)&&hl(w.height)}function A(w){return o?!1:w.wrapS!==1001||w.wrapT!==1001||w.minFilter!==1003&&w.minFilter!==1006}function _(w,S){return w.generateMipmaps&&S&&w.minFilter!==1003&&w.minFilter!==1006}function v(w){e.generateMipmap(w)}function x(w,S,k,ie,$=!1){if(o===!1)return S;if(w!==null){if(e[w]!==void 0)return e[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ee=S;if(S===e.RED&&(k===e.FLOAT&&(ee=e.R32F),k===e.HALF_FLOAT&&(ee=e.R16F),k===e.UNSIGNED_BYTE&&(ee=e.R8)),S===e.RED_INTEGER&&(k===e.UNSIGNED_BYTE&&(ee=e.R8UI),k===e.UNSIGNED_SHORT&&(ee=e.R16UI),k===e.UNSIGNED_INT&&(ee=e.R32UI),k===e.BYTE&&(ee=e.R8I),k===e.SHORT&&(ee=e.R16I),k===e.INT&&(ee=e.R32I)),S===e.RG&&(k===e.FLOAT&&(ee=e.RG32F),k===e.HALF_FLOAT&&(ee=e.RG16F),k===e.UNSIGNED_BYTE&&(ee=e.RG8)),S===e.RGBA){let Ae=$?Nn:Ke.getTransfer(ie);k===e.FLOAT&&(ee=e.RGBA32F),k===e.HALF_FLOAT&&(ee=e.RGBA16F),k===e.UNSIGNED_BYTE&&(ee=Ae==="srgb"?e.SRGB8_ALPHA8:e.RGBA8),k===e.UNSIGNED_SHORT_4_4_4_4&&(ee=e.RGBA4),k===e.UNSIGNED_SHORT_5_5_5_1&&(ee=e.RGB5_A1)}return(ee===e.R16F||ee===e.R32F||ee===e.RG16F||ee===e.RG32F||ee===e.RGBA16F||ee===e.RGBA32F)&&t.get("EXT_color_buffer_float"),ee}function C(w,S,k){return _(w,k)===!0||w.isFramebufferTexture&&w.minFilter!==1003&&w.minFilter!==1006?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function y(w){return w===1003||w===1004||w===1005?e.NEAREST:e.LINEAR}function T(w){let S=w.target;S.removeEventListener("dispose",T),E(S),S.isVideoTexture&&d.delete(S)}function b(w){let S=w.target;S.removeEventListener("dispose",b),B(S)}function E(w){let S=r.get(w);if(S.__webglInit===void 0)return;let k=w.source,ie=c.get(k);if(ie){let $=ie[S.__cacheKey];$.usedTimes--,$.usedTimes===0&&I(w),Object.keys(ie).length===0&&c.delete(k)}r.remove(w)}function I(w){let S=r.get(w);e.deleteTexture(S.__webglTexture);let k=w.source,ie=c.get(k);delete ie[S.__cacheKey],n.memory.textures--}function B(w){let S=w.texture,k=r.get(w),ie=r.get(S);if(ie.__webglTexture!==void 0&&(e.deleteTexture(ie.__webglTexture),n.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(k.__webglFramebuffer[$]))for(let ee=0;ee<k.__webglFramebuffer[$].length;ee++)e.deleteFramebuffer(k.__webglFramebuffer[$][ee]);else e.deleteFramebuffer(k.__webglFramebuffer[$]);k.__webglDepthbuffer&&e.deleteRenderbuffer(k.__webglDepthbuffer[$])}else{if(Array.isArray(k.__webglFramebuffer))for(let $=0;$<k.__webglFramebuffer.length;$++)e.deleteFramebuffer(k.__webglFramebuffer[$]);else e.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&e.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&e.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let $=0;$<k.__webglColorRenderbuffer.length;$++)k.__webglColorRenderbuffer[$]&&e.deleteRenderbuffer(k.__webglColorRenderbuffer[$]);k.__webglDepthRenderbuffer&&e.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let $=0,ee=S.length;$<ee;$++){let Ae=r.get(S[$]);Ae.__webglTexture&&(e.deleteTexture(Ae.__webglTexture),n.memory.textures--),r.remove(S[$])}r.remove(S),r.remove(w)}let G=0;function X(){G=0}function R(){let w=G;return w>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+a.maxTextures),G+=1,w}function D(w){let S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function N(w,S){let k=r.get(w);if(w.isVideoTexture&&Re(w),w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){let ie=w.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(k,w,S);return}}i.bindTexture(e.TEXTURE_2D,k.__webglTexture,e.TEXTURE0+S)}function z(w,S){let k=r.get(w);if(w.version>0&&k.__version!==w.version){ce(k,w,S);return}i.bindTexture(e.TEXTURE_2D_ARRAY,k.__webglTexture,e.TEXTURE0+S)}function Y(w,S){let k=r.get(w);if(w.version>0&&k.__version!==w.version){ce(k,w,S);return}i.bindTexture(e.TEXTURE_3D,k.__webglTexture,e.TEXTURE0+S)}function W(w,S){let k=r.get(w);if(w.version>0&&k.__version!==w.version){ge(k,w,S);return}i.bindTexture(e.TEXTURE_CUBE_MAP,k.__webglTexture,e.TEXTURE0+S)}let J={[yi]:e.REPEAT,[Li]:e.CLAMP_TO_EDGE,[Dn]:e.MIRRORED_REPEAT},K={[si]:e.NEAREST,[Bc]:e.NEAREST_MIPMAP_NEAREST,[Rc]:e.NEAREST_MIPMAP_LINEAR,[qe]:e.LINEAR,[Pc]:e.LINEAR_MIPMAP_NEAREST,[$a]:e.LINEAR_MIPMAP_LINEAR},U={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function j(w,S,k){if(k?(e.texParameteri(w,e.TEXTURE_WRAP_S,J[S.wrapS]),e.texParameteri(w,e.TEXTURE_WRAP_T,J[S.wrapT]),(w===e.TEXTURE_3D||w===e.TEXTURE_2D_ARRAY)&&e.texParameteri(w,e.TEXTURE_WRAP_R,J[S.wrapR]),e.texParameteri(w,e.TEXTURE_MAG_FILTER,K[S.magFilter]),e.texParameteri(w,e.TEXTURE_MIN_FILTER,K[S.minFilter])):(e.texParameteri(w,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(w,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),(w===e.TEXTURE_3D||w===e.TEXTURE_2D_ARRAY)&&e.texParameteri(w,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),(S.wrapS!==1001||S.wrapT!==1001)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri(w,e.TEXTURE_MAG_FILTER,y(S.magFilter)),e.texParameteri(w,e.TEXTURE_MIN_FILTER,y(S.minFilter)),S.minFilter!==1003&&S.minFilter!==1006&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(e.texParameteri(w,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(w,e.TEXTURE_COMPARE_FUNC,U[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let ie=t.get("EXT_texture_filter_anisotropic");if(S.magFilter===1003||S.minFilter!==1005&&S.minFilter!==1008||S.type===1015&&t.has("OES_texture_float_linear")===!1||o===!1&&S.type===1016&&t.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||r.get(S).__currentAnisotropy)&&(e.texParameterf(w,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,a.getMaxAnisotropy())),r.get(S).__currentAnisotropy=S.anisotropy)}}function re(w,S){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",T));let ie=S.source,$=c.get(ie);$===void 0&&($={},c.set(ie,$));let ee=D(S);if(ee!==w.__cacheKey){$[ee]===void 0&&($[ee]={texture:e.createTexture(),usedTimes:0},n.memory.textures++,k=!0),$[ee].usedTimes++;let Ae=$[w.__cacheKey];Ae!==void 0&&($[w.__cacheKey].usedTimes--,Ae.usedTimes===0&&I(S)),w.__cacheKey=ee,w.__webglTexture=$[ee].texture}return k}function ce(w,S,k){let ie=e.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ie=e.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ie=e.TEXTURE_3D);let $=re(w,S),ee=S.source;i.bindTexture(ie,w.__webglTexture,e.TEXTURE0+k);let Ae=r.get(ee);if(ee.version!==Ae.__version||$===!0){i.activeTexture(e.TEXTURE0+k);let Q=Ke.getPrimaries(Ke.workingColorSpace),Z=S.colorSpace===""?null:Ke.getPrimaries(S.colorSpace),ue=S.colorSpace===""||Q===Z?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let ve=A(S)&&g(S.image)===!1,te=m(S.image,ve,!1,a.maxTextureSize);te=Pe(S,te);let tt=g(te)||o,Qe=s.convert(S.format,S.colorSpace),we=s.convert(S.type),fe=x(S.internalFormat,Qe,we,S.colorSpace,S.isVideoTexture);j(ie,S,tt);let pe,Oe=S.mipmaps,it=o&&S.isVideoTexture!==!0&&fe!==36196,Xe=Ae.__version===void 0||$===!0,rt=C(S,te,tt);if(S.isDepthTexture)fe=e.DEPTH_COMPONENT,o?fe=S.type===1015?e.DEPTH_COMPONENT32F:S.type===1014?e.DEPTH_COMPONENT24:S.type===1020?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT16:S.type===1015&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===1026&&fe===e.DEPTH_COMPONENT&&S.type!==1012&&S.type!==1014&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=kl,we=s.convert(S.type)),S.format===1027&&fe===e.DEPTH_COMPONENT&&(fe=e.DEPTH_STENCIL,S.type!==1020&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Gl,we=s.convert(S.type))),Xe&&(it?i.texStorage2D(e.TEXTURE_2D,1,fe,te.width,te.height):i.texImage2D(e.TEXTURE_2D,0,fe,te.width,te.height,0,Qe,we,null));else if(S.isDataTexture)if(Oe.length>0&&tt){it&&Xe&&i.texStorage2D(e.TEXTURE_2D,rt,fe,Oe[0].width,Oe[0].height);for(let ae=0,L=Oe.length;ae<L;ae++)pe=Oe[ae],it?i.texSubImage2D(e.TEXTURE_2D,ae,0,0,pe.width,pe.height,Qe,we,pe.data):i.texImage2D(e.TEXTURE_2D,ae,fe,pe.width,pe.height,0,Qe,we,pe.data);S.generateMipmaps=!1}else it?(Xe&&i.texStorage2D(e.TEXTURE_2D,rt,fe,te.width,te.height),i.texSubImage2D(e.TEXTURE_2D,0,0,0,te.width,te.height,Qe,we,te.data)):i.texImage2D(e.TEXTURE_2D,0,fe,te.width,te.height,0,Qe,we,te.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){it&&Xe&&i.texStorage3D(e.TEXTURE_2D_ARRAY,rt,fe,Oe[0].width,Oe[0].height,te.depth);for(let ae=0,L=Oe.length;ae<L;ae++)pe=Oe[ae],S.format===1023?it?i.texSubImage3D(e.TEXTURE_2D_ARRAY,ae,0,0,0,pe.width,pe.height,te.depth,Qe,we,pe.data):i.texImage3D(e.TEXTURE_2D_ARRAY,ae,fe,pe.width,pe.height,te.depth,0,Qe,we,pe.data):Qe===null?console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):it?i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ae,0,0,0,pe.width,pe.height,te.depth,Qe,pe.data,0,0):i.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ae,fe,pe.width,pe.height,te.depth,0,pe.data,0,0)}else{it&&Xe&&i.texStorage2D(e.TEXTURE_2D,rt,fe,Oe[0].width,Oe[0].height);for(let ae=0,L=Oe.length;ae<L;ae++)pe=Oe[ae],S.format===1023?it?i.texSubImage2D(e.TEXTURE_2D,ae,0,0,pe.width,pe.height,Qe,we,pe.data):i.texImage2D(e.TEXTURE_2D,ae,fe,pe.width,pe.height,0,Qe,we,pe.data):Qe===null?console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):it?i.compressedTexSubImage2D(e.TEXTURE_2D,ae,0,0,pe.width,pe.height,Qe,pe.data):i.compressedTexImage2D(e.TEXTURE_2D,ae,fe,pe.width,pe.height,0,pe.data)}else if(S.isDataArrayTexture)it?(Xe&&i.texStorage3D(e.TEXTURE_2D_ARRAY,rt,fe,te.width,te.height,te.depth),i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,Qe,we,te.data)):i.texImage3D(e.TEXTURE_2D_ARRAY,0,fe,te.width,te.height,te.depth,0,Qe,we,te.data);else if(S.isData3DTexture)it?(Xe&&i.texStorage3D(e.TEXTURE_3D,rt,fe,te.width,te.height,te.depth),i.texSubImage3D(e.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,Qe,we,te.data)):i.texImage3D(e.TEXTURE_3D,0,fe,te.width,te.height,te.depth,0,Qe,we,te.data);else if(S.isFramebufferTexture){if(Xe)if(it)i.texStorage2D(e.TEXTURE_2D,rt,fe,te.width,te.height);else{let ae=te.width,L=te.height;for(let se=0;se<rt;se++)i.texImage2D(e.TEXTURE_2D,se,fe,ae,L,0,Qe,we,null),ae>>=1,L>>=1}}else if(Oe.length>0&&tt){it&&Xe&&i.texStorage2D(e.TEXTURE_2D,rt,fe,Oe[0].width,Oe[0].height);for(let ae=0,L=Oe.length;ae<L;ae++)pe=Oe[ae],it?i.texSubImage2D(e.TEXTURE_2D,ae,0,0,Qe,we,pe):i.texImage2D(e.TEXTURE_2D,ae,fe,Qe,we,pe);S.generateMipmaps=!1}else it?(Xe&&i.texStorage2D(e.TEXTURE_2D,rt,fe,te.width,te.height),i.texSubImage2D(e.TEXTURE_2D,0,0,0,Qe,we,te)):i.texImage2D(e.TEXTURE_2D,0,fe,Qe,we,te);_(S,tt)&&v(ie),Ae.__version=ee.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function ge(w,S,k){if(S.image.length!==6)return;let ie=re(w,S),$=S.source;i.bindTexture(e.TEXTURE_CUBE_MAP,w.__webglTexture,e.TEXTURE0+k);let ee=r.get($);if($.version!==ee.__version||ie===!0){i.activeTexture(e.TEXTURE0+k);let Ae=Ke.getPrimaries(Ke.workingColorSpace),Q=S.colorSpace===""?null:Ke.getPrimaries(S.colorSpace),Z=S.colorSpace===""||Ae===Q?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let ue=S.isCompressedTexture||S.image[0].isCompressedTexture,ve=S.image[0]&&S.image[0].isDataTexture,te=[];for(let ae=0;ae<6;ae++)!ue&&!ve?te[ae]=m(S.image[ae],!1,!0,a.maxCubemapSize):te[ae]=ve?S.image[ae].image:S.image[ae],te[ae]=Pe(S,te[ae]);let tt=te[0],Qe=g(tt)||o,we=s.convert(S.format,S.colorSpace),fe=s.convert(S.type),pe=x(S.internalFormat,we,fe,S.colorSpace),Oe=o&&S.isVideoTexture!==!0,it=ee.__version===void 0||ie===!0,Xe=C(S,tt,Qe);j(e.TEXTURE_CUBE_MAP,S,Qe);let rt;if(ue){Oe&&it&&i.texStorage2D(e.TEXTURE_CUBE_MAP,Xe,pe,tt.width,tt.height);for(let ae=0;ae<6;ae++){rt=te[ae].mipmaps;for(let L=0;L<rt.length;L++){let se=rt[L];S.format===1023?Oe?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,L,0,0,se.width,se.height,we,fe,se.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,L,pe,se.width,se.height,0,we,fe,se.data):we===null?console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,L,0,0,se.width,se.height,we,se.data):i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,L,pe,se.width,se.height,0,se.data)}}}else{rt=S.mipmaps,Oe&&it&&(rt.length>0&&Xe++,i.texStorage2D(e.TEXTURE_CUBE_MAP,Xe,pe,te[0].width,te[0].height));for(let ae=0;ae<6;ae++)if(ve){Oe?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,te[ae].width,te[ae].height,we,fe,te[ae].data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,pe,te[ae].width,te[ae].height,0,we,fe,te[ae].data);for(let L=0;L<rt.length;L++){let se=rt[L].image[ae].image;Oe?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,L+1,0,0,se.width,se.height,we,fe,se.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,L+1,pe,se.width,se.height,0,we,fe,se.data)}}else{Oe?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,we,fe,te[ae]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,pe,we,fe,te[ae]);for(let L=0;L<rt.length;L++){let se=rt[L];Oe?i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,L+1,0,0,we,fe,se.image[ae]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,L+1,pe,we,fe,se.image[ae])}}}_(S,Qe)&&v(e.TEXTURE_CUBE_MAP),ee.__version=$.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function _e(w,S,k,ie,$,ee){let Ae=s.convert(k.format,k.colorSpace),Q=s.convert(k.type),Z=x(k.internalFormat,Ae,Q,k.colorSpace);if(!r.get(S).__hasExternalTextures){let ue=Math.max(1,S.width>>ee),ve=Math.max(1,S.height>>ee);$===e.TEXTURE_3D||$===e.TEXTURE_2D_ARRAY?i.texImage3D($,ee,Z,ue,ve,S.depth,0,Ae,Q,null):i.texImage2D($,ee,Z,ue,ve,0,Ae,Q,null)}i.bindFramebuffer(e.FRAMEBUFFER,w),Te(S)?u.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,ie,$,r.get(k).__webglTexture,0,Ee(S)):($===e.TEXTURE_2D||$>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,ie,$,r.get(k).__webglTexture,ee),i.bindFramebuffer(e.FRAMEBUFFER,null)}function Me(w,S,k){if(e.bindRenderbuffer(e.RENDERBUFFER,w),S.depthBuffer&&!S.stencilBuffer){let ie=o===!0?e.DEPTH_COMPONENT24:e.DEPTH_COMPONENT16;if(k||Te(S)){let $=S.depthTexture;$&&$.isDepthTexture&&($.type===1015?ie=e.DEPTH_COMPONENT32F:$.type===1014&&(ie=e.DEPTH_COMPONENT24));let ee=Ee(S);Te(S)?u.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ee,ie,S.width,S.height):e.renderbufferStorageMultisample(e.RENDERBUFFER,ee,ie,S.width,S.height)}else e.renderbufferStorage(e.RENDERBUFFER,ie,S.width,S.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,w)}else if(S.depthBuffer&&S.stencilBuffer){let ie=Ee(S);k&&Te(S)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,ie,e.DEPTH24_STENCIL8,S.width,S.height):Te(S)?u.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ie,e.DEPTH24_STENCIL8,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,S.width,S.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,w)}else{let ie=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let $=0;$<ie.length;$++){let ee=ie[$],Ae=s.convert(ee.format,ee.colorSpace),Q=s.convert(ee.type),Z=x(ee.internalFormat,Ae,Q,ee.colorSpace),ue=Ee(S);k&&Te(S)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,ue,Z,S.width,S.height):Te(S)?u.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ue,Z,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,Z,S.width,S.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ce(w,S){if(S&&S.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(e.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),N(S.depthTexture,0);let k=r.get(S.depthTexture).__webglTexture,ie=Ee(S);if(S.depthTexture.format===1026)Te(S)?u.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,k,0,ie):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,k,0);else if(S.depthTexture.format===1027)Te(S)?u.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,k,0,ie):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,k,0);else throw Error("Unknown depthTexture format")}function De(w){let S=r.get(w),k=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw Error("target.depthTexture not supported in Cube render targets");Ce(S.__webglFramebuffer,w)}else if(k){S.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)i.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[ie]),S.__webglDepthbuffer[ie]=e.createRenderbuffer(),Me(S.__webglDepthbuffer[ie],w,!1)}else i.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=e.createRenderbuffer(),Me(S.__webglDepthbuffer,w,!1);i.bindFramebuffer(e.FRAMEBUFFER,null)}function O(w,S,k){let ie=r.get(w);S!==void 0&&_e(ie.__webglFramebuffer,w,w.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),k!==void 0&&De(w)}function vt(w){let S=w.texture,k=r.get(w),ie=r.get(S);w.addEventListener("dispose",b),w.isWebGLMultipleRenderTargets!==!0&&(ie.__webglTexture===void 0&&(ie.__webglTexture=e.createTexture()),ie.__version=S.version,n.memory.textures++);let $=w.isWebGLCubeRenderTarget===!0,ee=w.isWebGLMultipleRenderTargets===!0,Ae=g(w)||o;if($){k.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(o&&S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[Q]=[];for(let Z=0;Z<S.mipmaps.length;Z++)k.__webglFramebuffer[Q][Z]=e.createFramebuffer()}else k.__webglFramebuffer[Q]=e.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let Q=0;Q<S.mipmaps.length;Q++)k.__webglFramebuffer[Q]=e.createFramebuffer()}else k.__webglFramebuffer=e.createFramebuffer();if(ee)if(a.drawBuffers){let Q=w.texture;for(let Z=0,ue=Q.length;Z<ue;Z++){let ve=r.get(Q[Z]);ve.__webglTexture===void 0&&(ve.__webglTexture=e.createTexture(),n.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&w.samples>0&&Te(w)===!1){let Q=ee?S:[S];k.__webglMultisampledFramebuffer=e.createFramebuffer(),k.__webglColorRenderbuffer=[],i.bindFramebuffer(e.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Z=0;Z<Q.length;Z++){let ue=Q[Z];k.__webglColorRenderbuffer[Z]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,k.__webglColorRenderbuffer[Z]);let ve=s.convert(ue.format,ue.colorSpace),te=s.convert(ue.type),tt=x(ue.internalFormat,ve,te,ue.colorSpace,w.isXRRenderTarget===!0),Qe=Ee(w);e.renderbufferStorageMultisample(e.RENDERBUFFER,Qe,tt,w.width,w.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Z,e.RENDERBUFFER,k.__webglColorRenderbuffer[Z])}e.bindRenderbuffer(e.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=e.createRenderbuffer(),Me(k.__webglDepthRenderbuffer,w,!0)),i.bindFramebuffer(e.FRAMEBUFFER,null)}}if($){i.bindTexture(e.TEXTURE_CUBE_MAP,ie.__webglTexture),j(e.TEXTURE_CUBE_MAP,S,Ae);for(let Q=0;Q<6;Q++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)_e(k.__webglFramebuffer[Q][Z],w,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Z);else _e(k.__webglFramebuffer[Q],w,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);_(S,Ae)&&v(e.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(ee){let Q=w.texture;for(let Z=0,ue=Q.length;Z<ue;Z++){let ve=Q[Z],te=r.get(ve);i.bindTexture(e.TEXTURE_2D,te.__webglTexture),j(e.TEXTURE_2D,ve,Ae),_e(k.__webglFramebuffer,w,ve,e.COLOR_ATTACHMENT0+Z,e.TEXTURE_2D,0),_(ve,Ae)&&v(e.TEXTURE_2D)}i.unbindTexture()}else{let Q=e.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(o?Q=w.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),i.bindTexture(Q,ie.__webglTexture),j(Q,S,Ae),o&&S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)_e(k.__webglFramebuffer[Z],w,S,e.COLOR_ATTACHMENT0,Q,Z);else _e(k.__webglFramebuffer,w,S,e.COLOR_ATTACHMENT0,Q,0);_(S,Ae)&&v(Q),i.unbindTexture()}w.depthBuffer&&De(w)}function Ge(w){let S=g(w)||o,k=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let ie=0,$=k.length;ie<$;ie++){let ee=k[ie];if(_(ee,S)){let Ae=w.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,Q=r.get(ee).__webglTexture;i.bindTexture(Ae,Q),v(Ae),i.unbindTexture()}}}function de(w){if(o&&w.samples>0&&Te(w)===!1){let S=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],k=w.width,ie=w.height,$=e.COLOR_BUFFER_BIT,ee=[],Ae=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Q=r.get(w),Z=w.isWebGLMultipleRenderTargets===!0;if(Z)for(let ue=0;ue<S.length;ue++)i.bindFramebuffer(e.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ue,e.RENDERBUFFER,null),i.bindFramebuffer(e.FRAMEBUFFER,Q.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ue,e.TEXTURE_2D,null,0);i.bindFramebuffer(e.READ_FRAMEBUFFER,Q.__webglMultisampledFramebuffer),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,Q.__webglFramebuffer);for(let ue=0;ue<S.length;ue++){ee.push(e.COLOR_ATTACHMENT0+ue),w.depthBuffer&&ee.push(Ae);let ve=Q.__ignoreDepthValues===void 0?!1:Q.__ignoreDepthValues;if(ve===!1&&(w.depthBuffer&&($|=e.DEPTH_BUFFER_BIT),w.stencilBuffer&&($|=e.STENCIL_BUFFER_BIT)),Z&&e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Q.__webglColorRenderbuffer[ue]),ve===!0&&(e.invalidateFramebuffer(e.READ_FRAMEBUFFER,[Ae]),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[Ae])),Z){let te=r.get(S[ue]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,te,0)}e.blitFramebuffer(0,0,k,ie,0,0,k,ie,$,e.NEAREST),h&&e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ee)}if(i.bindFramebuffer(e.READ_FRAMEBUFFER,null),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),Z)for(let ue=0;ue<S.length;ue++){i.bindFramebuffer(e.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ue,e.RENDERBUFFER,Q.__webglColorRenderbuffer[ue]);let ve=r.get(S[ue]).__webglTexture;i.bindFramebuffer(e.FRAMEBUFFER,Q.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ue,e.TEXTURE_2D,ve,0)}i.bindFramebuffer(e.DRAW_FRAMEBUFFER,Q.__webglMultisampledFramebuffer)}}function Ee(w){return Math.min(a.maxSamples,w.samples)}function Te(w){let S=r.get(w);return o&&w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Re(w){let S=n.render.frame;d.get(w)!==S&&(d.set(w,S),w.update())}function Pe(w,S){let k=w.colorSpace,ie=w.format,$=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===1035||k!=="srgb-linear"&&k!==""&&(Ke.getTransfer(k)==="srgb"?o===!1?t.has("EXT_sRGB")===!0&&ie===1023?(w.format=ff,w.minFilter=qe,w.generateMipmaps=!1):S=Gc.sRGBToLinear(S):(ie!==1023||$!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}this.allocateTextureUnit=R,this.resetTextureUnits=X,this.setTexture2D=N,this.setTexture2DArray=z,this.setTexture3D=Y,this.setTextureCube=W,this.rebindTextures=O,this.setupRenderTarget=vt,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=de,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Te}function Ym(e,t,i){let r=i.isWebGL2;function a(s,n=""){let o,u=Ke.getTransfer(n);if(s===1009)return e.UNSIGNED_BYTE;if(s===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(s===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(s===1010)return e.BYTE;if(s===1011)return e.SHORT;if(s===1012)return e.UNSIGNED_SHORT;if(s===1013)return e.INT;if(s===1014)return e.UNSIGNED_INT;if(s===1015)return e.FLOAT;if(s===1016)return r?e.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o===null?null:o.HALF_FLOAT_OES);if(s===1021)return e.ALPHA;if(s===1023)return e.RGBA;if(s===1024)return e.LUMINANCE;if(s===1025)return e.LUMINANCE_ALPHA;if(s===1026)return e.DEPTH_COMPONENT;if(s===1027)return e.DEPTH_STENCIL;if(s===1035)return o=t.get("EXT_sRGB"),o===null?null:o.SRGB_ALPHA_EXT;if(s===1028)return e.RED;if(s===1029)return e.RED_INTEGER;if(s===1030)return e.RG;if(s===1031)return e.RG_INTEGER;if(s===1033)return e.RGBA_INTEGER;if(s===33776||s===33777||s===33778||s===33779)if(u==="srgb")if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===33776)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===33777)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===33778)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===33779)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===33776)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===33777)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===33778)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===33779)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===35840||s===35841||s===35842||s===35843)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===35840)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===35841)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===35842)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===35843)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===36196)return o=t.get("WEBGL_compressed_texture_etc1"),o===null?null:o.COMPRESSED_RGB_ETC1_WEBGL;if(s===37492||s===37496)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(s===37492)return u==="srgb"?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===37496)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===37808||s===37809||s===37810||s===37811||s===37812||s===37813||s===37814||s===37815||s===37816||s===37817||s===37818||s===37819||s===37820||s===37821)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(s===37808)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===37809)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===37810)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===37811)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===37812)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===37813)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===37814)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===37815)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===37816)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===37817)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===37818)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===37819)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===37820)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===37821)return u==="srgb"?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===36492||s===36494||s===36495)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(s===36492)return u==="srgb"?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===36494)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===36495)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===36283||s===36284||s===36285||s===36286)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(s===36492)return o.COMPRESSED_RED_RGTC1_EXT;if(s===36284)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===36285)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===36286)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===1020?r?e.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o===null?null:o.UNSIGNED_INT_24_8_WEBGL):e[s]===void 0?null:e[s]}return{convert:a}}var jm=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ci=class extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Km={type:"move"},Bo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ci,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ci,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ci,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null,n=this._targetRay,o=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){s=!0;for(let c of e.hand.values()){let p=t.getJointPose(c,i),f=this._getHandJoint(u,c);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}let h=u.joints["index-finger-tip"],d=u.joints["thumb-tip"],l=h.position.distanceTo(d.position);u.inputState.pinching&&l>.025?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&l<=.015&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1));n!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(n.matrix.fromArray(r.transform.matrix),n.matrix.decompose(n.position,n.rotation,n.scale),n.matrixWorldNeedsUpdate=!0,r.linearVelocity?(n.hasLinearVelocity=!0,n.linearVelocity.copy(r.linearVelocity)):n.hasLinearVelocity=!1,r.angularVelocity?(n.hasAngularVelocity=!0,n.angularVelocity.copy(r.angularVelocity)):n.hasAngularVelocity=!1,this.dispatchEvent(Km)))}return n!==null&&(n.visible=r!==null),o!==null&&(o.visible=a!==null),u!==null&&(u.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Ci;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Jm=class extends ta{constructor(e,t){super();let i=this,r=null,a=1,s=null,n="local-floor",o=1,u=null,h=null,d=null,l=null,c=null,p=null,f=t.getContextAttributes(),m=null,g=null,A=[],_=[],v=new oe,x=null,C=new zt;C.layers.enable(1),C.viewport=new et;let y=new zt;y.layers.enable(2),y.viewport=new et;let T=[C,y],b=new jm;b.layers.enable(1),b.layers.enable(2);let E=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let j=A[U];return j===void 0&&(j=new Bo,A[U]=j),j.getTargetRaySpace()},this.getControllerGrip=function(U){let j=A[U];return j===void 0&&(j=new Bo,A[U]=j),j.getGripSpace()},this.getHand=function(U){let j=A[U];return j===void 0&&(j=new Bo,A[U]=j),j.getHandSpace()};function B(U){let j=_.indexOf(U.inputSource);if(j===-1)return;let re=A[j];re!==void 0&&(re.update(U.inputSource,U.frame,u||s),re.dispatchEvent({type:U.type,data:U.inputSource}))}function G(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",X);for(let U=0;U<A.length;U++){let j=_[U];j!==null&&(_[U]=null,A[U].disconnect(j))}E=null,I=null,e.setRenderTarget(m),c=null,l=null,d=null,r=null,g=null,K.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(v.width,v.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){a=U,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){n=U,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||s},this.setReferenceSpace=function(U){u=U},this.getBaseLayer=function(){return l===null?c:l},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(U){if(r=U,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",G),r.addEventListener("inputsourceschange",X),f.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(v),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let j={antialias:r.renderState.layers===void 0?f.antialias:!0,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:a};c=new XRWebGLLayer(r,t,j),r.updateRenderState({baseLayer:c}),e.setPixelRatio(1),e.setSize(c.framebufferWidth,c.framebufferHeight,!1),g=new jt(c.framebufferWidth,c.framebufferHeight,{format:mt,type:Gt,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let j=null,re=null,ce=null;f.depth&&(ce=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=f.stencil?Zp:Lc,re=f.stencil?Gl:kl);let ge={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:a};d=new XRWebGLBinding(r,t),l=d.createProjectionLayer(ge),r.updateRenderState({layers:[l]}),e.setPixelRatio(1),e.setSize(l.textureWidth,l.textureHeight,!1),g=new jt(l.textureWidth,l.textureHeight,{format:mt,type:Gt,depthTexture:new nd(l.textureWidth,l.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0});let _e=e.properties.get(g);_e.__ignoreDepthValues=l.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(o),u=null,s=await r.requestReferenceSpace(n),K.setContext(r),K.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function X(U){for(let j=0;j<U.removed.length;j++){let re=U.removed[j],ce=_.indexOf(re);ce>=0&&(_[ce]=null,A[ce].disconnect(re))}for(let j=0;j<U.added.length;j++){let re=U.added[j],ce=_.indexOf(re);if(ce===-1){for(let _e=0;_e<A.length;_e++)if(_e>=_.length){_.push(re),ce=_e;break}else if(_[_e]===null){_[_e]=re,ce=_e;break}if(ce===-1)break}let ge=A[ce];ge&&ge.connect(re)}}let R=new P,D=new P;function N(U,j,re){R.setFromMatrixPosition(j.matrixWorld),D.setFromMatrixPosition(re.matrixWorld);let ce=R.distanceTo(D),ge=j.projectionMatrix.elements,_e=re.projectionMatrix.elements,Me=ge[14]/(ge[10]-1),Ce=ge[14]/(ge[10]+1),De=(ge[9]+1)/ge[5],O=(ge[9]-1)/ge[5],vt=(ge[8]-1)/ge[0],Ge=(_e[8]+1)/_e[0],de=Me*vt,Ee=Me*Ge,Te=ce/(-vt+Ge),Re=Te*-vt;j.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(Re),U.translateZ(Te),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert();let Pe=Me+Te,w=Ce+Te,S=de-Re,k=Ee+(ce-Re),ie=De*Ce/w*Pe,$=O*Ce/w*Pe;U.projectionMatrix.makePerspective(S,k,ie,$,Pe,w),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}function z(U,j){j===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(j.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(r===null)return;b.near=y.near=C.near=U.near,b.far=y.far=C.far=U.far,(E!==b.near||I!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),E=b.near,I=b.far);let j=U.parent,re=b.cameras;z(b,j);for(let ce=0;ce<re.length;ce++)z(re[ce],j);re.length===2?N(b,C,y):b.projectionMatrix.copy(C.projectionMatrix),Y(U,b,j)};function Y(U,j,re){re===null?U.matrix.copy(j.matrixWorld):(U.matrix.copy(re.matrixWorld),U.matrix.invert(),U.matrix.multiply(j.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(j.projectionMatrix),U.projectionMatrixInverse.copy(j.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=Va*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(l===null&&c===null))return o},this.setFoveation=function(U){o=U,l!==null&&(l.fixedFoveation=U),c!==null&&c.fixedFoveation!==void 0&&(c.fixedFoveation=U)};let W=null;function J(U,j){if(h=j.getViewerPose(u||s),p=j,h!==null){let re=h.views;c!==null&&(e.setRenderTargetFramebuffer(g,c.framebuffer),e.setRenderTarget(g));let ce=!1;re.length!==b.cameras.length&&(b.cameras.length=0,ce=!0);for(let ge=0;ge<re.length;ge++){let _e=re[ge],Me=null;if(c!==null)Me=c.getViewport(_e);else{let De=d.getViewSubImage(l,_e);Me=De.viewport,ge===0&&(e.setRenderTargetTextures(g,De.colorTexture,l.ignoreDepthValues?void 0:De.depthStencilTexture),e.setRenderTarget(g))}let Ce=T[ge];Ce===void 0&&(Ce=new zt,Ce.layers.enable(ge),Ce.viewport=new et,T[ge]=Ce),Ce.matrix.fromArray(_e.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(_e.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Me.x,Me.y,Me.width,Me.height),ge===0&&(b.matrix.copy(Ce.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ce===!0&&b.cameras.push(Ce)}}for(let re=0;re<A.length;re++){let ce=_[re],ge=A[re];ce!==null&&ge!==void 0&&ge.update(ce,j,u||s)}W&&W(U,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),p=null}let K=new ad;K.setAnimationLoop(J),this.setAnimationLoop=function(U){W=U},this.dispose=function(){}}};function Zm(e,t){function i(g,A){g.matrixAutoUpdate===!0&&g.updateMatrix(),A.value.copy(g.matrix)}function r(g,A){A.color.getRGB(g.fogColor.value,ed(e)),A.isFog?(g.fogNear.value=A.near,g.fogFar.value=A.far):A.isFogExp2&&(g.fogDensity.value=A.density)}function a(g,A,_,v,x){A.isMeshBasicMaterial||A.isMeshLambertMaterial?s(g,A):A.isMeshToonMaterial?(s(g,A),l(g,A)):A.isMeshPhongMaterial?(s(g,A),d(g,A)):A.isMeshStandardMaterial?(s(g,A),c(g,A),A.isMeshPhysicalMaterial&&p(g,A,x)):A.isMeshMatcapMaterial?(s(g,A),f(g,A)):A.isMeshDepthMaterial?s(g,A):A.isMeshDistanceMaterial?(s(g,A),m(g,A)):A.isMeshNormalMaterial?s(g,A):A.isLineBasicMaterial?(n(g,A),A.isLineDashedMaterial&&o(g,A)):A.isPointsMaterial?u(g,A,_,v):A.isSpriteMaterial?h(g,A):A.isShadowMaterial?(g.color.value.copy(A.color),g.opacity.value=A.opacity):A.isShaderMaterial&&(A.uniformsNeedUpdate=!1)}function s(g,A){g.opacity.value=A.opacity,A.color&&g.diffuse.value.copy(A.color),A.emissive&&g.emissive.value.copy(A.emissive).multiplyScalar(A.emissiveIntensity),A.map&&(g.map.value=A.map,i(A.map,g.mapTransform)),A.alphaMap&&(g.alphaMap.value=A.alphaMap,i(A.alphaMap,g.alphaMapTransform)),A.bumpMap&&(g.bumpMap.value=A.bumpMap,i(A.bumpMap,g.bumpMapTransform),g.bumpScale.value=A.bumpScale,A.side===1&&(g.bumpScale.value*=-1)),A.normalMap&&(g.normalMap.value=A.normalMap,i(A.normalMap,g.normalMapTransform),g.normalScale.value.copy(A.normalScale),A.side===1&&g.normalScale.value.negate()),A.displacementMap&&(g.displacementMap.value=A.displacementMap,i(A.displacementMap,g.displacementMapTransform),g.displacementScale.value=A.displacementScale,g.displacementBias.value=A.displacementBias),A.emissiveMap&&(g.emissiveMap.value=A.emissiveMap,i(A.emissiveMap,g.emissiveMapTransform)),A.specularMap&&(g.specularMap.value=A.specularMap,i(A.specularMap,g.specularMapTransform)),A.alphaTest>0&&(g.alphaTest.value=A.alphaTest);let _=t.get(A).envMap;if(_&&(g.envMap.value=_,g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=A.reflectivity,g.ior.value=A.ior,g.refractionRatio.value=A.refractionRatio),A.lightMap){g.lightMap.value=A.lightMap;let v=e._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=A.lightMapIntensity*v,i(A.lightMap,g.lightMapTransform)}A.aoMap&&(g.aoMap.value=A.aoMap,g.aoMapIntensity.value=A.aoMapIntensity,i(A.aoMap,g.aoMapTransform))}function n(g,A){g.diffuse.value.copy(A.color),g.opacity.value=A.opacity,A.map&&(g.map.value=A.map,i(A.map,g.mapTransform))}function o(g,A){g.dashSize.value=A.dashSize,g.totalSize.value=A.dashSize+A.gapSize,g.scale.value=A.scale}function u(g,A,_,v){g.diffuse.value.copy(A.color),g.opacity.value=A.opacity,g.size.value=A.size*_,g.scale.value=v*.5,A.map&&(g.map.value=A.map,i(A.map,g.uvTransform)),A.alphaMap&&(g.alphaMap.value=A.alphaMap,i(A.alphaMap,g.alphaMapTransform)),A.alphaTest>0&&(g.alphaTest.value=A.alphaTest)}function h(g,A){g.diffuse.value.copy(A.color),g.opacity.value=A.opacity,g.rotation.value=A.rotation,A.map&&(g.map.value=A.map,i(A.map,g.mapTransform)),A.alphaMap&&(g.alphaMap.value=A.alphaMap,i(A.alphaMap,g.alphaMapTransform)),A.alphaTest>0&&(g.alphaTest.value=A.alphaTest)}function d(g,A){g.specular.value.copy(A.specular),g.shininess.value=Math.max(A.shininess,1e-4)}function l(g,A){A.gradientMap&&(g.gradientMap.value=A.gradientMap)}function c(g,A){g.metalness.value=A.metalness,A.metalnessMap&&(g.metalnessMap.value=A.metalnessMap,i(A.metalnessMap,g.metalnessMapTransform)),g.roughness.value=A.roughness,A.roughnessMap&&(g.roughnessMap.value=A.roughnessMap,i(A.roughnessMap,g.roughnessMapTransform)),t.get(A).envMap&&(g.envMapIntensity.value=A.envMapIntensity)}function p(g,A,_){g.ior.value=A.ior,A.sheen>0&&(g.sheenColor.value.copy(A.sheenColor).multiplyScalar(A.sheen),g.sheenRoughness.value=A.sheenRoughness,A.sheenColorMap&&(g.sheenColorMap.value=A.sheenColorMap,i(A.sheenColorMap,g.sheenColorMapTransform)),A.sheenRoughnessMap&&(g.sheenRoughnessMap.value=A.sheenRoughnessMap,i(A.sheenRoughnessMap,g.sheenRoughnessMapTransform))),A.clearcoat>0&&(g.clearcoat.value=A.clearcoat,g.clearcoatRoughness.value=A.clearcoatRoughness,A.clearcoatMap&&(g.clearcoatMap.value=A.clearcoatMap,i(A.clearcoatMap,g.clearcoatMapTransform)),A.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=A.clearcoatRoughnessMap,i(A.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),A.clearcoatNormalMap&&(g.clearcoatNormalMap.value=A.clearcoatNormalMap,i(A.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(A.clearcoatNormalScale),A.side===1&&g.clearcoatNormalScale.value.negate())),A.iridescence>0&&(g.iridescence.value=A.iridescence,g.iridescenceIOR.value=A.iridescenceIOR,g.iridescenceThicknessMinimum.value=A.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=A.iridescenceThicknessRange[1],A.iridescenceMap&&(g.iridescenceMap.value=A.iridescenceMap,i(A.iridescenceMap,g.iridescenceMapTransform)),A.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=A.iridescenceThicknessMap,i(A.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),A.transmission>0&&(g.transmission.value=A.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),A.transmissionMap&&(g.transmissionMap.value=A.transmissionMap,i(A.transmissionMap,g.transmissionMapTransform)),g.thickness.value=A.thickness,A.thicknessMap&&(g.thicknessMap.value=A.thicknessMap,i(A.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=A.attenuationDistance,g.attenuationColor.value.copy(A.attenuationColor)),A.anisotropy>0&&(g.anisotropyVector.value.set(A.anisotropy*Math.cos(A.anisotropyRotation),A.anisotropy*Math.sin(A.anisotropyRotation)),A.anisotropyMap&&(g.anisotropyMap.value=A.anisotropyMap,i(A.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=A.specularIntensity,g.specularColor.value.copy(A.specularColor),A.specularColorMap&&(g.specularColorMap.value=A.specularColorMap,i(A.specularColorMap,g.specularColorMapTransform)),A.specularIntensityMap&&(g.specularIntensityMap.value=A.specularIntensityMap,i(A.specularIntensityMap,g.specularIntensityMapTransform))}function f(g,A){A.matcap&&(g.matcap.value=A.matcap)}function m(g,A){let _=t.get(A).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function $m(e,t,i,r){let a={},s={},n=[],o=i.isWebGL2?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0;function u(_,v){let x=v.program;r.uniformBlockBinding(_,x)}function h(_,v){let x=a[_.id];x===void 0&&(f(_),x=d(_),a[_.id]=x,_.addEventListener("dispose",g));let C=v.program;r.updateUBOMapping(_,C);let y=t.render.frame;s[_.id]!==y&&(c(_),s[_.id]=y)}function d(_){let v=l();_.__bindingPointIndex=v;let x=e.createBuffer(),C=_.__size,y=_.usage;return e.bindBuffer(e.UNIFORM_BUFFER,x),e.bufferData(e.UNIFORM_BUFFER,C,y),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,v,x),x}function l(){for(let _=0;_<o;_++)if(n.indexOf(_)===-1)return n.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(_){let v=a[_.id],x=_.uniforms,C=_.__cache;e.bindBuffer(e.UNIFORM_BUFFER,v);for(let y=0,T=x.length;y<T;y++){let b=Array.isArray(x[y])?x[y]:[x[y]];for(let E=0,I=b.length;E<I;E++){let B=b[E];if(p(B,y,E,C)===!0){let G=B.__offset,X=Array.isArray(B.value)?B.value:[B.value],R=0;for(let D=0;D<X.length;D++){let N=X[D],z=m(N);typeof N=="number"||typeof N=="boolean"?(B.__data[0]=N,e.bufferSubData(e.UNIFORM_BUFFER,G+R,B.__data)):N.isMatrix3?(B.__data[0]=N.elements[0],B.__data[1]=N.elements[1],B.__data[2]=N.elements[2],B.__data[3]=0,B.__data[4]=N.elements[3],B.__data[5]=N.elements[4],B.__data[6]=N.elements[5],B.__data[7]=0,B.__data[8]=N.elements[6],B.__data[9]=N.elements[7],B.__data[10]=N.elements[8],B.__data[11]=0):(N.toArray(B.__data,R),R+=z.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,G,B.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(_,v,x,C){let y=_.value,T=v+"_"+x;if(C[T]===void 0)return typeof y=="number"||typeof y=="boolean"?C[T]=y:C[T]=y.clone(),!0;{let b=C[T];if(typeof y=="number"||typeof y=="boolean"){if(b!==y)return C[T]=y,!0}else if(b.equals(y)===!1)return b.copy(y),!0}return!1}function f(_){let v=_.uniforms,x=0;for(let y=0,T=v.length;y<T;y++){let b=Array.isArray(v[y])?v[y]:[v[y]];for(let E=0,I=b.length;E<I;E++){let B=b[E],G=Array.isArray(B.value)?B.value:[B.value];for(let X=0,R=G.length;X<R;X++){let D=G[X],N=m(D),z=x%16;z!==0&&16-z<N.boundary&&(x+=16-z),B.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=N.storage}}}let C=x%16;return C>0&&(x+=16-C),_.__size=x,_.__cache={},this}function m(_){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function g(_){let v=_.target;v.removeEventListener("dispose",g);let x=n.indexOf(v.__bindingPointIndex);n.splice(x,1),e.deleteBuffer(a[v.id]),delete a[v.id],delete s[v.id]}function A(){for(let _ in a)e.deleteBuffer(a[_]);n=[],a={},s={}}return{bind:u,update:h,dispose:A}}var dd=class{constructor(e={}){let{canvas:t=Bf(),context:i=null,depth:r=!0,stencil:a=!0,alpha:s=!1,antialias:n=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let l;l=i===null?s:i.getContextAttributes().alpha;let c=new Uint32Array(4),p=new Int32Array(4),f=null,m=null,g=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ye,this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;let _=this,v=!1,x=0,C=0,y=null,T=-1,b=null,E=new et,I=new et,B=null,G=new ye(0),X=0,R=t.width,D=t.height,N=1,z=null,Y=null,W=new et(0,0,R,D),J=new et(0,0,R,D),K=!1,U=new ql,j=!1,re=!1,ce=null,ge=new ke,_e=new oe,Me=new P,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function De(){return y===null?N:1}let O=i;function vt(M,F){for(let V=0;V<M.length;V++){let q=M[V],H=t.getContext(q,F);if(H!==null)return H}return null}try{let M={alpha:!0,depth:r,stencil:a,antialias:n,premultipliedAlpha:o,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",rt,!1),t.addEventListener("webglcontextrestored",ae,!1),t.addEventListener("webglcontextcreationerror",L,!1),O===null){let F=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&F.shift(),O=vt(F,M),O===null)throw vt(F)?Error("Error creating WebGL context with your selected attributes."):Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Ge,de,Ee,Te,Re,Pe,w,S,k,ie,$,ee,Ae,Q,Z,ue,ve,te,tt,Qe,we,fe,pe,Oe;function it(){Ge=new uA(O),de=new rA(O,Ge,e),Ge.init(de),fe=new Ym(O,Ge,de),Ee=new qm(O,Ge,de),Te=new dA(O),Re=new Pm,Pe=new Xm(O,Ge,Ee,Re,de,fe,Te),w=new sA(_),S=new lA(_),k=new $f(O,de),pe=new tA(O,Ge,k,de),ie=new hA(O,k,Te,pe),$=new mA(O,ie,k,Te),tt=new AA(O,de,Pe),ue=new aA(Re),ee=new Rm(_,w,S,Ge,de,pe,ue),Ae=new Zm(_,Re),Q=new Dm,Z=new km(Ge,de),te=new eA(_,w,S,Ee,$,l,o),ve=new Wm(_,$,de),Oe=new $m(O,Te,de,Ee),Qe=new iA(O,Ge,Te,de),we=new cA(O,Ge,Te,de),Te.programs=ee.programs,_.capabilities=de,_.extensions=Ge,_.properties=Re,_.renderLists=Q,_.shadowMap=ve,_.state=Ee,_.info=Te}it();let Xe=new Jm(_,O);this.xr=Xe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let M=Ge.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Ge.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(M){M!==void 0&&(N=M,this.setSize(R,D,!1))},this.getSize=function(M){return M.set(R,D)},this.setSize=function(M,F,V=!0){if(Xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}R=M,D=F,t.width=Math.floor(M*N),t.height=Math.floor(F*N),V===!0&&(t.style.width=M+"px",t.style.height=F+"px"),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(R*N,D*N).floor()},this.setDrawingBufferSize=function(M,F,V){R=M,D=F,N=V,t.width=Math.floor(M*V),t.height=Math.floor(F*V),this.setViewport(0,0,M,F)},this.getCurrentViewport=function(M){return M.copy(E)},this.getViewport=function(M){return M.copy(W)},this.setViewport=function(M,F,V,q){M.isVector4?W.set(M.x,M.y,M.z,M.w):W.set(M,F,V,q),Ee.viewport(E.copy(W).multiplyScalar(N).floor())},this.getScissor=function(M){return M.copy(J)},this.setScissor=function(M,F,V,q){M.isVector4?J.set(M.x,M.y,M.z,M.w):J.set(M,F,V,q),Ee.scissor(I.copy(J).multiplyScalar(N).floor())},this.getScissorTest=function(){return K},this.setScissorTest=function(M){Ee.setScissorTest(K=M)},this.setOpaqueSort=function(M){z=M},this.setTransparentSort=function(M){Y=M},this.getClearColor=function(M){return M.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor.apply(te,arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha.apply(te,arguments)},this.clear=function(M=!0,F=!0,V=!0){let q=0;if(M){let H=!1;if(y!==null){let le=y.texture.format;H=le===1033||le===1031||le===1029}if(H){let le=y.texture.type,me=le===1009||le===1014||le===1012||le===1020||le===1017||le===1018,Se=te.getClearColor(),Ie=te.getClearAlpha(),He=Se.r,Ue=Se.g,Ne=Se.b;me?(c[0]=He,c[1]=Ue,c[2]=Ne,c[3]=Ie,O.clearBufferuiv(O.COLOR,0,c)):(p[0]=He,p[1]=Ue,p[2]=Ne,p[3]=Ie,O.clearBufferiv(O.COLOR,0,p))}else q|=O.COLOR_BUFFER_BIT}F&&(q|=O.DEPTH_BUFFER_BIT),V&&(q|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",rt,!1),t.removeEventListener("webglcontextrestored",ae,!1),t.removeEventListener("webglcontextcreationerror",L,!1),Q.dispose(),Z.dispose(),Re.dispose(),w.dispose(),S.dispose(),$.dispose(),pe.dispose(),Oe.dispose(),ee.dispose(),Xe.dispose(),Xe.removeEventListener("sessionstart",xt),Xe.removeEventListener("sessionend",mi),ce&&(ce=(ce.dispose(),null)),je.stop()};function rt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function ae(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;let M=Te.autoReset,F=ve.enabled,V=ve.autoUpdate,q=ve.needsUpdate,H=ve.type;it(),Te.autoReset=M,ve.enabled=F,ve.autoUpdate=V,ve.needsUpdate=q,ve.type=H}function L(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function se(M){let F=M.target;F.removeEventListener("dispose",se),he(F)}function he(M){be(M),Re.remove(M)}function be(M){let F=Re.get(M).programs;F!==void 0&&(F.forEach(function(V){ee.releaseProgram(V)}),M.isShaderMaterial&&ee.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,V,q,H,le){F===null&&(F=Ce);let me=H.isMesh&&H.matrixWorld.determinant()<0,Se=Vp(M,F,V,q,H);Ee.setMaterial(q,me);let Ie=V.index,He=1;if(q.wireframe===!0){if(Ie=ie.getWireframeAttribute(V),Ie===void 0)return;He=2}let Ue=V.drawRange,Ne=V.attributes.position,Nt=Ue.start*He,Tt=(Ue.start+Ue.count)*He;le!==null&&(Nt=Math.max(Nt,le.start*He),Tt=Math.min(Tt,(le.start+le.count)*He)),Ie===null?Ne!=null&&(Nt=Math.max(Nt,0),Tt=Math.min(Tt,Ne.count)):(Nt=Math.max(Nt,0),Tt=Math.min(Tt,Ie.count));let gi=Tt-Nt;if(gi<0||gi===1/0)return;pe.setup(H,q,Se,V,Ie);let Xi,Et=Qe;if(Ie!==null&&(Xi=k.get(Ie),Et=we,Et.setIndex(Xi)),H.isMesh)q.wireframe===!0?(Ee.setLineWidth(q.wireframeLinewidth*De()),Et.setMode(O.LINES)):Et.setMode(O.TRIANGLES);else if(H.isLine){let Fe=q.linewidth;Fe===void 0&&(Fe=1),Ee.setLineWidth(Fe*De()),H.isLineSegments?Et.setMode(O.LINES):H.isLineLoop?Et.setMode(O.LINE_LOOP):Et.setMode(O.LINE_STRIP)}else H.isPoints?Et.setMode(O.POINTS):H.isSprite&&Et.setMode(O.TRIANGLES);if(H.isBatchedMesh)Et.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else if(H.isInstancedMesh)Et.renderInstances(Nt,gi,H.count);else if(V.isInstancedBufferGeometry){let Fe=V._maxInstanceCount===void 0?1/0:V._maxInstanceCount,to=Math.min(V.instanceCount,Fe);Et.renderInstances(Nt,gi,to)}else Et.render(Nt,gi)};function xe(M,F,V){M.transparent===!0&&M.side===2&&M.forceSinglePass===!1?(M.side=1,M.needsUpdate=!0,zs(M,F,V),M.side=0,M.needsUpdate=!0,zs(M,F,V),M.side=2):zs(M,F,V)}this.compile=function(M,F,V=null){V===null&&(V=M),m=Z.get(V),m.init(),A.push(m),V.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),M!==V&&M.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),m.setupLights(_._useLegacyLights);let q=new Set;return M.traverse(function(H){let le=H.material;if(le)if(Array.isArray(le))for(let me=0;me<le.length;me++){let Se=le[me];xe(Se,V,H),q.add(Se)}else xe(le,V,H),q.add(le)}),A.pop(),m=null,q},this.compileAsync=function(M,F,V=null){let q=this.compile(M,F,V);return new Promise(H=>{function le(){if(q.forEach(function(me){Re.get(me).currentProgram.isReady()&&q.delete(me)}),q.size===0){H(M);return}setTimeout(le,10)}Ge.get("KHR_parallel_shader_compile")===null?setTimeout(le,10):le()})};let at=null;function ut(M){at&&at(M)}function xt(){je.stop()}function mi(){je.start()}let je=new ad;je.setAnimationLoop(ut),typeof self<"u"&&je.setContext(self),this.setAnimationLoop=function(M){at=M,Xe.setAnimationLoop(M),M===null?je.stop():je.start()},Xe.addEventListener("sessionstart",xt),Xe.addEventListener("sessionend",mi),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(F),F=Xe.getCamera()),M.isScene===!0&&M.onBeforeRender(_,M,F,y),m=Z.get(M,A.length),m.init(),A.push(m),ge.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),U.setFromProjectionMatrix(ge),re=this.localClippingEnabled,j=ue.init(this.clippingPlanes,re),f=Q.get(M,g.length),f.init(),g.push(f),Ni(M,F,0,_.sortObjects),f.finish(),_.sortObjects===!0&&f.sort(z,Y),this.info.render.frame++,j===!0&&ue.beginShadows();let V=m.state.shadowsArray;if(ve.render(V,M,F),j===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),te.render(f,M),m.setupLights(_._useLegacyLights),F.isArrayCamera){let q=F.cameras;for(let H=0,le=q.length;H<le;H++){let me=q[H];Fi(f,M,me,me.viewport)}}else Fi(f,M,F);y!==null&&(Pe.updateMultisampleRenderTarget(y),Pe.updateRenderTargetMipmap(y)),M.isScene===!0&&M.onAfterRender(_,M,F),pe.resetDefaultState(),T=-1,b=null,A.pop(),m=A.length>0?A[A.length-1]:null,g.pop(),f=g.length>0?g[g.length-1]:null};function Ni(M,F,V,q){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||U.intersectsSprite(M)){q&&Me.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ge);let le=$.update(M),me=M.material;me.visible&&f.push(M,le,me,V,Me.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||U.intersectsObject(M))){let le=$.update(M),me=M.material;if(q&&(M.boundingSphere===void 0?(le.boundingSphere===null&&le.computeBoundingSphere(),Me.copy(le.boundingSphere.center)):(M.boundingSphere===null&&M.computeBoundingSphere(),Me.copy(M.boundingSphere.center)),Me.applyMatrix4(M.matrixWorld).applyMatrix4(ge)),Array.isArray(me)){let Se=le.groups;for(let Ie=0,He=Se.length;Ie<He;Ie++){let Ue=Se[Ie],Ne=me[Ue.materialIndex];Ne&&Ne.visible&&f.push(M,le,Ne,V,Me.z,Ue)}}else me.visible&&f.push(M,le,me,V,Me.z,null)}}let H=M.children;for(let le=0,me=H.length;le<me;le++)Ni(H[le],F,V,q)}function Fi(M,F,V,q){let H=M.opaque,le=M.transmissive,me=M.transparent;m.setupLightsView(V),j===!0&&ue.setGlobalState(_.clippingPlanes,V),le.length>0&&zp(H,le,F,V),q&&Ee.viewport(E.copy(q)),H.length>0&&Hs(H,F,V),le.length>0&&Hs(le,F,V),me.length>0&&Hs(me,F,V),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function zp(M,F,V,q){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;let H=de.isWebGL2;ce===null&&(ce=new jt(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")?Ua:Gt,minFilter:$a,samples:H?4:0})),_.getDrawingBufferSize(_e),H?ce.setSize(_e.x,_e.y):ce.setSize(Qn(_e.x),Qn(_e.y));let le=_.getRenderTarget();_.setRenderTarget(ce),_.getClearColor(G),X=_.getClearAlpha(),X<1&&_.setClearColor(16777215,.5),_.clear();let me=_.toneMapping;_.toneMapping=0,Hs(M,V,q),Pe.updateMultisampleRenderTarget(ce),Pe.updateRenderTargetMipmap(ce);let Se=!1;for(let Ie=0,He=F.length;Ie<He;Ie++){let Ue=F[Ie],Ne=Ue.object,Nt=Ue.geometry,Tt=Ue.material,gi=Ue.group;if(Tt.side===2&&Ne.layers.test(q.layers)){let Xi=Tt.side;Tt.side=1,Tt.needsUpdate=!0,vu(Ne,V,q,Nt,Tt,gi),Tt.side=Xi,Tt.needsUpdate=!0,Se=!0}}Se===!0&&(Pe.updateMultisampleRenderTarget(ce),Pe.updateRenderTargetMipmap(ce)),_.setRenderTarget(le),_.setClearColor(G,X),_.toneMapping=me}function Hs(M,F,V){let q=F.isScene===!0?F.overrideMaterial:null;for(let H=0,le=M.length;H<le;H++){let me=M[H],Se=me.object,Ie=me.geometry,He=q===null?me.material:q,Ue=me.group;Se.layers.test(V.layers)&&vu(Se,F,V,Ie,He,Ue)}}function vu(M,F,V,q,H,le){M.onBeforeRender(_,F,V,q,H,le),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),H.onBeforeRender(_,F,V,q,M,le),H.transparent===!0&&H.side===2&&H.forceSinglePass===!1?(H.side=1,H.needsUpdate=!0,_.renderBufferDirect(V,F,q,H,M,le),H.side=0,H.needsUpdate=!0,_.renderBufferDirect(V,F,q,H,M,le),H.side=2):_.renderBufferDirect(V,F,q,H,M,le),M.onAfterRender(_,F,V,q,H,le)}function zs(M,F,V){F.isScene!==!0&&(F=Ce);let q=Re.get(M),H=m.state.lights,le=m.state.shadowsArray,me=H.state.version,Se=ee.getParameters(M,H.state,le,F,V),Ie=ee.getProgramCacheKey(Se),He=q.programs;q.environment=M.isMeshStandardMaterial?F.environment:null,q.fog=F.fog,q.envMap=(M.isMeshStandardMaterial?S:w).get(M.envMap||q.environment),He===void 0&&(M.addEventListener("dispose",se),He=new Map,q.programs=He);let Ue=He.get(Ie);if(Ue!==void 0){if(q.currentProgram===Ue&&q.lightsStateVersion===me)return Eu(M,Se),Ue}else Se.uniforms=ee.getUniforms(M),M.onBuild(V,Se,_),M.onBeforeCompile(Se,_),Ue=ee.acquireProgram(Se,Ie),He.set(Ie,Ue),q.uniforms=Se.uniforms;let Ne=q.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ne.clippingPlanes=ue.uniform),Eu(M,Se),q.needsLights=qp(M),q.lightsStateVersion=me,q.needsLights&&(Ne.ambientLightColor.value=H.state.ambient,Ne.lightProbe.value=H.state.probe,Ne.directionalLights.value=H.state.directional,Ne.directionalLightShadows.value=H.state.directionalShadow,Ne.spotLights.value=H.state.spot,Ne.spotLightShadows.value=H.state.spotShadow,Ne.rectAreaLights.value=H.state.rectArea,Ne.ltc_1.value=H.state.rectAreaLTC1,Ne.ltc_2.value=H.state.rectAreaLTC2,Ne.pointLights.value=H.state.point,Ne.pointLightShadows.value=H.state.pointShadow,Ne.hemisphereLights.value=H.state.hemi,Ne.directionalShadowMap.value=H.state.directionalShadowMap,Ne.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ne.spotShadowMap.value=H.state.spotShadowMap,Ne.spotLightMatrix.value=H.state.spotLightMatrix,Ne.spotLightMap.value=H.state.spotLightMap,Ne.pointShadowMap.value=H.state.pointShadowMap,Ne.pointShadowMatrix.value=H.state.pointShadowMatrix),q.currentProgram=Ue,q.uniformsList=null,Ue}function xu(M){if(M.uniformsList===null){let F=M.currentProgram.getUniforms();M.uniformsList=bn.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function Eu(M,F){let V=Re.get(M);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function Vp(M,F,V,q,H){F.isScene!==!0&&(F=Ce),Pe.resetTextureUnits();let le=F.fog,me=q.isMeshStandardMaterial?F.environment:null,Se=y===null?_.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:Ct,Ie=(q.isMeshStandardMaterial?S:w).get(q.envMap||me),He=q.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ue=!!V.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ne=!!V.morphAttributes.position,Nt=!!V.morphAttributes.normal,Tt=!!V.morphAttributes.color,gi=0;q.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(gi=_.toneMapping);let Xi=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Et=Xi===void 0?0:Xi.length,Fe=Re.get(q),to=m.state.lights;if(j===!0&&(re===!0||M!==b)){let _i=M===b&&q.id===T;ue.setState(q,M,_i)}let Yi=!1;q.version===Fe.__version?Fe.needsLights&&Fe.lightsStateVersion!==to.state.version?Yi=!0:Fe.outputColorSpace===Se?H.isBatchedMesh&&Fe.batching===!1||!H.isBatchedMesh&&Fe.batching===!0||H.isInstancedMesh&&Fe.instancing===!1||!H.isInstancedMesh&&Fe.instancing===!0||H.isSkinnedMesh&&Fe.skinning===!1||!H.isSkinnedMesh&&Fe.skinning===!0||H.isInstancedMesh&&Fe.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Fe.instancingColor===!1&&H.instanceColor!==null?Yi=!0:Fe.envMap===Ie?q.fog===!0&&Fe.fog!==le||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==ue.numPlanes||Fe.numIntersection!==ue.numIntersection)?Yi=!0:Fe.vertexAlphas===He&&Fe.vertexTangents===Ue&&Fe.morphTargets===Ne&&Fe.morphNormals===Nt&&Fe.morphColors===Tt&&Fe.toneMapping===gi?de.isWebGL2===!0&&Fe.morphTargetsCount!==Et&&(Yi=!0):Yi=!0:Yi=!0:Yi=!0:(Yi=!0,Fe.__version=q.version);let Rr=Fe.currentProgram;Yi===!0&&(Rr=zs(q,F,H));let yu=!1,ts=!1,io=!1,Ft=Rr.getUniforms(),Pr=Fe.uniforms;if(Ee.useProgram(Rr.program)&&(yu=!0,ts=!0,io=!0),q.id!==T&&(T=q.id,ts=!0),yu||b!==M){Ft.setValue(O,"projectionMatrix",M.projectionMatrix),Ft.setValue(O,"viewMatrix",M.matrixWorldInverse);let _i=Ft.map.cameraPosition;_i!==void 0&&_i.setValue(O,Me.setFromMatrixPosition(M.matrixWorld)),de.logarithmicDepthBuffer&&Ft.setValue(O,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ft.setValue(O,"isOrthographic",M.isOrthographicCamera===!0),b!==M&&(b=M,ts=!0,io=!0)}if(H.isSkinnedMesh){Ft.setOptional(O,H,"bindMatrix"),Ft.setOptional(O,H,"bindMatrixInverse");let _i=H.skeleton;_i&&(de.floatVertexTextures?(_i.boneTexture===null&&_i.computeBoneTexture(),Ft.setValue(O,"boneTexture",_i.boneTexture,Pe)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}H.isBatchedMesh&&(Ft.setOptional(O,H,"batchingTexture"),Ft.setValue(O,"batchingTexture",H._matricesTexture,Pe));let ro=V.morphAttributes;if((ro.position!==void 0||ro.normal!==void 0||ro.color!==void 0&&de.isWebGL2===!0)&&tt.update(H,V,Rr),(ts||Fe.receiveShadow!==H.receiveShadow)&&(Fe.receiveShadow=H.receiveShadow,Ft.setValue(O,"receiveShadow",H.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Pr.envMap.value=Ie,Pr.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),ts&&(Ft.setValue(O,"toneMappingExposure",_.toneMappingExposure),Fe.needsLights&&Wp(Pr,io),le&&q.fog===!0&&Ae.refreshFogUniforms(Pr,le),Ae.refreshMaterialUniforms(Pr,q,N,D,ce),bn.upload(O,xu(Fe),Pr,Pe)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(bn.upload(O,xu(Fe),Pr,Pe),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ft.setValue(O,"center",H.center),Ft.setValue(O,"modelViewMatrix",H.modelViewMatrix),Ft.setValue(O,"normalMatrix",H.normalMatrix),Ft.setValue(O,"modelMatrix",H.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let _i=q.uniformsGroups;for(let ao=0,Xp=_i.length;ao<Xp;ao++)if(de.isWebGL2){let Su=_i[ao];Oe.update(Su,Rr),Oe.bind(Su,Rr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Rr}function Wp(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function qp(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(M,F,V){Re.get(M.texture).__webglTexture=F,Re.get(M.depthTexture).__webglTexture=V;let q=Re.get(M);q.__hasExternalTextures=!0,q.__hasExternalTextures&&(q.__autoAllocateDepthBuffer=V===void 0,q.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(M,F){let V=Re.get(M);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(M,F=0,V=0){y=M,x=F,C=V;let q=!0,H=null,le=!1,me=!1;if(M){let Se=Re.get(M);Se.__useDefaultFramebuffer===void 0?Se.__webglFramebuffer===void 0?Pe.setupRenderTarget(M):Se.__hasExternalTextures&&Pe.rebindTextures(M,Re.get(M.texture).__webglTexture,Re.get(M.depthTexture).__webglTexture):(Ee.bindFramebuffer(O.FRAMEBUFFER,null),q=!1);let Ie=M.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(me=!0);let He=Re.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(H=Array.isArray(He[F])?He[F][V]:He[F],le=!0):H=de.isWebGL2&&M.samples>0&&Pe.useMultisampledRTT(M)===!1?Re.get(M).__webglMultisampledFramebuffer:Array.isArray(He)?He[V]:He,E.copy(M.viewport),I.copy(M.scissor),B=M.scissorTest}else E.copy(W).multiplyScalar(N).floor(),I.copy(J).multiplyScalar(N).floor(),B=K;if(Ee.bindFramebuffer(O.FRAMEBUFFER,H)&&de.drawBuffers&&q&&Ee.drawBuffers(M,H),Ee.viewport(E),Ee.scissor(I),Ee.setScissorTest(B),le){let Se=Re.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+F,Se.__webglTexture,V)}else if(me){let Se=Re.get(M.texture),Ie=F||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Se.__webglTexture,V||0,Ie)}T=-1},this.readRenderTargetPixels=function(M,F,V,q,H,le,me){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Re.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se){Ee.bindFramebuffer(O.FRAMEBUFFER,Se);try{let Ie=M.texture,He=Ie.format,Ue=Ie.type;if(He!==1023&&fe.convert(He)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ne=Ue===1016&&(Ge.has("EXT_color_buffer_half_float")||de.isWebGL2&&Ge.has("EXT_color_buffer_float"));if(Ue!==1009&&fe.convert(Ue)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ue===1015&&(de.isWebGL2||Ge.has("OES_texture_float")||Ge.has("WEBGL_color_buffer_float")))&&!Ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-q&&V>=0&&V<=M.height-H&&O.readPixels(F,V,q,H,fe.convert(He),fe.convert(Ue),le)}finally{let Ie=y===null?null:Re.get(y).__webglFramebuffer;Ee.bindFramebuffer(O.FRAMEBUFFER,Ie)}}},this.copyFramebufferToTexture=function(M,F,V=0){let q=2**-V,H=Math.floor(F.image.width*q),le=Math.floor(F.image.height*q);Pe.setTexture2D(F,0),O.copyTexSubImage2D(O.TEXTURE_2D,V,0,0,M.x,M.y,H,le),Ee.unbindTexture()},this.copyTextureToTexture=function(M,F,V,q=0){let H=F.image.width,le=F.image.height,me=fe.convert(V.format),Se=fe.convert(V.type);Pe.setTexture2D(V,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment),F.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,q,M.x,M.y,H,le,me,Se,F.image.data):F.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,q,M.x,M.y,F.mipmaps[0].width,F.mipmaps[0].height,me,F.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,q,M.x,M.y,me,Se,F.image),q===0&&V.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),Ee.unbindTexture()},this.copyTextureToTexture3D=function(M,F,V,q,H=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let le=M.max.x-M.min.x+1,me=M.max.y-M.min.y+1,Se=M.max.z-M.min.z+1,Ie=fe.convert(q.format),He=fe.convert(q.type),Ue;if(q.isData3DTexture)Pe.setTexture3D(q,0),Ue=O.TEXTURE_3D;else if(q.isDataArrayTexture||q.isCompressedArrayTexture)Pe.setTexture2DArray(q,0),Ue=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,q.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,q.unpackAlignment);let Ne=O.getParameter(O.UNPACK_ROW_LENGTH),Nt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Tt=O.getParameter(O.UNPACK_SKIP_PIXELS),gi=O.getParameter(O.UNPACK_SKIP_ROWS),Xi=O.getParameter(O.UNPACK_SKIP_IMAGES),Et=V.isCompressedTexture?V.mipmaps[H]:V.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,Et.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Et.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,M.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,M.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,M.min.z),V.isDataTexture||V.isData3DTexture?O.texSubImage3D(Ue,H,F.x,F.y,F.z,le,me,Se,Ie,He,Et.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Ue,H,F.x,F.y,F.z,le,me,Se,Ie,Et.data)):O.texSubImage3D(Ue,H,F.x,F.y,F.z,le,me,Se,Ie,He,Et),O.pixelStorei(O.UNPACK_ROW_LENGTH,Ne),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Nt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Tt),O.pixelStorei(O.UNPACK_SKIP_ROWS,gi),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Xi),H===0&&q.generateMipmaps&&O.generateMipmap(Ue),Ee.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?Pe.setTextureCube(M,0):M.isData3DTexture?Pe.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Pe.setTexture2DArray(M,0):Pe.setTexture2D(M,0),Ee.unbindTexture()},this.resetState=function(){x=0,C=0,y=null,Ee.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ts}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e==="display-p3"?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace==="display-p3-linear"?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace==="srgb"?Nc:Uc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===3001?Ye:Ct}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},eg=class extends dd{};eg.prototype.isWebGL1Renderer=!0;var Gi=class extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},tg=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Fc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,a=this.stride;r<a;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},qt=new P,ig=class pd{constructor(t,i,r,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=i,this.offset=r,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let i=0,r=this.data.count;i<r;i++)qt.fromBufferAttribute(this,i),qt.applyMatrix4(t),this.setXYZ(i,qt.x,qt.y,qt.z);return this}applyNormalMatrix(t){for(let i=0,r=this.count;i<r;i++)qt.fromBufferAttribute(this,i),qt.applyNormalMatrix(t),this.setXYZ(i,qt.x,qt.y,qt.z);return this}transformDirection(t){for(let i=0,r=this.count;i<r;i++)qt.fromBufferAttribute(this,i),qt.transformDirection(t),this.setXYZ(i,qt.x,qt.y,qt.z);return this}setX(t,i){return this.normalized&&(i=$e(i,this.array)),this.data.array[t*this.data.stride+this.offset]=i,this}setY(t,i){return this.normalized&&(i=$e(i,this.array)),this.data.array[t*this.data.stride+this.offset+1]=i,this}setZ(t,i){return this.normalized&&(i=$e(i,this.array)),this.data.array[t*this.data.stride+this.offset+2]=i,this}setW(t,i){return this.normalized&&(i=$e(i,this.array)),this.data.array[t*this.data.stride+this.offset+3]=i,this}getX(t){let i=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(i=Oi(i,this.array)),i}getY(t){let i=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(i=Oi(i,this.array)),i}getZ(t){let i=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(i=Oi(i,this.array)),i}getW(t){let i=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(i=Oi(i,this.array)),i}setXY(t,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(i=$e(i,this.array),r=$e(r,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=r,this}setXYZ(t,i,r,a){return t=t*this.data.stride+this.offset,this.normalized&&(i=$e(i,this.array),r=$e(r,this.array),a=$e(a,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=r,this.data.array[t+2]=a,this}setXYZW(t,i,r,a,s){return t=t*this.data.stride+this.offset,this.normalized&&(i=$e(i,this.array),r=$e(r,this.array),a=$e(a,this.array),s=$e(s,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=r,this.data.array[t+2]=a,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let i=[];for(let r=0;r<this.count;r++){let a=r*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)i.push(this.data.array[a+s])}return new ot(new this.array.constructor(i),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new pd(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let i=[];for(let r=0;r<this.count;r++){let a=r*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)i.push(this.data.array[a+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:i,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var oE=new P,lE=new P,uE=new P,hE=new oe,cE=new oe,dE=new ke,pE=new P,fE=new P,AE=new P,mE=new oe,gE=new oe,_E=new oe;var dh=new P,ph=new et,fh=new et,rg=new P,Ah=new ke,fn=new P,Ro=new qi,mh=new ke,Po=new Yn,fd=class extends dt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Jp,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ui),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,fn),this.boundingBox.expandByPoint(fn)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new qi),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,fn),this.boundingSphere.expandByPoint(fn)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ro.copy(this.boundingSphere),Ro.applyMatrix4(r),e.ray.intersectsSphere(Ro)!==!1&&(mh.copy(r).invert(),Po.copy(e.ray).applyMatrix4(mh),!(this.boundingBox!==null&&Po.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Po)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new et,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);let a=1/e.manhattanLength();a===1/0?e.set(1,0,0,0):e.multiplyScalar(a),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,r=this.geometry;ph.fromBufferAttribute(r.attributes.skinIndex,e),fh.fromBufferAttribute(r.attributes.skinWeight,e),dh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let a=0;a<4;a++){let s=fh.getComponent(a);if(s!==0){let n=ph.getComponent(a);Ah.multiplyMatrices(i.bones[n].matrixWorld,i.boneInverses[n]),t.addScaledVector(rg.copy(dh).applyMatrix4(Ah),s)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Ad=class extends wt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Kt=class extends Dt{constructor(e=null,t=1,i=1,r,a,s,n,o,u=si,h=si,d,l){super(null,s,n,o,u,h,r,a,d,l),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},gh=new ke,ag=new ke,sg=class md{constructor(t=[],i=[]){this.uuid=Di(),this.bones=t.slice(0),this.boneInverses=i,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,i=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),i.length===0)this.calculateInverses();else if(t.length!==i.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let r=0,a=this.bones.length;r<a;r++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,i=this.bones.length;t<i;t++){let r=new ke;this.bones[t]&&r.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(r)}}pose(){for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];r&&r.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];r&&(r.parent&&r.parent.isBone?(r.matrix.copy(r.parent.matrixWorld).invert(),r.matrix.multiply(r.matrixWorld)):r.matrix.copy(r.matrixWorld),r.matrix.decompose(r.position,r.quaternion,r.scale))}}update(){let t=this.bones,i=this.boneInverses,r=this.boneMatrices,a=this.boneTexture;for(let s=0,n=t.length;s<n;s++){let o=t[s]?t[s].matrixWorld:ag;gh.multiplyMatrices(o,i[s]),gh.toArray(r,s*16)}a!==null&&(a.needsUpdate=!0)}clone(){return new md(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let i=new Float32Array(t*t*4);i.set(this.boneMatrices);let r=new Kt(i,t,t,mt,Da);return r.needsUpdate=!0,this.boneMatrices=i,this.boneTexture=r,this}getBoneByName(t){for(let i=0,r=this.bones.length;i<r;i++){let a=this.bones[i];if(a.name===t)return a}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,i){this.uuid=t.uuid;for(let r=0,a=t.bones.length;r<a;r++){let s=t.bones[r],n=i[s];n===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),n=new Ad),this.bones.push(n),this.boneInverses.push(new ke().fromArray(t.boneInverses[r]))}return this.init(),this}toJSON(){let t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let i=this.bones,r=this.boneInverses;for(let a=0,s=i.length;a<s;a++){let n=i[a];t.bones.push(n.uuid);let o=r[a];t.boneInverses.push(o.toArray())}return t}},pl=class extends ot{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},_a=new ke,_h=new ke,An=[],vh=new Ui,ng=new ke,ns=new dt,os=new qi,og=class extends dt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new pl(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,ng)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,_a),vh.copy(e.boundingBox).applyMatrix4(_a),this.boundingBox.union(vh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,_a),os.copy(e.boundingSphere).applyMatrix4(_a),this.boundingSphere.union(os)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let i=this.matrixWorld,r=this.count;if(ns.geometry=this.geometry,ns.material=this.material,ns.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),os.copy(this.boundingSphere),os.applyMatrix4(i),e.ray.intersectsSphere(os)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,_a),_h.multiplyMatrices(i,_a),ns.matrixWorld=_h,ns.raycast(e,An);for(let s=0,n=An.length;s<n;s++){let o=An[s];o.instanceId=a,o.object=this,t.push(o)}An.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new pl(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}},gd=class extends zi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},xh=new P,Eh=new P,yh=new ke,Lo=new Yn,mn=new qi,Yl=class extends wt{constructor(e=new ni,t=new gd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,a=t.count;r<a;r++)xh.fromBufferAttribute(t,r-1),Eh.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=xh.distanceTo(Eh);e.setAttribute("lineDistance",new ei(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),mn.copy(i.boundingSphere),mn.applyMatrix4(r),mn.radius+=a,e.ray.intersectsSphere(mn)===!1)return;yh.copy(r).invert(),Lo.copy(e.ray).applyMatrix4(yh);let n=a/((this.scale.x+this.scale.y+this.scale.z)/3),o=n*n,u=new P,h=new P,d=new P,l=new P,c=this.isLineSegments?2:1,p=i.index,f=i.attributes.position;if(p!==null){let m=Math.max(0,s.start),g=Math.min(p.count,s.start+s.count);for(let A=m,_=g-1;A<_;A+=c){let v=p.getX(A),x=p.getX(A+1);if(u.fromBufferAttribute(f,v),h.fromBufferAttribute(f,x),Lo.distanceSqToSegment(u,h,l,d)>o)continue;l.applyMatrix4(this.matrixWorld);let C=e.ray.origin.distanceTo(l);C<e.near||C>e.far||t.push({distance:C,point:d.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}else{let m=Math.max(0,s.start),g=Math.min(f.count,s.start+s.count);for(let A=m,_=g-1;A<_;A+=c){if(u.fromBufferAttribute(f,A),h.fromBufferAttribute(f,A+1),Lo.distanceSqToSegment(u,h,l,d)>o)continue;l.applyMatrix4(this.matrixWorld);let v=e.ray.origin.distanceTo(l);v<e.near||v>e.far||t.push({distance:v,point:d.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let s=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=r}}}}},Sh=new P,Ch=new P,lg=class extends Yl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,a=t.count;r<a;r+=2)Sh.fromBufferAttribute(t,r),Ch.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Sh.distanceTo(Ch);e.setAttribute("lineDistance",new ei(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ug=class extends Yl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},_d=class extends zi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Mh=new ke,fl=new Yn,gn=new qi,_n=new P,jl=class extends wt{constructor(e=new ni,t=new _d){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,a=e.params.Points.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),gn.copy(i.boundingSphere),gn.applyMatrix4(r),gn.radius+=a,e.ray.intersectsSphere(gn)===!1)return;Mh.copy(r).invert(),fl.copy(e.ray).applyMatrix4(Mh);let n=a/((this.scale.x+this.scale.y+this.scale.z)/3),o=n*n,u=i.index,h=i.attributes.position;if(u!==null){let d=Math.max(0,s.start),l=Math.min(u.count,s.start+s.count);for(let c=d,p=l;c<p;c++){let f=u.getX(c);_n.fromBufferAttribute(h,f),Ih(_n,f,o,r,e,t,this)}}else{let d=Math.max(0,s.start),l=Math.min(h.count,s.start+s.count);for(let c=d,p=l;c<p;c++)_n.fromBufferAttribute(h,c),Ih(_n,c,o,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let s=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=r}}}}};function Ih(e,t,i,r,a,s,n){let o=fl.distanceSqToPoint(e);if(o<i){let u=new P;fl.closestPointToPoint(e,u),u.applyMatrix4(r);let h=a.ray.origin.distanceTo(u);if(h<a.near||h>a.far)return;s.push({distance:h,distanceToRay:Math.sqrt(o),point:u,index:t,face:null,object:n})}}var vd=class extends Dt{constructor(e,t,i,r,a,s,n,o,u){super(e,t,i,r,a,s,n,o,u),this.isVideoTexture=!0,this.minFilter=s===void 0?qe:s,this.magFilter=a===void 0?qe:a,this.generateMipmaps=!1;let h=this;function d(){h.needsUpdate=!0,e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(d)}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;!("requestVideoFrameCallback"in e)&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}},Kn=class extends Dt{constructor(e,t,i,r,a,s,n,o,u,h,d,l){super(null,s,n,o,u,h,r,a,d,l),this.isCompressedTexture=!0,this.image={width:t,height:i},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},hg=class extends Kn{constructor(e,t,i,r,a,s){super(e,t,i,a,s),this.isCompressedArrayTexture=!0,this.image.depth=r,this.wrapR=Li}},cg=class extends Kn{constructor(e,t,i){super(void 0,e[0].width,e[0].height,t,i,301),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}};var xd=class Ed extends ni{constructor(t=1,i=32,r=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:r,thetaLength:a},i=Math.max(3,i);let s=[],n=[],o=[],u=[],h=new P,d=new oe;n.push(0,0,0),o.push(0,0,1),u.push(.5,.5);for(let l=0,c=3;l<=i;l++,c+=3){let p=r+l/i*a;h.x=t*Math.cos(p),h.y=t*Math.sin(p),n.push(h.x,h.y,h.z),o.push(0,0,1),d.x=(n[c]/t+1)/2,d.y=(n[c+1]/t+1)/2,u.push(d.x,d.y)}for(let l=1;l<=i;l++)s.push(l,l+1,0);this.setIndex(s),this.setAttribute("position",new ei(n,3)),this.setAttribute("normal",new ei(o,3)),this.setAttribute("uv",new ei(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ed(t.radius,t.segments,t.thetaStart,t.thetaLength)}};var Fa=class extends zi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ur=class extends Fa{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function vn(e,t,i){return!e||!i&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function dg(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function pg(e){function t(a,s){return e[a]-e[s]}let i=e.length,r=Array(i);for(let a=0;a!==i;++a)r[a]=a;return r.sort(t),r}function Th(e,t,i){let r=e.length,a=new e.constructor(r);for(let s=0,n=0;n!==r;++s){let o=i[s]*t;for(let u=0;u!==t;++u)a[n++]=e[o+u]}return a}function yd(e,t,i,r){let a=1,s=e[0];for(;s!==void 0&&s[r]===void 0;)s=e[a++];if(s===void 0)return;let n=s[r];if(n!==void 0)if(Array.isArray(n))do n=s[r],n!==void 0&&(t.push(s.time),i.push.apply(i,n)),s=e[a++];while(s!==void 0);else if(n.toArray!==void 0)do n=s[r],n!==void 0&&(t.push(s.time),n.toArray(i,i.length)),s=e[a++];while(s!==void 0);else do n=s[r],n!==void 0&&(t.push(s.time),i.push(n)),s=e[a++];while(s!==void 0)}var Os=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(i):r,this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],a=t[i-1];e:{t:{let s;i:{r:if(!(e<r)){for(let n=i+2;;){if(r===void 0){if(e<a)break r;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===n)break;if(a=r,r=t[++i],e<r)break t}s=t.length;break i}if(!(e>=a)){let n=t[1];e<n&&(i=2,a=n);for(let o=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===o)break;if(r=a,a=t[--i-1],e>=a)break t}s=i,i=0;break i}break e}for(;i<s;){let n=i+s>>>1;e<t[n]?s=n:i=n+1}if(r=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r;for(let s=0;s!==r;++s)t[s]=i[a+s];return t}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}},fg=class extends Os{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wa,endingEnd:wa}}intervalChanged_(e,t,i){let r=this.parameterPositions,a=e-2,s=e+1,n=r[a],o=r[s];if(n===void 0)switch(this.getSettings_().endingStart){case ba:a=e,n=2*t-i;break;case Un:a=r.length-2,n=t+r[a]-r[a+1];break;default:a=e,n=i}if(o===void 0)switch(this.getSettings_().endingEnd){case ba:s=e,o=2*i-t;break;case Un:s=1,o=i+r[1]-r[0];break;default:s=e-1,o=t}let u=(i-t)*.5,h=this.valueSize;this._weightPrev=u/(t-n),this._weightNext=u/(o-i),this._offsetPrev=a*h,this._offsetNext=s*h}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,n=this.valueSize,o=e*n,u=o-n,h=this._offsetPrev,d=this._offsetNext,l=this._weightPrev,c=this._weightNext,p=(i-t)/(r-t),f=p*p,m=f*p,g=-l*m+2*l*f-l*p,A=(1+l)*m+(-1.5-2*l)*f+(-.5+l)*p+1,_=(-1-c)*m+(1.5+c)*f+.5*p,v=c*m-c*f;for(let x=0;x!==n;++x)a[x]=g*s[h+x]+A*s[u+x]+_*s[o+x]+v*s[d+x];return a}},Sd=class extends Os{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,n=this.valueSize,o=e*n,u=o-n,h=(i-t)/(r-t),d=1-h;for(let l=0;l!==n;++l)a[l]=s[u+l]*d+s[o+l]*h;return a}},Ag=class extends Os{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Vi=class{constructor(e,t,i,r){if(e===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=vn(t,this.TimeBufferType),this.values=vn(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:vn(e.times,Array),values:vn(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Ag(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Sd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Is:t=this.InterpolantFactoryMethodDiscrete;break;case za:t=this.InterpolantFactoryMethodLinear;break;case so:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Is;case this.InterpolantFactoryMethodLinear:return za;case this.InterpolantFactoryMethodSmooth:return so}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,a=0,s=r-1;for(;a!==r&&i[a]<e;)++a;for(;s!==-1&&i[s]>t;)--s;if(++s,a!==0||s!==r){a>=s&&(s=Math.max(s,1),a=s-1);let n=this.getValueSize();this.times=i.slice(a,s),this.values=this.values.slice(a*n,s*n)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,a=i.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let n=0;n!==a;n++){let o=i[n];if(typeof o=="number"&&isNaN(o)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,n,o),e=!1;break}if(s!==null&&s>o){console.error("THREE.KeyframeTrack: Out of order keys.",this,n,o,s),e=!1;break}s=o}if(r!==void 0&&dg(r))for(let n=0,o=r.length;n!==o;++n){let u=r[n];if(isNaN(u)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,n,u),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===so,a=e.length-1,s=1;for(let n=1;n<a;++n){let o=!1,u=e[n];if(u!==e[n+1]&&(n!==1||u!==e[0]))if(r)o=!0;else{let h=n*i,d=h-i,l=h+i;for(let c=0;c!==i;++c){let p=t[h+c];if(p!==t[d+c]||p!==t[l+c]){o=!0;break}}}if(o){if(n!==s){e[s]=e[n];let h=n*i,d=s*i;for(let l=0;l!==i;++l)t[d+l]=t[h+l]}++s}}if(a>0){e[s]=e[a];for(let n=a*i,o=s*i,u=0;u!==i;++u)t[o+u]=t[n+u];++s}return s===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,s),this.values=t.slice(0,s*i)),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Vi.prototype.TimeBufferType=Float32Array,Vi.prototype.ValueBufferType=Float32Array,Vi.prototype.DefaultInterpolation=za;var Ca=class extends Vi{};Ca.prototype.ValueTypeName="bool",Ca.prototype.ValueBufferType=Array,Ca.prototype.DefaultInterpolation=Is,Ca.prototype.InterpolantFactoryMethodLinear=void 0,Ca.prototype.InterpolantFactoryMethodSmooth=void 0;var Cd=class extends Vi{};Cd.prototype.ValueTypeName="color";var qa=class extends Vi{};qa.prototype.ValueTypeName="number";var mg=class extends Os{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,n=this.valueSize,o=(i-t)/(r-t),u=e*n;for(let h=u+n;u!==h;u+=4)_t.slerpFlat(a,0,s,u-n,s,u,o);return a}},Yr=class extends Vi{InterpolantFactoryMethodLinear(e){return new mg(this.times,this.values,this.getValueSize(),e)}};Yr.prototype.ValueTypeName="quaternion",Yr.prototype.DefaultInterpolation=za,Yr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ma=class extends Vi{};Ma.prototype.ValueTypeName="string",Ma.prototype.ValueBufferType=Array,Ma.prototype.DefaultInterpolation=Is,Ma.prototype.InterpolantFactoryMethodLinear=void 0,Ma.prototype.InterpolantFactoryMethodSmooth=void 0;var Xa=class extends Vi{};Xa.prototype.ValueTypeName="vector";var Al=class{constructor(e,t=-1,i,r=Hl){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=Di(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,r=1/(e.fps||1);for(let s=0,n=i.length;s!==n;++s)t.push(_g(i[s]).scale(r));let a=new this(e.name,e.duration,t,e.blendMode);return a.uuid=e.uuid,a}static toJSON(e){let t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let a=0,s=i.length;a!==s;++a)t.push(Vi.toJSON(i[a]));return r}static CreateFromMorphTargetSequence(e,t,i,r){let a=t.length,s=[];for(let n=0;n<a;n++){let o=[],u=[];o.push((n+a-1)%a,n,(n+1)%a),u.push(0,1,0);let h=pg(o);o=Th(o,1,h),u=Th(u,1,h),!r&&o[0]===0&&(o.push(a),u.push(u[0])),s.push(new qa(".morphTargetInfluences["+t[n].name+"]",o,u).scale(1/i))}return new this(e,-1,s)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let r={},a=/^([\w-]*?)([\d]+)$/;for(let n=0,o=e.length;n<o;n++){let u=e[n],h=u.name.match(a);if(h&&h.length>1){let d=h[1],l=r[d];l||(r[d]=l=[]),l.push(u)}}let s=[];for(let n in r)s.push(this.CreateFromMorphTargetSequence(n,r[n],t,i));return s}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(h,d,l,c,p){if(l.length!==0){let f=[],m=[];yd(l,f,m,c),f.length!==0&&p.push(new h(d,f,m))}},r=[],a=e.name||"default",s=e.fps||30,n=e.blendMode,o=e.length||-1,u=e.hierarchy||[];for(let h=0;h<u.length;h++){let d=u[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let l={},c;for(c=0;c<d.length;c++)if(d[c].morphTargets)for(let p=0;p<d[c].morphTargets.length;p++)l[d[c].morphTargets[p]]=-1;for(let p in l){let f=[],m=[];for(let g=0;g!==d[c].morphTargets.length;++g){let A=d[c];f.push(A.time),m.push(+(A.morphTarget===p))}r.push(new qa(".morphTargetInfluence["+p+"]",f,m))}o=l.length*s}else{let l=".bones["+t[h].name+"]";i(Xa,l+".position",d,"pos",r),i(Yr,l+".quaternion",d,"rot",r),i(Xa,l+".scale",d,"scl",r)}}return r.length===0?null:new this(a,o,r,n)}resetDuration(){let e=this.tracks,t=0;for(let i=0,r=e.length;i!==r;++i){let a=this.tracks[i];t=Math.max(t,a.times[a.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&(e=this.tracks[t].validate());return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function gg(e){switch(e.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return qa;case"vector":case"vector2":case"vector3":case"vector4":return Xa;case"color":return Cd;case"quaternion":return Yr;case"bool":case"boolean":return Ca;case"string":return Ma}throw Error("THREE.KeyframeTrack: Unsupported typeName: "+e)}function _g(e){if(e.type===void 0)throw Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=gg(e.type);if(e.times===void 0){let i=[],r=[];yd(e.keys,i,r,"value"),e.times=i,e.values=r}return t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e)}var _r={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(this.files[e]=t)},get:function(e){if(this.enabled!==!1)return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}},Md=class{constructor(e,t,i){let r=this,a=!1,s=0,n=0,o,u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){n++,a===!1&&r.onStart!==void 0&&r.onStart(h,s,n),a=!0},this.itemEnd=function(h){s++,r.onProgress!==void 0&&r.onProgress(h,s,n),s===n&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return o?o(h):h},this.setURLModifier=function(h){return o=h,this},this.addHandler=function(h,d){return u.push(h,d),this},this.removeHandler=function(h){let d=u.indexOf(h);return d!==-1&&u.splice(d,2),this},this.getHandler=function(h){for(let d=0,l=u.length;d<l;d+=2){let c=u[d],p=u[d+1];if(c.global&&(c.lastIndex=0),c.test(h))return p}return null}}},vg=new Md,wr=class{constructor(e){this.manager=e===void 0?vg:e,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};wr.DEFAULT_MATERIAL_NAME="__DEFAULT";var er={},xg=class extends Error{constructor(e,t){super(e),this.response=t}},jr=class extends wr{constructor(e){super(e)}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=_r.get(e);if(a!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(a),this.manager.itemEnd(e)},0),a;if(er[e]!==void 0){er[e].push({onLoad:t,onProgress:i,onError:r});return}er[e]=[],er[e].push({onLoad:t,onProgress:i,onError:r});let s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),n=this.mimeType,o=this.responseType;fetch(s).then(u=>{if(u.status===200||u.status===0){if(u.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||u.body===void 0||u.body.getReader===void 0)return u;let h=er[e],d=u.body.getReader(),l=u.headers.get("Content-Length")||u.headers.get("X-File-Size"),c=l?parseInt(l):0,p=c!==0,f=0,m=new ReadableStream({start(g){A();function A(){d.read().then(({done:_,value:v})=>{if(_)g.close();else{f+=v.byteLength;let x=new ProgressEvent("progress",{lengthComputable:p,loaded:f,total:c});for(let C=0,y=h.length;C<y;C++){let T=h[C];T.onProgress&&T.onProgress(x)}g.enqueue(v),A()}})}}});return new Response(m)}else throw new xg(`fetch for "${u.url}" responded with ${u.status}: ${u.statusText}`,u)}).then(u=>{switch(o){case"arraybuffer":return u.arrayBuffer();case"blob":return u.blob();case"document":return u.text().then(h=>new DOMParser().parseFromString(h,n));case"json":return u.json();default:if(n===void 0)return u.text();{let h=/charset="?([^;"\s]*)"?/i.exec(n),d=h&&h[1]?h[1].toLowerCase():void 0,l=new TextDecoder(d);return u.arrayBuffer().then(c=>l.decode(c))}}}).then(u=>{_r.add(e,u);let h=er[e];delete er[e];for(let d=0,l=h.length;d<l;d++){let c=h[d];c.onLoad&&c.onLoad(u)}}).catch(u=>{let h=er[e];if(h===void 0)throw this.manager.itemError(e),u;delete er[e];for(let d=0,l=h.length;d<l;d++){let c=h[d];c.onError&&c.onError(u)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}},Eg=class extends wr{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=this,s=_r.get(e);if(s!==void 0)return a.manager.itemStart(e),setTimeout(function(){t&&t(s),a.manager.itemEnd(e)},0),s;let n=ws("img");function o(){h(),_r.add(e,this),t&&t(this),a.manager.itemEnd(e)}function u(d){h(),r&&r(d),a.manager.itemError(e),a.manager.itemEnd(e)}function h(){n.removeEventListener("load",o,!1),n.removeEventListener("error",u,!1)}return n.addEventListener("load",o,!1),n.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(n.crossOrigin=this.crossOrigin),a.manager.itemStart(e),n.src=e,n}},yg=class extends wr{constructor(e){super(e)}load(e,t,i,r){let a=new Dt,s=new Eg(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(n){a.image=n,a.needsUpdate=!0,t!==void 0&&t(a)},i,r),a}},Kl=class extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Do=new ke,wh=new P,bh=new P,Jl=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ql,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;wh.setFromMatrixPosition(e.matrixWorld),t.position.copy(wh),bh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bh),t.updateMatrixWorld(),Do.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Do),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Do)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Sg=class extends Jl{constructor(){super(new zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,i=Va*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,a=e.distance||t.far;(i!==t.fov||r!==t.aspect||a!==t.far)&&(t.fov=i,t.aspect=r,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Cg=class extends Kl{constructor(e,t,i=0,r=Math.PI/3,a=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.distance=i,this.angle=r,this.penumbra=a,this.decay=s,this.map=null,this.shadow=new Sg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Bh=new ke,ls=new P,Uo=new P,Mg=class extends Jl{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new oe(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,r=this.matrix,a=e.distance||i.far;a!==i.far&&(i.far=a,i.updateProjectionMatrix()),ls.setFromMatrixPosition(e.matrixWorld),i.position.copy(ls),Uo.copy(i.position),Uo.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Uo),i.updateMatrixWorld(),r.makeTranslation(-ls.x,-ls.y,-ls.z),Bh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bh)}},Id=class extends Kl{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Mg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Ig=class extends Jl{constructor(){super(new Qs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Tg=class extends Kl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new Ig}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},ys=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,r=e.length;i<r;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var wg=class extends wr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=this,s=_r.get(e);if(s!==void 0){if(a.manager.itemStart(e),s.then){s.then(u=>{t&&t(u),a.manager.itemEnd(e)}).catch(u=>{r&&r(u)});return}return setTimeout(function(){t&&t(s),a.manager.itemEnd(e)},0),s}let n={};n.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",n.headers=this.requestHeader;let o=fetch(e,n).then(function(u){return u.blob()}).then(function(u){return createImageBitmap(u,Object.assign(a.options,{colorSpaceConversion:"none"}))}).then(function(u){return _r.add(e,u),t&&t(u),a.manager.itemEnd(e),u}).catch(function(u){r&&r(u),_r.remove(e),a.manager.itemError(e),a.manager.itemEnd(e)});_r.add(e,o),a.manager.itemStart(e)}},bg=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Rh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Rh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Rh(){return(typeof performance>"u"?Date:performance).now()}var Bg=class{constructor(e,t,i){this.binding=e,this.valueSize=i;let r,a,s;switch(t){case"quaternion":r=this._slerp,a=this._slerpAdditive,s=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":r=this._select,a=this._select,s=this._setAdditiveIdentityOther,this.buffer=Array(i*5);break;default:r=this._lerp,a=this._lerpAdditive,s=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=a,this._setIdentity=s,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let i=this.buffer,r=this.valueSize,a=e*r+r,s=this.cumulativeWeight;if(s===0){for(let n=0;n!==r;++n)i[a+n]=i[n];s=t}else{s+=t;let n=t/s;this._mixBufferRegion(i,a,0,n,r)}this.cumulativeWeight=s}accumulateAdditive(e){let t=this.buffer,i=this.valueSize,r=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,i=this.buffer,r=e*t+t,a=this.cumulativeWeight,s=this.cumulativeWeightAdditive,n=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,a<1){let o=t*this._origIndex;this._mixBufferRegion(i,r,o,1-a,t)}s>0&&this._mixBufferRegionAdditive(i,r,this._addIndex*t,1,t);for(let o=t,u=t+t;o!==u;++o)if(i[o]!==i[o+t]){n.setValue(i,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,i=this.valueSize,r=i*this._origIndex;e.getValue(t,r);for(let a=i,s=r;a!==s;++a)t[a]=t[r+a%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,r,a){if(r>=.5)for(let s=0;s!==a;++s)e[t+s]=e[i+s]}_slerp(e,t,i,r){_t.slerpFlat(e,t,e,t,e,i,r)}_slerpAdditive(e,t,i,r,a){let s=this._workIndex*a;_t.multiplyQuaternionsFlat(e,s,e,t,e,i),_t.slerpFlat(e,t,e,t,e,s,r)}_lerp(e,t,i,r,a){let s=1-r;for(let n=0;n!==a;++n){let o=t+n;e[o]=e[o]*s+e[i+n]*r}}_lerpAdditive(e,t,i,r,a){for(let s=0;s!==a;++s){let n=t+s;e[n]=e[n]+e[i+s]*r}}},Rg="\\[\\]\\.:\\/",Pg=RegExp("[\\[\\]\\.:\\/]","g"),Zl="[^\\[\\]\\.:\\/]",Lg="[^"+Rg.replace("\\.","")+"]",Dg="((?:WC+[\\/:])*)".replace("WC",Zl),Ug="(WCOD+)?".replace("WCOD",Lg),Ng="(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC",Zl),Fg="\\.(WC+)(?:\\[(.+)\\])?".replace("WC",Zl),Qg=RegExp("^"+Dg+Ug+Ng+Fg+"$"),Og=["material","materials","bones","map"],kg=class{constructor(e,t,i){let r=i||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},ht=class Ia{constructor(t,i,r){this.path=i,this.parsedPath=r||Ia.parseTrackName(i),this.node=Ia.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new Ia.Composite(t,i,r):new Ia(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Pg,"")}static parseTrackName(t){let i=Qg.exec(t);if(i===null)throw Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},a=r.nodeName&&r.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let s=r.nodeName.substring(a+1);Og.indexOf(s)!==-1&&(r.nodeName=r.nodeName.substring(0,a),r.objectName=s)}if(r.propertyName===null||r.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(s){for(let n=0;n<s.length;n++){let o=s[n];if(o.name===i||o.uuid===i)return o;let u=r(o.children);if(u)return u}return null},a=r(t.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let a=0,s=r.length;a!==s;++a)t[i++]=r[a]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let a=0,s=r.length;a!==s;++a)r[a]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let a=0,s=r.length;a!==s;++a)r[a]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let a=0,s=r.length;a!==s;++a)r[a]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,a=i.propertyName,s=i.propertyIndex;if(t||(t=Ia.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let h=i.objectIndex;switch(r){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===h){h=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(h!==void 0){if(t[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}let n=t[a];if(n===void 0){let h=i.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+a+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate===void 0?t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate):o=this.Versioning.NeedsUpdate;let u=this.BindingType.Direct;if(s!==void 0){if(a==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}u=this.BindingType.ArrayElement,this.resolvedProperty=n,this.propertyIndex=s}else n.fromArray!==void 0&&n.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=n):Array.isArray(n)?(u=this.BindingType.EntireArray,this.resolvedProperty=n):this.propertyName=a;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ht.Composite=kg,ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray],ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Gg=class{constructor(e,t,i=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=r;let a=t.tracks,s=a.length,n=Array(s),o={endingStart:wa,endingEnd:wa};for(let u=0;u!==s;++u){let h=a[u].createInterpolant(null);n[u]=h,h.settings=o}this._interpolantSettings=o,this._interpolants=n,this._propertyBindings=Array(s),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=uf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i){if(e.fadeOut(t),this.fadeIn(t),i){let r=this._clip.duration,a=e._clip.duration,s=a/r,n=r/a;e.warp(1,s,t),this.warp(n,1,t)}return this}crossFadeTo(e,t,i){return e.crossFadeFrom(this,t,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){let r=this._mixer,a=r.time,s=this.timeScale,n=this._timeScaleInterpolant;n===null&&(n=r._lendControlInterpolant(),this._timeScaleInterpolant=n);let o=n.parameterPositions,u=n.sampleValues;return o[0]=a,o[1]=a+i,u[0]=e/s,u[1]=t/s,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,r){if(!this.enabled){this._updateWeight(e);return}let a=this._startTime;if(a!==null){let o=(e-a)*i;o<0||i===0?t=0:(this._startTime=null,t=i*o)}t*=this._updateTimeScale(e);let s=this._updateTime(t),n=this._updateWeight(e);if(n>0){let o=this._interpolants,u=this._propertyBindings;switch(this.blendMode){case cf:for(let h=0,d=o.length;h!==d;++h)o[h].evaluate(s),u[h].accumulateAdditive(n);break;case Hl:default:for(let h=0,d=o.length;h!==d;++h)o[h].evaluate(s),u[h].accumulate(r,n)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let i=this._weightInterpolant;if(i!==null){let r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,i=this.loop,r=this.time+e,a=this._loopCount,s=i===hf;if(e===0)return a===-1?r:s&&(a&1)==1?t-r:r;if(i===2200){a===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(a===-1&&(e>=0?(a=0,this._setEndings(!0,this.repetitions===0,s)):this._setEndings(this.repetitions===0,!0,s)),r>=t||r<0){let n=Math.floor(r/t);r-=t*n,a+=Math.abs(n);let o=this.repetitions-a;if(o<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(o===1){let u=e<0;this._setEndings(u,!u,s)}else this._setEndings(!1,!1,s);this._loopCount=a,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:n})}}else this.time=r;if(s&&(a&1)==1)return t-r}return r}_setEndings(e,t,i){let r=this._interpolantSettings;i?(r.endingStart=ba,r.endingEnd=ba):(e?r.endingStart=this.zeroSlopeAtStart?ba:wa:r.endingStart=Un,t?r.endingEnd=this.zeroSlopeAtEnd?ba:wa:r.endingEnd=Un)}_scheduleFading(e,t,i){let r=this._mixer,a=r.time,s=this._weightInterpolant;s===null&&(s=r._lendControlInterpolant(),this._weightInterpolant=s);let n=s.parameterPositions,o=s.sampleValues;return n[0]=a,o[0]=t,n[1]=a+e,o[1]=i,this}},Hg=new Float32Array(1),Td=class extends ta{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let i=e._localRoot||this._root,r=e._clip.tracks,a=r.length,s=e._propertyBindings,n=e._interpolants,o=i.uuid,u=this._bindingsByRootAndName,h=u[o];h===void 0&&(h={},u[o]=h);for(let d=0;d!==a;++d){let l=r[d],c=l.name,p=h[c];if(p!==void 0)++p.referenceCount,s[d]=p;else{if(p=s[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,o,c));continue}let f=t&&t._propertyBindings[d].binding.parsedPath;p=new Bg(ht.create(i,c,f),l.ValueTypeName,l.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,o,c),s[d]=p}n[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,r=e._clip.uuid,a=this._actionsByClip[r];this._bindAction(e,a&&a.knownActions[0]),this._addInactiveAction(e,r,i)}let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.useCount++===0&&(this._lendBinding(a),a.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let a=t[i];--a.useCount===0&&(a.restoreOriginalState(),this._takeBackBinding(a))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){let r=this._actions,a=this._actionsByClip,s=a[t];if(s===void 0)s={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,a[t]=s;else{let n=s.knownActions;e._byClipCacheIndex=n.length,n.push(e)}e._cacheIndex=r.length,r.push(e),s.actionByRoot[i]=e}_removeInactiveAction(e){let t=this._actions,i=t[t.length-1],r=e._cacheIndex;i._cacheIndex=r,t[r]=i,t.pop(),e._cacheIndex=null;let a=e._clip.uuid,s=this._actionsByClip,n=s[a],o=n.knownActions,u=o[o.length-1],h=e._byClipCacheIndex;u._byClipCacheIndex=h,o[h]=u,o.pop(),e._byClipCacheIndex=null;let d=n.actionByRoot,l=(e._localRoot||this._root).uuid;delete d[l],o.length===0&&delete s[a],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let a=t[i];--a.referenceCount===0&&this._removeInactiveBinding(a)}}_lendAction(e){let t=this._actions,i=e._cacheIndex,r=this._nActiveActions++,a=t[r];e._cacheIndex=r,t[r]=e,a._cacheIndex=i,t[i]=a}_takeBackAction(e){let t=this._actions,i=e._cacheIndex,r=--this._nActiveActions,a=t[r];e._cacheIndex=r,t[r]=e,a._cacheIndex=i,t[i]=a}_addInactiveBinding(e,t,i){let r=this._bindingsByRootAndName,a=this._bindings,s=r[t];s===void 0&&(s={},r[t]=s),s[i]=e,e._cacheIndex=a.length,a.push(e)}_removeInactiveBinding(e){let t=this._bindings,i=e.binding,r=i.rootNode.uuid,a=i.path,s=this._bindingsByRootAndName,n=s[r],o=t[t.length-1],u=e._cacheIndex;o._cacheIndex=u,t[u]=o,t.pop(),delete n[a],Object.keys(n).length===0&&delete s[r]}_lendBinding(e){let t=this._bindings,i=e._cacheIndex,r=this._nActiveBindings++,a=t[r];e._cacheIndex=r,t[r]=e,a._cacheIndex=i,t[i]=a}_takeBackBinding(e){let t=this._bindings,i=e._cacheIndex,r=--this._nActiveBindings,a=t[r];e._cacheIndex=r,t[r]=e,a._cacheIndex=i,t[i]=a}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,i=e[t];return i===void 0&&(i=new Sd(new Float32Array(2),new Float32Array(2),1,Hg),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){let t=this._controlInterpolants,i=e.__cacheIndex,r=--this._nActiveControlInterpolants,a=t[r];e.__cacheIndex=r,t[r]=e,a.__cacheIndex=i,t[i]=a}clipAction(e,t,i){let r=t||this._root,a=r.uuid,s=typeof e=="string"?Al.findByName(r,e):e,n=s===null?e:s.uuid,o=this._actionsByClip[n],u=null;if(i===void 0&&(i=s===null?Hl:s.blendMode),o!==void 0){let d=o.actionByRoot[a];if(d!==void 0&&d.blendMode===i)return d;u=o.knownActions[0],s===null&&(s=u._clip)}if(s===null)return null;let h=new Gg(this,s,t,i);return this._bindAction(h,u),this._addInactiveAction(h,n,a),h}existingAction(e,t){let i=t||this._root,r=i.uuid,a=typeof e=="string"?Al.findByName(i,e):e,s=a?a.uuid:e,n=this._actionsByClip[s];return n===void 0?null:n.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let t=this._actions,i=this._nActiveActions,r=this.time+=e,a=Math.sign(e),s=this._accuIndex^=1;for(let u=0;u!==i;++u)t[u]._update(r,e,a,s);let n=this._bindings,o=this._nActiveBindings;for(let u=0;u!==o;++u)n[u].apply(s);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,i=e.uuid,r=this._actionsByClip,a=r[i];if(a!==void 0){let s=a.knownActions;for(let n=0,o=s.length;n!==o;++n){let u=s[n];this._deactivateAction(u);let h=u._cacheIndex,d=t[t.length-1];u._cacheIndex=null,u._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(u)}delete r[i]}}uncacheRoot(e){let t=e.uuid,i=this._actionsByClip;for(let a in i){let s=i[a].actionByRoot[t];s!==void 0&&(this._deactivateAction(s),this._removeInactiveAction(s))}let r=this._bindingsByRootAndName[t];if(r!==void 0)for(let a in r){let s=r[a];s.restoreOriginalState(),this._removeInactiveBinding(s)}}uncacheAction(e,t){let i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");function sr(e){if(e===void 0)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function wd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var fi={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},bs={duration:.5,overwrite:!1,delay:0},$l,Ut,ct,Mi=1e8,nt=1/Mi,ml=Math.PI*2,zg=ml/4,Vg=0,bd=Math.sqrt,Wg=Math.cos,qg=Math.sin,Pt=function(e){return typeof e=="string"},gt=function(e){return typeof e=="function"},or=function(e){return typeof e=="number"},eu=function(e){return e===void 0},Wi=function(e){return typeof e=="object"},ti=function(e){return e!==!1},tu=function(){return typeof window<"u"},xn=function(e){return gt(e)||Pt(e)},Bd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Wt=Array.isArray,Xg=/random\([^)]+\)/g,Yg=/,\s*/g,Ph=/(?:-?\.?\d|\.)+/gi,Rd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Pa=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,No=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Pd=/[+-]=-?[.\d]+/,jg=/[^,'"\[\]\s]+/gi,Kg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ft,Pi,gl,iu,ci={},On={},Ld,Dd=function(e){return(On=Ya(e,ci))&&ri},ru=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Bs=function(e,t){return!t&&console.warn(e)},Ud=function(e,t){return e&&(ci[e]=t)&&On&&(On[e]=t)||ci},Rs=function(){return 0},Jg={suppressEvents:!0,isStart:!0,kill:!1},Bn={suppressEvents:!0,kill:!1},Zg={suppressEvents:!0},au={},yr=[],_l={},Nd,ui={},Fo={},Lh=30,Rn=[],su="",nu=function(e){var t=e[0],i,r;if(Wi(t)||gt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=Rn.length;r--&&!Rn[r].targetTest(t););i=Rn[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new ap(e[r],i)))||e.splice(r,1);return e},Kr=function(e){return e._gsap||nu(Ii(e))[0]._gsap},Fd=function(e,t,i){return(i=e[t])&&gt(i)?e[t]():eu(i)&&e.getAttribute&&e.getAttribute(t)||i},$t=function(e,t){return(e=e.split(",")).forEach(t)||e},St=function(e){return Math.round(e*1e5)/1e5||0},pt=function(e){return Math.round(e*1e7)/1e7||0},Qa=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},$g=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},kn=function(){var e=yr.length,t=yr.slice(0),i,r;for(_l={},yr.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},ou=function(e){return!!(e._initted||e._startAt||e.add)},Qd=function(e,t,i,r){yr.length&&!Ut&&kn(),e.render(t,i,r||!!(Ut&&t<0&&ou(e))),yr.length&&!Ut&&kn()},Od=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(jg).length<2?t:Pt(e)?e.trim():e},kd=function(e){return e},Ai=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},e_=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},Ya=function(e,t){for(var i in t)e[i]=t[i];return e},Dh=function e(t,i){for(var r in i)r!=="__proto__"&&r!=="constructor"&&r!=="prototype"&&(t[r]=Wi(i[r])?e(t[r]||(t[r]={}),i[r]):i[r]);return t},Gn=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},Ss=function(e){var t=e.parent||ft,i=e.keyframes?e_(Wt(e.keyframes)):Ai;if(ti(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},t_=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},Gd=function(e,t,i,r,a){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=e[r],n;if(a)for(n=t[a];s&&s[a]>n;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=s,t.parent=t._dp=e,t},Jn=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var a=t._prev,s=t._next;a?a._next=s:e[i]===t&&(e[i]=s),s?s._prev=a:e[r]===t&&(e[r]=a),t._next=t._prev=t.parent=null},Mr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Jr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},i_=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},vl=function(e,t,i,r){return e._startAt&&(Ut?e._startAt.revert(Bn):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},r_=function e(t){return!t||t._ts&&e(t.parent)},Uh=function(e){return e._repeat?ja(e._tTime,e=e.duration()+e._rDelay)*e:0},ja=function(e,t){var i=Math.floor(e=pt(e/t));return e&&i===e?i-1:i},Hn=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Zn=function(e){return e._end=pt(e._start+(e._tDur/Math.abs(e._ts||e._rts||nt)||0))},$n=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=pt(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Zn(e),i._dirty||Jr(i,e)),e},Hd=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Hn(e.rawTime(),t),(!t._dur||ks(0,t.totalDuration(),i)-t._tTime>nt)&&t.render(i,!0)),Jr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-nt}},ki=function(e,t,i,r){return t.parent&&Mr(t),t._start=pt((or(i)?i:i||e!==ft?xi(e,i,t):e._time)+t._delay),t._end=pt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Gd(e,t,"_first","_last",e._sort?"_start":0),xl(t)||(e._recent=t),r||Hd(e,t),e._ts<0&&$n(e,e._tTime),e},zd=function(e,t){return(ci.ScrollTrigger||ru("scrollTrigger",t))&&ci.ScrollTrigger.create(t,e)},Vd=function(e,t,i,r,a){if(uu(e,t,a),!e._initted)return 1;if(!i&&e._pt&&!Ut&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Nd!==hi.frame)return yr.push(e),e._lazy=[a,r],1},a_=function e(t){var i=t.parent;return i&&i._ts&&i._initted&&!i._lock&&(i.rawTime()<0||e(i))},xl=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},s_=function(e,t,i,r){var a=e.ratio,s=t<0||!t&&(!e._start&&a_(e)&&!(!e._initted&&xl(e))||(e._ts<0||e._dp._ts<0)&&!xl(e))?0:1,n=e._rDelay,o=0,u,h,d;if(n&&e._repeat&&(o=ks(0,e._tDur,t),h=ja(o,n),e._yoyo&&h&1&&(s=1-s),h!==ja(e._tTime,n)&&(a=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==a||Ut||r||e._zTime===nt||!t&&e._zTime){if(!e._initted&&Vd(e,t,r,i,o))return;for(d=e._zTime,e._zTime=t||(i?nt:0),i||(i=t&&!d),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=o,u=e._pt;u;)u.r(s,u.d),u=u._next;t<0&&vl(e,t,i,!0),e._onUpdate&&!i&&di(e,"onUpdate"),o&&e._repeat&&!i&&e.parent&&di(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&Mr(e,1),!i&&!Ut&&(di(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},n_=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},Ka=function(e,t,i,r){var a=e._repeat,s=pt(t)||0,n=e._tTime/e._tDur;return n&&!r&&(e._time*=s/e._dur),e._dur=s,e._tDur=a?a<0?1e10:pt(s*(a+1)+e._rDelay*a):s,n>0&&!r&&$n(e,e._tTime=e._tDur*n),e.parent&&Zn(e),i||Jr(e.parent,e),e},Nh=function(e){return e instanceof Zt?Jr(e):Ka(e,e._dur)},o_={_start:0,endTime:Rs,totalDuration:Rs},xi=function e(t,i,r){var a=t.labels,s=t._recent||o_,n=t.duration()>=Mi?s.endTime(!1):t._dur,o,u,h;return Pt(i)&&(isNaN(i)||i in a)?(u=i.charAt(0),h=i.substr(-1)==="%",o=i.indexOf("="),u==="<"||u===">"?(o>=0&&(i=i.replace(/=/,"")),(u==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(i.substr(1))||0)*(h?(o<0?s:r).totalDuration()/100:1)):o<0?(i in a||(a[i]=n),a[i]):(u=parseFloat(i.charAt(o-1)+i.substr(o+1)),h&&r&&(u=u/100*(Wt(r)?r[0]:r).totalDuration()),o>1?e(t,i.substr(0,o-1),r)+u:n+u)):i==null?n:+i},Cs=function(e,t,i){var r=or(t[1]),a=(r?2:1)+(e<2?0:1),s=t[a],n,o;if(r&&(s.duration=t[1]),s.parent=i,e){for(n=s,o=i;o&&!("immediateRender"in n);)n=o.vars.defaults||{},o=ti(o.vars.inherit)&&o.parent;s.immediateRender=ti(n.immediateRender),e<2?s.runBackwards=1:s.startAt=t[a-1]}return new It(t[0],s,t[a+1])},br=function(e,t){return e||e===0?t(e):t},ks=function(e,t,i){return i<e?e:i>t?t:i},Vt=function(e,t){return!Pt(e)||!(t=Kg.exec(e))?"":t[1]},l_=function(e,t,i){return br(i,function(r){return ks(e,t,r)})},El=[].slice,Wd=function(e,t){return e&&Wi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Wi(e[0]))&&!e.nodeType&&e!==Pi},u_=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var a;return Pt(r)&&!t||Wd(r,1)?(a=i).push.apply(a,Ii(r)):i.push(r)})||i},Ii=function(e,t,i){return ct&&!t&&ct.selector?ct.selector(e):Pt(e)&&!i&&(gl||!Ja())?El.call((t||iu).querySelectorAll(e),0):Wt(e)?u_(e,i):Wd(e)?El.call(e,0):e?[e]:[]},yl=function(e){return e=Ii(e)[0]||Bs("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Ii(t,i.querySelectorAll?i:i===e?Bs("Invalid scope")||iu.createElement("div"):e)}},qd=function(e){return e.sort(function(){return .5-Math.random()})},Xd=function(e){if(gt(e))return e;var t=Wi(e)?e:{each:e},i=Zr(t.ease),r=t.from||0,a=parseFloat(t.base)||0,s={},n=r>0&&r<1,o=isNaN(r)||n,u=t.axis,h=r,d=r;return Pt(r)?h=d={center:.5,edges:.5,end:1}[r]||0:!n&&o&&(h=r[0],d=r[1]),function(l,c,p){var f=(p||t).length,m=s[f],g,A,_,v,x,C,y,T,b;if(!m){if(b=t.grid==="auto"?0:(t.grid||[1,Mi])[1],!b){for(y=-Mi;y<(y=p[b++].getBoundingClientRect().left)&&b<f;);b<f&&b--}for(m=s[f]=[],g=o?Math.min(b,f)*h-.5:r%b,A=b===Mi?0:o?f*d/b-.5:r/b|0,y=0,T=Mi,C=0;C<f;C++)_=C%b-g,v=A-(C/b|0),m[C]=x=u?Math.abs(u==="y"?v:_):bd(_*_+v*v),x>y&&(y=x),x<T&&(T=x);r==="random"&&qd(m),m.max=y-T,m.min=T,m.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(b>f?f-1:u?u==="y"?f/b:b:Math.max(b,f/b))||0)*(r==="edges"?-1:1),m.b=f<0?a-f:a,m.u=Vt(t.amount||t.each)||0,i=i&&f<0?y_(i):i}return f=(m[l]-m.min)/m.max||0,pt(m.b+(i?i(f):f)*m.v)+m.u}},Sl=function(e){var t=10**((e+"").split(".")[1]||"").length;return function(i){var r=pt(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(or(i)?0:Vt(i))}},Yd=function(e,t){var i=Wt(e),r,a;return!i&&Wi(e)&&(r=i=e.radius||Mi,e.values?(e=Ii(e.values),(a=!or(e[0]))&&(r*=r)):e=Sl(e.increment)),br(t,i?gt(e)?function(s){return a=e(s),Math.abs(a-s)<=r?a:s}:function(s){for(var n=parseFloat(a?s.x:s),o=parseFloat(a?s.y:0),u=Mi,h=0,d=e.length,l,c;d--;)a?(l=e[d].x-n,c=e[d].y-o,l=l*l+c*c):l=Math.abs(e[d]-n),l<u&&(u=l,h=d);return h=!r||u<=r?e[h]:s,a||h===s||or(s)?h:h+Vt(s)}:Sl(e))},jd=function(e,t,i,r){return br(Wt(e)?!t:i===!0?!!(i=0):!r,function(){return Wt(e)?e[~~(Math.random()*e.length)]:(i||(i=1e-5))&&(r=i<1?10**((i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},h_=function(){var e=[...arguments];return function(t){return e.reduce(function(i,r){return r(i)},t)}},c_=function(e,t){return function(i){return e(parseFloat(i))+(t||Vt(i))}},d_=function(e,t,i){return Jd(e,t,0,1,i)},Kd=function(e,t,i){return br(i,function(r){return e[~~t(r)]})},p_=function e(t,i,r){var a=i-t;return Wt(t)?Kd(t,e(0,t.length),i):br(r,function(s){return(a+(s-t)%a)%a+t})},f_=function e(t,i,r){var a=i-t,s=a*2;return Wt(t)?Kd(t,e(0,t.length-1),i):br(r,function(n){return n=(s+(n-t)%s)%s||0,t+(n>a?s-n:n)})},Ps=function(e){return e.replace(Xg,function(t){var i=t.indexOf("[")+1,r=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(Yg);return jd(i?r:+r[0],i?0:+r[1],+r[2]||1e-5)})},Jd=function(e,t,i,r,a){var s=t-e,n=r-i;return br(a,function(o){return i+((o-e)/s*n||0)})},A_=function e(t,i,r,a){var s=isNaN(t+i)?0:function(p){return(1-p)*t+p*i};if(!s){var n=Pt(t),o={},u,h,d,l,c;if(r===!0&&(a=1)&&(r=null),n)t={p:t},i={p:i};else if(Wt(t)&&!Wt(i)){for(d=[],l=t.length,c=l-2,h=1;h<l;h++)d.push(e(t[h-1],t[h]));l--,s=function(p){p*=l;var f=Math.min(c,~~p);return d[f](p-f)},r=i}else a||(t=Ya(Wt(t)?[]:{},t));if(!d){for(u in i)lu.call(o,t,u,"get",i[u]);s=function(p){return du(p,o)||(n?t.p:t)}}}return br(r,s)},Fh=function(e,t,i){var r=e.labels,a=Mi,s,n,o;for(s in r)n=r[s]-t,n<0==!!i&&n&&a>(n=Math.abs(n))&&(o=s,a=n);return o},di=function(e,t,i){var r=e.vars,a=r[t],s=ct,n=e._ctx,o,u,h;if(a)return o=r[t+"Params"],u=r.callbackScope||e,i&&yr.length&&kn(),n&&(ct=n),h=o?a.apply(u,o):a.call(u),ct=s,h},fs=function(e){return Mr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Ut),e.progress()<1&&di(e,"onInterrupt"),e},La,Zd=[],$d=function(e){if(e)if(e=!e.name&&e.default||e,tu()||e.headless){var t=e.name,i=gt(e),r=t&&!i&&e.init?function(){this._props=[]}:e,a={init:Rs,render:du,add:lu,kill:P_,modifier:R_,rawVars:0},s={targetTest:0,get:0,getSetter:cu,aliases:{},register:0};if(Ja(),e!==r){if(ui[t])return;Ai(r,Ai(Gn(e,a),s)),Ya(r.prototype,Ya(a,Gn(e,s))),ui[r.prop=t]=r,e.targetTest&&(Rn.push(r),au[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Ud(t,r),e.register&&e.register(ri,r,ii)}else Zd.push(e)},st=255,As={aqua:[0,st,st],lime:[0,st,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,st],navy:[0,0,128],white:[st,st,st],olive:[128,128,0],yellow:[st,st,0],orange:[st,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[st,0,0],pink:[st,192,203],cyan:[0,st,st],transparent:[st,st,st,0]},Qo=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*st+.5|0},ep=function(e,t,i){var r=e?or(e)?[e>>16,e>>8&st,e&st]:0:As.black,a,s,n,o,u,h,d,l,c,p;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),As[e])r=As[e];else if(e.charAt(0)==="#"){if(e.length<6&&(a=e.charAt(1),s=e.charAt(2),n=e.charAt(3),e="#"+a+a+s+s+n+n+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&st,r&st,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&st,e&st]}else if(e.substr(0,3)==="hsl"){if(r=p=e.match(Ph),!t)o=r[0]%360/360,u=r[1]/100,h=r[2]/100,s=h<=.5?h*(u+1):h+u-h*u,a=h*2-s,r.length>3&&(r[3]*=1),r[0]=Qo(o+1/3,a,s),r[1]=Qo(o,a,s),r[2]=Qo(o-1/3,a,s);else if(~e.indexOf("="))return r=e.match(Rd),i&&r.length<4&&(r[3]=1),r}else r=e.match(Ph)||As.transparent;r=r.map(Number)}return t&&!p&&(a=r[0]/st,s=r[1]/st,n=r[2]/st,d=Math.max(a,s,n),l=Math.min(a,s,n),h=(d+l)/2,d===l?o=u=0:(c=d-l,u=h>.5?c/(2-d-l):c/(d+l),o=d===a?(s-n)/c+(s<n?6:0):d===s?(n-a)/c+2:(a-s)/c+4,o*=60),r[0]=~~(o+.5),r[1]=~~(u*100+.5),r[2]=~~(h*100+.5)),i&&r.length<4&&(r[3]=1),r},tp=function(e){var t=[],i=[],r=-1;return e.split(Sr).forEach(function(a){var s=a.match(Pa)||[];t.push.apply(t,s),i.push(r+=s.length+1)}),t.c=i,t},Qh=function(e,t,i){var r="",a=(e+r).match(Sr),s=t?"hsla(":"rgba(",n=0,o,u,h,d;if(!a)return e;if(a=a.map(function(l){return(l=ep(l,t,1))&&s+(t?l[0]+","+l[1]+"%,"+l[2]+"%,"+l[3]:l.join(","))+")"}),i&&(h=tp(e),o=i.c,o.join(r)!==h.c.join(r)))for(u=e.replace(Sr,"1").split(Pa),d=u.length-1;n<d;n++)r+=u[n]+(~o.indexOf(n)?a.shift()||s+"0,0,0,0)":(h.length?h:a.length?a:i).shift());if(!u)for(u=e.split(Sr),d=u.length-1;n<d;n++)r+=u[n]+a[n];return r+u[d]},Sr=(function(){var e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in As)e+="|"+t+"\\b";return RegExp(e+")","gi")})(),m_=/hsl[a]?\(/,ip=function(e){var t=e.join(" "),i;if(Sr.lastIndex=0,Sr.test(t))return i=m_.test(t),e[1]=Qh(e[1],i),e[0]=Qh(e[0],i,tp(e[1])),!0},Ls,hi=(function(){var e=Date.now,t=500,i=33,r=e(),a=r,s=1e3/240,n=s,o=[],u,h,d,l,c,p,f=function m(g){var A=e()-a,_=g===!0,v,x,C,y;if((A>t||A<0)&&(r+=A-i),a+=A,C=a-r,v=C-n,(v>0||_)&&(y=++l.frame,c=C-l.time*1e3,l.time=C/=1e3,n+=v+(v>=s?4:s-v),x=1),_||(u=h(m)),x)for(p=0;p<o.length;p++)o[p](C,c,y,g)};return l={time:0,frame:0,tick:function(){f(!0)},deltaRatio:function(m){return c/(1e3/(m||60))},wake:function(){Ld&&(!gl&&tu()&&(Pi=gl=window,iu=Pi.document||{},ci.gsap=ri,(Pi.gsapVersions||(Pi.gsapVersions=[])).push(ri.version),Dd(On||Pi.GreenSockGlobals||!Pi.gsap&&Pi||{}),Zd.forEach($d)),d=typeof requestAnimationFrame<"u"&&requestAnimationFrame,u&&l.sleep(),h=d||function(m){return setTimeout(m,n-l.time*1e3+1|0)},Ls=1,f(2))},sleep:function(){(d?cancelAnimationFrame:clearTimeout)(u),Ls=0,h=Rs},lagSmoothing:function(m,g){t=m||1/0,i=Math.min(g||33,t)},fps:function(m){s=1e3/(m||240),n=l.time*1e3+s},add:function(m,g,A){var _=g?function(v,x,C,y){m(v,x,C,y),l.remove(_)}:m;return l.remove(m),o[A?"unshift":"push"](_),Ja(),_},remove:function(m,g){~(g=o.indexOf(m))&&o.splice(g,1)&&p>=g&&p--},_listeners:o},l})(),Ja=function(){return!Ls&&hi.wake()},We={},g_=/^[\d.\-M][\d.\-,\s]/,__=/["']/g,v_=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],a=1,s=i.length,n,o,u;a<s;a++)o=i[a],n=a===s-1?o.length:o.lastIndexOf(","),u=o.substr(0,n),t[r]=isNaN(u)?u.replace(__,"").trim():+u,r=o.substr(n+1).trim();return t},x_=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},E_=function(e){var t=(e+"").split("("),i=We[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[v_(t[1])]:x_(e).split(",").map(Od)):We._CE&&g_.test(e)?We._CE("",e):i},y_=function(e){return function(t){return 1-e(1-t)}},Zr=function(e,t){return e&&(gt(e)?e:We[e]||E_(e))||t},Fr=function(e,t,i,r){i===void 0&&(i=function(n){return 1-t(1-n)}),r===void 0&&(r=function(n){return n<.5?t(n*2)/2:1-t((1-n)*2)/2});var a={easeIn:t,easeOut:i,easeInOut:r},s;return $t(e,function(n){for(var o in We[n]=ci[n]=a,We[s=n.toLowerCase()]=i,a)We[s+(o==="easeIn"?".in":o==="easeOut"?".out":".inOut")]=We[n+"."+o]=a[o]}),a},rp=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Oo=function e(t,i,r){var a=i>=1?i:1,s=(r||(t?.3:.45))/(i<1?i:1),n=s/ml*(Math.asin(1/a)||0),o=function(h){return h===1?1:a*2**(-10*h)*qg((h-n)*s)+1},u=t==="out"?o:t==="in"?function(h){return 1-o(1-h)}:rp(o);return s=ml/s,u.config=function(h,d){return e(t,h,d)},u},ko=function e(t,i){i===void 0&&(i=1.70158);var r=function(s){return s?--s*s*((i+1)*s+i)+1:0},a=t==="out"?r:t==="in"?function(s){return 1-r(1-s)}:rp(r);return a.config=function(s){return e(t,s)},a};$t("Linear,Quad,Cubic,Quart,Quint,Strong",function(e,t){var i=t<5?t+1:t;Fr(e+",Power"+(i-1),t?function(r){return r**+i}:function(r){return r},function(r){return 1-(1-r)**i},function(r){return r<.5?(r*2)**i/2:1-((1-r)*2)**i/2})}),We.Linear.easeNone=We.none=We.Linear.easeIn,Fr("Elastic",Oo("in"),Oo("out"),Oo()),(function(e,t){var i=1/t,r=2*i,a=2.5*i,s=function(n){return n<i?e*n*n:n<r?e*(n-1.5/t)**2+.75:n<a?e*(n-=2.25/t)*n+.9375:e*(n-2.625/t)**2+.984375};Fr("Bounce",function(n){return 1-s(1-n)},s)})(7.5625,2.75),Fr("Expo",function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),Fr("Circ",function(e){return-(bd(1-e*e)-1)}),Fr("Sine",function(e){return e===1?1:-Wg(e*zg)+1}),Fr("Back",ko("in"),ko("out"),ko()),We.SteppedEase=We.steps=ci.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+ +!t,a=+!!t,s=1-nt;return function(n){return((r*ks(0,s,n)|0)+a)*i}}},bs.ease=We["quad.out"],$t("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(e){return su+=e+","+e+"Params,"});var ap=function(e,t){this.id=Vg++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Fd,this.set=t?t.getSetter:cu},Ds=(function(){function e(i){this.vars=i,this._delay=+i.delay||0,(this._repeat=i.repeat===1/0?-2:i.repeat||0)&&(this._rDelay=i.repeatDelay||0,this._yoyo=!!i.yoyo||!!i.yoyoEase),this._ts=1,Ka(this,+i.duration,1,1),this.data=i.data,ct&&(this._ctx=ct,ct.data.push(this)),Ls||hi.wake()}var t=e.prototype;return t.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},t.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},t.totalDuration=function(i){return arguments.length?(this._dirty=0,Ka(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(i,r){if(Ja(),!arguments.length)return this._tTime;var a=this._dp;if(a&&a.smoothChildTiming&&this._ts){for($n(this,i),!a._dp||a.parent||Hd(a,this);a&&a.parent;)a.parent._time!==a._start+(a._ts>=0?a._tTime/a._ts:(a.totalDuration()-a._tTime)/-a._ts)&&a.totalTime(a._tTime,!0),a=a.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&ki(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===nt||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Qd(this,i,r)),this},t.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Uh(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},t.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Uh(this),r):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(i,r){var a=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*a,r):this._repeat?ja(this._tTime,a)+1:1},t.timeScale=function(i,r){if(!arguments.length)return this._rts===-nt?0:this._rts;if(this._rts===i)return this;var a=this.parent&&this._ts?Hn(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-nt?0:this._rts,this.totalTime(ks(-Math.abs(this._delay),this.totalDuration(),a),r!==!1),Zn(this),i_(this)},t.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ja(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==nt&&(this._tTime-=nt)))),this):this._ps},t.startTime=function(i){if(arguments.length){this._start=pt(i);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&ki(r,this,this._start-this._delay),this}return this._start},t.endTime=function(i){return this._start+(ti(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Hn(r.rawTime(i),this):this._tTime:this._tTime},t.revert=function(i){i===void 0&&(i=Zg);var r=Ut;return Ut=i,ou(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),Ut=r,this},t.globalTime=function(i){for(var r=this,a=arguments.length?i:r.rawTime();r;)a=r._start+a/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):a},t.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Nh(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,Nh(this),r?this.time(r):this}return this._rDelay},t.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},t.seek=function(i,r){return this.totalTime(xi(this,i),ti(r))},t.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,ti(r)),this._dur||(this._zTime=-nt),this},t.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},t.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},t.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-nt:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-nt,this},t.isActive=function(){var i=this.parent||this._dp,r=this._start,a;return!!(!i||this._ts&&this._initted&&i.isActive()&&(a=i.rawTime(!0))>=r&&a<this.endTime(!0)-nt)},t.eventCallback=function(i,r,a){var s=this.vars;return arguments.length>1?(r?(s[i]=r,a&&(s[i+"Params"]=a),i==="onUpdate"&&(this._onUpdate=r)):delete s[i],this):s[i]},t.then=function(i){var r=this,a=r._prom;return new Promise(function(s){var n=gt(i)?i:kd,o=function(){var u=r.then;r.then=null,a&&a(),gt(n)&&(n=n(r))&&(n.then||n===r)&&(r.then=u),s(n),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?o():r._prom=o})},t.kill=function(){fs(this)},e})();Ai(Ds.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-nt,_prom:0,_ps:!1,_rts:1});var Zt=(function(e){wd(t,e);function t(r,a){var s;return r===void 0&&(r={}),s=e.call(this,r)||this,s.labels={},s.smoothChildTiming=!!r.smoothChildTiming,s.autoRemoveChildren=!!r.autoRemoveChildren,s._sort=ti(r.sortChildren),ft&&ki(r.parent||ft,sr(s),a),r.reversed&&s.reverse(),r.paused&&s.paused(!0),r.scrollTrigger&&zd(sr(s),r.scrollTrigger),s}var i=t.prototype;return i.to=function(r,a,s){return Cs(0,arguments,this),this},i.from=function(r,a,s){return Cs(1,arguments,this),this},i.fromTo=function(r,a,s,n){return Cs(2,arguments,this),this},i.set=function(r,a,s){return a.duration=0,a.parent=this,Ss(a).repeatDelay||(a.repeat=0),a.immediateRender=!!a.immediateRender,new It(r,a,xi(this,s),1),this},i.call=function(r,a,s){return ki(this,It.delayedCall(0,r,a),s)},i.staggerTo=function(r,a,s,n,o,u,h){return s.duration=a,s.stagger=s.stagger||n,s.onComplete=u,s.onCompleteParams=h,s.parent=this,new It(r,s,xi(this,o)),this},i.staggerFrom=function(r,a,s,n,o,u,h){return s.runBackwards=1,Ss(s).immediateRender=ti(s.immediateRender),this.staggerTo(r,a,s,n,o,u,h)},i.staggerFromTo=function(r,a,s,n,o,u,h,d){return n.startAt=s,Ss(n).immediateRender=ti(n.immediateRender),this.staggerTo(r,a,n,o,u,h,d)},i.render=function(r,a,s){var n=this._time,o=this._dirty?this.totalDuration():this._tDur,u=this._dur,h=r<=0?0:pt(r),d=this._zTime<0!=r<0&&(this._initted||!u),l,c,p,f,m,g,A,_,v,x,C,y;if(this!==ft&&h>o&&r>=0&&(h=o),h!==this._tTime||s||d){if(n!==this._time&&u&&(h+=this._time-n,r+=this._time-n),l=h,v=this._start,_=this._ts,g=!_,d&&(u||(n=this._zTime),(r||!a)&&(this._zTime=r)),this._repeat){if(C=this._yoyo,m=u+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,a,s);if(l=pt(h%m),h===o?(f=this._repeat,l=u):(x=pt(h/m),f=~~x,f&&f===x&&(l=u,f--),l>u&&(l=u)),x=ja(this._tTime,m),!n&&this._tTime&&x!==f&&this._tTime-x*m-this._dur<=0&&(x=f),C&&f&1&&(l=u-l,y=1),f!==x&&!this._lock){var T=C&&x&1,b=T===(C&&f&1);if(f<x&&(T=!T),n=T?0:h%u?u:h,this._lock=1,this.render(n||(y?0:pt(f*m)),a,!u)._lock=0,this._tTime=h,!a&&this.parent&&di(this,"onRepeat"),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,x=f),n&&n!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(u=this._dur,o=this._tDur,b&&(this._lock=2,n=T?u:-1e-4,this.render(n,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!g))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(A=n_(this,pt(n),pt(l)),A&&(h-=l-(l=A._start))),this._tTime=h,this._time=l,this._act=!!_,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,n=0),!n&&h&&u&&!a&&!x&&(di(this,"onStart"),this._tTime!==h))return this;if(l>=n&&r>=0)for(c=this._first;c;){if(p=c._next,(c._act||l>=c._start)&&c._ts&&A!==c){if(c.parent!==this)return this.render(r,a,s);if(c.render(c._ts>0?(l-c._start)*c._ts:(c._dirty?c.totalDuration():c._tDur)+(l-c._start)*c._ts,a,s),l!==this._time||!this._ts&&!g){A=0,p&&(h+=this._zTime=-nt);break}}c=p}else{c=this._last;for(var E=r<0?r:l;c;){if(p=c._prev,(c._act||E<=c._end)&&c._ts&&A!==c){if(c.parent!==this)return this.render(r,a,s);if(c.render(c._ts>0?(E-c._start)*c._ts:(c._dirty?c.totalDuration():c._tDur)+(E-c._start)*c._ts,a,s||Ut&&ou(c)),l!==this._time||!this._ts&&!g){A=0,p&&(h+=this._zTime=E?-nt:nt);break}}c=p}}if(A&&!a&&(this.pause(),A.render(l>=n?0:-nt)._zTime=l>=n?1:-1,this._ts))return this._start=v,Zn(this),this.render(r,a,s);this._onUpdate&&!a&&di(this,"onUpdate",!0),(h===o&&this._tTime>=this.totalDuration()||!h&&n)&&(v===this._start||Math.abs(_)!==Math.abs(this._ts))&&(this._lock||((r||!u)&&(h===o&&this._ts>0||!h&&this._ts<0)&&Mr(this,1),!a&&!(r<0&&!n)&&(h||n||!o)&&(di(this,h===o&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<o&&this.timeScale()>0)&&this._prom())))}return this},i.add=function(r,a){var s=this;if(or(a)||(a=xi(this,a,r)),!(r instanceof Ds)){if(Wt(r))return r.forEach(function(n){return s.add(n,a)}),this;if(Pt(r))return this.addLabel(r,a);if(gt(r))r=It.delayedCall(0,r);else return this}return this===r?this:ki(this,r,a)},i.getChildren=function(r,a,s,n){r===void 0&&(r=!0),a===void 0&&(a=!0),s===void 0&&(s=!0),n===void 0&&(n=-Mi);for(var o=[],u=this._first;u;)u._start>=n&&(u instanceof It?a&&o.push(u):(s&&o.push(u),r&&o.push.apply(o,u.getChildren(!0,a,s)))),u=u._next;return o},i.getById=function(r){for(var a=this.getChildren(1,1,1),s=a.length;s--;)if(a[s].vars.id===r)return a[s]},i.remove=function(r){return Pt(r)?this.removeLabel(r):gt(r)?this.killTweensOf(r):(r.parent===this&&Jn(this,r),r===this._recent&&(this._recent=this._last),Jr(this))},i.totalTime=function(r,a){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=pt(hi.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),e.prototype.totalTime.call(this,r,a),this._forcing=0,this):this._tTime},i.addLabel=function(r,a){return this.labels[r]=xi(this,a),this},i.removeLabel=function(r){return delete this.labels[r],this},i.addPause=function(r,a,s){var n=It.delayedCall(0,a||Rs,s);return n.data="isPause",this._hasPause=1,ki(this,n,xi(this,r))},i.removePause=function(r){var a=this._first;for(r=xi(this,r);a;)a._start===r&&a.data==="isPause"&&Mr(a),a=a._next},i.killTweensOf=function(r,a,s){for(var n=this.getTweensOf(r,s),o=n.length;o--;)vr!==n[o]&&n[o].kill(r,a);return this},i.getTweensOf=function(r,a){for(var s=[],n=Ii(r),o=this._first,u=or(a),h;o;)o instanceof It?$g(o._targets,n)&&(u?(!vr||o._initted&&o._ts)&&o.globalTime(0)<=a&&o.globalTime(o.totalDuration())>a:!a||o.isActive())&&s.push(o):(h=o.getTweensOf(n,a)).length&&s.push.apply(s,h),o=o._next;return s},i.tweenTo=function(r,a){a||(a={});var s=this,n=xi(s,r),o=a,u=o.startAt,h=o.onStart,d=o.onStartParams,l=o.immediateRender,c,p=It.to(s,Ai({ease:a.ease||"none",lazy:!1,immediateRender:!1,time:n,overwrite:"auto",duration:a.duration||Math.abs((n-(u&&"time"in u?u.time:s._time))/s.timeScale())||nt,onStart:function(){if(s.pause(),!c){var f=a.duration||Math.abs((n-(u&&"time"in u?u.time:s._time))/s.timeScale());p._dur!==f&&Ka(p,f,0,1).render(p._time,!0,!0),c=1}h&&h.apply(p,d||[])}},a));return l?p.render(0):p},i.tweenFromTo=function(r,a,s){return this.tweenTo(a,Ai({startAt:{time:xi(this,r)}},s))},i.recent=function(){return this._recent},i.nextLabel=function(r){return r===void 0&&(r=this._time),Fh(this,xi(this,r))},i.previousLabel=function(r){return r===void 0&&(r=this._time),Fh(this,xi(this,r),1)},i.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+nt)},i.shiftChildren=function(r,a,s){s===void 0&&(s=0);var n=this._first,o=this.labels,u;for(r=pt(r);n;)n._start>=s&&(n._start+=r,n._end+=r),n=n._next;if(a)for(u in o)o[u]>=s&&(o[u]+=r);return Jr(this)},i.invalidate=function(r){var a=this._first;for(this._lock=0;a;)a.invalidate(r),a=a._next;return e.prototype.invalidate.call(this,r)},i.clear=function(r){r===void 0&&(r=!0);for(var a=this._first,s;a;)s=a._next,this.remove(a),a=s;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Jr(this)},i.totalDuration=function(r){var a=0,s=this,n=s._last,o=Mi,u,h,d;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-r:r));if(s._dirty){for(d=s.parent;n;)u=n._prev,n._dirty&&n.totalDuration(),h=n._start,h>o&&s._sort&&n._ts&&!s._lock?(s._lock=1,ki(s,n,h-n._delay,1)._lock=0):o=h,h<0&&n._ts&&(a-=h,(!d&&!s._dp||d&&d.smoothChildTiming)&&(s._start+=pt(h/s._ts),s._time-=h,s._tTime-=h),s.shiftChildren(-h,!1,-1/0),o=0),n._end>a&&n._ts&&(a=n._end),n=u;Ka(s,s===ft&&s._time>a?s._time:a,1,1),s._dirty=0}return s._tDur},t.updateRoot=function(r){if(ft._ts&&(Qd(ft,Hn(r,ft)),Nd=hi.frame),hi.frame>=Lh){Lh+=fi.autoSleep||120;var a=ft._first;if((!a||!a._ts)&&fi.autoSleep&&hi._listeners.length<2){for(;a&&!a._ts;)a=a._next;a||hi.sleep()}}},t})(Ds);Ai(Zt.prototype,{_lock:0,_hasPause:0,_forcing:0});var S_=function(e,t,i,r,a,s,n){var o=new ii(this._pt,e,t,0,1,hp,null,a),u=0,h=0,d,l,c,p,f,m,g,A;for(o.b=i,o.e=r,i+="",r+="",(g=~r.indexOf("random("))&&(r=Ps(r)),s&&(A=[i,r],s(A,e,t),i=A[0],r=A[1]),l=i.match(No)||[];d=No.exec(r);)p=d[0],f=r.substring(u,d.index),c?c=(c+1)%5:f.substr(-5)==="rgba("&&(c=1),p!==l[h++]&&(m=parseFloat(l[h-1])||0,o._pt={_next:o._pt,p:f||h===1?f:",",s:m,c:p.charAt(1)==="="?Qa(m,p)-m:parseFloat(p)-m,m:c&&c<4?Math.round:0},u=No.lastIndex);return o.c=u<r.length?r.substring(u,r.length):"",o.fp=n,(Pd.test(r)||g)&&(o.e=0),this._pt=o,o},lu=function(e,t,i,r,a,s,n,o,u,h){gt(r)&&(r=r(a||0,e,s));var d=e[t],l=i==="get"?gt(d)?u?e[t.indexOf("set")||!gt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](u):e[t]():d:i,c=gt(d)?u?w_:lp:hu,p;if(Pt(r)&&(~r.indexOf("random(")&&(r=Ps(r)),r.charAt(1)==="="&&(p=Qa(l,r)+(Vt(l)||0),(p||p===0)&&(r=p))),!h||l!==r||Cl)return!isNaN(l*r)&&r!==""?(p=new ii(this._pt,e,t,+l||0,r-(l||0),typeof d=="boolean"?B_:up,0,c),u&&(p.fp=u),n&&p.modifier(n,this,e),this._pt=p):(!d&&!(t in e)&&ru(t,r),S_.call(this,e,t,l,r,c,o||fi.stringFilter,u))},C_=function(e,t,i,r,a){if(gt(e)&&(e=Ms(e,a,t,i,r)),!Wi(e)||e.style&&e.nodeType||Wt(e)||Bd(e))return Pt(e)?Ms(e,a,t,i,r):e;var s={},n;for(n in e)s[n]=Ms(e[n],a,t,i,r);return s},sp=function(e,t,i,r,a,s){var n,o,u,h;if(ui[e]&&(n=new ui[e]).init(a,n.rawVars?t[e]:C_(t[e],r,a,s,i),i,r,s)!==!1&&(i._pt=o=new ii(i._pt,a,e,0,1,n.render,n,0,n.priority),i!==La))for(u=i._ptLookup[i._targets.indexOf(a)],h=n._props.length;h--;)u[n._props[h]]=o;return n},vr,Cl,uu=function e(t,i,r){var a=t.vars,s=a.ease,n=a.startAt,o=a.immediateRender,u=a.lazy,h=a.onUpdate,d=a.runBackwards,l=a.yoyoEase,c=a.keyframes,p=a.autoRevert,f=t._dur,m=t._startAt,g=t._targets,A=t.parent,_=A&&A.data==="nested"?A.vars.targets:g,v=t._overwrite==="auto"&&!$l,x=t.timeline,C=a.easeReverse||l,y,T,b,E,I,B,G,X,R,D,N,z,Y;if(x&&(!c||!s)&&(s="none"),t._ease=Zr(s,bs.ease),t._rEase=C&&(Zr(C)||t._ease),t._from=!x&&!!a.runBackwards,t._from&&(t.ratio=1),!x||c&&!a.stagger){if(X=g[0]?Kr(g[0]).harness:0,z=X&&a[X.prop],y=Gn(a,au),m&&(m._zTime<0&&m.progress(1),i<0&&d&&o&&!p?m.render(-1,!0):m.revert(d&&f?Bn:Jg),m._lazy=0),n){if(Mr(t._startAt=It.set(g,Ai({data:"isStart",overwrite:!1,parent:A,immediateRender:!0,lazy:!m&&ti(u),startAt:null,delay:0,onUpdate:h&&function(){return di(t,"onUpdate")},stagger:0},n))),t._startAt._dp=0,t._startAt._sat=t,i<0&&(Ut||!o&&!p)&&t._startAt.revert(Bn),o&&f&&i<=0&&r<=0){i&&(t._zTime=i);return}}else if(d&&f&&!m){if(i&&(o=!1),b=Ai({overwrite:!1,data:"isFromStart",lazy:o&&!m&&ti(u),immediateRender:o,stagger:0,parent:A},y),z&&(b[X.prop]=z),Mr(t._startAt=It.set(g,b)),t._startAt._dp=0,t._startAt._sat=t,i<0&&(Ut?t._startAt.revert(Bn):t._startAt.render(-1,!0)),t._zTime=i,!o)e(t._startAt,nt,nt);else if(!i)return}for(t._pt=t._ptCache=0,u=f&&ti(u)||u&&!f,T=0;T<g.length;T++){if(I=g[T],G=I._gsap||nu(g)[T]._gsap,t._ptLookup[T]=D={},_l[G.id]&&yr.length&&kn(),N=_===g?T:_.indexOf(I),X&&(R=new X).init(I,z||y,t,N,_)!==!1&&(t._pt=E=new ii(t._pt,I,R.name,0,1,R.render,R,0,R.priority),R._props.forEach(function(W){D[W]=E}),R.priority&&(B=1)),!X||z)for(b in y)ui[b]&&(R=sp(b,y,t,N,I,_))?R.priority&&(B=1):D[b]=E=lu.call(t,I,b,"get",y[b],N,_,0,a.stringFilter);t._op&&t._op[T]&&t.kill(I,t._op[T]),v&&t._pt&&(vr=t,ft.killTweensOf(I,D,t.globalTime(i)),Y=!t.parent,vr=0),t._pt&&u&&(_l[G.id]=1)}B&&cp(t),t._onInit&&t._onInit(t)}t._onUpdate=h,t._initted=(!t._op||t._pt)&&!Y,c&&i<=0&&x.render(Mi,!0,!0)},M_=function(e,t,i,r,a,s,n,o){var u=(e._pt&&e._ptCache||(e._ptCache={}))[t],h,d,l,c;if(!u)for(u=e._ptCache[t]=[],l=e._ptLookup,c=e._targets.length;c--;){if(h=l[c][t],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==t&&h.fp!==t;)h=h._next;if(!h)return Cl=1,e.vars[t]="+=0",uu(e,n),Cl=0,o?Bs(t+" not eligible for reset. Try splitting into individual properties"):1;u.push(h)}for(c=u.length;c--;)d=u[c],h=d._pt||d,h.s=(r||r===0)&&!a?r:h.s+(r||0)+s*h.c,h.c=i-h.s,d.e&&(d.e=St(i)+Vt(d.e)),d.b&&(d.b=h.s+Vt(d.b))},I_=function(e,t){var i=e[0]?Kr(e[0]).harness:0,r=i&&i.aliases,a,s,n,o;if(!r)return t;for(s in a=Ya({},t),r)if(s in a)for(o=r[s].split(","),n=o.length;n--;)a[o[n]]=a[s];return a},T_=function(e,t,i,r){var a=t.ease||r||"power1.inOut",s,n;if(Wt(t))n=i[e]||(i[e]=[]),t.forEach(function(o,u){return n.push({t:u/(t.length-1)*100,v:o,e:a})});else for(s in t)n=i[s]||(i[s]=[]),s==="ease"||n.push({t:parseFloat(e),v:t[s],e:a})},Ms=function(e,t,i,r,a){return gt(e)?e.call(t,i,r,a):Pt(e)&&~e.indexOf("random(")?Ps(e):e},np=su+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",op={};$t(np+",id,stagger,delay,duration,paused,scrollTrigger",function(e){return op[e]=1});var It=(function(e){wd(t,e);function t(r,a,s,n){var o;typeof a=="number"&&(s.duration=a,a=s,s=null),o=e.call(this,n?a:Ss(a))||this;var u=o.vars,h=u.duration,d=u.delay,l=u.immediateRender,c=u.stagger,p=u.overwrite,f=u.keyframes,m=u.defaults,g=u.scrollTrigger,A=a.parent||ft,_=(Wt(r)||Bd(r)?or(r[0]):"length"in a)?[r]:Ii(r),v,x,C,y,T,b,E,I;if(o._targets=_.length?nu(_):Bs("GSAP target "+r+" not found. https://gsap.com",!fi.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=p,f||c||xn(h)||xn(d)){a=o.vars;var B=a.easeReverse||a.yoyoEase;if(v=o.timeline=new Zt({data:"nested",defaults:m||{},targets:A&&A.data==="nested"?A.vars.targets:_}),v.kill(),v.parent=v._dp=sr(o),v._start=0,c||xn(h)||xn(d)){if(y=_.length,E=c&&Xd(c),Wi(c))for(T in c)~np.indexOf(T)&&(I||(I={}),I[T]=c[T]);for(x=0;x<y;x++)C=Gn(a,op),C.stagger=0,B&&(C.easeReverse=B),I&&Ya(C,I),b=_[x],C.duration=+Ms(h,sr(o),x,b,_),C.delay=(+Ms(d,sr(o),x,b,_)||0)-o._delay,!c&&y===1&&C.delay&&(o._delay=d=C.delay,o._start+=d,C.delay=0),v.to(b,C,E?E(x,b,_):0),v._ease=We.none;v.duration()?h=d=0:o.timeline=0}else if(f){Ss(Ai(v.vars.defaults,{ease:"none"})),v._ease=Zr(f.ease||a.ease||"none");var G=0,X,R,D;if(Wt(f))f.forEach(function(N){return v.to(_,N,">")}),v.duration();else{for(T in C={},f)T==="ease"||T==="easeEach"||T_(T,f[T],C,f.easeEach);for(T in C)for(X=C[T].sort(function(N,z){return N.t-z.t}),G=0,x=0;x<X.length;x++)R=X[x],D={ease:R.e,duration:(R.t-(x?X[x-1].t:0))/100*h},D[T]=R.v,v.to(_,D,G),G+=D.duration;v.duration()<h&&v.to({},{duration:h-v.duration()})}}h||o.duration(h=v.duration())}else o.timeline=0;return p===!0&&!$l&&(vr=sr(o),ft.killTweensOf(_),vr=0),ki(A,sr(o),s),a.reversed&&o.reverse(),a.paused&&o.paused(!0),(l||!h&&!f&&o._start===pt(A._time)&&ti(l)&&r_(sr(o))&&A.data!=="nested")&&(o._tTime=-nt,o.render(Math.max(0,-d)||0)),g&&zd(sr(o),g),o}var i=t.prototype;return i.render=function(r,a,s){var n=this._time,o=this._tDur,u=this._dur,h=r<0,d=r>o-nt&&!h?o:r<nt?0:r,l,c,p,f,m,g,A,_;if(!u)s_(this,r,a,s);else if(d!==this._tTime||!r||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(l=d,_=this.timeline,this._repeat){if(f=u+this._rDelay,this._repeat<-1&&h)return this.totalTime(f*100+r,a,s);if(l=pt(d%f),d===o?(p=this._repeat,l=u):(m=pt(d/f),p=~~m,p&&p===m?(l=u,p--):l>u&&(l=u)),g=this._yoyo&&p&1,g&&(l=u-l),m=ja(this._tTime,f),l===n&&!s&&this._initted&&p===m)return this._tTime=d,this;p!==m&&this.vars.repeatRefresh&&!g&&!this._lock&&l!==f&&this._initted&&(this._lock=s=1,this.render(pt(f*p),!0).invalidate()._lock=0)}if(!this._initted){if(Vd(this,h?r:l,s,a,d))return this._tTime=0,this;if(n!==this._time&&!(s&&this.vars.repeatRefresh&&p!==m))return this;if(u!==this._dur)return this.render(r,a,s)}if(this._rEase){var v=l<n;if(v!==this._inv){var x=v?n:u-n;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=n,this._invRecip=x?(v?-1:1)/x:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=A=this._invRatio+this._invScale*this._invEase((l-this._invTime)*this._invRecip)}else this.ratio=A=this._ease(l/u);if(this._from&&(this.ratio=A=1-A),this._tTime=d,this._time=l,!this._act&&this._ts&&(this._act=1,this._lazy=0),!n&&d&&!a&&!m&&(di(this,"onStart"),this._tTime!==d))return this;for(c=this._pt;c;)c.r(A,c.d),c=c._next;_&&_.render(r<0?r:_._dur*_._ease(l/this._dur),a,s)||this._startAt&&(this._zTime=r),this._onUpdate&&!a&&(h&&vl(this,r,a,s),di(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!a&&this.parent&&di(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&vl(this,r,!0,!0),(r||!u)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Mr(this,1),!a&&!(h&&!n)&&(d||n||g)&&(di(this,d===o?"onComplete":"onReverseComplete",!0),this._prom&&!(d<o&&this.timeScale()>0)&&this._prom()))}return this},i.targets=function(){return this._targets},i.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),e.prototype.invalidate.call(this,r)},i.resetTo=function(r,a,s,n,o){Ls||hi.wake(),this._ts||this.play();var u=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||uu(this,u),h=this._ease(u/this._dur),M_(this,r,a,s,n,h,u,o)?this.resetTo(r,a,s,n,1):($n(this,0),this.parent||Gd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},i.kill=function(r,a){if(a===void 0&&(a="all"),!r&&(!a||a==="all"))return this._lazy=this._pt=0,this.parent?fs(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ut),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(r,a,vr&&vr.vars.overwrite!==!0)._first||fs(this),this.parent&&s!==this.timeline.totalDuration()&&Ka(this,this._dur*this.timeline._tDur/s,0,1),this}var n=this._targets,o=r?Ii(r):n,u=this._ptLookup,h=this._pt,d,l,c,p,f,m,g;if((!a||a==="all")&&t_(n,o))return a==="all"&&(this._pt=0),fs(this);for(d=this._op=this._op||[],a!=="all"&&(Pt(a)&&(f={},$t(a,function(A){return f[A]=1}),a=f),a=I_(n,a)),g=n.length;g--;)if(~o.indexOf(n[g]))for(f in l=u[g],a==="all"?(d[g]=a,p=l,c={}):(c=d[g]=d[g]||{},p=a),p)m=l&&l[f],m&&((!("kill"in m.d)||m.d.kill(f)===!0)&&Jn(this,m,"_pt"),delete l[f]),c!=="all"&&(c[f]=1);return this._initted&&!this._pt&&h&&fs(this),this},t.to=function(r,a){return new t(r,a,arguments[2])},t.from=function(r,a){return Cs(1,arguments)},t.delayedCall=function(r,a,s,n){return new t(a,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:a,onReverseComplete:a,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:n})},t.fromTo=function(r,a,s){return Cs(2,arguments)},t.set=function(r,a){return a.duration=0,a.repeatDelay||(a.repeat=0),new t(r,a)},t.killTweensOf=function(r,a,s){return ft.killTweensOf(r,a,s)},t})(Ds);Ai(It.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),$t("staggerTo,staggerFrom,staggerFromTo",function(e){It[e]=function(){var t=new Zt,i=El.call(arguments,0);return i.splice(e==="staggerFromTo"?5:4,0,0),t[e].apply(t,i)}});var hu=function(e,t,i){return e[t]=i},lp=function(e,t,i){return e[t](i)},w_=function(e,t,i,r){return e[t](r.fp,i)},b_=function(e,t,i){return e.setAttribute(t,i)},cu=function(e,t){return gt(e[t])?lp:eu(e[t])&&e.setAttribute?b_:hu},up=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},B_=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},hp=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},du=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},R_=function(e,t,i,r){for(var a=this._pt,s;a;)s=a._next,a.p===r&&a.modifier(e,t,i),a=s},P_=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Jn(this,t,"_pt"):t.dep||(i=1),t=r;return!i},L_=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},cp=function(e){for(var t=e._pt,i,r,a,s;t;){for(i=t._next,r=a;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:s)?t._prev._next=t:a=t,(t._next=r)?r._prev=t:s=t,t=i}e._pt=a},ii=(function(){function e(i,r,a,s,n,o,u,h,d){this.t=r,this.s=s,this.c=n,this.p=a,this.r=o||up,this.d=u||this,this.set=h||hu,this.pr=d||0,this._next=i,i&&(i._prev=this)}var t=e.prototype;return t.modifier=function(i,r,a){this.mSet=this.mSet||this.set,this.set=L_,this.m=i,this.mt=a,this.tween=r},e})();$t(su+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(e){return au[e]=1}),ci.TweenMax=ci.TweenLite=It,ci.TimelineLite=ci.TimelineMax=Zt,ft=new Zt({sortChildren:!1,defaults:bs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),fi.stringFilter=ip;var $r=[],Pn={},D_=[],Oh=0,U_=0,Go=function(e){return(Pn[e]||D_).map(function(t){return t()})},Ml=function(){var e=Date.now(),t=[];e-Oh>2&&(Go("matchMediaInit"),$r.forEach(function(i){var r=i.queries,a=i.conditions,s,n,o,u;for(n in r)s=Pi.matchMedia(r[n]).matches,s&&(o=1),s!==a[n]&&(a[n]=s,u=1);u&&(i.revert(),o&&t.push(i))}),Go("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),Oh=e,Go("matchMedia"))},dp=(function(){function e(i,r){this.selector=r&&yl(r),this.data=[],this._r=[],this.isReverted=!1,this.id=U_++,i&&this.add(i)}var t=e.prototype;return t.add=function(i,r,a){gt(i)&&(a=r,r=i,i=gt);var s=this,n=function(){var o=ct,u=s.selector,h;return o&&o!==s&&o.data.push(s),a&&(s.selector=yl(a)),ct=s,h=r.apply(s,arguments),gt(h)&&s._r.push(h),ct=o,s.selector=u,s.isReverted=!1,h};return s.last=n,i===gt?n(s,function(o){return s.add(null,o)}):i?s[i]=n:n},t.ignore=function(i){var r=ct;ct=null,i(this),ct=r},t.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof e?i.push.apply(i,r.getTweens()):r instanceof It&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(i,r){var a=this;if(i?(function(){for(var n=a.getTweens(),o=a.data.length,u;o--;)u=a.data[o],u.data==="isFlip"&&(u.revert(),u.getChildren(!0,!0,!1).forEach(function(h){return n.splice(n.indexOf(h),1)}));for(n.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(i)}),o=a.data.length;o--;)u=a.data[o],u instanceof Zt?u.data!=="nested"&&(u.scrollTrigger&&u.scrollTrigger.revert(),u.kill()):!(u instanceof It)&&u.revert&&u.revert(i);a._r.forEach(function(h){return h(i,a)}),a.isReverted=!0})():this.data.forEach(function(n){return n.kill&&n.kill()}),this.clear(),r)for(var s=$r.length;s--;)$r[s].id===this.id&&$r.splice(s,1)},t.revert=function(i){this.kill(i||{})},e})(),N_=(function(){function e(i){this.contexts=[],this.scope=i,ct&&ct.data.push(this)}var t=e.prototype;return t.add=function(i,r,a){Wi(i)||(i={matches:i});var s=new dp(0,a||this.scope),n=s.conditions={},o,u,h;for(u in ct&&!s.selector&&(s.selector=ct.selector),this.contexts.push(s),r=s.add("onMatch",r),s.queries=i,i)u==="all"?h=1:(o=Pi.matchMedia(i[u]),o&&($r.indexOf(s)<0&&$r.push(s),(n[u]=o.matches)&&(h=1),o.addListener?o.addListener(Ml):o.addEventListener("change",Ml)));return h&&r(s,function(d){return s.add(null,d)}),this},t.revert=function(i){this.kill(i||{})},t.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},e})(),zn={registerPlugin:function(){[...arguments].forEach(function(e){return $d(e)})},timeline:function(e){return new Zt(e)},getTweensOf:function(e,t){return ft.getTweensOf(e,t)},getProperty:function(e,t,i,r){Pt(e)&&(e=Ii(e)[0]);var a=Kr(e||{}).get,s=i?kd:Od;return i==="native"&&(i=""),e&&(t?s((ui[t]&&ui[t].get||a)(e,t,i,r)):function(n,o,u){return s((ui[n]&&ui[n].get||a)(e,n,o,u))})},quickSetter:function(e,t,i){if(e=Ii(e),e.length>1){var r=e.map(function(h){return ri.quickSetter(h,t,i)}),a=r.length;return function(h){for(var d=a;d--;)r[d](h)}}e=e[0]||{};var s=ui[t],n=Kr(e),o=n.harness&&(n.harness.aliases||{})[t]||t,u=s?function(h){var d=new s;La._pt=0,d.init(e,i?h+i:h,La,0,[e]),d.render(1,d),La._pt&&du(1,La)}:n.set(e,o);return s?u:function(h){return u(e,o,i?h+i:h,n,1)}},quickTo:function(e,t,i){var r,a=ri.to(e,Ai((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),s=function(n,o,u){return a.resetTo(t,n,o,u)};return s.tween=a,s},isTweening:function(e){return ft.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Zr(e.ease,bs.ease)),Dh(bs,e||{})},config:function(e){return Dh(fi,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,a=e.defaults,s=e.extendTimeline;(r||"").split(",").forEach(function(n){return n&&!ui[n]&&!ci[n]&&Bs(t+" effect requires "+n+" plugin.")}),Fo[t]=function(n,o,u){return i(Ii(n),Ai(o||{},a),u)},s&&(Zt.prototype[t]=function(n,o,u){return this.add(Fo[t](n,Wi(o)?o:(u=o)&&{},this),u)})},registerEase:function(e,t){We[e]=Zr(t)},parseEase:function(e,t){return arguments.length?Zr(e,t):We},getById:function(e){return ft.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new Zt(e),r,a;for(i.smoothChildTiming=ti(e.smoothChildTiming),ft.remove(i),i._dp=0,i._time=i._tTime=ft._time,r=ft._first;r;)a=r._next,(t||!(!r._dur&&r instanceof It&&r.vars.onComplete===r._targets[0]))&&ki(i,r,r._start-r._delay),r=a;return ki(ft,i,0),i},context:function(e,t){return e?new dp(e,t):ct},matchMedia:function(e){return new N_(e)},matchMediaRefresh:function(){return $r.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||Ml()},addEventListener:function(e,t){var i=Pn[e]||(Pn[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=Pn[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:p_,wrapYoyo:f_,distribute:Xd,random:jd,snap:Yd,normalize:d_,getUnit:Vt,clamp:l_,splitColor:ep,toArray:Ii,selector:yl,mapRange:Jd,pipe:h_,unitize:c_,interpolate:A_,shuffle:qd},install:Dd,effects:Fo,ticker:hi,updateRoot:Zt.updateRoot,plugins:ui,globalTimeline:ft,core:{PropTween:ii,globals:Ud,Tween:It,Timeline:Zt,Animation:Ds,getCache:Kr,_removeLinkedListItem:Jn,reverting:function(){return Ut},context:function(e){return e&&ct&&(ct.data.push(e),e._ctx=ct),ct},suppressOverwrites:function(e){return $l=e}}};$t("to,from,fromTo,delayedCall,set,killTweensOf",function(e){return zn[e]=It[e]}),hi.add(Zt.updateRoot),La=zn.to({},{duration:0});var F_=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Q_=function(e,t){var i=e._targets,r,a,s;for(r in t)for(a=i.length;a--;)s=e._ptLookup[a][r],s&&(s=s.d)&&(s._pt&&(s=F_(s,r)),s&&s.modifier&&s.modifier(t[r],e,i[a],r))},Ho=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,r,a){a._onInit=function(s){var n,o;if(Pt(r)&&(n={},$t(r,function(u){return n[u]=1}),r=n),t){for(o in n={},r)n[o]=t(r[o]);r=n}Q_(s,r)}}}},ri=zn.registerPlugin({name:"attr",init:function(e,t,i,r,a){var s,n,o;for(s in this.tween=i,t)o=e.getAttribute(s)||"",n=this.add(e,"setAttribute",(o||0)+"",t[s],r,a,0,0,s),n.op=s,n.b=o,this._props.push(s)},render:function(e,t){for(var i=t._pt;i;)Ut?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Ho("roundProps",Sl),Ho("modifiers"),Ho("snap",Yd))||zn;It.version=Zt.version=ri.version="3.15.0",Ld=1,tu()&&Ja(),We.Power0,We.Power1,We.Power2,We.Power3,We.Power4,We.Linear,We.Quad,We.Cubic,We.Quart,We.Quint,We.Strong,We.Elastic,We.Back,We.SteppedEase,We.Bounce,We.Sine,We.Expo,We.Circ;var kh,xr,Oa,pu,qr,Gh,fu,O_=function(){return typeof window<"u"},lr={},Vr=180/Math.PI,ka=Math.PI/180,va=Math.atan2,Hh=1e8,Au=/([A-Z])/g,k_=/(left|right|width|margin|padding|x)/i,G_=/[\s,\(]\S/,Hi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Il=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},H_=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},z_=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},V_=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},W_=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},pp=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},fp=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},q_=function(e,t,i){return e.style[t]=i},X_=function(e,t,i){return e.style.setProperty(t,i)},Y_=function(e,t,i){return e._gsap[t]=i},j_=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},K_=function(e,t,i,r,a){var s=e._gsap;s.scaleX=s.scaleY=i,s.renderTransform(a,s)},J_=function(e,t,i,r,a){var s=e._gsap;s[t]=i,s.renderTransform(a,s)},At="transform",ai=At+"Origin",Z_=function e(t,i){var r=this,a=this.target,s=a.style,n=a._gsap;if(t in lr&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Hi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return r.tfm[o]=nr(a,o)}):this.tfm[t]=n.x?n[t]:nr(a,t),t===ai&&(this.tfm.zOrigin=n.zOrigin);else return Hi.transform.split(",").forEach(function(o){return e.call(r,o,i)});if(this.props.indexOf(At)>=0)return;n.svg&&(this.svgo=a.getAttribute("data-svg-origin"),this.props.push(ai,i,"")),t=At}(s||i)&&this.props.push(t,i,s[t])},Ap=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},$_=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,a,s;for(a=0;a<e.length;a+=3)e[a+1]?e[a+1]===2?t[e[a]](e[a+2]):t[e[a]]=e[a+2]:e[a+2]?i[e[a]]=e[a+2]:i.removeProperty(e[a].substr(0,2)==="--"?e[a]:e[a].replace(Au,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)r[s]=this.tfm[s];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),a=fu(),(!a||!a.isStart)&&!i[At]&&(Ap(i),r.zOrigin&&i[ai]&&(i[ai]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},mp=function(e,t){var i={target:e,props:[],revert:$_,save:Z_};return e._gsap||ri.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},gp,Tl=function(e,t){var i=xr.createElementNS?xr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):xr.createElement(e);return i&&i.style?i:xr.createElement(e)},pi=function e(t,i,r){var a=getComputedStyle(t);return a[i]||a.getPropertyValue(i.replace(Au,"-$1").toLowerCase())||a.getPropertyValue(i)||!r&&e(t,Za(i)||i,1)||""},zh="O,Moz,ms,Ms,Webkit".split(","),Za=function(e,t,i){var r=(t||qr).style,a=5;if(e in r&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(zh[a]+e in r););return a<0?null:(a===3?"ms":a>=0?zh[a]:"")+e},wl=function(){O_()&&window.document&&(kh=window,xr=kh.document,Oa=xr.documentElement,qr=Tl("div")||{style:{}},Tl("div"),At=Za(At),ai=At+"Origin",qr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",gp=!!Za("perspective"),fu=ri.core.reverting,pu=1)},Vh=function(e){var t=e.ownerSVGElement,i=Tl("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),a;r.style.display="block",i.appendChild(r),Oa.appendChild(i);try{a=r.getBBox()}catch{}return i.removeChild(r),Oa.removeChild(i),a},Wh=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},_p=function(e){var t,i;try{t=e.getBBox()}catch{t=Vh(e),i=1}return t&&(t.width||t.height)||i||(t=Vh(e)),t&&!t.width&&!t.x&&!t.y?{x:+Wh(e,["x","cx","x1"])||0,y:+Wh(e,["y","cy","y1"])||0,width:0,height:0}:t},vp=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&_p(e))},Ir=function(e,t){if(t){var i=e.style,r;t in lr&&t!==ai&&(t=At),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(Au,"-$1").toLowerCase())):i.removeAttribute(t)}},Er=function(e,t,i,r,a,s){var n=new ii(e._pt,t,i,0,1,s?fp:pp);return e._pt=n,n.b=r,n.e=a,e._props.push(i),n},qh={deg:1,rad:1,turn:1},e0={grid:1,flex:1},Tr=function e(t,i,r,a){var s=parseFloat(r)||0,n=(r+"").trim().substr((s+"").length)||"px",o=qr.style,u=k_.test(i),h=t.tagName.toLowerCase()==="svg",d=(h?"client":"offset")+(u?"Width":"Height"),l=100,c=a==="px",p=a==="%",f,m,g,A;if(a===n||!s||qh[a]||qh[n])return s;if(n!=="px"&&!c&&(s=e(t,i,r,"px")),A=t.getCTM&&vp(t),(p||n==="%")&&(lr[i]||~i.indexOf("adius")))return f=A?t.getBBox()[u?"width":"height"]:t[d],St(p?s/f*l:s/100*f);if(o[u?"width":"height"]=l+(c?n:a),m=a!=="rem"&&~i.indexOf("adius")||a==="em"&&t.appendChild&&!h?t:t.parentNode,A&&(m=(t.ownerSVGElement||{}).parentNode),(!m||m===xr||!m.appendChild)&&(m=xr.body),g=m._gsap,g&&p&&g.width&&u&&g.time===hi.time&&!g.uncache)return St(s/g.width*l);if(p&&(i==="height"||i==="width")){var _=t.style[i];t.style[i]=l+a,f=t[d],_?t.style[i]=_:Ir(t,i)}else(p||n==="%")&&!e0[pi(m,"display")]&&(o.position=pi(t,"position")),m===t&&(o.position="static"),m.appendChild(qr),f=qr[d],m.removeChild(qr),o.position="absolute";return u&&p&&(g=Kr(m),g.time=hi.time,g.width=m[d]),St(c?f*s/l:f&&s?l/f*s:0)},nr=function(e,t,i,r){var a;return pu||wl(),t in Hi&&t!=="transform"&&(t=Hi[t],~t.indexOf(",")&&(t=t.split(",")[0])),lr[t]&&t!=="transform"?(a=Ns(e,r),a=t==="transformOrigin"?a.svg?a.origin:Wn(pi(e,ai))+" "+a.zOrigin+"px":a[t]):(a=e.style[t],(!a||a==="auto"||r||~(a+"").indexOf("calc("))&&(a=Vn[t]&&Vn[t](e,t,i)||pi(e,t)||Fd(e,t)||+(t==="opacity"))),i&&!~(a+"").trim().indexOf(" ")?Tr(e,t,a,i)+i:a},t0=function(e,t,i,r){if(!i||i==="none"){var a=Za(t,e,1),s=a&&pi(e,a,1);s&&s!==i?(t=a,i=s):t==="borderColor"&&(i=pi(e,"borderTopColor"))}var n=new ii(this._pt,e.style,t,0,1,hp),o=0,u=0,h,d,l,c,p,f,m,g,A,_,v,x;if(n.b=i,n.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=pi(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(f=e.style[t],e.style[t]=r,r=pi(e,t)||r,f?e.style[t]=f:Ir(e,t)),h=[i,r],ip(h),i=h[0],r=h[1],l=i.match(Pa)||[],x=r.match(Pa)||[],x.length){for(;d=Pa.exec(r);)m=d[0],A=r.substring(o,d.index),p?p=(p+1)%5:(A.substr(-5)==="rgba("||A.substr(-5)==="hsla(")&&(p=1),m!==(f=l[u++]||"")&&(c=parseFloat(f)||0,v=f.substr((c+"").length),m.charAt(1)==="="&&(m=Qa(c,m)+v),g=parseFloat(m),_=m.substr((g+"").length),o=Pa.lastIndex-_.length,_||(_=_||fi.units[t]||v,o===r.length&&(r+=_,n.e+=_)),v!==_&&(c=Tr(e,t,f,_)||0),n._pt={_next:n._pt,p:A||u===1?A:",",s:c,c:g-c,m:p&&p<4||t==="zIndex"?Math.round:0});n.c=o<r.length?r.substring(o,r.length):""}else n.r=t==="display"&&r==="none"?fp:pp;return Pd.test(r)&&(n.e=0),this._pt=n,n},Xh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},i0=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=Xh[i]||i,t[1]=Xh[r]||r,t.join(" ")},r0=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,a=t.u,s=i._gsap,n,o,u;if(a==="all"||a===!0)r.cssText="",o=1;else for(a=a.split(","),u=a.length;--u>-1;)n=a[u],lr[n]&&(o=1,n=n==="transformOrigin"?ai:At),Ir(i,n);o&&(Ir(i,At),s&&(s.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Ns(i,1),s.uncache=1,Ap(r)))}},Vn={clearProps:function(e,t,i,r,a){if(a.data!=="isFromStart"){var s=e._pt=new ii(e._pt,t,i,0,0,r0);return s.u=r,s.pr=-10,s.tween=a,e._props.push(i),1}}},Us=[1,0,0,1,0,0],xp={},Ep=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Yh=function(e){var t=pi(e,At);return Ep(t)?Us:t.substr(7).match(Rd).map(St)},mu=function(e,t){var i=e._gsap||Kr(e),r=e.style,a=Yh(e),s,n,o,u;return i.svg&&e.getAttribute("transform")?(o=e.transform.baseVal.consolidate().matrix,a=[o.a,o.b,o.c,o.d,o.e,o.f],a.join(",")==="1,0,0,1,0,0"?Us:a):(a===Us&&!e.offsetParent&&e!==Oa&&!i.svg&&(o=r.display,r.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(u=1,n=e.nextElementSibling,Oa.appendChild(e)),a=Yh(e),o?r.display=o:Ir(e,"display"),u&&(n?s.insertBefore(e,n):s?s.appendChild(e):Oa.removeChild(e))),t&&a.length>6?[a[0],a[1],a[4],a[5],a[12],a[13]]:a)},bl=function(e,t,i,r,a,s){var n=e._gsap,o=a||mu(e,!0),u=n.xOrigin||0,h=n.yOrigin||0,d=n.xOffset||0,l=n.yOffset||0,c=o[0],p=o[1],f=o[2],m=o[3],g=o[4],A=o[5],_=t.split(" "),v=parseFloat(_[0])||0,x=parseFloat(_[1])||0,C,y,T,b;i?o!==Us&&(y=c*m-p*f)&&(T=m/y*v+x*(-f/y)+(f*A-m*g)/y,b=v*(-p/y)+c/y*x-(c*A-p*g)/y,v=T,x=b):(C=_p(e),v=C.x+(~_[0].indexOf("%")?v/100*C.width:v),x=C.y+(~(_[1]||_[0]).indexOf("%")?x/100*C.height:x)),r||r!==!1&&n.smooth?(g=v-u,A=x-h,n.xOffset=d+(g*c+A*f)-g,n.yOffset=l+(g*p+A*m)-A):n.xOffset=n.yOffset=0,n.xOrigin=v,n.yOrigin=x,n.smooth=!!r,n.origin=t,n.originIsAbsolute=!!i,e.style[ai]="0px 0px",s&&(Er(s,n,"xOrigin",u,v),Er(s,n,"yOrigin",h,x),Er(s,n,"xOffset",d,n.xOffset),Er(s,n,"yOffset",l,n.yOffset)),e.setAttribute("data-svg-origin",v+" "+x)},Ns=function(e,t){var i=e._gsap||new ap(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,a=i.scaleX<0,s="px",n="deg",o=getComputedStyle(e),u=pi(e,ai)||"0",h=d=l=f=m=g=A=_=v=0,d,l,c=p=1,p,f,m,g,A,_,v,x,C,y,T,b,E,I,B,G,X,R,D,N,z,Y,W,J,K,U,j,re;return i.svg=!!(e.getCTM&&vp(e)),o.translate&&((o.translate!=="none"||o.scale!=="none"||o.rotate!=="none")&&(r[At]=(o.translate==="none"?"":"translate3d("+(o.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ")+(o.rotate==="none"?"":"rotate("+o.rotate+") ")+(o.scale==="none"?"":"scale("+o.scale.split(" ").join(",")+") ")+(o[At]==="none"?"":o[At])),r.scale=r.rotate=r.translate="none"),y=mu(e,i.svg),i.svg&&(i.uncache?(z=e.getBBox(),u=i.xOrigin-z.x+"px "+(i.yOrigin-z.y)+"px",N=""):N=!t&&e.getAttribute("data-svg-origin"),bl(e,N||u,!!N||i.originIsAbsolute,i.smooth!==!1,y)),x=i.xOrigin||0,C=i.yOrigin||0,y!==Us&&(I=y[0],B=y[1],G=y[2],X=y[3],h=R=y[4],d=D=y[5],y.length===6?(c=Math.sqrt(I*I+B*B),p=Math.sqrt(X*X+G*G),f=I||B?va(B,I)*Vr:0,A=G||X?va(G,X)*Vr+f:0,A&&(p*=Math.abs(Math.cos(A*ka))),i.svg&&(h-=x-(x*I+C*G),d-=C-(x*B+C*X))):(re=y[6],U=y[7],W=y[8],J=y[9],K=y[10],j=y[11],h=y[12],d=y[13],l=y[14],T=va(re,K),m=T*Vr,T&&(b=Math.cos(-T),E=Math.sin(-T),N=R*b+W*E,z=D*b+J*E,Y=re*b+K*E,W=R*-E+W*b,J=D*-E+J*b,K=re*-E+K*b,j=U*-E+j*b,R=N,D=z,re=Y),T=va(-G,K),g=T*Vr,T&&(b=Math.cos(-T),E=Math.sin(-T),N=I*b-W*E,z=B*b-J*E,Y=G*b-K*E,j=X*E+j*b,I=N,B=z,G=Y),T=va(B,I),f=T*Vr,T&&(b=Math.cos(T),E=Math.sin(T),N=I*b+B*E,z=R*b+D*E,B=B*b-I*E,D=D*b-R*E,I=N,R=z),m&&Math.abs(m)+Math.abs(f)>359.9&&(m=f=0,g=180-g),c=St(Math.sqrt(I*I+B*B+G*G)),p=St(Math.sqrt(D*D+re*re)),T=va(R,D),A=Math.abs(T)>2e-4?T*Vr:0,v=j?1/(j<0?-j:j):0),i.svg&&(N=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!Ep(pi(e,At)),N&&e.setAttribute("transform",N))),Math.abs(A)>90&&Math.abs(A)<270&&(a?(c*=-1,A+=f<=0?180:-180,f+=f<=0?180:-180):(p*=-1,A+=A<=0?180:-180)),t||(t=i.uncache),i.x=h-((i.xPercent=h&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+s,i.y=d-((i.yPercent=d&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+s,i.z=l+s,i.scaleX=St(c),i.scaleY=St(p),i.rotation=St(f)+n,i.rotationX=St(m)+n,i.rotationY=St(g)+n,i.skewX=A+n,i.skewY=_+n,i.transformPerspective=v+s,(i.zOrigin=parseFloat(u.split(" ")[2])||!t&&i.zOrigin||0)&&(r[ai]=Wn(u)),i.xOffset=i.yOffset=0,i.force3D=fi.force3D,i.renderTransform=i.svg?s0:gp?yp:a0,i.uncache=0,i},Wn=function(e){return(e=e.split(" "))[0]+" "+e[1]},zo=function(e,t,i){var r=Vt(t);return St(parseFloat(t)+parseFloat(Tr(e,"x",i+"px",r)))+r},a0=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,yp(e,t)},Qr="0deg",us="0px",Or=") ",yp=function(e,t){var i=t||this,r=i.xPercent,a=i.yPercent,s=i.x,n=i.y,o=i.z,u=i.rotation,h=i.rotationY,d=i.rotationX,l=i.skewX,c=i.skewY,p=i.scaleX,f=i.scaleY,m=i.transformPerspective,g=i.force3D,A=i.target,_=i.zOrigin,v="",x=g==="auto"&&e&&e!==1||g===!0;if(_&&(d!==Qr||h!==Qr)){var C=parseFloat(h)*ka,y=Math.sin(C),T=Math.cos(C),b;C=parseFloat(d)*ka,b=Math.cos(C),s=zo(A,s,y*b*-_),n=zo(A,n,-Math.sin(C)*-_),o=zo(A,o,T*b*-_+_)}m!==us&&(v+="perspective("+m+Or),(r||a)&&(v+="translate("+r+"%, "+a+"%) "),(x||s!==us||n!==us||o!==us)&&(v+=o!==us||x?"translate3d("+s+", "+n+", "+o+") ":"translate("+s+", "+n+Or),u!==Qr&&(v+="rotate("+u+Or),h!==Qr&&(v+="rotateY("+h+Or),d!==Qr&&(v+="rotateX("+d+Or),(l!==Qr||c!==Qr)&&(v+="skew("+l+", "+c+Or),(p!==1||f!==1)&&(v+="scale("+p+", "+f+Or),A.style[At]=v||"translate(0, 0)"},s0=function(e,t){var i=t||this,r=i.xPercent,a=i.yPercent,s=i.x,n=i.y,o=i.rotation,u=i.skewX,h=i.skewY,d=i.scaleX,l=i.scaleY,c=i.target,p=i.xOrigin,f=i.yOrigin,m=i.xOffset,g=i.yOffset,A=i.forceCSS,_=parseFloat(s),v=parseFloat(n),x,C,y,T,b;o=parseFloat(o),u=parseFloat(u),h=parseFloat(h),h&&(h=parseFloat(h),u+=h,o+=h),o||u?(o*=ka,u*=ka,x=Math.cos(o)*d,C=Math.sin(o)*d,y=Math.sin(o-u)*-l,T=Math.cos(o-u)*l,u&&(h*=ka,b=Math.tan(u-h),b=Math.sqrt(1+b*b),y*=b,T*=b,h&&(b=Math.tan(h),b=Math.sqrt(1+b*b),x*=b,C*=b)),x=St(x),C=St(C),y=St(y),T=St(T)):(x=d,T=l,C=y=0),(_&&!~(s+"").indexOf("px")||v&&!~(n+"").indexOf("px"))&&(_=Tr(c,"x",s,"px"),v=Tr(c,"y",n,"px")),(p||f||m||g)&&(_=St(_+p-(p*x+f*y)+m),v=St(v+f-(p*C+f*T)+g)),(r||a)&&(b=c.getBBox(),_=St(_+r/100*b.width),v=St(v+a/100*b.height)),b="matrix("+x+","+C+","+y+","+T+","+_+","+v+")",c.setAttribute("transform",b),A&&(c.style[At]=b)},n0=function(e,t,i,r,a){var s=360,n=Pt(a),o=parseFloat(a)*(n&&~a.indexOf("rad")?Vr:1)-r,u=r+o+"deg",h,d;return n&&(h=a.split("_")[1],h==="short"&&(o%=s,o!==o%(s/2)&&(o+=o<0?s:-s)),h==="cw"&&o<0?o=(o+s*Hh)%s-~~(o/s)*s:h==="ccw"&&o>0&&(o=(o-s*Hh)%s-~~(o/s)*s)),e._pt=d=new ii(e._pt,t,i,r,o,H_),d.e=u,d.u="deg",e._props.push(i),d},jh=function(e,t){for(var i in t)e[i]=t[i];return e},o0=function(e,t,i){var r=jh({},i._gsap),a="perspective,force3D,transformOrigin,svgOrigin",s=i.style,n,o,u,h,d,l,c,p;for(o in r.svg?(u=i.getAttribute("transform"),i.setAttribute("transform",""),s[At]=t,n=Ns(i,1),Ir(i,At),i.setAttribute("transform",u)):(u=getComputedStyle(i)[At],s[At]=t,n=Ns(i,1),s[At]=u),lr)u=r[o],h=n[o],u!==h&&a.indexOf(o)<0&&(c=Vt(u),p=Vt(h),d=c===p?parseFloat(u):Tr(i,o,u,p),l=parseFloat(h),e._pt=new ii(e._pt,n,o,d,l-d,Il),e._pt.u=p||0,e._props.push(o));jh(n,r)};$t("padding,margin,Width,Radius",function(e,t){var i="Top",r="Right",a="Bottom",s="Left",n=(t<3?[i,r,a,s]:[i+s,i+r,a+r,a+s]).map(function(o){return t<2?e+o:"border"+o+e});Vn[t>1?"border"+e:e]=function(o,u,h,d,l){var c,p;if(arguments.length<4)return c=n.map(function(f){return nr(o,f,h)}),p=c.join(" "),p.split(c[0]).length===5?c[0]:p;c=(d+"").split(" "),p={},n.forEach(function(f,m){return p[f]=c[m]=c[m]||c[(m-1)/2|0]}),o.init(u,p,l)}});var Sp={name:"css",register:wl,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,a){var s=this._props,n=e.style,o=i.vars.startAt,u,h,d,l,c,p,f,m,g,A,_,v,x,C,y,T,b;for(f in pu||wl(),this.styles=this.styles||mp(e),T=this.styles.props,this.tween=i,t)if(f!=="autoRound"&&(h=t[f],!(ui[f]&&sp(f,t,i,r,e,a)))){if(c=typeof h,p=Vn[f],c==="function"&&(h=h.call(i,r,e,a),c=typeof h),c==="string"&&~h.indexOf("random(")&&(h=Ps(h)),p)p(this,e,f,h,i)&&(y=1);else if(f.substr(0,2)==="--")u=(getComputedStyle(e).getPropertyValue(f)+"").trim(),h+="",Sr.lastIndex=0,Sr.test(u)||(m=Vt(u),g=Vt(h),g?m!==g&&(u=Tr(e,f,u,g)+g):m&&(h+=m)),this.add(n,"setProperty",u,h,r,a,0,0,f),s.push(f),T.push(f,0,n[f]);else if(c!=="undefined"){if(o&&f in o?(u=typeof o[f]=="function"?o[f].call(i,r,e,a):o[f],Pt(u)&&~u.indexOf("random(")&&(u=Ps(u)),Vt(u+"")||u==="auto"||(u+=fi.units[f]||Vt(nr(e,f))||""),(u+"").charAt(1)==="="&&(u=nr(e,f))):u=nr(e,f),l=parseFloat(u),A=c==="string"&&h.charAt(1)==="="&&h.substr(0,2),A&&(h=h.substr(2)),d=parseFloat(h),f in Hi&&(f==="autoAlpha"&&(l===1&&nr(e,"visibility")==="hidden"&&d&&(l=0),T.push("visibility",0,n.visibility),Er(this,n,"visibility",l?"inherit":"hidden",d?"inherit":"hidden",!d)),f!=="scale"&&f!=="transform"&&(f=Hi[f],~f.indexOf(",")&&(f=f.split(",")[0]))),_=f in lr,_){if(this.styles.save(f),b=h,c==="string"&&h.substring(0,6)==="var(--"){if(h=pi(e,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var E=e.style.perspective;e.style.perspective=h,h=pi(e,"perspective"),E?e.style.perspective=E:Ir(e,"perspective")}d=parseFloat(h)}if(v||(x=e._gsap,x.renderTransform&&!t.parseTransform||Ns(e,t.parseTransform),C=t.smoothOrigin!==!1&&x.smooth,v=this._pt=new ii(this._pt,n,At,0,1,x.renderTransform,x,0,-1),v.dep=1),f==="scale")this._pt=new ii(this._pt,x,"scaleY",x.scaleY,(A?Qa(x.scaleY,A+d):d)-x.scaleY||0,Il),this._pt.u=0,s.push("scaleY",f),f+="X";else if(f==="transformOrigin"){T.push(ai,0,n[ai]),h=i0(h),x.svg?bl(e,h,0,C,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==x.zOrigin&&Er(this,x,"zOrigin",x.zOrigin,g),Er(this,n,f,Wn(u),Wn(h)));continue}else if(f==="svgOrigin"){bl(e,h,1,C,0,this);continue}else if(f in xp){n0(this,x,f,l,A?Qa(l,A+h):h);continue}else if(f==="smoothOrigin"){Er(this,x,"smooth",x.smooth,h);continue}else if(f==="force3D"){x[f]=h;continue}else if(f==="transform"){o0(this,h,e);continue}}else f in n||(f=Za(f)||f);if(_||(d||d===0)&&(l||l===0)&&!G_.test(h)&&f in n)m=(u+"").substr((l+"").length),d||(d=0),g=Vt(h)||(f in fi.units?fi.units[f]:m),m!==g&&(l=Tr(e,f,u,g)),this._pt=new ii(this._pt,_?x:n,f,l,(A?Qa(l,A+d):d)-l,!_&&(g==="px"||f==="zIndex")&&t.autoRound!==!1?W_:Il),this._pt.u=g||0,_&&b!==h?(this._pt.b=u,this._pt.e=b,this._pt.r=V_):m!==g&&g!=="%"&&(this._pt.b=u,this._pt.r=z_);else if(f in n)t0.call(this,e,f,u,A?A+h:h);else if(f in e)this.add(e,f,u||e[f],A?A+h:h,r,a);else if(f!=="parseTransform"){ru(f,h);continue}_||(f in n?T.push(f,0,n[f]):typeof e[f]=="function"?T.push(f,2,e[f]()):T.push(f,1,u||e[f])),s.push(f)}}y&&cp(this)},render:function(e,t){if(t.tween._time||!fu())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:nr,aliases:Hi,getSetter:function(e,t,i){var r=Hi[t];return r&&r.indexOf(",")<0&&(t=r),t in lr&&t!==ai&&(e._gsap.x||nr(e,"x"))?i&&Gh===i?t==="scale"?j_:Y_:(Gh=i||{})&&(t==="scale"?K_:J_):e.style&&!eu(e.style[t])?q_:~t.indexOf("-")?X_:cu(e,t)},core:{_removeProperty:Ir,_getMatrix:mu}};ri.utils.checkPrefix=Za,ri.core.getStyleSaver=mp,(function(e,t,i,r){var a=$t(e+","+t+","+i,function(s){lr[s]=1});$t(t,function(s){fi.units[s]="deg",xp[s]=1}),Hi[a[13]]=e+","+t,$t(r,function(s){var n=s.split(":");Hi[n[1]]=a[n[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),$t("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(e){fi.units[e]="px"}),ri.registerPlugin(Sp);var mr=ri.registerPlugin(Sp)||ri;mr.core.Tween;function Kh(e,t){if(t===0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(t===2||t===1){let i=e.getIndex();if(i===null){let n=[],o=e.getAttribute("position");if(o!==void 0){for(let u=0;u<o.count;u++)n.push(u);e.setIndex(n),i=e.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e}let r=i.count-2,a=[];if(t===2)for(let n=1;n<=r;n++)a.push(i.getX(0)),a.push(i.getX(n)),a.push(i.getX(n+1));else for(let n=0;n<r;n++)n%2==0?(a.push(i.getX(n)),a.push(i.getX(n+1)),a.push(i.getX(n+2))):(a.push(i.getX(n+2)),a.push(i.getX(n+1)),a.push(i.getX(n)));a.length/3!==r&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=e.clone();return s.setIndex(a),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),e}var l0=class extends wr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new p0(t)}),this.register(function(t){return new y0(t)}),this.register(function(t){return new S0(t)}),this.register(function(t){return new C0(t)}),this.register(function(t){return new A0(t)}),this.register(function(t){return new m0(t)}),this.register(function(t){return new g0(t)}),this.register(function(t){return new _0(t)}),this.register(function(t){return new d0(t)}),this.register(function(t){return new v0(t)}),this.register(function(t){return new f0(t)}),this.register(function(t){return new E0(t)}),this.register(function(t){return new x0(t)}),this.register(function(t){return new h0(t)}),this.register(function(t){return new M0(t)}),this.register(function(t){return new I0(t)})}load(e,t,i,r){let a=this,s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){let u=ys.extractUrlBase(e);s=ys.resolveURL(u,this.path)}else s=ys.extractUrlBase(e);this.manager.itemStart(e);let n=function(u){r?r(u):console.error(u),a.manager.itemError(e),a.manager.itemEnd(e)},o=new jr(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(u){try{a.parse(u,s,function(h){t(h),a.manager.itemEnd(e)},n)}catch(h){n(h)}},i,n)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,r){let a,s={},n={},o=new TextDecoder;if(typeof e=="string")a=JSON.parse(e);else if(e instanceof ArrayBuffer)if(o.decode(new Uint8Array(e,0,4))===Cp){try{s[Ve.KHR_BINARY_GLTF]=new T0(e)}catch(h){r&&r(h);return}a=JSON.parse(s[Ve.KHR_BINARY_GLTF].content)}else a=JSON.parse(o.decode(e));else a=e;if(a.asset===void 0||a.asset.version[0]<2){r&&r(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let u=new k0(a,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});u.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let d=this.pluginCallbacks[h](u);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),n[d.name]=d,s[d.name]=!0}if(a.extensionsUsed)for(let h=0;h<a.extensionsUsed.length;++h){let d=a.extensionsUsed[h],l=a.extensionsRequired||[];switch(d){case Ve.KHR_MATERIALS_UNLIT:s[d]=new c0;break;case Ve.KHR_DRACO_MESH_COMPRESSION:s[d]=new w0(a,this.dracoLoader);break;case Ve.KHR_TEXTURE_TRANSFORM:s[d]=new b0;break;case Ve.KHR_MESH_QUANTIZATION:s[d]=new B0;break;default:l.indexOf(d)>=0&&n[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}u.setExtensions(s),u.setPlugins(n),u.parse(i,r)}parseAsync(e,t){let i=this;return new Promise(function(r,a){i.parse(e,t,r,a)})}};function u0(){let e={};return{get:function(t){return e[t]},add:function(t,i){e[t]=i},remove:function(t){delete e[t]},removeAll:function(){e={}}}}var Ve={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},h0=class{constructor(e){this.parser=e,this.name=Ve.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i];a.extensions&&a.extensions[this.name]&&a.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,a.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,r=t.cache.get(i);if(r)return r;let a=t.json,s=((a.extensions&&a.extensions[this.name]||{}).lights||[])[e],n,o=new ye(16777215);s.color!==void 0&&o.setRGB(s.color[0],s.color[1],s.color[2],Ct);let u=s.range===void 0?0:s.range;switch(s.type){case"directional":n=new Tg(o),n.target.position.set(0,0,-1),n.add(n.target);break;case"point":n=new Id(o),n.distance=u;break;case"spot":n=new Cg(o),n.distance=u,s.spot=s.spot||{},s.spot.innerConeAngle=s.spot.innerConeAngle===void 0?0:s.spot.innerConeAngle,s.spot.outerConeAngle=s.spot.outerConeAngle===void 0?Math.PI/4:s.spot.outerConeAngle,n.angle=s.spot.outerConeAngle,n.penumbra=1-s.spot.innerConeAngle/s.spot.outerConeAngle,n.target.position.set(0,0,-1),n.add(n.target);break;default:throw Error("THREE.GLTFLoader: Unexpected light type: "+s.type)}return n.position.set(0,0,0),n.decay=2,gr(n,s),s.intensity!==void 0&&(n.intensity=s.intensity),n.name=t.createUniqueName(s.name||"light_"+e),r=Promise.resolve(n),t.cache.add(i,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(s){return i._getNodeRef(t.cache,a,s)})}},c0=class{constructor(){this.name=Ve.KHR_MATERIALS_UNLIT}getMaterialType(){return Si}extendParams(e,t,i){let r=[];e.color=new ye(1,1,1),e.opacity=1;let a=t.pbrMetallicRoughness;if(a){if(Array.isArray(a.baseColorFactor)){let s=a.baseColorFactor;e.color.setRGB(s[0],s[1],s[2],Ct),e.opacity=s[3]}a.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",a.baseColorTexture,Ye))}return Promise.all(r)}},d0=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},p0=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:ur}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let a=[],s=r.extensions[this.name];if(s.clearcoatFactor!==void 0&&(t.clearcoat=s.clearcoatFactor),s.clearcoatTexture!==void 0&&a.push(i.assignTexture(t,"clearcoatMap",s.clearcoatTexture)),s.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=s.clearcoatRoughnessFactor),s.clearcoatRoughnessTexture!==void 0&&a.push(i.assignTexture(t,"clearcoatRoughnessMap",s.clearcoatRoughnessTexture)),s.clearcoatNormalTexture!==void 0&&(a.push(i.assignTexture(t,"clearcoatNormalMap",s.clearcoatNormalTexture)),s.clearcoatNormalTexture.scale!==void 0)){let n=s.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new oe(n,n)}return Promise.all(a)}},f0=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:ur}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let a=[],s=r.extensions[this.name];return s.iridescenceFactor!==void 0&&(t.iridescence=s.iridescenceFactor),s.iridescenceTexture!==void 0&&a.push(i.assignTexture(t,"iridescenceMap",s.iridescenceTexture)),s.iridescenceIor!==void 0&&(t.iridescenceIOR=s.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),s.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=s.iridescenceThicknessMinimum),s.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=s.iridescenceThicknessMaximum),s.iridescenceThicknessTexture!==void 0&&a.push(i.assignTexture(t,"iridescenceThicknessMap",s.iridescenceThicknessTexture)),Promise.all(a)}},A0=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SHEEN}getMaterialType(e){let t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:ur}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let a=[];t.sheenColor=new ye(0,0,0),t.sheenRoughness=0,t.sheen=1;let s=r.extensions[this.name];if(s.sheenColorFactor!==void 0){let n=s.sheenColorFactor;t.sheenColor.setRGB(n[0],n[1],n[2],Ct)}return s.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=s.sheenRoughnessFactor),s.sheenColorTexture!==void 0&&a.push(i.assignTexture(t,"sheenColorMap",s.sheenColorTexture,Ye)),s.sheenRoughnessTexture!==void 0&&a.push(i.assignTexture(t,"sheenRoughnessMap",s.sheenRoughnessTexture)),Promise.all(a)}},m0=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:ur}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let a=[],s=r.extensions[this.name];return s.transmissionFactor!==void 0&&(t.transmission=s.transmissionFactor),s.transmissionTexture!==void 0&&a.push(i.assignTexture(t,"transmissionMap",s.transmissionTexture)),Promise.all(a)}},g0=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_VOLUME}getMaterialType(e){let t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:ur}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let a=[],s=r.extensions[this.name];t.thickness=s.thicknessFactor===void 0?0:s.thicknessFactor,s.thicknessTexture!==void 0&&a.push(i.assignTexture(t,"thicknessMap",s.thicknessTexture)),t.attenuationDistance=s.attenuationDistance||1/0;let n=s.attenuationColor||[1,1,1];return t.attenuationColor=new ye().setRGB(n[0],n[1],n[2],Ct),Promise.all(a)}},_0=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IOR}getMaterialType(e){let t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:ur}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior===void 0?1.5:r.ior,Promise.resolve()}},v0=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SPECULAR}getMaterialType(e){let t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:ur}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let a=[],s=r.extensions[this.name];t.specularIntensity=s.specularFactor===void 0?1:s.specularFactor,s.specularTexture!==void 0&&a.push(i.assignTexture(t,"specularIntensityMap",s.specularTexture));let n=s.specularColorFactor||[1,1,1];return t.specularColor=new ye().setRGB(n[0],n[1],n[2],Ct),s.specularColorTexture!==void 0&&a.push(i.assignTexture(t,"specularColorMap",s.specularColorTexture,Ye)),Promise.all(a)}},x0=class{constructor(e){this.parser=e,this.name=Ve.EXT_MATERIALS_BUMP}getMaterialType(e){let t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:ur}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let a=[],s=r.extensions[this.name];return t.bumpScale=s.bumpFactor===void 0?1:s.bumpFactor,s.bumpTexture!==void 0&&a.push(i.assignTexture(t,"bumpMap",s.bumpTexture)),Promise.all(a)}},E0=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:ur}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let a=[],s=r.extensions[this.name];return s.anisotropyStrength!==void 0&&(t.anisotropy=s.anisotropyStrength),s.anisotropyRotation!==void 0&&(t.anisotropyRotation=s.anisotropyRotation),s.anisotropyTexture!==void 0&&a.push(i.assignTexture(t,"anisotropyMap",s.anisotropyTexture)),Promise.all(a)}},y0=class{constructor(e){this.parser=e,this.name=Ve.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let a=r.extensions[this.name],s=t.options.ktx2Loader;if(!s){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,a.source,s)}},S0=class{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,i=this.parser,r=i.json,a=r.textures[e];if(!a.extensions||!a.extensions[t])return null;let s=a.extensions[t],n=r.images[s.source],o=i.textureLoader;if(n.uri){let u=i.options.manager.getHandler(n.uri);u!==null&&(o=u)}return this.detectSupport().then(function(u){if(u)return i.loadTextureImage(e,s.source,o);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},C0=class{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,i=this.parser,r=i.json,a=r.textures[e];if(!a.extensions||!a.extensions[t])return null;let s=a.extensions[t],n=r.images[s.source],o=i.textureLoader;if(n.uri){let u=i.options.manager.getHandler(n.uri);u!==null&&(o=u)}return this.detectSupport().then(function(u){if(u)return i.loadTextureImage(e,s.source,o);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},M0=class{constructor(e){this.name=Ve.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let r=i.extensions[this.name],a=this.parser.getDependency("buffer",r.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return a.then(function(n){let o=r.byteOffset||0,u=r.byteLength||0,h=r.count,d=r.byteStride,l=new Uint8Array(n,o,u);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(h,d,l,r.mode,r.filter).then(function(c){return c.buffer}):s.ready.then(function(){let c=new ArrayBuffer(h*d);return s.decodeGltfBuffer(new Uint8Array(c),h,d,l,r.mode,r.filter),c})})}else return null}},I0=class{constructor(e){this.name=Ve.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let r=t.meshes[i.mesh];for(let o of r.primitives)if(o.mode!==Ei.TRIANGLES&&o.mode!==Ei.TRIANGLE_STRIP&&o.mode!==Ei.TRIANGLE_FAN&&o.mode!==void 0)return null;let a=i.extensions[this.name].attributes,s=[],n={};for(let o in a)s.push(this.parser.getDependency("accessor",a[o]).then(u=>(n[o]=u,n[o])));return s.length<1?null:(s.push(this.parser.createNodeMesh(e)),Promise.all(s).then(o=>{let u=o.pop(),h=u.isGroup?u.children:[u],d=o[0].count,l=[];for(let c of h){let p=new ke,f=new P,m=new _t,g=new P(1,1,1),A=new og(c.geometry,c.material,d);for(let _=0;_<d;_++)n.TRANSLATION&&f.fromBufferAttribute(n.TRANSLATION,_),n.ROTATION&&m.fromBufferAttribute(n.ROTATION,_),n.SCALE&&g.fromBufferAttribute(n.SCALE,_),A.setMatrixAt(_,p.compose(f,m,g));for(let _ in n)if(_==="_COLOR_0"){let v=n[_];A.instanceColor=new pl(v.array,v.itemSize,v.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&c.geometry.setAttribute(_,n[_]);wt.prototype.copy.call(A,c),this.parser.assignFinalMaterial(A),l.push(A)}return u.isGroup?(u.clear(),u.add(...l),u):l[0]}))}},Cp="glTF",hs=12,Jh={JSON:1313821514,BIN:5130562},T0=class{constructor(e){this.name=Ve.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,hs),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Cp)throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-hs,a=new DataView(e,hs),s=0;for(;s<r;){let n=a.getUint32(s,!0);s+=4;let o=a.getUint32(s,!0);if(s+=4,o===Jh.JSON){let u=new Uint8Array(e,hs+s,n);this.content=i.decode(u)}else if(o===Jh.BIN){let u=hs+s;this.body=e.slice(u,u+n)}s+=n}if(this.content===null)throw Error("THREE.GLTFLoader: JSON content not found.")}},w0=class{constructor(e,t){if(!t)throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ve.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,r=this.dracoLoader,a=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,n={},o={},u={};for(let h in s){let d=Bl[h]||h.toLowerCase();n[d]=s[h]}for(let h in e.attributes){let d=Bl[h]||h.toLowerCase();if(s[h]!==void 0){let l=i.accessors[e.attributes[h]];u[d]=Ga[l.componentType].name,o[d]=l.normalized===!0}}return t.getDependency("bufferView",a).then(function(h){return new Promise(function(d,l){r.decodeDracoFile(h,function(c){for(let p in c.attributes){let f=c.attributes[p],m=o[p];m!==void 0&&(f.normalized=m)}d(c)},n,u,Ct,l)})})}},b0=class{constructor(){this.name=Ve.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},B0=class{constructor(){this.name=Ve.KHR_MESH_QUANTIZATION}},Mp=class extends Os{constructor(e,t,i,r){super(e,t,i,r)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r*3+r;for(let s=0;s!==r;s++)t[s]=i[a+s];return t}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,n=this.valueSize,o=n*2,u=n*3,h=r-t,d=(i-t)/h,l=d*d,c=l*d,p=e*u,f=p-u,m=-2*c+3*l,g=c-l,A=1-m,_=g-l+d;for(let v=0;v!==n;v++){let x=s[f+v+n],C=s[f+v+o]*h,y=s[p+v+n],T=s[p+v]*h;a[v]=A*x+_*C+m*y+g*T}return a}},R0=new _t,P0=class extends Mp{interpolate_(e,t,i,r){let a=super.interpolate_(e,t,i,r);return R0.fromArray(a).normalize().toArray(a),a}},Ei={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ga={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Zh={9728:si,9729:qe,9984:Bc,9985:Pc,9986:Rc,9987:$a},$h={33071:Li,33648:Dn,10497:yi},Vo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Bl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ar={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},L0={CUBICSPLINE:void 0,LINEAR:za,STEP:Is},Wo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function D0(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new Fa({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function kr(e,t,i){for(let r in i.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=i.extensions[r])}function gr(e,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(e.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function U0(e,t,i){let r=!1,a=!1,s=!1;for(let h=0,d=t.length;h<d;h++){let l=t[h];if(l.POSITION!==void 0&&(r=!0),l.NORMAL!==void 0&&(a=!0),l.COLOR_0!==void 0&&(s=!0),r&&a&&s)break}if(!r&&!a&&!s)return Promise.resolve(e);let n=[],o=[],u=[];for(let h=0,d=t.length;h<d;h++){let l=t[h];if(r){let c=l.POSITION===void 0?e.attributes.position:i.getDependency("accessor",l.POSITION);n.push(c)}if(a){let c=l.NORMAL===void 0?e.attributes.normal:i.getDependency("accessor",l.NORMAL);o.push(c)}if(s){let c=l.COLOR_0===void 0?e.attributes.color:i.getDependency("accessor",l.COLOR_0);u.push(c)}}return Promise.all([Promise.all(n),Promise.all(o),Promise.all(u)]).then(function(h){let d=h[0],l=h[1],c=h[2];return r&&(e.morphAttributes.position=d),a&&(e.morphAttributes.normal=l),s&&(e.morphAttributes.color=c),e.morphTargetsRelative=!0,e})}function N0(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let i=0,r=t.weights.length;i<r;i++)e.morphTargetInfluences[i]=t.weights[i];if(t.extras&&Array.isArray(t.extras.targetNames)){let i=t.extras.targetNames;if(e.morphTargetInfluences.length===i.length){e.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++)e.morphTargetDictionary[i[r]]=r}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function F0(e){let t,i=e.extensions&&e.extensions[Ve.KHR_DRACO_MESH_COMPRESSION];if(t=i?"draco:"+i.bufferView+":"+i.indices+":"+qo(i.attributes):e.indices+":"+qo(e.attributes)+":"+e.mode,e.targets!==void 0)for(let r=0,a=e.targets.length;r<a;r++)t+=":"+qo(e.targets[r]);return t}function qo(e){let t="",i=Object.keys(e).sort();for(let r=0,a=i.length;r<a;r++)t+=i[r]+":"+e[i[r]]+";";return t}function Rl(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Q0(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?"image/jpeg":e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var O0=new ke,k0=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new u0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=!1,a=-1;typeof navigator<"u"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,a=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||i||r&&a<98?this.textureLoader=new yg(this.options.manager):this.textureLoader=new wg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new jr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,r=this.json,a=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(s){let n={scene:s[0][r.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:r.asset,parser:i,userData:{}};return kr(a,n,r),gr(n,r),Promise.all(i._invokeAll(function(o){return o.afterRoot&&o.afterRoot(n)})).then(function(){e(n)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,a=t.length;r<a;r++){let s=t[r].joints;for(let n=0,o=s.length;n<o;n++)e[s[n]].isBone=!0}for(let r=0,a=e.length;r<a;r++){let s=e[r];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(i[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let r=i.clone(),a=(s,n)=>{let o=this.associations.get(s);o!=null&&this.associations.set(n,o);for(let[u,h]of s.children.entries())a(h,n.children[u])};return a(i,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let r=e(t[i]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let r=0;r<t.length;r++){let a=e(t[r]);a&&i.push(a)}return i}getDependency(e,t){let i=e+":"+t,r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(a){return a.loadNode&&a.loadNode(t)});break;case"mesh":r=this._invokeOne(function(a){return a.loadMesh&&a.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(a){return a.loadBufferView&&a.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(a){return a.loadMaterial&&a.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(a){return a.loadTexture&&a.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(a){return a.loadAnimation&&a.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(a){return a!=this&&a.getDependency&&a.getDependency(e,t)}),!r)throw Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(a,s){return i.getDependency(e,s)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ve.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(a,s){i.load(ys.resolveURL(t.uri,r.path),a,void 0,function(){s(Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let r=t.byteLength||0,a=t.byteOffset||0;return i.slice(a,a+r)})}loadAccessor(e){let t=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let s=Vo[r.type],n=Ga[r.componentType],o=r.normalized===!0,u=new n(r.count*s);return Promise.resolve(new ot(u,s,o))}let a=[];return r.bufferView===void 0?a.push(null):a.push(this.getDependency("bufferView",r.bufferView)),r.sparse!==void 0&&(a.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),a.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(a).then(function(s){let n=s[0],o=Vo[r.type],u=Ga[r.componentType],h=u.BYTES_PER_ELEMENT,d=h*o,l=r.byteOffset||0,c=r.bufferView===void 0?void 0:i.bufferViews[r.bufferView].byteStride,p=r.normalized===!0,f,m;if(c&&c!==d){let g=Math.floor(l/c),A="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+g+":"+r.count,_=t.cache.get(A);_||(f=new u(n,g*c,r.count*c/h),_=new tg(f,c/h),t.cache.add(A,_)),m=new ig(_,o,l%c/h,p)}else f=n===null?new u(r.count*o):new u(n,l,r.count*o),m=new ot(f,o,p);if(r.sparse!==void 0){let g=Vo.SCALAR,A=Ga[r.sparse.indices.componentType],_=r.sparse.indices.byteOffset||0,v=r.sparse.values.byteOffset||0,x=new A(s[1],_,r.sparse.count*g),C=new u(s[2],v,r.sparse.count*o);n!==null&&(m=new ot(m.array.slice(),m.itemSize,m.normalized));for(let y=0,T=x.length;y<T;y++){let b=x[y];if(m.setX(b,C[y*o]),o>=2&&m.setY(b,C[y*o+1]),o>=3&&m.setZ(b,C[y*o+2]),o>=4&&m.setW(b,C[y*o+3]),o>=5)throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r],s=this.textureLoader;if(a.uri){let n=i.manager.getHandler(a.uri);n!==null&&(s=n)}return this.loadTextureImage(e,r,s)}loadTextureImage(e,t,i){let r=this,a=this.json,s=a.textures[e],n=a.images[t],o=(n.uri||n.bufferView)+":"+s.sampler;if(this.textureCache[o])return this.textureCache[o];let u=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=s.name||n.name||"",h.name===""&&typeof n.uri=="string"&&n.uri.startsWith("data:image/")===!1&&(h.name=n.uri);let d=(a.samplers||{})[s.sampler]||{};return h.magFilter=Zh[d.magFilter]||1006,h.minFilter=Zh[d.minFilter]||1008,h.wrapS=$h[d.wrapS]||1e3,h.wrapT=$h[d.wrapT]||1e3,r.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[o]=u,u}loadImageSource(e,t){let i=this,r=this.json,a=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let s=r.images[e],n=self.URL||self.webkitURL,o=s.uri||"",u=!1;if(s.bufferView!==void 0)o=i.getDependency("bufferView",s.bufferView).then(function(d){u=!0;let l=new Blob([d],{type:s.mimeType});return o=n.createObjectURL(l),o});else if(s.uri===void 0)throw Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(o).then(function(d){return new Promise(function(l,c){let p=l;t.isImageBitmapLoader===!0&&(p=function(f){let m=new Dt(f);m.needsUpdate=!0,l(m)}),t.load(ys.resolveURL(d,a.path),p,void 0,c)})}).then(function(d){return u===!0&&n.revokeObjectURL(o),d.userData.mimeType=s.mimeType||Q0(s.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",o),d});return this.sourceCache[e]=h,h}assignTexture(e,t,i,r){let a=this;return this.getDependency("texture",i.index).then(function(s){if(!s)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(s=s.clone(),s.channel=i.texCoord),a.extensions[Ve.KHR_TEXTURE_TRANSFORM]){let n=i.extensions===void 0?void 0:i.extensions[Ve.KHR_TEXTURE_TRANSFORM];if(n){let o=a.associations.get(s);s=a.extensions[Ve.KHR_TEXTURE_TRANSFORM].extendTexture(s,n),a.associations.set(s,o)}}return r!==void 0&&(s.colorSpace=r),e[t]=s,s})}assignFinalMaterial(e){let t=e.geometry,i=e.material,r=t.attributes.tangent===void 0,a=t.attributes.color!==void 0,s=t.attributes.normal===void 0;if(e.isPoints){let n="PointsMaterial:"+i.uuid,o=this.cache.get(n);o||(o=new _d,zi.prototype.copy.call(o,i),o.color.copy(i.color),o.map=i.map,o.sizeAttenuation=!1,this.cache.add(n,o)),i=o}else if(e.isLine){let n="LineBasicMaterial:"+i.uuid,o=this.cache.get(n);o||(o=new gd,zi.prototype.copy.call(o,i),o.color.copy(i.color),o.map=i.map,this.cache.add(n,o)),i=o}if(r||a||s){let n="ClonedMaterial:"+i.uuid+":";r&&(n+="derivative-tangents:"),a&&(n+="vertex-colors:"),s&&(n+="flat-shading:");let o=this.cache.get(n);o||(o=i.clone(),a&&(o.vertexColors=!0),s&&(o.flatShading=!0),r&&(o.normalScale&&(o.normalScale.y*=-1),o.clearcoatNormalScale&&(o.clearcoatNormalScale.y*=-1)),this.cache.add(n,o),this.associations.set(o,this.associations.get(i))),i=o}e.material=i}getMaterialType(){return Fa}loadMaterial(e){let t=this,i=this.json,r=this.extensions,a=i.materials[e],s,n={},o=a.extensions||{},u=[];if(o[Ve.KHR_MATERIALS_UNLIT]){let d=r[Ve.KHR_MATERIALS_UNLIT];s=d.getMaterialType(),u.push(d.extendParams(n,a,t))}else{let d=a.pbrMetallicRoughness||{};if(n.color=new ye(1,1,1),n.opacity=1,Array.isArray(d.baseColorFactor)){let l=d.baseColorFactor;n.color.setRGB(l[0],l[1],l[2],Ct),n.opacity=l[3]}d.baseColorTexture!==void 0&&u.push(t.assignTexture(n,"map",d.baseColorTexture,Ye)),n.metalness=d.metallicFactor===void 0?1:d.metallicFactor,n.roughness=d.roughnessFactor===void 0?1:d.roughnessFactor,d.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(n,"metalnessMap",d.metallicRoughnessTexture)),u.push(t.assignTexture(n,"roughnessMap",d.metallicRoughnessTexture))),s=this._invokeOne(function(l){return l.getMaterialType&&l.getMaterialType(e)}),u.push(Promise.all(this._invokeAll(function(l){return l.extendMaterialParams&&l.extendMaterialParams(e,n)})))}a.doubleSided===!0&&(n.side=2);let h=a.alphaMode||Wo.OPAQUE;if(h===Wo.BLEND?(n.transparent=!0,n.depthWrite=!1):(n.transparent=!1,h===Wo.MASK&&(n.alphaTest=a.alphaCutoff===void 0?.5:a.alphaCutoff)),a.normalTexture!==void 0&&s!==Si&&(u.push(t.assignTexture(n,"normalMap",a.normalTexture)),n.normalScale=new oe(1,1),a.normalTexture.scale!==void 0)){let d=a.normalTexture.scale;n.normalScale.set(d,d)}if(a.occlusionTexture!==void 0&&s!==Si&&(u.push(t.assignTexture(n,"aoMap",a.occlusionTexture)),a.occlusionTexture.strength!==void 0&&(n.aoMapIntensity=a.occlusionTexture.strength)),a.emissiveFactor!==void 0&&s!==Si){let d=a.emissiveFactor;n.emissive=new ye().setRGB(d[0],d[1],d[2],Ct)}return a.emissiveTexture!==void 0&&s!==Si&&u.push(t.assignTexture(n,"emissiveMap",a.emissiveTexture,Ye)),Promise.all(u).then(function(){let d=new s(n);return a.name&&(d.name=a.name),gr(d,a),t.associations.set(d,{materials:e}),a.extensions&&kr(r,d,a),d})}createUniqueName(e){let t=ht.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,r=this.primitiveCache;function a(n){return i[Ve.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(n,t).then(function(o){return ec(o,n,t)})}let s=[];for(let n=0,o=e.length;n<o;n++){let u=e[n],h=F0(u),d=r[h];if(d)s.push(d.promise);else{let l;l=u.extensions&&u.extensions[Ve.KHR_DRACO_MESH_COMPRESSION]?a(u):ec(new ni,u,t),r[h]={primitive:u,promise:l},s.push(l)}}return Promise.all(s)}loadMesh(e){let t=this,i=this.json,r=this.extensions,a=i.meshes[e],s=a.primitives,n=[];for(let o=0,u=s.length;o<u;o++){let h=s[o].material===void 0?D0(this.cache):this.getDependency("material",s[o].material);n.push(h)}return n.push(t.loadGeometries(s)),Promise.all(n).then(function(o){let u=o.slice(0,o.length-1),h=o[o.length-1],d=[];for(let c=0,p=h.length;c<p;c++){let f=h[c],m=s[c],g,A=u[c];if(m.mode===Ei.TRIANGLES||m.mode===Ei.TRIANGLE_STRIP||m.mode===Ei.TRIANGLE_FAN||m.mode===void 0)g=a.isSkinnedMesh===!0?new fd(f,A):new dt(f,A),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===Ei.TRIANGLE_STRIP?g.geometry=Kh(g.geometry,1):m.mode===Ei.TRIANGLE_FAN&&(g.geometry=Kh(g.geometry,2));else if(m.mode===Ei.LINES)g=new lg(f,A);else if(m.mode===Ei.LINE_STRIP)g=new Yl(f,A);else if(m.mode===Ei.LINE_LOOP)g=new ug(f,A);else if(m.mode===Ei.POINTS)g=new jl(f,A);else throw Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&N0(g,a),g.name=t.createUniqueName(a.name||"mesh_"+e),gr(g,a),m.extensions&&kr(r,g,m),t.assignFinalMaterial(g),d.push(g)}for(let c=0,p=d.length;c<p;c++)t.associations.set(d[c],{meshes:e,primitives:c});if(d.length===1)return a.extensions&&kr(r,d[0],a),d[0];let l=new Ci;a.extensions&&kr(r,l,a),t.associations.set(l,{meshes:e});for(let c=0,p=d.length;c<p;c++)l.add(d[c]);return l})}loadCamera(e){let t,i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new zt(bf.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new Qs(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),gr(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let r=0,a=t.joints.length;r<a;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices===void 0?i.push(null):i.push(this.getDependency("accessor",t.inverseBindMatrices)),Promise.all(i).then(function(r){let a=r.pop(),s=r,n=[],o=[];for(let u=0,h=s.length;u<h;u++){let d=s[u];if(d){n.push(d);let l=new ke;a!==null&&l.fromArray(a.array,u*16),o.push(l)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[u])}return new sg(n,o)})}loadAnimation(e){let t=this.json,i=this,r=t.animations[e],a=r.name?r.name:"animation_"+e,s=[],n=[],o=[],u=[],h=[];for(let d=0,l=r.channels.length;d<l;d++){let c=r.channels[d],p=r.samplers[c.sampler],f=c.target,m=f.node,g=r.parameters===void 0?p.input:r.parameters[p.input],A=r.parameters===void 0?p.output:r.parameters[p.output];f.node!==void 0&&(s.push(this.getDependency("node",m)),n.push(this.getDependency("accessor",g)),o.push(this.getDependency("accessor",A)),u.push(p),h.push(f))}return Promise.all([Promise.all(s),Promise.all(n),Promise.all(o),Promise.all(u),Promise.all(h)]).then(function(d){let l=d[0],c=d[1],p=d[2],f=d[3],m=d[4],g=[];for(let A=0,_=l.length;A<_;A++){let v=l[A],x=c[A],C=p[A],y=f[A],T=m[A];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();let b=i._createAnimationTracks(v,x,C,y,T);if(b)for(let E=0;E<b.length;E++)g.push(b[E])}return new Al(a,void 0,g)})}createNodeMesh(e){let t=this.json,i=this,r=t.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(a){let s=i._getNodeRef(i.meshCache,r.mesh,a);return r.weights!==void 0&&s.traverse(function(n){if(n.isMesh)for(let o=0,u=r.weights.length;o<u;o++)n.morphTargetInfluences[o]=r.weights[o]}),s})}loadNode(e){let t=this.json,i=this,r=t.nodes[e],a=i._loadNodeShallow(e),s=[],n=r.children||[];for(let u=0,h=n.length;u<h;u++)s.push(i.getDependency("node",n[u]));let o=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([a,Promise.all(s),o]).then(function(u){let h=u[0],d=u[1],l=u[2];l!==null&&h.traverse(function(c){c.isSkinnedMesh&&c.bind(l,O0)});for(let c=0,p=d.length;c<p;c++)h.add(d[c]);return h})}_loadNodeShallow(e){let t=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let a=t.nodes[e],s=a.name?r.createUniqueName(a.name):"",n=[],o=r._invokeOne(function(u){return u.createNodeMesh&&u.createNodeMesh(e)});return o&&n.push(o),a.camera!==void 0&&n.push(r.getDependency("camera",a.camera).then(function(u){return r._getNodeRef(r.cameraCache,a.camera,u)})),r._invokeAll(function(u){return u.createNodeAttachment&&u.createNodeAttachment(e)}).forEach(function(u){n.push(u)}),this.nodeCache[e]=Promise.all(n).then(function(u){let h;if(h=a.isBone===!0?new Ad:u.length>1?new Ci:u.length===1?u[0]:new wt,h!==u[0])for(let d=0,l=u.length;d<l;d++)h.add(u[d]);if(a.name&&(h.userData.name=a.name,h.name=s),gr(h,a),a.extensions&&kr(i,h,a),a.matrix!==void 0){let d=new ke;d.fromArray(a.matrix),h.applyMatrix4(d)}else a.translation!==void 0&&h.position.fromArray(a.translation),a.rotation!==void 0&&h.quaternion.fromArray(a.rotation),a.scale!==void 0&&h.scale.fromArray(a.scale);return r.associations.has(h)||r.associations.set(h,{}),r.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],r=this,a=new Ci;i.name&&(a.name=r.createUniqueName(i.name)),gr(a,i),i.extensions&&kr(t,a,i);let s=i.nodes||[],n=[];for(let o=0,u=s.length;o<u;o++)n.push(r.getDependency("node",s[o]));return Promise.all(n).then(function(o){for(let u=0,h=o.length;u<h;u++)a.add(o[u]);return r.associations=(u=>{let h=new Map;for(let[d,l]of r.associations)(d instanceof zi||d instanceof Dt)&&h.set(d,l);return u.traverse(d=>{let l=r.associations.get(d);l!=null&&h.set(d,l)}),h})(a),a})}_createAnimationTracks(e,t,i,r,a){let s=[],n=e.name?e.name:e.uuid,o=[];Ar[a.path]===Ar.weights?e.traverse(function(l){l.morphTargetInfluences&&o.push(l.name?l.name:l.uuid)}):o.push(n);let u;switch(Ar[a.path]){case Ar.weights:u=qa;break;case Ar.rotation:u=Yr;break;case Ar.position:case Ar.scale:u=Xa;break;default:i.itemSize===1?u=qa:u=Xa;break}let h=r.interpolation===void 0?za:L0[r.interpolation],d=this._getArrayFromAccessor(i);for(let l=0,c=o.length;l<c;l++){let p=new u(o[l]+"."+Ar[a.path],t.array,d,h);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),s.push(p)}return s}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=Rl(t.constructor),r=new Float32Array(t.length);for(let a=0,s=t.length;a<s;a++)r[a]=t[a]*i;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(t){return new(this instanceof Yr?P0:Mp)(this.times,this.values,this.getValueSize()/3,t)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function G0(e,t,i){let r=t.attributes,a=new Ui;if(r.POSITION!==void 0){let o=i.json.accessors[r.POSITION],u=o.min,h=o.max;if(u!==void 0&&h!==void 0){if(a.set(new P(u[0],u[1],u[2]),new P(h[0],h[1],h[2])),o.normalized){let d=Rl(Ga[o.componentType]);a.min.multiplyScalar(d),a.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=t.targets;if(s!==void 0){let o=new P,u=new P;for(let h=0,d=s.length;h<d;h++){let l=s[h];if(l.POSITION!==void 0){let c=i.json.accessors[l.POSITION],p=c.min,f=c.max;if(p!==void 0&&f!==void 0){if(u.setX(Math.max(Math.abs(p[0]),Math.abs(f[0]))),u.setY(Math.max(Math.abs(p[1]),Math.abs(f[1]))),u.setZ(Math.max(Math.abs(p[2]),Math.abs(f[2]))),c.normalized){let m=Rl(Ga[c.componentType]);u.multiplyScalar(m)}o.max(u)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}a.expandByVector(o)}e.boundingBox=a;let n=new qi;a.getCenter(n.center),n.radius=a.min.distanceTo(a.max)/2,e.boundingSphere=n}function ec(e,t,i){let r=t.attributes,a=[];function s(n,o){return i.getDependency("accessor",n).then(function(u){e.setAttribute(o,u)})}for(let n in r){let o=Bl[n]||n.toLowerCase();o in e.attributes||a.push(s(r[n],o))}if(t.indices!==void 0&&!e.index){let n=i.getDependency("accessor",t.indices).then(function(o){e.setIndex(o)});a.push(n)}return Ke.workingColorSpace!=="srgb-linear"&&"COLOR_0"in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),gr(e,t),G0(e,t,i),Promise.all(a).then(function(){return t.targets===void 0?e:U0(e,t.targets,i)})}var Xo=new WeakMap,H0=class extends wr{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,i,r){let a=new jr(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,s=>{this.parse(s,t,r)},i,r)}parse(e,t,i=()=>{}){this.decodeDracoFile(e,t,null,null,Ye).catch(i)}decodeDracoFile(e,t,i,r,a=Ct,s=()=>{}){let n={attributeIDs:i||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!i,vertexColorSpace:a};return this.decodeGeometry(e,n).then(t).catch(s)}decodeGeometry(e,t){let i=JSON.stringify(t);if(Xo.has(e)){let o=Xo.get(e);if(o.key===i)return o.promise;if(e.byteLength===0)throw Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r,a=this.workerNextTaskID++,s=e.byteLength,n=this._getWorker(a,s).then(o=>(r=o,new Promise((u,h)=>{r._callbacks[a]={resolve:u,reject:h},r.postMessage({type:"decode",id:a,taskConfig:t,buffer:e},[e])}))).then(o=>this._createGeometry(o.geometry));return n.catch(()=>!0).then(()=>{r&&a&&this._releaseTask(r,a)}),Xo.set(e,{key:i,promise:n}),n}_createGeometry(e){let t=new ni;e.index&&t.setIndex(new ot(e.index.array,1));for(let i=0;i<e.attributes.length;i++){let r=e.attributes[i],a=r.name,s=r.array,n=r.itemSize,o=new ot(s,n);a==="color"&&(this._assignVertexColorSpace(o,r.vertexColorSpace),o.normalized=!(s instanceof Float32Array)),t.setAttribute(a,o)}return t}_assignVertexColorSpace(e,t){if(t!=="srgb")return;let i=new ye;for(let r=0,a=e.count;r<a;r++)i.fromBufferAttribute(e,r).convertSRGBToLinear(),e.setXYZ(r,i.r,i.g,i.b)}_loadLibrary(e,t){let i=new jr(this.manager);return i.setPath(this.decoderPath),i.setResponseType(t),i.setWithCredentials(this.withCredentials),new Promise((r,a)=>{i.load(e,r,void 0,a)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(i=>{let r=i[0];e||(this.decoderConfig.wasmBinary=i[1]);let a=z0.toString(),s=["/* draco decoder */",r,"","/* worker */",a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([s]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(a){let s=a.data;switch(s.type){case"decode":r._callbacks[s.id].resolve(s);break;case"error":r._callbacks[s.id].reject(s);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+s.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,a){return r._taskLoad>a._taskLoad?-1:1});let i=this.workerPool[this.workerPool.length-1];return i._taskCosts[e]=t,i._taskLoad+=t,i})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function z0(){let e,t;onmessage=function(n){let o=n.data;switch(o.type){case"init":e=o.decoderConfig,t=new Promise(function(d){e.onModuleLoaded=function(l){d({draco:l})},DracoDecoderModule(e)});break;case"decode":let u=o.buffer,h=o.taskConfig;t.then(d=>{let l=d.draco,c=new l.Decoder;try{let p=i(l,c,new Int8Array(u),h),f=p.attributes.map(m=>m.array.buffer);p.index&&f.push(p.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:p},f)}catch(p){console.error(p),self.postMessage({type:"error",id:o.id,error:p.message})}finally{l.destroy(c)}});break}};function i(n,o,u,h){let d=h.attributeIDs,l=h.attributeTypes,c,p,f=o.GetEncodedGeometryType(u);if(f===n.TRIANGULAR_MESH)c=new n.Mesh,p=o.DecodeArrayToMesh(u,u.byteLength,c);else if(f===n.POINT_CLOUD)c=new n.PointCloud,p=o.DecodeArrayToPointCloud(u,u.byteLength,c);else throw Error("THREE.DRACOLoader: Unexpected geometry type.");if(!p.ok()||c.ptr===0)throw Error("THREE.DRACOLoader: Decoding failed: "+p.error_msg());let m={index:null,attributes:[]};for(let g in d){let A=self[l[g]],_,v;if(h.useUniqueIDs)v=d[g],_=o.GetAttributeByUniqueId(c,v);else{if(v=o.GetAttributeId(c,n[d[g]]),v===-1)continue;_=o.GetAttribute(c,v)}let x=a(n,o,c,g,A,_);g==="color"&&(x.vertexColorSpace=h.vertexColorSpace),m.attributes.push(x)}return f===n.TRIANGULAR_MESH&&(m.index=r(n,o,c)),n.destroy(c),m}function r(n,o,u){let h=u.num_faces()*3,d=h*4,l=n._malloc(d);o.GetTrianglesUInt32Array(u,d,l);let c=new Uint32Array(n.HEAPF32.buffer,l,h).slice();return n._free(l),{array:c,itemSize:1}}function a(n,o,u,h,d,l){let c=l.num_components(),p=u.num_points()*c,f=p*d.BYTES_PER_ELEMENT,m=s(n,d),g=n._malloc(f);o.GetAttributeDataArrayForAllPoints(u,l,m,f,g);let A=new d(n.HEAPF32.buffer,g,p).slice();return n._free(g),{name:h,array:A,itemSize:c}}function s(n,o){switch(o){case Float32Array:return n.DT_FLOAT32;case Int8Array:return n.DT_INT8;case Int16Array:return n.DT_INT16;case Int32Array:return n.DT_INT32;case Uint8Array:return n.DT_UINT8;case Uint16Array:return n.DT_UINT16;case Uint32Array:return n.DT_UINT32}}}var V0=class{constructor(e=4){this.pool=e,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0}_initWorker(e){if(!this.workers[e]){let t=this.workerCreator();t.addEventListener("message",this._onMessage.bind(this,e)),this.workers[e]=t}}_getIdleWorker(){for(let e=0;e<this.pool;e++)if(!(this.workerStatus&1<<e))return e;return-1}_onMessage(e,t){let i=this.workersResolve[e];if(i&&i(t),this.queue.length){let{resolve:r,msg:a,transfer:s}=this.queue.shift();this.workersResolve[e]=r,this.workers[e].postMessage(a,s)}else this.workerStatus^=1<<e}setWorkerCreator(e){this.workerCreator=e}setWorkerLimit(e){this.pool=e}postMessage(e,t){return new Promise(i=>{let r=this._getIdleWorker();r===-1?this.queue.push({resolve:i,msg:e,transfer:t}):(this._initWorker(r),this.workerStatus|=1<<r,this.workersResolve[r]=i,this.workers[r].postMessage(e,t))})}dispose(){this.workers.forEach(e=>e.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}},W0=class{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=0,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:0,descriptorBlockSize:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],this.keyValue={},this.globalData=null}},cs=class{constructor(e,t,i,r){this._dataView=new DataView(e.buffer,e.byteOffset+t,i),this._littleEndian=r,this._offset=0}_nextUint8(){let e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){let e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){let e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){let e=this._dataView.getUint32(this._offset,this._littleEndian)+4294967296*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,e}_nextInt32(){let e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_skip(e){return this._offset+=e,this}_scan(e,t=0){let i=this._offset,r=0;for(;this._dataView.getUint8(this._offset)!==t&&r<e;)r++,this._offset++;return r<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+i,r)}};new Uint8Array([0]);var Xt=[171,75,84,88,32,50,48,187,13,10,26,10];function tc(e){return typeof TextDecoder<"u"?new TextDecoder().decode(e):Buffer.from(e).toString("utf8")}function q0(e){let t=new Uint8Array(e.buffer,e.byteOffset,Xt.length);if(t[0]!==Xt[0]||t[1]!==Xt[1]||t[2]!==Xt[2]||t[3]!==Xt[3]||t[4]!==Xt[4]||t[5]!==Xt[5]||t[6]!==Xt[6]||t[7]!==Xt[7]||t[8]!==Xt[8]||t[9]!==Xt[9]||t[10]!==Xt[10]||t[11]!==Xt[11])throw Error("Missing KTX 2.0 identifier.");let i=new W0,r=17*Uint32Array.BYTES_PER_ELEMENT,a=new cs(e,Xt.length,r,!0);i.vkFormat=a._nextUint32(),i.typeSize=a._nextUint32(),i.pixelWidth=a._nextUint32(),i.pixelHeight=a._nextUint32(),i.pixelDepth=a._nextUint32(),i.layerCount=a._nextUint32(),i.faceCount=a._nextUint32();let s=a._nextUint32();i.supercompressionScheme=a._nextUint32();let n=a._nextUint32(),o=a._nextUint32(),u=a._nextUint32(),h=a._nextUint32(),d=a._nextUint64(),l=a._nextUint64(),c=new cs(e,Xt.length+r,3*s*8,!0);for(let X=0;X<s;X++)i.levels.push({levelData:new Uint8Array(e.buffer,e.byteOffset+c._nextUint64(),c._nextUint64()),uncompressedByteLength:c._nextUint64()});let p=new cs(e,n,o,!0),f={vendorId:p._skip(4)._nextUint16(),descriptorType:p._nextUint16(),versionNumber:p._nextUint16(),descriptorBlockSize:p._nextUint16(),colorModel:p._nextUint8(),colorPrimaries:p._nextUint8(),transferFunction:p._nextUint8(),flags:p._nextUint8(),texelBlockDimension:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],bytesPlane:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],samples:[]},m=(f.descriptorBlockSize/4-6)/4;for(let X=0;X<m;X++){let R={bitOffset:p._nextUint16(),bitLength:p._nextUint8(),channelType:p._nextUint8(),samplePosition:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&R.channelType?(R.sampleLower=p._nextInt32(),R.sampleUpper=p._nextInt32()):(R.sampleLower=p._nextUint32(),R.sampleUpper=p._nextUint32()),f.samples[X]=R}i.dataFormatDescriptor.length=0,i.dataFormatDescriptor.push(f);let g=new cs(e,u,h,!0);for(;g._offset<h;){let X=g._nextUint32(),R=g._scan(X),D=tc(R),N=g._scan(X-R.byteLength);i.keyValue[D]=D.match(/^ktx/i)?tc(N):N,g._offset%4&&g._skip(4-g._offset%4)}if(l<=0)return i;let A=new cs(e,d,l,!0),_=A._nextUint16(),v=A._nextUint16(),x=A._nextUint32(),C=A._nextUint32(),y=A._nextUint32(),T=A._nextUint32(),b=[];for(let X=0;X<s;X++)b.push({imageFlags:A._nextUint32(),rgbSliceByteOffset:A._nextUint32(),rgbSliceByteLength:A._nextUint32(),alphaSliceByteOffset:A._nextUint32(),alphaSliceByteLength:A._nextUint32()});let E=d+A._offset,I=E+x,B=I+C,G=B+y;return i.globalData={endpointCount:_,selectorCount:v,imageDescs:b,endpointsData:new Uint8Array(e.buffer,e.byteOffset+E,x),selectorsData:new Uint8Array(e.buffer,e.byteOffset+I,C),tablesData:new Uint8Array(e.buffer,e.byteOffset+B,y),extendedData:new Uint8Array(e.buffer,e.byteOffset+G,T)},i}var Yo,ar,Pl,jo={env:{emscripten_notify_memory_growth:function(e){Pl=new Uint8Array(ar.exports.memory.buffer)}}},X0=class{init(){return Yo||(Yo=typeof fetch<"u"?fetch("data:application/wasm;base64,"+ic).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,jo)).then(this._init):WebAssembly.instantiate(Buffer.from(ic,"base64"),jo).then(this._init),Yo)}_init(e){ar=e.instance,jo.env.emscripten_notify_memory_growth(0)}decode(e,t=0){if(!ar)throw Error("ZSTDDecoder: Await .init() before decoding.");let i=e.byteLength,r=ar.exports.malloc(i);Pl.set(e,r),t||(t=Number(ar.exports.ZSTD_findDecompressedSize(r,i)));let a=ar.exports.malloc(t),s=ar.exports.ZSTD_decompress(a,t,r,i),n=Pl.slice(a,a+s);return ar.exports.free(r),ar.exports.free(a),n}},ic="AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdBKGogACgCBBATQQAhBCAHQeAAaiEMIAdB5ABqIQoDQCAHQShqEARBAksgBCAXTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEJIAcoAkggBygCREEDdGopAgAiH0IgiKchCCAeQiCIISAgHUIgiKchAgJAIB9CEIinQf8BcSIDQQJPBEACQCAGRSADQRlJckUEQCAIIAdBKGogA0EgIAcoAixrIg0gDSADSxsiDRAFIAMgDWsiA3RqIQggB0EoahAEGiADRQ0BIAdBKGogAxAFIAhqIQgMAQsgB0EoaiADEAUgCGohCCAHQShqEAQaCyAHKQJUISEgByAINgJUIAcgITcDWAwBCwJAIANFBEAgAgRAIAcoAlQhCAwDCyAHKAJYIQgMAQsCQAJAIAdBKGpBARAFIAggAkVqaiIDQQNGBEAgBygCVEF/aiIDIANFaiEIDAELIANBAnQgB2ooAlQiCCAIRWohCCADQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAg2AlQLICCnIQMgCQRAIAdBKGogCRAFIANqIQMLIAkgC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgAmohAgsgB0EoahAEGiAHIAcoAmggAmoiCSADajYCaCAKIAwgCCAJSxsoAgAhDSAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogB0EoaiAfQhiIp0H/AXEQCCEOIAdB8ABqIARBBHRqIgsgCSANaiAIazYCDCALIAg2AgggCyADNgIEIAsgAjYCACAHIA4gH6dB//8DcWo2AkQgBEEBaiEEDAELCyAEIBdIDQEgEkFgaiEYIAdB4ABqIRogB0HkAGohGyABIQMDQCAHQShqEARBAksgBCAFTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEIIAcoAkggBygCREEDdGopAgAiH0IgiKchCSAeQiCIISAgHUIgiKchDAJAIB9CEIinQf8BcSICQQJPBEACQCAGRSACQRlJckUEQCAJIAdBKGogAkEgIAcoAixrIgogCiACSxsiChAFIAIgCmsiAnRqIQkgB0EoahAEGiACRQ0BIAdBKGogAhAFIAlqIQkMAQsgB0EoaiACEAUgCWohCSAHQShqEAQaCyAHKQJUISEgByAJNgJUIAcgITcDWAwBCwJAIAJFBEAgDARAIAcoAlQhCQwDCyAHKAJYIQkMAQsCQAJAIAdBKGpBARAFIAkgDEVqaiICQQNGBEAgBygCVEF/aiICIAJFaiEJDAELIAJBAnQgB2ooAlQiCSAJRWohCSACQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAk2AlQLICCnIRQgCARAIAdBKGogCBAFIBRqIRQLIAggC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgDGohDAsgB0EoahAEGiAHIAcoAmggDGoiGSAUajYCaCAbIBogCSAZSxsoAgAhHCAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogByAHQShqIB9CGIinQf8BcRAIIB+nQf//A3FqNgJEIAcgB0HwAGogBEEDcUEEdGoiDSkDCCIdNwPIASAHIA0pAwAiHjcDwAECQAJAAkAgBygCvAEiDiAepyICaiIWIBNLDQAgAyAHKALEASIKIAJqIgtqIBhLDQAgEiADayALQSBqTw0BCyAHIAcpA8gBNwMQIAcgBykDwAE3AwggAyASIAdBCGogB0G8AWogEyAPIBUgERAeIQsMAQsgAiADaiEIIAMgDhAHIAJBEU8EQCADQRBqIQIDQCACIA5BEGoiDhAHIAJBEGoiAiAISQ0ACwsgCCAdpyIOayECIAcgFjYCvAEgDiAIIA9rSwRAIA4gCCAVa0sEQEFsIQsMAgsgESACIA9rIgJqIhYgCmogEU0EQCAIIBYgChAPGgwCCyAIIBZBACACaxAPIQggByACIApqIgo2AsQBIAggAmshCCAPIQILIA5BEE8EQCAIIApqIQoDQCAIIAIQByACQRBqIQIgCEEQaiIIIApJDQALDAELAkAgDkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgDkECdCIKQcAeaigCAGoiAhAXIAIgCkHgHmooAgBrIQIgBygCxAEhCgwBCyAIIAIQDAsgCkEJSQ0AIAggCmohCiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAKSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAKSQ0ACwsgCxADBEAgCyEQDAQFIA0gDDYCACANIBkgHGogCWs2AgwgDSAJNgIIIA0gFDYCBCAEQQFqIQQgAyALaiEDDAILAAsLIAQgBUgNASAEIBdrIQtBACEEA0AgCyAFSARAIAcgB0HwAGogC0EDcUEEdGoiAikDCCIdNwPIASAHIAIpAwAiHjcDwAECQAJAAkAgBygCvAEiDCAepyICaiIKIBNLDQAgAyAHKALEASIJIAJqIhBqIBhLDQAgEiADayAQQSBqTw0BCyAHIAcpA8gBNwMgIAcgBykDwAE3AxggAyASIAdBGGogB0G8AWogEyAPIBUgERAeIRAMAQsgAiADaiEIIAMgDBAHIAJBEU8EQCADQRBqIQIDQCACIAxBEGoiDBAHIAJBEGoiAiAISQ0ACwsgCCAdpyIGayECIAcgCjYCvAEgBiAIIA9rSwRAIAYgCCAVa0sEQEFsIRAMAgsgESACIA9rIgJqIgwgCWogEU0EQCAIIAwgCRAPGgwCCyAIIAxBACACaxAPIQggByACIAlqIgk2AsQBIAggAmshCCAPIQILIAZBEE8EQCAIIAlqIQYDQCAIIAIQByACQRBqIQIgCEEQaiIIIAZJDQALDAELAkAgBkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgBkECdCIGQcAeaigCAGoiAhAXIAIgBkHgHmooAgBrIQIgBygCxAEhCQwBCyAIIAIQDAsgCUEJSQ0AIAggCWohBiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAGSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAGSQ0ACwsgEBADDQMgC0EBaiELIAMgEGohAwwBCwsDQCAEQQNHBEAgACAEQQJ0IgJqQazQAWogAiAHaigCVDYCACAEQQFqIQQMAQsLIAcoArwBIQgLQbp/IRAgEyAIayIAIBIgA2tLDQAgAwR/IAMgCCAAEAsgAGoFQQALIAFrIRALIAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY0AAQMyIFEAMiBg0AIANBHzYCfCADIANB/ABqIANB+ABqIAQgBCAFaiAGGyIEIAEgAmoiAiAEaxAVIgUQAw0AIAMoAnwiBkEfSw0AIAMoAngiB0EJTw0AIABBiCBqIAMgBkGAC0GADCAHEBggA0E0NgJ8IAMgA0H8AGogA0H4AGogBCAFaiIEIAIgBGsQFSIFEAMNACADKAJ8IgZBNEsNACADKAJ4IgdBCk8NACAAQZAwaiADIAZBgA1B4A4gBxAYIANBIzYCfCADIANB/ABqIANB+ABqIAQgBWoiBCACIARrEBUiBRADDQAgAygCfCIGQSNLDQAgAygCeCIHQQpPDQAgACADIAZBwBBB0BEgBxAYIAQgBWoiBEEMaiIFIAJLDQAgAiAFayEFQQAhAgNAIAJBA0cEQCAEKAAAIgZBf2ogBU8NAiAAIAJBAnRqQZzQAWogBjYCACACQQFqIQIgBEEEaiEEDAELCyAEIAFrIQgLIANBgAFqJAAgCAtGAQN/IABBCGohAyAAKAIEIQJBACEAA0AgACACdkUEQCABIAMgAEEDdGotAAJBFktqIQEgAEEBaiEADAELCyABQQggAmt0C4YDAQV/Qbh/IQcCQCADRQ0AIAItAAAiBEUEQCABQQA2AgBBAUG4fyADQQFGGw8LAn8gAkEBaiIFIARBGHRBGHUiBkF/Sg0AGiAGQX9GBEAgA0EDSA0CIAUvAABBgP4BaiEEIAJBA2oMAQsgA0ECSA0BIAItAAEgBEEIdHJBgIB+aiEEIAJBAmoLIQUgASAENgIAIAVBAWoiASACIANqIgNLDQBBbCEHIABBEGogACAFLQAAIgVBBnZBI0EJIAEgAyABa0HAEEHQEUHwEiAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBmCBqIABBCGogBUEEdkEDcUEfQQggASABIAZqIAgbIgEgAyABa0GAC0GADEGAFyAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBoDBqIABBBGogBUECdkEDcUE0QQkgASABIAZqIAgbIgEgAyABa0GADUHgDkGQGSAAKAKM4QEgACgCnOIBIAQQHyIAEAMNACAAIAFqIAJrIQcLIAcLrQMBCn8jAEGABGsiCCQAAn9BUiACQf8BSw0AGkFUIANBDEsNABogAkEBaiELIABBBGohCUGAgAQgA0F/anRBEHUhCkEAIQJBASEEQQEgA3QiB0F/aiIMIQUDQCACIAtGRQRAAkAgASACQQF0Ig1qLwEAIgZB//8DRgRAIAkgBUECdGogAjoAAiAFQX9qIQVBASEGDAELIARBACAKIAZBEHRBEHVKGyEECyAIIA1qIAY7AQAgAkEBaiECDAELCyAAIAQ7AQIgACADOwEAIAdBA3YgB0EBdmpBA2ohBkEAIQRBACECA0AgBCALRkUEQCABIARBAXRqLgEAIQpBACEAA0AgACAKTkUEQCAJIAJBAnRqIAQ6AAIDQCACIAZqIAxxIgIgBUsNAAsgAEEBaiEADAELCyAEQQFqIQQMAQsLQX8gAg0AGkEAIQIDfyACIAdGBH9BAAUgCCAJIAJBAnRqIgAtAAJBAXRqIgEgAS8BACIBQQFqOwEAIAAgAyABEBRrIgU6AAMgACABIAVB/wFxdCAHazsBACACQQFqIQIMAQsLCyEFIAhBgARqJAAgBQvjBgEIf0FsIQcCQCACQQNJDQACQAJAAkACQCABLQAAIgNBA3EiCUEBaw4DAwEAAgsgACgCiOEBDQBBYg8LIAJBBUkNAkEDIQYgASgAACEFAn8CQAJAIANBAnZBA3EiCEF+aiIEQQFNBEAgBEEBaw0BDAILIAVBDnZB/wdxIQQgBUEEdkH/B3EhAyAIRQwCCyAFQRJ2IQRBBCEGIAVBBHZB//8AcSEDQQAMAQsgBUEEdkH//w9xIgNBgIAISw0DIAEtAARBCnQgBUEWdnIhBEEFIQZBAAshBSAEIAZqIgogAksNAgJAIANBgQZJDQAgACgCnOIBRQ0AQQAhAgNAIAJBg4ABSw0BIAJBQGshAgwAAAsACwJ/IAlBA0YEQCABIAZqIQEgAEHw4gFqIQIgACgCDCEGIAUEQCACIAMgASAEIAYQXwwCCyACIAMgASAEIAYQXQwBCyAAQbjQAWohAiABIAZqIQEgAEHw4gFqIQYgAEGo0ABqIQggBQRAIAggBiADIAEgBCACEF4MAQsgCCAGIAMgASAEIAIQXAsQAw0CIAAgAzYCgOIBIABBATYCiOEBIAAgAEHw4gFqNgLw4QEgCUECRgRAIAAgAEGo0ABqNgIMCyAAIANqIgBBiOMBakIANwAAIABBgOMBakIANwAAIABB+OIBakIANwAAIABB8OIBakIANwAAIAoPCwJ/AkACQAJAIANBAnZBA3FBf2oiBEECSw0AIARBAWsOAgACAQtBASEEIANBA3YMAgtBAiEEIAEvAABBBHYMAQtBAyEEIAEQIUEEdgsiAyAEaiIFQSBqIAJLBEAgBSACSw0CIABB8OIBaiABIARqIAMQCyEBIAAgAzYCgOIBIAAgATYC8OEBIAEgA2oiAEIANwAYIABCADcAECAAQgA3AAggAEIANwAAIAUPCyAAIAM2AoDiASAAIAEgBGo2AvDhASAFDwsCfwJAAkACQCADQQJ2QQNxQX9qIgRBAksNACAEQQFrDgIAAgELQQEhByADQQN2DAILQQIhByABLwAAQQR2DAELIAJBBEkgARAhIgJBj4CAAUtyDQFBAyEHIAJBBHYLIQIgAEHw4gFqIAEgB2otAAAgAkEgahAQIQEgACACNgKA4gEgACABNgLw4QEgB0EBaiEHCyAHC0sAIABC+erQ0OfJoeThADcDICAAQgA3AxggAELP1tO+0ser2UI3AxAgAELW64Lu6v2J9eAANwMIIABCADcDACAAQShqQQBBKBAQGgviAgICfwV+IABBKGoiASAAKAJIaiECAn4gACkDACIDQiBaBEAgACkDECIEQgeJIAApAwgiBUIBiXwgACkDGCIGQgyJfCAAKQMgIgdCEol8IAUQGSAEEBkgBhAZIAcQGQwBCyAAKQMYQsXP2bLx5brqJ3wLIAN8IQMDQCABQQhqIgAgAk0EQEIAIAEpAAAQCSADhUIbiUKHla+vmLbem55/fkLj3MqV/M7y9YV/fCEDIAAhAQwBCwsCQCABQQRqIgAgAksEQCABIQAMAQsgASgAAK1Ch5Wvr5i23puef34gA4VCF4lCz9bTvtLHq9lCfkL5893xmfaZqxZ8IQMLA0AgACACSQRAIAAxAABCxc/ZsvHluuonfiADhUILiUKHla+vmLbem55/fiEDIABBAWohAAwBCwsgA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC+8CAgJ/BH4gACAAKQMAIAKtfDcDAAJAAkAgACgCSCIDIAJqIgRBH00EQCABRQ0BIAAgA2pBKGogASACECAgACgCSCACaiEEDAELIAEgAmohAgJ/IAMEQCAAQShqIgQgA2ogAUEgIANrECAgACAAKQMIIAQpAAAQCTcDCCAAIAApAxAgACkAMBAJNwMQIAAgACkDGCAAKQA4EAk3AxggACAAKQMgIABBQGspAAAQCTcDICAAKAJIIQMgAEEANgJIIAEgA2tBIGohAQsgAUEgaiACTQsEQCACQWBqIQMgACkDICEFIAApAxghBiAAKQMQIQcgACkDCCEIA0AgCCABKQAAEAkhCCAHIAEpAAgQCSEHIAYgASkAEBAJIQYgBSABKQAYEAkhBSABQSBqIgEgA00NAAsgACAFNwMgIAAgBjcDGCAAIAc3AxAgACAINwMICyABIAJPDQEgAEEoaiABIAIgAWsiBBAgCyAAIAQ2AkgLCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQEBogAwVBun8LCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQCxogAwVBun8LC6gCAQZ/IwBBEGsiByQAIABB2OABaikDAEKAgIAQViEIQbh/IQUCQCAEQf//B0sNACAAIAMgBBBCIgUQAyIGDQAgACgCnOIBIQkgACAHQQxqIAMgAyAFaiAGGyIKIARBACAFIAYbayIGEEAiAxADBEAgAyEFDAELIAcoAgwhBCABRQRAQbp/IQUgBEEASg0BCyAGIANrIQUgAyAKaiEDAkAgCQRAIABBADYCnOIBDAELAkACQAJAIARBBUgNACAAQdjgAWopAwBCgICACFgNAAwBCyAAQQA2ApziAQwBCyAAKAIIED8hBiAAQQA2ApziASAGQRRPDQELIAAgASACIAMgBSAEIAgQOSEFDAELIAAgASACIAMgBSAEIAgQOiEFCyAHQRBqJAAgBQtnACAAQdDgAWogASACIAAoAuzhARAuIgEQAwRAIAEPC0G4fyECAkAgAQ0AIABB7OABaigCACIBBEBBYCECIAAoApjiASABRw0BC0EAIQIgAEHw4AFqKAIARQ0AIABBkOEBahBDCyACCycBAX8QVyIERQRAQUAPCyAEIAAgASACIAMgBBBLEE8hACAEEFYgAAs/AQF/AkACQAJAIAAoAqDiAUEBaiIBQQJLDQAgAUEBaw4CAAECCyAAEDBBAA8LIABBADYCoOIBCyAAKAKU4gELvAMCB38BfiMAQRBrIgkkAEG4fyEGAkAgBCgCACIIQQVBCSAAKALs4QEiBRtJDQAgAygCACIHQQFBBSAFGyAFEC8iBRADBEAgBSEGDAELIAggBUEDakkNACAAIAcgBRBJIgYQAw0AIAEgAmohCiAAQZDhAWohCyAIIAVrIQIgBSAHaiEHIAEhBQNAIAcgAiAJECwiBhADDQEgAkF9aiICIAZJBEBBuH8hBgwCCyAJKAIAIghBAksEQEFsIQYMAgsgB0EDaiEHAn8CQAJAAkAgCEEBaw4CAgABCyAAIAUgCiAFayAHIAYQSAwCCyAFIAogBWsgByAGEEcMAQsgBSAKIAVrIActAAAgCSgCCBBGCyIIEAMEQCAIIQYMAgsgACgC8OABBEAgCyAFIAgQRQsgAiAGayECIAYgB2ohByAFIAhqIQUgCSgCBEUNAAsgACkD0OABIgxCf1IEQEFsIQYgDCAFIAFrrFINAQsgACgC8OABBEBBaiEGIAJBBEkNASALEEQhDCAHKAAAIAynRw0BIAdBBGohByACQXxqIQILIAMgBzYCACAEIAI2AgAgBSABayEGCyAJQRBqJAAgBgsuACAAECsCf0EAQQAQAw0AGiABRSACRXJFBEBBYiAAIAEgAhA9EAMNARoLQQALCzcAIAEEQCAAIAAoAsTgASABKAIEIAEoAghqRzYCnOIBCyAAECtBABADIAFFckUEQCAAIAEQWwsL0QIBB38jAEEQayIGJAAgBiAENgIIIAYgAzYCDCAFBEAgBSgCBCEKIAUoAgghCQsgASEIAkACQANAIAAoAuzhARAWIQsCQANAIAQgC0kNASADKAAAQXBxQdDUtMIBRgRAIAMgBBAiIgcQAw0EIAQgB2shBCADIAdqIQMMAQsLIAYgAzYCDCAGIAQ2AggCQCAFBEAgACAFEE5BACEHQQAQA0UNAQwFCyAAIAogCRBNIgcQAw0ECyAAIAgQUCAMQQFHQQAgACAIIAIgBkEMaiAGQQhqEEwiByIDa0EAIAMQAxtBCkdyRQRAQbh/IQcMBAsgBxADDQMgAiAHayECIAcgCGohCEEBIQwgBigCDCEDIAYoAgghBAwBCwsgBiADNgIMIAYgBDYCCEG4fyEHIAQNASAIIAFrIQcMAQsgBiADNgIMIAYgBDYCCAsgBkEQaiQAIAcLRgECfyABIAAoArjgASICRwRAIAAgAjYCxOABIAAgATYCuOABIAAoArzgASEDIAAgATYCvOABIAAgASADIAJrajYCwOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ",Ko=new WeakMap,Jo=0,Zo,ms=class gs extends wr{constructor(t){super(t),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new V0,this.workerSourceURL="",this.workerConfig=null,typeof MSC_TRANSCODER<"u"&&console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')}setTranscoderPath(t){return this.transcoderPath=t,this}setWorkerLimit(t){return this.workerPool.setWorkerLimit(t),this}detectSupport(t){return t.isWebGPURenderer===!0?this.workerConfig={astcSupported:t.hasFeature("texture-compression-astc"),etc1Supported:!1,etc2Supported:t.hasFeature("texture-compression-etc2"),dxtSupported:t.hasFeature("texture-compression-bc"),bptcSupported:!1,pvrtcSupported:!1}:(this.workerConfig={astcSupported:t.extensions.has("WEBGL_compressed_texture_astc"),etc1Supported:t.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:t.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:t.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:t.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:t.extensions.has("WEBGL_compressed_texture_pvrtc")||t.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},t.capabilities.isWebGL2&&(this.workerConfig.etc1Supported=!1)),this}init(){if(!this.transcoderPending){let t=new jr(this.manager);t.setPath(this.transcoderPath),t.setWithCredentials(this.withCredentials);let i=t.loadAsync("basis_transcoder.js"),r=new jr(this.manager);r.setPath(this.transcoderPath),r.setResponseType("arraybuffer"),r.setWithCredentials(this.withCredentials);let a=r.loadAsync("basis_transcoder.wasm");this.transcoderPending=Promise.all([i,a]).then(([s,n])=>{let o=gs.BasisWorker.toString(),u=["/* constants */","let _EngineFormat = "+JSON.stringify(gs.EngineFormat),"let _TranscoderFormat = "+JSON.stringify(gs.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(gs.BasisFormat),"/* basis_transcoder.js */",s,"/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([u])),this.transcoderBinary=n,this.workerPool.setWorkerCreator(()=>{let h=new Worker(this.workerSourceURL),d=this.transcoderBinary.slice(0);return h.postMessage({type:"init",config:this.workerConfig,transcoderBinary:d},[d]),h})}),Jo>0&&console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),Jo++}return this.transcoderPending}load(t,i,r,a){if(this.workerConfig===null)throw Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");let s=new jr(this.manager);s.setResponseType("arraybuffer"),s.setWithCredentials(this.withCredentials),s.load(t,n=>{if(Ko.has(n))return Ko.get(n).promise.then(i).catch(a);this._createTexture(n).then(o=>i?i(o):null).catch(a)},r,a)}_createTextureFrom(t,i){let{faces:r,width:a,height:s,format:n,type:o,error:u,dfdFlags:h}=t;if(o==="error")return Promise.reject(u);let d;if(i.faceCount===6)d=new cg(r,n,Gt);else{let l=r[0].mipmaps;d=i.layerCount>1?new hg(l,a,s,i.layerCount,n,Gt):new Kn(l,a,s,n,Gt)}return d.minFilter=r[0].mipmaps.length===1?qe:$a,d.magFilter=qe,d.generateMipmaps=!1,d.needsUpdate=!0,d.colorSpace=Ip(i),d.premultiplyAlpha=!!(h&1),d}async _createTexture(t,i={}){let r=q0(new Uint8Array(t));if(r.vkFormat!==0)return j0(r);let a=i,s=this.init().then(()=>this.workerPool.postMessage({type:"transcode",buffer:t,taskConfig:a},[t])).then(n=>this._createTextureFrom(n.data,r));return Ko.set(t,{promise:s}),s}dispose(){return this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),Jo--,this}};ms.BasisFormat={ETC1S:0,UASTC_4x4:1},ms.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16},ms.EngineFormat={RGBAFormat:mt,RGBA_ASTC_4x4_Format:of,RGBA_BPTC_Format:lf,RGBA_ETC2_EAC_Format:nf,RGBA_PVRTC_4BPPV1_Format:rf,RGBA_S3TC_DXT5_Format:ef,RGB_ETC1_Format:af,RGB_ETC2_Format:sf,RGB_PVRTC_4BPPV1_Format:tf,RGB_S3TC_DXT1_Format:$p},ms.BasisWorker=function(){let e,t,i,r=_EngineFormat,a=_TranscoderFormat,s=_BasisFormat;self.addEventListener("message",function(f){let m=f.data;switch(m.type){case"init":e=m.config,n(m.transcoderBinary);break;case"transcode":t.then(()=>{try{let{faces:g,buffers:A,width:_,height:v,hasAlpha:x,format:C,dfdFlags:y}=o(m.buffer);self.postMessage({type:"transcode",id:m.id,faces:g,width:_,height:v,hasAlpha:x,format:C,dfdFlags:y},A)}catch(g){console.error(g),self.postMessage({type:"error",id:m.id,error:g.message})}});break}});function n(f){t=new Promise(m=>{i={wasmBinary:f,onRuntimeInitialized:m},BASIS(i)}).then(()=>{i.initializeBasis(),i.KTX2File===void 0&&console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")})}function o(f){let m=new i.KTX2File(new Uint8Array(f));function g(){m.close(),m.delete()}if(!m.isValid())throw g(),Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");let A=m.isUASTC()?s.UASTC_4x4:s.ETC1S,_=m.getWidth(),v=m.getHeight(),x=m.getLayers()||1,C=m.getLevels(),y=m.getFaces(),T=m.getHasAlpha(),b=m.getDFDFlags(),{transcoderFormat:E,engineFormat:I}=l(A,_,v,T);if(!_||!v||!C)throw g(),Error("THREE.KTX2Loader:	Invalid texture");if(!m.startTranscoding())throw g(),Error("THREE.KTX2Loader: .startTranscoding failed");let B=[],G=[];for(let X=0;X<y;X++){let R=[];for(let D=0;D<C;D++){let N=[],z,Y;for(let J=0;J<x;J++){let K=m.getImageLevelInfo(D,J,X);X===0&&D===0&&J===0&&(K.origWidth%4!=0||K.origHeight%4!=0)&&console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."),C>1?(z=K.origWidth,Y=K.origHeight):(z=K.width,Y=K.height);let U=new Uint8Array(m.getImageTranscodedSizeInBytes(D,J,0,E));if(!m.transcodeImage(U,D,J,X,E,0,-1,-1))throw g(),Error("THREE.KTX2Loader: .transcodeImage failed.");N.push(U)}let W=p(N);R.push({data:W,width:z,height:Y}),G.push(W.buffer)}B.push({mipmaps:R,width:_,height:v,format:I})}return g(),{faces:B,buffers:G,width:_,height:v,hasAlpha:T,format:I,dfdFlags:b}}let u=[{if:"astcSupported",basisFormat:[s.UASTC_4x4],transcoderFormat:[a.ASTC_4x4,a.ASTC_4x4],engineFormat:[r.RGBA_ASTC_4x4_Format,r.RGBA_ASTC_4x4_Format],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.BC7_M5,a.BC7_M5],engineFormat:[r.RGBA_BPTC_Format,r.RGBA_BPTC_Format],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.BC1,a.BC3],engineFormat:[r.RGB_S3TC_DXT1_Format,r.RGBA_S3TC_DXT5_Format],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.ETC1,a.ETC2],engineFormat:[r.RGB_ETC2_Format,r.RGBA_ETC2_EAC_Format],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.ETC1],engineFormat:[r.RGB_ETC1_Format],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[s.ETC1S,s.UASTC_4x4],transcoderFormat:[a.PVRTC1_4_RGB,a.PVRTC1_4_RGBA],engineFormat:[r.RGB_PVRTC_4BPPV1_Format,r.RGBA_PVRTC_4BPPV1_Format],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0}],h=u.sort(function(f,m){return f.priorityETC1S-m.priorityETC1S}),d=u.sort(function(f,m){return f.priorityUASTC-m.priorityUASTC});function l(f,m,g,A){let _,v,x=f===s.ETC1S?h:d;for(let C=0;C<x.length;C++){let y=x[C];if(e[y.if]&&y.basisFormat.includes(f)&&!(A&&y.transcoderFormat.length<2)&&!(y.needsPowerOfTwo&&!(c(m)&&c(g))))return _=y.transcoderFormat[+!!A],v=y.engineFormat[+!!A],{transcoderFormat:_,engineFormat:v}}return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."),_=a.RGBA32,v=r.RGBAFormat,{transcoderFormat:_,engineFormat:v}}function c(f){return f<=2?!0:(f&f-1)==0&&f!==0}function p(f){if(f.length===1)return f[0];let m=0;for(let _=0;_<f.length;_++){let v=f[_];m+=v.byteLength}let g=new Uint8Array(m),A=0;for(let _=0;_<f.length;_++){let v=f[_];g.set(v,A),A+=v.byteLength}return g}};var Y0=new Set([mt,ps,Ta]),$o={109:mt,97:mt,37:mt,43:mt,103:ps,83:ps,16:ps,22:ps,100:Ta,76:Ta,15:Ta,9:Ta,166:Mu,165:Mu},el={109:Da,97:Ua,37:Gt,43:Gt,103:Da,83:Ua,16:Gt,22:Gt,100:Da,76:Ua,15:Gt,9:Gt,166:Gt,165:Gt};async function j0(e){let{vkFormat:t}=e;if($o[t]===void 0)throw Error("THREE.KTX2Loader: Unsupported vkFormat.");let i;e.supercompressionScheme===2&&(Zo||(Zo=new Promise(async s=>{let n=new X0;await n.init(),s(n)})),i=await Zo);let r=[];for(let s=0;s<e.levels.length;s++){let n=Math.max(1,e.pixelWidth>>s),o=Math.max(1,e.pixelHeight>>s),u=e.pixelDepth?Math.max(1,e.pixelDepth>>s):0,h=e.levels[s],d;if(e.supercompressionScheme===0)d=h.levelData;else if(e.supercompressionScheme===2)d=i.decode(h.levelData,h.uncompressedByteLength);else throw Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");let l;l=el[t]===1015?new Float32Array(d.buffer,d.byteOffset,d.byteLength/Float32Array.BYTES_PER_ELEMENT):el[t]===1016?new Uint16Array(d.buffer,d.byteOffset,d.byteLength/Uint16Array.BYTES_PER_ELEMENT):d,r.push({data:l,width:n,height:o,depth:u})}let a;if(Y0.has($o[t]))a=e.pixelDepth===0?new Kt(r[0].data,e.pixelWidth,e.pixelHeight):new Wc(r[0].data,e.pixelWidth,e.pixelHeight,e.pixelDepth);else{if(e.pixelDepth>0)throw Error("THREE.KTX2Loader: Unsupported pixelDepth.");a=new Kn(r,e.pixelWidth,e.pixelHeight)}return a.mipmaps=r,a.type=el[t],a.format=$o[t],a.colorSpace=Ip(e),a.needsUpdate=!0,Promise.resolve(a)}function Ip(e){let t=e.dataFormatDescriptor[0];return t.colorPrimaries===1?t.transferFunction===2?Ye:Ct:t.colorPrimaries===10?t.transferFunction===2?zl:Xn:(t.colorPrimaries===0||console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${t.colorPrimaries}"`),"")}var xa=256,K0=1,J0=class{constructor(e){this.renderer=e,this.gl=e.getContext(),this._pending=[],this._byTex=new Map}_glFilter(e){let t=this.gl;return e===1003?t.NEAREST:e===1004?t.NEAREST_MIPMAP_NEAREST:e===1005?t.NEAREST_MIPMAP_LINEAR:e===1007?t.LINEAR_MIPMAP_NEAREST:e===1008?t.LINEAR_MIPMAP_LINEAR:t.LINEAR}_glWrap(e){let t=this.gl;return e===1e3?t.REPEAT:e===1002?t.MIRRORED_REPEAT:t.CLAMP_TO_EDGE}startUpload(e,t){let i=this.gl,r=t.width,a=t.height,s=i.createTexture();i.bindTexture(i.TEXTURE_2D,s);let n=e.colorSpace==="srgb"?i.SRGB8_ALPHA8:i.RGBA8,o=e.generateMipmaps!==!1,u=o?Math.floor(Math.log2(Math.max(r,a)))+1:1;i.texStorage2D(i.TEXTURE_2D,u,n,r,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,this._glFilter(e.minFilter)),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,this._glFilter(e.magFilter)),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,this._glWrap(e.wrapS)),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,this._glWrap(e.wrapT));let h=this.renderer.properties.get(e);h.__webglTexture=s,h.__webglInit=!0,h.__version=e.source?e.source.version:e.version,e.image||(e.image={width:r,height:a,__chunkedPlaceholder:!0}),e.needsUpdate=!1;let d={tex:e,glTex:s,width:r,height:a,wantsMipmaps:o,bitmap:t,chunks:null,resolve:null},l=new Promise(c=>{d.resolve=c});return this._pending.push(d),this._byTex.set(e,d),this._beginSlice(d),l}async _beginSlice(e){let{width:t,height:i}=e,r=Math.ceil(t/xa),a=Math.ceil(i/xa),s=[],n=[];for(let u=0;u<a;u++)for(let h=0;h<r;h++){let d=h*xa,l=u*xa,c=Math.min(xa,t-d),p=Math.min(xa,i-l);s.push({x:d,y:l,w:c,h:p}),n.push(createImageBitmap(e.bitmap,d,l,c,p,{premultiplyAlpha:"none",colorSpaceConversion:"none"}))}let o;try{o=await Promise.all(n)}catch(u){console.warn("ChunkedTextureUploader: slicing failed",u);return}if(!this._byTex.has(e.tex)){for(let u of o)u&&u.close&&u.close();return}e.bitmap&&e.bitmap.close&&e.bitmap.close(),e.bitmap=null,e.chunks=s.map((u,h)=>({...u,bitmap:o[h]}))}tick(){if(this._pending.length===0)return;let e=this.gl,t=K0;for(;t>0&&this._pending.length>0;){let i=this._pending[0];if(i.chunks===null)break;if(i.chunks.length===0){this._finalizeEntry(i),this._pending.shift();continue}let r=i.chunks.shift();e.bindTexture(e.TEXTURE_2D,i.glTex),e.texSubImage2D(e.TEXTURE_2D,0,r.x,r.y,r.w,r.h,e.RGBA,e.UNSIGNED_BYTE,r.bitmap),r.bitmap.close&&r.bitmap.close(),t--}}_finalizeEntry(e){if(e.wantsMipmaps){let t=this.gl;t.bindTexture(t.TEXTURE_2D,e.glTex),t.generateMipmap(t.TEXTURE_2D)}this._byTex.delete(e.tex),e.resolve&&e.resolve()}flushTexture(e){let t=this._byTex.get(e);if(!t)return;let i=this.gl;if(i.bindTexture(i.TEXTURE_2D,t.glTex),t.chunks===null&&t.bitmap)i.texSubImage2D(i.TEXTURE_2D,0,0,0,t.width,t.height,i.RGBA,i.UNSIGNED_BYTE,t.bitmap),t.bitmap.close&&t.bitmap.close(),t.bitmap=null;else if(t.chunks)for(;t.chunks.length>0;){let a=t.chunks.shift();i.texSubImage2D(i.TEXTURE_2D,0,a.x,a.y,a.w,a.h,i.RGBA,i.UNSIGNED_BYTE,a.bitmap),a.bitmap.close&&a.bitmap.close()}let r=this._pending.indexOf(t);r>=0&&this._pending.splice(r,1),this._finalizeEntry(t)}flushAll(){for(;this._pending.length>0;)this.flushTexture(this._pending[0].tex)}};function Z0({color:e=[255,255,255],topLeft:t,topCenter:i,topRight:r,botLeft:a,botCenter:s,botRight:n,centerAlpha:o=null,centerSigma:u=.25,width:h=256,height:d=144}={}){let l=new Uint8Array(h*d*4),c=o!=null,p=c?1/(2*u*u):0;for(let m=0;m<d;m++){let g=m/(d-1),A=g-.5;for(let _=0;_<h;_++){let v=_/(h-1),x=2*v*v-3*v+1,C=-4*v*v+4*v,y=2*v*v-v,T=t*x+i*C+r*y,b=T+(a*x+s*C+n*y-T)*g;if(c){let I=v-.5,B=Math.exp(-(I*I+A*A)*p);b+=(o-b)*B}b<0?b=0:b>1&&(b=1);let E=(m*h+_)*4;l[E]=e[0],l[E+1]=e[1],l[E+2]=e[2],l[E+3]=Math.round(b*255)}}let f=new Kt(l,h,d,mt);return f.flipY=!0,f.colorSpace=Ye,f.minFilter=qe,f.magFilter=qe,f.generateMipmaps=!1,f.needsUpdate=!0,f}function $0({stops:e=[{offset:0,color:[0,0,0]},{offset:1,color:[255,255,255]}],center:t=[.5,.5],radiusX:i=.5,radiusY:r=.5,width:a=256,height:s=144}={}){let n=e.slice().sort((p,f)=>p.offset-f.offset),o=n[0].color,u=n[n.length-1].color,h=n[0].offset,d=n[n.length-1].offset,l=new Uint8Array(a*s*4);for(let p=0;p<s;p++){let f=(p/(s-1)-t[1])/r;for(let m=0;m<a;m++){let g=(m/(a-1)-t[0])/i,A=Math.sqrt(g*g+f*f),_,v,x;if(A<=h)_=o[0],v=o[1],x=o[2];else if(A>=d)_=u[0],v=u[1],x=u[2];else{let y=1;for(;y<n.length&&n[y].offset<A;)y++;let T=n[y-1],b=n[y],E=(A-T.offset)/(b.offset-T.offset);_=T.color[0]+(b.color[0]-T.color[0])*E,v=T.color[1]+(b.color[1]-T.color[1])*E,x=T.color[2]+(b.color[2]-T.color[2])*E}let C=(p*a+m)*4;l[C]=_,l[C+1]=v,l[C+2]=x,l[C+3]=255}}let c=new Kt(l,a,s,mt);return c.flipY=!0,c.colorSpace=Ye,c.minFilter=qe,c.magFilter=qe,c.generateMipmaps=!1,c.needsUpdate=!0,c}function ev({baseColor:e=[110,200,230],glowColor:t=[170,235,215],topCenter:i=[.5,0],bottomCenter:r=[.5,1],topRadius:a=[.85,.7],bottomRadius:s=[.85,.7],width:n=256,height:o=144}={}){let u=new Uint8Array(n*o*4),h=e[0],d=e[1],l=e[2],c=t[0]-h,p=t[1]-d,f=t[2]-l;for(let g=0;g<o;g++){let A=g/(o-1);for(let _=0;_<n;_++){let v=_/(n-1),x=(v-i[0])/a[0],C=(A-i[1])/a[1],y=Math.sqrt(x*x+C*C),T=y>=1?0:1-y,b=T*T*(3-2*T),E=(v-r[0])/s[0],I=(A-r[1])/s[1],B=Math.sqrt(E*E+I*I),G=B>=1?0:1-B,X=G*G*(3-2*G),R=Math.min(1,b+X),D=(g*n+_)*4;u[D]=h+c*R,u[D+1]=d+p*R,u[D+2]=l+f*R,u[D+3]=255}}let m=new Kt(u,n,o,mt);return m.flipY=!0,m.colorSpace=Ye,m.minFilter=qe,m.magFilter=qe,m.generateMipmaps=!1,m.needsUpdate=!0,m}function tv({color:e=[255,255,255],alpha:t=1}={}){let i=new Kt(new Uint8Array([e[0],e[1],e[2],Math.round(t*255)]),1,1,mt);return i.colorSpace=Ye,i.minFilter=qe,i.magFilter=qe,i.generateMipmaps=!1,i.needsUpdate=!0,i}var iv=class{constructor(e){this.renderer=e;let t=window.innerWidth<=768;this.assets={models:{},textures:{},animations:{},meta:{}},this.manager=new Md,this.dracoLoader=new H0(this.manager),this.dracoLoader.setDecoderPath("/assets/reference/vendor/draco/"),this.gltfLoader=new l0(this.manager),this.gltfLoader.setDRACOLoader(this.dracoLoader),this.ktx2Loader=new ms(this.manager),this.renderer&&(this.ktx2Loader.setTranscoderPath("/assets/reference/vendor/basis/"),this.ktx2Loader.detectSupport(this.renderer)),this.gltfLoader.setKTX2Loader(this.ktx2Loader),this.mandatoryAssets=[{type:"texture",key:"frosting",path:"assets/textures/frost.webp",mipmaps:!1},{type:"procedural",kind:"radialColor",key:"loaderGradient",params:{center:[.5,1.3],radiusX:1.267,radiusY:1.434,stops:[{offset:.15855,color:[212,246,235]},{offset:.26169,color:[179,222,209]},{offset:.36483,color:[145,199,183]},{offset:.46797,color:[112,175,156]},{offset:.57111,color:[78,151,130]},{offset:.78555,color:[53,111,94]},{offset:1,color:[28,72,57]}],width:384,height:216}},{type:"procedural",kind:"radialPull",key:"stage1Foreground1",params:{color:[150,191,174],topLeft:.03,topCenter:0,topRight:.03,botLeft:1,botCenter:.35,botRight:1,centerAlpha:0,centerSigma:.25}},{type:"procedural",kind:"dualRadial",key:"stage1Background1",stretched:!0,params:{baseColor:[110,200,230],glowColor:[170,235,215],topCenter:[.5,0],bottomCenter:[.5,1],topRadius:[.85,.7],bottomRadius:[.85,.7],width:256,height:144}}],this.stageAssets={initial:[{type:"model",key:"fancyHand1",path:"assets/models/fancy_hand_2.glb"},{type:"model",key:"humanHand1",path:"assets/models/human_hand_1.glb"},{type:"model",key:"cameraModel1",path:"assets/models/camera_1.glb"},{type:"texture",key:"handMatcap",path:"assets/textures/matcap-hand.webp",mipmaps:!1},{type:"ktx2",key:"humanHandsAtlas",path:"assets/atlases/human_hands.ktx2"},{type:"procedural",kind:"solid",key:"stage1Background2",stretched:!1,params:{color:[255,255,255],alpha:1}},{type:"ktx2",key:"spcAtlas",path:"assets/atlases/shards-petals-coins.ktx2"},{type:"ktx2",key:"textsAtlas",path:"assets/atlases/texts.ktx2"}],stage2:[{type:"model",key:"glassShatter",path:"assets/models/stage2_glass-shatter.glb"},{type:"model",key:"allShards",path:"assets/models/glass_shards.glb",animated:!1},{type:"model",key:"handsModel2",path:"assets/models/human_hand_2.glb"},{type:"model",key:"cameraModel2",path:"assets/models/camera_2.glb"},{type:"procedural",kind:"radialPull",key:"stage2Foreground",params:{color:[0,0,0],topLeft:.03,topCenter:0,topRight:.03,botLeft:1,botCenter:.35,botRight:1,centerAlpha:0,centerSigma:.25}},{type:"texture",key:"stage2Background2",path:"assets/textures/stage2_background2.webp",mipmaps:!1,wrap:!0}],stage3:[{type:"model",key:"tunnelModel",path:"assets/models/tunnel_new_new.glb",animated:!1},{type:"texture",key:"stage3Background1",path:"assets/textures/stage3_background1.webp",stretched:!1,mipmaps:!1},{type:"ktx2",key:"moneyShredsAtlas",path:"assets/atlases/leather-money-shreds.ktx2"},{type:"ktx2",key:"certAtlas",path:"assets/atlases/board-certificates.ktx2"},{type:"texture",key:"certMatcap",path:"assets/textures/matcap-certificate.webp"}],stage4:[{type:"ktx2",key:"cloudsAtlas",path:t?"assets/atlases/clouds-mobile.ktx2":"assets/atlases/clouds.ktx2"}],worldMap:[{type:"ktx2",key:"worldMap",path:"assets/atlases/world.ktx2"}]},this._stageLoadStatus={},this._stageLoadPromises={},this._uploadQueue=[],this._uploadIdleHandle=null,this.chunkedUploader=e?new J0(e):null}_scheduleIdleUpload(e){this.renderer&&(this._uploadQueue.push(e),this._uploadIdleHandle===null&&this._scheduleNextIdleSlot())}_scheduleNextIdleSlot(){let e=t=>{for(this._uploadIdleHandle=null;this._uploadQueue.length>0&&!((t&&t.timeRemaining?t.timeRemaining():16)<5&&this._uploadQueue.length>0);){let i=this._uploadQueue.shift();this.renderer&&this.renderer.initTexture(i)}this._uploadQueue.length>0&&this._scheduleNextIdleSlot()};typeof requestIdleCallback=="function"?this._uploadIdleHandle=requestIdleCallback(e,{timeout:2e3}):this._uploadIdleHandle=setTimeout(()=>e({timeRemaining:()=>16}),50)}flushUploads(){if(this._uploadIdleHandle!==null){if(typeof cancelIdleCallback=="function")try{cancelIdleCallback(this._uploadIdleHandle)}catch{}try{clearTimeout(this._uploadIdleHandle)}catch{}this._uploadIdleHandle=null}for(;this._uploadQueue.length>0;){let e=this._uploadQueue.shift();this.renderer&&this.renderer.initTexture(e)}this.chunkedUploader&&this.chunkedUploader.flushAll()}getAsset(e){return this.assets.models[e]||this.assets.textures[e]}getMeta(e){return this.assets.meta[e]||{}}loadMandatoryAssets(e){let t=0,i=this.mandatoryAssets.length;if(i===0)return Promise.resolve();let r=this.mandatoryAssets.map(a=>this.loadAsset(a).then(s=>(t++,e&&e(t/i),s)).catch(s=>{throw console.error(`Failed to load mandatory asset: ${a.key}`,s),s}));return Promise.all(r)}loadInitialAssets(e){let t=this.stageAssets.initial,i=this.mandatoryAssets.length+t.length,r=0;if(i===0)return Promise.resolve();let a=()=>{r++,e&&e(r/i)};return this._stageLoadStatus.initial="loading",this.loadMandatoryAssets(()=>a()).then(()=>this._loadWithConcurrency(t,6,a).then(()=>{this.flushUploads(),this._stageLoadStatus.initial="loaded",this._stageLoadPromises.initial=Promise.resolve()}))}loadEverythingExceptWorldMap(e){let t=["initial","stage2","stage3","stage4"],i=[...this.mandatoryAssets,...t.flatMap(s=>this.stageAssets[s]||[])],r=i.length;for(let s of t)this._stageLoadStatus[s]="loading";if(r===0)return Promise.resolve();let a=0;return this._loadWithConcurrency(i,6,()=>{a++,e&&e(a/r)}).then(()=>{this.flushUploads();for(let s of t)this._stageLoadStatus[s]="loaded",this._stageLoadPromises[s]=Promise.resolve()})}loadStageAssets(e){if(this._stageLoadPromises[e])return this._stageLoadPromises[e];let t=this.stageAssets[e];return!t||t.length===0?(this._stageLoadStatus[e]="loaded",this._stageLoadPromises[e]=Promise.resolve()):(this._stageLoadStatus[e]="loading",this._stageLoadPromises[e]=this._loadWithConcurrency(t,2).then(()=>{this._stageLoadStatus[e]="loaded"}),this._stageLoadPromises[e])}isStageReady(e){return this._stageLoadStatus[e]==="loaded"}waitForStage(e){return this.isStageReady(e)?Promise.resolve():this._stageLoadPromises[e]||this.loadStageAssets(e)}startBackgroundPrefetch(){this.loadStageAssets("stage2"),this.loadStageAssets("stage3"),this.loadStageAssets("stage4")}loadMissingMandatory(){let e=this.mandatoryAssets.filter(t=>t.type==="model"?!this.assets.models[t.key]:!this.assets.textures[t.key]);return e.length===0?Promise.resolve():this._loadWithConcurrency(e,2).then(()=>this.flushUploads())}loadMissingForStage(e){let t=this.stageAssets[e];if(!t||t.length===0)return this._stageLoadStatus[e]="loaded",Promise.resolve();let i=t.filter(a=>a.type==="model"?!this.assets.models[a.key]:!this.assets.textures[a.key]);if(i.length===0)return this._stageLoadStatus[e]="loaded",Promise.resolve();this._stageLoadStatus[e]="loading";let r=this._loadWithConcurrency(i,2).then(()=>{this.flushUploads(),this._stageLoadStatus[e]="loaded"});return this._stageLoadPromises[e]=r,r}_loadWithConcurrency(e,t,i){let r=0,a=()=>{if(r>=e.length)return Promise.resolve();let s=e[r++];return this.loadAsset(s).then(()=>{i&&i()}).catch(n=>{i&&i(),console.warn(`Failed to load deferred asset: ${s.key}`,n)}).then(()=>a())};return Promise.all(Array.from({length:Math.min(t,e.length)},()=>a()))}loadAsset(e){let t=e.key||e.path||e.type||"asset",i=[600,1800,4500],r=25e3,a=s=>{let n=typeof AbortController<"u"?new AbortController:null,o=null,u=new Promise((d,l)=>{o=setTimeout(()=>{n&&n.abort(),l(Error(`Timed out after ${r}ms: ${t}`))},r),this._loadAssetOnce(e,n?n.signal:null).then(d,l)}),h=()=>{o&&clearTimeout(o)};return u.then(d=>(h(),d),d=>{if(h(),s>=i.length)throw d;return console.warn(`[AssetLoader] "${t}" failed (try ${s+1}/${i.length+1}); retrying in ${i[s]}ms \u2014`,d&&d.message||d),new Promise(l=>setTimeout(l,i[s])).then(()=>a(s+1))})};return a(0)}_loadAssetOnce(e,t){return new Promise((i,r)=>{let a=s=>r(s);if(e.type==="model")this.gltfLoader.load(e.path,s=>{s.scene.traverse(n=>{n.isMesh&&(n.frustumCulled=!0)}),e.animated!==!1&&(s.animations&&s.animations.length>0?this.assets.animations[e.key]=s.animations:console.warn(`AssetLoader: No animations found for ${e.key}`)),this.assets.models[e.key]=s.scene,i(s.scene)},void 0,a);else if(e.type==="texture")fetch(e.path,t?{signal:t}:void 0).then(s=>{if(!s.ok)throw Error(`HTTP ${s.status} loading ${e.path}`);return s.blob()}).then(s=>createImageBitmap(s,{imageOrientation:e.flipY===!1?"from-image":"flipY",premultiplyAlpha:"none",colorSpaceConversion:"none"})).then(s=>{let n=new Dt(s);n.flipY=!1,n.needsUpdate=!0,n.colorSpace=e.colorSpace==="linear"?Ct:Ye,e.wrap&&(n.wrapS=yi,n.wrapT=yi),e.mipmaps===!1&&(n.generateMipmaps=!1,n.minFilter=qe),e.textAtlas&&(n.generateMipmaps=!0,n.minFilter=$a,n.magFilter=qe,this.renderer&&(n.anisotropy=this.renderer.capabilities.getMaxAnisotropy())),this.assets.textures[e.key]=n,this.assets.meta[e.key]={stretched:e.stretched!==!1},e.chunked&&this.chunkedUploader?this.chunkedUploader.startUpload(n,s):this._scheduleIdleUpload(n),i(n)}).catch(a);else if(e.type==="draco")this.dracoLoader.load(e.path,s=>{this.assets.models[e.key]=s,i(s)},void 0,a);else if(e.type==="procedural"){let s;if(e.kind==="radialPull")s=Z0(e.params||{});else if(e.kind==="radialColor")s=$0(e.params||{});else if(e.kind==="dualRadial")s=ev(e.params||{});else if(e.kind==="solid")s=tv(e.params||{});else{r(Error(`AssetLoader: unknown procedural kind "${e.kind}"`));return}this.assets.textures[e.key]=s,this.assets.meta[e.key]={stretched:e.stretched!==!1},this._scheduleIdleUpload(s),i(s)}else e.type==="ktx2"?this.ktx2Loader.load(e.path,s=>{s.colorSpace=Ye,e.wrap&&(s.wrapS=yi,s.wrapT=yi),e.key==="worldMap"&&(s.generateMipmaps=!1,s.minFilter=qe),this.assets.textures[e.key]=s,this._scheduleIdleUpload(s),i(s)},void 0,a):i(null)})}disposeTextures(e){}dispose(){this.dracoLoader&&this.dracoLoader.dispose(),this.ktx2Loader&&this.ktx2Loader.dispose(),this.manager=null,this.assets=null}},Ze=Kp((e=>{(function(){var t=function(){this.init()};t.prototype={init:function(){var l=this||i;return l._counter=1e3,l._html5AudioPool=[],l.html5PoolSize=10,l._codecs={},l._howls=[],l._muted=!1,l._volume=1,l._canPlayEvent="canplaythrough",l._navigator=typeof window<"u"&&window.navigator?window.navigator:null,l.masterGain=null,l.noAudio=!1,l.usingWebAudio=!0,l.autoSuspend=!0,l.ctx=null,l.autoUnlock=!0,l._setup(),l},volume:function(l){var c=this||i;if(l=parseFloat(l),c.ctx||d(),l!==void 0&&l>=0&&l<=1){if(c._volume=l,c._muted)return c;c.usingWebAudio&&c.masterGain.gain.setValueAtTime(l,i.ctx.currentTime);for(var p=0;p<c._howls.length;p++)if(!c._howls[p]._webAudio)for(var f=c._howls[p]._getSoundIds(),m=0;m<f.length;m++){var g=c._howls[p]._soundById(f[m]);g&&g._node&&(g._node.volume=g._volume*l)}return c}return c._volume},mute:function(l){var c=this||i;c.ctx||d(),c._muted=l,c.usingWebAudio&&c.masterGain.gain.setValueAtTime(l?0:c._volume,i.ctx.currentTime);for(var p=0;p<c._howls.length;p++)if(!c._howls[p]._webAudio)for(var f=c._howls[p]._getSoundIds(),m=0;m<f.length;m++){var g=c._howls[p]._soundById(f[m]);g&&g._node&&(g._node.muted=l?!0:g._muted)}return c},stop:function(){for(var l=this||i,c=0;c<l._howls.length;c++)l._howls[c].stop();return l},unload:function(){for(var l=this||i,c=l._howls.length-1;c>=0;c--)l._howls[c].unload();return l.usingWebAudio&&l.ctx&&l.ctx.close!==void 0&&(l.ctx.close(),l.ctx=null,d()),l},codecs:function(l){return(this||i)._codecs[l.replace(/^x-/,"")]},_setup:function(){var l=this||i;if(l.state=l.ctx&&l.ctx.state||"suspended",l._autoSuspend(),!l.usingWebAudio)if(typeof Audio<"u")try{var c=new Audio;c.oncanplaythrough===void 0&&(l._canPlayEvent="canplay")}catch{l.noAudio=!0}else l.noAudio=!0;try{var c=new Audio;c.muted&&(l.noAudio=!0)}catch{}return l.noAudio||l._setupCodecs(),l},_setupCodecs:function(){var l=this||i,c=null;try{c=typeof Audio<"u"?new Audio:null}catch{return l}if(!c||typeof c.canPlayType!="function")return l;var p=c.canPlayType("audio/mpeg;").replace(/^no$/,""),f=l._navigator?l._navigator.userAgent:"",m=f.match(/OPR\/(\d+)/g),g=m&&parseInt(m[0].split("/")[1],10)<33,A=f.indexOf("Safari")!==-1&&f.indexOf("Chrome")===-1,_=f.match(/Version\/(.*?) /),v=A&&_&&parseInt(_[1],10)<15;return l._codecs={mp3:!!(!g&&(p||c.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!p,opus:!!c.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(c.canPlayType('audio/wav; codecs="1"')||c.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!c.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!c.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(c.canPlayType("audio/x-m4a;")||c.canPlayType("audio/m4a;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(c.canPlayType("audio/x-m4b;")||c.canPlayType("audio/m4b;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(c.canPlayType("audio/x-mp4;")||c.canPlayType("audio/mp4;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!v&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!v&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!c.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(c.canPlayType("audio/x-flac;")||c.canPlayType("audio/flac;")).replace(/^no$/,"")},l},_unlockAudio:function(){var l=this||i;if(!(l._audioUnlocked||!l.ctx)){l._audioUnlocked=!1,l.autoUnlock=!1,!l._mobileUnloaded&&l.ctx.sampleRate!==44100&&(l._mobileUnloaded=!0,l.unload()),l._scratchBuffer=l.ctx.createBuffer(1,1,22050);var c=function(p){for(;l._html5AudioPool.length<l.html5PoolSize;)try{var f=new Audio;f._unlocked=!0,l._releaseHtml5Audio(f)}catch{l.noAudio=!0;break}for(var m=0;m<l._howls.length;m++)if(!l._howls[m]._webAudio)for(var g=l._howls[m]._getSoundIds(),A=0;A<g.length;A++){var _=l._howls[m]._soundById(g[A]);_&&_._node&&!_._node._unlocked&&(_._node._unlocked=!0,_._node.load())}l._autoResume();var v=l.ctx.createBufferSource();v.buffer=l._scratchBuffer,v.connect(l.ctx.destination),v.start===void 0?v.noteOn(0):v.start(0),typeof l.ctx.resume=="function"&&l.ctx.resume(),v.onended=function(){v.disconnect(0),l._audioUnlocked=!0,document.removeEventListener("touchstart",c,!0),document.removeEventListener("touchend",c,!0),document.removeEventListener("click",c,!0),document.removeEventListener("keydown",c,!0);for(var x=0;x<l._howls.length;x++)l._howls[x]._emit("unlock")}};return document.addEventListener("touchstart",c,!0),document.addEventListener("touchend",c,!0),document.addEventListener("click",c,!0),document.addEventListener("keydown",c,!0),l}},_obtainHtml5Audio:function(){var l=this||i;if(l._html5AudioPool.length)return l._html5AudioPool.pop();var c=new Audio().play();return c&&typeof Promise<"u"&&(c instanceof Promise||typeof c.then=="function")&&c.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(l){var c=this||i;return l._unlocked&&c._html5AudioPool.push(l),c},_autoSuspend:function(){var l=this;if(!(!l.autoSuspend||!l.ctx||l.ctx.suspend===void 0||!i.usingWebAudio)){for(var c=0;c<l._howls.length;c++)if(l._howls[c]._webAudio){for(var p=0;p<l._howls[c]._sounds.length;p++)if(!l._howls[c]._sounds[p]._paused)return l}return l._suspendTimer&&clearTimeout(l._suspendTimer),l._suspendTimer=setTimeout(function(){if(l.autoSuspend){l._suspendTimer=null,l.state="suspending";var f=function(){l.state="suspended",l._resumeAfterSuspend&&(delete l._resumeAfterSuspend,l._autoResume())};l.ctx.suspend().then(f,f)}},3e4),l}},_autoResume:function(){var l=this;if(!(!l.ctx||l.ctx.resume===void 0||!i.usingWebAudio))return l.state==="running"&&l.ctx.state!=="interrupted"&&l._suspendTimer?(clearTimeout(l._suspendTimer),l._suspendTimer=null):l.state==="suspended"||l.state==="running"&&l.ctx.state==="interrupted"?(l.ctx.resume().then(function(){l.state="running";for(var c=0;c<l._howls.length;c++)l._howls[c]._emit("resume")}),l._suspendTimer&&(l._suspendTimer=(clearTimeout(l._suspendTimer),null))):l.state==="suspending"&&(l._resumeAfterSuspend=!0),l}};var i=new t,r=function(l){var c=this;if(!l.src||l.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}c.init(l)};r.prototype={init:function(l){var c=this;return i.ctx||d(),c._autoplay=l.autoplay||!1,c._format=typeof l.format=="string"?[l.format]:l.format,c._html5=l.html5||!1,c._muted=l.mute||!1,c._loop=l.loop||!1,c._pool=l.pool||5,c._preload=typeof l.preload=="boolean"||l.preload==="metadata"?l.preload:!0,c._rate=l.rate||1,c._sprite=l.sprite||{},c._src=typeof l.src=="string"?[l.src]:l.src,c._volume=l.volume===void 0?1:l.volume,c._xhr={method:l.xhr&&l.xhr.method?l.xhr.method:"GET",headers:l.xhr&&l.xhr.headers?l.xhr.headers:null,withCredentials:l.xhr&&l.xhr.withCredentials?l.xhr.withCredentials:!1},c._duration=0,c._state="unloaded",c._sounds=[],c._endTimers={},c._queue=[],c._playLock=!1,c._onend=l.onend?[{fn:l.onend}]:[],c._onfade=l.onfade?[{fn:l.onfade}]:[],c._onload=l.onload?[{fn:l.onload}]:[],c._onloaderror=l.onloaderror?[{fn:l.onloaderror}]:[],c._onplayerror=l.onplayerror?[{fn:l.onplayerror}]:[],c._onpause=l.onpause?[{fn:l.onpause}]:[],c._onplay=l.onplay?[{fn:l.onplay}]:[],c._onstop=l.onstop?[{fn:l.onstop}]:[],c._onmute=l.onmute?[{fn:l.onmute}]:[],c._onvolume=l.onvolume?[{fn:l.onvolume}]:[],c._onrate=l.onrate?[{fn:l.onrate}]:[],c._onseek=l.onseek?[{fn:l.onseek}]:[],c._onunlock=l.onunlock?[{fn:l.onunlock}]:[],c._onresume=[],c._webAudio=i.usingWebAudio&&!c._html5,i.ctx!==void 0&&i.ctx&&i.autoUnlock&&i._unlockAudio(),i._howls.push(c),c._autoplay&&c._queue.push({event:"play",action:function(){c.play()}}),c._preload&&c._preload!=="none"&&c.load(),c},load:function(){var l=this,c=null;if(i.noAudio){l._emit("loaderror",null,"No audio support.");return}typeof l._src=="string"&&(l._src=[l._src]);for(var p=0;p<l._src.length;p++){var f,m;if(l._format&&l._format[p])f=l._format[p];else{if(m=l._src[p],typeof m!="string"){l._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}f=/^data:audio\/([^;,]+);/i.exec(m),f||(f=/\.([^.]+)$/.exec(m.split("?",1)[0])),f&&(f=f[1].toLowerCase())}if(f||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),f&&i.codecs(f)){c=l._src[p];break}}if(!c){l._emit("loaderror",null,"No codec support for selected audio sources.");return}return l._src=c,l._state="loading",window.location.protocol==="https:"&&c.slice(0,5)==="http:"&&(l._html5=!0,l._webAudio=!1),new a(l),l._webAudio&&n(l),l},play:function(l,c){var p=this,f=null;if(typeof l=="number")f=l,l=null;else{if(typeof l=="string"&&p._state==="loaded"&&!p._sprite[l])return null;if(l===void 0&&(l="__default",!p._playLock)){for(var m=0,g=0;g<p._sounds.length;g++)p._sounds[g]._paused&&!p._sounds[g]._ended&&(m++,f=p._sounds[g]._id);m===1?l=null:f=null}}var A=f?p._soundById(f):p._inactiveSound();if(!A)return null;if(f&&!l&&(l=A._sprite||"__default"),p._state!=="loaded"){A._sprite=l,A._ended=!1;var _=A._id;return p._queue.push({event:"play",action:function(){p.play(_)}}),_}if(f&&!A._paused)return c||p._loadQueue("play"),A._id;p._webAudio&&i._autoResume();var v=Math.max(0,A._seek>0?A._seek:p._sprite[l][0]/1e3),x=Math.max(0,(p._sprite[l][0]+p._sprite[l][1])/1e3-v),C=x*1e3/Math.abs(A._rate),y=p._sprite[l][0]/1e3,T=(p._sprite[l][0]+p._sprite[l][1])/1e3;A._sprite=l,A._ended=!1;var b=function(){A._paused=!1,A._seek=v,A._start=y,A._stop=T,A._loop=!!(A._loop||p._sprite[l][2])};if(v>=T){p._ended(A);return}var E=A._node;if(p._webAudio){var I=function(){p._playLock=!1,b(),p._refreshBuffer(A);var R=A._muted||p._muted?0:A._volume;E.gain.setValueAtTime(R,i.ctx.currentTime),A._playStart=i.ctx.currentTime,E.bufferSource.start===void 0?A._loop?E.bufferSource.noteGrainOn(0,v,86400):E.bufferSource.noteGrainOn(0,v,x):A._loop?E.bufferSource.start(0,v,86400):E.bufferSource.start(0,v,x),C!==1/0&&(p._endTimers[A._id]=setTimeout(p._ended.bind(p,A),C)),c||setTimeout(function(){p._emit("play",A._id),p._loadQueue()},0)};i.state==="running"&&i.ctx.state!=="interrupted"?I():(p._playLock=!0,p.once("resume",I),p._clearTimer(A._id))}else{var B=function(){E.currentTime=v,E.muted=A._muted||p._muted||i._muted||E.muted,E.volume=A._volume*i.volume(),E.playbackRate=A._rate;try{var R=E.play();if(R&&typeof Promise<"u"&&(R instanceof Promise||typeof R.then=="function")?(p._playLock=!0,b(),R.then(function(){p._playLock=!1,E._unlocked=!0,c?p._loadQueue():p._emit("play",A._id)}).catch(function(){p._playLock=!1,p._emit("playerror",A._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),A._ended=!0,A._paused=!0})):c||(p._playLock=!1,b(),p._emit("play",A._id)),E.playbackRate=A._rate,E.paused){p._emit("playerror",A._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}l!=="__default"||A._loop?p._endTimers[A._id]=setTimeout(p._ended.bind(p,A),C):(p._endTimers[A._id]=function(){p._ended(A),E.removeEventListener("ended",p._endTimers[A._id],!1)},E.addEventListener("ended",p._endTimers[A._id],!1))}catch(D){p._emit("playerror",A._id,D)}};E.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(E.src=p._src,E.load());var G=window&&window.ejecta||!E.readyState&&i._navigator.isCocoonJS;if(E.readyState>=3||G)B();else{p._playLock=!0,p._state="loading";var X=function(){p._state="loaded",B(),E.removeEventListener(i._canPlayEvent,X,!1)};E.addEventListener(i._canPlayEvent,X,!1),p._clearTimer(A._id)}}return A._id},pause:function(l){var c=this;if(c._state!=="loaded"||c._playLock)return c._queue.push({event:"pause",action:function(){c.pause(l)}}),c;for(var p=c._getSoundIds(l),f=0;f<p.length;f++){c._clearTimer(p[f]);var m=c._soundById(p[f]);if(m&&!m._paused&&(m._seek=c.seek(p[f]),m._rateSeek=0,m._paused=!0,c._stopFade(p[f]),m._node))if(c._webAudio){if(!m._node.bufferSource)continue;m._node.bufferSource.stop===void 0?m._node.bufferSource.noteOff(0):m._node.bufferSource.stop(0),c._cleanBuffer(m._node)}else(!isNaN(m._node.duration)||m._node.duration===1/0)&&m._node.pause();arguments[1]||c._emit("pause",m?m._id:null)}return c},stop:function(l,c){var p=this;if(p._state!=="loaded"||p._playLock)return p._queue.push({event:"stop",action:function(){p.stop(l)}}),p;for(var f=p._getSoundIds(l),m=0;m<f.length;m++){p._clearTimer(f[m]);var g=p._soundById(f[m]);g&&(g._seek=g._start||0,g._rateSeek=0,g._paused=!0,g._ended=!0,p._stopFade(f[m]),g._node&&(p._webAudio?g._node.bufferSource&&(g._node.bufferSource.stop===void 0?g._node.bufferSource.noteOff(0):g._node.bufferSource.stop(0),p._cleanBuffer(g._node)):(!isNaN(g._node.duration)||g._node.duration===1/0)&&(g._node.currentTime=g._start||0,g._node.pause(),g._node.duration===1/0&&p._clearSound(g._node))),c||p._emit("stop",g._id))}return p},mute:function(l,c){var p=this;if(p._state!=="loaded"||p._playLock)return p._queue.push({event:"mute",action:function(){p.mute(l,c)}}),p;if(c===void 0)if(typeof l=="boolean")p._muted=l;else return p._muted;for(var f=p._getSoundIds(c),m=0;m<f.length;m++){var g=p._soundById(f[m]);g&&(g._muted=l,g._interval&&p._stopFade(g._id),p._webAudio&&g._node?g._node.gain.setValueAtTime(l?0:g._volume,i.ctx.currentTime):g._node&&(g._node.muted=i._muted?!0:l),p._emit("mute",g._id))}return p},volume:function(){var l=this,c=arguments,p,f;if(c.length===0)return l._volume;c.length===1||c.length===2&&c[1]===void 0?l._getSoundIds().indexOf(c[0])>=0?f=parseInt(c[0],10):p=parseFloat(c[0]):c.length>=2&&(p=parseFloat(c[0]),f=parseInt(c[1],10));var m;if(p!==void 0&&p>=0&&p<=1){if(l._state!=="loaded"||l._playLock)return l._queue.push({event:"volume",action:function(){l.volume.apply(l,c)}}),l;f===void 0&&(l._volume=p),f=l._getSoundIds(f);for(var g=0;g<f.length;g++)m=l._soundById(f[g]),m&&(m._volume=p,c[2]||l._stopFade(f[g]),l._webAudio&&m._node&&!m._muted?m._node.gain.setValueAtTime(p,i.ctx.currentTime):m._node&&!m._muted&&(m._node.volume=p*i.volume()),l._emit("volume",m._id))}else return m=f?l._soundById(f):l._sounds[0],m?m._volume:0;return l},fade:function(l,c,p,f){var m=this;if(m._state!=="loaded"||m._playLock)return m._queue.push({event:"fade",action:function(){m.fade(l,c,p,f)}}),m;l=Math.min(Math.max(0,parseFloat(l)),1),c=Math.min(Math.max(0,parseFloat(c)),1),p=parseFloat(p),m.volume(l,f);for(var g=m._getSoundIds(f),A=0;A<g.length;A++){var _=m._soundById(g[A]);if(_){if(f||m._stopFade(g[A]),m._webAudio&&!_._muted){var v=i.ctx.currentTime,x=v+p/1e3;_._volume=l,_._node.gain.setValueAtTime(l,v),_._node.gain.linearRampToValueAtTime(c,x)}m._startFadeInterval(_,l,c,p,g[A],f===void 0)}}return m},_startFadeInterval:function(l,c,p,f,m,g){var A=this,_=c,v=p-c,x=Math.abs(v/.01),C=Math.max(4,x>0?f/x:f),y=Date.now();l._fadeTo=p,l._interval=setInterval(function(){var T=(Date.now()-y)/f;y=Date.now(),_+=v*T,_=Math.round(_*100)/100,_=v<0?Math.max(p,_):Math.min(p,_),A._webAudio?l._volume=_:A.volume(_,l._id,!0),g&&(A._volume=_),(p<c&&_<=p||p>c&&_>=p)&&(clearInterval(l._interval),l._interval=null,l._fadeTo=null,A.volume(p,l._id),A._emit("fade",l._id))},C)},_stopFade:function(l){var c=this,p=c._soundById(l);return p&&p._interval&&(c._webAudio&&p._node.gain.cancelScheduledValues(i.ctx.currentTime),clearInterval(p._interval),p._interval=null,c.volume(p._fadeTo,l),p._fadeTo=null,c._emit("fade",l)),c},loop:function(){var l=this,c=arguments,p,f,m;if(c.length===0)return l._loop;if(c.length===1)if(typeof c[0]=="boolean")p=c[0],l._loop=p;else return m=l._soundById(parseInt(c[0],10)),m?m._loop:!1;else c.length===2&&(p=c[0],f=parseInt(c[1],10));for(var g=l._getSoundIds(f),A=0;A<g.length;A++)m=l._soundById(g[A]),m&&(m._loop=p,l._webAudio&&m._node&&m._node.bufferSource&&(m._node.bufferSource.loop=p,p&&(m._node.bufferSource.loopStart=m._start||0,m._node.bufferSource.loopEnd=m._stop,l.playing(g[A])&&(l.pause(g[A],!0),l.play(g[A],!0)))));return l},rate:function(){var l=this,c=arguments,p,f;c.length===0?f=l._sounds[0]._id:c.length===1?l._getSoundIds().indexOf(c[0])>=0?f=parseInt(c[0],10):p=parseFloat(c[0]):c.length===2&&(p=parseFloat(c[0]),f=parseInt(c[1],10));var m;if(typeof p=="number"){if(l._state!=="loaded"||l._playLock)return l._queue.push({event:"rate",action:function(){l.rate.apply(l,c)}}),l;f===void 0&&(l._rate=p),f=l._getSoundIds(f);for(var g=0;g<f.length;g++)if(m=l._soundById(f[g]),m){l.playing(f[g])&&(m._rateSeek=l.seek(f[g]),m._playStart=l._webAudio?i.ctx.currentTime:m._playStart),m._rate=p,l._webAudio&&m._node&&m._node.bufferSource?m._node.bufferSource.playbackRate.setValueAtTime(p,i.ctx.currentTime):m._node&&(m._node.playbackRate=p);var A=l.seek(f[g]),_=((l._sprite[m._sprite][0]+l._sprite[m._sprite][1])/1e3-A)*1e3/Math.abs(m._rate);(l._endTimers[f[g]]||!m._paused)&&(l._clearTimer(f[g]),l._endTimers[f[g]]=setTimeout(l._ended.bind(l,m),_)),l._emit("rate",m._id)}}else return m=l._soundById(f),m?m._rate:l._rate;return l},seek:function(){var l=this,c=arguments,p,f;if(c.length===0?l._sounds.length&&(f=l._sounds[0]._id):c.length===1?l._getSoundIds().indexOf(c[0])>=0?f=parseInt(c[0],10):l._sounds.length&&(f=l._sounds[0]._id,p=parseFloat(c[0])):c.length===2&&(p=parseFloat(c[0]),f=parseInt(c[1],10)),f===void 0)return 0;if(typeof p=="number"&&(l._state!=="loaded"||l._playLock))return l._queue.push({event:"seek",action:function(){l.seek.apply(l,c)}}),l;var m=l._soundById(f);if(m)if(typeof p=="number"&&p>=0){var g=l.playing(f);g&&l.pause(f,!0),m._seek=p,m._ended=!1,l._clearTimer(f),!l._webAudio&&m._node&&!isNaN(m._node.duration)&&(m._node.currentTime=p);var A=function(){g&&l.play(f,!0),l._emit("seek",f)};if(g&&!l._webAudio){var _=function(){l._playLock?setTimeout(_,0):A()};setTimeout(_,0)}else A()}else if(l._webAudio){var v=l.playing(f)?i.ctx.currentTime-m._playStart:0,x=m._rateSeek?m._rateSeek-m._seek:0;return m._seek+(x+v*Math.abs(m._rate))}else return m._node.currentTime;return l},playing:function(l){var c=this;if(typeof l=="number"){var p=c._soundById(l);return p?!p._paused:!1}for(var f=0;f<c._sounds.length;f++)if(!c._sounds[f]._paused)return!0;return!1},duration:function(l){var c=this,p=c._duration,f=c._soundById(l);return f&&(p=c._sprite[f._sprite][1]/1e3),p},state:function(){return this._state},unload:function(){for(var l=this,c=l._sounds,p=0;p<c.length;p++)c[p]._paused||l.stop(c[p]._id),l._webAudio||(l._clearSound(c[p]._node),c[p]._node.removeEventListener("error",c[p]._errorFn,!1),c[p]._node.removeEventListener(i._canPlayEvent,c[p]._loadFn,!1),c[p]._node.removeEventListener("ended",c[p]._endFn,!1),i._releaseHtml5Audio(c[p]._node)),delete c[p]._node,l._clearTimer(c[p]._id);var f=i._howls.indexOf(l);f>=0&&i._howls.splice(f,1);var m=!0;for(p=0;p<i._howls.length;p++)if(i._howls[p]._src===l._src||l._src.indexOf(i._howls[p]._src)>=0){m=!1;break}return s&&m&&delete s[l._src],i.noAudio=!1,l._state="unloaded",l._sounds=[],l=null,null},on:function(l,c,p,f){var m=this,g=m["_on"+l];return typeof c=="function"&&g.push(f?{id:p,fn:c,once:f}:{id:p,fn:c}),m},off:function(l,c,p){var f=this,m=f["_on"+l],g=0;if(typeof c=="number"&&(p=c,c=null),c||p)for(g=0;g<m.length;g++){var A=p===m[g].id;if(c===m[g].fn&&A||!c&&A){m.splice(g,1);break}}else if(l)f["_on"+l]=[];else{var _=Object.keys(f);for(g=0;g<_.length;g++)_[g].indexOf("_on")===0&&Array.isArray(f[_[g]])&&(f[_[g]]=[])}return f},once:function(l,c,p){var f=this;return f.on(l,c,p,1),f},_emit:function(l,c,p){for(var f=this,m=f["_on"+l],g=m.length-1;g>=0;g--)(!m[g].id||m[g].id===c||l==="load")&&(setTimeout(function(A){A.call(this,c,p)}.bind(f,m[g].fn),0),m[g].once&&f.off(l,m[g].fn,m[g].id));return f._loadQueue(l),f},_loadQueue:function(l){var c=this;if(c._queue.length>0){var p=c._queue[0];p.event===l&&(c._queue.shift(),c._loadQueue()),l||p.action()}return c},_ended:function(l){var c=this,p=l._sprite;if(!c._webAudio&&l._node&&!l._node.paused&&!l._node.ended&&l._node.currentTime<l._stop)return setTimeout(c._ended.bind(c,l),100),c;var f=!!(l._loop||c._sprite[p][2]);if(c._emit("end",l._id),!c._webAudio&&f&&c.stop(l._id,!0).play(l._id),c._webAudio&&f){c._emit("play",l._id),l._seek=l._start||0,l._rateSeek=0,l._playStart=i.ctx.currentTime;var m=(l._stop-l._start)*1e3/Math.abs(l._rate);c._endTimers[l._id]=setTimeout(c._ended.bind(c,l),m)}return c._webAudio&&!f&&(l._paused=!0,l._ended=!0,l._seek=l._start||0,l._rateSeek=0,c._clearTimer(l._id),c._cleanBuffer(l._node),i._autoSuspend()),!c._webAudio&&!f&&c.stop(l._id,!0),c},_clearTimer:function(l){var c=this;if(c._endTimers[l]){if(typeof c._endTimers[l]!="function")clearTimeout(c._endTimers[l]);else{var p=c._soundById(l);p&&p._node&&p._node.removeEventListener("ended",c._endTimers[l],!1)}delete c._endTimers[l]}return c},_soundById:function(l){for(var c=this,p=0;p<c._sounds.length;p++)if(l===c._sounds[p]._id)return c._sounds[p];return null},_inactiveSound:function(){var l=this;l._drain();for(var c=0;c<l._sounds.length;c++)if(l._sounds[c]._ended)return l._sounds[c].reset();return new a(l)},_drain:function(){var l=this,c=l._pool,p=0,f=0;if(!(l._sounds.length<c)){for(f=0;f<l._sounds.length;f++)l._sounds[f]._ended&&p++;for(f=l._sounds.length-1;f>=0;f--){if(p<=c)return;l._sounds[f]._ended&&(l._webAudio&&l._sounds[f]._node&&l._sounds[f]._node.disconnect(0),l._sounds.splice(f,1),p--)}}},_getSoundIds:function(l){var c=this;if(l===void 0){for(var p=[],f=0;f<c._sounds.length;f++)p.push(c._sounds[f]._id);return p}else return[l]},_refreshBuffer:function(l){var c=this;return l._node.bufferSource=i.ctx.createBufferSource(),l._node.bufferSource.buffer=s[c._src],l._panner?l._node.bufferSource.connect(l._panner):l._node.bufferSource.connect(l._node),l._node.bufferSource.loop=l._loop,l._loop&&(l._node.bufferSource.loopStart=l._start||0,l._node.bufferSource.loopEnd=l._stop||0),l._node.bufferSource.playbackRate.setValueAtTime(l._rate,i.ctx.currentTime),c},_cleanBuffer:function(l){var c=this,p=i._navigator&&i._navigator.vendor.indexOf("Apple")>=0;if(!l.bufferSource)return c;if(i._scratchBuffer&&l.bufferSource&&(l.bufferSource.onended=null,l.bufferSource.disconnect(0),p))try{l.bufferSource.buffer=i._scratchBuffer}catch{}return l.bufferSource=null,c},_clearSound:function(l){/MSIE |Trident\//.test(i._navigator&&i._navigator.userAgent)||(l.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var a=function(l){this._parent=l,this.init()};a.prototype={init:function(){var l=this,c=l._parent;return l._muted=c._muted,l._loop=c._loop,l._volume=c._volume,l._rate=c._rate,l._seek=0,l._paused=!0,l._ended=!0,l._sprite="__default",l._id=++i._counter,c._sounds.push(l),l.create(),l},create:function(){var l=this,c=l._parent,p=i._muted||l._muted||l._parent._muted?0:l._volume;return c._webAudio?(l._node=i.ctx.createGain===void 0?i.ctx.createGainNode():i.ctx.createGain(),l._node.gain.setValueAtTime(p,i.ctx.currentTime),l._node.paused=!0,l._node.connect(i.masterGain)):i.noAudio||(l._node=i._obtainHtml5Audio(),l._errorFn=l._errorListener.bind(l),l._node.addEventListener("error",l._errorFn,!1),l._loadFn=l._loadListener.bind(l),l._node.addEventListener(i._canPlayEvent,l._loadFn,!1),l._endFn=l._endListener.bind(l),l._node.addEventListener("ended",l._endFn,!1),l._node.src=c._src,l._node.preload=c._preload===!0?"auto":c._preload,l._node.volume=p*i.volume(),l._node.load()),l},reset:function(){var l=this,c=l._parent;return l._muted=c._muted,l._loop=c._loop,l._volume=c._volume,l._rate=c._rate,l._seek=0,l._rateSeek=0,l._paused=!0,l._ended=!0,l._sprite="__default",l._id=++i._counter,l},_errorListener:function(){var l=this;l._parent._emit("loaderror",l._id,l._node.error?l._node.error.code:0),l._node.removeEventListener("error",l._errorFn,!1)},_loadListener:function(){var l=this,c=l._parent;c._duration=Math.ceil(l._node.duration*10)/10,Object.keys(c._sprite).length===0&&(c._sprite={__default:[0,c._duration*1e3]}),c._state!=="loaded"&&(c._state="loaded",c._emit("load"),c._loadQueue()),l._node.removeEventListener(i._canPlayEvent,l._loadFn,!1)},_endListener:function(){var l=this,c=l._parent;c._duration===1/0&&(c._duration=Math.ceil(l._node.duration*10)/10,c._sprite.__default[1]===1/0&&(c._sprite.__default[1]=c._duration*1e3),c._ended(l)),l._node.removeEventListener("ended",l._endFn,!1)}};var s={},n=function(l){var c=l._src;if(s[c]){l._duration=s[c].duration,h(l);return}if(/^data:[^;]+;base64,/.test(c)){for(var p=atob(c.split(",")[1]),f=new Uint8Array(p.length),m=0;m<p.length;++m)f[m]=p.charCodeAt(m);u(f.buffer,l)}else{var g=new XMLHttpRequest;g.open(l._xhr.method,c,!0),g.withCredentials=l._xhr.withCredentials,g.responseType="arraybuffer",l._xhr.headers&&Object.keys(l._xhr.headers).forEach(function(A){g.setRequestHeader(A,l._xhr.headers[A])}),g.onload=function(){var A=(g.status+"")[0];if(A!=="0"&&A!=="2"&&A!=="3"){l._emit("loaderror",null,"Failed loading audio file with status: "+g.status+".");return}u(g.response,l)},g.onerror=function(){l._webAudio&&(l._html5=!0,l._webAudio=!1,l._sounds=[],delete s[c],l.load())},o(g)}},o=function(l){try{l.send()}catch{l.onerror()}},u=function(l,c){var p=function(){c._emit("loaderror",null,"Decoding audio data failed.")},f=function(m){m&&c._sounds.length>0?(s[c._src]=m,h(c,m)):p()};typeof Promise<"u"&&i.ctx.decodeAudioData.length===1?i.ctx.decodeAudioData(l).then(f).catch(p):i.ctx.decodeAudioData(l,f,p)},h=function(l,c){c&&!l._duration&&(l._duration=c.duration),Object.keys(l._sprite).length===0&&(l._sprite={__default:[0,l._duration*1e3]}),l._state!=="loaded"&&(l._state="loaded",l._emit("load"),l._loadQueue())},d=function(){if(i.usingWebAudio){try{typeof AudioContext<"u"?i.ctx=new AudioContext:typeof webkitAudioContext<"u"?i.ctx=new webkitAudioContext:i.usingWebAudio=!1}catch{i.usingWebAudio=!1}i.ctx||(i.usingWebAudio=!1);var l=/iP(hone|od|ad)/.test(i._navigator&&i._navigator.platform),c=i._navigator&&i._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),p=c?parseInt(c[1],10):null;if(l&&p&&p<9){var f=/safari/.test(i._navigator&&i._navigator.userAgent.toLowerCase());i._navigator&&!f&&(i.usingWebAudio=!1)}i.usingWebAudio&&(i.masterGain=i.ctx.createGain===void 0?i.ctx.createGainNode():i.ctx.createGain(),i.masterGain.gain.setValueAtTime(i._muted?0:i._volume,i.ctx.currentTime),i.masterGain.connect(i.ctx.destination)),i._setup()}};typeof define=="function"&&define.amd&&define([],function(){return{Howler:i,Howl:r}}),e!==void 0&&(e.Howler=i,e.Howl=r),typeof global<"u"?(global.HowlerGlobal=t,global.Howler=i,global.Howl=r,global.Sound=a):typeof window<"u"&&(window.HowlerGlobal=t,window.Howler=i,window.Howl=r,window.Sound=a)})(),(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(i){var r=this;if(!r.ctx||!r.ctx.listener)return r;for(var a=r._howls.length-1;a>=0;a--)r._howls[a].stereo(i);return r},HowlerGlobal.prototype.pos=function(i,r,a){var s=this;if(!s.ctx||!s.ctx.listener)return s;if(r=typeof r=="number"?r:s._pos[1],a=typeof a=="number"?a:s._pos[2],typeof i=="number")s._pos=[i,r,a],s.ctx.listener.positionX===void 0?s.ctx.listener.setPosition(s._pos[0],s._pos[1],s._pos[2]):(s.ctx.listener.positionX.setTargetAtTime(s._pos[0],Howler.ctx.currentTime,.1),s.ctx.listener.positionY.setTargetAtTime(s._pos[1],Howler.ctx.currentTime,.1),s.ctx.listener.positionZ.setTargetAtTime(s._pos[2],Howler.ctx.currentTime,.1));else return s._pos;return s},HowlerGlobal.prototype.orientation=function(i,r,a,s,n,o){var u=this;if(!u.ctx||!u.ctx.listener)return u;var h=u._orientation;if(r=typeof r=="number"?r:h[1],a=typeof a=="number"?a:h[2],s=typeof s=="number"?s:h[3],n=typeof n=="number"?n:h[4],o=typeof o=="number"?o:h[5],typeof i=="number")u._orientation=[i,r,a,s,n,o],u.ctx.listener.forwardX===void 0?u.ctx.listener.setOrientation(i,r,a,s,n,o):(u.ctx.listener.forwardX.setTargetAtTime(i,Howler.ctx.currentTime,.1),u.ctx.listener.forwardY.setTargetAtTime(r,Howler.ctx.currentTime,.1),u.ctx.listener.forwardZ.setTargetAtTime(a,Howler.ctx.currentTime,.1),u.ctx.listener.upX.setTargetAtTime(s,Howler.ctx.currentTime,.1),u.ctx.listener.upY.setTargetAtTime(n,Howler.ctx.currentTime,.1),u.ctx.listener.upZ.setTargetAtTime(o,Howler.ctx.currentTime,.1));else return h;return u},Howl.prototype.init=(function(i){return function(r){var a=this;return a._orientation=r.orientation||[1,0,0],a._stereo=r.stereo||null,a._pos=r.pos||null,a._pannerAttr={coneInnerAngle:r.coneInnerAngle===void 0?360:r.coneInnerAngle,coneOuterAngle:r.coneOuterAngle===void 0?360:r.coneOuterAngle,coneOuterGain:r.coneOuterGain===void 0?0:r.coneOuterGain,distanceModel:r.distanceModel===void 0?"inverse":r.distanceModel,maxDistance:r.maxDistance===void 0?1e4:r.maxDistance,panningModel:r.panningModel===void 0?"HRTF":r.panningModel,refDistance:r.refDistance===void 0?1:r.refDistance,rolloffFactor:r.rolloffFactor===void 0?1:r.rolloffFactor},a._onstereo=r.onstereo?[{fn:r.onstereo}]:[],a._onpos=r.onpos?[{fn:r.onpos}]:[],a._onorientation=r.onorientation?[{fn:r.onorientation}]:[],i.call(this,r)}})(Howl.prototype.init),Howl.prototype.stereo=function(i,r){var a=this;if(!a._webAudio)return a;if(a._state!=="loaded")return a._queue.push({event:"stereo",action:function(){a.stereo(i,r)}}),a;var s=Howler.ctx.createStereoPanner===void 0?"spatial":"stereo";if(r===void 0)if(typeof i=="number")a._stereo=i,a._pos=[i,0,0];else return a._stereo;for(var n=a._getSoundIds(r),o=0;o<n.length;o++){var u=a._soundById(n[o]);if(u)if(typeof i=="number")u._stereo=i,u._pos=[i,0,0],u._node&&(u._pannerAttr.panningModel="equalpower",(!u._panner||!u._panner.pan)&&t(u,s),s==="spatial"?u._panner.positionX===void 0?u._panner.setPosition(i,0,0):(u._panner.positionX.setValueAtTime(i,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):u._panner.pan.setValueAtTime(i,Howler.ctx.currentTime)),a._emit("stereo",u._id);else return u._stereo}return a},Howl.prototype.pos=function(i,r,a,s){var n=this;if(!n._webAudio)return n;if(n._state!=="loaded")return n._queue.push({event:"pos",action:function(){n.pos(i,r,a,s)}}),n;if(r=typeof r=="number"?r:0,a=typeof a=="number"?a:-.5,s===void 0)if(typeof i=="number")n._pos=[i,r,a];else return n._pos;for(var o=n._getSoundIds(s),u=0;u<o.length;u++){var h=n._soundById(o[u]);if(h)if(typeof i=="number")h._pos=[i,r,a],h._node&&((!h._panner||h._panner.pan)&&t(h,"spatial"),h._panner.positionX===void 0?h._panner.setPosition(i,r,a):(h._panner.positionX.setValueAtTime(i,Howler.ctx.currentTime),h._panner.positionY.setValueAtTime(r,Howler.ctx.currentTime),h._panner.positionZ.setValueAtTime(a,Howler.ctx.currentTime))),n._emit("pos",h._id);else return h._pos}return n},Howl.prototype.orientation=function(i,r,a,s){var n=this;if(!n._webAudio)return n;if(n._state!=="loaded")return n._queue.push({event:"orientation",action:function(){n.orientation(i,r,a,s)}}),n;if(r=typeof r=="number"?r:n._orientation[1],a=typeof a=="number"?a:n._orientation[2],s===void 0)if(typeof i=="number")n._orientation=[i,r,a];else return n._orientation;for(var o=n._getSoundIds(s),u=0;u<o.length;u++){var h=n._soundById(o[u]);if(h)if(typeof i=="number")h._orientation=[i,r,a],h._node&&(h._panner||(h._pos||(h._pos=n._pos||[0,0,-.5]),t(h,"spatial")),h._panner.orientationX===void 0?h._panner.setOrientation(i,r,a):(h._panner.orientationX.setValueAtTime(i,Howler.ctx.currentTime),h._panner.orientationY.setValueAtTime(r,Howler.ctx.currentTime),h._panner.orientationZ.setValueAtTime(a,Howler.ctx.currentTime))),n._emit("orientation",h._id);else return h._orientation}return n},Howl.prototype.pannerAttr=function(){var i=this,r=arguments,a,s,n;if(!i._webAudio)return i;if(r.length===0)return i._pannerAttr;if(r.length===1)if(typeof r[0]=="object")a=r[0],s===void 0&&(a.pannerAttr||(a.pannerAttr={coneInnerAngle:a.coneInnerAngle,coneOuterAngle:a.coneOuterAngle,coneOuterGain:a.coneOuterGain,distanceModel:a.distanceModel,maxDistance:a.maxDistance,refDistance:a.refDistance,rolloffFactor:a.rolloffFactor,panningModel:a.panningModel}),i._pannerAttr={coneInnerAngle:a.pannerAttr.coneInnerAngle===void 0?i._coneInnerAngle:a.pannerAttr.coneInnerAngle,coneOuterAngle:a.pannerAttr.coneOuterAngle===void 0?i._coneOuterAngle:a.pannerAttr.coneOuterAngle,coneOuterGain:a.pannerAttr.coneOuterGain===void 0?i._coneOuterGain:a.pannerAttr.coneOuterGain,distanceModel:a.pannerAttr.distanceModel===void 0?i._distanceModel:a.pannerAttr.distanceModel,maxDistance:a.pannerAttr.maxDistance===void 0?i._maxDistance:a.pannerAttr.maxDistance,refDistance:a.pannerAttr.refDistance===void 0?i._refDistance:a.pannerAttr.refDistance,rolloffFactor:a.pannerAttr.rolloffFactor===void 0?i._rolloffFactor:a.pannerAttr.rolloffFactor,panningModel:a.pannerAttr.panningModel===void 0?i._panningModel:a.pannerAttr.panningModel});else return n=i._soundById(parseInt(r[0],10)),n?n._pannerAttr:i._pannerAttr;else r.length===2&&(a=r[0],s=parseInt(r[1],10));for(var o=i._getSoundIds(s),u=0;u<o.length;u++)if(n=i._soundById(o[u]),n){var h=n._pannerAttr;h={coneInnerAngle:a.coneInnerAngle===void 0?h.coneInnerAngle:a.coneInnerAngle,coneOuterAngle:a.coneOuterAngle===void 0?h.coneOuterAngle:a.coneOuterAngle,coneOuterGain:a.coneOuterGain===void 0?h.coneOuterGain:a.coneOuterGain,distanceModel:a.distanceModel===void 0?h.distanceModel:a.distanceModel,maxDistance:a.maxDistance===void 0?h.maxDistance:a.maxDistance,refDistance:a.refDistance===void 0?h.refDistance:a.refDistance,rolloffFactor:a.rolloffFactor===void 0?h.rolloffFactor:a.rolloffFactor,panningModel:a.panningModel===void 0?h.panningModel:a.panningModel};var d=n._panner;d||(d=(n._pos||(n._pos=i._pos||[0,0,-.5]),t(n,"spatial"),n._panner)),d.coneInnerAngle=h.coneInnerAngle,d.coneOuterAngle=h.coneOuterAngle,d.coneOuterGain=h.coneOuterGain,d.distanceModel=h.distanceModel,d.maxDistance=h.maxDistance,d.refDistance=h.refDistance,d.rolloffFactor=h.rolloffFactor,d.panningModel=h.panningModel}return i},Sound.prototype.init=(function(i){return function(){var r=this,a=r._parent;r._orientation=a._orientation,r._stereo=a._stereo,r._pos=a._pos,r._pannerAttr=a._pannerAttr,i.call(this),r._stereo?a.stereo(r._stereo):r._pos&&a.pos(r._pos[0],r._pos[1],r._pos[2],r._id)}})(Sound.prototype.init),Sound.prototype.reset=(function(i){return function(){var r=this,a=r._parent;return r._orientation=a._orientation,r._stereo=a._stereo,r._pos=a._pos,r._pannerAttr=a._pannerAttr,r._stereo?a.stereo(r._stereo):r._pos?a.pos(r._pos[0],r._pos[1],r._pos[2],r._id):r._panner&&(r._panner.disconnect(0),r._panner=void 0,a._refreshBuffer(r)),i.call(this)}})(Sound.prototype.reset);var t=function(i,r){r||(r="spatial"),r==="spatial"?(i._panner=Howler.ctx.createPanner(),i._panner.coneInnerAngle=i._pannerAttr.coneInnerAngle,i._panner.coneOuterAngle=i._pannerAttr.coneOuterAngle,i._panner.coneOuterGain=i._pannerAttr.coneOuterGain,i._panner.distanceModel=i._pannerAttr.distanceModel,i._panner.maxDistance=i._pannerAttr.maxDistance,i._panner.refDistance=i._pannerAttr.refDistance,i._panner.rolloffFactor=i._pannerAttr.rolloffFactor,i._panner.panningModel=i._pannerAttr.panningModel,i._panner.positionX===void 0?i._panner.setPosition(i._pos[0],i._pos[1],i._pos[2]):(i._panner.positionX.setValueAtTime(i._pos[0],Howler.ctx.currentTime),i._panner.positionY.setValueAtTime(i._pos[1],Howler.ctx.currentTime),i._panner.positionZ.setValueAtTime(i._pos[2],Howler.ctx.currentTime)),i._panner.orientationX===void 0?i._panner.setOrientation(i._orientation[0],i._orientation[1],i._orientation[2]):(i._panner.orientationX.setValueAtTime(i._orientation[0],Howler.ctx.currentTime),i._panner.orientationY.setValueAtTime(i._orientation[1],Howler.ctx.currentTime),i._panner.orientationZ.setValueAtTime(i._orientation[2],Howler.ctx.currentTime))):(i._panner=Howler.ctx.createStereoPanner(),i._panner.pan.setValueAtTime(i._stereo,Howler.ctx.currentTime)),i._panner.connect(i._node),i._paused||i._parent.pause(i._id,!0).play(i._id,!0)}})()}))();Ze.Howler.autoSuspend=!1,Ze.Howler.autoUnlock=!0;var rv=22050,rc=750,av=350,Jt="/assets/reference/",sv=.4,Lt={"stage1-ambient":{src:`${Jt}assets/audio/amb_stage1.mp3`,type:"ambient",loop:!0,volume:.55,fadeIn:1.5,fadeOut:2.5,preload:!0,startOn:"firstTouch"},"stage2-ambient":{src:`${Jt}assets/audio/amb_stage2-3.mp3`,type:"ambient",loop:!0,volume:.55,fadeIn:2,fadeOut:1.5,preload:!0},"loader-drag":{src:`${Jt}assets/audio/fx_loader-drag.mp3`,type:"fx",loop:!0,volume:.255,fadeIn:.12,fadeOut:.25,preload:!0},"hand-entry":{src:`${Jt}assets/audio/fx_hand-entry.mp3`,type:"fx",loop:!1,volume:.8,fadeIn:0,fadeOut:.1,preload:!0},whoosh:{src:`${Jt}assets/audio/fx_whoosh.mp3`,type:"fx",loop:!1,volume:.6,fadeIn:0,fadeOut:.1,preload:!0,muffleable:!1},click:{src:`${Jt}assets/audio/fx_click.mp3`,type:"fx",loop:!1,volume:.25,fadeIn:0,fadeOut:.05,preload:!0,muffleable:!1},loader:{src:`${Jt}assets/audio/fx_loader.mp3`,type:"fx",loop:!1,volume:.8,fadeIn:0,fadeOut:.1,preload:!0},"xp-topup":{src:`${Jt}assets/audio/fx_xp-topup.mp3`,type:"fx",loop:!1,volume:.35,fadeIn:0,fadeOut:.05,preload:!0},tunnel:{src:`${Jt}assets/audio/fx_tunnel.mp3`,type:"fx",loop:!1,volume:1,fadeIn:0,fadeOut:.15,preload:!0},"glass-shatter":{src:`${Jt}assets/audio/fx_glass-shatter.mp3`,type:"fx",loop:!1,volume:.85,fadeIn:0,fadeOut:.1,preload:!0},"hold-button":{src:`${Jt}assets/audio/fx_hold-button.mp3`,type:"fx",loop:!1,volume:.75,fadeIn:.04,fadeOut:.08,preload:!0,holdRateScale:.75},"money-burn":{src:`${Jt}assets/audio/fx_money-burn.mp3`,type:"fx",loop:!0,volume:.05,fadeIn:.05,fadeOut:.25,preload:!1},"stage4-ambient":{src:`${Jt}assets/audio/amb_stage4-5.mp3`,type:"ambient",loop:!0,volume:1,fadeIn:2,fadeOut:1.5,preload:!0},"stage5-ambient":{src:`${Jt}assets/audio/amb_stage5.mp3`,type:"ambient",loop:!0,volume:.7,fadeIn:2,fadeOut:1.5,preload:!0}},Je=new class{constructor(){this._howls=new Map,this._activeIds=new Map,this._stopTimers=new Map,this._enabled=!0,this._armed=!1,this._ctxWatch=null,this._ambientActive=new Set,this._muffleNodes=null,this._muffleAmount=0}arm(){if(!this._armed){this._armed=!0;for(let e in Lt){let t=Lt[e];t.startOn==="firstTouch"&&t.type==="ambient"&&this._ambientActive.add(e)}this._notifyStateChange()}this._unlock()}_unlock(){let e=Ze.Howler.ctx;if(!e||this.isUnlocked()){this._startBeds();return}try{let t=e.createBuffer(1,1,22050),i=e.createBufferSource();i.buffer=t,i.connect(e.destination),i.start(0)}catch{}try{typeof Ze.Howler._autoResume=="function"&&Ze.Howler._autoResume()}catch{}typeof e.resume=="function"&&e.resume().then(()=>this._startBeds()).catch(()=>{}),this._ctxWatch||(this._ctxWatch=()=>{if(!(!Ze.Howler.ctx||Ze.Howler.ctx.state!=="running")){try{Ze.Howler.state!=="running"&&typeof Ze.Howler._autoResume=="function"&&Ze.Howler._autoResume()}catch{}this._startBeds(),setTimeout(()=>this._startBeds(),60)}},e.addEventListener("statechange",this._ctxWatch))}unlockNow(){this.preload(),this.arm()}_startBeds(){if(!(!this._armed||!this._enabled)){for(let e of this._ambientActive)this._playInternal(e);for(let[e,t]of this._howls.entries()){let i=Lt[e];i&&i.type==="ambient"&&!this._ambientActive.has(e)&&t.playing()&&this._stopHowl(e,{fadeOut:.4})}}}isArmed(){return this._armed}isEnabled(){return this._enabled}isUnlocked(){return!!(Ze.Howler.ctx&&Ze.Howler.ctx.state==="running"&&Ze.Howler.state==="running")}_purgeDeferredPlays(e){try{e.off("resume")}catch{}}isAmbientPlaying(){return this._armed&&this._enabled&&this._ambientActive.size>0}setEnabled(e){if(e=!!e,e!==this._enabled){if(this._enabled=e,Ze.Howler.mute(!e),e){if(this._armed)for(let t of this._ambientActive)this._playInternal(t,{fadeIn:sv})}else{for(let t of this._stopTimers.values())clearTimeout(t);this._stopTimers.clear();for(let t of this._howls.values()){this._purgeDeferredPlays(t);try{t._playLock||t.stop()}catch{}}this._activeIds.clear()}this._notifyStateChange()}}preload(){for(let e in Lt)Lt[e].preload&&this._get(e)}decodeAll(){return Promise.all(Object.keys(Lt).map(e=>new Promise(t=>{let i=this._get(e);if(!i||i.state()==="loaded")return t();i.once("load",()=>t()),i.once("loaderror",(r,a)=>{console.warn(`[AudioManager] decode failed: ${e}`,a),t()})})))}play(e,t={}){let i=Lt[e];if(i){if(i.type==="ambient"){let r=this._ambientActive.has(e);this._ambientActive.add(e),r||this._notifyStateChange()}!this._armed||!this._enabled||this._playInternal(e,t)}}stop(e,t={}){let i=Lt[e];if(!i)return;let r=!1;i.type==="ambient"&&(r=this._ambientActive.delete(e)),this._stopHowl(e,t),r&&this._notifyStateChange()}pause(e){let t=this._howls.get(e);if(!t)return;let i=this._activeIds.get(e);i!=null&&t.pause(i)}getDuration(e){let t=this._howls.get(e);if(!t)return null;let i=t.duration();return i>0?i:null}getTrackOption(e,t){let i=Lt[e];return i?i[t]:void 0}setLevel(e,t){let i=this._howls.get(e);if(!i)return;let r=this._activeIds.get(e);r!=null&&(t.volume!=null&&i.volume(t.volume,r),t.rate!=null&&i.rate(t.rate,r))}playInstance(e,t={}){let i=Lt[e];if(!i||!this._armed||!this._enabled||!this.isUnlocked())return null;let r=this._get(e);if(!r)return null;let a=t.volume??i.volume??1,s=(t.fadeIn??i.fadeIn??0)*1e3|0,n=r.play();return r.volume(0,n),t.seek!=null&&r.seek(t.seek,n),t.rate!=null&&r.rate(t.rate,n),s>0?r.fade(0,a,s,n):r.volume(a,n),n}setInstanceLevel(e,t,i){let r=this._howls.get(e);!r||t==null||(i.volume!=null&&r.volume(i.volume,t),i.rate!=null&&r.rate(i.rate,t))}stopInstance(e,t,i={}){let r=Lt[e];if(!r)return;let a=this._howls.get(e);if(!a||t==null)return;let s=(i.fadeOut??r.fadeOut??0)*1e3|0,n=a.volume(t);if(s<=0||n<=0){a.stop(t);return}a.fade(n,0,s,t),setTimeout(()=>a.stop(t),s)}_muffleCutoffFor(e){let t=Math.max(0,Math.min(1,e)),i=(r,a,s)=>r*(a/r)**+s;return t<=.5?i(rv,rc,t*2):i(rc,av,(t-.5)*2)}_ensureMuffleNodes(){if(this._muffleNodes)return this._muffleNodes;let e=Ze.Howler.ctx;if(!e||!Ze.Howler.masterGain)return null;let t=e.createGain(),i=e.createGain(),r=e.createBiquadFilter();return r.type="lowpass",r.frequency.value=this._muffleCutoffFor(this._muffleAmount??0),r.Q.value=.7,t.connect(r),r.connect(Ze.Howler.masterGain),i.connect(Ze.Howler.masterGain),this._muffleNodes={muffleBus:t,cleanBus:i,filter:r},this._muffleNodes}_routeSound(e,t){let i=Lt[e];if(!i)return;let r=this._howls.get(e);if(!r||!r._sounds)return;let a=this._ensureMuffleNodes();if(!a)return;let s=r._sounds.find(o=>o._id===t);if(!s||!s._node)return;try{s._node.disconnect(Ze.Howler.masterGain)}catch{}try{s._node.disconnect(a.muffleBus)}catch{}try{s._node.disconnect(a.cleanBus)}catch{}let n=i.muffleable===!1?a.cleanBus:a.muffleBus;s._node.connect(n)}setMuffle(e,t={}){let i=Math.max(0,Math.min(1,e));this._muffleAmount=i;let r=this._ensureMuffleNodes();if(!r)return;let a=this._muffleCutoffFor(i),s=Math.max(.001,t.duration??(i>0?.25:.35)),n=Ze.Howler.ctx.currentTime,o=r.filter.frequency;o.cancelScheduledValues(n),o.setValueAtTime(o.value,n),o.exponentialRampToValueAtTime(a,n+s)}suspendContext(){let e=Ze.Howler.ctx;e&&e.state==="running"&&e.suspend().then(()=>{Ze.Howler.state="suspended"}).catch(()=>{})}resumeContext(){let e=Ze.Howler.ctx;if(!(!e||e.state==="running")){try{typeof Ze.Howler._autoResume=="function"&&Ze.Howler._autoResume()}catch{}typeof e.resume=="function"&&e.resume().then(()=>this._startBeds()).catch(()=>{})}}stopAll(){for(let e of this._stopTimers.values())clearTimeout(e);this._stopTimers.clear();for(let e of this._howls.values()){this._purgeDeferredPlays(e);try{e._playLock||e.stop()}catch{}}this._activeIds.clear(),this._ambientActive.clear()}_notifyStateChange(){window.dispatchEvent(new CustomEvent("audio:statechange"))}_playInternal(e,t={}){let i=Lt[e];if(!i)return;let r=this._get(e);if(!r||i.type==="ambient"&&!this.isUnlocked())return;let a=this._stopTimers.get(e);a&&(clearTimeout(a),this._stopTimers.delete(e));let s=(t.fadeIn??i.fadeIn??0)*1e3|0,n=t.volume??i.volume??1,o=this._activeIds.get(e),u=o!=null&&r.playing(o);o==null?(this._purgeDeferredPlays(r),!r._playLock&&r.playing()&&r.stop(),o=r.play(),this._activeIds.set(e,o),r.volume(0,o)):u||r.play(o),t.seek!=null&&r.seek(t.seek,o),t.rate!=null&&r.rate(t.rate,o);let h=r.volume(o);s>0?r.fade(h,n,s,o):r.volume(n,o)}_stopHowl(e,t={}){let i=Lt[e];if(!i)return;let r=this._howls.get(e);if(!r)return;this._purgeDeferredPlays(r);let a=this._stopTimers.get(e);if(a&&(clearTimeout(a),this._stopTimers.delete(e)),r._playLock){this._activeIds.delete(e);return}let s=this._activeIds.get(e);if(s==null&&!r.playing())return;let n=(t.fadeOut??i.fadeOut??0)*1e3|0,o=s==null?r.volume():r.volume(s);if(n<=0||o<=0){r.stop(),this._activeIds.delete(e);return}r.fade(o,0,n);let u=setTimeout(()=>{r.stop(),this._activeIds.delete(e),this._stopTimers.delete(e)},n);this._stopTimers.set(e,u)}_get(e){let t=this._howls.get(e);if(t)return t;let i=Lt[e];return i?(t=new Ze.Howl({src:[i.src],loop:!!i.loop,volume:0,html5:!1,preload:!0}),t.on("play",r=>this._routeSound(e,r)),this._howls.set(e,t),t):null}};var Fs={SCROLL_LERP:.075,CAMERA_LERP:.08,SCROLL_VELOCITY_SMOOTHING:.1,CAMERA_RIG:{FOCAL_DISTANCE:1,MAX_OFFSET:.18,SMOOTH_TC:.12,GYRO_RANGE:20}};var ac=new P,sc=new P,tl=new P,nc=new P,oc=new ke,nv=class{constructor(e){this.camera=e,this.enabled=!0,this.influence=1,this.config=Fs.CAMERA_RIG,this._inputX=0,this._inputY=0,this._currentX=0,this._currentY=0,this._savedPos=new P,this._savedQuat=new _t,this._isDesktop=window.matchMedia("(pointer: fine)").matches||!window.matchMedia("(pointer: coarse)").matches,this._gyroActive=!1,this._gyroAttempt="idle",this._gyroBetaRef=null,this._gyroGammaRef=null,this._handleGyro=t=>{if(!Number.isFinite(t.gamma)||!Number.isFinite(t.beta))return;this._gyroActive||(this._gyroActive=!0,console.log("[CameraRig] First deviceorientation event received",{beta:t.beta,gamma:t.gamma,absolute:t.absolute}));let i=t.beta,r=t.gamma,a=screen.orientation?.angle??(typeof window.orientation=="number"?window.orientation:0);if(a===90?(i=t.gamma,r=-t.beta):a===270?(i=-t.gamma,r=t.beta):a===180&&(i=-t.beta,r=-t.gamma),this._gyroBetaRef===null){this._gyroBetaRef=i,this._gyroGammaRef=r;return}let s=this.config.GYRO_RANGE;this._inputX=Math.max(-1,Math.min(1,(r-this._gyroGammaRef)/s)),this._inputY=Math.max(-1,Math.min(1,-(i-this._gyroBetaRef)/s));let n=.008;this._gyroGammaRef+=(r-this._gyroGammaRef)*n,this._gyroBetaRef+=(i-this._gyroBetaRef)*n},this._onResize=this._onResize.bind(this),window.addEventListener("resize",this._onResize),this._gyroAutoTrigger=()=>{this.enableGyro().then(()=>{this._gyroAttempt==="granted"&&(window.removeEventListener("pointerdown",this._gyroAutoTrigger,!0),window.removeEventListener("touchstart",this._gyroAutoTrigger,!0),this._gyroAutoTrigger=null)})},this._gyroAutoTrigger=null}_onResize(){this._isDesktop=window.matchMedia("(pointer: fine)").matches}onMouseMove(e,t){!this._isDesktop||!this.enabled||(this._inputX=e,this._inputY=t)}get cursorX(){return this._currentX}get cursorY(){return this._currentY}get gyroActive(){return this._gyroActive}get inputX(){return this._inputX}get inputY(){return this._inputY}async enableGyro(){return this._gyroActive}setEnabled(e){this.enabled=e,e||(this._inputX=0,this._inputY=0,this._currentX=0,this._currentY=0)}get _hasInput(){return this._isDesktop||this._gyroActive}update(e){if(!this._hasInput||!this.enabled)return;let t=1-Math.exp(-e/this.config.SMOOTH_TC);this._currentX+=(this._inputX-this._currentX)*t,this._currentY+=(this._inputY-this._currentY)*t,Math.abs(this._currentX)<1e-4&&(this._currentX=0),Math.abs(this._currentY)<1e-4&&(this._currentY=0),this._savedPos.copy(this.camera.position),this._savedQuat.copy(this.camera.quaternion),ac.set(0,0,-1).applyQuaternion(this._savedQuat),sc.set(1,0,0).applyQuaternion(this._savedQuat),tl.set(0,1,0).applyQuaternion(this._savedQuat),nc.copy(this._savedPos).addScaledVector(ac,this.config.FOCAL_DISTANCE);let i=this.config.MAX_OFFSET*this.influence;this.camera.position.addScaledVector(sc,this._currentX*i),this.camera.position.addScaledVector(tl,this._currentY*i),oc.lookAt(this.camera.position,nc,tl),this.camera.quaternion.setFromRotationMatrix(oc)}restore(){!this._hasInput||!this.enabled||(this.camera.position.copy(this._savedPos),this.camera.quaternion.copy(this._savedQuat))}dispose(){window.removeEventListener("resize",this._onResize),window.removeEventListener("deviceorientation",this._handleGyro),this._gyroAutoTrigger&&(this._gyroAutoTrigger=(window.removeEventListener("pointerdown",this._gyroAutoTrigger,!0),window.removeEventListener("touchstart",this._gyroAutoTrigger,!0),null))}};function ov(e){if(!e||!e.image)return 1;let t=e.image;return(t.videoWidth||t.naturalWidth||t.width||1)/(t.videoHeight||t.naturalHeight||t.height||1)}var tr={x:1,y:1};function Tp(e,t,i){return i?e>t?(tr.x=t/e,tr.y=1,tr):(tr.x=1,tr.y=e/t,tr):(tr.x=1,tr.y=1,tr)}function Gs(e,t,i,r,a=!0){let s=r?`uTexture${t}`:`uOverlayTexture${t}`;e.uniforms[s].value=i;let n=ov(i),o=e.uniforms.uViewportAspect.value,u=Tp(n,o,!a);e.uniforms[`uCoverScale${t}`].value.set(u.x,u.y),e._slotMeta||(e._slotMeta={}),e._slotMeta[t]={texAspect:n,isCover:!a}}function Xr(e,t,i,r,a,s=null){let n=r.getAsset(i);if(n){if(s!=null){let o=a?`uTexture${t}`:`uOverlayTexture${t}`;e.uniforms[o].value=n;let u=e.uniforms.uViewportAspect.value||1;e.uniforms[`uCoverScale${t}`].value.set(s,s/u),e._slotMeta||(e._slotMeta={}),e._slotMeta[t]={isTile:!0,tile:s};return}Gs(e,t,n,a,r.getMeta(i).stretched!==!1)}}function lc(e,t){if(e._slotMeta)for(let[i,r]of Object.entries(e._slotMeta)){if(r.isTile){e.uniforms[`uCoverScale${i}`].value.set(r.tile,r.tile/t);continue}let a=Tp(r.texAspect,t,r.isCover);e.uniforms[`uCoverScale${i}`].value.set(a.x,a.y)}}var lv={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Br=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},uv=new Qs(-1,1,1,-1,0,1),hv=new class extends ni{constructor(){super(),this.setAttribute("position",new ei([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ei([0,2,0,0,2,0],2))}},Cr=class{constructor(e){this._mesh=new dt(hv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,uv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},gu=class extends Br{constructor(e,t){super(),this.textureID=t===void 0?"tDiffuse":t,e instanceof lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=td.clone(e.uniforms),this.material=new lt({name:e.name===void 0?"unspecified":e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Cr(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}},uc=class extends Br{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let r=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let s,n;this.inverse?(s=0,n=1):(s=1,n=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),a.buffers.stencil.setFunc(r.ALWAYS,s,4294967295),a.buffers.stencil.setClear(n),a.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(r.EQUAL,1,4294967295),a.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),a.buffers.stencil.setLocked(!0)}},cv=class extends Br{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},dv=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new oe);this._width=i.width,this._height=i.height,t=new jt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ua}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new gu(lv),this.copyPass.material.blending=0,this.clock=new bg}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let r=0,a=this.passes.length;r<a;r++){let s=this.passes[r];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),s.needsSwap){if(i){let n=this.renderer.getContext(),o=this.renderer.state.buffers.stencil;o.setFunc(n.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),o.setFunc(n.EQUAL,1,4294967295)}this.swapBuffers()}uc!==void 0&&(s instanceof uc?i=!0:s instanceof cv&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new oe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},pv=class extends Br{constructor(e,t,i=null,r=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ye}render(e,t,i){let r=e.autoClear;e.autoClear=!1;let a,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=r}},fv=`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,Av=`
    precision mediump float;

    uniform sampler2D tDiffuse;
    uniform sampler2D uTextureA;
    uniform sampler2D uTextureB;
    uniform float uProgress;
    uniform float uOpacity;
    uniform float uLinearizeA;
    uniform float uLinearizeB;
    uniform vec2 uCoverScaleA;
    uniform vec2 uCoverScaleB;
    uniform float uZoom;
















    uniform float uParallaxOn;
    uniform float uParallaxSlot;
    uniform sampler2D uAtlas;
    uniform vec2 uAtlasCell;
    uniform vec2 uAtlasInset;
    uniform vec2 uParallax;
    uniform float uParallaxAmp;



    uniform vec2 uBgParallax;
    uniform float uBgParallaxAmp;
    uniform float uViewportAspect;

    varying vec2 vUv;


    vec3 sRGBToLinear(vec3 c) {
        return pow(max(c, 0.0), vec3(2.2));
    }











    #define NUM_GARDEN_LAYERS 6
    uniform vec4  uLayerRect[NUM_GARDEN_LAYERS];
    uniform vec2  uLayerHalfSize[NUM_GARDEN_LAYERS];
    uniform vec2  uLayerCenter[NUM_GARDEN_LAYERS];
    uniform float uLayerDepth[NUM_GARDEN_LAYERS];



    uniform float uGardenBright;
    uniform float uGardenWhitewash;
    uniform float uGardenBloom;

    vec4 gardenLayer(vec4 r, vec2 hsRaw, vec2 c, float d) {
        vec2 hs = vec2(hsRaw.x / uViewportAspect, hsRaw.y);
        vec2 shift = uParallax * (uParallaxAmp * d);
        vec2 p = (vUv - c - shift) / (2.0 * hs) + 0.5;
        if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0) return vec4(0.0);
        return texture2D(uAtlas, r.xy + p * r.zw);
    }







    vec3 parallaxStack(vec2 base) {


        vec2 hs0 = vec2(uLayerHalfSize[0].x / uViewportAspect, uLayerHalfSize[0].y);
        vec2 sh0 = uParallax * (uParallaxAmp * uLayerDepth[0]);
        vec2 p0 = clamp((vUv - uLayerCenter[0] - sh0) / (2.0 * hs0) + 0.5, 0.0, 1.0);
        vec3 acc = texture2D(uAtlas, uLayerRect[0].xy + p0 * uLayerRect[0].zw).rgb;

        vec4 l;
        l = gardenLayer(uLayerRect[1], uLayerHalfSize[1], uLayerCenter[1], uLayerDepth[1]); acc = mix(acc, l.rgb, l.a);
        l = gardenLayer(uLayerRect[2], uLayerHalfSize[2], uLayerCenter[2], uLayerDepth[2]); acc = mix(acc, l.rgb, l.a);
        l = gardenLayer(uLayerRect[3], uLayerHalfSize[3], uLayerCenter[3], uLayerDepth[3]); acc = mix(acc, l.rgb, l.a);
        l = gardenLayer(uLayerRect[4], uLayerHalfSize[4], uLayerCenter[4], uLayerDepth[4]); acc = mix(acc, l.rgb, l.a);
        l = gardenLayer(uLayerRect[5], uLayerHalfSize[5], uLayerCenter[5], uLayerDepth[5]); acc = mix(acc, l.rgb, l.a);



        vec3 col = acc * uGardenBright;

        col = mix(col, vec3(1.0), uGardenWhitewash);




        float lum = dot(col, vec3(0.299, 0.587, 0.114));
        float glow = smoothstep(0.42, 1.0, lum);
        col += glow * glow * uGardenBloom;
        return col;
    }




    vec4 sampleBgA() {
        if (uParallaxOn > 0.5 && uParallaxSlot < 0.5) {
            return vec4(parallaxStack(vUv - 0.5), 1.0);
        }



        vec2 uvA = (vUv - 0.5) * uCoverScaleA * uZoom * (1.0 - 2.0 * uBgParallaxAmp)
                 + uBgParallax * uBgParallaxAmp + 0.5;
        vec4 colorA = texture2D(uTextureA, uvA);
        if (uLinearizeA > 0.5) colorA.rgb = sRGBToLinear(colorA.rgb);
        return vec4(colorA.rgb * colorA.a, colorA.a);
    }



    vec4 sampleBgB() {
        if (uParallaxOn > 0.5 && uParallaxSlot > 0.5) {
            return vec4(parallaxStack(vUv - 0.5), 1.0);
        }



        vec2 uvB = (vUv - 0.5) * uCoverScaleB * uZoom * (1.0 - 2.0 * uBgParallaxAmp)
                 + uBgParallax * uBgParallaxAmp + 0.5;
        vec4 colorB = texture2D(uTextureB, uvB);
        if (uLinearizeB > 0.5) colorB.rgb = sRGBToLinear(colorB.rgb);
        return vec4(colorB.rgb * colorB.a, colorB.a);
    }

    void main() {
        vec4 sceneColor = texture2D(tDiffuse, vUv);


        vec4 pBg;
        if (uProgress < 0.001) {
            pBg = sampleBgA();
        } else if (uProgress > 0.999) {
            pBg = sampleBgB();
        } else {
            pBg = mix(sampleBgA(), sampleBgB(), uProgress);
        }
        pBg *= uOpacity;

        vec3 finalRGB = sceneColor.rgb + (pBg.rgb * (1.0 - sceneColor.a));

        gl_FragColor = vec4(finalRGB, 1.0);
    }
`;function mv(){return new gu(new lt({vertexShader:fv,fragmentShader:Av,uniforms:{tDiffuse:{value:null},uTextureA:{value:null},uTextureB:{value:null},uProgress:{value:0},uOpacity:{value:1},uLinearizeA:{value:0},uLinearizeB:{value:0},uViewportAspect:{value:1},uCoverScaleA:{value:new oe(1,1)},uCoverScaleB:{value:new oe(1,1)},uZoom:{value:1},uParallaxOn:{value:0},uParallaxSlot:{value:0},uAtlas:{value:null},uAtlasCell:{value:new oe(1/3,1/2)},uAtlasInset:{value:new oe(0,0)},uParallax:{value:new oe(0,0)},uParallaxAmp:{value:.025},uBgParallax:{value:new oe(0,0)},uBgParallaxAmp:{value:0},uLayerRect:{value:Array.from({length:6},()=>new et(0,0,1,1))},uLayerHalfSize:{value:Array.from({length:6},()=>new oe(.5,.5))},uLayerCenter:{value:Array.from({length:6},()=>new oe(.5,.5))},uLayerDepth:{value:new Float32Array([1,.7,.55,.4,.2,.1])},uGardenBright:{value:1},uGardenWhitewash:{value:.05},uGardenBloom:{value:.15}},depthWrite:!1,depthTest:!1}))}var wp={GLOBAL_TIME_SCALE:1,IS_MOBILE_DEFAULT:!1,FOREGROUND:{DEFAULT_OPACITY:1,TRANSITION_DURATION:1,ENABLE_OVERLAY_DEFAULT:1,MAX_TEXTURES:30},BACKGROUND:{ENABLE_MOTION:1,MOTION_SPEED:.1},LENS_BLUR:{FOCAL_RADIUS:.3,FALLOFF:.3,MAX_BLUR:24,ENABLED:1,DESKTOP_SAMPLES:24,MOBILE_SAMPLES:16,MOBILE_BLUR_SCALE:.6}},En=256;function gv(){let e=En*En,t=new Uint8Array(e),i=305419896;for(let a=0;a<e;a++){i|=0,i=i+1831565813|0;let s=Math.imul(i^i>>>15,1|i);s=s+Math.imul(s^s>>>7,61|s)^s,t[a]=(s^s>>>14)>>>0>>24}let r=new Kt(t,En,En,Ta);return r.wrapS=yi,r.wrapT=yi,r.minFilter=si,r.magFilter=si,r.generateMipmaps=!1,r.needsUpdate=!0,r}var _v=`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,vv=`
    precision mediump float;

    uniform sampler2D tDiffuse;
    uniform sampler2D uOverlayTextureA;
    uniform sampler2D uOverlayTextureB;

    uniform float uProgress;
    uniform float uOpacity;
    uniform float uEnableOverlay;





    uniform float uOverlayCenterReveal;

    uniform float uTime;
    uniform float uEnableNoise;
    uniform float uNoiseStrength;
    uniform sampler2D uNoiseTex;




    uniform vec2 uNoiseOffset;

    uniform vec2 uCoverScaleA;
    uniform vec2 uCoverScaleB;


    uniform sampler2D uGodRaysTex1;
    uniform sampler2D uGodRaysTex2;
    uniform float uGodRaysBlend;
    uniform vec2 uGodRaysCoverScale1;
    uniform vec2 uGodRaysCoverScale2;

    uniform vec4 uGodRaysRect1;
    uniform vec4 uGodRaysRect2;
    uniform float uGodRaysOpacity;
    uniform float uEnableGodRays;


    uniform float uRippleTime;
    uniform float uRippleStrength;
    uniform float uRippleHw;
    uniform float uViewportAspect;







    uniform sampler2D uHoverFrostTex;
    uniform vec2  uHoverPos;
    uniform float uHoverRadius;
    uniform float uHoverIntensity;
    uniform float uHoverGlow;
    uniform vec2  uHoverFrostCoverScale;


    uniform float uExposure;
    uniform float uContrast;
    uniform float uSaturation;
    uniform float uRedTint;

    varying vec2 vUv;

    vec3 linearToSRGB(vec3 c) {
        c = clamp(c, 0.0, 1.0);
        return mix(
            1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055,
            c * 12.92,
            vec3(lessThan(c, vec3(0.0031308)))
        );
    }

    void main() {
        vec4 sceneColor = texture2D(tDiffuse, vUv);

        vec3 finalRGB = sceneColor.rgb;




        if (uHoverIntensity > 0.001) {
            vec2 cm = vUv - uHoverPos;
            cm.x *= uViewportAspect;
            float dist = length(cm);


            float discMask =
                (1.0 - smoothstep(uHoverRadius * 0.95, uHoverRadius, dist))
                * uHoverIntensity;
            if (discMask > 0.001) {











                float glow = pow(1.0 - smoothstep(0.0, uHoverRadius, dist), 1.8);
                vec3 glowCol = vec3(1.0, 0.86, 0.62);
                vec3 b = clamp(glowCol * glow * discMask * uHoverGlow, 0.0, 0.9);
                finalRGB = finalRGB / (1.0 - b);
            }
        }


        if (uEnableOverlay > 0.5 && uOpacity > 0.001) {
            vec4 pOverlay;
            if (uProgress < 0.001) {
                vec2 uvA = (vUv - 0.5) * uCoverScaleA + 0.5;
                vec4 ovA = texture2D(uOverlayTextureA, uvA);
                pOverlay = vec4(ovA.rgb * ovA.a, ovA.a);
            } else if (uProgress > 0.999) {
                vec2 uvB = (vUv - 0.5) * uCoverScaleB + 0.5;
                vec4 ovB = texture2D(uOverlayTextureB, uvB);
                pOverlay = vec4(ovB.rgb * ovB.a, ovB.a);
            } else {
                vec2 uvA = (vUv - 0.5) * uCoverScaleA + 0.5;
                vec2 uvB = (vUv - 0.5) * uCoverScaleB + 0.5;
                vec4 ovA = texture2D(uOverlayTextureA, uvA);
                vec4 ovB = texture2D(uOverlayTextureB, uvB);
                vec4 pA = vec4(ovA.rgb * ovA.a, ovA.a);
                vec4 pB = vec4(ovB.rgb * ovB.a, ovB.a);
                pOverlay = mix(pA, pB, uProgress);
            }
            pOverlay *= uOpacity;






            vec2 cm = vUv - 0.5;
            cm.x *= uViewportAspect;
            float dCenter = length(cm) * 2.0;
            float centerMask =
                1.0 - smoothstep(uOverlayCenterReveal - 4.0,
                                 uOverlayCenterReveal,
                                 dCenter);
            pOverlay *= centerMask;
            finalRGB = finalRGB * (1.0 - pOverlay.a) + pOverlay.rgb;
        }






        if (uEnableGodRays > 0.5 && uGodRaysOpacity > 0.001) {
            vec2 uvGr1 = (vUv - 0.5) * uGodRaysCoverScale1 + 0.5;
            vec2 uvGr2 = (vUv - 0.5) * uGodRaysCoverScale2 + 0.5;
            uvGr1 = uGodRaysRect1.xy + uvGr1 * uGodRaysRect1.zw;
            uvGr2 = uGodRaysRect2.xy + uvGr2 * uGodRaysRect2.zw;
            vec3 rays = mix(
                texture2D(uGodRaysTex1, uvGr1).rgb,
                texture2D(uGodRaysTex2, uvGr2).rgb,
                uGodRaysBlend
            );
            finalRGB += rays * uGodRaysOpacity;
        }





        if (uRippleStrength > 0.0) {
            float rt = uRippleTime;
            vec2 centered = vUv - 0.5;
            centered.x *= uViewportAspect;
            float dist = length(centered) * 2.0;
            float speed = mix(1.6, 6.0, clamp(rt / 3.0, 0.0, 1.0));



            float waveFront = mix(1.8, -0.9, fract(rt * speed));
            float hw = uRippleHw;
            float pulse = smoothstep(waveFront - hw, waveFront, dist)
                        * smoothstep(waveFront + hw, waveFront, dist);
            float rIntensity = smoothstep(0.0, 0.4, rt) * uRippleStrength;
            finalRGB += vec3(0.773, 1.0, 0.796) * pulse * rIntensity;
        }





        if (uEnableNoise > 0.5 && uNoiseStrength > 0.001) {
            vec2 noiseUv = gl_FragCoord.xy * 0.00390625 + uNoiseOffset;
            float n = texture2D(uNoiseTex, noiseUv).r;
            finalRGB += (n - 0.5) * uNoiseStrength;
        }


        finalRGB *= uExposure;


        finalRGB.g *= mix(1.0, 0.15, uRedTint);
        finalRGB.b *= mix(1.0, 0.10, uRedTint);
        float luma = dot(finalRGB, vec3(0.2126, 0.7152, 0.0722));
        finalRGB = mix(vec3(luma), finalRGB, uSaturation);
        finalRGB = clamp((finalRGB - 0.5) * uContrast + 0.5, 0.0, 1.0);
        finalRGB = linearToSRGB(finalRGB);

        gl_FragColor = vec4(finalRGB, sceneColor.a);
    }
`;function xv(){let e=wp.FOREGROUND,t=new Kt(new Uint8Array(4),1,1);t.needsUpdate=!0;let i=gv(),r=new lt({vertexShader:_v,fragmentShader:vv,uniforms:{tDiffuse:{value:null},uOverlayTextureA:{value:new Kt(new Uint8Array(4),1,1)},uOverlayTextureB:{value:new Kt(new Uint8Array(4),1,1)},uProgress:{value:0},uOpacity:{value:e.DEFAULT_OPACITY},uEnableOverlay:{value:e.ENABLE_OVERLAY_DEFAULT},uOverlayCenterReveal:{value:10},uTime:{value:0},uEnableNoise:{value:0},uNoiseStrength:{value:0},uNoiseTex:{value:i},uNoiseOffset:{value:new oe(0,0)},uViewportAspect:{value:1},uCoverScaleA:{value:new oe(1,1)},uCoverScaleB:{value:new oe(1,1)},uGodRaysTex1:{value:t},uGodRaysTex2:{value:t},uGodRaysBlend:{value:0},uGodRaysCoverScale1:{value:new oe(1,1)},uGodRaysCoverScale2:{value:new oe(1,1)},uGodRaysRect1:{value:new et(0,0,1,1)},uGodRaysRect2:{value:new et(0,0,1,1)},uGodRaysOpacity:{value:0},uEnableGodRays:{value:0},uRippleTime:{value:0},uRippleStrength:{value:0},uRippleHw:{value:.75},uHoverFrostTex:{value:t},uHoverFrostCoverScale:{value:new oe(1,1)},uHoverPos:{value:new oe(.5,.5)},uHoverRadius:{value:.26},uHoverIntensity:{value:0},uHoverGlow:{value:.75},uExposure:{value:1},uContrast:{value:1},uSaturation:{value:1.08},uRedTint:{value:0}},depthWrite:!1,depthTest:!1,blending:0}),a=new gu(r);return a._ownedTextures=[t,i,r.uniforms.uOverlayTextureA.value,r.uniforms.uOverlayTextureB.value],a.dispose=()=>{for(let s of a._ownedTextures)s&&s.dispose();r.dispose()},a}var hc={HIGH:{label:"high",pixelRatio:Math.min(window.devicePixelRatio,2),lensBlur:{enabled:1,maxBlur:16,samples:24,focalRadius:.3,falloff:.3},frosting:{trailHalfRes:!0},postProcessing:{foregroundNoise:2,noiseStrength:.04},coinRing:{segments:24},text:{rtScale:1}},MEDIUM:{label:"medium",pixelRatio:Math.min(window.devicePixelRatio,1.5),lensBlur:{enabled:1,maxBlur:16,samples:16,focalRadius:.3,falloff:.3},frosting:{trailHalfRes:!0},postProcessing:{foregroundNoise:2,noiseStrength:.04},coinRing:{segments:16},text:{rtScale:1}},LOW:{label:"low",pixelRatio:1,lensBlur:{enabled:0,maxBlur:12,samples:16,focalRadius:.35,falloff:.35},frosting:{trailHalfRes:!0},postProcessing:{foregroundNoise:2,noiseStrength:.04},coinRing:{segments:12},text:{rtScale:.75}}},Ea={enabled:!0,sampleWindow:60,downgradeThreshold:22,upgradeThreshold:12,cooldownFrames:180},qn=new class{constructor(){this._tier="HIGH",this._listeners=[],this._frameTimes=new Float32Array(Ea.sampleWindow),this._frameIdx=0,this._frameCount=0,this._frameSum=0,this._framesSinceTierChange=0}get tier(){return this._tier}get preset(){return hc[this._tier]}setTier(e){if(!hc[e]||e===this._tier)return;let t=this._tier;this._tier=e,this._framesSinceTierChange=0,this._frameTimes.fill(0),this._frameIdx=0,this._frameCount=0,this._frameSum=0;for(let i of this._listeners)i(e,t)}onChange(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}sampleFrame(e){if(!Ea.enabled)return;this._framesSinceTierChange++;let t=Ea.sampleWindow,i=e*1e3;if(this._frameSum-=this._frameTimes[this._frameIdx],this._frameTimes[this._frameIdx]=i,this._frameSum+=i,this._frameIdx=(this._frameIdx+1)%t,this._frameCount<t&&this._frameCount++,this._frameCount<t||this._framesSinceTierChange<Ea.cooldownFrames)return;let r=this._frameSum/t;r>Ea.downgradeThreshold?this._tier==="HIGH"?this.setTier("MEDIUM"):this._tier==="MEDIUM"&&this.setTier("LOW"):r<Ea.upgradeThreshold&&(this._tier==="LOW"?this.setTier("MEDIUM"):this._tier==="MEDIUM"&&this.setTier("HIGH"))}},Ev=2;function cc(){let e=qn.preset.text?.rtScale??1;return Math.min(window.devicePixelRatio||1,Ev)*e}var yv=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Sv=`
  precision mediump float;

  uniform sampler2D tDiffuse;
  uniform sampler2D uTextTexture;
  uniform float uBrightness;
  uniform float uSaturation;
  varying vec2 vUv;

  vec3 linearToSRGB(vec3 c) {
    c = clamp(c, 0.0, 1.0);
    return mix(
      1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055,
      c * 12.92,
      vec3(lessThan(c, vec3(0.0031308)))
    );
  }

  void main() {
    vec4 bg   = texture2D(tDiffuse, vUv);
    vec4 text = texture2D(uTextTexture, vUv);



    vec3 textColor = text.a > 0.001 ? text.rgb / text.a : vec3(0.0);


    vec3 adjusted = textColor + uBrightness;


    float luma = dot(adjusted, vec3(0.2126, 0.7152, 0.0722));
    adjusted = mix(vec3(luma), adjusted, uSaturation);



    adjusted = linearToSRGB(adjusted);


    vec3 finalRGB = bg.rgb * (1.0 - text.a) + adjusted * text.a;
    gl_FragColor = vec4(finalRGB, bg.a);
  }
`,Cv=class extends Br{constructor(e,t,i){super(),this._renderer=e,this.needsSwap=!0,this.textScene=new Gi,this.textCamera=new Qs(-t/2,t/2,i/2,-i/2,.1,100),this.textCamera.position.z=10;let r=cc();this.textRT=new jt(Math.floor(t*r),Math.floor(i*r),{minFilter:qe,magFilter:qe,format:mt}),this.compositeMaterial=new lt({vertexShader:yv,fragmentShader:Sv,uniforms:{tDiffuse:{value:null},uTextTexture:{value:null},uBrightness:{value:0},uSaturation:{value:1}},depthWrite:!1,depthTest:!1}),this.fsQuad=new Cr(this.compositeMaterial),this._clearColor=new ye}_hasVisibleSprites(){let e=this.textScene.children;for(let t=0;t<e.length;t++)if(e[t].visible)return!0;return!1}render(e,t,i){let r=e.getClearColor(this._clearColor),a=e.getClearAlpha();e.setRenderTarget(this.textRT),e.setClearColor(0,0),e.clear(!0,!0,!1),e.render(this.textScene,this.textCamera),this.compositeMaterial.uniforms.tDiffuse.value=i.texture,this.compositeMaterial.uniforms.uTextTexture.value=this.textRT.texture,this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(t),this.fsQuad.render(e),e.setClearColor(r,a)}warmUp(){let e=[];this.textScene.traverse(t=>{t.isMesh&&!t.visible&&(t.visible=!0,e.push(t))}),this._renderer.setRenderTarget(this.textRT),this._renderer.setClearColor(0,0),this._renderer.clear(!0,!0,!1),this._renderer.render(this.textScene,this.textCamera),this._renderer.setRenderTarget(null);for(let t=0;t<e.length;t++)e[t].visible=!1}setSize(e,t){let i=this._renderer.getPixelRatio(),r=Math.round(e/i),a=Math.round(t/i),s=cc();this.textRT.setSize(Math.floor(r*s),Math.floor(a*s)),this.textCamera.left=-r/2,this.textCamera.right=r/2,this.textCamera.top=a/2,this.textCamera.bottom=-a/2,this.textCamera.updateProjectionMatrix()}dispose(){this.textRT.dispose(),this.compositeMaterial.dispose(),this.fsQuad.dispose()}},vE={GLOBAL_TIME_SCALE:1,DEFAULT_FPS_TIMESTEP:1/60,TEXT:{APPEAR_DURATION_MS:700,BLUR_STRENGTH_DESKTOP:1,BLUR_TAPS:5,ATLAS_PADDING:0},IS_MOBILE_DEFAULT:!1,SCROLL:{HAUNTING_BASE_SPEED:.1,HAUNTING_MAX_SPEED_MULTIPLIER:2,VELOCITY_SMOOTHING:.1},BLENDER:{TRANSITION_DURATION:1,MAX_BAKED_TEXTURES:30},FROSTING:{REFRACTION_STRENGTH:.5,DISTORTION_AMOUNT:.2,LIGHT_INTENSITY:1,ENV_CONTRIBUTION:.5,ENABLE_REFRACTION:1,ENABLE_ENV:1}};function Ll(e){let t=new Map,i=new Map,r=e.clone();return bp(e,r,function(a,s){t.set(s,a),i.set(a,s)}),r.traverse(function(a){if(!a.isSkinnedMesh)return;let s=a,n=t.get(a),o=n.skeleton.bones;s.skeleton=n.skeleton.clone(),s.bindMatrix.copy(n.bindMatrix),s.skeleton.bones=o.map(function(u){return i.get(u)}),s.bind(s.skeleton,s.bindMatrix)}),r}function bp(e,t,i){i(e,t);for(let r=0;r<e.children.length;r++)bp(e.children[r],t.children[r],i)}var ya=.5,dc=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Mv=`
  precision mediump float;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(tDiffuse, vUv);
  }
`,Iv=`
  varying vec2 vUv;
  varying vec3 vViewNormal;
  varying vec3 vViewPosition;
  void main() {
    vUv = uv;
    vViewNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`,Tv=`
  precision mediump float;


  uniform sampler2D uMapA;
  uniform sampler2D uMapB;
  uniform float uBlend;
  uniform float uFresnelPower;
  varying vec2 vUv;
  varying vec3 vViewNormal;
  varying vec3 vViewPosition;

  void main() {
    float edge = pow(1.0 - abs(dot(normalize(vViewNormal), normalize(-vViewPosition))), uFresnelPower);
    gl_FragColor = vec4(vec3(0.12 + edge * 0.65), 0.035 + edge * 0.26);
  }
`,wv=`
  precision mediump float;
  uniform sampler2D tDiffuse;
  uniform sampler2D uShatter;
  uniform sampler2D uHandMask;
  varying vec2 vUv;

  vec3 linearToSRGB(vec3 c) {
    c = clamp(c, 0.0, 1.0);
    return mix(
      1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055,
      c * 12.92,
      vec3(lessThan(c, vec3(0.0031308)))
    );
  }

  void main() {
    vec4 live    = texture2D(tDiffuse, vUv);
    vec4 shatter = texture2D(uShatter, vUv);
    float handMask = texture2D(uHandMask, vUv).r;


    float mask = shatter.a * (1.0 - handMask);



    gl_FragColor = vec4(mix(live.rgb, linearToSRGB(shatter.rgb), mask), 1.0);
  }
`,bv=class extends Br{constructor(t,i,r){super();Cu(this,"_handleFinished",()=>{this._finished=!0,this._onComplete&&this._onComplete()});this.needsSwap=!0,this.enabled=!1,this._renderer=t;let a=t.getPixelRatio(),s=Math.floor(i*a),n=Math.floor(r*a),o={minFilter:qe,magFilter:qe,format:mt,depthBuffer:!0,stencilBuffer:!1},u=Math.max(1,Math.floor(s*ya)),h=Math.max(1,Math.floor(n*ya));this.shatterRT=new jt(u,h,o),this.handMaskRT=new jt(u,h,o),this._copyMaterial=new lt({vertexShader:dc,fragmentShader:Mv,uniforms:{tDiffuse:{value:null}},depthWrite:!1,depthTest:!1}),this._copyQuad=new Cr(this._copyMaterial),this._compositeMaterial=new lt({vertexShader:dc,fragmentShader:wv,uniforms:{tDiffuse:{value:null},uShatter:{value:null},uHandMask:{value:null}},depthWrite:!1,depthTest:!1}),this._compositeQuad=new Cr(this._compositeMaterial),this._shardScene=new Gi,this._shardCamera=null,this._snapshotTexture=null,this._shardMaterial=null,this._handMaskScene=new Gi,this._handCamera=null,this._handMaskMaterial=new Si({color:16777215}),this._handMeshProxy=null,this._mixer=null,this._actions=[],this._duration=0,this._model=null,this._onComplete=null,this._finished=!1,this._scrubMode=!1,this._clearColor=new ye}setShatterTextures(t,i){if(t){for(let r of[t,i])r&&(r.colorSpace=Ye,r.flipY=!0,r.needsUpdate=!0);if(this._shardMaterial){this._shardMaterial.uniforms.uMapA.value=t,this._shardMaterial.uniforms.uMapB.value=i||t,this._shardMaterial.uniforms.uBlend.value=0;return}this._shardMaterial=new lt({vertexShader:Iv,fragmentShader:Tv,uniforms:{uMapA:{value:t},uMapB:{value:i||t},uBlend:{value:0},uFresnelPower:{value:2.5}},side:2})}}prewarm(t,i,r=null,a=null,s=null){if(this._prewarmed)return;if(this._prewarmed=!0,a&&(this._precloneSrc=a,this._preclone=Ll(a)),!this._shardMaterial){let h=new Kt(new Uint8Array([0,0,0,255]),1,1);h.needsUpdate=!0,this.setShatterTextures(h,null)}a&&s&&this.startScrub(a,s);let n=new Gi,o=new ia(1,1);for(let h of[this._shardMaterial,this._compositeMaterial,this._copyMaterial])h&&n.add(new dt(o,h));if(t.compile(n,i),this._shardScene&&t.compile(this._shardScene,this._shardCamera||i),r&&r.isSkinnedMesh&&(this.setHandSource(r,i),t.compile(this._handMaskScene,i),this.clearHandSource()),o.dispose(),this._shardScene&&this._shardCamera){let h=new jt(1,1),d=t.getRenderTarget();t.setRenderTarget(h),t.render(this._shardScene,this._shardCamera),this._handMaskScene&&this._handCamera&&t.render(this._handMaskScene,this._handCamera),t.setRenderTarget(d),h.dispose()}let u=t.getRenderTarget();for(let h of[this.shatterRT,this.handMaskRT])h&&(t.setRenderTarget(h),t.clear());t.setRenderTarget(u)}setShatterBlend(t){this._shardMaterial&&(this._shardMaterial.uniforms.uBlend.value=t)}setHandSource(t,i){if(this.clearHandSource(),this._handCamera=i,!t)return;if(!t.isSkinnedMesh||!t.bindMatrix){console.warn("ShatterPass.setHandSource: hand ref is not a SkinnedMesh \u2014 check the GLB export (node name + armature/skin intact). Hand mask disabled.");return}let r=new fd(t.geometry,this._handMaskMaterial);r.skeleton=t.skeleton,r.bindMatrix.copy(t.bindMatrix),r.bindMatrixInverse.copy(t.bindMatrixInverse),r.frustumCulled=!1,this._handMeshProxy=r,this._handSourceMesh=t,this._handMaskScene.add(r)}clearHandSource(){this._handMeshProxy&&(this._handMeshProxy=(this._handMaskScene.remove(this._handMeshProxy),null)),this._handSourceMesh=null,this._handCamera=null}start(t,i,r){this._onComplete=r,this._setupModel(t,i,!1)}startScrub(t,i){this._setupModel(t,i,!0)}scrub(t){if(!this._scrubMode||!this._actions.length||!this._duration)return;let i=this._duration*Math.min(Math.max(t,0),1);for(let r of this._actions)r.time=i}render(t,i,r,a){if(!this._model){this._copyMaterial.uniforms.tDiffuse.value=r.texture,this.renderToScreen?t.setRenderTarget(null):t.setRenderTarget(i),this._copyQuad.render(t);return}this._mixer&&!this._finished&&(this._scrubMode?this._mixer.update(0):this._mixer.update(a));let s=t.getClearColor(this._clearColor),n=t.getClearAlpha();t.setRenderTarget(this.shatterRT),t.setClearColor(0,0),t.clear(!0,!0,!1),this._shardCamera&&t.render(this._shardScene,this._shardCamera),t.setRenderTarget(this.handMaskRT),t.setClearColor(0,1),t.clear(!0,!0,!1),this._handMeshProxy&&this._handCamera&&(this._handMeshProxy.matrixWorld.copy(this._handSourceMesh.matrixWorld),this._handMeshProxy.matrixWorldNeedsUpdate=!1,t.render(this._handMaskScene,this._handCamera)),t.setClearColor(s,n),this._compositeMaterial.uniforms.tDiffuse.value=r.texture,this._compositeMaterial.uniforms.uShatter.value=this.shatterRT.texture,this._compositeMaterial.uniforms.uHandMask.value=this.handMaskRT.texture,this.renderToScreen?t.setRenderTarget(null):t.setRenderTarget(i),this._compositeQuad.render(t)}_setupModel(t,i,r){if(this._model&&this._setupSrc===t&&this._scrubMode===r){this._finished=!1;for(let s of this._actions)s.reset(),s.play(),s.time=0;this._mixer&&this._mixer.update(0);return}this._setupSrc=t,this._finished=!1,this._scrubMode=r,this._onComplete=r?null:this._onComplete,this._preclone&&this._precloneSrc===t?(this._model=this._preclone,this._preclone=null,this._precloneSrc=null):this._model=Ll(t);let a=null;if(this._model.traverse(s=>{(s.isPerspectiveCamera||s.isOrthographicCamera)&&(a=s,console.log("ShatterPass: baked camera found",{type:s.isPerspectiveCamera?"perspective":"ortho",fov:s.fov,position:s.position.toArray(),rotation:s.rotation.toArray()}))}),this._model.traverse(s=>{(s.isMesh||s.isSkinnedMesh)&&(this._shardMaterial&&(s.material=this._shardMaterial),s.frustumCulled=!1)}),this._shardScene.add(this._model),a)this._shardCamera=a;else{let s=this.shatterRT.width/this.shatterRT.height;this._shardCamera=new zt(35,s,.01,100),this._shardCamera.position.set(0,0,2),this._shardCamera.lookAt(0,0,0),this._shardScene.add(this._shardCamera)}if(this._actions=[],this._duration=0,i&&i.length>0){this._mixer=new Td(this._model);for(let s of i){let n=this._mixer.clipAction(s);n.setLoop(Dc),n.clampWhenFinished=!0,n.play(),r&&(n.paused=!0),this._actions.push(n),s.duration>this._duration&&(this._duration=s.duration)}r||this._mixer.addEventListener("finished",this._handleFinished)}}setSize(t,i){let r=this._renderer.getPixelRatio(),a=Math.floor(t*r),s=Math.floor(i*r);this.shatterRT.setSize(Math.max(1,Math.floor(a*ya)),Math.max(1,Math.floor(s*ya))),this.handMaskRT.setSize(Math.max(1,Math.floor(a*ya)),Math.max(1,Math.floor(s*ya))),this._shardCamera&&this._shardCamera.isPerspectiveCamera&&(this._shardCamera.aspect=a/s,this._shardCamera.updateProjectionMatrix())}cleanup(){this._mixer&&(this._mixer=(this._mixer.removeEventListener("finished",this._handleFinished),this._mixer.stopAllAction(),null)),this._model&&(this._model=(this._shardScene.remove(this._model),this._model.traverse(t=>{(t.isMesh||t.isSkinnedMesh)&&t.geometry&&t.geometry.dispose()}),null)),this._shardCamera&&this._shardScene.children.includes(this._shardCamera)&&this._shardScene.remove(this._shardCamera),this._shardCamera=null,this._onComplete=null,this._snapshotTexture=null,this._finished=!1,this._scrubMode=!1,this._actions=[],this._duration=0,this.clearHandSource()}dispose(){this.cleanup(),this.shatterRT.dispose(),this.handMaskRT.dispose(),this._copyMaterial.dispose(),this._compositeMaterial.dispose(),this._handMaskMaterial.dispose(),this._shardMaterial&&this._shardMaterial.dispose(),this._copyQuad.dispose(),this._compositeQuad.dispose()}},Bv=`
  varying vec3 vViewNormal;
  varying vec2 vUv;
  void main() {
    vViewNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Rv=`
  precision mediump float;
  varying vec3 vViewNormal;
  varying vec2 vUv;
  void main() {
    vec3 n = normalize(vViewNormal);
    gl_FragColor = vec4(n.xy * 0.5 + 0.5, fract(vUv));
  }
`,Pv=`
  precision mediump float;

  uniform sampler2D tDiffuse;
  uniform sampler2D uNormalMask;
  uniform sampler2D uRefractionMap;

  uniform float uRefraction;
  uniform float uDispersion;
  uniform float uMapStrength;
  uniform vec2  uMapScale;
  uniform vec3  uTintColor;
  uniform float uFresnelPower;
  uniform vec2  uPixelSize;
  uniform float uEdgeHighlight;

  varying vec2 vUv;

  void main() {
    vec4 m = texture2D(uNormalMask, vUv);


    vec4 live = texture2D(tDiffuse, vUv);
    if (m.r + m.g < 0.01) {
      gl_FragColor = live;
      return;
    }


    vec2 nxy = m.rg * 2.0 - 1.0;
    float nz  = sqrt(max(0.0, 1.0 - dot(nxy, nxy)));


    float rm = texture2D(uRefractionMap, m.ba * uMapScale).r;


    vec2 offset = nxy * uRefraction + (rm - 0.5) * uMapStrength * nxy;


    vec3 glass;
    if (uDispersion < 0.001) {
      glass = texture2D(tDiffuse, vUv + offset).rgb;
    } else {
      glass = vec3(
        texture2D(tDiffuse, vUv + offset * (1.0 - uDispersion)).r,
        texture2D(tDiffuse, vUv + offset).g,
        texture2D(tDiffuse, vUv + offset * (1.0 + uDispersion)).b
      );
    }


    glass *= uTintColor;


    float fresnel = 0.04 + 0.96 * pow(1.0 - nz, uFresnelPower);
    glass += vec3(0.92, 0.95, 1.0) * fresnel;


    if (uEdgeHighlight > 0.001) {
      vec2 nL = texture2D(uNormalMask, vUv + vec2(-uPixelSize.x, 0.0)).rg;
      vec2 nR = texture2D(uNormalMask, vUv + vec2( uPixelSize.x, 0.0)).rg;
      vec2 nT = texture2D(uNormalMask, vUv + vec2(0.0,  uPixelSize.y)).rg;
      vec2 nB = texture2D(uNormalMask, vUv + vec2(0.0, -uPixelSize.y)).rg;
      float dN = length(nR - nL) + length(nT - nB);
      glass += vec3(1.0) * smoothstep(0.02, 0.15, dN) * uEdgeHighlight;
    }


    gl_FragColor = vec4(mix(live.rgb, glass, 1.0), live.a);
  }
`,Lv=class extends Br{constructor(e,t,i){super(),this.needsSwap=!0,this.enabled=!1,this._renderer=e;let r=e.getPixelRatio(),a=Math.floor(t*r),s=Math.floor(i*r);this._maskRT=new jt(a,s,{minFilter:qe,magFilter:qe,format:mt,depthBuffer:!0,stencilBuffer:!1}),this._maskMaterial=new lt({vertexShader:Bv,fragmentShader:Rv,side:2}),this._maskScene=new Gi,this._bgMaskScene=new Gi,this._overlayScene=new Gi,this._camera=null,this._shardMeshes=[],this._overlayProxies=[],this._shardGroup=null,this._bgProxies=[],this._occluderScene=null,this._depthMaterial=new Si({colorWrite:!1});let n=new Uint8Array([0,0,0,0]);this._fallbackTex=new Kt(n,1,1,mt),this._fallbackTex.needsUpdate=!0,this._compositeMaterial=new lt({vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:Pv,uniforms:{tDiffuse:{value:this._fallbackTex},uNormalMask:{value:this._fallbackTex},uRefractionMap:{value:this._fallbackTex},uRefraction:{value:.25},uDispersion:{value:.15},uMapStrength:{value:2},uMapScale:{value:new oe(1,1)},uTintColor:{value:new P(1,1,1)},uFresnelPower:{value:10},uPixelSize:{value:new oe(1/a,1/s)},uEdgeHighlight:{value:.15}},depthWrite:!1,depthTest:!1}),this._compositeQuad=new Cr(this._compositeMaterial),this._proxies=[],this._clearColor=new ye}get uniforms(){return this._compositeMaterial.uniforms}setRefractionMap(e,t=.3,i=1,r=1){e.wrapS=yi,e.wrapT=yi;let a=this._compositeMaterial.uniforms;a.uRefractionMap.value=e,a.uMapStrength.value=t,a.uMapScale.value.set(i,r)}prewarm(e,t){if(this._prewarmed)return;this._prewarmed=!0;let i=new Gi,r=new ia(1,1);for(let s of[this._maskMaterial,this._depthMaterial,this._compositeMaterial])s&&i.add(new dt(r,s));e.compile(i,t),r.dispose();let a=e.getRenderTarget();e.setRenderTarget(this._maskRT),e.clear(),e.setRenderTarget(a)}setShards(e,t,i=null){this.clearShards(),this._camera=t,this._shardGroup=e.group,this._occluderScene=i;for(let r of e.shards){let a=!!r.userData.isBackground;r.traverse(s=>{if(!(!s.isMesh&&!s.isSkinnedMesh))if(s.userData.isOverlay){s.visible=!1;let n=new dt(s.geometry,s.material);n.frustumCulled=!1,n.matrixAutoUpdate=!1,this._overlayScene.add(n),this._overlayProxies.push({source:s,proxy:n})}else{let n=new dt(s.geometry,this._maskMaterial);n.frustumCulled=!1,n.matrixAutoUpdate=!1,a?(this._bgMaskScene.add(n),this._bgProxies.push({source:s,proxy:n})):(this._maskScene.add(n),this._proxies.push({source:s,proxy:n})),s.visible=!1,this._shardMeshes.push(s)}})}this.enabled=!0}clearShards(){for(let{proxy:e}of this._proxies)this._maskScene.remove(e);for(let{proxy:e}of this._bgProxies)this._bgMaskScene.remove(e);for(let{source:e,proxy:t}of this._overlayProxies)this._overlayScene.remove(t),e.visible=!0;for(let e of this._shardMeshes)e.visible=!0;this._proxies=[],this._bgProxies=[],this._shardMeshes=[],this._overlayProxies=[],this._shardGroup=null,this._camera=null,this._occluderScene=null,this.enabled=!1}render(e,t,i){for(let{source:o,proxy:u}of this._proxies)o.updateWorldMatrix(!0,!1),u.matrix.copy(o.matrixWorld),u.matrixWorldNeedsUpdate=!0;for(let{source:o,proxy:u}of this._bgProxies)o.updateWorldMatrix(!0,!1),u.matrix.copy(o.matrixWorld),u.matrixWorldNeedsUpdate=!0;let r=e.getClearColor(this._clearColor),a=e.getClearAlpha(),s=e.autoClear;if(e.setRenderTarget(this._maskRT),e.setClearColor(0,0),e.autoClear=!1,e.clear(!0,!0,!1),this._camera&&(e.render(this._maskScene,this._camera),this._bgProxies.length)){if(this._occluderScene){let o=this._occluderScene.overrideMaterial;this._occluderScene.overrideMaterial=this._depthMaterial,e.render(this._occluderScene,this._camera),this._occluderScene.overrideMaterial=o}e.render(this._bgMaskScene,this._camera)}e.autoClear=s,e.setClearColor(r,a),this._compositeMaterial.uniforms.tDiffuse.value=i.texture,this._compositeMaterial.uniforms.uNormalMask.value=this._maskRT.texture;let n=this.renderToScreen?null:t;if(e.setRenderTarget(n),this._compositeQuad.render(e),this._overlayProxies.length&&this._camera){for(let{source:o,proxy:u}of this._overlayProxies)o.updateWorldMatrix(!0,!1),u.matrix.copy(o.matrixWorld),u.matrixWorldNeedsUpdate=!0;e.autoClear=!1,e.render(this._overlayScene,this._camera),e.autoClear=!0}}setSize(e,t){let i=this._renderer.getPixelRatio(),r=Math.floor(e*i),a=Math.floor(t*i);this._maskRT.setSize(r,a),this._compositeMaterial.uniforms.uPixelSize.value.set(1/r,1/a)}dispose(){this.clearShards(),this._maskRT.dispose(),this._maskMaterial.dispose(),this._depthMaterial.dispose(),this._compositeMaterial.dispose(),this._compositeQuad.dispose(),this._fallbackTex.dispose()}},il=`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,Dv=`
    precision mediump float;
    uniform sampler2D tDiffuse;
    uniform vec2 uHalfPixel;
    varying vec2 vUv;

    void main() {
        vec4 sum = texture2D(tDiffuse, vUv) * 4.0;
        sum += texture2D(tDiffuse, vUv - uHalfPixel);
        sum += texture2D(tDiffuse, vUv + uHalfPixel);
        sum += texture2D(tDiffuse, vUv + vec2(uHalfPixel.x, -uHalfPixel.y));
        sum += texture2D(tDiffuse, vUv - vec2(uHalfPixel.x, -uHalfPixel.y));
        gl_FragColor = sum / 8.0;
    }
`,Uv=`
    precision mediump float;
    uniform sampler2D tDiffuse;
    uniform vec2 uHalfPixel;
    varying vec2 vUv;

    void main() {
        vec4 sum = vec4(0.0);

        sum += texture2D(tDiffuse, vUv + vec2(-uHalfPixel.x * 2.0, 0.0));
        sum += texture2D(tDiffuse, vUv + vec2( uHalfPixel.x * 2.0, 0.0));
        sum += texture2D(tDiffuse, vUv + vec2(0.0, -uHalfPixel.y * 2.0));
        sum += texture2D(tDiffuse, vUv + vec2(0.0,  uHalfPixel.y * 2.0));

        sum += texture2D(tDiffuse, vUv + vec2(-uHalfPixel.x, -uHalfPixel.y)) * 2.0;
        sum += texture2D(tDiffuse, vUv + vec2( uHalfPixel.x, -uHalfPixel.y)) * 2.0;
        sum += texture2D(tDiffuse, vUv + vec2(-uHalfPixel.x,  uHalfPixel.y)) * 2.0;
        sum += texture2D(tDiffuse, vUv + vec2( uHalfPixel.x,  uHalfPixel.y)) * 2.0;
        gl_FragColor = sum / 12.0;
    }
`,Nv=`
    precision mediump float;
    uniform sampler2D tOriginal;
    uniform sampler2D tBlurred;
    uniform vec2  uFocalPoint;
    uniform float uFocalRadius;
    uniform float uFalloff;
    uniform vec2  uResolution;
    varying vec2 vUv;

    void main() {
        float aspect = uResolution.x / uResolution.y;
        vec2 delta = (vUv - uFocalPoint) * vec2(aspect, 1.0);
        float dist = length(delta);
        float blend = smoothstep(uFocalRadius, uFocalRadius + uFalloff, dist);
        gl_FragColor = mix(
            texture2D(tOriginal, vUv),
            texture2D(tBlurred, vUv),
            blend
        );
    }
`,pc=typeof matchMedia<"u"&&matchMedia("(pointer: coarse)").matches;function Fv(e,t){return new jt(Math.max(1,e),Math.max(1,t),{minFilter:qe,magFilter:qe,format:mt,depthBuffer:!1,stencilBuffer:!1})}var Qv=class extends Br{constructor(){super(),this.needsSwap=!0;let e=wp.LENS_BLUR,t=Math.min(window.devicePixelRatio,2),i=Math.floor(window.innerWidth*t),r=Math.floor(window.innerHeight*t);this._iterations=pc?2:3,this._rts=[];let a=i,s=r;for(let o=0;o<this._iterations;o++)a=Math.max(1,a>>1),s=Math.max(1,s>>1),this._rts.push(Fv(a,s));this._downMat=new lt({vertexShader:il,fragmentShader:Dv,uniforms:{tDiffuse:{value:null},uHalfPixel:{value:new oe}},depthWrite:!1,depthTest:!1}),this._downQuad=new Cr(this._downMat),this._upMat=new lt({vertexShader:il,fragmentShader:Uv,uniforms:{tDiffuse:{value:null},uHalfPixel:{value:new oe}},depthWrite:!1,depthTest:!1}),this._upQuad=new Cr(this._upMat);let n=pc?e.MAX_BLUR*e.MOBILE_BLUR_SCALE:e.MAX_BLUR;this._compositeMat=new lt({vertexShader:il,fragmentShader:Nv,uniforms:{tOriginal:{value:null},tBlurred:{value:null},uFocalPoint:{value:new oe(.5,.5)},uFocalRadius:{value:e.FOCAL_RADIUS},uFalloff:{value:e.FALLOFF},uResolution:{value:new oe(i,r)},uMaxBlur:{value:n},uEnabled:{value:e.ENABLED}},depthWrite:!1,depthTest:!1}),this._compositeQuad=new Cr(this._compositeMat)}get uniforms(){return this._compositeMat.uniforms}render(e,t,i){let r=this._compositeMat.uniforms,a=r.uEnabled.value>=.5&&r.uMaxBlur.value>=.01;if(this.needsSwap=a,!a)return;let s=i.texture,n=i.width,o=i.height;for(let u=0;u<this._iterations;u++){let h=this._rts[u];this._downMat.uniforms.tDiffuse.value=s,this._downMat.uniforms.uHalfPixel.value.set(.5/n,.5/o),e.setRenderTarget(h),this._downQuad.render(e),s=h.texture,n=h.width,o=h.height}for(let u=this._iterations-1;u>0;u--){let h=this._rts[u-1];this._upMat.uniforms.tDiffuse.value=this._rts[u].texture,this._upMat.uniforms.uHalfPixel.value.set(.5/this._rts[u].width,.5/this._rts[u].height),e.setRenderTarget(h),this._upQuad.render(e)}r.tOriginal.value=i.texture,r.tBlurred.value=this._rts[0].texture,e.setRenderTarget(this.renderToScreen?null:t),this._compositeQuad.render(e)}setSize(e,t){this._compositeMat.uniforms.uResolution.value.set(e,t);let i=e,r=t;for(let a=0;a<this._iterations;a++)i=Math.max(1,i>>1),r=Math.max(1,r>>1),this._rts[a].setSize(i,r)}dispose(){for(let e of this._rts)e.dispose();this._downMat.dispose(),this._downQuad.dispose(),this._upMat.dispose(),this._upQuad.dispose(),this._compositeMat.dispose(),this._compositeQuad.dispose()}};function Ov(e){return e<0?0:e>1?1:e}function kt(e,t,i){return Ov((e-t)/(i-t))}new P,new _t().setFromAxisAngle(new P(1,0,0),-Math.PI/2);var xE=new _t,EE=new P(0,0,1),rl=()=>new Promise(e=>requestAnimationFrame(e)),kv=100,al=new Set,fc=0,yn=null;function Bp(e,t){if(t==null||al.has(t)||e._xpReplaySkip)return;al.add(t);let i=al.size*kv,r=fc;if(i===r)return;fc=i,Je.play("xp-topup");let a=e.ui.xpCounter;a.classList.remove("xp-ripple"),a.offsetWidth,a.classList.add("xp-ripple"),a.addEventListener("animationend",()=>a.classList.remove("xp-ripple"),{once:!0});let s={val:r},n=e.ui._xpValue,o=n.firstChild;if(!o||o.nodeType!==3){for(;n.firstChild;)n.removeChild(n.firstChild);o=document.createTextNode(""),n.appendChild(o)}yn&&yn.kill(),yn=mr.to(s,{val:i,duration:2,ease:"power2.out",onUpdate(){o.nodeValue=Math.round(s.val)},onComplete(){o.nodeValue=String(i),yn=null}})}function Rp(e,t={}){let i=new Dt;return i.colorSpace=t.srgb===!1?Ct:Ye,fetch(e).then(r=>r.blob()).then(r=>createImageBitmap(r,{imageOrientation:"flipY",premultiplyAlpha:"none",colorSpaceConversion:"none"})).then(r=>{i.image=r,i.flipY=!1,i.needsUpdate=!0;let a=t.assetLoader&&t.assetLoader.renderer||t.renderer;a&&a.initTexture&&a.initTexture(i)}).catch(r=>console.warn(`_loadTextureBitmap failed: ${e}`,r)),i}var Gv=(window.matchMedia("(pointer: coarse)").matches,"assets/videos/stage2_background_video-mobile.mp4"),Hv="position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-1";function Dl(e=""){e="/assets/reference/";let t=document.createElement("video");return t.muted=!0,t.defaultMuted=!0,t.playsInline=!0,t.setAttribute("playsinline",""),t.setAttribute("webkit-playsinline",""),t.loop=!0,t.preload="auto",t.crossOrigin="anonymous",t.src=`${e}${Gv}`,t.style.cssText=Hv,document.body.appendChild(t),eo(t),t}function eo(e){if(!e)return;let t=e.play();!t||typeof t.then!="function"||t.catch(()=>{if(e.__retryArmed)return;e.__retryArmed=!0;let i=()=>{e.__retryArmed=!1,window.removeEventListener("pointerdown",i,!0),window.removeEventListener("touchstart",i,!0),window.removeEventListener("keydown",i,!0),eo(e)};window.addEventListener("pointerdown",i,{capture:!0,once:!0}),window.addEventListener("touchstart",i,{capture:!0,once:!0}),window.addEventListener("keydown",i,{capture:!0,once:!0})})}function Pp(e,t){let i=!1,r=()=>{i||(i=!0,t())};if(e.readyState>=2){queueMicrotask(r);return}e.addEventListener("loadeddata",r,{once:!0}),e.addEventListener("canplay",r,{once:!0}),typeof e.requestVideoFrameCallback=="function"&&e.requestVideoFrameCallback(()=>r())}function Ul(e){if(e){try{e.pause()}catch{}e.removeAttribute("src");try{e.load()}catch{}e.parentNode&&e.parentNode.removeChild(e)}}var zv=1.5,Vv=3072;function Bi(e,t,i,r,a=!1){let s=zv,n=Vv,o=a?r:i,u=a?i:r,h=e*s,d=t*s,l=o*s,c=u*s;return{offset:[h/n,1-(d+c)/n],scale:[l/n,c/n]}}function Ri(e,t){return e/t}var Wv=`
    varying vec2 vUv;

    #include <skinning_pars_vertex>

    void main() {
        vUv = uv;

        #include <skinbase_vertex>
        #include <begin_vertex>
        #include <skinning_vertex>
        #include <project_vertex>
    }
`,qv=`
    precision mediump float;

    uniform sampler2D uTextureA;
    uniform sampler2D uTextureB;




    uniform vec2 uTexOffsetA;
    uniform vec2 uTexScaleA;
    uniform vec2 uTexOffsetB;
    uniform vec2 uTexScaleB;
    uniform float uProgress;
    uniform float uOpacity;





    uniform sampler2D uAlphaMap;
    uniform vec2 uAlphaOffset;
    uniform vec2 uAlphaScale;

    #ifdef USE_RIPPLE
        uniform float uRippleTime;
        uniform float uRippleIntensity;
        uniform vec2  uRippleResolution;
        uniform float uRippleHw;
    #endif

    varying vec2 vUv;

    void main() {



        vec4 colorA = texture2D(uTextureA, vUv * uTexScaleA + uTexOffsetA);
        vec4 colorB = texture2D(uTextureB, vUv * uTexScaleB + uTexOffsetB);



        vec4 pA = vec4(colorA.rgb * colorA.a, colorA.a);
        vec4 pB = vec4(colorB.rgb * colorB.a, colorB.a);
        vec4 pMix = mix(pA, pB, uProgress);




        float alphaMask = texture2D(uAlphaMap, vUv * uAlphaScale + uAlphaOffset).r;
        float outA = pMix.a * uOpacity * alphaMask;
        vec3 outRGB = pMix.rgb * uOpacity * alphaMask;

        #ifdef USE_RIPPLE
            if (uRippleIntensity > 0.001) {
                vec2 screenUv = gl_FragCoord.xy / uRippleResolution;
                vec2 centered = screenUv - 0.5;
                centered.x *= uRippleResolution.x / uRippleResolution.y;
                float dist = length(centered) * 2.0;
                float speed = mix(1.6, 6.0, clamp(uRippleTime / 3.0, 0.0, 1.0));
                float waveFront = mix(1.8, -0.9, fract(uRippleTime * speed));
                float hw = uRippleHw;
                float pulse = smoothstep(waveFront - hw, waveFront, dist)
                            * smoothstep(waveFront + hw, waveFront, dist);
                outRGB += vec3(0.773, 1.0, 0.796) * pulse * uRippleIntensity * outA;
            }
        #endif

        gl_FragColor = vec4(outRGB, outA);
    }
`;function Xv({useRipple:e=!0}={}){let t={uTextureA:{value:null},uTextureB:{value:null},uTexOffsetA:{value:new oe(0,0)},uTexScaleA:{value:new oe(1,1)},uTexOffsetB:{value:new oe(0,0)},uTexScaleB:{value:new oe(1,1)},uProgress:{value:0},uOpacity:{value:1},uAlphaMap:{value:null},uAlphaOffset:{value:new oe(0,0)},uAlphaScale:{value:new oe(1,1)}};return e&&(t.uRippleTime={value:0},t.uRippleIntensity={value:0},t.uRippleResolution={value:new oe(1,1)},t.uRippleHw={value:.75}),new lt({vertexShader:Wv,fragmentShader:qv,defines:e?{USE_RIPPLE:""}:{},uniforms:t,transparent:!0,premultipliedAlpha:!0,side:0,depthWrite:!0,depthTest:!0})}var Yv=7e-4,jv=.5,Kv=new P(1,0,0),Jv={1:1,2:.6,3:.35},Zv=["index","middle","ring","pinky","thumb"],$v=1e-5,ex=3,tx=3,ix=class{constructor(){this.group=new Ci,this.group.visible=!1,this._mixers=[],this._actionSets=[],this.duration=0,this.cameraRef=null,this._fingerBones=[],this._fingerIdleTime=0,this._idleWeight=0,this._scrubProgress=0,this._idleQuat=new _t}_cloneModel(e){let t=Ll(e);return t.traverse(i=>{(i.isMesh||i.isSkinnedMesh)&&(i.frustumCulled=!1)}),this.group.add(t),t}_setupMixer(e,t){if(!t||t.length===0)return[];let i=new Td(e),r=[];for(let a of t){let s=i.clipAction(a);s.setLoop(Dc),s.clampWhenFinished=!0,s.play(),s.paused=!0,r.push(s),a.duration>this.duration&&(this.duration=a.duration)}return this._mixers.push(i),this._actionSets.push(r),r}_findCamera(e){e.traverse(t=>{t.name==="Camera"&&t.isPerspectiveCamera&&(this.cameraRef=t)})}_loadTextures(e,t,i){let r=[];for(let a=1;a<=i;a++){let s=e.getAsset(`${t}${a}`);s&&r.push(s)}return r}_loadTexturesByKeys(e,t){let i=[];for(let r of t){let a=e.getAsset(r);a||console.warn(`BaseHandModel._loadTexturesByKeys: missing texture "${r}". Blending will fall back to the nearest available keyframe.`),i.push(a||null)}return i}_framesToProgress(e,t,i=0){return!t||!t.tracks||t.tracks.length===0||this.duration<=0?this._evenTimes(e.length):e.map(r=>(r-i)/30/this.duration)}_evenTimes(e){if(e<=1)return[0];let t=[];for(let i=0;i<e;i++)t.push(i/(e-1));return t}_assignBlenderMaterial(e,t,i,r,{useRipple:a=!0}={}){let s=null,n=null;if(i.length===0)return{ref:s,material:n};let o=null;for(let h of i)if(h){o=h;break}if(!o)return{ref:s,material:n};let u=r?r.getAsset("humanHandsAtlas"):null;return e.traverse(h=>{h.name===t&&(s=h,n=Xv({useRipple:a}),n.uniforms.uTextureA.value=o,n.uniforms.uTextureB.value=o,u&&(n.uniforms.uAlphaMap.value=u,n.uniforms.uAlphaOffset.value.set(.75,.25),n.uniforms.uAlphaScale.value.set(.25,-.25)),h.traverse(d=>{(d.isMesh||d.isSkinnedMesh)&&(d.material=n)}))}),{ref:s,material:n}}_updateBlendMaterial(e,t,i,r,a=1,s=null){if(!e||t.length<2||i.length!==t.length)return;let n=(d,l)=>{if(!s)return;let c=s[l];c&&(e.uniforms[`uTexOffset${d}`].value.set(c.offset[0],c.offset[1]),e.uniforms[`uTexScale${d}`].value.set(c.scale[0],c.scale[1]))},o=(d,l)=>{let c=d;for(;c>=0&&c<t.length;){if(t[c])return c;c+=l}return-1},u=r*a;if(u<=i[0]){let d=o(0,1);if(d<0)return;e.uniforms.uTextureA.value=t[d],e.uniforms.uTextureB.value=t[d],e.uniforms.uProgress.value=0,n("A",d),n("B",d);return}let h=i.length-1;if(u>=i[h]){let d=o(h,-1);if(d<0)return;e.uniforms.uTextureA.value=t[d],e.uniforms.uTextureB.value=t[d],e.uniforms.uProgress.value=0,n("A",d),n("B",d);return}for(let d=0;d<h;d++)if(u>=i[d]&&u<i[d+1]){let l=o(d,-1),c=o(d+1,1);if(l<0||c<0)return;let p=(u-i[d])/(i[d+1]-i[d]);e.uniforms.uTextureA.value=t[l],e.uniforms.uTextureB.value=t[c],e.uniforms.uProgress.value=p,n("A",l),n("B",c);return}}scrub(e){if(this._scrubProgress=e,this.duration<=0)return;let t=this.duration*e;for(let i of this._actionSets)for(let r of i)r.time=t}update(e){if(this.group.visible){for(let t of this._mixers)t.update(e);this._applyFingerIdle(e)}}_setupFingerIdle(e,t){if(!e)return;let i=new Set,r=t&&t[0];if(r)for(let a of r.tracks)i.add(a.name.replace(/\.(quaternion|position|scale)$/,""));e.traverse(a=>{if(!a.isBone)return;let s=a.name.toLowerCase(),n=Zv.findIndex(d=>s.includes(d));if(n<0)return;let o=s.match(/0([123])/),u=o?parseInt(o[1],10):1,h=i.has(a.name);this._fingerBones.push({bone:a,animated:h,rest:h?null:a.quaternion.clone(),amp:Yv*(Jv[u]||.5),phase:n*1.3+u*.4,freq:jv*(1+n*.05)})})}_applyFingerIdle(e){let t=this._fingerBones;if(!t||t.length===0)return;let i=this._scrubProgress||0,r=Math.abs(i-(this._prevScrubProgress??i))>$v;this._prevScrubProgress=i;let a=+!r,s=r?tx:ex;this._idleWeight+=(a-this._idleWeight)*(1-Math.exp(-s*Math.max(e,0))),this._fingerIdleTime+=e;let n=this._idleWeight;if(n<.001)return;let o=this._fingerIdleTime*Math.PI*2;for(let u of t){let h=Math.sin(o*u.freq+u.phase)*u.amp*n;this._idleQuat.setFromAxisAngle(Kv,h),u.animated?u.bone.quaternion.multiply(this._idleQuat):u.bone.quaternion.copy(u.rest).multiply(this._idleQuat)}}_disposeModel(e){e&&e.traverse(t=>{(t.isMesh||t.isSkinnedMesh)&&(t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material.forEach(i=>i.dispose()):t.material.dispose()))})}dispose(){for(let e=0;e<this._mixers.length;e++)this._mixers[e].stopAllAction();this._mixers=[],this._actionSets=[]}};function rx(e){e.traverse(t=>{(t.isMesh||t.isSkinnedMesh)&&t.geometry&&(t.geometry.hasAttribute("normal")||t.geometry.computeVertexNormals())})}var Lp=8;var yE=10*Math.PI/60;var ax=.1,sx=.15,nx=.4,ox=.45;var SE=(sx-ax)/Lp,CE=(ox-nx)/Lp;var sl=128,nl=new Float32Array(129);{let e=.9;nl[0]=0,nl[sl]=1;for(let t=1;t<sl;t++){let i=t/sl;nl[t]=2**(-8*i)*Math.sin((i-e/4)*(2*Math.PI)/e)+1}}var Ac=6,lx=3,mc=.12,ux=.15,hx=.08,ol=.02,cx=8,dx=6,px=7,ll=1.3,Sn=2048,ME=[[0,1249,256,234],[256,1249,256,311],[0,1483,256,311],[256,1560,256,311],[986,1243,256,311],[1242,1243,256,311],[1498,1243,256,311],[1754,1243,256,311],[986,1560,256,311],[1242,1560,256,311],[1498,1560,256,311],[1754,1560,256,311]].map(([e,t,i,r])=>[e/Sn,1-(t+r)/Sn,i/Sn,r/Sn]);var IE=`
  attribute vec3 aOffset;
  attribute vec3 aVelocity;
  attribute float aPhase;
  attribute vec4 aPetalRect;
  attribute float aScale;
  attribute vec2 aRotSpeed;

  uniform float uTime;
  uniform float uSwirlTime;
  uniform vec3 uBounds;
  uniform vec3 uBoundsCenter;
  uniform float uEntry;

  varying vec2 vUv;
  varying vec4 vPetalRect;
  varying float vOpacity;
  varying float vBrightness;
  varying float vSaturation;
  varying float vFresnel;

  vec3 wrapPos(vec3 p, vec3 b) {
    return mod(p + b, 2.0 * b) - b;
  }

  void main() {
    // --- Position pipeline operates in box-centered coords (cp),
    // so wrap / swirl / fade are symmetric about the bounding box's
    // center even when uBoundsCenter shifts the box off-origin.
    vec3 cp = wrapPos(aOffset + aVelocity * uTime - uBoundsCenter, uBounds);

    // --- Entry: petals start offset to the right, slide into swirl ---
    float entryStagger = aPhase / 6.283;
    float entryT = clamp((uEntry - entryStagger * 0.3) / 0.7, 0.0, 1.0);
    float entryEase = entryT * entryT * (3.0 - 2.0 * entryT);
    cp.x += (1.0 - entryEase) * uBounds.x * 3.0;

    // --- Swirl: orbit around the box center (Y axis through uBoundsCenter).
    // uSwirlTime (CPU-integrated dt * entryEase) instead of uTime * entryEase:
    // multiplying raw elapsed time by the scroll-driven ease made the angle's
    // sensitivity to a scroll step grow with time idled \u2014 minutes of sitting
    // still turned the next scroll into a violent spin. The integral keeps
    // d(angle)/d(scroll) zero; entry only ramps the swirl RATE. ---
    float swirlAngle = uSwirlTime * (${ux.toFixed(1)} + aPhase * ${hx.toFixed(1)});
    float cs = cos(swirlAngle), ss = sin(swirlAngle);
    cp.xz = mat2(cs, -ss, ss, cs) * cp.xz;

    // --- Turbulence: layered sine displacement for organic motion ---
    cp.x += sin(cp.y * ${cx.toFixed(1)} + uTime * ${ll.toFixed(1)} + aPhase) * ${ol.toFixed(3)} * entryEase;
    cp.z += sin(cp.y * ${dx.toFixed(1)} + uTime * ${ll.toFixed(1)} * 0.9 + aPhase * 1.7) * ${ol.toFixed(3)} * entryEase;
    cp.y += sin(cp.x * ${px.toFixed(1)} + uTime * ${ll.toFixed(1)} * 0.7 + aPhase * 0.5) * ${ol.toFixed(3)} * 0.5 * entryEase;

    // --- Fade petals near bounding edges for soft wrap (all axes) ---
    float fadeX = smoothstep(0.0, 0.3, (uBounds.x - abs(cp.x)) / uBounds.x);
    float fadeY = smoothstep(0.0, 0.3, (uBounds.y - abs(cp.y)) / uBounds.y);
    float fadeZ = smoothstep(0.0, 0.3, (uBounds.z - abs(cp.z)) / uBounds.z);
    vOpacity = fadeX * fadeY * fadeZ;

    // --- Shift back to world coordinates for downstream vertex math.
    vec3 worldOffset = cp + uBoundsCenter;

    // --- Early-out: collapse invisible petals behind camera ---
    if (vOpacity < 0.001) {
      gl_Position = vec4(0.0, 0.0, -2.0, 1.0);
      return;
    }

    // --- Local vertex: scale + waviness (compute waveArg once) ---
    vec3 pos = position * aScale;
    float waveArg = position.x * ${Ac.toFixed(1)} + uTime * ${lx.toFixed(1)} + aPhase;
    pos.z += sin(waveArg) * ${mc.toFixed(2)} * aScale;

    // --- Tumbling rotation (Ry * Rx) ---
    float ax = aPhase + uTime * aRotSpeed.x;
    float ay = aPhase * 1.3 + uTime * aRotSpeed.y;
    float cx = cos(ax), sx = sin(ax);
    float cy = cos(ay), sy = sin(ay);

    mat3 rot = mat3(
       cy,     sy * sx,  sy * cx,
       0.0,    cx,      -sx,
      -sy,     cy * sx,  cy * cx
    );

    pos = rot * pos;

    // --- Fresnel: deformed normal \u2192 view dot for rim lighting ---
    float dzdx = cos(waveArg) * ${Ac.toFixed(1)} * ${mc.toFixed(2)} * aScale;
    vec3 worldNormal = normalize(rot * vec3(-dzdx, 0.0, 1.0));
    vec3 worldPos = (modelMatrix * vec4(pos + worldOffset, 1.0)).xyz;
    vec3 viewDir = normalize(cameraPosition - worldPos);
    float f = 1.0 - abs(dot(worldNormal, viewDir));
    vFresnel = f * f;

    pos += worldOffset;

    vUv = uv;
    vPetalRect = aPetalRect;
    vBrightness = 0.7 + fract(aPhase * 3.17) * 0.6;
    vSaturation = 0.6 + fract(aPhase * 5.43) * 0.8;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;var fx=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ax=`






  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uMaxBlur;
  uniform float uProgress;
  uniform vec2 uAtlasOffset;
  uniform vec2 uAtlasScale;
  uniform float uNoiseSeed;
  uniform float uAspect;


  uniform float uRotate;





  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.zyx + 31.32);
    return fract((p3.x + p3.y) * p3.z);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }





  vec3 flareBoost(vec3 rgb, float flare) {
    float luma = dot(rgb, vec3(0.299, 0.587, 0.114));
    return mix(vec3(luma), rgb, 1.0 + 3.0 * flare) * (1.0 + 0.25 * flare);
  }

  void main() {

    vec2 suv = (uRotate > 0.5) ? vec2(vUv.y, 1.0 - vUv.x) : vUv;





    if (uProgress >= 0.999) {
      gl_FragColor = texture2D(uTexture, uAtlasOffset + suv * uAtlasScale);
      return;
    }

    float effectiveProgress = uProgress * 1.3;


    float n = vnoise(vec2(suv.x * uAspect, suv.y) * 4.0 + uNoiseSeed);
    float mask = suv.x * 0.5 + n * 0.5;




    float flare = smoothstep(effectiveProgress - 0.85, effectiveProgress + 0.1, mask);
    flare *= 1.0 - smoothstep(0.8, 1.0, uProgress);
    float alpha = smoothstep(effectiveProgress + 0.3, effectiveProgress - 0.1, mask);



    if (alpha < 0.005) discard;

    vec2 aUv = uAtlasOffset + suv * uAtlasScale;

  #ifdef LITE_TEXT





    vec4 c0 = texture2D(uTexture, aUv);
    gl_FragColor = vec4(flareBoost(c0.rgb, flare), c0.a * alpha);
  #else

    float blurFactor = smoothstep(effectiveProgress - 0.5, effectiveProgress + 0.3, mask);






    if (blurFactor < 0.03) {
      vec4 c0 = texture2D(uTexture, aUv);
      gl_FragColor = vec4(flareBoost(c0.rgb, flare), c0.a * alpha);
      return;
    }



    float r = blurFactor * uMaxBlur * 0.003;


    vec4 color = texture2D(uTexture, aUv) * 2.0;
    float total = 2.0;


    vec2 uv1 = clamp(suv + vec2(r,          0.0),        0.0, 1.0);
    vec2 uv2 = clamp(suv + vec2(r * 0.5,    r * 0.866),  0.0, 1.0);
    vec2 uv3 = clamp(suv + vec2(-r * 0.5,   r * 0.866),  0.0, 1.0);
    vec2 uv4 = clamp(suv + vec2(-r,          0.0),        0.0, 1.0);
    vec2 uv5 = clamp(suv + vec2(-r * 0.5,  -r * 0.866),  0.0, 1.0);
    vec2 uv6 = clamp(suv + vec2(r * 0.5,   -r * 0.866),  0.0, 1.0);

    color += texture2D(uTexture, uAtlasOffset + uv1 * uAtlasScale);
    color += texture2D(uTexture, uAtlasOffset + uv2 * uAtlasScale);
    color += texture2D(uTexture, uAtlasOffset + uv3 * uAtlasScale);
    color += texture2D(uTexture, uAtlasOffset + uv4 * uAtlasScale);
    color += texture2D(uTexture, uAtlasOffset + uv5 * uAtlasScale);
    color += texture2D(uTexture, uAtlasOffset + uv6 * uAtlasScale);
    total += 6.0;

    color /= total;

    gl_FragColor = vec4(flareBoost(color.rgb, flare), color.a * alpha);
  #endif
  }
`;function mx(e,t,i,r,a=!1){return new lt({vertexShader:fx,fragmentShader:Ax,defines:a?{LITE_TEXT:""}:{},uniforms:{uTexture:{value:e||null},uMaxBlur:{value:6},uProgress:{value:0},uAtlasOffset:{value:new oe(t?t.offset[0]:0,t?t.offset[1]:0)},uAtlasScale:{value:new oe(t?t.scale[0]:1,t?t.scale[1]:1)},uNoiseSeed:{value:Math.random()*8},uAspect:{value:i||1},uRotate:{value:+!!r}},transparent:!0,depthWrite:!1,depthTest:!0,side:2})}var gx=768,_x=1728,vx=3686,xx=.1,Ex=1e3,yx=1536,Sx=.15,Cx=.05,yt={HIDDEN:0,APPEARING:1,VISIBLE:2,DISAPPEARING:3},Mx=4,Ix="outExpo",gc={smoothstep:e=>e*e*(3-2*e),outExpo:e=>e>=1?1:1-2**(-10*e),inExpo:e=>e<=0?0:2**(10*(e-1))},Tx=.3,_u=class{constructor(e,t){this.textScene=e,this.itemsConfig=t||[],this.group=new Ci,this.sprites=[],this.hasVisibleSprites=!1,this._lastProgress=-1,this._viewportWidth=window.innerWidth,this._viewportHeight=window.innerHeight,this._sharedGeometry=new ia(1,1),this._lite=qn.tier==="LOW",this._qualityUnsub=qn.onChange(i=>this._setLite(i==="LOW")),this._initSprites()}_setLite(e){e!==this._lite&&(this._lite=e,this.sprites.forEach(t=>{let i=t.userData.material;i&&(e?i.defines.LITE_TEXT="":delete i.defines.LITE_TEXT,i.needsUpdate=!0)}))}_initSprites(){this.itemsConfig.forEach(e=>{let t=e.texture;if(!t)return;let i=e.aspect==null?t.image?t.image.width/t.image.height:1:e.aspect,r=mx(t,e.atlasUV,i,e.rotate,this._lite),a=new dt(this._sharedGeometry,r);a.visible=!1,a.userData={config:e,baseScale:e.baseScale||.3,anchor:e.anchor||"center-center",aspect:i,material:r,animState:yt.HIDDEN,animElapsed:0,animProgress:0},this.group.add(a),this.sprites.push(a)}),this.textScene.add(this.group)}resize(e,t){this._viewportWidth=e,this._viewportHeight=t;let i=e<gx,r=e/2,a=t/2,s=Math.min(e,t),n=Math.max(i?Ex:_x,Math.min(i?yx:vx,s)),o=i?Sx*s:xx*s,u=i?o*.5:o,h=i?124:116;this.sprites.forEach(d=>{let l=d.userData,c=l.config.offset==null?null:l.config.offset,p=i?.85:1,f=l.baseScale*n*p,m=f/l.aspect;d.scale.set(f,m,1);let g=l.anchor.split("-"),A=g[0],_=g[1],v=0;_==="left"?v=-r+(c??u)+f/2:_==="right"&&(v=r-(c??u)-f/2);let x=Cx*s,C=x/2;if(A==="top")C=a-(c??o)-m/2;else if(A==="bottom"){let y=c??o;_!=="left"&&_!=="right"&&(y=Math.max(y,h)),C=-a+y+m/2+x}d.position.set(v,C,0)})}update(e,t){let i=e>=this._lastProgress;this._lastProgress=e;let r=!1;this.sprites.forEach(a=>{let s=a.userData,n=s.config,o=n.appearAt,u=n.disappearAt,h=s.config.appearDuration??Mx,d=Tx;if(this._checkTriggers(s,e,o,u,i),s.animState===yt.APPEARING){s.animElapsed+=t;let p=Math.min(s.animElapsed/h,1);s.animProgress=(gc[Ix]||gc.smoothstep)(p),p>=1&&(s.animState=yt.VISIBLE,s.animProgress=1)}else if(s.animState===yt.DISAPPEARING){s.animElapsed+=t;let p=Math.min(s.animElapsed/d,1);s.animProgress=this._smoothstep(p),p>=1&&(s.animState=yt.HIDDEN,s.animProgress=0)}let l=s.animState===yt.DISAPPEARING?1-s.animProgress:s.animProgress,c=s.animProgress>.001;a.visible=c,c&&(r=!0),s.material.uniforms.uProgress.value=l}),this.hasVisibleSprites=r,this.group.visible=r}isFirstTextVisible(){if(!this.sprites||!this.sprites.length)return!1;let e=null;for(let t of this.sprites)(!e||t.userData.config.appearAt<e.userData.config.appearAt)&&(e=t);return!!e&&e.userData.animState===yt.VISIBLE}hideAll(e){this.sprites.forEach(t=>{let i=t.userData;i.animState===yt.HIDDEN||i.animState===yt.DISAPPEARING||(i.animState=yt.DISAPPEARING,i.animElapsed=0)})}_checkTriggers(e,t,i,r,a){a?e.animState===yt.HIDDEN&&t>=i&&t<r?(e.animState=yt.APPEARING,e.animElapsed=0):(e.animState===yt.VISIBLE||e.animState===yt.APPEARING)&&t>=r&&(e.animState=yt.DISAPPEARING,e.animElapsed=0):(e.animState===yt.HIDDEN||e.animState===yt.DISAPPEARING)&&t<r&&t>=i?(e.animState=yt.APPEARING,e.animElapsed=0):e.animState!==yt.HIDDEN&&e.animState!==yt.DISAPPEARING&&t<i&&(e.animState=yt.DISAPPEARING,e.animElapsed=0)}_smoothstep(e){return e*e*(3-2*e)}dispose(){this._qualityUnsub&&(this._qualityUnsub=(this._qualityUnsub(),null)),this.sprites.forEach(e=>{e.userData.material&&e.userData.material.dispose()}),this._sharedGeometry&&(this._sharedGeometry=(this._sharedGeometry.dispose(),null)),this.sprites=[],this.group.parent&&this.group.parent.remove(this.group),this.group.clear()}},wx=`
  precision highp float;
  uniform float uTime;
  uniform float uSeed;
  uniform float uWaveAmp;
  uniform float uWaveFreq;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;

    float wave = sin(uv.x * uWaveFreq + uTime * 2.0 + uSeed * 6.283) * uWaveAmp;
    wave += sin(uv.y * uWaveFreq * 0.7 + uTime * 1.5 + uSeed * 3.7) * uWaveAmp * 0.5;
    pos.z += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,bx=`
  precision highp float;

  uniform sampler2D uTexture;
  uniform float uBurnProgress;
  uniform float uBurnScale;
  uniform float uEmberWidth;
  uniform float uCharWidth;
  uniform float uBurnDirection;
  uniform float uAspect;
  uniform vec3 uEmberColor;
  uniform vec3 uEmberTip;
  uniform vec3 uCharColor;
  uniform float uSeed;
  uniform float uBurnDelay;
  uniform float uBurnSpeed;
  uniform float uTime;
  uniform vec2  uTexOffset;
  uniform vec2  uTexScale;
  uniform float uTexRotate;

  varying vec2 vUv;





  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.zyx + 31.32);
    return fract((p3.x + p3.y) * p3.z);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }



  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 3; i++) {
      value += amplitude * vnoise(p);
      p = rot * p * 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 centeredUv = vUv - 0.5;
    centeredUv.x *= uAspect;
    float edgeDist = 1.0 - clamp(length(centeredUv) * 2.0 / uAspect, 0.0, 1.0);
    float distField = mix(1.0 - edgeDist, edgeDist, uBurnDirection);


    float localProgress = clamp((uBurnProgress - uBurnDelay) / (1.0 - uBurnDelay) * uBurnSpeed, 0.0, 1.0);
    float threshold = localProgress * 1.5;





    if (distField * 0.5 + 0.5 < threshold) discard;


    vec2 mUv = (uTexRotate > 0.5) ? vec2(vUv.y, 1.0 - vUv.x) : vUv;
    mUv = mUv * uTexScale + uTexOffset;
    vec4 texColor = texture2D(uTexture, mUv);
    vec3 baseRGB = texColor.rgb;
    float baseAlpha = texColor.a;

    vec2 noiseUv = vec2(vUv.x * uAspect, vUv.y) * uBurnScale;
    float noise = fbm(noiseUv + uSeed * 73.156);
    float noiseDetail = fbm(noiseUv * 0.8 + uSeed * 73.156 + 50.0);
    float combinedNoise = noise * 0.65 + noiseDetail * 0.35;
    float burnMap = distField * 0.5 + combinedNoise * 0.5;
    float edge = burnMap - threshold;

    if (edge < 0.0) discard;

    float charFactor = 1.0 - smoothstep(0.0, uCharWidth, edge);
    float emberFactor = 1.0 - smoothstep(0.0, uEmberWidth, edge);
    vec3 emberColor = mix(uEmberColor, uEmberTip, emberFactor);

    float flicker = vnoise(noiseUv * 0.8 + uTime * 2.5) * 10.0 + 0.5;
    emberColor *= flicker;
    float edgeFade = smoothstep(0.0, uEmberWidth, edge);

    vec3 finalRGB = mix(baseRGB, uCharColor, charFactor);
    finalRGB += emberColor * emberFactor;

    gl_FragColor = vec4(finalRGB, baseAlpha * edgeFade);
    #include <colorspace_fragment>
  }
`;function Bx(e=null,{direction:t="out2in",aspect:i=1,emberColor:r=[4,.75,.05],emberTip:a=[6,1.5,.25],charColor:s=[.02,.01,.01],seed:n=Math.random(),burnDelay:o=Math.random()*.5,burnSpeed:u=1+Math.random()*1.5,texOffset:h=[0,0],texScale:d=[1,1],texRotate:l=0}={}){return new lt({vertexShader:wx,fragmentShader:bx,uniforms:{uTexture:{value:e},uBurnProgress:{value:0},uBurnScale:{value:4},uEmberWidth:{value:.025},uCharWidth:{value:.18},uBurnDirection:{value:+(t==="out2in")},uAspect:{value:i},uEmberColor:{value:new P(...r)},uEmberTip:{value:new P(...a)},uCharColor:{value:new P(...s)},uSeed:{value:n},uBurnDelay:{value:o},uBurnSpeed:{value:u},uTime:{value:0},uWaveAmp:{value:.008},uWaveFreq:{value:8},uTexOffset:{value:new oe(...h)},uTexScale:{value:new oe(...d)},uTexRotate:{value:l}},transparent:!0,side:2,depthWrite:!0,depthTest:!0})}var Nl=class extends ix{constructor(e){super(),this.handRef=null,this.handMaterial=null;let t=e.getAsset("handsModel2"),i=e.getAsset("cameraModel2");t?this._setupHand(t,e):console.warn("HandModelStage2: Hand model not found"),i?this._setupCamera(i,e):console.warn("HandModelStage2: Camera model not found")}_setupHand(e,t){let i=this._cloneModel(e),r=t.assets.animations.handsModel2;this._setupMixer(i,r),this._setupFingerIdle(i,r),rx(i);let a=t.getAsset("humanHandsAtlas"),s=(d,l)=>({offset:[d*.25,1-l*.25],scale:[.25,-.25]}),n=[40,60,75,150,190,220,275,350,420,435,445];this._handTextures=Array(n.length).fill(a),this._handUVs=[s(0,1),s(1,1),s(2,1),s(3,1),s(0,2),s(1,2),s(2,2),s(3,2),s(0,3),s(1,3),s(2,3)];let o=r&&r[0];this._handTexTimes=this._framesToProgress(n,o,40);let{ref:u,material:h}=this._assignBlenderMaterial(i,"HumanHandScene2",this._handTextures,t,{useRipple:!1});if(this.handRef=u,this.handMaterial=h,h){let d=this._handUVs[0];h.uniforms.uTexOffsetA.value.set(d.offset[0],d.offset[1]),h.uniforms.uTexScaleA.value.set(d.scale[0],d.scale[1]),h.uniforms.uTexOffsetB.value.set(d.offset[0],d.offset[1]),h.uniforms.uTexScaleB.value.set(d.scale[0],d.scale[1])}this.handRef||console.warn("HandModelStage2: HumanHandScene2 not found in GLB")}_setupCamera(e,t){let i=this._cloneModel(e);i.traverse(a=>{(a.isMesh||a.isSkinnedMesh)&&(a.visible=!1)});let r=t.assets.animations.cameraModel2;this._setupMixer(i,r),this._findCamera(i),this.cameraRef||console.warn("HandModelStage2: Camera not found in camera GLB")}scrub(e){super.scrub(e),this.handMaterial&&this._handTextures&&this._updateBlendMaterial(this.handMaterial,this._handTextures,this._handTexTimes,e,1,this._handUVs)}dispose(){super.dispose(),this._disposeModel(this.group)}},_c=new _t,vc=new _t,xc=new ea,Ec=Math.PI/180,ir=(e,t)=>e+Math.random()*(t-e),Rx=class{constructor(e,t,i){this.group=new Ci,this.shards=[],this.overlays=[],this._overlayMaterial=null,this._t0=performance.now();let r=new Map;i&&i.traverse(a=>{a.name&&r.set(a.name,a)});for(let a of t){let s;if(i&&a.meshName){let p=r.get(a.meshName)||null;if(!p){let m=[];i.traverse(g=>{(g.isMesh||g.name)&&m.push(g.name)}),console.warn(`GlassShards: mesh "${a.meshName}" not found. Available:`,m);continue}let f=p.clone();f.position.set(0,0,0),f.rotation.set(0,0,0),f.scale.set(1,1,1),s=new Ci,s.add(f)}else{let p=e.getAsset(a.key);if(!p){console.warn(`GlassShards: asset "${a.key}" not found`);continue}s=p.clone()}s.traverse(p=>{if(p.isMesh||p.isSkinnedMesh){let f=p.geometry;f&&!f.attributes.normal&&f.computeVertexNormals(),p.frustumCulled=!1}});let n=a.scale??1;if(typeof n=="number"?s.scale.setScalar(n):s.scale.set(n[0],n[1],n[2]),a.overlay){let p=a.overlay,f=p.texture.image||p.texture.source?.data,m=f?.naturalWidth||f?.width||1,g=f?.naturalHeight||f?.height||1,A=p.region,_=A?A.w/A.h:m/g,v=p.height??.3,x=new ia(v*_,v);if(A){let E=!!A.rot,I=E?A.h:A.w,B=E?A.w:A.h,G=A.x/m,X=1-(A.y+B)/g,R=I/m,D=B/g,N=x.attributes.uv,z=N.array;for(let Y=0;Y<z.length;Y+=2){let W=z[Y],J=z[Y+1];E?(z[Y]=G+J*R,z[Y+1]=X+(1-W)*D):(z[Y]=G+W*R,z[Y+1]=X+J*D)}N.needsUpdate=!0}this._overlayMaterial||(this._overlayMaterial=(p.texture.premultiplyAlpha=!1,new Si({map:p.texture,transparent:!0,depthWrite:!1,depthTest:!1,side:2,toneMapped:!1})));let C=this._overlayMaterial,y=new dt(x,C),T=typeof n=="number"?n:1;T!==0&&y.scale.setScalar(1/T);let b=p.offset||[0,0,.01];y.position.set(b[0],b[1],b[2]),p.spin&&(y.rotation.z=p.spin),y.frustumCulled=!1,y.userData.isOverlay=!0,s.add(y),this.overlays.push(y)}let o=a.startPosition||[0,0,-1],u=a.endPosition||o,h=a.startRotation||[0,0,0],d=a.endRotation||h;s.userData.startPos=new P(o[0],o[1],o[2]),s.userData.endPos=new P(u[0],u[1],u[2]),s.userData.startQuat=new _t().setFromEuler(new ea(h[0],h[1],h[2])),s.userData.endQuat=new _t().setFromEuler(new ea(d[0],d[1],d[2]));let l=4*Ec,c=12*Ec;s.userData.wobble={ax:ir(l,c),ay:ir(l,c),az:ir(l,c),fx:ir(.15,.45),fy:ir(.15,.45),fz:ir(.15,.45),px:ir(0,Math.PI*2),py:ir(0,Math.PI*2),pz:ir(0,Math.PI*2)},s.userData.isBackground=!!a.background,s.position.copy(s.userData.startPos),s.quaternion.copy(s.userData.startQuat),this.shards.push(s),this.group.add(s)}}setOverlayOffset(e,t,i,r){if(r!==void 0)this.overlays[r]&&this.overlays[r].position.set(e,t,i);else for(let a of this.overlays)a.position.set(e,t,i)}setCameraRig(e,t=1){this._rig=e,this._rigStrength=t}handleScroll(e){this._scrollProgress=e,this._applyTransforms()}update(){this._applyTransforms()}_applyTransforms(){let e=this._scrollProgress??0,t=this._reducedMotion?0:(performance.now()-this._t0)*.001;for(let i of this.shards){let r=i.userData;i.position.lerpVectors(r.startPos,r.endPos,e),_c.slerpQuaternions(r.startQuat,r.endQuat,e);let a=r.wobble;xc.set(Math.sin(t*a.fx+a.px)*a.ax,Math.sin(t*a.fy+a.py)*a.ay,Math.sin(t*a.fz+a.pz)*a.az),vc.setFromEuler(xc),i.quaternion.multiplyQuaternions(_c,vc)}if(this._rig&&this._rig.enabled){let i=this._rig._currentX,r=this._rig._currentY;for(let a of this.shards){let s=Math.abs(a.position.z)*this._rigStrength;a.position.x+=-i*s,a.position.y+=-r*s}}}dispose(){for(let e of this.shards)e.traverse(t=>{t.isMesh&&t.geometry&&t.geometry.dispose()});this.shards=[]}},ds={id:"stage2",scrollVh:250,autoScroll:!1,advanceAtEnd:!0,advanceThreshold:.99,enter(e){e.assetLoader.loadStageAssets("stage3"),Je.play("stage2-ambient"),e.ui.setPageTheme("white"),e.cameraRig.setEnabled(!0),e._gateZoomT=0,e.fgPass?.uniforms&&(e.fgPass.uniforms.uContrast.value=1,e.fgPass.uniforms.uExposure.value=1,e.fgPass.uniforms.uRedTint.value=0),e.bgPass?.uniforms?.uZoom&&(e.bgPass.uniforms.uZoom.value=1),e._scrollProgress=0,e._smoothedHandProgress=void 0,Bp(e,"stage2"),window.addEventListener("mousemove",e._onMouseMove)},scrub(e,t){let i=e.components;if(!i.handsModel)return;let r=e._gateHandProgress||0,a=r+t*(1-r)*.9;if(e._smoothedHandProgress===void 0&&(e._smoothedHandProgress=a),e._smoothedHandProgress+=(a-e._smoothedHandProgress)*.15,i.handsModel.scrub(e._smoothedHandProgress),e._scrollProgress=t,i.glassShards&&i.glassShards.handleScroll(t),t>=.85){let s=kt(t,.85,1);e.cameraRig.influence=1-s,e._stage2BgTransitionSet||(e._stage2BgTransitionSet=(Xr(e.bgPass,"B","stage2Background2",e.assetLoader,!0,8),!0)),e.bgPass.uniforms.uProgress.value=kt(t,.93,1),i.handsModel?.group&&i.handsModel.group.traverse(n=>{n.isMesh&&n.material&&(n.material.transparent=!0,n.material.opacity=1-s)})}else{e.cameraRig.influence=1,e._stage2BgTransitionSet&&(e.bgPass.uniforms.uProgress.value=0);let s=i.handsModel.handMaterial;s?._mapMixUniforms&&(s._mapMixUniforms.uMapMix.value=0),i.handsModel?.group&&i.handsModel.group.traverse(n=>{n.isMesh&&n.material&&(n.material.opacity=1)})}},update(e,t,i){let r=e.components;r.handsModel&&(r.handsModel.update(i),r.handsModel.cameraRef&&(r.handsModel.cameraRef.getWorldPosition(e._tempVec3),r.handsModel.cameraRef.getWorldQuaternion(e._tempQuat),e.camera.position.lerp(e._tempVec3,Fs.CAMERA_LERP),e.camera.quaternion.slerp(e._tempQuat,Fs.CAMERA_LERP)),r.textLayout&&r.textLayout.update(e._scrollProgress,i),e.cameraRig.update(i),r.glassShards&&r.glassShards.update())},resize(e,t,i){e.components.textLayout&&e.components.textLayout.resize(t,i)},teardown(e){e.bgPass&&e.whiteTex&&Gs(e.bgPass,"A",e.whiteTex,!0,!0),e._stage2Video&&(e._stage2Video=(Ul(e._stage2Video),null)),e._stage2VideoTex&&(e._stage2VideoTex=(e._stage2VideoTex.dispose(),null)),e.bgPass&&(e.bgPass.uniforms.uLinearizeA.value=0);let t=e.components;t.handsModel&&(t.handsModel.dispose(),e.scene.remove(t.handsModel.group)),t.glassShards&&(e.glassShardPass&&e.glassShardPass.clearShards(),e.camera.remove(t.glassShards.group),e.preWarmed&&(e.preWarmed.glassShards=t.glassShards)),t.textLayout&&t.textLayout.dispose(),e._stage2BgTransitionSet=!1,e.assetLoader.disposeTextures(["stage2Foreground","stage2Background2","handMatcap","stage2Atlas"]),e.components={}}};function Fl(e){let t=-.8,i=[],r=[[.1,-.05,.15,.25,.2,-.4],[.05,.12,-.3,-.15,-.25,.5],[-.08,-.1,.45,.2,.15,-.6],[.12,.08,-.2,-.1,.3,.35],[-.05,-.15,.55,.18,-.2,-.45],[.15,.05,-.1,-.2,.1,.65],[-.1,.12,.35,.15,-.15,-.55]],a=[[.02,.4],[-.06,-.08],[.08,-.15],[-.04,-.05],[.05,.2],[-.08,-.4],[.05,-.18]],s=[{region:0,shard:1,size:.036,dx:-.05,spin:30},{region:1,shard:2,size:.072},{region:2,shard:3,size:.0675,dx:-.1},{region:3,shard:4,size:.08,spin:20},{region:4,shard:5,size:.054},{region:5,shard:6,size:.096}],n=[{x:0,y:0,w:856,h:381},{x:881,y:0,w:860,h:518},{x:1765,y:0,w:735,h:283,rot:!0},{x:0,y:699,w:1024,h:363},{x:1042,y:737,w:952,h:502},{x:563,y:1073,w:975,h:370,rot:!0}],o=e.getAsset("spcAtlas"),u=new Map(s.map(p=>[p.shard,p]));for(let p=0;p<7;p++){let f=-.66-p*.22,m=r[p],[g,A]=a[p],_=u.get(p+1),v=_?n[_.region]:null;i.push({meshName:`Shard_0${p+1}`,startPosition:[g,f,t+A],endPosition:[g,f+2.64,t+A],startRotation:[m[0],m[1],m[2]],endRotation:[m[3],m[4],m[5]],scale:1.275,overlay:o&&v?{texture:o,region:v,height:_.size,offset:[(_.dx||0)*_.size*(v.w/v.h),(_.dy||0)*_.size,.02],spin:(_.spin||0)*Math.PI/180}:void 0})}let h=.25,d=[[-.72,-.28,-1.8],[.64,-.2,-2],[-.95,-.28,-2.2],[.86,-.42,-1.9],[-.4,-.04,-2.45],[.36,-.62,-2.3],[-.6,-.56,-1.7],[.72,-.06,-2.55],[.06,-.12,-2.65]],l=[[.3,.4,.2],[-.25,.5,-.35],[.45,-.3,.6],[-.2,.35,.35],[.55,-.2,-.45],[-.4,.1,.65],[.35,-.5,-.55],[-.3,.45,.25],[.2,-.35,-.4]],c=[1.65,1.4,1.9,1.5,1.25,1.75,1.35,1.2,1.1];for(let p=0;p<d.length;p++){let f=String(p+1).padStart(2,"0"),[m,g,A]=d[p],_=l[p],v=1.584/2,x=p%2?1:-1;i.push({meshName:`BG_Shard_${f}`,background:!0,startPosition:[m,g-v,A],endPosition:[m,g+v,A],startRotation:_,endRotation:[_[0]+h*x,_[1]-h*.6,_[2]+h*x],scale:c[p]})}for(let p of i)p.startPosition[1]*=-1,p.endPosition[1]*=-1;return new Rx(e,i,e.getAsset("allShards"))}function Dp(e){let{scene:t,camera:i,assetLoader:r,textScene:a}=e,s=e.preWarmed?.handsModel2||new Nl(r);e.preWarmed&&(e.preWarmed.handsModel2=null),s.group.parent!==t&&(s.group.parent&&s.group.parent.remove(s.group),t.add(s.group));let n=e.preWarmed&&e.preWarmed.glassShards||Fl(r);if(e.preWarmed&&(e.preWarmed.glassShards=n),n.setCameraRig(e.cameraRig,.15),i.add(n.group),e.glassShardPass){e.glassShardPass.setShards(n,i,t);let h=r.getAsset("frostingNormal");h&&e.glassShardPass.setRefractionMap(h,.3,3,3)}let o=null,u=r.getAsset("textsAtlas");u&&(e.renderer&&(u.anisotropy=e.renderer.capabilities.getMaxAnisotropy()),o=new _u(a,[{texture:u,atlasUV:Bi(1092.93,558.45,945.23,371.64),aspect:Ri(945.23,371.64),baseScale:.4,anchor:"center-center",appearAt:0,disappearAt:.2}]),o.resize(e._vw,e._vh)),e.components={handsModel:s,glassShards:n,textLayout:o}}var Up=new Kt(new Uint8Array([0,0,0,255]),1,1,mt);Up.needsUpdate=!0;var Ha=3,yc=0,Ql=4.733333333333333,Np=.85,Sc=.15,Px=.8;var Lx=.08,Dx=.9,Ux=.85;new P(0,0,0),new P(.035,-.003,-.02),new P(.01,0,-.004);function Nx(e){if(e.shatterPass&&!e.shatterPass._prewarmed&&e.shatterPass.prewarm(e.renderer,e.camera,e.preWarmed&&e.preWarmed.handsModel2&&e.preWarmed.handsModel2.handRef||null,e.assetLoader.getAsset("glassShatter"),e.assetLoader.assets.animations.glassShatter),e.glassShardPass&&!e.glassShardPass._prewarmed&&e.glassShardPass.prewarm(e.renderer,e.camera),e.preWarmed&&e.preWarmed.glassShards&&e.renderer&&!e._gateShardsGeomWarmed){e._gateShardsGeomWarmed=!0;let t=e.preWarmed.glassShards.group,i=new Gi;i.add(t);let r=new jt(1,1),a=e.renderer.getRenderTarget();e.renderer.setRenderTarget(r),e.renderer.render(i,e.camera),e.renderer.setRenderTarget(a),r.dispose(),i.remove(t)}}function Fx(e){e._gatePrevPixelRatio??(!e.applyPixelRatioOverride||!e.renderer||(e._gatePrevPixelRatio=e.renderer.getPixelRatio(),e.applyPixelRatioOverride(e._gatePrevPixelRatio*Px)))}function Qx(e){e._gatePrevPixelRatio!=null&&(e.applyPixelRatioOverride&&e.applyPixelRatioOverride(e._gatePrevPixelRatio),e._gatePrevPixelRatio=null)}var Cn={id:"gate1to2",scrollVh:50,autoScroll:!0,autoScrollDuration:Ha,fastForwardPreRoll:3,async enter(e){Nx(e),Je.stop("stage1-ambient"),e._gateElapsed=e._ripplePreplayed?3:0,e._ripplePreplayed=!1,e._gateShatterStarted=!1,e._gateShatterSfxFired=!1,e._gateHandElapsed=0,e._gateTextElapsed=0;let t=e.assetLoader.getAsset("textsAtlas");t&&(e.renderer&&(t.anisotropy=e.renderer.capabilities.getMaxAnisotropy()),e._gateTextLayout=new _u(e.textScene,[{texture:t,atlasUV:Bi(257.75,558.45,247.06,165.84),aspect:Ri(247.06,165.84),baseScale:.15,anchor:"center-center",appearAt:1,disappearAt:2}]),e._gateTextLayout.resize(e._vw,e._vh))},update(e,t,i){let r=Math.min(i,.1);e._gateElapsed=(e._gateElapsed||0)+r,e._gateTextLayout&&(e._gateTextElapsed=(e._gateTextElapsed||0)+r,e._gateTextLayout.update(e._gateTextElapsed,i));let a=e.components;if(e._gateElapsed<3){if(a.handsModel){let d=e._gateElapsed,l=e.renderer?e.renderer.getPixelRatio():1,c=e._vw*l,p=e._vh*l;a.handsModel._ethRippleUniforms&&(a.handsModel._ethRippleUniforms.uRippleTime.value=d,a.handsModel._ethRippleUniforms.uRippleIntensity.value=1,a.handsModel._ethRippleUniforms.uRippleResolution.value.set(c,p)),a.handsModel.humanHandMaterial?.uniforms&&(a.handsModel.humanHandMaterial.uniforms.uRippleTime.value=d,a.handsModel.humanHandMaterial.uniforms.uRippleIntensity.value=1,a.handsModel.humanHandMaterial.uniforms.uRippleResolution.value.set(c,p))}e.fgPass?.uniforms&&(e.fgPass.uniforms.uRippleTime.value=e._gateElapsed,e.fgPass.uniforms.uRippleStrength.value=.15);let h=e._gateElapsed/3;a.handsModel&&(a.handsModel.scrub(.7+h*.3),a.handsModel.update(i)),a.portalMaterial&&(a.portalMaterial.uniforms.uTime.value+=i),a.handsModel&&a.handsModel.cameraRef&&(a.handsModel.cameraRef.getWorldPosition(e._tempVec3),a.handsModel.cameraRef.getWorldQuaternion(e._tempQuat),e.camera.position.lerp(e._tempVec3,Fs.CAMERA_LERP),e.camera.quaternion.slerp(e._tempQuat,Fs.CAMERA_LERP)),a.petalParticles&&a.petalParticles.group.visible&&(a.petalParticles.group.position.copy(e.camera.position),e._tempVec3.set(0,0,-.7).applyQuaternion(e.camera.quaternion),a.petalParticles.group.position.add(e._tempVec3),a.petalParticles.update(i)),a.textLayout&&a.textLayout.update(1,i),e.cameraRig.update(i);return}if(!e._gateShatterStarted){if(e._gateShatterStarted=!0,Fx(e),e.lensBlurPass&&(e._gateLensBlurWasEnabled=e.lensBlurPass.enabled,e.lensBlurPass.enabled=!1),e.frostingPass&&(e._gateFrostWasEnabled=e.frostingPass.enabled,e.frostingPass.enabled=!1),e.components.handsModel&&(e.components.handsModel._ethRippleUniforms&&(e.components.handsModel._ethRippleUniforms.uRippleIntensity.value=0,e.components.handsModel._ethRippleUniforms.uRippleTime.value=0),e.components.handsModel.humanHandMaterial?.uniforms&&(e.components.handsModel.humanHandMaterial.uniforms.uRippleIntensity.value=0,e.components.handsModel.humanHandMaterial.uniforms.uRippleTime.value=0)),e.fgPass?.uniforms&&(e.fgPass.uniforms.uRippleStrength.value=0,e.fgPass.uniforms.uRippleTime.value=0),e.shatterPass.setShatterTextures(Up,null),e.textPass.renderToScreen=!1,e.shatterPass.enabled=!0,e.shatterPass.renderToScreen=!0,e._pendingTeardown&&(e._pendingTeardown=(e._pendingTeardown(),null)),e.bgPass){let c=e._stage2VideoPrefetch;c?e._stage2VideoPrefetch=null:c=Dl("/");let p=e._stage2VideoTexPrewarmed||null;p?(e._stage2VideoTexPrewarmed=null,c=p.image):(p=new vd(c),p.colorSpace=Ye),Pp(c,()=>{e.bgPass&&(Gs(e.bgPass,"A",p,!0,!0),e.bgPass.uniforms.uLinearizeA.value=1,e.bgPass.uniforms.uProgress.value=0)}),eo(c),e._stage2Video=c,e._stage2VideoTex=p}e.fgPass&&(Xr(e.fgPass,"B","stage2Foreground",e.assetLoader,!1),e.fgPass.uniforms.uProgress.value=1),Dp(e);let h=e.components;h.handsModel&&h.handsModel.group&&(h.handsModel.group.visible=!0,h.handsModel.group.position.set(0,0,0),h.handsModel.group.rotation.set(0,0,0),h.handsModel.group.scale.set(1,1,1)),h.handsModel&&h.handsModel.duration>0&&(h.handsModel.scrub(yc/h.handsModel.duration),h.handsModel.update(0)),h.handsModel&&h.handsModel.handRef&&e.shatterPass.setHandSource(h.handsModel.handRef,e.camera);let d=e.assetLoader.getAsset("glassShatter"),l=e.assetLoader.assets.animations.glassShatter;d&&l?e.shatterPass.startScrub(d,l):(console.warn("MasterTimeline: glassShatter model or animations not found"),e.shatterPass.enabled=!1,e.shatterPass.renderToScreen=!1,e.textPass.renderToScreen=!0)}let s=e._gateElapsed-3,n=Math.min(s/Ha,1),o=Math.max(0,(n-Sc)/(1-Sc));!e._gateShatterSfxFired&&o>0&&(e._gateShatterSfxFired=!0,e._directNavActive||Je.play("glass-shatter")),e.shatterPass.scrub(Math.min(o*1.2,1)),e.shatterPass.setShatterBlend(Math.min(o*5,1));let u=Math.max(0,1-n*15);if(e.fgPass?.uniforms&&(e.fgPass.uniforms.uExposure.value=1-1*u,e.fgPass.uniforms.uContrast.value=1+Dx*u,e.fgPass.uniforms.uRedTint.value=Ux*u),e.bgPass?.uniforms?.uZoom&&(e.bgPass.uniforms.uZoom.value=1-Lx*u),e.components.handsModel){let h=e.components.handsModel.duration,d=h>0?yc/h:0,l=h>0?Ql/h:1;e._gateHandElapsed=(e._gateHandElapsed||0)+Math.min(i,.04);let c=Math.min(1,e._gateHandElapsed/Ha/Np),p;if(c<.3)p=c;else{let m=1-(c-.3)/.7;p=.3+.7*(1-m*m)}let f=d+p*(l-d);e.components.handsModel.scrub(f),e._gateHandProgress=f,e.components.handsModel.update(0)}if(e.components.handsModel&&e.components.handsModel.cameraRef){e.components.handsModel.cameraRef.getWorldPosition(e._tempVec3),e.components.handsModel.cameraRef.getWorldQuaternion(e._tempQuat);let h=kt(n,.3,.85),d=.08+.92*(h*h*(3-2*h));e.camera.position.lerp(e._tempVec3,d),e.camera.quaternion.slerp(e._tempQuat,d)}},teardown(e){Qx(e),e._gateLensBlurWasEnabled!=null&&(e.lensBlurPass&&(e.lensBlurPass.enabled=e._gateLensBlurWasEnabled),e._gateLensBlurWasEnabled=null),e._gateFrostWasEnabled!=null&&(e.frostingPass&&(e.frostingPass.enabled=e._gateFrostWasEnabled),e._gateFrostWasEnabled=null),e.shatterPass.enabled=!1,e.shatterPass.renderToScreen=!1,e.textPass.renderToScreen=!0,e.shatterPass.cleanup(),e._gateElapsed=0,e._gateTextElapsed=0,e._gateShatterStarted=!1,e._gateTextLayout&&(e._gateTextLayout=(e._gateTextLayout.dispose(),null)),e.components.handsModel&&(e.components.handsModel._ethRippleUniforms&&(e.components.handsModel._ethRippleUniforms.uRippleIntensity.value=0),e.components.handsModel.humanHandMaterial?.uniforms&&(e.components.handsModel.humanHandMaterial.uniforms.uRippleIntensity.value=0))}};var TE={scale:1/1751};function Ox(e=1.4,t=1,i=10,r=32){let a=new ni,s=t/i,n=r+1,o=n*2,u=i*o,h=new Float32Array(u*3),d=new Float32Array(u*2),l=new Float32Array(u*3),c=new Float32Array(u),p=[];for(let f=0;f<i;f++){let m=f*s-t*.5,g=(f+1)*s-t*.5,A=f*o;for(let _=0;_<n;_++){let v=_/r,x=v*e-e*.5,C=A+_*2;h[C*3]=x,h[C*3+1]=m,h[C*3+2]=0,d[C*2]=v,d[C*2+1]=f/i,l[C*3+2]=1,c[C]=f,h[(C+1)*3]=x,h[(C+1)*3+1]=g,h[(C+1)*3+2]=0,d[(C+1)*2]=v,d[(C+1)*2+1]=(f+1)/i,l[(C+1)*3+2]=1,c[C+1]=f}for(let _=0;_<r;_++){let v=A+_*2,x=v+2;p.push(v,x,v+1),p.push(v+1,x,x+1)}}return a.setAttribute("position",new ot(h,3)),a.setAttribute("uv",new ot(d,2)),a.setAttribute("normal",new ot(l,3)),a.setAttribute("aStripIndex",new ot(c,1)),a.setIndex(p),a}var kx=`





    precision highp float;
    attribute float aStripIndex;

    uniform float uShredProgress;
    uniform float uNumStrips;
    uniform float uWaviness;
    uniform float uTime;
    uniform float uSeed;

    varying vec2 vUv;
    varying float vStripBelowAmount;
    varying float vStripId;
    varying vec2 vMatcapUv;





    float stripHash(float p) {
        p = fract(p * 0.1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
    }

    void main() {
        vUv = uv;


        float stripId = aStripIndex + uSeed * 137.0;
        vStripId = stripId;


        float pastAmount = clamp((uShredProgress - uv.x) / 0.4, 0.0, 1.0);
        vStripBelowAmount = pastAmount;


        float s = uSeed * 6.283;
        float p1 = uTime * 1.2 + uv.x * 5.0 + uv.y * 3.0 + s;
        float p2 = uTime * 1.8 + uv.x * 3.0 - uv.y * 4.0 + s * 1.7;
        float p3 = uTime * 0.7 + uv.y * 6.0 + s * 2.3;
        float idleWave = uWaviness * (
            sin(p1) * 3.0 + sin(p2) * 2.0 + sin(p3) * 1.5
        );


        float shredWave = 0.0;
        float fall = 0.0;
        if (pastAmount > 0.0) {
            float h1 = stripHash(stripId);
            float h2 = stripHash(stripId + 10.0);
            float h3 = stripHash(stripId + 20.0);
            shredWave = pastAmount * uWaviness * (
                sin(uTime * (1.5 + h1 * 3.0) + uv.x * (5.0 + h2 * 8.0)) * (3.0 + h3 * 3.0)
              + sin(uTime * (2.2 + h2 * 2.0) + uv.y * (4.0 + h1 * 6.0)) * (2.0 + h1 * 2.0)
              + sin(uTime * (3.1 + h3 * 1.5) + uv.x * (9.0 + h3 * 5.0)) * (1.5 + h2 * 1.5)
            );
            float easedPast = pastAmount * pastAmount;
            fall = easedPast * (0.25 + stripHash(stripId + 3.3) * 0.25);


            float center = (uNumStrips - 1.0) * 0.5;
            float distFromCenter = (aStripIndex - center) / max(center, 1.0);
            fall -= easedPast * distFromCenter * 0.3;
        }

        float waveZ = idleWave + shredWave;
        vec3 displaced = vec3(position.x, position.y - fall, position.z + waveZ);


        if (pastAmount > 0.0) {
            float h4 = stripHash(stripId + 30.0);
            float h5 = stripHash(stripId + 40.0);
            float angle = pastAmount * pastAmount * (h4 * 2.0 - 1.0) * 3.0;
            float stripCenterY = (aStripIndex + 0.5) / uNumStrips - 0.5;
            float localY = displaced.y - stripCenterY;
            float localZ = displaced.z;
            float cosA = cos(angle);
            float sinA = sin(angle);
            displaced.y = stripCenterY + localY * cosA - localZ * sinA;
            displaced.z = localY * sinA + localZ * cosA;


            float angleX = pastAmount * pastAmount * (h5 * 2.0 - 1.0) * 2.0;
            float localX = displaced.x;
            float localZ2 = displaced.z;
            float cosB = cos(angleX);
            float sinB = sin(angleX);
            displaced.x = localX * cosB - localZ2 * sinB;
            displaced.z = localX * sinB + localZ2 * cosB;
        }


        float dzdx = uWaviness * (cos(p1) * 5.0 * 3.0 + cos(p2) * 3.0 * 2.0);
        float dzdy = uWaviness * (cos(p1) * 3.0 * 3.0 - cos(p2) * 4.0 * 2.0 + cos(p3) * 6.0 * 1.5);
        float normalScale = 1.0;
        vec3 surfNormal = normalize(vec3(-dzdx * normalScale, -dzdy * normalScale, 1.0));

        vec3 viewNormal = normalize(normalMatrix * surfNormal);
        vMatcapUv = viewNormal.xy * 0.5 + 0.5;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
`,Gx=`



    precision highp float;

    uniform sampler2D uTexture;
    uniform sampler2D uMatcap;
    uniform float uOpacity;
    uniform float uNumStrips;
    uniform float uMatcapStrength;
    uniform float uBrightness;


    uniform vec2 uTexOffset;
    uniform vec2 uTexScale;

    varying vec2 vUv;
    varying float vStripBelowAmount;
    varying float vStripId;
    varying vec2 vMatcapUv;


    float tearHash(float p) {
        p = fract(p * 0.1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
    }

    float tearNoise(float p) {
        float i = floor(p);
        float f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(tearHash(i), tearHash(i + 1.0), f);
    }

    float tearFbm(float p) {
        return tearNoise(p) * 0.5
             + tearNoise(p * 2.0 + 5.7) * 0.3
             + tearNoise(p * 4.0 + 11.3) * 0.2;
    }

    void main() {

        if (vStripBelowAmount > 0.01) {
            float localV = fract(vUv.y * uNumStrips);
            float tearDepth = 0.15 * smoothstep(0.0, 0.3, vStripBelowAmount);
            float seed = vStripId * 13.7;

            float tearBottom = tearFbm(vUv.x * 35.0 + seed) * tearDepth;
            float tearTop = tearFbm(vUv.x * 35.0 + seed + 100.0) * tearDepth;

            if (localV < tearBottom || localV > 1.0 - tearTop) {
                discard;
            }
        }


        vec2 mcUv = gl_FrontFacing ? vMatcapUv : vec2(1.0 - vMatcapUv.x, 1.0 - vMatcapUv.y);
        vec3 matcapColor = texture2D(uMatcap, mcUv).rgb;
        vec3 lighting = mix(vec3(1.0), matcapColor, uMatcapStrength) * uBrightness;


        if (!gl_FrontFacing) {
            vec3 backBase = vec3(0.341, 0.333, 0.286);
            gl_FragColor = vec4(backBase * lighting, uOpacity);
            return;
        }

        vec2 atlasUv = vUv * uTexScale + uTexOffset;
        vec4 texColor = texture2D(uTexture, atlasUv);
        gl_FragColor = vec4(texColor.rgb * lighting, texColor.a * uOpacity);
    }
`;function Hx(e,{waviness:t=.02,numStrips:i=10,opacity:r=1,seed:a=0,matcap:s=null,matcapStrength:n=1,brightness:o=1,texOffset:u=[0,0],texScale:h=[1,1]}={}){return new lt({vertexShader:kx,fragmentShader:Gx,uniforms:{uTexture:{value:e},uMatcap:{value:s},uShredProgress:{value:0},uNumStrips:{value:i},uWaviness:{value:t},uTime:{value:0},uSeed:{value:a},uOpacity:{value:r},uMatcapStrength:{value:n},uBrightness:{value:o},uTexOffset:{value:new oe(u[0],u[1])},uTexScale:{value:new oe(h[0],h[1])}},transparent:!0,side:2,depthWrite:!0,depthTest:!0})}var zx=`



    precision highp float;

    uniform float uWaviness;
    uniform float uTime;
    uniform float uSeed;

    varying vec2 vUv;
    varying vec2 vMatcapUv;

    void main() {
        vUv = uv;


        float s = uSeed * 6.283;
        float p1 = uTime * 1.2 + uv.x * 5.0 + uv.y * 3.0 + s;
        float p2 = uTime * 1.8 + uv.x * 3.0 - uv.y * 4.0 + s * 1.7;
        float p3 = uTime * 0.7 + uv.y * 6.0 + s * 2.3;
        float waveZ = uWaviness * (
            sin(p1) * 3.0 + sin(p2) * 2.0 + sin(p3) * 1.5
        );

        vec3 displaced = vec3(position.x, position.y, position.z + waveZ);


        float dzdx = uWaviness * (cos(p1) * 5.0 * 3.0 + cos(p2) * 3.0 * 2.0);
        float dzdy = uWaviness * (cos(p1) * 3.0 * 3.0 - cos(p2) * 4.0 * 2.0 + cos(p3) * 6.0 * 1.5);
        vec3 surfNormal = normalize(vec3(-dzdx, -dzdy, 1.0));

        vec3 viewNormal = normalize(normalMatrix * surfNormal);
        vMatcapUv = viewNormal.xy * 0.5 + 0.5;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
`,Vx=`



    precision highp float;

    uniform sampler2D uTexture;
    uniform sampler2D uMatcap;
    uniform float uOpacity;
    uniform float uMatcapStrength;
    uniform float uBrightness;
    uniform float uSeed;


    uniform vec2 uTexOffset;
    uniform vec2 uTexScale;

    varying vec2 vUv;
    varying vec2 vMatcapUv;




    float tearHash(float p) {
        p = fract(p * 0.1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
    }

    float tearNoise(float p) {
        float i = floor(p);
        float f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(tearHash(i), tearHash(i + 1.0), f);
    }

    float tearFbm(float p) {
        return tearNoise(p) * 0.5
             + tearNoise(p * 2.0 + 5.7) * 0.3
             + tearNoise(p * 4.0 + 11.3) * 0.2;
    }

    void main() {

        float tearDepth = 0.12;
        float seed = uSeed * 13.7;

        float tearBottom = tearFbm(vUv.x * 35.0 + seed) * tearDepth;
        float tearTop = tearFbm(vUv.x * 35.0 + seed + 100.0) * tearDepth;

        if (vUv.y < tearBottom || vUv.y > 1.0 - tearTop) {
            discard;
        }


        vec2 mcUv = gl_FrontFacing ? vMatcapUv : vec2(1.0 - vMatcapUv.x, 1.0 - vMatcapUv.y);
        vec3 matcapColor = texture2D(uMatcap, mcUv).rgb;
        vec3 lighting = mix(vec3(1.0), matcapColor, uMatcapStrength) * uBrightness;


        if (!gl_FrontFacing) {
            vec3 backBase = vec3(0.341, 0.333, 0.286);
            gl_FragColor = vec4(backBase * lighting, uOpacity);
            return;
        }

        vec2 atlasUv = vUv * uTexScale + uTexOffset;
        vec4 texColor = texture2D(uTexture, atlasUv);
        gl_FragColor = vec4(texColor.rgb * lighting, texColor.a * uOpacity);
    }
`;function Wx(e,{waviness:t=.015,opacity:i=1,seed:r=0,matcap:a=null,matcapStrength:s=1,brightness:n=1,texOffset:o=[0,0],texScale:u=[1,1]}={}){return new lt({vertexShader:zx,fragmentShader:Vx,uniforms:{uTexture:{value:e},uMatcap:{value:a},uWaviness:{value:t},uTime:{value:0},uSeed:{value:r},uOpacity:{value:i},uMatcapStrength:{value:s},uBrightness:{value:n},uTexOffset:{value:new oe(o[0],o[1])},uTexScale:{value:new oe(u[0],u[1])}},transparent:!0,side:2,depthWrite:!0,depthTest:!0})}var qx=`
  attribute float aSize;
  attribute float aSeed;
  uniform float uPixelRatio;
  uniform float uTime;
  uniform float uZOffset;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    vec3 pos = position;
    pos.z += uZOffset;
    pos.x += sin(uTime * 0.3 + aSeed * 6.283) * 0.15;
    pos.y += sin(uTime * 0.2 + aSeed * 4.1) * 0.1;
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (1.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
    float depth = -mvPos.z;
    vAlpha = smoothstep(12.0, 4.0, depth) * smoothstep(0.3, 1.0, depth) * uOpacity;
  }
`,Xx=`
  precision mediump float;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, d) * vAlpha;
    gl_FragColor = vec4(0.5,0.5,0.5, alpha);
  }
`;function Yx(e){return new lt({vertexShader:qx,fragmentShader:Xx,uniforms:{uPixelRatio:{value:e},uTime:{value:0},uZOffset:{value:0},uOpacity:{value:0}},transparent:!0,depthWrite:!1,blending:2})}var jx=`
  attribute float aSize;
  attribute float aSeed;
  uniform float uPixelRatio;
  uniform float uTime;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    vec3 pos = position;
    float t = uTime + aSeed * 20.0;
    pos.x += sin(t * 0.5 + aSeed * 6.283) * 0.08;
    pos.y += sin(t * 0.7 + aSeed * 4.1) * 0.06;
    pos.z += sin(t * 0.3 + aSeed * 3.7) * 0.06;
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (1.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
    float depth = -mvPos.z;
    vAlpha = smoothstep(3.0, 0.5, depth) * smoothstep(0.05, 0.2, depth) * uOpacity;
    vSeed = aSeed;
  }
`,Kx=`
  precision mediump float;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d) * vAlpha;

    vec3 col = mix(vec3(1.0, 0.3, 0.05), vec3(1.0, 0.5, 0.08), vSeed);
    gl_FragColor = vec4(col, alpha);
  }
`;function Jx(e){return new lt({vertexShader:jx,fragmentShader:Kx,uniforms:{uPixelRatio:{value:e},uTime:{value:0},uOpacity:{value:0}},transparent:!0,depthWrite:!1,blending:2})}function Cc(e){let t=e.components;if(!t||!t.tunnelGroup)return;let i=t.tunnelGroup.position,r=(e._stage3HoldZoomT||0)*Ln,a=e.camera.position.z+r+Be.planeAhead,s=t.tunnelPlane;s&&(s.position.set(-i.x,-i.y,a-i.z),s.scale.setScalar(s.userData.baseScale*Be.planeSize));let n=t.tunnelCircle;n&&(n.position.set(-i.x,-i.y,a+Be.circleBehind-i.z),n.scale.setScalar(Be.circleRadiusScale))}var Mn=[{position:[.022,0,0],rotation:[0,0,0],scale:1,burnStart:.3,burnEnd:1.5},{position:[.2,.05,-.3],rotation:[15,-25,35],scale:.8,burnStart:.15,burnEnd:.9},{position:[-.2,-.15,-.15],rotation:[-20,45,-60],scale:.9,burnStart:.25,burnEnd:1.25},{position:[.1,.1,.15],rotation:[25,-45,-40],scale:1,burnStart:.1,burnEnd:1.3},{position:[.05,-.07,.6],rotation:[-15,20,30],scale:.85,burnStart:.2,burnEnd:1.5},{position:[-.05,.3,-.3],rotation:[-15,20,30],scale:.85,burnStart:.2,burnEnd:1.5},{position:[.4,-.2,-.1],rotation:[30,-40,20],scale:.75,burnStart:.35,burnEnd:1.2},{position:[-.35,.25,-.15],rotation:[-25,35,-45],scale:.7,burnStart:.4,burnEnd:1.3},{position:[.15,-.3,-.2],rotation:[40,-20,55],scale:.65,burnStart:.45,burnEnd:1.4},{position:[-.25,.15,-.25],rotation:[-35,50,-30],scale:.72,burnStart:.38,burnEnd:1.25}],Mc=new P(0,0,.19),Ic=new P(0,0,2),Tc=90,Ln=1.5,Zx=3,$x=1.3,eE=4,tE=.02,In=new P(-.022,0,.01),Sa={x:0,y:0,z:0},rr={x:0,y:0,z:90},ul={x:180,y:0,z:90},_s={id:"stage3",scrollVh:325,autoScroll:!1,deferPreviousTeardown:!0,async enter(e){if(e.assetLoader.loadStageAssets("stage4"),Bp(e,"stage3"),e._stage3BlurBase=0,e.lensBlurPass){let g=e.lensBlurPass.uniforms.uMaxBlur.value;e._stage3BlurBase=g>.01?g:qn.preset.lensBlur.maxBlur}let t=e.whiteTex.clone();if(e._pendingTeardown&&(e._pendingTeardown=(e._pendingTeardown(),null)),!e._stage3Background2){let g=e.bgPass&&e.bgPass.uniforms.uViewportAspect.value||e._vw/e._vh||1.7777777777777777,A=new Uint8Array(256*256*4),_=[134,163,144],v=[68,102,82],x=[34,52,42];for(let y=0;y<256;y++){let T=y/255-1;for(let b=0;b<256;b++){let E=(b/255-.5)*g,I=Math.sqrt(E*E+T*T),B=I>1?1:I,G,X,R;if(B<.5){let N=B/.5;G=_[0]+(v[0]-_[0])*N,X=_[1]+(v[1]-_[1])*N,R=_[2]+(v[2]-_[2])*N}else{let N=(B-.5)/.5;G=v[0]+(x[0]-v[0])*N,X=v[1]+(x[1]-v[1])*N,R=v[2]+(x[2]-v[2])*N}let D=(y*256+b)*4;A[D+0]=G|0,A[D+1]=X|0,A[D+2]=R|0,A[D+3]=255}}let C=new Kt(A,256,256,mt,Gt);C.colorSpace=Ye,C.minFilter=qe,C.magFilter=qe,C.wrapS=Li,C.wrapT=Li,C.generateMipmaps=!1,C.needsUpdate=!0,e.renderer&&e.renderer.initTexture(C),e._stage3Background2=C}let i=e.assetLoader.getAsset("moneyShredsAtlas"),r=2048,a={offset:[1474/r,1-1284/r],scale:[574/r,1284/r]},s=new ia(.345,.15,16,8),n=Math.PI/180,o=[],u=[];for(let g=0;g<Mn.length;g++){let A=Mn[g],_=Bx(i,{direction:"out2in",aspect:2.3,seed:g*.33,burnDelay:0,burnSpeed:1,texOffset:a.offset,texScale:a.scale,texRotate:1}),v=new dt(s,_);v.position.set(...A.position),v.rotation.set(A.rotation[0]*n,A.rotation[1]*n,A.rotation[2]*n),v.scale.setScalar(A.scale),v.frustumCulled=!1,v.userData.initRot={x:A.rotation[0]*n,y:A.rotation[1]*n,z:A.rotation[2]*n},v.userData.rotSeed=Math.random(),e.scene.add(v),u.push(v),g===0?_.uniforms.uWaveAmp.value=0:_.uniforms.uWaveAmp.value=.015,o.push(_)}await rl();let h=new xd(.06,64),d=h.attributes.uv;for(let g=0;g<d.count;g++){let A=d.getX(g),_=d.getY(g);_=(_-.5)*1.2+.5,d.setXY(g,A,_)}d.needsUpdate=!0;let l=new Si({map:t,side:2,depthWrite:!0,depthTest:!0}),c=new dt(h,l),p=Mn[0];c.position.set(...p.position),c.position.add(In),c.rotation.set(p.rotation[0]*n,p.rotation[1]*n,p.rotation[2]*n),c.scale.set(.88,1.05,1),e.scene.add(c),e.components={...e.components,billPlanes:u,billMaterials:o,billGeo:s,portalCircle:c,portalCircleGeo:h,portalMat:l,portalTex:t},rE(e),e.bgPass&&(Xr(e.bgPass,"A","stage3Background1",e.assetLoader,!0),e._stage3Background2&&(Gs(e.bgPass,"B",e._stage3Background2,!0,!0),e.bgPass.uniforms.uLinearizeB.value=1),e.bgPass.uniforms.uProgress.value=0,e.bgPass.uniforms.uOpacity.value=1,e.bgPass.uniforms.uBgParallaxAmp&&(e.bgPass.uniforms.uBgParallaxAmp.value=tE,e.bgPass.uniforms.uBgParallax.value.set(0,0)));let f=e.assetLoader.getAsset("textsAtlas");if(f){e.renderer&&(f.anisotropy=e.renderer.capabilities.getMaxAnisotropy());let g=[{texture:f,atlasUV:Bi(0,371.64,365.21,186.82),aspect:Ri(365.21,186.82),baseScale:.25,anchor:"bottom-left",appearAt:.05,disappearAt:.3},{texture:f,atlasUV:Bi(505.51,604.41,594.62,355.65),aspect:Ri(594.62,355.65),baseScale:.4,anchor:"center-center",appearAt:.3,disappearAt:.4},{texture:f,atlasUV:Bi(363.64,371.64,337.74,186.82),aspect:Ri(337.74,186.82),baseScale:.25,anchor:"top-left",appearAt:.4,disappearAt:.6},{texture:f,atlasUV:Bi(0,1023,482.83,168.84),aspect:Ri(482.83,168.84),baseScale:.25,anchor:"bottom-right",appearAt:.5,disappearAt:.6},{texture:f,atlasUV:Bi(0,744.27,472.68,278.73),aspect:Ri(472.68,278.73),baseScale:.25,anchor:"center-center",appearAt:.6,disappearAt:.7},{texture:f,atlasUV:Bi(775.24,0,521.92,325.68),aspect:Ri(521.92,325.68),baseScale:.38,anchor:"center-center",appearAt:.7,disappearAt:.8},{texture:f,atlasUV:Bi(771,1542,667,221),aspect:Ri(667,221),baseScale:.38,anchor:"center-center",appearAt:.8,disappearAt:.87},{texture:f,atlasUV:Bi(700.32,371.64,331.52,232.77),aspect:Ri(331.52,232.77),baseScale:.25,anchor:"top-left",appearAt:.87,disappearAt:.99},{texture:f,atlasUV:Bi(1030.99,325.68,334.61,232.77),aspect:Ri(334.61,232.77),baseScale:.25,anchor:"bottom-right",appearAt:.93,disappearAt:.99}],A=new _u(e.textScene,g);A.resize(e._vw,e._vh),e.components.textLayout=A}let m=Math.PI/180;e._stage3QuatA=new _t().setFromEuler(new ea(rr.x*m,rr.y*m,rr.z*m)),e._stage3QuatB=new _t().setFromEuler(new ea((rr.x+ul.x)*m,(rr.y+ul.y)*m,(rr.z+ul.z)*m)),e.camera.position.copy(Mc),e.camera.quaternion.identity(),e.cameraRig.setEnabled(!0),e.cameraRig.influence=0,window.addEventListener("mousemove",e._onMouseMove),_s.scrub(e,0)},scrub(e,t){e._scrollProgress=t,e.cameraRig.influence=kt(t,0,.05)*.3,e.bgPass.uniforms.uProgress.value=kt(t,.175,.35),e.bgPass.uniforms.uOpacity.value=1,t>.15&&!e._stage3DeferredStarted&&(e._stage3DeferredStarted=!0,(async()=>{let h=e.renderer,d=h&&h.compileAsync?()=>h.compileAsync(e.scene,e.camera):h&&h.compile?()=>{h.compile(e.scene,e.camera)}:()=>{};Fp(e),await d(),await rl(),Op(e),await d(),await rl(),kp(e),Hp(e),await d()})());let i=e.components;if(i.billPlanes){let h=t<.4;for(let d of i.billPlanes)d.visible=h}if(i.emberMat){let h=kt(t,0,.05),d=1-kt(t,.2,.35);i.emberMat.uniforms.uOpacity.value=Math.min(h,d),i.emberPoints&&(i.emberPoints.visible=t<.35)}let r=Math.min(t/.35,1);e.camera.position.lerpVectors(Mc,Ic,r);let a=Math.PI/180;if(t<=.35&&(e.camera.rotation.set((Sa.x+(rr.x-Sa.x)*r)*a,(Sa.y+(rr.y-Sa.y)*r)*a,(Sa.z+(rr.z-Sa.z)*r)*a),e._stage3CamBaseZ=void 0),i.portalMat&&(i.portalMat.opacity=1-kt(t,0,.056),i.portalMat.transparent=!0),i.billPlanes){e._billBurnAudioIds||(e._billBurnAudioIds=Array(i.billPlanes.length).fill(null));for(let h=0;h<i.billPlanes.length;h++){let d=i.billPlanes[h],l=Mn[h],c=kt(r,l.burnStart,l.burnEnd);i.billMaterials[h].uniforms.uBurnProgress.value=c;let p=!(c>=.95||r>=1)&&c>.001,f=e._billBurnAudioIds[h];if(p){if(f??(e._billBurnAudioIds[h]=Je.playInstance("money-burn",{volume:0,fadeIn:0})),e._billBurnAudioIds[h]!=null){let T=4*c*(1-c);Je.setInstanceLevel("money-burn",e._billBurnAudioIds[h],{volume:.05*T})}}else f!=null&&(Je.stopInstance("money-burn",f),e._billBurnAudioIds[h]=null);h===0&&(i.billMaterials[h].uniforms.uWaveAmp.value=kt(r,.2,.4)*.015);let m=l.position[2],g=.3+d.userData.rotSeed*.7;d.position.z=m+r*g;let A=d.userData.rotSeed,_=d.userData.initRot,v=r*1.5,x=_.x+Math.sin(A*6.283+r*3)*v,C=_.y+Math.cos(A*4.1+r*2.5)*v,y=_.z+Math.sin(A*3.7+r*4)*v*.5;d.rotation.set(x,C,y),h===0&&i.portalCircle&&(i.portalCircle.position.x=d.position.x+In.x,i.portalCircle.position.y=d.position.y+In.y,i.portalCircle.position.z=d.position.z+In.z,i.portalCircle.rotation.set(x,C,y))}}let s=t>.35?kt(t,.35,1):0,n=s*Tc*.75;e._stage3P=t;let o=kt(t,.2,.95),u=o<.5?4*o*o*o:1-(-2*o+2)**3/2;if(i.certMeshes&&i.certSpreadPositions){i.certConvergeRotOffsets||(i.certConvergeRotOffsets=[]);for(let h=0;h<i.certMeshes.length;h++){let d=i.certMeshes[h],l=i.certSpreadPositions[h],c=i.certTunnelPositions[h];d.position.x=l[0]+(c.position[0]-l[0])*u,d.position.y=l[1]+(c.position[1]-l[1])*u,d.position.z=l[2]+(c.position[2]-l[2])*u+n;let p=i.certSeeds[h],f=u*2;i.certConvergeRotOffsets[h]=[Math.sin(p*6.283+u*4)*f,Math.cos(p*4.1+u*3.5)*f,Math.sin(p*3.7+u*5)*f*.6]}}if(t>.35){let h=kt(t,.35,.385),d=h<.5?2*h*h:1-(-2*h+2)**2/2;e.camera.quaternion.slerpQuaternions(e._stage3QuatA,e._stage3QuatB,d),t<.9&&(e._stage3HoldZoomT||0)>0&&(mr.killTweensOf(e,"_stage3HoldZoomT"),e._stage3HoldZoomT=0),e._stage3CamBaseZ=Ic.z+s*Tc;let l=(e._stage3HoldZoomT||0)*Ln;if(e.camera.position.z=e._stage3CamBaseZ-l,i.shredMeshes)for(let g=0;g<i.shredMeshes.length;g++)i.shredMeshes[g].position.z=Qp[g].position[2]+n;if(i.tunnelGroup&&(i.tunnelGroup.position.z=Gp+n),i.tunnelLight&&i.tunnelGroup){let g=e.camera.position.z-i.tunnelGroup.position.z;i.tunnelLight.position.z=g+Be.nearLightAhead}let c=+(t>=.85);if(i.tunnelMaterials)for(let g of i.tunnelMaterials)g.opacity=c;i.tunnelLight&&(i.tunnelLight.intensity=Be.nearLightIntensity*c),e.lensBlurPass&&e._stage3BlurBase!==void 0&&(e.lensBlurPass.uniforms.uMaxBlur.value=e._stage3BlurBase*(1-c));let p=c,f=c;i.tunnelPlane&&(i.tunnelPlane.visible=p>.001,i.tunnelPlane.material.opacity=p*.99),i.tunnelCircle&&(i.tunnelCircle.visible=p>.001,i.tunnelCircle.material.opacity=p),i.tunnelPulseUniforms&&(i.tunnelPulseUniforms.uPlaneGlowZ.value=e.camera.position.z+Be.planeGlowAhead,i.tunnelPulseUniforms.uPlaneGlowStrength.value=f*Be.planeGlowStrength,i.tunnelPulseUniforms.uPlaneGlowWidth.value=Be.planeGlowWidth);let m=kt(t,.385,.455);if(i.certMaterials)for(let g of i.certMaterials)g.uniforms.uOpacity.value=m;if(i.shredMaterials)for(let g of i.shredMaterials)g.uniforms.uOpacity.value=m;if(i.dustMat&&(i.dustMat.uniforms.uOpacity.value=m,i.dustMat.uniforms.uZOffset.value=n),e.bgPass){e.bgPass.uniforms.uProgress.value=1;let g=1-kt(t,.55,.7);e.bgPass.uniforms.uOpacity.value=g}if(i.certMaterials){let g=kt(t,.45,.9)*2.5;for(let A of i.certMaterials)A.uniforms.uShredProgress.value=g}}},update(e,t,i){e.cameraRig.update(i),e.bgPass&&e.bgPass.uniforms.uBgParallaxAmp?.value>0&&e.bgPass.uniforms.uBgParallax.value.set(e.cameraRig.cursorX,e.cameraRig.cursorY);let r=e.components;if(e._stage3CamBaseZ!==void 0){let a=(e._stage3HoldZoomT||0)*Ln;if(e.camera.position.z=e._stage3CamBaseZ-a,r.tunnelGroup){if(r.tunnelLight){let s=e.camera.position.z-r.tunnelGroup.position.z;r.tunnelLight.position.z=s+Be.nearLightAhead}Cc(e),r.tunnelPulseUniforms&&(r.tunnelPulseUniforms.uPlaneGlowZ.value=e.camera.position.z+Be.planeGlowAhead)}}if(r.billMaterials)for(let a of r.billMaterials)a.uniforms.uTime.value+=i;if(sE(e,i,e._stage3HoldZoomT||0),r.textLayout&&r.textLayout.update(e._scrollProgress,i),r.certMeshes)for(let a=0;a<r.certMeshes.length;a++){let s=r.certMeshes[a],n=r.certMaterials[a];n.uniforms.uTime.value+=i;let o=r.certSeeds[a],u=r.certBaseRotations[a],h=(o*2-1)*.15,d=(o*3.7%1*2-1)*.15,l=(o*7.3%1*2-1)*.1,c=r.certConvergeRotOffsets?r.certConvergeRotOffsets[a]:null;s.rotation.x=u[0]+t*h+Math.sin(t*.4+o*6.283)*.08+(c?c[0]:0),s.rotation.y=u[1]+t*d+Math.sin(t*.3+o*4.1)*.1+(c?c[1]:0),s.rotation.z=u[2]+t*l+Math.sin(t*.25+o*3.7)*.05+(c?c[2]:0)}if(r.dustMat&&(r.dustMat.uniforms.uTime.value=t),r.emberMat&&(r.emberMat.uniforms.uTime.value=t),r.shredMeshes)for(let a=0;a<r.shredMeshes.length;a++){let s=r.shredMeshes[a],n=r.shredMaterials[a];n.uniforms.uTime.value+=i;let o=r.shredSeeds[a],u=r.shredBaseRotations[a];s.rotation.x=u[0]+Math.sin(t*.3+o*6.283)*.12,s.rotation.y=u[1]+Math.sin(t*.25+o*4.1)*.15,s.rotation.z=u[2]+Math.sin(t*.2+o*3.7)*.08}},holdTrigger:{showAt:.95,hideAt:.9,ripple:!1,holdDuration:1.5,endHintText:`TAP
HOLD`,onHoldStart:(e,{resumeT:t}={})=>{mr.killTweensOf(e,"_stage3HoldZoomT"),t||(e._stage3HoldZoomT=0)},onHoldProgress:(e,t)=>{e._stage3HoldZoomT=t*t*(3-2*t)},onHoldCancel:e=>{mr.killTweensOf(e,"_stage3HoldZoomT"),mr.to(e,{_stage3HoldZoomT:0,duration:.3,ease:"power2.out"})},onHoldComplete:e=>{if(mr.killTweensOf(e,"_stage3HoldZoomT"),e._stage3HoldZoomT=0,e._stage3CamBaseZ!==void 0){e.camera.position.z=e._stage3CamBaseZ-Ln;let t=e.components;if(t&&t.tunnelGroup){if(t.tunnelLight){let i=e.camera.position.z-t.tunnelGroup.position.z;t.tunnelLight.position.z=i+Be.nearLightAhead}Cc(e)}}}},teardown(e){let t=e.components;if(e.lensBlurPass&&e._stage3BlurBase&&(e.lensBlurPass.uniforms.uMaxBlur.value=e._stage3BlurBase),delete e._stage3BlurBase,e._billBurnAudioIds){for(let i of e._billBurnAudioIds)i!=null&&Je.stopInstance("money-burn",i);e._billBurnAudioIds=null}if(t.billPlanes)for(let i of t.billPlanes)i.material.dispose(),e.scene.remove(i);if(t.billGeo&&t.billGeo.dispose(),t.portalCircle&&(t.portalCircle.material.dispose(),t.portalCircle.geometry.dispose(),e.scene.remove(t.portalCircle)),t.portalTex&&t.portalTex.dispose(),t.textLayout&&t.textLayout.dispose(),t.certMeshes)for(let i of t.certMeshes)e.scene.remove(i);if(t.certMaterials)for(let i of t.certMaterials)i.dispose();if(t.certGeo&&t.certGeo.dispose(),t.shredMeshes)for(let i of t.shredMeshes)e.scene.remove(i);if(t.shredMaterials)for(let i of t.shredMaterials)i.dispose();if(t.shredGeo&&t.shredGeo.dispose(),t.dustPoints&&e.scene.remove(t.dustPoints),t.dustGeo&&t.dustGeo.dispose(),t.dustMat&&t.dustMat.dispose(),t.emberPoints&&e.scene.remove(t.emberPoints),t.emberGeo&&t.emberGeo.dispose(),t.emberMat&&t.emberMat.dispose(),t.tunnelMaterials)for(let i of t.tunnelMaterials)i.dispose();t.tunnelModel&&t.tunnelModel.traverse(i=>{i.isMesh&&i.geometry&&i.geometry.dispose()}),t.tunnelLight&&t.tunnelLight.dispose(),t.tunnelPlane&&(t.tunnelPlane.geometry.dispose(),t.tunnelPlane.material.dispose()),t.tunnelCircle&&(t.tunnelCircle.geometry.dispose(),t.tunnelCircle.material.dispose()),t.tunnelGroup&&e.scene.remove(t.tunnelGroup),e.cameraRig.setEnabled(!1),window.removeEventListener("mousemove",e._onMouseMove),e._gate2AnimOffset=0,mr.killTweensOf(e,"_stage3HoldZoomT"),e._stage3HoldZoomT=0,e._stage3CamBaseZ=void 0,e.bgPass&&(e.bgPass.uniforms.uLinearizeA.value=0,e.bgPass.uniforms.uLinearizeB.value=0,e.bgPass.uniforms.uBgParallaxAmp&&(e.bgPass.uniforms.uBgParallaxAmp.value=0,e.bgPass.uniforms.uBgParallax.value.set(0,0))),e._stage3Background2&&(e._stage3Background2=(e._stage3Background2.dispose(),null)),e.assetLoader.disposeTextures(["stage3Background1","stage3Atlas"])}},Ol=[{position:[.6,-.4,6],rotation:[3.44,-.2,.1],scale:.85},{position:[.7,.85,9.5],rotation:[2.64,.4,-.3],scale:.8},{position:[-.6,-.7,13.5],rotation:[3.74,-.7,.5],scale:.82},{position:[1,-.35,8],rotation:[2.84,.8,-.6],scale:.88},{position:[-.85,.55,15.5],rotation:[3.84,-.5,.4],scale:.78},{position:[.4,-1.05,11],rotation:[2.34,.3,-.2],scale:.83},{position:[-.35,.75,18],rotation:[3.54,.6,-.5],scale:.8},{position:[.75,.3,12.5],rotation:[2.54,-.4,.7],scale:.86},{position:[-1.05,-.3,7.5],rotation:[3.2,.6,-.4],scale:.76},{position:[.3,1.1,14.5],rotation:[2.9,-.8,.3],scale:.84},{position:[-.4,-1.2,9],rotation:[3.6,.3,.6],scale:.79},{position:[1.1,.6,17],rotation:[2.5,-.6,-.5],scale:.87},{position:[.07,-.55,20],rotation:[3.3,.9,.2],scale:.81},{position:[-1.2,.2,10.5],rotation:[2.7,-.3,.8],scale:.75},{position:[.55,.7,21.5],rotation:[3.5,-.4,-.7],scale:.83},{position:[-.75,-.9,18.5],rotation:[2.8,.7,.4],scale:.77}],wc=.95,iE=Ol.map(e=>({position:[e.position[0]*.85,e.position[1]*.85,e.position[2]]}));function Fp(e){let t=Ol.length,i=Ox(1.4,1,10,32),r=2048,a=[[0,0,658,512],[658,0,658,512],[1316,0,658,512],[0,512,658,512],[0,1024,658,512],[0,1536,658,512],[658,1536,658,512],[1316,1536,658,512]],s=a.length,n=e.assetLoader.getAsset("certAtlas"),o=a.map(([f,m,g,A])=>({offset:[f/r,1-(m+A)/r],scale:[g/r,A/r]})),u=e.assetLoader.getAsset("certMatcap")||Rp("assets/textures/matcap-certificate.webp",{assetLoader:e.assetLoader}),h=[],d=[],l=[],c=[],p=[];for(let f=0;f<t;f++){let m=Math.random(),g=o[f%s],A=Hx(n,{numStrips:10,waviness:.015+Math.random()*.01,seed:m,matcap:u,opacity:0,texOffset:g.offset,texScale:g.scale}),_=new dt(i,A),v=Ol[f],x=[v.position[0]*wc,v.position[1]*wc,v.position[2]];_.position.set(...x),_.rotation.set(...v.rotation),_.scale.setScalar(v.scale);let C=[...v.rotation];e.scene.add(_),h.push(_),d.push(A),l.push(m),c.push(C),p.push(x)}e.components.certMeshes=h,e.components.certMaterials=d,e.components.certSeeds=l,e.components.certBaseRotations=c,e.components.certSpreadPositions=p,e.components.certTunnelPositions=iE,e.components.certGeo=i}var Qp=[{position:[.25,-.15,12],rotation:[3.3,.1,3.19],scale:.3},{position:[-.2,.25,13.5],rotation:[3,-.3,3.34],scale:.28},{position:[.3,-.2,15],rotation:[3.5,.4,2.99],scale:.25},{position:[-.3,.35,16.5],rotation:[2.9,-.2,3.44],scale:.3},{position:[.2,-.25,18],rotation:[3.4,.3,3.04],scale:.26},{position:[-.2,.1,19.5],rotation:[3.1,-.5,3.39],scale:.28}];function Op(e){let t=e.assetLoader.getAsset("certMatcap")||Rp("assets/textures/matcap-certificate.webp",{assetLoader:e.assetLoader}),i=new ia(1,1.8,16,16),r=2048,a=[[0,0,492,912],[492,0,492,912],[982,0,492,912],[0,911,491,1137],[492,913,490,1135],[983,912,491,911]],s=e.assetLoader.getAsset("clubPaperAtlas")||e.assetLoader.getAsset("moneyShredsAtlas"),n=a.map(([c,p,f,m])=>({offset:[c/r,1-(p+m)/r],scale:[f/r,m/r]})),o=a.map(([,,c,p])=>c/p),u=[],h=[],d=[],l=[];for(let c=0;c<n.length;c++){let p=n[c],f=Math.random(),m=Wx(s,{waviness:.012+Math.random()*.008,seed:f,matcap:t,opacity:0,texOffset:p.offset,texScale:p.scale}),g=new dt(i,m),A=Qp[c],_=o[c];g.position.set(...A.position),g.rotation.set(...A.rotation),g.scale.set(A.scale,A.scale*.5555555555555556/_,A.scale),e.scene.add(g),u.push(g),h.push(m),d.push(f),l.push([...A.rotation])}e.components.shredMeshes=u,e.components.shredMaterials=h,e.components.shredSeeds=d,e.components.shredBaseRotations=l,e.components.shredGeo=i}function kp(e){let t=new Float32Array(750),i=new Float32Array(250),r=new Float32Array(250);for(let o=0;o<250;o++)t[o*3]=(Math.random()-.5)*3,t[o*3+1]=(Math.random()-.5)*3,t[o*3+2]=10+Math.random()*15,i[o]=15+Math.random()*20,r[o]=Math.random();let a=new ni;a.setAttribute("position",new ot(t,3)),a.setAttribute("aSize",new ot(i,1)),a.setAttribute("aSeed",new ot(r,1));let s=Yx(e.renderer.getPixelRatio()),n=new jl(a,s);n.frustumCulled=!1,e.scene.add(n),e.components.dustPoints=n,e.components.dustGeo=a,e.components.dustMat=s}function rE(e){let t=new Float32Array(450),i=new Float32Array(150),r=new Float32Array(150);for(let o=0;o<150;o++)t[o*3]=(Math.random()-.5)*.8,t[o*3+1]=(Math.random()-.5)*.6,t[o*3+2]=(Math.random()-.5)*.9,i[o]=5+Math.random()*7,r[o]=Math.random();let a=new ni;a.setAttribute("position",new ot(t,3)),a.setAttribute("aSize",new ot(i,1)),a.setAttribute("aSeed",new ot(r,1));let s=Jx(e.renderer.getPixelRatio()),n=new jl(a,s);n.frustumCulled=!1,e.scene.add(n),e.components.emberPoints=n,e.components.emberGeo=a,e.components.emberMat=s}var Gp=27,aE=8,Be={innerColor:"#42ffb7",innerEmissive:"#004216",innerEmissiveIntensity:.5,innerMetalness:.29,innerRoughness:.34,pulseSpeed:6,pulseSpacing:10,pulseWidth:.05,pulseGain:3,nearLightAhead:1.4,nearLightIntensity:.1,planeAhead:4,planeGlowAhead:7,planeSize:1,planeGlowStrength:.9,planeGlowWidth:2,bandSpacing:.67,bandWidth:.445,bandStrength:1,bandPhase:0,bandTransparent:!1,circleBehind:7,circleRadiusScale:1.85,gateSpinMax:2.5,gateSpinRamp:2};function bc(e,t){e.uniforms.uPulseTime=t.uPulseTime,e.uniforms.uPulseFreq=t.uPulseFreq,e.uniforms.uPulseWidth=t.uPulseWidth,e.uniforms.uPulseGain=t.uPulseGain,e.uniforms.uPlaneGlowZ=t.uPlaneGlowZ,e.uniforms.uPlaneGlowStrength=t.uPlaneGlowStrength,e.uniforms.uPlaneGlowWidth=t.uPlaneGlowWidth,e.uniforms.uPlaneGlowColor=t.uPlaneGlowColor,e.uniforms.uBandFreq=t.uBandFreq,e.uniforms.uBandWidth=t.uBandWidth,e.uniforms.uBandStrength=t.uBandStrength,e.uniforms.uBandPhase=t.uBandPhase,e.uniforms.uBandTransparent=t.uBandTransparent,e.uniforms.uBandOrigin=t.uBandOrigin,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying float vTunnelZ;`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vTunnelZ = (modelMatrix * vec4(transformed, 1.0)).z;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying float vTunnelZ;
uniform float uPulseTime;
uniform float uPulseFreq;
uniform float uPulseWidth;
uniform float uPulseGain;
uniform float uPlaneGlowZ;
uniform float uPlaneGlowStrength;
uniform float uPlaneGlowWidth;
uniform vec3 uPlaneGlowColor;
uniform float uBandFreq;
uniform float uBandWidth;
uniform float uBandStrength;
uniform float uBandPhase;
uniform float uBandTransparent;
uniform float uBandOrigin;`),e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
    {
      // Band centre at fract()==0, travelling toward -Z (out of the tunnel,
      // toward the viewer) as time grows; min(q, 1-q) is the wrap-seamless
      // distance to the centre.
      float q = fract(vTunnelZ * uPulseFreq + uPulseTime);
      float bd = min(q, 1.0 - q);
      float band = 1.0 - smoothstep(0.0, uPulseWidth, bd);
      totalEmissiveRadiance *= 1.0 + uPulseGain * band;
    }
    {
      // Glow ring at the exit plane's world Z \u2014 ADDS uPlaneGlowColor emissive
      // in a band around uPlaneGlowZ, brightening as the plane fades in.
      float gd = abs(vTunnelZ - uPlaneGlowZ);
      float gband = 1.0 - smoothstep(0.0, uPlaneGlowWidth, gd);
      totalEmissiveRadiance += uPlaneGlowColor * (uPlaneGlowStrength * gband);
    }`),e.fragmentShader=e.fragmentShader.replace("#include <dithering_fragment>",`#include <dithering_fragment>
    {
      // Group-local Z: the tunnel group rides the camera during the cruise,
      // so raw world Z would make the bands slide with scroll.
      float bq = fract((vTunnelZ - uBandOrigin) * uBandFreq + uBandPhase);
      float bdist = min(bq, 1.0 - bq);
      float bmask = (1.0 - step(uBandWidth, bdist)) * uBandStrength;
      // Transparent mode at FULL strength must DISCARD (an alpha-0 fragment
      // still writes depth and would occlude the far wall); while fading it
      // alpha-blends instead \u2014 imperceptible against the gate whiteout.
      if (uBandTransparent > 0.5 && bmask > 0.995) discard;
      gl_FragColor.rgb *= 1.0 - bmask * (1.0 - uBandTransparent);
      gl_FragColor.a   *= 1.0 - bmask * uBandTransparent;
    }`)}function sE(e,t,i=0,r=1){let a=e.components&&e.components.tunnelPulseUniforms;if(!a)return;let s=Math.max(Be.pulseSpacing,.001)/(1+i*($x-1)),n=Be.pulseSpeed*(1+i*(Zx-1));a.uPulseTime.value+=n/s*t,a.uPulseFreq.value=1/s,a.uPulseWidth.value=Be.pulseWidth,a.uPulseGain.value=Be.pulseGain*(1+i*(eE-1)),a.uBandFreq.value=1/Math.max(Be.bandSpacing,.001),a.uBandWidth.value=Be.bandWidth,a.uBandStrength.value=Be.bandStrength*r,a.uBandPhase.value=Be.bandPhase,a.uBandTransparent.value=+!!Be.bandTransparent;let o=e.components&&e.components.tunnelGroup;a.uBandOrigin.value=o?o.position.z:0}function Hp(e){let t=e.assetLoader.getAsset("tunnelModel"),i=[],r={uPulseTime:{value:0},uPulseFreq:{value:1/Be.pulseSpacing},uPulseWidth:{value:Be.pulseWidth},uPulseGain:{value:Be.pulseGain},uPlaneGlowZ:{value:0},uPlaneGlowStrength:{value:0},uPlaneGlowWidth:{value:Be.planeGlowWidth},uPlaneGlowColor:{value:new ye(10336677)},uBandFreq:{value:1/Be.bandSpacing},uBandWidth:{value:Be.bandWidth},uBandStrength:{value:Be.bandStrength},uBandPhase:{value:Be.bandPhase},uBandTransparent:{value:+!!Be.bandTransparent},uBandOrigin:{value:0}},a=new Ci;if(a.position.set(0,0,Gp),t){let n=t.clone();n.frustumCulled=!1,n.scale.setScalar(.05);let o=[],u=1/0,h=-1/0;n.traverse(f=>{if(f.isMesh&&f.geometry){let m=f.geometry.attributes.position;for(let g=0;g<m.count;g++){let A=m.getY(g);A<u&&(u=A),A>h&&(h=A)}}});let d=u+(h-u)*.2,l=null;if(n.traverse(f=>{if(f.isMesh){if(f.name&&f.name.toLowerCase().includes("plane")){l=f;return}f.frustumCulled=!1;let m=new Fa({color:Be.innerColor,emissive:Be.innerEmissive,emissiveIntensity:Be.innerEmissiveIntensity,metalness:Be.innerMetalness,roughness:Be.innerRoughness,side:2,transparent:!0,depthWrite:!0,depthTest:!0});m.opacity=0,m.onBeforeCompile=g=>{bc(g,r),g.uniforms.uFadeZMin={value:u},g.uniforms.uFadeZEnd={value:d},g.vertexShader=g.vertexShader.replace("#include <common>",`#include <common>
varying float vModelZ;`),g.vertexShader=g.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vModelZ = position.y;`),g.fragmentShader=g.fragmentShader.replace("#include <common>",`#include <common>
varying float vModelZ;
uniform float uFadeZMin;
uniform float uFadeZEnd;`),g.fragmentShader=g.fragmentShader.replace("#include <dithering_fragment>",`#include <dithering_fragment>
gl_FragColor.a *= smoothstep(uFadeZMin, uFadeZEnd, vModelZ);`)},m.customProgramCacheKey=()=>"tunnel-entrance-fade",f.material=m,i.push(m),o.push(f)}}),a.add(n),l){n.updateWorldMatrix(!0,!0),a.attach(l);let f=l.material;l.material=new Fa({color:0,emissive:10336677,emissiveIntensity:1,transparent:!0,opacity:1,side:2,depthWrite:!1}),f&&f.dispose&&f.dispose(),l.frustumCulled=!1,l.userData.baseScale=l.scale.x,l.scale.setScalar(l.userData.baseScale*Be.planeSize),e.components.tunnelPlane=l}n.updateWorldMatrix(!0,!0);let c=new Ui().setFromObject(n),p=c.max.z-c.min.z;if(p>0){let f=new Fa({color:Be.innerColor,emissive:Be.innerEmissive,emissiveIntensity:Be.innerEmissiveIntensity,metalness:Be.innerMetalness,roughness:Be.innerRoughness,side:2,transparent:!0,depthWrite:!0,depthTest:!0});f.opacity=0,f.onBeforeCompile=m=>bc(m,r),f.customProgramCacheKey=()=>"tunnel-pulse",i.push(f);for(let m=1;m<aE;m++){let g=n.clone();g.position.z+=p*m,a.add(g),g.traverse(A=>{A.isMesh&&(A.material=f,o.push(A))})}}{let f=new P;c.getSize(f);let m=new dt(new xd(Math.max(Math.min(f.x,f.y)/2,.01),64),new Si({color:16777215,side:2,transparent:!0,opacity:0,depthWrite:!1}));m.visible=!1,m.frustumCulled=!1,a.add(m),e.components.tunnelCircle=m}e.components.tunnelModel=n,e.components.tunnelSpinMeshes=o}let s=new Id(10208172,0,120,1.5);s.position.set(0,0,0),a.add(s);{let n=new Ui().setFromObject(a);e.components.tunnelChainLocalZMin=n.min.z-a.position.z,e.components.tunnelChainLocalZMax=n.max.z-a.position.z}e.scene.add(a),e.components.tunnelGroup=a,e.components.tunnelLight=s,e.components.tunnelMaterials=i,e.components.tunnelPulseUniforms=r}window.MTStory3D={async create(e){let t=e.querySelector(".story-canvas"),i=e.querySelector(".story-track"),r=e.querySelector(".story-stage"),a=new dd({canvas:t,alpha:!0,antialias:!1,powerPreference:"high-performance"}),s=a.getContext(),n=s.getExtension("WEBGL_debug_renderer_info"),o=n&&/swiftshader|llvmpipe|software/i.test(s.getParameter(n.UNMASKED_RENDERER_WEBGL)),u=new Gi,h=new zt(innerWidth<768?40:30,1,.1,120);u.add(h),h.position.z=.5,a.setClearColor(0,0),a.toneMapping=0,a.outputColorSpace=Ct;let d=new iv(a),l={"vendor/basis/basis_transcoder.wasm":"basis-wasm","vendor/draco/draco_decoder.wasm":"draco-wasm","assets/atlases/human_hands.ktx2":"hand-atlas","assets/atlases/texts.ktx2":"texts-atlas","assets/atlases/leather-money-shreds.ktx2":"money-atlas","assets/models/human_hand_2.glb":"hand-model","assets/models/camera_2.glb":"camera-model","assets/models/stage2_glass-shatter.glb":"fracture-model","assets/models/glass_shards.glb":"shard-model","assets/models/tunnel_new_new.glb":"tunnel-model"};d.manager.setURLModifier(Q=>{if(/^(?:data:|blob:)/.test(Q))return Q;let Z=Q.replace(/^\/assets\/reference\//,"");return l[Z]?"/index.php?scene-asset="+l[Z]:/^(?:https?:|\/assets\/reference\/)/.test(Q)?Q:"/assets/reference/"+Q.replace(/^\//,"")}),d.stageAssets.initial=d.stageAssets.initial.filter(Q=>["humanHandsAtlas","spcAtlas","textsAtlas","handMatcap"].includes(Q.key)),d.stageAssets.stage4=[],d.stageAssets.worldMap=[],d.stageAssets.stage3.push({type:"texture",key:"clubPaperAtlas",path:"assets/atlases/club-money-papers.webp",mipmaps:!1});let c={spcAtlas:"club-fragments.webp",certAtlas:"club-archive.webp"};for(let Q of Object.values(d.stageAssets).flat())c[Q.key]&&(Q.type="texture",Q.path="assets/atlases/"+c[Q.key],Q.mipmaps=!1);for(let Q of[...d.mandatoryAssets,...Object.values(d.stageAssets).flat()])Q.path&&(Q.path="/assets/reference/"+Q.path.replace(/^\//,""));let p=Q=>{for(let Z of Q)if(!d.getAsset(Z))throw Error("Missing original scene asset: "+Z)},f=d.loadStageAssets("stage3");try{await Promise.all([d.loadMandatoryAssets(),d.loadStageAssets("initial"),d.loadStageAssets("stage2")]),p(["handsModel2","cameraModel2","glassShatter","allShards","humanHandsAtlas","spcAtlas"])}catch(Q){throw d.dispose(),a.dispose(),Q}d.flushUploads(),d.disposeTextures=()=>{};let m=new dv(a),g=new pv(u,h);g.clear=!0,m.addPass(g);let A=mv();m.addPass(A),Xr(A,"A","stage2Background2",d,!0),Xr(A,"B","stage2Background2",d,!0);let _=new Lv(a,1,1);m.addPass(_);let v=new Qv;v._forcedOff=!0,v.uniforms.uEnabled.value=0,m.addPass(v);let x=xv();m.addPass(x),x.uniforms.uNoiseStrength.value=.04;let C=new Cv(a,1,1);m.addPass(C),C.textScene.visible=!1;let y=new bv(a,1,1);m.addPass(y),y.enabled=!1;let T=new Kt(new Uint8Array([255,255,255,255]),1,1,mt);T.needsUpdate=!0;let b=new nv(h);window.addEventListener("deviceorientation",b._handleGyro,{passive:!0});let E=()=>{},I=new Proxy({},{get:()=>E}),B={scene:u,camera:h,renderer:a,assetLoader:d,ui:I,bgPass:A,fgPass:x,lensBlurPass:v,frostingPass:{enabled:!1,active:!1},glassShardPass:_,shatterPass:y,textPass:C,textScene:C.textScene,whiteTex:T,renderPass:g,_composer:m,cameraRig:b,components:{},preWarmed:{},_xpReplaySkip:!0,_frameProf:{update:0,render:0},_tempVec3:new P,_tempQuat:new _t,_ethHandWorldPos:new P,godRaysState:{rects:null},scrollManager:{setHeld:E},_onMouseMove:Q=>b.onMouseMove(Q.clientX/innerWidth*2-1,1-Q.clientY/innerHeight*2)};for(let Q of Object.keys(Lt))["glass-shatter","stage2-ambient","money-burn"].includes(Q)||delete Lt[Q];Je.setEnabled(!1),Je.preload();let G=!1,X=0,R=null,D=null,N=!0,z=-1,Y=!1,W=0,J=0,K=0,U=0,j=1/0,re=!1,ce=0,ge=0,_e=!0,Me=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,Ce=()=>Me()||!!navigator.connection?.saveData,De=(Q,Z=0,ue=1)=>Math.max(Z,Math.min(ue,Q)),O=d.dispose.bind(d);function vt(){_e=!0,de()}function Ge(){_e=!1;let Q=r.clientWidth,Z=r.clientHeight,ue=o?Q<600?.65:.5:Math.min(devicePixelRatio||1,Ce()?1:1.5);Q===ce&&Z===ge&&a.getPixelRatio()===ue||(ce=Q,ge=Z,B._vw=Q,B._vh=Z,h.fov=Q<768?40:30,h.aspect=Q/Z,h.updateProjectionMatrix(),a.setPixelRatio(ue),a.setSize(Q,Z,!1),m.setPixelRatio(ue),m.setSize(Q,Z),_.setSize(Q,Z),y.setSize(Q,Z),C.setSize(Q,Z),v.setSize(Q*ue,Z*ue),A.uniforms.uViewportAspect.value=Q/Z,x.uniforms.uViewportAspect.value=Q/Z,lc(A,Q/Z),lc(x,Q/Z),z===1&&ds.resize(B,Q,Z))}B.applyPixelRatioOverride=()=>{};function de(){N&&!W&&(W=requestAnimationFrame(Pe))}function Ee(){let Q=i.getBoundingClientRect();j=Q.top,re=Q.top<innerHeight&&Q.bottom>0,U=De(-Q.top/Math.max(1,i.offsetHeight-r.clientHeight))}async function Te(Q){if(!(Y||z===Q)){Y=!0,Q===0&&(G=z<0,X=0,R=null);try{if(z===0&&Cn.teardown(B),z===1&&ds.teardown(B),z===2&&(_s.teardown(B),B.components={},B._stage3DeferredStarted=!1),Q===0||Q===1)if(B.components.handsModel||(B.preWarmed.handsModel2=new Nl(d),B.preWarmed.glassShards=Fl(d)),Q===0){b.setEnabled(!0),b.influence=1,B._gateElapsed=3,await Cn.enter(B),B._gateElapsed=3,Cn.update(B,0,0);let Z=B.components.handsModel;Z?.cameraRef&&(Z.cameraRef.updateWorldMatrix(!0,!1),Z.cameraRef.getWorldPosition(h.position),Z.cameraRef.getWorldQuaternion(h.quaternion))}else{if(!B.components.handsModel){Dp(B),Xr(A,"A","stage2Background2",d,!0),Xr(x,"B","stage2Foreground",d,!1),x.uniforms.uProgress.value=1;let ue=Dl();B._stage2Video=ue,B._stage2VideoTex=new vd(ue),B._stage2VideoTex.colorSpace=Ye,Pp(ue,()=>{z===1&&(Gs(A,"A",B._stage2VideoTex,!0,!0),A.uniforms.uLinearizeA.value=1)});let ve=B.components.handsModel;ve.group.visible=!0,ve.scrub(Ql/ve.duration),ve.update(0)}await ds.enter(B),A.uniforms.uOpacity.value=1,A.uniforms.uProgress.value=0,x.uniforms.uOpacity.value=1,B._gateHandProgress=Ql/B.components.handsModel.duration;let Z=B.components.handsModel;Z.scrub(B._gateHandProgress),Z.update(0),Z.cameraRef?.getWorldPosition(h.position),Z.cameraRef?.getWorldQuaternion(h.quaternion)}else await f,p(["moneyShredsAtlas","certAtlas","clubPaperAtlas","tunnelModel"]),B._stage3DeferredStarted=!1,await _s.enter(B),B.components.portalCircle&&(B.components.portalCircle.visible=!1),B._stage3DeferredStarted=!0,Fp(B),Op(B),kp(B),Hp(B);z=Q,e.dataset.storyPhase=["hand-glass","glass-facts","money-paper"][z]}finally{Y=!1,de()}}}function Re(){B._billBurnAudioIds=null,e.dataset.storyAudio="silent",Je.setEnabled(!1),Je.stop("stage2-ambient",{fadeOut:0}),Je.stop("money-burn",{fadeOut:0}),e.dataset.storyPlaying=JSON.stringify([...Je._howls].filter(([,Q])=>Q.playing()).map(([Q])=>Q))}function Pe(Q){if(W=0,!N)return;let Z=Me()?0:Math.min(.05,Math.max(0,(Q-J)/1e3));if(J=Q,Ee(),!re){R=null,Re(),B._stage2Video?.pause();return}if(o&&Q-K<48&&!_e){de();return}K=Q,_e&&Ge();let ue=U<.18?0:U<.49?1:2;if(ue!==z){Te(ue).catch(ee);return}if(Y){de();return}Je.setEnabled(!0),e.dataset.storyAudio="chapter-only",z>0&&!Je._ambientActive.has("stage2-ambient")&&Je.play("stage2-ambient"),B._stage2Video&&(Me()?B._stage2Video.pause():eo(B._stage2Video));let ve=z===0?De(U/.18):z===1?De((U-.18)/.31):De((U-.49)/.51)*.84;if(z===0){D!==null&&U<D-5e-4&&(G=!1),G&&!Me()&&j<=Math.min(100,ge*.12)?(R!==null&&(X+=(Q-R)/1e3),R=Q):R=null;let tt=G&&!Me()?Math.max(ve,De(X/Ha)):ve;B._gateElapsed=3+tt*Ha,B._gateHandElapsed=tt*Ha*Np,Cn.update(B,Q/1e3,0),b.update(Z)}else z===1?(ds.scrub(B,ve),ds.update(B,Q/1e3,Z)):(_s.scrub(B,ve),_s.update(B,Q/1e3,Z),B.components.portalCircle&&(B.components.portalCircle.visible=!1));B.components.glassShards&&(B.components.glassShards._reducedMotion=Me()),B.components.textLayout?.update?.(B._scrollProgress||0,Z),C.textScene.visible=!1,x.uniforms.uTime.value=Me()?0:Q/1e3,x.uniforms.uEnableNoise.value=Me()?0:2,x.uniforms.uNoiseOffset.value.set(0,0),d.chunkedUploader?.tick(),C.enabled=!1,D=U;let te=h.position.toArray();m.render(Z),b.restore(),e.dataset.storyProgress=U.toFixed(4),e.dataset.storyNative=JSON.stringify({phase:z,gateAuto:G,gateClock:X,renderCamera:te,shatterEnabled:y.enabled,shatterTime:y._actions[0]?.time,handTime:B.components.handsModel?._scrubProgress,hand:!!B.components.handsModel,camera:h.position.toArray(),papers:B.components.certMeshes?.length||0,shreds:B.components.shredMeshes?.length||0,gyro:b.gyroActive,portalVisible:!!B.components.portalCircle?.visible,sourceTextVisible:C.textScene.visible,audioEnabled:Je.isEnabled(),playing:[...Je._howls].filter(([,tt])=>tt.playing()).map(([tt])=>tt),glassY:B.components.glassShards?.shards[0]?.position.y}),e.style.setProperty("--reference-end",String(De((U-.9)/.04)*(1-De((U-.97)/.03)))),t.style.opacity=String(1-De((U-.97)/.03)),e.dataset.storyPhase=U>.975?"herd":["hand-glass","glass-facts","money-paper"][z],de()}function w(Q){Q.isTrusted&&Je.unlockNow()}function S(Q){re&&b.onMouseMove(Q.clientX/innerWidth*2-1,1-Q.clientY/innerHeight*2)}function k(){de()}function ie(){document.hidden?(R=null,Re(),W&&cancelAnimationFrame(W),W=0):de()}function $(Q){Q.preventDefault(),ee(Error("WebGL context lost"))}function ee(Q){console.error("Recovered chapter:",Q),Ae(),e.dispatchEvent(new CustomEvent("mt:story-fallback",{detail:{error:Q}}))}function Ae(){if(N){N=!1,W&&cancelAnimationFrame(W),Re(),b.dispose(),window.removeEventListener("deviceorientation",b._handleGyro),window.removeEventListener("scroll",k),window.removeEventListener("resize",vt),window.visualViewport?.removeEventListener("resize",vt),window.removeEventListener("pointermove",S),window.removeEventListener("pointerdown",w,!0),window.removeEventListener("touchend",w,!0),window.removeEventListener("keydown",w,!0),document.removeEventListener("visibilitychange",ie),B._stage2Video&&Ul(B._stage2Video),B._stage2VideoPrefetch&&Ul(B._stage2VideoPrefetch),m.dispose(),a.dispose(),O(),Je.stopAll();for(let Q of Je._howls.values())Q.unload();Je._howls.clear(),Je._ctxWatch&&Ze.Howler.ctx&&Ze.Howler.ctx.removeEventListener("statechange",Je._ctxWatch),Je._ctxWatch=null,Je._armed=!1,Je.suspendContext(),t.removeEventListener("webglcontextlost",$),t.style.removeProperty("opacity"),e.classList.remove("story-reference")}}return Je.unlockNow(),window.addEventListener("pointerdown",w,!0),window.addEventListener("touchend",w,!0),window.addEventListener("keydown",w,!0),window.addEventListener("pointermove",S,{passive:!0}),window.addEventListener("scroll",k,{passive:!0}),window.addEventListener("resize",vt,{passive:!0}),window.visualViewport?.addEventListener("resize",vt,{passive:!0}),document.addEventListener("visibilitychange",ie),t.addEventListener("webglcontextlost",$),Ge(),B.preWarmed.handsModel2=new Nl(d),B.preWarmed.glassShards=Fl(d),y.prewarm(a,h,B.preWarmed.handsModel2.handRef,d.getAsset("glassShatter"),d.assets.animations.glassShatter),_.prewarm(a,h),B._stage2VideoPrefetch=Dl(),e.classList.add("story-reference","story-enhanced"),e.classList.remove("story-pending"),e.dataset.storyRenderer="webgl",e.dataset.storySource="recovered-original",await Te(0),de(),{dispose:Ae,resize:vt}}};})();
