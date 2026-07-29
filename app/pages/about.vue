<script setup lang="ts">
const description = 'Why Pyco is searching for smaller units of intelligence that can scale.'

useSeoMeta({
  title: 'About',
  description,
  ogTitle: 'About',
  ogDescription: description,
})
</script>

<template>
  <div>
    <h2 class="mb-12 text-lg font-normal">ABOUT</h2>

    <div class="max-w-prose space-y-4 leading-relaxed opacity-80">
      <p>
        From Richard Sutton's <em>The Bitter Lesson</em>: across AI history, general
        methods that can absorb more computation have ultimately pulled far ahead of
        hand-designed systems. Search and learning turn additional compute into
        capability; human knowledge may help in the near term, but does not offer the
        same long-run curve.
      </p>

      <p>
        Foundation models still contain many hand-designed choices, from the architecture
        and training harness to activation functions. Searching broadly across those
        choices is prohibitively expensive, and there is no broadly accepted smaller unit
        to search and then scale up. That is why Pyco was founded.
      </p>

      <p>
        Pyco was started by <a href="https://srothbaum.github.io" class="underline hover:no-underline">Seth Rothbaum</a>,
        an ML researcher at the University of Pennsylvania.
      </p>

      <p>
        Reach out at <a href="mailto:seth@pyco.ai" class="underline hover:no-underline">seth@pyco.ai</a>.
      </p>
    </div>
  </div>
</template>
