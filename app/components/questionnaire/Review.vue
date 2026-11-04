<script setup lang="ts">
import type { IQuestionField, IQuestionStep, TAnswers, TFieldFiles, TNiche, TRepeaterRow, TStepId } from '~/utils/questionnaire'
import { getVisibleFields } from '~/utils/questionnaire'

/** Props & emits */
const props = defineProps<{
  steps: IQuestionStep[]
  niche: TNiche
  answers: TAnswers
  files: TFieldFiles
}>()
const emit = defineEmits<{
  edit: [stepId: TStepId]
}>()

/** Interfaces */
interface IReviewItem {
  key: string
  label: string
  value: string
}

interface IReviewSection {
  id: TStepId
  title: string
  items: IReviewItem[]
}

/** Data */
const { t, locale } = useI18n()

/** Computed */
const sections = computed<IReviewSection[]>(() => props.steps
  .filter(step => step.id !== 'review')
  .map(step => ({
    id: step.id,
    title: t(`questionnaire.steps.${step.id}.title`),
    items: getVisibleFields(step, props.niche, props.answers)
      .filter(field => field.type !== 'check' || props.answers[field.key] === true)
      .map(field => ({
        key: field.key,
        label: t(`questionnaire.fields.${field.key}.label`),
        value: formatValue(field)
      }))
  })))

/** Methods */
function optionLabel(field: IQuestionField, value: string): string {
  return field.options?.includes(value)
    ? t(`questionnaire.fields.${field.key}.options.${value}`)
    : value
}

function formatValue(field: IQuestionField): string {
  const value = props.answers[field.key]

  if (field.type === 'file' || field.type === 'files') {
    const list = props.files[field.key] ?? []
    return list.length
      ? list.map(file => file.name).join(', ')
      : t('questionnaire.review.empty')
  }

  if (field.type === 'check')
    return t('questionnaire.review.yes')

  if (field.type === 'date' && typeof value === 'string' && value)
    return new Date(value).toLocaleDateString(locale.value)

  if (field.type === 'repeater' && Array.isArray(value) && value.length) {
    const firstColumn = field.fields?.find(column => column.required)?.key ?? field.fields?.[0]?.key ?? ''
    const names = (value as TRepeaterRow[]).map(row => row[firstColumn]).filter(Boolean)
    return `${t('questionnaire.review.rows', { count: value.length })}: ${names.join(', ')}`
  }

  if (Array.isArray(value) && value.length)
    return (value as string[]).map(item => optionLabel(field, item)).join(', ')

  if (typeof value === 'string' && value.trim())
    return optionLabel(field, value)

  return t('questionnaire.review.empty')
}
</script>

<template>
  <div class="questionnaire-review">
    <section
      v-for="section in sections"
      :key="section.id"
      class="review-section"
      :aria-labelledby="`review-${section.id}`"
    >
      <header class="review-head">
        <h2
          :id="`review-${section.id}`"
          class="review-title fw-600"
        >
          {{ section.title }}
        </h2>
        <UiButton
          variant="text"
          size="sm"
          :text="t('questionnaire.actions.edit')"
          :aria-label="`${t('questionnaire.actions.edit')}: ${section.title}`"
          @click="emit('edit', section.id)"
        />
      </header>
      <dl class="review-list">
        <div
          v-for="item in section.items"
          :key="item.key"
          class="review-item"
        >
          <dt>{{ item.label }}</dt>
          <dd>{{ item.value }}</dd>
        </div>
      </dl>
    </section>
  </div>
</template>
