/* The film pass: render to a float target, bloom the highlights in two
   directions, then tone-map, grade, vignette and grain in one composite. */

import { program, quad, colorTarget, resizeTarget } from './gl.js';
import { brightFS, blurFS, compFS } from './shaders.js';

export function createPost(gl, width, height, { hdr = true } = {}) {
  const vao = quad(gl);
  const bright = program(gl, `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`, brightFS, 'bright');
  const blur = program(gl, `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`, blurFS, 'blur');
  const comp = program(gl, `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`, compFS, 'comp');

  let scene = colorTarget(gl, width, height, { float: hdr });
  scene.float = hdr;
  let brightT = colorTarget(gl, Math.max(2, width >> 1), Math.max(2, height >> 1), { float: hdr });
  brightT.float = hdr;
  let blurA = colorTarget(gl, Math.max(2, width >> 1), Math.max(2, height >> 1), { float: hdr });
  blurA.float = hdr;
  let blurB = colorTarget(gl, Math.max(2, width >> 2), Math.max(2, height >> 2), { float: hdr });
  blurB.float = hdr;
  let depth = null;

  function attachDepth(w, h) {
    if (depth && depth.w === w && depth.h === h) return;
    if (depth) { gl.deleteFramebuffer(depth.fb); gl.deleteTexture(depth.tex); }
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, w, h, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, scene.fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    depth = { tex, w, h, fb: null };
  }

  attachDepth(width, height);

  return {
    get scene() { return scene; },
    get depthTexture() { return depth && depth.tex; },
    resize(w, h) {
      resizeTarget(gl, scene, w, h);
      resizeTarget(gl, brightT, Math.max(2, w >> 1), Math.max(2, h >> 1));
      resizeTarget(gl, blurA, Math.max(2, w >> 1), Math.max(2, h >> 1));
      resizeTarget(gl, blurB, Math.max(2, w >> 2), Math.max(2, h >> 2));
      attachDepth(w, h);
    },
    begin() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, scene.fb);
      gl.viewport(0, 0, scene.w, scene.h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    },
    end(w, h, opts = {}) {
      const {
        exposure = 1, bloomStrength = 0.5, fade = 1, grain = 0.05, time = 0,
        threshold = 0.85, knee = 0.35, vignette = 0.5,
      } = opts;
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.BLEND);
      gl.bindVertexArray(vao);

      // bright pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, brightT.fb);
      gl.viewport(0, 0, brightT.w, brightT.h);
      bright.use().tex('uScene', 0, scene.tex).f('uThreshold', threshold).f('uKnee', knee);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // blur: two levels, four passes
      const pass = (src, dst, dx, dy) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fb);
        gl.viewport(0, 0, dst.w, dst.h);
        blur.use().tex('uTex', 0, src.tex);
        const l = blur.u('uDir');
        if (l) gl.uniform2f(l, dx / dst.w, dy / dst.h);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      pass(brightT, blurA, 1, 0);
      pass(blurA, brightT, 0, 1);
      pass(brightT, blurB, 1.4, 0);
      pass(blurB, brightT, 0, 1.4);

      // composite to the canvas
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, w, h);
      comp.use()
        .tex('uScene', 0, scene.tex)
        .tex('uBloom', 1, brightT.tex)
        .f('uExposure', exposure)
        .f('uBloomStrength', bloomStrength)
        .f('uFade', fade)
        .f('uGrain', grain)
        .f('uVignette', vignette)
        .f('uTime', time)
        .v2('uRes', w, h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
