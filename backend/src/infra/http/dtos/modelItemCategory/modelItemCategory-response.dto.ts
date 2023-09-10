export class CreateModelItemCategoryResponseDto {
  id: number;

  modelProposalId: number;

  itemServiceId: number;
}

export class GetModelItemCategoryResponseDto {
  id: number;

  modelProposalId: number;

  itemServiceId: number;
}

export class FetchModelItemCategorysResponseDto {
  modelItemCategorys: {
    id: number;

    modelProposalId: number;

    itemServiceId: number;
  }[];
}

export class DeleteModelItemCategoryResponseDto {
  sucess: boolean;
}
