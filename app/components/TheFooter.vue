<script setup lang="ts">
/** Data */
const { t } = useI18n()

/** Computed */
const appVersion = useAppVersion()
const currentYear = computed<number>(() => new Date().getFullYear())
</script>

<template>
  <footer class="portfolio-footer">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 mb-4">
          <p class="footer-title mb-2">
            Giancarlos Garza
          </p>
          <p class="footer-subtitle mb-3">
            {{ t('footer.subtitle') }}
          </p>
          <ClientOnly>
            <LazyIncludeColorModePicker :show-labels="false" class="d-inline-flex" />
          </ClientOnly>
        </div>
        <div class="col-6 col-md-4 footer-group footer-col">
          <p>{{ t('footer.explore') }}</p>
          <a href="#work">{{ t('nav.work') }}</a>
          <a href="#approach">{{ t('nav.approach') }}</a>
          <a href="#writing">{{ t('nav.experiments') }}</a>
        </div>
        <div class="col-6 col-md-4 footer-group footer-col">
          <p>{{ t('footer.connect') }}</p>
          <a
            href="mailto:hello@giancarlos.dev"
            :aria-label="t('footer.emailAria')"
          >{{ t('footer.email') }}</a>
          <a
            href="https://github.com/giancarlosgza"
            target="_blank"
            rel="noopener noreferrer"
          >GitHub</a>
          <a
            href="https://www.linkedin.com/in/giancarlos-garza-b37897139"
            target="_blank"
            rel="noopener noreferrer"
          >LinkedIn</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          {{ t('footer.copyright', { year: currentYear }) }}
        </p>

        <UiBadge
          :text="`v${appVersion}`"
          :title="t('footer.versionTitle')"
          variant="outline"
          icon-code="&#xf720;"
          icon-class="text-accent-fixed"
        />
      </div>
    </div>
  </footer>
</template>
