import type { Business, Contact } from '@/api'
import { CV_URL } from '@/profile'
import type { CompanyField, SocialLink } from './Contact.types'

export function toCompanyFields(business: Business): CompanyField[] {
  return [
    { label: 'Nazwa', lines: [business.name ?? ''] },
    { label: 'NIP', lines: [business.taxNumber ?? ''] },
    { label: 'REGON', lines: [business.registrationNumber ?? ''] },
    {
      label: 'Adres',
      lines: [business.street ?? '', `${business.postalCode ?? ''} ${business.city ?? ''}`.trim(), `woj. ${business.region ?? ''}`],
    },
  ]
}

/** The e-mail contact's value, or `undefined` when it isn't in the list yet. */
export function findEmail(contacts: Contact[]): string | undefined {
  return contacts.find((contact) => contact.type === 'Email')?.value ?? undefined
}

/** LinkedIn/GitHub from the API, plus the CV download (a static asset, not backend data). */
export function toSocialLinks(contacts: Contact[]): SocialLink[] {
  const links: SocialLink[] = []
  const linkedIn = contacts.find((contact) => contact.type === 'LinkedIn')?.value
  const gitHub = contacts.find((contact) => contact.type === 'GitHub')?.value

  if (linkedIn) links.push({ label: 'LinkedIn', arrow: '↗', href: linkedIn })
  if (gitHub) links.push({ label: 'GitHub', arrow: '↗', href: gitHub })
  links.push({ label: 'Pobierz CV', arrow: '↓', href: CV_URL })

  return links
}
