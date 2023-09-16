import Tippy from '@tippyjs/react';
import { getArrowPosition } from './getArrowPosition';
import { cn } from '@lib/utils';
import type { ReactElement } from 'react';
import type { TooltipProperties } from './types';
import './tooltip.css';

export default function Tooltip({
  text,
  children,
  position,
  disabled,
  className,
}: TooltipProperties): ReactElement {
  return (
    <Tippy
      content={text}
      delay={300}
      placement={position}
      disabled={disabled}
      hideOnClick
      className={cn(
        'bg-dark-blue break-words rounded-md p-2 text-center text-xs text-white shadow-lg',
        'after:border-dark-blue after:absolute after:border-4 after:border-solid',
        getArrowPosition(position),
        className,
      )}
    >
      {children}
    </Tippy>
  );
}
