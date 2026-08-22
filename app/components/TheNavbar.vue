<script setup lang="ts">
import { NuxtLink } from '#components'

/** Interfaces */
interface INavLink {
  id: string
  label: string
  href: string
  ariaLabel: string
}

/** Data */
const { $colorMode } = useNuxtApp()
const navLinks: INavLink[] = [
  { id: 'work', label: 'Work', href: '#work', ariaLabel: 'Jump to selected work section' },
  { id: 'approach', label: 'Approach', href: '#approach', ariaLabel: 'Jump to approach section' },
  { id: 'writing', label: 'Experiments', href: '#writing', ariaLabel: 'Jump to experiments section' },
  { id: 'contact', label: 'Contact', href: '#contact', ariaLabel: 'Jump to contact section' }
]

/** Computed */
const colorModeIcon = computed<string>(() => {
  const icons: Record<string, string> = {
    system: '&#xe31e;',
    light: '&#xe518;',
    dark: '&#xe51c;'
  }
  return icons[$colorMode.preference] ?? icons.system as string
})
const colorModeLabel = computed<string>(() => `Color mode: ${$colorMode.preference}. Activate to switch.`)

/** Methods */
function cycleColorMode(): void {
  const order = ['system', 'light', 'dark']
  const current = order.indexOf($colorMode.preference)
  $colorMode.preference = order[(current + 1) % order.length] as string
}
</script>

<template>
  <UiNavbar
    sticky
    custom-class="bg-frosted nav-island"
  >
    <UiNavbarTitle>
      <template #brand>
        <UiNavbarBrand
          text="Giancarlos Garza"
          :as="NuxtLink"
          :to="{ name: 'index' }"
        />
      </template>
    </UiNavbarTitle>

    <UiNavbarMobileMenu>
      <ClientOnly>
        <UiButtonTooltip
          id="color-mode-toggle-mobile"
          icon
          :tooltip-text="colorModeLabel"
          :aria-label="colorModeLabel"
          @on-click="cycleColorMode"
        >
          <template #icon>
            <UiIconMaterial :icon-code="colorModeIcon" />
          </template>
        </UiButtonTooltip>
      </ClientOnly>
    </UiNavbarMobileMenu>

    <UiNavbarCollapse>
      <UiNavbarNav position="start">
        <UiNavbarItem
          v-for="link in navLinks"
          :key="link.id"
        >
          <UiNavbarLink
            :href="link.href"
            :text="link.label"
            :aria-label="link.ariaLabel"
          />
        </UiNavbarItem>
        <UiNavbarItem>
          <ClientOnly>
            <UiButtonTooltip
              id="color-mode-toggle"
              icon
              :tooltip-text="colorModeLabel"
              :aria-label="colorModeLabel"
              @on-click="cycleColorMode"
            >
              <template #icon>
                <UiIconMaterial :icon-code="colorModeIcon" />
              </template>
            </UiButtonTooltip>
          </ClientOnly>
        </UiNavbarItem>
      </UiNavbarNav>
    </UiNavbarCollapse>
  </UiNavbar>
</template>
