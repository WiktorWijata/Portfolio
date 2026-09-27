import { Fragment, useMemo } from 'react'
import { useBusiness, useContacts } from '@/api'
import { FontFamily, FontSize, InfoCard, InfoRow, Text } from '@/design-system'
import { COMPANY_HEADER, DIRECT_TEXT } from '../../Contact.consts'
import { findEmail, toCompanyFields } from '../../Contact.helpers'

export function CompanyDetails() {
  const { data: business } = useBusiness()
  const { data: contacts } = useContacts()
  const fields = useMemo(() => toCompanyFields(business ?? {}), [business])
  const email = findEmail(contacts ?? [])

  if (!business || !contacts) return null

  return (
    <div className="flex w-max max-w-full min-w-0 flex-col gap-3.5 @max-[650px]:w-full">
      <InfoCard header={COMPANY_HEADER} className="w-full">
        {fields.map((field) => (
          <InfoRow key={field.label} label={field.label}>
            {field.lines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </InfoRow>
        ))}
      </InfoCard>
      {email && (
        <Text
          as="p"
          size={FontSize.Medium}
          font={FontFamily.Sans}
          className="w-max max-w-full leading-[1.8] break-words text-content-lead @max-[650px]:w-auto"
        >
          {DIRECT_TEXT}{' '}
          <a href={`mailto:${email}`} className="text-accent focus-ring hover:underline">
            <Text>{email}</Text>
          </a>
        </Text>
      )}
    </div>
  )
}
