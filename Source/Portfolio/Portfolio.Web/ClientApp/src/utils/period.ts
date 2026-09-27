const PRESENT_LABEL = 'obecnie'

/** "2021-11-01" -> "2021.11" */
function formatYearMonth(isoDate: string): string {
  const [year, month] = isoDate.split('-')
  return `${year}.${month}`
}

/** Formats a start/end date pair as e.g. "2021.11 — obecnie" (no end date means the position is current). */
export function formatPeriod(startDate: string | null | undefined, endDate: string | null | undefined): string {
  const start = startDate ? formatYearMonth(startDate) : ''
  const end = endDate ? formatYearMonth(endDate) : PRESENT_LABEL
  return `${start} — ${end}`
}
