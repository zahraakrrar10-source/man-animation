# Integration Report — `cartoon-3d-short` → `C:\MaxAnimation\cartoon-short`

> Inspection only. No project files were modified, installed, generated, or deleted.
> The only file created is this report.

---

## 0. Subject of inspection

| Item | Value |
| --- | --- |
| Target project | `C:\MaxAnimation\cartoon-short` |
| Skill package inspected | `C:\Users\anas\Desktop\YT\claude-animated-shorts-main (1)\claude-animated-shorts-main` |
| Skill name (from `SKILL.md` frontmatter) | `cartoon-3d-short` |
| Package location | **Outside** the workspace |
| Package composition | `BridgeShort` — 1080×1920, 30 fps, `TOTAL = 2025` frames (67.5 s) |

> ⚠️ The package is **not** inside this project. Only the Desktop copy was found. If a different copy was intended, point to it before integrating.

---

## 1. Can the package be integrated directly?

**Not as-is — but it is close.** The bridge template is a self-contained Remotion
composition, and the code is compatible in principle. Four things block a
copy-paste integration:

1. **Missing 3D dependencies** in `package.json` (three, R3F, postprocessing, `@remotion/three`).
2. **Missing GLB assets** — `public/bridge/kenney/` does not exist.
3. **Missing audio inputs** — `voice/voice.wav`, `voice/words.json`, generated `audio/mix.wav`.
4. **Not registered** — `src/Root.tsx` only declares the blank `MyComposition`.

There is also one **build-mode mismatch** to be aware of (rspack vs. webpack), described in §6.

Everything else — component structure, `world.ts` scene loader, `story.ts` timeline/cameras/DOF,
`Bridge.tsx` entry — is portable with a folder move and one registration line.

---

## 2. What exists in the package

### 2.1 Composition source — `templates/bridge/` (13 files)

| File | Role |
| --- | --- |
| `Bridge.tsx` | Integration entry. Exports `BridgeShort` and `BRIDGE_FRAMES`. Contains hardcoded `<ThreeCanvas width={1080} height={1920}>`. |
| `world.ts` | Loads GLBs via `staticFile('bridge/kenney/*.glb')`; builds terrain, water, props, lighting rig. |
| `story.ts` | Bridge-specific timeline: shot list, camera paths, DOF settings, `TOTAL = 2025`. |
| `Characters.tsx` | 2D character billboards / ink-outline treatment. |
| `Scenery.tsx` | Environment dressing (vegetation, banners, water, sky). |
| `Lighting.tsx` | Cinematic light rig + postprocessing stack wiring. |
| `Outline.tsx` / outline helpers | Ink-line / edge pass. |
| `Camera.tsx` | Gliding camera rig driven by `story.ts`. |
| `Hud.tsx` (and remaining support files) | Overlay/typography/frame furniture. |
| supporting modules | Shared types, constants, math helpers. |

### 2.2 Supporting material

- `references/STYLE_BIBLE.md` — the visual contract (ink outlines, cinematic lighting, DOF, camera glide language).
- `references/reports/CONTEXT.md` — records the **known-good dependency stack**.
- `templates/scripts/bridge-stills.mjs` — still-frame QA renderer. Hardcodes composition ID `BridgeShort` and a Chrome path.
- `templates/audio/mix.py` — builds `audio/mix.wav` from `voice/voice.wav` + `voice/words.json`.
- `templates/audio/bridge_merge.py` — merge helper. ⚠️ Contains placeholder `ROOT = os.path.expanduser("your Remotion project")`; **must be edited** before use.
- Reference frames / contact sheets — **private study material**. Do not copy into `public/` and do not publish.

---

## 3. What is missing

### 3.1 Dependencies

Current `package.json` has Remotion `4.0.539`, React `19.2.3`, and **no** Three.js stack.

Required (pinned — versions from `CONTEXT.md`, adjusted so `@remotion/three` matches the installed Remotion exactly):

| Package | Version | Note |
| --- | --- | --- |
| `@remotion/three` | `4.0.539` | **Must match Remotion exactly.** |
| `three` | `0.175.0` | Reference-tested version. |
| `@types/three` | `0.175.0` | Dev dependency. |
| `@react-three/fiber` | `9.1.2` | React 19–compatible. |
| `@react-three/postprocessing` | `3.0.4` | Reference-tested. |
| `postprocessing` | `6.37.2` | Must pair with the R3F wrapper above. |

> The reference stack was proven on Remotion `4.0.290`. We are on `4.0.539`.
> Only `@remotion/three` is version-locked to Remotion; the three/R3F/postprocessing line
> is independent but is the combination validated by `CONTEXT.md`.

### 3.2 Assets — `public/bridge/kenney/`

`world.ts` expects GLBs at `staticFile('bridge/kenney/*.glb')`. `public/` is currently **empty**.

The composition actually uses **11** models:

```
lantern.glb
cart.glb
stall-red.glb
stall-green.glb
stall-bench.glb
windmill.glb
canoe.glb
lily_large.glb
flower_redA.glb
flower_yellowA.glb
flower_purpleA.glb
```

Notes:
- The other ~15 names referenced by the skill are either **procedural vegetation/banners** or **unused**.
- `loadKit()` **silently skips** missing files, so the scene will still render — just emptier. Missing assets degrade the result rather than crash it.
- Fantasy Town Kit models likely also need `public/bridge/kenney/Textures/colormap.png`.

### 3.3 Audio inputs

- `voice/voice.wav` — narration. **Absent.**
- `voice/words.json` — word timings. **Absent.**
- `audio/mix.wav` — generated output. **Absent** (produced by `mix.py`).

Without these, the video renders silent and any word-synced timing falls back to defaults.

### 3.4 Registration

`src/Root.tsx` registers only `MyComposition`. `BridgeShort` must be added.

---

## 4. What the current project looks like

| File | State |
| --- | --- |
| `package.json` | Remotion `4.0.539`, React `19.2.3`, no 3D deps. |
| `src/Root.tsx` | Single blank `MyComposition`. |
| `src/Composition.tsx` | Starter placeholder. |
| `src/index.ts` | `registerRoot`. |
| `remotion.config.ts` | `Config.setRspack(true)` — **rspack bundler enabled**. |
| `tsconfig.json` | Standard Remotion TS config. |
| `public/` | Empty. |
| Git | Repo initialized, **no commits yet**; starter files are staged. |

---

## 5. How to connect the bridge code

1. **Copy the composition**
   `templates/bridge/` → `src/videos/bridge/`

2. **Register it** in `src/Root.tsx`:

   ```tsx
   import { BridgeShort, BRIDGE_FRAMES } from './videos/bridge/Bridge';

   <Composition
     id="BridgeShort"
     component={BridgeShort}
     durationInFrames={BRIDGE_FRAMES}
     fps={30}
     width={1080}
     height={1920}
   />
   ```

   `Bridge.tsx` already exports both symbols, so no edits to the composition are needed for a first smoke test.

3. **Assets** → place the 11 GLBs (+ `Textures/colormap.png`) in `public/bridge/kenney/`.

4. **Audio** → place `voice/voice.wav` + `voice/words.json` at project root, then run `templates/audio/mix.py` to produce `audio/mix.wav`.

5. **Still renderer** → `templates/scripts/bridge-stills.mjs` already targets `BridgeShort`, but its **Chrome path is hardcoded**; update it if Chrome moves. See §6 for the bundler caveat.

---

## 6. Main reproducibility risk: rspack vs. webpack

- `remotion.config.ts` sets `Config.setRspack(true)` → **Studio and CLI render with rspack**.
- `bridge-stills.mjs` uses `@remotion/bundler` directly → **webpack**.

These are two different bundlers. A composition that works in one can fail in the other
(specifically around GLB/asset handling and Three.js module resolution).

**Mitigations (in order of preference):**

1. Validate with **Studio** first (rspack) — that is the path the final render uses.
2. If stills are needed, either render via `remotion still` (respects `remotion.config.ts`) or
   temporarily disable rspack while using `bridge-stills.mjs`.
3. Do not assume a passing still-render proves the final render will pass, or vice versa.

---

## 7. Safest step-by-step integration plan

### Phase 0 — Protect the baseline
1. Confirm the Desktop package is the intended `cartoon-3d-short` copy.
2. Commit the current Remotion starter as a known-good baseline **before** any change.
   (Repo has no commits; everything is staged.)

### Phase 1 — Dependencies only
3. Install the pinned stack (§3.1) with `npm.cmd` (on this machine `npm.ps1` is blocked by
   PowerShell execution policy).
4. Run a TypeScript check. Confirm the starter composition still renders.
   **Do not add the bridge code yet** — isolate dependency risk from code risk.

### Phase 2 — Assets
5. Create `public/bridge/kenney/` and add the 11 GLBs + `Textures/colormap.png`.
6. Verify each file is reachable via `staticFile()` before touching composition code.

### Phase 3 — Code
7. Copy `templates/bridge/` → `src/videos/bridge/`.
8. Register `BridgeShort` in `src/Root.tsx` (§5.2).
9. TypeScript check + Studio launch. Fix import/path issues only; **do not restyle yet**.

### Phase 4 — Smoke test
10. Render a handful of stills at **scale `0.5`**, at key timeline points
    (e.g. frames 0 / 300 / 700 / 1100 / 1500 / 1900 / 2024).
11. Check: scene loads, characters visible, ink outlines present, DOF active, camera glides,
    no missing-model holes.

### Phase 5 — Timing / audio
12. Add `voice/voice.wav` + `voice/words.json`.
13. Edit the `ROOT` placeholder in `bridge_merge.py`, then run `mix.py`.
14. Confirm audio length matches `2025` frames @ 30 fps (67.5 s).

### Phase 6 — Full render
15. Full render at `--scale 0.5` first as a motion/continuity check.
16. Only then final 2K export: `--scale 1.3333` → 1440×2560.

### Rollback
Every phase is gated by a commit. If Phase 3 or 5 fails, revert to the Phase 2 commit and
the project remains a working Remotion install with assets in place.

---

## 8. Summary table

| Question | Answer |
| --- | --- |
| Direct integration? | **No** — but it is a 4-item gap: deps, assets, audio, registration. |
| Missing files? | 11 Kenney GLBs + `Textures/colormap.png`; `voice/voice.wav`; `voice/words.json`; generated `audio/mix.wav`. |
| Missing dependencies? | `@remotion/three@4.0.539`, `three@0.175.0`, `@types/three@0.175.0`, `@react-three/fiber@9.1.2`, `@react-three/postprocessing@3.0.4`, `postprocessing@6.37.2`. |
| How to connect? | Copy `templates/bridge/` → `src/videos/bridge/`; register `BridgeShort` in `src/Root.tsx`. |
| Safest plan? | Baseline commit → deps only → assets → code → 0.5-scale stills → audio → full render → 1.3333 export. |

---

## 9. Environment facts relevant to execution

| Item | Value |
| --- | --- |
| Chrome | `C:\Program Files\Google\Chrome\Application\chrome.exe` |
| ffmpeg | `C:\ffmpeg\bin\ffmpeg.exe` |
| Python | 3.13 — numpy 2.5.4, scipy 1.18.1, Pillow 13.0.0 |
| npm | Use `npm.cmd` (PowerShell blocks `npm.ps1`) |
| Git | No commits yet; starter files staged |

---

_End of report. No files other than `integration-report.md` were created or modified._
