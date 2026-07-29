import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

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
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Pyco' },
        { property: 'og:image', content: 'https://pyco.ai/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:alt', content: 'pyco.ai over a blue dither pattern.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#6685ff' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/fish.svg' },
      ],
    },
  },
})
