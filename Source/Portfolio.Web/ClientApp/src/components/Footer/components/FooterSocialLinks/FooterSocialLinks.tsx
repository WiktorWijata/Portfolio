import { Link, LinkVariant, Icon, IconSize } from '../../../../design-system/components';
import type { FooterSocialLinksProps } from './FooterSocialLinks.types';

export function FooterSocialLinks({ links }: FooterSocialLinksProps) {
  return (
    <div className="flex gap-6">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          variant={LinkVariant.TEXT}
        >
          <Icon name={link.icon} size={IconSize.MD} />
        </Link>
      ))}
    </div>
  );
}
