import type { Position } from '../../Experience.types'

export interface PositionDetailProps {
  position: Position
  /** Without its own heading (period, role, company): the accordion row above already shows it. */
  bare?: boolean
}
