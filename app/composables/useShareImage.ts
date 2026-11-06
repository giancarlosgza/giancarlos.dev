/** Types */
export type TShareImage = 'home' | 'plans' | 'questionnaire'

/** Open Graph and Twitter card image for the current locale, from public/images/og */
export function useShareImage(name: TShareImage, alt: () => string): void {
  /** Data */
  const { locale } = useI18n()
  const siteUrl = useRuntimeConfig().public.siteUrl

  /** Computed */
  const imageUrl = computed<string>(() => `${siteUrl}/images/og/${name}-${locale.value}.jpg`)

  /** Meta */
  useSeoMeta({
    ogType: 'website',
    ogSiteName: 'Giancarlos Garza',
    ogImage: imageUrl,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogImageAlt: alt,
    twitterCard: 'summary_large_image',
    twitterImage: imageUrl,
    twitterImageAlt: alt
  })
}
