const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:contact@example.com', icon: 'email' }
];

export const ContactText = {
  HEADER: 'Skontaktuj się ze mną',
  DESCRIPTION: 'Szukasz doświadczonego backend developera? Chętnie porozmawiam o Twoim projekcie!'
};

export const ContactData = SOCIAL_LINKS.map(link => ({
  icon: link.icon,
  title: link.name,
  href: link.url,
  text: link.url.replace('mailto:', '').replace('https://', ''),
  external: !link.url.startsWith('mailto:')
}));
