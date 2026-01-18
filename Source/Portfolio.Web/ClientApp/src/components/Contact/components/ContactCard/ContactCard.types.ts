import { IconName } from '../../../../design-system/components';

export interface ContactCardProps {
  icon: IconName;
  title: string;
  href: string;
  text: string;
  external?: boolean;
}
