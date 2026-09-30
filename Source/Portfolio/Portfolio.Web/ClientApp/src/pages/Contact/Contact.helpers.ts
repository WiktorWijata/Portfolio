import type { TFunction } from 'i18next'
import type { Business, Contact } from '@/api'
import { CV_URL } from '@/profile'
import type { CompanyField, SocialLink } from './Contact.types'
import { CONTACT_KEYS } from './Contact.keys'

export function toCompanyFields(business: Business, t: TFunction): CompanyField[] {
  return [
    { label: t(CONTACT_KEYS.company.name), lines: [business.name ?? ''] },
    { label: t(CONTACT_KEYS.company.taxNumber), lines: [business.taxNumber ?? ''] },
    { label: t(CONTACT_KEYS.company.registrationNumber), lines: [business.registrationNumber ?? ''] },
    {
      label: t(CONTACT_KEYS.company.address),
      lines: [
        business.street ?? '',
        `${business.postalCode ?? ''} ${business.city ?? ''}`.trim(),
        t(CONTACT_KEYS.company.region, { region: business.region ?? '' }),
      ],
    },
  ]
}

/** The e-mail contact's value, or `undefined` when it isn't in the list yet. */
export function findEmail(contacts: Contact[]): string | undefined {
  return contacts.find((contact) => contact.type === 'Email')?.value ?? undefined
}

/** LinkedIn/GitHub from the API, plus the CV download (a static asset, not backend data). */
export function toSocialLinks(contacts: Contact[], t: TFunction): SocialLink[] {
  const links: SocialLink[] = []
  const linkedIn = contacts.find((contact) => contact.type === 'LinkedIn')?.value
  const gitHub = contacts.find((contact) => contact.type === 'GitHub')?.value

  if (linkedIn) links.push({ label: 'LinkedIn', arrow: '↗', href: linkedIn })
  if (gitHub) links.push({ label: 'GitHub', arrow: '↗', href: gitHub })
  links.push({ label: t(CONTACT_KEYS.social.cv), arrow: '↓', href: CV_URL })

  return links
}
