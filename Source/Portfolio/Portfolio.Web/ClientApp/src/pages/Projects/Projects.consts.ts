import { PageId } from '@/navigation'
import type { ProjectSummary } from './Projects.types'

export const PROJECTS_KICKER = 'Portfolio / Wybrane realizacje'
export const PROJECTS_TITLE = 'Pomysły zamienione'
export const PROJECTS_TITLE_ACCENT = 'w oprogramowanie.'
export const PROJECTS_TEXT = 'Autorska aplikacja portfolio z zapleczem do zarządzania treścią.'
export const PROJECTS_NOTE = 'Portfolio: rzeczywisty zrzut ekranu.'

export const PROJECTS: ProjectSummary[] = [
  {
    id: 'portfolio',
    page: PageId.ProjectPortfolio,
    label: '01 / APLIKACJA WEBOWA',
    title: 'Portfolio ↗',
    text: 'Treści pod kontrolą. Własny backend i interfejs zarządzania.',
    image: { src: '/projects/portfolio.png', alt: 'Zrzut ekranu portfolio Wiktora Wijaty' },
  },
]
