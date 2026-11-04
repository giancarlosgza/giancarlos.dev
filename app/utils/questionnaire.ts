/** Types */
export type TNiche = 'cafe' | 'health' | 'music'

export type TStepId = 'contact' | 'business' | 'audience' | 'location' | 'online' | 'brand' | 'content' | 'review'

export type TFieldType
  = | 'text'
    | 'email'
    | 'url'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'chips'
    | 'tags'
    | 'check'
    | 'colors'
    | 'file'
    | 'files'
    | 'date'
    | 'repeater'

export type TRepeaterRow = Record<string, string>

export type TAnswerValue = string | string[] | boolean | TRepeaterRow[] | null

export type TAnswers = Record<string, TAnswerValue | undefined>

export type TFieldFiles = Record<string, File[]>

export type TFieldError = 'required' | 'email' | 'url' | 'tel' | 'numeric' | 'either'

/** Interfaces */
export interface IQuestionField {
  /** Answer key; labels live at `questionnaire.fields.<key>` */
  key: string
  type: TFieldType
  required?: boolean
  niches?: TNiche[]
  showIf?: (answers: TAnswers) => boolean
  /** Option ids; labels live at `questionnaire.fields.<key>.options.<id>` */
  options?: string[]
  max?: number
  /** Required only when this other answer is empty */
  requiredWithout?: string
  format?: 'url'
  maxlength?: number
  wide?: boolean
  autocomplete?: string
  inputmode?: 'text' | 'numeric' | 'tel' | 'email' | 'url'
  fields?: IQuestionField[]
}

export interface IQuestionStep {
  id: TStepId
  fields: IQuestionField[]
}

export interface IInvite {
  code: string
  clientName: string | null
  niche: TNiche | null
}

export interface IUploadedFile {
  key: string
  path: string
  name: string
  size: number
  type: string
}

/** Constants */
export const NICHES: TNiche[] = ['cafe', 'health', 'music']

const offersBooking = (answers: TAnswers): boolean => ['booking', 'both'].includes(answers.musicGoals as string)
const offersTeaching = (answers: TAnswers): boolean => ['teaching', 'both'].includes(answers.musicGoals as string)
const isPsychologist = (answers: TAnswers): boolean => answers.healthProfession === 'psychologist'

export const QUESTIONNAIRE_STEPS: IQuestionStep[] = [
  {
    id: 'contact',
    fields: [
      {
        key: 'contactName',
        type: 'text',
        required: true,
        maxlength: 100,
        autocomplete: 'name'
      },
      {
        key: 'contactEmail',
        type: 'email',
        requiredWithout: 'contactWhatsapp',
        maxlength: 120,
        autocomplete: 'email'
      },
      {
        key: 'contactWhatsapp',
        type: 'tel',
        requiredWithout: 'contactEmail',
        autocomplete: 'tel'
      }
    ]
  },
  {
    id: 'business',
    fields: [
      {
        key: 'cafeVenueType',
        type: 'chips',
        required: true,
        niches: ['cafe'],
        wide: true,
        options: [
          'specialty',
          'roaster',
          'bakery',
          'brewBar',
          'food'
        ]
      },
      {
        key: 'healthProfession',
        type: 'radio',
        required: true,
        niches: ['health'],
        wide: true,
        options: [
          'doctor',
          'dentist',
          'psychologist',
          'nutritionist',
          'physio',
          'other'
        ]
      },
      {
        key: 'musicActType',
        type: 'radio',
        required: true,
        niches: ['music'],
        wide: true,
        options: ['solo', 'duo', 'band', 'ensemble']
      },
      {
        key: 'healthTitle',
        type: 'select',
        required: true,
        niches: ['health'],
        options: [
          'dra',
          'dr',
          'lic',
          'mtra',
          'mtro',
          'psic'
        ]
      },
      {
        key: 'businessName',
        type: 'text',
        required: true,
        maxlength: 100,
        autocomplete: 'organization'
      },
      {
        key: 'healthSpecialty',
        type: 'text',
        required: true,
        niches: ['health'],
        maxlength: 100
      },
      {
        key: 'healthCedula',
        type: 'text',
        required: true,
        niches: ['health'],
        maxlength: 20,
        inputmode: 'numeric'
      },
      { key: 'tagline', type: 'text', maxlength: 80 },
      {
        key: 'shortDescription',
        type: 'textarea',
        required: true,
        wide: true,
        maxlength: 300
      },
      {
        key: 'story',
        type: 'textarea',
        wide: true,
        maxlength: 1500
      },
      {
        key: 'differentiators',
        type: 'tags',
        required: true,
        wide: true,
        max: 3,
        maxlength: 60
      },
      {
        key: 'problemsSolved',
        type: 'textarea',
        required: true,
        wide: true,
        maxlength: 800
      },
      {
        key: 'healthEducation',
        type: 'repeater',
        required: true,
        niches: ['health'],
        wide: true,
        max: 8,
        fields: [
          {
            key: 'degree',
            type: 'text',
            required: true,
            maxlength: 120
          },
          {
            key: 'institution',
            type: 'text',
            required: true,
            maxlength: 120
          },
          {
            key: 'year',
            type: 'text',
            maxlength: 4,
            inputmode: 'numeric'
          }
        ]
      },
      {
        key: 'musicMembers',
        type: 'repeater',
        niches: ['music'],
        wide: true,
        max: 12,
        showIf: answers => !!answers.musicActType && answers.musicActType !== 'solo',
        fields: [
          {
            key: 'name',
            type: 'text',
            required: true,
            maxlength: 80
          },
          { key: 'role', type: 'text', maxlength: 80 }
        ]
      },
      {
        key: 'musicGoals',
        type: 'radio',
        required: true,
        niches: ['music'],
        wide: true,
        options: ['booking', 'teaching', 'both']
      },
      {
        key: 'musicGenres',
        type: 'tags',
        required: true,
        niches: ['music'],
        wide: true,
        max: 6,
        maxlength: 40
      }
    ]
  },
  {
    id: 'audience',
    fields: [
      {
        key: 'primaryCta',
        type: 'chips',
        required: true,
        wide: true,
        options: [
          'whatsapp',
          'call',
          'booking',
          'directions',
          'order'
        ]
      },
      {
        key: 'audience',
        type: 'textarea',
        required: true,
        wide: true,
        maxlength: 600
      },
      {
        key: 'serviceArea',
        type: 'tags',
        required: true,
        wide: true,
        max: 10,
        maxlength: 60
      }
    ]
  },
  {
    id: 'location',
    fields: [
      { key: 'publicWhatsapp', type: 'tel', autocomplete: 'tel' },
      {
        key: 'publicEmail',
        type: 'email',
        maxlength: 120,
        autocomplete: 'email'
      },
      {
        key: 'locationType',
        type: 'chips',
        required: true,
        wide: true,
        options: ['storefront', 'visit', 'online']
      },
      {
        key: 'locations',
        type: 'repeater',
        required: true,
        wide: true,
        max: 10,
        showIf: answers => Array.isArray(answers.locationType) && (answers.locationType as string[]).includes('storefront'),
        fields: [
          { key: 'name', type: 'text', maxlength: 80 },
          {
            key: 'address',
            type: 'textarea',
            required: true,
            maxlength: 300,
            autocomplete: 'street-address'
          },
          {
            key: 'hours',
            type: 'textarea',
            required: true,
            maxlength: 300
          }
        ]
      },
      {
        key: 'cafeAmenities',
        type: 'chips',
        niches: ['cafe'],
        wide: true,
        options: [
          'wifi',
          'work',
          'pets',
          'terrace',
          'parking',
          'kids',
          'accessible',
          'liveMusic'
        ]
      },
      {
        key: 'healthBooking',
        type: 'radio',
        required: true,
        niches: ['health'],
        wide: true,
        options: ['whatsapp', 'phone', 'platform']
      },
      {
        key: 'healthBookingUrl',
        type: 'url',
        required: true,
        niches: ['health'],
        maxlength: 500,
        showIf: answers => answers.healthBooking === 'platform'
      },
      {
        key: 'musicCoverage',
        type: 'text',
        required: true,
        niches: ['music'],
        maxlength: 120,
        showIf: offersBooking
      }
    ]
  },
  {
    id: 'online',
    fields: [
      { key: 'socialInstagram', type: 'url', maxlength: 300 },
      { key: 'socialFacebook', type: 'url', maxlength: 300 },
      { key: 'socialTiktok', type: 'url', maxlength: 300 },
      { key: 'socialYoutube', type: 'url', maxlength: 300 },
      {
        key: 'googleProfile',
        type: 'radio',
        required: true,
        wide: true,
        options: ['yes', 'no', 'unsure']
      },
      {
        key: 'googleProfileUrl',
        type: 'url',
        required: true,
        maxlength: 500,
        showIf: answers => answers.googleProfile === 'yes'
      },
      {
        key: 'domain',
        type: 'radio',
        required: true,
        wide: true,
        options: ['have', 'need', 'unsure']
      },
      {
        key: 'domainName',
        type: 'text',
        required: true,
        maxlength: 120,
        showIf: answers => answers.domain === 'have'
      },
      {
        key: 'domainIdeas',
        type: 'tags',
        max: 5,
        maxlength: 60,
        showIf: answers => answers.domain === 'need'
      },
      {
        key: 'healthCofepris',
        type: 'text',
        niches: ['health'],
        maxlength: 60
      },
      {
        key: 'musicLinks',
        type: 'repeater',
        niches: ['music'],
        wide: true,
        max: 6,
        fields: [
          {
            key: 'platform',
            type: 'select',
            required: true,
            options: [
              'spotify',
              'appleMusic',
              'youtube',
              'soundcloud',
              'bandcamp',
              'other'
            ]
          },
          {
            key: 'url',
            type: 'url',
            required: true,
            maxlength: 500
          }
        ]
      },
      {
        key: 'musicVideos',
        type: 'tags',
        niches: ['music'],
        wide: true,
        format: 'url',
        max: 3,
        maxlength: 300
      }
    ]
  },
  {
    id: 'brand',
    fields: [
      {
        key: 'logoFile',
        type: 'file',
        wide: true,
        showIf: answers => !answers.noLogo
      },
      { key: 'noLogo', type: 'check', wide: true },
      {
        key: 'brandColors',
        type: 'colors',
        wide: true,
        max: 3
      },
      { key: 'brandHelp', type: 'check', wide: true },
      {
        key: 'styleKeywords',
        type: 'chips',
        required: true,
        wide: true,
        max: 3,
        options: [
          'minimal',
          'warm',
          'elegant',
          'bold',
          'playful',
          'clinical',
          'natural',
          'premium',
          'modern',
          'retro'
        ]
      },
      {
        key: 'references',
        type: 'repeater',
        wide: true,
        max: 3,
        fields: [
          {
            key: 'url',
            type: 'url',
            required: true,
            maxlength: 500
          },
          { key: 'note', type: 'text', maxlength: 200 }
        ]
      }
    ]
  },
  {
    id: 'content',
    fields: [
      {
        key: 'cafeMenuFiles',
        type: 'files',
        required: true,
        niches: ['cafe'],
        wide: true,
        max: 10
      },
      {
        key: 'cafeSignatureItems',
        type: 'tags',
        required: true,
        niches: ['cafe'],
        wide: true,
        max: 3,
        maxlength: 60
      },
      {
        key: 'cafeOrdering',
        type: 'chips',
        required: true,
        niches: ['cafe'],
        wide: true,
        options: [
          'whatsapp',
          'pickup',
          'delivery',
          'dineIn'
        ]
      },
      {
        key: 'healthServices',
        type: 'repeater',
        required: true,
        niches: ['health'],
        wide: true,
        max: 40,
        fields: [
          { key: 'category', type: 'text', maxlength: 80 },
          {
            key: 'name',
            type: 'text',
            required: true,
            maxlength: 100
          },
          { key: 'description', type: 'text', maxlength: 300 },
          { key: 'price', type: 'text', maxlength: 30 }
        ]
      },
      {
        key: 'healthApproaches',
        type: 'tags',
        required: true,
        niches: ['health'],
        wide: true,
        max: 6,
        maxlength: 60,
        showIf: isPsychologist
      },
      {
        key: 'healthPopulations',
        type: 'chips',
        required: true,
        niches: ['health'],
        wide: true,
        options: [
          'children',
          'teens',
          'adults',
          'couples',
          'families'
        ],
        showIf: isPsychologist
      },
      {
        key: 'healthCases',
        type: 'files',
        niches: ['health'],
        wide: true,
        max: 12,
        showIf: answers => !!answers.healthProfession && !isPsychologist(answers)
      },
      {
        key: 'musicEventTypes',
        type: 'chips',
        required: true,
        niches: ['music'],
        wide: true,
        options: [
          'weddings',
          'corporate',
          'private',
          'venues',
          'festivals',
          'quince',
          'ceremonies'
        ],
        showIf: offersBooking
      },
      {
        key: 'musicPackages',
        type: 'repeater',
        niches: ['music'],
        wide: true,
        max: 10,
        showIf: offersBooking,
        fields: [
          {
            key: 'name',
            type: 'text',
            required: true,
            maxlength: 80
          },
          { key: 'duration', type: 'text', maxlength: 40 },
          { key: 'lineup', type: 'text', maxlength: 120 },
          { key: 'price', type: 'text', maxlength: 30 }
        ]
      },
      {
        key: 'musicInstruments',
        type: 'tags',
        required: true,
        niches: ['music'],
        wide: true,
        max: 8,
        maxlength: 40,
        showIf: offersTeaching
      },
      {
        key: 'musicLevels',
        type: 'chips',
        required: true,
        niches: ['music'],
        wide: true,
        options: ['beginner', 'intermediate', 'advanced'],
        showIf: offersTeaching
      },
      {
        key: 'musicLessonPlace',
        type: 'chips',
        required: true,
        niches: ['music'],
        wide: true,
        options: ['studio', 'home', 'online'],
        showIf: offersTeaching
      },
      {
        key: 'musicLessonFormats',
        type: 'repeater',
        required: true,
        niches: ['music'],
        wide: true,
        max: 10,
        showIf: offersTeaching,
        fields: [
          {
            key: 'name',
            type: 'text',
            required: true,
            maxlength: 80
          },
          { key: 'duration', type: 'text', maxlength: 40 },
          { key: 'price', type: 'text', maxlength: 30 }
        ]
      },
      { key: 'portrait', type: 'file', wide: true },
      {
        key: 'photos',
        type: 'files',
        wide: true,
        max: 12
      },
      {
        key: 'useGoogleReviews',
        type: 'check',
        wide: true,
        showIf: answers => !!answers.googleProfile && answers.googleProfile !== 'no'
      },
      {
        key: 'faq',
        type: 'repeater',
        wide: true,
        max: 10,
        fields: [
          {
            key: 'question',
            type: 'text',
            required: true,
            maxlength: 200
          },
          {
            key: 'answer',
            type: 'textarea',
            required: true,
            maxlength: 800
          }
        ]
      }
    ]
  },
  {
    id: 'review',
    fields: [
      { key: 'launchDate', type: 'date' },
      {
        key: 'notes',
        type: 'textarea',
        wide: true,
        maxlength: 1500
      },
      {
        key: 'contentRights',
        type: 'check',
        required: true,
        wide: true
      },
      {
        key: 'privacyConsent',
        type: 'check',
        required: true,
        wide: true
      }
    ]
  }
]

/** Methods */
export function isFieldVisible(field: IQuestionField, niche: TNiche, answers: TAnswers): boolean {
  if (field.niches && !field.niches.includes(niche))
    return false

  return field.showIf
    ? field.showIf(answers)
    : true
}

export function getVisibleFields(step: IQuestionStep, niche: TNiche, answers: TAnswers): IQuestionField[] {
  return step.fields
    .filter(field => isFieldVisible(field, niche, answers))
}

export function isEmptyAnswer(value: TAnswerValue | undefined): boolean {
  if (value === null || value === undefined || value === false)
    return true

  if (typeof value === 'string')
    return value.trim() === ''

  return Array.isArray(value) && value.length === 0
}

export function isBlankRow(row: TRepeaterRow): boolean {
  return Object.values(row).every(cell => !cell?.trim())
}

export function filledRows(value: TAnswerValue | undefined): TRepeaterRow[] {
  return Array.isArray(value)
    ? (value as TRepeaterRow[]).filter(row => !isBlankRow(row))
    : []
}

/** Mexican numbers only, stored as 10 digits without a +52 / 52 1 prefix */
export function normalizePhone(value: string): string {
  let digits = value.replace(/\D/g, '')
  if (digits.length > 10 && digits.startsWith('521'))
    digits = digits.slice(3)
  else if (digits.length > 10 && digits.startsWith('52'))
    digits = digits.slice(2)

  return digits.slice(0, 10)
}

const EMAIL_RE = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
const URL_RE = /^(?:https?:\/\/)?[^\s/$.?#].[^\s.]*\.\S{2,}$/i

function validateFormat(field: IQuestionField, value: string): TFieldError | null {
  const { type } = field
  if (field.inputmode === 'numeric' && /\D/.test(value))
    return 'numeric'

  if (type === 'email' && !EMAIL_RE.test(value))
    return 'email'

  if (type === 'url' && !URL_RE.test(value))
    return 'url'

  if (type === 'tel' && normalizePhone(value).length !== 10)
    return 'tel'

  return null
}

export function validateField(field: IQuestionField, value: TAnswerValue | undefined, files: File[] = []): TFieldError | null {
  let empty = isEmptyAnswer(value)
  if (field.type === 'file' || field.type === 'files')
    empty = files.length === 0
  else if (field.type === 'repeater')
    empty = filledRows(value).length === 0

  if (empty)
    return field.required ? 'required' : null

  if (typeof value === 'string')
    return validateFormat(field, value.trim())

  if (field.format === 'url' && Array.isArray(value) && (value as string[]).some(item => !URL_RE.test(item.trim())))
    return 'url'

  return null
}

export function validateRepeaterRow(field: IQuestionField, row: TRepeaterRow): Record<string, TFieldError> {
  const errors: Record<string, TFieldError> = {}

  for (const column of field.fields ?? []) {
    const error = validateField(column, row[column.key])
    if (error)
      errors[column.key] = error
  }

  return errors
}

/** Matches storage.rules in giancarlos-admin */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024
export const UPLOAD_ACCEPT = 'image/*,application/pdf'

export function isAllowedUpload(file: File): boolean {
  return (file.type.startsWith('image/') || file.type === 'application/pdf') && file.size < MAX_UPLOAD_BYTES
}
