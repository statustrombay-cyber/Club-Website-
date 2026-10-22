
precision highp float;
precision highp sampler2D;
uniform sampler2D uSource;
uniform sampler2D tMap;
uniform vec2 texelSize;
uniform float diffusion;
uniform float dt;

in vec2 vUv;
in highp vec2 vL;
in highp vec2 vR;
in highp vec2 vT;
in highp vec2 vB;

out vec4 FragColor;

void main () {

	ivec2 coord = ivec2(gl_FragCoord.xy);
	vec2 size = vec2(textureSize(tMap, 0));

	vec3 xC = texelFetch(tMap, coord, 0).xyz;
	vec3 xL = texelFetch(tMap, coord - ivec2(1, 0), 0).xyz;
	vec3 xR = texelFetch(tMap, coord + ivec2(1, 0), 0).xyz;
	vec3 xT = texelFetch(tMap, coord + ivec2(0, 1), 0).xyz;
	vec3 xB = texelFetch(tMap, coord - ivec2(0, 1), 0).xyz;

	vec3 x0 = texelFetch(uSource, coord, 0).xyz;

	float h = (size.x * size.x);
	float a = dt * diffusion * h;
	float beta = 1.0 + 4.0 * a;

	vec3 result = (x0 + a * (xL + xR + xT + xB)) / beta;

	FragColor = vec4(result, 1.0);
}
