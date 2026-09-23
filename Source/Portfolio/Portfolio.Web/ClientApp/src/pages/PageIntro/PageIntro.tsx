import { FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { PageIntroVariant, type PageIntroProps } from './PageIntro.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const variantClasses: Record<
  PageIntroVariant,
  { root: string; kicker: string; title: string; accent: string; lead: string }
> = {
  [PageIntroVariant.Overview]: {
    root: '',
    kicker: 'mb-3',
    title: 'leading-[1.15] text-content-primary',
    accent: 'text-accent',
    lead: '',
  },
  [PageIntroVariant.Section]: {
    root: '',
    kicker: 'mb-3',
    title: 'leading-[1.04] text-content-strong',
    accent: '',
    lead: '',
  },
  [PageIntroVariant.Contact]: {
    root: 'mb-6 max-bp600:mb-[18px]',
    kicker: 'mb-5',
    title: 'leading-[1.04] text-content-strong',
    accent: '',
    lead: 'whitespace-nowrap max-bp600:whitespace-normal',
  },
}

/** Heading block shared by the content pages: a small kicker, a large title and a one-line lead. */
export function PageIntro({ kicker, title, accent, text, variant = PageIntroVariant.Overview }: PageIntroProps) {
  const classes = variantClasses[variant]
  const isContact = variant === PageIntroVariant.Contact
  // Below the title Contact has 12px, the other pages 17px; without a lead the block's own margin takes over.
  const titleGap = isContact ? 'mb-3' : text ? 'mb-[17px]' : ''
  const rootGap = isContact ? '' : text ? 'mb-7' : 'mb-[26px]'

  return (
    <div className={[classes.root, rootGap].join(' ')}>
      <Text
        as="div"
        size={FontSize.XSmall}
        font={FontFamily.Mono}
        className={['tracking-[1.2px] text-content-subtle uppercase', classes.kicker].join(' ')}
      >
        {kicker}
      </Text>
      <Text
        as="h1"
        font={FontFamily.Sans}
        weight={FontWeight.Medium}
        // 43px (not the text-h1 44px token) and the 39px bump at the narrowest breakpoint are this heading's
        // own sizes, measured in the prototype; only the 36px step happens to match text-h1-sm, so it uses it.
        className={[
          'text-[43px] tracking-[-.03em] max-bp850:text-h1-sm max-bp570:text-[39px]',
          classes.title,
          titleGap,
        ].join(' ')}
      >
        {title}
        {accent && (
          <>
            {' '}
            <span className={classes.accent}>{accent}</span>
          </>
        )}
      </Text>
      {text && (
        <Text
          as="p"
          size={FontSize.Medium}
          font={FontFamily.Sans}
          className={['leading-[1.8] text-content-lead', classes.lead].join(' ')}
        >
          {text}
        </Text>
      )}
    </div>
  )
}
