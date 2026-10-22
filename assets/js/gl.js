/* A small WebGL2 layer: programs, meshes, instancing, render targets.
   No dependencies, no framework — everything the site draws goes through here. */

export function createContext(canvas) {
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: true,
    stencil: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
  });
  if (!gl) throw new Error('webgl2');
  gl.getExtension('EXT_color_buffer_float');
  gl.getExtension('OES_texture_float_linear');
  return gl;
}

function compile(gl, type, src, label) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    throw new Error(`${label}: ${log}`);
  }
  return sh;
}

export function program(gl, vsSrc, fsSrc, label = 'program') {
  const p = gl.createProgram();
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vsSrc, label + ' vs'));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fsSrc, label + ' fs'));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(`${label}: ${gl.getProgramInfoLog(p)}`);
  }
  const uniforms = new Map();
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < n; i++) {
    const info = gl.getActiveUniform(p, i);
    uniforms.set(info.name.replace(/\[0\]$/, ''), gl.getUniformLocation(p, info.name));
  }
  return {
    handle: p,
    use() { gl.useProgram(p); return this; },
    u(name) { return uniforms.get(name) ?? null; },
    has(name) { return uniforms.has(name); },
    f(name, v) { const l = uniforms.get(name); if (l) gl.uniform1f(l, v); return this; },
    i(name, v) { const l = uniforms.get(name); if (l) gl.uniform1i(l, v); return this; },
    v2(name, a, b) { const l = uniforms.get(name); if (l) gl.uniform2f(l, a, b); return this; },
    v3(name, a) { const l = uniforms.get(name); if (l) gl.uniform3f(l, a[0], a[1], a[2]); return this; },
    v3f(name, a, b, c) { const l = uniforms.get(name); if (l) gl.uniform3f(l, a, b, c); return this; },
    v4(name, a) { const l = uniforms.get(name); if (l) gl.uniform4f(l, a[0], a[1], a[2], a[3]); return this; },
    m4(name, m) { const l = uniforms.get(name); if (l) gl.uniformMatrix4fv(l, false, m); return this; },
    m3(name, m) { const l = uniforms.get(name); if (l) gl.uniformMatrix3fv(l, false, m); return this; },
    tex(name, unit, texture, target = gl.TEXTURE_2D) {
      const l = uniforms.get(name);
      if (l) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(target, texture); gl.uniform1i(l, unit); }
      return this;
    },
  };
}

/* geometry: { position: Float32Array, normal: Float32Array, uv: Float32Array, index: Uint32Array } */
export function mesh(gl, geo) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buffers = [];
  const attach = (data, loc, size) => {
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    buffers.push(b);
  };
  attach(geo.position, 0, 3);
  attach(geo.normal, 1, 3);
  attach(geo.uv || new Float32Array((geo.position.length / 3) * 2), 2, 2);
  const ib = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.index, gl.STATIC_DRAW);
  gl.bindVertexArray(null);
  return {
    vao, indexCount: geo.index.length,
    buffers: buffers.concat(ib),
    /* per-instance transform: vec3 position, float rotation, float scale */
    instance(data) {
      gl.bindVertexArray(vao);
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(3);
      gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 20, 0);
      gl.vertexAttribDivisor(3, 1);
      gl.enableVertexAttribArray(4);
      gl.vertexAttribPointer(4, 2, gl.FLOAT, false, 20, 12);
      gl.vertexAttribDivisor(4, 1);
      gl.bindVertexArray(null);
      buffers.push(b);
      return data.length / 5;
    },
  };
}

export function draw(gl, m) {
  gl.bindVertexArray(m.vao);
  gl.drawElements(gl.TRIANGLES, m.indexCount, gl.UNSIGNED_INT, 0);
}

export function drawInstanced(gl, m, count) {
  gl.bindVertexArray(m.vao);
  gl.drawElementsInstanced(gl.TRIANGLES, m.indexCount, gl.UNSIGNED_INT, 0, count);
}

export function quad(gl) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  return vao;
}

export function colorTarget(gl, w, h, { float = true, filter = 'linear' } = {}) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  const internal = float ? gl.RGBA16F : gl.RGBA8;
  gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, gl.RGBA, float ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
  const f = filter === 'linear' ? gl.LINEAR : gl.NEAREST;
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, f);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, f);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  return { tex, fb, w, h };
}

export function resizeTarget(gl, target, w, h) {
  if (target.w === w && target.h === h) return target;
  const float = target.float !== false;
  gl.bindTexture(gl.TEXTURE_2D, target.tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, float ? gl.RGBA16F : gl.RGBA8, w, h, 0, gl.RGBA, float ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
  target.w = w; target.h = h;
  return target;
}

export function depthTarget(gl, w, h) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, w, h, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, tex, 0);
  gl.drawBuffers([gl.NONE]);
  gl.readBuffer(gl.NONE);
  return { tex, fb, w, h };
}
