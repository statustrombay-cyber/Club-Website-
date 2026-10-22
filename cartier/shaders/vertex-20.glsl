precision highp float;
#define GLSLIFY 1
in vec3 position;in vec2 uv;uniform sampler2D tMap;uniform vec2 uResolution;uniform float uTransition;out vec2 vUv;void main(){vec3 pos=position;vec2 tSize=vec2(textureSize(tMap,0));float textureAspect=tSize.x/tSize.y;float screenAspect=uResolution.x/uResolution.y;float aspect=screenAspect/textureAspect;pos.xy*=aspect>1.0 ? vec2(1.0,aspect): vec2(1.0/aspect,1.0);pos.xy*=mix(4.0,0.0,uTransition);gl_Position=vec4(pos,1.0);vUv=uv;}
