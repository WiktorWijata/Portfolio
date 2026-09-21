import { PageIntro, PageIntroVariant } from '../PageIntro'
import { PageContainer, PageContainerPadding } from '../PageContainer'
import { CompanyDetails, ContactForm, SocialLinks } from './components'
import { CONTACT_KICKER, CONTACT_TEXT, CONTACT_TITLE, CONTACT_TITLE_ACCENT } from './Contact.consts'

/** Contact.cs: the message form with social links on the left, the company details on the right. */
export function Contact() {
  return (
    <PageContainer padding={PageContainerPadding.Form} className="@container flex flex-col">
      <PageIntro
        kicker={CONTACT_KICKER}
        title={CONTACT_TITLE}
        accent={CONTACT_TITLE_ACCENT}
        text={CONTACT_TEXT}
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
