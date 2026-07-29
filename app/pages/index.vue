<script setup lang="ts">
// Three parallel facts per row — name, what it does, where it stands — so every column
// answers the same question all the way down.
const work: { name: string; does: string; status: string }[] = [
  { name: 'nemo-1', does: 'Small language model', status: 'Pre-release' },
  { name: 'krab', does: 'Architecture latency prediction', status: 'Pre-release' },
  { name: 'orqa', does: '2-bit quantization', status: 'Pre-release' },
]
</script>

<template>
  <div>
    <div class="mb-12">
      <h2 class="text-lg font-normal">PYCO</h2>
      <h3 class="text-lg font-normal">SMALL MODELS. MASSIVE POTENTIAL.</h3>
    </div>

    <p class="mb-12 max-w-prose leading-relaxed opacity-80">
      We build small language models, and the tools that make them cheap to run.
    </p>

    <div class="grid grid-cols-[minmax(0,auto)_auto_auto] justify-start gap-x-6 gap-y-1">
      <div v-for="item in work" :key="item.name" class="contents">
        <span>{{ item.name }}</span>
        <span>{{ item.does }}</span>
        <span>{{ item.status }}</span>
      </div>
    </div>
  </div>
</template>
