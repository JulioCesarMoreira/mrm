import type { TippyProps } from '@tippyjs/react';
import type { ReactElement } from 'react';

export type Position =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export interface TooltipProperties extends TippyProps {
  children: ReactElement;
  text: string;
  position: Position;
  disabled?: boolean;
  className?: string;
}
