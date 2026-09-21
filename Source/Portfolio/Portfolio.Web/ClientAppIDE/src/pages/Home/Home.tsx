import { PageContainer } from '../PageContainer'
import { ArchitectureCard, IntroCopy, Metrics, SummaryCards } from './components'

/** AboutMe.cs: the introduction, what I build, key figures, career path, certificates and technologies. */
export function Home() {
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
