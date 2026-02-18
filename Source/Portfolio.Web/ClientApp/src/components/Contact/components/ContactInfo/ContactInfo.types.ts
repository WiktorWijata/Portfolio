import type { ContactDto } from '../../../../api/models';

export interface ContactInfoProps {
  header: string;
  description: string;
  contacts: ContactDto[];
}
