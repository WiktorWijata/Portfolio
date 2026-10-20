import { usePreferences } from '@/context'
import { TourSteps } from './components'

/**
 * Onboarding tour ("Oprowadź mnie"). It starts by itself on the first visit and from the title bar
 * button; the steps are mounted only while it runs, so every start begins at the first step.
 */
export function GuideTour() {
  const { tourActive } = usePreferences()
  return tourActive ? <TourSteps /> : null
}
