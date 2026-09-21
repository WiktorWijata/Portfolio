import { FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { PageContainer, PageContainerPadding } from '../PageContainer'
import { GuideActionLink, GuideArticle, GuideIndex } from './components'
import { GUIDE_INTRO, GUIDE_SECTIONS } from './GetStarted.consts'
import { useGuideNavigation } from './hooks/useGuideNavigation'

/** GetStarted.md: the guide to the portfolio — an index on the left, an introduction and features on the right. */
export function GetStarted() {
  const { selectedId, select, runAction } = useGuideNavigation()

  return (
    <PageContainer padding={PageContainerPadding.Article}>
      <div className="grid grid-cols-[200px_minmax(0,1fr)] items-start gap-[26px] max-[800px]:grid-cols-1">
        <GuideIndex selectedId={selectedId} onSelect={select} />
        <div className="min-w-0">
          <header id={GUIDE_INTRO.id} className="mb-7 scroll-mt-4 border-b border-border-4 pb-6">
            <Text
              as="h1"
              font={FontFamily.Sans}
              weight={FontWeight.Medium}
              className="mb-4 text-[clamp(25px,2.4vw,34px)] leading-[1.2] tracking-[-.5px] text-[#f0eff3]"
            >
              {GUIDE_INTRO.title}
            </Text>
            <Text
              as="p"
              size={FontSize.Large}
              font={FontFamily.Sans}
              className="max-w-[950px] leading-[1.7] text-text-field-label"
            >
              {GUIDE_INTRO.text}
            </Text>
            <GuideActionLink action={GUIDE_INTRO.action} onRun={runAction} className="mt-[9px] py-2" />
          </header>
          {GUIDE_SECTIONS.map((section) => (
            <section key={section.id} className="mb-9">
              <Text
                as="h2"
                font={FontFamily.Sans}
                weight={FontWeight.Medium}
                className="mb-[21px] text-[23px] leading-tight tracking-[-.3px] text-[#efedf3]"
              >
                {section.title}
              </Text>
              <div className="grid grid-cols-2 gap-x-[25px] gap-y-7 max-[1300px]:grid-cols-1">
                {section.articles.map((article) => (
                  <GuideArticle key={article.id} article={article} onAction={runAction} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
