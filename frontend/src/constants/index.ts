import { nanoid } from 'nanoid';
import type { SideMenuItemProperties } from '../components/SideMenu/types';

export const sideMenuItems: (SideMenuItemProperties & { key: string })[] = [
  {
    key: nanoid(),
    label: 'Serviços',
    svgName: 'services',
    route: '/servicos',
  },
  {
    key: nanoid(),
    label: 'Poços',
    svgName: 'well',
    route: '/pocos',
  },
  {
    key: nanoid(),
    label: 'Itens de serviço',
    svgName: 'service_item',
    route: '/itens-servico',
  },
  {
    key: nanoid(),
    label: 'Clientes',
    svgName: 'customers',
    route: '/clientes',
  },
];
