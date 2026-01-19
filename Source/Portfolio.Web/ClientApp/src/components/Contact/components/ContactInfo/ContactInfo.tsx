import { Text, TextAs, TextSize, TextWeight, TextVariant, Alignment } from '../../../../design-system/components';
import { ContactCard } from '../ContactCard';
import type { ContactInfoProps } from './ContactInfo.types';

export function ContactInfo({ header, description, cards }: ContactInfoProps) {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <Text 
          as={TextAs.H3} 
          size={TextSize.LG} 
          weight={TextWeight.BOLD} 
          variant={TextVariant.PRIMARY}
          align={Alignment.CENTER}
          className="mb-4"
        >
          {header}
        </Text>
        <Text 
          variant={TextVariant.MUTED}
          align={Alignment.CENTER}
          className="leading-relaxed"
        >
          {description}
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 [&>*:nth-child(3)]:md:col-span-2 [&>*:nth-child(3)]:md:justify-self-center [&>*:nth-child(3)]:lg:col-span-1 [&>*:nth-child(3)]:lg:justify-self-stretch">
        {cards.map((card, index) => (
          <ContactCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
