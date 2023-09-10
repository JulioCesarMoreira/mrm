import { IsNotEmpty, IsNumberString, IsOptional, IsInt } from 'class-validator';

export class CreateModelItemCategoryDto {
  @IsNotEmpty()
  @IsInt()
  modelProposalId: number;

  @IsNotEmpty()
  @IsInt()
  itemServiceId: number;
}

export class GetModelItemCategoryIdDto {
  @IsNumberString()
  id: number;
}

export class FetchModelItemCategorysDto {
  @IsOptional()
  @IsInt()
  modelProposalId: number;

  @IsOptional()
  @IsInt()
  itemServiceId: number;
}
