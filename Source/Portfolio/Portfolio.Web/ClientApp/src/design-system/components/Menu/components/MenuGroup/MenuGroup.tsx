import { FontFamily, FontSize, FontWeight, Text } from '../../../Text'
import type { MenuGroupProps } from './MenuGroup.types'

export function MenuGroup({ label, defaultOpen = true, className = '', children, ...rest }: MenuGroupProps) {
  return (
    <details
      open={defaultOpen}
      className={['mt-[5px] border-t border-line-default pt-[3px]', className].join(' ')}
      {...rest}
    >
      <Text
        as="summary"
        size={FontSize.Small}
        font={FontFamily.Sans}
        weight={FontWeight.Medium}
        className="cursor-pointer px-3.5 py-2.5 text-content-tinted-strong"
      >
        {label}
      </Text>
      {children}
    </details>
  )
}
