<script setup lang="ts">
const description = 'Pyco finds model architectures that run fast on the hardware you already have.'

useSeoMeta({
  title: 'Pyco',
  description,
  ogTitle: 'Pyco',
  ogDescription: description,
})

const work = [
  { name: 'courte', does: 'Architecture latency prediction', status: 'Pre-release' },
  { name: 'sen', does: 'Hardware-efficient neural primitive discovery', status: 'Pre-release' },
] as const
</script>

<template>
  <div>
    <div class="mb-12">
      <p class="text-lg">MODELS SHAPED FOR YOUR HARDWARE.</p>
    </div>

    <p class="mb-12 max-w-prose leading-relaxed opacity-80">
      We find model architectures that run fast on the hardware you already have,
      by predicting how fast a design will run before anyone builds it.
    </p>

    <dl class="space-y-4 sm:grid sm:grid-cols-[minmax(0,auto)_auto_auto] sm:justify-start sm:gap-x-6 sm:gap-y-1 sm:space-y-0">
      <div v-for="item in work" :key="item.name" class="grid sm:contents">
        <dt class="italic">{{ item.name }}</dt>
        <dd>{{ item.does }}</dd>
        <dd class="opacity-60">{{ item.status }}</dd>
      </div>
    </dl>
  </div>
</template>
