precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform float uDark;in vec2 vUv;out vec4 FragColor[2];void main(){vec2 mapUv=vUv;vec4 color=texture(tMap,mapUv);color.rgb*=1.-uDark;FragColor[0]=color;int flags=0;flags|=1<<2;FragColor[1]=vec4(0.0,0.0,0.0,float(flags)/255.0);}
