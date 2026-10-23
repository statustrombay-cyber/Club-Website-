

precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform vec3 uBaseColor;

uniform sampler2D tLayer1;
uniform float tLayer1Alpha;

uniform sampler2D tLayer2;
uniform float tLayer2Alpha;

uniform sampler2D tLayer3;
uniform float tLayer3Alpha;

uniform sampler2D tLayer4;
uniform float tLayer4Alpha;

uniform sampler2D tLayer5;
uniform float tLayer5Alpha;

uniform sampler2D tLayer6;
uniform float tLayer6Alpha;

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

vec4 LinearToSRGB( in vec4 value ) {
	return vec4( pow( value.rgb, 1.0 / vec3( 2.2 ) ), value.a );
}

void main() {

	vec2 uvScreen = gl_FragCoord.xy / uResolution;
	float aspect = uResolution.x / uResolution.y;

	vec4 color = vec4(uBaseColor, 1.);
	vec4 nextColor;
	float opacity;

	vec2 uv = vUv;

	#ifdef LAYER_1

	nextColor = texture2D(tLayer1, uv);
	color.rgb = mix(color.rgb, nextColor.rgb, nextColor.a * tLayer1Alpha);

	#endif

	#ifdef LAYER_2

	nextColor = texture2D(tLayer2, uv);
	color.rgb = mix(color.rgb, nextColor.rgb, nextColor.a * tLayer2Alpha);

	#endif

	#ifdef LAYER_3

	nextColor = texture2D(tLayer3, uv);
	color.rgb = mix(color.rgb, nextColor.rgb, nextColor.a * tLayer3Alpha);

	#endif

	#ifdef LAYER_4

	nextColor = texture2D(tLayer4, uv);
	color.rgb = mix(color.rgb, nextColor.rgb, nextColor.a * tLayer4Alpha);

	#endif

	#ifdef LAYER_5

	nextColor = texture2D(tLayer5, uv);
	color.rgb = mix(color.rgb, nextColor.rgb, nextColor.a * tLayer5Alpha);

	#endif

	#ifdef LAYER_6

	nextColor = texture2D(tLayer6, uv);
	color.rgb = mix(color.rgb, nextColor.rgb, nextColor.a * tLayer6Alpha);

	#endif

	gl_FragColor = color;
}
