import { useState } from 'react'
import { useProjects } from '@/api'
import { Gallery } from '@/design-system'
import { COMMON_KEYS } from '@/i18n/common.keys'
import { PageIntro } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { PageLoader } from '../PageLoader'
import { ArchitectureCard, GoalCard } from './components'
import { GALLERY_SLIDES_COUNT, PROJECT_KICKER, PROJECT_TITLE } from './ProjectPortfolio.consts'
import { PROJECT_PORTFOLIO_KEYS } from './ProjectPortfolio.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Portfolio.cs: the project's gallery and goal on the left, its architecture on the right. */
export function ProjectPortfolio() {
  const [text, t] = useTexts(PROJECT_PORTFOLIO_KEYS)
  const [slide, setSlide] = useState(0)
  const { isLoading, error } = useProjects()
  const slides = Array.from({ length: GALLERY_SLIDES_COUNT }, (_, index) => ({
    alt: t(PROJECT_PORTFOLIO_KEYS.gallery.slideAlt, { number: index + 1 }),
  }))

  if (isLoading || error) return <PageLoader label={t(COMMON_KEYS.loading.project)} failed={!!error} />

  return (
    <PageContainer>
      <PageIntro kicker={PROJECT_KICKER} title={PROJECT_TITLE} />
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
              slide: (number) => t(PROJECT_PORTFOLIO_KEYS.gallery.slide, { number }),
              placeholder: (number) => t(PROJECT_PORTFOLIO_KEYS.gallery.placeholder, { number }),
              placeholderNote: text.gallery.placeholderNote,
            }}
            slides={slides}
            activeIndex={slide}
            onActiveIndexChange={setSlide}
            className="min-w-0 shrink-0"
          />
          <GoalCard />
        </div>
        <ArchitectureCard />
      </div>
    </PageContainer>
  )
}
