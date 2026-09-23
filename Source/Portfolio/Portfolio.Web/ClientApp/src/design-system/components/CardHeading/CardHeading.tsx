import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import type { CardHeadingProps } from './CardHeading.types'

/**
 * Mała etykieta na górze obramowanej karty (np. Gallery albo karta architektury projektu). Inna niż `PanelBar`:
 * bez tła, lżejszy tracking, bez licznika ani akcji — tylko sam nagłówek.
 */
export function CardHeading({ children }: CardHeadingProps) {
  return (
    <Text
      as="div"
      size={FontSize.XSmall}
      font={FontFamily.Mono}
      weight={FontWeight.Medium}
      className="border-b border-b-line-default px-4 py-3 leading-[normal] tracking-[.07em] text-content-secondary"
    >
      {children}
    </Text>
  )
}
