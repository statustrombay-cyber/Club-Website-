
precision mediump float;
precision mediump sampler2D;
in highp vec2 vUv;
in highp vec2 vL;
in highp vec2 vR;
in highp vec2 vT;
in highp vec2 vB;
uniform sampler2D uVelocity;

out vec4 FragColor;

void main () {
	float L = texture(uVelocity, vL).y;
	float R = texture(uVelocity, vR).y;
	float T = texture(uVelocity, vT).x;
	float B = texture(uVelocity, vB).x;

	// vec2 C = texture(uVelocity, vUv).xy;

	// if (vL.x < 0.0) { L = -C.x; }
	// if (vR.x > 1.0) { R = -C.x; }
	// if (vT.y > 1.0) { T = -C.y; }
	// if (vB.y < 0.0) { B = -C.y; }

	float vorticity = R - L - T + B;
	FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
