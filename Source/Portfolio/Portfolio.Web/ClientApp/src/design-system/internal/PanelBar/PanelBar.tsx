import { FontFamily, FontSize, FontWeight, Text } from '../../components/Text'
import type { PanelBarProps } from './PanelBar.types'

/**
 * The bar on top of the cards and lists: a small capitalised title, an optional counter and an optional
 * action. Internal to the design system.
 */
export function PanelBar({ title, count, action }: PanelBarProps) {
  return (
    <div className="flex items-center gap-3 border-b border-b-line-faint bg-surface-bar px-3.5 py-2">
      <Text
        size={FontSize.Micro}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        className="flex-1 leading-[normal] tracking-[.11em] text-content-subtle uppercase"
      >
        {title}
      </Text>
      {count !== undefined && (
        <Text
          size={FontSize.Micro}
          font={FontFamily.Mono}
          weight={FontWeight.SemiBold}
          className="rounded-xs bg-line-faint px-1.5 py-px leading-[normal] tracking-[.04em] text-content-tertiary"
        >
          {count}
        </Text>
      )}
      {action}
    </div>
  )
}
