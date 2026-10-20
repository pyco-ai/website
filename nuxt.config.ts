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
        { name: 'description', content: 'Pyco finds model architectures that run fast on the hardware you already have.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Pyco' },
        { property: 'og:image', content: 'https://pyco.ai/og-image-1200x630.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:alt', content: 'The pyco logo in blue on white.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#6685ff' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/svg+xml', href: '/pyco-favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180.png' },
        { rel: 'preload', href: '/fonts/GeistMono-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
      ],
    },
  },
})
