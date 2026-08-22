<script setup lang="ts">
/** Composables */
const { $pwa } = useNuxtApp()
</script>

<template>
  <ClientOnly
    fallback-tag="div"
    fallback="PWA Prompt"
  >
    <Transition
      mode="out-in"
      name="slide-block"
    >
      <!-- Update Available -->
      <div
        v-if="$pwa?.needRefresh"
        class="pwa-alert-container"
        role="alert"
      >
        <div class="pwa-content">
          <div>
            <UiIconMaterial
              icon-code="&#xf000;"
              class="icon-wrap icon-wrap-xs icon-wrap-outline fs-600 text-on-body bg-success-fixed bg-opacity-20"
            />
          </div>
          <div class="pwa-content-text-wrapper">
            <p
              class="subtitle-2 text-on-body fw-500"
              title="Reload to get the latest updates"
            >
              Update Available
            </p>
          </div>
        </div>
        <div class="pwa-actions">
          <UiButton
            variant="outline"
            text="Reload"
            size="sm"
            class="text-neutral"
            @on-click="$pwa?.updateServiceWorker()"
          />
        </div>
      </div>

      <!-- Install Prompt -->
      <div
        v-else-if="$pwa?.showInstallPrompt"
        class="pwa-alert-container"
        role="alert"
      >
        <div class="pwa-content">
          <img
            src="@/assets/images/icon.png"
            class="img-fluid img-avatar avatar-navbar img-fit-contain rounded-sm"
            alt="Giancarlos Garza portfolio icon"
          >
          <div class="pwa-content-text-wrapper">
            <p class="subtitle-1">
              Install Giancarlos Garza
            </p>
            <p class="subtitle-2">
              Add this portfolio to your device for quick access.
            </p>
          </div>
        </div>
        <div class="pwa-actions">
          <UiButton
            variant="text"
            class="text-neutral"
            text="Not now"
            size="sm"
            @on-click="$pwa.cancelInstall()"
          />
          <UiButton
            variant="gradient"
            text="Install"
            size="sm"
            rounded class="px-3"
            @on-click="$pwa.install()"
          />
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>
