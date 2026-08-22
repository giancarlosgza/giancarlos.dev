<script setup lang="ts">
import type {
  ShaderMountUniforms,
  StaticMeshGradientUniforms
} from '@paper-design/shaders'
import {
  getShaderColorFromString,
  ShaderMount,
  staticMeshGradientFragmentShader
} from '@paper-design/shaders'

/** Interfaces */
interface IStaticMeshGradientProps {
  colors?: string[]
  positions?: number
  waveX?: number
  waveXShift?: number
  waveY?: number
  waveYShift?: number
  mixing?: number
  grainMixer?: number
  grainOverlay?: number
  rotation?: number
  speed?: number
}
const props = withDefaults(defineProps<IStaticMeshGradientProps>(), {
  colors: () => ['#000000', '#223fff', '#9099ff', '#adb4fe'],
  positions: 2,
  waveX: 1,
  waveXShift: 0.6,
  waveY: 1,
  waveYShift: 0.21,
  mixing: 0.93,
  grainMixer: 0,
  grainOverlay: 0.12,
  rotation: 270,
  speed: 0
})

/** Data */
const containerRef = ref<HTMLElement | null>(null)
let shaderMount: ShaderMount | null = null

/** Methods */
function buildUniforms(): ShaderMountUniforms {
  const colorsVec4 = props.colors
    .slice(0, 10)
    .map((color) => {
      const [r, g, b, a] = getShaderColorFromString(color)
      return [r, g, b, a] as [number, number, number, number]
    })

  const uniforms: StaticMeshGradientUniforms = {
    u_colors: colorsVec4,
    u_colorsCount: colorsVec4.length,
    u_positions: props.positions,
    u_waveX: props.waveX,
    u_waveXShift: props.waveXShift,
    u_waveY: props.waveY,
    u_waveYShift: props.waveYShift,
    u_mixing: props.mixing,
    u_grainMixer: props.grainMixer,
    u_grainOverlay: props.grainOverlay,
    // Sizing
    u_scale: 1,
    u_rotation: props.rotation,
    u_offsetX: 0,
    u_offsetY: 0,
    u_originX: 0.5,
    u_originY: 0.5,
    u_worldWidth: 0,
    u_worldHeight: 0,
    u_fit: 2 // cover
  } as StaticMeshGradientUniforms

  return uniforms as unknown as ShaderMountUniforms
}

/** Lifecycle */
onMounted(() => {
  if (!containerRef.value)
    return
  shaderMount = new ShaderMount(
    containerRef.value,
    staticMeshGradientFragmentShader,
    buildUniforms(),
    undefined,
    props.speed
  )
})

onBeforeUnmount(() => {
  shaderMount?.dispose()
  shaderMount = null
})
</script>

<template>
  <div
    ref="containerRef"
    class="static-mesh-gradient"
    aria-hidden="true"
  />
</template>

<style scoped>
.static-mesh-gradient {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.static-mesh-gradient canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
