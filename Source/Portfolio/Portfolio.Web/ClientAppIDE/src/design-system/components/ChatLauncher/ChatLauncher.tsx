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
        'fixed right-6 bottom-12 z-40 flex cursor-pointer items-center gap-[9px] rounded-[9px] border border-launcher-border',
        'bg-launcher-bg px-4 py-[11px] text-launcher-text shadow-[0_6px_24px_rgba(0,0,0,.267)]',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        'transition-[bottom] duration-[180ms] [&_svg]:size-[18px]',
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
