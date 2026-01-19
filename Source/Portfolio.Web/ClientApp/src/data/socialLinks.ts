import { IconName } from '../design-system/components';

export interface SocialLink {
  name: string;
  icon: typeof IconName[keyof typeof IconName];
  href: string;
  text: string;
  external?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    icon: IconName.GITHUB,
    href: 'https://github.com/twoj-profil',
    text: 'github.com/twoj-profil',
    external: true
  },
  {
    name: 'LinkedIn',
    icon: IconName.LINKEDIN,
    href: 'https://linkedin.com/in/twoj-profil',
    text: '/in/twoj-profil',
    external: true
  },
  {
    name: 'Email',
    icon: IconName.EMAIL,
    href: 'mailto:twoj@email.com',
    text: 'twoj@email.com',
    external: false
  }
];
