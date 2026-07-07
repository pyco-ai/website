<script setup lang="ts">
const open = ref(false)

const links = [
  { label: 'Features', href: '/#features' },
  { label: 'Install', href: '/#install' },
  { label: 'Docs', href: '/#docs' },
  { label: 'GitHub', href: 'https://github.com/' },
]
</script>

<template>
  <header class="sticky top-0 z-40 bg-white pt-3 underline-offset-4 lg:static">
    <nav class="flex w-full items-center px-6 py-[9px]">
      <a href="/" class="relative z-50" aria-label="Nemo home">
        <img src="/fish.svg" class="w-8" alt="Nemo" />
      </a>

      <!-- Nav links, right after the logo -->
      <div class="ml-6 hidden items-center space-x-6 text-lg lg:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="hover:underline focus:underline focus:outline-none focus:ring-0"
        >{{ l.label }}</a>
      </div>

      <!-- Download, far right -->
      <div class="ml-auto hidden items-center lg:flex">
        <a
          href="/download"
          class="flex cursor-pointer items-center whitespace-nowrap rounded-full bg-neutral-800 px-4 py-1.5 text-lg text-white transition-colors hover:bg-black focus:bg-black"
        >Download</a>
      </div>

      <!-- Mobile hamburger, far right -->
      <button
        class="ml-auto lg:hidden"
        :aria-expanded="open"
        aria-label="Open menu"
        @click="open = true"
      >
        <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu: full-screen white overlay. Kept inside <header> at z-40 so the
         z-50 logo stays visible above it when open (like ollama). -->
    <div
      v-if="open"
      class="fixed inset-0 z-40 overflow-y-auto bg-white lg:hidden"
    >
      <button
        class="absolute right-6 top-4 z-50"
        aria-label="Close menu"
        @click="open = false"
      >
        <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <nav class="flex flex-col space-y-5 pt-[5.5rem] text-3xl" aria-label="Mobile">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="px-6"
          @click="open = false"
        >{{ l.label }}</a>
        <a href="/download" class="px-6" @click="open = false">Download</a>
      </nav>
    </div>
  </header>
</template>
