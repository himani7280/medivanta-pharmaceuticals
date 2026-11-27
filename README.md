# MediVanta Pharmaceuticals

Next.js + Tailwind + Framer Motion landing page (same structure as the other projects).

- `npm install` then `npm run dev`
- All text and the Google Fonts link live in `data/data.json`
- Images are built by `scripts/build-images.js` (`node scripts/build-images.js`): Unsplash photos are cropped to
  `public/images`, and `scripts/source/logo-source.png` becomes the transparent logo (+ white footer logo).
  Overwrite files in `public/images` with the same names to use your own photos.
