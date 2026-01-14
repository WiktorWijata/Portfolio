import type { LinkProps } from './Link.types';
import { LinkVariant, linkVariantClasses } from './Link.consts';

export function Link({ 
  children, 
  href, 
  className = '', 
  variant = LinkVariant.NAV,
  ...props 
}: LinkProps) {
  const baseClasses = 'text-gray-400 hover:text-gray-300 transition-colors';

  return (
    <a
      href={href}
      className={`${baseClasses} ${linkVariantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
