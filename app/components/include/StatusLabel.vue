<script setup lang="ts">
/** Interfaces */
interface IStatusLabelProps {
  text: string
}

/** Props */
const { text } = defineProps<IStatusLabelProps>()
</script>

<template>
  <p class="status-label">
    <UiIconMaterial
      icon-code="&#xe061;"
      size="xs"
      class="status-label-icon text-success"
    />
    {{ text }}
  </p>
</template>
