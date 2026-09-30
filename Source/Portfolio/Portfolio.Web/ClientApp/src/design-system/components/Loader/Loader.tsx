import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { LoaderStatus, type LoaderProps } from './Loader.types'

/**
 * Loading state in the IDE idiom: a thin indeterminate progress bar (like the one under the VS Code title
 * bar) above a monospace status line with a blinking block cursor. Announces itself to screen readers
 * (`role="status"`).
 */
export function Loader({ label, status = LoaderStatus.Loading, className = '', ...rest }: LoaderProps) {
  const isError = status === LoaderStatus.Error
  return (
    <div
      {...rest}
      role={isError ? 'alert' : 'status'}
      aria-busy={!isError}
      className={['mx-auto flex w-full max-w-[420px] flex-col gap-3', className].join(' ')}
    >
      <div className="relative h-0.5 overflow-hidden rounded-full bg-line-default" aria-hidden>
        {!isError && <div className="absolute inset-y-0 left-0 w-2/7 animate-loader-sweep rounded-full bg-accent" />}
      </div>
      <Text
        size={FontSize.Small}
        font={FontFamily.Mono}
        color={isError ? undefined : TextColor.Muted}
        className={['flex items-center gap-2', isError ? 'text-danger-content' : ''].join(' ')}
      >
        <span aria-hidden className="text-accent-light">
          {isError ? '✕' : '›'}
        </span>
        {label}
        {!isError && <span aria-hidden className="inline-block h-3.5 w-1.5 animate-loader-blink bg-accent-light" />}
      </Text>
    </div>
  )
}
