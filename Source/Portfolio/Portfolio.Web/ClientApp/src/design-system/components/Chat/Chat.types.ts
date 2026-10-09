import type { HTMLAttributes, ReactNode } from 'react'

export const ChatMessageRole = {
  /** Odpowiedź asystenta — bąbelek po lewej. */
  Assistant: 'assistant',
  /** Wiadomość użytkownika — bąbelek po prawej, w tonacji akcentu. */
  User: 'user',
} as const
export type ChatMessageRole = (typeof ChatMessageRole)[keyof typeof ChatMessageRole]

export interface ChatMessage {
  /** Unikalny identyfikator wiadomości (klucz listy). */
  id: string | number
  /** Autor wiadomości — decyduje o stronie i kolorze bąbelka. */
  role: ChatMessageRole
  /** Treść bąbelka. Białe znaki i nowe linie są zachowane. */
  content: ReactNode
  /** Akcja w formie linku pod odpowiedzią asystenta, np. „Zobacz w portfolio →". */
  action?: { label: string; onAction: () => void }
}

/** Teksty interfejsu czatu (nazwy dostępne) — do podmiany np. przy zmianie języka. */
export interface ChatLabels {
  /** Dostępna nazwa przycisku zamykania. */
  closeButton: string
  /** Dostępna nazwa pola wiadomości. */
  messageInput: string
  /** Dostępna nazwa przycisku wysyłania. */
  sendButton: string
}

export interface ChatProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Dostępna nazwa okna dialogowego (czytana przez czytniki ekranu). */
  'aria-label': string
  /** Tytuł w nagłówku okna, np. „Asystent portfolio". */
  title: string
  /** Podpis pod tytułem. */
  subtitle?: string
  /**
   * Tekst w kwadracie awatara.
   * @default 'AI'
   */
  avatar?: string
  /** Lista wiadomości wyświetlana w logu — stan trzyma aplikacja. */
  messages: ChatMessage[]
  /** Szybkie pytania (chipy) pod logiem; kliknięcie wysyła je jako wiadomość. */
  topics?: string[]
  /** Placeholder pola wiadomości. */
  placeholder?: string
  /** Krótka uwaga pod polem wiadomości, np. że odpowiedzi są demonstracyjne. */
  note?: string
  /**
   * Teksty interfejsu; pominięte pola mają polskie wartości domyślne („Zamknij czat",
   * „Wiadomość do asystenta", „Wyślij wiadomość").
   */
  labels?: Partial<ChatLabels>
  /** Wywoływane z przyciętym, niepustym tekstem — aplikacja dopisuje wiadomość użytkownika i odpowiedź. */
  onSend: (text: string) => void
  /** Wywoływane przez krzyżyk i klawisz Esc. */
  onClose: () => void
  /**
   * Maksymalna długość wiadomości.
   * @default 1000
   */
  maxLength?: number
  /**
   * Czy okno jest widoczne. `false` ukrywa je (`hidden`), ale zachowuje wpisany tekst; po ponownym
   * otwarciu wiadomości przewijają się na dół, a fokus trafia na pole wiadomości.
   * Przy pierwszym renderowaniu fokus nie jest przejmowany.
   * @default true
   */
  open?: boolean
}
