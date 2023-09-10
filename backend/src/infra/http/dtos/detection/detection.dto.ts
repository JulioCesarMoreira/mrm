import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsInt,
  IsNumber,
  Max,
  Min,
} from 'class-validator';

export class CreateDetectionDto {
  @IsInt()
  @IsNotEmpty()
  @Max(10000)
  @Min(0)
  accuracy: number;

  @IsInt()
  @IsNotEmpty()
  @Max(10000)
  @Min(0)
  salinity: number;

  @IsNumber()
  @IsNotEmpty()
  maximumDepth: number;

  @IsNumber()
  @IsNotEmpty()
  minimumDepth: number;

  @IsInt()
  @IsNotEmpty()
  proposalId: number;
}

export class GetDetectionIdDto {
  @IsNumberString()
  id: number;
}

export class FetchDetectionsDto {
  @IsInt()
  @IsOptional()
  @Max(10000)
  @Min(0)
  accuracy: number;

  @IsInt()
  @IsOptional()
  @Max(10000)
  @Min(0)
  salinity: number;

  @IsNumber()
  @IsOptional()
  maximumDepth: number;

  @IsNumber()
  @IsOptional()
  minimumDepth: number;

  @IsInt()
  @IsNotEmpty()
  proposalId: number;
}

export class UpdateDetectionDto {
  @IsInt()
  @IsOptional()
  @Max(10000)
  @Min(0)
  accuracy: number;

  @IsInt()
  @IsOptional()
  @Max(10000)
  @Min(0)
  salinity: number;

  @IsNumber()
  @IsOptional()
  maximumDepth: number;

  @IsNumber()
  @IsOptional()
  minimumDepth: number;
}
