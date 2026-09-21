import { useId } from 'react'
import { FontFamily, FontSize, Text } from '../Text'
import type { InputProps } from './Input.types'

export function Input({ label, id, className = '', ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId}>
          <Text size={FontSize.Medium} font={FontFamily.Sans} className="block leading-[normal] text-text-field-label">
            {label}
          </Text>
        </label>
      )}
      <input
        id={inputId}
        className={[
          'w-full min-w-0 rounded-md border border-input-border bg-inset p-3',
          'font-sans text-md leading-[1.5] text-text placeholder:text-text-dim',
          'outline-none focus:border-accent focus:outline-2 focus:outline-offset-1 focus:outline-accent',
          'transition-[border-color] duration-[140ms] ease-out',
          'max-bp600:text-[16px]', // prevents iOS auto-zoom on focus
          className,
        ].join(' ')}
        {...rest}
      />
    </div>
  )
}
