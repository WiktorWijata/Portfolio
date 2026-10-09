import { useState, type FormEvent } from 'react'
import { useContacts } from '@/api'
import { findEmail } from '../../Contact.helpers'
import { CONTACT_KEYS } from '../../Contact.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/**
 * State of the contact form. For now the message is handed to the visitor's mail client (`mailto:`); sending through the notifications API will replace `sendMessage` later.
 */
export function useContactForm() {
  const [text] = useTexts(CONTACT_KEYS)
  const [feedback, setFeedback] = useState('')
  const { data: contacts } = useContacts()

  function sendMessage(name: string, email: string, message: string) {
    const targetEmail = findEmail(contacts ?? [])
    if (!targetEmail) return

    const subject = `${text.mail.subjectPrefix}${name}`
    const body = `${message}\n\n${text.mail.nameLabel}${name}\n${text.mail.replyLabel}${email}`
    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const data = new FormData(form)
    const name = String(data.get('name')).trim()
    const email = String(data.get('email')).trim()
    const message = String(data.get('message')).trim()
    if (!name || !message) {
      setFeedback(text.form.incomplete)
      return
    }

    sendMessage(name, email, message)
    setFeedback(text.form.sent)
  }

  return { feedback, onSubmit }
}
