import { FontFamily, FontSize, FontWeight, Text, TextColor } from '@/design-system'
import { ProfileLinks, QuickAccess } from './components'
import { EMPTY_EDITOR_LOGO, EMPTY_EDITOR_TEXT, EMPTY_EDITOR_TITLE } from './EmptyEditor.consts'

/** Shown when every editor tab has been closed: title, CV / contact links and "Szybki dostęp". */
export function EmptyEditor() {
  return (
    <div className="flex flex-1 items-center justify-center bg-dotted-glow px-8 py-14 [@media(max-height:650px)]:py-6">
      <div className="w-full max-w-[484px] rounded-3xl border border-border-5 bg-card p-6 shadow-[0_16px_48px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.035)] max-[480px]:p-3.5">
        <div className="mb-3 flex items-center gap-3">
          <Text
            as="h2"
            font={FontFamily.Mono}
            weight={FontWeight.SemiBold}
            className="min-w-0 flex-1 text-2xl tracking-[-.015em] [overflow-wrap:anywhere] text-text-heading"
          >
            {EMPTY_EDITOR_TITLE}
          </Text>
          <Text
            aria-hidden
            size={FontSize.XXLarge}
            font={FontFamily.Mono}
            weight={FontWeight.Medium}
            className="grid size-[46px] shrink-0 place-items-center rounded-[9px] border border-chip-line bg-linear-to-b from-hover to-list tracking-[-.05em] text-accent shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_6px_18px_rgba(0,0,0,.22)]"
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
          {EMPTY_EDITOR_TEXT}
        </Text>
        <ProfileLinks />
        <QuickAccess />
      </div>
    </div>
  )
}
