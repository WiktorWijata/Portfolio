const DOTS = [0, 1, 2]
const DOT_DELAY_MS = 200

interface TypingIndicatorProps {
  /** What a screen reader says while the answer is being written. */
  label: string
}

/** Three pulsing dots in the bubble of an answer that has not started yet. Still when the user prefers less motion. */
export function TypingIndicator({ label }: TypingIndicatorProps) {
  return (
    <span role="status" aria-label={label} className="inline-flex items-center gap-1.5 py-1.5">
      {DOTS.map((dot) => (
        <span
          key={dot}
          aria-hidden="true"
          className="size-1.5 animate-pulse rounded-full bg-content-tertiary [animation-duration:1s] motion-reduce:animate-none"
          style={{ animationDelay: `${dot * DOT_DELAY_MS}ms` }}
        />
      ))}
    </span>
  )
}
