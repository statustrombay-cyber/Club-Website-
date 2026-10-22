precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform float uAlpha;in vec2 vUv;out vec4 FragColor[2];void main(){float alpha=uAlpha;if(alpha<0.01)discard;FragColor[0]=vec4(vec3(1.),alpha);FragColor[1]=vec4(0.0,0.0,0.0,0.);}
