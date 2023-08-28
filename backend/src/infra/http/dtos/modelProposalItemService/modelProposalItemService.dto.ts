import { IsNotEmpty, IsNumberString, IsOptional, IsInt } from 'class-validator';

export class CreateModelProposalItemServiceDto {
  @IsNotEmpty()
  @IsInt()
  modelProposalId: number;

  @IsNotEmpty()
  @IsInt()
  itemServiceId: number;
}

export class GetModelProposalItemServiceIdDto {
  @IsNumberString()
  id: number;
}

export class FetchModelProposalItemServicesDto {
  @IsOptional()
  @IsInt()
  modelProposalId: number;

  @IsOptional()
  @IsInt()
  itemServiceId: number;
}
