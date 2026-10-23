
				precision highp float;

				uniform sampler2D tMap;
				in vec2 vUv;

				out vec4 FragColor;

				void main() {
					vec4 col = texture(tMap, vUv);
					if(col.w <= 0.0) discard;
					FragColor = col;
				}
