# Solape & Nathan — Wedding Website

A single-page wedding website built with Next.js 16, Tailwind CSS v4, Framer Motion, and React Hook Form.

---

## Quick Start

```bash
npm install
npm run dev       # → http://localhost:3000
```

---

## Customising the Site

All editable values live in **`lib/config.ts`** — names, date, venue details, bank accounts, registry items, and story text. Every `[REPLACE: ...]` placeholder is clearly marked.

### Replacing placeholder images
- **Hero photo**: set `HERO_IMAGE` in `lib/config.ts` to a path like `/images/hero.jpg` (put the file in `public/images/`)
- **Gallery photos**: update the `GALLERY_IMAGES` array in `lib/config.ts` with real image URLs or local paths
- **Story photos**: update `STORY.solape.image` and `STORY.nathan.image`

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
NEXT_PUBLIC_WA_NUMBER=2348012345678
```

---

## Setting Up Google Sheets (RSVP + Well Wishes)

1. Create a Google Sheet. Add two tabs: **"RSVPs"** and **"Well Wishes"**.
2. Open **Extensions → Apps Script** in the sheet.
3. Paste the contents of `scripts/google-apps-script.js` into the editor.
4. Update `SHEET_ID` in the script with your sheet's ID (from the URL).
5. Click **Deploy → New deployment → Web App**.
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the Web App URL → paste into `.env.local` as `NEXT_PUBLIC_APPS_SCRIPT_URL`.
7. **Important**: create a new deployment (not "manage existing") every time you edit the script.

---

## Deploying to Vercel

```bash
# Push to GitHub, then connect the repo on vercel.com
# OR use the Vercel CLI:
npm i -g vercel
vercel --prod
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

> **Note on local `npm run build`**: Next.js 16.2.9 has a known Turbopack prerender bug on Windows
> that throws "Expected workStore to be initialized". This does NOT affect Vercel deploys
> (Linux build environment). `npm run dev` works perfectly for local development.

---

## Project Structure

```
app/
  layout.tsx          — root layout, Google Fonts
  page.tsx            — assembles all 9 sections
  globals.css         — Tailwind v4 theme tokens, smooth-scroll

components/
  Navigation.tsx      — sticky nav, mobile hamburger drawer
  sections/
    Hero.tsx          — full-viewport hero with animated names
    OurStory.tsx      — two-column story cards
    WeddingDetails.tsx — ceremony/cocktail/reception timeline
    Gallery.tsx       — 12-photo grid + swipeable lightbox
    Gifting.tsx       — bank transfer details with copy buttons
    Registry.tsx      — gift cards with WhatsApp "Gift This" links
    RSVP.tsx          — form → Google Sheet via Apps Script
    WellWishes.tsx    — wishes form → Google Sheet second tab
    Footer.tsx        — monogram + closing line

lib/
  config.ts           — ALL editable content in one place

scripts/
  google-apps-script.js — paste into Apps Script editor
```
