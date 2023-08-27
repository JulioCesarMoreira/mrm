export class CreateProposalServiceResponseDto {
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

export class GetProposalServiceResponseDto {
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

export class FetchProposalServicesResponseDto {
  proposalServices: {
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

export class DeleteProposalServiceResponseDto {
  sucess: boolean;
}

export class UpdateProposalServiceResponseDto {
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
