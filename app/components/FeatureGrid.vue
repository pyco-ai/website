<script setup lang="ts">
const features = [
  {
    title: 'Runs on your machine',
    text: 'Everything stays on your hardware. No accounts, no uploads, no surprises.',
  },
  {
    title: 'Works with your tools',
    text: 'A small, predictable interface that slots into the apps and scripts you already use.',
  },
  {
    title: 'Out of your way',
    text: 'One command to start. Quiet defaults. The kind of tool you forget is even there.',
  },
]
</script>

<template>
  <section id="features" class="mx-auto w-full max-w-[920px] px-6 pb-20 pt-6">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <FeatureCard
        v-for="f in features"
        :key="f.title"
        :title="f.title"
        :text="f.text"
      />
    </div>
  </section>
</template>
