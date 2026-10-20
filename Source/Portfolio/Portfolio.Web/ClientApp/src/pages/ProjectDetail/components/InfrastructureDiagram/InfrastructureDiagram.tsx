import type { ReactNode } from 'react'
import { Card, CardVariant, FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { useTexts } from '@/i18n/hooks/useTexts'
import { CI_BADGE, HOSTS } from './InfrastructureDiagram.consts'
import { INFRASTRUCTURE_DIAGRAM_KEYS } from './InfrastructureDiagram.keys'

const boxClasses = 'rounded-lg border border-line-default bg-surface-card px-[13px] py-[11px]'
const labelClasses = 'font-mono text-[11px] leading-[normal] tracking-[.1em] text-content-faint uppercase'

/** A small box: a mono title in the colour of its column and a short muted line under it. */
function Box({ title, text, tone }: { title: string; text: string; tone: string }) {
  return (
    <div className={boxClasses}>
      <Text as="span" font={FontFamily.Mono} weight={FontWeight.SemiBold} className={`block text-[15px] ${tone}`}>
        {title}
      </Text>
      <Text as="span" font={FontFamily.Sans} className="mt-[3px] block text-[13px] leading-[1.4] text-content-muted">
        {text}
      </Text>
    </div>
  )
}

interface ColumnProps {
  title: string
  tag?: string
  host: string
  tone: string
  children: ReactNode
}

function Column({ title, tag, host, tone, children }: ColumnProps) {
  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-xl border border-line-emphasis bg-surface-panel p-[18px]">
      <div className="flex items-center justify-between gap-2">
        <Text
          as="h3"
          font={FontFamily.Mono}
          weight={FontWeight.SemiBold}
          className={`text-xl leading-[normal] ${tone}`}
        >
          {title}
        </Text>
        {tag && (
          <span className="rounded-xs border border-line-default px-2 py-[3px] font-mono text-[11px] tracking-[.08em] text-content-muted">
            {tag}
          </span>
        )}
      </div>
      <Text font={FontFamily.Mono} className="-mt-1.5 block text-[13px] leading-[normal] text-link-info">
        {host}
      </Text>
      <div className="flex flex-1 flex-col gap-[9px] rounded-xl border border-dashed border-line-emphasis p-3">
        {children}
      </div>
    </section>
  )
}

/**
 * The infrastructure project's own picture of itself: the browser reaching Caddy, the two isolated environments,
 * the monitoring and the file server they share, and GitHub Actions deploying it all. A live component instead of
 * a screenshot, so it is sharp at any width, translated, and stacks on a phone.
 */
export function InfrastructureDiagram() {
  const [text] = useTexts(INFRASTRUCTURE_DIAGRAM_KEYS)

  const environment = (title: string, host: string, tone: string) => (
    <Column title={title} tag={text.environment} host={host} tone={tone}>
      <span className={labelClasses}>{text.network}</span>
      <Box title={text.apps.title} text={text.apps.text} tone={tone} />
      <div className="grid grid-cols-2 gap-[9px]">
        <Box title={text.mssql.title} text={text.mssql.text} tone={tone} />
        <Box title={text.redis.title} text={text.redis.text} tone={tone} />
      </div>
      <span className={`${labelClasses} mt-1`}>{text.convention}</span>
      <div className="grid grid-cols-2 gap-[9px]">
        <Box title={text.routing.title} text={text.routing.text} tone={tone} />
        <Box title={text.init.title} text={text.init.text} tone={tone} />
      </div>
    </Column>
  )

  return (
    <Card variant={CardVariant.Standard} title={text.heading} aria-label={text.label} className="min-w-0">
      <div id="infrastructure-diagram" className="@container p-[clamp(16px,2.4vw,26px)]">
        <Text
          as="p"
          size={FontSize.XSmall}
          font={FontFamily.Mono}
          className="tracking-[.12em] text-content-subtle uppercase"
        >
          {text.title} <span className="text-accent">{text.accent}</span>
        </Text>
        <Text as="p" font={FontFamily.Sans} className="mt-1.5 text-[15px] leading-[1.6] text-content-muted">
          {text.text}
        </Text>

        <div className="mt-6 flex flex-col items-center">
          <span className="rounded-full border border-line-default bg-surface-panel px-[18px] py-2 font-mono text-sm text-content-muted">
            {text.browser}
          </span>
          <span aria-hidden className="h-[22px] w-px bg-line-emphasis" />
          <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-accent bg-accent-surface px-6 py-4">
            <div>
              <Text
                as="span"
                font={FontFamily.Mono}
                weight={FontWeight.SemiBold}
                className="block text-xl leading-[normal]"
              >
                Caddy
              </Text>
              <Text as="span" font={FontFamily.Sans} className="mt-1 block text-sm leading-[1.5] text-accent-soft">
                {text.caddyText}
              </Text>
            </div>
            <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
              {Object.values(HOSTS).map((host) => (
                <li
                  key={host}
                  className="rounded-md border border-line-emphasis bg-surface-editor/60 px-2.5 py-1.5 font-mono text-[13px]"
                >
                  {host}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[18px] grid grid-cols-[1.15fr_1.15fr_1fr_.8fr] gap-[18px] @max-[1300px]:grid-cols-2 @max-[560px]:grid-cols-1">
          {environment('dev', HOSTS.dev, 'text-success-content')}
          {environment('prod', HOSTS.prod, 'text-warning-content')}

          <Column title={text.monitoring.title} tag={text.shared} host={HOSTS.monitoring} tone="text-accent-soft">
            <div className="grid grid-cols-2 gap-[9px]">
              <Box title="Prometheus" text={text.monitoring.prometheus} tone="text-accent-soft" />
              <Box title="Loki" text={text.monitoring.loki} tone="text-accent-soft" />
              <Box title="Tempo" text={text.monitoring.tempo} tone="text-accent-soft" />
              <Box title="Grafana" text={text.monitoring.grafana} tone="text-accent-soft" />
            </div>
            <span className={`${labelClasses} mt-1`}>{text.monitoring.collect}</span>
            <Box title="Promtail" text={text.monitoring.promtail} tone="text-accent-soft" />
          </Column>

          <Column title={text.files.title} tag={text.shared} host={HOSTS.files} tone="text-link-info">
            <Box title={text.files.server} text={text.files.serverText} tone="text-link-info" />
            <span className={`${labelClasses} mt-1`}>{text.files.common}</span>
            <Box title={text.files.copy} text={text.files.copyText} tone="text-link-info" />
          </Column>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-[18px] gap-y-2 rounded-xl border border-line-default bg-surface-panel px-[22px] py-3.5">
          <span className="rounded-sm bg-accent px-2.5 py-[5px] font-mono text-[13px] font-semibold text-accent-content">
            {CI_BADGE}
          </span>
          <Text
            as="p"
            font={FontFamily.Sans}
            className="min-w-0 flex-1 basis-[320px] text-[15px] leading-[1.6] text-content-muted"
          >
            <b className="font-medium text-content-primary">{text.ci.text}</b> {text.ci.detail}{' '}
            <code className="font-mono text-accent-soft">routing.caddy</code> {text.ci.and}{' '}
            <code className="font-mono text-accent-soft">init.sql</code>.
          </Text>
          <Text
            as="span"
            font={FontFamily.Mono}
            className="ml-auto flex flex-wrap items-center gap-2.5 text-[13px] text-content-muted"
          >
            {text.ci.push} <i className="text-accent-soft not-italic">→</i> {text.ci.build}{' '}
            <i className="text-accent-soft not-italic">→</i> {text.ci.image}{' '}
            <i className="text-accent-soft not-italic">→</i> {text.ci.deploy}
          </Text>
        </div>
      </div>
    </Card>
  )
}
