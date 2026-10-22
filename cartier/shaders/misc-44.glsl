precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform sampler2D tLight;uniform sampler2D tNormalData;uniform vec3 uLightColor;uniform vec3 uLightColor2;uniform float uSpotLightPhase;uniform float uDark;in vec2 vUv;out vec4 FragColor[2];
#include <SRGBtoLinear>
#include <LineartoSRGB>
#include <colorUtils>
#include <tonemap>
vec3 screenBlend(vec3 a,vec3 b){return 1.0-((1.0-a)*(1.0-b));}float luminance(vec3 c){return dot(c,vec3(0.2126,0.7152,0.0722));}float getBitMask(int bit,float mask){return float(int(round(mask*255.0))>>bit&1);}void main(){vec2 light=texture(tLight,vUv).xy;float applySelectedPodcastMask=getBitMask(3,texture(tNormalData,vUv).w);float applyPodcastMask=getBitMask(4,texture(tNormalData,vUv).w);float applyWoodPieceMask=getBitMask(6,texture(tNormalData,vUv).w);vec4 col=texture(tMap,vUv);col=SRGBtoLinear(col);float luma=luminance(col.xyz);col.xyz=mix(aces_inv(col.xyz),col.xyz,applySelectedPodcastMask);vec3 lightColor=mix(uLightColor,uLightColor2,1.0-exp(-light.y));float lumaScale=mix(mix(30.0,mix(80.0,250.0,applyWoodPieceMask),uSpotLightPhase),7.0,luma);vec3 compositedLight=light.x+mix(light.y*lumaScale*lightColor,vec3(light.y*0.1),applyPodcastMask);col.xyz=mix(col.xyz,mix(col.xyz*light.x,col.xyz*compositedLight,mix(1.0,0.5,uSpotLightPhase)),1.0-(uDark));col.xyz=mix(aces(col.xyz),col.xyz,applySelectedPodcastMask);col=LineartoSRGB(col);FragColor[0]=col;int flags=0;FragColor[1]=vec4(0.0,0.0,0.0,float(flags)/255.0);}
