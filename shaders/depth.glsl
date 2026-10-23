precision highp float;
#define GLSLIFY 1
uniform sampler2D tDepth;uniform vec3 uColor;uniform vec3 cameraPosition;uniform vec2 uCameraNearFar;uniform float uAlpha;uniform float uDebug;uniform float uTime;in vec4 vClipPos;in vec3 vWorldPos;in vec3 vNormal;out vec4 FragColor[2];
#include <linearizeDepth>
#include <dither>
void main(){if(vWorldPos.y<0.0){FragColor[0]=vec4(0.0);FragColor[1]=vec4(0.0);return;}vec3 normal=normalize(vNormal);vec3 ndc=vClipPos.xyz/vClipPos.w;ndc=ndc*0.5+0.5;float near=0.1;float far=500.0;float linearDepth=linearizeDepth01(texture(tDepth,ndc.xy).x,near,far);float currentLinearDepth=linearizeDepth01(ndc.z,near,far);float dDiff=abs(linearDepth-currentLinearDepth);float depthFade=smoothstep(0.0,0.01,dDiff);vec3 dir=(cameraPosition-vWorldPos);depthFade*=smoothstep(0.0,1.0,length(dir));float NdV=pow(max(0.0,dot(normal,normalize(dir))),5.0);vec3 col=uColor;FragColor[0]=vec4(col,1.0)*NdV*depthFade*uAlpha;FragColor[0]=mix(FragColor[0],vec4(1.0,0.0,0.0,1.0)*depthFade*NdV,uDebug);FragColor[1]=vec4(0.0);}
