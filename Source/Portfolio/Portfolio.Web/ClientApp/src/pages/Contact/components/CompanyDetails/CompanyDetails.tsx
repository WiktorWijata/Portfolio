import { Fragment } from 'react'
import { FontFamily, FontSize, InfoCard, InfoRow, Text } from '@/design-system'
import { COMPANY_FIELDS, COMPANY_HEADER, DIRECT_EMAIL, DIRECT_TEXT } from '../../Contact.consts'

/** Right column: the company details card and the direct e-mail address under it. */
export function CompanyDetails() {
  return (
    <div className="flex w-max max-w-full min-w-0 flex-col gap-3.5 @max-[650px]:w-full">
      <InfoCard header={COMPANY_HEADER} className="w-full">
        {COMPANY_FIELDS.map((field) => (
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
      <Text
        as="p"
        size={FontSize.Medium}
        font={FontFamily.Sans}
        className="w-max max-w-full leading-[1.8] break-words text-content-lead @max-[650px]:w-auto"
      >
        {DIRECT_TEXT}{' '}
        <a href={`mailto:${DIRECT_EMAIL}`} className="text-accent focus-ring hover:underline">
          <Text>{DIRECT_EMAIL}</Text>
        </a>
      </Text>
    </div>
  )
}
