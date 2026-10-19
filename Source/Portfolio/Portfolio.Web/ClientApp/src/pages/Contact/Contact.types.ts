export interface SocialLink {
  label: string
  /** Arrow shown after the label: ↗ opens another site, ↓ downloads a file. */
  arrow: string
  href: string
}

export interface CompanyField {
  label: string
  /** Lines of the value; more than one for an address. */
  lines: string[]
}

/** Where the contact form is: nothing sent yet, sending, sent, or the last attempt did not go through. */
export const ContactFormStatus = {
  Idle: 'idle',
  Sending: 'sending',
  Sent: 'sent',
  Failed: 'failed',
} as const
export type ContactFormStatus = (typeof ContactFormStatus)[keyof typeof ContactFormStatus]
