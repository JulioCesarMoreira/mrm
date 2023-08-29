import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CreateModelProposalItemServiceDto,
  CreateModelProposalItemServiceResponseDto,
  FetchModelProposalItemServicesDto,
  FetchModelProposalItemServicesResponseDto,
  GetModelProposalItemServiceIdDto,
  GetModelProposalItemServiceResponseDto,
  DeleteModelProposalItemServiceResponseDto,
} from '@infra/http/dtos/modelProposalItemService';
import { ModelProposalItemServiceMapper } from '@infra/http/mappers/modelProposalItemService.mapper';
import {
  CreateModelProposalItemServiceUseCase,
  GetModelProposalItemServiceUseCase,
  FetchModelProposalItemServiceUseCase,
  DeleteModelProposalItemServiceUseCase,
} from '@application/use-cases/modelProposalItemService';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

@Controller('/modelProposalItemService')
export class ModelProposalItemServiceController {
  constructor(
    private createModelProposalItemServiceUseCase: CreateModelProposalItemServiceUseCase,
    private getModelProposalItemServiceUsecase: GetModelProposalItemServiceUseCase,
    private fetchModelProposalItemServicesUseCase: FetchModelProposalItemServiceUseCase,
    private deleteModelProposalItemServiceUseCase: DeleteModelProposalItemServiceUseCase,
  ) {}

  @Post()
  async createModelProposalItemService(
    @Body() modelProposalItemServiceDto: CreateModelProposalItemServiceDto,
  ): Promise<CreateModelProposalItemServiceResponseDto | ErrorResponseDto> {
    try {
      const createdModelProposalItemService =
        await this.createModelProposalItemServiceUseCase.createModelProposalItemService(
          modelProposalItemServiceDto,
        );

      return createdModelProposalItemService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getModelProposalItemService(
    @Param() parameters: GetModelProposalItemServiceIdDto,
  ): Promise<GetModelProposalItemServiceResponseDto | ErrorResponseDto> {
    try {
      const modelProposalItemServiceEntity =
        await this.getModelProposalItemServiceUsecase.getModelProposalItemService(
          Number(parameters.id),
        );
      return modelProposalItemServiceEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchModelProposalItemService(
    @Body() filters: FetchModelProposalItemServicesDto,
  ): Promise<FetchModelProposalItemServicesResponseDto | ErrorResponseDto> {
    try {
      const fetchModelProposalItemServicesList =
        await this.fetchModelProposalItemServicesUseCase.fetchModelProposalItemService(
          filters,
        );

      return ModelProposalItemServiceMapper.fetchModelProposalItemServiceToController(
        fetchModelProposalItemServicesList,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteModelProposalItemService(
    @Param() parameters: GetModelProposalItemServiceIdDto,
  ): Promise<DeleteModelProposalItemServiceResponseDto | ErrorResponseDto> {
    try {
      const deleteModelProposalItemService =
        await this.deleteModelProposalItemServiceUseCase.deleteModelProposalItemService(
          Number(parameters.id),
        );

      return ModelProposalItemServiceMapper.deleteModelProposalItemServiceToController(
        deleteModelProposalItemService,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
