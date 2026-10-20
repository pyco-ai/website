# Pyco website

Pyco is the company. courte, its product, predicts how fast a model architecture will run on given hardware.

Every page uses the same shell: a monospace text column beside the moving pyco logo: a dot field that gathers its own dots into the word, holds, then returns each dot to where it came from. The site is light-only, does not set cookies, and does not load analytics, third-party scripts or third-party fonts (Geist Mono is self-hosted).

## Stack

- Nuxt 4 for routing and static generation
- Vue 3 for components
- Tailwind CSS v4 for styling
- Geist Mono (SIL OFL), self-hosted from `public/fonts/`

## Requirements

Use Node.js 20 or newer.

## Local development

```bash
npm install
npm run dev
```

The development server is available at `http://localhost:3000` by default.

## Production build

```bash
npm run generate
```

The generated static site is written to `.output/public`.

## Structure

```text
website/
├─ nuxt.config.ts
├─ netlify.toml
├─ public/
│  ├─ favicon.ico, pyco-favicon.svg, apple-touch-icon-180.png
│  ├─ og-image-1200x630.png
│  ├─ pyco-lockup-blue.svg
│  ├─ fonts/GeistMono-Regular.woff2, OFL.txt
│  ├─ robots.txt
│  └─ sitemap.xml
└─ app/
   ├─ app.vue
   ├─ assets/css/main.css
   ├─ components/PycoLogoField.vue
   ├─ utils/pycoLogoField.ts
   ├─ layouts/default.vue
   └─ pages/
      ├─ index.vue
      ├─ about.vue
      └─ privacy.vue
```

Components under `app/` are auto-imported by Nuxt.

## Where to edit

- Home page projects and copy: `app/pages/index.vue`
- About copy: `app/pages/about.vue`
- Privacy policy: `app/pages/privacy.vue`
- Shared navigation, footer, and moving-logo settings: `app/layouts/default.vue`
- Global styling: `app/assets/css/main.css`
- Default metadata and prerender routes: `nuxt.config.ts`

The privacy page is accurate only while the site has no analytics, forms, accounts, or hosted endpoints. Update it if any of those are added.

## Deployment

Netlify builds the `master` branch with `npm run generate` and publishes `dist`; plain local generation writes `.output/public`. The security and cache headers live in `netlify.toml` so deployment settings stay versioned with the site.
