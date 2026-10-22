precision highp float;
#define GLSLIFY 1
#ifndef lt
#define lt(x, y) (1.0 - step(y, x))
#endif
#ifndef ge
#define ge(x, y) step(y, x)
#endif
vec2 getTextureCoverUV(vec2 baseUv,vec2 resolution,vec2 textureInfos,vec2 textureScale){vec2 uv=baseUv;vec2 scale=textureScale;vec2 offset=vec2(0.);float textureRatio=resolution.x/resolution.y;float imageRatio=textureInfos.x/textureInfos.y;float diffRatio=imageRatio/textureRatio;scale.x*=lt(diffRatio,1.)+ge(diffRatio,1.)*diffRatio;scale.y*=lt(diffRatio,1.)/diffRatio+ge(diffRatio,1.);offset.x+=(scale.x-1.0)*0.5;offset.y+=(scale.y-1.0)*0.5;uv/=scale;uv+=offset/scale;return uv;}uniform sampler2D tImage;uniform sampler2D tImage2;uniform sampler2D tBlueNoise;uniform vec2 uImageResolution;uniform vec2 uImage2Resolution;uniform vec2 uResolution;uniform vec2 uHitUv;uniform float uImageScale;uniform float uDark;uniform float uAlpha;uniform float uAlphaImage2;uniform float uIsHit;in vec2 vUv;out vec4 FragColor[2];
#include <LineartoSRGB>
#include <SRGBtoLinear>
#include <tonemap>
void main(){vec2 uv=vUv;uv-=0.5;uv*=mix(0.9,1.0,uImageScale);uv-=(uHitUv-0.5)*0.1;uv+=0.5;vec2 mapUv=getTextureCoverUV(uv,uResolution,uImageResolution,vec2(1.0));vec3 col1=SRGBtoLinear(texture(tImage,mapUv)).rgb;vec2 mapUv2=getTextureCoverUV(uv,uResolution,uImage2Resolution,vec2(1.0));vec3 col2=SRGBtoLinear(texture(tImage2,mapUv2)).rgb;vec3 col=mix(col1,col2,uAlphaImage2);float alpha=uAlpha;if(uAlpha<1.0){float blueNoise=texture(tBlueNoise,gl_FragCoord.xy/256.0).r;float alphaThreshold=blueNoise;alpha*=step(alphaThreshold,max(0.01,uAlpha));if(alpha<(1.0/255.0))discard;alpha=1.0;}col.rgb*=1.0-uDark;col=aces(col);col=LineartoSRGB(col);FragColor[0]=vec4(col,alpha);int flags=0;flags|=1<<2;if(uIsHit>0.5){flags|=1<<3;}flags|=1<<4;FragColor[1]=vec4(0.0,0.0,0.0,float(flags)/255.0);}
