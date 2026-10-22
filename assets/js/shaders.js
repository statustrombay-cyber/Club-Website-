/* GLSL. Lambert + GGX key light with a real shadow map, a hemisphere ambient,
   a rim term that does the silhouettes, procedural plaster, and a film pass. */

const HEAD = `#version 300 es
precision highp float;
precision highp int;
`;

const PLACE = `
vec3 place() { return vec3(0.0); }
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

export const instVS = HEAD + `
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUv;
layout(location = 3) in vec3 aOffset;
layout(location = 4) in vec2 aOrient;   // rotation about Y, uniform scale
uniform mat4 uViewProj;
out vec3 vWorld;
out vec3 vNormal;
out vec2 vUv;
void main() {
  float c = cos(aOrient.x), s = sin(aOrient.x);
  mat3 R = mat3(c, 0.0, -s,  0.0, 1.0, 0.0,  s, 0.0, c);
  vec3 p = R * (aPos * aOrient.y) + aOffset;
  vWorld = p;
  vNormal = normalize(R * aNormal);
  vUv = aUv;
  gl_Position = uViewProj * vec4(p, 1.0);
}`;

export const sharedFS = `
uniform vec3 uCam;
uniform vec3 uAlbedo;
uniform float uRough;
uniform float uMetal;
uniform float uRim;
uniform float uEmissive;
uniform float uDetail;
uniform vec3 uLightPos;
uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform float uLightIntensity;
uniform float uSpotInner;
uniform float uSpotOuter;
uniform mat4 uShadowMat;
uniform sampler2D uShadowTex;
uniform vec2 uShadowTexel;
uniform vec3 uSkyColor;
uniform vec3 uGroundColor;
uniform float uAmbient;
uniform vec3 uFillDir;
uniform vec3 uFillColor;
uniform float uFillIntensity;
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform float uFogStart;
uniform float uTime;

float hash13(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float vnoise(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash13(i + vec3(0,0,0)), hash13(i + vec3(1,0,0)), f.x),
        mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x),
        mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}

float shadowFactor(vec3 world) {
  vec4 sp = uShadowMat * vec4(world, 1.0);
  vec3 c = sp.xyz / sp.w;
  c = c * 0.5 + 0.5;
  if (c.x < 0.001 || c.x > 0.999 || c.y < 0.001 || c.y > 0.999 || c.z > 1.0) return 1.0;
  float bias = 0.0016;
  float sum = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      float d = texture(uShadowTex, c.xy + vec2(float(x), float(y)) * uShadowTexel).r;
      sum += (c.z - bias) > d ? 0.0 : 1.0;
    }
  }
  return sum / 9.0;
}

vec3 shade(vec3 P, vec3 N, vec3 V, vec3 albedo) {
  float blotch = vnoise(P * 0.32) - 0.5;                       // lime-wash tide marks
  float grain = vnoise(P * 2.4) * 0.55 + vnoise(P * 9.0) * 0.45 - 0.5;
  float streaks = vnoise(vec3(P.x * 0.7, P.y * 5.0, P.z * 0.7)) - 0.5;
  albedo *= 1.0 + (blotch * 0.20 + grain * 0.13 + streaks * 0.07) * uDetail;
  albedo = max(albedo, vec3(0.0));

  vec3 toLight = uLightPos - P;
  float dist = length(toLight);
  vec3 L = toLight / max(dist, 1e-4);
  float spot = smoothstep(uSpotOuter, uSpotInner, dot(-L, uLightDir));
  float atten = uLightIntensity / (1.0 + dist * dist * 0.055);
  float ndl = clamp((dot(N, L) + 0.32) / 1.32, 0.0, 1.0);
  float sh = shadowFactor(P);

  vec3 H = normalize(V + L);
  float a = max(uRough * uRough, 0.0025);
  float ndh = max(dot(N, H), 0.0);
  float D = a / (3.14159 * pow(ndh * ndh * (a - 1.0) + 1.0, 2.0));
  float F = 0.03 + 0.97 * pow(1.0 - max(dot(V, H), 0.0), 5.0);
  vec3 spec = uLightColor * (D * F * 0.9) * atten * spot * sh * ndl;

  // a warm environment standing in for a room full of bounce light
  vec3 R = reflect(-V, N);
  float up = clamp(R.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 env = mix(uGroundColor, uSkyColor, up);
  env += uSkyColor * pow(clamp(dot(R, normalize(vec3(0.3, 0.9, 0.2))), 0.0, 1.0), 8.0) * 0.5;
  vec3 diffuse = albedo * mix(vec3(1.0), env, uMetal * 0.85);

  vec3 key = uLightColor * atten * spot * sh;
  vec3 direct = diffuse * key * ndl * mix(1.0, 0.15, uMetal);
  vec3 ambient = albedo * mix(uGroundColor, uSkyColor, N.y * 0.5 + 0.5) * uAmbient;

  float fndl = clamp(dot(N, uFillDir) * 0.5 + 0.5, 0.0, 1.0);
  vec3 fill = albedo * uFillColor * fndl * uFillIntensity;
  vec3 col = direct + ambient + fill + spec + albedo * env * uMetal * 0.55;
  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  col += uLightColor * fres * uRim * 0.55;
  col += albedo * uEmissive;
  return col;
}

vec3 applyFog(vec3 col, vec3 P) {
  float d = max(length(P - uCam) - uFogStart, 0.0);
  float f = 1.0 - exp(-pow(d * uFogDensity, 1.65));
  return mix(col, uFogColor, clamp(f, 0.0, 1.0));
}
`;

export const objFS = HEAD + sharedFS + `
in vec3 vWorld;
in vec3 vNormal;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(uCam - vWorld);
  if (!gl_FrontFacing) N = -N;
  vec3 col = shade(vWorld, N, V, uAlbedo);
  fragColor = vec4(applyFog(col, vWorld), 1.0);
}`;

export const shadowVS = HEAD + `
layout(location = 0) in vec3 aPos;
uniform mat4 uViewProj;
uniform mat4 uModel;
void main() { gl_Position = uViewProj * uModel * vec4(aPos, 1.0); }`;

export const shadowInstVS = HEAD + `
layout(location = 0) in vec3 aPos;
layout(location = 3) in vec3 aOffset;
layout(location = 4) in vec2 aOrient;
uniform mat4 uViewProj;
void main() {
  float c = cos(aOrient.x), s = sin(aOrient.x);
  mat3 R = mat3(c, 0.0, -s,  0.0, 1.0, 0.0,  s, 0.0, c);
  vec3 p = R * (aPos * aOrient.y) + aOffset;
  gl_Position = uViewProj * vec4(p, 1.0);
}`;

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
  p.y = mod(p.y + t * (0.035 + aSeed.x * 0.03), 5.4);
  p.x += sin(t * 0.22 + aSeed.y * 6.283) * 0.35 + aSeed.z * 0.2;
  p.z += cos(t * 0.19 + aSeed.x * 6.283) * 0.3;
  p.y += sin(t * 0.4 + aSeed.z * 6.283) * 0.12;
  vec4 clip = uViewProj * vec4(p, 1.0);
  gl_Position = clip;
  float dist = distance(uCam, p);
  gl_PointSize = clamp((1.9 + aSeed.y * 3.2) * uPixelRatio * (2.8 / max(dist, 0.4)), 1.0, 30.0);
  vFade = smoothstep(30.0, 2.0, dist) * (0.35 + 0.65 * aSeed.z);
  vTwinkle = 0.55 + 0.45 * sin(t * (1.3 + aSeed.x * 2.2) + aSeed.y * 6.283);
}`;

export const dustFS = HEAD + `
in float vFade;
in float vTwinkle;
uniform vec3 uColor;
out vec4 fragColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d);
  float a = smoothstep(0.5, 0.02, r);
  a *= a;
  fragColor = vec4(uColor * vTwinkle, a * vFade * 0.9);
  if (fragColor.a < 0.003) discard;
}`;

/* ── light shafts ─────────────────────────────────────────────────────────── */
export const shaftVS = HEAD + `
layout(location = 0) in vec3 aPos;
layout(location = 3) in vec3 aOffset;
layout(location = 4) in vec2 aOrient;   // rotation, scale
uniform mat4 uViewProj;
out vec2 vUv;
out vec3 vWorld;
void main() {
  float c = cos(aOrient.x), s = sin(aOrient.x);
  mat3 R = mat3(c, 0.0, -s,  0.0, 1.0, 0.0,  s, 0.0, c);
  vec3 p = R * (aPos * aOrient.y) + aOffset;
  vUv = aPos.xy * 2.0;
  vWorld = p;
  gl_Position = uViewProj * vec4(p, 1.0);
}`;

export const shaftFS = HEAD + `
in vec2 vUv;
in vec3 vWorld;
uniform vec3 uCam;
uniform vec3 uColor;
uniform float uTime;
uniform float uStrength;
out vec4 fragColor;
void main() {
  float across = smoothstep(1.0, 0.0, abs(vUv.x));
  float down = smoothstep(-1.0, 0.4, vUv.y) * smoothstep(1.0, 0.2, vUv.y);
  float radial = smoothstep(1.05, 0.1, length(vUv * vec2(1.0, 0.92)));
  float d = distance(uCam, vWorld);
  float fade = smoothstep(34.0, 6.0, d);
  float flicker = 0.86 + 0.14 * sin(uTime * 0.7 + vWorld.x * 0.4);
  float a = across * across * down * radial * fade * flicker * uStrength;
  fragColor = vec4(uColor * a, a);
}`;

/* ── the shaft of light under each ceiling slot ───────────────────────────── */
export const coneVS = HEAD + `
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUv;
uniform mat4 uViewProj;
uniform mat4 uModel;
out vec2 vUv;
out vec3 vWorld;
out vec3 vNormal;
void main() {
  vec4 wp = uModel * vec4(aPos, 1.0);
  vWorld = wp.xyz;
  vNormal = normalize(mat3(uModel) * aNormal);
  vUv = aUv;
  gl_Position = uViewProj * wp;
}`;

export const coneFS = HEAD + `
in vec2 vUv;
in vec3 vWorld;
in vec3 vNormal;
uniform vec3 uCam;
uniform vec3 uColor;
uniform float uStrength;
uniform float uTime;
out vec4 fragColor;
void main() {
  vec3 V = normalize(uCam - vWorld);
  float edge = pow(abs(dot(normalize(vNormal), V)), 1.6);
  float fall = pow(clamp(1.0 - vUv.y, 0.0, 1.0), 1.7);
  float flicker = 0.9 + 0.1 * sin(uTime * 0.6 + vWorld.x * 0.3);
  float a = edge * fall * uStrength * flicker;
  fragColor = vec4(uColor * a, a);
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
  // a whisper of lateral colour at the edges of the frame
  vec2 off = d * r2 * 0.006;
  vec3 col;
  col.r = texture(uScene, uv + off).r;
  col.g = texture(uScene, uv).g;
  col.b = texture(uScene, uv - off).b;

  vec3 bloom = texture(uBloom, uv).rgb;
  col += bloom * uBloomStrength;

  col *= uExposure;
  col = aces(col);

  // grade: warm highlights, deep neutral shadows
  col = pow(col, vec3(0.98, 1.0, 1.04));
  col = mix(col, col * vec3(1.06, 1.0, 0.9), smoothstep(0.35, 1.0, max(col.r, max(col.g, col.b))));

  col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);   // a little filmic contrast
  float vig = smoothstep(1.05, 0.28, r2 * 1.55);
  col *= mix(0.62, 1.0, vig);

  float g = hash12(uv * uRes + fract(uTime) * 137.0) - 0.5;
  col += g * uGrain * (1.0 - 0.5 * max(col.r, max(col.g, col.b)));

  col *= uFade;
  fragColor = vec4(col, 1.0);
}`;
