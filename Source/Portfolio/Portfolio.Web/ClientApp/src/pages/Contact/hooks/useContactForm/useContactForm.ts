import { isAxiosError } from 'axios'
import { useState, type FormEvent } from 'react'
import { postNotificationSend } from '@/api'
import { ContactFormStatus } from '../../Contact.types'
import { CONTACT_KEYS } from '../../Contact.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'
const STATUS_TOO_MANY_REQUESTS = 429

/**
 * State of the contact form. The message goes to the notifications API (`POST /notification/send`), which stores
 * it for sending and allows one message per visitor in ten minutes. With the mock data on there is no API, so the
 * message is only pretended to be sent.
 */
export function useContactForm() {
  const [text] = useTexts(CONTACT_KEYS)
  const [status, setStatus] = useState<ContactFormStatus>(ContactFormStatus.Idle)
  const [feedback, setFeedback] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // The element is only available while the event is handled, not after the request.
    const form = event.currentTarget
    if (status === ContactFormStatus.Sending || !form.reportValidity()) return

    const data = new FormData(form)
    const name = String(data.get('name')).trim()
    const sender = String(data.get('email')).trim()
    const message = String(data.get('message')).trim()
    if (!name || !message) {
      setStatus(ContactFormStatus.Failed)
      setFeedback(text.form.incomplete)
      return
    }

    setStatus(ContactFormStatus.Sending)
    setFeedback(text.form.sending)
    try {
      if (!useMock) await postNotificationSend({ name, sender, message })
      form.reset()
      setStatus(ContactFormStatus.Sent)
      setFeedback(text.form.sent)
    } catch (error) {
      const tooManyRequests = isAxiosError(error) && error.response?.status === STATUS_TOO_MANY_REQUESTS
      setStatus(ContactFormStatus.Failed)
      setFeedback(tooManyRequests ? text.form.errors.rateLimited : text.form.errors.failed)
    }
  }

  return { status, feedback, onSubmit }
}
