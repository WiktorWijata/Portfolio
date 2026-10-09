import type { ReactNode } from 'react'

export interface StatusBarSwitchOption<T extends string = string> {
  /** Wartość zwracana w `onChange`, np. `'pl'`. */
  value: T
  /** Widoczny podpis, np. „PL". Gdy podano `icon`, podpis nie jest widoczny i służy jako nazwa dostępna. */
  label: string
  /** Ikona pokazywana zamiast podpisu (np. słońce i księżyc w przełączniku motywu). */
  icon?: ReactNode
  /** Dostępna nazwa opcji, np. „Polski". Pominięta — używany jest `label`. */
  'aria-label'?: string
}

export interface StatusBarSwitchProps<T extends string = string> {
  /** Dostępna nazwa grupy, np. „Język". */
  'aria-label': string
  /** Dostępne opcje. */
  options: StatusBarSwitchOption<T>[]
  /** Aktualnie wybrana wartość. */
  value: T
  /** Wywoływane po kliknięciu opcji. */
  onChange: (value: T) => void
  /** Dodatkowe klasy CSS kontenera przełącznika. */
  className?: string
}
