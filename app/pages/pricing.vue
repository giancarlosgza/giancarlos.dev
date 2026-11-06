<script setup lang="ts">
import type { IChipOption } from '@colorffy/ui'
import type { IPricingExtra, TPricingPack, TPricingPlanId } from '~/utils/pricing'
import {
  BASE_PLAN,
  CONTACT_EMAIL,
  formatMxn,
  PACK_PLANS,
  PRICING_EXTRAS,
  PRICING_PACKS,
  PRICING_PLANS
} from '~/utils/pricing'
import { jsonLdScript } from '~/utils/seo'

/** Data */
const { t, locale } = useI18n()
const route = useRoute()
const siteUrl = useRuntimeConfig().public.siteUrl
const { colorMode, meshBase } = useMeshGradient()
const packId = ref<TPricingPack>('cafe')
const isBase = ref<boolean>(false)
const picked = ref<Record<string, boolean>>({})
const isExtrasOpen = ref<boolean>(true)
const isBreakdownOpen = ref<boolean>(false)
const faqIds = [
  'delivery',
  'content',
  'change',
  'google'
]
const terms = [
  { id: 'delivery', icon: '&#xe8b5;' },
  { id: 'changes', icon: '&#xe745;' },
  { id: 'domain', icon: '&#xe894;' },
  { id: 'payment', icon: '&#xef6e;' }
]

/** Computed */
const planId = computed<TPricingPlanId>(() => isBase.value ? 'base' : packId.value)
const plan = computed(() => PRICING_PLANS[planId.value])
const pack = computed(() => PACK_PLANS[packId.value])
const planName = computed<string>(() => t(`pricing.plans.${planId.value}.name`))
const packName = computed<string>(() => t(`pricing.plans.${packId.value}.name`))
const planLabel = computed<string>(() => isBase.value
  ? t('pricing.base.overline')
  : t(`pricing.plans.${packId.value}.label`))
const packOptions = computed<IChipOption[]>(() => PRICING_PACKS.map(id => ({
  id,
  text: t(`pricing.plans.${id}.label`)
})))
// No chip is selected while the base plan is chosen; clicking the selected chip emits null and is ignored
const selectedPack = computed<string | null>({
  get: () => isBase.value ? null : packId.value,
  set: (value) => {
    if (!value)
      return
    packId.value = value as TPricingPack
    isBase.value = false
  }
})
const extras = computed<IPricingExtra[]>(() => PRICING_EXTRAS.filter(extra => extra.plans.includes(planId.value)))
const chosenExtras = computed<IPricingExtra[]>(() => extras.value.filter(extra => picked.value[extra.id]))
const monthlyExtras = computed<IPricingExtra[]>(() => chosenExtras.value.filter(extra => extra.recurring))
const oneTimeExtras = computed<IPricingExtra[]>(() => chosenExtras.value.filter(extra => !extra.recurring))
const monthlyTotal = computed<number>(() => monthlyExtras.value.reduce((sum, extra) => sum + extra.price, plan.value.monthly))
const upfrontTotal = computed<number>(() => oneTimeExtras.value.reduce((sum, extra) => sum + extra.price, plan.value.setup))
const extrasCountLabel = computed<string>(() => chosenExtras.value.length
  ? t('pricing.extras.selected', { count: chosenExtras.value.length, total: extras.value.length })
  : t('pricing.extras.available', { count: extras.value.length }))
const toSummaryLabel = computed<string>(() => chosenExtras.value.length
  ? t('pricing.pack.toSummaryExtras', { count: chosenExtras.value.length })
  : t('pricing.pack.toSummary'))
const startDetail = computed<string>(() => t(
  oneTimeExtras.value.length ? 'pricing.summary.schedule.startDetailExtras' : 'pricing.summary.schedule.startDetail',
  {
    setup: formatMxn(upfrontTotal.value),
    monthly: formatMxn(monthlyTotal.value)
  }
))
const planMessage = computed<string>(() => {
  const names = chosenExtras.value.map(extra => t(`pricing.extras.items.${extra.id}.name`).toLocaleLowerCase(locale.value))
  return t('pricing.summary.message', {
    plan: t(isBase.value ? 'pricing.summary.planBase' : 'pricing.summary.planPack', { name: planName.value }),
    extras: names.length
      ? t('pricing.summary.messageExtras', {
          list: names.join(', ')
        })
      : '',
    total: formatMxn(monthlyTotal.value)
  })
})
const oneTimeNote = computed<string>(() => t('pricing.summary.note', {
  base: formatMxn(BASE_PLAN.oneTime),
  pack: formatMxn(PACK_PLANS.cafe.oneTime)
}))

/** Methods */
function mailtoHref(plan: string, body: string): string {
  const subject = t('pricing.summary.subject', { plan })
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
function extraPriceLabel(extra: IPricingExtra): string {
  return t(extra.recurring ? 'pricing.extras.perMonth' : 'pricing.extras.oneTime', { price: `$${formatMxn(extra.price)}` })
}

/** Lifecycle */
onMounted(() => {
  if (window.matchMedia('(width < 48rem)').matches)
    isExtrasOpen.value = false
})

/** Meta */
useSeoMeta({
  title: () => t('pricing.seo.title'),
  description: () => t('pricing.seo.description'),
  ogTitle: () => t('pricing.seo.title'),
  ogDescription: () => t('pricing.seo.description'),
  twitterTitle: () => t('pricing.seo.title'),
  twitterDescription: () => t('pricing.seo.description')
})
useShareImage('plans', () => t('pricing.seo.title'))
useHead(() => {
  const monthlyPrices = Object.values(PRICING_PLANS).map(item => item.monthly)
  return {
    script: [
      jsonLdScript({
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        'name': 'Giancarlos Garza',
        'url': `${siteUrl}${route.path}`,
        'description': t('pricing.seo.description'),
        'image': `${siteUrl}/images/og/plans-${locale.value}.jpg`,
        'email': CONTACT_EMAIL,
        'founder': { '@id': `${siteUrl}/#person` },
        'areaServed': { '@type': 'City', 'name': 'Monterrey' },
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Monterrey',
          'addressRegion': 'Nuevo León',
          'addressCountry': 'MX'
        },
        'priceRange': `$${formatMxn(Math.min(...monthlyPrices))}–$${formatMxn(Math.max(...monthlyPrices))} MXN`,
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': t('pricing.seo.title'),
          'itemListElement': Object.values(PRICING_PLANS).map(item => ({
            '@type': 'Offer',
            'name': t(`pricing.plans.${item.id}.name`),
            'priceSpecification': {
              '@type': 'UnitPriceSpecification',
              'price': item.monthly,
              'priceCurrency': 'MXN',
              'unitCode': 'MON',
              'valueAddedTaxIncluded': false
            }
          }))
        }
      })
    ]
  }
})
</script>

<template>
  <div class="portfolio-page pricing-page">
    <!-- Hero -->
    <section
      class="portfolio-hero pricing-hero"
      aria-labelledby="pricing-title"
    >
      <ClientOnly>
        <div
          class="hero-field"
          aria-hidden="true"
        >
          <AppStaticMeshGradient
            :key="`pricing-hero-${colorMode.value}`"
            :colors="[meshBase, '#223fff', '#9099ff', '#ffa47f']"
          />
        </div>
      </ClientOnly>

      <div class="container text-center">
        <h1
          id="pricing-title"
          class="hero-title display-1 mx-auto"
        >
          {{ t('pricing.hero.title') }}
        </h1>
        <p class="hero-lead mx-auto">
          {{ t('pricing.hero.lead') }}
        </p>
        <div class="hero-meta justify-content-center">
          <span class="hero-meta-item">
            <UiIconMaterial icon-code="&#xe8b5;" :size="18" />
            {{ t('pricing.hero.metaDelivery') }}
          </span>
          <span class="hero-meta-item">
            <UiIconMaterial icon-code="&#xef6e;" :size="18" />
            {{ t('pricing.hero.metaInvoice') }}
          </span>
        </div>
      </div>
    </section>

    <section
      class="container mt-section mt-section-lg"
      :aria-label="t('pricing.link')"
    >
      <!-- Plans -->
      <UiCard
        variant="pane"
        custom-class="pricing-board"
      >
        <template #body>
          <!-- Base -->
          <div class="pricing-col">
            <div>
              <p class="pricing-overline">
                {{ t('pricing.base.overline') }}
              </p>
              <h2 class="pricing-plan-name">
                {{ t('pricing.plans.base.name') }}
              </h2>
              <p class="m-0 text-muted">
                {{ t('pricing.base.lead') }}
              </p>
            </div>
            <p class="pricing-price">
              <strong>${{ formatMxn(BASE_PLAN.monthly) }}</strong>
              <span>{{ t('pricing.perMonth') }}</span>
            </p>
            <div class="d-grid gap-4 justify-items-start">
              <UiChip
                :text="isBase ? t('pricing.base.selected') : t('pricing.base.cta')"
                :selected="isBase"
                color="secondary"
                @click="isBase = !isBase"
              />
              <p class="d-flex gap-2 m-0 fs-3xs text-muted">
                <UiIconMaterial
                  icon-code="&#xea12;"
                  size="xs"
                  class="flex-shrink-0"
                />
                {{ t('pricing.base.otherNiche') }}
              </p>
            </div>
            <ul class="pricing-features">
              <li class="fw-500 text-muted">
                {{ t('pricing.base.includes') }}
              </li>
              <li
                v-for="feature in BASE_PLAN.features"
                :key="feature"
              >
                <UiIconMaterial
                  icon-code="&#xe5ca;"
                  class="fs-base lh-sm text-muted"
                />
                {{ t(`pricing.features.${feature}`) }}
              </li>
            </ul>
          </div>

          <!-- Packs -->
          <div class="pricing-col pricing-col-pack">
            <div>
              <p class="pricing-overline text-secondary">
                {{ t('pricing.pack.overline') }}
              </p>
              <h2 class="pricing-plan-name">
                {{ packName }}
              </h2>
              <p class="m-0 text-muted">
                {{ t('pricing.pack.lead') }}
              </p>
            </div>
            <p class="pricing-price">
              <strong>${{ formatMxn(pack.monthly) }}</strong>
              <span>{{ t('pricing.perMonth') }}</span>
            </p>
            <UiChipGroup
              v-model="selectedPack"
              :options="packOptions"
              :aria-label="t('pricing.pack.select')"
              variant="outline"
              color="secondary"
            />
            <ul class="pricing-features">
              <li class="fw-500 text-muted">
                {{ t('pricing.pack.includes') }}
              </li>
              <li
                v-for="feature in pack.features"
                :key="feature"
              >
                <UiIconMaterial
                  icon-code="&#xe5ca;"
                  class="fs-base lh-sm text-success"
                />
                {{ t(`pricing.features.${feature}`) }}
              </li>
            </ul>
            <div class="d-flex">
              <UiButton
                href="#pricing-summary"
                variant="link"
                :text="toSummaryLabel"
                size="sm"
                class="text-secondary"
                icon-trailing
              />
            </div>
          </div>

          <!-- Extras -->
          <div class="pricing-col">
            <button
              type="button"
              class="pricing-extras-toggle"
              :aria-expanded="isExtrasOpen"
              aria-controls="pricing-extras"
              @click="isExtrasOpen = !isExtrasOpen"
            >
              <span class="d-flex align-items-baseline gap-2">
                <span class="pricing-overline m-0">{{ t('pricing.extras.title') }}</span>
                <span class="font-code fs-4xs text-secondary">{{ extrasCountLabel }}</span>
              </span>
              <UiIconMaterial
                :icon-code="isExtrasOpen ? '&#xe5ce;' : '&#xe5cf;'"
                class="text-muted"
              />
            </button>

            <div
              v-show="isExtrasOpen"
              id="pricing-extras"
              class="pricing-extras"
            >
              <div
                v-for="extra in extras"
                :key="extra.id"
                class="pricing-extra"
              >
                <div class="d-flex align-items-center justify-content-between gap-3">
                  <UiInputCheck
                    :id="`pricing-extra-${extra.id}`"
                    :model-value="!!picked[extra.id]"
                    :label="t(`pricing.extras.items.${extra.id}.name`)"
                    @update:model-value="picked[extra.id] = !!$event"
                  />
                  <span class="font-code fs-3xs text-muted flex-shrink-0">{{ extraPriceLabel(extra) }}</span>
                </div>
                <p class="pricing-extra-description">
                  {{ t(`pricing.extras.items.${extra.id}.description`) }}
                </p>
              </div>
            </div>
            <p
              v-show="!isExtrasOpen"
              class="m-0 fs-3xs text-muted"
            >
              {{ t('pricing.extras.closedNote') }}
            </p>
          </div>
        </template>
      </UiCard>
    </section>

    <!-- Summary -->
    <section
      id="pricing-summary"
      class="page-section container"
      aria-labelledby="pricing-summary-title"
    >
      <h2
        id="pricing-summary-title"
        class="display-3 text-center mb-5 reveal-wipe"
      >
        {{ t('pricing.summary.title') }}
      </h2>

      <UiCard
        variant="pane"
        custom-class="pricing-summary reveal"
      >
        <template #body>
          <!-- How You Pay -->
          <div class="pricing-summary-col pricing-summary-pay">
            <p class="pricing-overline d-flex align-items-center gap-2 text-reset">
              <UiIconMaterial
                icon-code="&#xebcc;"
                class="fs-lg lh-1"
              />
              {{ t('pricing.summary.start') }}
            </p>
            <ol class="pricing-schedule">
              <li class="pricing-schedule-step">
                <span class="pricing-schedule-label">{{ t('pricing.summary.schedule.start') }}</span>
                <strong>${{ formatMxn(monthlyTotal + upfrontTotal) }}</strong>
                <span class="pricing-schedule-detail">{{ startDetail }}</span>
              </li>
              <li class="pricing-schedule-step">
                <span class="pricing-schedule-label">{{ t('pricing.summary.schedule.after') }}</span>
                <strong class="text-secondary">${{ formatMxn(monthlyTotal) }}</strong>
                <span class="pricing-schedule-detail">{{ t('pricing.summary.schedule.afterDetail') }}</span>
              </li>
            </ol>
          </div>

          <button
            type="button"
            class="pricing-summary-toggle"
            :aria-expanded="isBreakdownOpen"
            aria-controls="pricing-summary-breakdown"
            @click="isBreakdownOpen = !isBreakdownOpen"
          >
            {{ t(isBreakdownOpen ? 'pricing.summary.breakdownHide' : 'pricing.summary.breakdownShow') }}
            <UiIconMaterial
              :icon-code="isBreakdownOpen ? '&#xe5ce;' : '&#xe5cf;'"
              class="text-muted"
            />
          </button>

          <div
            id="pricing-summary-breakdown"
            class="pricing-summary-breakdown"
            :class="{ 'is-open': isBreakdownOpen }"
          >
            <!-- Monthly -->
            <div class="pricing-summary-col pricing-summary-monthly">
              <p class="pricing-overline d-flex align-items-center gap-2">
                <UiIconMaterial
                  icon-code="&#xe863;"
                  class="fs-lg lh-1 text-secondary"
                />
                {{ t('pricing.summary.monthly') }}
              </p>
              <div class="pricing-line">
                <span class="d-grid">
                  <span class="fw-500">{{ planName }}</span>
                  <span class="fs-3xs text-muted">{{ planLabel }}</span>
                </span>
                <span class="font-code">${{ formatMxn(plan.monthly) }}</span>
              </div>
              <ul
                v-if="monthlyExtras.length"
                class="pricing-summary-extras"
              >
                <li
                  v-for="extra in monthlyExtras"
                  :key="extra.id"
                  class="pricing-line"
                >
                  <span class="d-flex gap-2">
                    <UiIconMaterial
                      icon-code="&#xe5ca;"
                      class="fs-base lh-sm text-muted"
                    />
                    {{ t(`pricing.extras.items.${extra.id}.name`) }}
                  </span>
                  <span class="font-code">${{ formatMxn(extra.price) }}</span>
                </li>
              </ul>
              <div class="pricing-line pricing-line-total">
                <span class="text-muted">{{ t('pricing.summary.monthlyTotal') }}</span>
                <strong>${{ formatMxn(monthlyTotal) }}</strong>
              </div>
            </div>

            <!-- One Time -->
            <div class="pricing-summary-col pricing-summary-once">
              <p class="pricing-overline d-flex align-items-center gap-2">
                <UiIconMaterial
                  icon-code="&#xe153;"
                  class="fs-lg lh-1 text-accent"
                />
                {{ t('pricing.summary.oneTime') }}
              </p>
              <div class="pricing-line">
                <span class="fw-500">{{ t('pricing.summary.setup') }}</span>
                <span class="font-code">${{ formatMxn(plan.setup) }}</span>
              </div>
              <ul
                v-if="oneTimeExtras.length"
                class="pricing-summary-extras"
              >
                <li
                  v-for="extra in oneTimeExtras"
                  :key="extra.id"
                  class="pricing-line"
                >
                  <span class="d-flex gap-2">
                    <UiIconMaterial
                      icon-code="&#xe5ca;"
                      class="fs-base lh-sm text-muted"
                    />
                    {{ t(`pricing.extras.items.${extra.id}.name`) }}
                  </span>
                  <span class="font-code">${{ formatMxn(extra.price) }}</span>
                </li>
              </ul>
              <div class="pricing-line pricing-line-total">
                <span class="text-muted">{{ t('pricing.summary.upfrontTotal') }}</span>
                <strong>${{ formatMxn(upfrontTotal) }}</strong>
              </div>
            </div>
          </div>

          <!-- Send -->
          <div class="pricing-summary-cta">
            <UiButton
              variant="filled"
              color="primary"
              size="lg"
              :text="t('pricing.summary.send')"
              :href="mailtoHref(planName, planMessage)"
              fluid
            >
              <template #icon>
                <UiIconMaterial icon-code="&#xe158;" />
              </template>
            </UiButton>
            <span class="fs-4xs text-center">{{ t('pricing.summary.startNote') }}</span>
          </div>
        </template>
      </UiCard>

      <p class="caption text-muted text-center mt-3 mb-0">
        {{ oneTimeNote }}
      </p>
    </section>

    <!-- Terms -->
    <section
      class="page-section bg-surface-pane"
      aria-labelledby="pricing-terms-title"
    >
      <div class="container">
        <h2
          id="pricing-terms-title"
          class="display-3 text-center mb-5 reveal-wipe"
        >
          {{ t('pricing.terms.title') }}
        </h2>
        <ul class="pricing-terms">
          <li
            v-for="(term, index) in terms"
            :key="term.id"
            class="reveal"
            :style="{ '--reveal-index': index }"
          >
            <UiIconMaterial
              :icon-code="term.icon"
              :size="30"
              class="text-primary"
            />
            <h3 class="pricing-term-title">
              {{ t(`pricing.terms.${term.id}.title`) }}
            </h3>
            <p class="m-0 text-muted">
              {{ t(`pricing.terms.${term.id}.text`) }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- FAQ -->
    <section
      class="page-section container"
      aria-labelledby="pricing-faq-title"
    >
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2
            id="pricing-faq-title"
            class="display-3 text-center mb-5 reveal-wipe"
          >
            {{ t('pricing.faq.title') }}
          </h2>
          <UiAccordionGroup
            variant="borderless"
            shape="rounded"
          >
            <UiAccordion
              v-for="item in faqIds"
              :key="item"
              name="pricing-faq"
              custom-class="bg-surface-pane border shadow-sm reveal"
              :title="t(`pricing.faq.items.${item}.q`)"
              :text="t(`pricing.faq.items.${item}.a`)"
            />
          </UiAccordionGroup>
          <p class="text-muted text-center mt-4 mb-0">
            {{ t('pricing.faq.subtitle', { email: CONTACT_EMAIL }) }}
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="page-section"
      aria-labelledby="pricing-cta-title"
    >
      <div class="container">
        <div class="contact-panel reveal-expand">
          <ClientOnly>
            <AppStaticMeshGradient />
          </ClientOnly>
          <div class="contact-content">
            <h2
              id="pricing-cta-title"
              class="contact-title display-2"
            >
              {{ t('pricing.cta.title') }}
            </h2>
            <p class="contact-text">
              {{ t('pricing.cta.text') }}
            </p>
            <UiButton
              variant="filled"
              color="primary"
              size="lg"
              :text="CONTACT_EMAIL"
              :href="`mailto:${CONTACT_EMAIL}`"
              :aria-label="t('pricing.cta.emailAria')"
            >
              <template #icon>
                <UiIconMaterial icon-code="&#xe159;" />
              </template>
            </UiButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
