import type { ChangeEvent } from 'react';

export interface TextareaProps {
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
