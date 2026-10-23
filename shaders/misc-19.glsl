
                precision highp float;

                const float PI = 3.14159265359;

                in vec2 vUv;

                out vec4 FragColor;

                float RadicalInverse_VdK(uint bits) {
                    bits = (bits << 16u) | (bits >> 16u);
                    bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
                    bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
                    bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
                    bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
                    return float(bits) * 2.3283064365386963e-10;
                }

                vec2 Hammersley(uint i, uint N) {
                    return vec2(float(i) / float(N), RadicalInverse_VdK(i));
                }

                vec3 ImportanceSampleGGX(vec2 Xi, float roughness, vec3 N) {
                    float a = roughness * roughness; // α = perceptual roughness squared

                    float phi = 2.0 * PI * Xi.x;
                    float cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a*a - 1.0) * Xi.y));
                    float sinTheta = sqrt(1.0 - cosTheta * cosTheta);

                    vec3 H;
                    H.x = cos(phi) * sinTheta;
                    H.y = sin(phi) * sinTheta;
                    H.z = cosTheta;

                    // Tangent-space to world-space
                    vec3 up    = abs(N.z) < 0.999 ? vec3(0,0,1) : vec3(1,0,0);
                    vec3 tan   = normalize(cross(up, N));
                    vec3 bitan = cross(N, tan);

                    return normalize(tan * H.x + bitan * H.y + N * H.z);
                }

                float GeometrySchlickGGX(float NdotV, float roughness) {
                    // Note: remap for IBL — different k than direct lighting
                    float a = roughness;
                    float k = (a * a) / 2.0;
                    return NdotV / (NdotV * (1.0 - k) + k);
                }

                float GSmith(float roughness, float NdotV, float NdotL) {
                    return GeometrySchlickGGX(NdotV, roughness)
                         * GeometrySchlickGGX(NdotL, roughness);
                }

                void main() {
                    vec2 uv = vUv;
                    float NdotV = uv.x;
                    float roughness = uv.y;

                    // vec3 V = vec3(sqrt(1.0 - NdotV * NdotV), 0.0, NdotV);
                    vec3 V;
                    V.x = sqrt(1.0 - NdotV * NdotV); // sin
                    V.y = 0.0;
                    V.z = NdotV; // cos

                    vec3 N = vec3(0.0, 0.0, 1.0);

                    float A = 0.0;
                    float B = 0.0;

                    const uint SAMPLES = /* … */u;
                    for (uint i = 0u; i < SAMPLES; i++) {
                        vec2 Xi = Hammersley(i, SAMPLES);
                        vec3 H  = ImportanceSampleGGX(Xi, roughness, N);
                        vec3 L  = 2.0 * dot(V, H) * H - V;

                        float NdotL = max(L.z, 0.0);
                        float NdotH = max(H.z, 0.0);
                        float VdotH = max(dot(V, H), 0.0);

                        if (NdotL > 0.0) {
                            float G = GSmith(roughness, NdotV, NdotL);
                            float GVis = (G * VdotH) / max(NdotH * NdotV, 0.0001);
                            float Fc   = pow(1.0 - VdotH, 5.0);
                            A += (1.0 - Fc) * GVis;
                            B += Fc * GVis;
                        }
                    }

                    FragColor = vec4(vec2(A, B) / float(SAMPLES), 0.0, 1.0);
                }
