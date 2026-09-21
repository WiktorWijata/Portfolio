import { useState } from 'react'
import { SplitPanel, SplitPanelCollapseAt } from '@/design-system'
import { PageIntro, PageIntroVariant } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { PositionDetail, PositionList } from './components'
import {
  EXPERIENCE_KICKER,
  EXPERIENCE_TEXT,
  EXPERIENCE_TITLE,
  EXPERIENCE_TITLE_ACCENT,
  POSITIONS,
} from './Experience.consts'

/** Experience.cs: the career as master-detail — the positions on the left, the chosen one's scope on the right. */
export function Experience() {
  const [activeId, setActiveId] = useState(POSITIONS[0]?.id)
  const position = POSITIONS.find((item) => item.id === activeId) ?? POSITIONS[0]
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
          className="bg-editor"
          aside={<PositionList positions={POSITIONS} activeId={position.id} onSelect={setActiveId} />}
        >
          <div className="@container min-w-0 px-[26px] pt-6 pb-[26px] max-[700px]:p-5">
            <PositionDetail position={position} />
          </div>
        </SplitPanel>
      </div>
    </PageContainer>
  )
}
