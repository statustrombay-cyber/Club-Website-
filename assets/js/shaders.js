/* GLSL. Textured, shadowed, triplanar plaster; cut-out figures that are lit by
   their own photograph; additive dust and glow; and the film pass. */

const HEAD = `#version 300 es
precision highp float;
`;

const LIGHT = `
uniform vec3 uCam;
uniform vec3 uLightPos;
uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform float uLightIntensity;
uniform float uSpotInner;
uniform float uSpotOuter;
uniform vec3 uLampPos[3];
uniform vec3 uLampColor[3];
uniform float uLampPower[3];
uniform mat4 uShadowMat;
uniform sampler2D uShadowTex;
uniform float uShadowTexel;
uniform vec3 uSkyColor;
uniform vec3 uGroundColor;
uniform float uAmbient;
uniform vec3 uFillDir;
uniform vec3 uFillColor;
uniform float uFillPower;
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform float uFogStart;

float shadowAt(vec3 world) {
  vec4 sp = uShadowMat * vec4(world, 1.0);
  vec3 c = sp.xyz / sp.w;
  c = c * 0.5 + 0.5;
  if (c.x < 0.002 || c.x > 0.998 || c.y < 0.002 || c.y > 0.998 || c.z > 1.0) return 1.0;
  float sum = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      float d = texture(uShadowTex, c.xy + vec2(float(x), float(y)) * uShadowTexel).r;
      sum += (c.z - 0.0022) > d ? 0.0 : 1.0;
    }
  }
  return sum / 9.0;
}
`;

export const objVS = HEAD + `
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUv;
uniform mat4 uViewProj;
uniform mat4 uModel;
uniform mat3 uNormalMat;
out vec3 vWorld;
out vec3 vNormal;
out vec2 vUv;
void main() {
  vec4 wp = uModel * vec4(aPos, 1.0);
  vWorld = wp.xyz;
  vNormal = normalize(uNormalMat * aNormal);
  vUv = aUv;
  gl_Position = uViewProj * wp;
}`;

export const objFS = HEAD + LIGHT + `
in vec3 vWorld;
in vec3 vNormal;
in vec2 vUv;
uniform sampler2D uMap;
uniform sampler2D uBump;
uniform float uUseMap;
uniform float uUseBump;
uniform float uTriplanar;
uniform float uUvScale;
uniform vec3 uAlbedo;
uniform float uRough;
uniform float uMetal;
uniform float uRim;
uniform vec3 uEmissiveColor;
uniform float uEmissive;
uniform float uTime;
out vec4 fragColor;

vec3 albedoAt(vec3 world, vec3 n, vec2 uv) {
  if (uUseMap < 0.5) return uAlbedo;
  if (uTriplanar > 0.5) {
    vec3 w = abs(n);
    w = pow(w, vec3(4.0));
    w /= (w.x + w.y + w.z);
    vec3 p = world * uUvScale;
    vec3 x = texture(uMap, p.zy).rgb;
    vec3 y = texture(uMap, p.xz).rgb;
    vec3 z = texture(uMap, p.xy).rgb;
    vec3 t = x * w.x + y * w.y + z * w.z;
    float m = dot(t, vec3(0.333));
    return mix(vec3(m), t, 0.18) * 1.06 * uAlbedo;
  }
  vec3 t = texture(uMap, uv * uUvScale).rgb;
  float m = dot(t, vec3(0.333));
  return mix(vec3(m), t, 0.18) * 1.06 * uAlbedo;
}

float heightAt(vec3 world, vec3 n, vec2 uv) {
  if (uUseBump < 0.5) return 0.0;
  vec2 p = uTriplanar > 0.5 ? world.xz * uUvScale : uv * uUvScale;
  return dot(texture(uBump, p).rgb, vec3(0.33));
}

vec3 shadeSurf(vec3 P, vec3 N, vec3 V) {
  vec3 albedo = albedoAt(P, N, vUv);

  // relief from the map's own luminance: trowelled plaster, not a decal
  if (uUseBump > 0.5) {
    float e = 1.5 / 1024.0;
    float h0 = heightAt(P, N, vUv);
    float hx = heightAt(P + vec3(e, 0.0, 0.0), N, vUv + vec2(e, 0.0));
    float hy = heightAt(P + vec3(0.0, e, 0.0), N, vUv + vec2(0.0, e));
    vec3 T = normalize(cross(N, abs(N.y) > 0.9 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0)));
    vec3 B = cross(N, T);
    N = normalize(N + (T * (h0 - hx) + B * (h0 - hy)) * 3.5);
  }

  vec3 toLight = uLightPos - P;
  float dist = length(toLight);
  vec3 L = toLight / max(dist, 1e-4);
  float spot = smoothstep(uSpotOuter, uSpotInner, dot(-L, uLightDir));
  float atten = uLightIntensity / (1.0 + dist * dist * 0.045);
  float ndl = clamp(dot(N, L) * 0.82 + 0.18, 0.0, 1.0);
  float sh = shadowAt(P);
  vec3 key = uLightColor * atten * spot * sh;

  vec3 H = normalize(V + L);
  float a = max(uRough * uRough, 0.002);
  float ndh = max(dot(N, H), 0.0);
  float D = a / (3.14159 * pow(ndh * ndh * (a - 1.0) + 1.0, 2.0));
  float fres = pow(1.0 - max(dot(V, H), 0.0), 5.0);
  float F = 0.04 + 0.96 * fres;
  vec3 spec = key * (D * F * 0.75) * ndl;

  // soft daylight fill from the window: the walls' main modelling light
  float fd = clamp(dot(N, uFillDir) * 0.72 + 0.28, 0.0, 1.0);
  vec3 fill = albedo * uFillColor * uFillPower * fd;

  // the room's warm bounce, in place of a probe
  vec3 env = mix(uGroundColor, uSkyColor, clamp(N.y * 0.5 + 0.5, 0.0, 1.0));
  vec3 ambient = albedo * env * uAmbient;

  // the lamps, unshadowed but with distance falloff
  vec3 lamps = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    vec3 d = uLampPos[i] - P;
    float dd = length(d);
    float nl = clamp(dot(N, d / max(dd, 1e-4)) * 0.7 + 0.3, 0.0, 1.0);
    lamps += albedo * uLampColor[i] * uLampPower[i] * nl / (1.0 + dd * dd * 0.5);
  }

  vec3 col = albedo * key * ndl * mix(1.0, 0.2, uMetal) + ambient + fill + lamps + spec * mix(1.0, 2.2, uMetal);
  col += albedo * env * uMetal * 0.7;
  col += uLightColor * pow(1.0 - max(dot(N, V), 0.0), 3.0) * uRim * 0.5;
  col += uEmissiveColor * uEmissive;
  return col;
}

vec3 applyFog(vec3 col, vec3 P) {
  float d = max(length(P - uCam) - uFogStart, 0.0);
  float f = 1.0 - exp(-pow(d * uFogDensity, 1.6));
  return mix(col, uFogColor, clamp(f, 0.0, 0.86));
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(uCam - vWorld);
  if (!gl_FrontFacing) N = -N;
  vec3 col = shadeSurf(vWorld, N, V);
  fragColor = vec4(applyFog(col, vWorld), 1.0);
}`;

/* unlit, full-brightness surfaces: the window, the skylight, the lamp slots */
export const glowVS = HEAD + `
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUv;
uniform mat4 uViewProj;
uniform mat4 uModel;
uniform float uUvScale;
uniform vec2 uUvOffset;
uniform float uFlipU;
out vec2 vUv;
void main() {
  vUv = aUv * uUvScale + uUvOffset;
  if (uFlipU > 0.5) vUv.x = 1.0 - vUv.x;
  gl_Position = uViewProj * uModel * vec4(aPos, 1.0);
}`;

export const glowFS = HEAD + `
in vec2 vUv;
uniform sampler2D uMap;
uniform float uUseMap;
uniform vec3 uColor;
uniform float uPower;
uniform float uRadial;
out vec4 fragColor;
void main() {
  vec3 c = uUseMap > 0.5 ? texture(uMap, vUv).rgb : vec3(1.0);
  if (uRadial > 0.5) {
    vec2 d = vUv - 0.5;
    c *= smoothstep(0.52, 0.06, length(d));
  }
  fragColor = vec4(c * uColor * uPower, 1.0);
}`;

/* the people: a photograph of a backlit figure, cut out and always turned to
   the camera. The rim of the photograph does the lighting. */
export const figureVS = HEAD + `
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUv;
uniform mat4 uViewProj;
uniform vec3 uCam;
uniform vec3 uOrigin;
uniform vec2 uSize;
uniform float uFlip;
uniform float uGlow;
out vec2 vUv;
out vec3 vWorld;
void main() {
  vec3 toCam = uCam - uOrigin;
  toCam.y = 0.0;
  toCam = normalize(toCam + vec3(0.0001, 0.0, 0.0));
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), toCam));
  vec3 p = uOrigin + right * (aPos.x * uSize.x * uFlip) + vec3(0.0, aPos.y * uSize.y, 0.0);
  p += toCam * aPos.z * 0.001;
  vUv = aUv;
  vWorld = p;
  gl_Position = uViewProj * vec4(p, 1.0);
}`;

export const figureFS = HEAD + `
in vec2 vUv;
in vec3 vWorld;
uniform sampler2D uMap;
uniform vec3 uTint;
uniform float uBright;
uniform float uFogDensity;
uniform vec3 uFogColor;
uniform float uTime;
out vec4 fragColor;
void main() {
  vec4 t = texture(uMap, vUv);
  if (t.a < 0.5) discard;
  vec3 c = t.rgb * uTint * uBright;
  // a breath of movement, so they are not statues
  c *= 1.0 + 0.04 * sin(uTime * 0.6 + vWorld.x * 0.7 + vWorld.z);
  float d = length(vWorld - vec3(0.0));
  fragColor = vec4(c, 1.0);
}`;

export const shadowVS = HEAD + `
layout(location = 0) in vec3 aPos;
uniform mat4 uViewProj;
uniform mat4 uModel;
void main() { gl_Position = uViewProj * uModel * vec4(aPos, 1.0); }`;

export const emptyFS = HEAD + `
out vec4 fragColor;
void main() { fragColor = vec4(1.0); }`;

/* ── gold dust ────────────────────────────────────────────────────────────── */
export const dustVS = HEAD + `
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aSeed;
uniform mat4 uViewProj;
uniform vec3 uCam;
uniform float uTime;
uniform float uPixelRatio;
out float vFade;
out float vTwinkle;
void main() {
  float t = uTime;
  vec3 p = aPos;
  p.y = mod(p.y + t * (0.05 + aSeed.x * 0.05), 5.2);
  p.x += sin(t * 0.24 + aSeed.y * 6.283) * 0.5;
  p.z += cos(t * 0.2 + aSeed.x * 6.283) * 0.45;
  p.y += sin(t * 0.5 + aSeed.z * 6.283) * 0.16;
  gl_Position = uViewProj * vec4(p, 1.0);
  float dist = distance(uCam, p);
  gl_PointSize = clamp((2.0 + aSeed.y * 3.4) * uPixelRatio * (3.0 / max(dist, 0.4)), 1.0, 34.0);
  vFade = smoothstep(26.0, 1.2, dist) * (0.35 + 0.65 * aSeed.z);
  vTwinkle = 0.5 + 0.5 * sin(t * (1.6 + aSeed.x * 3.0) + aSeed.y * 6.283);
}`;

export const dustFS = HEAD + `
in float vFade;
in float vTwinkle;
uniform vec3 uColor;
out vec4 fragColor;
void main() {
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r);
  a *= a;
  fragColor = vec4(uColor * vTwinkle, a * vFade * 1.1);
  if (fragColor.a < 0.004) discard;
}`;

/* ── a soft disc used for lamp haze and contact shadows ───────────────────── */
export const spriteVS = HEAD + `
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUv;
uniform mat4 uViewProj;
uniform mat4 uModel;
out vec2 vUv;
void main() {
  vUv = aUv;
  gl_Position = uViewProj * uModel * vec4(aPos, 1.0);
}`;

export const hazeFS = HEAD + `
in vec2 vUv;
uniform vec3 uColor;
uniform float uPower;
out vec4 fragColor;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float a = pow(clamp(1.0 - r, 0.0, 1.0), 2.2);
  fragColor = vec4(uColor * a * uPower, a);
}`;

export const shadowDiscFS = HEAD + `
in vec2 vUv;
uniform float uPower;
out vec4 fragColor;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float a = pow(clamp(1.0 - r, 0.0, 1.0), 1.6);
  fragColor = vec4(0.0, 0.0, 0.0, a * uPower);
}`;

/* ── bloom + film ─────────────────────────────────────────────────────────── */
export const brightFS = HEAD + `
in vec2 vUv;
uniform sampler2D uScene;
uniform float uThreshold;
uniform float uKnee;
out vec4 fragColor;
void main() {
  vec3 c = texture(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  float soft = clamp(l - uThreshold + uKnee, 0.0, 2.0 * uKnee);
  soft = soft * soft / (4.0 * uKnee + 1e-4);
  float w = max(soft, l - uThreshold) / max(l, 1e-4);
  fragColor = vec4(c * w, 1.0);
}`;

export const blurFS = HEAD + `
in vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uDir;
out vec4 fragColor;
void main() {
  vec3 sum = texture(uTex, vUv).rgb * 0.227027;
  sum += texture(uTex, vUv + uDir * 1.3846153846).rgb * 0.3162162162;
  sum += texture(uTex, vUv - uDir * 1.3846153846).rgb * 0.3162162162;
  sum += texture(uTex, vUv + uDir * 3.2307692308).rgb * 0.0702702703;
  sum += texture(uTex, vUv - uDir * 3.2307692308).rgb * 0.0702702703;
  fragColor = vec4(sum, 1.0);
}`;

export const compFS = HEAD + `
in vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uExposure;
uniform float uTime;
uniform float uBloomStrength;
uniform vec2 uRes;
uniform float uFade;
uniform float uGrain;
uniform float uVignette;
out vec4 fragColor;

vec3 aces(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
void main() {
  vec2 uv = vUv;
  vec2 d = uv - 0.5;
  float r2 = dot(d, d);
  vec2 off = d * r2 * 0.005;
  vec3 col;
  col.r = texture(uScene, uv + off).r;
  col.g = texture(uScene, uv).g;
  col.b = texture(uScene, uv - off).b;

  col += texture(uBloom, uv).rgb * uBloomStrength;
  col *= uExposure;
  col = aces(col);
  col = pow(col, vec3(0.98, 1.0, 1.03));
  col = mix(col, col * vec3(1.07, 1.0, 0.9), smoothstep(0.3, 1.0, max(col.r, max(col.g, col.b))));
  col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);

  float vig = smoothstep(1.02, 0.2, r2 * 1.45);
  col *= mix(1.0 - uVignette, 1.0, vig);

  float g = hash12(uv * uRes + fract(uTime) * 91.0) - 0.5;
  col += g * uGrain * (1.0 - 0.55 * max(col.r, max(col.g, col.b)));

  col *= uFade;
  fragColor = vec4(col, 1.0);
}`;
