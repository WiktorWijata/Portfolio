export interface CollapsibleProps {
  isOpen: boolean;
  children: React.ReactNode;
  maxHeight?: string;
  minHeight?: string;
  duration?: number;
  className?: string;
}
