<script setup lang="ts">
const head = useLocaleHead()
useHead(head)
</script>

<template>
  <div class="portfolio-layout">
    <TheNavbar />

    <main id="main-content">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
