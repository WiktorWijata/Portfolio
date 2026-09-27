import type { Project } from '@/api'
import { PageId } from '@/navigation'
import type { ProjectSummary } from './Projects.types'

/** Frontend-only extras not yet modeled on the backend: which page a project opens, its label and screenshot. */
const PROJECT_EXTRAS: Record<string, { page: PageId; label: string; image: { src: string; alt: string } }> = {
  Portfolio: {
    page: PageId.ProjectPortfolio,
    label: '01 / APLIKACJA WEBOWA',
    image: { src: '/projects/portfolio.png', alt: 'Zrzut ekranu portfolio Wiktora Wijaty' },
  },
}

/** Maps API projects to project cards; a project without known extras is skipped rather than shown broken. */
export function toProjectSummaries(projects: Project[]): ProjectSummary[] {
  return projects.flatMap((project) => {
    const name = project.name ?? ''
    const extras = PROJECT_EXTRAS[name]
    if (!extras) return []

    return [
      {
        id: name,
        page: extras.page,
        label: extras.label,
        title: `${name} ↗`,
        text: project.description ?? '',
        image: extras.image,
      },
    ]
  })
}
