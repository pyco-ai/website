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

  // /download lands on the default OS page (ollama does the same)
  routeRules: {
    '/download': { redirect: '/download/windows' },
  },

  app: {
    head: {
      title: 'nemo',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Nemo — run it all, locally. Simple, private, out of your way.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/fish.svg' },
        // Exact ollama font setup — all system, no webfont (SF Pro Rounded headings on Apple).
      ],
    },
  },
})
