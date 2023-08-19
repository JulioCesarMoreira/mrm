import {
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsString,
  IsUUID,
  MaxLength,
  IsNumberString,
  IsOptional,
} from 'class-validator';

enum SubCategoryType {
  SUPLIE = 'SUPLIE',
  SERVICE = 'SERVICE',
}

export class CreateCategoryServiceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  name: string;

  @IsEnum(SubCategoryType)
  @IsNotEmpty()
  subCategory: SubCategoryType;

  @IsUUID()
  @IsNotEmpty()
  tenantId: string;
}

export class GetCategoryServiceIdDto {
  @IsNumberString()
  id: number;
}

export class FetchCategoryServicesDto {
  @IsInt()
  @IsOptional()
  @MaxLength(11)
  id?: number;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  name?: string;

  @IsEnum(SubCategoryType)
  @IsOptional()
  subCategory?: SubCategoryType;

  @IsUUID()
  @IsOptional()
  tenantId?: string;
}

export class UpdateCategoryServiceDto {
  @IsEnum(SubCategoryType)
  subCategory?: SubCategoryType;

  @IsString()
  @MaxLength(191)
  name?: string;
}
