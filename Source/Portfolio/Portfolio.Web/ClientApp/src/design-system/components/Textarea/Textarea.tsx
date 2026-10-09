import { useId } from 'react'
import { Field, FIELD_BASE_CLASSES } from '../../internal/Field'
import type { TextareaProps } from './Textarea.types'

export function Textarea({ label, id, className = '', ...rest }: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  return (
    <Field label={label} id={textareaId}>
      <textarea
        id={textareaId}
        className={[FIELD_BASE_CLASSES, 'h-[clamp(130px,26vh,300px)] min-h-[130px] resize-y', className].join(' ')}
        {...rest}
      />
    </Field>
  )
}
