import { SOCIAL_LINKS } from '../../data/socialLinks';

export const ContactText = {
  HEADER: 'Skontaktuj się ze mną',
  DESCRIPTION: 'Szukasz doświadczonego backend developera? Chętnie porozmawiam o Twoim projekcie!'
};

export const ContactData = SOCIAL_LINKS.map(link => ({
  ...link,
  title: link.name
}));
