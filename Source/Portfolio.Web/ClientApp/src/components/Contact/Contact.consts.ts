import { SOCIAL_LINKS } from '../../data/socialLinks';

export const CONTACT_TEXT = {
  header: 'Skontaktuj się ze mną',
  description: 'Szukasz doświadczonego backend developera? Chętnie porozmawiam o Twoim projekcie!'
};

export const CONTACT_DATA = SOCIAL_LINKS.map(link => ({
  ...link,
  title: link.name
}));
