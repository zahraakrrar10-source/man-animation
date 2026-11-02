# Reference Style and Environment Analysis

**Purpose:** define the visual target for our next short from the reference material in the
`cartoon-3d-short` package, and propose a reusable environment system that is not tied to a single
town, era or story.

**Status:** analysis only. No project files were changed, no assets were downloaded, nothing was
copied into `public/`.

---

## Evidence key and method

Every claim carries a provenance tag. **No reference image was visually inspected for this
report.** There is deliberately no `[V]` tag, because no visual verification happened.

| Tag | Meaning |
|---|---|
| **[M]** | Measured quantity (a number, ratio, colour value or pixel width). Either stated in the package's measurement reports, or computed by me from the files. Numbers only, no visual judgement. |
| **[C]** | Computed by me from the image files: dimensions, pixel statistics, tile counts, colour bands. |
| **[T]** | Text-derived description: a qualitative claim taken from `STYLE_BIBLE.md`, `SKILL.md` or one of the reports. Not independently verified. |
| **[O]** | OCR. Text read from the images by the local Windows OCR engine. Machine text, not a visual judgement; wording is often wrong. |
| **[R]** | The reports' own hand-labelled observation (scene label, colour sample, comparison note). Text-derived: it records what the study's author judged by eye, not what I saw. |
| **[S]** | Suggestion. Mine, not present in the references. |

**Provenance by section.** The whole report is a text study plus computational measurements; no
section is a first-hand visual description.

| Section | Basis | Visually verified by me? |
|---|---|---|
| A. Overall style | reports [M]/[T]/[R]; `STYLE_BIBLE.md` [T]; my pixel stats [C] | No |
| B. Characters | `characters.md`, `motion.md` [M]/[T]/[R] | No |
| C. Environments | `grade.md` per-short table [M]; OCR of captions/signage [O]; venue readings [T]/[R] | No |
| D. Architecture, props | `textures.md`, `lighting.md` [M]/[T]; OCR [O]; prop list partly inferred (†) | No |
| E. Lighting | `lighting.md`, `grade.md` [M]/[T]/[R] | No |
| F. Camera | `depth.md`, `motion.md` [M]/[T]/[R] | No |
| G. Variety, transitions | `STYLE_BIBLE.md` and reports [T]/[R]/[M] | No |
| H. Library proposal | my design [S] | Not applicable |
| I. Gaps, file audit | my file audit [C] and the missing-source list | No |

**Sources actually read in full:** `SKILL.md`, `references/STYLE_BIBLE.md`, and all seven reports
(`characters.md`, `depth.md`, `grade.md`, `lighting.md`, `motion.md`, `outlines.md`, `textures.md`;
`textures.md` was read through section 5.6 and the caveats, with the long TypeScript appendix
skimmed only for the painter parameter table).

**Images opened and measured, not viewed:** all 20 contact sheets (20 × 60 = 1,200 tiles) and all
38 supplied frames at their package size of 540 × 960. I computed per-frame colour, luminance,
saturation, dark/bright fractions, sky fraction, edge energy and flat-colour counts, and I OCR'd
every tile and frame. That is data extraction, not looking.

**Pillow check (2026-11-02):** Pillow **13.0.0** on Python **3.13.0** opens and decodes all **58**
package images with no errors. `PIL.ImageShow` registers the `WindowsViewer`, so `Image.show()` can
put an image on a person's screen; it does not give this model perception. No image was displayed
or interpreted during this run. The only first-hand evidence I produced is [C] and [O].

**Human review pack:** `C:\MaxAnimation\cartoon-short\reference-previews\` now holds a **900 × 960**
preview of every contact sheet (the complete sheet, downscaled), **270 × 480** previews of every
frame, `index.html` (gallery), `inventory.csv` / `inventory.json` / `INVENTORY.md` (all 58 images
with dimensions), and `HUMAN_REVIEW.md` + `review-form.csv` with the visual fields left blank for a
reviewer. The originals in the package were only read.

**Important limitation:** this model cannot accept image input (the image reader returned *“this
model does not support image input”*). I therefore have not looked at the sheets and frames at all.
Everything below comes from (a) the reports' own measured numbers, (b) my pixel-level statistics,
and (c) OCR of captions/signage. Section I lists what still needs a human or vision-model pass.

**Package gap:** the package contains only `frames/`, `sheets/`, `reports/` and the docs. The
`references/vids/`, `measure/`, `characters/`, `depth/`, `grade/`, `lighting/`, `motion/`,
`outlines/` and `textures/` folders that the reports describe are **not present**, so their crops,
CSVs, `labels.csv` and the original videos could not be inspected.

---

## A. Overall visual style

### A.1 Format and delivery **[M]**

- Vertical **1080 × 1920**, **30 fps**, length **31–78 s**, median about **60 s**.
- Voice starts at frame 1–4. No logo, no intro card, no outro, no call to action; the film ends on
  the last spoken word.
- One male narrator, fast and even: **3.5–4.1 words/s**, median **3.7**. Almost no pauses (total
  gaps > 0.25 s under 1 s per video).
- Loudness **−14 LUFS** integrated, LRA about **2.4 LU**; music/SFX bed only 5–10 dB under speech.
- Reference captions: one word (sometimes 2–3) at a time, white bold sans with a thin black
  outline, lower-middle, hard word swaps. **Our standing rule is no captions**, so this is a
  reference fact only, not something to reproduce.

### A.2 The look in one paragraph

The reference is a **hand-painted-looking 3D world with flat 2D cartoon people pasted into it**.
Surfaces are a few flat colour fields with thin painted seams, not photoreal textures. Every
significant 3D silhouette and crease carries a thin near-black ink line. The palette is bright,
saturated and deliberately “targeted” — warm key light, blue-violet shadows, a deep saturated sky
and a pale horizon. Backgrounds fall out of focus on intimate shots. Characters are lit by the
scene, not emissive, and cast contact shadows. The camera almost never sits still: it glides,
pushes and occasionally whips, and hard cuts are rare. The tone is deadpan comedy; every sentence
is illustrated literally, and props carry the joke.

### A.3 Measured colour and tone targets **[M]**

Per-video medians across the 20 shorts:

| Metric | Reference range |
|---|---|
| Mean luminance | 0.43–0.54 |
| Luminance standard deviation | 0.21–0.29 |
| p2 luminance | 0.03–0.11 |
| p98 luminance | 0.90–1.00 |
| Mean HSV saturation | 0.38–0.65 |

Cluster medians (every 15th frame: 2,164 sampled, 1,901 in the four graded classes
plus 263 excluded):

| Class | Frames | Share | Y′ p50 | Y′ p5 | Y′ p99 | Corner/centre vignette |
|---|---|---:|---:|---:|---:|---:|
| Day exterior | 552 | 25.5 % | 0.571 | 0.205 | 0.967 | 0.856 |
| Golden / sunset | 162 | 7.5 % | 0.516 | 0.180 | 0.912 | 0.754 |
| Night | 352 | 16.3 % | 0.243 | 0.087 | 0.817 | 0.461 |
| Interior | 835 | 38.6 % | 0.448 | 0.121 | 0.942 | 0.671 |
| Excluded (graphics, documents, flashes, body interior, scope) | 263 | 12.2 % | — | — | — | — |

Other hard numbers:

- **No crushed blacks.** Non-ink p5 is **0.234** by day; the black point is warm, about
  **(35, 19, 20)**. Ink is only about **2.3 %** of pixels.
- **Near-whites exist.** Day p99 is **0.967**; the brightest 0.5 % is about (254, 251, 246).
- **Lit chroma is high.** Day lit C* p50 **33.8**, p90 **54.9**.
- **No grain** and **no screen-space ambient occlusion**. Contact is ink plus a cast/blob shadow.
  White surfaces and faces do **not** bloom; only real emitters glow.
- A light vignette is part of the look (0.86 corner/centre by day; stronger at night, 0.46).

My own statistics over the 1,200 opening frames agree with that range and add a per-short spread:

| Measure (per short, mean of 60 opening frames) | Range across 20 shorts |
|---|---|
| Mean frame luminance | 0.25 (short 20, bedroom/night) – 0.59 (short 19, office) |
| Mean HSV saturation | 0.36 – 0.64 |
| Pixels darker than V 0.18 | 0.00 – 0.36 |
| Pixels brighter than V 0.92 | 0.02 – 0.21 |
| Sky-like pixels in the upper half | 0.04 – 0.47 |
| Distinct 5-bit colour bins covering 90 % of a frame | 254 – 1,624 |

The low distinct-colour counts on the darkest/plainest sets (short 20: 254, short 15: 548,
short 09: 587) and the much higher counts on busy sets (short 17: 1,624) support the reports'
description: big flat colour fields, with detail concentrated in props and seams rather than
across every surface.

### A.4 What actually carries the style

1. **World ink** — about **74 %** of scanned geometry edges (36 of 49) carry a black line: silhouettes
   against sky, depth jumps, convex creases and object-on-floor contacts. Lines are about **3 px at
   1080**, near-black **#0b0a0c**, almost constant in screen width with distance, and they blur with
   the background. They are *not* drawn on wall/floor junctions or the horizon. **[M]**
2. **Painted flat surfaces** — a few flat fills per material, thin seams 3–5 px at 1080, gentle
   broad drift, no photographic grain. **[M]**
3. **Two-tone light** — lit and shade are painted rather than physically derived; shadows keep the
   material's hue by day and turn blue-violet at sunset. **[M]**
4. **Depth** — a real depth-of-field pass on about **1/3** of shots, aerial haze at the skyline,
   a saturated sky gradient, and foreground framing objects in about **1/3** of close/medium shots.
   **[M]**
5. **Camera grammar** — continuous slow motion, symmetric glides, rare hard cuts, no handheld
   float. **[M]**
6. **Character cards** — 2D billboards with their own plum ink and no world ink on them. **[M]**

### A.5 Tone

**[R]** Deadpan, ironic narration; the picture illustrates the sentence literally. Props and
signage carry jokes (a “HAPPINESS” counter with yearly price tags, a prize-claims window, a
“BRAIN NOT INCLUDED” label). **[O]** The visual style stays straight-faced: bright, clean,
storybook, never sketchy or grungy.

---

## B. Character design and animation

### B.1 Construction **[M]**

- Adults are **3.3–3.7 head-heights** tall (median **3.5**). Legs are about **1.4 HH**; torso about
  **1.1 HH**.
- **Head:** slightly wider than tall, **H/W 0.93** (IQR 0.83–1.01), with a slightly pointed crown
  (`n_top` 1.70), a fuller jaw (`n_bot` 2.26), a chin taper (`egg` −0.125), about **10 %** left/right
  asymmetry and a few degrees of tilt. It is a hand-drawn blob, never a perfect ellipse.
- **Outline:** dark plum, **#201628–#2f1d28**, about **5 % of head width**, with a thick/thin ratio of
  **2.9–3.5**; the thickest point sits at the bottom-right, around **64°**, and moves with the light.
- **Body:** a bean/capsule torso, widest at 60–70 % of its height. Limbs are single ink strokes
  about **0.055 W**; hands are filled ink dots about **0.11 W**; feet are short round-capped strokes.
  No knees, elbows, shoulders or neck.
- **Face:** eyes **0.26 W** apart, lidded half-discs by default (deadpan), flat dashes or vertical
  dot ovals as alternatives. Brows are tapered and offset; mouths are a short tilted dash. **No
  blush (0 of ~40 faces)** and **no catchlights (0 of ~40)**. Nose and ears are absent in front view.
- **Shading:** a soft crescent on the shadow side, falling to **0.88–0.89×** the lit value, plus a
  softer side gradient on the torso (**1.0 → 0.55–0.66**) and sometimes a subtle inner rim. Faces
  stay bright: **V 0.97** (0.86–1.0).
- **Hats and props:** hats sit low, cover 25–40 % of the head and follow the skull curve. Props are
  held by the dot hands and drawn at 0.6–1.0× the outline weight.
- **Poses:** torso lean 3–8°, head tilt typically ±5°, one arm acting, the other hanging, feet turned
  outward. Bodies are rarely symmetric.

### B.2 Animation **[M]**

- **On ones.** Moving characters change every frame; no line boil, no squash/stretch, no smears, no
  idle loops. Static characters are pixel-stable.
- **Walks:** 9–12 frames per step (2.5–3.3 steps/s), body bob **3–7 %** of height, lean 1–7° in
  phase with the bob, and the stance foot **planted** (≤ 1.1 px/f while the ground moves 7.2).
- **Blinks:** every **0.5–2.3 s**, **4 frames** (half / shut / shut / half), and one on every
  expression change.
- **Reactions:** expressions/actions land **0–3 frames before** the spoken word and swap in one
  frame.
- **Turns:** 1–4 frames, with the face sliding around the head.
- **Crowds:** formations stand still while a crane or truck move supplies the motion; extras do not
  idle-wave or hop.

### B.3 How characters interact with environments **[M]/[R]**

- They are **lit by the scene**: heads take the local light colour (day white, sunset cream, moon
  lavender, window light lilac) and receive light patterns such as a window stripe crossing a face.
- **Ground contact:** a soft elliptical blob offset away from the sun by day (Y ratio 0.52–0.74,
  edge 3–12 px); long soft figure shadows at sunset; often no shadow in interiors.
- **Scale:** characters are 3.5 HH against doors, counters, tables, machines and ships, so the world
  reads as full-size, not toy-size.
- **Physical business:** they sit on couches and beds, lean on counters, hold tools and props, ride
  horses, stand in crowds, climb stairs, get wet, and are partially occluded by foreground objects.
- **Foreground occlusion is a composition tool:** a rail post, chain, flag, spectator shoulder/hat,
  slot machine, or cat sits near the lens and is blurred, framing the character.

---

## C. Environment categories found in the references

### C.1 The dominant fact: interiors are the largest class **[M]**

Of 2,164 sampled frames: **exteriors 49.3 %** (day 25.5, golden 7.5, night 16.3), **interiors
38.6 %**, graphics/documents/body-interior 12.2 %.

Per short, the class mix is:

| Short | Day | Golden | Night | Interior | Excluded | Dominant |
|---:|---:|---:|---:|---:|---:|---|
| 01 | 54 | 0 | 56 | 19 | 1 | night |
| 02 | 64 | 11 | 0 | 50 | 4 | day |
| 03 | 69 | 5 | 20 | 5 | 32 | day |
| 04 | 63 | 11 | 10 | 26 | 3 | day |
| 05 | 22 | 0 | 90 | 33 | 11 | night |
| 06 | 0 | 0 | 0 | 87 | 40 | interior |
| 07 | 12 | 31 | 46 | 23 | 7 | night |
| 08 | 0 | 4 | 12 | 89 | 11 | interior |
| 09 | 0 | 0 | 6 | 112 | 3 | interior |
| 10 | 12 | 0 | 24 | 73 | 8 | interior |
| 11 | 14 | 30 | 26 | 60 | 0 | interior |
| 12 | 78 | 33 | 0 | 5 | 11 | day |
| 13 | 63 | 4 | 3 | 0 | 12 | day |
| 14 | 51 | 3 | 6 | 30 | 0 | day |
| 15 | 0 | 0 | 0 | 12 | 57 | graphics |
| 16 | 0 | 0 | 53 | 38 | 0 | night |
| 17 | 0 | 0 | 0 | 38 | 24 | interior |
| 18 | 40 | 6 | 0 | 21 | 13 | day |
| 19 | 10 | 24 | 0 | 54 | 7 | interior |
| 20 | 0 | 0 | 0 | 60 | 19 | interior |

That gives: **13/20** shorts contain day exteriors, **10/20** golden, **12/20** night, and **19/20**
at least some interior. Only **4/20** shorts have no exterior frames at all (06, 15, 17, 20).

### C.2 Venue inventory (evidence-limited)

This table combines captions and visible signage from the first two seconds **[O]**, the opening
frame at 6 s, and the reports' scene descriptions **[R]**. “Inferred” means the venue is inferred
from the words/signage, not seen directly.

| # | Caption/signage cues in the opening two seconds **[O]** | Venue inferred | Frames D/G/N/I/X **[M]** |
|---:|---|---|---|
| 01 | cooking, the sea, captain, crew, storm, sailors, oil, broth, pirates | ship galley/deck at sea in a storm | 54/0/56/19/1 |
| 02 | slowest, race track, hill, horse, RACE 8, betting, the room | racecourse + indoor betting room | 64/11/0/50/4 |
| 03 | a button, a town, guards, glass, 47 scratches, houses, crowd | miniature town under a glass dome | 69/5/20/5/32 |
| 04 | fastest, noon, Eddie, gun, holster, duel, phone, table | western street at noon | 63/11/10/26/3 |
| 05 | happiest, counter, money, birthdays, HAPPINESS, SOLD, YEAR 2017–2025, hospital | shop counter + hospital | 22/0/90/33/11 |
| 06 | scratch, $500,000, vault, BUST, lottery, apartment, store, numbers | apartment/store + lottery vault | 0/0/0/87/40 |
| 07 | bell, bodies, shovel, porch, sunrise, debt, house | house/porch + graveyard at sunrise | 12/31/46/23/7 |
| 08 | ticket, CASH, cashier, PRIZE CLAIMS, OUR WINNERS, police, CASH BAIT | convenience store + prize-claims office | 0/4/12/89/11 |
| 09 | fire companies, boss, Inbox (0), emails, old desk, Japanese, DEVELOPMENT ROOM | office + server/development room | 0/0/6/112/3 |
| 10 | house, couch, officer, FOR SALE, furniture, car, camped | suburban house/porch + living room | 12/0/24/73/8 |
| 11 | bronze, dragon, emperor, court, inventor, jar, palace, guards | palace/court | 14/30/26/60/0 |
| 12 | cannonball, 1700s, pirates, Navy, furnace, ship, warship, 1000 lbs | warship deck + harbour | 78/33/0/5/11 |
| 13 | knight, pardon, sin, priest, coins, Price of Sins, chest | medieval town/church | 63/4/3/0/12 |
| 14 | blacksmith, spear, kingdoms, 100 years at war, soldiers, messenger | battlefield + forge | 51/3/6/30/0 |
| 15 | painkillers, headache, ACID SPA, 98.6, BRAIN NOT INCLUDED, body a house | body-as-house diagram | 0/0/0/12/57 |
| 16 | gambling, street, MACHINES, PRIZE HALL, PACHINKO, tokens, shop | pachinko parlour + street at night | 0/0/53/38/0 |
| 17 | PLAY 3 CREDITS, jackpot, LUCKY 7 PROGRESSIVE, reels, BELL/BLANK | casino slot floor | 0/0/0/38/24 |
| 18 | scientists, tower, CHRONO-2, CRASH SURVIVORS, slow motion | lab + tower/crash hall | 40/6/0/21/13 |
| 19 | TREASURY, ACCOUNTS PAYABLE, 412, checks, AUDIT, floors | records office/treasury | 10/24/0/54/7 |
| 20 | fall asleep, steel balls, HYPNAGOGIA, DEEP SLEEP, THOMAS | sleep setting (bedroom inferred) + sleep diagram | 0/0/0/60/19 |

### C.3 Recurring venue types and how often they appear

Counting the 20 shorts (a short can use more than one venue):

| Venue archetype | Shorts | Count / 20 |
|---|---|---:|
| Interior room of a home (living room, bedroom, apartment) | 06, 07, 10, 20 | 4 |
| Retail / commercial / gambling interior (counter, store, prize office, pachinko, casino) | 05, 08, 16, 17 | 4 |
| Workplace (office, records, lab, server room) | 09, 18, 19 | 3 |
| Town / street / plaza (any era) | 03, 04, 13, 16 | 4 |
| Palace / castle / church / court | 11, 13 | 2 |
| Ship / sea / harbour | 01, 12 | 2 |
| House exterior / porch / yard | 07, 10 | 2 |
| Field / battlefield / racecourse / open land | 02, 14 | 2 |
| Diagram / abstract “inside the body” stage | 15 | 1 |
| Miniature / diorama world | 03 | 1 |

**Lower bounds.** These counts come from the opening two seconds, the 6 s frame and the reports; a
venue that appears later in a short without being named in the available evidence is missed. Treat
them as “at least this many”, not exact census.

### C.4 Scene labels named in the measurement reports **[R]**

The lighting study lists these locations across its 67 hand-labelled frames (frame IDs such as
`d01` are study-frame labels, not short numbers):

- **Exteriors, day:** ship deck; chef on deck; deck wide; race track; town from above; plaza;
  grass with a crowd; western street; cowboy close-up; deck with cannon; deck with characters;
  chest on deck; market with a knight; field with a king; steel grating; house door; castle gate;
  fort grass.
- **Exteriors, golden:** western riders; western street; a fallen figure; two characters; hill with
  a castle behind; palace; deck; road with the sun at the horizon; interior window; dawn street;
  field haze.
- **Exteriors, night:** night town; night western street; lanterns on snow; moonlit field; castle
  wall; blacksmith with fog.
- **Interiors:** room with a window shaft; moonlit room; office; wall sconce; bare bulb.

The textures study adds, by video and timestamp: **azure sea and a painted hull** (01), **town road
and a porch under a roof** (02), **plaza slabs and a crowd** (03), **western sand and pebbles** (04),
**a lake at sunset** (05), **snowy roofs and purple clapboard** (07), **night water** (08), **aqua
clapboard, shutters and curtains** (10), **slate and cone roofs, a mountain at sunset** (11), **teal
sea, a harbour and a riveted hull** (12), **thatch, terracotta, a church and a harbour** (13),
**a river from above and under an arch** (14), **pavement** (18).

### C.5 What recurs, in plain terms

- **A stage with a readable horizon or a box interior.** Exteriors are ground plane + buildings or
  landscape + sky. Interiors are a room box with one or two walls opened to camera.
- **A single dominant material per set:** wood deck, sand street, plaster facade, stone hall, metal
  machine hall, grass field.
- **Everyday places made specific by props**, not by architectural complexity: a counter with price
  tags, a prize window, a slot bank, a porch with a shovel, a treasury desk with cheques.
- **Interiors are not darker by default.** Interior p50 luminance is 0.448, close to golden (0.516)
  and well above night (0.243); they are warm pools of light, not gloom.
- **Time of day is a production variable, not a story location.** The same kind of street, deck or
  room recurs in day, golden and night versions.

---

## D. Architecture, props and environmental details

### D.1 Building vocabulary **[M]/[R]**

**Exterior shells**

- **Facade proportions:** the measured facade spec gives a **0.45 m plinth**, windows
  **0.85 × 1.25 m**, window trim **0.08 m**, louvred shutters **0.45 m** wide, and timber about
  **0.18 m**. Storey counts, cornices, sills, window hoods, door steps and chimneys are **not**
  measured in the reference material; that vocabulary belongs to our previous bridge town in
  `SKILL.md`, so it is not treated here as reference evidence.
- Wall skins measured in the reference:
  - cream plaster **#f3e6d2**, salmon **#e58e6e**, red **#df585d**;
  - timber-framed **#804937 / #785248**, with timber about **0.18 m**;
  - aqua clapboard **#a3cdc7 / #b4dbd4** with cream trim **#fceed5**, approaching **L\* 81**.
- **Windows:** white/cream trim, a thin dark outline, mid-tone blue-violet glass
  (**#7b7ea0 / #6670b0**) with two diagonal glints; louvred violet-blue shutters
  (**#816e89 / #5a5f9a**) with slat lines; pink or cream curtains in some windows
  (**#f0d5df / #f5c0c8**).
- **Roofs:** terracotta **#dc8872 / #c87563 / #ec9c87** (L\* about 64, joints 3.3 px, no outline per
  tile); slate **#bdbfc6 / #dbe0e9**; thatch **#d49934 / #f0bd59** with dark streaks; snowy
  **#fab8b8**; a blue cone roof **#2e5ccd**.
- **Masonry:** stone blocks **#c2b2a5 / #9a8c7f** with cream highlights, castle stone
  **#cdbdb0 / #9c908f**, flagstones **#c4b6b3 / #b5a8a5 / #a79998**, plaza slabs
  **#eadabc / #d7c5aa**. Mortar is a thin line **2.8–4.5 px** at 1080, not a trench.
- **Brick:** **#cf5e30 / #dca55f** on cream mortar **#f6d9b1**, L\* about 67, at true brick size
  (about 0.25 × 0.085 m).
- **Ground:** the reference has **no cobblestones**. It uses flat slabs, packed dirt, sand or
  boardwalk, with sparse pebble dabs.
- **Exterior furniture:** boardwalks, railings, posts, steps, awnings, shop signs, hanging signs,
  fences, stone quays, bridge arches.
- **Ship architecture:** plank deck, painted hull planks, mast and sails, cannon on its gun
  carriage, ship lanterns. Cabin and rigging are plausible but not directly evidenced.

**Interior shells**

- Room boxes with a visible floor and one or two walls; ceilings implied rather than modelled.
- Counters, bars, desks, shelves, benches, tables, chairs, beds, couches, cabinets, filing walls.
- **Light fittings are architecture:** ceiling lamps, wall sconces, bare bulbs, candles, ship
  lanterns, paper lanterns, street lamps outside windows.
- Windows act as light sources: a hard shaft with a soft dusty edge (about 48 px at 720), which can
  cross a character's face.

### D.2 Surface detail and wear **[M]**

- Painted details are **small and sparse**: dark and light speckles 2–4 px, hairline cracks, chipped
  corners, nails, knots, board lips, chipped paint.
- Board gaps: **3.6–4.8 px** FWHM near, 3.3–3.5 px mid/far, with a sunlit lip and a shaded lip.
- Roof tile joints **3.3 px**, ΔL\* about 10, **no ink outline per tile**.
- Clapboard lines **3.0–4.1 px**, every 23–28 px.
- Stone blocks have a light top bevel (+5 L\*) and a dark bottom (−3), plus per-block tone variation
  of about ±7 %.
- Grass has broad low-frequency patches (autocorrelation 16–40 px), sparse tufts and a few flowers.
- Sand is almost noise-free (std 3.7) with sparse cream pebbles.
- Metal is painted like a matcap: blue-grey mids, a broad bright band on 25–30 % of the area, darks
  that never go below **L\* 19**.
- **Signage is diegetic and legible:** “FOR SALE”, “PRIZE CLAIMS”, “OUR WINNERS”, “STATE …
  lottery”, “ACCOUNTS PAYABLE”, “AUDIT”, “CRASH SURVIVORS — TUESDAYS 7 PM”, “BRAIN NOT
  INCLUDED”, “NEW MACHINES / PRIZE HALL / PACHINKO / SLOTS”, “LUCKY 7 PROGRESSIVE”, “HAPPINESS”,
  “TREASURY”. These are OCR readings and several letters are uncertain (the OCR returned
  “PAYAOLE” for PAYABLE and “PROGRESCJVE” for PROGRESSIVE); the reliable finding is that the
  worlds carry legible diegetic signage, not the exact wording. **[O]**

### D.3 Landscape and nature **[M]**

- **Sea:** flat saturated vertical gradient, lighter and more cyan at the horizon, darker near the
  camera; top-to-bottom drop 10–35 L\*. Example stops: azure **#81acf1 → #27a4ff**; teal
  **#1194b6 → #035077**; harbour **#1e70bb → #0d4e97**. Sparse horizontal crests (+8 to +13 L\*)
  with a dark trough beneath, thinning towards the camera. **No reflections.**
- **River:** **#8fb8d3** from above, **#7294b4** lit under an arch, **#0d2138** in shade.
- **Lake at sunset:** **#77a5c3 / #4482b3 / #396362 / #5c87a8**, with warm light blobs, not mirror
  reflections.
- **Rocks and cliffs:** two flat planes — a warm lit face and a cool shade face — almost no lines.
  Sea cliffs **#caae98 / #60737c**; pillars **#ddc0a6 / #868784**; sunset mountain
  **#feb682 / #a67f99**.
- **Grass:** **#71b038 / #7dbf3f** (L\* 66, C\* 64), shadow teal **#305c54**; plaza grass
  **#488e2e**; sparse white/yellow/orange flower dabs.
- **Sand/dirt:** western sand **#b0937f** (L\* 63), town road **#c58b43 / #cc9247**, castle road
  **#b99260**, golden road **#e3b46b / #ce9c5d**. Shadows on ground go blue-violet **#4b3c5a** or
  warm mauve **#806154**.
- **Sky:** 4-stop gradient by elevation (pale horizon, deep saturated blue within about 20°).
  Day clean-sky stops **#59abff / #208cfb / #3e9bff / #66baff** and **#0b6ced / #0f7af9 / #1881fd**;
  upper-sky median **#5e93d9**, just-above-skyline **#9fb6e6** (luminance ratio 1.28).
  Golden: coral **#d27472 / #e27d7c / #fda77d / #ffca83**, lilac/pink
  **#c18dde / #eb9ede / #feb0c6**, magenta **#312384 / #70339f / #ec5080**, blue-cream-peach
  **#508bce / #d5cdbd / #f0bd97**.
  Dusk/night **#365296 / #a59ba9** and **#1849b4 / #1857c8**.
- **Clouds:** 3 tones (lit crown, mid, lavender underside), a chain of round lobes biggest in the
  middle, flat bottom, 100–640 px wide at 1080; **9 of 11 have no outline**, small far crisp clouds
  sometimes get a thin ink rim. Day crown **#f1f6fc** (L\* 97), underside **#cfe3fc**; big cumulus
  underside **#b6c1f2**; sunset crown **#f99a84**, mid **#ea827c**, underside **#cf727c**.
- **Snow:** snowy roofs **#fab8b8**; lantern glow on snow is the key light in that scene.
- **Trees/forest:** referenced as a DOF/haze background (forest, sigma 5.33), not itemised in the
  reports.

### D.4 Props and vehicles **[M]/[O]/[R]**

**Confidence.** Items come from measured surface/scene samples and report descriptions **[M]/[R]**,
plus caption and in-world signage text **[O]**. A dagger (†) marks an item that is a reasonable
reading of the caption rather than something named in the surviving measurements. This is a
vocabulary of prop *types*, not a per-shot count.

| Category | Items evidenced |
|---|---|
| Food service | copper pot, bowls, counter, bottles/beers, trays, price tags |
| Maritime | cannon and gun carriage, iron ball, chest, bucket, barrel, crate, mast and sails, ship lantern |
| Western | revolver and holster, horse, table, boardwalk, porch, shovel, sign |
| Commerce | cashier counter/cash register†, lottery tickets and scratch cards, prize counter, shelves, display window, “OUR WINNERS” board, “FOR SALE” sign, vault, safe-deposit boxes† |
| Gambling | slot machines (reels, BELL/BLANK/CHERRY, jackpot panel), pachinko machines, token buckets, prize counter |
| Office | desk, chair, filing cabinets, cheques, ledgers, envelopes, telephone†, monitor/emails, audit stamps† |
| Home | couch, bed, blankets, coffee table†, lamp, framed pictures†, kitchen counter† |
| Workshop | anvil, forge/furnace, hammer, tongs, spear, armour, cannonballs, molten metal, sparks |
| Palace/medieval | throne/dais†, columns†, curtains/hangings†, jar/vase, coins, chest, pendulum, priest's chest |
| Lab/science | tower equipment, CHRONO-2 apparatus, crash-test rig†, display screens, steel balls |
| Small props that carry jokes | frogs, milk cart, birthday/price cards†, medicine bottles, a paper with “BRAIN NOT INCLUDED”, a magnet car |
| Light sources (props) | street lamps, lit windows, paper lanterns, ship lanterns, wall sconces, bare bulbs, candles, fires, the setting sun |

**Vehicles:** ships (a galleon/warship with cannon and gun carriage), horses (race track and
western riders), a milk cart (named in `STYLE_BIBLE.md`), a car (short 10's caption), and a camera
crane or truck that supplies motion on crowd beats (`motion.md`). Boats in a harbour are implied by
the sea/harbour scenes but are not directly evidenced. No train or aircraft is evidenced in the
available material. **[M]/[R]**

### D.5 Foreground, middle ground, background **[M]**

- **Foreground object present in 38 % of medium shots and 39 % of close-ups**, 16 % of full and wide
  shots. Typical: rail post, chain link, flag, spectator shoulder/hat, slot machine, cat, a head.
  It sits at about 0.3–0.5× the focus distance and covers 10–25 % of a frame edge, and it is blurred
  to 4–8 sigma720.
- **Middle ground is the playable stage:** the character stands on it, props are reachable, and the
  camera height is about 0.79× character height.
- **Background distance:** a near wall in **58 %** of frames, mid-distance in **23 %**, far in
  **20 %**. Backgrounds are simplified and hazed: objects at the skyline are blended about **40 %**
  toward the horizon colour, and their ink and shadows lift by about 15 %.
- **Horizon** in full/wide shots sits at **y ≈ 0.45** (IQR 0.39–0.50).
- The sky occupies **20–35 %** of most wide frames; water occupies **20–40 %** of river shots.

### D.6 Scale and density

- Buildings are human-scaled: doors, counters and windows line up with 3.5-HH characters; machines
  and ship furniture are slightly oversized for readability but not toy-like.
- Streets are dressed, not crowded: a few facade bays, a boardwalk, a cart, a sign, a lamp, 0–15
  extras. Crowds are used as a mass (soldiers, plaza crowd) rather than as individually animated
  extras.
- Interiors are shallow: 1–2 visible walls, a floor, and props concentrated around the character's
  hands and eyeline.

---

## E. Lighting and atmosphere

### E.1 Key light direction **[M]**

- **Day:** 6 of 20 study frames have the key side-back from screen right (azimuth ~50–70°), 7 have a
  soft frontal key (facade shots), 2 are top-lit. Shadow edges are crisp, 3–12 px at 720.
- **Golden:** **10 of 15** frames are backlit — the sun is ahead of the camera at 0–40° azimuth and
  only 3–15° elevation. Long shadows come toward the camera. There is no rim line; the effect is
  bloom and haze around silhouettes.
- **Night:** blue ambient plus warm practicals (windows, street lamps, lanterns), with violet fog.
- **Interior:** a window shaft, a ceiling lamp, a sconce, a bare bulb or a candle; light patches are
  colour replacements, not just brightness (e.g. a yellow sun patch on a green wall, B × 4.85).

The sun is placed **relative to each shot's camera** and frozen for the shot, so the light reads
consistently while the camera glides.

### E.2 Two-tone shading and shadows **[M]**

- **Day:** shadow = about **0.49–0.52 × lit** on the same surface (overall 0.37–0.65), keeping the
  material's hue and slightly increasing saturation (warm on wood, green on grass, bluish only on
  grey metal).
- **Sunset:** shadow is a **painted violet-blue replacement**, with blue up to **2.8–3.0×** the lit
  blue on sand (**#db9044 → #5b5173**).
- **Interiors:** light patches replace colour (yellow patch **#d6c33b** on a green wall
  **#76b27f**).
- Contact is **ink line + cast/blob shadow**, not SSAO; only small props get a short 8–11 px shadow
  ramp.
- Character shadows: soft blob by day (Y ratio 0.52–0.74), long soft silhouette at sunset, often
  none indoors.

### E.3 Characters under scene light **[M]**

Heads stay bright (V **0.97**, 0.86–1.0) and take the scene tint:

| Light | Head colour |
|---|---|
| Day | #f8f1ef / #f7f1f0 |
| Sunset | #fddeb6 / #fde7d0 |
| Warm lamp | #fcdfbd / #fbdeb5 |
| Moonlight | #b1ace7 / #edd9f7 |
| Window light | #d9b5e7 |

There is a side gradient of about **14 %** toward the key and a slightly brighter top; no rim, no
emissive flatness.

### E.4 Sky, fog and haze **[M]**

- The sky is a **4-stop vertical gradient** by elevation: pale at the horizon, deep and saturated
  within about 20°. The reference's pale horizon is about **1.28×** the upper-sky luminance by day
  and **1.55×** at golden hour.
- **Fog colour = horizon colour.** Day hills read **#94cefe**, cliffs lavender **#a7a3af**; sunset
  castle **#db9594**, palace **#d1a57c**; night fog **#877aea**.
- Distant objects are pulled 20–40 % toward the horizon colour, and their ink and shadows lift.
- The skyline is pale grey-beige **#b2b0a1** just below the horizon, not dark brick.

### E.5 Local light, glow and bloom **[M]**

Measured glow radii at 720p (core / r50 / r10):

| Source | r50 | r10 |
|---|---:|---:|
| Street lamps | 12 | 18–42 |
| Lit window | 34 | 114 |
| Paper lantern | 42 | 46 |
| Moon | 30–38 | 64–144 |
| Wall lamp | 4 | 24 |
| Ship lantern | 34 | — |
| Wall sconce | 68 | 204 |
| Bare bulb | 18–34 | 66–78 |
| Setting sun | **188** | — |
| Low sun | 94 | 164 |
| Candle | 42 | 174 |

- Bloom is broad and flat: excess 0.25–0.5 at the edge, still 0.15–0.4 at +20 px, e-fold 14–21 px
  at 720p. The matched mipmap setting is **6 levels, radius 0.6**.
- **Only emitters glow.** White heads, eyes, walls and clouds do not bloom; their edges are the
  crispest in the frame.
- Specular exists only on metal (copper pot, cannon, armour, iron ball) as one broad soft highlight.

### E.6 Weather and atmosphere **[O]/[R]**

- **Storm at sea** (short 01): dark storm sky, waves swallowing ships, oil and broth as story props.
- **Snow** (a lantern scene, and snowy roofs in video 07): warm lanterns against blue snow, door
  light, paper lanterns.
- **Fog** at night (blacksmith scene, violet fog #877aea).
- **Dust/haze** at sunset (western riders, orange haze).
- **Sunset haze** on hills, castle and palace.
- **Interior atmosphere:** dusty window shafts (soft edge about 48 px at 720), light pools, no
  volumetric fog indoors.
- No rain, lightning, wind-blown debris or day fog is evidenced in the available material.

### E.7 Grade and colour logic **[M]**

- Day: warm lifted blacks, bright mids, near-white highlights, cool yellow mids, light vignette.
- Golden: strong brightening, lower mid saturation, **blue-violet shadows** (b* −20 to −30), warm
  orange highlights, stronger vignette, red/rose and blue/violet accents (about 20 % red/rose,
  17 % blue/violet/magenta in the hue histogram).
- Night: violet shadows (hue ~300°), warm windows/lamps, deep but lifted darks (never pure black).
- Interior: warm-neutral, with local light pools and window patterns.
- **Forbidden by measurement:** pure black shadows, grey shadows, orange-soup golden grade, flat
  emissive characters, black iron (below L\* 19), pastel sky.

---

## F. Camera and composition

> **Note on a conflict inside the package.** `STYLE_BIBLE.md` describes the camera as holding
> ~80 % of frames, with “ease-out bursts” that peak on the first frame and decay, and with
> “frequent dutch tilts”. The later measurement reports contradict this. `motion.md` counts
> **65 %** of frames moving, **symmetric ~23-frame glides**, and explains that the burst reading
> came from an integer phase correlation that cannot see motion below ~4 px/f. `depth.md` counts
> dutch tilt at **2 %**. I use the measured values throughout; the `STYLE_BIBLE.md` camera wording
> is superseded by the reports that measured it after the fact.

### F.1 Shot mix and framing **[M]**

| Shot type | Share | Head top (fraction of height) | Visible character height | Feet |
|---|---:|---|---:|---:|
| Close-up | 3 % | 0.28 (0.21–0.35) | 0.65 | cut |
| Medium | 27 % | 0.35 (0.25–0.38) | 0.50 | cut ~0.80 |
| Full | 28 % | 0.38 (0.35–0.42) | 0.35 (0.27–0.45) | 0.75 |
| Wide | 12 % | 0.50 (0.42–0.55) | 0.15 | 0.64 |
| Extreme wide | 8 % | 0.51 | 0.10 | 0.59 |
| Inserts | 22 % | — | — | — |

- **Inserts are a fifth of all frames** — hands, props, screens, tickets, reels, coins. They carry
  most of the close focus and the joke detail.
- Horizon y **0.45** in full/wide/extreme-wide shots.
- Background: near wall 58 %, mid 23 %, far 20 %.
- Dutch tilt only **2 %** (11 of 530 frames).
- Characters sit in the middle of the vertical frame; in the reference, captions sit over their
  lower body.

### F.2 Camera height, angle and lens **[M]**

- Eye level **82 %**, high **11 %**, low **3.4 %**, top-down **3.2 %**.
- Camera height from horizon geometry: **0.79 × character height** (IQR 0.67–1.00); high shots run
  1.5–1.9×.
- FOV could not be measured reliably (vanishing-point fit failed; 1–73° spread). Character size and
  horizon cues are consistent with **FOV 34–46°**. Keep that range.
- Level camera is the default; low angles are used sparingly for force, high angles for vulnerability
  or geography.

### F.3 Movement **[M]**

- **65 %** of frames move (≥ 2 px/f), 24 % drift (0.3–2), only **10 %** are near-still (< 0.3).
- Median speed **3.6 px/f**; p90 **16.9 px/f** at 720p.
- **6 moves per 10 s**; one move is about **101 px** with ~23 % zoom.
- Moves are **symmetric ease-in-out**, about **10 frames in + 10 frames out (≈23 frames total)**,
  peak **13.7 px/f** median.
- **No handheld float.** Quiet frames still push in: 70 % are active, 83 % of those push in, median
  **0.14 %/f**; emphasis pushes reach **0.6 %/f for ~35 frames (+22 %)**.
- Long push-ins: 336 push-ins vs 180 pull-outs; median 35 frames, +22 %.
- Rolls: **3.2 per 10 s**, median **3.6°** over 18 frames.
- **Whip pans:** 0.45 per minute (5 in 18 minutes), 45–93 px/f for 7–25 frames, 2–3 frame ramps,
  strong directional motion blur.
- Impacts: a 6–7 frame kick whose offset flips sign every frame, ~3 px, gone in 6–8 frames; the
  push-in stops on the hit.
- Hard cuts are rare: **0–1 per video in 12/20**; most detected “cuts” are 4-frame flash effects.

### F.4 Depth of field **[M]**

- DOF is on in about **1/3** of shots, not a fixed lens.
- Background sigma720 when on: CU **4.2**, MS **4.0**, FS **2.7**, WS **1.9**; at 1080p that is
  roughly **12.5 / 12 / 8 / 5.7 px** blur-disc radius.
- Foreground blur: 20 % of frames have a near foreground object, blurred to **3.7–7.8 sigma720**
  (≈ 15–24 px radius at 1080).
- Blur follows a thin-lens curve and **saturates within about 3× the focus distance**; a near wall
  behind a character is blurred much less than a town or sky.
- **No rack focus inside shots.** Blur changes come from cuts or transitions, not pulls.
- Focus is on the subject's eyes.

### F.5 Composition rules **[M]/[R]**

- Put the character in the middle vertical band, with the horizon near 0.45 on wide shots.
- Frame through something in about a third of close/medium shots: a post, chain, flag, shoulder,
  machine. Blur it, keep it at the edge, do not let it read as a cut-off blob.
- Keep the background simple: a near wall, a simplified skyline, or a hazed landscape.
- Use the vertical format: stairs, shafts, hanging lamps, tall facades, smoke, and figure scale fill
  the height; do not compose only horizontally.
- Light from the side or back where possible; front-light only for flat facade/announcement shots.
- Reserve the extreme wide and top-down for geography or scale beats (8 % + 3 % of frames).

---

## G. Scene variety and transitions

### G.1 What creates variety (while the style stays fixed)

1. **Time of day.** The same venue can be day, golden, night or interior-lit; the light preset
   changes sky, shadow colour, exposure, glow and palette. 13/20 shorts use day, 10/20 golden,
   12/20 night, 19/20 interiors.
2. **Venue archetype.** Street, room, shop, hall, palace, ship, field, workshop, office, vehicle,
   diagram. 10+ archetypes across 20 shorts.
3. **Weather and atmosphere.** Storm, snow, fog, dust haze, sunset haze, interior dust shafts.
4. **Palette skin.** Warm plaster/terracotta; cool stone/slate; aqua clapboard; saturated machine
   hall; violet night; green field. Each set has one dominant material and one accent family.
5. **Shot size.** CU 3 %, MS 27 %, FS 28 %, WS 12 %, EWS 8 %, inserts 22 % — the cutting rhythm
   moves constantly between scale extremes.
6. **Camera behaviour.** Glide, push, crane, whip, roll, top-down; each venue gets a different
   default move (eye-level glide on streets, slow push in rooms, crane on crowds, top-down on
   tables/diagrams).
7. **Local light colour.** Warm windows and lamps against cool ambience; fire; moon; sun disc.
8. **Props and signage.** The same room becomes a lottery shop, a prize office or a treasury by
   swapping dressing and signs.
9. **Effect cards.** Flat 2D sprites composited into 3D: muzzle fire, glow bursts, sparkles, splash,
   speed lines, dust puffs, music notes, stars, light shafts.

### G.2 What stays constant

- Character drawing and scale (3.5 HH, plum ink, deadpan face, dot hands).
- World ink width (~3 px at 1080), near-constant with distance, absent on characters.
- Painted flat surfaces with thin seams; no grain, no SSAO.
- Shadow logic: ~0.5× lit by day, violet replacement at sunset, light pools indoors.
- Sky logic: pale horizon → deep saturated top; fog = horizon colour.
- Palette limits: no pure black, no grey shadows, no pastel sky, no orange-soup golden.
- Camera grammar: eye-level default, 0.79× height, symmetric glides, creeping holds, rare cuts.
- Composition: horizon ~0.45, character centred vertically, foreground framing, DOF on intimate
  shots only.

### G.3 Transitions **[M]/[R]**

- **Hard cuts only on big jumps**; otherwise the film moves.
- **Continuous camera moves** connect subjects: follow a bullet, an oil stream or a ball from one
  subject to the next.
- **Whip pans with motion blur** (0.45/min).
- **Fly-through** a window or porthole into the next space.
- **Crossfade dissolve 6–8 frames** when changing place or time.
- **4-frame flash effects:** `STYLE_BIBLE.md` notes that most apparent cuts are 4-frame flashes
  rather than edits.
- Big reframes are cuts; small reframes are 18–40-frame glides.
- Every hold creeps (no static hold ≥ 4 frames).

### G.4 Beat-to-set relationship

**[R]** Every sentence is illustrated literally, so the set changes when the sentence changes
subject or place. The reference mixes one “home” venue with 2–4 contrasting venues per short, and
uses time-of-day shifts for the explanation beat (for example noon → sunset → night-blue). That is
why a 60 s short can feel like a tour without looking inconsistent: the character, ink, light logic
and camera grammar are constant, while venue, palette and time of day change.

---

## H. Reusable environment library we should build

> **This whole section is a proposal.** It is not a description of the references. It translates the
> measured rules above into a buildable system for our Remotion/three stack. The aim is many
> stories from one kit, not one town.

### H.1 Design principles

1. **A set is a stage, not a place.** Every set is assembled from layers: ground, shell, dressing,
   backdrop, light, atmosphere, camera. A shop, a throne room and a laboratory share the same floor,
   wall and light machinery.
2. **Reuse by skin, not by duplication.** One wall module becomes plaster, timber, clapboard, stone
   or metal by swapping material and proportion. One street becomes western, medieval, industrial or
   modern by swapping facade skins, props and signage.
3. **Time of day is a preset, not an asset.** Build every venue once; light it four ways.
4. **Three depths, always.** Foreground framing layer, middle-ground playable stage, background
   backdrop/haze. This is the composition contract.
5. **One dominant material + one accent per set.** Keeps sets readable and prevents visual noise.
6. **Props carry the story.** Architecture provides a believable box; props and signs provide the
   joke and the specificity.
7. **Everything is data-driven and seeded.** Layouts, prop scatter, crowd placement and facade
   variation come from a seed so sets can be regenerated and varied without hand-modelling.

### H.2 The layer model

| Layer | What it contains | Reuse |
|---|---|---|
| **L0 Ground** | flat slab, dirt, sand, grass, snow, water, road, track, floorboards, rubble | swap material + decals + slope |
| **L1 Shell** | modular walls, openings, roofs, columns, arches, stairs, railings, counters, ceilings | snap to a 2.5 m grid; skin + proportion parameters |
| **L2 Dressing** | furniture, machines, tools, containers, signs, lamps, small props | prop kit, 3 detail tiers |
| **L3 Backdrop** | skyline, hills, tree line, sea horizon, distant landmark, cloud sprites | 2D/3D hybrid, always hazed |
| **L4 Light** | 4 presets + local practicals + window shafts + emissive sources | preset + per-set override list |
| **L5 Atmosphere** | fog/haze, dust, snow, rain, embers, smoke, light shafts | particle/sprite cards + fog colour |
| **L6 Camera/FX** | camera rig, DOF table, foreground card, crowd, impact/effect cards | per-shot config |

### H.3 Venue archetypes to build

These cover the reference's venue range and generalise beyond it. Each is a parameterised builder,
not a fixed model.

| # | Archetype | Footprint / shell | Signature dressing | Default light | Typical camera |
|---|---|---|---|---|---|
| 1 | **Street / plaza** | 20–40 m long, two facade rows, open sky | lamps, signs, boardwalk, cart, barrels, crowd | day / golden / night | eye-level glide, 0.79× height |
| 2 | **Room** | 6–8 m box, 1–2 walls open, 3 m ceiling | couch/bed/desk/table + 3–5 wall props | interior / window / night | slow push-in, MS/FS |
| 3 | **Shop / counter** | 6 × 6 m, counter wall, display window | register, shelves, price tags, prize board | interior warm | counter-level MS, inserts |
| 4 | **Hall / casino / arcade** | 12 × 20 m, low ceiling, rows | machine banks, hanging lamps, token buckets | night / interior | dolly down a row, low angle |
| 5 | **Palace / court / temple** | 15 × 25 m, columns, dais, high ceiling | throne, hangings, braziers, jars, guards | golden / interior | wide symmetrical, slow crane |
| 6 | **Ship deck / harbour** | 10 × 20 m deck, masts, rails, sea plane | cannon, chest, ropes, lantern, crates | day / golden / storm night | low deck-level, swaying push |
| 7 | **Field / forest / coast** | 100 × 100 m ground, tree line, rocks | grass patches, flowers, fence, path | day / golden | wide, crane, EWS |
| 8 | **Road / track / desert** | long strip, fence, crowd rail | horse, cart, car, signs, dust | day / golden | tracking glide, side-on |
| 9 | **Workshop / forge / factory** | 8 × 10 m, heavy walls | anvil, furnace, tools, sparks, metal | interior warm + fire | low angle, insert-heavy |
| 10 | **Corridor / stairwell / lobby** | vertical connector, doors, windows | notices, lamps, handrail | interior / night | vertical tilt, follow |
| 11 | **Vehicle interior** | car/train/carriage cabin, windows | seats, handles, luggage, moving backdrop | day / night | handheld-free seated MS |
| 12 | **Diagram stage** | floating platform/void, graphic rings | body cutaway, map, chart, arrows | graphic / interior | flat-on, top-down, slow drift |
| 13 | **Miniature / diorama** | tabletop set under glass | tiny buildings, figures, button, scratches | interior lamp | macro push-in, top-down |

Minimum viable set for the next short: **1, 2, 3, 6, 7, 9** plus **12** if the explanation needs a
diagram.

### H.4 Parameterisation axes (the variety engine)

| Axis | Values |
|---|---|
| Era / skin | western, medieval, industrial, mid-century, modern, East Asian, fantasy |
| Palette | warm plaster, cool stone, aqua clapboard, saturated machine, violet night, green field |
| Light | day, golden, night, interior-warm, interior-cool |
| Weather | clear, haze, dust, snow, rain, storm, fog |
| State | new, worn, damaged, burning, flooded, abandoned |
| Crowd | 0, 3–5, 10–15, 30–50 (billboard clusters) |
| Scale | intimate (room), street, vista (EWS) |
| Season | spring green, dry summer, autumn, snow |

Combining archetype × skin × light × weather already produces several hundred readable variations
from one geometry kit.

### H.5 Module and prop inventory

**Structure modules**
- Wall run (2.5 m bay), corner, doorway, window bay, shopfront, arch, column, beam, ceiling panel.
- Roof: gable, hip, flat, shed, thatch, cone, tower cap.
- Vertical: stair flight, landing, ladder, balcony, railing, fence, gate.
- Ground: slab, boardwalk, kerb, step, platform, bridge deck, quay edge.
- Interior: counter, bar, shelf wall, partition, curtain, door, window seat.

**Prop kit (3 tiers: hero / mid / background silhouette)**
- Seating: chair, bench, stool, couch, bed, throne.
- Tables: dining, desk, counter, workbench, operating table.
- Storage: crate, barrel, chest, cabinet, locker, safe, vault, shelf.
- Commerce: register, ticket roll, price cards, display stand, prize board, ATM.
- Machines: slot, pachinko, press, loom, engine, furnace, computer terminal.
- Tools: hammer, anvil, tongs, shovel, spear, sword, rifle, cannon, rope, chain.
- Vessels: pot, pan, bowl, bottle, jar, bucket, basket, cup.
- Food: bread, fish, fruit, broth, beer.
- Lighting: street lamp, lantern, sconce, bare bulb, candle, brazier, fire, window glow.
- Signage: hanging sign, wall sign, poster, billboard, notice board, price list, floor decal.
- Nature: tree (3 types), bush, grass patch, flower clump, rock (3 sizes), stump, log.
- Transport: ship hull/deck/mast, rowboat, cart, carriage, car, truck, horse.
- Personal/story: phone, letter, cheque, ticket, photograph, key, coin, ring, map.

**Backdrops**
- City skyline (3 densities), industrial skyline, hills, mountains, cliffs, tree line, sea horizon,
  desert mesas, cloud banks, stars/moon.

**Crowd**
- Billboard clusters with 4 behaviours: still formation, walk-past, gathered/murmuring, seated.
  Keep them still during camera moves; animate only the featured character.

### H.6 Materials and palette system

Build one material library, parameterised by a palette entry:

| Material | Parameters |
|---|---|
| Planks | 3–5 board fills, gap colour, gap width, nails, knots, lip light/shade |
| Stone | 4 block fills, mortar colour/width, bevel, speckles, cracks |
| Plaster | base, blotch, plinth, trim, crack density |
| Clapboard | base, line colour, pitch |
| Roof | terracotta / slate / thatch / snow / metal; tile pitch, no per-tile ink |
| Metal | base, bright band, dark floor ≥ L\* 19 |
| Grass | base, patches, tuft density, flower palette |
| Sand/dirt | base, pebble density, shadow tint |
| Water | near/mid/far gradient, crest/trough/glint, mark density by distance |
| Sky | 4 stops by elevation + horizon colour used for fog |
| Cloud | 3 tones + optional rim |

Every painter is procedural Canvas2D, tiles seamlessly, and targets the measured screen values
(sunlit wood L\* 72–80, stone L\* 60–75, iron ≥ L\* 19, grass L\* 66, sky C\* ≥ 45 day / ≥ 40
golden, painted seams 3–5 px at 1080).

### H.7 Set grammar and camera integration

Each set definition includes:

- **Stage:** ground material, shell modules, dressing list, backdrop, weather.
- **Light:** preset + local practicals (positions, colours, radii).
- **Camera rig:** default height 0.79× character, FOV 34–46°, horizon 0.45, eye-level unless the
  beat needs high/low.
- **DOF:** `cInf` by shot size (12–14 px CU/MS inserts, 8 FS, 5 WS, 0 establishing), focus on eyes.
- **Foreground card:** optional near prop at 0.3–0.5× focus distance, covering 10–25 % of an edge.
- **Crowd:** density and behaviour.
- **FX:** effect cards and local atmosphere.

A set should expose **camera marks** (where a character can stand, where a medium shot frames them,
where an insert lands) so the shot planner does not fight the geometry.

### H.8 Authoring format

Keep it in TypeScript data, next to the story:

```ts
type SetDef = {
  id: string;
  archetype: "street" | "room" | "shop" | "hall" | "palace" | "ship" | "field" |
             "road" | "workshop" | "corridor" | "vehicle" | "diagram" | "diorama";
  skin: "western" | "medieval" | "industrial" | "midcentury" | "modern" | "eastasian";
  palette: string;
  light: "day" | "golden" | "night" | "interiorWarm" | "interiorCool";
  weather?: "clear" | "haze" | "dust" | "snow" | "rain" | "storm" | "fog";
  state?: "new" | "worn" | "damaged" | "burning" | "flooded" | "abandoned";
  seed: number;
  modules: ModuleSpec[];
  props: PropSpec[];
  practicals: LightSpec[];
  crowd?: { n: number; behaviour: "still" | "walk" | "gather" | "seated" };
  marks: { stand: V3; ms: V3; insert?: V3 };
};
```

Builders return a `THREE.Group` plus metadata for sight-line culling (the reference reports warn
about cameras ending up inside houses) and shadow flags.

### H.9 Build order

1. **Materials + painters.** The eleven surface families above, with acceptance checks against the
   measured screen colours.
2. **Stage + light presets.** Sky (4 stops), fog = horizon, four light presets, shadow logic,
   vignette/grade.
3. **Six core archetypes.** Room, street, shop/counter, field, ship deck, workshop.
4. **Prop kit, first 40 items.** The ones that appear across the reference's stories: table, chair,
   counter, shelf, crate, barrel, chest, bucket, pot, lamp, lantern, sign, door, window, fence,
   cart, cannon, anvil, forge, machine bank, desk, bed, couch, phone, papers, tools.
5. **Backdrops and atmosphere.** Skyline, hills, sea, clouds, haze, snow, dust, light shafts.
6. **Crowd + FX cards.** Still formations, walk-past, effect sprites.
7. **Second wave of archetypes.** Palace, hall/casino, corridor, vehicle, diagram, diorama.
8. **Validation pass.** Render a test still per archetype × light, measure against the targets.

### H.10 Acceptance checks

| Check | Target |
|---|---|
| Ink | ~3 px at 1080, #0b0a0c, on silhouettes/creases/contacts only, none on characters |
| Day shadow | ~0.5× lit, keeps hue, slightly more saturated |
| Golden shadow | blue-violet, B ≈ 2.8–3.0× lit B on sand |
| Sky | pale horizon, C* ≥ 45 day / ≥ 40 golden at frame top, no grey midband |
| Wood in sun | L\* 72–80, C\* 35–55 |
| Stone in sun | L\* 60–75, C\* ~10 |
| Iron | never below L\* 19; broad bright band |
| Painted seams | 3–5 px at 1080; thinner and half the contrast of the ink |
| Characters | 3.5 HH, head V 0.97, no blush/catchlights, blob shadow |
| Depth | DOF on ~1/3 of shots; background blur 12–14 px CU/MS; foreground 15–24 px |
| Camera | glide 18–40 f, peak ≤ 25 px/f, creeping holds, 4–5° rolls, no handheld float |
| Composition | horizon 0.45, foreground object in ~1/3 of MS/CU, near-wall background preferred |
| Grade | p50 ≈ 0.57 day / 0.52 golden / 0.24 night / 0.45 interior; corner/centre 0.86 / 0.75 / 0.46 / 0.67 |

---

## I. Missing information and things needing closer inspection

### I.1 What was actually inspected

- **Read in full:** `SKILL.md`, `references/STYLE_BIBLE.md`, `references/reports/CONTEXT.md`,
  `characters.md`, `depth.md`, `grade.md`, `lighting.md`, `motion.md`, `outlines.md`,
  `textures.md` (sections 0–5.6 and caveats; the code appendix only skimmed).
- **Opened, decoded and measured, but not viewed:** all **20** contact sheets
  (`short01_sheet.jpg` … `short20_sheet.jpg`), each 1,800 × 1,920 px, 10 × 6 tiles of 180 × 320 px
  = **1,200 frames**; all **38** frames at their package size of 540 × 960. Short 15 and short 17
  have no `_0180` frame in the package, which is why there are 38, not 40. Pillow opened and
  decoded every file without error; the Windows viewer is available, but I did not call it and
  cannot see its output.
- **Computed by me [C]:** per-frame and per-tile luminance, percentiles, saturation, dark/bright
  fractions, sky/green/warm/sand fractions, edge energy, distinct-colour counts, and vertical
  band palettes; dimensions and file sizes for the inventory.
- **OCR [O]:** every tile and frame through the local Windows OCR engine.
- **Not opened at all:** the reference videos themselves, and every analysis folder the reports
  cite (`vids/`, `measure/`, `characters/`, `depth/`, `grade/`, `lighting/`, `motion/`,
  `outlines/`, `textures/`, `tx/`, crops, CSVs, `labels.csv`). They are absent from this package
  copy.

### I.2 What is missing from the package

- The 20 source videos (720 × 1280, 30 fps) — so no motion, blink, mouth, cut or rack-focus
  measurement can be reproduced here.
- The full per-short contact-sheet sets. The package has **one 2 s sheet per short**, so it covers
  only the opening two seconds, not the whole film.
- The study frames used for the 67-frame lighting table, and `data/labels.csv`, which is the only
  way to map a scene label (`d01`, `s02`, `n06`, `i10`) to a short and a timestamp.
- Transcripts (`tx/`), the earlier summary sheet (`refs_sheet.jpg`), and the comparison crops and
  side-by-sides referenced throughout the reports.
- Any per-location frame counts. The grade report gives per-short class counts, not per-venue
  counts, so the venue frequencies in C.3 are derived from the opening text, the 6 s frames and the
  reports — not from a full census.

### I.3 Claims that need visual confirmation

Because I could not display the images, these points are inferred from text/statistics and should
be checked by a person or a vision-capable model against the sheets and frames:

1. **Venue identification.** Captions and signage strongly imply the venues in C.2, but “ship
   galley” vs “ship deck”, “palace” vs “temple”, “shop” vs “casino” should be confirmed visually.
2. **Architectural style per short.** The reports give facade/roof material samples, not a full
   inventory of building types. Whether a street is timber-framed, plastered or clapboard, and how
   many storeys, is not fully known.
3. **Which scenes belong to which short.** The lighting report's `d/s/n/i` IDs cannot be mapped
   without `labels.csv`.
4. **Weather frequency.** Storm, snow and fog are each evidenced at least once; how often they occur
   across all 20 shorts is unknown.
5. **Crowd sizes and behaviour.** The reports give examples (a plaza crowd, a soldiers' formation)
   but not counts per scene.
6. **Prop counts and dressing density.** Not measured. My prop list is an inventory of *types*
   evidenced, not a count.
7. **Interior ceiling and wall treatment.** Interiors are described by light and props; ceiling
   height, wall finishes and window placement per venue are not measured.
8. **Foreground prop identity.** The reports name rail post, chain, flag, shoulder, hat, slot
   machine and cat as examples; the full vocabulary is unknown.
9. **Vehicles.** Ships, horses, a milk cart and a car are evidenced; whether trains, bicycles or
   aircraft appear is unknown.
10. **Colour per venue.** The reports give material and light samples, not a palette per location.

### I.4 Closer inspection that would most improve the next build

1. **Watch all 20 videos once** (or have a vision model caption them) and tag every shot with
   venue, time of day, weather, shot size, foreground prop and transition. That produces the
   per-venue frequency table this package cannot provide.
2. **Build a venue × light matrix** from that pass: which archetypes appear in which light, and how
   often each is reused.
3. **Sample one clean frame per venue** and measure its palette, horizon height and background
   depth, to turn the archetypes in H into concrete targets.
4. **Inspect the snow, harbour, market, palace-interior and blacksmith scenes closely** — they are
   the least covered by the surviving material and the most useful for testing whether the library
   generalises beyond a town.
5. **Re-measure the sheets at full resolution** for foreground-object frequency, since my
   tile-level pass can detect colour and flatness but not reliably identify a blurred rail post.
6. **Confirm the two missing frames** (short 15 and short 17 at 6 s) if another copy of the package
   exists, and check whether the single sheet per short is always the opening 2 s.

### I.5 Review artefacts created for the visual pass

These are in `C:\MaxAnimation\cartoon-short\reference-previews\` and are **not** interpretations:
they are resized copies plus file facts, made so a reviewer can answer I.3 without touching the
originals.

| File | What it is |
|---|---|
| `index.html` | One page showing all 58 previews, grouped by short |
| `sheets/shortNN_sheet_preview.jpg` | 900 × 960 whole-sheet preview, 20 files (each tile 90 × 160) |
| `frames/shortNN_XXXX_preview.jpg` | 270 × 480 frame previews, 38 files |
| `INVENTORY.md`, `inventory.csv`, `inventory.json` | All 58 images: folder, pixels, bytes, grid, tile size, machine colour stats, raw OCR |
| `HUMAN_REVIEW.md` | Per-short checklist with the visual fields left blank |
| `review-form.csv` | The same fields, one row per short, for filling in |
| `README.md` | Method, provenance and how to review |

Pillow 13.0.0 opened and decoded all 58 images. The package originals were read only; their bytes
are unchanged.

---

## Source log

Every file below lives in the private reference package
(`C:\Users\anas\Desktop\YT\claude-animated-shorts-main (1)\claude-animated-shorts-main`)
unless marked otherwise. "Read" means the text was read in full; "measured" means numbers were
extracted computationally; "not viewed" applies to every image.

| File / set | Use |
|---|---|
| `SKILL.md` | Pipeline, final look values, user rules, readability traps |
| `references/STYLE_BIBLE.md` | Format, script formula, picture rules, camera/editing, effects |
| `references/reports/CONTEXT.md` | Study scope, reference inventory, stack |
| `references/reports/characters.md` | Head/body/face/outline measurements, animation interaction |
| `references/reports/depth.md` | DOF, haze, sky, bloom, shot mix, camera height, FOV |
| `references/reports/grade.md` | Per-class tone/colour/vignette, per-short class counts, black point |
| `references/reports/lighting.md` | 67-frame key-light table, shadow ratios, glows, two-tone recipe |
| `references/reports/motion.md` | Camera grammar, character animation, crowd behaviour |
| `references/reports/outlines.md` | World-ink coverage, width, technique |
| `references/reports/textures.md` | Surface palettes, line widths, water, sky, clouds, texel density |
| `references/sheets/short01–20_sheet.jpg` | 1,200 opening frames; palette/statistics/OCR (measured, not viewed) |
| `references/frames/shortNN_0060/0180.jpg` | 38 frames; detail + OCR (measured, not viewed) |
| `README.md` | Package contents and limitations |
| `C:\MaxAnimation\cartoon-short\reference-previews\` | 58 downscaled previews + inventory + blank review forms, written by me; originals untouched, no image viewed |

*End of report.*
