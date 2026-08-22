<script setup lang="ts">
</script>

<template>
  <div class="portfolio-layout">
    <TheNavbar />

    <main id="main-content">
      <slot />
    </main>

    <TheFooter />

    <!-- PWA Prompt -->
    <LazyIncludePwaPromptAlert />
  </div>
</template>
