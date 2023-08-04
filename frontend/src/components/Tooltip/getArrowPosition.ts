import { Position } from './types';

export function getArrowPosition(position: Position): string {
  switch (position) {
    case 'bottom-end':
      return 'after:bottom-full after:right-[3%] after:-ml-1 after:border-r-transparent after:border-l-transparent after:border-t-transparent';
    case 'bottom-start':
      return 'after:bottom-full after:left-0 after:ml-1 after:border-r-transparent after:border-l-transparent after:border-t-transparent';
    case 'bottom':
      return 'after:bottom-full after:left-1/2 after:-ml-1 after:border-r-transparent after:border-l-transparent after:border-t-transparent';
    case 'left':
      return 'after:left-full after:top-1/2 after:-mt-1 after:border-r-transparent after:border-t-transparent after:border-b-transparent';
    case 'right':
      return 'after:right-full after:top-1/2 after:-mt-1 after:border-t-transparent after:border-l-transparent after:border-b-transparent';
    case 'top-end':
      return 'rounded-br-sm2 after:top-full after:right-0 after:mr-1 after:border-r-transparent after:border-l-transparent after:border-b-transparent';
    case 'top-start':
      return 'rounded-br-sm2 after:top-full after:left-0 after:ml-1 after:border-l-transparent after:border-r-transparent after:border-b-transparent';

    // top position
    default:
      return 'after:top-full after:left-1/2 after:-ml-1 after:border-r-transparent after:border-l-transparent after:border-b-transparent';
  }
}
