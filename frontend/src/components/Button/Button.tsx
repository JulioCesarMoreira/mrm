import { ReactElement } from 'react';
import { ButtonProperties } from './types';
import { twMerge } from 'tailwind-merge';

export default function Button({
  type,
  children,
  className,
  onClick,
}: ButtonProperties): ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge('rounded-md py-3', className)}
    >
      {children}
    </button>
  );
}
