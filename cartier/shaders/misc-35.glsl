#define GLSLIFY 1
vec3 getIBLSpecularLighting(in vec3 specularColor,in vec3 dir,in float roughness,in vec2 brdf,in bool monochrome){vec3 specularLight=monochrome ? textureLod(tEnvSpecular,dir,roughness*float(ENV_LEVELS)).xxx : textureLod(tEnvSpecular,dir,roughness*float(ENV_LEVELS)).xyz;return specularLight*(specularColor*brdf.x+brdf.y);}
