precision highp float;
#define GLSLIFY 1
in vec3 position;in vec2 uv;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;uniform mat4 modelMatrix;uniform mat4 viewMatrix;out vec2 vUv;out vec3 vWorldPos;void main(){vUv=uv;vec4 worldPos=modelMatrix*vec4(position,1.0);vWorldPos=worldPos.xyz;gl_Position=projectionMatrix*viewMatrix*worldPos;}
