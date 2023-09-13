import { nanoid } from 'nanoid';
import type { SideMenuItemProperties } from '../components/SideMenu/types';

export const CPF_LIMIT = 15;
export const CLOSE_DIALOG_DURATION = 300;

export const formatPhone = (phone: string): string =>
  phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');

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
