import { INTERACTIVE_BASE_CLASSES } from '../../internal/interactiveBase'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import type { ChatLauncherProps } from './ChatLauncher.types'

/**
 * Floating button that opens the `Chat` window. Positioned `fixed` bottom-right; the `bottom` offset
 * animates, so the app can lift it above a docked terminal with `style={{ bottom }}`.
 */
export function ChatLauncher({ icon, className = '', children, ...rest }: ChatLauncherProps) {
  return (
    <button
      type="button"
      className={[
        'fixed right-6 bottom-12 z-40 flex items-center gap-[9px] rounded-xl-plus border border-accent-line',
        'bg-accent-surface px-4 py-[11px] text-content-strong shadow-launcher',
        'focus-ring',
        'transition-[bottom] duration-[180ms] [&_svg]:size-[18px]',
        INTERACTIVE_BASE_CLASSES,
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
      <Text size={FontSize.Small} font={FontFamily.Sans} weight={FontWeight.Medium}>
        {children}
      </Text>
    </button>
  )
}
