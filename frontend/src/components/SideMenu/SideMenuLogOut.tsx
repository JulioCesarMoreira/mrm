import Svg from '../Svg/Svg';
import Tooltip from '../Tooltip/Tooltip';
import { useAtomValue } from 'jotai';
import { isSideMenuOpenAtom } from '../../constants/atoms';
import { cn } from '@lib/utils';
import type { ReactElement } from 'react';

export default function SideMenuLogOut(): ReactElement {
  const isOpen = useAtomValue(isSideMenuOpenAtom);

  function onLogOut(): void {
    console.log('log out');
  }

  return (
    <Tooltip
      text="Sair"
      position="right"
      disabled={isOpen}
      className="translate-x-5"
    >
      <button
        type="button"
        className="hover:bg-gray-scale-200 group mt-4 flex max-h-[44px] w-full max-w-[160px] items-center gap-6 rounded py-3 px-[7px] duration-200"
        onClick={onLogOut}
      >
        <Svg
          name="logout"
          className="fill-gray-scale-500 h-5 w-5 flex-shrink-0"
        />
        <p
          className={cn(
            'text-gray-scale-700 whitespace-nowrap text-sm font-medium transition-all duration-200',
            isOpen ? 'w-auto opacity-100' : 'pointer-events-none w-0 opacity-0',
          )}
        >
          Sair
        </p>
      </button>
    </Tooltip>
  );
}
