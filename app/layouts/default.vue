<script setup lang="ts">
import type { INavItem } from '@colorffy/ui'
import { NuxtLink } from '#components'

/** Data */
const head = useLocaleHead()
const { t } = useI18n()
const localePath = useLocalePath()
const getRouteBaseName = useRouteBaseName()
const route = useRoute()

/** Computed */
const pageItems = computed<INavItem[]>(() => [
  {
    id: 'index',
    to: localePath('index'),
    icon: '&#xe88a;',
    text: t('nav.home'),
    ariaLabel: t('nav.homeAria')
  },
  {
    id: 'pricing',
    to: localePath('pricing'),
    icon: '&#xea12;',
    text: t('pricing.link'),
    ariaLabel: t('pricing.linkAria')
  }
])
const activePage = computed<string | null>(() => {
  const name = getRouteBaseName(route)
  return typeof name === 'string'
    ? name
    : null
})

/** Meta */
useHead(head)
</script>

<template>
  <div class="portfolio-layout">
    <TheNavbar />

    <main id="main-content">
      <slot />
    </main>

    <TheFooter />

    <UiNavigationBar
      :as="NuxtLink"
      :items="pageItems"
      :active-item="activePage"
      frosted
      indicator-tab
    />
  </div>
</template>
