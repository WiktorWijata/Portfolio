import { useMemo } from 'react'
import { useSkillCategories } from '@/api'
import { SplitPanel, SplitPanelCollapseAt } from '@/design-system'
import { PageIntro, PageIntroVariant } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { PageLoader } from '../PageLoader'
import { COMMON_KEYS } from '@/i18n/common.keys'
import { StackFilters, StackResults } from './components'
import { useStackFilter } from './hooks/useStackFilter'
import { toTechnologyGroups } from './utils'
import { STACK_KEYS } from './Stack.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Stack.cs: technologies grouped by category, with a category list and a name search. */
export function Stack() {
  const [text, t] = useTexts(STACK_KEYS)
  const { data: skillCategories, isLoading, error } = useSkillCategories()
  const groups = useMemo(() => toTechnologyGroups(skillCategories ?? []), [skillCategories])
  const { category, setCategory, query, setQuery, visibleGroups, total } = useStackFilter(groups)

  if (isLoading || error) return <PageLoader label={t(COMMON_KEYS.loading.stack)} failed={!!error} />
  if (!skillCategories) return null

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
          aside={
            <StackFilters
              groups={groups}
              category={category}
              onCategoryChange={setCategory}
              query={query}
              onQueryChange={setQuery}
            />
          }
        >
          <StackResults groups={visibleGroups} total={total} />
        </SplitPanel>
      </div>
    </PageContainer>
  )
}
