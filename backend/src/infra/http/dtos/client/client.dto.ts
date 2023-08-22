import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Validate,
} from 'class-validator';
import { CpfCnpjValidation } from 'src/utils/documentValidation';

export class CreateClientDto {
  @IsString()
  @IsOptional()
  @MaxLength(191)
  contactName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  contactPhone?: string;

  @IsString()
  @MaxLength(191)
  name: string;

  @Validate(CpfCnpjValidation)
  @IsString()
  @MaxLength(14)
  cpfCnpj: string;

  @IsUUID()
  tenantId: string;
}

export class ClientIdDto {
  @IsNumberString()
  id: number;
}

export class FetchClientsDto {
  @IsString()
  @IsOptional()
  @MaxLength(191)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  contactName: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  contactPhone: string;

  @IsUUID()
  @IsOptional()
  tenantId: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  @MaxLength(191)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  contactName: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  contactPhone: string;
}
