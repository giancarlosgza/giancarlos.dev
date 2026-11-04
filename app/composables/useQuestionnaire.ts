import type {
  IQuestionField,
  IQuestionStep,
  TAnswers,
  TAnswerValue,
  TFieldError,
  TFieldFiles,
  TNiche,
  TRepeaterRow,
  TStepId
} from '~/utils/questionnaire'
import {
  getVisibleFields,
  isBlankRow,
  isEmptyAnswer,
  isFieldVisible,
  QUESTIONNAIRE_STEPS,
  validateField,
  validateRepeaterRow
} from '~/utils/questionnaire'

/** Interfaces */
interface IQuestionnaireDraft {
  niche: TNiche | null
  lastNiche: TNiche | null
  stepId: TStepId
  furthestStepId: TStepId
  answers: TAnswers
}

/** Types */
export type TRowErrors = Record<string, Record<number, Record<string, TFieldError>>>

interface IStepErrors {
  errors: Record<string, TFieldError>
  rowErrors: TRowErrors
}

/** Constants */
const DRAFT_KEY = 'gg-questionnaire-draft'

function emptyDraft(): IQuestionnaireDraft {
  return {
    niche: null,
    lastNiche: null,
    stepId: 'contact',
    furthestStepId: 'contact',
    answers: {}
  }
}

export function useQuestionnaire() {
  /** Data */
  const draft = useLocalStorage<IQuestionnaireDraft>(
    DRAFT_KEY,
    emptyDraft(),
    { mergeDefaults: true, initOnMounted: true }
  )
  const files = shallowRef<TFieldFiles>({})
  const errors = ref<Record<string, TFieldError>>({})
  const rowErrors = ref<TRowErrors>({})

  /** Computed */
  const steps: IQuestionStep[] = QUESTIONNAIRE_STEPS
  const stepIndex = computed<number>(() => Math.max(0, steps.findIndex(item => item.id === draft.value.stepId)))
  const step = computed<IQuestionStep>(() => steps[stepIndex.value] ?? steps[0]!)
  const nextStepId = computed<TStepId | null>(() => steps[stepIndex.value + 1]?.id ?? null)
  const isFirstStep = computed<boolean>(() => stepIndex.value === 0)
  const isLastStep = computed<boolean>(() => stepIndex.value === steps.length - 1)
  const furthestIndex = computed<number>(() => Math.max(stepIndex.value, steps.findIndex(item => item.id === draft.value.furthestStepId)))
  const visibleFields = computed<IQuestionField[]>(() => draft.value.niche
    ? getVisibleFields(step.value, draft.value.niche, draft.value.answers)
    : [])
  const hasErrors = computed<boolean>(() => Object.keys(errors.value).length > 0
    || Object.keys(rowErrors.value).length > 0)

  /** Methods */
  function setAnswer(key: string, value: TAnswerValue): void {
    draft.value.answers[key] = value
    clearError(key)
    for (const field of visibleFields.value) {
      if (field.requiredWithout === key)
        clearError(field.key)
    }
    trimRows()
  }

  // An answer can lower a list's limit (several locations → one)
  function trimRows(): void {
    for (const field of steps.flatMap(item => item.fields)) {
      const rows = draft.value.answers[field.key]
      const max = field.maxFor?.(draft.value.answers)
      if (max && Array.isArray(rows) && rows.length > max)
        draft.value.answers[field.key] = rows.slice(0, max) as TRepeaterRow[]
    }
  }

  function setFiles(key: string, list: File[]): void {
    files.value = { ...files.value, [key]: list }
    clearError(key)
  }

  function clearError(key: string): void {
    if (errors.value[key])
      delete errors.value[key]

    if (rowErrors.value[key])
      delete rowErrors.value[key]
  }

  function stepErrors(target: IQuestionStep): IStepErrors {
    const result: IStepErrors = { errors: {}, rowErrors: {} }
    if (!draft.value.niche)
      return result

    for (const field of getVisibleFields(target, draft.value.niche, draft.value.answers)) {
      const value = draft.value.answers[field.key]
      const missingBoth = !!field.requiredWithout
        && isEmptyAnswer(value)
        && isEmptyAnswer(draft.value.answers[field.requiredWithout])
      const error = missingBoth
        ? 'either'
        : validateField(field, value, files.value[field.key])

      if (error)
        result.errors[field.key] = error

      if (field.type === 'repeater' && Array.isArray(value)) {
        (value as TRepeaterRow[]).forEach((row, index) => {
          const columns = isBlankRow(row)
            ? {}
            : validateRepeaterRow(field, row)
          if (Object.keys(columns).length) {
            result.rowErrors[field.key] ??= {}
            result.rowErrors[field.key]![index] = columns
          }
        })
      }
    }

    return result
  }

  function hasStepErrors(result: IStepErrors): boolean {
    return Object.keys(result.errors).length > 0 || Object.keys(result.rowErrors).length > 0
  }

  function validateStep(): boolean {
    const result = stepErrors(step.value)
    errors.value = result.errors
    rowErrors.value = result.rowErrors

    return !hasErrors.value
  }

  // Files are lost on reload, so sending rechecks every step
  function validateAll(): boolean {
    const invalid = steps.find(item => hasStepErrors(stepErrors(item)))
    if (!invalid)
      return true

    goToStep(invalid.id)
    validateStep()
    return false
  }

  function goToStep(stepId: TStepId): void {
    errors.value = {}
    rowErrors.value = {}
    draft.value.stepId = stepId
    if (stepIndex.value > steps.findIndex(item => item.id === draft.value.furthestStepId))
      draft.value.furthestStepId = stepId
  }

  function nextStep(): boolean {
    if (!validateStep())
      return false

    if (nextStepId.value)
      goToStep(nextStepId.value)

    return true
  }

  function previousStep(): void {
    const previous = steps[stepIndex.value - 1]
    if (previous)
      goToStep(previous.id)
  }

  function selectNiche(niche: TNiche): void {
    draft.value.niche = niche
    goToStep('contact')
  }

  function resetNiche(): void {
    draft.value.lastNiche = draft.value.niche
    draft.value.niche = null
  }

  function clearDraft(): void {
    draft.value = emptyDraft()
    files.value = {}
  }

  function collectAnswers(): TAnswers {
    const niche = draft.value.niche
    if (!niche)
      return {}

    const answers: TAnswers = {}
    for (const field of steps.flatMap(item => item.fields)) {
      const value = draft.value.answers[field.key]
      if (value !== undefined && field.type !== 'file' && field.type !== 'files' && isFieldVisible(field, niche, draft.value.answers)) {
        answers[field.key] = field.type === 'repeater' && Array.isArray(value)
          ? (value as TRepeaterRow[]).filter(row => !isBlankRow(row))
          : value
      }
    }

    return answers
  }

  function collectFiles(): TFieldFiles {
    const niche = draft.value.niche
    if (!niche)
      return {}

    return Object.fromEntries(steps
      .flatMap(item => item.fields)
      .filter(field => (field.type === 'file' || field.type === 'files') && isFieldVisible(field, niche, draft.value.answers))
      .map(field => [field.key, files.value[field.key] ?? []])
      .filter(([, list]) => list!.length > 0))
  }

  return {
    draft,
    files,
    errors,
    rowErrors,
    steps,
    step,
    stepIndex,
    nextStepId,
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
    selectNiche,
    resetNiche,
    clearDraft,
    collectAnswers,
    collectFiles
  }
}
