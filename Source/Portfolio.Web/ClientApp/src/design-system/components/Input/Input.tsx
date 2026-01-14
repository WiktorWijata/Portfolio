import type { FocusEvent } from 'react';
import { radius } from '../../tokens';
import { useTheme } from '../../themes';
import type { InputProps } from './Input.types';

export function Input({ 
  id,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  label,
  className = ''
}: InputProps) {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = colors.primary.borderHover;
    e.currentTarget.style.backgroundColor = colors.neutral.bgDarkFocus;
  };
  
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = colors.neutral.border;
    e.currentTarget.style.backgroundColor = colors.neutral.bgDark;
  };
  
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-gray-300 font-semibold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-3 ${radius.input} focus:outline-none transition-all text-gray-300`}
        style={{
          border: `1px solid ${colors.neutral.border}`,
          backgroundColor: colors.neutral.bgDark
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
