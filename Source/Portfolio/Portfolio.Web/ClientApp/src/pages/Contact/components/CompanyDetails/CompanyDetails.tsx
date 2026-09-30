import { Fragment, useMemo } from 'react'
import { useBusiness, useContacts } from '@/api'
import { FontFamily, FontSize, Card, CardField, CardFields, Text } from '@/design-system'
import { findEmail, toCompanyFields } from '../../Contact.helpers'
import { CONTACT_KEYS } from '../../Contact.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

export function CompanyDetails() {
  const [text, t] = useTexts(CONTACT_KEYS)
  const { data: business } = useBusiness()
  const { data: contacts } = useContacts()
  const fields = useMemo(() => toCompanyFields(business ?? {}, t), [business, t])
  const email = findEmail(contacts ?? [])

  if (!business || !contacts) return null

  return (
    <div className="flex w-max max-w-full min-w-0 flex-col gap-3.5 @max-[650px]:w-full">
      <Card title={text.company.header} className="w-full">
        <CardFields>
          {fields.map((field) => (
            <CardField key={field.label} label={field.label}>
              {field.lines.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </CardField>
          ))}
        </CardFields>
      </Card>
      {email && (
        <Text
          as="p"
          size={FontSize.Medium}
          font={FontFamily.Sans}
          className="w-max max-w-full leading-[1.8] break-words text-content-lead @max-[650px]:w-auto"
        >
          {text.company.direct}{' '}
          <a href={`mailto:${email}`} className="text-accent focus-ring hover:underline">
            <Text>{email}</Text>
          </a>
        </Text>
      )}
    </div>
  )
}
