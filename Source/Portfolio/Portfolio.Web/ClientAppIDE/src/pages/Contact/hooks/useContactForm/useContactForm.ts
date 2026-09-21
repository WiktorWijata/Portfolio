import { useState, type FormEvent } from 'react'
import { CONTACT_EMAIL } from '@/profile'
import {
  FORM_INCOMPLETE,
  FORM_SENT,
  MAIL_NAME_LABEL,
  MAIL_REPLY_LABEL,
  MAIL_SUBJECT_PREFIX,
} from '../../Contact.consts'

/**
 * State of the contact form. For now the message is handed to the visitor's mail client (`mailto:`); sending through the notifications API will replace `sendMessage` later.
 */
export function useContactForm() {
  const [feedback, setFeedback] = useState('')

  function sendMessage(name: string, email: string, message: string) {
    const subject = `${MAIL_SUBJECT_PREFIX}${name}`
    const body = `${message}\n\n${MAIL_NAME_LABEL}${name}\n${MAIL_REPLY_LABEL}${email}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
      setFeedback(FORM_INCOMPLETE)
      return
    }

    sendMessage(name, email, message)
    setFeedback(FORM_SENT)
  }

  return { feedback, onSubmit }
}
