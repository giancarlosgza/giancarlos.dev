import { en } from '@colorffy/ui/locales/en'
import { es } from '@colorffy/ui/locales/es'

// nuxt.config's colorffyUI is build-time; this follows the i18n locale
export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n
  // useColorffyConfig() injects, so it needs the app's context inside a plugin
  const config = nuxtApp.vueApp.runWithContext(() => useColorffyConfig())

  watch(i18n.locale, (code) => {
    config.locale = i18n.locales.value.find(item => item.code === code)?.language ?? code
    config.labels = code === 'es'
      ? es
      : en
  }, { immediate: true })
})
