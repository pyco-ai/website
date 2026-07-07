<script setup lang="ts">
const points = [
  'Everything runs on your own machine',
  'No accounts, no uploads, no telemetry',
  'Works fully offline',
]
</script>

<template>
  <section class="mx-auto mb-40 w-full max-w-6xl px-6 md:mb-56">
    <div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
      <div>
        <h2 class="mb-8 font-display text-4xl font-medium">Your data stays yours</h2>
        <ul class="space-y-4">
          <li v-for="p in points" :key="p" class="flex items-start gap-3 text-base">
            <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span>{{ p }}</span>
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-center">
        <svg class="h-48 w-48 text-neutral-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </div>
    </div>
  </section>
</template>
