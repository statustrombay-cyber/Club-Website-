precision highp float;
#define GLSLIFY 1
uniform sampler2D tBRDFLUT;uniform samplerCube tEnvSpecular;uniform sampler2D tAlbedo;uniform vec4 uAlbedoRepeatOffset;uniform float uColorIntensity;uniform sampler2D tEmissive;uniform vec4 uEmissiveRepeatOffset;uniform float uEmissiveIntensity;uniform sampler2D tNormal;uniform vec4 uNormalRepeatOffset;uniform sampler2D tMR;uniform vec4 uMRRepeatOffset;uniform sampler2D tAO;uniform vec4 uAORepeatOffset;uniform sampler2D tAlpha;uniform vec4 uAlphaRepeatOffset;uniform sampler2D tLightmap;uniform vec4 uLightmapRepeatOffset;uniform float uLightmapIntensity;uniform float uTime;uniform sampler2D tNoise;uniform sampler2D tGoldMask;uniform vec3 SHConstants[9];uniform vec3 cameraPosition;uniform float uRoughness;uniform float uMetalness;uniform float uOcclusion;uniform float uAlpha;uniform float uEnvRotationX;uniform float uEnvRotationY;uniform float uMirrored;uniform float uDark;uniform vec3 uColor;uniform vec3 uEmissiveColor;uniform vec3 uLightmapRgb;uniform sampler2D tBlueNoise;uniform sampler2D tBayerPattern;
#ifdef IS_WATCH
uniform lowp sampler3D tLut;uniform float uLutStrength;
#endif
#ifdef USE_FLUID_SIM
uniform sampler2D tFluidSim;uniform sampler2D tFluidVelocity;uniform sampler2D tFluidColor;uniform float uFluidStrength;
#endif
uniform vec4 uBoundingRect;in mat3 vTBN;in vec4 vClip;in vec3 vWorldPos;in vec3 vViewPos;in vec3 vNormal;in vec3 vWorldNormal;in vec3 vTangentWorldPos;in vec3 vTangentCameraPos;in vec2 vUv;in vec2 vUv1;out vec4 FragColor[2];
#include <common>
#include <SRGBtoLinear>
#include <LineartoSRGB>
#include <evaluateSH>
#include <getIBLSpecularLighting>
#include <getNormal>
#include <fresnelSchlick>
#include <tonemap>
#include <linearizeDepth>
#include <trignoise>
#define PLATEAU_HEIGHT 0.0
mat3 rotateY(in float angle){return mat3(cos(angle),0.0,sin(angle),0.0,1.0,0.0,-sin(angle),0,cos(angle));}mat3 rotateX(in float angle){return mat3(1.0,0.0,0.0,0.0,cos(angle),-sin(angle),0.0,sin(angle),cos(angle));}vec2 applyRepeatOffset(vec2 uv,vec4 repeatOffset){return uv*repeatOffset.xy+repeatOffset.zw;}void main(void){if(vWorldPos.y>PLATEAU_HEIGHT&&uMirrored>0.5){discard;return;}vec2 uv=vUv;
#ifdef USE_UV_1
uv=vUv1;
#endif
vec2 ndc=vClip.xy/vClip.w;ndc=ndc*0.5+0.5;vec3 v=normalize(cameraPosition-vWorldPos);vec2 normalUv=applyRepeatOffset(uv,uNormalRepeatOffset);
#if defined(USE_GEOMETRY_NORMAL)
vec3 n=normalize(vWorldNormal);
#elif defined(USE_GEOMETRY_TANGENT)
vec3 n=getNormal(normalUv,vTBN);
#else
vec3 n=getNormal(normalUv);
#endif
vec3 r=reflect(-v,n);float NdV=max(0.0001,dot(n,v));float _uEnvRotationY=uEnvRotationY;float _uEnvRotationX=uEnvRotationX;vec3 rotatedN=n*rotateX(_uEnvRotationY);rotatedN*=rotateY(_uEnvRotationX);vec3 rotatedR=r*rotateX(_uEnvRotationY);rotatedR*=rotateY(_uEnvRotationX);float roughness=uRoughness;float metallness=uMetalness;
#ifdef USE_MR_MAP
vec2 mrUv=applyRepeatOffset(uv,uMRRepeatOffset);vec3 mr=LineartoSRGB(vec4(texture(tMR,mrUv).rgb,1.0)).rgb;
#ifdef IS_ANDROID
mr.g*=2.0;
#endif
#ifdef USE_METALNESS_MAP
metallness=mr.b;
#endif
#ifdef USE_ROUGHNESS_MAP
roughness=mr.g;
#endif
#endif
vec2 albedoUv=applyRepeatOffset(uv,uAlbedoRepeatOffset);vec4 albedo=(texture(tAlbedo,albedoUv));
#ifdef USE_ALPHA_DISCARD
if(albedo.a<0.5)discard;
#endif
#ifdef USE_COLOR
albedo.xyz=uColor;
#endif
#ifdef USE_GOLD_MASK
float goldMask=1.0-texture(tGoldMask,uv*4.5+uTime*0.015).x;float deriv=fwidth(goldMask);float range=0.7;goldMask=smoothstep(range-deriv,range+deriv,goldMask);float VdN=1.0-NdV;goldMask*=VdN;roughness=mix(roughness,0.0,goldMask*5.0);metallness=mix(metallness,1.0,goldMask*2.0);albedo.xyz=mix(albedo.xyz,mix(vec3(0.976,0.867,0.596),vec3(1.0),0.2),goldMask);
#endif
vec2 emissiveUv=applyRepeatOffset(uv,uEmissiveRepeatOffset);vec4 emissive=texture(tEmissive,emissiveUv);
#ifdef USE_FLUID_SIM
float fluidDensity=texture(tFluidSim,vUv).x;fluidDensity=fluidDensity/(fluidDensity+1.0);fluidDensity=smoothstep(0.0,0.01,fluidDensity);vec2 fluidVelocity=texture(tFluidVelocity,vUv).xy;vec3 fluidCol=texture(tFluidColor,vec2(fluidDensity,0.5)).xyz;albedo.xyz=mix(albedo.xyz,fluidCol,fluidDensity*uFluidStrength);emissive*=mix(1.0,0.5,fluidDensity*uFluidStrength);
#endif
vec3 f0=mix(vec3(0.04),albedo.xyz,metallness);vec3 fresnel=fresnelSchlick(f0,NdV,roughness);vec3 kD=(1.0-fresnel)*(1.0-metallness);vec3 diffuse=evaluateSH(rotatedN,SHConstants);vec2 brdf=(texture(tBRDFLUT,vec2(NdV,roughness))).xy;vec3 specular=getIBLSpecularLighting(f0,rotatedR,roughness,brdf,float(MONOCHROME_ENV_SPECULAR)>0.5);float iblIntensity=1.0;specular*=iblIntensity;diffuse*=iblIntensity;
#ifdef USE_GLITTER
float glintPhase=1.0-clamp(-vWorldPos.z/200.0,0.0,1.0);vec3 noise=normalize(2.0*texture(tNoise,uv*mix(10.0,20.0,glintPhase)).xyz-1.0);float glint=max(0.0,dot(noise,v));glint=smoothstep(0.9,1.0,glint);specular+=vec3(1.0,0.9451,0.7725)*glint*0.5*smoothstep(0.4,1.0,glintPhase);
#endif
vec3 col=albedo.xyz;
#ifdef IS_DUNES
float windPhase=clamp(-vWorldPos.z/500.0,0.0,1.0);windPhase=smoothstep(0.1,0.2,windPhase);vec3 sinNoise=sinNoise(vWorldPos*0.3+(uTime+dot(n,vec3(1.0,0.0,1.0))),.913,1);float noise1d=dot(sinNoise,vec3(0.33333))*0.5+0.5;col=mix(col,vec3(1.0),clamp(noise1d,0.0,1.0)*windPhase*0.15);
#endif
col=(kD*col*diffuse)+specular;float alpha=1.0;alpha=max(alpha,max(specular.x,max(specular.y,specular.z)));alpha*=albedo.w;alpha*=uAlpha;vec2 aoUv=vUv;
#ifdef USE_AO_UV_1
aoUv=vUv1;
#endif
aoUv=applyRepeatOffset(aoUv,uAORepeatOffset);float ao=texture(tAO,aoUv).x;col=mix(col,col*ao,uOcclusion);col=mix(col,vec3(0.),(1.-uColorIntensity));vec3 lightmap=vec3(1.0);
#ifdef USE_LIGHTMAP
vec2 lightmapUv=applyRepeatOffset(vUv1,uLightmapRepeatOffset);lightmapUv.y=1.0-lightmapUv.y;lightmap=texture(tLightmap,lightmapUv).rgb*uLightmapRgb;lightmap=vec3(lightmap.r+lightmap.g+lightmap.b);float intensity=uLightmapIntensity;
#ifndef USE_GOLD_MASK
intensity*=(1.-specular.y);
#endif
col=mix(vec3(0.),col,(1.-intensity)+intensity*lightmap);
#endif
col+=emissive.xyz*uEmissiveIntensity;col*=1.-uDark;vec3 blueNoise=texture(tBlueNoise,gl_FragCoord.xy/256.).rgb;float alphaThreshold=blueNoise.r;
#if !defined(IS_TRANSPARENT)
if(uAlpha<1.0){alpha*=step(alphaThreshold,max(0.01,uAlpha));if(alpha<(1.0/255.0))discard;alpha=1.0;}
#endif
#ifndef IS_WATCH
float bias=2.5;if(-(vViewPos.z+bias)<alphaThreshold){discard;}
#endif
col=aces(col);col=LineartoSRGB(col);
#if defined(IS_WATCH)
col=mix(col,texture(tLut,col).rgb,uLutStrength);
#endif
int flags=0;
#if defined(USE_LIGHTS)
flags|=1<<1;col*=mix(1.0,n.x*1.0-0.5,uMirrored);
#endif
#if defined(USE_TORCHLIGHT)
flags|=1<<2;
#endif
#if defined(IS_ROOM)
flags|=1<<5;
#endif
FragColor[0]=vec4(col,alpha);FragColor[1]=vec4(n*0.5+0.5,float(flags)/255.0);}
