import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumberString,
  IsOptional,
  IsInt,
} from 'class-validator';

enum Status {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export class CreateItemServiceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description: string;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsInt()
  @IsNotEmpty()
  categoryServiceId: number;
}

export class GetItemServiceIdDto {
  @IsNumberString()
  id: number;
}

export class FetchItemServicesDto {
  @IsString()
  @IsOptional()
  @MaxLength(191)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(3)
  unit: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsNumberString()
  @IsOptional()
  categoryServiceId: number;
}

export class UpdateItemServiceDto {
  @IsString()
  @MaxLength(191)
  @IsOptional()
  name: string;

  @IsString()
  @MaxLength(191)
  @IsOptional()
  description: string;

  @IsString()
  @MaxLength(3)
  @IsOptional()
  unit: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsInt()
  @IsOptional()
  categoryServiceId: number;
}
