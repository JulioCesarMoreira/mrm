export class CreateItemProposalResponseDto {
  id: number;

  unitPrice: number;

  quantity: number;

  proposalId: number;

  itemServiceId: number;
}

export class GetItemProposalResponseDto {
  id: number;

  unitPrice: number;

  quantity: number;

  proposalId: number;

  itemServiceId: number;
}

export class FetchItemProposalsResponseDto {
  itemProposals: {
    id: number;

    unitPrice: number;

    quantity: number;

    proposalId: number;

    itemServiceId: number;
  }[];
}

export class DeleteItemProposalResponseDto {
  sucess: boolean;
}

export class UpdateItemProposalResponseDto {
  id: number;

  unitPrice: number;

  quantity: number;

  proposalId: number;

  itemServiceId: number;
}
