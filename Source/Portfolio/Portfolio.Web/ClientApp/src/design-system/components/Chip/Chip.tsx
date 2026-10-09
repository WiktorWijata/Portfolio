import { Text } from '../Text'
import { variantClasses } from './Chip.consts'
import { ChipVariant, type ChipProps } from './Chip.types'

/** Static tag, e.g. a technology or a position; `variant` picks the size and the look. */
export function Chip({ variant = ChipVariant.Default, icon, className = '', children, ...rest }: ChipProps) {
  return (
    <Text {...rest} className={['inline-flex items-center border', variantClasses[variant], className].join(' ')}>
      {variant === ChipVariant.Default && icon && (
        <span className="inline-flex shrink-0 [&_img]:size-[15px] [&_svg]:size-[15px]">{icon}</span>
      )}
      {children}
    </Text>
  )
}
