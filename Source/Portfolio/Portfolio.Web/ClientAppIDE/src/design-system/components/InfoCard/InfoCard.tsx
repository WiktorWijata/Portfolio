import { PanelBar } from '../../internal/PanelBar'
import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../Text'
import type { InfoCardProps, InfoRowProps } from './InfoCard.types'

/**
 * Read-only label/value card. Same surface as `List` but non-interactive.
 */
export function InfoCard({ header, className = '', children, ...rest }: InfoCardProps) {
  return (
    <aside
      className={[
        'overflow-hidden rounded-xl border border-border-2 bg-list',
        'shadow-[0_8px_26px_rgba(0,0,0,.19),inset_0_0_0_1px_rgba(255,255,255,.024)]',
        className,
      ].join(' ')}
      {...rest}
    >
      <PanelBar title={header} />
      <dl className="m-0">{children}</dl>
    </aside>
  )
}

export function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="border-t border-border-3 px-3.5 py-[11px] first:border-t-0">
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
