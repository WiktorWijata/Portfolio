import type { ContainerProps } from './Container.types';

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container mx-auto px-[5%] ${className}`}>
      {children}
    </div>
  );
}
