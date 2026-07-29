<script setup lang="ts">
const route = useRoute()
const atHome = computed(() => route.path === '/')
const year = new Date().getFullYear()
const canonicalUrl = computed(() => new URL(route.path, 'https://pyco.ai').href)

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  meta: [{ property: 'og:url', content: canonicalUrl.value }],
}))

const nav = computed(() => {
  const links = [
    ...(atHome.value ? [] : [{ label: 'Home', href: '/' }]),
    { label: 'About', href: '/about' },
    { label: 'Contact', href: 'mailto:seth@pyco.ai' },
  ]

  return links.filter((link) => link.href !== route.path)
})

const legal = computed(() => (
  route.path === '/privacy' ? [] : [{ label: 'Privacy', href: '/privacy' }]
))

const reducedMotion = ref(false)
let reducedMotionQuery: MediaQueryList | undefined

function updateReducedMotion(event: MediaQueryListEvent) {
  reducedMotion.value = event.matches
}

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = reducedMotionQuery.matches
  reducedMotionQuery.addEventListener('change', updateReducedMotion)
})

onBeforeUnmount(() => {
  reducedMotionQuery?.removeEventListener('change', updateReducedMotion)
})
</script>

<template>
  <div class="relative flex min-h-dvh flex-col overflow-hidden md:flex-row">
    <div
      class="relative z-10 flex min-h-dvh w-full flex-col bg-white p-8 font-mono text-black md:min-h-0 md:w-1/2"
    >
      <header class="mb-8">
        <h1 class="text-lg font-normal">
          <span v-if="atHome">pyco.ai</span>
          <NuxtLink v-else to="/" class="hover:underline">pyco.ai</NuxtLink>
        </h1>
      </header>

      <main class="flex-1">
        <slot />
      </main>

      <footer class="mt-auto pt-8">
        <nav class="flex flex-wrap gap-x-4 text-lg" aria-label="Primary">
          <NuxtLink
            v-for="l in nav"
            :key="l.label"
            :to="l.href"
            class="hover:underline"
          >{{ l.label }}</NuxtLink>
        </nav>

        <div class="mt-4 flex flex-wrap gap-x-4 text-sm opacity-60">
          <nav v-if="legal.length" aria-label="Legal">
            <NuxtLink
              v-for="l in legal"
              :key="l.label"
              :to="l.href"
              class="hover:underline"
            >{{ l.label }}</NuxtLink>
          </nav>
          <span>© {{ year }} Pyco</span>
        </div>
      </footer>
    </div>

    <div
      class="pointer-events-none relative h-[15vh] w-full bg-white md:h-auto md:min-h-dvh md:w-1/2"
      aria-hidden="true"
    >
      <ClientOnly>
        <LazyDitheringShader
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
        <template #fallback>
          <div class="h-full w-full" />
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
