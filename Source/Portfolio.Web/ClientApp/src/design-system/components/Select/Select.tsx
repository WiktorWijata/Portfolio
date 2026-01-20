import { useState, useRef, useEffect } from 'react';
import { radius } from '../../tokens';
import { useButton } from '../../hooks';
import { useTheme } from '../../themes';
import type { SelectProps } from './Select.types';
import { DropdownPosition } from './Select.consts';
import { Icon, IconName, IconSize } from '../Icon';

export function Select<T extends string>({ 
  options, 
  value, 
  onChange, 
  placeholder,
  icon,
  className = '',
  disabled = false,
  dropdownPosition = DropdownPosition.DOWN
}: SelectProps<T>) {
  const { currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const {
    computedClassName,
    isDisabled,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    style: buttonStyle,
  } = useButton({
    disabled,
    className: `flex items-center gap-2 px-4 py-2 ${radius.button} font-medium transition-all duration-300 ${className}`,
    onClick: handleToggle,
  });

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={computedClassName}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          ...buttonStyle
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {icon}
        {selectedOption?.shortLabel || selectedOption?.label || placeholder || 'Select...'}
        <Icon 
          name={dropdownPosition === DropdownPosition.UP ? IconName.CHEVRON_UP : IconName.CHEVRON_DOWN} 
          size={IconSize.XS}
          className={`transition-transform ${isOpen && dropdownPosition === DropdownPosition.DOWN ? 'rotate-180' : isOpen && dropdownPosition === DropdownPosition.UP ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div 
          className={`absolute ${dropdownPosition === DropdownPosition.UP ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 ${radius.card} backdrop-blur-md overflow-hidden`}
          style={{ 
            border: `1px solid ${currentTheme.colors.neutral.border}`,
            backgroundColor: currentTheme.colors.neutral.bgDark,
            zIndex: 100,
            width: 'fit-content'
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="w-full text-left px-4 py-2 whitespace-nowrap transition-all"
              style={value === option.value ? { 
                backgroundColor: currentTheme.colors.primary.bg,
                border: `1px solid ${currentTheme.colors.primary.border}`,
                color: currentTheme.colors.text.primary
              } : {
                color: currentTheme.colors.text.muted
              }}
              onMouseEnter={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.backgroundColor = currentTheme.colors.primary.bg;
                  e.currentTarget.style.color = currentTheme.colors.text.secondary;
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = currentTheme.colors.text.muted;
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
