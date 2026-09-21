# ClientAppIDE

Portfolio w stylu IDE (React 19, Vite 7, TypeScript strict, Tailwind v4). Zawiera dwie aplikacje w jednym projekcie:

| Wejście      | Plik                           | Co to jest                                                |
| ------------ | ------------------------------ | --------------------------------------------------------- |
| `index.html` | `src/main.tsx` → `src/App.tsx` | właściwe portfolio (okno IDE ze stronami)                 |
| `docs.html`  | `src/docs/main.tsx`            | dokumentacja design systemu **OrchIDE UI** (`/docs.html`) |

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:5002 (portfolio) i /docs.html (dokumentacja)
npm run build      # tsc -b + vite build → build/
npm run lint       # ESLint (w tym jsx-a11y)
npm run format     # Prettier (z sortowaniem klas Tailwinda); format:check tylko sprawdza
```

## Struktura `src/`

```
design-system/   OrchIDE UI: komponenty, tokeny (index.css), wersja (version.ts)
                 (internal/ — elementy współdzielone przez komponenty, nieeksportowane: CloseButton, PanelBar, hooki)
docs/            strona dokumentacji generowana z kodu (typy, tokeny, demo, changelog)
navigation/      rejestr stron: PageId, metadane (ścieżka, zakładka, plik), drzewo solution, funkcje pomocnicze
profile/         stałe dane profilu (CV, e-mail, linki) — docelowo z API
context/         stan okna: EditorContext (zakładki, aktywna strona, URL), PanelsContext (explorer, terminal,
                 czat), PreferencesContext (język, wycieczka); hooki useEditor / usePanels / usePreferences
utils/           małe narzędzia bez zależności od Reacta (np. bezpieczny localStorage)
components/      okno aplikacji (Shell) i jego części; Shell.pages.tsx opisuje rail i komendy terminala każdej strony
pages/           strony treści (GetStarted, Home, Projects, ProjectPortfolio, Stack, Experience, Contact),
                 PageContainer (tło i padding strony), PageIntro (nagłówek), PageView (strona dla PageId)
```

Zależności idą w dół: `navigation`, `profile`, `utils` i `design-system` nie znają nikogo powyżej; `context`
zna tylko `navigation`; `pages` i `components` korzystają z reszty. Nie ma cykli importów.

Alias `@/` wskazuje na `src/`. Głębokie importy względne (`../../..`) zastępujemy aliasem.

### Konwencja folderów

Komponent to folder z plikami o tej samej nazwie i eksportami nazwanymi:

```
Name/
  Name.tsx          komponent
  Name.consts.ts    stałe i treści (dane gotowe do przeniesienia na API / i18n)
  Name.types.ts     typy (w design systemie każdy prop ma polski JSDoc)
  components/       podkomponenty używane tylko tutaj
  hooks/useX/       hooki
  utils/            czyste funkcje
  index.ts          barrel
```

Nazwy bez sufiksów. Prefiks `App` tylko przy kolizji z komponentem design systemu (`AppTitleBar`, `AppStatusBar`, `AppTerminal`).
`erasableSyntaxOnly` — zamiast `enum` używamy obiektów stałych (`const X = {...} as const` + typ).

## Zasady

- **Design system.** Każda zmiana komponentu, tokenu lub utility w `design-system/` albo `index.css` wymaga podbicia
  `DESIGN_SYSTEM_VERSION` w `design-system/version.ts` **i** nowego wpisu na górze `docs/changelog.ts`. Changelog opisuje
  wyłącznie zmiany design systemu (nie dokumentacji ani aplikacji).
- **Dokumentacja jest generowana z kodu.** Każdy prop ma polski JSDoc w `*.types.ts`, a każdy komponent wpis w
  `docs/demos/*.tsx`.
- **Tekst zawsze przez `Text`.** Komponent, który wyświetla tekst, renderuje go przez `Text` z design systemu.
- **Żadnych treści w komponentach.** Teksty, etykiety (także `aria-label`) i dane trzymamy w plikach `*.consts.ts`;
  docelowo pochodzą z API i tłumaczeń.
- **Kolory z tokenów.** Kolor użyty w więcej niż jednym miejscu ma token w `@theme` (`src/index.css`); literał `[#hex]`
  zostaje tylko dla jednorazowej wartości z prototypu. Szarość różniąca się od istniejącego tokenu tej samej roli (tekst,
  tło, linia) o nie więcej niż 3/255 na kanał nie dostaje własnego literału ani tokenu — używamy istniejącego. Nie nadpisujemy komponentów przez `!` — brakującą możliwość
  dodajemy do API komponentu.
- **Interlinia.** Skala rozmiarów tekstu ma domyślne interlinie Tailwinda (na nich zweryfikowano okno); tam, gdzie
  prototyp zostawia `normal`, używamy `leading-[normal]`. Nie zmieniamy interlinii w motywie globalnie.
- **Kolejność stron ma jedno źródło:** `solution` w `EditorContext` (docelowo z API). Explorer, rail, skróty i komendy
  terminala podążają za nią.
- **Nowa strona:** dodaj `PageId` i wpis w `navigation`, węzeł w `solution`, komponent w `PAGE_COMPONENTS` oraz wpis w
  `PAGE_SHELL` (`components/Shell/Shell.pages.tsx`; `{}` gdy strona nie ma przycisku w railu ani komendy). Kompilator
  wymusza dwa ostatnie.

## Testy przeglądarkowe (uwagi)

W panelu podglądu Claude Code nie działają `ResizeObserver`, przejścia CSS, płynne przewijanie i leniwe ładowanie
obrazów; do weryfikacji wstrzykujemy `transition: none`. Przy `localStorage['portfolio.tourSeen'] = '1'` wycieczka
„Oprowadź mnie" nie uruchamia się automatycznie.
