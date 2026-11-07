import type { TPricingExtraId, TPricingPlanId } from '~/utils/pricing'
import type {
  IInvite,
  IQuestionField,
  IQuestionScope,
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
  defaultPlan,
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
  invite: string | null
  niche: TNiche | null
  lastNiche: TNiche | null
  plan: TPricingPlanId | null
  extras: TPricingExtraId[]
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

function emptyDraft(invite: string | null = null): IQuestionnaireDraft {
  return {
    invite,
    niche: null,
    lastNiche: null,
    plan: null,
    extras: [],
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
  const scope = computed<IQuestionScope | null>(() => draft.value.niche
    ? { niche: draft.value.niche, plan: draft.value.plan ?? defaultPlan(draft.value.niche), extras: draft.value.extras }
    : null)
  const visibleFields = computed<IQuestionField[]>(() => scope.value
    ? getVisibleFields(step.value, scope.value, draft.value.answers)
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
    if (!scope.value)
      return result

    for (const field of getVisibleFields(target, scope.value, draft.value.answers)) {
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

  function applyInvite(invite: IInvite): void {
    draft.value.plan = invite.plan
    draft.value.extras = invite.extras
  }

  function selectNiche(niche: TNiche): void {
    draft.value.niche = niche
    goToStep('contact')
  }

  function resetNiche(): void {
    draft.value.lastNiche = draft.value.niche
    draft.value.niche = null
  }

  function clearDraft(invite: string | null = null): void {
    draft.value = emptyDraft(invite)
    files.value = {}
  }

  function collectAnswers(): TAnswers {
    const current = scope.value
    if (!current)
      return {}

    const answers: TAnswers = {}
    for (const field of steps.flatMap(item => item.fields)) {
      const value = draft.value.answers[field.key]
      if (value !== undefined && field.type !== 'file' && field.type !== 'files' && isFieldVisible(field, current, draft.value.answers)) {
        answers[field.key] = field.type === 'repeater' && Array.isArray(value)
          ? (value as TRepeaterRow[]).filter(row => !isBlankRow(row))
          : value
      }
    }

    return answers
  }

  function collectFiles(): TFieldFiles {
    const current = scope.value
    if (!current)
      return {}

    return Object.fromEntries(steps
      .flatMap(item => item.fields)
      .filter(field => (field.type === 'file' || field.type === 'files') && isFieldVisible(field, current, draft.value.answers))
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
    scope,
    visibleFields,
    setAnswer,
    setFiles,
    validateStep,
    validateAll,
    goToStep,
    nextStep,
    previousStep,
    applyInvite,
    selectNiche,
    resetNiche,
    clearDraft,
    collectAnswers,
    collectFiles
  }
}
