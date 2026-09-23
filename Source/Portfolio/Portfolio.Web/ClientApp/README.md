# ClientApp

Portfolio w stylu IDE (React 19, Vite 7, TypeScript strict, Tailwind v4). Zawiera dwie aplikacje w jednym projekcie:

| Wejście      | Plik                           | Co to jest                                                |
| ------------ | ------------------------------ | --------------------------------------------------------- |
| `index.html` | `src/main.tsx` → `src/App.tsx` | właściwe portfolio (okno IDE ze stronami)                 |
| `docs.html`  | `src/docs/main.tsx`            | dokumentacja design systemu **OrchIDE UI** (`/docs.html`) |

## Uruchomienie

```bash
npm install
npm run dev        # https://localhost:5001 (portfolio, certyfikat basicSsl — SpaProxy `dotnet run` łączy się tu) i /docs.html
npm run build      # tsc -b + vite build → build/
npm run lint       # ESLint (w tym jsx-a11y i zakaz surowych kolorów) + check:theme
npm run check:theme  # kontrakt motywów: te same tokeny w każdym motywie, poprawne odwołania
npm run format     # Prettier (z sortowaniem klas Tailwinda); format:check tylko sprawdza
npm run test       # Vitest
```

## Struktura `src/`

```
design-system/   OrchIDE UI: komponenty, wersja (version.ts), motywy (theme/: base.css, dark.css, utilities.css)
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
zna tylko `navigation`, `utils` i `design-system`; `pages` i `components` korzystają z reszty. Nie ma cykli importów.

`src/api/` (klient wygenerowany przez `orval` z `src/api/documentation/PortfolioApi.json`, `npm run generate:api`) i
`src/i18n/` (i18next, `src/i18n/locales/{pl,en}.json`) pochodzą z poprzedniej wersji tej aplikacji (usuniętej przy
zamianie na obecny, IDE-stylowany frontend) — kod działa i typuje się, ale **nie jest jeszcze podłączony**: strony
nadal renderują polskie stałe z `*.consts.ts`, formularz kontaktowy nadal otwiera `mailto:`. Podłączenie
(`useContent()`, `QueryClientProvider`, `i18n.init()` w `main.tsx`, zamiana treści stron na dane z API, prawdziwe
EN) to osobny, jeszcze niezaplanowany etap — patrz punkty A/E w `PLAN_JAKOSCI_KODU.md`.

Alias `@/` wskazuje na `src/`. Głębokie importy względne (`../../..`) zastępujemy aliasem.

### Konwencja folderów

Komponent to folder z plikami o tej samej nazwie i eksportami nazwanymi:

W design systemie statyczne mapy klas wariantów, rozmiarów i tonów oraz konfiguracja komponentu trafiają do
`Name.consts.ts`. W `Name.tsx` pozostają renderowanie, zachowanie i wartości zależne od propsów. Jednorazowe
klasy bazowe i układu mogą pozostać w JSX. Stałe implementacyjne importujemy bezpośrednio z pliku, bez
rozszerzania publicznego API komponentu w `index.ts`.

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
- **Kolory tylko z motywu.** Żadnych `#hex`, `rgb()`, `hsl()` ani klas domyślnej palety Tailwinda (`bg-white`,
  `text-red-500`) w kodzie — ESLint to blokuje, a paleta jest wyłączona. Kolory żyją w plikach motywu
  (`design-system/theme/dark.css`), a kod odwołuje się do tokenów po nazwie: `surface-*` (tła), `line-*` (linie),
  `content-*` (tekst i ikony), `accent-*`, `link-*`, `success|warning|danger|info-*`, `decor-*`, `tint` / `scrim`
  (nakładki). Przezroczystość przez modyfikator (`bg-accent/10`), cienie i gradienty składamy z tokenów. Nowy kolor to
  nowy token w **każdym** motywie (`npm run check:theme` pilnuje kompletu); szarość bliska istniejącemu tokenowi tej
  samej roli (do ok. 3/255) nie dostaje własnego. Miejsca bez zmiennych CSS (SVG jako data URI) używają
  `readThemeColor()`. Nie nadpisujemy komponentów przez `!` — brakującą możliwość dodajemy do API komponentu.
- **Motywy.** Są dwa: `dark` (domyślny) i `light` (`design-system/theme/`). Motyw wybiera `data-theme` na `<html>`;
  `useTheme()` daje bieżący motyw i `setTheme` (wybór zapamiętuje `localStorage`), `initTheme()` w `main.tsx` go stosuje.
  Przełącznik jest w pasku statusu i w nagłówku docs. Ciemne, jednokolorowe ikony (np. Devicon) oznaczamy
  `monochrome` — w motywach z ciemną powierzchnią są odwracane (`--theme-icon-invert`); kolor ikony nie może siedzieć w
  adresie URL. Jak dodać kolejny motyw — strona „Motywy" w dokumentacji.
- **Wygląd vs kompozycja.** Design system odpowiada za powtarzalny wygląd i interakcję (kolory powierzchni,
  obramowania, typografia, focus/hover/disabled) — wspólny fragment stylu w kilku miejscach dostaje tam komponent
  albo token, nie kopię listy klas. Strona odpowiada za układ i kompozycję (`grid`, `flex`, `gap`, marginesy,
  responsywność strony) — to zostaje w JSX strony, bez komponentu-opakowania tylko po to, by ukryć te klasy.
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
