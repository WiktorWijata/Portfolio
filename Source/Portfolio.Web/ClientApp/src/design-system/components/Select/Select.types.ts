export interface SelectOption<T = string> {
  value: T;
  label: string;
  shortLabel?: string;
}

export interface SelectProps<T = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
