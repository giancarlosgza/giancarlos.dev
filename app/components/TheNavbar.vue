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
const { locale, setLocale, t } = useI18n()
const localePath = useLocalePath()

/** Computed */
const navLinks = computed<INavLink[]>(() => [
  { id: 'work', label: t('nav.work'), href: '#work', ariaLabel: t('nav.workAria') },
  { id: 'approach', label: t('nav.approach'), href: '#approach', ariaLabel: t('nav.approachAria') },
  { id: 'writing', label: t('nav.experiments'), href: '#writing', ariaLabel: t('nav.experimentsAria') },
  { id: 'contact', label: t('nav.contact'), href: '#contact', ariaLabel: t('nav.contactAria') }
])
const targetLocale = computed<'en' | 'es'>(() => (locale.value === 'en' ? 'es' : 'en'))
const localeSwitchLabel = computed<string>(() => t('nav.switchLocale'))

/** Methods */
async function switchLocale(): Promise<void> {
  await setLocale(targetLocale.value)
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
          :to="localePath('index')"
        />
      </template>
    </UiNavbarTitle>

    <UiNavbarMobileMenu>
      <UiButtonTooltip
        id="locale-switcher-mobile"
        icon
        :tooltip-text="localeSwitchLabel"
        :aria-label="localeSwitchLabel"
        @on-click="switchLocale"
      >
        <template #icon>
          <span class="locale-switcher-code">{{ targetLocale.toUpperCase() }}</span>
        </template>
      </UiButtonTooltip>
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
          <UiButtonTooltip
            id="locale-switcher"
            icon
            :tooltip-text="localeSwitchLabel"
            :aria-label="localeSwitchLabel"
            @on-click="switchLocale"
          >
            <template #icon>
              <span class="locale-switcher-code">{{ targetLocale.toUpperCase() }}</span>
            </template>
          </UiButtonTooltip>
        </UiNavbarItem>
      </UiNavbarNav>
    </UiNavbarCollapse>
  </UiNavbar>
</template>

<style scoped lang="scss">
.locale-switcher-code {
  font-size: var(--fs-sm-400);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
}
</style>
