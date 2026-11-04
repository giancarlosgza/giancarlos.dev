<script setup lang="ts">
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
