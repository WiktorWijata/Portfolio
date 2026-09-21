import type { AnchorHTMLAttributes } from 'react'
import { FontFamily, FontSize, Text } from '../Text'
import {
  StatusBarAccent,
  StatusBarTone,
  type StatusBarButtonProps,
  type StatusBarItemProps,
  type StatusBarProps,
  type StatusBarSwitchProps,
} from './StatusBar.types'

const toneClasses: Record<StatusBarTone, string> = {
  [StatusBarTone.Default]: 'text-status-path',
  [StatusBarTone.Success]: 'text-status-branch',
  [StatusBarTone.Faint]: 'text-text-dim-2',
}

const accentClasses: Record<StatusBarAccent, string> = {
  [StatusBarAccent.Success]: 'text-status-success',
  [StatusBarAccent.Assistant]: 'text-assistant',
}

const focusRing = 'outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-1'
const buttonBase = `cursor-pointer font-mono text-2xs rounded-xs px-[5px] py-[3px] ${focusRing} transition-colors duration-[140ms] ease-out`

/** Dolny pasek okna IDE: gałąź, ścieżka pliku, przełączniki paneli, język, wersja. */
export function StatusBar({ className = '', children, ...rest }: StatusBarProps) {
  return (
    <footer
      className={[
        'box-border flex min-h-7 flex-nowrap items-center gap-3.5 border-t border-border bg-hover px-3 py-0.5',
        'font-mono text-xs text-text-dim-2',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </footer>
  )
}

export function StatusBarItem({
  tone = StatusBarTone.Default,
  truncate = false,
  className = '',
  children,
  ...rest
}: StatusBarItemProps) {
  return (
    <Text
      {...rest}
      size={tone === StatusBarTone.Faint ? FontSize.XXSmall : FontSize.XSmall}
      font={FontFamily.Mono}
      className={[toneClasses[tone], truncate ? 'min-w-0 truncate' : 'shrink-0 whitespace-nowrap', className].join(' ')}
    >
      {children}
    </Text>
  )
}

export function StatusBarButton({
  icon,
  expanded,
  accent = StatusBarAccent.Success,
  href,
  className = '',
  children,
  ...rest
}: StatusBarButtonProps) {
  const classes = [
    'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap no-underline hover:bg-white/[.035]',
    buttonBase,
    expanded ? accentClasses[accent] : 'text-status-action',
    '[&_svg]:size-[13px]',
    className,
  ].join(' ')
  const content = (
    <>
      {icon}
      <Text size={FontSize.XXSmall} font={FontFamily.Mono}>
        {children}
      </Text>
    </>
  )

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" aria-expanded={expanded} className={classes} {...rest}>
      {content}
    </button>
  )
}

/** Pionowy separator między grupami elementów paska. */
export function StatusBarDivider() {
  return <span aria-hidden className="h-3.5 w-px shrink-0 bg-border-6" />
}

/** Rozpycha pasek — wszystko po nim jest dosunięte do prawej krawędzi. */
export function StatusBarSpacer() {
  return <span aria-hidden className="flex-1" />
}

/** Przełącznik jednokrotnego wyboru (np. język PL / EN) w formie małych przycisków. */
export function StatusBarSwitch<T extends string>({
  options,
  value,
  onChange,
  className = '',
  ...rest
}: StatusBarSwitchProps<T>) {
  return (
    <div role="group" className={['flex shrink-0 gap-0.5 font-mono text-2xs', className].join(' ')} {...rest}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            aria-label={option['aria-label']}
            onClick={() => onChange(option.value)}
            className={[
              buttonBase,
              selected ? 'bg-lang-active text-lang-active-text' : 'text-text-dim-2 hover:bg-white/[.035]',
            ].join(' ')}
          >
            <Text size={FontSize.XXSmall} font={FontFamily.Mono}>
              {option.label}
            </Text>
          </button>
        )
      })}
    </div>
  )
}
