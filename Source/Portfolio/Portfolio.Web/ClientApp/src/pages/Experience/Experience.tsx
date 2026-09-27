import { useMemo, useState } from 'react'
import { useExperiences } from '@/api'
import { SplitPanel, SplitPanelCollapseAt } from '@/design-system'
import { PageIntro, PageIntroVariant } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { PositionDetail, PositionList } from './components'
import { EXPERIENCE_KICKER, EXPERIENCE_TEXT, EXPERIENCE_TITLE, EXPERIENCE_TITLE_ACCENT } from './Experience.consts'
import { toPositions } from './Experience.helpers'

/** Experience.cs: the career as master-detail — the positions on the left, the chosen one's scope on the right. */
export function Experience() {
  const { data: experiences } = useExperiences()
  const positions = useMemo(() => toPositions(experiences ?? []), [experiences])
  const [activeId, setActiveId] = useState<string>()
  const position = positions.find((item) => item.id === activeId) ?? positions[0]
  if (!position) return null

  return (
    <PageContainer>
      <PageIntro
        kicker={EXPERIENCE_KICKER}
        title={EXPERIENCE_TITLE}
        accent={EXPERIENCE_TITLE_ACCENT}
        text={EXPERIENCE_TEXT}
        variant={PageIntroVariant.Section}
      />
      <div className="@container pt-0.5">
        <SplitPanel
          collapseAt={SplitPanelCollapseAt.Container700}
          className="bg-surface-editor"
          aside={<PositionList positions={positions} activeId={position.id} onSelect={setActiveId} />}
        >
          <div className="@container min-w-0 px-[26px] pt-6 pb-[26px] max-[700px]:p-5">
            <PositionDetail position={position} />
          </div>
        </SplitPanel>
      </div>
    </PageContainer>
  )
}
