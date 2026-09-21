import { CONTACT_EMAIL, CV_URL, GITHUB_URL, LINKEDIN_URL } from '@/profile'
import type { CompanyField, SocialLink } from './Contact.types'

export const CONTACT_KICKER = 'Kontakt / Porozmawiajmy'
export const CONTACT_TITLE = 'Porozmawiajmy'
export const CONTACT_TITLE_ACCENT = 'o współpracy.'
export const CONTACT_TEXT = 'Szukasz developera .NET lub chcesz porozmawiać o współpracy? Zostaw kilka słów.'

export const FORM_NAME_LABEL = 'Imię'
export const FORM_NAME_PLACEHOLDER = 'Twoje imię'
export const FORM_EMAIL_LABEL = 'E-mail'
export const FORM_EMAIL_PLACEHOLDER = 'ty@firma.pl'
export const FORM_MESSAGE_LABEL = 'Wiadomość'
export const FORM_MESSAGE_PLACEHOLDER = 'Czego dotyczy projekt lub propozycja współpracy?'
export const FORM_NOTE = 'Wiadomość trafi bezpośrednio na moją skrzynkę. Odpowiadam zwykle w ciągu dnia lub dwóch.'
export const FORM_SUBMIT = 'Wyślij wiadomość ↗'
export const FORM_INCOMPLETE = 'Uzupełnij imię i treść wiadomości.'
export const FORM_SENT = 'Dziękuję — wiadomość została wysłana. Odpowiem na podany adres e-mail.'

/** Limits of the form fields. */
export const NAME_MAX_LENGTH = 100
export const EMAIL_MAX_LENGTH = 254
export const MESSAGE_MAX_LENGTH = 5000

export const MAIL_SUBJECT_PREFIX = 'Kontakt z portfolio — '
export const MAIL_NAME_LABEL = 'Imię: '
export const MAIL_REPLY_LABEL = 'E-mail do odpowiedzi: '

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', arrow: '↗', href: LINKEDIN_URL },
  { label: 'GitHub', arrow: '↗', href: GITHUB_URL },
  { label: 'Pobierz CV', arrow: '↓', href: CV_URL },
]

export const COMPANY_HEADER = 'DANE FIRMY'
export const COMPANY_FIELDS: CompanyField[] = [
  { label: 'Nazwa', lines: ['Rescuepc Software Wiktor Wijata'] },
  { label: 'NIP', lines: ['7681831348'] },
  { label: 'REGON', lines: ['385601617'] },
  { label: 'Adres', lines: ['ul. Norwida 3 lok. 46', '26-300 Opoczno', 'woj. łódzkie'] },
]

export const DIRECT_TEXT = 'Możesz też napisać bezpośrednio:'
export const DIRECT_EMAIL = CONTACT_EMAIL
