import type { FocusEvent, ChangeEvent } from 'react';
import { colors, radius } from '../tokens';

interface TextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  rows?: number;
  className?: string;
}

function Textarea({ 
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
  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = colors.primary.borderHover;
    e.currentTarget.style.backgroundColor = colors.neutral.bgDarkFocus;
  };
  
  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
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
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 ${radius.input} focus:outline-none transition-all resize-none text-gray-300`}
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

export default Textarea;
