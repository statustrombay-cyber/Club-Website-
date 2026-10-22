precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform sampler2D tNoise;uniform vec3 cameraPosition;uniform float uTime;uniform float uHash;in vec3 vWorldPos;in vec2 vUv;out vec4 FragColor[2];
#include <SRGBtoLinear>
#include <LineartoSRGB>
void main(){vec2 uv=vUv;uv-=0.5;uv.x*=2.0;uv+=0.5;uv.x+=uTime*mix(0.002,0.005,uHash);vec4 albedo=vec4(texture(tMap,uv).x);vec3 v=normalize(cameraPosition-vWorldPos);vec3 noise=normalize(2.0*texture(tNoise,uv*10.0+(2.0*albedo.yz-1.0)*0.1).xyz-1.0);float glint=max(0.0,dot(noise,v));glint=smoothstep(0.9,1.0,glint);albedo+=glint*albedo;albedo*=mix(0.5,1.0,sin(albedo.x+uTime*mix(0.1,0.2,uHash))*0.5+0.5);albedo.xyz*=vec3(0.9686,0.6745,0.0392);albedo.w*=0.2+glint;albedo*=smoothstep(0.4,1.0,vUv.y);FragColor[0]=LineartoSRGB(albedo);int flags=0;flags|=0<<1;FragColor[1]=vec4(0.0,0.0,0.0,float(flags)/255.0);}
