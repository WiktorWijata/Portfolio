import { ApiStatus, useApiStatus } from '@/api'
import { FontFamily, FontSize, FontWeight, Text, TextColor } from '@/design-system'
import { EmptyEditorOffline, ProfileLinks, QuickAccess } from './components'
import { EMPTY_EDITOR_LOGO, EMPTY_EDITOR_TITLE } from './EmptyEditor.consts'
import { EMPTY_EDITOR_KEYS } from './EmptyEditor.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/**
 * Shown when every editor tab has been closed: title, CV / contact links and "Szybki dostęp" — or, while the
 * API is unreachable, only the offline notice.
 */
export function EmptyEditor() {
  const [text] = useTexts(EMPTY_EDITOR_KEYS)
  const apiStatus = useApiStatus()
  // Anything but a confirmed connection counts as offline (also while still connecting); mock data has no API (null).
  const offline = apiStatus !== null && apiStatus !== ApiStatus.Online

  // The empty editor and the offline notice never show together: offline, the notice replaces the content.
  if (offline) return <EmptyEditorOffline />

  return (
    <div className="flex flex-1 items-center justify-center bg-dotted-glow px-8 py-14 [@media(max-height:650px)]:py-6">
      <div className="w-full max-w-[484px] rounded-3xl border border-line-emphasis bg-surface-card p-6 shadow-card-raised max-[480px]:p-3.5">
        <div className="mb-3 flex items-center gap-3">
          <Text
            as="h2"
            font={FontFamily.Mono}
            weight={FontWeight.SemiBold}
            className="min-w-0 flex-1 text-2xl tracking-[-.015em] [overflow-wrap:anywhere] text-content-primary"
          >
            {EMPTY_EDITOR_TITLE}
          </Text>
          <Text
            aria-hidden
            size={FontSize.XXLarge}
            font={FontFamily.Mono}
            weight={FontWeight.Medium}
            className="grid size-[46px] shrink-0 place-items-center rounded-xl-plus border border-line-default bg-linear-to-b from-surface-hover to-surface-panel tracking-[-.05em] text-accent shadow-logo"
          >
            {EMPTY_EDITOR_LOGO}
          </Text>
        </div>
        <Text
          as="p"
          size={FontSize.Medium}
          font={FontFamily.Sans}
          color={TextColor.Dim}
          className="mb-[26px] leading-[1.6] text-pretty"
        >
          {text.text}
        </Text>
        <ProfileLinks />
        <QuickAccess />
      </div>
    </div>
  )
}
