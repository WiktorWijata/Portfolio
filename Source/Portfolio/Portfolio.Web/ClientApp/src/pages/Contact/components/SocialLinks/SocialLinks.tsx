import { Button, ButtonSize, ButtonVariant } from '@/design-system'
import { SOCIAL_LINKS } from '../../Contact.consts'

/** LinkedIn, GitHub and the CV file as small buttons under the form; the last one is pushed to the right. */
export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SOCIAL_LINKS.map((link, index) => (
        <Button
          key={link.href}
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Xs}
          href={link.href}
          target="_blank"
          rel="noopener"
          className={index === SOCIAL_LINKS.length - 1 ? 'ml-auto' : ''}
        >
          {link.label} <span aria-hidden>{link.arrow}</span>
        </Button>
      ))}
    </div>
  )
}
