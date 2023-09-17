export class CreateProposalServiceResponseDto {
  id: number;

  order: number;

  side: 'LEFT' | 'RIGHT';

  proposalId: number;

  categoryServiceId: number;
}

export class GetProposalServiceResponseDto {
  id: number;

  order: number;

  side: 'LEFT' | 'RIGHT';

  proposalId: number;

  categoryServiceId: number;
}

export class FetchProposalServicesResponseDto {
  proposalServices: {
    id: number;

    order: number;

    side: 'LEFT' | 'RIGHT';

    proposalId: number;

    categoryServiceId: number;
  }[];
}

export class DeleteProposalServiceResponseDto {
  sucess: boolean;
}

export class UpdateProposalServiceResponseDto {
  id: number;

  order: number;

  side: 'LEFT' | 'RIGHT';

  proposalId: number;

  categoryServiceId: number;
}
