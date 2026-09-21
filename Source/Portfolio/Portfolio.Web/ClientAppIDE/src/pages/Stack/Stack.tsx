import { SplitPanel, SplitPanelCollapseAt } from '@/design-system'
import { PageIntro, PageIntroVariant } from '../PageIntro'
import { PageContainer } from '../PageContainer'
import { StackFilters, StackResults } from './components'
import { useStackFilter } from './hooks/useStackFilter'
import { STACK_GROUPS, STACK_KICKER, STACK_TEXT, STACK_TITLE, STACK_TITLE_ACCENT } from './Stack.consts'

/** Stack.cs: technologies grouped by category, with a category list and a name search. */
export function Stack() {
  const { category, setCategory, query, setQuery, visibleGroups, total } = useStackFilter(STACK_GROUPS)

  return (
    <PageContainer>
      <PageIntro
        kicker={STACK_KICKER}
        title={STACK_TITLE}
        accent={STACK_TITLE_ACCENT}
        text={STACK_TEXT}
        variant={PageIntroVariant.Section}
      />
      <div className="@container pt-0.5">
        <SplitPanel
          collapseAt={SplitPanelCollapseAt.Container700}
          className="bg-editor"
          aside={
            <StackFilters
              groups={STACK_GROUPS}
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
