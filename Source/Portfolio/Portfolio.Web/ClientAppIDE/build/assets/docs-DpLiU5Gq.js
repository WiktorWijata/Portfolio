import{j as e,c as N,T as r,a as l,F as y,b as i,P as M,d as k,r as x,I as T,e as K,C as v,f as Ae,L as O,g as D,h as be,i as B,D as me,k as ue,l as X,B as De,m as U,n as st,G as lt,o as ct,p as xe,q as Ee,S as ae,s as j,t as S,u as He,R as te,M as We,v as V,w as J,x as dt,y as pt,z as ve,A as Se,E as mt,H as ie,J as Te,K as ut,N as re,O as xt,Q as ht,U as yt,V as ft,W as bt,X as Ce,Y as gt,Z as ge,_ as Z,$ as ke,a0 as ne,a1 as Oe,a2 as he,a3 as ye,a4 as kt,a5 as zt,a6 as wt,a7 as jt,a8 as vt,a9 as St,aa as ze,ab as Ne,ac as Tt,ad as Ct,ae as Nt,af as se,ag as Bt,ah as Ge,ai as Be,aj as Lt,ak as Pt}from"./ChatLauncher-B1JCatM7.js";const L={Default:"default",Wide:"wide"},Mt={[L.Default]:"max-w-[900px]",[L.Wide]:"max-w-[1280px]"};function E({size:t=L.Default,className:n="",...o}){return e.jsx("div",{className:["mx-auto w-full px-8",Mt[t],n].join(" "),...o})}const Ft=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],_t=N("check",Ft);const It=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Rt=N("copy",It);const At=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],Dt=N("database",At);const Et=[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M12 10v2",key:"hh53o1"}],["path",{d:"M16 10v6",key:"1d6xys"}]],$e=N("folder-kanban",Et);const Ht=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Wt=N("globe",Ht);const Ot=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],we=N("message-square",Ot);const Gt=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]],$t=N("panel-left-open",Gt);const Kt=[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]],Xt=N("route",Kt);const Vt=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]],Zt=N("server",Vt);const Ut=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],Ke=N("terminal",Ut);const Jt=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Xe=N("user",Jt),I={Neutral:"neutral",Accent:"accent"},qt={[I.Neutral]:"border-border-6",[I.Accent]:"border-accent"},Yt={[I.Neutral]:l.Muted,[I.Accent]:l.AccentLight};function R({tone:t=I.Neutral,className:n="",children:o,...a}){return e.jsx(r,{...a,size:i.XSmall,font:y.Mono,color:Yt[t],className:["inline-flex items-center rounded-sm border px-2.5 py-1",qt[t],n].join(" "),children:o})}const C={Muted:"muted",Accent:"accent"},fe={Sm:"sm",Md:"md"},Qt={[C.Muted]:l.Dimmer,[C.Accent]:l.AccentLight},Le={[fe.Sm]:{fontSize:i.Nano,tracking:"tracking-[.09em]"},[fe.Md]:{fontSize:i.Micro,tracking:"tracking-[.11em]"}};function A({tone:t=C.Muted,size:n=fe.Md,className:o="",children:a,...c}){return e.jsx(r,{...c,size:Le[n].fontSize,font:y.Mono,color:Qt[t],className:["uppercase",Le[n].tracking,o].join(" "),children:a})}const en=[{version:"0.24.0",date:"2026-09-21",title:"Porządek w szarościach",changed:["Prawie identyczne szarości zastąpione istniejącymi tokenami tej samej roli (tekst, tło, linia): 32 literały [#hex] w komponentach i aplikacji; największe przesunięcie to 3/255 na kanał","Tokeny group-line i panel-line scalone z bar-subtle i chip-line, status-divider z border-6, status-version z text-dim-2, text-heading-2 z text-heading, surface z list (różnica do 1/255)"]},{version:"0.23.0",date:"2026-09-21",title:"Etykiety Gallery i SolutionExplorer jako props",added:["Gallery: prop labels (GalleryLabels) — nazwy dostępne przycisków i kropek, opis roli karuzeli oraz teksty placeholdera; brakujące pola mają polskie wartości domyślne","SolutionExplorer: prop labels (SolutionExplorerLabels) — tytuł nagłówka i nazwa dostępna drzewa plików"]},{version:"0.22.0",date:"2026-09-21",title:"Etykiety Terminal i Chat jako props, DataCard z licznikiem",added:["Terminal: prop labels (TerminalLabels) — tytuł, nazwy przycisku zamykania, uchwytu wysokości i pola komendy; brakujące pola mają polskie wartości domyślne","Chat: prop labels (ChatLabels) — nazwy przycisku zamykania, pola wiadomości i przycisku wysyłania","DataCard: prop count — licznik w małej plakietce na pasku nagłówka"],changed:["Terminal: pole komendy ma id generowane przez useId (dwa terminale na stronie nie kolidują)","Wnętrza uporządkowane bez zmiany wyglądu: wspólny przycisk zamykania Terminal/Chat, wspólny pasek nagłówka List/InfoCard/DataCard (pasek InfoCard ma teraz 29,6 px jak w prototypie), Tabs podzielone na hook, animator i czyste funkcje"]},{version:"0.21.0",date:"2026-09-21",title:"Tokeny wspólnych kolorów i API zamiast nadpisań",added:["Tokeny kolorów powtarzanych w wielu komponentach: text-label, text-tag, text-panel-title, text-lead, text-item, text-row-title, text-caption, text-field-label, terminal-text, close-button (+ -hover i -hover-bg), chip-line, bar, bar-subtle, panel-line, group-line, card-line, inset, input-border, explorer-hover","Token shadow-card-raised i Panel: prop raised — mocniejszy cień panelu","Button: rozmiar Card (40 px, promień 5 px) — przycisk w stopce karty","RailButton: prop iconSize (RailButtonIconSize: Md 16 px, Lg 17 px, Xl 18 px)"],changed:["Gallery i SolutionExplorer nie ustalają już własnej szerokości ani marginesów — układ należy do rodzica (w przykładzie ustawiamy je klasą className)","Komponenty używają tokenów zamiast powtarzanych literałów kolorów (wygląd bez zmian)"]},{version:"0.20.0",date:"2026-09-21",title:"StatusBarButton jako odnośnik",added:["StatusBarButton: prop href (oraz target i rel) — renderuje odnośnik <a> wyglądający jak przycisk paska, np. link do dokumentacji"]},{version:"0.19.0",date:"2026-09-21",title:"Elementy strony Contact",added:["Button: rozmiar Xs (odnośnik-przycisk 7×12 px, mono 12 px — linki społecznościowe) i Lg (wysłanie formularza: 12×18 px, sans 13 px)"],changed:["Input i Textarea dopasowane do zmierzonych pól formularza kontaktowego: tło #202226, ramka #464850, padding 12 px, etykieta 13 px z odstępem 8 px, obrys 2 px w kolorze akcentu przy fokusie"]},{version:"0.18.0",date:"2026-09-21",title:"Elementy strony Experience",added:["List: prop tag w ListItem — ramkowana etykieta (np. zakres dat), która zmienia wygląd razem z wierszem (hover i stan aktywny)","Chip: wariant Position — znacznik technologii w opisie stanowiska (mono 11,5 px, padding 4/10 px)"],changed:["ListItem (Detail) dopasowany do prototypu: tytuł #a4a8ae, podtytuł mono 11 px, interlinia normal; w wąskim kontenerze wiersze zajmują całą szerokość, a aktywny ma akcentową linię u góry"]},{version:"0.17.0",date:"2026-09-21",title:"Elementy strony Stack",added:["List: ListItemVariant.Filter — wiersz filtra kategorii (mono 12 px); w wąskim kontenerze układa się w rząd z akcentową linią u góry","SplitPanel: SplitPanelCollapseAt.Container700 — zwijanie według szerokości kontenera (@container), jak Stack w prototypie"],changed:["Chip Default dopasowany do zmierzonego chipa Stack: mono 12,5 px, promień 3 px, ikona może być obrazkiem <img>","List: pasek nagłówka (tło, padding, plakietka licznika) i wiersz wyszukiwania (linia pod spodem) zgodne z prototypem"]},{version:"0.16.0",date:"2026-09-21",title:"Chip Tech",added:["Chip: wariant Tech (mono 11 px, padding 5/9 px) — znaczniki technologii na stronie projektu"],changed:["Gallery: teksty (nagłówek, placeholder, licznik) mają interlinię normal, jak w prototypie"]},{version:"0.15.0",date:"2026-09-21",title:"Cień karty z poświatą",changed:["Token shadow-card zawiera cienką poświatę u góry (inset 1 px), zgodnie z prototypem — dotyczy Panel"]},{version:"0.14.0",date:"2026-09-21",title:"DataCard, warianty Chip i Button Secondary",added:["DataCard: karta z paskiem nagłówka (tytuł + akcja) oraz DataCardAction, DataCardList i DataCardRow (wiersz z tytułem, podtytułem i plakietką)","Chip: prop variant (ChipVariant) — Default, Mono (11,5 px) i Compact (10,5 px)",'Button: wariant Secondary (np. „Pobierz CV ↓") i prop href, który renderuje odnośnik wyglądający jak przycisk'],changed:["Button Md dopasowany do zmierzonych przycisków strony: font mono 12 px i padding 14 px (wcześniej 13 px i 16 px); etykieta pogrubiona tylko w wariancie Primary"]},{version:"0.13.0",date:"2026-09-21",title:"Link: wariant Info",added:["Link: prop tone (LinkTone) — Accent (domyślny) i Info (niebieski, podkreślany po najechaniu)","Tokeny link-info i link-info-hover"]},{version:"0.12.0",date:"2026-09-21",title:"Tło z poświatą i kropkami",added:["Utility bg-dotted-glow: tło strony z akcentową poświatą i kropkowaną siatką (Projects, Experience, pusty edytor)"]},{version:"0.11.0",date:"2026-09-21",title:"Przewodnik jako okno modalne",added:['GuideCard: prop modal — fokus na „Dalej" po każdym kroku, Esc = Pomiń, Tab krąży po przyciskach karty, powrót fokusu po zamknięciu',"GuideCard: prop anchor — karta ustawia się przy elemencie (po prawej, pod lub nad nim) i przelicza pozycję przy zmianie okna","Text: prop ref do wyrenderowanego elementu"],changed:["GuideCard: aria-modal ustawiane tylko z modal (statyczny podgląd nie jest oknem modalnym)"]},{version:"0.10.0",date:"2026-09-21",title:"Link i rozmiar Sm w Button",added:["Link: tekstowy odnośnik w kolorze akcentu — <a> z href albo przycisk akcji bez href; opcja underline","Button: prop size (ButtonSize) — Md (44 px, mono 13) i kompaktowy Sm (8×12 px, sans 12)","Tokeny link i link-hover"],changed:["Guide: przyciski Pomiń, Wstecz i Dalej używają Button Sm, a link akcji — Link",'Chat: akcja „Zobacz w portfolio →" używa Link',"Button: focus-visible z obrysem akcentu"],fixed:["Button: kursor pointer (Tailwind v4 domyślnie zostawia strzałkę na przyciskach)"]},{version:"0.9.0",date:"2026-09-21",title:"ChatLauncher i prop open w Chat",added:['ChatLauncher: pływający przycisk „Zapytaj o mnie" otwierający okno czatu, z animowanym offsetem bottom',"Chat: prop open — ukrywa okno, zachowując wpisany tekst; po ponownym otwarciu przewija na dół i ustawia fokus na polu wiadomości","Tokeny launcher-*: tło, obramowanie i kolor tekstu przycisku ChatLauncher"]},{version:"0.8.0",date:"2026-09-21",title:"Terminal: zachowanie stanu po zamknięciu",added:["Terminal: prop open — ukrywa panel, zachowując historię komend, wysokość i wyjście; po ponownym otwarciu przewija na dół i ustawia fokus na prompcie"]},{version:"0.7.0",date:"2026-09-21",title:"Kolory stanu w RailButton",added:["RailButton: prop accent (RailButtonAccent) — kolor stanu active: Accent, Explorer, Success, Assistant","Tokeny rail-success i rail-assistant: tła aktywnych przycisków terminala i czatu"]},{version:"0.6.0",date:"2026-09-21",title:"TitleBar i stopka explorera",added:["TitleBar: górny pasek okna IDE z logo, tytułem i przyciskami TitleBarButton (tony Run i Link)","SolutionExplorer: prop footer — element przypięty do dołu explorera",'Tokeny run-*: kolory niebieskiego przycisku „uruchom" wraz ze stanami hover i focus']},{version:"0.5.0",date:"2026-09-21",title:"StatusBar",added:["StatusBar: dolny pasek okna IDE z elementami StatusBarItem, StatusBarButton, StatusBarDivider, StatusBarSpacer i StatusBarSwitch","Tokeny statusu: status-branch, status-success, status-path, status-action, status-version, status-divider, lang-active-text"]},{version:"0.4.1",date:"2026-09-21",title:"Opisy propsów w typach komponentów",changed:["Wszystkie pliki typów komponentów mają polskie opisy propsów (JSDoc) i wartości domyślne (@default)","Wartości enumów (np. ButtonVariant, FontSize) mają opisy przy każdym członku"]},{version:"0.4.0",date:"2026-09-21",title:"Nawigacja: Menu, Tabs i Container",added:["Container: wariant ContainerSize.Wide (1280px)","Utility scrollbar-subtle: cienki pasek widoczny po najechaniu"],changed:["Menu przewija listę wewnątrz karty, a nagłówek zostaje przypięty","Tabs: przeciąganie i skróty Alt+Shift+strzałki działają tylko z onReorder","Tab bez onClose nie ma przycisku zamykania (zakładka nawigacyjna)"]},{version:"0.3.0",date:"2026-09-20",title:"Terminal, Chat i Text",added:["Terminal: historia ↑/↓, uzupełnianie Tab, Esc zamyka, zmiana wysokości przeciąganiem lub strzałkami","Chat: okno asystenta z bąbelkami, chipami z pytaniami, Enter wysyła, Shift+Enter nowa linia","Text: rozmiar (FontSize), kolor (TextColor), font (FontFamily) i grubość (FontWeight) zamiast wartości w px"],changed:["Komponenty renderują swój tekst przez Text; wygląd bez zmian (sprawdzone porównaniem computed style)","Nazwa biblioteki: OrchIDE UI"],fixed:["Token --shadow-tour zgodny z prototypem (0 16px 60px, alfa .533)"]},{version:"0.2.0",date:"2026-09-18",title:"Galeria, przewodnik i przyciski rail",added:["Gallery: karuzela z placeholderami, kropkami i obsługą klawiatury","Guide: GuideCard, GuideHighlight i GuideShade","RailButton wydzielony z IconButton (przycisk nawigacji z pionową etykietą)","IconButtonSize: kompaktowy rozmiar Sm","Container i InfoCard"],changed:["Guide: hover na przyciskach Pomiń, Wstecz i Dalej"]},{version:"0.1.0",date:"2026-09-17",title:"Pierwsza fala komponentów",added:["Tokeny w Tailwind v4 (@theme): kolory, typografia, promienie, cienie, breakpointy","Button, Chip, Badge, Label, Panel, Input, Textarea, SearchField, IconButton","List z wyszukiwarką, SplitPanel, Menu, Tabs z przeciąganiem, SolutionExplorer"],fixed:["SolutionExplorer: chevron przełącza folder, a klik w wiersz zaznacza plik lub folder","SolutionExplorer: prawidłowe wcięcia zagnieżdżonych elementów i przyciski rozwiń/zwiń wszystko"]}],tn=[{key:"added",label:"Dodano"},{key:"changed",label:"Zmieniono"},{key:"fixed",label:"Poprawiono"}];function nn(t){return new Date(t).toLocaleDateString("pl-PL",{day:"numeric",month:"long",year:"numeric"})}function on({release:t,latest:n}){return e.jsxs(M,{className:"flex flex-col gap-5 p-6",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-x-3 gap-y-1",children:[e.jsxs(R,{tone:n?I.Accent:I.Neutral,children:["v",t.version]}),e.jsx(r,{as:"h2",size:i.XXLarge,weight:k.Medium,color:l.Heading,children:t.title}),e.jsx(r,{size:i.Small,font:y.Mono,color:l.Faint,className:"sm:ml-auto",children:nn(t.date)})]}),tn.map(({key:o,label:a})=>{const c=t[o];return c?.length?e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(A,{tone:o==="added"?C.Accent:C.Muted,children:a}),e.jsx("ul",{className:"flex list-disc flex-col gap-1.5 pl-5 marker:text-text-faint",children:c.map(s=>e.jsx("li",{children:e.jsx(r,{size:i.Medium,color:l.Body,className:"leading-[1.6]",children:s})},s))})]},o):null})]})}function an(){return e.jsxs("div",{className:"flex max-w-[860px] flex-col gap-8",children:[e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(A,{tone:C.Accent,children:"OrchIDE UI / Changelog"}),e.jsx(r,{as:"h1",size:i.Heading,color:l.Heading,className:"leading-[1.15] tracking-[-.03em]",children:"Changelog"}),e.jsx(r,{as:"p",size:i.XLarge,color:l.Muted,className:"leading-[1.7]",children:"Historia zmian biblioteki, od najnowszej wersji."})]}),e.jsx("div",{className:"flex flex-col gap-5",children:en.map((t,n)=>e.jsx(on,{release:t,latest:n===0},t.version))})]})}const rn=`import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { BadgeTone, type BadgeProps } from './Badge.types'

const toneClasses: Record<BadgeTone, string> = {
  [BadgeTone.Neutral]: 'border-border-6',
  [BadgeTone.Accent]: 'border-accent',
}

const toneColors: Record<BadgeTone, TextColor> = {
  [BadgeTone.Neutral]: TextColor.Muted,
  [BadgeTone.Accent]: TextColor.AccentLight,
}

export function Badge({ tone = BadgeTone.Neutral, className = '', children, ...rest }: BadgeProps) {
  return (
    <Text
      {...rest}
      size={FontSize.XSmall}
      font={FontFamily.Mono}
      color={toneColors[tone]}
      className={['inline-flex items-center rounded-sm border px-2.5 py-1', toneClasses[tone], className].join(' ')}
    >
      {children}
    </Text>
  )
}
`,sn=`import type { ButtonHTMLAttributes } from 'react'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import { ButtonSize, ButtonVariant, type ButtonProps } from './Button.types'

const variantClasses: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'bg-accent text-on-accent hover:bg-accent-hover border border-transparent',
  [ButtonVariant.Outline]: 'bg-transparent border border-border-5 hover:bg-cta-hover hover:border-accent-dark',
  [ButtonVariant.Secondary]:
    'bg-hover text-text-body border border-chip-line hover:bg-cta-hover hover:border-accent hover:text-accent-light',
}

// The label colour of Outline depends on the size: page buttons use the primary text colour,
// the compact ones (cards, overlays) the body colour.
const sizeClasses: Record<ButtonSize, { box: string; outlineText: string }> = {
  [ButtonSize.Md]: { box: 'min-h-11 px-3.5 rounded-sm', outlineText: 'text-text' },
  [ButtonSize.Sm]: { box: 'px-3 py-2 rounded-md', outlineText: 'text-text-body' },
  [ButtonSize.Card]: { box: 'min-h-10 px-3.5 rounded-md', outlineText: 'text-text' },
  [ButtonSize.Xs]: { box: 'px-3 py-[7px] rounded-sm', outlineText: 'text-text-body' },
  [ButtonSize.Lg]: { box: 'px-[18px] py-3 rounded-md', outlineText: 'text-text' },
}

/** A button — or, with \`href\`, a link that looks like one. Page buttons: 44 px high, mono 12 px. */
export function Button({
  variant = ButtonVariant.Primary,
  size = ButtonSize.Md,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const isMono = size === ButtonSize.Md || size === ButtonSize.Xs || size === ButtonSize.Card
  const isLg = size === ButtonSize.Lg
  const classes = [
    'inline-flex items-center justify-center gap-2 cursor-pointer no-underline',
    sizeClasses[size].box,
    'transition-[background-color,color,border-color] duration-[140ms] ease-out',
    'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    variant === ButtonVariant.Outline ? sizeClasses[size].outlineText : '',
    className,
  ].join(' ')
  const label = (
    <Text
      size={isLg ? FontSize.Medium : FontSize.Small}
      font={isMono ? FontFamily.Mono : FontFamily.Sans}
      weight={
        (size === ButtonSize.Md || size === ButtonSize.Card || isLg) && variant === ButtonVariant.Primary
          ? FontWeight.Medium
          : undefined
      }
      className={size === ButtonSize.Xs || isLg ? 'leading-[normal]' : undefined}
    >
      {children}
    </Text>
  )

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...rest}>
        {label}
      </a>
    )
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {label}
    </button>
  )
}
`,ln=`import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { CloseButton } from '../../internal/CloseButton'
import { useReopenFocus } from '../../internal/hooks/useReopenFocus'
import { useScrollToEnd } from '../../internal/hooks/useScrollToEnd'
import { Link } from '../Link'
import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../Text'
import { DEFAULT_LABELS, DEFAULT_MAX_LENGTH } from './Chat.consts'
import { ChatMessageRole, type ChatProps } from './Chat.types'

const bubbleClasses: Record<ChatMessageRole, string> = {
  [ChatMessageRole.Assistant]: 'rounded-[3px_12px_12px_12px] border-border bg-hover',
  [ChatMessageRole.User]: 'self-end rounded-[12px_3px_12px_12px] border-[#62405a] bg-[#3b2e39] text-[#e6dce4]',
}

const focusRing = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

/**
 * Assistant chat window: Enter sends, Shift+Enter inserts a newline, Esc closes. It is positioned \`fixed\` in
 * the bottom-right corner; override with \`style\` / \`className\` to place it elsewhere. Producing replies is
 * the caller's job.
 */
export function Chat({
  title,
  subtitle,
  avatar = 'AI',
  messages,
  topics = [],
  placeholder,
  note,
  labels,
  onSend,
  onClose,
  maxLength = DEFAULT_MAX_LENGTH,
  open = true,
  className = '',
  ...rest
}: ChatProps) {
  const strings = { ...DEFAULT_LABELS, ...labels }
  const [value, setValue] = useState('')
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useScrollToEnd(logRef, messages)
  useReopenFocus(open, logRef, inputRef)

  function send(raw: string) {
    const text = raw.trim()
    if (!text) return
    setValue('')
    onSend(text)
    inputRef.current?.focus()
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    send(value)
  }

  function onInputKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      send(value)
    }
  }

  function onPanelKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  return (
    <Text
      {...rest}
      as="section"
      size={FontSize.Large}
      font={FontFamily.Sans}
      color={TextColor.Body}
      role="dialog"
      hidden={!open}
      onKeyDown={onPanelKeyDown}
      className={[
        'fixed right-6 bottom-12 z-[41] flex h-[min(580px,calc(100dvh-100px))] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden',
        'rounded-3xl border border-[#514653] bg-list leading-[1.6] shadow-[0_18px_65px_rgba(0,0,0,.467)]',
        className,
      ].join(' ')}
    >
      <header className="flex flex-none items-center gap-2.5 border-b border-border bg-hover px-3 py-2">
        <Text
          size={FontSize.Small}
          font={FontFamily.Mono}
          className="grid size-[34px] flex-none place-items-center rounded-xl bg-accent/[.094] text-[#d7a2cc]"
        >
          {avatar}
        </Text>
        <div className="flex-1">
          <Text as="strong" size={FontSize.Large} weight={FontWeight.Medium} className="block text-[#ece8ee]">
            {title}
          </Text>
          {subtitle && (
            <Text as="small" size={FontSize.XSmall} className="text-[#9b98a4]">
              {subtitle}
            </Text>
          )}
        </div>
        <CloseButton aria-label={strings.closeButton} onClick={onClose} />
      </header>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-auto overscroll-contain p-[18px]"
      >
        {messages.map((m) => (
          <Text
            as="div"
            key={m.id}
            className={[
              'max-w-[94%] border px-3.5 py-3 [overflow-wrap:anywhere] whitespace-pre-wrap',
              bubbleClasses[m.role],
            ].join(' ')}
          >
            {m.content}
            {m.action && (
              <div className="mt-2.5 flex">
                <Link size={FontSize.Small} className="[&>span]:leading-[normal]" onClick={m.action.onAction}>
                  {m.action.label}
                </Link>
              </div>
            )}
          </Text>
        ))}
      </div>

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-[7px] px-4 pb-3">
          {topics.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => send(topic)}
              className={[
                'cursor-pointer rounded-lg border border-border-5 bg-transparent px-[9px] py-1.5 text-[#c5b4c5]',
                'hover:border-[#916887] hover:bg-accent/[.07]',
                focusRing,
              ].join(' ')}
            >
              <Text size={FontSize.Small} className="block leading-[normal]">
                {topic}
              </Text>
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="mx-4 flex items-end gap-2 rounded-xl border border-border-6 bg-editor p-2.5 focus-within:border-[#b47ca9]"
      >
        <textarea
          ref={inputRef}
          rows={2}
          maxLength={maxLength}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onInputKeyDown}
          aria-label={strings.messageInput}
          placeholder={placeholder}
          className="min-w-0 flex-1 resize-none border-0 bg-transparent p-0.5 font-sans text-base leading-normal text-[#e1dce3] outline-none placeholder:text-text-faint"
        />
        <button
          type="submit"
          aria-label={strings.sendButton}
          className={[
            'grid size-[30px] flex-none cursor-pointer place-items-center rounded-lg bg-accent text-[#231e25]',
            focusRing,
          ].join(' ')}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M10 16V4m-5 5 5-5 5 5" />
          </svg>
        </button>
      </form>

      {note && (
        <Text as="div" size={FontSize.XXSmall} className="px-4 pt-[9px] pb-3 text-center text-[#85838f]">
          {note}
        </Text>
      )}
    </Text>
  )
}
`,cn=`import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import type { ChatLauncherProps } from './ChatLauncher.types'

/**
 * Floating button that opens the \`Chat\` window. Positioned \`fixed\` bottom-right; the \`bottom\` offset
 * animates, so the app can lift it above a docked terminal with \`style={{ bottom }}\`.
 */
export function ChatLauncher({ icon, className = '', children, ...rest }: ChatLauncherProps) {
  return (
    <button
      type="button"
      className={[
        'fixed right-6 bottom-12 z-40 flex cursor-pointer items-center gap-[9px] rounded-[9px] border border-launcher-border',
        'bg-launcher-bg px-4 py-[11px] text-launcher-text shadow-[0_6px_24px_rgba(0,0,0,.267)]',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        'transition-[bottom] duration-[180ms] [&_svg]:size-[18px]',
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
      <Text size={FontSize.Small} font={FontFamily.Sans} weight={FontWeight.Medium}>
        {children}
      </Text>
    </button>
  )
}
`,dn=`import { Text } from '../Text'
import { ChipVariant, type ChipProps } from './Chip.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const variantClasses: Record<ChipVariant, string> = {
  [ChipVariant.Default]:
    'gap-2 rounded-xs py-1.5 pr-[13px] pl-2.5 bg-hover border-border font-mono text-[12.5px] leading-[normal] text-text-body',
  [ChipVariant.Mono]:
    'rounded-sm px-[11px] py-[5px] bg-hover border-border font-mono text-[11.5px] leading-[normal] text-text-body',
  [ChipVariant.Compact]:
    'rounded-sm px-2 py-[3px] bg-hover border-border font-mono text-[10.5px] leading-[normal] text-text-tag',
  [ChipVariant.Position]:
    'rounded-xs px-2.5 py-1 bg-hover border-border font-mono text-[11.5px] leading-[normal] text-text-body',
  [ChipVariant.Tech]:
    'rounded-sm px-[9px] py-[5px] bg-hover border-chip-line font-mono text-[11px] leading-[normal] text-text-body',
}

/** Static tag, e.g. a technology or a position; \`variant\` picks the size and the look. */
export function Chip({ variant = ChipVariant.Default, icon, className = '', children, ...rest }: ChipProps) {
  return (
    <Text {...rest} className={['inline-flex items-center border', variantClasses[variant], className].join(' ')}>
      {variant === ChipVariant.Default && icon && (
        <span className="inline-flex shrink-0 [&_img]:size-[15px] [&_svg]:size-[15px]">{icon}</span>
      )}
      {children}
    </Text>
  )
}
`,pn=`import { ContainerSize, type ContainerProps } from './Container.types'

const sizeClasses: Record<ContainerSize, string> = {
  [ContainerSize.Default]: 'max-w-[900px]',
  [ContainerSize.Wide]: 'max-w-[1280px]',
}

export function Container({ size = ContainerSize.Default, className = '', ...rest }: ContainerProps) {
  return <div className={['mx-auto w-full px-8', sizeClasses[size], className].join(' ')} {...rest} />
}
`,mn=`import { PanelBar } from '../../internal/PanelBar'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import type { DataCardActionProps, DataCardListProps, DataCardProps, DataCardRowProps } from './DataCard.types'

/**
 * Bordered card with a header bar (title, optional counter and action). Its body is up to the caller.
 */
export function DataCard({ title, count, action, className = '', children, ...rest }: DataCardProps) {
  return (
    <section
      className={['overflow-hidden rounded-xl border border-border-2 bg-list/80 shadow-panel', className].join(' ')}
      {...rest}
    >
      <PanelBar title={title} count={count} action={action} />
      {children}
    </section>
  )
}

/** Text button on the right of the header bar ("Otwórz →"). */
export function DataCardAction({ className = '', children, ...rest }: DataCardActionProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex cursor-pointer items-center border-0 bg-transparent p-0 text-text-tag transition-colors duration-150 ease-out hover:text-accent-light',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text
        size={FontSize.Micro}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        className="leading-[normal] tracking-[.09em]"
      >
        {children}
      </Text>
    </button>
  )
}

export function DataCardList({ className = '', children, ...rest }: DataCardListProps) {
  return (
    <ul className={['m-0 list-none p-0', className].join(' ')} {...rest}>
      {children}
    </ul>
  )
}

/** Static row of a \`DataCardList\`: title (+ subtitle) on the left, an optional tag on the right. */
export function DataCardRow({ title, subtitle, tag, className = '', ...rest }: DataCardRowProps) {
  return (
    <li
      className={[
        'flex items-center justify-between gap-3.5 border-t border-border-3 px-3.5 py-[11px] first:border-t-0',
        className,
      ].join(' ')}
      {...rest}
    >
      <span className="min-w-0">
        <Text size={FontSize.Medium} font={FontFamily.Sans} className="block leading-[normal] text-text-item">
          {title}
        </Text>
        {subtitle && (
          <Text size={FontSize.XSmall} font={FontFamily.Sans} className="mt-0.5 block leading-[normal] text-text-dim-2">
            {subtitle}
          </Text>
        )}
      </span>
      {tag && (
        <Text
          as="span"
          font={FontFamily.Mono}
          className="shrink-0 rounded-sm border border-chip-line bg-hover px-2 py-[2.5px] text-[10.5px] leading-[normal] whitespace-nowrap text-text-tag"
        >
          {tag}
        </Text>
      )}
    </li>
  )
}
`,un=`import type { KeyboardEvent } from 'react'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import { DEFAULT_LABELS } from './Gallery.consts'
import type { GalleryProps } from './Gallery.types'

const controlButtonClasses =
  'w-9 h-9 p-0 flex items-center justify-center border border-border-6 rounded-md text-[#d4c9d6] hover:bg-[#443240] hover:border-accent transition-colors duration-150 ease-out'

export function Gallery({
  heading = 'GALERIA PROJEKTU',
  labels,
  slides,
  activeIndex,
  onActiveIndexChange,
  className = '',
  ...rest
}: GalleryProps) {
  const strings = { ...DEFAULT_LABELS, ...labels }
  const slide = slides[activeIndex]

  function move(delta: number) {
    onActiveIndexChange((activeIndex + delta + slides.length) % slides.length)
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      move(e.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  if (!slide) return null

  return (
    // Arrow keys are handled here but always come from the focused prev/next/dot buttons (they bubble up).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <section
      aria-roledescription={strings.carousel}
      onKeyDown={onKeyDown}
      className={['overflow-hidden rounded-2xl border border-border-5 bg-card', className].join(' ')}
      {...rest}
    >
      <Text
        as="div"
        size={FontSize.XSmall}
        font={FontFamily.Mono}
        weight={FontWeight.Medium}
        className="border-b border-b-chip-line px-4 py-3 leading-[normal] tracking-[.07em] text-text-panel-title"
      >
        {heading}
      </Text>

      <div className="flex aspect-video items-center justify-center p-5 [background:radial-gradient(ellipse_at_center,rgba(199,125,187,.07),transparent_70%),#202226]">
        {slide.src ? (
          <img src={slide.src} alt={slide.alt} className="block h-full w-full object-contain" />
        ) : (
          <Text
            as="div"
            size={FontSize.Medium}
            font={FontFamily.Sans}
            className="flex flex-col items-center gap-[13px] text-center leading-[normal] text-[#8f929c]"
          >
            <Text
              aria-hidden
              font={FontFamily.Mono}
              className="flex h-11 w-14 items-center justify-center rounded-lg border border-dashed border-[#66606d] text-[24px] text-accent"
            >
              ▧
            </Text>
            <Text>{strings.placeholder(activeIndex + 1)}</Text>
            <Text as="small" size={FontSize.XSmall} className="leading-[normal] text-[#727780]">
              {strings.placeholderNote}
            </Text>
          </Text>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-t-chip-line px-3.5 py-2.5">
        <button type="button" aria-label={strings.previous} onClick={() => move(-1)} className={controlButtonClasses}>
          <Text size={FontSize.Title} className="leading-none">
            ‹
          </Text>
        </button>

        <div className="flex flex-col items-center gap-[3px]">
          <Text
            role="status"
            aria-live="polite"
            size={FontSize.XSmall}
            font={FontFamily.Mono}
            className="leading-[normal] text-text-panel-title"
          >
            {activeIndex + 1} / {slides.length}
          </Text>
          <div role="group" aria-label={strings.slides} className="flex gap-0.5">
            {slides.map((s, i) => (
              <button
                key={s.alt}
                type="button"
                aria-label={strings.slide(i + 1)}
                aria-pressed={i === activeIndex}
                onClick={() => onActiveIndexChange(i)}
                className="flex h-6 w-[26px] items-center justify-center bg-transparent p-0"
              >
                <span
                  aria-hidden
                  className={['block size-1.5 rounded-full', i === activeIndex ? 'bg-accent' : 'bg-[#60616a]'].join(
                    ' ',
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <button type="button" aria-label={strings.next} onClick={() => move(1)} className={controlButtonClasses}>
          <Text size={FontSize.Title} className="leading-none">
            ›
          </Text>
        </button>
      </div>
    </section>
  )
}
`,xn=`import { useEffect, useId, useLayoutEffect, useRef } from 'react'
import { Button, ButtonSize, ButtonVariant } from '../Button'
import { Link } from '../Link'
import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../Text'
import type { GuideCardProps, GuideHighlightProps, GuideHighlightRect, GuideShadeProps } from './Guide.types'

const EDGE = 12
const GAP = 16

/** Places the card to the right of the anchor, else below it, else above it — always inside the window. */
function placeCard(card: HTMLElement, anchor: GuideHighlightRect) {
  const width = card.offsetWidth
  const height = card.offsetHeight
  let left = anchor.left + anchor.width + GAP
  let top = anchor.top
  if (left + width > window.innerWidth - EDGE) {
    left = Math.max(EDGE, Math.min(anchor.left, window.innerWidth - width - EDGE))
    top = anchor.top + anchor.height + GAP
  }
  if (top + height > window.innerHeight - EDGE) {
    top = Math.max(EDGE, Math.min(anchor.top - height - GAP, window.innerHeight - height - EDGE))
  }
  card.style.left = \`\${left}px\`
  card.style.top = \`\${top}px\`
}

export function GuideShade({ className = '', ...rest }: GuideShadeProps) {
  return <div className={['fixed inset-0 z-[9990] bg-black/[.467]', className].join(' ')} {...rest} />
}

export function GuideHighlight({ rect, className = '' }: GuideHighlightProps) {
  return (
    <div
      aria-hidden
      style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
      className={[
        'pointer-events-none fixed z-[9991]',
        'rounded-lg border border-link bg-accent/[.04] shadow-[0_0_0_3px_rgba(199,125,187,.125)]',
        className,
      ].join(' ')}
    />
  )
}

export function GuideCard({
  step,
  totalSteps,
  title,
  children,
  translation,
  actionLabel,
  onAction,
  onSkip,
  onBack,
  onNext,
  isLastStep = false,
  modal = false,
  anchor,
  style,
  className = '',
}: GuideCardProps) {
  const titleId = useId()
  const cardRef = useRef<HTMLElement>(null)

  // Anchored card: position it next to the anchor (direct DOM write — no extra render).
  useLayoutEffect(() => {
    const card = cardRef.current
    if (!anchor || !card) return
    const update = () => placeCard(card, anchor)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [anchor, step])

  // Modal: focus "Dalej" on every step, and give the focus back when the guide closes.
  useEffect(() => {
    if (!modal) return
    const previous = document.activeElement as HTMLElement | null
    return () => previous?.focus()
  }, [modal])
  useEffect(() => {
    if (modal) cardRef.current?.querySelector<HTMLElement>('[data-guide-next]')?.focus()
  }, [modal, step])

  // Modal: Esc skips the guide; Tab cycles through the card's buttons only.
  useEffect(() => {
    if (!modal) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopImmediatePropagation()
        onSkip()
      } else if (e.key === 'Tab') {
        const buttons = [...(cardRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)') ?? [])]
        if (!buttons.length) return
        e.preventDefault()
        const index = buttons.indexOf(document.activeElement as HTMLElement)
        buttons[(index + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [modal, onSkip])

  return (
    <Text
      ref={cardRef}
      as="section"
      size={FontSize.Large}
      font={FontFamily.Sans}
      color={TextColor.Body}
      role="dialog"
      aria-modal={modal || undefined}
      aria-labelledby={titleId}
      style={style}
      className={[
        'fixed z-[9992] box-border w-[340px] max-w-[calc(100vw-24px)] p-5',
        'rounded-2xl border border-border-tour bg-tour leading-[1.65] shadow-tour',
        className,
      ].join(' ')}
    >
      <Text as="small" size={FontSize.XXSmall} font={FontFamily.Mono} className="block tracking-[.07em] text-[#bf94b8]">
        PRZEWODNIK / {step} Z {totalSteps}
      </Text>
      <Text
        as="h2"
        id={titleId}
        size={FontSize.Title}
        weight={FontWeight.Medium}
        className="my-2.5 leading-[1.3] text-[#eee6ed]"
      >
        {title}
      </Text>
      <Text as="p" className={actionLabel ? 'm-0' : 'm-0 mb-5'}>
        {children}
        {translation && (
          <Text className="mt-2.5 block border-t border-t-[#4a3f4a] pt-2.5 text-text-en italic">{translation}</Text>
        )}
      </Text>
      {actionLabel && (
        <Link underline size={FontSize.Medium} weight={FontWeight.Medium} className="my-[14px]" onClick={onAction}>
          {actionLabel}
        </Link>
      )}
      <div className="flex items-center gap-2">
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm} onClick={onSkip}>
          Pomiń
        </Button>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm} onClick={onBack} disabled={!onBack}>
          Wstecz
        </Button>
        <Button size={ButtonSize.Sm} className="ml-auto" data-guide-next onClick={onNext}>
          {isLastStep ? 'Gotowe' : 'Dalej →'}
        </Button>
      </div>
    </Text>
  )
}
`,hn=`import { IconButtonSize, type IconButtonProps } from './IconButton.types'

const sizeClasses: Record<IconButtonSize, string> = {
  [IconButtonSize.Md]: 'size-8',
  [IconButtonSize.Sm]: 'p-[3px]',
}

export function IconButton({
  icon,
  active = false,
  size = IconButtonSize.Md,
  className = '',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center rounded-sm',
        sizeClasses[size],
        'text-text-dim-2 hover:bg-hover hover:text-text',
        'outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-accent',
        'transition-[background-color,color] duration-[140ms] ease-out',
        active ? 'bg-active text-text' : '',
        '[&_svg]:size-4',
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
    </button>
  )
}
`,yn=`import { PanelBar } from '../../internal/PanelBar'
import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../Text'
import type { InfoCardProps, InfoRowProps } from './InfoCard.types'

/**
 * Read-only label/value card. Same surface as \`List\` but non-interactive.
 */
export function InfoCard({ header, className = '', children, ...rest }: InfoCardProps) {
  return (
    <aside
      className={[
        'overflow-hidden rounded-xl border border-border-2 bg-list',
        'shadow-[0_8px_26px_rgba(0,0,0,.19),inset_0_0_0_1px_rgba(255,255,255,.024)]',
        className,
      ].join(' ')}
      {...rest}
    >
      <PanelBar title={header} />
      <dl className="m-0">{children}</dl>
    </aside>
  )
}

export function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="border-t border-border-3 px-3.5 py-[11px] first:border-t-0">
      <Text
        as="dt"
        size={FontSize.Micro}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        color={TextColor.Faint}
        className="mb-[3px] leading-[13px] tracking-[.1em] uppercase"
      >
        {label}
      </Text>
      <Text
        as="dd"
        size={FontSize.SmallPlus}
        font={FontFamily.Sans}
        color={TextColor.Body}
        className="m-0 leading-[1.55]"
      >
        {children}
      </Text>
    </div>
  )
}
`,fn=`import { useId } from 'react'
import { FontFamily, FontSize, Text } from '../Text'
import type { InputProps } from './Input.types'

export function Input({ label, id, className = '', ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId}>
          <Text size={FontSize.Medium} font={FontFamily.Sans} className="block leading-[normal] text-text-field-label">
            {label}
          </Text>
        </label>
      )}
      <input
        id={inputId}
        className={[
          'w-full min-w-0 rounded-md border border-input-border bg-inset p-3',
          'font-sans text-md leading-[1.5] text-text placeholder:text-text-dim',
          'outline-none focus:border-accent focus:outline-2 focus:outline-offset-1 focus:outline-accent',
          'transition-[border-color] duration-[140ms] ease-out',
          'max-bp600:text-[16px]', // prevents iOS auto-zoom on focus
          className,
        ].join(' ')}
        {...rest}
      />
    </div>
  )
}
`,bn=`import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { LabelSize, LabelTone, type LabelProps } from './Label.types'

const toneColors: Record<LabelTone, TextColor> = {
  [LabelTone.Muted]: TextColor.Dimmer,
  [LabelTone.Accent]: TextColor.AccentLight,
}

const sizes: Record<LabelSize, { fontSize: FontSize; tracking: string }> = {
  [LabelSize.Sm]: { fontSize: FontSize.Nano, tracking: 'tracking-[.09em]' },
  [LabelSize.Md]: { fontSize: FontSize.Micro, tracking: 'tracking-[.11em]' },
}

/**
 * Small uppercase eyebrow/section label (JetBrains Mono, 9–9.5px), e.g. a kicker above a heading
 * or a caption of a panel.
 */
export function Label({ tone = LabelTone.Muted, size = LabelSize.Md, className = '', children, ...rest }: LabelProps) {
  return (
    <Text
      {...rest}
      size={sizes[size].fontSize}
      font={FontFamily.Mono}
      color={toneColors[tone]}
      className={['uppercase', sizes[size].tracking, className].join(' ')}
    >
      {children}
    </Text>
  )
}
`,gn=`import type { ButtonHTMLAttributes } from 'react'
import { Text } from '../Text'
import { LinkTone, type LinkProps } from './Link.types'

const toneClasses: Record<LinkTone, string> = {
  [LinkTone.Accent]: 'text-link hover:text-link-hover',
  [LinkTone.Info]: 'text-link-info hover:text-link-info-hover hover:underline',
}

/**
 * Accent-coloured text link. With \`href\` it is an \`<a>\`; without it, a \`<button>\` for in-app actions
 * ("Zobacz w portfolio →", "Przejdź do kontaktu ↗"). Font family, size and line height are inherited
 * unless overridden, so it reads as part of the surrounding text.
 */
export function Link({
  tone = LinkTone.Accent,
  underline = false,
  size,
  weight,
  className = '',
  children,
  ...rest
}: LinkProps) {
  const classes = [
    'inline-flex cursor-pointer items-center border-0 bg-transparent p-0 no-underline',
    toneClasses[tone],
    'transition-colors duration-150 ease-out',
    'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    underline ? 'border-b border-b-accent-dark hover:border-b-link-hover' : '',
    className,
  ].join(' ')
  const label = (
    <Text size={size} weight={weight}>
      {children}
    </Text>
  )

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...rest}>
        {label}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {label}
    </button>
  )
}
`,kn=`import { PanelBar } from '../../internal/PanelBar'
import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { ListItemVariant, type ListItemProps, type ListProps } from './List.types'
import type { InputHTMLAttributes } from 'react'

/**
 * List's own search row: flat, editor background, only a bottom hairline, a "⌕" glyph instead of an SVG
 * icon. Private to \`List\` — not the public \`SearchField\` — so it cannot be used or styled
 * inconsistently outside a searchable list.
 */
function ListSearchRow(props: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <label className="flex items-center gap-[9px] border-b border-b-bar-subtle bg-editor px-3.5 py-[9px]">
      <Text aria-hidden size={FontSize.Medium} color={TextColor.Faint} className="leading-none">
        ⌕
      </Text>
      <input
        type="search"
        className="min-w-0 flex-1 bg-transparent font-sans text-sm text-text outline-none placeholder:text-text-faint"
        {...props}
      />
    </label>
  )
}

/** List container with an optional header bar (label + counter) and an optional search row. */
export function List({ header, count, searchable = false, searchProps, className = '', children, ...rest }: ListProps) {
  return (
    <div className={['bg-list', className].join(' ')} {...rest}>
      {header && <PanelBar title={header} count={count} />}
      {searchable && <ListSearchRow {...searchProps} />}
      <ul className="flex flex-col @max-[700px]:flex-row @max-[700px]:flex-wrap">{children}</ul>
    </div>
  )
}

/**
 * Clickable list row. On hover/active the left accent indicator fades in, the row background lightens,
 * \`padding-left\` grows 14px → 18px, the title brightens and the subtitle (if any) turns accent-coloured.
 */
export function ListItem({
  variant = ListItemVariant.Detail,
  active = false,
  title,
  subtitle,
  tag,
  trailing,
  className = '',
  ...rest
}: ListItemProps) {
  const isFilter = variant === ListItemVariant.Filter
  return (
    <li
      data-variant={variant}
      className={[
        'group relative border-b border-border-3 last:border-b-0',
        isFilter
          ? '@max-[700px]:border-r @max-[700px]:border-b-0 @max-[700px]:last:border-r'
          : '@max-[700px]:basis-full @max-[700px]:border-r @max-[700px]:border-r-border-2',
      ].join(' ')}
    >
      <span
        aria-hidden
        className={[
          'absolute top-0 bottom-0 left-0 w-0.5 bg-accent',
          'transition-opacity duration-150 ease-out',
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          isFilter ? '@max-[700px]:hidden' : '',
        ].join(' ')}
      />
      <button
        type="button"
        className={[
          'w-full text-left',
          isFilter
            ? 'block px-3.5 py-2.5 @max-[700px]:px-[13px] @max-[700px]:py-[9px]'
            : 'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-[11px] pr-3.5 pl-3.5',
          'transition-[background-color,padding-left,box-shadow] duration-150 ease-out',
          active ? 'bg-hover pl-[18px]' : 'hover:bg-hover hover:pl-[18px]',
          isFilter
            ? '@max-[700px]:pl-[13px] @max-[700px]:hover:pl-[13px] @max-[700px]:hover:shadow-[inset_0_2px_#c77dbb]'
            : '',
          active ? '@max-[700px]:shadow-[inset_0_2px_#c77dbb]' : '',
          className,
        ].join(' ')}
        {...rest}
      >
        {isFilter ? (
          <Text
            size={FontSize.Small}
            font={FontFamily.Mono}
            className={[
              'block leading-[normal] transition-colors duration-150 ease-out',
              active ? 'text-text' : 'text-[#8f939b] group-hover:text-text',
            ].join(' ')}
          >
            {title}
          </Text>
        ) : (
          <>
            <span className="flex min-w-0 flex-col">
              <Text
                size={FontSize.Medium}
                font={FontFamily.Sans}
                className={[
                  'truncate leading-[normal] transition-colors duration-150 ease-out',
                  active ? 'text-text' : 'text-text-item group-hover:text-text',
                ].join(' ')}
              >
                {title}
              </Text>
              {subtitle && (
                <Text
                  size={FontSize.XSmall}
                  font={FontFamily.Mono}
                  className={[
                    'truncate leading-[normal] transition-colors duration-150 ease-out',
                    active ? 'text-accent' : 'text-text-label',
                  ].join(' ')}
                >
                  {subtitle}
                </Text>
              )}
            </span>
            {tag && (
              <Text
                font={FontFamily.Mono}
                className={[
                  'rounded-sm border px-2 py-[2.5px] text-[10.5px] leading-[1.5] whitespace-nowrap transition-colors duration-150 ease-out',
                  active
                    ? 'border-accent bg-cta-hover text-accent-light'
                    : 'border-chip-line bg-hover text-text-tag group-hover:border-accent group-hover:bg-cta-hover group-hover:text-accent-light',
                ].join(' ')}
              >
                {tag}
              </Text>
            )}
            {trailing && <span className="shrink-0">{trailing}</span>}
          </>
        )}
      </button>
    </li>
  )
}
`,zn=`import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import type { MenuProps, MenuItemProps, MenuGroupProps } from './Menu.types'

/**
 * Grouped index/TOC menu: a bordered card with a header bar, flat top-level items and collapsible
 * \`<details>\` groups of nested items.
 * Give it a \`max-h-*\` class and the item list scrolls inside the card, header pinned.
 */
export function Menu({ header, className = '', children, ...rest }: MenuProps) {
  return (
    <nav
      className={[
        'flex flex-col overflow-hidden rounded-[9px] border border-border-5 bg-card',
        'shadow-[0_8px_26px_rgba(0,0,0,.2),inset_0_1px_0_rgba(255,255,255,.035)]',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text
        as="div"
        size={FontSize.XXSmall}
        font={FontFamily.Mono}
        weight={FontWeight.Medium}
        className="shrink-0 border-b border-chip-line bg-hover px-3.5 py-3 tracking-[.09em] text-[#92909d] uppercase"
      >
        {header}
      </Text>
      <div className="min-h-0 flex-1 scrollbar-subtle overflow-y-auto">{children}</div>
    </nav>
  )
}

export function MenuItem({ active = false, nested = false, className = '', children, ...rest }: MenuItemProps) {
  return (
    <button
      type="button"
      className={[
        'block w-full border-l-[3px] py-[9px] pr-3 text-left',
        'transition-[background-color,color,border-color] duration-150 ease-out',
        nested ? 'pl-[29px]' : 'mt-[7px] mb-[3px] pl-3',
        active
          ? 'border-l-accent bg-[#39313c] text-[#ebdce8]'
          : [
              'border-l-transparent hover:bg-[#343139] hover:text-[#e4dbe8]',
              nested ? 'text-[#aaa8b4]' : 'text-text-muted',
            ].join(' '),
        className,
      ].join(' ')}
      {...rest}
    >
      <Text size={FontSize.Small} font={FontFamily.Sans} className="block">
        {children}
      </Text>
    </button>
  )
}

export function MenuGroup({ label, defaultOpen = true, className = '', children, ...rest }: MenuGroupProps) {
  return (
    <details open={defaultOpen} className={['mt-[5px] border-t border-border pt-[3px]', className].join(' ')} {...rest}>
      <Text
        as="summary"
        size={FontSize.Small}
        font={FontFamily.Sans}
        weight={FontWeight.Medium}
        className="cursor-pointer px-3.5 py-2.5 text-[#d0ccd7]"
      >
        {label}
      </Text>
      {children}
    </details>
  )
}
`,wn=`import type { PanelProps } from './Panel.types'

export function Panel({ interactive = false, raised = false, className = '', children, ...rest }: PanelProps) {
  return (
    <div
      className={[
        'rounded-3xl border border-border-5 bg-card',
        raised ? 'shadow-card-raised' : 'shadow-card',
        'transition-[background-color,border-color] duration-[140ms] ease-out',
        interactive ? 'hover:border-accent-dark hover:bg-hover' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
`,jn=`import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import { RailButtonAccent, RailButtonIconSize, type RailButtonProps } from './RailButton.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const activeClasses: Record<RailButtonAccent, string> = {
  [RailButtonAccent.Accent]: 'bg-active text-accent shadow-[inset_2px_0_0_0_var(--color-accent)]',
  [RailButtonAccent.Explorer]: 'bg-active text-explorer-active shadow-[inset_2px_0_0_0_var(--color-explorer-active)]',
  [RailButtonAccent.Success]:
    'bg-rail-success text-status-success shadow-[inset_2px_0_0_0_var(--color-status-success)]',
  [RailButtonAccent.Assistant]: 'bg-rail-assistant text-assistant shadow-[inset_2px_0_0_0_var(--color-assistant)]',
}

const iconSizeClasses: Record<RailButtonIconSize, string> = {
  [RailButtonIconSize.Md]: '[&_svg]:size-4',
  [RailButtonIconSize.Lg]: '[&_svg]:size-[17px]',
  [RailButtonIconSize.Xl]: '[&_svg]:size-[18px]',
}

export function RailButton({
  icon,
  iconSize = RailButtonIconSize.Md,
  label,
  active = false,
  accent = RailButtonAccent.Accent,
  className = '',
  ...rest
}: RailButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[
        'inline-flex w-8 flex-col items-center gap-[7px] rounded-sm px-0 py-[7px]',
        'outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-accent',
        'transition-colors duration-150 ease-out',
        active ? activeClasses[accent] : 'text-text-label hover:bg-hover-2 hover:text-text-body',
        iconSizeClasses[iconSize],
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
      <Text
        aria-hidden
        size={FontSize.Nano}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        className="tracking-[.09em] [writing-mode:vertical-rl]"
      >
        {label}
      </Text>
    </button>
  )
}
`,vn=`import { Search } from 'lucide-react'
import type { SearchFieldProps } from './SearchField.types'

/**
 * General-purpose search field: bordered, with a Lucide \`Search\` icon. \`List\` has its own flat,
 * borderless search row (\`searchable\`); that one is a private detail of \`List\`.
 */
export function SearchField({ className = '', ...rest }: SearchFieldProps) {
  return (
    <label
      className={['flex items-center gap-[7px] rounded-sm border border-border bg-field px-[7px] py-1', className].join(
        ' ',
      )}
    >
      <Search className="size-4 shrink-0 text-text-dim" />
      <input
        type="search"
        className="min-w-0 flex-1 bg-transparent font-sans text-xs text-[#dddde5] outline-none placeholder:text-text-dim"
        {...rest}
      />
    </label>
  )
}
`,Sn=`import { useState, type CSSProperties, type MouseEvent } from 'react'
import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { DEFAULT_LABELS } from './SolutionExplorer.consts'
import type { SolutionExplorerProps, TreeFileProps, TreeFolderProps } from './SolutionExplorer.types'

function indentStyle(level: number): CSSProperties {
  return { ['--tree-indent' as string]: \`\${level * 16}px\` }
}

// Rows aren't nested inside padded ancestor containers here (TreeFolder itself adds no
// indent) — each row encodes its own indent purely via padding-left, so a plain w-full
// already gives a full-width hover/active background without needing a margin/width
// compensation trick.
const rowShape = 'box-border w-full rounded-none'

/**
 * Solution Explorer sidebar. \`TreeFile\`/\`TreeFolder\` are plain building blocks — callers nest them
 * to whatever depth they need, passing \`level\` for indentation, rather than this component owning
 * a recursive data-driven tree renderer.
 */
export function SolutionExplorer({
  tools,
  search,
  collapsed = false,
  collapsedContent,
  footer,
  labels,
  className = '',
  children,
  ...rest
}: SolutionExplorerProps) {
  const strings = { ...DEFAULT_LABELS, ...labels }

  if (collapsed) {
    return (
      <aside
        className={['flex w-11 flex-col items-center border-r border-border bg-hover py-1.5', className].join(' ')}
        {...rest}
      >
        {collapsedContent}
      </aside>
    )
  }

  return (
    <aside className={['flex flex-col border-r border-border bg-hover', className].join(' ')} {...rest}>
      <div className="flex h-[35px] shrink-0 items-center justify-between gap-2 border-b border-border px-2.5 py-[5px]">
        <Text
          size={FontSize.Nano}
          font={FontFamily.Mono}
          color={TextColor.Faint}
          className="min-w-0 truncate tracking-[.08em] uppercase"
        >
          {strings.title}
        </Text>
        {tools && <div className="flex shrink-0 items-center gap-0.5">{tools}</div>}
      </div>
      {search && <div className="m-[5px_9px]">{search}</div>}
      <nav aria-label={strings.tree} className="flex flex-col overflow-y-auto py-1">
        {children}
      </nav>
      {footer && <div className="mt-auto shrink-0">{footer}</div>}
    </aside>
  )
}

export function TreeFile({ level = 0, active = false, icon, className = '', children, style, ...rest }: TreeFileProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      style={{ ...indentStyle(level), ...style }}
      className={[
        rowShape,
        'flex items-center gap-[7px] py-0.5 pr-2 pl-[calc(17px+var(--tree-indent,0px))]',
        'text-left',
        'transition-colors duration-150 ease-out',
        active
          ? 'bg-filter-active text-text shadow-[inset_2px_0_0_0_var(--color-accent)]'
          : 'bg-transparent text-text-muted hover:bg-explorer-hover',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text size={FontSize.Small} className="flex w-[18px] shrink-0 items-center justify-center">
        {icon}
      </Text>
      <Text size={FontSize.Small} font={FontFamily.Sans} className="truncate">
        {children}
      </Text>
    </button>
  )
}

export function TreeFolder({
  level = 0,
  label,
  icon,
  defaultOpen = true,
  open: openProp,
  onToggle,
  active = false,
  onClick,
  children,
}: TreeFolderProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const open = openProp ?? internalOpen

  function toggle() {
    const next = !open
    if (openProp === undefined) setInternalOpen(next)
    onToggle?.(next)
  }

  return (
    <details open={open} className="group">
      <summary
        // Only the chevron toggles the folder — the rest of the row selects it,
        // so block <summary>'s native "click anywhere on the row" toggle behavior.
        onClick={(e: MouseEvent) => {
          e.preventDefault()
          onClick?.()
        }}
        style={indentStyle(level)}
        className={[
          rowShape,
          'flex items-center gap-1.5 py-[3px] pr-2 pl-[calc(8px+var(--tree-indent,0px))]',
          'cursor-default',
          'transition-colors duration-150 ease-out',
          active
            ? 'bg-filter-active text-text shadow-[inset_2px_0_0_0_var(--color-accent)]'
            : 'text-text-muted hover:bg-explorer-hover',
          'marker:content-none [&::-webkit-details-marker]:hidden',
        ].join(' ')}
      >
        <Text
          size={FontSize.Small}
          color={TextColor.Faint}
          onClick={(e: MouseEvent) => {
            // preventDefault here too — stopPropagation alone stops our summary
            // handler from running, but doesn't stop <details>'s own native
            // toggle, which would otherwise race the controlled \`open\` state.
            e.preventDefault()
            e.stopPropagation()
            toggle()
          }}
          className="inline-flex size-4 shrink-0 rotate-0 cursor-pointer items-center justify-center transition-transform duration-[120ms] group-open:rotate-90"
        >
          ›
        </Text>
        <Text size={FontSize.Small} color={TextColor.Faint} className="shrink-0 [&_svg]:size-4">
          {icon}
        </Text>
        <Text size={FontSize.Small} font={FontFamily.Sans} className="truncate">
          {label}
        </Text>
      </summary>
      {children}
    </details>
  )
}
`,Tn=`import { SplitPanelCollapseAt, type SplitPanelProps } from './SplitPanel.types'

// Literal, statically-scannable class strings — Tailwind v4 can't pick up dynamically
// interpolated arbitrary-value classes, so each collapse breakpoint needs its own branch.
const collapseClasses: Record<SplitPanelCollapseAt, string> = {
  [SplitPanelCollapseAt.Bp700]:
    'max-bp700:grid-cols-1 max-bp700:[&>:first-child]:border-r-0 max-bp700:[&>:first-child]:border-b',
  [SplitPanelCollapseAt.Bp820]:
    'max-[820px]:grid-cols-1 max-[820px]:[&>:first-child]:border-r-0 max-[820px]:[&>:first-child]:border-b',
  [SplitPanelCollapseAt.Container700]:
    '@max-[700px]:grid-cols-1 @max-[700px]:[&>:first-child]:border-r-0 @max-[700px]:[&>:first-child]:border-b',
}

/**
 * Master-detail shell: grid \`320px minmax(0,1fr)\`, 1px border, 5px radius, overflow hidden. Collapses
 * to a single column (aside on top) below the breakpoint given in \`collapseAt\`.
 */
export function SplitPanel({
  aside,
  children,
  collapseAt = SplitPanelCollapseAt.Bp700,
  className = '',
  ...rest
}: SplitPanelProps) {
  return (
    <div
      className={[
        'grid grid-cols-[320px_minmax(0,1fr)]',
        'overflow-hidden rounded-md border border-border',
        '[&>:first-child]:border-r [&>:first-child]:border-border',
        collapseClasses[collapseAt],
        className,
      ].join(' ')}
      {...rest}
    >
      {aside}
      {children}
    </div>
  )
}
`,Cn=`import type { AnchorHTMLAttributes } from 'react'
import { FontFamily, FontSize, Text } from '../Text'
import {
  StatusBarAccent,
  StatusBarTone,
  type StatusBarButtonProps,
  type StatusBarItemProps,
  type StatusBarProps,
  type StatusBarSwitchProps,
} from './StatusBar.types'

const toneClasses: Record<StatusBarTone, string> = {
  [StatusBarTone.Default]: 'text-status-path',
  [StatusBarTone.Success]: 'text-status-branch',
  [StatusBarTone.Faint]: 'text-text-dim-2',
}

const accentClasses: Record<StatusBarAccent, string> = {
  [StatusBarAccent.Success]: 'text-status-success',
  [StatusBarAccent.Assistant]: 'text-assistant',
}

const focusRing = 'outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-1'
const buttonBase = \`cursor-pointer font-mono text-2xs rounded-xs px-[5px] py-[3px] \${focusRing} transition-colors duration-[140ms] ease-out\`

/** Dolny pasek okna IDE: gałąź, ścieżka pliku, przełączniki paneli, język, wersja. */
export function StatusBar({ className = '', children, ...rest }: StatusBarProps) {
  return (
    <footer
      className={[
        'box-border flex min-h-7 flex-nowrap items-center gap-3.5 border-t border-border bg-hover px-3 py-0.5',
        'font-mono text-xs text-text-dim-2',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </footer>
  )
}

export function StatusBarItem({
  tone = StatusBarTone.Default,
  truncate = false,
  className = '',
  children,
  ...rest
}: StatusBarItemProps) {
  return (
    <Text
      {...rest}
      size={tone === StatusBarTone.Faint ? FontSize.XXSmall : FontSize.XSmall}
      font={FontFamily.Mono}
      className={[toneClasses[tone], truncate ? 'min-w-0 truncate' : 'shrink-0 whitespace-nowrap', className].join(' ')}
    >
      {children}
    </Text>
  )
}

export function StatusBarButton({
  icon,
  expanded,
  accent = StatusBarAccent.Success,
  href,
  className = '',
  children,
  ...rest
}: StatusBarButtonProps) {
  const classes = [
    'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap no-underline hover:bg-white/[.035]',
    buttonBase,
    expanded ? accentClasses[accent] : 'text-status-action',
    '[&_svg]:size-[13px]',
    className,
  ].join(' ')
  const content = (
    <>
      {icon}
      <Text size={FontSize.XXSmall} font={FontFamily.Mono}>
        {children}
      </Text>
    </>
  )

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" aria-expanded={expanded} className={classes} {...rest}>
      {content}
    </button>
  )
}

/** Pionowy separator między grupami elementów paska. */
export function StatusBarDivider() {
  return <span aria-hidden className="h-3.5 w-px shrink-0 bg-border-6" />
}

/** Rozpycha pasek — wszystko po nim jest dosunięte do prawej krawędzi. */
export function StatusBarSpacer() {
  return <span aria-hidden className="flex-1" />
}

/** Przełącznik jednokrotnego wyboru (np. język PL / EN) w formie małych przycisków. */
export function StatusBarSwitch<T extends string>({
  options,
  value,
  onChange,
  className = '',
  ...rest
}: StatusBarSwitchProps<T>) {
  return (
    <div role="group" className={['flex shrink-0 gap-0.5 font-mono text-2xs', className].join(' ')} {...rest}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            aria-label={option['aria-label']}
            onClick={() => onChange(option.value)}
            className={[
              buttonBase,
              selected ? 'bg-lang-active text-lang-active-text' : 'text-text-dim-2 hover:bg-white/[.035]',
            ].join(' ')}
          >
            <Text size={FontSize.XXSmall} font={FontFamily.Mono}>
              {option.label}
            </Text>
          </button>
        )
      })}
    </div>
  )
}
`,Nn=`import { useRef } from 'react'
import { FontFamily, Text } from '../Text'
import { useTabsReorder } from './hooks/useTabsReorder'
import type { TabProps, TabsProps } from './Tabs.types'

/**
 * Strip of the open files' tabs. Tabs can be reordered by dragging and with Alt+Shift+←/→ (see \`useTabsReorder\`);
 * \`onReorder\` receives the new order of the tab ids.
 */
export function Tabs({ onReorder, className = '', children, ...rest }: TabsProps) {
  const navRef = useRef<HTMLElement>(null)
  useTabsReorder(navRef, onReorder)

  return (
    <nav ref={navRef} className={['flex h-[33px] items-stretch bg-bar', className].join(' ')} {...rest}>
      {children}
    </nav>
  )
}

export function Tab({ id, active = false, children, onSelect, onClose, closeLabel }: TabProps) {
  return (
    <div
      data-tab-id={id}
      className={[
        'group relative flex h-full items-stretch',
        'transition-colors duration-150 ease-out',
        active
          ? 'border-t-2 border-t-accent bg-editor'
          : 'border-t-2 border-t-transparent bg-transparent hover:bg-hover-2',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={['py-[7px] pl-[11px]', onClose ? 'pr-8' : 'pr-[11px]', active ? 'text-text' : 'text-[#929aa4]'].join(
          ' ',
        )}
      >
        <Text font={FontFamily.Mono} className="block text-[11.5px] whitespace-nowrap">
          {children}
        </Text>
      </button>
      {onClose && (
        <button
          type="button"
          data-close-tab
          onClick={onClose}
          aria-label={closeLabel}
          className={[
            'absolute top-1/2 right-[5px] size-5 -translate-y-1/2 rounded-sm',
            'flex items-center justify-center transition-[background-color,color,opacity] duration-150 ease-out',
            'hover:bg-close-button-hover-bg hover:text-text',
            active ? 'text-text-muted opacity-100' : 'text-text-dim opacity-0 group-hover:opacity-100',
          ].join(' ')}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <path d="M1 1l8 8M9 1l-8 8" />
          </svg>
        </button>
      )}
    </div>
  )
}
`,Bn=`import { useId, useRef, type FormEvent, type MouseEvent } from 'react'
import { CloseButton, CloseButtonSize } from '../../internal/CloseButton'
import { useReopenFocus } from '../../internal/hooks/useReopenFocus'
import { useScrollToEnd } from '../../internal/hooks/useScrollToEnd'
import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { useCommandInput } from './hooks/useCommandInput'
import { maxHeight, useResizableHeight } from './hooks/useResizableHeight'
import { DEFAULT_LABELS, MIN_HEIGHT } from './Terminal.consts'
import { TerminalLineKind, type TerminalProps } from './Terminal.types'

const lineKindClasses: Record<TerminalLineKind, string> = {
  [TerminalLineKind.Output]: '',
  [TerminalLineKind.Command]: 'text-[#d3afd0]',
  [TerminalLineKind.Error]: 'text-[#e6a080]',
}

/**
 * Bottom terminal panel: command history (↑/↓), Tab completion, Esc to close and a resizable height
 * (drag the top edge or use the arrow keys on it). Interpreting commands is the caller's job.
 */
export function Terminal({
  lines,
  suggestions = [],
  completions = [],
  prompt = 'visitor@portfolio:~$',
  subtitle = '/ portfolio',
  labels,
  onCommand,
  onClose,
  defaultHeight = 220,
  open = true,
  className = '',
  ...rest
}: TerminalProps) {
  const strings = { ...DEFAULT_LABELS, ...labels }
  const inputId = useId()
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { height, handleProps } = useResizableHeight(defaultHeight)
  const { run, inputProps } = useCommandInput({ completions, onCommand, onClose, inputRef })

  useScrollToEnd(scrollRef, lines)
  useReopenFocus(open, scrollRef, inputRef)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    run(inputProps.value)
  }

  function onScrollAreaClick(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('a,button,input,select,textarea')) return
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) return
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <Text
      {...rest}
      as="section"
      size={FontSize.Small}
      font={FontFamily.Mono}
      color={TextColor.Body}
      hidden={!open}
      style={{ height }}
      className={[
        'relative flex max-h-[55dvh] min-h-[130px] flex-col border-t border-t-border-5 bg-editor leading-[1.7]',
        className,
      ].join(' ')}
    >
      {/* WAI-ARIA window splitter: a separator that is focusable and has a value is an interactive widget. */}
      <div
        role="separator"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label={strings.resizeHandle}
        aria-orientation="horizontal"
        aria-valuemin={MIN_HEIGHT}
        aria-valuemax={maxHeight()}
        aria-valuenow={Math.round(height)}
        {...handleProps}
        className="absolute inset-x-0 -top-1 z-[2] h-[7px] cursor-ns-resize touch-none outline-none hover:bg-accent/[.333]"
      />

      <Text
        as="header"
        size={FontSize.XSmall}
        className="flex flex-none items-center justify-between border-b border-border bg-hover px-4 py-1.5 leading-[1.7]"
      >
        <Text>
          &gt;_ {strings.title} <Text className="text-text-label"> {subtitle}</Text>
        </Text>
        <CloseButton
          size={CloseButtonSize.Sm}
          aria-label={strings.closeButton}
          title={strings.closeButton}
          onClick={onClose}
        />
      </Text>

      {/* Mouse-only shortcut (a click on empty output focuses the input); keyboard users reach the input by Tab. */}
      <div
        ref={scrollRef}
        role="presentation"
        onClick={onScrollAreaClick}
        className="min-h-0 flex-1 overflow-auto overscroll-contain px-[18px] py-3"
      >
        <div role="log" aria-live="polite" aria-relevant="additions">
          {lines.map((line) => (
            <Text
              as="div"
              key={line.id}
              className={[
                'mb-1 [overflow-wrap:anywhere] whitespace-pre-wrap',
                lineKindClasses[line.kind ?? TerminalLineKind.Output],
              ].join(' ')}
            >
              {line.content}
            </Text>
          ))}
        </div>

        {suggestions.length > 0 && (
          <div className="my-2 flex flex-wrap gap-[7px]">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => run(s)}
                className="cursor-pointer rounded-sm border border-chip-line bg-card px-2 py-0.5 text-[#b8a7bd] outline-none hover:border-[#b67aab] hover:text-[#ead9e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Text size={FontSize.XSmall} font={FontFamily.Mono} className="block leading-[normal]">
                  {s}
                </Text>
              </button>
            ))}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-[7px] flex items-baseline gap-[9px]">
          <label htmlFor={inputId} className="whitespace-nowrap text-accent">
            {prompt}
          </label>
          <input
            id={inputId}
            ref={inputRef}
            {...inputProps}
            aria-label={strings.commandInput}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 border-0 bg-transparent p-0 font-[inherit] text-terminal-text caret-terminal-text outline-none"
          />
        </form>
      </div>
    </Text>
  )
}
`,Ln=`import type { ComponentType, HTMLAttributes, Ref } from 'react'
import { FontFamily, FontSize, FontWeight, TextColor, type TextProps } from './Text.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const sizeClasses: Record<FontSize, string> = {
  [FontSize.Nano]: 'text-3xs',
  [FontSize.Micro]: 'text-3xs-plus',
  [FontSize.XXSmall]: 'text-2xs',
  [FontSize.XSmall]: 'text-xs',
  [FontSize.Small]: 'text-sm',
  [FontSize.SmallPlus]: 'text-sm-plus',
  [FontSize.Medium]: 'text-base',
  [FontSize.Large]: 'text-md',
  [FontSize.XLarge]: 'text-lg',
  [FontSize.XXLarge]: 'text-xl',
  [FontSize.Title]: 'text-3xl',
  [FontSize.Heading]: 'text-h1-sm',
  [FontSize.Display]: 'text-h1',
}

const colorClasses: Record<TextColor, string> = {
  [TextColor.Primary]: 'text-text',
  [TextColor.Heading]: 'text-text-heading',
  [TextColor.Body]: 'text-text-body',
  [TextColor.Muted]: 'text-text-muted',
  [TextColor.Dim]: 'text-text-dim',
  [TextColor.Faint]: 'text-text-faint',
  [TextColor.Dimmer]: 'text-text-dim-2',
  [TextColor.Accent]: 'text-accent',
  [TextColor.AccentLight]: 'text-accent-light',
}

const fontClasses: Record<FontFamily, string> = {
  [FontFamily.Sans]: 'font-sans',
  [FontFamily.Mono]: 'font-mono',
}

const weightClasses: Record<FontWeight, string> = {
  [FontWeight.Normal]: 'font-normal',
  [FontWeight.Medium]: 'font-medium',
  [FontWeight.SemiBold]: 'font-semibold',
}

/**
 * Off-scale details (letter-spacing, line-height, one-off colors) go in \`className\`;
 * don't combine a \`color\`/\`size\` prop with a conflicting class.
 */
export function Text({ size, color, font, weight, as = 'span', className = '', children, ...rest }: TextProps) {
  // \`as\` is a union of element names; typing the tag by the props Text passes avoids per-element ref/props checks.
  const Tag = as as unknown as ComponentType<HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }>
  return (
    <Tag
      className={[
        size && sizeClasses[size],
        color && colorClasses[color],
        font && fontClasses[font],
        weight && weightClasses[weight],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
`,Pn=`import { useId } from 'react'
import { FontFamily, FontSize, Text } from '../Text'
import type { TextareaProps } from './Textarea.types'

export function Textarea({ label, id, className = '', ...rest }: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={textareaId}>
          <Text size={FontSize.Medium} font={FontFamily.Sans} className="block leading-[normal] text-text-field-label">
            {label}
          </Text>
        </label>
      )}
      <textarea
        id={textareaId}
        className={[
          'w-full min-w-0 resize-y rounded-md border border-input-border bg-inset p-3',
          'font-sans text-md leading-[1.5] text-text placeholder:text-text-dim',
          'outline-none focus:border-accent focus:outline-2 focus:outline-offset-1 focus:outline-accent',
          'transition-[border-color] duration-[140ms] ease-out',
          'h-[clamp(130px,26vh,300px)] min-h-[130px]',
          'max-bp600:text-[16px]',
          className,
        ].join(' ')}
        {...rest}
      />
    </div>
  )
}
`,Mn=`import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../Text'
import { TitleBarButtonTone, type TitleBarButtonProps, type TitleBarProps } from './TitleBar.types'

const toneClasses: Record<TitleBarButtonTone, string> = {
  [TitleBarButtonTone.Run]:
    'gap-[7px] rounded-md border border-run-border bg-run-bg px-[11px] py-1.5 text-run-text ' +
    'hover:border-run-hover-border hover:bg-run-hover-bg hover:text-run-hover-text ' +
    'focus-visible:outline-2 focus-visible:outline-run-focus focus-visible:outline-offset-2',
  [TitleBarButtonTone.Link]:
    'gap-[5px] rounded-sm px-[7px] py-1 text-accent hover:text-accent-light ' +
    'focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-1',
}

/** Górny pasek okna IDE: logo, tytuł i akcje. */
export function TitleBar({ logo, title, className = '', children, ...rest }: TitleBarProps) {
  return (
    <header
      className={[
        'flex shrink-0 items-center gap-3.5 border-b border-border bg-hover px-3 py-1.5 max-bp570:gap-[9px]',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text
        size={FontSize.XSmall}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        className="shrink-0 rounded-[2px] bg-accent px-[5px] py-[3px] text-on-accent"
      >
        {logo}
      </Text>
      <Text font={FontFamily.Mono} color={TextColor.Primary} className="min-w-0 truncate text-[11.5px]">
        {title}
      </Text>
      {children}
    </header>
  )
}

export function TitleBarButton({
  tone = TitleBarButtonTone.Run,
  icon,
  className = '',
  children,
  ...rest
}: TitleBarButtonProps) {
  const isRun = tone === TitleBarButtonTone.Run
  return (
    <button
      type="button"
      className={[
        'inline-flex shrink-0 cursor-pointer items-center text-xs leading-[1.3] whitespace-nowrap outline-none',
        'transition-[background-color,border-color,color] duration-150 ease-out',
        toneClasses[tone],
        className,
      ].join(' ')}
      {...rest}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <Text
        size={FontSize.XSmall}
        font={isRun ? FontFamily.Sans : FontFamily.Mono}
        weight={isRun ? FontWeight.Medium : undefined}
      >
        {children}
      </Text>
    </button>
  )
}
`,Fn=`@import 'tailwindcss';

/*
 * OrchIDE UI — design tokens for the IDE-styled portfolio redesign.
 * Values sourced from design_handoff_portfolio_net_ide/README.md — "Design Tokens".
 * This is a single fixed dark theme (no runtime theme switching), so tokens live
 * directly in Tailwind's @theme rather than in a JS theme-object layer.
 */
@theme {
  /* Fonts */
  --font-sans: 'IBM Plex Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-tree: Consolas, 'Courier New', monospace;

  /* Accent */
  --color-accent: #c77dbb;
  --color-accent-hover: #d48fc7;
  --color-accent-light: #dba8d2;
  --color-accent-dark: #a06d99;
  --color-on-accent: #1e1f22;

  /* Backgrounds (named without a "bg-" prefix — Tailwind's \`bg-\` utility prefix
     already supplies that, so e.g. --color-editor produces the class \`bg-editor\`) */
  --color-editor: #1e1f22;
  --color-shell: #1b1c1e;
  --color-list: #222428;
  --color-field: #25262c;
  --color-card: #27282d;
  --color-tour: #292a30;
  --color-hover: #2b2d30;
  --color-hover-2: #2f3236;
  --color-active: #35383d;
  --color-filter-active: #3d2f3c;
  --color-lang-active: #3b303b;
  --color-cta-hover: #3a2f39;

  /* Borders */
  --color-border: #393b40;
  --color-border-2: #34363b;
  --color-border-3: #2c2e33;
  --color-border-4: #41414a;
  --color-border-5: #46424c;
  --color-border-6: #49454f;
  --color-border-7: #4a4d53;
  --color-border-tour: #665060;
  --color-border-lead: #4a3b53;

  /* Text */
  --color-text: #e6e7e9;
  --color-text-heading: #dfe1e5;
  --color-text-body: #bcbec4;
  --color-text-muted: #a6a9b2;
  --color-text-dim: #8b8f96;
  --color-text-dim-2: #808590;
  --color-text-faint: #6f737a;
  --color-text-faint-2: #6a6e75;
  --color-text-en: #9b9ea6;

  /* Helper accents */
  --color-file-cs: #79bd88;
  --color-explorer-active: #cdb17a;
  --color-assistant: #e6a365;
  --color-num-02: #accfe2;
  --color-num-03: #c8d6b2;
  --color-num-04: #ddbc9f;

  /* Status bar (measured from the prototype's computed styles) */
  --color-status-branch: #6aab73;
  --color-status-success: #8fca99;
  --color-status-path: #9297a2;
  --color-status-action: #a9acb5;
  --color-lang-active-text: #dab6d2;

  /* Text links (Link component) */
  --color-link: #d394c7;
  --color-link-hover: #eec0e4;
  --color-link-info: #77c9e5;
  --color-link-info-hover: #b5e6f7;

  /* Chat launcher (floating "Zapytaj o mnie" button) */
  --color-launcher-bg: #352b34;
  --color-launcher-border: #78556f;
  --color-launcher-text: #eddde9;

  /* Rail: active-state tints for the success (terminal) and assistant (chat) buttons */
  --color-rail-success: #29372e;
  --color-rail-assistant: #3c3028;

  /* Title bar "run" action (blue) */
  --color-run-bg: #293c47;
  --color-run-border: #48768e;
  --color-run-text: #b8dff2;
  --color-run-hover-bg: #344f5e;
  --color-run-hover-border: #65a6c8;
  --color-run-hover-text: #e1f4ff;
  --color-run-focus: #70b9df;

  /* Shared neutrals: values that several components repeat */
  --color-text-label: #7a7e85; /* small caps labels, kickers and the titles of bars */
  --color-text-tag: #9aa0a8; /* text of tags, badges and counters */
  --color-text-panel-title: #a6a3af; /* titles of the bars on top of panels */
  --color-text-lead: #a6aca6; /* lead paragraphs of the pages */
  --color-text-item: #a4a8ae; /* titles of list rows */
  --color-text-row-title: #d4d7db; /* titles inside cards */
  --color-text-caption: #858b95; /* captions under diagrams */
  --color-text-field-label: #c6c8ce; /* labels of form fields */
  --color-terminal-text: #e3e0e5; /* terminal and chat text and caret */
  --color-close-button: #a7afb9; /* close button of the terminal and the chat */
  --color-close-button-hover: #e0e5eb; /* close button on hover (text) */
  --color-close-button-hover-bg: #3b3e45; /* close button, tab and chat button on hover (background) */
  --color-chip-line: #3a3d43; /* border of chips and secondary buttons, lines inside panels */
  --color-bar-subtle: #2f3136; /* lines and counters of the bars on top of lists and cards, lines between groups of rows */
  --color-bar: #26282c; /* bar on top of lists and cards */
  --color-card-line: #41434a; /* border of cards and link buttons */
  --color-inset: #202226; /* sunken surface: inputs and diagrams */
  --color-input-border: #464850; /* border of inputs */
  --color-explorer-hover: #34353d; /* hover of a row in the Solution Explorer */

  /* Text sizes (px scale from the handoff, not Tailwind's default rem scale). The line heights of the default
     scale stay in place on purpose: the shell was verified against them, so use \`leading-[normal]\` where the
     prototype leaves the line height at \`normal\`. */
  --text-3xs: 9px; /* "etykiety" (labels) — rail labels */
  --text-3xs-plus: 9.5px; /* "etykiety" (labels) — e.g. .xp-listbar, .home-cardbar */
  --text-2xs: 10px;
  --text-xs: 11px;
  --text-sm: 12px;
  --text-sm-plus: 12.5px;
  --text-base: 13px;
  --text-md: 14px;
  --text-lg: 15px;
  --text-xl: 17px;
  --text-2xl: 19px;
  --text-3xl: 20px;
  --text-h1-sm: 36px;
  --text-h1: 44px;

  /* Extra spacing token not on Tailwind's default 4px-step scale */
  --spacing-25: 25px;

  /* Radius */
  --radius-xs: 3px;
  --radius-sm: 4px;
  --radius-md: 5px;
  --radius-lg: 6px;
  --radius-xl: 8px;
  --radius-2xl: 10px;
  --radius-3xl: 12px;

  /* Shadows */
  --shadow-card: 0 12px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.035);
  --shadow-card-raised: 0 16px 48px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.035);
  --shadow-panel: 0 8px 26px rgba(0, 0, 0, 0.19), inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  --shadow-tour: 0 16px 60px rgba(0, 0, 0, 0.533);

  /* Breakpoints (the handoff describes them as max-width steps; Tailwind v4
     derives both min-width \`bp850:\` and max-width \`max-bp850:\` variants from these) */
  --breakpoint-bp500: 500px;
  --breakpoint-bp570: 570px;
  --breakpoint-bp600: 600px;
  --breakpoint-bp650: 650px;
  --breakpoint-bp700: 700px;
  --breakpoint-bp850: 850px;
  --breakpoint-bp1000: 1000px;
}

html,
body,
#root {
  height: 100%;
}

html {
  color-scheme: dark;
}

/* Thin scrollbar with no track, visible only while hovering the scroll area. */
@utility scrollbar-subtle {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &:hover {
    scrollbar-color: var(--color-border-7) transparent;
  }
}

/* Page background from the handoff: editor colour + an accent glow + a dotted grid (Projects, Experience, empty editor). */
@utility bg-dotted-glow {
  background-color: var(--color-editor);
  background-image:
    radial-gradient(at 50% 40%, rgba(199, 125, 187, 0.086), transparent 65%),
    radial-gradient(circle, rgba(166, 169, 182, 0.13) 0.7px, transparent 0.9px);
  background-size:
    100% 100%,
    22px 22px;
  background-position:
    center center,
    center center;
}

body {
  margin: 0;
  background-color: var(--color-editor);
  color: var(--color-text);
  font-family: var(--font-sans);
}
`,Pe={colors:"Kolory",sizes:"Rozmiary czcionek",fonts:"Fonty",radii:"Zaokrąglenia",shadows:"Cienie",breakpoints:"Breakpointy"},Ve=Object.assign({"/src/design-system/components/Badge/Badge.tsx":rn,"/src/design-system/components/Button/Button.tsx":sn,"/src/design-system/components/Chat/Chat.tsx":ln,"/src/design-system/components/ChatLauncher/ChatLauncher.tsx":cn,"/src/design-system/components/Chip/Chip.tsx":dn,"/src/design-system/components/Container/Container.tsx":pn,"/src/design-system/components/DataCard/DataCard.tsx":mn,"/src/design-system/components/Gallery/Gallery.tsx":un,"/src/design-system/components/Guide/Guide.tsx":xn,"/src/design-system/components/IconButton/IconButton.tsx":hn,"/src/design-system/components/InfoCard/InfoCard.tsx":yn,"/src/design-system/components/Input/Input.tsx":fn,"/src/design-system/components/Label/Label.tsx":bn,"/src/design-system/components/Link/Link.tsx":gn,"/src/design-system/components/List/List.tsx":kn,"/src/design-system/components/Menu/Menu.tsx":zn,"/src/design-system/components/Panel/Panel.tsx":wn,"/src/design-system/components/RailButton/RailButton.tsx":jn,"/src/design-system/components/SearchField/SearchField.tsx":vn,"/src/design-system/components/SolutionExplorer/SolutionExplorer.tsx":Sn,"/src/design-system/components/SplitPanel/SplitPanel.tsx":Tn,"/src/design-system/components/StatusBar/StatusBar.tsx":Cn,"/src/design-system/components/Tabs/Tabs.tsx":Nn,"/src/design-system/components/Terminal/Terminal.tsx":Bn,"/src/design-system/components/Text/Text.tsx":Ln,"/src/design-system/components/Textarea/Textarea.tsx":Pn,"/src/design-system/components/TitleBar/TitleBar.tsx":Mn}),_=new Map,_n=Fn.match(/@theme\s*\{([\s\S]*?)\n\}/)?.[1]??"";for(const t of _n.matchAll(/^\s*(--[\w-]+):\s*(.+?);/gm))_.set(t[1]??"",(t[2]??"").trim());const In=t=>t.startsWith("--color-")?"colors":t.startsWith("--text-")&&!t.includes("--line-height")?"sizes":t.startsWith("--font-")?"fonts":t.startsWith("--radius-")?"radii":t.startsWith("--shadow-")?"shadows":t.startsWith("--breakpoint-")?"breakpoints":null,Rn={bg:"tło",text:"kolor tekstu",border:"obramowanie",outline:"obrys",ring:"obrys",fill:"wypełnienie",stroke:"kreska",caret:"kursor",divide:"separator",from:"gradient",to:"gradient",via:"gradient"},An=/^(bg|text|border-[trblxyse]|border|outline|ring|fill|stroke|caret|divide|from|to|via)-(.+)$/,Ze=new Map;for(const[t,n]of Object.entries(Ve))if(t.endsWith("/Text/Text.tsx"))for(const o of n.matchAll(/\[(\w+\.\w+)\]:\s*'([^']+)'/g))Ze.set(o[1]??"",o[2]??"");function Dn(t){const n=[];let o=0,a=0;for(let c=0;c<t.length;c++){const s=t[c];s==="["||s==="("?o++:s==="]"||s===")"?o--:s===":"&&o===0&&(n.push(t.slice(a,c)),a=c+1)}return n.push(t.slice(a)),{variants:n.slice(0,-1),base:n[n.length-1]}}function En(t){let n=0;for(let o=0;o<t.length;o++){const a=t[o];if(a==="["||a==="(")n++;else if(a==="]"||a===")")n--;else if(a==="/"&&n===0)return t.slice(0,o)}return t}function Me(t,n,o=t){const{variants:a,base:c=""}=Dn(t);for(const d of a){const f=d.match(/^(?:max-)?(bp\d+)$/);f&&_.has(`--breakpoint-${f[1]}`)&&n(`--breakpoint-${f[1]}`,"zmiana układu",d)}const s=En(c.replace(/^[!-]/,"")),m=s.match(An);if(m){const d=m[2]??"";if(m[1]==="text"&&_.has(`--text-${d}`)){n(`--text-${d}`,"rozmiar czcionki",o);return}if(_.has(`--color-${d}`)){const f=a.includes("placeholder")&&m[1]==="text"?"kolor placeholdera":Rn[(m[1]??"").replace(/-[trblxyse]$/,"")]??"kolor";n(`--color-${d}`,f,o);return}}const p=s.match(/^rounded(?:-[trblse]{1,2})?-(.+)$/);if(p&&_.has(`--radius-${p[1]}`))return n(`--radius-${p[1]}`,"zaokrąglenie",o);const u=s.match(/^shadow-(.+)$/);if(u&&_.has(`--shadow-${u[1]}`))return n(`--shadow-${u[1]}`,"cień",o);const b=s.match(/^font-(sans|mono|tree)$/);if(b&&_.has(`--font-${b[1]}`))return n(`--font-${b[1]}`,"font",o)}const Fe=new Map;function Ue(t){const n=Fe.get(t);if(n)return n;const o=new Map,a=(p,u,b)=>{const d=o.get(p)??{roles:new Set,classes:new Set};d.roles.add(u),d.classes.add(b),o.set(p,d)},c=new Set;for(const[p,u]of Object.entries(Ve)){if(!p.includes(`/components/${t}/`))continue;const b=u.replace(/\/\*[\s\S]*?\*\//g,"").replace(/(^|[^:])\/\/.*$/gm,"$1");for(const d of b.split(/[\s'"`{}]+/))d&&Me(d,a);for(const d of b.matchAll(/var\((--[\w-]+)/g))_.has(d[1]??"")&&a(d[1]??"","wartość arbitralna",`var(${d[1]})`);for(const d of b.matchAll(/from '\.\.\/(\w+)'/g))c.add(d[1]??"");if(!p.endsWith("/Text/Text.tsx"))for(const d of b.matchAll(/\b(FontSize|TextColor|FontFamily|FontWeight)\.(\w+)/g)){const f=Ze.get(`${d[1]}.${d[2]}`);f&&Me(f,a,`${d[1]}.${d[2]}`)}}const m={groups:Object.keys(Pe).map(p=>({category:p,label:Pe[p],tokens:[...o.entries()].filter(([u])=>In(u)===p).map(([u,b])=>({token:u,category:p,value:_.get(u)??"",roles:[...b.roles],classes:[...b.classes].slice(0,4)})).sort((u,b)=>u.token.localeCompare(b.token))})).filter(p=>p.tokens.length),dependencies:[...c].filter(p=>p!==t)};return Fe.set(t,m),m}const Hn=/(\/\/.*$|\/\*[\s\S]*?\*\/)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][\w.]*)|\b(import|from|export|const|let|function|return|type|interface|as|true|false|null|undefined)\b|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w-]*)(?==)/gm,Wn=["italic text-text-faint","text-file-cs","text-accent-light","text-accent","text-explorer-active","text-num-02"];function On(t){const n=[];let o=0;for(const a of t.matchAll(Hn)){const c=a.index??0;c>o&&n.push(t.slice(o,c));const s=a.slice(1).findIndex(m=>m!==void 0);n.push(e.jsx("span",{className:Wn[s],children:a[0]},c)),o=c+a[0].length}return o<t.length&&n.push(t.slice(o)),n}function Gn({code:t}){const[n,o]=x.useState(!1);async function a(){try{await navigator.clipboard.writeText(t),o(!0),setTimeout(()=>o(!1),1500)}catch{o(!1)}}return e.jsxs("div",{className:"relative overflow-hidden rounded-xl border border-border-5 bg-shell",children:[e.jsx(T,{size:K.Sm,icon:n?e.jsx(_t,{}):e.jsx(Rt,{}),"aria-label":n?"Skopiowano":"Kopiuj kod",onClick:a,className:"absolute top-3 right-3 z-[1]"}),e.jsx("pre",{className:"m-0 scrollbar-subtle overflow-x-auto p-5 pr-14",children:e.jsx(r,{as:"div",size:i.Small,font:y.Mono,color:l.Body,className:"leading-[1.7] whitespace-pre",children:e.jsx("code",{children:On(t)})})})]})}const $n=`import type { HTMLAttributes, ReactNode } from 'react'

export const BadgeTone = {
  /** Szare obramowanie i przygaszony tekst. */
  Neutral: 'neutral',
  /** Obramowanie w kolorze akcentu i jasny tekst akcentowy. */
  Accent: 'accent',
} as const
export type BadgeTone = (typeof BadgeTone)[keyof typeof BadgeTone]

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Odcień etykiety: neutralny albo akcentowy (np. bieżące stanowisko).
   * @default BadgeTone.Neutral
   */
  tone?: BadgeTone
  /** Treść etykiety, np. zakres dat. */
  children: ReactNode
}
`,Kn=`import type { AnchorHTMLAttributes, ReactNode } from 'react'

export const ButtonVariant = {
  /** Wypełniony kolorem akcentu — główna akcja na widoku. */
  Primary: 'primary',
  /** Przezroczysty z obramowaniem — akcja poboczna. */
  Outline: 'outline',
  /** Wypełniony neutralnym tłem z obramowaniem, akcentowy po najechaniu — np. „Pobierz CV ↓". */
  Secondary: 'secondary',
} as const
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant]

export const ButtonSize = {
  /** Przycisk akcji na stronie: minimalna wysokość 44 px, font mono 12 px. */
  Md: 'md',
  /** Kompaktowy, do kart i nakładek (np. przyciski przewodnika): padding 8×12 px, font sans 12 px. */
  Sm: 'sm',
  /** Mały odnośnik-przycisk (np. linki społecznościowe na Contact): padding 7×12 px, font mono 12 px. */
  Xs: 'xs',
  /** Przycisk w stopce karty (np. „Repozytorium"): wysokość 40 px, padding 14 px, promień 5 px, font mono 12 px. */
  Card: 'card',
  /** Wysłanie formularza: padding 12×18 px, font sans 13 px. */
  Lg: 'lg',
} as const
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize]

export interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /**
   * Adres. Z \`href\` przycisk jest odnośnikiem \`<a>\` wyglądającym jak przycisk (np. link do pliku CV);
   * bez niego — zwykłym \`<button>\`.
   */
  href?: string
  /** Wyłącza przycisk (tylko bez \`href\`). */
  disabled?: boolean
  /**
   * Wygląd przycisku.
   * @default ButtonVariant.Primary
   */
  variant?: ButtonVariant
  /**
   * Rozmiar przycisku.
   * @default ButtonSize.Md
   */
  size?: ButtonSize
  /** Etykieta przycisku. */
  children: ReactNode
}
`,Xn=`import type { HTMLAttributes, ReactNode } from 'react'

export const ChatMessageRole = {
  /** Odpowiedź asystenta — bąbelek po lewej. */
  Assistant: 'assistant',
  /** Wiadomość użytkownika — bąbelek po prawej, w tonacji akcentu. */
  User: 'user',
} as const
export type ChatMessageRole = (typeof ChatMessageRole)[keyof typeof ChatMessageRole]

export interface ChatMessage {
  /** Unikalny identyfikator wiadomości (klucz listy). */
  id: string | number
  /** Autor wiadomości — decyduje o stronie i kolorze bąbelka. */
  role: ChatMessageRole
  /** Treść bąbelka. Białe znaki i nowe linie są zachowane. */
  content: ReactNode
  /** Akcja w formie linku pod odpowiedzią asystenta, np. „Zobacz w portfolio →". */
  action?: { label: string; onAction: () => void }
}

/** Teksty interfejsu czatu (nazwy dostępne) — do podmiany np. przy zmianie języka. */
export interface ChatLabels {
  /** Dostępna nazwa przycisku zamykania. */
  closeButton: string
  /** Dostępna nazwa pola wiadomości. */
  messageInput: string
  /** Dostępna nazwa przycisku wysyłania. */
  sendButton: string
}

export interface ChatProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Dostępna nazwa okna dialogowego (czytana przez czytniki ekranu). */
  'aria-label': string
  /** Tytuł w nagłówku okna, np. „Asystent portfolio". */
  title: string
  /** Podpis pod tytułem. */
  subtitle?: string
  /**
   * Tekst w kwadracie awatara.
   * @default 'AI'
   */
  avatar?: string
  /** Lista wiadomości wyświetlana w logu — stan trzyma aplikacja. */
  messages: ChatMessage[]
  /** Szybkie pytania (chipy) pod logiem; kliknięcie wysyła je jako wiadomość. */
  topics?: string[]
  /** Placeholder pola wiadomości. */
  placeholder?: string
  /** Krótka uwaga pod polem wiadomości, np. że odpowiedzi są demonstracyjne. */
  note?: string
  /**
   * Teksty interfejsu; pominięte pola mają polskie wartości domyślne („Zamknij czat",
   * „Wiadomość do asystenta", „Wyślij wiadomość").
   */
  labels?: Partial<ChatLabels>
  /** Wywoływane z przyciętym, niepustym tekstem — aplikacja dopisuje wiadomość użytkownika i odpowiedź. */
  onSend: (text: string) => void
  /** Wywoływane przez krzyżyk i klawisz Esc. */
  onClose: () => void
  /**
   * Maksymalna długość wiadomości.
   * @default 1000
   */
  maxLength?: number
  /**
   * Czy okno jest widoczne. \`false\` ukrywa je (\`hidden\`), ale zachowuje wpisany tekst; po ponownym
   * otwarciu wiadomości przewijają się na dół, a fokus trafia na pole wiadomości.
   * Przy pierwszym renderowaniu fokus nie jest przejmowany.
   * @default true
   */
  open?: boolean
}
`,Vn=`import type { ComponentPropsWithRef, ReactNode } from 'react'

export interface ChatLauncherProps extends ComponentPropsWithRef<'button'> {
  /** Ikona przed podpisem (renderowana w 18 px), np. dymek czatu. */
  icon?: ReactNode
  /** Podpis przycisku, np. „Zapytaj o mnie". */
  children: ReactNode
}
`,Zn=`import type { HTMLAttributes, ReactNode } from 'react'

export const ChipVariant = {
  /** Chip strony Stack: font mono 12,5 px, opcjonalna ikona (15 px), promień 3 px. */
  Default: 'default',
  /** Chip w kartach strony Home („Kluczowe technologie"): font mono 11,5 px. */
  Mono: 'mono',
  /** Mały chip przy warstwach architektury: font mono 10,5 px, ciaśniejszy padding. */
  Compact: 'compact',
  /** Znacznik technologii na stronie projektu („Technologie"): font mono 11 px, padding 5/9 px. */
  Tech: 'tech',
  /** Znacznik technologii w opisie stanowiska (Experience): font mono 11,5 px, padding 4/10 px, promień 3 px. */
  Position: 'position',
} as const
export type ChipVariant = (typeof ChipVariant)[keyof typeof ChipVariant]

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /**
   * Wygląd i rozmiar chipa.
   * @default ChipVariant.Default
   */
  variant?: ChipVariant
  /** Ikona przed nazwą technologii — SVG albo \`<img>\`, wyświetlana w 15 px. Tylko wariant \`Default\`. */
  icon?: ReactNode
  /** Nazwa technologii. */
  children: ReactNode
}
`,Un=`import type { HTMLAttributes } from 'react'

export const ContainerSize = {
  /** 900 px — strony z treścią. */
  Default: 'default',
  /** 1280 px — szerokie układy, np. sidebar + treść. */
  Wide: 'wide',
} as const
export type ContainerSize = (typeof ContainerSize)[keyof typeof ContainerSize]

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Maksymalna szerokość kontenera.
   * @default ContainerSize.Default
   */
  size?: ContainerSize
}
`,Jn=`import type { HTMLAttributes, ReactNode } from 'react'

export interface DataCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Tytuł paska nagłówka; wyświetlany dużymi literami, np. „Ścieżka w skrócie". */
  title: ReactNode
  /** Licznik w małej plakietce po tytule, np. liczba wierszy. */
  count?: number | string
  /** Element po prawej stronie paska, zwykle \`DataCardAction\` („Otwórz →"). */
  action?: ReactNode
  /** Zawartość karty pod paskiem: \`DataCardList\`, chipy itp. */
  children: ReactNode
}

export interface DataCardActionProps extends HTMLAttributes<HTMLButtonElement> {
  /** Podpis akcji, np. „Otwórz →". */
  children: ReactNode
}

export interface DataCardListProps extends HTMLAttributes<HTMLUListElement> {
  /** Wiersze: \`DataCardRow\`. */
  children: ReactNode
}

export interface DataCardRowProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Główny tekst wiersza, np. stanowisko. */
  title: ReactNode
  /** Opcjonalny drugi wiersz pod tytułem, np. nazwa firmy. */
  subtitle?: ReactNode
  /** Opcjonalna plakietka po prawej, np. daty lub nazwa wystawcy certyfikatu. */
  tag?: ReactNode
}
`,qn=`import type { ReactNode } from 'react'

export interface GallerySlide {
  /** Adres obrazu. Bez niego slajd pokazuje placeholder „Miejsce na zdjęcie". */
  src?: string
  /** Tekst alternatywny obrazu; służy też jako klucz slajdu, więc powinien być unikalny. */
  alt: string
}

/** Teksty interfejsu galerii (nazwy dostępne i placeholder) — do podmiany np. przy zmianie języka. */
export interface GalleryLabels {
  /** Opis roli galerii dla czytników ekranu (\`aria-roledescription\`). */
  carousel: string
  /** Dostępna nazwa przycisku „poprzedni slajd". */
  previous: string
  /** Dostępna nazwa przycisku „następny slajd". */
  next: string
  /** Dostępna nazwa grupy kropek wyboru slajdu. */
  slides: string
  /** Dostępna nazwa kropki slajdu o danym numerze (od 1). */
  slide: (number: number) => string
  /** Podpis placeholdera slajdu bez obrazu, dla slajdu o danym numerze (od 1). */
  placeholder: (number: number) => string
  /** Drugi wiersz placeholdera. */
  placeholderNote: string
}

export interface GalleryProps {
  /**
   * Nagłówek nad galerią.
   * @default 'GALERIA PROJEKTU'
   */
  heading?: ReactNode
  /**
   * Teksty interfejsu; brakujące pola mają polskie wartości domyślne („Poprzedni slajd", „Następny slajd",
   * „Wybierz slajd", „Pokaż slajd 2", „Miejsce na zdjęcie 1"…).
   */
  labels?: Partial<GalleryLabels>
  /** Lista slajdów. */
  slides: GallerySlide[]
  /** Indeks aktualnego slajdu (od 0) — komponent jest kontrolowany. */
  activeIndex: number
  /** Wywoływane przy zmianie slajdu strzałką, kropką albo klawiaturą (←/→); nawigacja zawija się na końcach. */
  onActiveIndexChange: (index: number) => void
  /** Dostępna nazwa karuzeli. */
  'aria-label': string
  /** Dodatkowe klasy głównego elementu. */
  className?: string
}
`,Yn=`import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export interface GuideCardProps {
  /** Numer bieżącego kroku (od 1), pokazywany w etykiecie „PRZEWODNIK / N Z M". */
  step: number
  /** Liczba wszystkich kroków. */
  totalSteps: number
  /** Tytuł kroku. */
  title: ReactNode
  /** Główna treść kroku (po polsku). */
  children: ReactNode
  /** Opcjonalne tłumaczenie na angielski, w kursywie pod treścią. */
  translation?: ReactNode
  /** Opcjonalna, dodatkowa akcja w formie linku, np. „Przełącz język / Switch language →". */
  actionLabel?: ReactNode
  /** Wywoływane po kliknięciu akcji z \`actionLabel\`. */
  onAction?: () => void
  /** Wywoływane przez „Pomiń". */
  onSkip: () => void
  /** Wywoływane przez „Wstecz". Pominięte wyłącza przycisk (pierwszy krok). */
  onBack?: () => void
  /** Wywoływane przez „Dalej" lub „Gotowe". */
  onNext: () => void
  /**
   * Zamienia etykietę przycisku „Dalej →" na „Gotowe".
   * @default false
   */
  isLastStep?: boolean
  /**
   * Zachowanie okna modalnego (ustawia \`aria-modal\`): fokus trafia na „Dalej" po każdym kroku,
   * Esc działa jak „Pomiń", Tab krąży wyłącznie po przyciskach karty, a po zamknięciu fokus wraca
   * do elementu, który miał go wcześniej. Włączaj dla pełnej nakładki, nie dla statycznego podglądu.
   * @default false
   */
  modal?: boolean
  /**
   * Element, przy którym karta ma się ustawić (prostokąt w pikselach okna, zwykle z
   * \`getBoundingClientRect()\`): po jego prawej stronie, a gdy brakuje miejsca — pod nim lub nad nim.
   * Pozycja jest przeliczana przy zmianie kroku i rozmiaru okna. Wymaga \`position: fixed\` (domyślne).
   */
  anchor?: GuideHighlightRect
  /** Style inline — pozycja karty (\`top\`, \`left\`), gdy nie używasz \`anchor\`; karta jest \`position: fixed\`. */
  style?: CSSProperties
  /** Dodatkowe klasy głównego elementu. */
  className?: string
}

export interface GuideHighlightRect {
  /** Odległość od górnej krawędzi okna (px). */
  top: number
  /** Odległość od lewej krawędzi okna (px). */
  left: number
  /** Szerokość podświetlenia (px). */
  width: number
  /** Wysokość podświetlenia (px). */
  height: number
}

export interface GuideHighlightProps {
  /** Prostokąt (w pikselach okna), który ma być podświetlony — zwykle z \`getBoundingClientRect()\`. */
  rect: GuideHighlightRect
  /** Dodatkowe klasy. */
  className?: string
}

/** Półprzezroczyste tło przyciemniające stronę; przyjmuje atrybuty \`<div>\` (np. \`onClick\`, żeby zamknąć przewodnik). */
export type GuideShadeProps = HTMLAttributes<HTMLDivElement>
`,Qn=`import type { ButtonHTMLAttributes, ReactNode } from 'react'

export const IconButtonSize = {
  /** Stały kwadrat 32 px — przyciski narzędzi (Terminal, Asystent, ...). */
  Md: 'md',
  /** Rozmiar dopasowany do ikony z paddingiem 3 px — kompaktowe paski narzędzi, np. Solution Explorer. */
  Sm: 'sm',
} as const
export type IconButtonSize = (typeof IconButtonSize)[keyof typeof IconButtonSize]

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ikona przycisku (renderowana w 16 px). */
  icon: ReactNode
  /** Dostępna nazwa przycisku — wymagana, bo przycisk nie ma widocznego tekstu. */
  'aria-label': string
  /**
   * Stan „włączony": jaśniejsze tło i tekst.
   * @default false
   */
  active?: boolean
  /**
   * Rozmiar przycisku.
   * @default IconButtonSize.Md
   */
  size?: IconButtonSize
}
`,eo=`import type { HTMLAttributes, ReactNode } from 'react'

export interface InfoCardProps extends HTMLAttributes<HTMLElement> {
  /** Etykieta na pasku nagłówka, np. „DANE FIRMY". */
  header: ReactNode
  /** Wiersze \`InfoRow\`. */
  children: ReactNode
}

export interface InfoRowProps {
  /** Etykieta wiersza (wersalikami, mała, przygaszona). */
  label: ReactNode
  /** Wartość wiersza; wielolinijkowe (np. adres) można zapisać przez \`<br />\`. */
  children: ReactNode
}
`,to=`import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Etykieta nad polem, powiązana z nim przez \`htmlFor\`/\`id\`. Bez niej pole nie ma widocznej etykiety. */
  label?: string
}
`,no=`import type { HTMLAttributes, ReactNode } from 'react'

export const LabelTone = {
  /** Przygaszony szary — domyślny nagłówek panelu. */
  Muted: 'muted',
  /** Jasny akcent — kicker nad tytułem strony. */
  Accent: 'accent',
} as const
export type LabelTone = (typeof LabelTone)[keyof typeof LabelTone]

export const LabelSize = {
  /** 9 px — np. etykiety w rail. */
  Sm: 'sm',
  /** 9,5 px — np. paski nagłówków list i kart. */
  Md: 'md',
} as const
export type LabelSize = (typeof LabelSize)[keyof typeof LabelSize]

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Kolor etykiety.
   * @default LabelTone.Muted
   */
  tone?: LabelTone
  /**
   * Rozmiar czcionki i rozstaw liter.
   * @default LabelSize.Md
   */
  size?: LabelSize
  /** Tekst etykiety (wyświetlany wersalikami). */
  children: ReactNode
}
`,oo=`import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { FontSize, FontWeight } from '../Text'

export const LinkTone = {
  /** Kolor akcentu (różowy) — akcje w treści, np. „Zobacz w portfolio →". */
  Accent: 'accent',
  /** Niebieski, podkreślany po najechaniu — odnośniki w treści stron, np. „Poznaj mnie →". */
  Info: 'info',
} as const
export type LinkTone = (typeof LinkTone)[keyof typeof LinkTone]

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /**
   * Adres. Z \`href\` komponent renderuje odnośnik \`<a>\`; bez niego — przycisk (\`<button>\`)
   * uruchamiający akcję z \`onClick\`, np. „Zobacz w portfolio →".
   */
  href?: string
  /**
   * Kolor odnośnika.
   * @default LinkTone.Accent
   */
  tone?: LinkTone
  /**
   * Podkreślenie (dolna linia w kolorze akcentu, jaśniejsza po najechaniu).
   * @default false
   */
  underline?: boolean
  /** Rozmiar czcionki ze skali. Pominięty jest dziedziczony z rodzica. */
  size?: FontSize
  /** Grubość czcionki. Pominięta jest dziedziczona z rodzica. */
  weight?: FontWeight
  /** Treść odnośnika. */
  children: ReactNode
}
`,ao=`import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

export const ListItemVariant = {
  /** Wiersz Experience: tytuł, opcjonalny podtytuł i treść po prawej. */
  Detail: 'detail',
  /** Wiersz filtra kategorii (Stack): jedna linia mono 12 px. W wąskim kontenerze (\`@container\` < 700 px) układa się w rząd. */
  Filter: 'filter',
} as const
export type ListItemVariant = (typeof ListItemVariant)[keyof typeof ListItemVariant]

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  /** Etykieta paska nagłówka, np. „Stanowiska" (Experience) albo „Kategorie" (Stack). */
  header?: ReactNode
  /** Licznik obok nagłówka, np. liczba elementów. */
  count?: number | string
  /**
   * Pokazuje własny wiersz wyszukiwania między nagłówkiem a elementami
   * (płaska, bezramkowa szukajka ze Stack). To prywatny element List — nie jest
   * publicznym \`SearchField\` i nie da się go użyć poza listą.
   * @default false
   */
  searchable?: boolean
  /** Atrybuty przekazywane do pola wyszukiwania (bez \`type\`): \`placeholder\`, \`value\`, \`onChange\` itd. */
  searchProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
  /** Elementy \`ListItem\`. */
  children: ReactNode
}

export interface ListItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /**
   * Wygląd wiersza. \`Filter\` nie obsługuje \`subtitle\` ani \`trailing\`.
   * @default ListItemVariant.Detail
   */
  variant?: ListItemVariant
  /**
   * Zaznaczony element: akcentowy pasek z lewej, jaśniejsze tło, większy lewy padding.
   * @default false
   */
  active?: boolean
  /** Główny tekst wiersza, np. nazwa firmy. */
  title: ReactNode
  /** Druga linia pod tytułem, np. rola — w stanie aktywnym przyjmuje kolor akcentu. */
  subtitle?: ReactNode
  /** Ramkowana etykieta po prawej, np. zakres dat; zmienia wygląd razem z wierszem (hover i stan aktywny). */
  tag?: ReactNode
  /** Dowolna treść wyrównana do końca wiersza, np. \`Badge\`. */
  trailing?: ReactNode
}
`,io=`import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface MenuProps extends HTMLAttributes<HTMLElement> {
  /** Etykieta paska nagłówka, np. „SZYBKI PRZEWODNIK". */
  header: ReactNode
  /** Dostępna nazwa nawigacji. */
  'aria-label': string
  /** Elementy \`MenuItem\` i grupy \`MenuGroup\`. Po nadaniu \`Menu\` klasy \`max-h-*\` lista przewija się wewnątrz karty, a nagłówek zostaje na górze. */
  children: ReactNode
}

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Zaznaczona pozycja: akcentowy pasek z lewej i podświetlone tło.
   * @default false
   */
  active?: boolean
  /**
   * Pozycja wewnątrz \`MenuGroup\` — większy lewy padding i ciemniejszy domyślny kolor.
   * @default false
   */
  nested?: boolean
  /** Etykieta pozycji. */
  children: ReactNode
}

export interface MenuGroupProps extends HTMLAttributes<HTMLDetailsElement> {
  /** Nazwa grupy widoczna na rozwijanym nagłówku. */
  label: ReactNode
  /**
   * Czy grupa jest domyślnie rozwinięta.
   * @default true
   */
  defaultOpen?: boolean
  /** Pozycje \`MenuItem\` z \`nested\`. */
  children: ReactNode
}
`,ro=`import type { HTMLAttributes, ReactNode } from 'react'

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Dodaje reakcję na najechanie (tło i obramowanie) — dla klikalnych paneli, np. kart projektów.
   * @default false
   */
  interactive?: boolean
  /**
   * Mocniejszy cień, dla panelu, który ma się wyraźnie wyróżniać na tle (np. formularz kontaktowy).
   * @default false
   */
  raised?: boolean
  /** Zawartość panelu. */
  children: ReactNode
}
`,so=`import type { ButtonHTMLAttributes, ReactNode } from 'react'

export const RailButtonAccent = {
  /** Fioletowy akcent — strony portfolio. */
  Accent: 'accent',
  /** Złoty — przełącznik explorera. */
  Explorer: 'explorer',
  /** Zielony — terminal. */
  Success: 'success',
  /** Pomarańczowy — czat / asystent. */
  Assistant: 'assistant',
} as const
export type RailButtonAccent = (typeof RailButtonAccent)[keyof typeof RailButtonAccent]

export const RailButtonIconSize = {
  /** 16 px — ikony stron. */
  Md: 'md',
  /** 17 px — ikona terminala. */
  Lg: 'lg',
  /** 18 px — ikona czatu. */
  Xl: 'xl',
} as const
export type RailButtonIconSize = (typeof RailButtonIconSize)[keyof typeof RailButtonIconSize]

export interface RailButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ikona przycisku; rozmiar określa \`iconSize\`. */
  icon: ReactNode
  /**
   * Rozmiar ikony.
   * @default RailButtonIconSize.Md
   */
  iconSize?: RailButtonIconSize
  /** Krótki, pionowy podpis pod ikoną, np. „WORK". Dekoracyjny (aria-hidden) — nazwą dostępną jest \`aria-label\`. */
  label: string
  /** Dostępna nazwa przycisku, np. „Projekty". */
  'aria-label': string
  /**
   * Aktywna strona: podświetlone tło, kolor akcentu i pasek z lewej. Ustawia też \`aria-pressed\`.
   * @default false
   */
  active?: boolean
  /**
   * Kolor stanu \`active\` (tekst, tło i pasek z lewej).
   * @default RailButtonAccent.Accent
   */
  accent?: RailButtonAccent
}
`,lo="import type { InputHTMLAttributes } from 'react'\n\n/** Wszystkie atrybuty `<input>` poza `type` (zawsze `search`), m.in. `value`, `onChange`, `placeholder`, `aria-label`. */\nexport type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>\n",co=`import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

/** Teksty interfejsu explorera — do podmiany np. przy zmianie języka. */
export interface SolutionExplorerLabels {
  /** Tytuł w nagłówku panelu. */
  title: string
  /** Dostępna nazwa drzewa plików. */
  tree: string
}

export interface SolutionExplorerProps extends HTMLAttributes<HTMLElement> {
  /** Przyciski paska narzędzi w nagłówku, np. \`IconButton\`y „rozwiń/zwiń wszystko" i „ukryj explorer". */
  tools?: ReactNode
  /** Element pod nagłówkiem, np. \`SearchField\` do wyszukiwania plików. */
  search?: ReactNode
  /**
   * Pokazuje wąski pasek (tylko \`collapsedContent\`) zamiast pełnego explorera.
   * @default false
   */
  collapsed?: boolean
  /** Zawartość zwiniętego paska — zwykle jeden \`IconButton\` „pokaż explorer". */
  collapsedContent?: ReactNode
  /** Element przypięty do dołu explorera pod drzewem, np. karta „Otwarty na współpracę". */
  footer?: ReactNode
  /** Teksty interfejsu; brakujące pola mają wartości domyślne („Solution Explorer", „Pliki rozwiązania"). */
  labels?: Partial<SolutionExplorerLabels>
  /** Drzewo: \`TreeFile\` i \`TreeFolder\`. */
  children: ReactNode
}

export interface TreeFileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Głębokość zagnieżdżenia — 0 dla elementów na najwyższym poziomie.
   * @default 0
   */
  level?: number
  /**
   * Zaznaczony plik: tło i akcentowy pasek z lewej.
   * @default false
   */
  active?: boolean
  /** Znacznik typu pliku, np. kolorowe „C#" albo ikona SVG. */
  icon: ReactNode
  /** Nazwa pliku. */
  children: ReactNode
}

export interface TreeFolderProps {
  /**
   * Głębokość zagnieżdżenia — 0 dla elementów na najwyższym poziomie.
   * @default 0
   */
  level?: number
  /** Nazwa folderu. */
  label: ReactNode
  /** Ikona folderu. */
  icon: ReactNode
  /**
   * Początkowy stan otwarcia w trybie niekontrolowanym (bez \`open\`).
   * @default true
   */
  defaultOpen?: boolean
  /** Kontrolowany stan otwarcia — przekaż razem z \`onToggle\` (np. dla „rozwiń/zwiń wszystko"). */
  open?: boolean
  /** Wywoływane po kliknięciu chevrona z nowym stanem otwarcia. */
  onToggle?: (open: boolean) => void
  /**
   * Zaznaczony folder.
   * @default false
   */
  active?: boolean
  /** Wywoływane po kliknięciu samego wiersza (zaznaczenie) — chevron tylko rozwija i zwija. */
  onClick?: () => void
  /** Zawartość folderu: kolejne \`TreeFile\` i \`TreeFolder\`. */
  children: ReactNode
}
`,po=`import type { HTMLAttributes, ReactNode } from 'react'

export const SplitPanelCollapseAt = {
  /** Experience (\`.xp\`) zwija się poniżej 700 px. */
  Bp700: 'bp700',
  /** Stack (\`.stack-panel\`) zwija się poniżej 820 px. */
  Bp820: 'bp820',
  /**
   * Stack w prototypie zwija się według szerokości kontenera: poniżej 700 px szerokości
   * rodzica z klasą \`@container\`, a nie okna. Rodzic musi być kontenerem (\`@container\`).
   */
  Container700: 'container700',
} as const
export type SplitPanelCollapseAt = (typeof SplitPanelCollapseAt)[keyof typeof SplitPanelCollapseAt]

export interface SplitPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Lewa kolumna (lista nadrzędna), np. \`List\` ze stanowiskami albo kategoriami. */
  aside: ReactNode
  /** Zawartość prawej kolumny (szczegóły). */
  children: ReactNode
  /**
   * Punkt, poniżej którego panel zwija się do jednej kolumny (lista nad szczegółami).
   * @default SplitPanelCollapseAt.Bp700
   */
  collapseAt?: SplitPanelCollapseAt
}
`,mo=`import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface StatusBarProps extends HTMLAttributes<HTMLElement> {
  /** Dostępna nazwa paska, np. „Pasek statusu". */
  'aria-label': string
  /** Elementy paska: \`StatusBarItem\`, \`StatusBarButton\`, \`StatusBarDivider\`, \`StatusBarSpacer\`, \`StatusBarSwitch\`. */
  children: ReactNode
}

export const StatusBarTone = {
  /** Kolor pomocniczy — ścieżka pliku, meta-informacje. */
  Default: 'default',
  /** Zielony — nazwa gałęzi. */
  Success: 'success',
  /** Bardzo przygaszony — wersja aplikacji. */
  Faint: 'faint',
} as const
export type StatusBarTone = (typeof StatusBarTone)[keyof typeof StatusBarTone]

export interface StatusBarItemProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /**
   * Kolor tekstu.
   * @default StatusBarTone.Default
   */
  tone?: StatusBarTone
  /**
   * Przycina zbyt długi tekst wielokropkiem i pozwala elementowi się zwężać (np. ścieżka pliku).
   * Bez tego element nie zmniejsza się i nie zawija.
   * @default false
   */
  truncate?: boolean
  /** Treść elementu. */
  children: ReactNode
}

export const StatusBarAccent = {
  /** Zielony — np. otwarty terminal. */
  Success: 'success',
  /** Pomarańczowy — kolor asystenta. */
  Assistant: 'assistant',
} as const
export type StatusBarAccent = (typeof StatusBarAccent)[keyof typeof StatusBarAccent]

export interface StatusBarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Adres. Z \`href\` element jest odnośnikiem \`<a>\` wyglądającym jak przycisk paska (np. link do dokumentacji);
   * bez niego — zwykłym \`<button>\`. Z \`href\` nie ma \`expanded\`.
   */
  href?: string
  /** Gdzie otworzyć odnośnik (tylko z \`href\`), np. \`_blank\`. */
  target?: string
  /** Relacja odnośnika (tylko z \`href\`), np. \`noopener\`. */
  rel?: string
  /** Ikona przed podpisem (renderowana w 13 px). */
  icon?: ReactNode
  /**
   * Stan przełączanego panelu. Gdy podany, ustawia \`aria-expanded\` i koloruje przycisk kolorem \`accent\`.
   * Pominięty — przycisk jest zwykłą akcją.
   */
  expanded?: boolean
  /**
   * Kolor przycisku, gdy \`expanded\` jest \`true\`.
   * @default StatusBarAccent.Success
   */
  accent?: StatusBarAccent
  /** Podpis przycisku. */
  children: ReactNode
}

export interface StatusBarSwitchOption<T extends string = string> {
  /** Wartość zwracana w \`onChange\`, np. \`'pl'\`. */
  value: T
  /** Widoczny podpis, np. „PL". */
  label: string
  /** Dostępna nazwa opcji, np. „Polski". Pominięta — używany jest \`label\`. */
  'aria-label'?: string
}

export interface StatusBarSwitchProps<T extends string = string> {
  /** Dostępna nazwa grupy, np. „Język". */
  'aria-label': string
  /** Dostępne opcje. */
  options: StatusBarSwitchOption<T>[]
  /** Aktualnie wybrana wartość. */
  value: T
  /** Wywoływane po kliknięciu opcji. */
  onChange: (value: T) => void
  /** Dodatkowe klasy CSS kontenera przełącznika. */
  className?: string
}
`,uo=`import type { HTMLAttributes, ReactNode } from 'react'

export interface TabsProps extends HTMLAttributes<HTMLElement> {
  /** Dostępna nazwa paska zakładek. */
  'aria-label': string
  /**
   * Włącza przeciąganie zakładek (i Alt+Shift+←/→); wywoływane z pełną, nową kolejnością
   * identyfikatorów po zakończeniu przeciągania. Bez tego zakładki nie zmieniają kolejności.
   */
  onReorder?: (newOrder: string[]) => void
  /** Zakładki \`Tab\`. */
  children: ReactNode
}

export interface TabProps {
  /** Wymagane przy przeciąganiu — identyfikuje zakładkę w kontrolerze \`Tabs\`, a jej kolejność jest zwracana przez \`onReorder\`. */
  id?: string
  /**
   * Zakładka aktywna: akcentowa kreska u góry i tło edytora.
   * @default false
   */
  active?: boolean
  /** Etykieta zakładki, np. nazwa pliku. */
  children: ReactNode
  /** Wywoływane po kliknięciu zakładki. */
  onSelect?: () => void
  /** Pokazuje przycisk zamykania i wywołuje się po jego kliknięciu. Bez tego zakładka jest zwykłą zakładką nawigacyjną. */
  onClose?: () => void
  /** Dostępna nazwa przycisku zamykania — wymagana razem z \`onClose\`. */
  closeLabel?: string
}
`,xo=`import type { HTMLAttributes, ReactNode } from 'react'

export const TerminalLineKind = {
  /** Zwykły wynik komendy. */
  Output: 'output',
  /** Echo wpisanej komendy (kolor liliowy). */
  Command: 'command',
  /** Komunikat błędu (kolor pomarańczowy). */
  Error: 'error',
} as const
export type TerminalLineKind = (typeof TerminalLineKind)[keyof typeof TerminalLineKind]

export interface TerminalLine {
  /** Unikalny identyfikator linii (klucz listy). */
  id: string | number
  /**
   * Rodzaj linii — decyduje o kolorze.
   * @default TerminalLineKind.Output
   */
  kind?: TerminalLineKind
  /** Treść linii. Nowe linie i spacje są zachowane. */
  content: ReactNode
}

/** Teksty interfejsu terminala (nazwy dostępne i podpis) — do podmiany np. przy zmianie języka. */
export interface TerminalLabels {
  /** Słowo w nagłówku panelu, po znaku zachęty \`>_\`. */
  title: string
  /** Dostępna nazwa i podpowiedź przycisku zamykania. */
  closeButton: string
  /** Dostępna nazwa uchwytu zmiany wysokości panelu. */
  resizeHandle: string
  /** Dostępna nazwa pola komendy. */
  commandInput: string
}

export interface TerminalProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Dostępna nazwa panelu terminala. */
  'aria-label': string
  /** Linie wyświetlane w logu — stan trzyma aplikacja. */
  lines: TerminalLine[]
  /** Klikalne chipy z komendami pod logiem; kliknięcie uruchamia komendę. */
  suggestions?: string[]
  /** Kandydaci do uzupełniania klawiszem Tab po wpisanym prefiksie. */
  completions?: string[]
  /**
   * Prompt przed polem komendy.
   * @default 'visitor@portfolio:~$'
   */
  prompt?: string
  /**
   * Przygaszony podpis po słowie „Terminal" w nagłówku.
   * @default '/ portfolio'
   */
  subtitle?: string
  /**
   * Teksty interfejsu; pominięte pola mają polskie wartości domyślne („Terminal", „Zamknij terminal",
   * „Zmień wysokość terminala", „Komenda terminala").
   */
  labels?: Partial<TerminalLabels>
  /** Wywoływane z przyciętą, niepustą komendą — aplikacja ją interpretuje i dopisuje linie. */
  onCommand: (command: string) => void
  /** Wywoływane przez krzyżyk i klawisz Esc. */
  onClose: () => void
  /**
   * Początkowa wysokość panelu w px (zmienna przeciąganiem; od 130 px do 55% wysokości okna).
   * @default 220
   */
  defaultHeight?: number
  /**
   * Czy panel jest widoczny. \`false\` ukrywa go (\`hidden\`), ale zachowuje historię komend, wysokość
   * i wpisany tekst; po ponownym otwarciu wyjście przewija się na dół, a fokus trafia na prompt.
   * Przy pierwszym renderowaniu fokus nie jest przejmowany.
   * @default true
   */
  open?: boolean
}
`,ho=`import type { HTMLAttributes, ReactNode, Ref } from 'react'

export const FontSize = {
  /** 9 px — najmniejsze etykiety (rail, kickery). */
  Nano: 'nano',
  /** 9,5 px — paski nagłówków list i kart. */
  Micro: 'micro',
  /** 10 px. */
  XXSmall: 'xxsmall',
  /** 11 px. */
  XSmall: 'xsmall',
  /** 12 px. */
  Small: 'small',
  /** 12,5 px. */
  SmallPlus: 'smallplus',
  /** 13 px — podstawowa treść interfejsu. */
  Medium: 'medium',
  /** 14 px. */
  Large: 'large',
  /** 15 px. */
  XLarge: 'xlarge',
  /** 17 px. */
  XXLarge: 'xxlarge',
  /** 20 px. */
  Title: 'title',
  /** 36 px — nagłówek strony. */
  Heading: 'heading',
  /** 44 px — największy nagłówek. */
  Display: 'display',
} as const
export type FontSize = (typeof FontSize)[keyof typeof FontSize]

export const TextColor = {
  /** Główny kolor tekstu. */
  Primary: 'primary',
  /** Kolor nagłówków. */
  Heading: 'heading',
  /** Kolor treści. */
  Body: 'body',
  /** Przygaszony — teksty pomocnicze. */
  Muted: 'muted',
  /** Wyraźnie przygaszony — opisy, podpisy. */
  Dim: 'dim',
  /** Bardzo przygaszony — etykiety, drugorzędne szczegóły. */
  Faint: 'faint',
  /** Odcień pośredni między Dim a Faint. */
  Dimmer: 'dimmer',
  /** Kolor akcentu. */
  Accent: 'accent',
  /** Jasny wariant akcentu. */
  AccentLight: 'accentlight',
} as const
export type TextColor = (typeof TextColor)[keyof typeof TextColor]

export const FontFamily = {
  /** IBM Plex Sans — tekst interfejsu. */
  Sans: 'sans',
  /** JetBrains Mono — kod, etykiety, przyciski. */
  Mono: 'mono',
} as const
export type FontFamily = (typeof FontFamily)[keyof typeof FontFamily]

export const FontWeight = {
  /** 400. */
  Normal: 'normal',
  /** 500. */
  Medium: 'medium',
  /** 600. */
  SemiBold: 'semibold',
} as const
export type FontWeight = (typeof FontWeight)[keyof typeof FontWeight]

/** Znaczniki HTML, którymi może być wyrenderowany \`Text\`. */
export type TextElement =
  | 'span'
  | 'p'
  | 'div'
  | 'strong'
  | 'small'
  | 'em'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'section'
  | 'aside'
  | 'header'
  | 'summary'
  | 'dt'
  | 'dd'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Rozmiar czcionki ze skali. Pominięty jest dziedziczony z rodzica. */
  size?: FontSize
  /** Kolor tekstu ze skali. Pominięty jest dziedziczony z rodzica. */
  color?: TextColor
  /** Rodzina czcionek. Pominięta jest dziedziczona z rodzica. */
  font?: FontFamily
  /** Grubość czcionki. Pominięta jest dziedziczona z rodzica. */
  weight?: FontWeight
  /**
   * Znacznik, którym wyrenderowany jest tekst.
   * @default 'span'
   */
  as?: TextElement
  /** Referencja do wyrenderowanego elementu. */
  ref?: Ref<HTMLElement>
  /** Treść. */
  children: ReactNode
}
`,yo=`import type { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Etykieta nad polem, powiązana z nim przez \`htmlFor\`/\`id\`. Bez niej pole nie ma widocznej etykiety. */
  label?: string
}
`,fo=`import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface TitleBarProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Krótki znak w akcentowym kafelku przed tytułem, np. \`W_\`. */
  logo: string
  /** Tytuł okna, np. „WiktorWijata / Portfolio". Zbyt długi jest przycinany wielokropkiem. */
  title: string
  /** Akcje po tytule: zwykle \`TitleBarButton\`. */
  children?: ReactNode
}

export const TitleBarButtonTone = {
  /** Niebieski przycisk „uruchom" (np. „Oprowadź mnie"). */
  Run: 'run',
  /** Bez tła, kolor akcentu — lekka akcja tekstowa (np. przełącznik explorera na telefonie). */
  Link: 'link',
} as const
export type TitleBarButtonTone = (typeof TitleBarButtonTone)[keyof typeof TitleBarButtonTone]

export interface TitleBarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Wygląd przycisku.
   * @default TitleBarButtonTone.Run
   */
  tone?: TitleBarButtonTone
  /** Ikona lub znak przed podpisem, np. \`▷\`. Dekoracyjne (aria-hidden). */
  icon?: ReactNode
  /** Podpis przycisku. */
  children: ReactNode
}
`,bo=Object.assign({"/src/design-system/components/Badge/Badge.types.ts":$n,"/src/design-system/components/Button/Button.types.ts":Kn,"/src/design-system/components/Chat/Chat.types.ts":Xn,"/src/design-system/components/ChatLauncher/ChatLauncher.types.ts":Vn,"/src/design-system/components/Chip/Chip.types.ts":Zn,"/src/design-system/components/Container/Container.types.ts":Un,"/src/design-system/components/DataCard/DataCard.types.ts":Jn,"/src/design-system/components/Gallery/Gallery.types.ts":qn,"/src/design-system/components/Guide/Guide.types.ts":Yn,"/src/design-system/components/IconButton/IconButton.types.ts":Qn,"/src/design-system/components/InfoCard/InfoCard.types.ts":eo,"/src/design-system/components/Input/Input.types.ts":to,"/src/design-system/components/Label/Label.types.ts":no,"/src/design-system/components/Link/Link.types.ts":oo,"/src/design-system/components/List/List.types.ts":ao,"/src/design-system/components/Menu/Menu.types.ts":io,"/src/design-system/components/Panel/Panel.types.ts":ro,"/src/design-system/components/RailButton/RailButton.types.ts":so,"/src/design-system/components/SearchField/SearchField.types.ts":lo,"/src/design-system/components/SolutionExplorer/SolutionExplorer.types.ts":co,"/src/design-system/components/SplitPanel/SplitPanel.types.ts":po,"/src/design-system/components/StatusBar/StatusBar.types.ts":mo,"/src/design-system/components/Tabs/Tabs.types.ts":uo,"/src/design-system/components/Terminal/Terminal.types.ts":xo,"/src/design-system/components/Text/Text.types.ts":ho,"/src/design-system/components/Textarea/Textarea.types.ts":yo,"/src/design-system/components/TitleBar/TitleBar.types.ts":fo}),Je=new Map,qe=new Map,Ye=new Map;function le(t){const n=t.join(`
`).replace(/^\s*\/\*\*/,"").replace(/\*\/\s*$/,"").split(`
`).map(c=>c.replace(/^\s*\*\s?/,"").trim()).filter(Boolean);let o;const a=[];for(const c of n){const s=c.match(/^@default\s+(.+)$/);s?o=s[1]:a.push(c)}return{description:a.join(" "),defaultValue:o}}function go(t){const n=t.split(/\r?\n/),o=s=>n[s]??"";let a=null;const c=()=>{const s=a;return a=null,s};for(let s=0;s<n.length;s++){const m=o(s);if(m.trim().startsWith("/**")){const f=[m];for(;!o(s).includes("*/");)f.push(o(++s));a=le(f);continue}const u=m.match(/^export const (\w+) = \{\s*$/);if(u){a=null;const f=[];let w=null;for(s++;!o(s).startsWith("}");s++){const g=o(s);if(g.trim().startsWith("/**")){const F=[g];for(;!o(s).includes("*/");)F.push(o(++s));w=le(F);continue}const z=g.match(/^\s+(\w+):\s*'([^']*)'/);z&&(f.push({key:z[1]??"",value:z[2]??"",description:w?.description??""}),w=null)}const[,h=""]=u;Ye.set(h,{name:h,members:f});continue}const b=m.match(/^export interface (\w+)(?:<[^>]*>)?(?: extends (.+?))? \{\s*$/);if(b){const f=c(),w=[];let h=null;for(s++;!o(s).startsWith("}");s++){const z=o(s);if(z.trim().startsWith("/**")){const je=[z];for(;!o(s).includes("*/");)je.push(o(++s));h=le(je);continue}const F=z.match(/^ {2}('?[\w-]+'?)(\?)?:\s*(.+?);?\s*$/);F&&(w.push({name:(F[1]??"").replace(/'/g,""),optional:!!F[2],type:F[3]??"",description:h?.description??"",defaultValue:h?.defaultValue}),h=null)}const[,g=""]=b;Je.set(g,{name:g,extends:b[2],description:f?.description??"",props:w});continue}const d=m.match(/^export type (\w+) =(.*)$/);if(d){const f=c(),[,w="",h=""]=d,g=h.trim();if(/^\(?typeof \w+\)?\[keyof typeof \w+\]$/.test(g))continue;const z=[g];for(;o(s+1).trim().startsWith("|");)z.push(o(++s).trim());qe.set(w,{name:w,type:z.join(" ").trim(),description:f?.description??""});continue}a=null}}Object.values(bo).forEach(go);const ko=t=>Je.get(t),zo=t=>qe.get(t),wo=t=>Ye.get(t),jo="border-b border-border-2 px-4 py-2.5 text-left align-bottom",q="border-b border-border-3 px-4 py-3 align-top";function oe({text:t}){return e.jsx(e.Fragment,{children:t.split("`").map((n,o)=>o%2?e.jsx("code",{className:"rounded-sm bg-hover px-1 font-mono text-[.92em] text-accent-light",children:n},o):n)})}function vo({prop:t}){return e.jsx(r,{size:i.Small,font:y.Mono,color:l.AccentLight,className:"break-words",children:t.type})}function So({prop:t}){const n=wo(t.type);return e.jsxs("div",{className:"flex flex-col gap-2",children:[t.description&&e.jsx(r,{size:i.Medium,color:l.Body,className:"leading-[1.6]",children:e.jsx(oe,{text:t.description})}),n&&e.jsx("ul",{className:"flex flex-col gap-1",children:n.members.map(o=>e.jsxs("li",{className:"flex flex-wrap items-baseline gap-x-2",children:[e.jsxs(r,{size:i.XSmall,font:y.Mono,color:l.Accent,children:[n.name,".",o.key]}),e.jsx(r,{size:i.Small,font:y.Mono,color:l.Faint,children:`'${o.value}'`}),o.description&&e.jsxs(r,{size:i.Small,color:l.Dim,children:["— ",e.jsx(oe,{text:o.description})]})]},o.key))})]})}function To({name:t}){const n=ko(t),o=zo(t);return!n&&!o?e.jsxs(r,{as:"p",size:i.Small,color:l.Dim,children:["Brak opisu typu ",t,"."]}):e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(r,{as:"h3",size:i.XLarge,font:y.Mono,weight:k.Medium,color:l.Heading,children:t}),(n?.extends||o)&&e.jsxs(r,{as:"p",size:i.Small,color:l.Dim,className:"leading-[1.6]",children:[n?.extends?"Przyjmuje też wszystkie propsy typu ":"Typ: ",e.jsx(r,{font:y.Mono,color:l.AccentLight,children:n?.extends??o?.type}),o?.description&&e.jsxs(e.Fragment,{children:[" — ",e.jsx(oe,{text:o.description})]})]}),n?.description&&e.jsx(r,{as:"p",size:i.Small,color:l.Dim,children:e.jsx(oe,{text:n.description})})]}),n&&n.props.length>0&&e.jsx("div",{className:"scrollbar-subtle overflow-x-auto rounded-xl border border-border-5 bg-card",children:e.jsxs("table",{className:"w-full min-w-[640px] border-collapse",children:[e.jsx("thead",{children:e.jsx("tr",{children:["Nazwa","Typ","Domyślnie","Opis"].map(a=>e.jsx("th",{className:jo,children:e.jsx(r,{size:i.Micro,font:y.Mono,weight:k.SemiBold,color:l.Dimmer,className:"tracking-[.1em] uppercase",children:a})},a))})}),e.jsx("tbody",{className:"[&>tr:last-child>td]:border-b-0",children:n.props.map(a=>e.jsxs("tr",{children:[e.jsxs("td",{className:`${q} w-[190px] whitespace-nowrap`,children:[e.jsx(r,{size:i.Small,font:y.Mono,weight:k.Medium,color:l.Primary,children:a.name}),!a.optional&&e.jsx(r,{size:i.Small,color:l.Accent,title:"Prop wymagany",className:"ml-1",children:"*"})]}),e.jsx("td",{className:`${q} w-[220px]`,children:e.jsx(vo,{prop:a})}),e.jsx("td",{className:`${q} w-[170px]`,children:e.jsx(r,{size:i.Small,font:y.Mono,color:a.defaultValue?l.Body:l.Faint,className:"break-words",children:a.defaultValue??"—"})}),e.jsx("td",{className:q,children:e.jsx(So,{prop:a})})]},a.name))})]})})]})}function Co({interfaces:t}){return e.jsxs("div",{className:"flex flex-col gap-8",children:[t.map(n=>e.jsx(To,{name:n},n)),e.jsx(r,{size:i.XSmall,font:y.Mono,color:l.Faint,children:"* prop wymagany"})]})}function No(){return e.jsxs(e.Fragment,{children:[e.jsx(R,{children:"2019.01 — 2021.11"}),e.jsx(R,{tone:I.Accent,children:"2021.11 — obecnie"})]})}function Bo(){return e.jsxs(e.Fragment,{children:[e.jsx(v,{icon:e.jsx(Ae,{}),children:"React"}),e.jsx(v,{icon:e.jsx(Dt,{}),children:"MSSQL"}),e.jsx(v,{icon:e.jsx(Zt,{}),children:".NET Core"}),e.jsx(v,{icon:e.jsx(Wt,{}),children:"REST API"}),e.jsx(v,{icon:e.jsx(De,{}),children:"Docker"}),e.jsx(v,{children:"TypeScript"}),e.jsx(v,{variant:U.Mono,children:"SQL Server"}),e.jsx(v,{variant:U.Compact,children:"gRPC"}),e.jsx(v,{variant:U.Tech,children:"Kubernetes"}),e.jsx(v,{variant:U.Position,children:"MassTransit"})]})}function Lo(){const[t,n]=x.useState(0);return e.jsxs("div",{className:"grid w-full grid-cols-2 gap-4 max-bp700:grid-cols-1",children:[e.jsx(me,{title:"Ścieżka w skrócie",action:e.jsx(ct,{onClick:()=>n(o=>o+1),children:t?`Otwórz → (${t})`:"Otwórz →"}),children:e.jsxs(ue,{children:[e.jsx(X,{title:".NET Developer",subtitle:"B3 Consulting Poland",tag:"2021.11 — obecnie"}),e.jsx(X,{title:".NET Developer",subtitle:"LSI Software",tag:"2019.01 — 2021.11"})]})}),e.jsx(me,{title:"Certyfikaty",children:e.jsxs(ue,{children:[e.jsx(X,{title:"Azure Developer Associate",tag:"Microsoft"}),e.jsx(X,{title:"MCSA: Web Applications",tag:"Microsoft"})]})})]})}function Po(){const[t,n]=x.useState(0),[o,a]=x.useState(0);return e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx(O,{header:"Stanowiska",count:3,className:"w-[360px] overflow-hidden rounded-md border border-border",children:["B3 Consulting Poland","LSI Software","GECOS"].map((c,s)=>e.jsx(D,{title:c,subtitle:".NET Developer",active:t===s,onClick:()=>n(s),tag:"2021.11 — obecnie"},c))}),e.jsx(O,{header:"Kategorie",count:3,searchable:!0,searchProps:{placeholder:"Szukaj technologii…","aria-label":"Szukaj technologii"},className:"w-[260px] overflow-hidden rounded-md border border-border",children:["Wszystkie","Backend","Frontend"].map((c,s)=>e.jsx(D,{variant:st.Filter,title:c,active:o===s,onClick:()=>a(s)},c))})]})}function Mo(){return e.jsxs(be,{header:"DANE FIRMY",className:"w-[345px]",children:[e.jsx(B,{label:"Nazwa",children:"Rescuepc Software Wiktor Wijata"}),e.jsx(B,{label:"NIP",children:"7681831348"}),e.jsx(B,{label:"REGON",children:"385601617"}),e.jsxs(B,{label:"Adres",children:["ul. Norwida 3 lok. 46",e.jsx("br",{}),"26-300 Opoczno",e.jsx("br",{}),"woj. łódzkie"]})]})}function Fo(){const[t,n]=x.useState(0);return e.jsx(lt,{"aria-label":"Galeria projektu Portfolio",className:"w-full max-w-[800px]",activeIndex:t,onActiveIndexChange:n,slides:[{alt:"Widok aplikacji — zdjęcie 1"},{alt:"Widok aplikacji — zdjęcie 2"},{alt:"Widok aplikacji — zdjęcie 3"}]})}const _o=[{id:"badge",api:{folder:"Badge",interfaces:["BadgeProps"]},usage:`import { Badge, BadgeTone } from './design-system'

<Badge>2019.01 — 2021.11</Badge>
<Badge tone={BadgeTone.Accent}>2021.11 — obecnie</Badge>`,name:"Badge",category:"data",summary:"Mała etykieta statusu lub daty, w tonie neutralnym albo akcentowym.",preview:e.jsxs("div",{className:"flex gap-2",children:[e.jsx(R,{children:"2019 — 2021"}),e.jsx(R,{tone:I.Accent,children:"obecnie"})]}),Demo:No},{id:"chip",api:{folder:"Chip",interfaces:["ChipProps"]},usage:`import { Chip, ChipVariant } from './design-system'

<Chip icon={<Code2 />}>React</Chip>
<Chip>TypeScript</Chip>

// mniejsze warianty (strona Home)
<Chip variant={ChipVariant.Mono}>SQL Server</Chip>
<Chip variant={ChipVariant.Compact}>gRPC</Chip>

// znacznik technologii na stronie projektu
<Chip variant={ChipVariant.Tech}>Kubernetes</Chip>

// znacznik technologii w opisie stanowiska (Experience)
<Chip variant={ChipVariant.Position}>MassTransit</Chip>`,name:"Chip",category:"data",summary:"Statyczny znacznik technologii z opcjonalną ikoną, w pięciu wariantach rozmiaru.",note:"Ikony to Lucide na ten etap, docelowo Devicon/Simple Icons w kolorach marek.",preview:e.jsxs("div",{className:"flex gap-2",children:[e.jsx(v,{icon:e.jsx(Ae,{}),children:"React"}),e.jsx(v,{children:"TypeScript"})]}),Demo:Bo},{id:"list",api:{folder:"List",interfaces:["ListProps","ListItemProps"]},usage:`import { List, ListItem, ListItemVariant, Badge } from './design-system'

<List header="Stanowiska" count={2}>
  <ListItem
    title="B3 Consulting Poland"
    subtitle=".NET Developer"
    active
    tag="2021.11 — obecnie"
  />
  <ListItem title="LSI Software" subtitle=".NET Developer" onClick={select} />
</List>

// z wbudowaną wyszukiwarką (jak w Stack)
<List
  header="Kategorie"
  count={2}
  searchable
  searchProps={{ placeholder: 'Szukaj technologii…', 'aria-label': 'Szukaj technologii' }}
>
  <ListItem variant={ListItemVariant.Filter} title="Wszystkie" active />
  <ListItem variant={ListItemVariant.Filter} title="Backend" />
</List>`,name:"List",category:"data",summary:"Lista z nagłówkiem, licznikiem i opcjonalną wyszukiwarką; wiersze z animowanym hoverem.",note:"Wiersz ListItem: po hoverze/aktywacji pojawia się akcentowy pasek, tło jaśnieje i rośnie lewy padding.",preview:e.jsx("div",{className:"w-full overflow-hidden rounded-md border border-border",children:e.jsxs(O,{header:"Kategorie",count:3,children:[e.jsx(D,{title:"Backend",active:!0}),e.jsx(D,{title:"Frontend"})]})}),Demo:Po},{id:"infocard",api:{folder:"InfoCard",interfaces:["InfoCardProps","InfoRowProps"]},usage:`import { InfoCard, InfoRow } from './design-system'

<InfoCard header="DANE FIRMY">
  <InfoRow label="NIP">7681831348</InfoRow>
  <InfoRow label="Adres">
    ul. Norwida 3 lok. 46
    <br />
    26-300 Opoczno
  </InfoRow>
</InfoCard>`,name:"InfoCard",category:"data",summary:"Karta tylko do odczytu: nagłówek i wiersze etykieta/wartość.",note:'.contact-company („Dane firmy" na Contact) — ta sama powierzchnia co List, bez interakcji.',preview:e.jsx(be,{header:"DANE FIRMY",className:"w-full",children:e.jsx(B,{label:"NIP",children:"7681831348"})}),Demo:Mo},{id:"gallery",api:{folder:"Gallery",interfaces:["GalleryProps","GalleryLabels","GallerySlide"]},usage:`import { useState } from 'react'
import { Gallery } from './design-system'

const [index, setIndex] = useState(0)

<Gallery
  aria-label="Galeria projektu Portfolio"
  activeIndex={index}
  onActiveIndexChange={setIndex}
  slides={[
    { src: '/img/home.png', alt: 'Strona główna' },
    { alt: 'Widok aplikacji — zdjęcie 2' }, // bez src: placeholder
  ]}
/>`,name:"Gallery",category:"data",summary:"Karuzela zdjęć projektu z placeholderami, strzałkami, kropkami i obsługą klawiatury.",note:".project-gallery (Portfolio.cs / karta projektu) — sprawdzone w computed style.",preview:e.jsxs("div",{className:"flex flex-col items-center gap-1.5",children:[e.jsx(r,{size:i.Title,color:l.Accent,font:y.Mono,children:"▧"}),e.jsxs("div",{className:"flex gap-1",children:[e.jsx("span",{className:"size-1.5 rounded-full bg-accent"}),e.jsx("span",{className:"size-1.5 rounded-full bg-[#60616a]"}),e.jsx("span",{className:"size-1.5 rounded-full bg-[#60616a]"})]})]}),Demo:Fo},{id:"datacard",api:{folder:"DataCard",interfaces:["DataCardProps","DataCardActionProps","DataCardListProps","DataCardRowProps"]},usage:`import { DataCard, DataCardAction, DataCardList, DataCardRow } from './design-system'

<DataCard
  title="Ścieżka w skrócie"
  action={<DataCardAction onClick={openExperience}>Otwórz →</DataCardAction>}
>
  <DataCardList>
    <DataCardRow title=".NET Developer" subtitle="B3 Consulting Poland" tag="2021.11 — obecnie" />
    <DataCardRow title=".NET Developer" subtitle="LSI Software" tag="2019.01 — 2021.11" />
  </DataCardList>
</DataCard>

// treść dowolna: np. chipy
<DataCard title="Kluczowe technologie">
  <div className="flex flex-wrap gap-2 p-3.5">
    <Chip variant={ChipVariant.Mono}>C#</Chip>
  </div>
</DataCard>`,name:"DataCard",category:"data",summary:"Karta z paskiem nagłówka (tytuł + akcja) i wierszami z tytułem, podtytułem i plakietką.",note:".home-card, .home-techbar i .arch2 na Home — wymiary, kolory i separatory zmierzone w prototypie.",preview:e.jsx(me,{title:"Certyfikaty",className:"w-full",children:e.jsx(ue,{children:e.jsx(X,{title:"Azure Developer Associate",tag:"Microsoft"})})}),Demo:Lo}];function Io(){return e.jsxs("div",{className:"flex w-full max-w-[420px] flex-col gap-4",children:[e.jsx(xe,{label:"Imię",placeholder:"Twoje imię"}),e.jsx(xe,{label:"E-mail",type:"email",placeholder:"ty@firma.pl"})]})}function Ro(){return e.jsx("div",{className:"w-full max-w-[420px]",children:e.jsx(Ee,{label:"Wiadomość",placeholder:"Czego dotyczy projekt lub propozycja współpracy?",className:"h-[140px]"})})}function Ao(){return e.jsxs("div",{className:"flex w-[200px] flex-col gap-2",children:[e.jsx(r,{size:i.XSmall,color:l.Dim,children:"SearchField — border, ikona SVG"}),e.jsx(ae,{placeholder:"Szukaj plików…"})]})}const Do=[{id:"input",api:{folder:"Input",interfaces:["InputProps"]},usage:`import { Input } from './design-system'

<Input
  label="Imię"
  placeholder="Twoje imię"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,name:"Input",category:"forms",summary:"Jednoliniowe pole tekstowe z etykietą.",preview:e.jsx(xe,{placeholder:"Twoje imię","aria-label":"Podgląd pola"}),Demo:Io},{id:"textarea",api:{folder:"Textarea",interfaces:["TextareaProps"]},usage:`import { Textarea } from './design-system'

<Textarea
  label="Wiadomość"
  placeholder="Czego dotyczy projekt lub propozycja współpracy?"
  maxLength={5000}
  className="h-[140px]"
/>`,name:"Textarea",category:"forms",summary:"Wieloliniowe pole tekstowe z etykietą i zmianą wysokości.",preview:e.jsx(Ee,{placeholder:"Wiadomość…","aria-label":"Podgląd pola",className:"h-[64px]"}),Demo:Ro},{id:"searchfield",api:{folder:"SearchField",interfaces:["SearchFieldProps"]},usage:`import { SearchField } from './design-system'

<SearchField
  placeholder="Szukaj plików…"
  aria-label="Szukaj plików w rozwiązaniu"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>`,name:"SearchField",category:"forms",summary:"Pole wyszukiwania z ikoną i obramowaniem.",note:".solution-search (Solution Explorer). Szukajka Stack jest prywatną częścią List.",preview:e.jsx(ae,{placeholder:"Szukaj plików…","aria-label":"Podgląd wyszukiwarki",className:"w-full"}),Demo:Ao}],Eo=[{id:"home",icon:e.jsx(Xe,{}),label:"ABOUT",ariaLabel:"O mnie"},{id:"projects",icon:e.jsx($e,{}),label:"WORK",ariaLabel:"Projekty"},{id:"skills",icon:e.jsx(pt,{}),label:"STACK",ariaLabel:"Stack technologiczny"},{id:"experience",icon:e.jsx(Xt,{}),label:"PATH",ariaLabel:"Doświadczenie"},{id:"contact",icon:e.jsx(We,{}),label:"MAIL",ariaLabel:"Kontakt"}];function Ho(){return e.jsxs("div",{className:"flex w-full flex-col gap-3",children:[Object.entries(i).map(([t,n])=>e.jsxs("div",{className:"flex items-baseline gap-4",children:[e.jsx(r,{size:i.XSmall,color:l.Faint,font:y.Mono,className:"w-20 shrink-0",children:t}),e.jsx(r,{size:n,color:l.Heading,children:"Wiktor Wijata — .NET Developer"})]},n)),e.jsx("div",{className:"mt-2 flex flex-wrap gap-x-6 gap-y-2",children:Object.entries(l).map(([t,n])=>e.jsx(r,{size:i.Large,color:n,children:t},n))}),e.jsxs("div",{className:"flex flex-wrap gap-x-6 gap-y-2",children:[e.jsx(r,{size:i.Large,font:y.Sans,color:l.Body,children:"Sans — IBM Plex Sans"}),e.jsx(r,{size:i.Large,font:y.Mono,color:l.Body,children:"Mono — JetBrains Mono"})]})]})}function Wo(){return e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(A,{tone:C.Accent,children:"Stack / Kompetencje"}),e.jsx(r,{size:i.XLarge,color:l.Heading,children:"Kicker nad h1, akcent"})]})}function Oo(){return e.jsxs(e.Fragment,{children:[e.jsx(j,{variant:S.Primary,children:"Zobacz projekty"}),e.jsx(j,{variant:S.Outline,children:"Pobierz CV ↓"}),e.jsx(j,{variant:S.Primary,disabled:!0,children:"Disabled"}),e.jsx(j,{variant:S.Secondary,href:"#/components/button",children:"Pobierz CV ↓"}),e.jsx(j,{size:J.Sm,children:"Mały (Sm)"}),e.jsx(j,{variant:S.Outline,size:J.Sm,children:"Mały outline"}),e.jsx(j,{variant:S.Secondary,size:J.Xs,href:"#/components/button",children:"LinkedIn ↗"}),e.jsx(j,{size:J.Lg,children:"Wyślij wiadomość ↗"})]})}function Go(){const[t,n]=x.useState(0);return e.jsxs("div",{className:"flex flex-col items-start gap-3",children:[e.jsxs(V,{onClick:()=>n(o=>o+1),children:["Zobacz w portfolio → ",t?`(${t})`:""]}),e.jsx(V,{underline:!0,size:i.Medium,weight:k.Medium,children:"Przełącz język / Switch language →"}),e.jsx(V,{tone:dt.Info,size:i.Small,children:"Wariant Info →"}),e.jsx(V,{href:"#/components/link",size:i.Small,children:"Prawdziwy odnośnik (a)"})]})}function $o(){return e.jsxs(e.Fragment,{children:[e.jsx(T,{icon:e.jsx(Ke,{}),"aria-label":"Terminal"}),e.jsx(T,{icon:e.jsx(we,{}),"aria-label":"Asystent",active:!0}),e.jsx(T,{icon:e.jsx(He,{}),"aria-label":"Szukaj"})]})}function Ko(){const[t,n]=x.useState("home");return e.jsx("div",{className:"flex items-center gap-[11px]",children:Eo.map(o=>e.jsx(te,{icon:o.icon,label:o.label,"aria-label":o.ariaLabel,active:t===o.id,onClick:()=>n(o.id)},o.id))})}const Xo=[{id:"text",api:{folder:"Text",interfaces:["TextProps"]},usage:`import { Text, FontSize, TextColor, FontFamily, FontWeight } from './design-system'

<Text size={FontSize.Large} color={TextColor.Heading} weight={FontWeight.Medium}>
  Wiktor Wijata
</Text>

// Inny znacznik i klasy dla wartości spoza skali
<Text as="h2" size={FontSize.XXLarge} font={FontFamily.Mono} className="tracking-[-.02em]">
  Doświadczenie
</Text>`,name:"Text",category:"general",summary:"Tekst z tokenów: rozmiar, kolor, font i grubość zamiast wartości w px.",note:"Pominięty parametr jest dziedziczony z rodzica. Detale spoza skali (letter-spacing, line-height) idą w className.",preview:e.jsx(r,{size:i.Heading,color:l.Heading,font:y.Sans,children:"Aa"}),Demo:Ho},{id:"label",api:{folder:"Label",interfaces:["LabelProps"]},usage:`import { Label, LabelTone, LabelSize } from './design-system'

<Label tone={LabelTone.Accent}>Stack / Kompetencje</Label>
<Label size={LabelSize.Sm}>Kategorie</Label>`,name:"Label",category:"general",summary:"Mały, wersalikowy nagłówek: kicker nad tytułem albo pasek panelu.",note:"Kicker nad nagłówkiem (nagłówek panelu z licznikiem — patrz List).",preview:e.jsx(A,{tone:C.Accent,children:"Stack / Kompetencje"}),Demo:Wo},{id:"button",api:{folder:"Button",interfaces:["ButtonProps"]},usage:`import { Button, ButtonVariant, ButtonSize } from './design-system'

<Button onClick={openProjects}>Zobacz projekty</Button>
<Button variant={ButtonVariant.Outline}>Pobierz CV ↓</Button>
<Button disabled>Wyślij</Button>

// odnośnik wyglądający jak przycisk (z href renderuje <a>)
<Button variant={ButtonVariant.Secondary} href="/cv.pdf" target="_blank">Pobierz CV ↓</Button>

// kompaktowy, do kart i nakładek (np. przewodnik)
<Button variant={ButtonVariant.Outline} size={ButtonSize.Sm} onClick={skip}>Pomiń</Button>

// mały odnośnik (linki społecznościowe) i wysłanie formularza
<Button variant={ButtonVariant.Secondary} size={ButtonSize.Xs} href="https://github.com/…">GitHub ↗</Button>
<Button type="submit" size={ButtonSize.Lg}>Wyślij wiadomość ↗</Button>`,name:"Button",category:"general",summary:"Przycisk akcji (albo odnośnik wyglądający jak przycisk) w wariantach Primary, Outline i Secondary oraz rozmiarach Md, Sm, Xs i Lg.",preview:e.jsx(j,{variant:S.Primary,children:"Zobacz projekty"}),Demo:Oo},{id:"iconbutton",api:{folder:"IconButton",interfaces:["IconButtonProps"]},usage:`import { IconButton, IconButtonSize } from './design-system'

<IconButton icon={<Terminal />} aria-label="Terminal" active={terminalOpen} onClick={toggleTerminal} />
<IconButton size={IconButtonSize.Sm} icon={<ListTree />} aria-label="Rozwiń wszystkie foldery" />`,name:"IconButton",category:"general",summary:"Przycisk z samą ikoną w dwóch rozmiarach (Md i kompaktowy Sm).",preview:e.jsxs("div",{className:"flex gap-1",children:[e.jsx(T,{icon:e.jsx(Ke,{}),"aria-label":"Terminal"}),e.jsx(T,{icon:e.jsx(we,{}),"aria-label":"Asystent",active:!0}),e.jsx(T,{icon:e.jsx(He,{}),"aria-label":"Szukaj"})]}),Demo:$o},{id:"railbutton",api:{folder:"RailButton",interfaces:["RailButtonProps"]},usage:`import { RailButton } from './design-system'

<RailButton
  icon={<FolderKanban />}
  label="WORK"
  aria-label="Projekty"
  active={page === 'projects'}
  onClick={() => setPage('projects')}
/>

// Aktywny stan w innym kolorze (np. terminal)
<RailButton icon={<SquareTerminal />} label="TERMINAL" aria-label="Terminal"
  active={terminalOpen} accent={RailButtonAccent.Success} onClick={toggleTerminal} />`,name:"RailButton",category:"general",summary:"Przycisk nawigacji z pionową etykietą, znany z paska po lewej stronie IDE.",note:".rail button[data-go]/[data-skills] — stany active i hover sprawdzone w computed style.",preview:e.jsxs("div",{className:"flex gap-2",children:[e.jsx(te,{icon:e.jsx(Xe,{}),label:"ABOUT","aria-label":"O mnie",active:!0}),e.jsx(te,{icon:e.jsx($e,{}),label:"WORK","aria-label":"Projekty"}),e.jsx(te,{icon:e.jsx(We,{}),label:"MAIL","aria-label":"Kontakt"})]}),Demo:Ko},{id:"link",api:{folder:"Link",interfaces:["LinkProps"]},usage:`import { Link, LinkTone, FontSize } from './design-system'

// przycisk akcji w treści (bez href)
<Link onClick={() => openPage('experience')}>Zobacz w portfolio →</Link>

// odnośnik z podkreśleniem
<Link underline size={FontSize.Medium} onClick={switchLanguage}>Przełącz język →</Link>

// niebieski wariant do treści stron
<Link tone={LinkTone.Info} onClick={openHome}>Poznaj mnie →</Link>

// prawdziwy odnośnik (z href renderuje <a>)
<Link href="/cv.pdf" target="_blank" rel="noopener">Pobierz CV ↗</Link>`,name:"Link",category:"general",summary:"Tekstowy odnośnik w kolorze akcentu: link (<a>) albo przycisk akcji w treści.",note:".tour-action, .ai-message button, .explorer-contact-panel button — kolory ujednolicone do jednego tokenu link.",preview:e.jsx(V,{children:"Zobacz w portfolio →"}),Demo:Go}];function Vo(){return e.jsx("div",{className:"flex w-full flex-col gap-3",children:Object.entries(L).map(([t,n])=>e.jsx("div",{className:"rounded-sm border border-dashed border-border-5 bg-editor py-3",children:e.jsx(E,{size:n,children:e.jsxs(r,{size:i.XSmall,font:y.Mono,color:l.Dim,children:["ContainerSize.",t," — ",n===L.Wide?"1280px":"900px",", wyśrodkowany, px-8"]})})},n))})}function Zo(){return e.jsxs(e.Fragment,{children:[e.jsx(M,{className:"w-[280px] p-5",children:e.jsx(r,{as:"p",size:i.Large,color:l.Body,children:"Panel bazowy — karty, sekcje."})}),e.jsx(M,{interactive:!0,className:"w-[280px] p-5",children:e.jsx(r,{as:"p",size:i.Large,color:l.Body,children:"Panel interactive — hover mnie."})})]})}function Uo(){const[t,n]=x.useState(0),[o,a]=x.useState(0);return e.jsxs("div",{className:"flex w-full flex-col gap-3",children:[e.jsx(r,{size:i.Small,color:l.Dim,children:"Wariant Experience (collapse przy 700px):"}),e.jsx(ve,{collapseAt:Se.Bp700,aside:e.jsx(O,{header:"Stanowiska",count:4,children:["B3 Consulting Poland","LSI Software","GECOS","Moje Bambino"].map((c,s)=>e.jsx(D,{title:c,subtitle:".NET Developer",active:t===s,onClick:()=>n(s),tag:"2021.11 — obecnie"},c))}),children:e.jsx("div",{className:"h-full bg-editor p-5",children:e.jsx(r,{as:"p",size:i.Large,color:l.Body,children:"Prawa kolumna (.xp-panel) — treść specyficzna dla strony Experience."})})}),e.jsx(r,{size:i.Small,color:l.Dim,className:"mt-2",children:"Wariant Stack (collapse przy 820px):"}),e.jsx(ve,{collapseAt:Se.Bp820,aside:e.jsx(O,{header:"Kategorie",count:11,searchable:!0,searchProps:{placeholder:"Szukaj technologii…","aria-label":"Szukaj technologii"},children:["Wszystkie","Backend","Frontend","AI","Desktop"].map((c,s)=>e.jsx(D,{title:c,active:o===s,onClick:()=>a(s)},c))}),children:e.jsx("div",{className:"h-full bg-editor p-5",children:e.jsx(r,{as:"p",size:i.Large,color:l.Body,children:"Prawa kolumna — grupy technologii (.skill-group)."})})})]})}function Jo(){const[t,n]=x.useState(!1),[o,a]=x.useState(!0),[c,s]=x.useState("pl");return e.jsx("div",{className:"w-full overflow-hidden rounded-sm border border-border",children:e.jsxs(mt,{"aria-label":"Pasek statusu",children:[e.jsx(ie,{tone:Te.Success,children:"⑂ master"}),e.jsx(ie,{truncate:!0,children:"GetStarted.md"}),e.jsx(ut,{}),e.jsx(re,{expanded:t,onClick:()=>n(m=>!m),children:">_ Terminal"}),e.jsx(re,{icon:e.jsx(we,{strokeWidth:1.5}),expanded:o,accent:xt.Assistant,onClick:()=>a(m=>!m),children:"Asystent"}),e.jsx(ht,{}),e.jsx(re,{icon:e.jsx(yt,{strokeWidth:1.5}),href:"#/components/statusbar",children:"OrchIDE UI"}),e.jsx(ft,{"aria-label":"Język",value:c,onChange:s,options:[{value:"pl",label:"PL","aria-label":"Polski"},{value:"en",label:"EN","aria-label":"English"}]}),e.jsx(ie,{tone:Te.Faint,children:"v0.1.0"})]})})}function qo(){const[t,n]=x.useState(0);return e.jsx("div",{className:"w-full overflow-hidden rounded-sm border border-border",children:e.jsxs(bt,{logo:"W_",title:"WiktorWijata / Portfolio",children:[e.jsx(Ce,{icon:"▷",onClick:()=>n(o=>o+1),children:t?`Oprowadź mnie (${t})`:"Oprowadź mnie"}),e.jsx(Ce,{tone:gt.Link,children:"☰ Explorer"})]})})}const Yo=[{id:"container",api:{folder:"Container",interfaces:["ContainerProps"]},usage:`import { Container, ContainerSize } from './design-system'

<Container className="py-10">Treść strony (max 900 px)</Container>
<Container size={ContainerSize.Wide}>Układ z sidebarem (max 1280 px)</Container>`,name:"Container",category:"layout",summary:"Wyśrodkowany kontener szerokości strony z marginesami bocznymi.",preview:e.jsx("div",{className:"flex h-14 w-full items-center justify-center rounded-sm border border-dashed border-border-5",children:e.jsx("div",{className:"h-8 w-2/3 rounded-sm bg-hover"})}),Demo:Vo},{id:"panel",api:{folder:"Panel",interfaces:["PanelProps"]},usage:`import { Panel } from './design-system'

<Panel className="p-5">Zwykła karta</Panel>
<Panel interactive className="p-5" onClick={openProject}>
  Klikalna karta projektu
</Panel>`,name:"Panel",category:"layout",summary:"Bazowa karta: tło, obramowanie, promień i cień. Opcjonalnie z hoverem.",preview:e.jsx(M,{className:"px-5 py-4",children:e.jsx(r,{size:i.Medium,color:l.Body,children:"Panel bazowy"})}),Demo:Zo},{id:"splitpanel",api:{folder:"SplitPanel",interfaces:["SplitPanelProps"]},usage:`import { SplitPanel, SplitPanelCollapseAt, List, ListItem } from './design-system'

<SplitPanel
  collapseAt={SplitPanelCollapseAt.Bp700}
  aside={
    <List header="Stanowiska" count={2}>
      <ListItem title="LSI Software" subtitle=".NET Developer" active />
      <ListItem title="GECOS" subtitle=".NET Developer" />
    </List>
  }
>
  <div className="p-5">Szczegóły wybranego stanowiska</div>
</SplitPanel>`,name:"SplitPanel",category:"layout",summary:"Master-detail: lista po lewej, szczegóły po prawej, zwija się na wąskich ekranach.",note:".xp w Experience i .stack-panel w Stack mają identyczny grid 320px/1fr, border, radius — sprawdzone w DOM.",preview:e.jsxs("div",{className:"grid h-14 w-full grid-cols-[1fr_2fr] overflow-hidden rounded-md border border-border",children:[e.jsx("div",{className:"border-r border-border bg-list"}),e.jsx("div",{className:"bg-editor"})]}),Demo:Uo},{id:"statusbar",api:{folder:"StatusBar",interfaces:["StatusBarProps","StatusBarItemProps","StatusBarButtonProps","StatusBarSwitchProps","StatusBarSwitchOption"]},usage:`import {
  StatusBar, StatusBarItem, StatusBarButton, StatusBarDivider,
  StatusBarSpacer, StatusBarSwitch, StatusBarTone, StatusBarAccent,
} from './design-system'

<StatusBar aria-label="Pasek statusu">
  <StatusBarItem tone={StatusBarTone.Success}>⑂ master</StatusBarItem>
  <StatusBarItem truncate>{activeFile}</StatusBarItem>
  <StatusBarDivider />
  <StatusBarButton expanded={terminalOpen} onClick={toggleTerminal}>{'>_ Terminal'}</StatusBarButton>
  <StatusBarButton
    icon={<MessageSquare />}
    expanded={chatOpen}
    accent={StatusBarAccent.Assistant}
    onClick={toggleChat}
  >
    Asystent
  </StatusBarButton>
  <StatusBarSpacer />
  {/* z href przycisk jest odnośnikiem <a> */}
  <StatusBarButton icon={<BookOpen />} href="/docs.html" target="_blank" rel="noopener">
    OrchIDE UI
  </StatusBarButton>
  <StatusBarSwitch
    aria-label="Język"
    value={language}
    onChange={setLanguage}
    options={[{ value: 'pl', label: 'PL' }, { value: 'en', label: 'EN' }]}
  />
  <StatusBarItem tone={StatusBarTone.Faint}>v0.1.0</StatusBarItem>
</StatusBar>`,name:"StatusBar",category:"layout",summary:"Dolny pasek okna IDE: gałąź, ścieżka pliku, przełączniki paneli, język i wersja.",note:".status w prototypie — wymiary i kolory zmierzone przez getComputedStyle.",preview:e.jsxs("div",{className:"flex h-7 w-full items-center gap-3 border-t border-border bg-hover px-3",children:[e.jsx("span",{className:"font-mono text-xs text-status-branch",children:"⑂ master"}),e.jsx("span",{className:"ml-auto rounded-xs bg-lang-active px-[5px] py-[3px] font-mono text-2xs text-lang-active-text",children:"PL"})]}),Demo:Jo},{id:"titlebar",api:{folder:"TitleBar",interfaces:["TitleBarProps","TitleBarButtonProps"]},usage:`import { TitleBar, TitleBarButton, TitleBarButtonTone } from './design-system'

<TitleBar logo="W_" title="WiktorWijata / Portfolio">
  <TitleBarButton icon="▷" onClick={startTour}>Oprowadź mnie</TitleBarButton>
  <TitleBarButton tone={TitleBarButtonTone.Link} onClick={toggleExplorer}>☰ Explorer</TitleBarButton>
</TitleBar>`,name:"TitleBar",category:"layout",summary:"Górny pasek okna IDE: logo, tytuł i przyciski akcji.",note:".bar i .bar .run w prototypie — wymiary, kolory i hover zmierzone przez getComputedStyle.",preview:e.jsxs("div",{className:"flex h-9 w-full items-center gap-3.5 border-b border-border bg-hover px-3",children:[e.jsx("span",{className:"rounded-[2px] bg-accent px-[5px] py-[3px] font-mono text-xs font-semibold text-on-accent",children:"W_"}),e.jsx("span",{className:"rounded-md border border-run-border bg-run-bg px-2.5 py-1 font-sans text-xs font-medium text-run-text",children:"▷ Oprowadź mnie"})]}),Demo:qo}];function Qo(){const[t,n]=x.useState("gs-welcome"),o=a=>a.map(([c,s])=>e.jsx(Z,{nested:!0,active:t===c,onClick:()=>n(c??""),children:s},c));return e.jsxs(ge,{header:"Szybki przewodnik","aria-label":"Tematy przewodnika",className:"w-[200px]",children:[e.jsx(Z,{active:t==="gs-welcome",onClick:()=>n("gs-welcome"),children:"Wprowadzenie"}),e.jsx(ye,{label:"Portfolio",children:o([["gs-profile","O mnie"],["gs-projects","Wybrane projekty"],["gs-experience","Doświadczenie"],["gs-contact","Kontakt i CV"]])}),e.jsx(ye,{label:"Nawigacja",children:o([["gs-explorer","Explorer i foldery"],["gs-tabs","Zakładki dokumentów"],["gs-start","Szybki dostęp"],["gs-terminal","Terminal"]])})]})}const ce={getstarted:"GetStarted.md",stack:"Stack",home:"O mnie"};function ea(){const[t,n]=x.useState(["getstarted","stack","home"]),[o,a]=x.useState("stack");return e.jsxs("div",{className:"flex w-full flex-col gap-2",children:[e.jsxs(ke,{"aria-label":"Otwarte zakładki",className:"overflow-hidden rounded-t-md",onReorder:n,children:[t.map(c=>e.jsx(ne,{id:c,active:o===c,onSelect:()=>a(c),closeLabel:`Zamknij kartę ${ce[c]}`,onClose:()=>{const s=t.filter(m=>m!==c);n(s),o===c&&a(s[s.length-1]??"")},children:ce[c]},c)),!t.includes("home")&&e.jsx("button",{type:"button",onClick:()=>{n(c=>[...c,"home"]),a("home")},className:"self-center px-3 font-mono text-xs text-text-dim hover:text-text",children:'+ otwórz „O mnie"'})]}),e.jsx("div",{className:"bg-editor p-4",children:e.jsxs(r,{size:i.Small,color:l.Body,children:["Zawartość zakładki: ",e.jsx("strong",{className:"text-text",children:ce[o]??"(brak otwartych)"})]})})]})}const H=t=>e.jsx("span",{className:`font-mono text-[11px] tracking-[-0.6px] ${t}`,children:"C#"}),Qe=[{type:"file",id:"getstarted",label:"GetStarted.md",icon:e.jsx(vt,{className:"size-4 text-[#8eb5df]"})},{type:"folder",id:"sln",label:"WiktorWijata.sln",icon:e.jsx(De,{className:"size-4 text-accent"}),children:[{type:"folder",id:"projects",label:"Projects",icon:e.jsx(St,{className:"size-4"}),children:[{type:"file",id:"portfolio",label:"Portfolio.cs",icon:H("text-[#6fb882]")}]},{type:"file",id:"stack",label:"Stack.cs",icon:H("text-[#8fd18f]")},{type:"file",id:"experience",label:"Experience.cs",icon:H("text-[#6fb882]")},{type:"file",id:"contact",label:"Contact.cs",icon:H("text-[#6fb882]")}]}];function et(t,n){return!n||t.label.toLowerCase().includes(n)?!0:t.type==="folder"&&t.children.some(o=>et(o,n))}function tt(t){return t.flatMap(n=>n.type==="folder"?[n.id,...tt(n.children)]:[])}const ta=tt(Qe),de=t=>Object.fromEntries(ta.map(n=>[n,t]));function nt(t,n,o=0){return t.map(a=>et(a,n.query)?a.type==="file"?e.jsx(he,{level:o,active:n.activeItemId===a.id,icon:a.icon,onClick:()=>n.onSelectItem(a.id),children:a.label},a.id):e.jsx(jt,{level:o,label:a.label,icon:a.icon,active:n.activeItemId===a.id,onClick:()=>n.onSelectItem(a.id),open:n.openFolders[a.id]??!0,onToggle:c=>n.onToggleFolder(a.id,c),children:nt(a.children,n,o+1)},a.id):null)}function na(){const[t,n]=x.useState(""),[o,a]=x.useState("stack"),[c,s]=x.useState(!1),[m,p]=x.useState(()=>de(!0));return e.jsx(Oe,{collapsed:c,className:c?"":"w-[224px]",collapsedContent:e.jsx(T,{size:K.Sm,icon:e.jsx($t,{}),"aria-label":"Pokaż explorer",onClick:()=>s(!1)}),tools:e.jsxs(e.Fragment,{children:[e.jsx(T,{size:K.Sm,icon:e.jsx(kt,{}),"aria-label":"Rozwiń wszystkie foldery",onClick:()=>p(de(!0))}),e.jsx(T,{size:K.Sm,icon:e.jsx(zt,{}),"aria-label":"Zwiń wszystkie foldery",onClick:()=>p(de(!1))}),e.jsx(T,{size:K.Sm,icon:e.jsx(wt,{}),"aria-label":"Zwiń explorer",onClick:()=>s(!0)})]}),search:e.jsx(ae,{placeholder:"Szukaj plików…","aria-label":"Szukaj plików w rozwiązaniu",value:t,onChange:u=>n(u.target.value)}),children:nt(Qe,{query:t.trim().toLowerCase(),activeItemId:o,onSelectItem:a,openFolders:m,onToggleFolder:(u,b)=>p(d=>({...d,[u]:b}))})})}const oa=[{id:"menu",api:{folder:"Menu",interfaces:["MenuProps","MenuItemProps","MenuGroupProps"]},usage:`import { Menu, MenuItem, MenuGroup } from './design-system'

<Menu header="Szybki przewodnik" aria-label="Tematy przewodnika" className="w-[200px]">
  <MenuItem active>Wprowadzenie</MenuItem>
  <MenuGroup label="Portfolio">
    <MenuItem nested onClick={() => go('profile')}>O mnie</MenuItem>
    <MenuItem nested onClick={() => go('projects')}>Projekty</MenuItem>
  </MenuGroup>
</Menu>`,name:"Menu",category:"navigation",summary:"Karta-spis treści z płaskimi pozycjami i rozwijalnymi grupami.",note:'.gs-index (GetStarted „Szybki przewodnik") — sprawdzone w DOM.',preview:e.jsx(ge,{header:"Przewodnik","aria-label":"Podgląd menu",className:"w-[170px]",children:e.jsx(Z,{active:!0,children:"Wprowadzenie"})}),Demo:Qo},{id:"tabs",api:{folder:"Tabs",interfaces:["TabsProps","TabProps"]},usage:`import { Tabs, Tab } from './design-system'

// Zakładki plików: zamykane i przeciągane
<Tabs aria-label="Otwarte zakładki" onReorder={setOrder}>
  {order.map((id) => (
    <Tab
      key={id}
      id={id}
      active={id === active}
      onSelect={() => setActive(id)}
      onClose={() => close(id)}
      closeLabel="Zamknij kartę"
    >
      {id}
    </Tab>
  ))}
</Tabs>

// Zakładki nawigacyjne: bez onClose i onReorder
<Tabs aria-label="Nawigacja główna">
  <Tab active>Overview</Tab>
  <Tab onSelect={() => go('/changelog')}>Changelog</Tab>
</Tabs>`,name:"Tabs",category:"navigation",summary:"Zakładki otwartych plików z zamykaniem i przeciąganiem, by zmienić kolejność.",note:".tabs — stany default/hover/active/close/dragging zmierzone w computed style, przeciąganie na pointer events.",preview:e.jsxs(ke,{"aria-label":"Podgląd zakładek",className:"w-full overflow-hidden rounded-t-md",children:[e.jsx(ne,{id:"a",active:!0,onClose:()=>{},closeLabel:"Zamknij Stack",children:"Stack"}),e.jsx(ne,{id:"b",onClose:()=>{},closeLabel:"Zamknij O mnie",children:"O mnie"})]}),Demo:ea},{id:"solutionexplorer",api:{folder:"SolutionExplorer",interfaces:["SolutionExplorerProps","SolutionExplorerLabels","TreeFileProps","TreeFolderProps"]},usage:`import { SolutionExplorer, TreeFile, TreeFolder, SearchField } from './design-system'

<SolutionExplorer
  search={<SearchField placeholder="Szukaj plików…" aria-label="Szukaj plików" />}
  footer={<ContactCard />} // przypięte do dołu, opcjonalne
>
  <TreeFolder label="WiktorWijata.sln" icon={<Boxes />}>
    <TreeFile level={1} icon={<span>C#</span>} active>
      Stack.cs
    </TreeFile>
    <TreeFile level={1} icon={<span>C#</span>}>
      Contact.cs
    </TreeFile>
  </TreeFolder>
</SolutionExplorer>`,name:"SolutionExplorer",category:"navigation",summary:"Drzewo plików z wyszukiwarką, zwijaniem folderów i zwijanym panelem.",note:".explorer/.solution-tree — wcięcia, markery plików, stan active, sprawdzone w computed style.",preview:e.jsx("div",{className:"w-[190px] overflow-hidden border border-border",children:e.jsxs(Oe,{className:"w-full border-r-0","aria-label":"Podgląd explorera",children:[e.jsx(he,{icon:H("text-[#6fb882]"),children:"Portfolio.cs"}),e.jsx(he,{active:!0,icon:H("text-[#8fd18f]"),children:"Stack.cs"})]})}),Demo:na}],Y=[{title:"Poznaj bibliotekę komponentów",body:"Ten przewodnik pokazuje komponenty Guide: kartę kroku, spotlight i tło.",translation:"This guide shows the Guide components: the step card, spotlight and shade.",actionLabel:"Pokaż cel przewodnika →"},{title:"To już wszystko",body:"Kolejne komponenty dojdą razem z pełną ramą IDE."}];function aa(){const[t,n]=x.useState(!1),[o,a]=x.useState(0),[c,s]=x.useState(null),m=x.useRef(null),p=Y[o],u=o===Y.length-1;function b(){const d=m.current;if(d){const f=d.getBoundingClientRect();s({top:f.top,left:f.left,width:f.width,height:f.height})}a(0),n(!0)}return p?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(r,{size:i.Small,color:l.Dim,children:"Statyczny podgląd karty (position: static — w prawdziwym użyciu to position: fixed):"}),e.jsx(Ne,{style:{position:"static"},step:o+1,totalSteps:Y.length,title:p.title,translation:p.translation,actionLabel:p.actionLabel,onAction:()=>m.current?.scrollIntoView({behavior:"smooth",block:"center"}),isLastStep:u,onSkip:()=>a(0),onBack:o>0?()=>a(d=>d-1):void 0,onNext:()=>a(d=>u?0:d+1),children:p.body}),e.jsx("div",{ref:m,className:"self-start",children:e.jsx(j,{variant:S.Outline,onClick:b,children:"▷ Oprowadź mnie (pełna nakładka)"})})]}),t&&e.jsxs(e.Fragment,{children:[e.jsx(Tt,{onClick:()=>n(!1)}),c&&e.jsx(Ct,{rect:c}),e.jsx(Ne,{step:o+1,totalSteps:Y.length,title:p.title,translation:p.translation,actionLabel:p.actionLabel,onAction:()=>m.current?.scrollIntoView({behavior:"smooth",block:"center"}),isLastStep:u,onSkip:()=>n(!1),onBack:o>0?()=>a(d=>d-1):void 0,onNext:()=>u?n(!1):a(d=>d+1),modal:!0,anchor:c??void 0,style:c?void 0:{top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:p.body})]})]}):null}const Q=["help","about","projects","stack","contact"];function ia(){const[t,n]=x.useState(!0),[o,a]=x.useState([{id:0,content:`Cześć! Możesz poruszać się po portfolio także stąd.
Wpisz help lub wybierz komendę poniżej.`}]),c=x.useRef(1);function s(m){const p=(d,f)=>({id:c.current++,kind:f,content:d}),u=p(`visitor@portfolio:~$ ${m}`,Be.Command),b=m.toLowerCase();if(b==="clear")a([]);else if(b==="help"){const d=Q.map(f=>f.padEnd(13)+"— komenda demo").join(`
`)+`

↑/↓ historia · Tab podpowiedzi · Esc zwiń`;a(f=>[...f,u,p(d)])}else Q.includes(b)?a(d=>[...d,u,p(`Otwarto: ${b}.`)]):a(d=>[...d,u,p(`Nieznana komenda: ${m}. Wpisz help.`,Be.Error)])}return t?e.jsx(Nt,{"aria-label":"Terminal portfolio",className:"w-full",lines:o,suggestions:Q,completions:[...Q,"clear"],onCommand:s,onClose:()=>n(!1)}):e.jsx(j,{variant:S.Outline,onClick:()=>n(!0),children:">_ Otwórz terminal"})}const ra=["Jakie ma doświadczenie?","W jakich technologiach pracuje?","Opowiedz o projekcie Portfolio","Jak nawiązać współpracę?"];function sa(){const[t,n]=x.useState(!0),[o,a]=x.useState([{id:0,role:se.Assistant,content:`Cześć! Pomogę Ci poznać doświadczenie, technologie i projekty Wiktora. Wybierz pytanie lub wpisz własne.

To podgląd czatu — na razie pokazuję przygotowane odpowiedzi.`}]),c=x.useRef(1);function s(m){const p=m.toLocaleLowerCase("pl"),u=(f,w)=>({id:c.current++,role:se.Assistant,content:f,action:w?{label:"Zobacz w portfolio →",onAction:()=>n(!1)}:void 0}),b={id:c.current++,role:se.User,content:m},d=/współprac|kontakt/.test(p)?u("W sprawie współpracy najlepiej skontaktować się bezpośrednio z Wiktorem. W portfolio znajdziesz formularz kontaktowy i dane kontaktowe.",!0):/doświadcze|pracow/.test(p)?u("Wiktor rozwija aplikacje .NET, integruje systemy i pracuje z bazami danych. W jego doświadczeniu są B3 Consulting Poland, LSI Software, GECOS i Moje Bambino.",!0):u("W tym podglądzie mogę pokazać informacje o doświadczeniu, technologiach, projekcie Portfolio i kontakcie.",!1);a(f=>[...f,b,d])}return t?e.jsx(Bt,{"aria-label":"Asystent portfolio",style:{position:"static"},title:"Asystent portfolio",subtitle:"Poznaj doświadczenie Wiktora",placeholder:"O co chcesz zapytać?",note:"Podgląd interakcji · odpowiedzi demonstracyjne, bez połączenia z AI.",topics:ra,messages:o,onSend:s,onClose:()=>n(!1)}):e.jsx(Ge,{icon:e.jsx(ze,{strokeWidth:1.5}),style:{position:"static"},onClick:()=>n(!0),children:"Zapytaj o mnie"})}function la(){const[t,n]=x.useState(0);return e.jsx(Ge,{icon:e.jsx(ze,{strokeWidth:1.5}),style:{position:"static"},onClick:()=>n(o=>o+1),children:t?`Zapytaj o mnie (${t})`:"Zapytaj o mnie"})}const ca=[{id:"guide",api:{folder:"Guide",interfaces:["GuideCardProps","GuideHighlightProps","GuideHighlightRect","GuideShadeProps"]},usage:`import { GuideCard, GuideHighlight, GuideShade } from './design-system'

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
</GuideCard>`,name:"Guide",category:"overlays",summary:"Przewodnik krok po kroku: karta, spotlight na elemencie i przyciemnione tło.",note:'.portfolio-tour-card/-shade/-highlight (przewodnik „Oprowadź mnie") — karta, tło i podświetlenie; cele i kroki dostarcza aplikacja.',preview:e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsx(r,{size:i.XXSmall,font:y.Mono,className:"tracking-[.07em] text-[#bf94b8]",children:"PRZEWODNIK / 1 Z 2"}),e.jsx(r,{size:i.XLarge,color:l.Heading,children:"Poznaj bibliotekę"})]}),Demo:aa},{id:"terminal",api:{folder:"Terminal",interfaces:["TerminalProps","TerminalLabels","TerminalLine"]},usage:`import { Terminal, TerminalLineKind } from './design-system'

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
{ id: 7, kind: TerminalLineKind.Error, content: 'Nieznana komenda: foo' }`,name:"Terminal",category:"overlays",summary:"Dolny panel konsoli z historią komend, uzupełnianiem Tab i zmianą wysokości.",note:".portfolio-terminal — Esc zamyka, wysokość zmienia się przeciąganiem lub strzałkami na uchwycie. Komendy interpretuje aplikacja.",preview:e.jsxs("div",{className:"w-full",children:[e.jsxs(r,{as:"div",size:i.XSmall,font:y.Mono,color:l.Accent,children:["visitor@portfolio:~$ ",e.jsx("span",{className:"text-terminal-text",children:"help"})]}),e.jsx(r,{as:"div",size:i.XSmall,font:y.Mono,color:l.Dim,children:"about · projects · stack"})]}),Demo:ia},{id:"chat",api:{folder:"Chat",interfaces:["ChatProps","ChatLabels","ChatMessage"]},usage:`import { Chat, ChatMessageRole } from './design-system'

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
}`,name:"Chat",category:"overlays",summary:"Okno asystenta z bąbelkami, chipami z pytaniami i polem wiadomości.",note:".ai-chat — Enter wysyła, Shift+Enter nowa linia, Esc zamyka. Odpowiedzi generuje aplikacja.",preview:e.jsxs("div",{className:"flex w-full flex-col gap-1.5",children:[e.jsx(r,{as:"div",size:i.XSmall,className:"max-w-[80%] rounded-[3px_12px_12px_12px] border border-border bg-hover px-2.5 py-1.5 text-text-body",children:"Cześć! Pomogę Ci…"}),e.jsx(r,{as:"div",size:i.XSmall,className:"max-w-[80%] self-end rounded-[12px_3px_12px_12px] border border-[#62405a] bg-[#3b2e39] px-2.5 py-1.5 text-[#e6dce4]",children:"Jakie ma doświadczenie?"})]}),Demo:sa},{id:"chatlauncher",api:{folder:"ChatLauncher",interfaces:["ChatLauncherProps"]},usage:`import { Chat, ChatLauncher } from './design-system'

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
)}`,name:"ChatLauncher",category:"overlays",summary:'Pływający przycisk „Zapytaj o mnie", który otwiera okno czatu.',note:".ai-chat-toggle — pozycja fixed w prawym dolnym rogu; offset bottom jest animowany (180 ms). Wymiary i kolory zmierzone w prototypie.",preview:e.jsxs(r,{as:"div",size:i.Small,weight:k.Medium,className:"flex items-center gap-[9px] rounded-[9px] border border-launcher-border bg-launcher-bg px-4 py-[11px] text-launcher-text shadow-[0_6px_24px_rgba(0,0,0,.267)]",children:[e.jsx(ze,{className:"size-[18px]",strokeWidth:1.5}),"Zapytaj o mnie"]}),Demo:la}],G=[{id:"general",label:"Ogólne"},{id:"layout",label:"Układ"},{id:"navigation",label:"Nawigacja"},{id:"data",label:"Prezentacja danych"},{id:"forms",label:"Formularze"},{id:"overlays",label:"Panele i nakładki"}],P=[...Xo,...Yo,...oa,..._o,...Do,...ca];function ot(t){return P.filter(n=>n.category===t)}function da(t){return P.find(n=>n.id===t)}const pa="border-b border-border-2 px-4 py-2.5 text-left align-bottom",pe="border-b border-border-3 px-4 py-2.5 align-middle";function ma({folder:t}){const{groups:n}=Ue(t);return n.length?e.jsxs("div",{className:"flex flex-col gap-7",children:[n.map(o=>e.jsxs("div",{className:"flex flex-col gap-2.5",children:[e.jsx(r,{as:"h3",size:i.XLarge,weight:k.Medium,color:l.Heading,children:o.label}),e.jsx("div",{className:"scrollbar-subtle overflow-x-auto rounded-xl border border-border-5 bg-card",children:e.jsxs("table",{className:"w-full min-w-[560px] border-collapse",children:[e.jsx("thead",{children:e.jsx("tr",{children:["Token","Wartość","Zastosowanie"].map(a=>e.jsx("th",{className:pa,children:e.jsx(r,{size:i.Micro,font:y.Mono,weight:k.SemiBold,color:l.Dimmer,className:"tracking-[.1em] uppercase",children:a})},a))})}),e.jsx("tbody",{className:"[&>tr:last-child>td]:border-b-0",children:o.tokens.map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:`${pe} whitespace-nowrap`,children:e.jsx(r,{size:i.Small,font:y.Mono,color:l.Primary,children:a.token})}),e.jsx("td",{className:`${pe} whitespace-nowrap`,children:e.jsxs("span",{className:"flex items-center gap-2",children:[a.category==="colors"&&e.jsx("span",{"aria-hidden":!0,className:"size-3.5 shrink-0 rounded-sm border border-border-7",style:{background:a.value}}),e.jsx(r,{size:i.Small,font:y.Mono,color:l.Body,children:a.value})]})}),e.jsx("td",{className:pe,children:e.jsxs("span",{className:"flex flex-wrap items-center gap-x-2 gap-y-1",children:[a.roles.map(c=>e.jsx(R,{children:c},c)),e.jsx(r,{size:i.XSmall,font:y.Mono,color:l.Faint,children:a.classes.join(" · ")})]})})]},a.token))})]})})]},o.category)),e.jsx(r,{size:i.XSmall,font:y.Mono,color:l.Faint,className:"leading-relaxed",children:"Lista jest wyliczana ze źródeł komponentu. Pojedyncze wartości zmierzone w prototypie, które nie są tokenami (np. niestandardowe odcienie), nie są tu wymienione."})]}):e.jsx(r,{as:"p",size:i.Medium,color:l.Dim,children:"Ten komponent nie odwołuje się do żadnych tokenów z @theme — jego zachowanie wynika z układu (szerokości, marginesy)."})}function _e({entry:t,direction:n}){return t?e.jsxs("a",{href:`#/components/${t.id}`,className:["flex flex-col gap-1 rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",n==="next"?"items-end text-right":""].join(" "),children:[e.jsx(r,{size:i.XSmall,font:y.Mono,color:l.Faint,children:n==="prev"?"← Poprzedni":"Następny →"}),e.jsx(r,{size:i.XLarge,weight:k.Medium,color:l.Accent,children:t.name})]}):e.jsx("span",{})}function ee({title:t,description:n,children:o}){return e.jsxs("section",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-1.5 border-b border-border-2 pb-3",children:[e.jsx(r,{as:"h2",size:i.XXLarge,weight:k.Medium,color:l.Heading,children:t}),n&&e.jsx(r,{as:"p",size:i.Medium,color:l.Dim,className:"max-w-[720px] leading-[1.6]",children:n})]}),o]})}function ua({entry:t}){const n=G.find(s=>s.id===t.category),o=P.findIndex(s=>s.id===t.id),{dependencies:a}=Ue(t.api.folder),c=a.map(s=>P.find(m=>m.api.folder===s)).filter(s=>!!s);return e.jsxs("div",{className:"flex flex-col gap-10",children:[e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(r,{size:i.Small,color:l.Dim,children:[e.jsx("a",{href:"#/components",className:"hover:text-text",children:"Komponenty"})," ","/ ",n?.label]}),e.jsx(A,{tone:C.Accent,children:n?.label}),e.jsx(r,{as:"h1",size:i.Heading,color:l.Heading,className:"leading-[1.15] tracking-[-.03em]",children:t.name}),e.jsx(r,{as:"p",size:i.XLarge,color:l.Muted,className:"max-w-[640px] leading-[1.7]",children:t.summary}),t.note&&e.jsx(r,{as:"p",size:i.XSmall,font:y.Mono,color:l.Faint,className:"max-w-[640px] leading-relaxed",children:t.note})]}),e.jsx(M,{className:"flex flex-wrap items-center gap-4 p-6",children:e.jsx(t.Demo,{})}),e.jsx(ee,{title:"Przykład użycia",children:e.jsx(Gn,{code:t.usage})}),e.jsx(ee,{title:"Parametry",description:"Nazwa, typ, wartość domyślna i opis każdego propsa. Lista jest czytana wprost z pliku typów komponentu.",children:e.jsx(Co,{interfaces:t.api.interfaces})}),e.jsx(ee,{title:"Tokeny",description:"Tokeny z index.css (@theme), z których korzysta ten komponent, oraz do czego służą.",children:e.jsx(ma,{folder:t.api.folder})}),c.length>0&&e.jsx(ee,{title:"Zbudowany z",description:"Inne komponenty OrchIDE UI używane wewnątrz.",children:e.jsx("div",{className:"flex flex-wrap gap-2",children:c.map(s=>e.jsx("a",{href:`#/components/${s.id}`,className:"rounded-md border border-border-5 bg-card px-3 py-1.5 outline-none hover:border-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",children:e.jsx(r,{size:i.Small,font:y.Mono,color:l.AccentLight,children:s.name})},s.id))})}),e.jsxs("div",{className:"flex items-center justify-between border-t border-border-2 pt-6",children:[e.jsx(_e,{entry:P[o-1],direction:"prev"}),e.jsx(_e,{entry:P[o+1],direction:"next"})]})]})}function xa({entry:t}){return e.jsx("a",{href:`#/components/${t.id}`,className:"block rounded-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",children:e.jsxs(M,{interactive:!0,className:"flex h-full flex-col overflow-hidden",children:[e.jsx("div",{inert:!0,className:"pointer-events-none flex h-[132px] items-center justify-center overflow-hidden border-b border-border-5 bg-editor p-4",children:t.preview}),e.jsxs("div",{className:"flex flex-col gap-1.5 px-4 py-3.5",children:[e.jsx(r,{as:"h3",size:i.XLarge,weight:k.Medium,color:l.Heading,children:t.name}),e.jsx(r,{as:"p",size:i.Small,color:l.Dim,className:"leading-[1.55]",children:t.summary})]})]})})}function ha(){return e.jsxs("div",{className:"flex flex-col gap-10",children:[e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(A,{tone:C.Accent,children:"OrchIDE UI / Komponenty"}),e.jsx(r,{as:"h1",size:i.Heading,color:l.Heading,className:"leading-[1.15] tracking-[-.03em]",children:"Komponenty"}),e.jsx(r,{as:"p",size:i.XLarge,color:l.Muted,className:"max-w-[640px] leading-[1.7]",children:"Biblioteka komponentów portfolio w stylu IDE. Wybierz komponent, żeby zobaczyć żywe demo — cały interfejs jest zbudowany wyłącznie z tych klocków."}),e.jsxs(r,{size:i.Small,font:y.Mono,color:l.Faint,children:[P.length," komponentów · ",G.length," kategorii"]})]}),G.map(t=>{const n=ot(t.id);return e.jsxs("section",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3 border-b border-border-2 pb-3",children:[e.jsx(r,{as:"h2",size:i.XXLarge,weight:k.Medium,color:l.Heading,children:t.label}),e.jsx(R,{children:n.length})]}),e.jsx("div",{className:"grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4",children:n.map(o=>e.jsx(xa,{entry:o},o.id))})]},t.id)})]})}function Ie(){return window.location.hash.replace(/^#/,"")||"/"}function ya(){const[t,n]=x.useState(Ie);return x.useEffect(()=>{const o=()=>{n(Ie()),window.scrollTo({top:0})};return window.addEventListener("hashchange",o),()=>window.removeEventListener("hashchange",o)},[]),t}function $(t){window.location.hash=t}const fa=8;function ba({className:t=""}){const[n,o]=x.useState(""),[a,c]=x.useState(!1),[s,m]=x.useState(0),p=x.useRef(null),u=x.useMemo(()=>{const h=n.trim().toLowerCase();return h?P.filter(g=>g.name.toLowerCase().includes(h)||g.summary.toLowerCase().includes(h)).sort((g,z)=>Number(z.name.toLowerCase().startsWith(h))-Number(g.name.toLowerCase().startsWith(h))).slice(0,fa):[]},[n]),b=()=>p.current?.querySelector("input");x.useEffect(()=>{function h(g){const F=g.target.closest("input, textarea, [contenteditable]");(g.key==="/"&&!F||(g.ctrlKey||g.metaKey)&&g.key.toLowerCase()==="k")&&(g.preventDefault(),b()?.focus())}return window.addEventListener("keydown",h),()=>window.removeEventListener("keydown",h)},[]);function d(h){$(`/components/${h}`),o(""),c(!1),b()?.blur()}function f(h){if(h.key==="Escape")c(!1),b()?.blur();else if(h.key==="ArrowDown"||h.key==="ArrowUp"){if(h.preventDefault(),!u.length)return;m(g=>(g+(h.key==="ArrowDown"?1:-1)+u.length)%u.length)}else h.key==="Enter"&&u[s]&&(h.preventDefault(),d(u[s].id))}const w=a&&n.trim().length>0;return e.jsxs("div",{ref:p,className:["relative",t].join(" "),onBlur:h=>{h.currentTarget.contains(h.relatedTarget)||c(!1)},children:[e.jsx(ae,{placeholder:"Szukaj komponentu…  ( / )","aria-label":"Szukaj komponentu",role:"combobox","aria-expanded":w,"aria-controls":"docs-search-results",autoComplete:"off",value:n,onFocus:()=>c(!0),onChange:h=>{o(h.target.value),m(0),c(!0)},onKeyDown:f,className:"py-1.5"}),w&&e.jsx(M,{id:"docs-search-results",role:"listbox",className:"absolute inset-x-0 top-full z-20 mt-2 overflow-hidden",children:u.length?e.jsx(O,{children:u.map((h,g)=>e.jsx(D,{title:h.name,subtitle:h.summary,active:g===s,onMouseDown:z=>z.preventDefault(),onMouseEnter:()=>m(g),onClick:()=>d(h.id),trailing:e.jsx(R,{children:G.find(z=>z.id===h.category)?.label})},h.id))}):e.jsxs(r,{as:"p",size:i.Small,color:l.Dim,className:"px-4 py-4",children:["Brak wyników dla „",n.trim(),'"']})})]})}const at=[{cx:16,cy:7.6,rx:3.7,ry:6.2,opacity:.5},{cx:10.4,cy:22.4,rx:3.2,ry:6.4,rotate:38,opacity:.5},{cx:21.6,cy:22.4,rx:3.2,ry:6.4,rotate:-38,opacity:.5},{cx:8.4,cy:14.6,rx:7.4,ry:5.6,rotate:-16,opacity:.78},{cx:23.6,cy:14.6,rx:7.4,ry:5.6,rotate:16,opacity:.78}],it="M16 15.2c2.8 0 4.3 2.1 3.4 4.4-.6 1.6-1.9 3-3.4 4.5-1.5-1.5-2.8-2.9-3.4-4.5-.9-2.3.6-4.4 3.4-4.4Z",W={cx:16,cy:15,r:1.15};function rt(t){return t.rotate?`rotate(${t.rotate} ${t.cx} ${t.cy})`:void 0}function ga(){const n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#232428"/><g transform="translate(16 16) scale(.8) translate(-16 -15)" fill="#c77dbb">${at.map(o=>{const a=rt(o);return`<ellipse cx="${o.cx}" cy="${o.cy}" rx="${o.rx}" ry="${o.ry}" opacity="${o.opacity}"${a?` transform="${a}"`:""}/>`}).join("")}<path d="${it}"/><circle cx="${W.cx}" cy="${W.cy}" r="${W.r}" fill="#232428" opacity=".85"/></g></svg>`;return`data:image/svg+xml,${encodeURIComponent(n)}`}function ka(t){return e.jsxs("svg",{viewBox:"0 0 32 32",fill:"none","aria-hidden":!0,...t,children:[e.jsxs("g",{fill:"currentColor",children:[at.map(n=>e.jsx("ellipse",{cx:n.cx,cy:n.cy,rx:n.rx,ry:n.ry,opacity:n.opacity,transform:rt(n)},`${n.cx}-${n.cy}`)),e.jsx("path",{d:it})]}),e.jsx("circle",{cx:W.cx,cy:W.cy,r:W.r,fill:"#1e1f22",opacity:".85"})]})}const za=[{title:"Jeden, stały motyw",body:"Ciemny motyw w stylu IDE z akcentem orchidei. Tokeny żyją w @theme Tailwinda, bez przełączania motywów w czasie działania."},{title:"Tokeny zamiast pikseli",body:"Tekst przyjmuje FontSize, TextColor i FontFamily zamiast wartości w px. Wartości spoza skali trafiają do className."},{title:"Wierność prototypowi",body:"Style są mierzone na żywym prototypie (computed style), a nie kopiowane z opisu. Każdy komponent ma odnotowane, z czego został zweryfikowany."}],Re=[{name:"accent",hex:"#c77dbb"},{name:"accent-light",hex:"#dba8d2"},{name:"editor",hex:"#1e1f22"},{name:"list",hex:"#222428"},{name:"card",hex:"#27282d"},{name:"border-5",hex:"#46424c"},{name:"text",hex:"#e6e7e9"},{name:"text-body",hex:"#bcbec4"},{name:"text-dim",hex:"#8b8f96"}];function wa(){return e.jsxs("div",{className:"flex flex-col gap-14",children:[e.jsxs("section",{className:"flex flex-col gap-4",children:[e.jsx(A,{tone:C.Accent,children:"OrchIDE UI / Overview"}),e.jsx(r,{as:"h1",size:i.Display,color:l.Heading,className:"max-w-[760px] leading-[1.1] tracking-[-.03em]",children:"Komponenty portfolio w stylu IDE"}),e.jsx(r,{as:"p",size:i.XXLarge,color:l.Muted,className:"max-w-[640px] leading-[1.7]",children:"OrchIDE UI to biblioteka komponentów, z której zbudowane jest całe portfolio, łącznie z tą stroną. Jedna paleta, jedna skala typografii i komponenty sprawdzone względem prototypu."}),e.jsxs("div",{className:"mt-2 flex flex-wrap gap-3",children:[e.jsx(j,{variant:S.Primary,onClick:()=>$("/components"),children:"Przeglądaj komponenty"}),e.jsx(j,{variant:S.Outline,onClick:()=>$("/changelog"),children:"Zobacz Changelog"})]})]}),e.jsx("section",{className:"grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4",children:[{value:P.length,label:"komponentów"},{value:G.length,label:"kategorii"},{value:Re.length,label:"kluczowych kolorów"}].map(t=>e.jsxs(M,{className:"flex flex-col gap-1 px-5 py-4",children:[e.jsx(r,{size:i.Heading,weight:k.Medium,color:l.Accent,className:"leading-none",children:t.value}),e.jsx(r,{size:i.Medium,font:y.Mono,color:l.Dim,children:t.label})]},t.label))}),e.jsxs("section",{className:"flex flex-col gap-4",children:[e.jsx(r,{as:"h2",size:i.XXLarge,weight:k.Medium,color:l.Heading,children:"Zasady"}),e.jsx("div",{className:"grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4",children:za.map(t=>e.jsxs(M,{className:"flex flex-col gap-2 p-5",children:[e.jsx(r,{as:"h3",size:i.XLarge,weight:k.Medium,color:l.Heading,children:t.title}),e.jsx(r,{as:"p",size:i.Small,color:l.Dim,className:"leading-[1.65]",children:t.body})]},t.title))})]}),e.jsxs("section",{className:"flex flex-col gap-4",children:[e.jsx(r,{as:"h2",size:i.XXLarge,weight:k.Medium,color:l.Heading,children:"Kolory"}),e.jsx("div",{className:"grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3",children:Re.map(t=>e.jsxs("div",{className:"overflow-hidden rounded-xl border border-border-5 bg-card",children:[e.jsx("div",{className:"h-16 border-b border-border-5",style:{background:t.hex}}),e.jsxs("div",{className:"flex flex-col gap-0.5 px-3 py-2.5",children:[e.jsx(r,{size:i.Small,color:l.Body,children:t.name}),e.jsx(r,{size:i.XSmall,font:y.Mono,color:l.Faint,children:t.hex})]})]},t.name))})]}),e.jsxs("section",{className:"grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6",children:[e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{as:"h2",size:i.XXLarge,weight:k.Medium,color:l.Heading,children:"Typografia"}),e.jsxs(M,{className:"flex flex-col gap-5 p-5",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(r,{size:i.XSmall,font:y.Mono,color:l.Faint,children:"Sans — IBM Plex Sans"}),e.jsx(r,{size:i.Title,font:y.Sans,color:l.Heading,children:"Wiktor Wijata — .NET Developer"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(r,{size:i.XSmall,font:y.Mono,color:l.Faint,children:"Mono — JetBrains Mono"}),e.jsx(r,{size:i.Title,font:y.Mono,color:l.Heading,children:"Wiktor Wijata — .NET Developer"})]})]})]}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{as:"h2",size:i.XXLarge,weight:k.Medium,color:l.Heading,children:"Stos"}),e.jsxs(be,{header:"OrchIDE UI",children:[e.jsxs(B,{label:"Wersja",children:["v",Lt]}),e.jsx(B,{label:"Framework",children:"React 19 + TypeScript"}),e.jsx(B,{label:"Style",children:"Tailwind CSS v4 (@theme)"}),e.jsx(B,{label:"Ikony",children:"Lucide"}),e.jsx(B,{label:"Fonty",children:"IBM Plex Sans, JetBrains Mono"})]})]})]})]})}const ja=[{id:"overview",label:"Overview",path:"/"},{id:"changelog",label:"Changelog",path:"/changelog"},{id:"components",label:"Komponenty",path:"/components"}];function va(t){if(t==="/changelog")return{section:"changelog"};const n=t.match(/^\/components\/([\w-]+)$/);return n?{section:"components",componentId:n[1]}:t==="/components"?{section:"components"}:{section:"overview"}}function Sa({activeId:t}){return e.jsxs(ge,{header:"Komponenty","aria-label":"Nawigacja po komponentach",className:"max-h-[calc(100vh-139px)] max-bp850:max-h-none",children:[e.jsx(Z,{active:t===void 0,onClick:()=>$("/components"),children:"Wszystkie komponenty"}),G.map(n=>e.jsx(ye,{label:n.label,children:ot(n.id).map(o=>e.jsx(Z,{nested:!0,active:t===o.id,onClick:()=>$(`/components/${o.id}`),children:o.name},o.id))},n.id))]})}function Ta({componentId:t}){const n=t?da(t):void 0;return e.jsxs(E,{size:L.Wide,className:"flex gap-10 py-10 max-bp850:flex-col",children:[e.jsx("aside",{className:"sticky top-[115px] w-[224px] shrink-0 self-start max-bp850:static max-bp850:w-full",children:e.jsx(Sa,{activeId:n?.id})}),e.jsx("main",{className:"min-w-0 flex-1",children:n?e.jsx(ua,{entry:n},n.id):e.jsx(ha,{})})]})}function Ca(){const t=ya(),{section:n,componentId:o}=va(t);return x.useEffect(()=>{document.title="OrchIDE UI";const a=document.querySelector('link[rel="icon"]')??document.head.appendChild(Object.assign(document.createElement("link"),{rel:"icon"}));a.type="image/svg+xml",a.href=ga()},[]),e.jsxs("div",{className:"min-h-screen bg-editor",children:[e.jsxs("header",{className:"sticky top-0 z-10 border-b border-border-5 bg-list/95 backdrop-blur",children:[e.jsxs(E,{size:L.Wide,className:"grid grid-cols-[1fr_minmax(0,440px)_1fr] items-center gap-6 py-3 max-bp700:grid-cols-[auto_minmax(0,1fr)]",children:[e.jsxs("a",{href:"#/",className:"flex items-center gap-3 justify-self-start",children:[e.jsx("span",{className:"grid size-8 place-items-center rounded-xl bg-accent/[.094] text-accent-light",children:e.jsx(ka,{className:"size-6"})}),e.jsxs("span",{className:"flex items-baseline gap-3",children:[e.jsx(r,{size:i.XXLarge,weight:k.Medium,color:l.Heading,className:"tracking-[-.02em]",children:"OrchIDE UI"}),e.jsx(A,{className:"max-bp850:hidden",children:"Design system"})]})]}),e.jsx(ba,{}),e.jsx(R,{className:"justify-self-end max-bp700:hidden",children:e.jsxs(r,{font:y.Mono,children:[P.length," komponentów"]})})]}),e.jsx("div",{className:"border-t border-border-2 bg-bar",children:e.jsx(E,{size:L.Wide,children:e.jsx(ke,{"aria-label":"Nawigacja główna",children:ja.map(a=>e.jsx(ne,{active:n===a.id,onSelect:()=>$(a.path),children:a.label},a.id))})})})]}),n==="overview"&&e.jsx(E,{size:L.Wide,className:"py-12",children:e.jsx(wa,{})}),n==="components"&&e.jsx(Ta,{componentId:o}),n==="changelog"&&e.jsx(E,{size:L.Wide,className:"py-12",children:e.jsx(an,{})})]})}Pt.createRoot(document.getElementById("root")).render(e.jsx(Ca,{}));
