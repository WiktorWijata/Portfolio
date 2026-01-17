import { Icon, IconName, IconSize, IconButton } from '../../../../design-system/components';
import { IconButtonSize } from '../../../../design-system/components/IconButton/IconButton.consts';
import type { MobileMenuToggleProps } from './MobileMenuToggle.types';

export function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  return (
    <IconButton
      onClick={onToggle}
      size={IconButtonSize.MEDIUM}
      className="md:hidden"
    >
      <div
        style={{
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon 
          name={isOpen ? IconName.CLOSE : IconName.MENU} 
          size={IconSize.MD}
        />
      </div>
    </IconButton>
  );
}