
precision mediump float;
precision mediump sampler2D;
in highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;

out vec4 FragColor;
void main () {
	FragColor = value * texture(uTexture, vUv);
}
