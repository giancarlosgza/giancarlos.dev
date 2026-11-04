<script setup lang="ts">
import type { TRowErrors } from '~/composables/useQuestionnaire'
import type { IQuestionField, TAnswerValue, TFieldError, TRepeaterRow } from '~/utils/questionnaire'
import { normalizePhone } from '~/utils/questionnaire'

/** Props & emits */
const props = withDefaults(defineProps<{
  field: IQuestionField
  modelValue?: TAnswerValue
  files?: File[]
  error?: TFieldError | null
  rowErrors?: TRowErrors[string]
  i18nBase?: string
  id?: string
}>(), {
  modelValue: null,
  files: () => [],
  error: null,
  rowErrors: () => ({}),
  i18nBase: undefined,
  id: undefined
})
const emit = defineEmits<{
  'update:modelValue': [value: TAnswerValue]
  'update:files': [files: File[]]
}>()

/** Data */
const { t, te } = useI18n()
const today = new Date()
const root = useTemplateRef<HTMLDivElement>('root')
const limitReached = ref<boolean>(false)

/** Computed */
const base = computed<string>(() => props.i18nBase ?? `questionnaire.fields.${props.field.key}`)
const fieldId = computed<string>(() => props.id ?? `q-${props.field.key}`)
const label = computed<string>(() => t(`${base.value}.label`))
const placeholder = computed<string | undefined>(() => optionalText('placeholder'))
const hint = computed<string | undefined>(() => optionalText('hint'))
const inputLabel = computed<string | undefined>(() => optionalText('inputLabel'))
const errorMessages = computed<string[]>(() => props.error
  ? [
      t(`questionnaire.errors.${props.error}`)
    ]
  : [])
const options = computed<{ label: string, value: string }[]>(() => (props.field.options ?? [])
  .map(value => ({
    label: t(`${base.value}.options.${value}`),
    value
  })))
const chipOptions = computed<{ id: string, text: string }[]>(() => options.value
  .map(option => ({ id: option.value, text: option.label })))
const textValue = computed<string>(() => typeof props.modelValue === 'string'
  ? props.modelValue
  : '')
const listValue = computed<string[]>(() => Array.isArray(props.modelValue)
  ? props.modelValue as string[]
  : [])
const rowsValue = computed<TRepeaterRow[]>(() => Array.isArray(props.modelValue)
  ? props.modelValue as TRepeaterRow[]
  : [])
const dateValue = computed<Date | null>(() => textValue.value
  ? new Date(textValue.value)
  : null)
// UiInputText has no inputmode prop; tel brings up the number pad
const inputType = computed<string>(() => {
  if (props.field.type === 'email' || props.field.type === 'url')
    return props.field.type

  return props.field.inputmode === 'numeric'
    ? 'tel'
    : 'text'
})

/** Methods */
function optionalText(key: string): string | undefined {
  const path = `${base.value}.${key}`
  return te(path)
    ? t(path)
    : undefined
}

function update(value: TAnswerValue): void {
  emit('update:modelValue', value)
}

function updateText(value: unknown): void {
  const text = value === null || value === undefined
    ? ''
    : String(value)
  if (props.field.type !== 'tel') {
    update(text)
    return
  }

  const digits = normalizePhone(text)
  update(digits)
  // A typed letter leaves the stored digits unchanged, so Vue won't rewrite the input
  nextTick(() => {
    const input = root.value?.querySelector('input')
    if (input && input.value !== digits)
      input.value = digits
  })
}

function updateChips(value: string | string[] | null): void {
  const list = Array.isArray(value)
    ? value
    : []
  limitReached.value = !!props.field.max && list.length > props.field.max
  if (!limitReached.value)
    update(list)
}

function updateTags(value: string[]): void {
  limitReached.value = false
  update(value)
}

function onTagReject(_tag: string, reason: string): void {
  limitReached.value = reason === 'max'
}

function updateDate(value: unknown): void {
  update(value instanceof Date
    ? value.toISOString()
    : null)
}
</script>

<template>
  <div
    ref="root"
    class="questionnaire-field"
    :class="{ 'is-wide': field.wide }"
    :data-type="field.type"
  >
    <UiInputTextarea
      v-if="field.type === 'textarea'"
      :id="fieldId"
      :model-value="textValue"
      :label="label"
      :placeholder="placeholder"
      :required="field.required"
      :maxlength="field.maxlength"
      :rows="3"
      :error-messages="errorMessages"
      @update:model-value="update"
    />

    <UiInputText
      v-else-if="field.type === 'tel'"
      :id="fieldId"
      :model-value="textValue"
      type="tel"
      :label="label"
      :placeholder="placeholder"
      :required="field.required"
      :maxlength="16"
      :autocomplete="field.autocomplete"
      :error-messages="errorMessages"
      @update:model-value="updateText"
    >
      <template #prefix>
        +52
      </template>
    </UiInputText>

    <UiInputSelect
      v-else-if="field.type === 'select'"
      :id="fieldId"
      :model-value="textValue || null"
      :label="label"
      :placeholder="placeholder"
      :required="field.required"
      :options="options"
      option-label="label"
      option-value="value"
      :error-messages="errorMessages"
      @update:model-value="updateText"
    />

    <UiInputRadio
      v-else-if="field.type === 'radio'"
      :id="fieldId"
      :model-value="textValue || null"
      :label="label"
      :required="field.required"
      :options="options"
      option-label="label"
      option-value="value"
      :inline="options.length <= 3"
      :error-messages="errorMessages"
      @update:model-value="updateText"
    />

    <fieldset
      v-else-if="field.type === 'chips'"
      class="questionnaire-group"
      :aria-describedby="error ? `${fieldId}-error` : undefined"
    >
      <legend class="questionnaire-legend">
        {{ label }}<template v-if="field.required">
          *
        </template>
      </legend>
      <UiChipGroup
        :model-value="listValue"
        :options="chipOptions"
        multiple
        variant="outline"
        color="secondary"
        @update:model-value="updateChips"
      />
    </fieldset>

    <UiInputTags
      v-else-if="field.type === 'tags'"
      :id="fieldId"
      :model-value="listValue"
      :label="label"
      :placeholder="placeholder"
      :required="field.required"
      :max="field.max"
      :maxlength="field.maxlength"
      :error-messages="errorMessages"
      @update:model-value="updateTags"
      @reject="onTagReject"
    />

    <UiInputCheck
      v-else-if="field.type === 'check'"
      :id="fieldId"
      :model-value="modelValue === true"
      :label="label"
      :required="field.required"
      :error-messages="errorMessages"
      @update:model-value="update(!!$event)"
    />

    <QuestionnaireColors
      v-else-if="field.type === 'colors'"
      :id="fieldId"
      :model-value="listValue"
      :label="label"
      :add-label="t(`${base}.add`)"
      :max="field.max"
      @update:model-value="update"
    />

    <QuestionnaireFiles
      v-else-if="field.type === 'file' || field.type === 'files'"
      :id="fieldId"
      :files="files"
      :label="label"
      :input-label="inputLabel"
      :required="field.required"
      :max="field.type === 'file' ? 1 : field.max"
      :error-messages="errorMessages"
      @update:files="emit('update:files', $event)"
    />

    <UiInputDate
      v-else-if="field.type === 'date'"
      :id="fieldId"
      :model-value="dateValue"
      :label="label"
      :required="field.required"
      :min="today"
      clearable
      :error-messages="errorMessages"
      @update:model-value="updateDate"
    />

    <QuestionnaireRepeater
      v-else-if="field.type === 'repeater'"
      :id="fieldId"
      :field="field"
      :rows="rowsValue"
      :label="label"
      :i18n-base="base"
      :row-errors="rowErrors"
      @update:rows="update"
    />

    <UiInputText
      v-else
      :id="fieldId"
      :model-value="textValue"
      :type="inputType"
      :label="label"
      :placeholder="placeholder"
      :required="field.required"
      :maxlength="field.maxlength"
      :autocomplete="field.autocomplete"
      :error-messages="errorMessages"
      @update:model-value="updateText"
    />

    <p
      v-if="error && ['chips', 'colors', 'repeater'].includes(field.type)"
      :id="`${fieldId}-error`"
      class="questionnaire-error"
    >
      {{ t(`questionnaire.errors.${error}`) }}
    </p>
    <p
      v-if="limitReached"
      class="questionnaire-hint"
      role="status"
    >
      {{ t('questionnaire.errors.max', { max: field.max }) }}
    </p>
    <p
      v-if="hint"
      :id="`${fieldId}-hint`"
      class="questionnaire-hint"
    >
      {{ hint }}
    </p>
  </div>
</template>
