import { useTheme } from '../../themes';
import type { ToggleButtonGroupProps } from './ToggleButtonGroup.types';

export function ToggleButtonGroup<T = string>({
  value,
  onChange,
  options,
  className = '',
}: ToggleButtonGroupProps<T>) {
  const { currentTheme } = useTheme();

  return (
    <div className={`flex flex-wrap gap-2 justify-center lg:inline-flex lg:gap-0 ${className}`} role="group">
      {options.map((option, index) => {
        const isActive = value === option.value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        let borderRadiusDesktop = '';
        if (isFirst && isLast) {
          borderRadiusDesktop = 'lg:rounded-lg';
        } else if (isFirst) {
          borderRadiusDesktop = 'lg:rounded-l-lg lg:rounded-r-none';
        } else if (isLast) {
          borderRadiusDesktop = 'lg:rounded-r-lg lg:rounded-l-none';
        } else {
          borderRadiusDesktop = 'lg:rounded-none';
        }

        return (
          <button
            key={String(option.value)}
            onClick={() => onChange(option.value)}
            className={`px-3 sm:px-4 lg:px-6 py-2 font-medium backdrop-blur-sm transition-all rounded-lg ${borderRadiusDesktop} text-sm sm:text-base ${
              !isLast ? 'lg:-mr-px' : ''
            }`}
            style={{
              border: `1px solid ${isActive ? currentTheme.colors.primary.borderGlow : currentTheme.colors.neutral.border}`,
              backgroundColor: isActive ? currentTheme.colors.primary.bgActive : currentTheme.colors.neutral.bg,
              boxShadow: isActive ? currentTheme.colors.primary.glow : 'none',
              color: isActive ? currentTheme.colors.text.secondary : currentTheme.colors.text.muted,
              position: 'relative',
              zIndex: isActive ? 10 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = currentTheme.colors.text.secondary;
                e.currentTarget.style.zIndex = '5';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = currentTheme.colors.text.muted;
                e.currentTarget.style.zIndex = '1';
              }
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
