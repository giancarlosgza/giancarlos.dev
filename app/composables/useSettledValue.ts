import type { Ref } from 'vue'

/**
 * Mirrors a reactive value only after it has stayed unchanged for `delay` ms,
 * resetting to `idleValue` in the meantime. Used to defer mounting expensive
 * content (e.g. WebGL blooms) until an expand/collapse motion has settled.
 */
export function useSettledValue<T>(source: Ref<T>, idleValue: T, delay = 480): Ref<T> {
  const settled = ref(idleValue) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | undefined

  watch(source, (value) => {
    settled.value = idleValue
    clearTimeout(timer)
    timer = setTimeout(() => {
      settled.value = value
    }, delay)
  }, { immediate: true })

  onScopeDispose(() => clearTimeout(timer))

  return settled
}
