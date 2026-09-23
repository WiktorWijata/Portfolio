import { useState } from 'react'
import { Gallery } from '@/design-system'
import { PageIntro } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { ArchitectureCard, GoalCard } from './components'
import { GALLERY_LABEL, GALLERY_SLIDES, PROJECT_KICKER, PROJECT_TITLE } from './ProjectPortfolio.consts'

/** Portfolio.cs: the project's gallery and goal on the left, its architecture on the right. */
export function ProjectPortfolio() {
  const [slide, setSlide] = useState(0)

  return (
    <PageContainer>
      <PageIntro kicker={PROJECT_KICKER} title={PROJECT_TITLE} />
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(300px,1fr)] items-stretch gap-[22px] max-[1100px]:grid-cols-1">
        <div className="flex min-w-0 flex-col gap-[22px]">
          <Gallery
            aria-label={GALLERY_LABEL}
            slides={GALLERY_SLIDES}
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
