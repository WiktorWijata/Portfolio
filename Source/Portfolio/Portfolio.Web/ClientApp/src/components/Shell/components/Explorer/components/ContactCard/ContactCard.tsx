import { FontFamily, FontSize, FontWeight, Link, Text, TextColor } from '@/design-system'
import { useEditor } from '@/context'
import { PageId } from '@/navigation'
import { CONTACT_CARD_KEYS } from './ContactCard.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** "Otwarty na współpracę" card pinned to the bottom of the explorer. Hidden on phones. */
export function ContactCard() {
  const [text] = useTexts(CONTACT_CARD_KEYS)
  const { openPage } = useEditor()

  return (
    <section aria-label={text.label} className="mx-3 mb-5 border-t border-line-strong px-1 pt-[18px] max-bp570:hidden">
      <Text
        as="div"
        size={FontSize.Nano}
        font={FontFamily.Mono}
        weight={FontWeight.Medium}
        className="flex items-center gap-[7px] tracking-[.08em] text-content-secondary uppercase"
      >
        <span aria-hidden className="size-1.5 rounded-full bg-success-indicator shadow-glow-success" />
        {text.status}
      </Text>
      <Text
        as="h3"
        size={FontSize.XLarge}
        weight={FontWeight.Medium}
        className="mt-[11px] mb-[7px] leading-[1.45] text-content-primary"
      >
        {text.title}
      </Text>
      <Text as="p" size={FontSize.Small} color={TextColor.Dim} className="mb-3.5 leading-[1.65] text-content-muted">
        {text.text}
      </Text>
      <Link
        size={FontSize.XSmall}
        weight={FontWeight.Medium}
        className="py-[7px] [&>span]:leading-[1.5]"
        onClick={() => openPage(PageId.Contact)}
      >
        {text.action}
        <span aria-hidden className="ml-[9px]">
          ↗
        </span>
      </Link>
    </section>
  )
}
