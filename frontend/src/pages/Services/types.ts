import { Well } from 'pages/Wells/types';

export interface Service {
  id: string;
  sendDate: string;
  installmentsBalance: number;
  periodValidity: string;
  discount: number;
  percentageEntry: number;
  guaranteePeriod: number;
  approved: boolean;
  clientId: number;
}

export interface ServiceFilter {
  clientId?: number;
}

export type Direction = 'RIGHT' | 'LEFT';

export interface CategoryItem {
  key: string;
  name: string;
  unity: string;
  unitPrice: string;
  quantity: string;
}

export interface SelectedCategory {
  id: string;
  direction: Direction;
  name: string;
  color: string;
  items: CategoryItem[];
}

export interface ProposalService {
  id: number;
  order: number;
  side: Direction;
  categoryServiceId: number;
  proposalId: number;
}

export interface ItemProposal {
  unitPrice: number;
  quantity: number;
  proposalServiceId: number;
  itemServiceId: number;
}

export interface ServiceFields {
  clientId: string;
  discount: string;
  guaranteePeriod: string;
  well: Well;
}

export interface DefaultAttachment {
  name: string;
  url: string;
  key: string;
  file: Blob;
}
