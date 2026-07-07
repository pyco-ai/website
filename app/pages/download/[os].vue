<script setup lang="ts">
type Slug = 'mac' | 'linux' | 'windows'
const slugs: Slug[] = ['mac', 'linux', 'windows']

interface OsData {
  label: string
  cmd: string
  links?: { text: string; href: string }[]
  download?: { label: string; req: string }
}

const OS_DATA: Record<Slug, OsData> = {
  mac: {
    label: 'macOS',
    cmd: 'curl -fsSL https://nemo.sh/install.sh | sh',
    download: { label: 'Download for macOS', req: 'Requires macOS 14 Sonoma or later' },
  },
  linux: {
    label: 'Linux',
    cmd: 'curl -fsSL https://nemo.sh/install.sh | sh',
    links: [
      { text: 'View script source', href: '#' },
      { text: 'Manual install instructions', href: '#' },
    ],
  },
  windows: {
    label: 'Windows',
    cmd: 'irm https://nemo.sh/install.ps1 | iex',
    download: { label: 'Download for Windows', req: 'Requires Windows 10 or later' },
  },
}

const route = useRoute()
const slug = computed(() => route.params.os as string)

if (!slugs.includes(slug.value as Slug)) {
  throw createError({ statusCode: 404, statusMessage: 'Download not found', fatal: true })
}

const current = computed(() => OS_DATA[slug.value as Slug])

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(current.value.cmd)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Copy failed:', err)
  }
}

useHead({ title: computed(() => `Download nemo on ${current.value.label}`) })
</script>

<template>
  <main class="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-10 md:py-24">
    <h1 class="mb-12 text-3xl tracking-tight">Download nemo</h1>

    <!-- OS selector: 3-card grid, active card gets a gray box -->
    <nav class="grid grid-cols-3 gap-4 text-sm">
      <NuxtLink
        v-for="s in slugs"
        :key="s"
        :to="`/download/${s}`"
        class="flex cursor-pointer flex-col items-center rounded-lg px-6 py-2 transition-colors hover:bg-neutral-100"
        :class="{ 'bg-neutral-100': slug === s }"
      >
        <OsIcon :os="s" />
        {{ OS_DATA[s].label }}
      </NuxtLink>
    </nav>

    <!-- Install command + per-OS actions -->
    <div class="mx-auto mb-16 mt-12 flex w-full flex-col items-center text-center">
      <div class="mb-2 flex items-center rounded-lg bg-neutral-100 font-mono text-sm">
        <code class="overflow-x-auto whitespace-nowrap py-3 pl-4 pr-4">{{ current.cmd }}</code>
        <button
          type="button"
          class="block w-12 px-3 py-1 leading-[0] text-neutral-500 transition-colors hover:text-black focus:outline-none"
          aria-label="Copy install command"
          @click="copy"
        >
          <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
      </div>

      <!-- Linux: script-based install -->
      <div v-if="current.links" class="flex justify-center space-x-1 text-xs text-neutral-800 underline-offset-4">
        <template v-for="(l, i) in current.links" :key="l.text">
          <span v-if="i > 0">•</span>
          <a :href="l.href" class="hover:underline focus:underline focus:outline-none">{{ l.text }}</a>
        </template>
      </div>

      <!-- macOS / Windows: installer download -->
      <div v-else-if="current.download" class="mt-4 flex flex-col items-center">
        <p class="mb-3 text-sm text-neutral-500">or</p>
        <a
          href="#"
          class="inline-flex items-center justify-center rounded-full bg-neutral-800 px-6 py-2 text-lg text-white transition-colors hover:bg-black"
        >{{ current.download.label }}</a>
        <p class="mt-3 text-sm text-neutral-500">{{ current.download.req }}</p>
      </div>
    </div>
  </main>
</template>
