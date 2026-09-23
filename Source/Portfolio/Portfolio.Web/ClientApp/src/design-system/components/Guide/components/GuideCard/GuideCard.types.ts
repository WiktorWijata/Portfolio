import type { CSSProperties, ReactNode } from 'react'
import type { GuideHighlightRect } from '../../Guide.types'

export interface GuideCardProps {
  /** Numer bieżącego kroku (od 1), pokazywany w etykiecie „PRZEWODNIK / N Z M". */
  step: number
  /** Liczba wszystkich kroków. */
  totalSteps: number
  /** Tytuł kroku. */
  title: ReactNode
  /** Główna treść kroku (po polsku). */
  children: ReactNode
  /** Opcjonalne tłumaczenie na angielski, w kursywie pod treścią. */
  translation?: ReactNode
  /** Opcjonalna, dodatkowa akcja w formie linku, np. „Przełącz język / Switch language →". */
  actionLabel?: ReactNode
  /** Wywoływane po kliknięciu akcji z `actionLabel`. */
  onAction?: () => void
  /** Wywoływane przez „Pomiń". */
  onSkip: () => void
  /** Wywoływane przez „Wstecz". Pominięte wyłącza przycisk (pierwszy krok). */
  onBack?: () => void
  /** Wywoływane przez „Dalej" lub „Gotowe". */
  onNext: () => void
  /**
   * Zamienia etykietę przycisku „Dalej →" na „Gotowe".
   * @default false
   */
  isLastStep?: boolean
  /**
   * Zachowanie okna modalnego (ustawia `aria-modal`): fokus trafia na „Dalej" po każdym kroku,
   * Esc działa jak „Pomiń", Tab krąży wyłącznie po przyciskach karty, a po zamknięciu fokus wraca
   * do elementu, który miał go wcześniej. Włączaj dla pełnej nakładki, nie dla statycznego podglądu.
   * @default false
   */
  modal?: boolean
  /**
   * Element, przy którym karta ma się ustawić (prostokąt w pikselach okna, zwykle z
   * `getBoundingClientRect()`): po jego prawej stronie, a gdy brakuje miejsca — pod nim lub nad nim.
   * Pozycja jest przeliczana przy zmianie kroku i rozmiaru okna. Wymaga `position: fixed` (domyślne).
   */
  anchor?: GuideHighlightRect
  /** Style inline — pozycja karty (`top`, `left`), gdy nie używasz `anchor`; karta jest `position: fixed`. */
  style?: CSSProperties
  /** Dodatkowe klasy głównego elementu. */
  className?: string
}
