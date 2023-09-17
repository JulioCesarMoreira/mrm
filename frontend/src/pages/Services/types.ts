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
