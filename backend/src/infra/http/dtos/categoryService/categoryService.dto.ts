import {
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsString,
  IsUUID,
  MaxLength,
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
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class FetchCategoryServicesDto {
  @IsInt()
  id?: number;

  @IsString()
  name?: string;

  @IsEnum(SubCategoryType)
  subCategory?: SubCategoryType;

  @IsUUID()
  tenantId?: string;
}

export class UpdateCategoryServiceDto {
  @IsEnum(SubCategoryType)
  subCategory?: SubCategoryType;

  @IsString()
  @MaxLength(191)
  name?: string;
}
