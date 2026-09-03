import { Icon, IconSize } from '../Icon';
import { Text, TextAs, TextSize, TextVariant, TextWeight } from '../Text';
import { Alignment } from '../../tokens';
import { useTheme } from '../../themes';
import type { EmptyStateProps } from './EmptyState.types';

/**
 * Generic "there is nothing to show here" placeholder — an icon, a title,
 * an optional description and an optional action (e.g. a retry button).
 * Knows nothing about *why* content is missing (a failed fetch, an empty
 * search result, ...); the caller supplies the copy and icon for its own
 * situation.
 */
export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  const { currentTheme } = useTheme();

  return (
    <div className={`flex flex-col items-center text-center gap-4 max-w-md mx-auto ${className}`}>
      {icon && (
        <Icon name={icon} size={IconSize.XL} color={currentTheme.colors.primary.borderHover} />
      )}
      <Text as={TextAs.H3} size={TextSize.LG} weight={TextWeight.BOLD} align={Alignment.CENTER}>
        {title}
      </Text>
      {description && (
        <Text variant={TextVariant.MUTED} size={TextSize.SM} align={Alignment.CENTER}>
          {description}
        </Text>
      )}
      {action}
    </div>
  );
}
