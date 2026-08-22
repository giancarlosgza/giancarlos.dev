/** Interfaces */
export interface IMeshTintSource {
  id: string
  /** CSS custom property holding the tint color, e.g. '--theme-info-a10'. */
  tintVar: string
}

/**
 * Theme-aware colors for StaticMeshGradient blooms.
 *
 * Exposes the base color the shader blends against (follows the color mode)
 * and, for token-driven sources, a per-id palette resolved from CSS custom
 * properties at runtime. The shader needs literal colors, so token values
 * (oklch, color-mix, hex...) are normalized through a 1px canvas.
 */
export function useMeshGradient(sources: IMeshTintSource[] = []) {
  const colorMode = useColorMode()
  const meshBase = computed(() => (colorMode.value === 'dark' ? '#15151c' : '#ffffff'))
  const tokenPalettes = ref<Record<string, string[]>>({})

  function resolveCssColor(value: string, fallback: string): string {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    if (!ctx || !value)
      return fallback
    ctx.fillStyle = fallback
    ctx.fillStyle = value
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    return `#${[r, g, b].map(channel => (channel ?? 0).toString(16).padStart(2, '0')).join('')}`
  }

  function refreshTokenPalettes(): void {
    if (!import.meta.client || sources.length === 0)
      return
    const rootStyle = getComputedStyle(document.documentElement)
    const map: Record<string, string[]> = {}
    for (const source of sources) {
      const raw = rootStyle.getPropertyValue(source.tintVar).trim()
      const tint = resolveCssColor(raw, '#223fff')
      const soft = resolveCssColor(`color-mix(in oklab, ${tint} 45%, ${meshBase.value})`, tint)
      map[source.id] = [meshBase.value, soft, tint]
    }
    tokenPalettes.value = map
  }

  onMounted(refreshTokenPalettes)
  watch(() => colorMode.value, () => nextTick(refreshTokenPalettes))

  return { colorMode, meshBase, tokenPalettes }
}
