precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform float uDark;uniform float uAlpha;in vec2 vUv;out vec4 FragColor[2];void main(){vec4 color=texture(tMap,vUv);vec3 col=color.rgb;col.rgb*=1.0-uDark;float alpha=uAlpha;alpha*=color.a;FragColor[0]=vec4(col,alpha);FragColor[1]=vec4(0.0);}
