# Cartier's shaders, lifted from the bundle

Extracted by `tools/extract-shaders.mjs` from `cartier.app.js`. These are the
original GLSL sources, unchanged apart from interpolations, which are replaced
with `/* … */` because their values only exist at runtime.

| file | bytes | what it is |
| ---- | ----- | ---------- |
| `misc.glsl` | 263 | unclassified shader |
| `misc-2.glsl` | 265 | unclassified shader |
| `vertex.glsl` | 273 | vertex shader |
| `misc-3.glsl` | 494 | unclassified shader |
| `vertex-2.glsl` | 211 | vertex shader |
| `misc-4.glsl` | 816 | unclassified shader |
| `vertex-3.glsl` | 211 | vertex shader |
| `misc-5.glsl` | 329 | unclassified shader |
| `vertex-4.glsl` | 792 | vertex shader |
| `misc-6.glsl` | 1214 | unclassified shader |
| `misc-7.glsl` | 754 | unclassified shader |
| `misc-8.glsl` | 297 | unclassified shader |
| `misc-9.glsl` | 699 | unclassified shader |
| `misc-10.glsl` | 491 | unclassified shader |
| `vertex-5.glsl` | 964 | vertex shader |
| `misc-11.glsl` | 3417 | unclassified shader |
| `misc-12.glsl` | 1364 | unclassified shader |
| `misc-13.glsl` | 336 | unclassified shader |
| `misc-14.glsl` | 284 | unclassified shader |
| `vertex-6.glsl` | 1012 | vertex shader |
| `misc-15.glsl` | 277 | unclassified shader |
| `vertex-7.glsl` | 282 | vertex shader |
| `misc-16.glsl` | 1060 | unclassified shader |
| `misc-17.glsl` | 546 | unclassified shader |
| `misc-18.glsl` | 1003 | unclassified shader |
| `vertex-8.glsl` | 280 | vertex shader |
| `misc-19.glsl` | 3741 | unclassified shader |
| `misc-20.glsl` | 633 | unclassified shader |
| `misc-21.glsl` | 2172 | unclassified shader |
| `vertex-9.glsl` | 260 | vertex shader |
| `misc-22.glsl` | 1783 | unclassified shader |
| `misc-23.glsl` | 853 | unclassified shader |
| `misc-24.glsl` | 713 | unclassified shader |
| `misc-25.glsl` | 618 | unclassified shader |
| `misc-26.glsl` | 410 | unclassified shader |
| `misc-27.glsl` | 209 | unclassified shader |
| `misc-28.glsl` | 754 | unclassified shader |
| `misc-29.glsl` | 747 | unclassified shader |
| `misc-30.glsl` | 363 | unclassified shader |
| `misc-31.glsl` | 656 | unclassified shader |
| `misc-32.glsl` | 253 | unclassified shader |
| `misc-33.glsl` | 985 | unclassified shader |
| `misc-34.glsl` | 1871 | unclassified shader |
| `misc-35.glsl` | 340 | unclassified shader |
| `misc-36.glsl` | 827 | unclassified shader |
| `vertex-10.glsl` | 547 | vertex shader |
| `misc-37.glsl` | 1796 | unclassified shader |
| `misc-38.glsl` | 1800 | unclassified shader |
| `vertex-11.glsl` | 378 | vertex shader |
| `misc-39.glsl` | 16635 | unclassified shader |
| `vertex-12.glsl` | 883 | vertex shader |
| `misc-40.glsl` | 848 | unclassified shader |
| `misc-41.glsl` | 1065 | unclassified shader |
| `magic-light.glsl` | 5504 | the volumetric spot light that reveals the set |
| `vertex-13.glsl` | 305 | vertex shader |
| `misc-42.glsl` | 1094 | unclassified shader |
| `misc-43.glsl` | 392 | unclassified shader |
| `film.glsl` | 1635 | grain, chroma shift, vignette, dither |
| `misc-44.glsl` | 1467 | unclassified shader |
| `misc-45.glsl` | 846 | unclassified shader |
| `misc-46.glsl` | 308 | unclassified shader |
| `misc-47.glsl` | 216 | unclassified shader |
| `misc-48.glsl` | 6695 | unclassified shader |
| `vertex-14.glsl` | 2466 | vertex shader |
| `vertex-15.glsl` | 1462 | vertex shader |
| `misc-49.glsl` | 1842 | unclassified shader |
| `vertex-16.glsl` | 346 | vertex shader |
| `misc-50.glsl` | 309 | unclassified shader |
| `vertex-17.glsl` | 687 | vertex shader |
| `depth.glsl` | 1034 | depth-only pass |
| `vertex-18.glsl` | 482 | vertex shader |
| `misc-51.glsl` | 2234 | unclassified shader |
| `vertex-19.glsl` | 622 | vertex shader |
| `misc-52.glsl` | 403 | unclassified shader |
| `vertex-20.glsl` | 473 | vertex shader |
| `misc-53.glsl` | 305 | unclassified shader |
| `vertex-21.glsl` | 225 | vertex shader |
| `misc-54.glsl` | 298 | unclassified shader |
| `misc-55.glsl` | 241 | unclassified shader |
| `vertex-22.glsl` | 225 | vertex shader |
| `misc-56.glsl` | 4709 | unclassified shader |
| `vertex-23.glsl` | 1851 | vertex shader |
| `misc-57.glsl` | 476 | unclassified shader |
| `vertex-24.glsl` | 225 | vertex shader |
| `misc-58.glsl` | 862 | unclassified shader |
| `vertex-25.glsl` | 346 | vertex shader |
| `misc-59.glsl` | 290 | unclassified shader |
| `vertex-26.glsl` | 225 | vertex shader |
| `misc-60.glsl` | 1808 | unclassified shader |
| `vertex-27.glsl` | 461 | vertex shader |
| `misc-61.glsl` | 435 | unclassified shader |
| `vertex-28.glsl` | 225 | vertex shader |
| `vertex-29.glsl` | 355 | vertex shader |
| `misc-62.glsl` | 206 | unclassified shader |
| `misc-63.glsl` | 1092 | unclassified shader |
| `misc-64.glsl` | 365 | unclassified shader |
| `misc-65.glsl` | 599 | unclassified shader |
| `misc-66.glsl` | 627 | unclassified shader |
| `misc-67.glsl` | 677 | unclassified shader |
| `misc-68.glsl` | 873 | unclassified shader |
| `misc-69.glsl` | 579 | unclassified shader |
| `misc-70.glsl` | 511 | unclassified shader |
| `blur.glsl` | 597 | separable blur |
| `vertex-30.glsl` | 283 | vertex shader |
| `misc-71.glsl` | 5735 | unclassified shader |
| `vertex-31.glsl` | 826 | vertex shader |

## Uniforms per shader

### `misc.glsl`

_none_

### `misc-2.glsl`

_none_

### `vertex.glsl`

_none_

### `misc-3.glsl`

`t2D`, `backgroundIntensity`

### `vertex-2.glsl`

_none_

### `misc-4.glsl`

`envMap`, `flipEnvMap`, `backgroundBlurriness`, `backgroundIntensity`, `backgroundRotation`

### `vertex-3.glsl`

_none_

### `misc-5.glsl`

`tCube`, `tFlip`, `opacity`

### `vertex-4.glsl`

_none_

### `misc-6.glsl`

`opacity`

### `misc-7.glsl`

`referencePosition`, `nearDistance`, `farDistance`

### `misc-8.glsl`

`tEquirect`

### `misc-9.glsl`

`opacity`

### `misc-10.glsl`

`color`, `opacity`

### `vertex-5.glsl`

`rotation`, `center`

### `misc-11.glsl`

`envMap`, `roughness`, `mipInt`

### `misc-12.glsl`

`envMap`, `samples`, `weights`, `latitudinal`, `dTheta`, `mipInt`, `poleAxis`

### `misc-13.glsl`

`envMap`

### `misc-14.glsl`

`flipEnvMap`, `envMap`

### `vertex-6.glsl`

_none_

### `misc-15.glsl`

`tEquirect`

### `vertex-7.glsl`

`modelViewMatrix`, `projectionMatrix`

### `misc-16.glsl`

`tDiffuse`

### `misc-17.glsl`

_none_

### `misc-18.glsl`

`shadow_pass`, `resolution`, `radius`

### `vertex-8.glsl`

_none_

### `misc-19.glsl`

_none_

### `misc-20.glsl`

`tMap`, `uAngles`

### `misc-21.glsl`

`tMap`, `uResolution`, `uRoughness`, `uMipLevel`

### `vertex-9.glsl`

`projectionMatrix`, `modelViewMatrix`

### `misc-22.glsl`

`uResolution`, `uBaseColor`, `tLayer1`, `tLayer1Alpha`, `tLayer2`, `tLayer2Alpha`, `tLayer3`, `tLayer3Alpha`, `tLayer4`, `tLayer4Alpha`, `tLayer5`, `tLayer5Alpha`, `tLayer6`, `tLayer6Alpha`

### `misc-23.glsl`

_none_

### `misc-24.glsl`

_none_

### `misc-25.glsl`

_none_

### `misc-26.glsl`

_none_

### `misc-27.glsl`

_none_

### `misc-28.glsl`

_none_

### `misc-29.glsl`

_none_

### `misc-30.glsl`

_none_

### `misc-31.glsl`

_none_

### `misc-32.glsl`

_none_

### `misc-33.glsl`

_none_

### `misc-34.glsl`

_none_

### `misc-35.glsl`

_none_

### `misc-36.glsl`

_none_

### `vertex-10.glsl`

`uResolution`

### `misc-37.glsl`

`tMap`

### `misc-38.glsl`

`tMap`, `tSceneMask`, `tWeights`, `SMAA_RT_METRICS`, `uResolution`

### `vertex-11.glsl`

`uResolution`

### `misc-39.glsl`

`SMAA_RT_METRICS`, `uResolution`, `tEdges`, `tAreaTex`, `tSearchTex`

### `vertex-12.glsl`

`uResolution`

### `misc-40.glsl`

`tMap`, `uResolution`, `uTime`, `uSeed`

### `misc-41.glsl`

`tMap`, `uResolution`, `uTime`, `uSeed`

### `magic-light.glsl`

`tDepth`, `tNormal`, `tFlowMap`, `tSpotLight`, `tPrevFrame`, `uSpotLightMatrix`, `uPrevViewProjectionMatrix`, `uLightParams`, `uRotations`, `uLights`, `uRadii`, `uPoint`, `cameraPosition`, `uCameraNearFar`, `uTime`, `uSpotLightRadius`, `uSpotLightPhase`, `uRipplePhase`, `uHitDistance`, `uNoiseScale`, `uNoiseSpeed`, `uDistortionStrength`, `uPrevFrameMix`, `uRingRadiusFraction`, `uRingEdge`, `uRingPower`, `uRevealLightPhase`, `uSpotLightIntensityMask`, `uAudioAmplitude`

### `vertex-13.glsl`

`uViewMatrix`, `uFrustum`

### `misc-42.glsl`

`tMap`, `tBloom`, `uTime`, `uBloomIntensity`, `uGlowIntensity`

### `misc-43.glsl`

`tMap`, `uLumafilterParams`

### `film.glsl`

`tMap`, `tLight`, `tSpectrum`, `tBlueNoise`, `uTime`, `uChromaShiftStrength`, `uChromaShiftRadius`, `uVignetteRadius`, `uVignetteBias`, `uLensDistortion`, `uLensDistortionMax`

### `misc-44.glsl`

`tMap`, `tLight`, `tNormalData`, `uLightColor`, `uLightColor2`, `uSpotLightPhase`, `uDark`

### `misc-45.glsl`

`tMap`, `tNoise`, `uTime`, `uBlur`, `uBlurStrength`

### `misc-46.glsl`

`tMap`, `tNormal`, `tDepth`

### `misc-47.glsl`

`tMap`

### `misc-48.glsl`

`tBRDFLUT`, `tEnvSpecular`, `tAlbedo`, `uAlbedoRepeatOffset`, `uColorIntensity`, `tEmissive`, `uEmissiveRepeatOffset`, `uEmissiveIntensity`, `tNormal`, `uNormalRepeatOffset`, `tMR`, `uMRRepeatOffset`, `tAO`, `uAORepeatOffset`, `tAlpha`, `uAlphaRepeatOffset`, `tLightmap`, `uLightmapRepeatOffset`, `uLightmapIntensity`, `uTime`, `tNoise`, `tGoldMask`, `SHConstants`, `cameraPosition`, `uRoughness`, `uMetalness`, `uOcclusion`, `uAlpha`, `uEnvRotationX`, `uEnvRotationY`, `uMirrored`, `uDark`, `uColor`, `uEmissiveColor`, `uLightmapRgb`, `tBlueNoise`, `tBayerPattern`, `sampler3D`, `uLutStrength`, `tFluidSim`, `tFluidVelocity`, `tFluidColor`, `uFluidStrength`, `uBoundingRect`

### `vertex-14.glsl`

`projectionMatrix`, `modelViewMatrix`, `modelMatrix`, `viewMatrix`, `normalMatrix`, `cameraPosition`, `bindMatrix`, `bindMatrixInverse`, `sampler2D`

### `vertex-15.glsl`

`projectionMatrix`, `modelViewMatrix`, `modelMatrix`, `viewMatrix`, `normalMatrix`, `cameraPosition`, `uCenters`, `uScales`, `uScaleOffset`

### `misc-49.glsl`

`tMap`, `tDepth`, `uObjectMatrix`, `uProjectionInfo`, `uMapRepeatOffset`, `uBoundingBoxMin`, `uBoundingBoxMax`, `viewMatrix`, `modelMatrix`, `uRotation`, `uTime`, `uAlpha`

### `vertex-16.glsl`

`projectionMatrix`, `modelViewMatrix`, `viewMatrix`, `modelMatrix`, `uTime`

### `misc-50.glsl`

`uTime`

### `vertex-17.glsl`

`modelViewMatrix`, `projectionMatrix`, `uNoiseParams`, `uBounds`, `uSize`, `uTime`

### `depth.glsl`

`tDepth`, `uColor`, `cameraPosition`, `uCameraNearFar`, `uAlpha`, `uDebug`, `uTime`

### `vertex-18.glsl`

`uViewProjectionMatrix`, `modelMatrix`, `normalMatrix`, `projectionMatrix`, `viewMatrix`

### `misc-51.glsl`

`uTime`, `uDensity`, `uTintColor`, `uAlpha`

### `vertex-19.glsl`

`projectionMatrix`, `modelViewMatrix`, `uObjectMatrix`, `cameraPosition`, `uAngle`, `uPivotZ`

### `misc-52.glsl`

`tMap`

### `vertex-20.glsl`

`tMap`, `uResolution`, `uTransition`

### `misc-53.glsl`

`tMap`, `uDark`, `uAlpha`

### `vertex-21.glsl`

`projectionMatrix`, `modelViewMatrix`

### `misc-54.glsl`

`uColor`, `uResolution`, `uTime`, `uProgress`

### `misc-55.glsl`

`tMap`, `uAlpha`

### `vertex-22.glsl`

`projectionMatrix`, `modelViewMatrix`

### `misc-56.glsl`

`tBRDFLUT`, `tEnvSpecular`, `tAlbedo`, `uAlbedoRepeatOffset`, `uColorIntensity`, `tEmissive`, `uEmissiveRepeatOffset`, `uEmissiveIntensity`, `tNormal`, `uNormalRepeatOffset`, `tMR`, `uMRRepeatOffset`, `tAO`, `uAORepeatOffset`, `tAlpha`, `uAlphaRepeatOffset`, `tLightmap`, `uLightmapRepeatOffset`, `uLightmapIntensity`, `uTime`, `SHConstants`, `cameraPosition`, `uRoughness`, `uMetalness`, `uOcclusion`, `uAlpha`, `uEnvRotationX`, `uEnvRotationY`, `uMirrored`, `uDark`, `uColor`, `uEmissiveColor`, `uLightmapRgb`, `tFluidSim`, `tFluidVelocity`, `tFluidColor`, `uFluidStrength`

### `vertex-23.glsl`

`projectionMatrix`, `modelViewMatrix`, `modelMatrix`, `viewMatrix`, `normalMatrix`, `uCenters`, `cameraPosition`, `uTime`

### `misc-57.glsl`

`tMap`, `uTime`, `uHash`

### `vertex-24.glsl`

`projectionMatrix`, `modelViewMatrix`

### `misc-58.glsl`

`tMap`, `tNoise`, `cameraPosition`, `uTime`, `uHash`

### `vertex-25.glsl`

`projectionMatrix`, `modelViewMatrix`, `modelMatrix`, `viewMatrix`

### `misc-59.glsl`

`tMap`, `uDark`

### `vertex-26.glsl`

`projectionMatrix`, `modelViewMatrix`

### `misc-60.glsl`

`tImage`, `tImage2`, `tBlueNoise`, `uImageResolution`, `uImage2Resolution`, `uResolution`, `uHitUv`, `uImageScale`, `uDark`, `uAlpha`, `uAlphaImage2`, `uIsHit`

### `vertex-27.glsl`

`projectionMatrix`, `modelViewMatrix`, `uHitUv`

### `misc-61.glsl`

`tMap`, `uDark`

### `vertex-28.glsl`

`projectionMatrix`, `modelViewMatrix`

### `vertex-29.glsl`

`texelSize`

### `misc-62.glsl`

`uTexture`, `value`

### `misc-63.glsl`

`uTarget`, `tVelocity`, `aspectRatio`, `color`, `point`, `prevPoint`, `radius`, `uUseTexture`, `isDye`

### `misc-64.glsl`

`uVelocity`, `uSource`, `texelSize`, `dt`, `dissipation`

### `misc-65.glsl`

`uVelocity`

### `misc-66.glsl`

`uVelocity`

### `misc-67.glsl`

`uVelocity`, `uCurl`, `curl`, `dt`

### `misc-68.glsl`

`uSource`, `tMap`, `texelSize`, `diffusion`, `dt`

### `misc-69.glsl`

`uPressure`, `uDivergence`

### `misc-70.glsl`

`uPressure`, `uVelocity`

### `blur.glsl`

`tMap`, `uDirection`

### `vertex-30.glsl`

`uAspect`

### `misc-71.glsl`

`tMirror`, `tBRDFLUT`, `tEnvSpecular`, `tAlbedo`, `uAlbedoRepeatOffset`, `tEmissive`, `uEmissiveRepeatOffset`, `uEmissiveIntensity`, `tNormal`, `uNormalRepeatOffset`, `tMR`, `uMRRepeatOffset`, `tAO`, `uAORepeatOffset`, `tLightmap`, `uLightmapRgb`, `uLightmapMix`, `tLightmap2`, `uLightmap2Rgb`, `uLightmap2Mix`, `tLightmap3`, `uLightmap3Rgb`, `uLightmap3Mix`, `tLightmap4`, `uLightmap4Rgb`, `uLightmap4Mix`, `tLightmap5`, `uLightmap5Rgb`, `uLightmap5Mix`, `tLightmap6`, `uLightmap6Rgb`, `uLightmap6Mix`, `tLightmap7`, `uLightmap7Rgb`, `uLightmap7Mix`, `uLightmapsMix`, `uTime`, `uLightmapIntensity`, `SHConstants`, `cameraPosition`, `uNormalStrength`, `uRoughness`, `uMetalness`, `uOcclusion`, `uAlpha`, `uEnvRotationX`, `uEnvRotationY`, `uDark`, `uColor`

### `vertex-31.glsl`

`projectionMatrix`, `modelViewMatrix`, `modelMatrix`, `viewMatrix`, `cameraPosition`
