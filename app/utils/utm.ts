/** Methods */
export function withUtm(url: string, campaign: string, content: string): string {
  const target = new URL(url)
  target.searchParams.set('utm_source', 'giancarlos.dev')
  target.searchParams.set('utm_medium', 'referral')
  target.searchParams.set('utm_campaign', campaign)
  target.searchParams.set('utm_content', content)
  return target.toString()
}
