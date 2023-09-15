import Svg from '../Svg/Svg';
import { useAtom } from 'jotai';
import { isSideMenuOpenAtom } from '../../constants/atoms';
import { cn } from '@lib/utils';
import Tooltip from '../Tooltip/Tooltip';
import type { ReactElement } from 'react';

export default function SideMenuExpandHandler(): ReactElement {
  const [isOpen, setIsOpen] = useAtom(isSideMenuOpenAtom);

  function onToggleSideMenu(): void {
    setIsOpen((previousOpen) => !previousOpen);
  }

  return (
    <Tooltip
      text="Expandir"
      position="right"
      disabled={isOpen}
      className="translate-x-5"
    >
      <button
        type="button"
        className="hover:bg-gray-scale-200 group mt-12 flex max-h-[44px] w-full max-w-[160px] items-center gap-4 rounded p-3 pl-0 duration-200"
        onClick={onToggleSideMenu}
      >
        <Svg
          name="chevron_right"
          className={cn(
            'fill-gray-scale-500 h-8 w-8 flex-shrink-0 rotate-180 duration-300',
            !isOpen && 'rotate-0',
          )}
        />
        <p
          className={cn(
            'text-gray-scale-700 text-sm font-medium transition-all duration-200',
            isOpen ? 'w-auto opacity-100' : 'pointer-events-none w-0 opacity-0',
          )}
        >
          Retrair
        </p>
      </button>
    </Tooltip>
  );
}
