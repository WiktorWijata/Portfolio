import { PageId } from '@/navigation'
import { ProjectDetail } from './ProjectDetail'
import { InfrastructureDiagram } from './components/InfrastructureDiagram'

/** One page per project, all drawn by `ProjectDetail`. The names are the projects' names in the API. */
export function ProjectPortfolio() {
  return <ProjectDetail pageId={PageId.ProjectPortfolio} projectName="Portfolio" />
}

export function ProjectIntegratorAi() {
  return <ProjectDetail pageId={PageId.ProjectIntegratorAi} projectName="IntegratorAI" />
}

export function ProjectInfrastructure() {
  return (
    <ProjectDetail
      pageId={PageId.ProjectInfrastructure}
      projectName="Infrastructure"
      hero={<InfrastructureDiagram />}
    />
  )
}
