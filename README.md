# Pyco — site

Pyco is the company and the runtime; **Nemo** is the model family.

Every page is the same shell: a monospace text column on the left, an animated dithering
shader on the right. Black on white, no boxes, no shadows — the shader is the only color.
This mirrors [srothbaum.github.io](https://srothbaum.github.io), minus that site's dark
mode: this one is light only, so there is no theme toggle, cookie, or `dark:` variant.

## Stack

- **Nuxt 4** — routing, build, static generation
- **Vue 3** — single-file components
- **Tailwind CSS v4** — styling, wired in through its Vite plugin
- **@paper-design/shaders** — the WebGL dithering background

## Requirements

[Node.js](https://nodejs.org) 20 or newer.

## Run it

```bash
npm install
```

```bash
npm run dev
```

## Structure

```
nemo_website/
├─ nuxt.config.ts              # Nuxt + Tailwind wiring, <head>, prerender routes
├─ public/fish.svg             # favicon
└─ app/
   ├─ app.vue                  # <NuxtLayout> + <NuxtPage>, and the <html> background
   ├─ assets/css/main.css      # Tailwind import + mono font token
   ├─ layouts/default.vue      # the split shell: text column + shader + legal line
   ├─ components/
   │  └─ DitheringShader.vue   # wraps @paper-design/shaders' ShaderMount
   └─ pages/
      ├─ index.vue             # PYCO — tagline, what we build, links
      ├─ privacy.vue           # privacy policy
      └─ download/[os].vue     # unpublished mac | linux | windows install flow
```

Components under `app/` are auto-imported by Nuxt — no import lines needed.

The `Privacy` link and copyright sit in `layouts/default.vue`, so they appear on every
page below whatever nav row that page defines.

## Where to edit

- **What we build** (home): the `work` array in `pages/index.vue`.
- **Privacy policy**: the `sections` array in `pages/privacy.vue`. It currently states
  that the site collects nothing, which is true only while there is no analytics script,
  no form, and no hosted endpoint. Adding any of those means editing this page too.
- **Install commands, installer links, OS requirements**: `OS_DATA` in `pages/download/[os].vue`.
  The route is not currently linked or prerendered.
- **Shader colors**: the `color-front` / `color-back` props in `layouts/default.vue`.
  Front is `hsl(228, 100%, 70%)` / `#6685FF`; back is white, and must stay in step with
  the `bg-white` on the shader's wrapper or the panel flashes before the canvas paints.
- **Font**: `--font-mono` in `app/assets/css/main.css`.

## Still placeholder

`pyco.ai` is not live yet, so the install commands do not resolve. The GitHub link, both
installer download buttons, and the two Linux script links all point at `#`.

The three entries on the home page (`nemo-1`, `krab`, `orqa`) are real; nemo-1 has no
published sizes, context length, or benchmarks yet. The download flow still describes
installing a `pyco` runtime, which does not exist as a shipped artifact — see the note
in `pages/download/[os].vue`.

## Deploy

```bash
npm run generate
```

Static output lands in `.output/public` — drop it on Netlify, Cloudflare Pages, GitHub
Pages, or Vercel. The home, About, and Privacy pages are prerendered.
