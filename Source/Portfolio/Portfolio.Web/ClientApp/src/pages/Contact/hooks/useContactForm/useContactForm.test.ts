// @vitest-environment jsdom
import { AxiosError, type AxiosResponse } from 'axios'
import { act, renderHook } from '@testing-library/react'
import type { FormEvent } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NotificationRequest } from '@/api'
import { ContactFormStatus } from '../../Contact.types'
import { CONTACT_KEYS } from '../../Contact.keys'
import { useContactForm } from './useContactForm'

const postNotificationSend = vi.fn<(request: NotificationRequest) => Promise<unknown>>()

vi.mock('@/api', () => ({
  postNotificationSend: (request: NotificationRequest) => postNotificationSend(request),
}))
// Without an initialized i18n the key itself is the text, which is all these tests need.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'pl' } }),
}))

/** A form with the three fields of the contact form, filled in. */
function makeForm(values: { name?: string; email?: string; message?: string } = {}) {
  const { name = 'Anna', email = 'anna@example.com', message = 'Hello' } = values
  const form = document.createElement('form')
  for (const [field, value] of Object.entries({ name, email, message })) {
    const input = document.createElement('input')
    input.name = field
    input.value = value
    form.append(input)
  }
  return form
}

function submitEvent(form: HTMLFormElement) {
  return { preventDefault: vi.fn(), currentTarget: form } as unknown as FormEvent<HTMLFormElement>
}

function failure(status: number) {
  return new AxiosError('failed', 'ERR_BAD_REQUEST', undefined, undefined, { status } as AxiosResponse)
}

describe('useContactForm', () => {
  beforeEach(() => {
    postNotificationSend.mockReset()
  })

  it('sends the name, the e-mail and the message to the API, then clears the form', async () => {
    postNotificationSend.mockResolvedValue({})
    const form = makeForm({ name: ' Anna ', message: ' Hello there ' })
    const { result } = renderHook(() => useContactForm())

    await act(() => result.current.onSubmit(submitEvent(form)))

    expect(postNotificationSend).toHaveBeenCalledWith({
      name: 'Anna',
      sender: 'anna@example.com',
      message: 'Hello there',
    })
    expect(result.current.status).toBe(ContactFormStatus.Sent)
    expect(result.current.feedback).toBe(CONTACT_KEYS.form.sent)
    expect(form.querySelector<HTMLInputElement>('[name=message]')?.value).toBe('')
  })

  it('shows that it is sending while the request is open, and ignores a second submit', async () => {
    let finish!: () => void
    postNotificationSend.mockReturnValue(new Promise<void>((resolve) => (finish = resolve)))
    const { result } = renderHook(() => useContactForm())

    let first!: Promise<void>
    act(() => {
      first = result.current.onSubmit(submitEvent(makeForm()))
    })
    expect(result.current.status).toBe(ContactFormStatus.Sending)
    expect(result.current.feedback).toBe(CONTACT_KEYS.form.sending)

    await act(() => result.current.onSubmit(submitEvent(makeForm())))
    expect(postNotificationSend).toHaveBeenCalledTimes(1)

    await act(async () => {
      finish()
      await first
    })
    expect(result.current.status).toBe(ContactFormStatus.Sent)
  })

  it('does not call the API when the name or the message is blank', async () => {
    const { result } = renderHook(() => useContactForm())

    await act(() => result.current.onSubmit(submitEvent(makeForm({ message: '   ' }))))

    expect(postNotificationSend).not.toHaveBeenCalled()
    expect(result.current.status).toBe(ContactFormStatus.Failed)
    expect(result.current.feedback).toBe(CONTACT_KEYS.form.incomplete)
  })

  it('says to wait when the API answers 429', async () => {
    postNotificationSend.mockRejectedValue(failure(429))
    const form = makeForm()
    const { result } = renderHook(() => useContactForm())

    await act(() => result.current.onSubmit(submitEvent(form)))

    expect(result.current.status).toBe(ContactFormStatus.Failed)
    expect(result.current.feedback).toBe(CONTACT_KEYS.form.errors.rateLimited)
    // What the visitor typed is kept, so nothing is lost.
    expect(form.querySelector<HTMLInputElement>('[name=message]')?.value).toBe('Hello')
  })

  it('shows a general error when the request fails otherwise', async () => {
    postNotificationSend.mockRejectedValue(new Error('Network Error'))
    const { result } = renderHook(() => useContactForm())

    await act(() => result.current.onSubmit(submitEvent(makeForm())))

    expect(result.current.status).toBe(ContactFormStatus.Failed)
    expect(result.current.feedback).toBe(CONTACT_KEYS.form.errors.failed)
  })

  it('can send again after a failure', async () => {
    postNotificationSend.mockRejectedValueOnce(failure(500)).mockResolvedValueOnce({})
    const { result } = renderHook(() => useContactForm())

    await act(() => result.current.onSubmit(submitEvent(makeForm())))
    await act(() => result.current.onSubmit(submitEvent(makeForm())))

    expect(postNotificationSend).toHaveBeenCalledTimes(2)
    expect(result.current.status).toBe(ContactFormStatus.Sent)
  })
})
