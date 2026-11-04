<script setup lang="ts">
/** Props & emits */
const props = defineProps<{
  id: string
  modelValue: string[]
  label: string
  addLabel: string
  max?: number
}>()
const emit = defineEmits<{
  'update:modelValue': [colors: string[]]
}>()

/** Data */
const { t } = useI18n()

/** Computed */
const isFull = computed<boolean>(() => !!props.max && props.modelValue.length >= props.max)

/** Methods */
function addColor(): void {
  if (!isFull.value)
    emit('update:modelValue', [...props.modelValue, '#9099ff'])
}

function updateColor(index: number, color: string | null): void {
  emit('update:modelValue', props.modelValue.map((value, colorIndex) => colorIndex === index
    ? (color ?? value)
    : value))
}

function removeColor(index: number): void {
  emit('update:modelValue', props.modelValue.filter((_, colorIndex) => colorIndex !== index))
}
</script>

<template>
  <fieldset class="questionnaire-group questionnaire-colors">
    <legend class="questionnaire-legend">
      {{ label }}
    </legend>

    <div
      v-for="(color, index) in modelValue"
      :key="index"
      class="color-row"
    >
      <UiInputColorPicker
        :id="`${id}-${index}`"
        :model-value="color"
        :label="`${label} ${index + 1}`"
        hide-label
        @update:model-value="updateColor(index, $event)"
      />
      <UiButton
        variant="text"
        size="sm"
        icon
        :title="`${t('questionnaire.actions.remove')} ${color}`"
        :aria-label="`${t('questionnaire.actions.remove')} ${color}`"
        @click="removeColor(index)"
      >
        <template #icon>
          <UiIconMaterial icon-code="&#xe5cd;" />
        </template>
      </UiButton>
    </div>

    <UiButton
      v-if="!isFull"
      variant="outline"
      size="sm"
      :text="addLabel"
      @click="addColor"
    >
      <template #icon>
        <UiIconMaterial icon-code="&#xe145;" />
      </template>
    </UiButton>
  </fieldset>
</template>
