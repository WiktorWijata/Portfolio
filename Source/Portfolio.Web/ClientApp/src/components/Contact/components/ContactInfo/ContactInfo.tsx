import { Text, TextAs, TextSize, TextWeight, TextVariant, Alignment } from '../../../../design-system/components';
import type { ContactInfoProps } from './ContactInfo.types';

export function ContactInfo({ header, description }: ContactInfoProps) {
  return (
    <div className="mb-12">
      <div className="mb-8">
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
    </div>
  );
}
