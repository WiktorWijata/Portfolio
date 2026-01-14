import { useState, useRef, useEffect } from 'react';
import { colors, radius } from '../../tokens';
import { useButton } from '../../hooks';
import type { SelectProps } from './Select.types';
import { Icon, IconName, IconSize } from '../Icon';

export function Select<T extends string>({ 
  options, 
  value, 
  onChange, 
  placeholder,
  icon,
  className = '',
  disabled = false
}: SelectProps<T>) {
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
    colors,
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
          name={IconName.CHEVRON_DOWN} 
          size={IconSize.XS}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div 
          className={`absolute top-full right-0 mt-2 min-w-[8rem] ${radius.card} backdrop-blur-md overflow-hidden`}
          style={{ 
            border: `1px solid ${colors.neutral.border}`,
            backgroundColor: 'rgba(26, 10, 46, 0.9)',
            zIndex: 50
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-2 transition-all ${
                value === option.value ? 'text-gray-300' : 'text-gray-400 hover:text-gray-300'
              }`}
              style={value === option.value ? { 
                backgroundColor: 'rgba(255, 248, 231, 0.08)',
                border: '1px solid rgba(255, 248, 231, 0.2)'
              } : {}}
              onMouseEnter={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 248, 231, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
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
