export interface Release {
  version: string
  /** ISO date. */
  date: string
  title: string
  added?: string[]
  changed?: string[]
  fixed?: string[]
}

/** Newest first. */
export const releases: Release[] = [
  {
    version: '0.24.0',
    date: '2026-09-21',
    title: 'Porządek w szarościach',
    changed: [
      'Prawie identyczne szarości zastąpione istniejącymi tokenami tej samej roli (tekst, tło, linia): 32 literały [#hex] w komponentach i aplikacji; największe przesunięcie to 3/255 na kanał',
      'Tokeny group-line i panel-line scalone z bar-subtle i chip-line, status-divider z border-6, status-version z text-dim-2, text-heading-2 z text-heading, surface z list (różnica do 1/255)',
    ],
  },
  {
    version: '0.23.0',
    date: '2026-09-21',
    title: 'Etykiety Gallery i SolutionExplorer jako props',
    added: [
      'Gallery: prop labels (GalleryLabels) — nazwy dostępne przycisków i kropek, opis roli karuzeli oraz teksty placeholdera; brakujące pola mają polskie wartości domyślne',
      'SolutionExplorer: prop labels (SolutionExplorerLabels) — tytuł nagłówka i nazwa dostępna drzewa plików',
    ],
  },
  {
    version: '0.22.0',
    date: '2026-09-21',
    title: 'Etykiety Terminal i Chat jako props, DataCard z licznikiem',
    added: [
      'Terminal: prop labels (TerminalLabels) — tytuł, nazwy przycisku zamykania, uchwytu wysokości i pola komendy; brakujące pola mają polskie wartości domyślne',
      'Chat: prop labels (ChatLabels) — nazwy przycisku zamykania, pola wiadomości i przycisku wysyłania',
      'DataCard: prop count — licznik w małej plakietce na pasku nagłówka',
    ],
    changed: [
      'Terminal: pole komendy ma id generowane przez useId (dwa terminale na stronie nie kolidują)',
      'Wnętrza uporządkowane bez zmiany wyglądu: wspólny przycisk zamykania Terminal/Chat, wspólny pasek nagłówka List/InfoCard/DataCard (pasek InfoCard ma teraz 29,6 px jak w prototypie), Tabs podzielone na hook, animator i czyste funkcje',
    ],
  },
  {
    version: '0.21.0',
    date: '2026-09-21',
    title: 'Tokeny wspólnych kolorów i API zamiast nadpisań',
    added: [
      'Tokeny kolorów powtarzanych w wielu komponentach: text-label, text-tag, text-panel-title, text-lead, text-item, text-row-title, text-caption, text-field-label, terminal-text, close-button (+ -hover i -hover-bg), chip-line, bar, bar-subtle, panel-line, group-line, card-line, inset, input-border, explorer-hover',
      'Token shadow-card-raised i Panel: prop raised — mocniejszy cień panelu',
      'Button: rozmiar Card (40 px, promień 5 px) — przycisk w stopce karty',
      'RailButton: prop iconSize (RailButtonIconSize: Md 16 px, Lg 17 px, Xl 18 px)',
    ],
    changed: [
      'Gallery i SolutionExplorer nie ustalają już własnej szerokości ani marginesów — układ należy do rodzica (w przykładzie ustawiamy je klasą className)',
      'Komponenty używają tokenów zamiast powtarzanych literałów kolorów (wygląd bez zmian)',
    ],
  },
  {
    version: '0.20.0',
    date: '2026-09-21',
    title: 'StatusBarButton jako odnośnik',
    added: [
      'StatusBarButton: prop href (oraz target i rel) — renderuje odnośnik <a> wyglądający jak przycisk paska, np. link do dokumentacji',
    ],
  },
  {
    version: '0.19.0',
    date: '2026-09-21',
    title: 'Elementy strony Contact',
    added: [
      'Button: rozmiar Xs (odnośnik-przycisk 7×12 px, mono 12 px — linki społecznościowe) i Lg (wysłanie formularza: 12×18 px, sans 13 px)',
    ],
    changed: [
      'Input i Textarea dopasowane do zmierzonych pól formularza kontaktowego: tło #202226, ramka #464850, padding 12 px, etykieta 13 px z odstępem 8 px, obrys 2 px w kolorze akcentu przy fokusie',
    ],
  },
  {
    version: '0.18.0',
    date: '2026-09-21',
    title: 'Elementy strony Experience',
    added: [
      'List: prop tag w ListItem — ramkowana etykieta (np. zakres dat), która zmienia wygląd razem z wierszem (hover i stan aktywny)',
      'Chip: wariant Position — znacznik technologii w opisie stanowiska (mono 11,5 px, padding 4/10 px)',
    ],
    changed: [
      'ListItem (Detail) dopasowany do prototypu: tytuł #a4a8ae, podtytuł mono 11 px, interlinia normal; w wąskim kontenerze wiersze zajmują całą szerokość, a aktywny ma akcentową linię u góry',
    ],
  },
  {
    version: '0.17.0',
    date: '2026-09-21',
    title: 'Elementy strony Stack',
    added: [
      'List: ListItemVariant.Filter — wiersz filtra kategorii (mono 12 px); w wąskim kontenerze układa się w rząd z akcentową linią u góry',
      'SplitPanel: SplitPanelCollapseAt.Container700 — zwijanie według szerokości kontenera (@container), jak Stack w prototypie',
    ],
    changed: [
      'Chip Default dopasowany do zmierzonego chipa Stack: mono 12,5 px, promień 3 px, ikona może być obrazkiem <img>',
      'List: pasek nagłówka (tło, padding, plakietka licznika) i wiersz wyszukiwania (linia pod spodem) zgodne z prototypem',
    ],
  },
  {
    version: '0.16.0',
    date: '2026-09-21',
    title: 'Chip Tech',
    added: ['Chip: wariant Tech (mono 11 px, padding 5/9 px) — znaczniki technologii na stronie projektu'],
    changed: ['Gallery: teksty (nagłówek, placeholder, licznik) mają interlinię normal, jak w prototypie'],
  },
  {
    version: '0.15.0',
    date: '2026-09-21',
    title: 'Cień karty z poświatą',
    changed: ['Token shadow-card zawiera cienką poświatę u góry (inset 1 px), zgodnie z prototypem — dotyczy Panel'],
  },
  {
    version: '0.14.0',
    date: '2026-09-21',
    title: 'DataCard, warianty Chip i Button Secondary',
    added: [
      'DataCard: karta z paskiem nagłówka (tytuł + akcja) oraz DataCardAction, DataCardList i DataCardRow (wiersz z tytułem, podtytułem i plakietką)',
      'Chip: prop variant (ChipVariant) — Default, Mono (11,5 px) i Compact (10,5 px)',
      'Button: wariant Secondary (np. „Pobierz CV ↓") i prop href, który renderuje odnośnik wyglądający jak przycisk',
    ],
    changed: [
      'Button Md dopasowany do zmierzonych przycisków strony: font mono 12 px i padding 14 px (wcześniej 13 px i 16 px); etykieta pogrubiona tylko w wariancie Primary',
    ],
  },
  {
    version: '0.13.0',
    date: '2026-09-21',
    title: 'Link: wariant Info',
    added: [
      'Link: prop tone (LinkTone) — Accent (domyślny) i Info (niebieski, podkreślany po najechaniu)',
      'Tokeny link-info i link-info-hover',
    ],
  },
  {
    version: '0.12.0',
    date: '2026-09-21',
    title: 'Tło z poświatą i kropkami',
    added: [
      'Utility bg-dotted-glow: tło strony z akcentową poświatą i kropkowaną siatką (Projects, Experience, pusty edytor)',
    ],
  },
  {
    version: '0.11.0',
    date: '2026-09-21',
    title: 'Przewodnik jako okno modalne',
    added: [
      'GuideCard: prop modal — fokus na „Dalej" po każdym kroku, Esc = Pomiń, Tab krąży po przyciskach karty, powrót fokusu po zamknięciu',
      'GuideCard: prop anchor — karta ustawia się przy elemencie (po prawej, pod lub nad nim) i przelicza pozycję przy zmianie okna',
      'Text: prop ref do wyrenderowanego elementu',
    ],
    changed: ['GuideCard: aria-modal ustawiane tylko z modal (statyczny podgląd nie jest oknem modalnym)'],
  },
  {
    version: '0.10.0',
    date: '2026-09-21',
    title: 'Link i rozmiar Sm w Button',
    added: [
      'Link: tekstowy odnośnik w kolorze akcentu — <a> z href albo przycisk akcji bez href; opcja underline',
      'Button: prop size (ButtonSize) — Md (44 px, mono 13) i kompaktowy Sm (8×12 px, sans 12)',
      'Tokeny link i link-hover',
    ],
    changed: [
      'Guide: przyciski Pomiń, Wstecz i Dalej używają Button Sm, a link akcji — Link',
      'Chat: akcja „Zobacz w portfolio →" używa Link',
      'Button: focus-visible z obrysem akcentu',
    ],
    fixed: ['Button: kursor pointer (Tailwind v4 domyślnie zostawia strzałkę na przyciskach)'],
  },
  {
    version: '0.9.0',
    date: '2026-09-21',
    title: 'ChatLauncher i prop open w Chat',
    added: [
      'ChatLauncher: pływający przycisk „Zapytaj o mnie" otwierający okno czatu, z animowanym offsetem bottom',
      'Chat: prop open — ukrywa okno, zachowując wpisany tekst; po ponownym otwarciu przewija na dół i ustawia fokus na polu wiadomości',
      'Tokeny launcher-*: tło, obramowanie i kolor tekstu przycisku ChatLauncher',
    ],
  },
  {
    version: '0.8.0',
    date: '2026-09-21',
    title: 'Terminal: zachowanie stanu po zamknięciu',
    added: [
      'Terminal: prop open — ukrywa panel, zachowując historię komend, wysokość i wyjście; po ponownym otwarciu przewija na dół i ustawia fokus na prompcie',
    ],
  },
  {
    version: '0.7.0',
    date: '2026-09-21',
    title: 'Kolory stanu w RailButton',
    added: [
      'RailButton: prop accent (RailButtonAccent) — kolor stanu active: Accent, Explorer, Success, Assistant',
      'Tokeny rail-success i rail-assistant: tła aktywnych przycisków terminala i czatu',
    ],
  },
  {
    version: '0.6.0',
    date: '2026-09-21',
    title: 'TitleBar i stopka explorera',
    added: [
      'TitleBar: górny pasek okna IDE z logo, tytułem i przyciskami TitleBarButton (tony Run i Link)',
      'SolutionExplorer: prop footer — element przypięty do dołu explorera',
      'Tokeny run-*: kolory niebieskiego przycisku „uruchom" wraz ze stanami hover i focus',
    ],
  },
  {
    version: '0.5.0',
    date: '2026-09-21',
    title: 'StatusBar',
    added: [
      'StatusBar: dolny pasek okna IDE z elementami StatusBarItem, StatusBarButton, StatusBarDivider, StatusBarSpacer i StatusBarSwitch',
      'Tokeny statusu: status-branch, status-success, status-path, status-action, status-version, status-divider, lang-active-text',
    ],
  },
  {
    version: '0.4.1',
    date: '2026-09-21',
    title: 'Opisy propsów w typach komponentów',
    changed: [
      'Wszystkie pliki typów komponentów mają polskie opisy propsów (JSDoc) i wartości domyślne (@default)',
      'Wartości enumów (np. ButtonVariant, FontSize) mają opisy przy każdym członku',
    ],
  },
  {
    version: '0.4.0',
    date: '2026-09-21',
    title: 'Nawigacja: Menu, Tabs i Container',
    added: [
      'Container: wariant ContainerSize.Wide (1280px)',
      'Utility scrollbar-subtle: cienki pasek widoczny po najechaniu',
    ],
    changed: [
      'Menu przewija listę wewnątrz karty, a nagłówek zostaje przypięty',
      'Tabs: przeciąganie i skróty Alt+Shift+strzałki działają tylko z onReorder',
      'Tab bez onClose nie ma przycisku zamykania (zakładka nawigacyjna)',
    ],
  },
  {
    version: '0.3.0',
    date: '2026-09-20',
    title: 'Terminal, Chat i Text',
    added: [
      'Terminal: historia ↑/↓, uzupełnianie Tab, Esc zamyka, zmiana wysokości przeciąganiem lub strzałkami',
      'Chat: okno asystenta z bąbelkami, chipami z pytaniami, Enter wysyła, Shift+Enter nowa linia',
      'Text: rozmiar (FontSize), kolor (TextColor), font (FontFamily) i grubość (FontWeight) zamiast wartości w px',
    ],
    changed: [
      'Komponenty renderują swój tekst przez Text; wygląd bez zmian (sprawdzone porównaniem computed style)',
      'Nazwa biblioteki: OrchIDE UI',
    ],
    fixed: ['Token --shadow-tour zgodny z prototypem (0 16px 60px, alfa .533)'],
  },
  {
    version: '0.2.0',
    date: '2026-09-18',
    title: 'Galeria, przewodnik i przyciski rail',
    added: [
      'Gallery: karuzela z placeholderami, kropkami i obsługą klawiatury',
      'Guide: GuideCard, GuideHighlight i GuideShade',
      'RailButton wydzielony z IconButton (przycisk nawigacji z pionową etykietą)',
      'IconButtonSize: kompaktowy rozmiar Sm',
      'Container i InfoCard',
    ],
    changed: ['Guide: hover na przyciskach Pomiń, Wstecz i Dalej'],
  },
  {
    version: '0.1.0',
    date: '2026-09-17',
    title: 'Pierwsza fala komponentów',
    added: [
      'Tokeny w Tailwind v4 (@theme): kolory, typografia, promienie, cienie, breakpointy',
      'Button, Chip, Badge, Label, Panel, Input, Textarea, SearchField, IconButton',
      'List z wyszukiwarką, SplitPanel, Menu, Tabs z przeciąganiem, SolutionExplorer',
    ],
    fixed: [
      'SolutionExplorer: chevron przełącza folder, a klik w wiersz zaznacza plik lub folder',
      'SolutionExplorer: prawidłowe wcięcia zagnieżdżonych elementów i przyciski rozwiń/zwiń wszystko',
    ],
  },
]
