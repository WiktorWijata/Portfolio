import { FontFamily, FontSize, Text } from '../../../Text'
import type { MenuItemProps } from './MenuItem.types'

export function MenuItem({ active = false, nested = false, className = '', children, ...rest }: MenuItemProps) {
  return (
    <button
      type="button"
      className={[
        'block w-full border-l-[3px] py-[9px] pr-3 text-left',
        'transition-[background-color,color,border-color] duration-150 ease-out',
        nested ? 'pl-[29px]' : 'mt-[7px] mb-[3px] pl-3',
        active
          ? 'border-l-accent bg-accent-surface text-content-strong'
          : [
              'border-l-transparent hover:bg-surface-hover-strong hover:text-content-primary',
              nested ? 'text-content-secondary' : 'text-content-secondary',
            ].join(' '),
        className,
      ].join(' ')}
      {...rest}
    >
      <Text size={FontSize.Small} font={FontFamily.Sans} className="block">
        {children}
      </Text>
    </button>
  )
}
