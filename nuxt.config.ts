import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  // Global stylesheet (imports Tailwind)
  css: ['~/assets/css/main.css'],

  // Tailwind v4 integrates through its Vite plugin (Nuxt uses Vite under the hood)
  vite: {
    plugins: [tailwindcss()],
  },

  // Fully static output. The download route remains in source until installers are ready,
  // but is deliberately not linked or prerendered.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/privacy'],
    },
  },

  app: {
    head: {
      title: 'Pyco',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Pyco builds small language models and the tooling that makes them cheap to run.' },
        { property: 'og:title', content: 'Pyco' },
        { property: 'og:description', content: 'Pyco builds small language models and the tooling that makes them cheap to run.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://pyco.ai/' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/fish.svg' },
        { rel: 'canonical', href: 'https://pyco.ai/' },
      ],
    },
  },
})
