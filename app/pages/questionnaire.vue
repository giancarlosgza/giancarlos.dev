<script setup lang="ts">
import type { IStepItem } from '@colorffy/ui'
import type { IInvite, TNiche, TStepId } from '~/utils/questionnaire'
import { NuxtLink } from '#components'
import { SUCCESS_PROJECTS } from '~/utils/questionnaire'
import { withUtm } from '~/utils/utm'

/** Meta */
definePageMeta({
  layout: 'questionnaire'
})

/** Data */
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const {
  draft,
  files,
  errors,
  rowErrors,
  steps,
  step,
  stepIndex,
  isFirstStep,
  isLastStep,
  furthestIndex,
  visibleFields,
  setAnswer,
  setFiles,
  validateStep,
  validateAll,
  goToStep,
  nextStep,
  previousStep,
  applyInvite,
  scope,
  selectNiche,
  resetNiche,
  clearDraft,
  collectAnswers,
  collectFiles
} = useQuestionnaire()
const { isSubmitting, submitError, loadInvite, submit } = useQuestionnaireFirebase()
const isReady = ref<boolean>(false)
const invite = ref<IInvite | null>(null)
const isSubmitted = ref<boolean>(false)
const showStepError = ref<boolean>(false)
const honeypot = ref<string>('')
const formRef = useTemplateRef<HTMLFormElement>('form')
const stepHeadingRef = useTemplateRef<HTMLHeadingElement>('stepHeading')

/** Computed */
const niche = computed<TNiche | null>(() => draft.value.niche)
const stepperSteps = computed<IStepItem[]>(() => steps.map((item, index) => ({
  id: item.id,
  label: t(`questionnaire.steps.${item.id}.title`),
  disabled: index > furthestIndex.value
})))
const canReturnToReview = computed<boolean>(() => !isLastStep.value && furthestIndex.value === steps.length - 1)
const activeStep = computed<string>({
  get: () => draft.value.stepId,
  set: stepId => goToStep(stepId as TStepId)
})
const progressValue = computed<number>(() => Math.round(((stepIndex.value + 1) / steps.length) * 100))
const progressLabel = computed<string>(() => `${t('questionnaire.progress')}: ${t('questionnaire.stepCount', {
  current: stepIndex.value + 1,
  total: steps.length
})}`)
const nextLabel = computed<string>(() => isLastStep.value
  ? t('questionnaire.actions.submit')
  : t('questionnaire.actions.next'))
const hasFileFields = computed<boolean>(() => isLastStep.value
  || visibleFields.value.some(field => field.type === 'file' || field.type === 'files'))

/** Methods */
async function focusFirstError(): Promise<void> {
  showStepError.value = true
  await nextTick()
  const invalid = formRef.value?.querySelector<HTMLElement>('[aria-invalid="true"], .questionnaire-error')
  const field = invalid?.closest('.questionnaire-field')
  // Hidden file inputs don't scroll into view on focus
  field?.scrollIntoView({ block: 'start', behavior: 'instant' })
  field?.querySelector<HTMLElement>('input:not([type="hidden"]), textarea, select, button')?.focus({ preventScroll: true })
}

async function returnToReview(): Promise<void> {
  if (validateStep())
    goToStep('review')
  else
    await focusFirstError()
}

// One history entry per step, so the phone's Back goes to the previous step
let historyStep: string | undefined

function syncHistory(replace: boolean): void {
  const step = niche.value
    ? draft.value.stepId
    : undefined
  if (step === historyStep)
    return

  historyStep = step
  const target = {
    query: { ...route.query, invite: draft.value.invite ?? undefined, step }
  }
  if (replace)
    router.replace(target)
  else
    router.push(target)
}

async function onSubmit(): Promise<void> {
  if (!isLastStep.value) {
    if (!nextStep())
      await focusFirstError()

    return
  }

  if (!validateAll() || !niche.value || !draft.value.invite) {
    await focusFirstError()
    return
  }

  if (honeypot.value) {
    clearDraft()
    isSubmitted.value = true
    return
  }

  const sent = await submit({
    invite: draft.value.invite,
    niche: niche.value,
    locale: locale.value,
    answers: collectAnswers(),
    files: collectFiles()
  })

  if (sent) {
    clearDraft()
    isSubmitted.value = true
  }
}

/** Watchers */
// Picking a niche may not change stepId
watch([
  () => draft.value.stepId,
  niche
], async () => {
  await nextTick()
  // validateAll() already moved focus to an error
  if (showStepError.value)
    return

  // The site's smooth scrolling gets cut off while the new step renders
  window.scrollTo({ top: 0, behavior: 'instant' })
  stepHeadingRef.value?.focus({ preventScroll: true })
})

watch([
  () => draft.value.stepId,
  niche
], () => {
  if (isReady.value)
    syncHistory(false)
})

watch(() => route.query.step, (step) => {
  if (step === historyStep)
    return

  historyStep = step as string | undefined
  if (!step) {
    if (niche.value && !invite.value?.niche)
      resetNiche()
    return
  }

  const index = steps.findIndex(item => item.id === step)
  if (index === -1 || index > furthestIndex.value)
    return

  if (!niche.value && draft.value.lastNiche)
    selectNiche(draft.value.lastNiche)
  goToStep(step as TStepId)
})

watch([errors, rowErrors], () => {
  if (!Object.keys(errors.value).length && !Object.keys(rowErrors.value).length)
    showStepError.value = false
}, { deep: true })

/** Lifecycle */
onMounted(async () => {
  const code = typeof route.query.invite === 'string'
    ? route.query.invite
    : draft.value.invite
  if (code && code !== draft.value.invite)
    clearDraft(code)

  invite.value = code
    ? await loadInvite(code)
    : null
  if (invite.value)
    applyInvite(invite.value)
  if (invite.value?.niche && draft.value.niche !== invite.value.niche)
    selectNiche(invite.value.niche)
  if (invite.value?.clientName && !draft.value.answers.contactName)
    setAnswer('contactName', invite.value.clientName)

  isReady.value = true
  historyStep = route.query.step as string | undefined
  syncHistory(true)
})

/** SEO */
useSeoMeta({
  title: () => t('questionnaire.seo.title'),
  description: () => t('questionnaire.seo.description'),
  ogTitle: () => t('questionnaire.seo.title'),
  ogDescription: () => t('questionnaire.seo.description'),
  twitterTitle: () => t('questionnaire.seo.title'),
  twitterDescription: () => t('questionnaire.seo.description')
})
// Invite links get shared over WhatsApp, so they still need a preview despite noindex
useShareImage('questionnaire', () => t('questionnaire.seo.title'))
</script>

<template>
  <div class="questionnaire-page">
    <UiLoading
      v-if="!isReady"
      :title="t('questionnaire.loading')"
      spinner-size="40px"
      custom-class="questionnaire-loading"
    />

    <section
      v-else-if="isSubmitted"
      class="questionnaire-success container"
      aria-labelledby="questionnaire-done-title"
    >
      <div class="success-intro">
        <UiIconMaterial
          icon-code="&#xea65;"
          size="xl"
          class="text-secondary"
        />
        <h1
          id="questionnaire-done-title"
          class="questionnaire-start-title"
        >
          {{ t('questionnaire.success.title') }}
        </h1>
        <p class="questionnaire-lead">
          {{ t('questionnaire.success.lead') }}
        </p>
        <UiButton
          variant="filled"
          color="primary"
          size="lg"
          :text="t('questionnaire.success.home')"
          :as="NuxtLink"
          :to="localePath('index')"
        />
      </div>

      <section
        class="success-work"
        aria-labelledby="success-work-title"
      >
        <h2
          id="success-work-title"
          class="text-heading m-0"
        >
          {{ t('questionnaire.success.workTitle') }}
        </h2>

        <ul class="success-projects">
          <li
            v-for="project in SUCCESS_PROJECTS"
            :key="project.id"
          >
            <a
              :href="withUtm(`https://${project.domain}`, 'questionnaire', locale)"
              target="_blank"
              rel="noopener noreferrer"
              class="success-project card card-pane card-selectable undecorated"
              :aria-label="t('questionnaire.success.visitAria', { name: project.name })"
            >
              <img
                :src="project.image"
                alt=""
                width="800"
                height="500"
                loading="lazy"
                decoding="async"
              >
              <span class="success-project-body">
                <span class="fw-700">{{ project.name }}</span>
                <span class="fs-2xs text-muted">{{ t(`questionnaire.success.projects.${project.id}`) }}</span>
                <span class="text-truncate font-code fs-3xs text-secondary">{{ project.domain }}</span>
              </span>
              <UiIconMaterial
                icon-code="&#xf1e1;"
                class="flex-shrink-0 text-muted"
              />
            </a>
          </li>
        </ul>
      </section>
    </section>

    <section
      v-else-if="!invite"
      class="questionnaire-done container"
      aria-labelledby="questionnaire-invalid-title"
    >
      <UiIconMaterial
        icon-code="&#xe16f;"
        size="xl"
        class="text-secondary"
      />
      <h1
        id="questionnaire-invalid-title"
        class="questionnaire-start-title"
      >
        {{ t('questionnaire.invalid.title') }}
      </h1>
      <p class="questionnaire-lead">
        {{ t('questionnaire.invalid.lead') }}
      </p>
      <UiButton
        variant="filled"
        color="primary"
        size="lg"
        :text="t('questionnaire.invalid.contact')"
        href="mailto:hello@giancarlos.dev"
      />
    </section>

    <QuestionnaireNichePicker
      v-else-if="!niche"
      :model-value="draft.lastNiche"
      @select="selectNiche"
    />

    <div
      v-else
      class="questionnaire-shell container"
    >
      <aside class="questionnaire-aside">
        <span class="questionnaire-kicker">{{ t(`questionnaire.start.niches.${niche}.title`) }}</span>
        <nav
          class="questionnaire-steps"
          :aria-label="t('questionnaire.stepper')"
        >
          <UiStepper
            v-model:active-step="activeStep"
            :steps="stepperSteps"
            vertical
          />
        </nav>
        <p class="questionnaire-note">
          <UiIconMaterial
            icon-code="&#xefd6;"
            size="xs"
          />
          {{ t('questionnaire.savedNote') }}
        </p>
        <UiButton
          v-if="!invite?.niche"
          variant="text"
          size="sm"
          :text="t('questionnaire.changeNiche')"
          @click="resetNiche"
        >
          <template #icon>
            <UiIconMaterial icon-code="&#xe8d4;" />
          </template>
        </UiButton>
        <IncludeColorModePicker :show-labels="false" />
      </aside>

      <form
        ref="form"
        class="questionnaire-form card card-pane"
        novalidate
        @submit.prevent="onSubmit"
      >
        <header class="questionnaire-step-head">
          <UiProgressBar
            :value="progressValue"
            :aria-label="progressLabel"
            size="sm"
            bar-class="bg-secondary"
            class="mb-2"
          />
          <h1
            ref="stepHeading"
            class="questionnaire-step-title"
            tabindex="-1"
          >
            {{ t(`questionnaire.steps.${step.id}.title`) }}
          </h1>
          <p class="questionnaire-lead">
            {{ t(`questionnaire.steps.${step.id}.lead`) }}
          </p>
        </header>

        <UiAlert
          v-if="showStepError"
          type="tonal"
          variant="danger"
          size="sm"
          :message="t('questionnaire.errors.step')"
        />

        <QuestionnaireReview
          v-if="isLastStep && scope"
          :steps="steps"
          :scope="scope"
          :answers="draft.answers"
          :files="files"
          @edit="goToStep"
        />

        <div class="questionnaire-fields">
          <QuestionnaireField
            v-for="field in visibleFields"
            :key="field.key"
            :field="field"
            :model-value="draft.answers[field.key] ?? null"
            :files="files[field.key]"
            :error="errors[field.key] ?? null"
            :row-errors="rowErrors[field.key]"
            @update:model-value="setAnswer(field.key, $event)"
            @update:files="setFiles(field.key, $event)"
          />
        </div>

        <p
          v-if="hasFileFields"
          class="questionnaire-note"
        >
          <UiIconMaterial
            icon-code="&#xe88e;"
            size="xs"
          />
          {{ t('questionnaire.filesNote') }}
        </p>

        <div
          class="visually-hidden"
          aria-hidden="true"
        >
          <label for="q-website">Website</label>
          <input
            id="q-website"
            v-model="honeypot"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
          >
        </div>

        <UiAlert
          v-if="submitError"
          type="tonal"
          variant="danger"
          :message="t(submitError === 'denied' ? 'questionnaire.errors.denied' : 'questionnaire.errors.submit')"
        />

        <footer class="questionnaire-actions">
          <UiButton
            v-if="!isFirstStep"
            variant="outline"
            :text="t('questionnaire.actions.back')"
            @click="previousStep"
          >
            <template #icon>
              <UiIconMaterial icon-code="&#xe5c4;" />
            </template>
          </UiButton>
          <UiButton
            v-if="canReturnToReview"
            variant="text"
            :text="t('questionnaire.actions.toReview')"
            @click="returnToReview"
          />
          <UiButton
            type="submit"
            variant="filled"
            color="primary"
            icon-trailing
            :text="nextLabel"
            :loading="isSubmitting"
            custom-class="questionnaire-next"
          >
            <template #icon>
              <UiIconMaterial :icon-code="isLastStep ? '&#xe163;' : '&#xe5c8;'" />
            </template>
          </UiButton>
        </footer>
      </form>
    </div>
  </div>
</template>
