import { useState } from 'react'
import type { TechIconProps } from './TechIcon.types'

/** Decorative technology icon; it disappears when the image cannot be loaded, so no broken frame is left in the chip. */
export function TechIcon({ src, monochrome = false }: TechIconProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={['size-[15px] shrink-0', monochrome ? 'opacity-[.88] invert' : ''].join(' ')}
    />
  )
}
