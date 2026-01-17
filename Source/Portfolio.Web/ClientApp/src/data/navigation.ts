import type { SelectOption } from '../design-system/components';

export interface NavLinkItem {
  href: string;
  label: string;
}

export const navLinks: NavLinkItem[] = [
  { href: '#home', label: 'Start' },
  { href: '#skills', label: 'Umiejętności i technologie' },
  { href: '#projects', label: 'Projekty' },
  { href: '#experience', label: 'Doświadczenie' },
  { href: '#education', label: 'Edukacja i certyfikaty' },
  { href: '#didyouknow', label: 'Ciekawostki' },
  { href: '#contact', label: 'Kontakt' }
];

export const languageOptions: SelectOption<'pl' | 'en'>[] = [
  { value: 'pl', label: 'Polski', shortLabel: 'PL' },
  { value: 'en', label: 'English', shortLabel: 'EN' }
];
