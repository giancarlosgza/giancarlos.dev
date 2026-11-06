/** Constants */
export const PROFILE_LINKS = {
  github: 'https://github.com/giancarlosgza',
  linkedin: 'https://www.linkedin.com/in/giancarlos-garza-b37897139'
}

/** Methods */
/** Schema.org JSON-LD as a useHead script entry */
export function jsonLdScript(data: Record<string, unknown>) {
  return {
    key: 'schema-org',
    type: 'application/ld+json' as const,
    innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data })
  }
}
