# Reference review pack

This folder exists because the analysis report (`../REFERENCE_STYLE_AND_ENVIRONMENT_ANALYSIS.md`) was
written by an agent that **cannot see images**. The pack does not describe what is in the reference
pictures. It is a set of downscaled copies, file facts and blank forms so that a person can do the
visual pass.

> **No image in this pack has been visually inspected by the agent that built it.**
> Every description in the report is either text-derived (from `STYLE_BIBLE.md` / the reports),
> OCR, or a computed pixel statistic. See the evidence key at the top of the report.

## Source

Everything here is derived from the private study package at

```
C:\Users\anas\Desktop\YT\claude-animated-shorts-main (1)\claude-animated-shorts-main
```

- `references/sheets/` — 20 contact sheets, `short01_sheet.jpg` … `short20_sheet.jpg`
- `references/frames/` — 38 reference frames, `shortNN_0060.jpg` and `shortNN_0180.jpg`

The package was opened **read-only**. No original file was edited, moved or re-encoded, and nothing
was copied into this repo's `public/` folder. These previews are for private study; do not publish
them or reuse the reference footage, characters or shots.

## Pillow check (2026-11-02)

| Question | Result |
|---|---|
| Can Pillow open the images? | **Yes.** Pillow **13.0.0**, Python **3.13.0**. All **58** package images opened and decoded with zero errors. |
| Can Pillow display them? | `PIL.ImageShow` registers exactly one viewer, `WindowsViewer`, so `Image.show()` can put a file on a person's screen. |
| Did that let the agent see them? | **No.** The viewer draws to the local desktop; the model receives no image input. The harness's image reader also rejects image input. |
| What was used instead? | Decoding, dimensions, pixel statistics, edge/flat-colour counts, and Windows OCR. Plus this human-review pack. |

So the report contains **no** first-hand visual claims. It contains measured numbers, text-derived
claims and OCR, and it says which is which.

## What is in the pack

| Path | Contents | Size |
|---|---|---|
| `index.html` | Gallery of all 58 previews, grouped by short. Open this first. | — |
| `sheets/shortNN_sheet_preview.jpg` | One preview per contact sheet: the **complete** sheet at 900 × 960 (each of the 60 tiles is 90 × 160) | 20 files |
| `frames/shortNN_XXXX_preview.jpg` | One preview per reference frame at 270 × 480 | 38 files |
| `INVENTORY.md` | Human-readable inventory: file, pixels, grid, tile size, bytes | — |
| `inventory.csv` | The same as a table, plus machine colour statistics and raw OCR | 58 rows |
| `inventory.json` | Same data as JSON | 58 records |
| `HUMAN_REVIEW.md` | Per-short checklist split into the visual questions that matter | — |
| `review-form.csv` | The same questions as one row per short, for filling in | 20 rows |
| `README.md` | This file | — |

Totals: **58 preview images** across 20 sheets + 38 frames. The 58 **source** images total
**88.8 MP** and **18.11 MB**; the downscaled previews plus the index/forms occupy about
**7.2 MB**. The originals are much larger; use them when a preview is too small to read.

## How the previews were made

- Contact sheets: opened with Pillow, `Image.load()` to force a full decode, then
  `resize((900, 960), Image.LANCZOS)` and saved as JPEG quality 88, optimised. Aspect ratio is
  preserved exactly (1800 × 1920 → 900 × 960).
- Frames: the same pipeline at `resize((270, 480))`.
- No cropping, no letterboxing, no per-tile extraction — a preview always shows the **whole**
  source image, so nothing is silently dropped.

Because a sheet tile ends up at 90 × 160 px, fine detail (ink width, eye shape, seam width) is not
resolvable in the preview. For those questions open the untouched original.

## Machine-derived fields

`inventory.csv` / `inventory.json` include, per image:

| Field | Meaning |
|---|---|
| `width`, `height`, `bytes` | File facts |
| `frames`, `grid`, `tile_w`, `tile_h` | Grid layout (sheets: 10 × 6 = 60 tiles) |
| `mean_luma` | Mean relative luminance, 0–1 |
| `mean_sat` | Mean HSV saturation, 0–1 |
| `dark_frac` / `bright_frac` | Fraction of pixels with max channel < 0.18 / > 0.92 |
| `hex_top`, `hex_mid`, `hex_bottom` | Mean colour of the top 10%, middle 40–55% and bottom 10% bands |
| `ocr` | Raw Windows OCR text, joined. Often wrong. |

These are statistics, not interpretations. A high `dark_frac` does not tell you *what* is dark.

## How to review

1. Open `index.html` in a browser. It needs no server; the relative paths work from disk.
2. Read `HUMAN_REVIEW.md` for the priority questions (venue, storeys, weather, crowd size,
   foreground objects, vehicles, interiors, palette).
3. For each short, open the original sheet at full size when detail matters:
   `...\references\sheets\shortNN_sheet.jpg`.
4. Fill `review-form.csv` — one row per short. Use `?` for anything uncertain.
5. Keep OCR text out of the visual fields. It is machine transcription, not a description.

The highest-value questions, in order:

1. Venue per short (ship deck vs galley, palace vs temple, shop vs casino, bedroom vs other).
2. Architectural skin and storey count per set; roof types.
3. Which scene belongs to which short — the lighting report's `d/s/n/i` IDs cannot be mapped
   without the missing `labels.csv`.
4. Weather: how many shorts use storm, snow, fog, dust or rain.
5. Crowd sizes (0, 3–5, 10–15, 30–50) and whether crowds hold still.
6. Foreground framing objects and roughly what fraction of the frame edge they cover.
7. Visible vehicles.
8. Interior ceiling height, wall finish, window placement.
9. Dominant material and accent colour per set.

## Limitations

- **No visual verification happened.** Nothing in the report or this pack is a first-hand
  description of an image.
- The previews are lossy JPEGs. Colour-band values in the inventory were computed from the
  **originals**, not from the previews, so they are not degraded by the resize.
- Only the first 2 s of each short is in the sheets (60 frames at 30 fps), plus one frame at 2 s
  and one at 6 s where present. Shorts 15 and 17 are missing their `_0180` frame, so there are 38
  frames, not 40.
- The package's `vids/`, `measure/`, `characters/`, `depth/`, `grade/`, `lighting/`, `motion/`,
  `outlines/`, `textures/`, `tx/` folders, the crops/CSVs and `labels.csv` are **absent**, so the
  reports' underlying data could not be re-checked.
- OCR of stylised caption text is unreliable; treat `[O]` strings as leads, not facts.
