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
  const queries = [useIntroduction(), useServices(), useSpecializations(), useExperiences()]
  if (queries.some((query) => query.isLoading || query.error)) {
    return <PageLoader label={t(COMMON_KEYS.loading.home)} failed={queries.some((query) => !!query.error)} />
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
