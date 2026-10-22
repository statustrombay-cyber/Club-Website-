precision highp float;
#define GLSLIFY 1
in vec3 position;in vec2 uv;uniform mat4 uViewMatrix;uniform vec3 uFrustum;out vec3 vRay;out vec2 vUv;void main(){vUv=uv;vec3 ray=vec3(position.xy,1.0)*uFrustum;mat3 invViewMatrix=transpose(mat3(uViewMatrix));vRay=invViewMatrix*ray;gl_Position=vec4(position,1.0);}
