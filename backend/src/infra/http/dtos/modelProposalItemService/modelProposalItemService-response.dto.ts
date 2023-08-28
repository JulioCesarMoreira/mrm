export class CreateModelProposalItemServiceResponseDto {
  id: number;

  modelProposalId: number;

  itemServiceId: number;
}

export class GetModelProposalItemServiceResponseDto {
  id: number;

  modelProposalId: number;

  itemServiceId: number;
}

export class FetchModelProposalItemServicesResponseDto {
  modelProposalItemServices: {
    id: number;

    modelProposalId: number;

    itemServiceId: number;
  }[];
}

export class DeleteModelProposalItemServiceResponseDto {
  sucess: boolean;
}
