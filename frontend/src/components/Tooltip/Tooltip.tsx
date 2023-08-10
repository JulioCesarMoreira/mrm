import Tippy from '@tippyjs/react';
import { twMerge } from 'tailwind-merge';
import { getArrowPosition } from './getArrowPosition';
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
      className={twMerge(
        'break-words rounded-md p-2 text-center text-xs text-white after:border-dark-blue bg-dark-blue shadow-lg after:absolute after:border-4 after:border-solid',
        getArrowPosition(position),
        className,
      )}
    >
      {children}
    </Tippy>
  );
}
