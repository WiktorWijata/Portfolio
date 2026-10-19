import { type StatusBarProps } from './StatusBar.types'

/** Dolny pasek okna IDE: gałąź, ścieżka pliku, przełączniki paneli, język, wersja. */
export function StatusBar({ className = '', children, ...rest }: StatusBarProps) {
  return (
    <footer
      className={[
        'box-border flex min-h-7 flex-nowrap items-center gap-3.5 border-t border-line-default bg-surface-hover px-3 py-0.5',
        'font-mono text-xs text-content-dim',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </footer>
  )
}
