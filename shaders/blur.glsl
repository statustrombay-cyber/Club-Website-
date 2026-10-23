precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform vec2 uDirection;in vec2 vUv;out vec4 FragColor;void main(){vec2 resolution=vec2(textureSize(tMap,0));vec2 texelSize=1.0/resolution;float weights[3]=float[](1.0/32.0,5.0/32.0,10.0/32.0);vec4 col=vec4(0.0);col+=texture(tMap,vUv+vec2(0.0,-5.0*texelSize.y));col+=texture(tMap,vUv+vec2(0.0,-3.0*texelSize.y));col+=texture(tMap,vUv+vec2(0.0,-1.0*texelSize.y));col+=texture(tMap,vUv+vec2(0.0,1.0*texelSize.y));col+=texture(tMap,vUv+vec2(0.0,3.0*texelSize.y));col+=texture(tMap,vUv+vec2(0.0,5.0*texelSize.y));col/=6.0;FragColor=col;}
