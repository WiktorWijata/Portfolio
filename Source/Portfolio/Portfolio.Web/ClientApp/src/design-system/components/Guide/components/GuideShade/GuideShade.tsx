import type { GuideShadeProps } from './GuideShade.types'

export function GuideShade({ className = '', ...rest }: GuideShadeProps) {
  return <div className={['fixed inset-0 z-[9990] bg-scrim/[.467]', className].join(' ')} {...rest} />
}
