import { Button, ButtonSize, FontFamily, FontSize, Input, Panel, Text, Textarea } from '@/design-system'
import { EMAIL_MAX_LENGTH, MESSAGE_MAX_LENGTH, NAME_MAX_LENGTH } from '../../Contact.consts'
import { useContactForm } from '../../hooks/useContactForm'
import { CONTACT_KEYS } from '../../Contact.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** The message form: name, e-mail and message, a note about the reply time and the submit button. */
export function ContactForm() {
  const [text] = useTexts(CONTACT_KEYS)
  const { feedback, onSubmit } = useContactForm()

  return (
    <Panel raised className="w-full p-7 max-bp600:p-5">
      <form onSubmit={onSubmit} className="grid gap-[18px]">
        <div className="grid grid-cols-2 gap-4 max-bp600:grid-cols-1">
          <Input
            label={text.form.name.label}
            name="name"
            autoComplete="given-name"
            required
            maxLength={NAME_MAX_LENGTH}
            placeholder={text.form.name.placeholder}
          />
          <Input
            label={text.form.email.label}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={EMAIL_MAX_LENGTH}
            placeholder={text.form.email.placeholder}
          />
        </div>
        <Textarea
          label={text.form.message.label}
          name="message"
          required
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder={text.form.message.placeholder}
        />
        <Text as="p" size={FontSize.Small} font={FontFamily.Sans} className="leading-[1.6] text-content-tertiary">
          {text.form.note}
        </Text>
        <Button type="submit" size={ButtonSize.Lg} className="justify-self-end">
          {text.form.submit}
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
