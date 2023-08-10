import Svg from '../Svg/Svg';
import { useAtom } from 'jotai';
import { twMerge } from 'tailwind-merge';
import { isSideMenuOpenAtom } from '../../atoms';
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
        className="group w-full mt-12 flex items-center hover:bg-gray-scale-200 gap-4 duration-200 rounded p-3 pl-0 max-w-[160px] max-h-[44px]"
        onClick={onToggleSideMenu}
      >
        <Svg
          name="chevron_right"
          className={twMerge(
            'w-8 h-8 fill-gray-scale-500 duration-300 flex-shrink-0',
            !isOpen && 'rotate-180',
          )}
        />
        <p
          className={twMerge(
            'transition-all text-sm font-medium duration-200 text-gray-scale-700',
            isOpen ? 'w-auto opacity-100' : 'pointer-events-none opacity-0 w-0',
          )}
        >
          Retrair
        </p>
      </button>
    </Tooltip>
  );
}
