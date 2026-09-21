import { useId } from 'react'
import { FontFamily, FontSize, Text } from '../Text'
import type { TextareaProps } from './Textarea.types'

export function Textarea({ label, id, className = '', ...rest }: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={textareaId}>
          <Text size={FontSize.Medium} font={FontFamily.Sans} className="block leading-[normal] text-text-field-label">
            {label}
          </Text>
        </label>
      )}
      <textarea
        id={textareaId}
        className={[
          'w-full min-w-0 resize-y rounded-md border border-input-border bg-inset p-3',
          'font-sans text-md leading-[1.5] text-text placeholder:text-text-dim',
          'outline-none focus:border-accent focus:outline-2 focus:outline-offset-1 focus:outline-accent',
          'transition-[border-color] duration-[140ms] ease-out',
          'h-[clamp(130px,26vh,300px)] min-h-[130px]',
          'max-bp600:text-[16px]',
          className,
        ].join(' ')}
        {...rest}
      />
    </div>
  )
}
