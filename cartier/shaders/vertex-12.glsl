
#define mad(a, b, c) (a * b + c)

#define SMAA_MAX_SEARCH_STEPS 16

in vec3 position;
in vec2 uv;

uniform vec2 uResolution;

out vec2 vPixCoord;
out vec4 vOffset[3];
out vec2 vUv;

void main() {
  vec4 SMAA_RT_METRICS = vec4(1.0 / uResolution.x, 1.0 / uResolution.y, uResolution.x, uResolution.y);

  vUv = uv;

  vPixCoord = vUv * SMAA_RT_METRICS.zw;

  // We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
  vOffset[0] = mad(SMAA_RT_METRICS.xyxy, vec4(-0.25, -0.125,  1.25, -0.125), vUv.xyxy);
  vOffset[1] = mad(SMAA_RT_METRICS.xyxy, vec4(-0.125, -0.25, -0.125,  1.25), vUv.xyxy);

  // And these for the searches, they indicate the ends of the loops:
  vOffset[2] = mad(
    SMAA_RT_METRICS.xxyy,
    vec4(-2.0, 2.0, -2.0, 2.0) * float(SMAA_MAX_SEARCH_STEPS),
    vec4(vOffset[0].xz, vOffset[1].yw)
  );

  gl_Position = vec4(position.xy, 0.0, 1.0);
}
