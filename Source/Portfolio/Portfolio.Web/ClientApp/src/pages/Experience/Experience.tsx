import { useMemo, useState } from 'react'
import { useExperiences } from '@/api'
import { SplitPanel, SplitPanelCollapseAt } from '@/design-system'
import { PageIntro, PageIntroVariant } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { PageLoader } from '../PageLoader'
import { COMMON_KEYS } from '@/i18n/common.keys'
import { PositionDetail, PositionList } from './components'
import { toPositions } from './Experience.helpers'
import { EXPERIENCE_KEYS } from './Experience.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Experience.cs: the career as master-detail — the positions on the left, the chosen one's scope on the right. */
export function Experience() {
  const [text, t] = useTexts(EXPERIENCE_KEYS)
  const { data: experiences, isLoading, error } = useExperiences()
  const positions = useMemo(() => toPositions(experiences ?? [], t), [experiences, t])
  const [activeId, setActiveId] = useState<string>()
  const position = positions.find((item) => item.id === activeId) ?? positions[0]
  if (isLoading || error) return <PageLoader label={t(COMMON_KEYS.loading.experience)} failed={!!error} />
  if (!position) return null

  return (
    <PageContainer>
      <PageIntro
        kicker={text.intro.kicker}
        title={text.intro.title}
        accent={text.intro.accent}
        text={text.intro.text}
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
