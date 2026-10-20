<script setup lang="ts">
import { mountPycoLogoField } from '~/utils/pycoLogoField'

const props = withDefaults(
  defineProps<{
    word?: string
    color?: string
    background?: string
    cellSize?: number
    dotSize?: number
    reducedMotion?: boolean
  }>(),
  {
    word: 'pyco',
    color: '#6685FF',
    background: '#FFFFFF',
    cellSize: 4,
    dotSize: 2.5,
    reducedMotion: false,
  },
)

const canvas = ref<HTMLCanvasElement | null>(null)
let dispose: (() => void) | null = null

function mount() {
  dispose?.()
  if (!canvas.value) return
  dispose = mountPycoLogoField(canvas.value, { ...props })
}

onMounted(mount)
watch(() => ({ ...props }), mount)

onBeforeUnmount(() => {
  dispose?.()
  dispose = null
})
</script>

<template>
  <canvas ref="canvas" class="block h-full w-full" />
</template>
