import { FontFamily, FontSize, Text } from '../../../Text'
import { buttonBase } from '../../StatusBar.consts'
import type { StatusBarSwitchProps } from './StatusBarSwitch.types'

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
            aria-label={option['aria-label'] ?? (option.icon ? option.label : undefined)}
            onClick={() => onChange(option.value)}
            className={[
              buttonBase,
              selected ? 'bg-accent-surface text-accent-soft' : 'text-content-dim hover:bg-tint/[.035]',
            ].join(' ')}
          >
            {option.icon ? (
              <span aria-hidden className="flex items-center [&_svg]:size-3">
                {option.icon}
              </span>
            ) : (
              <Text size={FontSize.XXSmall} font={FontFamily.Mono}>
                {option.label}
              </Text>
            )}
          </button>
        )
      })}
    </div>
  )
}
