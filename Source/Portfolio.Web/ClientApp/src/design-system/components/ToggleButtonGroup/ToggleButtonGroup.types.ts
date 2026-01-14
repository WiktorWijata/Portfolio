export interface ToggleButtonGroupOption<T = string> {
  value: T;
  label: string;
}

export interface ToggleButtonGroupProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  options: ToggleButtonGroupOption<T>[];
  className?: string;
}
