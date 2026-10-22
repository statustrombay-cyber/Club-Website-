precision highp float;
#define GLSLIFY 1
in vec3 position;in vec4 data;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform vec4 uNoiseParams;uniform vec3 uBounds;uniform vec2 uSize;uniform float uTime;flat out float vLife;
#include <trignoise>
void main(){vec3 pos=position;pos*=uBounds;vec3 noise=sinNoise((pos*uNoiseParams.x)+uTime*uNoiseParams.z,uNoiseParams.y,3);pos+=noise*uNoiseParams.w;vec4 eyePos=modelViewMatrix*vec4(pos,1.0);float distPhase=500.0/abs(eyePos.z);distPhase=clamp(distPhase,0.0,1.0);float size=mix(0.5,2.0,data.y)*mix(uSize.x,uSize.y,distPhase);vLife=sin(uTime*mix(0.5,1.5,data.z)*0.1)*0.5+0.5;gl_Position=projectionMatrix*eyePos;gl_PointSize=size;}
