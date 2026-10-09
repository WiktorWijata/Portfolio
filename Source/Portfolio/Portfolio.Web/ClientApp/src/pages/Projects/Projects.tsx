import { useMemo } from 'react'
import { useProjects } from '@/api'
import { FontFamily, Text } from '@/design-system'
import { useEditor } from '@/context'
import { PageIntro } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { PageLoader } from '../PageLoader'
import { COMMON_KEYS } from '@/i18n/common.keys'
import { ProjectCard } from './components'
import { toProjectSummaries } from './Projects.helpers'
import { PROJECTS_KEYS } from './Projects.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Overview.cs: the list of projects; a card opens the project's own page in a new tab. */
export function Projects() {
  const [text, t] = useTexts(PROJECTS_KEYS)
  const { openPage } = useEditor()
  const { data: projects, isLoading, error } = useProjects()
  const summaries = useMemo(() => toProjectSummaries(projects ?? [], t), [projects, t])

  if (isLoading || error) return <PageLoader label={t(COMMON_KEYS.loading.projects)} failed={!!error} />
  if (!projects) return null

  return (
    <PageContainer>
      <PageIntro
        kicker={text.intro.kicker}
        title={text.intro.title}
        accent={text.intro.accent}
        text={text.intro.text}
      />
      <div className="grid grid-cols-2 items-stretch gap-[22px] max-[700px]:grid-cols-1">
        {summaries.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={(item) => openPage(item.page)} />
        ))}
      </div>
      <Text as="div" font={FontFamily.Mono} className="mt-4 text-[10px] leading-[normal] text-content-muted">
        {text.note}
      </Text>
    </PageContainer>
  )
}
