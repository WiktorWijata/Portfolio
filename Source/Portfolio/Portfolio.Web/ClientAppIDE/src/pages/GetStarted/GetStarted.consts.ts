import { PageId } from '@/navigation'
import { GuideActionKind, GuideImagePosition, type GuideIntroData, type GuideSectionData } from './GetStarted.types'

export const GUIDE_INDEX_TITLE = 'Szybki przewodnik'
export const GUIDE_INDEX_LABEL = 'Tematy przewodnika'

export const GUIDE_INTRO: GuideIntroData = {
  id: 'gs-welcome',
  indexLabel: 'Wprowadzenie',
  title: 'Zobacz, co Cię tu czeka.',
  text: 'Poznaj moje doświadczenie, projekty i sposób pracy. Wybierz temat, aby dowiedzieć się więcej — poruszanie się po portfolio nie wymaga znajomości programowania.',
  action: { kind: GuideActionKind.OpenPage, page: PageId.Home, label: 'Przejdź do strony o mnie →' },
}

export const GUIDE_SECTIONS: GuideSectionData[] = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    articles: [
      {
        id: 'gs-profile',
        indexLabel: 'O mnie',
        title: 'Od problemu do rozwiązania',
        paragraphs: ['Sprawdź, czym się zajmuję i w jakich obszarach mogę wesprzeć Twój zespół lub projekt.'],
        image: { src: '/getstarted/home.png', alt: 'Zrzut portfolio: home', position: GuideImagePosition.Top },
        action: { kind: GuideActionKind.OpenPage, page: PageId.Home, label: 'Poznaj mnie →' },
      },
      {
        id: 'gs-projects',
        indexLabel: 'Wybrane projekty',
        title: 'Zobacz wybrane projekty',
        paragraphs: ['Własne aplikacje, technologie i decyzje stojące za rozwiązaniami. Każdy projekt ma osobny opis.'],
        image: { src: '/getstarted/projects.png', alt: 'Zrzut portfolio: projects', position: GuideImagePosition.Top },
        action: { kind: GuideActionKind.OpenPage, page: PageId.Projects, label: 'Przeglądaj projekty →' },
      },
      {
        id: 'gs-experience',
        indexLabel: 'Doświadczenie',
        title: 'Doświadczenie w praktyce',
        paragraphs: ['Poznaj mój zakres obowiązków, używane narzędzia i systemy, które rozwijałem zawodowo.'],
        image: {
          src: '/getstarted/experience.png',
          alt: 'Zrzut portfolio: experience',
          position: GuideImagePosition.Top,
        },
        action: { kind: GuideActionKind.OpenPage, page: PageId.Experience, label: 'Zobacz doświadczenie →' },
      },
      {
        id: 'gs-contact',
        indexLabel: 'Kontakt i CV',
        title: 'Porozmawiajmy o współpracy',
        paragraphs: ['Przejdź do formularza kontaktowego, pobierz CV lub odwiedź moje profile.'],
        image: { src: '/getstarted/contact.png', alt: 'Zrzut portfolio: contact', position: GuideImagePosition.Top },
        action: { kind: GuideActionKind.OpenPage, page: PageId.Contact, label: 'Otwórz kontakt →' },
      },
    ],
  },
  {
    id: 'navigation',
    title: 'Nawigacja',
    articles: [
      {
        id: 'gs-explorer',
        indexLabel: 'Explorer i foldery',
        title: 'Wybieraj pliki w explorerze',
        paragraphs: [
          'Kliknięcie nazwy otwiera stronę. Chevron rozwija folder, a nazwa Projects prowadzi do przeglądu realizacji.',
        ],
        image: { src: '/getstarted/explorer.png', alt: 'Zrzut portfolio: explorer', position: GuideImagePosition.Top },
      },
      {
        id: 'gs-tabs',
        indexLabel: 'Zakładki dokumentów',
        title: 'Przełączaj otwarte zakładki',
        paragraphs: [
          'Strony otwierają się w kolejności klikania. Kolejność zakładek zmienisz, przeciągając je na pasku. Zamknij kartę krzyżykiem i wróć do niej później z explorera.',
        ],
        image: { src: '/getstarted/tabs.png', alt: 'Zrzut portfolio: tabs', position: GuideImagePosition.Center },
      },
      {
        id: 'gs-start',
        indexLabel: 'Szybki dostęp',
        title: 'Zacznij od nowa',
        paragraphs: [
          'Po zamknięciu wszystkich kart pojawi się szybki dostęp. Przewodnik otworzysz ponownie jako GetStarted.md.',
        ],
        image: { src: '/getstarted/start.png', alt: 'Zrzut portfolio: start', position: GuideImagePosition.Top },
      },
      {
        id: 'gs-terminal',
        indexLabel: 'Terminal',
        title: 'Odkrywaj portfolio z terminala',
        paragraphs: [
          'Otwórz TERMINAL pod FILES i wpisz `help`, aby poznać komendy. Przejdź do projektów przez `projects`, sprawdź `stack` lub otwórz `contact`.',
          '↑/↓ przegląda historię, Tab podpowiada komendy, a Esc zwija panel. Wysokość zmienisz, przeciągając jego górną krawędź.',
        ],
        image: {
          src: '/getstarted/terminal.png',
          alt: 'Portfolio z otwartym terminalem, komendami i polem wpisywania',
          position: GuideImagePosition.Center,
          centerFrame: true,
        },
        action: { kind: GuideActionKind.OpenTerminal, label: 'Wypróbuj terminal →' },
      },
    ],
  },
]
