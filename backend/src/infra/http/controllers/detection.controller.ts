import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import {
  RequestTenantDataInterface,
  RequestTentantData,
} from 'src/infra/guard/tenantData.decorator';

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
  ): Promise<CreateDetectionResponseDto | ErrorResponseDto> {
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
  ): Promise<GetDetectionResponseDto | ErrorResponseDto> {
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
  async fetchDetection(
    @Query() filters: FetchDetectionsDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<FetchDetectionsResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;

      const fetchDetectionsList =
        await this.fetchDetectionsUseCase.fetchDetection(filters, tenantId);

      return DetectionMapper.fetchDetectionToController(fetchDetectionsList);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateDetection(
    @Param() parameters: GetDetectionIdDto,
    @Body() body: UpdateDetectionDto,
  ): Promise<UpdateDetectionResponseDto | ErrorResponseDto> {
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
