precision highp float;
#define GLSLIFY 1
in vec3 position;in vec3 normal;uniform mat4 uViewProjectionMatrix;uniform mat4 modelMatrix;uniform mat3 normalMatrix;uniform mat4 projectionMatrix;uniform mat4 viewMatrix;out vec3 vWorldPos;out vec3 vViewPos;out vec3 vNormal;out vec4 vClipPos;void main(){vec4 worldPos=(modelMatrix*vec4(position,1.0));vWorldPos=worldPos.xyz;gl_Position=projectionMatrix*viewMatrix*worldPos;vClipPos=gl_Position;vNormal=normalize(mat3(modelMatrix)*normal);}
