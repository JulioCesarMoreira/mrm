import { IsNotEmpty, IsNumberString, IsOptional, IsInt } from 'class-validator';

export class CreateItemProposalServiceDto {
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

export class GetItemProposalServiceIdDto {
  @IsNumberString()
  id: number;
}

export class FetchItemProposalServicesDto {
  @IsOptional()
  @IsInt()
  unitPrice: number;

  @IsOptional()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsInt()
  proposalServiceId: number;

  @IsOptional()
  @IsInt()
  itemServiceId: number;
}

export class UpdateItemProposalServiceDto {
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
