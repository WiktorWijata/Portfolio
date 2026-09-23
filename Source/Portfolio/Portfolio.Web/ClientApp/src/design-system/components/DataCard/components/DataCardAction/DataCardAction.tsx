import { FontFamily, FontSize, FontWeight, Text } from '../../../Text'
import type { DataCardActionProps } from './DataCardAction.types'

/** Text button on the right of the header bar ("Otwórz →"). */
export function DataCardAction({ className = '', children, ...rest }: DataCardActionProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex cursor-pointer items-center border-0 bg-transparent p-0 text-content-tertiary transition-colors duration-150 ease-out hover:text-accent-light',
        'focus-ring',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text
        size={FontSize.Micro}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        className="leading-[normal] tracking-[.09em]"
      >
        {children}
      </Text>
    </button>
  )
}
