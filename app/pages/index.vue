<script setup lang="ts">
const description = 'Pyco builds small language models and the tooling that makes them cheap to run.'

useSeoMeta({
  title: 'Pyco',
  description,
  ogTitle: 'Pyco',
  ogDescription: description,
})

const work = [
  { name: 'nemo-1', does: 'Small language model', status: 'Pre-release' },
  { name: 'krab', does: 'Architecture latency prediction', status: 'Pre-release' },
  { name: 'orqa', does: '2-bit quantization', status: 'Pre-release' },
] as const
</script>

<template>
  <div>
    <div class="mb-12">
      <h2 class="text-lg font-normal">PYCO</h2>
      <p class="text-lg">SMALL MODELS. MASSIVE POTENTIAL.</p>
    </div>

    <p class="mb-12 max-w-prose leading-relaxed opacity-80">
      We build small language models, and the tools that make them cheap to run.
    </p>

    <dl class="space-y-4 sm:grid sm:grid-cols-[minmax(0,auto)_auto_auto] sm:justify-start sm:gap-x-6 sm:gap-y-1 sm:space-y-0">
      <div v-for="item in work" :key="item.name" class="grid sm:contents">
        <dt>{{ item.name }}</dt>
        <dd>{{ item.does }}</dd>
        <dd class="opacity-60">{{ item.status }}</dd>
      </div>
    </dl>
  </div>
</template>
