# Visual review uploads

This folder contains selected rendered outputs for direct visual review.

## Pompeii

Upload review images here after rendering locally. Use descriptive names, for example:

- `opening-frame.png`
- `shot-01-frame-060.png`
- `shot-02-frame-090.png`
- `final-frame.png`

For each review round, upload only a few representative PNGs (opening frame, key story beats, and any frame that looks wrong). Do not upload full render sequences or thousands of intermediate frames unless explicitly requested.

After copying images into this folder, run:

```powershell
git add visual-reviews/pompeii
git commit -m "Add Pompeii visual review renders"
git push origin HEAD:main
```

The images will then be visible in the GitHub repository, and I can inspect them directly from the repo in a follow-up.
