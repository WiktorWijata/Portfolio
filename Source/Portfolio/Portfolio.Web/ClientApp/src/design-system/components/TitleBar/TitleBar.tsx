import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../Text'
import { type TitleBarProps } from './TitleBar.types'

/** Górny pasek okna IDE: logo, tytuł i akcje. */
export function TitleBar({ logo, title, className = '', children, ...rest }: TitleBarProps) {
  return (
    <header
      className={[
        'flex shrink-0 items-center gap-3.5 border-b border-line-default bg-surface-hover px-3 py-1.5 max-bp570:gap-[9px]',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text
        size={FontSize.XSmall}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        className="shrink-0 rounded-[2px] bg-accent px-[5px] py-[3px] text-accent-content"
      >
        {logo}
      </Text>
      <Text font={FontFamily.Mono} color={TextColor.Primary} className="min-w-0 truncate text-[11.5px]">
        {title}
      </Text>
      {children}
    </header>
  )
}
