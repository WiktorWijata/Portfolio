import { Badge, FontFamily, FontSize, FontWeight, Text, TextColor } from '@/design-system'
import { useTexts } from '@/i18n/hooks/useTexts'
import { getComponentTokens } from './api/tokens'
import { DOCS_KEYS } from './Docs.keys'

const th = 'border-b border-line-subtle px-4 py-2.5 text-left align-bottom'
const td = 'border-b border-line-faint px-4 py-2.5 align-middle'

export function TokensTables({ folder }: { folder: string }) {
  const [text] = useTexts(DOCS_KEYS, 'docs')
  const { groups } = getComponentTokens(folder)

  if (!groups.length) {
    return (
      <Text as="p" size={FontSize.Medium} color={TextColor.Dim}>
        {text.tokens.none}
      </Text>
    )
  }

  return (
    <div className="flex flex-col gap-7">
      {groups.map((group) => (
        <div key={group.category} className="flex flex-col gap-2.5">
          <Text as="h3" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
            {text.tokens.categories[group.category]}
          </Text>
          <div className="scrollbar-subtle overflow-x-auto rounded-xl border border-line-emphasis bg-surface-card">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr>
                  {[text.tokens.columns.token, text.tokens.columns.value, text.tokens.columns.usage].map((h) => (
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
                            className="size-3.5 shrink-0 rounded-sm border border-line-strongest"
                            style={{ background: `var(${t.token})` }}
                          />
                        )}
                        <span className="flex flex-col">
                          {(new Set(t.themeValues.map((v) => v.value)).size === 1
                            ? t.themeValues.slice(0, 1)
                            : t.themeValues
                          ).map((v, _, all) => (
                            <Text
                              key={v.theme}
                              size={FontSize.Small}
                              font={FontFamily.Mono}
                              color={TextColor.Body}
                              className="leading-[1.5]"
                            >
                              {all.length > 1 ? `${v.theme} ${v.value}` : v.value}
                            </Text>
                          ))}
                        </span>
                      </span>
                    </td>
                    <td className={td}>
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {t.roles.map((role) => (
                          <Badge key={role}>{text.tokens.roles[role as keyof typeof text.tokens.roles]}</Badge>
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
        {text.tokens.footnote}
      </Text>
    </div>
  )
}
