precision highp float;
#define GLSLIFY 1
uniform sampler2D tMirror;uniform sampler2D tBRDFLUT;uniform samplerCube tEnvSpecular;uniform sampler2D tAlbedo;uniform vec4 uAlbedoRepeatOffset;uniform sampler2D tEmissive;uniform vec4 uEmissiveRepeatOffset;uniform float uEmissiveIntensity;uniform sampler2D tNormal;uniform vec4 uNormalRepeatOffset;uniform sampler2D tMR;uniform vec4 uMRRepeatOffset;uniform sampler2D tAO;uniform vec4 uAORepeatOffset;uniform sampler2D tLightmap;uniform vec3 uLightmapRgb;uniform float uLightmapMix;uniform sampler2D tLightmap2;uniform vec3 uLightmap2Rgb;uniform float uLightmap2Mix;uniform sampler2D tLightmap3;uniform vec3 uLightmap3Rgb;uniform float uLightmap3Mix;uniform sampler2D tLightmap4;uniform vec3 uLightmap4Rgb;uniform float uLightmap4Mix;uniform sampler2D tLightmap5;uniform vec3 uLightmap5Rgb;uniform float uLightmap5Mix;uniform sampler2D tLightmap6;uniform vec3 uLightmap6Rgb;uniform float uLightmap6Mix;uniform sampler2D tLightmap7;uniform vec3 uLightmap7Rgb;uniform float uLightmap7Mix;uniform float uLightmapsMix;uniform float uTime;uniform float uLightmapIntensity;uniform vec3 SHConstants[9];uniform vec3 cameraPosition;uniform float uNormalStrength;uniform float uRoughness;uniform float uMetalness;uniform float uOcclusion;uniform float uAlpha;uniform float uEnvRotationX;uniform float uEnvRotationY;uniform float uDark;uniform vec3 uColor;in vec2 vUv;in vec2 vUv1;in vec3 vLocalPos;in vec3 vWorldNormal;in vec3 vWorldPos;in vec4 vClipPos;in mat3 vTBN;
#include <common>
#include <SRGBtoLinear>
#include <LineartoSRGB>
#include <evaluateSH>
#include <getIBLSpecularLighting>
#include <getNormal>
#include <fresnelSchlick>
#include <tonemap>
out vec4 FragColor[2];mat3 rotateY(in float angle){return mat3(cos(angle),0.0,sin(angle),0.0,1.0,0.0,-sin(angle),0,cos(angle));}mat3 rotateX(in float angle){return mat3(1.0,0.0,0.0,0.0,cos(angle),-sin(angle),0.0,sin(angle),cos(angle));}vec2 applyRepeatOffset(vec2 uv,vec4 repeatOffset){return uv*repeatOffset.xy+repeatOffset.zw;}void main(){vec2 uv=vUv;
#ifdef USE_UV_1
uv=vUv1;
#endif
vec2 ndc=vClipPos.xy/vClipPos.w;ndc=ndc*0.5+0.5;vec3 v=normalize(cameraPosition-vWorldPos);vec2 normalUv=applyRepeatOffset(uv,uNormalRepeatOffset);
#if defined(USE_GEOMETRY_NORMAL)
vec3 n=normalize(vWorldNormal);
#elif defined(USE_GEOMETRY_TANGENT)
vec3 n=getNormal(normalUv,vTBN);
#else
vec3 n=getNormal(normalUv);
#endif
vec3 r=reflect(-v,n);float _uEnvRotationY=uEnvRotationY;float _uEnvRotationX=uEnvRotationX;vec3 rotatedN=n*rotateX(_uEnvRotationY);rotatedN*=rotateX(PI);rotatedN*=rotateY(_uEnvRotationX);vec3 rotatedR=r*rotateX(_uEnvRotationY);rotatedR*=rotateX(PI);rotatedR*=rotateY(_uEnvRotationX);float roughness=uRoughness;float metallness=uMetalness;
#ifdef USE_MR_MAP
vec4 _uMRRepeatOffset=uMRRepeatOffset;vec2 mrUv=applyRepeatOffset(uv,_uMRRepeatOffset);vec3 mr=LineartoSRGB(vec4(texture(tMR,mrUv).rgb,1.0)).rgb;roughness=mr.g;roughness=pow(roughness,2.5)*1.;metallness=mr.b;
#endif
vec2 albedoUv=applyRepeatOffset(uv,uAlbedoRepeatOffset);vec4 albedo=(texture(tAlbedo,albedoUv));
#ifdef USE_COLOR
albedo.xyz=uColor;
#endif
vec3 f0=mix(vec3(0.04),albedo.xyz,metallness);float NdV=max(0.0001,dot(n,v));vec3 fresnel=fresnelSchlick(vec3(f0),NdV,roughness);vec3 kD=(1.0-fresnel);vec2 brdf=texture(tBRDFLUT,vec2(NdV,roughness)).xy;vec3 diffuse=evaluateSH(rotatedN,SHConstants);vec3 specular=getIBLSpecularLighting(f0,rotatedR,roughness,brdf,float(MONOCHROME_ENV_SPECULAR)>0.5);float iblIntensity=1.0;vec2 mirrorOffset=vec2(dot(rotatedN,vec3(1.0,0.0,0.0)),dot(rotatedN,vec3(0.0,0.0,1.0)));mirrorOffset*=0.15;float mirrorStrength=1.0;vec3 mirror=texture(tMirror,ndc+mirrorOffset).xyz*mirrorStrength;specular+=mirror*(f0*brdf.x+brdf.y);specular*=iblIntensity;diffuse*=iblIntensity;vec3 col=albedo.xyz;col=(kD*col*diffuse)+specular;float alpha=1.0;alpha=max(alpha,max(specular.x,max(specular.y,specular.z)));alpha*=albedo.w;alpha*=uAlpha;vec2 aoUv=applyRepeatOffset(uv,uAORepeatOffset);float ao=texture(tAO,aoUv).x;col=mix(col,col*ao,uOcclusion);float distFromCenter=pow((uv.x-.5)*2.,2.0)+pow((uv.y-.5)*2.,2.0);vec3 lightmap=vec3(1.0);
#ifdef USE_LIGHTMAP
vec2 lightmapUv=vUv1;lightmapUv.y=1.0-lightmapUv.y;vec3 lightmap1=(texture(tLightmap,lightmapUv)).rgb*uLightmapRgb;lightmap1=vec3(lightmap1.r+lightmap1.g+lightmap1.b)*uLightmapMix;vec3 lightmap2=(texture(tLightmap2,lightmapUv)).rgb*uLightmap2Rgb;lightmap2=vec3(lightmap2.r+lightmap2.g+lightmap2.b)*uLightmap2Mix;vec3 lightmap3=(texture(tLightmap3,lightmapUv)).rgb*uLightmap3Rgb;lightmap3=vec3(lightmap3.r+lightmap3.g+lightmap3.b)*uLightmap3Mix;vec3 lightmap4=(texture(tLightmap4,lightmapUv)).rgb*uLightmap4Rgb;lightmap4=vec3(lightmap4.r+lightmap4.g+lightmap4.b)*uLightmap4Mix;vec3 lightmap5=(texture(tLightmap5,lightmapUv)).rgb*uLightmap5Rgb;lightmap5=vec3(lightmap5.r+lightmap5.g+lightmap5.b)*uLightmap5Mix;vec3 lightmap6=(texture(tLightmap6,lightmapUv)).rgb*uLightmap6Rgb;lightmap6=vec3(lightmap6.r+lightmap6.g+lightmap6.b)*uLightmap6Mix;vec3 lightmap7=(texture(tLightmap7,lightmapUv)).rgb*uLightmap7Rgb;lightmap7=vec3(lightmap7.r+lightmap7.g+lightmap7.b)*uLightmap7Mix;lightmap=lightmap1+lightmap2+lightmap3+lightmap4+lightmap5+lightmap6+lightmap7;float intensity=uLightmapIntensity;intensity*=(1.-specular.x*(1.-pow(distFromCenter,.5)));col=mix(vec3(0.),col,(1.-intensity)+intensity*lightmap);
#endif
vec2 emissiveUv=applyRepeatOffset(uv,uEmissiveRepeatOffset);vec4 emissive=texture(tEmissive,emissiveUv);col+=emissive.xyz*uEmissiveIntensity;col*=1.-uDark;col=aces(col);col=LineartoSRGB(col);int flags=0;
#if defined(USE_LIGHTS)
flags|=1<<1;
#endif
#if defined(USE_TORCHLIGHT)
flags|=1<<2;
#endif
if(uLightmap4Mix>0.5){}FragColor[0]=vec4(col,alpha);FragColor[1]=vec4(n*0.5+0.5,float(flags)/255.0);}
