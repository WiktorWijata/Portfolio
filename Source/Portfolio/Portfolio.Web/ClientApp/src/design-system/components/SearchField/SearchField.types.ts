import type { InputHTMLAttributes } from 'react'

/** Wszystkie atrybuty `<input>` poza `type` (zawsze `search`), m.in. `value`, `onChange`, `placeholder`, `aria-label`. */
export type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
