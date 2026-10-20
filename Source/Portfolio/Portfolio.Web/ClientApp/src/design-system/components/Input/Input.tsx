import { useId } from 'react'
import { Field, FIELD_BASE_CLASSES } from '../../internal/Field'
import type { InputProps } from './Input.types'

export function Input({ label, id, className = '', ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <Field label={label} id={inputId}>
      <input id={inputId} className={[FIELD_BASE_CLASSES, className].join(' ')} {...rest} />
    </Field>
  )
}
