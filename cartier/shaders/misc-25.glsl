#define GLSLIFY 1
mat3 getTBN(){vec3 pos_dx=dFdx(vWorldPos.xyz);vec3 pos_dy=dFdy(vWorldPos.xyz);vec2 tex_dx=dFdx(vUv);vec2 tex_dy=dFdy(vUv);vec3 t=normalize(pos_dx*tex_dy.t-pos_dy*tex_dx.t);vec3 b=normalize(-pos_dx*tex_dy.s+pos_dy*tex_dx.s);mat3 tbn=mat3(t,b,normalize(vWorldNormal));return tbn;}vec3 getNormal(in vec2 uv,in mat3 tbn){vec3 n;n=(texture(tNormal,uv)).xyz*2.0-1.0;
#ifdef OPTIMIZED_NORMAL_MAPS
n.z=sqrt(clamp(1.0-dot(n.xy,n.xy),0.0,1.0));
#endif
return normalize(tbn*n);}vec3 getNormal(in vec2 uv){mat3 tbn=getTBN();return getNormal(uv,tbn);}vec3 getNormal(){mat3 tbn=getTBN();return getNormal(vUv,tbn);}
