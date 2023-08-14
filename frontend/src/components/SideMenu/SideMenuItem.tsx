import Svg from '../Svg/Svg';
import Tooltip from '../Tooltip/Tooltip';
import { useAtomValue } from 'jotai';
import { Link, useLocation } from 'react-router-dom';
import { isSideMenuOpenAtom } from '../../atoms';
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
          'group w-full mt-4 flex items-center hover:bg-gray-scale-200 duration-200 rounded py-3 px-[7px] gap-6 max-w-[160px] max-h-[44px]',
          routeIsCurrentPath && '!bg-hidro-blue-300',
        )}
      >
        <Svg
          name={svgName}
          className={cn(
            'w-5 h-5 flex-shrink-0',
            routeIsCurrentPath ? 'fill-white ' : 'fill-gray-scale-500',
          )}
        />
        <p
          className={cn(
            'transition-all text-sm font-medium duration-200 whitespace-nowrap',
            isOpen ? 'w-auto opacity-100' : 'pointer-events-none opacity-0 w-0',
            routeIsCurrentPath ? '!text-white' : '!text-gray-scale-700',
          )}
        >
          {label}
        </p>
      </Link>
    </Tooltip>
  );
}
