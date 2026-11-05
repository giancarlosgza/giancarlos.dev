import type { TBrandIcon } from './brand-icons'

/**
 * Interfaces
 *
 * Note: `tagline`, `role`, `description`, metric `label`, principle `title`/`text`,
 * stack group `label` and experiment `text` hold i18n message keys — resolve them
 * with `t()`/`$t()` in components. Stack tool names live at `stack.tools.<id>`.
 * Everything else is literal data.
 */
export interface IProjectMetric {
  value: string
  label: string
  icon: string
}

export interface IProject {
  id: string
  name: string
  tagline: string
  role: string
  description: string
  metrics: IProjectMetric[]
  meshColors: string[]
  stack: string[]
  href?: string
  linkLabel?: string
}

export interface IPrinciple {
  id: string
  icon: string
  title: string
  text: string
}

/** A brand logo, a raster logo, or a Material Symbols code point for practices without one */
export interface IStackTool {
  id: string
  brand?: TBrandIcon
  image?: string
  icon?: string
}

export interface IStackGroup {
  id: string
  label: string
  icon: string
  tools: IStackTool[]
}

export interface IExperiment {
  id: string
  title: string
  text: string
  href: string
  linkLabel: string
  icon: string
  /** Theme token driving the slide tint and mesh bloom (resolved at runtime). */
  tintVar: string
}

/** Data */
export const projects: IProject[] = [
  {
    id: '01',
    name: 'Colorffy',
    tagline: 'projects.p01.tagline',
    role: 'projects.p01.role',
    description: 'projects.p01.description',
    metrics: [
      { value: '400K+', label: 'projects.p01.m1', icon: '&#xe7ef;' },
      { value: '900K+', label: 'projects.p01.m2', icon: '&#xe8f4;' },
      { value: '2', label: 'projects.p01.m3', icon: '&#xf720;' }
    ],
    meshColors: ['#223fff', '#9099ff', '#adb4fe'],
    stack: [
      'Nuxt 4',
      'Vue',
      'TypeScript',
      'Docker',
      'Nginx',
      'PostgreSQL'
    ],
    href: 'https://colorffy.com',
    linkLabel: 'colorffy.com'
  },
  {
    id: '02',
    name: 'ProChef',
    tagline: 'projects.p02.tagline',
    role: 'projects.p02.role',
    description: 'projects.p02.description',
    metrics: [
      { value: '10K+', label: 'projects.p02.m1', icon: '&#xef6e;' },
      { value: '−80%', label: 'projects.p02.m2', icon: '&#xe425;' }
    ],
    meshColors: ['#f8bc15', '#83fb83'],
    stack: [
      'Vue',
      'TypeScript',
      'IndexedDB',
      'Docker',
      'PostgreSQL'
    ],
    href: 'https://prochefexpress.com/',
    linkLabel: 'prochefexpress.com'
  },
  {
    id: '03',
    name: 'RastreoExpress',
    tagline: 'projects.p03.tagline',
    role: 'projects.p03.role',
    description: 'projects.p03.description',
    metrics: [
      { value: '200+', label: 'projects.p03.m1', icon: '&#xe55c;' },
      { value: '5s', label: 'projects.p03.m2', icon: '&#xe5d5;' }
    ],
    meshColors: ['#ca1414', '#1455e1'],
    stack: [
      'Vue',
      'TypeScript',
      'Realtime APIs',
      'Docker'
    ],
    href: 'https://rastreo.express',
    linkLabel: 'rastreo.express'
  },
  {
    id: '04',
    name: 'SysGate',
    tagline: 'projects.p04.tagline',
    role: 'projects.p04.role',
    description: 'projects.p04.description',
    metrics: [
      { value: 'Android & iOS', label: 'projects.p04.m1', icon: '&#xe325;' },
      { value: '100%', label: 'projects.p04.m2', icon: '&#xe412;' }
    ],
    meshColors: ['#566272', '#dd691c'],
    stack: [
      'Nuxt',
      'Vue',
      'TypeScript',
      'Firebase',
      'Android',
      'iOS',
      'PWA'
    ],
    href: 'https://sysgate.app/',
    linkLabel: 'sysgate.app'
  },
  {
    id: '05',
    name: 'CEPREP Desk',
    tagline: 'projects.p05.tagline',
    role: 'projects.p05.role',
    description: 'projects.p05.description',
    metrics: [
      { value: 'PWA', label: 'projects.p05.m1', icon: '&#xe337;' },
      { value: 'ERP', label: 'projects.p05.m2', icon: '&#xe871;' }
    ],
    meshColors: ['#d622ff', '#e798ff'],
    stack: [
      'Nuxt',
      'Vue',
      'Vuex',
      'SCSS',
      'JWT',
      'FullCalendar'
    ]
  },
  {
    id: '06',
    name: 'Cheffy Events',
    tagline: 'projects.p06.tagline',
    role: 'projects.p06.role',
    description: 'projects.p06.description',
    metrics: [
      { value: 'WIP', label: 'projects.p06.m1', icon: '&#xea3c;' },
      { value: 'SSR', label: 'projects.p06.m2', icon: '&#xe53b;' }
    ],
    meshColors: ['#ff2222ff', '#ff7f7fff'],
    stack: ['Nuxt 4', 'TypeScript', 'PostgreSQL']
  }
]

export const principles: IPrinciple[] = [
  {
    id: 'performance',
    icon: '&#xea0b;',
    title: 'principles.performance.title',
    text: 'principles.performance.text'
  },
  {
    id: 'systems',
    icon: '&#xe53b;',
    title: 'principles.systems.title',
    text: 'principles.systems.text'
  },
  {
    id: 'design-in-code',
    icon: '&#xf10a;',
    title: 'principles.designInCode.title',
    text: 'principles.designInCode.text'
  }
]

export const stackGroups: IStackGroup[] = [
  {
    id: 'frontend',
    label: 'stack.frontend.label',
    icon: '&#xe86f;',
    tools: [
      { id: 'vue', brand: 'vue' },
      { id: 'nuxt', brand: 'nuxt' },
      { id: 'typescript', brand: 'typescript' },
      { id: 'scss', brand: 'scss' },
      { id: 'colorffy', image: '/images/brands/colorffy.webp' },
      { id: 'accessibility', icon: '&#xe92c;' }
    ]
  },
  {
    id: 'platform',
    label: 'stack.platform.label',
    icon: '&#xf20e;',
    tools: [
      { id: 'nodejs', brand: 'nodejs' },
      { id: 'postgresql', brand: 'postgresql' },
      { id: 'rest', icon: '&#xf1b7;' },
      { id: 'indexeddb', icon: '&#xe1db;' },
      { id: 'offline', icon: '&#xe2c1;' }
    ]
  },
  {
    id: 'infrastructure',
    label: 'stack.infrastructure.label',
    icon: '&#xf720;',
    tools: [
      { id: 'docker', brand: 'docker' },
      { id: 'nginx', brand: 'nginx' },
      { id: 'linux', brand: 'linux' },
      { id: 'firebase', brand: 'firebase' },
      { id: 'cicd', icon: '&#xe627;' }
    ]
  }
]

export const experiments: IExperiment[] = [
  {
    id: 'colorffy-ui',
    title: '@colorffy/ui',
    text: 'experiments.colorffyUi.text',
    href: 'https://www.npmjs.com/package/@colorffy/ui',
    linkLabel: 'npm',
    icon: '&#xf720;',
    tintVar: '--cffy-info-a10'
  },
  {
    id: 'colorffy-css',
    title: '@colorffy/css',
    text: 'experiments.colorffyCss.text',
    href: 'https://www.npmjs.com/package/@colorffy/css',
    linkLabel: 'npm',
    icon: '&#xe40a;',
    tintVar: '--cffy-accent-a10'
  },
  {
    id: 'colorffy-workspace',
    title: 'Colorffy Workspace',
    text: 'experiments.colorffyWorkspace.text',
    href: 'https://github.com/giancarlosgza/colorffy-workspace',
    linkLabel: 'GitHub',
    icon: '&#xe86f;',
    tintVar: '--cffy-success-a10'
  }
]
