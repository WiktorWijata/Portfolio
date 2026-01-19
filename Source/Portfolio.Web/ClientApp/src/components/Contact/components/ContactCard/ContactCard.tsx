import { Tile, IconButton, Icon, IconSize, Text, TextSize, TextWeight, TextVariant, Link, LinkVariant } from '../../../../design-system/components';
import { IconButtonSize } from '../../../../design-system/components/IconButton/IconButton.consts';
import type { ContactCardProps } from './ContactCard.types';

export function ContactCard({ icon, title, href, text, external = false }: ContactCardProps) {
  return (
    <Tile hover className="flex items-center gap-6 p-4 md:p-6">
      <IconButton size={IconButtonSize.LARGE}>
        <Icon name={icon} size={IconSize.LG} />
      </IconButton>
      <div>
        <Text 
          size={TextSize.MD} 
          weight={TextWeight.SEMIBOLD} 
          variant={TextVariant.PRIMARY}
          className="mb-1"
        >
          {title}
        </Text>
        <Link 
          href={href} 
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          variant={LinkVariant.CONTACT}
        >
          {text}
        </Link>
      </div>
    </Tile>
  );
}
