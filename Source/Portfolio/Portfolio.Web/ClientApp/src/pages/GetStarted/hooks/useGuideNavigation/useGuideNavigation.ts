import { useCallback, useState } from 'react'
import { useEditor, usePanels } from '@/context'
import { GUIDE_INTRO } from '../../GetStarted.consts'
import { GuideActionKind, type GuideAction } from '../../GetStarted.types'

/** Selection in the guide index (with scrolling to the section) and the article links. */
export function useGuideNavigation() {
  const { openPage } = useEditor()
  const { setTerminalOpen } = usePanels()
  const [selectedId, setSelectedId] = useState<string>(GUIDE_INTRO.id)

  const select = useCallback((id: string) => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    setSelectedId(id)
  }, [])

  const runAction = useCallback(
    (action: GuideAction) => {
      if (action.kind === GuideActionKind.OpenPage) openPage(action.page)
      else setTerminalOpen(true)
    },
    [openPage, setTerminalOpen],
  )

  return { selectedId, select, runAction }
}
