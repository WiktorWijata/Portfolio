import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import type { StatusBarAccent } from '../../StatusBar.types'

interface StatusBarButtonSharedProps {
  /** Ikona przed podpisem (renderowana w 13 px). */
  icon?: ReactNode
  /**
   * Kolor przycisku, gdy `expanded` jest `true`.
   * @default StatusBarAccent.Success
   */
  accent?: StatusBarAccent
  /** Podpis przycisku. */
  children: ReactNode
}

/**
 * Bez `href`: zwykły `<button>`, z natywnymi atrybutami przycisku. `expanded`, gdy podany, ustawia
 * `aria-expanded` i koloruje przycisk kolorem `accent` — stan przełączanego panelu (np. terminala).
 */
export interface StatusBarButtonAsButtonProps
  extends StatusBarButtonSharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'> {
  href?: undefined
  expanded?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * Z `href`: odnośnik `<a>` wyglądający jak przycisk paska (np. link do dokumentacji), z natywnymi
 * atrybutami odnośnika (`target`, `rel`…). Bez `expanded` — to stan przełączanego panelu, nie odnośnika.
 */
export interface StatusBarButtonAsLinkProps
  extends StatusBarButtonSharedProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'children'> {
  /** Adres. */
  href: string
  expanded?: undefined
  ref?: Ref<HTMLAnchorElement>
}

export type StatusBarButtonProps = StatusBarButtonAsButtonProps | StatusBarButtonAsLinkProps
