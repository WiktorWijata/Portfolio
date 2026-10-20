import type { ProjectSummary } from '../../Projects.types'

export interface ProjectCardProps {
  project: ProjectSummary
  onOpen: (project: ProjectSummary) => void
}
