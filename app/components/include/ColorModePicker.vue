<script setup lang="ts">
/** Interfaces */
interface IColorModeOption {
  id: string
  label: string
  icon: string
  description: string
}

/** Props */
interface IColorModeProps {
  showLabels?: boolean
}
const { showLabels = true } = defineProps<IColorModeProps>()

/** Data */
const { $colorMode } = useNuxtApp()
const activeMode = ref($colorMode.preference)
const colorModes: IColorModeOption[] = [
  {
    id: 'system',
    label: 'System',
    icon: '&#xe31e;',
    description: 'Follow system preference'
  },
  {
    id: 'light',
    label: 'Light',
    icon: '&#xe518;',
    description: 'Light theme'
  },
  {
    id: 'dark',
    label: 'Dark',
    icon: '&#xe51c;',
    description: 'Dark theme'
  }
]

/** Methods */
function selectColorMode(mode: string) {
  $colorMode.preference = mode
  activeMode.value = mode
}

/** Watchers */
watch(() => $colorMode.preference, (newMode) => {
  activeMode.value = newMode
}, { immediate: true })
</script>

<template>
  <div class="d-flex gap-2">
    <div
      v-for="(mode, index) in colorModes"
      :id="`color-mode-${mode.id}`"
      :key="`color-mode-${index}`"
      class="theme-switcher"
    >
      <div
        role="button"
        tabindex="0"
        class="theme-switcher-button cursor-pointer"
        :class="[{ active: activeMode === mode.id }, `theme-${mode.id}`]"
        :aria-label="`Switch to ${mode.label} theme - ${mode.description}`"
        :aria-pressed="activeMode === mode.id"
        @click="selectColorMode(mode.id)"
        @keydown.enter="selectColorMode(mode.id)"
        @keydown.space.prevent="selectColorMode(mode.id)"
      >
        <UiIconMaterial :icon-code="mode.icon" />
      </div>
      <p
        v-if="showLabels"
        class="theme-switcher-label"
      >
        {{ mode.label }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.theme-switcher {
  flex: 1 1 auto;

  .theme-switcher-button {
    --_light-color: #ffffff;
    --_light-color-container: rgb(from var(--theme-primary-base-fixed) r g b / 0.20);

    --_dark-color: #121212;
    --_dark-color-container: color-mix(in oklab, var(--theme-primary-base-fixed) 10%, #ffffff 30%);

    padding: .5rem;
    min-width: calc(100% / 3);
    border-radius: 12px;
    border: 2px solid var(--theme-surface-container-high);
    background: var(--theme-surface-container-highest);
    margin-bottom: .20rem;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: var(--theme-primary-a10);
    }

    i {
      position: inherit;
      font-size: 20px;
      z-index: 3;
      color: var(--_icon-color);
    }

    &:after {
      content: '';
      position: absolute;
      bottom: -.45rem;
      inset-inline: 0;
      margin: auto;
      width: 85%;
      height: 80%;
      border-radius: 4px;
      z-index: 1;
      background: var(--_color);
    }

    &.theme-system {
      --_color: linear-gradient(90deg, var(--_light-color-container) 50%, var(--_dark-color-container) 50%);
      --_icon-color: #000000;

      background: linear-gradient(90deg, var(--_light-color) 50%, var(--_dark-color) 50%);
    }

    &.theme-light {
      --_color: var(--_light-color-container);
      --_icon-color: #000000;

      background: var(--_light-color);
    }

    &.theme-dark {
      --_color: var(--_dark-color-container);
      --_icon-color: #ffffff;

      background: var(--_dark-color);
    }
  }

  .theme-switcher-label {
    font-size: var(--fs-sm-400);
    color: var(--theme-muted-a10);
    text-transform: capitalize;
    margin-bottom: 0;
  }

  &:has(.theme-switcher-button:is(.active)) {
    .theme-switcher-button {
      border-color: var(--theme-primary-a20);

      i {
        font-variation-settings: var(--iw-bold);
      }
    }

    .theme-switcher-label {
      color: var(--theme-on-background);
    }
  }
}
</style>
