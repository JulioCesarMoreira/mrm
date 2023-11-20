import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumberString,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';
import { ColorValidation } from 'src/utils/colorValidation';

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

  @Length(7)
  @Validate(ColorValidation)
  @IsNotEmpty()
  color: string;

  tenantId: string;
}

export class GetCategoryServiceIdDto {
  @IsNumberString()
  id: number;
}

export class FetchCategoryServicesDto {
  @IsString()
  @IsOptional()
  @MaxLength(191)
  name: string;

  @IsEnum(SubCategoryType)
  @IsOptional()
  subCategory: SubCategoryType;

  @Length(7)
  @Validate(ColorValidation)
  @IsOptional()
  color: string;

  tenantId: string;
}

export class UpdateCategoryServiceDto {
  @IsEnum(SubCategoryType)
  @IsOptional()
  subCategory: SubCategoryType;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  name: string;

  @Length(7)
  @Validate(ColorValidation)
  @IsOptional()
  color: string;
}
