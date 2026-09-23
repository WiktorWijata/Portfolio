import { FontFamily, FontSize, FontWeight, Text, TextColor } from '@/design-system'
import { getAlias, getEnum, getInterface, getUnion, type InterfaceDoc, type PropDoc } from './api/parseTypes'

const th = 'border-b border-line-subtle px-4 py-2.5 text-left align-bottom'
const td = 'border-b border-line-faint px-4 py-3 align-top'

/** Renders `code` spans (backticks) from JSDoc text as inline code. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, i) =>
        i % 2 ? (
          <code key={i} className="rounded-sm bg-surface-hover px-1 font-mono text-[.92em] text-accent-light">
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

/** The `<table>` of a single interface's props — reused for a plain interface and for each union variant. */
function PropsGrid({ props }: { props: PropDoc[] }) {
  if (props.length === 0) return null
  return (
    <div className="scrollbar-subtle overflow-x-auto rounded-xl border border-line-emphasis bg-surface-card">
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
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className={`${td} w-[190px] whitespace-nowrap`}>
                <Text size={FontSize.Small} font={FontFamily.Mono} weight={FontWeight.Medium} color={TextColor.Primary}>
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
  )
}

/** One union variant (e.g. `ButtonAsLinkProps`): its own description as a heading, then its props. */
function UnionVariant({ doc }: { doc: InterfaceDoc }) {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-l-line-emphasis pl-4">
      <Text as="h4" size={FontSize.Medium} font={FontFamily.Mono} weight={FontWeight.Medium} color={TextColor.Heading}>
        {doc.name}
      </Text>
      {doc.description && (
        <Text as="p" size={FontSize.Small} color={TextColor.Dim} className="leading-[1.6]">
          <Rich text={doc.description} />
        </Text>
      )}
      {doc.extends && (
        <Text as="p" size={FontSize.Small} color={TextColor.Dim} className="leading-[1.6]">
          Przyjmuje też wszystkie propsy typu{' '}
          <Text font={FontFamily.Mono} color={TextColor.AccentLight}>
            {doc.extends}
          </Text>
        </Text>
      )}
      <PropsGrid props={doc.props} />
    </div>
  )
}

function InterfaceTable({ name }: { name: string }) {
  const doc = getInterface(name)
  const alias = getAlias(name)
  const union = doc ? undefined : getUnion(name)

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
            {doc?.extends ? 'Przyjmuje też wszystkie propsy typu ' : union ? 'Jeden z dwóch kształtów: ' : 'Typ: '}
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

      {doc && <PropsGrid props={doc.props} />}

      {union && (
        <div className="flex flex-col gap-5">
          {union.map((variant) => (
            <UnionVariant key={variant.name} doc={variant} />
          ))}
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
