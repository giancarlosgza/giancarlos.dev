<script setup lang="ts">
/** Meta */
definePageMeta({
  pageTitle: 'Home'
})
useSeoMeta({
  title: 'Home',
  description: 'Nuxt starter home page.',
  ogTitle: 'Home',
  ogDescription: 'Nuxt starter home page.',
  twitterTitle: 'Home',
  twitterDescription: 'Nuxt starter home page.',
  twitterCard: 'summary'
})

/** Data */

/** Mounted */

/** Methods */
</script>

<template>
  <div>
    <div class="container-fluid">
      <!-- Header -->
      <UiHeaderContent
        title="Get Started with Nuxt 3"
        subtitle="Welcome to the Nuxt 3 starter template."
      />

      <!-- Content -->
    </div>
  </div>
</template>
