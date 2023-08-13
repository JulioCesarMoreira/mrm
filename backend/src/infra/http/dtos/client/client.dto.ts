import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

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

  @IsUUID()
  tenantId: string;

  @IsString()
  @MaxLength(14)
  cpfCnpj: string;
}

export class ClientIdDto {
  @IsNumberString()
  id: number;
}

export class FetchClientsDto {
  @IsNumber()
  @IsOptional()
  @MaxLength(11)
  id?: number;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  contactName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  contactPhone?: string;

  @IsUUID()
  @IsOptional()
  tenantId?: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  @MaxLength(191)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  contactName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  contactPhone?: string;
}
