import Svg from '../Svg/Svg';
import Tooltip from '../Tooltip/Tooltip';
import { useAtomValue } from 'jotai';
import { twMerge } from 'tailwind-merge';
import { isSideMenuOpenAtom } from '../../atoms';
import type { ReactElement } from 'react';
import type { SideMenuItemProperties } from './types';

export default function SideMenuItem({
  label,
  svgName,
  className,
  onClickItem,
}: SideMenuItemProperties): ReactElement {
  const isOpen = useAtomValue(isSideMenuOpenAtom);

  return (
    <Tooltip
      text={label}
      position="right"
      disabled={isOpen}
      className="translate-x-5"
    >
      <button
        type="button"
        className={twMerge(
          'group w-full mt-4 flex items-center hover:bg-gray-scale-200 duration-200 rounded py-3 px-[7px] gap-6 max-w-[160px] max-h-[44px]',
          className,
        )}
        onClick={onClickItem}
      >
        <Svg
          name={svgName}
          className="w-5 h-5 fill-gray-scale-500 flex-shrink-0"
        />
        <p
          className={twMerge(
            'transition-all text-sm font-medium duration-200 text-gray-scale-700 whitespace-nowrap',
            isOpen ? 'w-auto opacity-100' : 'pointer-events-none opacity-0 w-0',
          )}
        >
          {label}
        </p>
      </button>
    </Tooltip>
  );
}
