#define GLSLIFY 1
vec4 LineartoSRGB(vec4 linear){vec3 linOut=pow(linear.xyz,vec3(1.0/2.2));return vec4(linOut,linear.w);}vec3 LineartoSRGB(vec3 linear){vec3 linOut=pow(linear.xyz,vec3(1.0/2.2));return linOut;}
