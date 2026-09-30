import { useContacts } from '@/api'
import { COMMON_KEYS } from '@/i18n/common.keys'
import { PageIntro, PageIntroVariant } from '../PageIntro'
import { PageLoader } from '../PageLoader'
import { PageContainer, PageContainerPadding } from '../PageContainer'
import { CompanyDetails, ContactForm, SocialLinks } from './components'
import { CONTACT_KEYS } from './Contact.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Contact.cs: the message form with social links on the left, the company details on the right. */
export function Contact() {
  const [text, t] = useTexts(CONTACT_KEYS)
  const { isLoading, error } = useContacts()

  if (isLoading || error) return <PageLoader label={t(COMMON_KEYS.loading.contact)} failed={!!error} />

  return (
    <PageContainer padding={PageContainerPadding.Form} className="@container flex flex-col">
      <PageIntro
        kicker={text.intro.kicker}
        title={text.intro.title}
        accent={text.intro.accent}
        text={text.intro.text}
        variant={PageIntroVariant.Contact}
      />
      <div className="grid grid-cols-[minmax(0,560px)_minmax(0,max-content)] items-start justify-start gap-4 @max-[900px]:grid-cols-[minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <ContactForm />
          <SocialLinks />
        </div>
        <CompanyDetails />
      </div>
    </PageContainer>
  )
}
