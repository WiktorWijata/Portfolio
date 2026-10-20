import type { CardFieldsProps } from './CardFields.types'

/** Read-only label/value list inside a `Card` (a `<dl>`): label above value, one `CardField` per pair. */
export function CardFields({ className = '', children, ...rest }: CardFieldsProps) {
  return (
    <dl className={['m-0', className].join(' ')} {...rest}>
      {children}
    </dl>
  )
}
