import Svg from '../Svg/Svg';
import Tooltip from '../Tooltip/Tooltip';
import { useAtomValue } from 'jotai';
import { Link, useLocation } from 'react-router-dom';
import { isSideMenuOpenAtom } from '../../constants/atoms';
import { cn } from '@lib/utils';
import type { ReactElement } from 'react';
import type { SideMenuItemProperties } from './types';

export default function SideMenuItem({
  label,
  svgName,
  route,
}: SideMenuItemProperties): ReactElement {
  const isOpen = useAtomValue(isSideMenuOpenAtom);
  const { pathname } = useLocation();

  const routeIsCurrentPath = route === pathname;

  return (
    <Tooltip
      text={label}
      position="right"
      disabled={isOpen}
      className="translate-x-5"
    >
      <Link
        to={route}
        className={cn(
          'hover:bg-gray-scale-200 group mt-4 flex max-h-[44px] w-full max-w-[160px] items-center gap-6 rounded py-3 px-[7px] duration-200',
          routeIsCurrentPath && '!bg-hidro-blue-300',
        )}
      >
        <Svg
          name={svgName}
          className={cn(
            'h-5 w-5 flex-shrink-0',
            routeIsCurrentPath ? 'fill-white ' : 'fill-gray-scale-500',
          )}
        />
        <p
          className={cn(
            'whitespace-nowrap text-sm font-medium transition-all duration-200',
            isOpen ? 'w-auto opacity-100' : 'pointer-events-none w-0 opacity-0',
            routeIsCurrentPath ? '!text-white' : '!text-gray-scale-700',
          )}
        >
          {label}
        </p>
      </Link>
    </Tooltip>
  );
}
