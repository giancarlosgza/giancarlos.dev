/** Methods */
export function withUtm(url: string, campaign: string): string {
  const target = new URL(url)
  target.searchParams.set('utm_source', 'giancarlos.dev')
  target.searchParams.set('utm_medium', 'referral')
  target.searchParams.set('utm_campaign', campaign)
  return target.toString()
}
