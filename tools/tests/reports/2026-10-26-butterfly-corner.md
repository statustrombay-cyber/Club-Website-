# Isolated butterfly corner departure — 2026-10-26

The brand band's body-level CSS was setting the butterfly's opacity to zero and visibility to hidden before its JS departure could be seen. Removed the butterfly from that immediate-hide rule; the header and floating page control still hide. Departure now banks into the viewport, flaps through a 4.2-second curve, and only hides once fully beyond the upper-left corner. Reverse scrolling steers back from the current pose. Existing immersive WebGL hiding remains unchanged.

Verification: 771 unit/integration checks passed, lint passed, browser butterfly-navigation passed, new butterfly-dark-exit regression passed at 390 and 1440px. It checks opacity/visibility and on-screen geometry 1.4 seconds into departure, off-screen geometry before hiding, and return. Chromium touch emulation is not physical-phone testing.

Tests now isolate the expired checked-in sample registration deadline in the virtual PHP test store; the live site's event deadline is NOT changed. The browser field test uses the always-available membership form instead of relying on an event remaining open.

This commit is the rollback baseline before the requested flower/TV-head remodel. It is kept separate for independent application to main by a maintainer. This session cannot modify main or merge PR #5.
