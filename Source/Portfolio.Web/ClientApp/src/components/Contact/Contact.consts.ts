import { IconName } from '../../design-system/components';

export const CONTACT_TEXT = {
  header: 'Skontaktuj się ze mną',
  description: 'Szukasz doświadczonego backend developera? Chętnie porozmawiam o Twoim projekcie!'
};

export const CONTACT_DATA = [
  {
    icon: IconName.GITHUB,
    title: 'GitHub',
    href: 'https://github.com/twoj-profil',
    text: 'github.com/twoj-profil',
    external: true
  },
  {
    icon: IconName.LINKEDIN,
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/twoj-profil',
    text: '/in/twoj-profil',
    external: true
  },
  {
    icon: IconName.EMAIL,
    title: 'Email',
    href: 'mailto:twoj@email.com',
    text: 'twoj@email.com',
    external: false
  }
];
