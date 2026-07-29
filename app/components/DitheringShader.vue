<script setup lang="ts">
import {
  ShaderMount,
  ditheringFragmentShader,
  DitheringShapes,
  DitheringTypes,
  defaultObjectSizing,
  ShaderFitOptions,
  getShaderColorFromString,
  type DitheringShape,
  type DitheringType,
} from '@paper-design/shaders'

const props = withDefaults(
  defineProps<{
    colorBack?: string
    colorFront?: string
    shape?: DitheringShape
    type?: DitheringType
    pxSize?: number
    scale?: number
    rotation?: number
    offsetX?: number
    offsetY?: number
    speed?: number
  }>(),
  {
    colorBack: 'hsl(0, 0%, 0%)',
    colorFront: 'hsl(320, 100%, 70%)',
    shape: 'simplex',
    type: '4x4',
    pxSize: 3,
    scale: 0.8,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
    speed: 0.1,
  },
)

const container = ref<HTMLDivElement | null>(null)
let mount: ShaderMount | null = null

/** The shader takes a flat uniform bag; rebuild it whenever a prop changes. */
const uniforms = computed(() => ({
  u_colorBack: getShaderColorFromString(props.colorBack),
  u_colorFront: getShaderColorFromString(props.colorFront),
  u_shape: DitheringShapes[props.shape],
  u_type: DitheringTypes[props.type],
  u_pxSize: props.pxSize,
  u_fit: ShaderFitOptions[defaultObjectSizing.fit],
  u_scale: props.scale,
  u_rotation: props.rotation,
  u_originX: defaultObjectSizing.originX,
  u_originY: defaultObjectSizing.originY,
  u_offsetX: props.offsetX,
  u_offsetY: props.offsetY,
  u_worldWidth: defaultObjectSizing.worldWidth,
  u_worldHeight: defaultObjectSizing.worldHeight,
}))

onMounted(() => {
  if (!container.value) return
  mount = new ShaderMount(container.value, ditheringFragmentShader, uniforms.value, undefined, props.speed)
})

watch(uniforms, (next) => mount?.setUniforms(next))
watch(() => props.speed, (next) => mount?.setSpeed(next))

onBeforeUnmount(() => {
  mount?.dispose()
  mount = null
})
</script>

<template>
  <div ref="container" class="h-full w-full" />
</template>
