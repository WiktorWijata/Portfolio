/** Translation keys of the Contact page; the texts live in `i18n/locales`. */
export const CONTACT_KEYS = {
  intro: {
    kicker: 'contact.intro.kicker',
    title: 'contact.intro.title',
    accent: 'contact.intro.accent',
    text: 'contact.intro.text',
  },
  form: {
    name: {
      label: 'contact.form.name.label',
      placeholder: 'contact.form.name.placeholder',
    },
    email: {
      label: 'contact.form.email.label',
      placeholder: 'contact.form.email.placeholder',
    },
    message: {
      label: 'contact.form.message.label',
      placeholder: 'contact.form.message.placeholder',
    },
    note: 'contact.form.note',
    submit: 'contact.form.submit',
    incomplete: 'contact.form.incomplete',
    sent: 'contact.form.sent',
  },
  mail: {
    subjectPrefix: 'contact.mail.subjectPrefix',
    nameLabel: 'contact.mail.nameLabel',
    replyLabel: 'contact.mail.replyLabel',
  },
  company: {
    header: 'contact.company.header',
    name: 'contact.company.name',
    taxNumber: 'contact.company.taxNumber',
    registrationNumber: 'contact.company.registrationNumber',
    address: 'contact.company.address',
    region: 'contact.company.region',
    direct: 'contact.company.direct',
  },
  social: {
    cv: 'contact.social.cv',
  },
} as const
