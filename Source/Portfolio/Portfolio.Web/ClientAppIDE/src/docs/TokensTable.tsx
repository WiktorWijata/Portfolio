import { Badge, FontFamily, FontSize, FontWeight, Text, TextColor } from '@/design-system'
import { getComponentTokens } from './api/tokens'

const th = 'border-b border-border-2 px-4 py-2.5 text-left align-bottom'
const td = 'border-b border-border-3 px-4 py-2.5 align-middle'

export function TokensTables({ folder }: { folder: string }) {
  const { groups } = getComponentTokens(folder)

  if (!groups.length) {
    return (
      <Text as="p" size={FontSize.Medium} color={TextColor.Dim}>
        Ten komponent nie odwołuje się do żadnych tokenów z @theme — jego zachowanie wynika z układu (szerokości,
        marginesy).
      </Text>
    )
  }

  return (
    <div className="flex flex-col gap-7">
      {groups.map((group) => (
        <div key={group.category} className="flex flex-col gap-2.5">
          <Text as="h3" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
            {group.label}
          </Text>
          <div className="scrollbar-subtle overflow-x-auto rounded-xl border border-border-5 bg-card">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr>
                  {['Token', 'Wartość', 'Zastosowanie'].map((h) => (
                    <th key={h} className={th}>
                      <Text
                        size={FontSize.Micro}
                        font={FontFamily.Mono}
                        weight={FontWeight.SemiBold}
                        color={TextColor.Dimmer}
                        className="tracking-[.1em] uppercase"
                      >
                        {h}
                      </Text>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="[&>tr:last-child>td]:border-b-0">
                {group.tokens.map((t) => (
                  <tr key={t.token}>
                    <td className={`${td} whitespace-nowrap`}>
                      <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.Primary}>
                        {t.token}
                      </Text>
                    </td>
                    <td className={`${td} whitespace-nowrap`}>
                      <span className="flex items-center gap-2">
                        {t.category === 'colors' && (
                          <span
                            aria-hidden
                            className="size-3.5 shrink-0 rounded-sm border border-border-7"
                            style={{ background: t.value }}
                          />
                        )}
                        <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.Body}>
                          {t.value}
                        </Text>
                      </span>
                    </td>
                    <td className={td}>
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {t.roles.map((role) => (
                          <Badge key={role}>{role}</Badge>
                        ))}
                        <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint}>
                          {t.classes.join(' · ')}
                        </Text>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint} className="leading-relaxed">
        Lista jest wyliczana ze źródeł komponentu. Pojedyncze wartości zmierzone w prototypie, które nie są tokenami
        (np. niestandardowe odcienie), nie są tu wymienione.
      </Text>
    </div>
  )
}
