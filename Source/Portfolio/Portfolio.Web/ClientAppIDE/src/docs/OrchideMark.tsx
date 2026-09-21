import type { SVGProps } from 'react'
import { MARK_COLUMN, MARK_ELLIPSES, MARK_LIP, ellipseTransform } from './brand'

/** OrchIDE UI logo mark (an orchid); petals take their color from `currentColor`. */
export function OrchideMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <g fill="currentColor">
        {MARK_ELLIPSES.map((e) => (
          <ellipse
            key={`${e.cx}-${e.cy}`}
            cx={e.cx}
            cy={e.cy}
            rx={e.rx}
            ry={e.ry}
            opacity={e.opacity}
            transform={ellipseTransform(e)}
          />
        ))}
        <path d={MARK_LIP} />
      </g>
      <circle cx={MARK_COLUMN.cx} cy={MARK_COLUMN.cy} r={MARK_COLUMN.r} fill="#1e1f22" opacity=".85" />
    </svg>
  )
}
