<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  { label: 'Download', href: '/download' },
  { label: 'Features', href: '/#features' },
  { label: 'Docs', href: '/#docs' },
  { label: 'GitHub', href: 'https://github.com/' },
]
</script>

<template>
  <footer class="mt-auto">
    <!-- Desktop: copyright left, links right -->
    <div class="hidden underline-offset-4 md:block">
      <div class="flex items-center justify-between px-6 py-3.5">
        <div class="text-xs text-neutral-500">© {{ year }} Nemo</div>
        <div class="flex space-x-6 text-xs text-neutral-500">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="hover:underline"
          >{{ l.label }}</a>
        </div>
      </div>
    </div>

    <!-- Mobile: stacked links + copyright -->
    <div class="py-4 md:hidden">
      <div class="flex flex-col items-center justify-center">
        <ul class="flex flex-wrap items-center justify-center text-sm text-neutral-500">
          <li v-for="l in links" :key="l.href" class="mx-2 my-1">
            <a :href="l.href" class="hover:underline">{{ l.label }}</a>
          </li>
        </ul>
        <div class="mt-2 text-sm text-neutral-500">© {{ year }} Nemo</div>
      </div>
    </div>
  </footer>
</template>
