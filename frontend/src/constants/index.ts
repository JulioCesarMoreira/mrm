import { nanoid } from 'nanoid';
import type { SideMenuItemProperties } from '../components/SideMenu/types';
import { Option } from 'types';

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

export const categoryColors = [
  '#3A9ED4',
  '#E3C5FF',
  '#F3F5A1',
  '#FFD0CC',
  '#FFD1A1',
];

export const categoryColorNames = new Map([
  [categoryColors[0], 'Azul'],
  [categoryColors[1], 'Roxo'],
  [categoryColors[2], 'Amarelo'],
  [categoryColors[3], 'Vermelho'],
  [categoryColors[4], 'Laranja'],
]);

export const categoryColorOptions: Option[] = categoryColors.map((color) => ({
  name: '',
  value: color,
}));
