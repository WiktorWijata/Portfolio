import { FontFamily, Text } from '@/design-system'
import { useEditor } from '@/context'
import { PageIntro } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { ProjectCard } from './components'
import {
  PROJECTS,
  PROJECTS_KICKER,
  PROJECTS_NOTE,
  PROJECTS_TEXT,
  PROJECTS_TITLE,
  PROJECTS_TITLE_ACCENT,
} from './Projects.consts'

/** Overview.cs: the list of projects; a card opens the project's own page in a new tab. */
export function Projects() {
  const { openPage } = useEditor()

  return (
    <PageContainer>
      <PageIntro kicker={PROJECTS_KICKER} title={PROJECTS_TITLE} accent={PROJECTS_TITLE_ACCENT} text={PROJECTS_TEXT} />
      <div className="grid grid-cols-2 items-stretch gap-[22px] max-[700px]:grid-cols-1">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={(item) => openPage(item.page)} />
        ))}
      </div>
      <Text as="div" font={FontFamily.Mono} className="mt-4 text-[10px] leading-[normal] text-content-muted">
        {PROJECTS_NOTE}
      </Text>
    </PageContainer>
  )
}
