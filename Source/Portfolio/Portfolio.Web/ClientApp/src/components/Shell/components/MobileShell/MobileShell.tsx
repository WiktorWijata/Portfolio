import { useEffect, useRef } from 'react'
import { ChevronLeft } from 'lucide-react'
import { FontFamily, Text } from '@/design-system'
import { useEditor } from '@/context'
import { PageView } from '@/pages'
import { pages } from '@/navigation'
import { useTexts } from '@/i18n/hooks/useTexts'
import { Assistant } from '../Assistant'
import { RAIL_KEYS } from '../Rail/Rail.keys'
import { MobileHeader, MobileTabBar } from './components'
import { resolveMobilePage } from './MobileShell.helpers'

/**
 * The phone layout of the window: a header with the current file, the page, a tab bar at the bottom and the
 * assistant as a bottom sheet. There is no explorer, rail, terminal or status bar; the pages are the same.
 */
export function MobileShell() {
  const [, t] = useTexts(RAIL_KEYS)
  const { activePage, openPage } = useEditor()
  const { page, tab, parent } = resolveMobilePage(activePage)

  // A new page starts at its top, not wherever the previous one was scrolled to.
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [page])

  return (
    <div className="flex h-full flex-col overflow-hidden bg-surface-editor">
      <MobileHeader file={pages[page].file} />
      <main ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex min-h-full flex-col">
          {parent && (
            <button
              type="button"
              onClick={() => openPage(parent)}
              className="flex h-11 flex-none cursor-pointer items-center gap-1 border-0 bg-transparent pr-4 pl-3 text-content-secondary focus-ring"
            >
              <ChevronLeft size={16} strokeWidth={1.5} aria-hidden />
              <Text font={FontFamily.Mono} className="text-sm leading-[normal]">
                {t(RAIL_KEYS.pages.projects)}
              </Text>
            </button>
          )}
          <PageView id={page} />
        </div>
      </main>
      <MobileTabBar activeTab={tab} />
      <Assistant />
    </div>
  )
}
