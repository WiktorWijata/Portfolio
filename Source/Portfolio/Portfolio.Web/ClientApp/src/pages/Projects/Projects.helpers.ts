import type { TFunction } from 'i18next'
import type { Project } from '@/api'
import { PageId } from '@/navigation'
import type { ProjectSummary } from './Projects.types'
import { PROJECTS_KEYS } from './Projects.keys'

/** Frontend-only extras not yet modeled on the backend: which page a project opens, its label and screenshot. */
const PROJECT_EXTRAS: Record<
  string,
  { page: PageId; label: (t: TFunction) => string; image: { src: string; alt: (t: TFunction) => string } }
> = {
  Portfolio: {
    page: PageId.ProjectPortfolio,
    label: (t) => t(PROJECTS_KEYS.portfolio.label),
    image: { src: '/projects/portfolio.png', alt: (t) => t(PROJECTS_KEYS.portfolio.imageAlt) },
  },
}

/** Maps API projects to project cards; a project without known extras is skipped rather than shown broken. */
export function toProjectSummaries(projects: Project[], t: TFunction): ProjectSummary[] {
  return projects.flatMap((project) => {
    const name = project.name ?? ''
    const extras = PROJECT_EXTRAS[name]
    if (!extras) return []

    return [
      {
        id: name,
        page: extras.page,
        label: extras.label(t),
        title: `${name} ↗`,
        text: project.description ?? '',
        image: { src: extras.image.src, alt: extras.image.alt(t) },
      },
    ]
  })
}
