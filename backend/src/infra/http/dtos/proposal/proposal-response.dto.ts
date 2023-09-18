export class CreateProposalResponseDto {
  id: number;

  sendDate: Date;

  installmentsBalance: number;

  periodValidity: Date;

  discount: number;

  percentageEntry: number;

  guaranteePeriod: number;

  approved: boolean;

  clientId: number;

  tenantId: string;
}

export class GetProposalResponseDto {
  id: number;

  sendDate: Date;

  installmentsBalance: number;

  periodValidity: Date;

  discount: number;

  percentageEntry: number;

  guaranteePeriod: number;

  approved: boolean;

  clientId: number;

  tenantId: string;
}

export class FetchProposalsResponseDto {
  proposals: {
    id: number;

    sendDate: Date;

    installmentsBalance: number;

    periodValidity: Date;

    discount: number;

    percentageEntry: number;

    guaranteePeriod: number;

    approved: boolean;

    clientId: number;

    tenantId: string;
  }[];
}

export class DeleteProposalResponseDto {
  sucess: boolean;
}

export class UpdateProposalResponseDto {
  id: number;

  sendDate: Date;

  installmentsBalance: number;

  periodValidity: Date;

  discount: number;

  percentageEntry: number;

  guaranteePeriod: number;

  approved: boolean;

  clientId: number;

  tenantId: string;
}

export class FetchItemServicesToProposalResponseDto {
  itemServices: {
    id: number;

    name: string;

    description: string;

    unit: string;

    categoryServiceId: number;
  }[];
}
