import { IsNotEmpty, IsNumberString, IsOptional, IsInt } from 'class-validator';

export class CreateProposalServiceDto {
  @IsInt()
  @IsNotEmpty()
  order: number;

  @IsNotEmpty()
  side: 'LEFT' | 'RIGHT';

  @IsInt()
  @IsNotEmpty()
  proposalId: number;

  @IsInt()
  @IsNotEmpty()
  categoryServiceId: number;
}

export class GetProposalServiceIdDto {
  @IsNumberString()
  id: number;
}

export class FetchProposalServicesDto {
  @IsInt()
  @IsOptional()
  order: number;

  @IsOptional()
  side: 'LEFT' | 'RIGHT';

  @IsInt()
  @IsOptional()
  proposalId: number;
}

export class UpdateProposalServiceDto {
  @IsInt()
  @IsOptional()
  order: number;

  @IsOptional()
  side: 'LEFT' | 'RIGHT';
}
