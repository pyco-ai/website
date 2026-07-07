# Nemo — landing page

Single-page site in the style of [ollama.com](https://ollama.com): pure-white,
grayscale, pill buttons, no shadows. The fish logo is the only splash of color.

## Stack

- **Nuxt 4** — the framework (file structure, build, static generation)
- **Vue 3** — single-file components, with reactivity for the mobile menu and copy button
- **Tailwind CSS v4** — styling, wired in through its Vite plugin

## Requirements

[Node.js](https://nodejs.org) 20 or newer.

## Run it

```bash
npm install      # first time only
npm run dev      # start the dev server → http://localhost:3000
```

## Structure

```
nemo_website/
├─ nuxt.config.ts          # Nuxt + Tailwind wiring, <head> (title, favicon, font)
├─ package.json
├─ public/
│  └─ fish.svg             # logo, served at /fish.svg (also the favicon)
└─ app/
   ├─ app.vue              # composes the page from the sections below
   ├─ assets/css/main.css  # Tailwind import + theme tokens (brand color, font)
   └─ components/
      ├─ TheHeader.vue     # sticky nav + reactive mobile menu
      ├─ HeroSection.vue   # headline, CTAs, terminal snippet, copy button
      ├─ FeatureGrid.vue   # data for the three cards
      ├─ FeatureCard.vue   # reusable card (title + text props)
      ├─ CtaStrip.vue      # closing call-to-action
      └─ TheFooter.vue
```

Components in `app/components/` are auto-imported by Nuxt — no import lines needed.

## Where to edit

- **Words:** the text lives in the `.vue` component for each section (placeholder copy — swap in your real text).
- **Feature cards:** the `features` array in `FeatureGrid.vue`.
- **Install command:** the `cmd` value in `HeroSection.vue`.
- **Colors / font:** the `@theme` block in `app/assets/css/main.css`. `--color-brand`
  becomes `text-brand` / `bg-brand`; `--font-display` becomes `font-display`.
- **The fonts** mirror ollama's exactly — all system, no webfont: a rounded display
  (`SF Pro Rounded`, set via `--font-display`) that renders rounded on Apple and falls back to
  the system sans elsewhere, a neutral system sans for body, and the default mono for code.

## Add more pages later

Create an `app/pages/` directory and move the landing page to `app/pages/index.vue`,
then put `<NuxtPage />` in `app.vue`. Nuxt turns each file in `pages/` into a route.

## Deploy (free)

```bash
npm run generate    # static output in .output/public
```

Drop `.output/public` on Netlify, Cloudflare Pages, GitHub Pages, or Vercel.
(Vercel and Netlify also detect Nuxt automatically if you connect the repo.)
