/**
 * Interfaces
 *
 * Note: plan and extra copy lives in the pricing i18n files, keyed by `id`.
 * Prices are MXN before IVA.
 */
export type TPricingPack = 'cafe' | 'health' | 'music'
export type TPricingPlanId = 'base' | TPricingPack

export interface IPricingPlan {
  id: TPricingPlanId
  monthly: number
  setup: number
  oneTime: number
  features: string[]
}

export interface IPricingExtra {
  id: string
  price: number
  recurring: boolean
  plans: TPricingPlanId[]
}

/** Constants */
export const CONTACT_EMAIL = 'hello@giancarlos.dev'

export const PRICING_PACKS: TPricingPack[] = ['cafe', 'health', 'music']

export const BASE_PLAN: IPricingPlan = {
  id: 'base',
  monthly: 499,
  setup: 999,
  oneTime: 4500,
  features: [
    'site',
    'domain',
    'maps',
    'whatsapp',
    'seo',
    'changes'
  ]
}

export const PACK_PLANS: Record<TPricingPack, IPricingPlan> = {
  cafe: {
    id: 'cafe',
    monthly: 699,
    setup: 999,
    oneTime: 6500,
    features: ['menu', 'orders', 'qr', 'gallery']
  },
  health: {
    id: 'health',
    monthly: 1299,
    setup: 1499,
    oneTime: 12500,
    features: [
      'design',
      'credentials',
      'appointments',
      'medicalSeo',
      'reviews'
    ]
  },
  music: {
    id: 'music',
    monthly: 699,
    setup: 999,
    oneTime: 6500,
    features: [
      'repertoire',
      'packages',
      'videos',
      'inquiries',
      'members'
    ]
  }
}

export const PRICING_EXTRAS: IPricingExtra[] = [
  {
    id: 'changes',
    price: 199,
    recurring: true,
    plans: ['base', 'cafe', 'health', 'music']
  },
  {
    id: 'english',
    price: 249,
    recurring: true,
    plans: ['base', 'cafe', 'health', 'music']
  },
  {
    id: 'reviews',
    price: 149,
    recurring: true,
    plans: ['cafe', 'music']
  },
  {
    id: 'galleryUpdates',
    price: 149,
    recurring: true,
    plans: ['cafe', 'health', 'music']
  },
  {
    id: 'page',
    price: 1200,
    recurring: false,
    plans: ['base', 'cafe', 'health', 'music']
  },
  {
    id: 'gallery',
    price: 499,
    recurring: false,
    plans: ['health', 'music']
  },
  {
    id: 'print',
    price: 499,
    recurring: false,
    plans: ['health', 'music']
  },
  {
    id: 'migration',
    price: 800,
    recurring: false,
    plans: ['base', 'cafe', 'health', 'music']
  }
]

export const PRICING_PLANS: Record<TPricingPlanId, IPricingPlan> = {
  base: BASE_PLAN,
  ...PACK_PLANS
}

/** Methods */
export function formatMxn(amount: number): string {
  return amount.toLocaleString('en-US')
}
