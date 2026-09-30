import { useMemo } from 'react'
import { useProjects } from '@/api'
import { ArchitectureDiagram, Card, CardVariant, FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { toDiagramBlocks } from '../../ProjectPortfolio.helpers'
import { GithubIcon } from '../GithubIcon'
import { PROJECT_PORTFOLIO_KEYS } from '../../ProjectPortfolio.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Architecture of the project: the layer diagram, a caption and short notes on the patterns used. */
export function ArchitectureCard() {
  const [text] = useTexts(PROJECT_PORTFOLIO_KEYS)
  const { data: projects } = useProjects()
  const project = projects?.[0]
  const notes = project?.architectureNotes ?? []
  const blocks = useMemo(() => toDiagramBlocks(project?.architectureBlocks ?? []), [project])

  return (
    <Card
      variant={CardVariant.Standard}
      title={text.architecture.heading}
      aria-label={text.architecture.label}
      className="flex min-w-0 flex-col"
    >
      <div className="flex flex-1 flex-col p-[18px]">
        <ArchitectureDiagram
          aria-label={project?.architectureDiagramLabel ?? undefined}
          blocks={blocks}
          linkIcon={<GithubIcon />}
        />
        <Text as="p" size={FontSize.XSmall} font={FontFamily.Sans} className="mt-3 leading-[1.6] text-content-muted">
          {project?.architectureCaption}
        </Text>
        <dl className="mt-[18px] grid gap-4">
          {notes.map((note) => (
            <div key={note.title}>
              <Text
                as="dt"
                size={FontSize.Medium}
                font={FontFamily.Sans}
                weight={FontWeight.Medium}
                className="mb-[5px] leading-[normal] text-content-tinted-strong"
              >
                {note.title}
              </Text>
              <Text
                as="dd"
                size={FontSize.Small}
                font={FontFamily.Sans}
                className="m-0 leading-[1.7] text-content-secondary"
              >
                {note.text}
              </Text>
            </div>
          ))}
        </dl>
        {project?.codeUrl && (
          <Text
            as="p"
            size={FontSize.XSmall}
            font={FontFamily.Sans}
            className="mt-auto pt-5 leading-[1.6] text-content-muted"
          >
            {text.architecture.sourceLabel}{' '}
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decor-lilac focus-ring hover:underline"
            >
              <Text>{project.name} ↗</Text>
            </a>
          </Text>
        )}
      </div>
    </Card>
  )
}
