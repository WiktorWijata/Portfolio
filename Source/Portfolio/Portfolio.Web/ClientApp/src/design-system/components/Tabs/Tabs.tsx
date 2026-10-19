import { useRef } from 'react'
import { useTabsReorder } from './hooks/useTabsReorder'
import type { TabsProps } from './Tabs.types'

/**
 * Strip of the open files' tabs. Tabs can be reordered by dragging and with Alt+Shift+←/→ (see `useTabsReorder`);
 * `onReorder` receives the new order of the tab ids.
 */
export function Tabs({ onReorder, className = '', children, ...rest }: TabsProps) {
  const navRef = useRef<HTMLElement>(null)
  useTabsReorder(navRef, onReorder)

  return (
    <nav ref={navRef} className={['flex h-[33px] items-stretch bg-surface-bar', className].join(' ')} {...rest}>
      {children}
    </nav>
  )
}
