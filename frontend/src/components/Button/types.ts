import { ReactNode } from 'react';

export interface ButtonProperties {
  type: 'button' | 'submit';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
