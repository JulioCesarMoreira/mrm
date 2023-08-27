import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateDetectionDto,
  CreateDetectionResponseDto,
  FetchDetectionsDto,
  FetchDetectionsResponseDto,
  GetDetectionIdDto,
  GetDetectionResponseDto,
  UpdateDetectionDto,
  UpdateDetectionResponseDto,
  DeleteDetectionResponseDto,
} from '@infra/http/dtos/detection';
import { DetectionMapper } from '@infra/http/mappers/detection.mapper';
import {
  CreateDetectionUseCase,
  GetDetectionUseCase,
  FetchDetectionUseCase,
  UpdateDetectionUseCase,
  DeleteDetectionUseCase,
} from '@application/use-cases/detection';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

@Controller('/detection')
export class DetectionController {
  constructor(
    private createDetectionUseCase: CreateDetectionUseCase,
    private getDetectionUsecase: GetDetectionUseCase,
    private fetchDetectionsUseCase: FetchDetectionUseCase,
    private updateDetectionUseCase: UpdateDetectionUseCase,
    private deleteDetectionUseCase: DeleteDetectionUseCase,
  ) {}

  @Post()
  async createDetection(
    @Body() detectionDto: CreateDetectionDto,
  ): Promise<CreateDetectionResponseDto | ErrorResponseDto | ErrorResponseDto> {
    try {
      const createdDetection =
        await this.createDetectionUseCase.createDetection(detectionDto);

      return createdDetection;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getDetection(
    @Param() parameters: GetDetectionIdDto,
  ): Promise<GetDetectionResponseDto | ErrorResponseDto | ErrorResponseDto> {
    try {
      const detectionEntity = await this.getDetectionUsecase.getDetection(
        Number(parameters.id),
      );
      return detectionEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchDetectionByTenant(
    @Body() filters: FetchDetectionsDto,
  ): Promise<FetchDetectionsResponseDto | ErrorResponseDto | ErrorResponseDto> {
    try {
      const fetchDetectionsList =
        await this.fetchDetectionsUseCase.fetchDetection(filters);

      return DetectionMapper.fetchDetectionToController(fetchDetectionsList);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateDetection(
    @Param() parameters: GetDetectionIdDto,
    @Body() body: UpdateDetectionDto,
  ): Promise<UpdateDetectionResponseDto | ErrorResponseDto | ErrorResponseDto> {
    try {
      const updateDetection = await this.updateDetectionUseCase.updateDetection(
        Number(parameters.id),
        body,
      );

      return updateDetection;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteDetection(
    @Param() parameters: GetDetectionIdDto,
  ): Promise<DeleteDetectionResponseDto | ErrorResponseDto> {
    try {
      const deleteDetection = await this.deleteDetectionUseCase.deleteDetection(
        Number(parameters.id),
      );

      return DetectionMapper.deleteDetectionToController(deleteDetection);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
