precision highp float;
#define GLSLIFY 1
in vec3 position;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;out vec3 vLocalPos;void main(){vLocalPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_Position.z=gl_Position.w;}
