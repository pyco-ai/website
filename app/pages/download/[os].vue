<script setup lang="ts">
type Slug = 'mac' | 'linux' | 'windows'
const slugs: Slug[] = ['mac', 'linux', 'windows']

interface OsData {
  /** Lowercase, for the selector — the page is set in mono and reads as a shell. */
  label: string
  /** Proper case, for prose and the document title. */
  name: string
  cmd: string
  links?: { text: string; href: string }[]
  download?: { label: string; req: string }
}

// NOTE: these install a `pyco` runtime that is not a shipped artifact yet — the commands
// and both installer buttons are placeholders until there is something to download.
const OS_DATA: Record<Slug, OsData> = {
  mac: {
    label: 'macos',
    name: 'macOS',
    cmd: 'curl -fsSL https://pyco.ai/install.sh | sh',
    download: { label: 'Download for macOS', req: 'Requires macOS 14 Sonoma or later' },
  },
  linux: {
    label: 'linux',
    name: 'Linux',
    cmd: 'curl -fsSL https://pyco.ai/install.sh | sh',
    links: [
      { text: 'View script source', href: '#' },
      { text: 'Manual install instructions', href: '#' },
    ],
  },
  windows: {
    label: 'windows',
    name: 'Windows',
    cmd: 'irm https://pyco.ai/install.ps1 | iex',
    download: { label: 'Download for Windows', req: 'Requires Windows 10 or later' },
  },
}

const route = useRoute()
const slug = computed(() => route.params.os as string)

if (!slugs.includes(slug.value as Slug)) {
  throw createError({ statusCode: 404, statusMessage: 'Download not found', fatal: true })
}

const current = computed(() => OS_DATA[slug.value as Slug])

useHead({ title: 'Download' })

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
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="mb-12">
      <h2 class="text-lg font-normal">DOWNLOAD</h2>
    </div>

    <!-- OS selector. Typographic rather than iconographic, to stay in the mono voice. -->
    <nav class="mb-8 flex space-x-4" aria-label="Operating system">
      <NuxtLink
        v-for="s in slugs"
        :key="s"
        :to="`/download/${s}`"
        class="hover:underline"
        :class="slug === s ? 'underline' : 'opacity-60'"
        :aria-current="slug === s ? 'page' : undefined"
      >{{ OS_DATA[s].label }}</NuxtLink>
    </nav>

    <div class="mb-12">
      <div class="flex max-w-full items-center gap-x-4 bg-black/5 px-4 py-3">
        <code class="overflow-x-auto whitespace-nowrap">{{ current.cmd }}</code>
        <button
          type="button"
          class="ml-auto shrink-0 opacity-60 transition-opacity hover:opacity-100"
          aria-label="Copy install command"
          @click="copy"
        >{{ copied ? '[copied]' : '[copy]' }}</button>
      </div>

      <!-- Linux: script-based install, no packaged installer -->
      <div v-if="current.links" class="mt-4 flex flex-wrap gap-x-4 opacity-60">
        <a
          v-for="l in current.links"
          :key="l.text"
          :href="l.href"
          class="hover:underline hover:opacity-100"
        >{{ l.text }}</a>
      </div>

      <!-- macOS / Windows: packaged installer -->
      <div v-else-if="current.download" class="mt-4">
        <a href="#" class="underline hover:no-underline">{{ current.download.label }}</a>
        <p class="mt-1 opacity-60">{{ current.download.req }}</p>
      </div>
    </div>

  </div>
</template>
