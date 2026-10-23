export const valueNoise = `
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(8.2,3.1);a*=.5;}return v;}`;
export const paperVertex = `
attribute float stripId; uniform float uTime,uTear,uSeed; varying vec2 vUv; varying vec3 vView;
float h(float n){return fract(sin(n*127.1+uSeed)*43758.5453);}
void main(){vUv=uv;vec3 p=position;float s=stripId;
 p.z+=sin(p.y*4.2+uTime*.65+uSeed)*.10+cos(p.x*3.1+uSeed)*.14;
 float past=clamp((uTear-s)/.38,0.,1.),e=past*past;
 float angle=e*(h(s*31.)-.5)*4.8;
 vec2 q=vec2(p.x-(s-.5),p.y+.70);
 q=mat2(cos(angle),sin(angle),-sin(angle),cos(angle))*q;
 p.x=(s-.5)+q.x+e*sin(uv.y*5.3+uTime*.8+uSeed+s*6.)*.48;
 p.y=q.y-.70-e*(.25+h(s*17.)*.75);
 p.z+=e*(sin(uv.y*7.5+uTime*.7+s*9.+uSeed)*.65+sin(s*27.+uSeed)*.40);
 vec4 mv=modelViewMatrix*vec4(p,1.);vView=mv.xyz;gl_Position=projectionMatrix*mv;}`;
export const paperFragment = `
uniform sampler2D uMap;uniform float uOpacity; varying vec2 vUv; varying vec3 vView;
void main(){vec4 ink=texture2D(uMap,vUv);if(ink.a<.05)discard;
 vec3 n=normalize(cross(dFdx(vView),dFdy(vView)));float l=.42+.58*abs(dot(n,normalize(vec3(-.35,.6,1.))));
 vec3 tint=gl_FrontFacing?vec3(.83,.94,.80):vec3(.62,.76,.60);
 float fog=1.-exp(-length(vView)*.028);vec3 c=mix(ink.rgb*tint*l,vec3(.013,.04,.026),fog);
 gl_FragColor=vec4(c,ink.a*uOpacity);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`;
export const billVertex = `
uniform float uTime,uSeed;varying vec2 vUv;varying vec3 vView;varying float vFold;
void main(){vUv=uv;vec3 p=position;float wave=sin(p.x*2.8+uTime*.8+uSeed)*.13+sin(p.y*4.1-uTime*.6+uSeed)*.08;
 p.z+=wave;vFold=wave;vec4 mv=modelViewMatrix*vec4(p,1.);vView=mv.xyz;gl_Position=projectionMatrix*mv;}`;
export const billFragment = `${valueNoise}
uniform sampler2D uMap;uniform float uBurn,uOpacity,uSeed;varying vec2 vUv;varying vec3 vView;varying float vFold;
void main(){
 float edges=min(min(vUv.x,1.-vUv.x)*1.35,min(vUv.y,1.-vUv.y)*1.8);
 float field=edges+fbm(vUv*12.+uSeed)*.27;
 float d=field-uBurn*.91;
 if(d<0.)discard;
 vec4 image=texture2D(uMap,vUv);vec3 n=normalize(cross(dFdx(vView),dFdy(vView)));
 float l=.70+.30*abs(dot(n,normalize(vec3(-.2,.8,1.))));vec3 color=image.rgb*l*vec3(.94,.98,.84);
 float charred=1.-smoothstep(.018,.055,d);color=mix(color,vec3(.065,.025,.008),charred*.95);
 float rim=1.-smoothstep(.0,.022,d);color+=vec3(5.,1.65,.10)*pow(rim,1.35)*step(.002,uBurn);
 gl_FragColor=vec4(color,image.a*uOpacity);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`;
