import { useMemo } from 'react'
import { useContacts } from '@/api'
import { Button, ButtonSize, ButtonVariant } from '@/design-system'
import { toSocialLinks } from '../../Contact.helpers'

/** LinkedIn, GitHub and the CV file as small buttons under the form; the last one is pushed to the right. */
export function SocialLinks() {
  const { data: contacts } = useContacts()
  const links = useMemo(() => toSocialLinks(contacts ?? []), [contacts])

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link, index) => (
        <Button
          key={link.href}
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Xs}
          href={link.href}
          target="_blank"
          rel="noopener"
          className={index === links.length - 1 ? 'ml-auto' : ''}
        >
          {link.label} <span aria-hidden>{link.arrow}</span>
        </Button>
      ))}
    </div>
  )
}
