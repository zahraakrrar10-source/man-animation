# Reference Analysis Report — Expanded Archive

**Project:** `C:\MaxAnimation\cartoon-short`  
**Source:** `C:\MaxAnimation\cartoon-short\reference-previews\` (expanded reference archive)  
**Method:** File inventory, pixel statistics (luma/saturation/dark/bright fractions, colour bands), raw OCR, directory naming, video titles, and prior text reports. No image was visually inspected by this agent; every claim carries an evidence tag.

---

## Evidence Key

| Tag | Meaning |
|-----|---------|
| **[M]** | Measured quantity from file inventory/pixel statistics (numbers only, no visual judgement) |
| **[C]** | Computed from inventory.csv / inventory.json fields |
| **[T]** | Text-derived: from `STYLE_BIBLE.md`, `SKILL.md`, reports, OCR, or video titles |
| **[O]** | OCR text (machine transcription, often wrong) |
| **[R]** | Report's own hand-labelled observation from prior analysis (`REFERENCE_STYLE_AND_ENVIRONMENT_ANALYSIS.md`) |
| **[S]** | Suggestion, not present in references |


---

## 2. Updated Visual Style Bible

### 2.1 Core Style Constants [T][R]

| Element | Rule | Evidence |
|---------|------|----------|
| Line quality | World ink ~3 px at 1080p, near-constant with distance; absent on characters | [R] outlines.md |
| Proportions | Characters ~3.5 head height (3.5 HH), plum ink, deadpan face, dot hands | [R] characters.md |
| Facial design | Dot hands, deadpan expression; expressions change via mouth/eyes only | [R] characters.md |
| Shading | Two-tone world (lit/shade with terminator); painted flat surfaces, thin seams, no grain, no SSAO | [R] shade.md, grade.md |
| Colour palette | No pure black, no grey shadows, no pastel sky, no orange-soup golden | [R] grade.md |
| Sky logic | Pale horizon → deep saturated top; fog = horizon colour | [R] grade.md |
| Shadow logic | ~0.5× lit by day, violet replacement at sunset, light pools indoors | [R] grade.md |
| Camera grammar | Eye-level default, 0.79× height, symmetric glides, creeping holds, rare cuts | [R] motion.md |

### 2.2 Measured Palette Range [C][M]

Contact sheet colour bands (top/mid/bottom):

| Short | Top | Mid | Bottom | Luma | Sat |
|-------|-----|-----|--------|------|-----|
| short01 | #927e7b | #60517b | #384dc0 | 0.393 | 0.636 |
| short02 | #7d8ea6 | #896d5c | #755359 | 0.449 | 0.429 |
| short03 | #8e97a3 | #6e6675 | #7e954d | 0.491 | 0.442 |
| short04 | #7288a4 | #92726a | #534759 | 0.429 | 0.465 |
| short05 | #544962 | #5a5269 | #816b72 | 0.368 | 0.504 |
| short06 | #856955 | #605056 | #756e7b | 0.412 | 0.435 |
| short07 | #7f5c55 | #695a8d | #a27d88 | 0.404 | 0.512 |
| short08 | #ab9475 | #808996 | #615d72 | 0.512 | 0.431 |
| short09 | #8f9094 | #7f899b | #454586 | 0.516 | 0.431 |
| short10 | #766f90 | #7c7398 | #84796d | 0.547 | 0.434 |
| short11 | #7a6054 | #70606d | #947163 | 0.427 | 0.399 |
| short12 | #929190 | #926e6c | #86998a | 0.487 | 0.461 |
| short13 | #949198 | #9a826a | #ad8761 | 0.536 | 0.438 |
| short14 | #8e98a5 | #86735e | #997756 | 0.502 | 0.432 |
| short15 | #a18a8a | #99535c | #a04f49 | 0.433 | 0.504 |
| short16 | #6b5b62 | #8a6659 | #4e405c | 0.331 | 0.500 |
| short17 | #90664b | #946046 | #6e6461 | 0.419 | 0.590 |
| short18 | #9e8f7e | #636a74 | #c09175 | 0.541 | 0.411 |
| short19 | #9d998c | #c0a380 | #9a7866 | 0.594 | 0.363 |
| short20 | #3d3730 | #453e37 | #44302f | 0.252 | 0.476 |

**Reference frames extend extremes:** short01_0180 (luma 0.227, sat 0.754), short04_0060 (bright 0.364), short07_0060 (bright 0.299, sat 0.681), short08_0060 (dark 0.530), short08_0180 (luma 0.717), short10_0060 (luma 0.736, bright 0.452), short20_0060 (dark 0.589).

### 2.3 Time-of-Day Presets [T][R]

| Preset | Use count (of 20 shorts) | Visual signature |
|--------|-------------------------|------------------|
| Day | 13/20 | pale horizon, blue top sky |
| Golden | 10/20 | warm horizon, violet shadows |
| Night | 12/20 | dark, saturated, local light pools |
| Interior | 19/20 | light pools, warm windows, cool ambience |

---

## 1. Executive Summary

The expanded reference archive contains **11 MP4 videos** (7 YouTube Shorts + 4 YouTube videos), **20 contact sheets** (short01–short20, each 1800×1920, 10×6 grid = 60 tiles covering 2 seconds at 30 fps), **38 reference frames** (shortNN_0060.jpg and shortNN_0180.jpg at 540×960; shorts 15 and 17 have only 0060), **3 directories of 30fps frame sequences** (~1,536 + ~1,815 + ~1,937 JPG frames from *The-Headless-Celebrity-Chicken*, *The-Job-Nobody-Wants-in-Japan*, *Why-Sailors-Carried-Storm-Oil*), and **3 directories of high-resolution PNG sampled frames** (64 + 45 + 51 frames from `even more frames/`, `more frames/`, `more more frames/`). Total measured imagery: 58 catalogued images (88.8 MP, 18.11 MB) plus thousands of un-catalogued frame-sequence JPG and PNG files.

Key measurable finding: **the reference shorts are venue-diverse**. Pixel statistics show luma ranging from 0.252 (short20, darkest) to 0.736 (short10 frame 0060, brightest), and saturation from 0.275 (short18) to 0.784 (short09 frame 0180). OCR text reveals 20 distinct stories spanning ship/oil/pirates, horse racing, glass-town guards, duels, happiness counters, casinos, pachinko halls, time towers, treasury audits, and hypnagogia. **No single visual style dominates** — the unifying factors are the drawing system (ink outlines, flat colour), camera grammar (glides + cuts + flashes), and the one-dominant-material-per-set rule.

**BridgeShort currently uses one venue (bridge) for all 2025 frames.** The references demonstrate that visual variety comes from changing venue, time of day, and palette while keeping the character/ink/camera system constant. This is the single largest opportunity for BridgeShort's evolution into a reusable animation system.
