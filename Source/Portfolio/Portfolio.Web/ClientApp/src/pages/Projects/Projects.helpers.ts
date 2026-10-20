import type { TFunction } from 'i18next'
import type { Project } from '@/api'
import { PageId } from '@/navigation'
import type { ProjectSummary } from './Projects.types'
import { PROJECTS_KEYS } from './Projects.keys'

interface ProjectExtras {
  page: PageId
  label: (t: TFunction) => string
  /** A picture of its own; without one the card shows the project's first image from the API. */
  image?: { src: string; alt: (t: TFunction) => string }
}

/** Frontend-only extras not yet modeled on the backend: which page a project opens, its label and, optionally, its picture. */
const PROJECT_EXTRAS: Record<string, ProjectExtras> = {
  Portfolio: {
    page: PageId.ProjectPortfolio,
    label: (t) => t(PROJECTS_KEYS.portfolio.label),
    image: { src: '/projects/portfolio.png', alt: (t) => t(PROJECTS_KEYS.portfolio.imageAlt) },
  },
  IntegratorAI: {
    page: PageId.ProjectIntegratorAi,
    label: (t) => t(PROJECTS_KEYS.integratorAi.label),
  },
  Infrastructure: {
    page: PageId.ProjectInfrastructure,
    label: (t) => t(PROJECTS_KEYS.infrastructure.label),
  },
}

/**
 * Maps API projects to project cards. A project without known extras, or without any picture, is skipped rather
 * than shown broken.
 */
export function toProjectSummaries(projects: Project[], t: TFunction): ProjectSummary[] {
  return projects.flatMap((project) => {
    const name = project.name ?? ''
    const extras = PROJECT_EXTRAS[name]
    if (!extras) return []

    const first = project.images?.find((image) => image.url)
    const image = extras.image
      ? { src: extras.image.src, alt: extras.image.alt(t) }
      : first?.url
        ? { src: first.url, alt: first.alt ?? '' }
        : undefined
    if (!image) return []

    return [
      {
        id: name,
        page: extras.page,
        label: extras.label(t),
        title: `${name} ↗`,
        text: project.description ?? '',
        image,
      },
    ]
  })
}
