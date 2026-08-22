<script setup lang="ts">
/** Meta */
definePageMeta({
  pageTitle: 'Web Block - Analysis Chat Detail'
})
useSeoMeta({
  title: 'Web Block - Analysis Chat Detail',
  description: 'Web Block for detailed chat analysis and insights.'
})
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="chat-layout">
          <h1 class="fs-300 fw-600 text-center">
            Search for
            <span class="text-gradient gradient-secondary">vehicles, models</span>, and more.
          </h1>

          <div class="chat-container">
            <UiInputText
              id="search-input"
              placeholder="Search for vehicles, models, and more."
              variant="transparent" rounded
            />
            <div class="d-flex justify-content-between align-items-center">
              <UiButtonGroup connected joined>
                <UiButton
                  id="add-search-button"
                  variant="text"
                  class="text-neutral"
                  text="Add" size="sm"
                >
                  <template #icon>
                    <UiIconMaterial icon-code="&#xe145;" />
                  </template>
                </UiButton>
                <UiButton
                  id="tune-search-button"
                  variant="text"
                  class="text-neutral"
                  text="Tools" size="sm"
                >
                  <template #icon>
                    <UiIconMaterial icon-code="&#xf614;" />
                  </template>
                </UiButton>
              </UiButtonGroup>
              <UiButton
                id="search-button"
                variant="tonal"
                color="primary"
                icon
              >
                <template #icon>
                  <UiIconMaterial icon-code="&#xe8b6;" />
                </template>
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
