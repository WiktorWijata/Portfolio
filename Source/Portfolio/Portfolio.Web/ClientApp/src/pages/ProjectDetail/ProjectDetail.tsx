import { useState } from 'react'
import { useProjects } from '@/api'
import { Gallery } from '@/design-system'
import { pages } from '@/navigation'
import { COMMON_KEYS } from '@/i18n/common.keys'
import { PageIntro } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { PageLoader } from '../PageLoader'
import { ArchitectureCard, GoalCard } from './components'
import { GALLERY_SLIDES_COUNT } from './ProjectDetail.consts'
import { toGallerySlides } from './ProjectDetail.helpers'
import { PROJECT_DETAIL_KEYS } from './ProjectDetail.keys'
import type { ProjectDetailProps } from './ProjectDetail.types'
import { useTexts } from '@/i18n/hooks/useTexts'

/** The page of one project (a file under Projects): its gallery and goal on the left, its architecture on the right. */
export function ProjectDetail({ pageId, projectName }: ProjectDetailProps) {
  const [text, t] = useTexts(PROJECT_DETAIL_KEYS)
  const [slide, setSlide] = useState(0)
  const { data: projects, isLoading, error } = useProjects()
  const project = projects?.find((item) => item.name === projectName)

  if (isLoading || error) return <PageLoader label={t(COMMON_KEYS.loading.project)} failed={!!error} />
  if (!project) return null

  const slides = toGallerySlides(project.images ?? [], GALLERY_SLIDES_COUNT, (number) =>
    t(PROJECT_DETAIL_KEYS.gallery.slideAlt, { number }),
  )

  return (
    <PageContainer>
      <PageIntro kicker={`Projects / ${pages[pageId].file}`} title={projectName} />
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(300px,1fr)] items-stretch gap-[22px] max-[1100px]:grid-cols-1">
        <div className="flex min-w-0 flex-col gap-[22px]">
          <Gallery
            aria-label={text.gallery.label}
            heading={text.gallery.heading}
            labels={{
              carousel: text.gallery.carousel,
              previous: text.gallery.previous,
              next: text.gallery.next,
              slides: text.gallery.slides,
              slide: (number) => t(PROJECT_DETAIL_KEYS.gallery.slide, { number }),
              placeholder: (number) => t(PROJECT_DETAIL_KEYS.gallery.placeholder, { number }),
              placeholderNote: text.gallery.placeholderNote,
            }}
            slides={slides}
            activeIndex={slide}
            onActiveIndexChange={setSlide}
            className="min-w-0 shrink-0"
          />
          <GoalCard project={project} />
        </div>
        <ArchitectureCard project={project} />
      </div>
    </PageContainer>
  )
}
