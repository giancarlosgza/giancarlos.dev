<script setup lang="ts">
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
            Front-End Engineer & UI/UX Designer building high-performance interfaces and design systems.
          </p>
          <ClientOnly>
            <LazyIncludeColorModePicker :show-labels="false" class="d-inline-flex" />
          </ClientOnly>
        </div>
        <div class="col-6 col-md-4 footer-group footer-col">
          <p>Explore</p>
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#writing">Experiments</a>
        </div>
        <div class="col-6 col-md-4 footer-group footer-col">
          <p>Connect</p>
          <a
            href="mailto:hello@giancarlos.dev"
            aria-label="Send an email to Giancarlos Garza"
          >Email</a>
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
          © {{ currentYear }} Giancarlos Garza — Nuevo Leon, Mexico
        </p>

        <UiBadge
          :text="`v${appVersion}`"
          title="Site version"
          variant="outline"
          icon-code="&#xf720;"
          icon-class="text-accent-fixed"
        />
      </div>
    </div>
  </footer>
</template>
