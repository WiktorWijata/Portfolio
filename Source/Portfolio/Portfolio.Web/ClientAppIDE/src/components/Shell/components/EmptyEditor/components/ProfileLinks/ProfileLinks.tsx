import { FontFamily, FontSize, Text } from '@/design-system'
import { useEditor } from '@/context'
import { CV_URL } from '@/profile'
import { PageId } from '@/navigation'
import { EMPTY_EDITOR_CONTACT_LABEL, EMPTY_EDITOR_CV_LABEL, EMPTY_EDITOR_LINKS_LABEL } from '../../EmptyEditor.consts'

const linkBase = [
  'flex h-[42px] items-center justify-center gap-2 rounded-sm border px-2.5 whitespace-nowrap no-underline',
  'transition-[background-color,border-color,color] duration-[140ms] ease-out',
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent',
  '[@media(pointer:coarse)]:h-11',
].join(' ')

// The two links look different: the CV link is mono and accent-tinted on hover, "Kontakt" is a plain outline.
const cvClasses = `${linkBase} border-chip-line bg-hover text-text-body hover:border-accent hover:bg-cta-hover hover:text-accent-light`
const contactClasses = `${linkBase} cursor-pointer border-card-line bg-transparent text-text-body hover:border-[#68616d] hover:bg-hover-2 hover:text-text`

/** "Pobierz CV ↓" and "Kontakt ↗" under the heading of the empty editor. */
export function ProfileLinks() {
  const { openPage } = useEditor()

  return (
    <div
      aria-label={EMPTY_EDITOR_LINKS_LABEL}
      className="mb-6 grid grid-cols-2 gap-2.5 max-[380px]:grid-cols-1 max-[380px]:gap-2"
    >
      <a href={CV_URL} target="_blank" rel="noopener noreferrer" className={cvClasses}>
        <Text size={FontSize.Small} font={FontFamily.Mono} className="leading-none">
          {EMPTY_EDITOR_CV_LABEL} <span aria-hidden>↓</span>
        </Text>
      </a>
      <button type="button" className={contactClasses} onClick={() => openPage(PageId.Contact)}>
        <Text size={FontSize.Small} font={FontFamily.Sans} className="leading-none">
          {EMPTY_EDITOR_CONTACT_LABEL} <span aria-hidden>↗</span>
        </Text>
      </button>
    </div>
  )
}
