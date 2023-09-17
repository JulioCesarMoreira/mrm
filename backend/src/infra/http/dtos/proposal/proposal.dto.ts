import {
  IsNotEmpty,
  IsUUID,
  IsNumberString,
  IsOptional,
  IsDateString,
  IsInt,
  IsBoolean,
  Max,
  Min,
} from 'class-validator';

export class CreateProposalDto {
  @IsOptional()
  @IsDateString()
  sendDate: Date;

  @IsOptional()
  @IsInt()
  installmentsBalance: number;

  @IsDateString()
  @IsOptional()
  periodValidity: Date;

  @IsInt()
  @IsOptional()
  discount: number;

  @IsInt()
  @IsOptional()
  @Max(10000)
  @Min(0)
  percentageEntry: number;

  @IsInt()
  @IsOptional()
  guaranteePeriod: number;

  @IsBoolean()
  @IsOptional()
  approved: boolean;

  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @IsUUID()
  @IsNotEmpty()
  tenantId: string;
}

export class GetProposalIdDto {
  @IsNumberString()
  id: number;
}

export class FetchProposalsDto {
  @IsOptional()
  @IsDateString()
  sendDate: Date;

  @IsOptional()
  @IsInt()
  installmentsBalance: number;

  @IsDateString()
  @IsOptional()
  periodValidity: Date;

  @IsInt()
  @IsOptional()
  discount: number;

  @IsInt()
  @IsOptional()
  @Max(10000)
  @Min(0)
  percentageEntry: number;

  @IsInt()
  @IsOptional()
  guaranteePeriod: number;

  @IsBoolean()
  @IsOptional()
  approved: boolean;

  @IsNumberString()
  @IsOptional()
  clientId: number;

  @IsUUID()
  @IsOptional()
  tenantId: string;
}

export class UpdateProposalDto {
  @IsOptional()
  @IsDateString()
  sendDate: Date;

  @IsOptional()
  @IsInt()
  installmentsBalance: number;

  @IsDateString()
  @IsOptional()
  periodValidity: Date;

  @IsInt()
  @IsOptional()
  discount: number;

  @IsInt()
  @IsOptional()
  @Max(10000)
  @Min(0)
  percentageEntry: number;

  @IsInt()
  @IsOptional()
  guaranteePeriod: number;

  @IsBoolean()
  @IsOptional()
  approved: boolean;
}
