import { colors } from '../../tokens';
import type { TextareaProps } from './Textarea.types';

export function Textarea({ 
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  label,
  rows = 5,
  className = ''
}: TextareaProps) {
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = colors.primary.borderHover;
    e.currentTarget.style.backgroundColor = colors.neutral.bgDarkFocus;
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none transition-colors duration-200"
        style={{
          border: `1px solid ${colors.neutral.border}`,
          backgroundColor: colors.neutral.bgDark
        }}
      />
    </div>
  );
}
