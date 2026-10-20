/** Splits a motto into the lead (white) and accent (colored) part — the accent is the last sentence. */
export function splitMotto(motto: string): { lead: string; accent: string } {
  const sentences = motto
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)

  if (sentences.length < 2) {
    return { lead: motto, accent: '' }
  }

  const accent = sentences.pop()!
  return { lead: sentences.join(' '), accent }
}
