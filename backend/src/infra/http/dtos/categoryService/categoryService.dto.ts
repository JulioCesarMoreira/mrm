import {
  CreateCategoryServiceDto as CreateCategoryServiceDtoCore,
  UpdateCategoryServiceDto as UpdateCategoryServiceDtoCore,
  GetCategoryServiceIdDto as GetCategoryServiceIdDtoCore,
  FetchCategoryServicesDto as FetchCategoryServicesDtoCore,
} from '@application/core/dtos/categoryService.dto';
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

export class CreateCategoryServiceDto implements CreateCategoryServiceDtoCore {
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

export class GetCategoryServiceIdDto implements GetCategoryServiceIdDtoCore {
  @IsNumberString()
  id: number;
}

export class FetchCategoryServicesDto implements FetchCategoryServicesDtoCore {
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

export class UpdateCategoryServiceDto implements UpdateCategoryServiceDtoCore {
  @IsEnum(SubCategoryType)
  subCategory?: SubCategoryType;

  @IsString()
  @MaxLength(191)
  name?: string;
}
