precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform float uDark;in vec2 vUv;out vec4 FragColor[2];
#include <SRGBtoLinear>
#include <LineartoSRGB>
#include <tonemap>
void main(){vec4 albedo=texture(tMap,vUv);float alpha=albedo.a;vec3 col=albedo.rgb;col*=1.-uDark;col=aces(col);col=LineartoSRGB(col);FragColor[0]=vec4(col,alpha);int flags=0;flags|=0<<1;flags|=0<<2;FragColor[1]=vec4(0.0,0.0,0.0,float(flags)/255.0);}
