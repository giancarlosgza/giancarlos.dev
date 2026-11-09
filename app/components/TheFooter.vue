<script setup lang="ts">
import { PROFILE_LINKS } from '~/utils/seo'

/** Data */
const { t } = useI18n()
const localePath = useLocalePath()

/** Computed */
const homePath = computed<string>(() => localePath('index'))
const appVersion = useAppVersion()
const currentYear = computed<number>(() => new Date().getFullYear())

/** Methods */
function scrollToTop(): void {
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <footer class="portfolio-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-intro">
          <p class="footer-lead">
            {{ t('footer.subtitle') }}
          </p>
          <IncludeStatusLabel :text="t('availability')" />
        </div>

        <nav
          class="footer-group footer-explore"
          :aria-label="t('footer.explore')"
        >
          <p class="footer-group-title-overline">
            {{ t('footer.explore') }}
          </p>
          <NuxtLink
            :to="`${homePath}#work`"
            class="footer-item"
          >{{ t('nav.work') }}</NuxtLink>
          <NuxtLink
            :to="`${homePath}#approach`"
            class="footer-item"
          >{{ t('nav.approach') }}</NuxtLink>
          <NuxtLink
            :to="`${homePath}#writing`"
            class="footer-item"
          >{{ t('nav.experiments') }}</NuxtLink>
          <NuxtLink
            :to="localePath('pricing')"
            class="footer-item"
            :aria-label="t('pricing.linkAria')"
          >{{ t('pricing.link') }}</NuxtLink>
        </nav>

        <nav
          class="footer-group footer-connect"
          :aria-label="t('footer.connect')"
        >
          <p class="footer-group-title-overline">
            {{ t('footer.connect') }}
          </p>
          <a
            href="mailto:hello@giancarlos.dev"
            class="footer-item"
            :aria-label="t('footer.emailAria')"
          >hello@giancarlos.dev</a>
          <a
            :href="PROFILE_LINKS.github"
            class="footer-item"
            target="_blank"
            rel="noopener noreferrer"
          >GitHub</a>
          <a
            :href="PROFILE_LINKS.linkedin"
            class="footer-item"
            target="_blank"
            rel="noopener noreferrer"
          >LinkedIn</a>
        </nav>

        <div class="footer-top-action">
          <UiButtonTooltip
            id="footer-back-to-top"
            icon
            rounded
            variant="outline"
            :tooltip-text="t('footer.backToTop')"
            :aria-label="t('footer.backToTop')"
            @click="scrollToTop"
          >
            <template #icon>
              <UiIconMaterial icon-code="&#xe5d8;" />
            </template>
          </UiButtonTooltip>
        </div>
      </div>

      <p
        class="footer-wordmark"
        aria-hidden="true"
      >
        Giancarlos Garza
      </p>

      <div class="footer-bottom">
        <p>{{ t('footer.copyright', { year: currentYear }) }}</p>

        <div class="footer-meta">
          <ClientOnly>
            <LazyIncludeColorModePicker :show-labels="false" />
          </ClientOnly>
          <UiBadge
            :text="`v${appVersion}`"
            :title="t('footer.versionTitle')"
            variant="outline"
            icon-code="&#xf720;"
            icon-class="text-accent-fixed"
          />
        </div>
      </div>
    </div>
  </footer>
</template>
