<script setup lang="ts">
import type { TNiche } from '~/utils/questionnaire'
import { NICHES } from '~/utils/questionnaire'

/** Props & emits */
const props = defineProps<{
  modelValue: TNiche | null
}>()
const emit = defineEmits<{
  select: [niche: TNiche]
}>()

/** Data */
const { t } = useI18n()
const picked = ref<TNiche | null>(props.modelValue)
const showError = ref<boolean>(false)
const nicheIcons: Record<TNiche, string> = {
  cafe: '&#xeb44;',
  health: '&#xf805;',
  music: '&#xe405;'
}

/** Methods */
function onSubmit(): void {
  showError.value = !picked.value
  if (picked.value)
    emit('select', picked.value)
}
</script>

<template>
  <section
    class="questionnaire-start container"
    aria-labelledby="questionnaire-start-title"
  >
    <h1
      id="questionnaire-start-title"
      class="questionnaire-start-title"
    >
      {{ t('questionnaire.start.title') }}
    </h1>
    <p class="questionnaire-lead">
      {{ t('questionnaire.start.lead') }}
    </p>

    <form
      class="questionnaire-start-form"
      novalidate
      @submit.prevent="onSubmit"
    >
      <fieldset
        class="niche-options"
        :aria-describedby="showError ? 'niche-error' : undefined"
      >
        <legend class="visually-hidden">
          {{ t('questionnaire.start.legend') }}
        </legend>

        <label
          v-for="niche in NICHES"
          :key="niche"
          class="niche-option card card-pane card-selectable"
          :data-niche="niche"
        >
          <input
            v-model="picked"
            class="visually-hidden"
            type="radio"
            name="niche"
            :value="niche"
            required
            @change="showError = false"
          >
          <span class="niche-option-icon">
            <UiIconMaterial :icon-code="nicheIcons[niche]" />
          </span>
          <span class="niche-option-title">{{ t(`questionnaire.start.niches.${niche}.title`) }}</span>
          <span class="niche-option-description">{{ t(`questionnaire.start.niches.${niche}.description`) }}</span>
          <span class="niche-option-asks">{{ t(`questionnaire.start.niches.${niche}.asks`) }}</span>
        </label>
      </fieldset>

      <p
        v-if="showError"
        id="niche-error"
        class="questionnaire-error"
        role="alert"
      >
        {{ t('questionnaire.errors.niche') }}
      </p>

      <UiButton
        type="submit"
        variant="filled"
        color="primary"
        size="lg"
        icon-trailing
        :text="t('questionnaire.start.continue')"
      >
        <template #icon>
          <UiIconMaterial icon-code="&#xe5c8;" />
        </template>
      </UiButton>
    </form>
  </section>
</template>
