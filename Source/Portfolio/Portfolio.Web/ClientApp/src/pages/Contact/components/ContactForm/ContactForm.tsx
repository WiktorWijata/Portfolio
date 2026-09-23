import { Button, ButtonSize, FontFamily, FontSize, Input, Panel, Text, Textarea } from '@/design-system'
import {
  EMAIL_MAX_LENGTH,
  FORM_EMAIL_LABEL,
  FORM_EMAIL_PLACEHOLDER,
  FORM_MESSAGE_LABEL,
  FORM_MESSAGE_PLACEHOLDER,
  FORM_NAME_LABEL,
  FORM_NAME_PLACEHOLDER,
  FORM_NOTE,
  FORM_SUBMIT,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from '../../Contact.consts'
import { useContactForm } from '../../hooks/useContactForm'

/** The message form: name, e-mail and message, a note about the reply time and the submit button. */
export function ContactForm() {
  const { feedback, onSubmit } = useContactForm()

  return (
    <Panel raised className="w-full p-7 max-bp600:p-5">
      <form onSubmit={onSubmit} className="grid gap-[18px]">
        <div className="grid grid-cols-2 gap-4 max-bp600:grid-cols-1">
          <Input
            label={FORM_NAME_LABEL}
            name="name"
            autoComplete="given-name"
            required
            maxLength={NAME_MAX_LENGTH}
            placeholder={FORM_NAME_PLACEHOLDER}
          />
          <Input
            label={FORM_EMAIL_LABEL}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={EMAIL_MAX_LENGTH}
            placeholder={FORM_EMAIL_PLACEHOLDER}
          />
        </div>
        <Textarea
          label={FORM_MESSAGE_LABEL}
          name="message"
          required
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder={FORM_MESSAGE_PLACEHOLDER}
        />
        <Text as="p" size={FontSize.Small} font={FontFamily.Sans} className="leading-[1.6] text-content-tertiary">
          {FORM_NOTE}
        </Text>
        <Button type="submit" size={ButtonSize.Lg} className="justify-self-end">
          {FORM_SUBMIT}
        </Button>
        <Text
          as="div"
          size={FontSize.Medium}
          font={FontFamily.Sans}
          role="status"
          aria-live="polite"
          className="leading-[1.6] text-success-content-soft empty:hidden"
        >
          {feedback}
        </Text>
      </form>
    </Panel>
  )
}
