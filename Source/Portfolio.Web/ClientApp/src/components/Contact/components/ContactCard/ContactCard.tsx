import { Tile, IconButton, Icon, IconSize, Text, TextSize, TextWeight, TextVariant, Link, LinkVariant } from '../../../../design-system/components';
import { IconButtonSize } from '../../../../design-system/components/IconButton/IconButton.consts';
import type { ContactCardProps } from './ContactCard.types';

export function ContactCard({ contact }: ContactCardProps) {
  const displayValue = contact.value?.replace(/^(https?:\/\/)?(www\.)?(mailto:)/i, '') || '';

  return (
    <Tile hover className="flex items-center gap-6 p-4 md:p-6">
      <IconButton size={IconButtonSize.LARGE}>
        <Icon name={contact.type as any} size={IconSize.LG} />
      </IconButton>
      <div>
        <Link 
          href={contact.value || '#'} 
          target={contact.isExternal ? "_blank" : undefined}
          rel={contact.isExternal ? "noopener noreferrer" : undefined}
          variant={LinkVariant.CONTACT}
        >
          <Text 
            size={TextSize.MD} 
            weight={TextWeight.SEMIBOLD} 
            variant={TextVariant.PRIMARY}
            className="mb-1"
          >
            {contact.title}
          </Text>
        </Link>
        <Text 
          size={TextSize.SM} 
          variant={TextVariant.SECONDARY}
        >
          {displayValue}
        </Text>
      </div>
    </Tile>
  );
}
