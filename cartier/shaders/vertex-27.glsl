precision highp float;
#define GLSLIFY 1
in vec3 position;in vec2 uv;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;uniform vec2 uHitUv;out vec2 vUv;
#include <common>
mat2 rotate2d(float angle){return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));}void main(){vUv=uv;vec3 pos=position;pos.xy=rotate2d((uHitUv.x-0.5)*PI*0.2)*pos.xy;pos.yz=rotate2d(((1.0-uHitUv.y)-0.5)*PI*0.2)*pos.yz;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);}
