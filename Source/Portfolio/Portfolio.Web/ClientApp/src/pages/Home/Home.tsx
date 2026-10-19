import { useIsMobile } from '@/context'
import { useExperiences, useIntroduction, useServices, useSpecializations } from '@/api'
import { COMMON_KEYS } from '@/i18n/common.keys'
import { useTexts } from '@/i18n/hooks/useTexts'
import { PageContainer } from '../PageContainer'
import { PageLoader } from '../PageLoader'
import { ArchitectureCard, IntroCopy, Metrics, SummaryCards } from './components'

/** AboutMe.cs: the introduction, what I build, key figures, career path, certificates and technologies. */
export function Home() {
  const [, t] = useTexts(COMMON_KEYS)
  // The sections below read these same queries (cached), so the page appears whole instead of filling in piece by piece.
  const isMobile = useIsMobile()
  const queries = [useIntroduction(), useServices(), useSpecializations(), useExperiences()]
  if (queries.some((query) => query.isLoading || query.error)) {
    return <PageLoader label={t(COMMON_KEYS.loading.home)} failed={queries.some((query) => !!query.error)} />
  }

  // On a phone the page is shorter: the intro, the figures, the layers I build and the certificates. The services,
  // the career path and the technologies are covered by the layers and by the Experience and Stack pages.
  if (isMobile) {
    return (
      <PageContainer>
        <IntroCopy withServices={false} />
        <Metrics />
        <div className="mt-4">
          <ArchitectureCard />
        </div>
        <SummaryCards certificatesOnly />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="mb-7 grid grid-cols-[minmax(0,1.25fr)_minmax(300px,1fr)] items-start gap-8 max-[1000px]:grid-cols-1 max-[1000px]:gap-6">
        <IntroCopy />
        <ArchitectureCard />
      </div>
      <Metrics />
      <SummaryCards />
    </PageContainer>
  )
}
