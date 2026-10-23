precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;in vec2 vUv;out vec4 FragColor;float msdf(sampler2D tMap,vec2 uv){vec3 tex=texture(tMap,uv).rgb;float signedDist=max(min(tex.r,tex.g),min(max(tex.r,tex.g),tex.b))-0.5;float d=fwidth(signedDist);float alpha=smoothstep(-d,d,signedDist);return alpha;}void main(){float alpha=msdf(tMap,vUv);if(alpha<(1.0/255.0))discard;FragColor=vec4(alpha);}
