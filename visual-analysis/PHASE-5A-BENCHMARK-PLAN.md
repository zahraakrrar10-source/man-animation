# PHASE-5A — Visual Benchmark Shot Plan (first 3 shots from Bible §18)

**Project:** `C:\MaxAnimation\cartoon-short`  
**Bible:** `C:\MaxAnimation\cartoon-short\visual-analysis\VISUAL-ART-DIRECTION-BIBLE.md`  
**Goal:** Evolve the rendering system to reproduce the bible's visual language across many stories/environments — NOT to make BridgeShort the final product.  
**Scope:** Shots 1–3 of §18 only. Do not modify source files yet. Do not commit. Do not start Phase 5 audio.

---

## 1. Files inspected

| File | Role |
|------|------|
| `visual-analysis/VISUAL-ART-DIRECTION-BIBLE.md` | Authoritative visual reference (§1–§19) |
| `src/videos/bridge/Bridge.tsx` | Composition entry, post chain, toggles |
| `src/videos/bridge/world.ts` | 3D scene, sky/river/banks/town/bridge, cast posing, light setup |
| `src/videos/bridge/story.ts` | Shot timeline, DOF table, camera paths, FOREGROUND props |
| `src/videos/bridge/lights.ts` | Light presets (day/golden), world look |
| `src/videos/bridge/shade.ts` | Two-tone world lighting shader (TWO_TONE), untone() |
| `src/videos/bridge/cardshade.ts` | Character card shading (GRAD_K, TINT_K, warm rim) |
| `src/videos/bridge/cast.ts` | Character sprites, pool, stage(), effects |
| `src/videos/bridge/toon.ts` | 2D drawing primitives (Pen, soldier, OFFICER, KID, PARENT, fx*) |
| `src/videos/bridge/ink.ts` | Ink outlines pass (NOINK layer, edge mask, crease) |
| `src/videos/bridge/lensblur.ts` | Thin-lens DOF (pre + main passes), grain |
| `src/videos/bridge/grade.ts` | Colour grade presets (GRADE_DAY2, GRADE_GOLDEN2) |
| `src/videos/bridge/build.ts` | Static scenery batches, Kenney prop loader, materials |

---

## 2. Current capabilities we already have

| Capability | File(s) | Notes |
|------------|---------|-------|
| Post chain: Ink → DOF → Bloom → Tone → Grade → Grain | `Bridge.tsx` | MSAA 4, output-size-scaled pixel params |
| Ink outlines on world only | `ink.ts` | Depth/normal-based, crease detection, log-distance width scaling, fog-tinted |
| Thin-lens DOF | `lensblur.ts` | 16-tap pre + 64-tap main + 32-tap near, occlusion rules, maxCoC clamp |
| Colour grade | `grade.ts` | Hermite tone curve, sat/tint/vignette, per-shot day/golden presets |
| Two-tone world lighting | `shade.ts`, `world.ts` | albedo × mix(shadeCol, litCol, sunTerm), sunVis from shadow map |
| Character card shading | `cardshade.ts`, `cast.ts` | Scene tint, bright floor, side gradient toward sun, warm rim (golden only) |
| Character sprite pool | `cast.ts`, `toon.ts` | 7 head shapes × 4 outfits = 28 combos, yaw-only billboards, contact blobs |
| Kenney prop loading | `world.ts`, `build.ts` | 26 GLBs, recolored to Lambert materials |
| Painted canvas textures | `paint.ts` | Grass, cobble, stone, planks, water, brick, chain, cloud, facade, roof |
| Shot timeline + DOF + camera | `story.ts` | 15 shots, 2025 frames, dofAt(), focusAt(), camAt() |
| Foreground props | `story.ts` FOREGROUND | Cart + bush, sight-line-tested against center ray |

---

## 3. Missing visual systems (per bible §16 gap list)

| Gap | Bible ref | Why it matters for the 3 benchmark shots |
|-----|-----------|------------------------------------------|
| **Practical light glow** (lantern, candle, fire) | §2 rule 8, §16.1#2 | Shot 3 needs a single lantern glow doing narrative work; current system has no emissive practicals with bloom-driven glow |
| **Night light preset** | §2.3 table | Shot 3 is night; only day/golden exist in `lights.ts` |
| **Low/tilted close-up camera** | §2 rules 1, 10; §16.1#1 | Shot 1 is a deadpan close-up; current cameras are eye-level glides |
| **Raking shadow direction control** | §2 rule 8 | Shot 2 needs low sun angle casting long shadows across planks |
| **Outline hierarchy (world ink on set)** | §2 rule 5, §16.1#3 | Bible says outlines are thinner on set, none on sky/water — current ink pass covers world but needs per-material width tuning for close-ups |
| **Fog/haze depth cue** | §2 rule 8, §17#7 | Shot 3 needs fog horizon; fog exists in LOOK but only day/golden colors |
| **Palette separation (costume vs set)** | §2 rules 7, 12; §17#4 | None of the 3 shots can be checked without a per-scene hue assignment system |
| **Caption lane** | §2 rule 11, §17#8 | Not part of the 3D scene but needed for readability checks |
| **Legible story props with text** | §2 rule 12, §17#9 | Shot 1 needs a pot with visible content; shot 2 needs deck planks readable |

---

## 4. Proposed reusable systems (implement once, reuse across shots/stories)

| System | Description | Where it lives | Reuse across stories |
|--------|-------------|----------------|---------------------|
| **Light preset registry** | Named presets (day, golden, night, interior) with sun az/el, lit/shade/lift, fog colors, practical glow color/intensity | `lights.ts` (extend `LIGHTS` with `night`) | Every story picks a preset per shot |
| **Practical light component** | Emissive mesh (lantern/candle/fire) + bloom trigger, color-tinted glow that defocuses with DOF | New file or `world.ts` | Any scene with a practical source |
| **Per-scene palette assignment** | dominantHue + accentHue per shot, applied to world materials and character costume | New config or `story.ts` ShotDef extension | Every story defines its own palette |
| **Camera rig presets** | closeUp(), twoShot(), wideNight() — position/yaw/pitch/fov per shot type | `story.ts` camAt() extension | Reusable shot templates |
| **Outline width profile** | Per-material ink width (character 3px, hero prop 2px, set 1px, sky/water 0) | `ink.ts` InkOptions per material | Every story reuses the same hierarchy |
| **Contact shadow / ground darkening** | Soft multiply blob under characters on ground plane | `cardshade.ts` blobMaterial (exists, extend) | Every scene with characters on ground |

---

## 5. Exact implementation order for the 3 benchmark shots

### Shot 1 — Deadpan close-up with large cropped foreground prop (pirate chef with pot)

**Reused systems:**
- Character sprite pool (`cast.ts`, `toon.ts`) — pirate chef outfit exists as OFFICER/RIFLEMAN variant
- Ink pass (`ink.ts`) — character outline at full width
- Post chain (`Bridge.tsx`) — no changes needed
- DOF (`lensblur.ts`) — focus on eyes, cInf ~12-14

**Missing / to add:**
1. **Close-up camera** — new `camAt()` branch: fov 34-36, eye-level at character head height, tilted 5-8°, position 2-3 m from subject
2. **Foreground prop** — cropped pot/rail in lower third covering 10-25% of one frame edge (reuse `FOREGROUND` mechanism in `story.ts`)
3. **Directional key light** — sun az ~75°, el ~48° (day preset exists), but character face needs to be brightest value (§17#1)
4. **Costume vs set hue separation** — pirate chef toque/costume vs pot/set (new per-scene palette assignment)

**Exact changes:**
- `story.ts`: Add ShotDef entry for close-up shot type; add `camAt()` close-up branch; add FOREGROUND entry for cropped pot
- `lights.ts`: No new preset needed (day works), but ensure `charTint` keeps face clean at ~0.96 V
- `cardshade.ts`: Verify warm rim (golden) or side gradient (day) keeps face readable at close range
- `ink.ts`: Verify outline width ~5.1 px at 1080p for character, thinner for pot

### Shot 2 — Two-shot on a plank deck with raking shadows

**Reused systems:**
- Plank deck texture (`paint.ts` `planksHD`)
- Two character sprites side by side (`cast.ts` `stage()`)
- Two-tone lighting (`shade.ts`)
- Ink crease detection (plank seams)

**Missing / to add:**
1. **Raking shadows** — low sun angle (el ~10-15°) casting long shadows across planks; need shadow map bias/normalBias tuned for long shadows
2. **Contact shadows** — characters cast soft blobs on planks (`cardshade.ts` `blobMaterial` exists)
3. **Plank seam ink** — crease detection already in ink pass; verify width ~2.2-3.4 px

**Exact changes:**
- `lights.ts`: Add low-sun variant (az ~10-15°, el ~12°) to existing day preset or new `raking` variant
- `world.ts`: Ensure plank deck geometry receives shadows (cast/receive)
- `story.ts`: Two-shot camera: eye-level, fov ~40, characters at 1.5-2 m separation, looking slightly inward

### Shot 3 — Night wide shot with single lantern glow and fog horizon

**Reused systems:**
- Fog (`lights.ts` LOOK.fog, `world.ts` scene.fog)
- DOF (`lensblur.ts`) — wide shot, cInf ~0-2 (sharp), fog provides atmospheric depth
- Bloom (`Bridge.tsx` `makeBloom()`) — emissive glow for lantern

**Missing / to add:**
1. **Night light preset** — dark fog (#1a1a2e or similar), low sun el, cool shade, warm practical glow
2. **Practical lantern** — emissive mesh with bloom, positioned in scene, glow color warm (#ffcf9e or similar)
3. **Fog horizon** — fog color matches night sky, fogNear/fogFar tuned for wide shot
4. **Dark areas not dead black** (§17#10) — night fog + bounce light keeps shadows readable

**Exact changes:**
- `lights.ts`: Add `night` LightPreset (az 45°, el -5°, lit [0.6,0.55,0.7], shade [0.05,0.05,0.15], fog "#1a1a2e", sunDisc "#ffcf9e")
- `world.ts`: Add practical lantern mesh (emissive material, positioned per shot), night fog setup
- `story.ts`: Add night light to ShotDef; wide camera fov ~30, high angle looking down slightly
- `grade.ts`: Night grade preset (stronger vignette, cooler shadows)

---

## 6. Acceptance checklist (§17) → concrete visual checks for rendered frames

| # | Bible check | Concrete measurement / visual check |
|---|-------------|-------------------------------------|
| 1 | One focal subject, white face brightest value | Sample face region luminance > set regions; face is local max |
| 2 | Foreground element in lower third adds depth | Object occupying bottom 25-33% of frame, occluding set behind it |
| 3 | Outline hierarchy visible | Character outline ~3px at 1080p, hero prop ~2px, set ~1px, sky/water 0 |
| 4 | Costume hue contrasts with set hue | Sample character costume color vs dominant set color; Δhue > 45° |
| 5 | One directional key light + at least one cast shadow | Shadow map visible on ground/walls; light direction consistent |
| 6 | Character head/torso picks up scene colour | Sample character lit side matches scene light tint |
| 7 | Hazy simplified background layer | Far background has lower contrast, fog-tinted, detail reduced |
| 8 | Caption lane (65-75% height) calm | No high-contrast detail in bottom quarter band |
| 9 | At least one legible story prop with text | Prop with readable markings (pot design, plank stamp, lantern glass) |
| 10 | No more than ~20% dead black | Sample frame: pixels with all channels < 0.05 ≤ 20% |
| 11 | Reads at thumbnail size | Downscale to 270×480, subject and foreground still distinguishable |

---

## 7. Uncertainties and assumptions

1. **Set C (flat vector headless-chicken) is NOT confirmed as BridgeShort** — the bible explicitly marks this as an assumption (§0, §16.1). The plan treats BridgeShort as a separate 3D-toon look (Set A/B family), using §16.2 generic checklist where Set C-specific guidance doesn't apply.

2. **Character design difference** — Bible §3 describes capsule/pill torso, oversized round white head, stick limbs (4.5-5 heads tall). Current BridgeShort characters use different proportions (600×1000 design card, different head/body ratio). The benchmark shots will use existing BridgeShort character assets, not redesign them to match Set A exactly.

3. **Practical light implementation** — No existing emissive practical light system in BridgeShort. The plan assumes bloom (`makeBloom()`) can drive lantern glow, but a dedicated emissive mesh component needs to be added.

4. **Night fog color** — The bible doesn't specify exact night fog values; the plan proposes `#1a1a2e` as a starting point to be tuned on renders.

5. **Shot duration** — Reference shots run 2-4 s (60-120 frames at 30 fps); BridgeShort shots are 4.3-9.4 s. The benchmark shots should use reference-style shorter durations.

6. **No Phase 5 audio** — This plan explicitly excludes audio work per the constraints.

---

**Stopping here.** Awaiting your approval before any source files are modified.
