import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsInt,
  IsEnum,
  IsString,
  MaxLength,
  IsDateString,
} from 'class-validator';

enum Voltage {
  V110 = 'V110',
  V220 = 'V220',
}

export class CreateWellDto {
  @IsOptional()
  @IsEnum(Voltage)
  voltage: Voltage;

  @IsOptional()
  @IsInt()
  totalDepth: number;

  @IsOptional()
  @IsInt()
  sieveDepth: number;

  @IsOptional()
  @IsInt()
  staticLevel: number;

  @IsOptional()
  @IsInt()
  dynamicLevel: number;

  @IsOptional()
  @IsDateString()
  deliveryDate: Date;

  @IsOptional()
  @IsInt()
  sedimentaryDepth: number;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  distric: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  cep: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  street: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  number: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  longitude: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  latitude: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  mapLink: string;

  @IsNotEmpty()
  @IsInt()
  cityId: number;

  @IsNotEmpty()
  @IsInt()
  proposalServiceId: number;
}

export class GetWellIdDto {
  @IsNumberString()
  id: number;
}

export class FetchWellsDto {
  @IsOptional()
  @IsEnum(Voltage)
  voltage: Voltage;

  @IsOptional()
  @IsInt()
  totalDepth: number;

  @IsOptional()
  deliveryDate: Date;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  cep: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  street: string;

  @IsOptional()
  @IsInt()
  cityId: number;

  @IsOptional()
  @IsInt()
  proposalServiceId: number;
}

export class UpdateWellDto {
  @IsOptional()
  @IsEnum(Voltage)
  voltage: Voltage;

  @IsOptional()
  @IsInt()
  totalDepth: number;

  @IsOptional()
  @IsInt()
  sieveDepth: number;

  @IsOptional()
  @IsInt()
  staticLevel: number;

  @IsOptional()
  @IsInt()
  dynamicLevel: number;

  @IsOptional()
  deliveryDate: Date;

  @IsOptional()
  @IsInt()
  sedimentaryDepth: number;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  distric: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  cep: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  street: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  number: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  longitude: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  latitude: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  mapLink: string;

  @IsOptional()
  @IsInt()
  cityId: number;
}
