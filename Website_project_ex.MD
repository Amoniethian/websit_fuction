# Website Project — Experience & Lessons Learned

## Self-Test Summary (Memorial Page Implementation)

### Issues Found & Fixed

#### 1. z-index Collision — Bilingual Toggle vs Transition Overlays
- **Problem**: The `cn-toggle` button (z-index: 9999) and the black/blue screen transition overlays (z-index: 9999) had the same z-index. The toggle button appeared on top of the BSOD transition, breaking immersion.
- **Fix**: Increased transition overlay z-index to 99999.
- **Lesson**: When using fixed-position overlays meant to cover the entire screen, always ensure their z-index is strictly higher than all other fixed elements on the page.

#### 2. Inline `style="display:none"` Overriding CSS Class Toggle
- **Problem**: Chinese section titles (`<h2 class="section-title cn" style="display:none;">`) had inline `display:none` which has higher specificity than the CSS rule `body.show-cn .cn { display: block; }`. The bilingual toggle never showed these elements.
- **Fix**: Removed inline `style="display:none;"` from the `.cn` elements, relying solely on the CSS class rule.
- **Lesson**: Never use inline styles for visibility on elements controlled by CSS class toggles. Inline styles always win specificity battles unless `!important` is used.

#### 3. Duplicate `display:none` in Badge Inline Style
- **Problem**: The new-message badge span had `display:none` written twice in its inline style, with `align-items:center;justify-content:center` sandwiched between. Confusing and redundant.
- **Fix**: Removed the duplicate `display:none`.
- **Lesson**: When writing long inline styles, review for duplicates. Better yet, move complex styles to a CSS class.

#### 4. Auto-Play Click Listener Conflicting with Audio Control Button
- **Problem**: Two document-level `click` listeners for auto-playing music could conflict with the audio control button's own `onclick="toggleAudio()"`. Clicking the audio button would fire both the button handler and the document listener, causing a double-toggle (music starts then immediately stops).
- **Fix**: Consolidated into a single `{ once: true }` listener that skips clicks on the audio control button via `e.target.closest('#audio-control')`.
- **Lesson**: When using document-level click listeners alongside specific button handlers, always check the event target to avoid double-firing.

#### 5. Flat Symbol (♭) Used as a Music Note
- **Problem**: The 5th music note in the puzzle used `♭` (flat accidental), which is a modifier symbol, not a note. Musically literate players would find this inconsistent.
- **Fix**: Replaced with `&#119070;` (musical symbol double sharp / note head).
- **Lesson**: When using musical symbols, verify they are semantically correct for their context.

### Architecture Notes

- **Cross-page state**: Use `localStorage` for passing state between pages (e.g., `memorial_secret_unlocked` flag). Always clean up the flag after reading to avoid stale state.
- **Web Audio API for music**: Synthesizing melodies directly avoids external file dependencies and licensing concerns. Public domain melodies (Amazing Grace, etc.) can be freely synthesized.
- **Relative paths in static sites**: Always verify `../` paths from the actual page location, not the project root. `news/ → ../memorial/` and `memorial/ → ../blog/` must be tested.
- **Narrative consistency**: When adding new pages to a multi-page story, cross-check all dates, names, locations, and facts against existing content. A single contradicting date breaks immersion.
