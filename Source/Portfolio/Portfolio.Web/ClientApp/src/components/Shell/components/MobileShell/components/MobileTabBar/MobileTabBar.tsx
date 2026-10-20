import { FontFamily, Text } from '@/design-system'
import { useEditor } from '@/context'
import { pages } from '@/navigation'
import { useTexts } from '@/i18n/hooks/useTexts'
import { RAIL_KEYS } from '../../../Rail/Rail.keys'
import { MOBILE_TABS } from '../../MobileShell.consts'
import type { MobileTabBarProps } from './MobileTabBar.types'

/** Bottom navigation of the phone layout: one button per main page, the current one marked on its top edge. */
export function MobileTabBar({ activeTab }: MobileTabBarProps) {
  const [text, t] = useTexts(RAIL_KEYS)
  const { openPage } = useEditor()

  return (
    <nav
      aria-label={text.label}
      className="grid flex-none grid-cols-5 border-t border-line-default bg-surface-panel px-1.5 pt-1.5 pb-[max(env(safe-area-inset-bottom),6px)]"
    >
      {MOBILE_TABS.map((tab) => {
        const active = tab.page === activeTab
        return (
          <button
            key={tab.page}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => openPage(tab.page)}
            className={[
              'flex h-14 cursor-pointer flex-col items-center justify-center gap-[5px] border-0 bg-transparent focus-ring',
              'shadow-[inset_0_2px_0_0_var(--tab-bar)] transition-colors duration-140 [&_svg]:size-[22px] [&_svg]:stroke-[1.6]',
              active ? 'text-accent-soft [--tab-bar:var(--color-accent)]' : 'text-content-dim [--tab-bar:transparent]',
            ].join(' ')}
          >
            <tab.icon aria-hidden />
            <Text font={FontFamily.Mono} className="text-3xs-plus leading-[normal] font-medium">
              {t(pages[tab.page].tab)}
            </Text>
          </button>
        )
      })}
    </nav>
  )
}
