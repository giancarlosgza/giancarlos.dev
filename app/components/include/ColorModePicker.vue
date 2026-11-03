<script setup lang="ts">
import type { ITabItem } from '@colorffy/ui'

/** Interfaces */
interface IColorModeProps {
  showLabels?: boolean
}

/** Props */
const { showLabels = true } = defineProps<IColorModeProps>()

/** Data */
const colorMode = useColorMode()
const { t } = useI18n()
// Scoped ids keep tab buttons unique if two pickers share a page
const idPrefix = useId()

/** Computed */
const colorModeTabs = computed<ITabItem[]>(() => [
  { id: `${idPrefix}-system`, label: t('colorMode.system'), icon: '&#xe31e;' },
  { id: `${idPrefix}-light`, label: t('colorMode.light'), icon: '&#xe518;' },
  { id: `${idPrefix}-dark`, label: t('colorMode.dark'), icon: '&#xe51c;' }
])
const activeTab = computed<string>(() => `${idPrefix}-${colorMode.preference}`)

/** Methods */
function selectColorMode(tabId: string): void {
  colorMode.preference = tabId.slice(idPrefix.length + 1)
}
</script>

<template>
  <UiTabs
    :tabs="colorModeTabs"
    :active-tab="activeTab"
    pill-tabs
    size="sm"
    rounded
    fit
    :icon-only="!showLabels"
    :aria-label="t('colorMode.label')"
    @update:active-tab="selectColorMode"
  />
</template>
