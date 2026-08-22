<script setup lang="ts">
import { NuxtLink } from '#components'

/** Data */
const route = useRoute()
const menuItems = [
  {
    id: 'home',
    to: '/',
    icon: '&#xe66b;',
    text: 'Home',
    ariaLabel: 'Navigate to home page'
  },
  {
    id: 'blocks',
    to: '/blocks',
    icon: '&#xe1bd;',
    text: 'Blocks',
    ariaLabel: 'Go to blocks page'
  },
  {
    id: 'components',
    to: { name: 'components', query: { ref: 'bottom-bar' } },
    icon: '&#xe574;',
    text: 'Components',
    ariaLabel: 'Go to components page'
  }
]
</script>

<template>
  <div class="grid-main-content">
    <TheSidebar />

    <main>
      <TheNavbar />
      <slot />
      <UiNavigationBar
        :as="NuxtLink"
        :items="menuItems"
        :active-item="route.path"
      />

      <!-- PWA Prompt -->
      <LazyIncludePwaPromptAlert />
    </main>
  </div>
</template>
