# ADR-000X: Generator CV dopasowywany do oferty, zoptymalizowany pod ATS

- **Status:** Proposed (zaparkowane, kierunek zaakceptowany)
- **Data:** 2026-09-23
- **Obszar:** Portfolio / nowy moduł `Resume`

## Kontekst

Portfolio zawiera CV w formie statycznej. Docelowo CV ma być generowane pod konkretną ofertę pracy i przechodzić przez systemy ATS (Workday, Greenhouse, Lever, Taleo, SmartRecruiters, eRecruiter, pracuj.pl) możliwie bez strat.

„Przejście przez ATS" składa się z trzech niezależnych problemów:

1. **Parsowalność.** ATS wyciąga tekst z pliku i mapuje go na pola (kontakt, doświadczenie, daty, skille). W pełni kontrolowalne po naszej stronie.
2. **Dopasowanie słów kluczowych.** Rekruter filtruje/wyszukuje po keywordach albo system liczy ranking. Kontrolowalne w granicach faktycznego doświadczenia.
3. **Pytania eliminacyjne i ocena człowieka.** Poza zasięgiem generatora.

Nie istnieje obiektywna metryka „100% ATS". Narzędzia typu Jobscan dają heurystyczny score, a nie wynik konkretnego systemu.

## Decyzja

Budujemy moduł `Resume` w modular monolicie Portfolio (obok Content / Chat / Notifications) jako pipeline:

1. **Master profile.** Jedno ustrukturyzowane źródło prawdy: doświadczenia, projekty i osiągnięcia jako osobne encje z ID, metrykami i tagami umiejętności, plus taksonomia synonimów (np. `C#` ↔ `.NET`, `MSSQL` ↔ `SQL Server`).
2. **Parsowanie oferty.** Tekst lub URL trafia do LLM ze structured output (JSON): wymagane i mile widziane skille, seniority, język oferty, kluczowe frazy. Warstwę LLM reużywamy z IntegratorAI zamiast wołać providera bezpośrednio.
3. **Matching i gap analysis.** Normalizacja skilli przez taksonomię i wyliczenie pokrycia wymagań. Wynik jest też pokazywany użytkownikowi (czego brakuje).
4. **Tailoring z guardrailem.** LLM wybiera, porządkuje i przeredagowuje osiągnięcia terminologią z oferty. Każde zdanie w wyniku musi wskazywać `sourceId` z master profile. Walidator odrzuca zdania bez źródła i technologie spoza profilu.
5. **Rendering.** DOCX (`DocumentFormat.OpenXml`) i PDF z prawdziwą warstwą tekstową (QuestPDF), z jednego prostego, liniowego szablonu.
6. **Weryfikacja zwrotna.** Wygenerowany plik jest parsowany z powrotem (PdfPig / OpenXML) i sprawdzany automatycznie: czy sekcje i daty się wyciągają, czy kolejność tekstu jest poprawna, jakie jest pokrycie keywordów z oferty. Opcjonalnie drugi test przez komercyjny parser (np. Affinda).

### Reguły szablonu ATS

- Jedna kolumna; bez tabel, text boxów, grafik, ikon i pasków umiejętności.
- Dane kontaktowe w treści dokumentu, nie w nagłówku/stopce.
- Standardowe nagłówki sekcji („Doświadczenie" / „Experience", „Umiejętności" / „Skills", „Wykształcenie" / „Education").
- Spójny format dat (np. `MM.YYYY`).
- Standardowe fonty systemowe.
- Terminologia 1:1 z oferty; akronim + pełna nazwa przy pierwszym wystąpieniu.
- Język CV zgodny z językiem oferty.
- Klauzula RODO na końcu jako zwykły tekst, nie w stopce.
- Wersja „graficzna" CV, jeśli powstanie, jest osobnym szablonem do wysyłki mailem, nie do ATS.

### Czego świadomie nie robimy

- Ukrytego tekstu z keywordami (np. biały tekst) ani keyword stuffingu.
- Dopisywania technologii i doświadczeń, których nie ma w master profile.

## Konsekwencje

**Pozytywne**
- Parsowalność zamknięta testami automatycznymi, realnie na poziomie ~100%.
- Maksymalne uczciwe pokrycie keywordów dla każdej oferty.
- Gap analysis jako produkt uboczny (informacja, czego się douczyć lub co dopisać do profilu).
- Reużycie IntegratorAI jako warstwy LLM.

**Negatywne / koszty**
- Jakość zależy od jakości i otagowania master profile; wymaga początkowego nakładu na wprowadzenie danych.
- Zależność od LLM (koszt, latencja, niedeterministyczność), łagodzona walidatorem źródeł i testami.
- Prosty szablon ATS jest mniej atrakcyjny wizualnie.

**Poza zakresem**
- Pytania eliminacyjne w formularzach ATS i ocena rekrutera.

## Testy

Zestaw testów integracyjnych na fixture'ach z prawdziwymi ofertami (PL i EN), w stylu testów IntegratorAI:
- round-trip parsowania DOCX i PDF (sekcje, daty, kolejność tekstu),
- minimalny próg pokrycia wymaganych keywordów,
- brak zdań bez `sourceId` i brak technologii spoza profilu.

## Otwarte kwestie (do ustalenia przy wznowieniu prac)

- Model domenowy master profile i format taksonomii skilli.
- Kontrakt JSON dla sparsowanej oferty.
- Czy pobieranie oferty z URL jest potrzebne na start, czy wystarczy wklejony tekst.
- Przechowywanie wygenerowanych wersji CV (historia per oferta).
