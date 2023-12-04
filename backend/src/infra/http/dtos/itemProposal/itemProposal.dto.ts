import { IsNotEmpty, IsNumberString, IsOptional, IsInt } from 'class-validator';

export class CreateItemProposalDto {
  @IsNotEmpty()
  @IsInt()
  unitPrice: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  proposalServiceId: number;

  @IsNotEmpty()
  @IsInt()
  itemServiceId: number;
}

export class GetItemProposalIdDto {
  @IsNumberString()
  id: number;
}

export class FetchItemProposalsDto {
  @IsOptional()
  @IsInt()
  unitPrice: number;

  @IsOptional()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsNumberString()
  proposalServiceId: number;

  @IsOptional()
  @IsInt()
  itemServiceId: number;
}

export class UpdateItemProposalDto {
  @IsOptional()
  @IsInt()
  unitPrice: number;

  @IsOptional()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsInt()
  itemServiceId: number;
}
