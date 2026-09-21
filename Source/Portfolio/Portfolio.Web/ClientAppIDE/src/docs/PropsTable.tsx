import { FontFamily, FontSize, FontWeight, Text, TextColor } from '@/design-system'
import { getAlias, getEnum, getInterface, type PropDoc } from './api/parseTypes'

const th = 'border-b border-border-2 px-4 py-2.5 text-left align-bottom'
const td = 'border-b border-border-3 px-4 py-3 align-top'

/** Renders `code` spans (backticks) from JSDoc text as inline code. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, i) =>
        i % 2 ? (
          <code key={i} className="rounded-sm bg-hover px-1 font-mono text-[.92em] text-accent-light">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  )
}

function TypeCell({ prop }: { prop: PropDoc }) {
  return (
    <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.AccentLight} className="break-words">
      {prop.type}
    </Text>
  )
}

function DescriptionCell({ prop }: { prop: PropDoc }) {
  const enumDoc = getEnum(prop.type)
  return (
    <div className="flex flex-col gap-2">
      {prop.description && (
        <Text size={FontSize.Medium} color={TextColor.Body} className="leading-[1.6]">
          <Rich text={prop.description} />
        </Text>
      )}
      {enumDoc && (
        <ul className="flex flex-col gap-1">
          {enumDoc.members.map((m) => (
            <li key={m.key} className="flex flex-wrap items-baseline gap-x-2">
              <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Accent}>
                {enumDoc.name}.{m.key}
              </Text>
              <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.Faint}>
                {`'${m.value}'`}
              </Text>
              {m.description && (
                <Text size={FontSize.Small} color={TextColor.Dim}>
                  — <Rich text={m.description} />
                </Text>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function InterfaceTable({ name }: { name: string }) {
  const doc = getInterface(name)
  const alias = getAlias(name)

  if (!doc && !alias) {
    return (
      <Text as="p" size={FontSize.Small} color={TextColor.Dim}>
        Brak opisu typu {name}.
      </Text>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Text
          as="h3"
          size={FontSize.XLarge}
          font={FontFamily.Mono}
          weight={FontWeight.Medium}
          color={TextColor.Heading}
        >
          {name}
        </Text>
        {(doc?.extends || alias) && (
          <Text as="p" size={FontSize.Small} color={TextColor.Dim} className="leading-[1.6]">
            {doc?.extends ? 'Przyjmuje też wszystkie propsy typu ' : 'Typ: '}
            <Text font={FontFamily.Mono} color={TextColor.AccentLight}>
              {doc?.extends ?? alias?.type}
            </Text>
            {alias?.description && (
              <>
                {' — '}
                <Rich text={alias.description} />
              </>
            )}
          </Text>
        )}
        {doc?.description && (
          <Text as="p" size={FontSize.Small} color={TextColor.Dim}>
            <Rich text={doc.description} />
          </Text>
        )}
      </div>

      {doc && doc.props.length > 0 && (
        <div className="scrollbar-subtle overflow-x-auto rounded-xl border border-border-5 bg-card">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                {['Nazwa', 'Typ', 'Domyślnie', 'Opis'].map((h) => (
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
              {doc.props.map((prop) => (
                <tr key={prop.name}>
                  <td className={`${td} w-[190px] whitespace-nowrap`}>
                    <Text
                      size={FontSize.Small}
                      font={FontFamily.Mono}
                      weight={FontWeight.Medium}
                      color={TextColor.Primary}
                    >
                      {prop.name}
                    </Text>
                    {!prop.optional && (
                      <Text size={FontSize.Small} color={TextColor.Accent} title="Prop wymagany" className="ml-1">
                        *
                      </Text>
                    )}
                  </td>
                  <td className={`${td} w-[220px]`}>
                    <TypeCell prop={prop} />
                  </td>
                  <td className={`${td} w-[170px]`}>
                    <Text
                      size={FontSize.Small}
                      font={FontFamily.Mono}
                      color={prop.defaultValue ? TextColor.Body : TextColor.Faint}
                      className="break-words"
                    >
                      {prop.defaultValue ?? '—'}
                    </Text>
                  </td>
                  <td className={td}>
                    <DescriptionCell prop={prop} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export function PropsTables({ interfaces }: { interfaces: string[] }) {
  return (
    <div className="flex flex-col gap-8">
      {interfaces.map((name) => (
        <InterfaceTable key={name} name={name} />
      ))}
      <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint}>
        * prop wymagany
      </Text>
    </div>
  )
}
