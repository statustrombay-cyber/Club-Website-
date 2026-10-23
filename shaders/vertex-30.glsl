precision highp float;
#define GLSLIFY 1
in vec3 position;in vec2 uv;uniform float uAspect;out vec2 vUv;void main(){vUv=uv;vec3 pos=position;pos.xy=pos.xy*0.5+0.5;pos.xy*=uAspect>1.0 ? vec2(1.0,uAspect): vec2(uAspect,1.0);pos.xy*=0.2;pos.xy=2.0*pos.xy-1.0;gl_Position=vec4(pos,1.0);}
