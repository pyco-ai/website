<script setup lang="ts">
const cmd = 'irm https://nemo.sh/install.ps1 | iex'
const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(cmd)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Copy failed:', err)
  }
}
</script>

<template>
  <section class="mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-40 pt-28 text-center">
    <!-- Brand mark (in place of ollama's llama) -->
    <div class="mb-6 font-display text-7xl font-medium leading-none md:text-8xl">nemo</div>

    <h1 class="mb-6 font-display text-3xl font-medium md:text-4xl">
      Run it all, locally.
    </h1>

    <!-- Install command (desktop / tablet) -->
    <div id="install" class="mt-6 hidden flex-col items-center sm:flex">
      <div class="flex items-center rounded-xl border border-neutral-100 bg-black/5 font-mono text-sm text-neutral-950">
        <code class="whitespace-nowrap py-3 pl-4 pr-2">{{ cmd }}</code>
        <button
          type="button"
          class="block px-2.5 py-1 leading-[0] text-neutral-500 transition-colors hover:text-neutral-950 focus:outline-none"
          aria-label="Copy install command"
          @click="copy"
        >
          <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
      </div>
      <p class="mt-3 text-sm text-neutral-500">paste this in PowerShell, or <a href="/download" class="underline underline-offset-2 hover:text-neutral-800">download Nemo</a></p>
    </div>

    <!-- Mobile CTA (matches ollama's sm:hidden "Get started") -->
    <a
      href="/download"
      class="mt-5 flex items-center justify-center rounded-full bg-neutral-800 px-6 py-2 text-lg text-white hover:bg-black sm:hidden"
    >Get started →</a>
  </section>
</template>
