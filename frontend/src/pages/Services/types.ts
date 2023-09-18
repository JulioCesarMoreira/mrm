export interface ServiceProposal {
  id: string;
  sendDate: string;
  installmentsBalance: number;
  periodValidity: string;
  discount: number;
  percentageEntry: number;
  guaranteePeriod: number;
  approved: boolean;
  clientId: string;
}

export interface ServiceFilter {
  clientId?: number;
}

export type directions = 'RIGHT' | 'LEFT';

export interface CategoryItem {
  key: string;
  name: string;
  unity: string;
  unitPrice: string;
  quantity: string;
}

export interface SelectedCategory {
  id: string;
  direction: directions;
  name: string;
  color: string;
  items: CategoryItem[];
}
