<script setup lang="ts">
import {
  brandIcons,
  experiments,
  principles,
  projects,
  stackGroups
} from '~/utils/portfolio'
import { withUtm } from '~/utils/utm'

/** Data */
const { t, locale } = useI18n()
const activeProjectId = ref(projects[0]?.id ?? '')
const activeExperimentId = ref(experiments[0]?.id ?? '')

// Blooms mount only after the expand motion settles, so the WebGL canvas
// never competes with the layout animation for frame time.
const { colorMode, meshBase, tokenPalettes: experimentMeshColors } = useMeshGradient(experiments)
const settledProjectId = useSettledValue(activeProjectId, '')
const settledExperimentId = useSettledValue(activeExperimentId, '')

/** Meta */
definePageMeta({
  pageTitle: 'Giancarlos Garza'
})
useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.ogTitle'),
  ogDescription: () => t('seo.ogDescription'),
  twitterTitle: () => t('seo.ogTitle'),
  twitterDescription: () => t('seo.ogDescription'),
  twitterCard: 'summary'
})
</script>

<template>
  <div class="portfolio-page">
    <!-- Hero -->
    <section
      class="portfolio-hero"
      aria-labelledby="hero-title"
    >
      <ClientOnly>
        <div
          class="hero-field"
          aria-hidden="true"
        >
          <AppStaticMeshGradient
            :key="`hero-${colorMode.value}`"
            :colors="[meshBase, '#223fff', '#9099ff', '#ffa47f']"
          />
        </div>
      </ClientOnly>

      <div class="container text-center">
        <div class="hero-eyebrow">
          <IncludeStatusLabel :text="t('availability')" />
        </div>

        <h1
          id="hero-title"
          class="hero-title display-1 mx-auto"
        >
          {{ t('hero.title') }}
        </h1>

        <i18n-t
          keypath="hero.lead"
          tag="p"
          class="hero-lead mx-auto"
          scope="global"
        >
          <template #name>
            <strong>Giancarlos Garza</strong>
          </template>
        </i18n-t>

        <UiButtonGroup
          variant="connected"
          class="mb-5 justify-content-center"
        >
          <UiButton
            variant="filled"
            color="primary"
            size="lg"
            :text="t('hero.cta')"
            href="mailto:hello@giancarlos.dev"
            :aria-label="t('hero.ctaAria')"
          >
            <template #icon>
              <UiIconMaterial icon-code="&#xe159;" />
            </template>
          </UiButton>
          <UiButton
            href="#work"
            variant="text"
            size="lg"
            :text="t('hero.secondaryCta')"
          />
        </UiButtonGroup>

        <div class="hero-meta justify-content-center">
          <span class="hero-meta-item">
            <UiIconMaterial icon-code="&#xf1db;" :size="18" />
            {{ t('hero.metaLocation') }}
          </span>
          <span class="hero-meta-item">
            <UiIconMaterial icon-code="&#xe943;" :size="18" />
            {{ t('hero.metaExperience') }}
          </span>
        </div>
      </div>
    </section>

    <!-- Selected Work -->
    <section
      id="work"
      class="page-section"
      aria-labelledby="work-title"
    >
      <div class="container">
        <div class="row justify-content-center">
          <header class="col-xl-6 text-center section-header">
            <p class="section-eyebrow">
              {{ t('work.title') }}
            </p>
            <h2
              id="work-title"
              class="display-2"
            >
              {{ t('work.headline') }}
            </h2>
            <p class="display-copy">
              {{ t('work.subtitle') }}
            </p>
          </header>
        </div>

        <div class="project-ledger">
          <article
            v-for="project in projects"
            :key="project.id"
            class="project-row"
            :class="{ 'is-active': project.id === activeProjectId }"
            @mouseenter="activeProjectId = project.id"
          >
            <ClientOnly>
              <div
                v-if="project.id === settledProjectId"
                class="project-bloom"
                aria-hidden="true"
              >
                <AppStaticMeshGradient
                  :key="`${project.id}-${colorMode.value}`"
                  :colors="[meshBase, ...project.meshColors]"
                />
              </div>
            </ClientOnly>

            <button
              :id="`project-head-${project.id}`"
              type="button"
              class="project-row-head"
              :aria-expanded="project.id === activeProjectId"
              :aria-controls="`project-panel-${project.id}`"
              @click="activeProjectId = project.id"
            >
              <span class="project-index">{{ project.id }}</span>
              <span class="project-heading">
                <span class="project-name">{{ project.name }}</span>
                <span class="project-tagline">{{ t(project.tagline) }}</span>
              </span>
              <span class="summary-metrics">
                <span
                  v-for="metric in project.metrics"
                  :key="metric.label"
                  class="summary-metric"
                >
                  <strong>{{ metric.value }}</strong> {{ t(metric.label) }}
                </span>
              </span>
            </button>

            <div
              :id="`project-panel-${project.id}`"
              class="project-row-panel"
              role="region"
              :aria-labelledby="`project-head-${project.id}`"
            >
              <div class="d-inline-flex">
                <UiBadge
                  :text="t(project.role)"
                  variant="tonal tonal-primary"
                  custom-class="project-role"
                />
              </div>

              <p class="project-description">
                {{ t(project.description) }}
              </p>

              <ul class="project-timeline">
                <li
                  v-for="metric in project.metrics"
                  :key="metric.label"
                  class="project-step"
                >
                  <span class="project-step-chip">
                    <UiIconMaterial :icon-code="metric.icon" :size="18" />
                  </span>
                  <span class="project-step-text">
                    <strong>{{ metric.value }}</strong> {{ t(metric.label) }}
                  </span>
                </li>
              </ul>

              <div class="project-foot">
                <div class="project-stack">
                  <UiBadge
                    v-for="tech in project.stack"
                    :key="tech"
                    :text="tech"
                    variant="outline"
                    class="bg-frosted"
                  />
                </div>
                <div class="d-inline-flex">
                  <a
                    v-if="project.href"
                    :href="withUtm(project.href, 'portfolio', locale)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-link"
                    :aria-label="t('work.visitAria', { name: project.name, label: project.linkLabel })"
                  >
                    {{ project.linkLabel }}
                    <UiIconMaterial icon-code="&#xf1e1;" class="fs-sm" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Approach -->
    <section
      id="approach"
      class="page-section bg-surface-pane"
      aria-labelledby="approach-title"
    >
      <div class="container">
        <div class="row justify-content-center">
          <header class="col-xl-6 text-center section-header">
            <p class="section-eyebrow">
              {{ t('approach.title') }}
            </p>
            <h2
              id="approach-title"
              class="display-2"
            >
              {{ t('approach.headline') }}
            </h2>
            <p class="display-copy">
              {{ t('approach.subtitle') }}
            </p>
          </header>
        </div>

        <div class="approach-layout">
          <div class="stack-groups">
            <div
              v-for="group in stackGroups"
              :key="group.id"
            >
              <span class="stack-group-label">{{ t(group.label) }}</span>
              <p class="stack-group-items">
                {{ t(group.items) }}
              </p>
            </div>
          </div>

          <ol class="principles-list">
            <li
              v-for="(principle, index) in principles"
              :key="principle.id"
              class="principle-row"
            >
              <span
                class="principle-index"
                aria-hidden="true"
              >{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <h3 class="principle-title">
                  {{ t(principle.title) }}
                </h3>
                <p class="principle-text">
                  {{ t(principle.text) }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Experiments -->
    <section
      id="writing"
      class="page-section"
      aria-labelledby="writing-title"
    >
      <div class="container">
        <div class="row justify-content-center">
          <header class="col-xl-6 text-center section-header">
            <p class="section-eyebrow">
              {{ t('experimentsSection.title') }}
            </p>
            <h2
              id="writing-title"
              class="display-2"
            >
              {{ t('experimentsSection.headline') }}
            </h2>
            <p class="display-copy">
              {{ t('experimentsSection.subtitle') }}
            </p>
          </header>
        </div>

        <div class="experiment-carousel">
          <article
            v-for="experiment in experiments"
            :key="experiment.id"
            class="experiment-slide"
            :class="{ 'is-active': experiment.id === activeExperimentId }"
            :style="{ '--slide-tint': `var(${experiment.tintVar})` }"
          >
            <ClientOnly>
              <div
                v-if="experiment.id === settledExperimentId && experimentMeshColors[experiment.id]"
                class="project-bloom"
                aria-hidden="true"
              >
                <AppStaticMeshGradient
                  :key="`${experiment.id}-${experimentMeshColors[experiment.id]?.join()}`"
                  :colors="experimentMeshColors[experiment.id]"
                />
              </div>
            </ClientOnly>

            <button
              type="button"
              class="experiment-rail"
              :aria-expanded="experiment.id === activeExperimentId"
              :aria-controls="`experiment-panel-${experiment.id}`"
              :aria-label="t('experimentsSection.expandAria', { title: experiment.title })"
              @click="activeExperimentId = experiment.id"
            >
              <UiIconMaterial :icon-code="experiment.icon" :size="20" />
              <span class="experiment-rail-title">{{ experiment.title }}</span>
            </button>

            <div
              :id="`experiment-panel-${experiment.id}`"
              class="experiment-panel"
            >
              <span class="experiment-chip">
                <UiIconMaterial :icon-code="experiment.icon" :size="20" />
              </span>
              <h3 class="experiment-title">
                {{ experiment.title }}
              </h3>
              <p class="experiment-text">
                {{ t(experiment.text) }}
              </p>
              <div class="d-inline-flex mt-auto">
                <a
                  :href="experiment.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-link"
                  :aria-label="t('experimentsSection.openAria', { title: experiment.title, label: experiment.linkLabel })"
                >
                  {{ experiment.linkLabel }}
                  <UiIconMaterial icon-code="&#xf1e1;" class="fs-sm" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section
      id="contact"
      class="page-section"
      aria-labelledby="contact-title"
    >
      <div class="container">
        <div class="contact-panel">
          <ClientOnly>
            <AppStaticMeshGradient />
          </ClientOnly>
          <div class="contact-content">
            <UiBadge
              :text="t('contact.badge')"
              variant="tonal tonal-accent"
              custom-class="mb-3"
            />
            <h2
              id="contact-title"
              class="contact-title display-2"
            >
              {{ t('contact.title') }}
            </h2>
            <p class="contact-text">
              {{ t('contact.text') }}
            </p>
            <UiButtonGroup class="justify-content-center">
              <UiButton
                variant="filled"
                color="primary"
                size="lg"
                text="hello@giancarlos.dev"
                href="mailto:hello@giancarlos.dev"
                :aria-label="t('contact.emailAria')"
              >
                <template #icon>
                  <UiIconMaterial icon-code="&#xe159;" />
                </template>
              </UiButton>
              <UiButton
                variant="frosted"
                size="lg"
                text="GitHub"
                href="https://github.com/giancarlosgza"
                :aria-label="t('contact.githubAria')"
              >
                <template #icon>
                  <UiIconSvg :content="brandIcons.github" :size="20" />
                </template>
              </UiButton>
              <UiButton
                variant="frosted"
                size="lg"
                text="LinkedIn"
                href="https://www.linkedin.com/in/giancarlos-garza-b37897139"
                :aria-label="t('contact.linkedinAria')"
              >
                <template #icon>
                  <UiIconSvg :content="brandIcons.linkedin" :size="20" />
                </template>
              </UiButton>
            </UiButtonGroup>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
