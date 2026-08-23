import type { Contact } from '../../../../api/models';

export interface ContactInfoProps {
  header: string;
  description: string;
  contacts: Contact[];
}
