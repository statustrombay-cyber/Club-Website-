# Butterfly interaction and responsive navigation repair — 2026-10-23

Baseline: `f7c899c`. Work confined to `arena/24a1daf8-club-website`, PR #5; no merge or main-branch changes.

## Repairs

- Fixed mobile/tablet hamburger alignment at its cause: the native `details` wrapper's `display: contents` generated an extra flex item. A real 44px wrapper now sits at the right header edge through 1100px. Desktop retains the full navigation above that breakpoint. Opening animates the bars into a cross; closing reverses it. Escape restores focus; outside clicks and resizing to desktop close the menu. Native no-JavaScript disclosure remains usable.
- In-page action flights capture the actual click position once. Closing a menu, moving a button, or scrolling an anchor no longer changes that landing point. Focused fields intentionally retain live positioning, with the small photo on their left and typing/backspace flaps preserved. Plain page taps receive feedback without swallowing their native behavior. Splash and immersive/dark chapters are excluded, preserving the original entrance and chapter hiding.
- Added a labelled, keyboard-accessible grip confined to the scaled butterfly photo. Mouse/touch pointer capture supports dragging with flapping, preserves off-centre grabs, and does not scroll the page. Release returns along a continuous curve to the current header perch or retained active field. Pointer cancellation, lost capture, window blur, and Escape recover safely. The ended gesture's compatibility click is suppressed; a new pointer press immediately clears that suppression so the next real control tap is not lost.
- The full flight layer remains click-through. The grip cannot intercept controls during action flights/returns. Reduced motion allows direct manipulation without wing animation; printing hides the butterfly. Original slow entry, photo assets, scroll-follow, story, backend, loader and export rules remain unchanged.
- Native links, downloads, modifiers, new tabs and summary toggling are not held for animation; outgoing full-page navigation may finish before its decorative flight.

## Final verification

- `npm test`: **771 passed, 0 failed**.
- `npm run lint`: **PASS**.
- `git diff --check`: **PASS**.
- Actual Chromium browser suites, rerun together against the final runtime changes: **butterfly-navigation**, **first-page-flow**, **mobile-story-detail**, **site-audit**, **story-inputs** — all passed. No reported page errors.
- Navigation widths: **320, 360, 390, 768, 1024, 1100, 1101, 1280, 1440px**; right-edge alignment, desktop spacing, no horizontal overflow, cross animation, keyboard focus, breakpoint transitions, and 1024px no-JavaScript menu checked.
- Mouse at 1440px and CDP touch at 390px: three drag locations followed within 9px after 150ms; animated wing transforms changed during hold; no document scrolling; release returned within 2px of the original perch. Off-centre wing grabs, actual capture release, touch cancellation, desktop blur and keyboard movement/Escape checked.
- Moving-button fixture: click `(89,365)` remained the landing point after the button relocated; activated exactly once. Plain-page `(110,375)` feedback, native menu tap position, real registration field companion, typing/backspace, reduced motion, and print hiding checked.
- First-page regression taps the splash and confirms it does not prematurely start the butterfly arrival.
- Website-only Git archive: **150 files**, valid ZIP CRC, every payload byte-identical to the working website. Dev tooling, private data/config, and root reference uploads excluded; required story GLB models and all three horse videos retained.

Browser logs/screenshots are outside the repository in `/home/user/butterfly-review/`; no test fixtures or reference files were added to the deployed website. These are Chromium desktop and emulated-touch checks, not physical iPhone/Safari or hardware frame-rate guarantees.
