export class CreateItemProposalServiceResponseDto {
  id: number;

  unitPrice: number;

  quantity: number;

  proposalServiceId: number;

  itemServiceId: number;
}

export class GetItemProposalServiceResponseDto {
  id: number;

  unitPrice: number;

  quantity: number;

  proposalServiceId: number;

  itemServiceId: number;
}

export class FetchItemProposalServicesResponseDto {
  itemProposalServices: {
    id: number;

    unitPrice: number;

    quantity: number;

    proposalServiceId: number;

    itemServiceId: number;
  }[];
}

export class DeleteItemProposalServiceResponseDto {
  sucess: boolean;
}

export class UpdateItemProposalServiceResponseDto {
  id: number;

  unitPrice: number;

  quantity: number;

  proposalServiceId: number;

  itemServiceId: number;
}
