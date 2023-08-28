import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class CreateModelProposalDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  name: string;

  @IsNotEmpty()
  @IsUUID()
  tenantId: string;
}

export class GetModelProposalIdDto {
  @IsNumberString()
  id: number;
}

export class FetchModelProposalsDto {
  @IsString()
  @IsOptional()
  @MaxLength(250)
  name: string;

  @IsNotEmpty()
  @IsUUID()
  tenantId: string;
}

export class UpdateModelProposalDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  name: string;
}
