import { Tab, Tabs } from '@/design-system'
import { useEditor } from '@/context'
import { pages } from '@/navigation'
import { TourTarget } from '../../Shell.consts'
import { CLOSE_TAB_LABEL, EDITOR_TABS_LABEL } from './EditorTabs.consts'

/** Tabs of the open files; drag to reorder, × to close. */
export function EditorTabs() {
  const { tabs, activePage, openPage, closeTab, reorderTabs } = useEditor()

  return (
    <Tabs aria-label={EDITOR_TABS_LABEL} data-tour={TourTarget.Tabs} onReorder={reorderTabs}>
      {tabs.map((id) => (
        <Tab
          key={id}
          id={id}
          active={id === activePage}
          onSelect={() => openPage(id)}
          onClose={() => closeTab(id)}
          closeLabel={`${CLOSE_TAB_LABEL} ${pages[id].tab}`}
        >
          {pages[id].tab}
        </Tab>
      ))}
    </Tabs>
  )
}
