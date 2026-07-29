<script setup lang="ts">
// Every page is the same shell: a mono text column on the left, the dithering shader on
// the right. Only the middle of the column changes, so the wordmark, footer nav, and
// legal line all live here rather than being repeated per page.
const route = useRoute()
// On the home page the wordmark would link to itself, which is noise for keyboard and
// screen-reader users — render it as plain text there. On every other page it is the way
// back, which is why no page carries its own "Home" link.
const atHome = computed(() => route.path === '/')

// Baked at build time on the prerendered pages, then re-evaluated on the client — so a
// site left undeployed across New Year still shows the current year to visitors.
const year = new Date().getFullYear()

const nav = computed(() => {
  const links = [
    ...(atHome.value ? [] : [{ label: 'Home', href: '/' }]),
    { label: 'About', href: '/about' },
    { label: 'Contact', href: 'mailto:seth@pyco.ai' },
  ]

  return links.filter((link) => link.href !== route.path)
})

const legal = [
  { label: 'Privacy', href: '/privacy' },
]

// The shader animates forever, so honour a reduced-motion preference by freezing it.
// Resolved in onMounted because the shader is client-only anyway.
const reducedMotion = ref(false)
onMounted(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = media.matches
  media.addEventListener('change', (e) => (reducedMotion.value = e.matches))
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden md:flex-row">
    <div
      class="relative z-10 flex min-h-screen w-full flex-col bg-white p-8 font-mono text-black md:min-h-0 md:w-1/2"
    >
      <div class="mb-8">
        <h1 class="text-lg font-normal">
          <span v-if="atHome">pyco.ai</span>
          <NuxtLink v-else to="/" class="hover:underline">pyco.ai</NuxtLink>
        </h1>
      </div>

      <slot />

      <footer class="mt-auto pt-8">
        <div class="flex flex-wrap gap-x-4 text-lg">
          <NuxtLink
            v-for="l in nav"
            :key="l.label"
            :to="l.href"
            class="hover:underline"
          >{{ l.label }}</NuxtLink>
        </div>

        <div class="mt-4 flex flex-wrap gap-x-4 text-sm opacity-60">
          <NuxtLink
            v-for="l in legal"
            :key="l.label"
            :to="l.href"
            class="hover:underline"
          >{{ l.label }}</NuxtLink>
          <span>© {{ year }} Pyco</span>
        </div>
      </footer>
    </div>

    <!-- Background matches the shader's colorBack so there is no white flash before the canvas paints. -->
    <div class="relative h-[50vh] w-full bg-white md:h-auto md:min-h-screen md:w-1/2">
      <ClientOnly>
        <DitheringShader
          color-back="hsl(0, 0%, 100%)"
          color-front="hsl(228, 100%, 70%)"
          shape="simplex"
          type="4x4"
          :px-size="3"
          :offset-x="0"
          :offset-y="0"
          :scale="0.8"
          :rotation="0"
          :speed="reducedMotion ? 0 : 0.1"
        />
        <!-- Matches DitheringShader's own root element, so hydration finds identical markup. -->
        <template #fallback>
          <div class="h-full w-full" />
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
