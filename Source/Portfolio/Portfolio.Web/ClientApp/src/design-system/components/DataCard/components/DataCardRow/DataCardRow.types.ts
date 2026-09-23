import type { HTMLAttributes, ReactNode } from 'react'

export interface DataCardRowProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Główny tekst wiersza, np. stanowisko. */
  title: ReactNode
  /** Opcjonalny drugi wiersz pod tytułem, np. nazwa firmy. */
  subtitle?: ReactNode
  /** Opcjonalna plakietka po prawej, np. daty lub nazwa wystawcy certyfikatu. */
  tag?: ReactNode
}
