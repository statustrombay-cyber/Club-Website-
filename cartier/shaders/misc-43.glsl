precision lowp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform vec2 uLumafilterParams;in vec2 vUv;out vec4 FragColor;float luma(vec3 color){return dot(color,vec3(0.299,0.587,0.114));}void main(){vec4 col=texture(tMap,vUv);float luma=luma(col.xyz);float alpha=smoothstep(uLumafilterParams.x,uLumafilterParams.x+uLumafilterParams.y,luma);FragColor=mix(vec4(0.0,0.0,0.0,1.0),col,alpha);}
