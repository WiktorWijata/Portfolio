import { Link } from '../../../../design-system/components';
import { useTheme } from '../../../../design-system/themes';
import type { NavLinkListProps } from './NavLinkList.types';

export function NavLinkList({ links, onLinkClick, isVertical = false, variant, className = '' }: NavLinkListProps) {
  const { currentTheme } = useTheme();

  return (
    <div className={`flex ${isVertical ? 'flex-col gap-4' : 'gap-8'}`}>
      {links.map((link, index) => (
        isVertical ? (
          <div key={link.href}>
            <Link
              href={link.href}
              onClick={(e) => onLinkClick(e, link.href)}
              variant={variant}
              className={className}
            >
              {link.label}
            </Link>
            {index < links.length - 1 && (
              <div 
                className="h-[1px] mt-4"
                style={{
                  background: `linear-gradient(to right, transparent, ${currentTheme.colors.primary.border}, transparent)`
                }}
              />
            )}
          </div>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => onLinkClick(e, link.href)}
            variant={variant}
            className={className}
          >
            {link.label}
          </Link>
        )
      ))}
    </div>
  );
}