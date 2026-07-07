<script setup lang="ts">
defineProps<{
  title: string
  text: string
}>()
</script>

<template>
  <article class="rounded-xl border border-neutral-300 bg-white p-7">
    <h3 class="mb-2 font-display text-lg font-medium">{{ title }}</h3>
    <p class="m-0 text-[15px] text-neutral-500">{{ text }}</p>
  </article>
</template>
