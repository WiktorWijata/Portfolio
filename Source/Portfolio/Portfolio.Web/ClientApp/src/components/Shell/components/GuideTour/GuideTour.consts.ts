import { TourTarget } from '../../Shell.consts'
import { TourStepAction, type TourStep } from './GuideTour.types'

export const TOUR_ACTION_LABELS: Record<TourStepAction, string> = {
  [TourStepAction.SwitchLanguage]: 'Przełącz język / Switch language →',
}

/** Space around the pointed element inside the spotlight (px). */
export const HIGHLIGHT_PADDING = 3

export const TOUR_STEPS: TourStep[] = [
  {
    targets: [TourTarget.Language, TourTarget.StatusBar],
    title: 'Polski albo angielski / Polish or English',
    text: 'Przełącznik języka jest w prawym dolnym rogu, na pasku statusu. Kliknij PL lub EN, aby zmienić język całego portfolio.',
    translation:
      'The language switch sits in the bottom-right corner, on the status bar. Click PL or EN to switch the whole portfolio.',
    action: TourStepAction.SwitchLanguage,
  },
  {
    targets: [TourTarget.Theme, TourTarget.StatusBar],
    title: 'Ciemny albo jasny',
    text: 'Obok przełącznika języka jest przełącznik motywu. Kliknij księżyc lub słońce, aby zmienić wygląd całego portfolio — wybór zostanie zapamiętany.',
  },
  {
    targets: [TourTarget.Explorer, TourTarget.ExplorerRail, TourTarget.ExplorerTitleBar, TourTarget.StatusBar],
    title: 'Wszystko w explorerze',
    text: 'Wybierz plik, aby poznać moje doświadczenie, technologie lub projekty. Kliknięcie nazwy katalogu otwiera jego stronę, a chevron rozwija zawartość.',
  },
  {
    targets: [TourTarget.Tabs, TourTarget.StatusBar],
    title: 'Twoja kolejność zakładek',
    text: 'Każdą stronę możesz otworzyć w zakładce. Przeciągaj zakładki, aby zmienić kolejność, i zamykaj je krzyżykiem. Po zamknięciu wszystkich zobaczysz szybki dostęp.',
  },
  {
    targets: [TourTarget.TerminalRail, TourTarget.TerminalStatus, TourTarget.StatusBar],
    title: 'Portfolio z terminala',
    text: 'Włącz terminal i wpisz help, aby poznać komendy. projects otwiera projekty, a stack pokazuje technologie. Tab podpowiada komendy, ↑ i ↓ przegląda historię.',
  },
  {
    targets: [TourTarget.AssistantRail, TourTarget.AssistantStatus, TourTarget.StatusBar],
    title: 'Zapytaj o moje doświadczenie',
    text: 'Otwórz Asystenta i wybierz pytanie o doświadczenie, technologie lub współpracę. Obecnie czat jest demonstracją z przygotowanymi odpowiedziami — połączenie z AI będzie kolejnym etapem.',
  },
]
