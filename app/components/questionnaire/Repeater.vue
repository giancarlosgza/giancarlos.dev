<script setup lang="ts">
import type { TRowErrors } from '~/composables/useQuestionnaire'
import type { IQuestionField, TAnswerValue, TRepeaterRow } from '~/utils/questionnaire'

/** Props & emits */
const props = defineProps<{
  id: string
  field: IQuestionField
  rows: TRepeaterRow[]
  label: string
  i18nBase: string
  rowErrors?: TRowErrors[string]
}>()
const emit = defineEmits<{
  'update:rows': [rows: TRepeaterRow[]]
}>()

/** Data */
const { t } = useI18n()
// Autofill can change several cells before the new rows come back through props
let pendingRows: TRepeaterRow[] | null = null

/** Computed */
const columns = computed<IQuestionField[]>(() => props.field.fields ?? [])
const isFull = computed<boolean>(() => !!props.field.max && props.rows.length >= props.field.max)

/** Methods */
function emptyRow(): TRepeaterRow {
  return Object.fromEntries(columns.value.map(column => [column.key, '']))
}

function emitRows(rows: TRepeaterRow[]): void {
  pendingRows = rows
  emit('update:rows', rows)
}

function addRow(): void {
  if (!isFull.value) {
    emitRows([
      ...props.rows,
      emptyRow()
    ])
  }
}

function removeRow(index: number): void {
  emitRows(props.rows.filter((_, rowIndex) => rowIndex !== index))
}

function updateCell(index: number, key: string, value: TAnswerValue): void {
  emitRows((pendingRows ?? props.rows).map((row, rowIndex) => rowIndex === index
    ? {
        ...row,
        [key]: typeof value === 'string'
          ? value
          : ''
      }
    : row))
}

/** Watchers */
watch(() => props.rows, () => {
  pendingRows = null
})

/** Lifecycle */
onMounted(() => {
  if (props.field.required && props.rows.length === 0)
    addRow()
})
</script>

<template>
  <fieldset class="questionnaire-group questionnaire-repeater">
    <legend class="questionnaire-legend">
      {{ label }}<template v-if="field.required">
        *
      </template>
    </legend>

    <ol
      v-if="rows.length"
      class="repeater-rows"
    >
      <li
        v-for="(row, index) in rows"
        :key="index"
        class="repeater-row card card-pane"
      >
        <span
          class="repeater-index"
          aria-hidden="true"
        >{{ String(index + 1).padStart(2, '0') }}</span>

        <div class="repeater-cells">
          <QuestionnaireField
            v-for="column in columns"
            :id="`${id}-${index}-${column.key}`"
            :key="column.key"
            :field="column"
            :model-value="row[column.key] ?? ''"
            :error="rowErrors?.[index]?.[column.key] ?? null"
            :i18n-base="`${i18nBase}.fields.${column.key}`"
            @update:model-value="updateCell(index, column.key, $event)"
          />
        </div>

        <UiButton
          variant="text"
          size="sm"
          icon
          :title="`${t('questionnaire.actions.remove')} ${String(index + 1).padStart(2, '0')}`"
          :aria-label="`${t('questionnaire.actions.remove')} ${String(index + 1).padStart(2, '0')}`"
          custom-class="repeater-remove text-danger"
          @click="removeRow(index)"
        >
          <template #icon>
            <UiIconMaterial icon-code="&#xe92e;" />
          </template>
        </UiButton>
      </li>
    </ol>

    <UiButton
      v-if="!isFull"
      variant="outline"
      size="sm"
      :text="t(`${i18nBase}.add`)"
      @click="addRow"
    >
      <template #icon>
        <UiIconMaterial icon-code="&#xe145;" />
      </template>
    </UiButton>
  </fieldset>
</template>
