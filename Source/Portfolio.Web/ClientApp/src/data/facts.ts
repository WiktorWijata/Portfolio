export interface Fact {
  title: string;
  description: string;
  icon: string;
}

export const facts: Fact[] = [
  {
    title: 'Pierwszy program w wieku 12 lat',
    description: 'Moja przygoda z programowaniem rozpoczęła się od prostej gry w Visual Basic. Od tamtej pory kod towarzyszył mi każdego dnia.',
    icon: '🚀'
  },
  {
    title: 'Ponad 100,000 linii kodu',
    description: 'W ciągu kariery napisałem ponad 100 tysięcy linii kodu w C# i TypeScript, rozwiązując problemy od prostych formularzy po złożone systemy enterprise.',
    icon: '💻'
  },
  {
    title: 'Nocny maraton debugowania',
    description: 'Najdłuższa sesja debugowania trwała 14 godzin. Problem? Literówka w nazwie zmiennej środowiskowej. Od tamtej pory zawsze sprawdzam konfigurację jako pierwsze.',
    icon: '🐛'
  },
  {
    title: 'Miłośnik automatyzacji',
    description: 'Jeśli coś robię więcej niż 3 razy, piszę do tego skrypt. Zaoszczędziłem już setki godzin dzięki automatyzacji powtarzalnych zadań.',
    icon: '⚡'
  },
  {
    title: 'Open source contributor',
    description: 'Regularnie contributuję do projektów open source. Uwielbiam dzielić się wiedzą i pomagać społeczności developerskiej.',
    icon: '🌟'
  },
  {
    title: 'Kawa to paliwo',
    description: 'Średnio 4 kawy dziennie. Najlepsza kawa to ta wypita podczas rozwiązywania trudnego problemu o 3 nad ranem.',
    icon: '☕'
  }
];
