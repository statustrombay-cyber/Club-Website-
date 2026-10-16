/** Optional real-browser audit: run the preview first, then this script.
 * npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
 * node tools/test-motion-browser.mjs
 * MT_BASE_URL, CHROME_EXECUTABLE_PATH and MT_SCREENSHOT_DIR are optional.
 * Tests rendered canvas pixels, not just DOM state/loaded filenames.
 */
import { chromium } from "playwright-core";
import c from "@sparticuz/chromium";
import assert from "node:assert/strict";
import fs from "node:fs";
const BASE = process.env.MT_BASE_URL || "http://localhost:4173";
const OUT = process.env.MT_SCREENSHOT_DIR;
if (OUT) fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({
  executablePath:
    process.env.CHROME_EXECUTABLE_PATH || (await c.executablePath()),
  args: c.args.filter((a) => a !== "--single-process"),
});
const log = [];
let checks = 0;
const ok = (v, m) => {
  assert.ok(v, m);
  checks++;
  console.log("PASS", m);
};
try {
  for (const width of [390, 1440])
    for (const mode of [
      "normal",
      "404",
      "corrupt",
      "held",
      "wrong-size",
      "no-observer",
    ]) {
      const p = await b.newPage({
        viewport: { width, height: 950 },
        reducedMotion: "no-preference",
      });
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      let release;
      const hold = new Promise((r) => (release = r));
      if (mode === "no-observer")
        await p.addInitScript(() => {
          delete window.IntersectionObserver;
        });
      if (["404", "corrupt", "held", "wrong-size"].includes(mode))
        await p.route("**/wire-*-atlas.webp*", async (route) => {
          if (mode === "held") await hold;
          await route
            .fulfill({
              status: mode === "404" ? 404 : 200,
              contentType: "image/webp",
              body:
                mode === "wrong-size"
                  ? fs.readFileSync(
                      new URL("../assets/img/favicon-48.png", import.meta.url),
                    )
                  : "invalid",
            })
            .catch(() => {});
        });
      await p.goto(BASE + "/#top", { waitUntil: "domcontentloaded" });
      await p.evaluate(() => {
        window.dispatchEvent(new Event("wheel"));
        const e = document.querySelector(".brand-chapter");
        scrollTo({
          top: e.offsetTop + e.offsetHeight - innerHeight - 70,
          behavior: "instant",
        });
      });
      await p.waitForFunction(() =>
        [...document.querySelectorAll("[data-wire-object]")].every(
          (e) =>
            e.classList.contains("wire-painted") &&
            !e.classList.contains("wire-paused"),
        ),
      );
      const sets = [new Set(), new Set(), new Set()];
      for (let j = 0; j < 7; j++) {
        const images = await p
          .locator("[data-wire-object] canvas")
          .evaluateAll((es) =>
            es.map((e) => {
              const a = e
                .getContext("2d")
                .getImageData(0, 0, e.width, e.height).data;
              let h = 2166136261;
              for (let i = 3; i < a.length; i += 4)
                h = Math.imul(h ^ a[i], 16777619);
              return String(h);
            }),
          );
        images.forEach((v, i) => sets[i].add(v));
        await p.waitForTimeout(180);
      }
      sets.forEach((s, i) =>
        ok(
          s.size >= 5,
          `${width} ${mode}: wire ${i + 1} has ${s.size} distinct canvas images`,
        ),
      );
      if (OUT && (mode === "normal" || mode === "corrupt"))
        await p.screenshot({ path: `${OUT}/wires-${width}-${mode}.png` });
      await p.emulateMedia({ reducedMotion: "reduce" });
      await p.waitForFunction(() =>
        [...document.querySelectorAll("[data-wire-object]")].every(
          (e) => e.dataset.wireState === "still",
        ),
      );
      ok(
        await p
          .locator("[data-wire-object]")
          .evaluateAll((es) =>
            es.every((e) => e.dataset.wireState === "still"),
          ),
        `${width} ${mode}: reduced motion remains supported`,
      );
      release();
      ok(
        !errors.length,
        `${width} ${mode}: no JavaScript exceptions: ${errors}`,
      );
      await p.close();
    }
  for (const width of [320, 390, 768, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: 950 },
      reducedMotion: "no-preference",
    });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(BASE + "/#top", { waitUntil: "domcontentloaded" });
    await p.evaluate(() => {
      window.dispatchEvent(new Event("wheel"));
    });
    const heights = [];
    for (let r = 0; r < 3; r++) {
      await p.evaluate(() => dispatchEvent(new Event("resize")));
      await p.waitForTimeout(50);
      heights.push(
        await p.locator(".psyche-cards").evaluate((e) => e.offsetHeight),
      );
    }
    ok(
      new Set(heights).size === 1,
      `${width}: repeated resize never grows the deck`,
    );
    const samples = [];
    for (const progress of [0.05, 0.36, 0.64, 0.93, 0.64, 0.36, 0.05]) {
      await p.locator(".psyche-deck").evaluate((e, t) => {
        const top = innerWidth <= 1100 ? 68 : 84;
        scrollTo({
          top:
            e.getBoundingClientRect().top +
            scrollY -
            top +
            t * (e.offsetHeight - (innerHeight - top)),
          behavior: "instant",
        });
      }, progress);
      await p.waitForTimeout(100);
      const states = await p
        .locator(".psyche-card")
        .evaluateAll((es) =>
          es.map((e) => ({
            state: e.dataset.deckState,
            transform: e.style.transform,
            opacity: e.style.opacity,
            box: e.getBoundingClientRect().toJSON(),
          })),
        );
      samples.push(states);
      if (OUT && (progress === 0.05 || progress === 0.36))
        await p.screenshot({ path: `${OUT}/deck-${width}-${progress}.png` });
    }
    ok(
      samples[0].every((s) => s.state === "stacked"),
      `${width}: all cards pop into the deck`,
    );
    ok(
      samples[1][0].state === "thrown" && samples[1][1].state === "stacked",
      `${width}: Notice leaves first`,
    );
    ok(
      samples[2][1].state === "thrown" && samples[2][2].state === "stacked",
      `${width}: Connect leaves second`,
    );
    ok(
      samples[3].every((s) => s.state === "thrown"),
      `${width}: Grow leaves last`,
    );
    ok(
      samples[6].every((s) => s.state === "stacked"),
      `${width}: reverse scrolling restores the deck`,
    );
    ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `${width}: no horizontal overflow`,
    );
    await p.emulateMedia({ reducedMotion: "reduce" });
    await p.waitForTimeout(100);
    ok(
      !(await p
        .locator(".psyche-deck")
        .evaluate((e) => e.classList.contains("deck-ready"))),
      `${width}: reduced motion returns three readable static tiles`,
    );
    ok(
      await p
        .locator(".psyche-card")
        .evaluateAll((es) => es.every((e) => !e.inert && !e.style.opacity)),
      `${width}: no hidden/inert cards in static mode`,
    );
    ok(!errors.length, `${width}: no deck errors ${errors}`);
    await p.close();
  }
  console.log("TOTAL", checks);
} finally {
  await b.close();
}
