import type { ChangeEvent } from "react";

export interface InputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  className?: string;
}
