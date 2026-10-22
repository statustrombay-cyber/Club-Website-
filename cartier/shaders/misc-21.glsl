precision highp float;
#define GLSLIFY 1
uniform samplerCube tMap;uniform float uResolution;uniform float uRoughness;uniform float uMipLevel;in vec3 vLocalPos;out vec4 FragColor;
#define PI 3.14159265359
float RadicalInverse_VdK(uint bits){bits=(bits<<16u)|(bits>>16u);bits=((bits&0x55555555u)<<1u)|((bits&0xAAAAAAAAu)>>1u);bits=((bits&0x33333333u)<<2u)|((bits&0xCCCCCCCCu)>>2u);bits=((bits&0x0F0F0F0Fu)<<4u)|((bits&0xF0F0F0F0u)>>4u);bits=((bits&0x00FF00FFu)<<8u)|((bits&0xFF00FF00u)>>8u);return float(bits)*2.3283064365386963e-10;}vec2 Hammersley(uint i,uint N){return vec2(float(i)/float(N),RadicalInverse_VdK(i));}float DistributionGGX(float NdotH,float roughness){float a=roughness*roughness;float a2=a*a;float NdotH2=NdotH*NdotH;float num=a2;float denom=(NdotH2*(a2-1.0)+1.0);denom=PI*denom*denom;return num/denom;}vec3 ImportanceSampleGGX(vec2 Xi,float roughness,vec3 N){float a=roughness*roughness;float phi=2.0*PI*Xi.x;float cosTheta=sqrt((1.0-Xi.y)/(1.0+(a*a-1.0)*Xi.y));float sinTheta=sqrt(1.0-cosTheta*cosTheta);vec3 H;H.x=cos(phi)*sinTheta;H.y=sin(phi)*sinTheta;H.z=cosTheta;vec3 up=abs(N.z)<0.999 ? vec3(0,0,1): vec3(1,0,0);vec3 tan=normalize(cross(up,N));vec3 bitan=cross(N,tan);return normalize(tan*H.x+bitan*H.y+N*H.z);}vec3 PrefilterEnvMap(float Roughness,vec3 R){vec3 N=R;vec3 V=R;vec3 PrefilteredColor=vec3(0.0);float totalWeight=0.0;
#ifndef MOBILE
const uint NumSamples=1024u;
#else
const uint NumSamples=256u;
#endif
for(uint i=0u;i<NumSamples;i++){vec2 Xi=Hammersley(i,NumSamples);vec3 H=ImportanceSampleGGX(Xi,Roughness,N);vec3 L=2.0*dot(V,H)*H-V;float NoL=max(0.0,dot(N,L));if(NoL>0.0){float NdotH=max(dot(N,H),0.0);float HdotV=max(dot(H,V),0.0);float D=DistributionGGX(NdotH,Roughness);float pdf=(D*NdotH/(4.0*HdotV))+0.0001;float saTexel=4.0*PI/(6.0*uResolution*uResolution);float saSample=1.0/(float(NumSamples)*pdf+0.0001);float mipLevel=Roughness==0.0 ? 0.0 : 0.5*log2(saSample/saTexel);PrefilteredColor+=textureLod(tMap,L,mipLevel).xyz*NoL;totalWeight+=NoL;}}return PrefilteredColor/totalWeight;}void main(){vec3 R=normalize(vLocalPos);vec3 color=uMipLevel>0.0 ? PrefilterEnvMap(uRoughness,R): texture(tMap,R).xyz;FragColor=vec4(color,1.0);}
