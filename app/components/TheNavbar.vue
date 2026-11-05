<script setup lang="ts">
import { NuxtLink } from '#components'

/** Interfaces */
interface INavLink {
  id: string
  label: string
  to: string
  ariaLabel: string
  isSection?: boolean
}

/** Props */
const props = defineProps<{
  minimal?: boolean
}>()

/** Data */
const { locale, setLocale, t } = useI18n()
const localePath = useLocalePath()
// The router ignores the hash, so every home section link would match the home route as exact-active
const SectionLink = defineNuxtLink({
  componentName: 'SectionLink',
  activeClass: 'section-link-active',
  exactActiveClass: 'section-link-active'
})

/** Computed */
// Home section links carry the home path so they also work from other pages
const homePath = computed<string>(() => localePath('index'))
const navLinks = computed<INavLink[]>(() => props.minimal
  ? []
  : [
      {
        id: 'work',
        label: t('nav.work'),
        to: `${homePath.value}#work`,
        ariaLabel: t('nav.workAria'),
        isSection: true
      },
      {
        id: 'approach',
        label: t('nav.approach'),
        to: `${homePath.value}#approach`,
        ariaLabel: t('nav.approachAria'),
        isSection: true
      },
      {
        id: 'writing',
        label: t('nav.experiments'),
        to: `${homePath.value}#writing`,
        ariaLabel: t('nav.experimentsAria'),
        isSection: true
      },
      {
        id: 'pricing',
        label: t('pricing.link'),
        to: localePath('pricing'),
        ariaLabel: t('pricing.linkAria')
      },
      {
        id: 'contact',
        label: t('nav.contact'),
        to: `${homePath.value}#contact`,
        ariaLabel: t('nav.contactAria'),
        isSection: true
      }
    ])
const targetLocale = computed<'en' | 'es'>(() => (locale.value === 'en'
  ? 'es'
  : 'en'))
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
        @click="switchLocale"
      >
        <template #icon>
          <span class="locale-switcher-code">{{ targetLocale.toUpperCase() }}</span>
        </template>
      </UiButtonTooltip>
    </UiNavbarMobileMenu>

    <UiNavbarCollapse>
      <UiNavbarNav position="end">
        <UiNavbarLink
          v-for="link in navLinks"
          :key="link.id"
          :as="link.isSection ? SectionLink : NuxtLink"
          :to="link.to"
          :text="link.label"
          :aria-label="link.ariaLabel"
        />
        <UiNavbarItem>
          <UiButtonTooltip
            id="locale-switcher"
            icon
            :tooltip-text="localeSwitchLabel"
            :aria-label="localeSwitchLabel"
            @click="switchLocale"
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
  font-size: var(--cffy-fs-3xs);
  font-weight: var(--cffy-fw-700);
  letter-spacing: 0.04em;
  line-height: 1;
}
</style>
