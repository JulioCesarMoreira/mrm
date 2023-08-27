import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsInt,
  IsNumber,
  Max,
} from 'class-validator';

export class CreateDetectionDto {
  @IsInt()
  @IsNotEmpty()
  @Max(10000)
  accuracy: number;

  @IsInt()
  @IsNotEmpty()
  @Max(10000)
  sality: number;

  @IsNumber()
  @IsNotEmpty()
  maximumDepth: number;

  @IsNumber()
  @IsNotEmpty()
  minimumDepth: number;

  @IsInt()
  @IsNotEmpty()
  proposalServiceId: number;
}

export class GetDetectionIdDto {
  @IsNumberString()
  id: number;
}

export class FetchDetectionsDto {
  @IsInt()
  @IsOptional()
  @Max(10000)
  accuracy: number;

  @IsInt()
  @IsOptional()
  @Max(10000)
  sality: number;

  @IsNumber()
  @IsOptional()
  maximumDepth: number;

  @IsNumber()
  @IsOptional()
  minimumDepth: number;

  @IsInt()
  @IsNotEmpty()
  proposalServiceId: number;
}

export class UpdateDetectionDto {
  @IsInt()
  @IsOptional()
  @Max(10000)
  accuracy: number;

  @IsInt()
  @IsOptional()
  @Max(10000)
  sality: number;

  @IsNumber()
  @IsOptional()
  maximumDepth: number;

  @IsNumber()
  @IsOptional()
  minimumDepth: number;
}
