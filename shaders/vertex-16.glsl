precision highp float;
#define GLSLIFY 1
in vec3 position;in vec2 uv;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;uniform mat4 viewMatrix;uniform mat4 modelMatrix;uniform float uTime;out vec4 vClipPos;out vec2 vUv;void main(){vUv=uv;vec3 pos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);vClipPos=gl_Position;}
