# ClientApp (dawniej ClientAppIDE) — analiza jakości kodu i plan usprawnień

Data: 22.09.2026. Zakres: aktualny kod roboczy `ClientApp`, razem z niezacommitowanymi zmianami. Dokument jest planem, nie implementacją. Ścieżki poniżej są względne wobec tego katalogu. **Uwaga historyczna:** do migracji opisanej niżej ten katalog nazywał się `ClientAppIDE`, a wszystkie wcześniejsze sekcje tego dokumentu (w tym własne nazwy plików, np. `EditorContext.transitions.ts`) odnoszą się do stanu sprzed migracji pod tą nazwą — nie zmieniano ich retrospektywnie.

## Migracja: usunięcie starego ClientApp, przemianowanie ClientAppIDE → ClientApp (22.09.2026)

**Decyzja użytkownika:** ClientAppIDE (IDE-stylowany frontend, przedmiot całego tego planu) zastępuje stary `ClientApp` jako oficjalny frontend `Portfolio.Web`. Stary `ClientApp` usunięty.

**Co miał stary ClientApp, czego nie miał ClientAppIDE:** działającą integrację z API — `axios` + `@tanstack/react-query` + klient wygenerowany przez `orval` z `src/api/documentation/PortfolioApi.json`, oraz `i18next`/`react-i18next` z pełnymi tłumaczeniami PL/EN (`src/i18n/locales/{pl,en}.json`). To dokładnie to, na co czekały odłożone punkty A (formularz) i E (EN) tego planu.

**Co zrobiono, żeby tej pracy nie stracić:** `src/api/` i `src/i18n/` przeniesione do ClientAppIDE bez zmian logiki (tylko przeformatowane Prettierem, zgodnie z jego konwencją bez średników). Kod typuje się i przechodzi lint, ale **nie jest podłączony** — strony nadal renderują polskie stałe z `*.consts.ts`, formularz nadal robi `mailto:`. Podłączenie (`useContent()`, `QueryClientProvider`, `i18n.init()` w `main.tsx`, zamiana treści stron na dane z API) to osobny, nierozpoczęty etap — nadal odpowiada dawnym punktom A/E, teraz już bez blokady brakującego kodu klienta API. `src/api/generated/` i `src/api/documentation/` wyłączone z ESLint i Prettiera (`eslint.config.js`, `.prettierignore`) jako kod generowany przez `orval run generate:api`, nie do ręcznej edycji.

**Dev server / SpaProxy:** `vite.config.ts` przełączony z portu 5002 (HTTP, "żeby dwie apki chodziły równolegle") na port **5001 + `basicSsl()`** — dokładnie to, czego oczekuje `SpaProxyServerUrl` w `Portfolio.Web.csproj`. To pierwsze rzeczywiste podłączenie ClientAppIDE (teraz ClientApp) pod `dotnet run`/SpaProxy; wcześniej działał tylko jako samodzielny `npm run dev`. Zweryfikowane: `curl -sk https://localhost:5001/` zwraca poprawny HTML (tytuł „WiktorWijata / Portfolio"). Panel przeglądarki Claude odrzuca certyfikat self-signed bez możliwości „kontynuuj mimo to" — wizualna weryfikacja w tym narzędziu niemożliwa; realna przeglądarka użytkownika działa normalnie.

**`Portfolio.Web.csproj` i `Deployment/Docker/Dockerfiles/Portfolio.Web.Dockerfile` nie wymagały zmian** — oba odwołują się do folderu po prostu jako `ClientApp`, nie do starej czy nowej nazwy wprost. `.claude/launch.json` zaktualizowany (ścieżka, port, `https://`). `package.json` → `"name": "clientapp"`. `README.md` → tytuł, port/https w instrukcji uruchomienia, nowa notka o `src/api`/`src/i18n`.

**Efekt uboczny naprawiający punkt K (build/ artifact policy):** korzeniowy `.gitignore` ma regułę `**/ClientApp/build/`, która literalnie nie pasowała do `ClientAppIDE` — stąd `build/` tego katalogu było częściowo i niespójnie śledzone przez git (stare, nieaktualne pliki z hashowanymi nazwami sprzed tej sesji). Po przemianowaniu reguła zaczęła obowiązywać: `git status` po `git add -A` pokazuje `ClientApp/build/` jako w pełni ignorowane, żadne pliki builda nie zostały ponownie dodane do indeksu.

**Nie wykonano w ramach tej migracji:** `dotnet build`/`dotnet run` na `Portfolio.Web` (weryfikacja ograniczona do samego frontendu — `npm run test`/`lint`/`tsc`/`format:check`, wszystkie **OK** po migracji), aktualizacji CI (`.github/workflows/` nie odwołuje się do nazwy folderu, więc nie wymagał zmian, ale nadal nie ma w nim joba testów frontendu — to nadal punkt 2 „Pozostały plan" niżej), ani podłączenia `src/api`/`src/i18n` do stron.

## 0. Audyt 5 — aktualny wynik

Weryfikacja: 22.09.2026. **Ta sekcja jest aktualnym podsumowaniem; wcześniejsze audyty opisują stan historyczny.** Zakres obejmuje kod roboczy, także zmiany niezacommitowane. EN i formularz pozostają odłożone do API, a optymalizacja obrazów zgodnie z wcześniejszym ustaleniem poza zakresem.

**Wynik:** potwierdzono poprawki przewodnika O1/O2 oraz wdrożenie testów limitu czatu. Nie znaleziono nowego problemu uzasadniającego szeroką przebudowę architektury, kolejne abstrakcje Tailwind lub optymalizacje bez pomiaru. Aktualizacja 23.09.2026: testy regresji są wdrożone; dodano workflow kontroli jakości, określono zachowanie O3 i poprawiono opis parsera. Weryfikacja uruchomienia workflow na GitHub oraz integracji .NET/Docker pozostaje osobnym krokiem.

### Potwierdzony stan

- **O1 — zamknięte w opisanym scenariuszu:** `useTourTarget` ponownie wybiera widoczny cel podczas pomiaru i przywraca style poprzedniego. Listenery działają także wtedy, gdy na początku nie znaleziono celu.
- **O2 — zamknięte w opisanych scenariuszach:** Guide odrzuca elementy bez prostokątów układu i jawnie obsługuje Tab/Shift+Tab, gdy fokus jest poza kartą. Nie jest to dowód obsługi wszystkich możliwych ograniczeń fokusu, np. `inert` lub `visibility: hidden`; nie odtworzono jednak takiego problemu w obecnych krokach przewodnika. Nie otwierać ponownie poprawionego błędu wyłącznie na podstawie hipotetycznej przyszłej zawartości.
- **G — zamknięte, testy działają:** hook korzysta z `appendMessages`, które zachowuje ostatnie 100 wiadomości. `npm test` uruchomił jeden plik i zakończył się wynikiem **4/4 OK**. Pokrycie obejmuje dopisywanie, przekroczenie limitu, wielokrotne dopisywanie i kolejność. To testy funkcji przejścia, nie DOM ani całego hooka.
- **N1–N4:** wcześniejsze naprawy pozostają w kodzie i mają testy regresji opisane poniżej. W reorder nadal są blokada klawiatury podczas drag, anulowanie po zmianie dzieci oraz sprzątanie animacji.
- **Tailwind / clean code:** `FIELD_BASE_CLASSES`, `CardHeading`, wspólne utilities i tokeny motywów pozostają użytecznymi miejscami współdzielenia stylów. Długość `className` sama w sobie nie jest defektem. Nie przenosić jednorazowych klas układu do kolejnych komponentów ani stałych bez rzeczywistej duplikacji lub odrębnej odpowiedzialności. Podział czystych przejść edytora/czatu i hooków obsługujących efekty jest adekwatny do obecnej skali; nie ma podstaw do dodawania warstw tylko dla formalnego SOLID.

### Pozostały plan — kolejność i warunki odbioru

1. ~~**P2 — trwałe testy regresji N1–N4.**~~ Wykonane 22.09.2026 — patrz „Testy regresji N1–N4 i O1/O2" niżej.
2. **CI — wdrożone 23.09.2026:** `.github/workflows/frontend-quality.yml` uruchamia na push, pull request i ręcznie: `npm ci`, lint, oba projekty TypeScript, testy, formatowanie i build. Kontrola jest niezależna od wdrożenia; każdy nieudany krok kończy job błędem. Node 24.15.0 odpowiada wymaganiom jsdom. Pierwszy przebieg na GitHub pozostaje do potwierdzenia; wymaganie kontroli przed merge zależy od ustawień ochrony gałęzi.
3. **O3 — wdrożone 23.09.2026:** ponowne montowanie na `/` z `{ empty: true }` zachowuje pusty edytor. Zwykłe wejście na `/` otwiera GetStarted. Znacznik jest sprawdzany jako literalne `true` i działa wyłącznie na `/`; inicjalizacja i Back/Forward używają wspólnej walidacji. Dodano test ponownego montowania i przypadki nieprawidłowego znacznika. Nie dodano persystencji całego workspace.
4. **Opis parsera — poprawiony 23.09.2026:** Vite dostarcza surowe źródła, a parser przetwarza je przy wykonaniu modułu dokumentacji. Przeniesienie parsowania do builda nie jest częścią zmiany.

**Aktualizacja odbioru H/I (23.09.2026):** wykonano Performance trace Chromium oraz pomiar React Profiler API dla drag i resize/scroll z czatem i przewodnikiem; wyniki i ograniczenia poniżej. Jest to profil deweloperski, nie produkcyjny budżet wydajności. Szczegóły i warunki odbioru w sekcji „Uzupełnienie — częściowe pomiary H/I”. Generator tokenów wyklucza teraz pliki test/spec i katalogi `__tests__` z surowych źródeł dokumentacji.

Dodatkowo ujednolicono nazwę `clientapp` w `package-lock.json` po migracji katalogu. API/i18n i obrazy pozostają poza zakresem zgodnie z wcześniejszymi ustaleniami.

**Kontrole po poprawkach 23.09.2026:** 42/42 testy w 8 plikach, lint, oba projekty TypeScript, formatowanie i build produkcyjny — OK. Test ponownego montowania sprawdza inicjalizację po odświeżeniu w jsdom, nie jest próbą przeładowania rzeczywistej przeglądarki. Testy i build wymagały uruchomienia poza sandboxem z powodu blokady procesu esbuild. Lokalna weryfikacja korzystała z Node 22.18.0; workflow używa Node 24.15.0. Nie uruchomiono workflow na GitHub ani integracji .NET/Docker.

### Kontrole i ograniczenia audytu z 22.09.2026 (przed dodaniem testów regresji)

- `npm test`: **4/4 OK**. Pierwszą próbę zablokował sandbox (`spawn EPERM` dla esbuild); ponowne uruchomienie poza nim zakończyło się powodzeniem.
- `npm run lint`: **OK**, kontrola motywów: 2 pliki, 78 zmiennych.
- TypeScript: **OK** dla `tsconfig.app.json` i `tsconfig.node.json`, z `--noEmit --incremental false`.
- `npm run format:check`: **OK** po aktualizacji planu.
- Nie uruchamiano nowego builda ani przeglądarkowych pomiarów wydajności i interakcji. Zapisane poniżej wcześniejsze wyniki wizualne O1/O2 i pomiary H/I pozostają wynikami poprzednich prób, nie tego audytu.
- Zmiana w ramach analizy obejmuje wyłącznie ten plan. Kod aplikacji, konfiguracja i zależności nie były modyfikowane.

### Testy regresji N1–N4 i O1/O2, wykonane 22.09.2026

8 plików testowych, **33/33 OK** (`npm run test`), TypeScript i ESLint bez zastrzeżeń po zmianie. Dodano `@testing-library/react` i `jsdom` jako devDependency (obok `vitest` z poprzedniego kroku) — potrzebne dla testów, które renderują prawdziwe hooki/komponenty w DOM, nie tylko wołają czyste funkcje.

**Znaleziony i naprawiony przy okazji defekt narzędzia testowego (nie kodu aplikacji):** `getComponentTokens` (N2) pod Vitestem zwracał puste wyniki dla wszystkich komponentów — powodem był domyślny tryb Vitest, w którym importy `.css` (także przez `?raw`, którego `tokens.ts` używa do wczytania plików motywu) są zastępowane pustym modułem, jeśli `test.css` nie jest włączone. Naprawione dodaniem `test: { css: true }` w `vite.config.ts` (ten sam plik służy teraz `vite`/`vite build` — pole `test` jest przez nie ignorowane — i `vitest`, przez re-export `defineConfig` z `vitest/config`). Bez tej poprawki N2 dawałby fałszywie pozytywny wynik (pusta lista nigdy nie zawiera `--text-h1`).

- **N1 — `useUrlSync.test.ts`** (`@vitest-environment jsdom`): harness łączący prawdziwe `EditorContext.transitions` z prawdziwym `useUrlSync`, dokładnie jak robi to `EditorProvider`. Test wykonuje realną nawigację jsdom (`history.back()`/`forward()`, oczekiwanie na natywny `popstate`, nie ręczne wywoływanie): zamknięcie ostatniej zakładki → Back → Forward odtwarza pusty edytor, nie GetStarted; `history.length` się nie zmienia; wpis „/” bez znacznika `empty` nadal poprawnie rozwiązuje się do GetStarted.
- **N2 — `tokens.test.ts`**: bezpośrednie wywołanie `getComponentTokens` (ten sam `import.meta.glob` co w aplikacji, natywnie wspierany przez Vitest/Vite) na `Input`/`Textarea`/`CardHeading` — brak `--text-h1`; `Text` samo nadal go zgłasza (zamierzony wyjątek). Dodatkowy pozytywny test: Input/Textarea nadal mają `--color-surface-inset`, `--color-line-emphasis`, `--radius-md` (regresja R2).
- **N3 — `parseTypes.test.ts`**: wyeksportowano `parseSource` (ta sama funkcja `parse`, którą moduł woła na prawdziwych źródłach) wyłącznie do celów testowych. Niedomknięty JSDoc, niedomknięty `export const`, nigdy niezamknięty nagłówek interfejsu — wszystkie kończą się bez zawieszenia (cały plik testowy: ~0,6 s, żaden test nie zbliża się do domyślnego limitu czasu Vitest, co samo w sobie jest dowodem braku pętli nieskończonej).
- **N4 — `useTabsReorder.test.tsx`** (jsdom) + **`reorderMath.test.ts`**: prawdziwy hook z podłożonymi elementami `[data-tab-id]`, realnymi zdarzeniami `pointerdown`/`pointermove`/`pointerup`/`lostpointercapture`/`keydown`. jsdom nie ma Pointer Capture, `requestAnimationFrame`, `matchMedia`, `scrollIntoView` ani Web Animations — dopolyfillowane w `beforeEach` (reduced-motion=`true` celowo omija ścieżki animacji, więc `Element.animate`, którego jsdom też nie ma, nigdy się nie wywołuje). Sprawdzone: Alt+Shift+strzałka ignorowana podczas aktywnego dragu (i działa normalnie bez dragu); Escape anuluje gest bez wywołania `onReorder`, czyści klasę i transform, kolejny `pointerup` nic już nie robi; zmiana zestawu zakładek pod dragiem (MutationObserver) anuluje gest; utrata pointer capture anuluje gest; zwykły drop nadal zgłasza kolejność.
- **O1 — `useTourTarget.test.tsx`** (jsdom): podłożone `getClientRects`/`getBoundingClientRect` symulujące ukrywanie/pokazywanie celu. Potwierdza dokładnie scenariusz z sekcji O1 wyżej (przełączenie `TerminalRail`→`TerminalStatus`→`TerminalRail` na `resize`, przywracanie stylów) oraz że brak celu na starcie nie blokuje jego późniejszego znalezienia.
- **O2 — `Guide.test.tsx`** (jsdom): prawdziwy `GuideCard` w trybie `modal`. Potwierdza: Shift+Tab spoza karty → ostatni element; Tab spoza karty → pierwszy; kontrolka ukryta `display:none` jest pomijana w cyklu; zwykły cykl 3 przycisków (zawijanie) działa jak wcześniej.

## Archiwum: audyt 4 — wynik przed ponowną weryfikacją

Weryfikacja: 22.09.2026. **Ta sekcja zastępuje wcześniejsze statusy i kolejność prac.** EN i formularz pozostają odłożone do API. Zachowano również zapisane w dokumencie wyłączenie optymalizacji obrazów z zakresu; nie przywracać tego zadania na podstawie starszej sekcji H.

**Ocena:** konkretne problemy N1–N4 z audytu 3 zostały w zasadniczym zakresie poprawione. Nie należy ponownie zlecać ich implementacji. Nadal potrzebne są testy regresji, dopracowanie przewodnika oraz ustalenie zachowania przy ponownym uruchomieniu aplikacji na pustym edytorze. Nie znaleziono podstaw do dalszej szerokiej przebudowy architektury lub mechanicznego skracania klas Tailwind.

### Zweryfikowane poprawki

| Punkt                              | Aktualny status i dowód                                                                                                                                                                                                                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N1 — pusty edytor w historii       | Naprawiony scenariusz zamknięcie → Back → Forward. Hook zapisuje `{ empty: true }`, rozpoznaje wpis i wywołuje `onEmpty`. Kontrolowana próba rzeczywistego hooka z atrapą hooków React i History API zakończyła się `active: null`, adresem `/` i bez dodatkowego wpisu. Nie jest to test E2E. |
| N2 — nadmiarowe tokeny Text        | Naprawione dla wskazanych przypadków: Input i Textarea zwracają po 11 tokenów, CardHeading 4; żaden wynik nie zawiera `--text-h1`. Pola nadal zawierają tokeny powierzchni, obramowania, promienia i akcentu. Sprawdzono wykonaniem generatora na aktualnych źródłach.                         |
| N3 — nieskończone pętle parsera    | Poprawione: niepełny JSDoc, enum i interfejs kończą pracę bez timeoutu. Parser przyjmuje strategię pominięcia/wyniku częściowego; nadal nie raportuje szczegółowej diagnostyki źródła. Brak diagnostyki to dalsze usprawnienie, nie ten sam błąd zawieszenia.                                  |
| N4 — konkurujące operacje reorder  | Kod blokuje reorder klawiaturą podczas gestu, anuluje gest po zmianie dzieci kontenera przez MutationObserver i anuluje animacje sąsiadów przy cancel. Listener i observer są sprzątane. Statycznie domknięto wskazane przyczyny; wizualny efekt drag/cancel wymaga testu interakcji.          |
| G — nieograniczony czat            | Dodano `ASSISTANT_MAX_MESSAGES = 100` i ograniczanie tablicy przez `slice`. Symulacja 500 par z aktualnym limitem i wyrażeniem dopisania zachowała 100 różnych identyfikatorów. Nie jest to pomiar DOM ani test całego hooka czatu.                                                            |
| R1/R2 — wcześniejsze regresje docs | Nie wróciły: generator nadal zwraca po dwa warianty Button/Link/StatusBarButton i niepuste tokeny pól.                                                                                                                                                                                         |

### O1. P2 — przewodnik nie zmienia celu po ukryciu elementu — ZAMKNIĘTE 22.09.2026

**Miejsce:** `src/components/Shell/components/GuideTour/hooks/useTourTarget/useTourTarget.ts` wybierał element raz podczas uruchomienia efektu. Obsługa `resize` wywoływała tylko `getBoundingClientRect()` na zapamiętanym elemencie.

**Wykonano:** `measure()` ponownie uruchamia `findTarget(targets)` przy każdym pomiarze (start, `resize`, `scroll`), a nie tylko raz przy montowaniu. Przy zmianie wybranego elementu przywraca inline-style poprzedniego celu (`raise()`/restore) i podnosi nowy. Usunięto wczesny `return` przy braku celu na starcie — listenery zostają zarejestrowane, więc późniejszy resize może odnaleźć cel.

**Weryfikacja w przeglądarce (realny build deweloperski, nie atrapa):** uruchomiono przewodnik na kroku „Portfolio z terminala" (cel `TerminalRail`) przy szerokim viewporcie — rail podniesiony (`position: relative; z-index: 9991`). Zwężono okno do 480px (poniżej progu `max-bp570:hidden`): highlight przeszedł na `TerminalStatus` w pasku statusu z realnym niezerowym rectem (`top≈773, width=82, height≈25`), inline-style raila zostały przywrócone (`zIndex: '', position: ''`). Przywrócono szeroki viewport — podświetlenie wróciło na `TerminalRail`, `TerminalStatus` bez zmienionych stylów. Brak błędów konsoli.

### O2. P2 — pozostałe przypadki fokusu w Guide — ZAMKNIĘTE 22.09.2026

To było podtrzymanie wcześniejszego ustalenia F. `src/design-system/components/Guide/Guide.tsx` zbierał elementy samym selektorem, bez odfiltrowania ukrytych elementów i ograniczeń nadrzędnych kontenerów; dla fokusu spoza karty (`index === -1`) i Shift+Tab wybierany był przedostatni element zamiast ostatniego.

**Wykonano:** dodano `reachableFocusable()` filtrujący wynik selektora przez `getClientRects().length > 0` (odrzuca elementy `display: none` i ukryte przez rodzica). Dla `index === -1` (fokus spoza karty) dodano jawną gałąź: Shift+Tab → ostatni element, Tab → pierwszy; ogólny wzór modulo obsługuje resztę przypadków bez zmian.

**Weryfikacja w przeglądarce:** na aktywnym (modalnym) kroku przewodnika ustawiono fokus na `document.body`, wysłano Shift+Tab — fokus trafił na ostatni fokusowalny element karty (`Dalej →`), zgodnie z oczekiwaniem, nie na przedostatni jak wcześniej. Brak błędów konsoli.

**Design system:** Guide.tsx to komponent OrchIDE UI — wersja podniesiona do `0.27.1`, wpis w `src/docs/changelog.ts` dodany. `useTourTarget` jest kodem aplikacji (Shell), nie design systemu, więc nie wymaga osobnego wpisu.

### O3. P3 — polityka ponownego otwarcia pustego edytora

**Dowód:** `EditorProvider.tsx:16` inicjalizuje stan wyłącznie z `location.pathname`. Przy `/` zwraca GetStarted nawet wtedy, gdy bieżący wpis historii ma `{ empty: true }`. Pierwszy efekt `useUrlSync` zastępuje wtedy wpis adresem GetStarted. Back/Forward działa już poprawnie; ponowne zamontowanie aplikacji na tym samym wpisie zachowuje się inaczej.

**Plan:** jawnie ustalić politykę. Zalecane: respektować poprawny znacznik pustego edytora także podczas inicjalizacji, a wejście na `/` bez znacznika kierować do GetStarted. Jeśli reset przy odświeżeniu jest świadomie zamierzony, wystarczy go udokumentować i przetestować — nie wymuszać pełnej trwałości workspace. Odczyt znacznika warto współdzielić i walidować jako dokładne `empty === true` w odpowiednim wpisie `/`, zamiast samej prawdziwości dowolnej wartości.

**Odbiór:** osobne przypadki świeżego wejścia `/`, wejścia na znaną stronę, odtworzenia oznaczonego pustego wpisu oraz nieprawidłowego `history.state`. To doprecyzowanie kontraktu, nie ponowne otwieranie naprawionego N1.

### Utrzymanie i pomiary — aktualizacja wniosków

- **Testy:** w `package.json` nadal brak polecenia testowego; nie znaleziono plików test/spec poza zależnościami i buildem. Jednorazowe próby tego audytu nie zastępują zestawu regresji w repozytorium. Priorytetem są właśnie naprawione przejścia historii, parser, tokeny i reorder, nie testowanie każdego prostego komponentu.
- **Generator docs:** poprawki są skuteczne dla sprawdzonych wejść. Dalsze przeniesienie generowania na etap builda traktować jako P3, o ile nie ma pomiaru wskazującego koszt wymagający szybszego działania. Nadal warto poprawić komentarz sugerujący przetwarzanie build-time, gdy parser wykonuje się w module przeglądarkowym.
- **H/I i odbiór wizualny:** zachowano wcześniejsze wyniki dopisane do planu (transfer, brak long tasków w opisanej próbie, oba motywy). Nie odtwarzano ich w tym audycie i nie są jego nowym wynikiem. Krótka próba nie jest uniwersalnym budżetem wydajności, lecz nie ma podstaw do odrzucania jej i zlecania optymalizacji bez nowego problemu.
- **Korekta opisu geometrii:** aktualny `useChatDock` nasłuchuje `resize` i ResizeObserver, nie ma listenera `scroll`. Wcześniejsze zbiorcze stwierdzenie o obu hookach obsługujących scroll/resize 1:1 jest zbyt szerokie. Wywołanie `setBottom` z tą samą liczbą nie dowodzi dodatkowego renderu; `useTourTarget` tworzy natomiast nowy obiekt rect. O1 dotyczy poprawności celu, niezależnie od kosztu renderów.
- **Zakres:** optymalizacja obrazów, EN i formularz pozostają poza bieżącym etapem. Nie dodawać globalnego store, memoizacji ani nowych warstw tylko dlatego, że poprzednie problemy zostały zamknięte.

### Kontrole i kolejność dalszych prac

Lint wraz z kontrolą motywów oraz TypeScript dla aplikacji i konfiguracji Vite: **OK**. Próby generatorów, granicznych wejść parsera i logiki synchronizacji historii opisano powyżej z zakresem atrap. Nie wykonano nowego builda, testu E2E ani audytu wizualnego. Zmieniono tylko dokument planu.

1. ~~Poprawić O1 i domknąć O2, potwierdzając zachowanie przewodnika w przeglądarce.~~ Wykonane 22.09.2026 — patrz sekcje O1/O2 wyżej.
2. Dodać trwałe testy regresji N1–N4 oraz limitu czatu; uruchamiać je razem z lintem i kontrolą typów w CI. **Limit czatu (G) wykonany 22.09.2026** — patrz niżej. N1–N4 nadal bez testów regresji.
3. Rozstrzygnąć O3 zgodnie z oczekiwanym zachowaniem odświeżenia, bez rozbudowy do pełnej persystencji workspace.
4. Uzupełnić dokumentację ograniczeń generatorów i pomiarów. Pozostałe optymalizacje wykonywać dopiero na podstawie nowych pomiarów lub reprodukcji.

Po zakończeniu tych prac można zamknąć bieżący etap porządkowania kodu; nie wymaga on gotowego API, tłumaczeń EN ani wdrożenia produkcyjnego.

### Test regresji — limit czatu (G), wykonane 22.09.2026

W projekcie nie było dotąd żadnego runnera testów (`package.json` bez skryptu `test`, brak plików test/spec w `src`). Dodano `vitest` jako devDependency (Vite go już obsługuje bez dodatkowej konfiguracji — `resolve.alias` z `vite.config.ts` jest respektowany) oraz skrypt `"test": "vitest run"`.

Logikę obcinania historii czatu wydzielono z `useAssistant.ts` do czystej funkcji `appendMessages(prev, added)` w nowym pliku `src/components/Shell/components/Assistant/hooks/useAssistant/useAssistant.transitions.ts` (ten sam wzorzec co `EditorContext.transitions.ts` — logika bez Reacta, osobno testowalna). Hook używa jej zamiast inline `slice`.

Test `useAssistant.transitions.test.ts` sprawdza: dopisywanie poniżej limitu nic nie ucina, przekroczenie limitu ucina najstarsze wiadomości i zachowuje najnowsze, wielokrotne dopisywanie (500 wiadomości) nigdy nie przekracza `ASSISTANT_MAX_MESSAGES` i zachowuje unikalne, najnowsze identyfikatory, kolejność pozostaje rosnąca. `npm run test`: **4/4 OK**. `npm run lint` i TypeScript (`tsconfig.app.json --noEmit`) bez zastrzeżeń po zmianie.

## Archiwum: audyt 3 — zakres i wynik przed kolejnymi poprawkami

Weryfikacja: 22.09.2026, po kolejnych zmianach w źródłach wersji `0.27.0`.

**Decyzja użytkownika: EN i formularz zostają odłożone do przygotowania API.** Punkty A/E, ich komunikaty, walidacja i integracja należą do późniejszego etapu. Nie są blokadą zakończenia obecnego porządkowania frontendu. Poniższa lista zastępuje wcześniejsze priorytety; historyczne zalecenia dotyczące A/E nie stanowią polecenia realizacji teraz.

**Wynik:** większość konkretnych usterek z audytu 2 poprawiono. Pozostały problemy nawigacji pustego edytora, odporności i dokładności generatorów, limitu czatu oraz przypadki brzegowe interakcji. Nie ma potrzeby ponownie wdrażać już wykonanych abstrakcji Tailwinda ani unii propsów.

### Co potwierdzono jako poprawione

| Obszar                             | Wynik bieżącej weryfikacji                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R1 — tabele propsów                | Naprawione dla trzech wskazanych komponentów. `getUnion` zwraca po dwa warianty Button, Link i StatusBarButton, wraz ze wspólnymi propsami. `PropsTable` renderuje teraz każdy wariant. Zweryfikowano wynik generatora; nie sprawdzano wyglądu tabel w przeglądarce.                                         |
| R2 — brak tokenów pól              | Usunięto puste wyniki. Input/Textarea mają m.in. `--color-surface-inset`, `--color-line-emphasis` i `--radius-md`; generator rozwija importy oraz własne utilities. Pozostaje nadmiarowa lista tokenów — N2.                                                                                                 |
| R3 — Escape i animacje             | Jest listener dokumentu wywołujący `endDrag(false)` po Escape oraz `cancelAll()` w cleanupie hooka. To zamyka wcześniejszy brak tych dwóch mechanizmów. Obsługa zmiany listy i konkurencyjnych gestów nadal wymaga dopracowania — N4.                                                                        |
| R4 — fokus uchwytu                 | Separator terminala ma teraz `focus-ring`. Brak deklaracji fokusu został naprawiony; brak próby wizualnej oznacza, że nie potwierdzono jeszcze widoczności obrysu w rzeczywistym układzie.                                                                                                                   |
| R5 — changelog                     | Wpis `0.27.0` uzupełniono o kontrakty, reorder, klawiaturę i utilities. Wąskie ustalenie R5 zamknięte.                                                                                                                                                                                                       |
| C — rozdzielenie odpowiedzialności | Przejścia edytora przeniesiono do `EditorContext.transitions.ts`; poprawiono rozróżnienie `pushState`/`replaceState` po `popstate`, także gdy aktywna strona się nie zmienia. Polityka nieznanych tras jest teraz spójna: fallback do GetStarted. Nie wymaga to narzucania osobnej strony 404. Pozostaje N1. |
| Tailwind                           | Field, CardHeading, wspólne utilities i token promienia pozostają wdrożone. ProjectCard korzysta z propsa `color` Text; mapowania odpowiadają wcześniejszym kolorom. Dalsze prace powinny wynikać z duplikacji lub konfliktów, nie z samej długości `className`.                                             |

### N1. P2 — historia nie odtwarza pustego edytora

**Dowód:** `EditorContext.transitions.ts:34` po zamknięciu ostatniej zakładki ustawia `active: null`. `useUrlSync.ts:22` zapisuje ten stan jako `/` i przy zapisie przekazuje do History API `null` zamiast informacji o stanie edytora. Przy odtworzeniu `/` linia 35 przekazuje `pageFromPath('/')`, czyli `null`; `showPage` w `EditorContext.transitions.ts:25` zamienia go na GetStarted. Synchronizacja koryguje wtedy adres na `/getstarted`.

**Scenariusz:** otwarta zakładka → zamknięcie ostatniej zakładki → Back → Forward. Ostatni krok zamiast pustego edytora pokazuje GetStarted. Ujednolicenie nieznanych tras nie rozwiązuje tego przypadku, bo pusty edytor ma własne znaczenie i jest osiągalnym stanem aplikacji.

**Potwierdzenie:** wykonanie czystych przejść w pamięci wykazało `{ tabs: [], active: null }` po zamknięciu i aktywne GetStarted po `showPage(..., null)`. W tej próbie zależność nawigacji była minimalną atrapą odpowiadającą mapowaniu `/` i `/getstarted`; pełnego przebiegu History API w przeglądarce nie uruchamiano.

**Plan:** odróżnić wpis historii pustego edytora od bezpośredniego wejścia na `/`, np. przez niewielki, walidowany `history.state`. Nie trzeba przywracać całej historii zakładek, aby zachować informację „edytor pusty”. Zachować fallback GetStarted dla nieznanych adresów. Określić przy okazji politykę query/hash — obecna korekta do samego `path` może je usuwać.

**Odbiór:** Back/Forward wraca do pustego edytora bez zamiany wpisu na GetStarted; wejście z zewnętrznego linku i normalizacja ukośnika nie produkują dodatkowych wpisów. Testy powinny obejmować także dwa różne adresy rozwiązywane do tej samej strony.

### N2. P2 — generator tokenów przypisuje komponentom wszystkie warianty Text

**Potwierdzone wykonaniem na aktualnych plikach:** Input i Textarea zwracają po 29 tokenów, CardHeading — 25. Każda z tych list zawiera `--text-h1`, czyli rozmiar 44 px, choć aktualne implementacje pól i nagłówka karty nie wybierają `FontSize.Display`.

**Przyczyna:** `tokens.ts:218` przechodzi po wszystkich osiągalnych modułach, a `getComponentTokens` skanuje cały ich tekst. Po dojściu do `Text.tsx` zbiera każdą pozycję map rozmiarów i kolorów, niezależnie od propsów faktycznie użytych przez rodzica. Wykluczenie Text z późniejszego rozwiązywania nazw enumów nie wyklucza wcześniejszego skanowania całego pliku. Wynik przestał być pusty, ale nie jest precyzyjną listą użycia.

**Plan:** rozdzielić tokeny faktycznie wybrane w komponencie od potencjalnych tokenów jego zależności. Wspólne bazowe style Field włączać, natomiast warianty Text rozwiązywać na podstawie wybranych propsów. Jeżeli generator ma celowo zwracać nadzbiór, opisać go jako potencjalne zależności i nie prezentować jako dokładnego użycia.

**Odbiór:** pozytywny test tokenów pola oraz negatywny test braku nieużywanego `--text-h1` w sekcji bezpośredniego użycia; `focus-ring` nadal raportuje swój akcent. Nie wracać do duplikowania klas w Input/Textarea.

### N3. P2 — parser nadal może nie zakończyć pracy na niepełnym wejściu

**Potwierdzone wykonaniem:** dwie osobne próby na syntetycznym źródle — niedomknięty JSDoc i niedomknięty obiekt `export const` — zakończyły się limitem wykonania VM po 50 ms. Odpowiednie pętle w `parseTypes.ts:115`, `:125`, `:129` i `:171` nie sprawdzają końca tablicy linii. Limit dodany do nagłówka interfejsu nie zabezpiecza tych pętli.

To luka odporności narzędzia dokumentacji, nie stwierdzenie, że aktualne poprawne źródła zawieszają aplikację. Testy wejścia wykonano z limitem, bez zapisu plików i bez uruchamiania nieograniczonej pętli.

**Plan:** ograniczyć wszystkie pętle długością wejścia i zgłaszać diagnostykę zawierającą źródło/problem. Dodać testy niepełnych wejść i wieloliniowych deklaracji. Plan generowania danych podczas builda pozostaje zasadny: komentarz nadal sugeruje przetwarzanie build-time, lecz `Object.values(sources).forEach(parse)` wykonuje się podczas uruchomienia modułu w aplikacji docs.

**Odbiór:** niepełny komentarz, enum i interfejs zwracają kontrolowany błąd albo wynik częściowy zgodnie z kontraktem. Rozwiązanie nie może zależeć od zewnętrznego timeoutu testu.

### N4. P2 — częściowo otwarty punkt B/R3: konkurencja operacji reorder

**Stan z kodu:** Escape działa, cleanup anuluje animacje. Nadal jednak `onKeyDown` może wykonać Alt+Shift+strzałkę podczas aktywnego przeciągania: zmienia kolejność w stanie, a trwający drag przechowuje poprzednie `current.order`. Późniejszy drop może nadpisać zmianę klawiaturą. Zmiana zestawu zakładek przez Reacta też nie anuluje gestu i nie odświeża jego mapy elementów.

Ponadto `cancelAll()` jest wywoływane przy demontażu, ale nie w `endDrag(false)`; anulowanie przywraca flex order, pozostawiając animacje sąsiadów rozpoczęte dla poprzedniego układu. Ryzyko wizualnego skoku wymaga próby w przeglądarce, nie zostało tutaj odtworzone.

**Plan:** ustalić jedną aktywną operację reorder — anulować gest przed operacją klawiaturą albo zablokować tę operację do końca gestu. Anulować/ponownie rozpocząć pomiary po zmianie zbioru elementów. Ujednolicić sprzątanie animacji przy cancel i unmount, zachowując osobno animację poprawnego drop.

**Odbiór:** drag + Alt+Shift+strzałka, drag + zamknięcie zakładki, Escape w trakcie animacji sąsiadów, utrata capture i demontaż; brak nadpisania zatwierdzonej kolejności i pozostawionych stylów. Dwukrotne `layoutLeft` nadal należy do pomiarów wydajności, nie do bezwarunkowego przepisywania animacji.

### Pozostałe otwarte elementy obecnego etapu

- **G:** czat nadal przechowuje wszystkie wiadomości bez limitu. Zaplanować limit historii i zachowanie szkicu; do tego nie jest potrzebne nowe API.
- **F:** testy przewodnika powinny objąć ukryte/wyłączone kontrolki. Obecny selektor nie filtruje widoczności, a dla fokusu poza kartą `index === -1` i Shift+Tab wybiera przedostatni element zamiast ostatniego. To przypadki brzegowe komponentu, nie dowód awarii obecnych kroków przewodnika.
- **H/I:** uzupełnione 23.09.2026 o trace i React Profiler API w wersji deweloperskiej — patrz „Uzupełnienie — pomiary H/I i odbiór wizualny" niżej. Obrazy GetStarted celowo poza zakresem (docelowo serwer plików). Podział kodu/kontekstów nadal nieuzasadniony pomiarami — nie wdrażać bez nowych danych.
- **K:** nadal brak skryptu testów i plików test/spec w `src`; lint i TypeScript nie wykrywają N1–N4. Aktualna konfiguracja ESLint nie egzekwuje granic modułów. CI i przełączenie wdrożenia pozostają osobnymi zadaniami.
- **Tailwind:** wspólne abstrakcje są na miejscu. Pozostał odbiór wizualny obu motywów oraz świadome rozstrzygnięcie konfliktów propsów i `className`; nie trzeba eliminować wszystkich wartości arbitralnych.

### Kontrole tego audytu

- `npm run lint`: **OK**, 2 motywy, 78 zmiennych.
- TypeScript dla konfiguracji aplikacji i Vite, `--noEmit --incremental false`: **OK**.
- Generator propsów i tokenów uruchomiony w pamięci na rzeczywistych źródłach z mapami odpowiadającymi nowym wzorcom `import.meta.glob`; wyniki powyżej nie bazują wyłącznie na deklaracjach changeloga.
- Nie uruchamiano builda ani prób przeglądarkowych; nie potwierdzano wizualnie fokusu, animacji, kontrastu ani kosztów renderowania. Nie zmieniano kodu aplikacji, zależności ani konfiguracji.

### Aktualna kolejność realizacji

1. Zamknąć N1 i zabezpieczyć przejścia edytora testami.
2. Dokończyć N4 oraz próby klawiatury/fokusu; testować rzeczywistą interakcję, nie tylko czyste funkcje.
3. Domknąć N2/N3 testami generatorów, bez kolejnej rozbudowy regexów bez określenia obsługiwanego zakresu.
4. Wprowadzić limit czatu, wykonać pomiary H/I i odbiór wizualny Tailwinda; następnie wdrożyć uzasadnione optymalizacje i bramkę CI.
5. **Po przygotowaniu API:** wrócić do A/E — formularza i EN — oraz ich kryteriów odbioru. Ich odroczenie nie blokuje zakończenia punktów 1–4.

W aktualnym etapie za zakończenie uznawać realizację punktów 1–4 i związanych z nimi kontroli. Kryteria formularza, tłumaczeń oraz przełączenia produkcji z wcześniejszych sekcji obowiązują dopiero w odpowiednich późniejszych etapach.

## Uzupełnienie — częściowe pomiary H/I i odbiór wizualny (22.09.2026)

**Korekta wcześniejszego statusu (przed pomiarem z 23.09.2026): H/I były częściowo otwarte.** Poniższe wyniki dotyczą transferu, liczników odczytu layoutu i long tasków w pojedynczej próbie. Nie wykonano wymaganego nagrania Performance trace ani pomiaru React Profilerem; wcześniejsze określenie H/I jako „zmierzone” nie oznacza pełnego odbioru. Brak long tasków nie dowodzi braku kosztownych renderów ani wymuszonego layoutu.

**Zakres uzupełniony pomiarem poniżej:** zapisać Performance trace dla przeciągania zakładek i resize/scroll z aktywnym przewodnikiem oraz czatem; React Profilerem zmierzyć liczbę i czas commitów dla tych interakcji. Dołączyć artefakty, wersję builda, scenariusze i warunki pomiaru. Dopiero wyniki uzasadniają optymalizacje lub zamknięcie I; nie wdrażać podziału kontekstów ani throttlingu na podstawie samych liczników. Optymalizacja obrazów pozostaje poza zakresem.

### Profil przeglądarkowy z 23.09.2026 — wykonany

Artefakty lokalne znajdują się w `artifacts/frontend-profile/` względem korzenia repozytorium (katalog ignorowany przez Git): `tabs-drag.trace.json`, `tour-chat-resize-scroll.trace.json`, odpowiadające im pliki `*.react-profiler.json`, `results.json`, `source-hashes.json`, `tour-chat.png` oraz skrypt odtworzenia `run.mjs`. Trace można wczytać w panelu Performance Chromium. JSON React zawiera dane callbacku `<Profiler onRender>`, nie format eksportu rozszerzenia React DevTools.

Warunki: Windows, headless Edge 153.0.4234.48, Vite development, React 19, bez ograniczania CPU; viewport początkowy 1440×900. Tymczasowy plugin Vite opakował App w React Profiler w pamięci, bez zmiany kodu aplikacji. Osobny serwer na 5013 zamknięto po próbie. Pomiar po rozgrzaniu aplikacji, bez czasu ładowania. Źródła robocze na bazie HEAD `81e17f7c8e8dcb673d65850181d33ef9c6d47e2d`; dokładny manifest hashy w artefaktach. Lockfile SHA256: `2AC166C205690B51D1E2F1FA0B8C2BCF35C887C9995A5A0D8A1CD15F579E546B`.

| Scenariusz                                                                                                       | Commity React | Suma actualDuration | Maks. actualDuration | Layout: liczba / suma / maks. |
| ---------------------------------------------------------------------------------------------------------------- | ------------: | ------------------: | -------------------: | ----------------------------- |
| 5 przeciągnięć pierwszej zakładki na koniec, po 35 ruchów wskaźnika                                              |             5 |             46,6 ms |              10,6 ms | 390 / 66,48 ms / 0,60 ms      |
| 8 zmian szerokości 480–1440 px, czat otwarty, krok 5 przewodnika, wheel i przewijanie kontenerów przez scrollTop |            16 |             11,3 ms |               1,5 ms | 34 / 103,39 ms / 16,02 ms     |

Potwierdzono zmianę kolejności zakładek oraz 11 zdarzeń scroll w przebiegu; screenshot potwierdza aktywny przewodnik i czat. W obu trace nie znaleziono zdarzeń `RunTask` >50 ms; brak błędów `pageerror`. Liczby Layout pochodzą z trace i nie są licznikami wywołań getBoundingClientRect. React actualDuration mierzy render, nie cały koszt commit/layout/paint.

**Wniosek:** brak podstaw do podziału kontekstów lub dodawania throttlingu na podstawie tej próby. Resize osiąga około 16 ms pojedynczego layoutu, więc nie deklarujemy stabilnych 60 FPS. Zamknięto brak rzeczywistych trace i danych React Profilera dla wskazanych scenariuszy. To pojedyncza próba diagnostyczna w dev/headless z narzutem profilowania, nie porównanie przed/po ani certyfikacja wydajności produkcyjnej. Nie badano tu przeciągania uchwytu terminala ani pełnej historii 100 wiadomości. Obrazy nadal poza zakresem.

### Historyczny pomiar z 22.09.2026

Wykonano po zamknięciu G: świeży build w osobnym katalogu (nie nadpisano `build/`), pomiar realnego transferu w przeglądarce, pomiar odczytów layoutu podczas przeciągania zakładki (instrumentacja `getBoundingClientRect` + `PerformanceObserver('longtask')`) i przegląd wizualny w obu motywach (formularz kontaktowy, Button, CardHeading/Gallery, fokus klawiaturą).

**H — wynik:** JS+CSS pierwszego wejścia ok. 428,7 KB raw / 124,0 KB gzip / 106,7 KB brotli — bez zastrzeżeń. Realne odkrycie: mimo `loading="lazy"` wszystkie 8 obrazów GetStarted (2,78 MB) ładuje się przy pierwszym wejściu bez przewijania (zweryfikowane podglądem żądań sieciowych na świeżym buildzie, nie tylko lekturą kodu) — `loading="lazy"` nie odracza tu nic w praktyce.

**Decyzja użytkownika: obrazy GetStarted będą docelowo serwowane z zewnętrznego serwera plików — optymalizacja formatu/rozmiaru w tym repo jest zbędna i nie jest planowana.** Nie wdrażać WebP/AVIF/srcset dla `public/getstarted/*.png` ani `public/projects/portfolio.png` w ramach tego planu; punkt 2 sekcji H (warianty obrazów) jest zamknięty jako nieaktualny, nie jako zaległy.

**I — wynik:** reorder zakładek podczas realnego przeciągania: 9 wywołań `getBoundingClientRect`, 0 long tasków — batching przez `requestAnimationFrame` działa zgodnie z założeniem, nie potwierdzono tu problemu wydajności. `useTourTarget`/`useChatDock` — potwierdzone (w kodzie i zachowaniu w przeglądarce): listenery `scroll`/`resize` nie są ograniczane (brak rAF/debounce), każde zdarzenie wywołuje synchroniczny odczyt layoutu i `setState` 1:1. Pozostaje otwarte jako świadoma zmiana zachowania (opóźniłaby aktualizację podświetlenia przewodnika) — nie wdrożono bez decyzji użytkownika.

**Tailwind — wynik:** formularz, Button (warianty + fokus), CardHeading/Gallery sprawdzone w dark i light — spójne, czytelne, `focus-ring` kontrastowy w obu motywach. Brak błędów w konsoli. Nie znaleziono konfliktów klas wymagających poprawki.

## Archiwum: audyt 2 — stan sprzed kolejnych poprawek

Weryfikacja: 22.09.2026, po zmianach obejmujących design system w wersji `0.27.0`. **Plan został wykonany częściowo; nie spełnia jeszcze kryteriów zakończenia.** Największy postęp dotyczy kontraktów komponentów, kolejności zakładek i porządkowania Tailwinda. Nie ma podstaw do oznaczenia całego refaktoringu jako ukończonego.

**Ta sekcja jest archiwalna. Aktualne statusy, zakres i priorytety podano w sekcji 0 (audyt 3).** Sekcje 1–6 zachowano jako pierwotną analizę. Historyczne opisy problemów i numery linii nie oznaczają, że wszystkie problemy nadal występują.

### Status punktów A–K

| Punkt                | Stan                                         | Dowód i pozostała praca                                                                                                                                                                                                                                                                |
| -------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A — formularz        | Otwarte                                      | `useContactForm.ts` nadal otwiera `mailto:` i ustawia `FORM_SENT`; komunikat nadal deklaruje wysłanie, a brakujące pole jest konwertowane przez `String(...)`. Nie wydzielono transportu.                                                                                              |
| B — zakładki         | Częściowo                                    | `useTabsReorder` korzysta teraz z wizualnego `order`/`transform` i przekazuje zmianę do Reacta. Dodano `reorderMath.ts`, `lostpointercapture` i walidację permutacji w `EditorProvider`; usunięto rzutowanie w `EditorTabs`. Pozostały braki opisane w R3 oraz brak testów interakcji. |
| C — URL i historia   | Otwarte                                      | Inicjalizacja nadal przekierowuje nieznaną trasę na GetStarted; `useUrlSync` nadal używa tej samej synchronizacji niezależnie od źródła zmiany. Nie dodano oddzielnej polityki pustego edytora/nieznanej trasy.                                                                        |
| D — kontrakty HTML   | Wdrożony główny zakres kodu, odbiór niepełny | Button, Link i StatusBarButton mają unie wariantów z natywnymi propsami/ref; Button ma domyślny `type="button"`. Brak testów kontraktów i interakcji; dokumentacja nie nadąża za nowymi typami — R1.                                                                                   |
| E — EN               | Otwarte                                      | `PreferencesProvider` nadal zmienia `html.lang`, a strony korzystają z polskich stałych. Nie znaleziono wdrożenia pełnych tłumaczeń ani wyłączenia niegotowej opcji.                                                                                                                   |
| F — klawiatura       | Częściowo                                    | Shift+Tab i Tab bez dopasowania nie są już przechwytywane w terminalu; zamknięcie zakładki ma `focus-visible:opacity-100`; Guide uwzględnia szerszy zestaw kontrolek. Brakuje prób klawiaturą/czytnikiem, a uchwyt terminala wymaga widocznego fokusu — R4.                            |
| G — czat i konteksty | Otwarte                                      | `useAssistant` nadal dopisuje wszystkie wiadomości bez limitu; nie znaleziono pomiarów uzasadniających dalszy podział kontekstów. Sam brak dodatkowego podziału nie jest błędem.                                                                                                       |
| H — ładowanie        | Otwarte / brak dowodów pomiarowych           | Rejestr stron nadal importuje wszystkie strony synchronicznie; w `public` pozostają PNG. Brak weryfikowalnego porównania wydajności przed/po.                                                                                                                                          |
| I — geometria        | Otwarte                                      | Nowy hook reorder nadal dwukrotnie wywołuje `layoutLeft` w klatce. `useTourTarget` i `useChatDock` zachowują opisane wcześniej ograniczenia. Nie wykonano profilowania.                                                                                                                |
| J — generator docs   | Otwarte, potwierdzone regresje               | Parser nadal działa na surowych źródłach w runtime, bez granic części pętli; nowe typy i Field ujawniły R1/R2.                                                                                                                                                                         |
| K — architektura/CI  | Głównie otwarte                              | Brak skryptu testów, testów w `src`, reguł granic importów i bramki CI dla ClientAppIDE. Build nadal śledzony; .NET/Docker nadal wskazują ClientApp. Pozostaje identyczna gałąź warunku w Menu. README uzupełniono o granice stylowania.                                               |

### Status części Tailwind

| Zalecenie                              | Stan                                                                                                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Wspólna baza Input/Textarea            | Wdrożone: `internal/Field/Field.tsx` i `FIELD_BASE_CLASSES`; oba pola korzystają z jednej definicji.                                                                           |
| Wspólny nagłówek kart                  | Wdrożone: `CardHeading` używany przez Gallery i kartę architektury; dodano eksport, demo i wpis changeloga.                                                                    |
| Powtarzalny promień i czas przejść     | Wdrożone użycia `rounded-xl-plus` i `duration-140`; dodano wspólne deklaracje w `theme/base.css`. Nie potwierdzano stylów wyliczonych w przeglądarce.                          |
| Wspólny fokus                          | Częściowo: dodano `focus-ring` / `focus-ring-tight` i zastosowano w wielu kontrolkach; pozostają wyjątki do sprawdzenia, w tym R4.                                             |
| Granica wygląd/kompozycja              | Zapisana w README i komentarzu Button; nie zastępuje audytu istniejących konfliktów klas.                                                                                      |
| Typografia stron                       | Częściowo: PageIntro używa tokenu dla 36 px, lecz 43/39 px pozostają lokalne. Nie znaleziono pełnej konsolidacji typografii kart ani dowodów uzasadnienia wszystkich wyjątków. |
| Aktualizacja generatora tokenów        | Niewykonana: wspólne klasy Field przestały być widoczne dla generatora — R2.                                                                                                   |
| Porównanie wizualne i stany interakcji | Niepotwierdzone w tej weryfikacji; nie oznaczać jako zakończone na podstawie samego lintowania.                                                                                |

### Ponowne kontrole

- `npm run lint`: **OK**, w tym 2 motywy i 78 zmiennych.
- Sprawdzenie TypeScript dla `tsconfig.app.json` i `tsconfig.node.json` z `--noEmit --incremental false`: **OK**.
- Pierwsze `npm run format:check`: ostrzeżenie wyłącznie dla tego pliku planu, wynikające z wcześniejszego zapisu dokumentu. W ramach aktualizacji sformatowano wyłącznie plan, bez formatowania aplikacji.
- Powtórne `npm run format:check` po sformatowaniu dokumentu: **OK**.
- Uruchomiono istniejące funkcje parsera i generatora tokenów w pamięci Node: TypeScript przetranspilowano bez zapisu, a `import.meta.glob` zastąpiono mapą rzeczywistych plików zgodną z jego wzorcem. Nie zmieniano logiki funkcji. Wyniki R1/R2 są potwierdzone wykonaniem, nie tylko przewidywaniem na podstawie kodu.
- Nie uruchamiano builda nad `build/`, nie instalowano zależności i nie zmieniano źródeł. Nie przeprowadzono przeglądarkowych prób drag/focus, pomiarów FPS ani audytu wizualnego. Pozostałe ryzyka interakcji wymagają tych prób.

### R1. P2 — regresja tabel API po poprawieniu typów

**Potwierdzone wykonaniem:** `getInterface('ButtonProps')`, `getInterface('LinkProps')` i `getInterface('StatusBarButtonProps')` zwracają `undefined`; dla tych nazw dostępny jest jedynie alias unii. `getInterface('ButtonAsButtonProps')` również zwraca `undefined` — parser nie rozpoznaje wieloliniowej deklaracji interfejsu. Wspólne propsy są w nieeksportowanych interfejsach, których parser też nie zbiera.

`src/docs/PropsTable.tsx:109` renderuje tabelę tylko dla rozpoznanego interfejsu z propsami. W efekcie pozostaje opis aliasu, ale giną szczegółowe wiersze API tych komponentów. Poprawa bezpieczeństwa typów aplikacji jest zasadna; należy dopasować do niej dokumentację.

**Plan:** obsłużyć unie, wieloliniowe interfejsy i dziedziczenie lokalnych propsów, najlepiej przez AST podczas generowania danych. Przed większą przebudową zapewnić działającą prezentację obu wariantów i wspólnych propsów. Dodać test wymagający obecności `variant`, `size`, `href` i poprawnego rozróżnienia wariantów Button oraz analogicznych danych Link/StatusBarButton. Samo przemianowanie wpisu w rejestrze nie wystarczy.

### R2. P2 — puste tabele tokenów Input i Textarea

**Potwierdzone wykonaniem:** `getComponentTokens('Input')` i `getComponentTokens('Textarea')` zwracają dokładnie `{ groups: [], dependencies: [] }`, mimo że oba pola nadal używają tokenów kolorów, promienia i typografii.

**Przyczyna:** `src/docs/api/tokens.ts:58` zbiera wyłącznie `components/*/*.tsx`. Wydzielone style są teraz w `internal/Field/Field.consts.ts`, a etykieta w `internal/Field/Field.tsx`. Generator nie rozwiązuje tych importów. Nie rozwija też deklaracji nowych `@utility focus-ring*`, więc przeniesienie klas zmniejsza kompletność dokumentacji innych komponentów.

**Plan:** rozszerzyć analizę na współdzielone moduły i utilities z ochroną przed cyklami; oddzielić tokeny bezpośrednie od dziedziczonych przez zależności. Alternatywnie generować jawne metadane, jeśli pełna analiza źródeł byłaby zbyt kosztowna. Nie kopiować klas z powrotem do pól, aby zadowolić parser. Dodać regresyjny test oczekujący m.in. `--color-surface-inset`, `--color-line-emphasis` i `--radius-md` dla Input/Textarea.

### R3. P2 — niepełny cykl życia przeciągania zakładek

**Potwierdzone w kodzie:** komentarz `useTabsReorder.ts:34` deklaruje anulowanie przez Escape, ale `onKeyDown` w linii 181 rozpatruje wyłącznie Alt+Shift+strzałki. Escape nie wywołuje `endDrag(false)`. Cleanup nie anuluje wszystkich animacji utworzonych przez `createTabAnimator`; animator nie udostępnia operacji zbiorczego sprzątania.

**Dodatkowe ryzyko do reprodukcji:** mapa elementów i lista zakładek są pobierane na początku gestu. Hook nie anuluje gestu po usunięciu/przebudowie zakładek przez Reacta w jego trakcie. Walidacja permutacji chroni stan edytora przy zatwierdzeniu, ale nie aktualizuje bieżących pomiarów ani wizualnej kolejności podczas gestu. Nie zaobserwowano awarii w przeglądarce.

**Plan:** wdrożyć rzeczywistą obsługę Escape, jedno miejsce sprzątania gestu i animacji oraz politykę anulowania po zmianie zestawu zakładek. Testować również zdarzenia klawiatury podczas aktywnego drag. Warunek odbioru: anulowany gest nie wywołuje `onReorder`, usuwa style tymczasowe, kończy RAF/animacje i przywraca prawidłowy widok.

### R4. P2 — uchwyt rozmiaru terminala bez widocznego fokusu

**Nowe ustalenie audytu, niekoniecznie nowa regresja:** `src/design-system/components/Terminal/Terminal.tsx` nadaje separatorowi `tabIndex={0}` i obsługuje strzałki, ale jego klasy zawierają `outline-none` i wyłącznie podświetlenie hover, bez stanu focus. Po przejściu Shift+Tab z pola komendy można dotrzeć do uchwytu, którego aktywnego położenia nie widać na podstawie zadeklarowanych stylów.

**Plan:** dodać widoczny fokus właściwy dla uchwytu, nieusuwany przez overflow lub sąsiedni panel; zweryfikować oba motywy. Rozpatrywać łącznie z pierwotnym punktem F. Sprawdzić także selektor Guide: rozszerzono go o kontrolki, lecz nie filtruje elementów ukrytych lub wyłączonych przez nadrzędny kontener — to przypadek testowy przed dalszym rozszerzaniem treści przewodnika.

### R5. P3 — changelog nie opisuje całego aktualnego zakresu design systemu

Wersja `0.27.0` i jej wpis opisują CardHeading oraz Field. Nie opisują obecnych zmian kontraktów Button/Link/StatusBarButton, zachowania Tab i reorder ani nowych wspólnych utilities. **Plan:** przed wydaniem dopisać te zmiany, szczególnie zmiany publicznego API i zachowania. Nie trzeba tworzyć osobnej wersji dla każdego pliku, lecz opis wydania powinien odpowiadać publikowanemu zakresowi.

### Zaktualizowana kolejność dalszych prac

1. Dokończyć istniejące P1: prawdziwy komunikat formularza (A), model URL/historii (C), decyzja o niegotowym EN (E). Nie odkładać ich za kosmetyczne skracanie klas.
2. Zabezpieczyć wykonane refaktoringi testami i usunąć R1/R2/R3; domknąć klawiaturę (F/R4). Nie powtarzać wdrożonych już Field, CardHeading i unii propsów.
3. Ograniczyć historię czatu (G), następnie wykonać pomiary H/I i wdrażać wyłącznie uzasadnione optymalizacje.
4. Dokończyć CI/granice modułów, dokumentację i opis wydania (J/K/R5); przeprowadzić odbiór wizualny Tailwinda oraz sprawdzić konflikty klas.
5. Przełączenie wdrożenia nadal pozostawić osobnym etapem. Pełne zamknięcie planu wymaga kryteriów odbioru z sekcji 5, nie tylko obecności nowych plików i zielonego TypeScript.

## 1. Ocena ogólna — analiza pierwotna

Projekt ma dobre podstawy i nie wymaga przepisania ani rozbudowanej architektury klasowej. Największą wartość przyniesie poprawienie kontraktów komponentów, spójności stanu i zachowań użytkowych, następnie zabezpieczenie ich testami. Sam podział na wiele małych plików nie gwarantuje SOLID.

Warto zachować:

- TypeScript `strict`, `noUncheckedIndexedAccess`, kontrolę nieużywanych symboli i nazwane eksporty.
- Oddzielenie `design-system`, `navigation`, `profile`, kontekstów i stron.
- Podział stanu na edytor, panele i preferencje; `createStrictContext` wykrywający brak providera.
- Typowane rejestry `Record<PageId, ...>`, wymuszające kompletność stron.
- Wydzielone hooki i czyste funkcje, np. filtrowanie technologii i operacje na drzewie nawigacji.
- Tokeny motywów, kontrolę ich zgodności, ESLint z regułami hooków i dostępności.
- Obsługę niedostępnego localStorage, sprzątanie wielu listenerów i observerów, ograniczenie historii terminala.

Główne braki: brak automatycznych testów zachowania tego frontendu, ręczne przestawianie DOM zakładek, nieprecyzyjne typy komponentów polimorficznych oraz funkcje demonstracyjne prezentowane jako ukończone — wysyłka wiadomości i przełączanie języka.

## 2. Weryfikacja i ograniczenia analizy

Wykonano bez zmieniania kodu:

| Kontrola                                                                                  | Wynik                                                               |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `npm run lint`                                                                            | OK; ESLint i kontrola motywów: 2 motywy, 78 zmiennych               |
| `npm run format:check`                                                                    | OK                                                                  |
| `node node_modules/typescript/bin/tsc -p tsconfig.app.json --noEmit --incremental false`  | OK                                                                  |
| `node node_modules/typescript/bin/tsc -p tsconfig.node.json --noEmit --incremental false` | OK                                                                  |
| Przegląd skryptów i plików testowych                                                      | Brak skryptu testów w `package.json`; brak plików test/spec w `src` |
| Przegląd integracji wdrożeniowej                                                          | Projekt .NET i Docker budują nadal `ClientApp`, nie `ClientAppIDE`  |

Nie uruchamiano produkcyjnego builda, aby nie nadpisać istniejących, częściowo śledzonych i już zmienionych plików `build/`. Nie wykonano pomiarów przeglądarkowych, React Profilera, Lighthouse ani testów czytnikiem ekranu. Ryzyka runtime i potencjalne zyski wydajnościowe nie są wynikami takich pomiarów. Nie przeprowadzono audytu bezpieczeństwa zależności ani pełnego audytu backendu.

Analiza obejmuje konfigurację, stan, nawigację, formularz, terminal, czat, przewodnik, reprezentatywne komponenty design systemu, zasoby i generator dokumentacji. Nie jest deklaracją weryfikacji każdej linii projektu.

## 3. Ustalenia i zalecenia

Priorytety: **P1** — poprawność i kontrakty przed publikacją; **P2** — utrzymanie i optymalizacje po zabezpieczeniu zachowań; **P3** — porządki o mniejszym wpływie. „Ryzyko” oznacza wniosek z kodu wymagający reprodukcji, a nie zaobserwowaną awarię.

### A. P1 — formularz potwierdza operację, której nie może potwierdzić

**Dowód:** `src/pages/Contact/hooks/useContactForm/useContactForm.ts:20` ustawia `window.location.href` na `mailto:`, a linia 38 bezwarunkowo ustawia `FORM_SENT`. `Contact.consts.ts:18` mówi, że wiadomość została wysłana. Otwarcie klienta poczty nie potwierdza wysyłki.

**Plan:**

1. Na etapie prototypu zmienić semantykę akcji i komunikatu na przygotowanie wiadomości w kliencie pocztowym.
2. Oddzielić odczyt formularza, walidację danych, przygotowanie wiadomości i transport. Granicą transportu powinna być mała funkcja/kontrakt, bez hierarchii serwisów.
3. Przy integracji z istniejącym API powiadomień rozróżniać `idle`, `submitting`, `accepted`, `error`. Potwierdzać dokładnie to, co gwarantuje odpowiedź API — np. przyjęcie do obsługi, nie dostarczenie e-maila. Obsłużyć błąd sieci, walidację i ograniczenie liczby żądań.
4. Nie zamieniać nieobecnego pola na tekst `"null"` przez `String(data.get(...))`. Rozróżnić brak, tekst i plik. Obecny formularz dostarcza pola, ale hook nie broni swojego kontraktu.
5. Nadać komunikatom sukcesu i błędu odpowiednie warianty wizualne; obecnie oba korzystają z koloru sukcesu.

**Odbiór:** testy pustych/białych znaków, brakującego pola, poprawnego zgłoszenia i błędu transportu; brak fałszywego potwierdzenia wysyłki.

### B. P1 — dwaj właściciele kolejności zakładek

**Dowód:** `src/design-system/components/Tabs/hooks/useTabsReorder/useTabsReorder.ts:67`, `:69`, `:127` przestawiają węzły przez `before`/`after`; dopiero później raportują kolejność do Reacta. `EditorTabs.tsx:15` rzutuje `string[]` na `PageId[]`, a `EditorProvider.tsx:38` przyjmuje kolejność bez walidacji.

**Ryzyko:** stan Reacta i drzewo DOM mogą się rozjechać przy renderze, zamknięciu zakładki lub przerwaniu gestu. Nie odtworzono awarii w przeglądarce. React zaleca unikanie strukturalnego zmieniania DOM, którym sam zarządza: [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs).

**Plan:**

- Ustanowić stan Reacta jako właściciela kolejności; podczas gestu korzystać z transformacji wizualnych, a zmianę kolejności realizować przez stan. Zachować animacje i obsługę klawiatury.
- Wydzielić czyste wyliczanie przesunięcia/kolejności od pomiarów i animacji DOM.
- Zastąpić rzutowanie typowanym kontraktem identyfikatorów lub walidacją na granicy aplikacji.
- Sprawdzać, czy nowa kolejność jest permutacją aktualnie otwartych zakładek: bez duplikatów, nieznanych i brakujących elementów.
- Uzupełnić zakończenie gestu po utracie przechwycenia wskaźnika, sprzątanie stylów i anulowanie wszystkich aktywnych animacji przy demontażu.

**Odbiór:** drag i Alt+Shift+strzałki, zamknięcie/przełączenie podczas gestu, anulowanie, ponowne otwarcie, reduced motion; zgodność DOM ze stanem bez błędów konsoli.

### C. P1 — niespójny model nieznanego adresu i historii

**Dowód:** `EditorProvider.tsx:14` zamienia nieznany adres na GetStarted. `useUrlSync.ts:24` dla tego samego adresu po `popstate` przekazuje `null`, a efekt synchronizacji zamienia go na `/`. Normalizacja końcowego ukośnika może dodatkowo uruchomić `pushState` po nawigacji historią.

**Plan:** rozdzielić jawnie stronę domyślną `/`, pusty edytor i nieznaną trasę. Określić politykę dla ukośników, parametrów i hash. Rozróżnić źródło zmiany: akcja użytkownika może dodać wpis, odtworzenie historii nie powinno dodawać nowego wpisu; normalizacja powinna zastępować wpis. Skupić przejścia edytora w czystej funkcji/reducerze i zostawić obsługę History API w adapterze/hooku.

**Odbiór:** bezpośrednie wejście na każdą stronę, `/`, nieznany URL, końcowy ukośnik, odświeżenie, Back/Forward i zamknięcie ostatniej zakładki. Wynik dla nieznanej trasy jest zgodny niezależnie od sposobu wejścia. Nie jest konieczne dodawanie biblioteki routingu dla siedmiu stałych stron.

### D. P1 — kontrakt HTML komponentów Button i Link

**Dowód:** `Button.types.ts:27` i `Link.types.ts` opisują propsy przez `AnchorHTMLAttributes`, również dla wariantu `<button>`. Implementacje wymuszają typ przy renderowaniu przycisku. `Button.tsx:66` nie ustawia domyślnego `type="button"`.

**Skutek:** typ zdarzenia może wskazywać kotwicę, choć rzeczywistym elementem jest przycisk; API nie odzwierciedla wszystkich atrybutów przycisku. Przycisk bez typu umieszczony w formularzu może niezamierzenie wysłać formularz. To ryzyko API — nie stwierdzenie, że obecny formularz wysyła się przypadkowo.

**Plan:** użyć unii wariantów link/przycisk, z właściwymi atrybutami, zdarzeniami i ref dla każdego wariantu; wykluczyć nieobsługiwane kombinacje, np. obietnicę działania `disabled` dla kotwicy. Dodać domyślny typ przycisku, zachowując jawny submit. Analogicznie przejrzeć `StatusBarButton`; ograniczyć wymuszanie typów w `Text` do uzasadnionej, udokumentowanej granicy.

**Odbiór:** sprawdzenie poprawnych i błędnych kombinacji na poziomie typów oraz test interakcji w formularzu. Zachować kompatybilność wywołań albo opisać migrację API design systemu.

### E. P1 — wybór EN nie tłumaczy portfolio

**Dowód:** `PreferencesProvider.tsx:26` zmienia `document.documentElement.lang`. Strony nadal pobierają polskie treści z plików stałych. Przełącznik istnieje w `AppStatusBar`, a przewodnik deklaruje zmianę języka całego portfolio. W `Guide.tsx` część etykiet jest wpisana bezpośrednio w JSX.

**Plan:** na czas prototypu nie deklarować obsługi niegotowego języka. Docelowo rozdzielić tłumaczenia interfejsu od treści profilu pobieranej z API. Wprowadzić typowany słownik PL/EN i jawny fallback; design system otrzymuje etykiety przez propsy z sensownymi wartościami domyślnymi. `html.lang` musi odpowiadać rzeczywistej treści.

**Odbiór:** obie wersje obejmują strony, nawigację, formularz, komunikaty, przewodnik i nazwy dostępności; test kompletności kluczy. Nie trzeba instalować rozbudowanego frameworka i18n przed określeniem potrzeb.

### F. P1 — klawiatura wymaga osobnej kontroli zachowania

**Dowód:** `useCommandInput.ts:69` przechwytuje każdy Tab, także Shift+Tab i brak dopasowań. Escape zamyka terminal, więc nie jest to dowód całkowitego braku wyjścia, lecz standardowe przechodzenie fokusem jest blokowane. `Tabs.tsx:57` ukrywa zamknięcie nieaktywnej zakładki przez `opacity-0`, pokazując je tylko na hover.

**Plan:** zapewnić przewidywalne wyjście z terminala klawiaturą, w szczególności Shift+Tab; udokumentować skrót autouzupełniania. Pokazywać zamknięcie zakładki również na fokusie. Sprawdzić wybór wzorca nawigacji dla zakładek — jeśli stosowane będą role tabs, wdrożyć cały kontrakt, nie same role. W przewodniku uwzględnić wszystkie dozwolone elementy fokusowalne; aktualna pułapka fokusu wyszukuje wyłącznie przyciski.

**Odbiór:** pełny przebieg bez myszy, widoczny fokus, powrót fokusu po zamknięciu nakładek, test czytnikiem ekranu. Zielony jsx-a11y nie zastępuje tych prób.

### G. P2 — nieograniczona historia czatu i subskrypcje kontekstu

**Dowód:** `useAssistant.ts:34` stale dopisuje wiadomości; `Chat.tsx:118` renderuje całą historię. `Assistant.tsx` utrzymuje czat zamontowany również po ukryciu. Terminal już ma limit historii. `Shell` odczytuje jedynie `explorerOpen`, ale subskrybuje cały `PanelsContext`.

**Plan:** ograniczyć liczbę przechowywanych wiadomości i określić zachowanie po osiągnięciu limitu. Rozważyć montowanie czatu dopiero po pierwszym otwarciu, zachowując później szkic. Zmierzyć rendery przy przełączaniu paneli i zakładek; dopiero wtedy rozdzielać stan od akcji lub mniejsze konteksty. `useMemo` wartości providera nie izoluje konsumentów od zmiany dowolnego pola tej wartości: [useContext](https://react.dev/reference/react/useContext).

**Odbiór:** seria np. 500 pytań nie powoduje nieograniczonego wzrostu DOM; szkic pozostaje po ponownym otwarciu. Pomiar Profilerem dokumentuje ewentualne korzyści podziału kontekstów. Nie dodawać Redux/Zustand ani wirtualizacji bez potrzeby.

### H. P2 — koszt zasobów i początkowego ładowania

**Dowód:** `PageView.consts.tsx` importuje synchronicznie wszystkie siedem stron. Odczytane PNG mają łącznie 3 747 160 bajtów, w tym `public/projects/portfolio.png` 967 157 B i `public/getstarted/terminal.png` 894 133 B. Część obrazów ma już `loading="lazy"`; suma plików nie oznacza transferu przy pierwszym wejściu.

**Plan:**

1. Zmierzyć świeży build w osobnym katalogu: JS/CSS dla pierwszego wejścia, gzip/Brotli, żądania, czas wykonywania JS i największe obrazy. Nie wyciągać wniosków o aktualnym bundlu z istniejącego `build/`, którego zgodności ze źródłami nie potwierdzono.
2. Przygotować zoptymalizowane warianty obrazów, dobrać wymiary i `srcset`; porównać WebP/AVIF z PNG, zachowując czytelność tekstu na zrzutach. Utrzymać rezerwowanie miejsca przez wymiary/aspect ratio.
3. Rozważyć podział kodu na strony i odroczenie czatu/terminala. `lazy` i `Suspense` umożliwiają odroczenie kodu komponentu; potrzebne są też obsługa błędu ładowania i stabilny fallback: [React lazy](https://react.dev/reference/react/lazy).
4. Potwierdzić, że wejście portfolio nie pobiera danych generatora dokumentacji; osobny entry point już istnieje i warto go zachować. Sprawdzić też, czy wspólny CSS nie zawiera niepotrzebnej części demonstracyjnej.
5. Zmierzyć wpływ zewnętrznych fontów; rozważyć ograniczenie wariantów lub lokalne fonty, jeśli wynik uzasadnia zmianę.

**Odbiór:** porównanie przed/po na tych samych warunkach mobilnych; mniejszy transfer bez utraty jakości i bez regresji przełączania stron. Ustalić budżety wydajności po pomiarze bazowym; nie obiecywać procentowej poprawy bez danych.

### I. P2 — pomiary geometrii podczas interakcji

**Dowód:** `useTabsReorder.ts:62` i `:72` wywołują `layoutLeft` w jednej klatce; funkcja zmienia style i odczytuje geometrię. `useTourTarget.ts` tworzy nowy obiekt stanu przy każdym zdarzeniu scroll/resize i wybiera element tylko przy uruchomieniu efektu. `useChatDock.ts` obserwuje rozmiar terminala, ale odczytuje jego pozycję w przewijanej części edytora.

**Plan:** najpierw nagrać Performance trace; ograniczyć przeplatanie zapisów i odczytów layoutu, usunąć zbędne pomiary, grupować aktualizacje w klatce i nie zmieniać stanu przy identycznej geometrii. Sprawdzić ponowne znalezienie celu przewodnika po zmianie responsywności oraz położenie czatu po przewijaniu bez zmiany rozmiaru terminala. Preferować układ CSS lub przekazanie ref nad globalnym wyszukiwaniem, gdy upraszcza to zależności.

**Odbiór:** przewodnik trafia w widoczny element po zmianie rozmiaru, czat pozostaje nad terminalem podczas przewijania, pomiary nie ujawniają zbędnych serii wymuszonego layoutu. To kandydaci do pomiaru, nie potwierdzone problemy FPS.

### J. P2 — generator dokumentacji wykonuje parsowanie w przeglądarce

**Dowód:** `src/docs/api/parseTypes.ts:37` importuje źródła jako raw/eager, a linia 175 parsuje je podczas wykonania modułu. To nie jest generowanie gotowych danych podczas builda, mimo komentarza. Pętle w liniach 86, 96 i 120 nie ograniczają indeksu długością wejścia. Parser zakłada konkretny format TypeScript. `tokens.ts` analogicznie skanuje surowe TSX i CSS.

**Ryzyko:** nowa konstrukcja typów lub formatowanie może dać niepełne dane; brak oczekiwanego terminatora może prowadzić do nieskończonej pętli. Nie znaleziono wejścia wywołującego ją w aktualnych źródłach.

**Plan:** od razu określić limity i diagnostykę parsera oraz testy wieloliniowych typów, komentarzy i końca pliku. Docelowo generować dane dokumentacji podczas builda; dla TypeScript wykorzystać AST dostępnego kompilatora zamiast rozszerzać regexy. Jawnie opisać ograniczenia wykrywania tokenów i dziedziczonych propsów. Zmiana API komponentów z punktu D musi uwzględnić generator dokumentacji.

**Odbiór:** nietypowe wejście kończy się kontrolowanym błędem, a nie zawieszeniem; dokumentacja odpowiada deklaracjom typów; przeglądarka nie musi parsować pełnych źródeł w celu zbudowania tabel API.

### K. P2/P3 — egzekwowanie architektury i higiena repozytorium

**Dowód:** README opisuje kierunek zależności, ale ESLint nie ma reguł granic modułów. Konfiguracja TS jest mocna, natomiast ESLint używa `recommended`, bez reguł wymagających informacji o typach. `build/` zawiera śledzone artefakty; istnieją już lokalne zmiany tych plików. Pipeline i Docker dotyczą starej aplikacji.

**Plan:**

- Dodać kontrolę kierunku importów i cykli: design system nie zależy od aplikacji, nawigacja od widoków, a strony nie importują wnętrza Shell.
- Przed integracją API rozważyć reguły wykrywające nieobsłużone Promise; włączać je z kontrolą kosztu lintowania i uzasadnieniem wyjątków.
- Dodać kontrolę jakości `ClientAppIDE` do CI niezależnie od terminu przełączenia wdrożenia.
- Ustalić politykę artefaktów: preferować build w CI i publikację artefaktu zamiast commitowania wyników. Usuwanie plików już śledzonych zaplanować osobno, nie nadpisywać aktualnych zmian użytkownika.
- Przy przełączeniu wdrożenia zaktualizować `../Portfolio.Web.csproj` i repozytoryjny `Deployment/Docker/Dockerfiles/Portfolio.Web.Dockerfile`; sprawdzić deep linki i powtarzalną instalację z lockfile. Obecne wskazanie `ClientApp` jest etapem migracji, nie automatycznie błędem.
- P3: usunąć zbędne konstrukcje, np. identyczne gałęzie `nested ? 'text-content-secondary' : 'text-content-secondary'` w `Menu.tsx`; ocenić potrzebę nieużywanego aktualnie `@vitejs/plugin-basic-ssl`. Nie rozbijać kolejnych prostych komponentów wyłącznie dla zgodności z szablonem folderu.

## 4. SOLID zastosowane do tego projektu

| Zasada                       | Ocena i zastosowanie                                                                                                                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SRP — jedna odpowiedzialność | Podział warstw jest dobry. Najpierw rozdzielić walidację/transport formularza, przejścia edytora/History API oraz logikę reorder/pomiary/animacje. Nie każda funkcja potrzebuje osobnego pliku.                   |
| OCP — rozszerzalność         | Zachować kompletne rejestry stron i komend. Dodanie strony może wymagać kilku deklaratywnych wpisów — samo to nie narusza OCP. Nie łączyć wszystkich metadanych w moduł importujący całą aplikację.               |
| LSP — zgodność kontraktów    | W React ważniejszy jest rzeczywisty kontrakt propsów i HTML niż dziedziczenie klas. Button/Link muszą mieć typy i zachowanie zgodne z renderowanym elementem.                                                     |
| ISP — małe interfejsy        | Unikać kontraktów pozwalających na niemożliwe kombinacje propsów. Konteksty dzielić dalej tylko wtedy, gdy rozdziela to odpowiedzialność lub mierzalnie ogranicza rendery.                                        |
| DIP — granice zależności     | UI powinno zależeć od małego kontraktu wysyłki/pobierania danych. Adapter API, mailto lub źródło statyczne można podmienić. Nie tworzyć interfejsu dla każdej funkcji i nie wprowadzać kontenera DI bez potrzeby. |

Docelowy kierunek zależności: widoki i Shell korzystają z funkcji aplikacyjnych/kontekstów oraz design systemu; funkcje aplikacyjne korzystają z małych kontraktów danych i transportu; adaptery realizują dostęp do HTTP/przeglądarki. Design system pozostaje niezależny od profilu i tras portfolio.

## 5. Kolejność wdrożenia

Każdy etap powinien stanowić osobną, możliwą do przeglądu zmianę. Zachować wygląd portfolio poza świadomymi poprawkami dostępności i prawdziwości komunikatów.

1. **Zabezpieczenie zachowań:** dodać minimalny zestaw testów nawigacji, zamykania/reorder zakładek, formularza i klawiatury. Testy mają opisywać oczekiwane zachowanie, nie utrwalać błędy. Zapisać pomiar bazowy przed optymalizacją.
2. **Poprawność P1:** formularz, kontrakty Button/Link, stan/URL, kolejność zakładek, obsługa klawiatury i decyzja o dostępności EN. Naprawy reorder skoordynować z modelem edytora; zmianę typów z parserem dokumentacji.
3. **Granice danych:** wydzielić transport formularza i źródło treści; dodać obsługę stanów ładowania i błędów dopiero przy integracji API. Uruchomić kompletne tłumaczenia, jeśli EN pozostaje wymaganiem wydania.
4. **Optymalizacja oparta na danych:** obrazy, podział kodu, limit czatu, geometria interakcji; podział kontekstów tylko po pomiarze. Porównać wyniki z etapem 1.
5. **Dokumentacja i reguły:** zabezpieczyć/generować dokumentację, egzekwować granice importów, dodać CI i ustalić politykę `build/`.
6. **Gotowość do publikacji:** osobne przełączenie .NET/Docker na nowy frontend i próba na środowisku testowym. Sam refaktoring nie powinien automatycznie zmieniać aktywnej aplikacji produkcyjnej.

### Minimalne kryteria zakończenia

- Lint, formatowanie, sprawdzenie typów i świeży build przechodzą w CI.
- Testy obejmują niezmienniki edytora, historię przeglądarki, prawdziwe statusy formularza i kontrakty wspólnych komponentów.
- Próby przeglądarkowe obejmują klawiaturę, drag/cancel, mobile, oba motywy i niedostępny localStorage.
- Zmiana zakładki nie gubi danych, które zgodnie z przyjętą polityką mają pozostać: osobno zdecydować o szkicu formularza i filtrach, ponieważ aktualnie renderowana jest wyłącznie aktywna strona.
- Brak nieograniczonego wzrostu historii czatu; wpływ optymalizacji potwierdzony porównaniem pomiarów.
- Treść komunikatów i wybór języka odpowiadają faktycznie działającym funkcjom.
- Zmiany design systemu mają aktualizację wersji i changeloga zgodnie z README; dokumentacja odzwierciedla zmienione propsy.

Nie rekomenduję masowego dodawania `memo`/`useMemo`, wymiany wszystkich kontekstów na globalny store, klasowych warstw inspirowanych backendem ani mikrooptymalizacji przejścia po siedmiu stronach. Najpierw należy usunąć konkretne niespójności i zabezpieczyć zachowania użytkownika.

## 6. Uzupełnienie — Tailwind, czytelność JSX i odpowiedzialność za styl

### Ocena

**W części komponentów szczegóły stylowania dominują nad strukturą JSX. Warto je uporządkować, ale liczba klas sama w sobie nie jest naruszeniem clean code lub SOLID.** Dłuższe listy są naturalne w komponentach bazowych design systemu; bardziej niepokoi powtarzanie tego samego wyglądu w wielu miejscach oraz omijanie własnej skali projektu.

Pomocniczy odczyt 261 atrybutów zapisanych dosłownie jako `className="..."` w TSX poza `src/docs` wykazał średnio 4,3 klasy i maksimum 15. Ta statystyka **nie obejmuje** list składanych przez tablice, warunki i stałe — m.in. długich zestawów w Input, Button czy Guide. Nie jest więc średnią dla całego renderowanego interfejsu. Pokazuje, że problem jest skupiony w konkretnych miejscach, a nie w każdym elemencie.

Tailwind współdzieli wygenerowane reguły dla używanych utilities; powtórzenie tej samej klasy w stu elementach nie oznacza stu kopii jej reguły CSS. Liczba klas w JSX nie dowodzi problemu wydajności. Nowe unikalne wartości arbitralne i warianty mogą zwiększać wygenerowany CSS. [Dokumentacja utility classes](https://tailwindcss.com/docs/styling-with-utility-classes).

### Konkretne miejsca do uporządkowania

| Miejsce                                                                                                                          | Obserwacja                                                                                                                                                        | Plan                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `design-system/components/Input/Input.tsx` i `Textarea/Textarea.tsx`                                                             | Prawie identyczne reguły tła, obramowania, fontu, placeholdera, fokusu, przejścia i mobilnego rozmiaru tekstu; identyczna struktura etykiety                      | Współdzielić wewnętrzną bazę stylu pola; rozważyć wewnętrzny Field dla etykiety i przyszłego błędu/opisu. Zachować osobne Input i Textarea oraz ich natywne atrybuty.                       |
| `design-system/components/Gallery/Gallery.tsx:48` i `pages/ProjectPortfolio/components/ArchitectureCard/ArchitectureCard.tsx:24` | Identyczny zestaw klas nagłówka panelu i te same propsy typografii                                                                                                | Ocenić rozszerzenie istniejącego wewnętrznego nagłówka/panelu albo wydzielić wspólny nagłówek z właściwą semantyką. Nie zmieniać obu miejsc niezależnie.                                    |
| `pages/PageIntro/PageIntro.tsx`                                                                                                  | Nagłówek używa 43/36/39 px mimo istniejących tokenów typografii; rozmiar wzrasta przy najwęższym progu                                                            | Zweryfikować intencję projektu i nazwać responsywny wariant nagłówka; wzrost może być zamierzony, nie jest automatycznie błędem.                                                            |
| `pages/Projects/components/ProjectCard/ProjectCard.tsx`                                                                          | Wiele lokalnych decyzji o interlinii, odstępach i trackingu obok propsów Text                                                                                     | Wprowadzić powtarzalne warianty typograficzne, np. etykieta/nagłówek/opis karty, jeśli wzorzec występuje też w innych kartach. Układ i odstępy specyficzne dla tej karty zostawić lokalnie. |
| `design-system/theme/base.css` oraz komponenty                                                                                   | Skala promieni istnieje, a `rounded-[9px]` powtarza się w Menu, ChatLauncher i EmptyEditor; `duration-[140ms]` powtarza się w sześciu komponentach design systemu | Ustalić, czy to wspólne decyzje projektowe. Wtedy nadać im token/wspólną definicję; nie zakładać, że wszystkie zbliżone wartości muszą być identyczne.                                      |
| Przyciski i odnośniki na stronach                                                                                                | Powtarzające się ręcznie składane stany focus/hover poza komponentami bazowymi, np. `ArchitectureDiagram.tsx`                                                     | Sprawdzić możliwość wykorzystania IconButton/Link lub wspólnego wzorca fokusu. Nie usuwać stanów dostępności, aby skrócić listę klas.                                                       |
| `Text.tsx`, `Panel.tsx`, `Button.tsx`                                                                                            | Props wariantu i zewnętrzny `className` mogą określać tę samą właściwość                                                                                          | Zdefiniować, które cechy należą do wariantu, a które może rozszerzać użytkownik komponentu; unikać konfliktujących klas.                                                                    |

### Zasady docelowe

1. **Strona odpowiada za kompozycję i układ.** `grid`, `flex`, `gap`, szerokości, marginesy i responsywność zależna od strony mogą zostać w JSX. Nie tworzyć komponentu tylko po to, aby ukryć `flex items-center gap-2`.
2. **Design system odpowiada za powtarzalny wygląd i interakcję.** Kolory powierzchni, obramowania, typografia, focus, hover i disabled wspólnych elementów powinny mieć jedno miejsce utrzymania. Długa lista wewnątrz dobrze zamkniętego komponentu jest akceptowalna.
3. **Wspólny fragment struktury i stylu wydzielać jako komponent.** Jeśli wspólny jest tylko styl różnych elementów, dopuszczalna jest lokalna stała lub mały współdzielony zestaw klas. Samo przeniesienie każdej listy do `*.consts.ts` nie usuwa duplikacji i może utrudnić czytanie.
4. **Złożone dekoracje opisywać w CSS.** Istniejące `bg-dotted-glow` i `bg-stage-glow` w `theme/utilities.css` są dobrym przykładem. Dla rozbudowanego, unikalnego diagramu można rozważyć CSS Module obok komponentu. Tailwind pozwala łączyć utilities z własnym CSS; nie trzeba wszystkiego zapisywać w `className`. [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles).
5. **Wartości arbitralne traktować jako świadome wyjątki.** `grid-cols-[44px_minmax(0,1fr)]`, `rounded-[inherit]` czy proporcja konkretnego zrzutu mogą być uzasadnione. Powtarzalne decyzje typograficzne, odstępy i czasy powinny korzystać ze wspólnej skali. Nie zaokrąglać masowo 18 px do 16 px bez weryfikacji wizualnej; zmiana zapisu z px na utility opartą na rem też nie zawsze jest semantycznie równoważna.
6. **Warianty opisywać jawnie.** Obecne mapy `Record<Variant, ...>` są wystarczające. Biblioteka wariantów nie jest wymagana; warto ją rozważyć dopiero przy rzeczywistym wzroście kombinacji.
7. **Składanie klas nie rozwiązuje konfliktów CSS.** Dopisanie `className` na końcu ani użycie `clsx` nie gwarantuje nadpisania poprzedniej utility; znaczenie ma kaskada wygenerowanego CSS. Preferować props wariantu i brak konfliktu. Jeśli potrzebny będzie mechanizm scalania typu `tailwind-merge`, najpierw zweryfikować zgodność z niestandardowymi utilities i tokenami tego projektu. [Kolejność i konflikty utilities](https://tailwindcss.com/docs/styling-with-utility-classes).
8. **Zachować pełne, statyczne nazwy klas.** Mapy wariantów są prawidłowe; nie zastępować ich konstrukcjami typu `bg-${color}`. Tailwind wykrywa nazwy na podstawie tekstu źródeł. [Detecting classes](https://tailwindcss.com/docs/detecting-classes-in-source-files).
9. **Nie zastępować automatycznie list klas przez `@apply`.** To skraca JSX, ale może jedynie przenieść duplikację i dodać drugi poziom pośredni. Wybierać komponent, token albo CSS na podstawie rodzaju powtarzalności.

### Kolejność i kryteria odbioru

To **P2**, z wyjątkiem konfliktów powodujących błędy zachowania lub niewidoczny fokus — te poprawiać razem z P1.

1. Uzgodnić granicę: wygląd komponentu w design systemie, kompozycja na stronie; zapisać ją w README.
2. Współdzielić bazę Input/Textarea i nagłówków paneli; ujednolicić kontrakt `className`/wariantów.
3. Przejrzeć powtarzalne wartości arbitralne, typografię kart i stany fokusu. Zachować konieczne różnice projektu.
4. Dopiero potem przenosić szczególnie złożone dekoracje do CSS lub porządkować lokalne mapy klas.
5. Porównać zrzuty przed/po w obu motywach, na mobile i desktop oraz przy focus/hover/disabled. Sprawdzić style wyliczone dla konfliktujących wcześniej właściwości.

Sukces oznacza, że wspólna zmiana stylu pola lub nagłówka wymaga edycji jednego miejsca, strony nie kopiują bazowych styli kontrolek, a wygląd i dostępność pozostają zgodne. Nie ustalać arbitralnego limitu klas na element ani celu „o 50% mniej klas”. Jeśli pojawi się nowy CSS lub wspólna stała poza obecnie skanowanymi plikami, trzeba też dostosować generator tokenów w dokumentacji i kontrolę motywów. Aktualizacja design systemu wymaga wersji i changeloga zgodnie z README.
