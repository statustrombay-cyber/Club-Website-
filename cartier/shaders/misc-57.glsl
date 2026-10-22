precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform float uTime;uniform float uHash;in vec2 vUv;out vec4 FragColor[2];
#include <SRGBtoLinear>
#include <LineartoSRGB>
void main(){vec2 uv=vUv;uv-=0.5;uv.x*=2.0;uv+=0.5;uv.x+=uTime*mix(0.01,0.02,uHash);vec4 albedo=texture(tMap,uv);albedo*=mix(0.5,1.0,sin(albedo.x+uTime*mix(0.1,0.2,uHash))*0.5+0.5);FragColor[0]=LineartoSRGB(albedo);int flags=0;flags|=0<<1;FragColor[1]=vec4(0.0,0.0,0.0,float(flags)/255.0);}
