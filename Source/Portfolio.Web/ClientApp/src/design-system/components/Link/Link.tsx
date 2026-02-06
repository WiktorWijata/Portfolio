import { useTheme } from '../../themes';
import type { LinkProps } from './Link.types';
import { LinkVariant, linkVariantClasses } from './Link.consts';

export function Link({ 
  children, 
  href, 
  className = '', 
  variant = LinkVariant.NAV,
  ...props 
}: LinkProps) {
  const { currentTheme } = useTheme();

  return (
    <a
      href={href}
      className={`transition-colors ${linkVariantClasses[variant]} ${className}`}
      style={{
        color: currentTheme.colors.text.secondary,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = currentTheme.colors.primary.borderHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = currentTheme.colors.text.secondary;
      }}
      {...props}
    >
      {children}
    </a>
  );
}
