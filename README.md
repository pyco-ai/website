# Pyco website

Pyco is the company and the runtime. Nemo is the model family.

Every page uses the same shell: a monospace text column beside an animated dithering shader. The site is light-only, does not set cookies, and does not load analytics or third-party scripts.

## Stack

- Nuxt 4 for routing and static generation
- Vue 3 for components
- Tailwind CSS v4 for styling
- `@paper-design/shaders` for the WebGL dithering background

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
│  ├─ fish.svg
│  ├─ og.png
│  ├─ robots.txt
│  └─ sitemap.xml
└─ app/
   ├─ app.vue
   ├─ assets/css/main.css
   ├─ components/DitheringShader.vue
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
- Shared navigation, footer, and shader settings: `app/layouts/default.vue`
- Global styling: `app/assets/css/main.css`
- Default metadata and prerender routes: `nuxt.config.ts`

The privacy page is accurate only while the site has no analytics, forms, accounts, or hosted endpoints. Update it if any of those are added.

## Deployment

Netlify builds the `master` branch with `npm run generate` and publishes `dist`; plain local generation writes `.output/public`. The security and cache headers live in `netlify.toml` so deployment settings stay versioned with the site.
