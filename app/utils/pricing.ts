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
  setup: 1000,
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
    setup: 1000,
    oneTime: 6500,
    features: ['menu', 'orders', 'delivery', 'qr']
  },
  health: {
    id: 'health',
    monthly: 699,
    setup: 1000,
    oneTime: 6500,
    features: [
      'credentials',
      'services',
      'cases',
      'appointments',
      'medicalSeo'
    ]
  },
  music: {
    id: 'music',
    monthly: 699,
    setup: 1000,
    oneTime: 6500,
    features: [
      'repertoire',
      'packages',
      'videos',
      'inquiries'
    ]
  }
}

export const PRICING_EXTRAS: IPricingExtra[] = [
  {
    id: 'reviews',
    price: 100,
    recurring: true,
    plans: ['cafe', 'health', 'music']
  },
  {
    id: 'galleryUpdates',
    price: 100,
    recurring: true,
    plans: ['cafe', 'health', 'music']
  },
  {
    id: 'changes',
    price: 200,
    recurring: true,
    plans: ['base', 'cafe', 'health', 'music']
  },
  {
    id: 'english',
    price: 300,
    recurring: true,
    plans: ['base', 'cafe', 'health', 'music']
  },
  {
    id: 'gallery',
    price: 500,
    recurring: false,
    plans: ['cafe', 'health', 'music']
  },
  {
    id: 'print',
    price: 500,
    recurring: false,
    plans: ['music']
  },
  {
    id: 'migration',
    price: 800,
    recurring: false,
    plans: ['base', 'cafe', 'health', 'music']
  },
  {
    id: 'page',
    price: 1200,
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
