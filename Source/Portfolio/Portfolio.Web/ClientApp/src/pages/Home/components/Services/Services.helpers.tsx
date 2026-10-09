import { CodeXml, Network, RefreshCw, Workflow, type LucideIcon } from 'lucide-react'

/** Maps a Service's `iconSlug` (kebab-case, e.g. "code-xml") to its lucide-react icon. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  'code-xml': CodeXml,
  workflow: Workflow,
  'refresh-cw': RefreshCw,
  network: Network,
}

/** The icon for a service, or null when the slug isn't recognized (still renders the text). */
export function getServiceIcon(iconSlug: string | null | undefined): LucideIcon | null {
  return (iconSlug && SERVICE_ICONS[iconSlug]) || null
}
