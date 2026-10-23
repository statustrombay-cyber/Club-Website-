#define GLSLIFY 1
vec3 evaluateSH(vec3 normal,vec3 shConstants[9]){return shConstants[0]+shConstants[1]*normal.y+shConstants[2]*normal.z+shConstants[3]*normal.x+shConstants[4]*(normal.y*normal.x)+shConstants[5]*(normal.y*normal.z)+shConstants[6]*(3.0*normal.z*normal.z-1.0)+shConstants[7]*(normal.z*normal.x)+shConstants[8]*(normal.x*normal.x-normal.y*normal.y);}
