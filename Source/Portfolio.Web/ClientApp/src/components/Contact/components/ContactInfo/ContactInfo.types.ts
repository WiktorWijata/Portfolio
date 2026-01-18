import type { ContactCardProps } from '../ContactCard/ContactCard.types';

export interface ContactInfoProps {
  header: string;
  description: string;
  cards: ContactCardProps[];
}
