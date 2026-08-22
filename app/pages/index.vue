<script setup lang="ts">
import {
  brandIcons,
  experiments,
  principles,
  projects,
  stackGroups
} from '~/utils/portfolio'

/** Meta */
definePageMeta({
  pageTitle: 'Giancarlos Garza'
})
useSeoMeta({
  title: 'Front-End Engineer & UI/UX Designer',
  description: 'Giancarlos Garza builds high-performance interfaces, offline-first platforms and design systems with Vue, Nuxt and TypeScript.',
  ogTitle: 'Giancarlos Garza — Front-End Engineer & UI/UX Designer',
  ogDescription: 'High-performance interfaces, offline-first platforms and design systems built with Vue, Nuxt and TypeScript.',
  twitterTitle: 'Giancarlos Garza — Front-End Engineer & UI/UX Designer',
  twitterDescription: 'High-performance interfaces, offline-first platforms and design systems built with Vue, Nuxt and TypeScript.',
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
      <div class="container">
        <div class="hero-eyebrow">
          <UiBadge
            text="Available for select projects"
            variant="tonal tonal-success"
            icon-code="&#xe8e1;"
          />
        </div>

        <h1
          id="hero-title"
          class="hero-title"
        >
          High-performance interfaces &amp; design systems, built with code and visual precision.
        </h1>

        <p class="hero-lead">
          I'm <strong>Giancarlos Garza</strong> — a front-end engineer and UI/UX designer crafting
          minimal, resilient web products with Vue, Nuxt and TypeScript. I currently work independently
          on SaaS products and client platforms. Before that, I spent three years at the Municipal
          Government of Monterrey, designing and building administrative software and predictive
          reporting systems.
        </p>

        <div class="hero-actions">
          <UiButton
            variant="filled"
            color="primary"
            size="lg"
            text="Get in touch"
            href="mailto:hello@giancarlos.dev"
            aria-label="Send an email to Giancarlos Garza"
          >
            <template #icon>
              <UiIconMaterial icon-code="&#xe159;" />
            </template>
          </UiButton>
        </div>

        <div class="hero-meta">
          <span class="hero-meta-item">
            <UiIconMaterial icon-code="&#xf1db;" :size="18" />
            Nuevo Leon, Mexico
          </span>
          <span class="hero-meta-item">
            <UiIconMaterial icon-code="&#xe943;" :size="18" />
            7+ years shipping web products
          </span>
        </div>
      </div>
    </section>

    <!-- Selected Work -->
    <section
      id="work"
      class="portfolio-section"
      aria-labelledby="work-title"
    >
      <div class="container">
        <header class="section-head">
          <span class="section-index">01</span>
          <div>
            <h2
              id="work-title"
              class="text-heading"
            >
              Selected Work
            </h2>
            <p class="section-sub">
              Products and platforms where I owned the front end — measured by usage, not claims.
            </p>
          </div>
        </header>

        <div class="project-grid">
          <article
            v-for="project in projects"
            :key="project.id"
            class="project-card"
          >
            <div class="project-card-head">
              <span class="project-index">{{ project.id }}</span>
              <UiBadge
                :text="project.role"
                variant="tonal tonal-primary"
                custom-class="project-role"
              />
            </div>

            <h3 class="project-name">
              {{ project.name }}
            </h3>
            <p class="project-tagline">
              {{ project.tagline }}
            </p>
            <p class="project-description">
              {{ project.description }}
            </p>

            <dl class="project-metrics">
              <div
                v-for="metric in project.metrics"
                :key="metric.label"
                class="project-metric"
              >
                <dt class="project-metric-label">
                  {{ metric.label }}
                </dt>
                <dd class="project-metric-value">
                  {{ metric.value }}
                </dd>
              </div>
            </dl>

            <div class="project-foot">
              <div class="project-stack">
                <UiBadge
                  v-for="tech in project.stack"
                  :key="tech"
                  :text="tech"
                  variant="outline"
                />
              </div>
              <a
                v-if="project.href"
                :href="project.href"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link"
                :aria-label="`Visit ${project.name} at ${project.linkLabel}`"
              >
                {{ project.linkLabel }}
                <UiIconMaterial icon-code="&#xf1e1;" :size="18" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Approach -->
    <section
      id="approach"
      class="portfolio-section"
      aria-labelledby="approach-title"
    >
      <div class="container">
        <header class="section-head">
          <span class="section-index">02</span>
          <div>
            <h2
              id="approach-title"
              class="text-heading"
            >
              How I Work
            </h2>
            <p class="section-sub">
              The overlap of front-end engineering, interface design and reusable systems.
            </p>
          </div>
        </header>

        <div class="d-grid grid-repeat-cols-1 grid-repeat-cols-md-3 gap-3 mb-4">
          <div
            v-for="principle in principles"
            :key="principle.id"
            class="principle-card"
          >
            <UiIconMaterial
              :icon-code="principle.icon"
              class="principle-icon"
            />
            <h3 class="principle-title">
              {{ principle.title }}
            </h3>
            <p class="principle-text">
              {{ principle.text }}
            </p>
          </div>
        </div>

        <div class="stack-groups">
          <div
            v-for="group in stackGroups"
            :key="group.id"
            class="stack-group"
          >
            <span class="stack-group-label">
              <UiIconMaterial :icon-code="group.icon" :size="18" />
              {{ group.label }}
            </span>
            <p class="stack-group-items">
              {{ group.items }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Experiments -->
    <section
      id="writing"
      class="portfolio-section"
      aria-labelledby="writing-title"
    >
      <div class="container">
        <header class="section-head">
          <span class="section-index">03</span>
          <div>
            <h2
              id="writing-title"
              class="text-heading"
            >
              Experiments
            </h2>
            <p class="section-sub">
              Open-source libraries and tools I design, build and maintain — free for anyone to install.
            </p>
          </div>
        </header>

        <UiListGroup variant="flush">
          <UiListItem
            v-for="experiment in experiments"
            :key="experiment.id"
            :title="experiment.title"
            :text="experiment.text"
            :icon="experiment.icon"
            has-actions
            :href="experiment.href"
            :aria-label="`Open ${experiment.title} on ${experiment.linkLabel}`"
          >
            <template #list-action>
              <UiButtonTooltip
                :id="`experiment-link-${experiment.id}`"
                variant="text"
                custom-class="text-neutral m-0"
                icon
                :href="experiment.href"
                :tooltip-text="experiment.linkLabel"
              >
                <template #icon>
                  <UiIconMaterial icon-code="&#xe89e;" />
                </template>
              </UiButtonTooltip>
            </template>
          </UiListItem>
        </UiListGroup>
      </div>
    </section>

    <!-- Contact -->
    <section
      id="contact"
      class="portfolio-section"
      aria-labelledby="contact-title"
    >
      <div class="container">
        <div class="contact-panel">
          <UiBadge
            text="04 — Contact"
            variant="tonal tonal-accent"
            custom-class="mb-3"
          />
          <h2
            id="contact-title"
            class="contact-title"
          >
            Let's build something fast.
          </h2>
          <p class="contact-text">
            I take on selected product and front-end engagements — design systems, performance
            work and resilient web apps. The fastest way to reach me is email.
          </p>
          <UiButtonGroup>
            <UiButton
              variant="filled"
              color="primary"
              size="lg"
              text="hello@giancarlos.dev"
              href="mailto:hello@giancarlos.dev"
              aria-label="Send an email to Giancarlos Garza"
            >
              <template #icon>
                <UiIconMaterial icon-code="&#xe159;" />
              </template>
            </UiButton>
            <UiButton
              variant="outline"
              size="lg"
              text="GitHub"
              href="https://github.com/giancarlosgza"
              aria-label="Open Giancarlos Garza's GitHub profile"
            >
              <template #icon>
                <UiIconSvg :content="brandIcons.github" :size="20" />
              </template>
            </UiButton>
            <UiButton
              variant="outline"
              size="lg"
              text="LinkedIn"
              href="https://www.linkedin.com/in/giancarlos-garza-b37897139"
              aria-label="Open Giancarlos Garza's LinkedIn profile"
            >
              <template #icon>
                <UiIconSvg :content="brandIcons.linkedin" :size="20" />
              </template>
            </UiButton>
          </UiButtonGroup>
        </div>
      </div>
    </section>
  </div>
</template>
