# Website Project Experience Log

## Project Overview
Escape room web component — four fake websites (News, Blog, Wiki, Memorial) serving as game props for an interactive mystery.

## Key Learnings

### 1. Character Name Consistency is Critical
- **Issue**: When renaming characters (e.g., Emil → Chode), references can hide in section titles, ID attributes, pronoun references ("E" → "C"), and Chinese translation paragraphs.
- **Fix**: Always use global grep after rename to catch ALL occurrences. Check: IDs, section headers, abbreviation references (single letters), and bilingual content.
- **Lesson**: Use `replace_all` for the name itself, then targeted grep for abbreviations and pronouns.

### 2. Characterization Must Be Consistent Across All Four Sites
- **Issue**: When Lucio's characterization changed from "mediocre rich kid" to "hardworking Mozart-type," the news article still said "avoided large public performances" and wiki still called his work "advanced amateur."
- **Fix**: After any character personality change, grep ALL config files for contradicting descriptions.
- **Checklist**:
  - `news/config.js` — obituary + sidebar + memorial link
  - `wiki/config.js` — public entries, ALL 4 tiers
  - `blog/config.js` — posts, comments, DM history
  - `memorial/index.html` — obituary, eulogy (inline content, no config.js)

### 3. Draft Will Letter Reference
- **Issue**: The will used "E" (for Emil). When renamed to Chode, "E" → "C" was easy to miss in:
  - The actual will text
  - The analysis paragraph referencing the letter
  - The section title ("The 'E' in Lucio's Will")
  - Chinese translation
- **Lesson**: Single-letter references are the easiest to miss in renames.

### 4. Video Integration Best Practices
- **Format**: MP4 is the most universally compatible. Include WebM and OGG as fallbacks via `<source>` tags.
- **Loading**: Use `preload="metadata"` on initial load (saves bandwidth), then call `video.load()` after password unlock for fastest playback.
- **Password system**: Keep password in config.js (`videoPassword` field) for easy updating. Comparison is client-side (acceptable for game prop, not for real security).

### 5. Comment Like Button
- **Issue**: Comment like buttons were rendered as static text with no onclick handler.
- **Fix**: Added `toggleCommentLike(btn, originalLikes)` function with heart toggle animation (🤍 ↔ ❤).
- **Lesson**: When rendering dynamic HTML from config data, always verify interactive elements have event handlers attached.

### 6. Blog Character Tone Evolution
- **V1**: Explicit rich kid flexing (too vulgar/on-the-nose)
- **V2**: Old money quiet luxury (better — wealth is "just normal" to him)
- **V3**: Mozart-type hardworking prodigy who happens to be wealthy
- **Lesson**: Character tone should match the narrative role. Lucio isn't just "rich kid" — he's genuinely talented but overshadowed by Chode's transcendent genius.

### 7. Bilingual System Architecture
- `.cn` class hidden by default (`display: none`)
- Toggle via `body.show-cn .cn { display: block }`
- URL parameter `?cn=1` for team preview
- Floating toggle button on each page
- **Lesson**: Chinese must be added to EVERY new content addition (posts, comments, video labels, etc.)

### 8. Static Deployment (Netlify)
- Pure HTML/CSS/JS, no build step
- All data in `config.js` files — no backend needed
- `sessionStorage` for wiki password state (resets on tab close — good for escape room replay)
- Video files referenced but not included in repo — must be uploaded separately to deployment

### 9. z-index Collision — Bilingual Toggle vs Transition Overlays
- **Issue**: The `cn-toggle` button (z-index: 9999) and the memorial page's black/blue screen transition overlays (z-index: 9999) shared the same z-index. The toggle appeared on top of the BSOD transition, breaking immersion.
- **Fix**: Increased transition overlay z-index to 99999.
- **Lesson**: When using fixed-position overlays meant to cover the entire screen, always ensure their z-index is strictly higher than all other fixed elements.

### 10. Inline `style="display:none"` Overriding CSS Class Toggle
- **Issue**: Chinese section titles (`<h2 class="cn" style="display:none;">`) had inline `display:none` which has higher specificity than `body.show-cn .cn { display: block; }`. The bilingual toggle never showed these elements.
- **Fix**: Removed inline `style="display:none;"`, relying solely on the CSS class rule.
- **Lesson**: Never use inline styles for visibility on elements controlled by CSS class toggles. Inline styles always win specificity battles unless `!important` is used.

### 11. Auto-Play Click Listener Conflicting with Button Handler
- **Issue**: Document-level `click` listeners for auto-playing music conflicted with the audio control button's own `onclick="toggleAudio()"`. Clicking the button fired both handlers, causing a double-toggle (music starts then immediately stops).
- **Fix**: Consolidated into a single `{ once: true }` listener that skips clicks on the audio control via `e.target.closest('#audio-control')`.
- **Lesson**: When using document-level click listeners alongside specific button handlers, always check the event target to avoid double-firing.

### 12. Cross-Page State via localStorage
- **Issue**: The memorial page's secret puzzle needs to trigger a notification on the blog page (different HTML file).
- **Fix**: Use `localStorage.setItem('memorial_secret_unlocked', 'true')` on puzzle completion, check on blog load, and `removeItem` after reading.
- **Lesson**: Always clean up localStorage flags after reading to avoid stale state on revisit. For escape-room-style one-time triggers, delete the key immediately after use.

### 13. Web Audio API for Background Music
- **Issue**: Need to play Amazing Grace continuously without hosting audio files or licensing concerns.
- **Fix**: Synthesize the melody directly via Web Audio API using oscillators with sine wave + gentle envelope. Amazing Grace is public domain (CC0).
- **Lesson**: For simple melodies, Web Audio API synthesis is more reliable than external audio files — no CORS issues, no hosting, no 404s. Good for game props.

### 14. Music Symbol Semantics
- **Issue**: Used `♭` (flat accidental) as a music "note" in the puzzle. It's a modifier symbol, not a note — musically literate players would notice.
- **Fix**: Replaced with proper note head symbol `&#119070;`.
- **Lesson**: Verify musical/technical symbols are semantically correct for their context.

## File Structure
```
websit_fuction/
├── index.html              # Dev portal (not player-facing)
├── Website_project_ex.MD   # This file — project experience log
├── assets/
│   └── videos/             # Video placeholder directory
│       └── first_meet.mp4  # [TO BE ADDED BY USER]
├── news/
│   ├── config.js           # Obituary article, sidebar clues, memorial link
│   ├── index.html          # BBC-style English UI
│   └── style.css           # BBC red accent, serif typography
├── blog/
│   ├── config.js           # Posts, comments, DM system (LCC T1004 address)
│   ├── index.html          # Blog renderer + chat + new-msg badge
│   └── style.css           # Coral/teal youth aesthetic
├── memorial/
│   ├── index.html          # Memorial hall: portrait, obituary, eulogy,
│   │                       #   flower offering, music notes puzzle,
│   │                       #   Amazing Grace synth, BSOD transition
│   └── style.css           # Dark solemn theme, gold accents
└── wiki/
    ├── config.js           # 4-tier password content (test1-test4)
    ├── index.html          # Password system + dynamic rendering
    └── style.css           # Dark conspiracy fan-wiki theme
```

## Character Quick Reference
| Character | Role | Personality | Blog Handle |
|-----------|------|-------------|-------------|
| **Lucio** | Rich pianist (fake genius) | Mozart-like: hardworking, diligent, famous, praised by VIPs. Can't match "dream" compositions. | `code` |
| **Chode** | Blind ghostwriter (true genius) | Gentle, mild, poor, no family. Captive for ~20 years. | N/A (hidden) |
| **Heinrich Hoffmann** | Father / antagonist | Obsessive, controlling, projects own failed ambitions onto son. | N/A |

## Cross-Page Flow
```
News article (obituary)
  └─→ "Click here for online memorial" link
        └─→ Memorial page (flowers, music, puzzle)
              └─→ [5 notes correct] → Black screen → BSOD → auto-redirect
                    └─→ Blog page (new message "1" badge on DM button)
                          └─→ Open chat → DM history includes LCC tower T1004 address
```

## Pending / Future
- [ ] Add actual `first_meet.mp4` video file to `assets/videos/`
- [ ] Replace placeholder passwords (test1-test4, 1234) with real game passwords
- [ ] Deploy to Netlify
- [ ] Wiki comment/discussion section for conspiracy theories (mentioned but not yet implemented)
- [ ] Replace memorial portrait placeholder with actual character image
