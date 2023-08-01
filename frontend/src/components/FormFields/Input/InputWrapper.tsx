import { twMerge } from 'tailwind-merge';
import type { ReactElement, ReactNode } from 'react';

interface InputWrapperProperties {
  children: ReactNode;
  className?: string;
}

export default function InputWrapper({
  children,
  className,
}: InputWrapperProperties): ReactElement {
  return (
    <div className={twMerge('relative flex flex-col justify-end', className)}>
      {children}
    </div>
  );
}
