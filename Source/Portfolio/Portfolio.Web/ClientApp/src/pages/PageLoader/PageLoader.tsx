import { Loader, LoaderStatus } from '@/design-system'
import { COMMON_KEYS } from '@/i18n/common.keys'
import { useTexts } from '@/i18n/hooks/useTexts'
import { PageContainer } from '../PageContainer'

export interface PageLoaderProps {
  /** What is being loaded, e.g. "Ładowanie doświadczenia…". */
  label: string
  /** The request failed: shows the error message instead of the progress bar. */
  failed?: boolean
}

/** A page that waits for its data: the IDE-style loader centred on the page surface. */
export function PageLoader({ label, failed = false }: PageLoaderProps) {
  const [text] = useTexts(COMMON_KEYS)
  return (
    <PageContainer className="flex items-center">
      <Loader status={failed ? LoaderStatus.Error : LoaderStatus.Loading} label={failed ? text.loadError : label} />
    </PageContainer>
  )
}
