import { FontFamily, Text } from '../../../Text'
import type {} from '../../Tabs.types'
import type { TabProps } from './Tab.types'

export function Tab({ id, active = false, children, onSelect, onClose, closeLabel }: TabProps) {
  return (
    <div
      data-tab-id={id}
      className={[
        'group relative flex h-full items-stretch',
        'transition-colors duration-150 ease-out',
        active
          ? 'border-t-2 border-t-accent bg-surface-editor'
          : 'border-t-2 border-t-transparent bg-transparent hover:bg-surface-hover-strong',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={[
          'py-[7px] pl-[11px] focus-ring',
          onClose ? 'pr-8' : 'pr-[11px]',
          active ? 'text-content-strong' : 'text-content-tertiary',
        ].join(' ')}
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
            'hover:bg-surface-pressed hover:text-content-strong focus-visible:opacity-100',
            'focus-ring',
            active ? 'text-content-secondary opacity-100' : 'text-content-muted opacity-0 group-hover:opacity-100',
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
