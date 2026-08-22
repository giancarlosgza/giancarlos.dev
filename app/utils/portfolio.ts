/**
 * Interfaces
 *
 * Note: `tagline`, `role`, `description`, metric `label`, principle `title`/`text`,
 * stack group `label`/`items` and experiment `text` hold i18n message keys —
 * resolve them with `t()`/`$t()` in components. Everything else is literal data.
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

export interface IStackGroup {
  id: string
  label: string
  icon: string
  items: string
}

export interface IExperiment {
  id: string
  title: string
  text: string
  href: string
  linkLabel: string
  icon: string
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
    stack: ['Nuxt 4', 'Vue', 'TypeScript', 'Docker', 'Nginx', 'PostgreSQL'],
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
    meshColors: ['#ff5622', '#ffa47f'],
    stack: ['Vue', 'TypeScript', 'IndexedDB', 'Docker', 'PostgreSQL']
  },
  {
    id: '03',
    name: 'Fleets GPS',
    tagline: 'projects.p03.tagline',
    role: 'projects.p03.role',
    description: 'projects.p03.description',
    metrics: [
      { value: '200+', label: 'projects.p03.m1', icon: '&#xe55c;' },
      { value: '5s', label: 'projects.p03.m2', icon: '&#xe5d5;' }
    ],
    meshColors: ['#223fff', '#9099ff'],
    stack: ['Vue', 'TypeScript', 'Realtime APIs', 'Docker']
  },
  {
    id: '04',
    name: 'Cheffy Events',
    tagline: 'projects.p04.tagline',
    role: 'projects.p04.role',
    description: 'projects.p04.description',
    metrics: [
      { value: 'WIP', label: 'projects.p04.m1', icon: '&#xea3c;' },
      { value: 'SSR', label: 'projects.p04.m2', icon: '&#xe53b;' }
    ],
    meshColors: ['#ff5622', '#ffa47f'],
    stack: ['Nuxt 4', 'TypeScript', 'PostgreSQL']
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
    meshColors: ['#223fff', '#9099ff'],
    stack: ['Nuxt', 'Vue', 'Vuex', 'Bootstrap 5', 'SCSS', 'JWT', 'FullCalendar']
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
    items: 'stack.frontend.items'
  },
  {
    id: 'platform',
    label: 'stack.platform.label',
    icon: '&#xf20e;',
    items: 'stack.platform.items'
  },
  {
    id: 'infrastructure',
    label: 'stack.infrastructure.label',
    icon: '&#xf720;',
    items: 'stack.infrastructure.items'
  }
]

export const experiments: IExperiment[] = [
  {
    id: 'colorffy-ui',
    title: '@colorffy/ui',
    text: 'experiments.colorffyUi.text',
    href: 'https://www.npmjs.com/package/@colorffy/ui',
    linkLabel: 'npm',
    icon: '&#xf720;'
  },
  {
    id: 'colorffy-css',
    title: '@colorffy/css',
    text: 'experiments.colorffyCss.text',
    href: 'https://www.npmjs.com/package/@colorffy/css',
    linkLabel: 'npm',
    icon: '&#xe40a;'
  },
  {
    id: 'colorffy-workspace',
    title: 'Colorffy Workspace',
    text: 'experiments.colorffyWorkspace.text',
    href: 'https://github.com/giancarlosgza/colorffy-workspace',
    linkLabel: 'GitHub',
    icon: '&#xe86f;'
  }
]

export const brandIcons: Record<string, string> = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>'
}
