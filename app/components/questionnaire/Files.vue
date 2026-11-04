<script setup lang="ts">
import { isAllowedUpload, UPLOAD_ACCEPT } from '~/utils/questionnaire'

/** Props & emits */
const props = defineProps<{
  id: string
  files: File[]
  label: string
  inputLabel?: string
  required?: boolean
  max?: number
  errorMessages?: string[]
}>()
const emit = defineEmits<{
  'update:files': [files: File[]]
}>()

/** Data */
const { t } = useI18n()
const rejected = ref<boolean>(false)

/** Computed */
const isFull = computed<boolean>(() => !!props.max && props.files.length >= props.max)
const isMultiple = computed<boolean>(() => props.max !== 1)
const errorId = computed<string>(() => `${props.id}-error-0`)
const messages = computed<string[]>(() => rejected.value
  ? [
      t('questionnaire.errors.fileType')
    ]
  : props.errorMessages ?? [])

/** Methods */
function formatSize(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// UiInputFile has no multiple/accept props; this reuses its markup
function onPick(event: Event): void {
  const input = event.target as HTMLInputElement
  const picked = Array.from(input.files ?? [])
  const allowed = picked.filter(isAllowedUpload)
  rejected.value = allowed.length < picked.length

  const room = props.max
    ? props.max - props.files.length
    : allowed.length
  if (allowed.length) {
    emit('update:files', [
      ...props.files,
      ...allowed.slice(0, room)
    ])
  }

  input.value = ''
}

function removeFile(index: number): void {
  emit('update:files', props.files.filter((_, fileIndex) => fileIndex !== index))
}
</script>

<template>
  <div class="questionnaire-files">
    <div
      v-if="!isFull"
      class="input-file-group"
      :class="{ 'form-invalid': messages.length }"
    >
      <label :for="id">{{ label }}<template v-if="required"> *</template></label>
      <div class="input-file-dropbox">
        <input
          :id="id"
          class="form-control input-file"
          type="file"
          :accept="UPLOAD_ACCEPT"
          :multiple="isMultiple"
          :required="required && !files.length"
          :aria-invalid="messages.length ? 'true' : undefined"
          :aria-describedby="messages.length ? errorId : undefined"
          @change="onPick"
        >
        <div class="input-file-text">
          <UiIconMaterial icon-code="&#xe2c3;" />
          <p>{{ files.length ? t('questionnaire.actions.addFiles') : inputLabel }}</p>
        </div>
      </div>
      <p
        v-if="messages.length"
        :id="errorId"
        class="questionnaire-error"
      >
        {{ messages[0] }}
      </p>
    </div>
    <span
      v-else
      class="questionnaire-legend"
    >{{ label }}</span>

    <ul
      v-if="files.length"
      class="file-list"
      :aria-label="label"
    >
      <li
        v-for="(file, index) in files"
        :key="`${file.name}-${index}`"
        class="file-item"
      >
        <UiIconMaterial
          icon-code="&#xe226;"
          size="xs"
        />
        <span class="file-name">{{ file.name }}</span>
        <span class="file-size">{{ formatSize(file.size) }}</span>
        <UiButton
          variant="text"
          size="sm"
          icon
          :title="t('questionnaire.actions.removeFile', { name: file.name })"
          :aria-label="t('questionnaire.actions.removeFile', { name: file.name })"
          @click="removeFile(index)"
        >
          <template #icon>
            <UiIconMaterial icon-code="&#xe5cd;" />
          </template>
        </UiButton>
      </li>
    </ul>
  </div>
</template>
