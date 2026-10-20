import { useQueryClient } from '@tanstack/react-query'
import { WifiOff } from 'lucide-react'
import { FontFamily, FontSize, Text, TextColor } from '@/design-system'
import { useTexts } from '@/i18n/hooks/useTexts'
import { EMPTY_EDITOR_KEYS } from '../../EmptyEditor.keys'

/** The empty editor while the API is unreachable: what happened and a retry, in place of the quick access. */
export function EmptyEditorOffline() {
  const [text] = useTexts(EMPTY_EDITOR_KEYS)
  const queryClient = useQueryClient()

  return (
    <div className="flex flex-1 items-center justify-center bg-dotted-glow px-8 py-14 [@media(max-height:650px)]:py-6">
      <div
        role="alert"
        className="flex w-full max-w-[484px] items-start gap-3.5 rounded-3xl border border-warning-content/30 bg-warning-surface p-6 max-[480px]:p-3.5"
      >
        <WifiOff aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-warning-content" />
        <div className="min-w-0 flex-1">
          <Text as="h2" size={FontSize.XLarge} font={FontFamily.Sans} className="leading-[1.3] text-warning-content">
            {text.offlineTitle}
          </Text>
          <Text
            as="p"
            size={FontSize.Medium}
            font={FontFamily.Sans}
            color={TextColor.Dim}
            className="mt-1.5 leading-[1.6] text-pretty"
          >
            {text.offlineText}
          </Text>
          <button
            type="button"
            onClick={() => void queryClient.invalidateQueries()}
            className="mt-3 cursor-pointer rounded-xs font-mono text-xs text-warning-content underline underline-offset-2 focus-ring"
          >
            {text.offlineRetry}
          </button>
        </div>
      </div>
    </div>
  )
}
