import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../../../Text'
import type { InfoRowProps } from './InfoRow.types'

export function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="border-t border-line-faint px-3.5 py-[11px] first:border-t-0">
      <Text
        as="dt"
        size={FontSize.Micro}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        color={TextColor.Faint}
        className="mb-[3px] leading-[13px] tracking-[.1em] uppercase"
      >
        {label}
      </Text>
      <Text
        as="dd"
        size={FontSize.SmallPlus}
        font={FontFamily.Sans}
        color={TextColor.Body}
        className="m-0 leading-[1.55]"
      >
        {children}
      </Text>
    </div>
  )
}
