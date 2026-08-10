import type { IconNameType } from '../../../../design-system/components';

export interface SocialLink {
  name: string;
  url: string;
  icon: IconNameType;
}

export interface FooterSocialLinksProps {
  links: SocialLink[];
}
