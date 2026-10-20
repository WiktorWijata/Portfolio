import { FontFamily, FontSize, Text } from '../../components/Text'
import type { FieldProps } from './Field.types'

/**
 * Label wrapper shared by Input and Textarea: a `Text` label linked to the field via `htmlFor`/`id`, above the
 * field itself. Internal to the design system.
 */
export function Field({ label, id, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id}>
          <Text size={FontSize.Medium} font={FontFamily.Sans} className="block leading-[normal] text-content-soft">
            {label}
          </Text>
        </label>
      )}
      {children}
    </div>
  )
}
