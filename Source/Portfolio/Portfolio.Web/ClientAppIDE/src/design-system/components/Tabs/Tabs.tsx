import { useRef } from 'react'
import { FontFamily, Text } from '../Text'
import { useTabsReorder } from './hooks/useTabsReorder'
import type { TabProps, TabsProps } from './Tabs.types'

/**
 * Strip of the open files' tabs. Tabs can be reordered by dragging and with Alt+Shift+←/→ (see `useTabsReorder`);
 * `onReorder` receives the new order of the tab ids.
 */
export function Tabs({ onReorder, className = '', children, ...rest }: TabsProps) {
  const navRef = useRef<HTMLElement>(null)
  useTabsReorder(navRef, onReorder)

  return (
    <nav ref={navRef} className={['flex h-[33px] items-stretch bg-bar', className].join(' ')} {...rest}>
      {children}
    </nav>
  )
}

export function Tab({ id, active = false, children, onSelect, onClose, closeLabel }: TabProps) {
  return (
    <div
      data-tab-id={id}
      className={[
        'group relative flex h-full items-stretch',
        'transition-colors duration-150 ease-out',
        active
          ? 'border-t-2 border-t-accent bg-editor'
          : 'border-t-2 border-t-transparent bg-transparent hover:bg-hover-2',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={['py-[7px] pl-[11px]', onClose ? 'pr-8' : 'pr-[11px]', active ? 'text-text' : 'text-[#929aa4]'].join(
          ' ',
        )}
      >
        <Text font={FontFamily.Mono} className="block text-[11.5px] whitespace-nowrap">
          {children}
        </Text>
      </button>
      {onClose && (
        <button
          type="button"
          data-close-tab
          onClick={onClose}
          aria-label={closeLabel}
          className={[
            'absolute top-1/2 right-[5px] size-5 -translate-y-1/2 rounded-sm',
            'flex items-center justify-center transition-[background-color,color,opacity] duration-150 ease-out',
            'hover:bg-close-button-hover-bg hover:text-text',
            active ? 'text-text-muted opacity-100' : 'text-text-dim opacity-0 group-hover:opacity-100',
          ].join(' ')}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <path d="M1 1l8 8M9 1l-8 8" />
          </svg>
        </button>
      )}
    </div>
  )
}
