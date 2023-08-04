import SideMenuLogo from './SideMenuLogo';
import SideMenuItem from './SideMenuItem';
import SideMenuExpandHandler from './SideMenuExpandHandler';
import { useAtomValue } from 'jotai';
import { sideMenuItems } from '../../constants';
import { isSideMenuOpenAtom } from '../../atoms';
import type { ReactElement } from 'react';

export default function SideMenu(): ReactElement {
  const isOpen = useAtomValue(isSideMenuOpenAtom);

  return (
    <div
      className="bg-dark-blue transition-[width] duration-300 h-screen p-5 relative"
      style={{ width: isOpen ? '200px' : '74px' }}
    >
      <div className="w-full flex-col-center">
        <SideMenuLogo />
        <SideMenuExpandHandler />

        <div className="flex-col-center mt-10 w-full">
          {sideMenuItems.map((item) => (
            <SideMenuItem {...item} />
          ))}
        </div>

        <div
          className="absolute bottom-0 p-5 transition-[width] duration-300"
          style={{ width: isOpen ? '200px' : '74px' }}
        >
          <SideMenuItem
            label="Sair"
            onClickItem={(): void => {}}
            svgName="logout"
          />
        </div>
      </div>
    </div>
  );
}
