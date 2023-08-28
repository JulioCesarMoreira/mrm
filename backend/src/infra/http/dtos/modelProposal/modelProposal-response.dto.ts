export class CreateModelProposalResponseDto {
  id: number;

  name: string;

  tenantId: string;
}

export class GetModelProposalResponseDto {
  id: number;

  name: string;

  tenantId: string;
}

export class FetchModelProposalsResponseDto {
  modelProposals: {
    id: number;

    name: string;

    tenantId: string;
  }[];
}

export class DeleteModelProposalResponseDto {
  sucess: boolean;
}

export class UpdateModelProposalResponseDto {
  id: number;

  name: string;

  tenantId: string;
}
