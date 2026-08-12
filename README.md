# HH Goa 2026 — Frame / Builder ID Generator

Mobile-first web tool for the HH Goa 2026 "Frame In Goa" task. Upload a photo, frame it as a **PFP** (1080×1080) or **Builder ID** (1080×1350), position it with the crop editor, then download the PNG or share to X with the mandatory `#FrameInGoa` caption.

Built with Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4. All image processing happens in the browser (canvas) — no uploads to a server. Branding matches hhgoa.com: Imbue + Victor Mono, HH Goa green, yellow, pink, off-white; official palm mark, Devanagari wordmark and favicon from the site.

## Features

- Drag / scroll / slider / arrow-key crop editing with "reset" and a head-biased default crop
- PFP Frame (1:1) and Builder ID (4:5) with name, stack/role, building, 36 curated builder titles + shuffle
- HEIC/HEIF support (heic2any fallback), 30 MB cap, auto downscale to 2000 px
- PNG export at 1080² / 1080×1350 with serial filename (e.g. `hhgoa-pfp-4821.png`)
- X share: opens the composer pre-filled; caption always contains `#FrameInGoa`; optional share-image upload via `POST /api/share` (graceful fallback if not configured)
- Fully client-side; no login; responsive 320px → 1920px; keyboard + ARIA-friendly

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
```

## Testing

Synthetic photos and the browser QA harness (needs Microsoft Edge on Windows):

```bash
node tools/make-test-images.mjs   # generates test-assets/*.png + fake.heic
npm run build
npm run start                     # production server on :3000
node tools/e2e.mjs                # 122 checks: formats, ratios, exports, X caption, errors, responsive
```

Screenshots land in `qa-shots/`. `tools/make-og.mjs` regenerates `public/og.png`.

## Deploy to Vercel

1. Push this folder to a GitHub repo (or use `vercel` CLI directly).
2. Import the repo at https://vercel.com/new — framework preset is auto-detected (Next.js).
3. Set environment variables (optional):
   - `NEXT_PUBLIC_SITE_URL` — your production URL, e.g. `https://hhgoa-frame.vercel.app`. Used for the share-image link in the tweet.
   - `BLOB_READ_WRITE_TOKEN` — create a blob store at https://vercel.com/stores/blob and paste its token. Without it the "share image link" is skipped automatically and the share still works (manual PNG attach or copied caption).
4. Deploy. The `/api/share` route is the only server code; everything else is a static page.

## Project structure

- `app/page.tsx` — single-page flow: landing → format → editor → (builder form) → result
- `lib/generatePfp.ts`, `lib/generateBuilderCard.ts` — canvas renderers
- `lib/canvasDraw.ts` — shared drawing helpers (zigzag strips, grid, brackets, text fitting, serials)
- `lib/imageProcessing.ts` — decode/HEIC/downscale
- `lib/xShare.ts` — caption building + `#FrameInGoa` enforcement + X intent
- `lib/titles.ts`, `lib/cropMath.ts`, `lib/canvasAssets.ts`, `lib/types.ts`
- `app/api/share/route.ts` — optional Vercel Blob upload endpoint
- `components/` — Header, Hero, Marquee, UploadZone, FormatSelector, PhotoEditor, BuilderForm, ResultView, XShareButton, SiteFooter
