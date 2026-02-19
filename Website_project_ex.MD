# Website Project Experience Log

## Project Overview
Escape room web component — three fake websites (News, Blog, Wiki) serving as game props for an interactive mystery.

## Key Learnings

### 1. Character Name Consistency is Critical
- **Issue**: When renaming characters (e.g., Emil → Chode), references can hide in section titles, ID attributes, pronoun references ("E" → "C"), and Chinese translation paragraphs.
- **Fix**: Always use global grep after rename to catch ALL occurrences. Check: IDs, section headers, abbreviation references (single letters), and bilingual content.
- **Lesson**: Use `replace_all` for the name itself, then targeted grep for abbreviations and pronouns.

### 2. Characterization Must Be Consistent Across All Three Sites
- **Issue**: When Lucio's characterization changed from "mediocre rich kid" to "hardworking Mozart-type," the news article still said "avoided large public performances" and wiki still called his work "advanced amateur."
- **Fix**: After any character personality change, grep ALL config files for contradicting descriptions.
- **Checklist**:
  - `news/config.js` — obituary + sidebar
  - `wiki/config.js` — public entries, ALL 4 tiers
  - `blog/config.js` — posts, comments, DM history

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

## File Structure
```
websit_fuction/
├── index.html              # Dev portal (not player-facing)
├── assets/
│   └── videos/             # Video placeholder directory
│       └── first_meet.mp4  # [TO BE ADDED BY USER]
├── news/
│   ├── config.js           # Obituary article, sidebar clues
│   ├── index.html          # BBC-style English UI
│   └── style.css           # BBC red accent, serif typography
├── blog/
│   ├── config.js           # Posts, comments, DM system, encrypted video
│   ├── index.html          # Blog renderer + chat + video unlock
│   └── style.css           # Coral/teal youth aesthetic
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

## Pending / Future
- [ ] Add actual `first_meet.mp4` video file to `assets/videos/`
- [ ] Replace placeholder passwords (test1-test4, 1234) with real game passwords
- [ ] Deploy to Netlify
- [ ] Wiki comment/discussion section for conspiracy theories (mentioned but not yet implemented)
