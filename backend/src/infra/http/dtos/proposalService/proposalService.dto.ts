import {
  IsNotEmpty,
  IsUUID,
  IsNumberString,
  IsOptional,
  IsDateString,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateProposalServiceDto {
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

export class GetProposalServiceIdDto {
  @IsNumberString()
  id: number;
}

export class FetchProposalServicesDto {
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
  percentageEntry: number;

  @IsInt()
  @IsOptional()
  guaranteePeriod: number;

  @IsBoolean()
  @IsOptional()
  approved: boolean;

  @IsInt()
  @IsOptional()
  clientId: number;

  @IsUUID()
  @IsOptional()
  tenantId: string;
}

export class UpdateProposalServiceDto {
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
  percentageEntry: number;

  @IsInt()
  @IsOptional()
  guaranteePeriod: number;

  @IsBoolean()
  @IsOptional()
  approved: boolean;
}
