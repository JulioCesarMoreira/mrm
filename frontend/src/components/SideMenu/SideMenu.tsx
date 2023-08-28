import SideMenuLogo from './SideMenuLogo';
import SideMenuItem from './SideMenuItem';
import SideMenuExpandHandler from './SideMenuExpandHandler';
import SideMenuLogOut from './SideMenuLogOut';
import { useAtomValue } from 'jotai';
import { sideMenuItems } from '../../constants';
import { isSideMenuOpenAtom } from '../../constants/atoms';
import type { ReactElement } from 'react';

export default function SideMenu(): ReactElement {
  const isOpen = useAtomValue(isSideMenuOpenAtom);

  return (
    <div
      className="bg-dark-blue relative h-screen p-5 transition-[width] duration-300"
      style={{ width: isOpen ? '200px' : '74px' }}
    >
      <div className="flex-col-center w-full">
        <SideMenuLogo />
        <SideMenuExpandHandler />

        <div className="flex-col-center mt-10 w-full">
          {sideMenuItems.map((item) => (
            <SideMenuItem {...item} />
          ))}
        </div>

        <div className="absolute bottom-0 w-full p-5 transition-[width] duration-300">
          <SideMenuLogOut />
        </div>
      </div>
    </div>
  );
}
