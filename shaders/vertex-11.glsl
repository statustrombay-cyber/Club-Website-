
#define mad(a, b, c) (a * b + c)

in vec3 position;
in vec2 uv;

uniform vec2 uResolution;

out vec2 vUv;
out vec4 vOffset;

void main() {
  vec4 SMAA_RT_METRICS = vec4(1.0 / uResolution.x, 1.0 / uResolution.y, uResolution.x, uResolution.y);

	vUv = uv;
	vOffset = mad(SMAA_RT_METRICS.xyxy, vec4(1.0, 0.0, 0.0,  1.0), vUv.xyxy);

  gl_Position = vec4(position.xy, 0.0, 1.0);
}
