
precision highp float;
precision highp sampler2D;
in vec2 vUv;
uniform sampler2D uTarget;
uniform sampler2D tVelocity;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform vec2 prevPoint;
uniform float radius;
uniform float uUseTexture;
uniform float isDye;

out vec4 FragColor;

// Screen blend function: blends two colors using the screen blending mode
vec3 screenBlend(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

void main () {

	if(uUseTexture > 0.5) {
		vec3 base = texture(uTarget, vUv).xyz;
		vec3 splat = texture(tVelocity, vUv).xyz;
		splat = isDye > 0.5 ? vec3(dot(splat, splat)) : splat;
		FragColor = vec4(splat + base, 1.0);
	} else {
		vec2 p = vUv - point.xy;
		p.x *= aspectRatio;
		vec3 splat = smoothstep(radius, 0.0, sdSegment(vUv, prevPoint, point)) * color;
		vec3 base = texture(uTarget, vUv).xyz;
		FragColor = vec4(splat + base, 1.0);
	}

}
