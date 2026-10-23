
	precision highp float;

	uniform sampler2D tMap;
	uniform sampler2D tNormal;
	uniform sampler2D tDepth;

	in vec2 vUv;

	out vec4 FragColor[2];

	void main() {
		FragColor[0] = texture(tMap, vUv);
		FragColor[1] = texture(tNormal, vUv);
		gl_FragDepth = texelFetch(tDepth, ivec2(gl_FragCoord.xy), 0).x;
	}
