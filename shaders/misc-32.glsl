#define GLSLIFY 1
vec2 getBumpUV(in vec2 uv){vec2 uvBump=uv;if(uBumpFlip>0.0){uvBump.y=1.0-uvBump.y;}return uvBump;}vec2 parallaxMapSimple(in vec2 uv,in vec3 v){float depth=texture(tBump,getBumpUV(uv)).x;vec2 p=v.xy*(depth*uHeightStrength);return uv-p;}
