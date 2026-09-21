import { MessageSquareText } from 'lucide-react'
import { useRef, useState } from 'react'
import {
  Button,
  ButtonVariant,
  Chat,
  ChatLauncher,
  ChatMessageRole,
  FontFamily,
  FontSize,
  FontWeight,
  GuideCard,
  GuideHighlight,
  GuideShade,
  Terminal,
  TerminalLineKind,
  Text,
  TextColor,
  type ChatMessage,
  type GuideHighlightRect,
  type TerminalLine,
} from '@/design-system'
import type { DocEntry } from '../types'

const guideSteps = [
  {
    title: 'Poznaj bibliotekę komponentów',
    body: 'Ten przewodnik pokazuje komponenty Guide: kartę kroku, spotlight i tło.',
    translation: 'This guide shows the Guide components: the step card, spotlight and shade.',
    actionLabel: 'Pokaż cel przewodnika →',
  },
  {
    title: 'To już wszystko',
    body: 'Kolejne komponenty dojdą razem z pełną ramą IDE.',
  },
]

function GuideDemo() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState<GuideHighlightRect | null>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const current = guideSteps[step]
  const isLast = step === guideSteps.length - 1

  function openGuide() {
    const target = targetRef.current
    if (target) {
      const r = target.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    setStep(0)
    setOpen(true)
  }

  if (!current) return null

  return (
    <>
      <div className="flex flex-col gap-3">
        <Text size={FontSize.Small} color={TextColor.Dim}>
          Statyczny podgląd karty (position: static — w prawdziwym użyciu to position: fixed):
        </Text>
        <GuideCard
          style={{ position: 'static' }}
          step={step + 1}
          totalSteps={guideSteps.length}
          title={current.title}
          translation={current.translation}
          actionLabel={current.actionLabel}
          onAction={() => targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          isLastStep={isLast}
          onSkip={() => setStep(0)}
          onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
          onNext={() => setStep((s) => (isLast ? 0 : s + 1))}
        >
          {current.body}
        </GuideCard>
        <div ref={targetRef} className="self-start">
          <Button variant={ButtonVariant.Outline} onClick={openGuide}>
            ▷ Oprowadź mnie (pełna nakładka)
          </Button>
        </div>
      </div>

      {open && (
        <>
          <GuideShade onClick={() => setOpen(false)} />
          {rect && <GuideHighlight rect={rect} />}
          <GuideCard
            step={step + 1}
            totalSteps={guideSteps.length}
            title={current.title}
            translation={current.translation}
            actionLabel={current.actionLabel}
            onAction={() => targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            isLastStep={isLast}
            onSkip={() => setOpen(false)}
            onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
            onNext={() => (isLast ? setOpen(false) : setStep((s) => s + 1))}
            modal
            anchor={rect ?? undefined}
            style={rect ? undefined : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {current.body}
          </GuideCard>
        </>
      )}
    </>
  )
}

const terminalCommands = ['help', 'about', 'projects', 'stack', 'contact']

function TerminalDemo() {
  const [open, setOpen] = useState(true)
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, content: 'Cześć! Możesz poruszać się po portfolio także stąd.\nWpisz help lub wybierz komendę poniżej.' },
  ])
  const nextId = useRef(1)

  function run(command: string) {
    const line = (content: string, kind?: TerminalLineKind): TerminalLine => ({ id: nextId.current++, kind, content })
    const echo = line(`visitor@portfolio:~$ ${command}`, TerminalLineKind.Command)
    const key = command.toLowerCase()
    if (key === 'clear') {
      setLines([])
    } else if (key === 'help') {
      const help =
        terminalCommands.map((c) => c.padEnd(13) + '— komenda demo').join('\n') +
        '\n\n↑/↓ historia · Tab podpowiedzi · Esc zwiń'
      setLines((l) => [...l, echo, line(help)])
    } else if (terminalCommands.includes(key)) {
      setLines((l) => [...l, echo, line(`Otwarto: ${key}.`)])
    } else {
      setLines((l) => [...l, echo, line(`Nieznana komenda: ${command}. Wpisz help.`, TerminalLineKind.Error)])
    }
  }

  return open ? (
    <Terminal
      aria-label="Terminal portfolio"
      className="w-full"
      lines={lines}
      suggestions={terminalCommands}
      completions={[...terminalCommands, 'clear']}
      onCommand={run}
      onClose={() => setOpen(false)}
    />
  ) : (
    <Button variant={ButtonVariant.Outline} onClick={() => setOpen(true)}>
      &gt;_ Otwórz terminal
    </Button>
  )
}

const chatTopics = [
  'Jakie ma doświadczenie?',
  'W jakich technologiach pracuje?',
  'Opowiedz o projekcie Portfolio',
  'Jak nawiązać współpracę?',
]

function ChatDemo() {
  const [open, setOpen] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: ChatMessageRole.Assistant,
      content:
        'Cześć! Pomogę Ci poznać doświadczenie, technologie i projekty Wiktora. Wybierz pytanie lub wpisz własne.\n\nTo podgląd czatu — na razie pokazuję przygotowane odpowiedzi.',
    },
  ])
  const nextId = useRef(1)

  function send(text: string) {
    const q = text.toLocaleLowerCase('pl')
    const reply = (content: string, withAction: boolean): ChatMessage => ({
      id: nextId.current++,
      role: ChatMessageRole.Assistant,
      content,
      action: withAction ? { label: 'Zobacz w portfolio →', onAction: () => setOpen(false) } : undefined,
    })
    const user: ChatMessage = { id: nextId.current++, role: ChatMessageRole.User, content: text }
    const answer = /współprac|kontakt/.test(q)
      ? reply(
          'W sprawie współpracy najlepiej skontaktować się bezpośrednio z Wiktorem. W portfolio znajdziesz formularz kontaktowy i dane kontaktowe.',
          true,
        )
      : /doświadcze|pracow/.test(q)
        ? reply(
            'Wiktor rozwija aplikacje .NET, integruje systemy i pracuje z bazami danych. W jego doświadczeniu są B3 Consulting Poland, LSI Software, GECOS i Moje Bambino.',
            true,
          )
        : reply(
            'W tym podglądzie mogę pokazać informacje o doświadczeniu, technologiach, projekcie Portfolio i kontakcie.',
            false,
          )
    setMessages((m) => [...m, user, answer])
  }

  return open ? (
    <Chat
      aria-label="Asystent portfolio"
      style={{ position: 'static' }}
      title="Asystent portfolio"
      subtitle="Poznaj doświadczenie Wiktora"
      placeholder="O co chcesz zapytać?"
      note="Podgląd interakcji · odpowiedzi demonstracyjne, bez połączenia z AI."
      topics={chatTopics}
      messages={messages}
      onSend={send}
      onClose={() => setOpen(false)}
    />
  ) : (
    <ChatLauncher
      icon={<MessageSquareText strokeWidth={1.5} />}
      style={{ position: 'static' }}
      onClick={() => setOpen(true)}
    >
      Zapytaj o mnie
    </ChatLauncher>
  )
}

function ChatLauncherDemo() {
  const [clicks, setClicks] = useState(0)
  return (
    <ChatLauncher
      icon={<MessageSquareText strokeWidth={1.5} />}
      style={{ position: 'static' }}
      onClick={() => setClicks((n) => n + 1)}
    >
      {clicks ? `Zapytaj o mnie (${clicks})` : 'Zapytaj o mnie'}
    </ChatLauncher>
  )
}

export const overlayEntries: DocEntry[] = [
  {
    id: 'guide',
    api: {
      folder: 'Guide',
      interfaces: ['GuideCardProps', 'GuideHighlightProps', 'GuideHighlightRect', 'GuideShadeProps'],
    },
    usage: `import { GuideCard, GuideHighlight, GuideShade } from './design-system'

<GuideShade onClick={close} />
<GuideHighlight rect={targetRect} />
<GuideCard
  step={1}
  totalSteps={5}
  title="Polski albo angielski"
  translation="Polish or English"
  actionLabel="Przełącz język →"
  onAction={switchLanguage}
  onSkip={close}
  onNext={next}
  modal // fokus na „Dalej", Esc = Pomiń, Tab krąży po przyciskach karty
  anchor={targetRect} // karta ustawia się przy elemencie (po prawej, pod lub nad nim)
>
  Przełącznik języka jest na pasku statusu.
</GuideCard>`,
    name: 'Guide',
    category: 'overlays',
    summary: 'Przewodnik krok po kroku: karta, spotlight na elemencie i przyciemnione tło.',
    note: '.portfolio-tour-card/-shade/-highlight (przewodnik „Oprowadź mnie") — karta, tło i podświetlenie; cele i kroki dostarcza aplikacja.',
    preview: (
      <div className="flex flex-col gap-1.5">
        <Text size={FontSize.XXSmall} font={FontFamily.Mono} className="tracking-[.07em] text-[#bf94b8]">
          PRZEWODNIK / 1 Z 2
        </Text>
        <Text size={FontSize.XLarge} color={TextColor.Heading}>
          Poznaj bibliotekę
        </Text>
      </div>
    ),
    Demo: GuideDemo,
  },
  {
    id: 'terminal',
    api: { folder: 'Terminal', interfaces: ['TerminalProps', 'TerminalLabels', 'TerminalLine'] },
    usage: `import { Terminal, TerminalLineKind } from './design-system'

<Terminal
  aria-label="Terminal portfolio"
  lines={lines}
  suggestions={['help', 'about', 'projects']}
  completions={['help', 'about', 'projects', 'clear']}
  onCommand={(command) => run(command)}
  onClose={() => setOpen(false)}
/>

// ukrywanie bez utraty historii i wyjścia: open zamiast warunkowego renderowania
<Terminal open={isOpen} onClose={() => setOpen(false)} /* ...pozostałe propsy */ />

// linia błędu dopisana przez aplikację
{ id: 7, kind: TerminalLineKind.Error, content: 'Nieznana komenda: foo' }`,
    name: 'Terminal',
    category: 'overlays',
    summary: 'Dolny panel konsoli z historią komend, uzupełnianiem Tab i zmianą wysokości.',
    note: '.portfolio-terminal — Esc zamyka, wysokość zmienia się przeciąganiem lub strzałkami na uchwycie. Komendy interpretuje aplikacja.',
    preview: (
      <div className="w-full">
        <Text as="div" size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Accent}>
          visitor@portfolio:~$ <span className="text-terminal-text">help</span>
        </Text>
        <Text as="div" size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Dim}>
          about · projects · stack
        </Text>
      </div>
    ),
    Demo: TerminalDemo,
  },
  {
    id: 'chat',
    api: { folder: 'Chat', interfaces: ['ChatProps', 'ChatLabels', 'ChatMessage'] },
    usage: `import { Chat, ChatMessageRole } from './design-system'

<Chat
  aria-label="Asystent portfolio"
  title="Asystent portfolio"
  subtitle="Poznaj doświadczenie Wiktora"
  topics={['Jakie ma doświadczenie?']}
  messages={messages}
  onSend={(text) => reply(text)}
  onClose={() => setOpen(false)}
/>

// ukrywanie bez utraty wpisanego tekstu: open zamiast warunkowego renderowania
<Chat open={isOpen} onClose={() => setOpen(false)} /* ...pozostałe propsy */ />

// wiadomość asystenta z akcją
{
  id: 2,
  role: ChatMessageRole.Assistant,
  content: 'Sekcja Doświadczenie opisuje obowiązki w każdej firmie.',
  action: { label: 'Zobacz w portfolio →', onAction: goToExperience },
}`,
    name: 'Chat',
    category: 'overlays',
    summary: 'Okno asystenta z bąbelkami, chipami z pytaniami i polem wiadomości.',
    note: '.ai-chat — Enter wysyła, Shift+Enter nowa linia, Esc zamyka. Odpowiedzi generuje aplikacja.',
    preview: (
      <div className="flex w-full flex-col gap-1.5">
        <Text
          as="div"
          size={FontSize.XSmall}
          className="max-w-[80%] rounded-[3px_12px_12px_12px] border border-border bg-hover px-2.5 py-1.5 text-text-body"
        >
          Cześć! Pomogę Ci…
        </Text>
        <Text
          as="div"
          size={FontSize.XSmall}
          className="max-w-[80%] self-end rounded-[12px_3px_12px_12px] border border-[#62405a] bg-[#3b2e39] px-2.5 py-1.5 text-[#e6dce4]"
        >
          Jakie ma doświadczenie?
        </Text>
      </div>
    ),
    Demo: ChatDemo,
  },
  {
    id: 'chatlauncher',
    api: { folder: 'ChatLauncher', interfaces: ['ChatLauncherProps'] },
    usage: `import { Chat, ChatLauncher } from './design-system'

<Chat open={open} /* ... */ onClose={() => setOpen(false)} />
{!open && (
  <ChatLauncher
    icon={<MessageSquareText />}
    aria-expanded={false}
    style={{ bottom }} // podniesienie nad terminal
    onClick={() => setOpen(true)}
  >
    Zapytaj o mnie
  </ChatLauncher>
)}`,
    name: 'ChatLauncher',
    category: 'overlays',
    summary: 'Pływający przycisk „Zapytaj o mnie", który otwiera okno czatu.',
    note: '.ai-chat-toggle — pozycja fixed w prawym dolnym rogu; offset bottom jest animowany (180 ms). Wymiary i kolory zmierzone w prototypie.',
    preview: (
      <Text
        as="div"
        size={FontSize.Small}
        weight={FontWeight.Medium}
        className="flex items-center gap-[9px] rounded-[9px] border border-launcher-border bg-launcher-bg px-4 py-[11px] text-launcher-text shadow-[0_6px_24px_rgba(0,0,0,.267)]"
      >
        <MessageSquareText className="size-[18px]" strokeWidth={1.5} />
        Zapytaj o mnie
      </Text>
    ),
    Demo: ChatLauncherDemo,
  },
]
