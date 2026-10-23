precision highp float;
#define GLSLIFY 1
uniform vec3 uColor;uniform vec2 uResolution;uniform float uTime;uniform float uProgress;in vec2 vUv;out vec4 FragColor[2];
#include <LineartoSRGB>
void main(){vec3 color=uColor;color=LineartoSRGB(color);FragColor[0]=vec4(color,1.0);FragColor[1]=vec4(0.0);}
