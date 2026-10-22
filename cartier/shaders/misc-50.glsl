precision highp float;
#define GLSLIFY 1
uniform float uTime;flat in float vLife;out vec4 FragColor[2];void main(){vec2 coord=gl_PointCoord.xy;coord. y=1.0-coord.y;coord=2.0*coord-1.0;float r=dot(coord,coord);if(r>0.5)discard;float phase=exp(-r*5.0)*vLife;FragColor[0]=vec4(phase*0.5);FragColor[1]=vec4(0.0);}
