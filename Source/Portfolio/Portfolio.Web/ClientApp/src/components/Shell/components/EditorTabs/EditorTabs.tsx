import { Tab, Tabs } from '@/design-system'
import { useEditor } from '@/context'
import { pages } from '@/navigation'
import { TourTarget } from '../../Shell.consts'
import { EDITOR_TABS_KEYS } from './EditorTabs.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Tabs of the open files; drag to reorder, × to close. */
export function EditorTabs() {
  const [text, t] = useTexts(EDITOR_TABS_KEYS)
  const { tabs, activePage, openPage, closeTab, reorderTabs } = useEditor()

  return (
    <Tabs aria-label={text.tabsLabel} data-tour={TourTarget.Tabs} onReorder={reorderTabs}>
      {tabs.map((id) => (
        <Tab
          key={id}
          id={id}
          active={id === activePage}
          onSelect={() => openPage(id)}
          onClose={() => closeTab(id)}
          closeLabel={`${text.closeTab} ${t(pages[id].tab)}`}
        >
          {t(pages[id].tab)}
        </Tab>
      ))}
    </Tabs>
  )
}
