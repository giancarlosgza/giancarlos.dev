<script setup lang="ts">
/** i18n head (html lang, hreflang alternates, og:locale) */
const head = useLocaleHead()
useHead(head)
</script>

<template>
  <div class="portfolio-layout">
    <TheNavbar minimal />

    <main id="main-content">
      <slot />
    </main>
  </div>
</template>
