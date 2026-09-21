import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../Text'
import { TitleBarButtonTone, type TitleBarButtonProps, type TitleBarProps } from './TitleBar.types'

const toneClasses: Record<TitleBarButtonTone, string> = {
  [TitleBarButtonTone.Run]:
    'gap-[7px] rounded-md border border-run-border bg-run-bg px-[11px] py-1.5 text-run-text ' +
    'hover:border-run-hover-border hover:bg-run-hover-bg hover:text-run-hover-text ' +
    'focus-visible:outline-2 focus-visible:outline-run-focus focus-visible:outline-offset-2',
  [TitleBarButtonTone.Link]:
    'gap-[5px] rounded-sm px-[7px] py-1 text-accent hover:text-accent-light ' +
    'focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-1',
}

/** Górny pasek okna IDE: logo, tytuł i akcje. */
export function TitleBar({ logo, title, className = '', children, ...rest }: TitleBarProps) {
  return (
    <header
      className={[
        'flex shrink-0 items-center gap-3.5 border-b border-border bg-hover px-3 py-1.5 max-bp570:gap-[9px]',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text
        size={FontSize.XSmall}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        className="shrink-0 rounded-[2px] bg-accent px-[5px] py-[3px] text-on-accent"
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

export function TitleBarButton({
  tone = TitleBarButtonTone.Run,
  icon,
  className = '',
  children,
  ...rest
}: TitleBarButtonProps) {
  const isRun = tone === TitleBarButtonTone.Run
  return (
    <button
      type="button"
      className={[
        'inline-flex shrink-0 cursor-pointer items-center text-xs leading-[1.3] whitespace-nowrap outline-none',
        'transition-[background-color,border-color,color] duration-150 ease-out',
        toneClasses[tone],
        className,
      ].join(' ')}
      {...rest}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <Text
        size={FontSize.XSmall}
        font={isRun ? FontFamily.Sans : FontFamily.Mono}
        weight={isRun ? FontWeight.Medium : undefined}
      >
        {children}
      </Text>
    </button>
  )
}
