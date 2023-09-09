import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CreateModelItemCategoryDto,
  CreateModelItemCategoryResponseDto,
  FetchModelItemCategorysDto,
  FetchModelItemCategorysResponseDto,
  GetModelItemCategoryIdDto,
  GetModelItemCategoryResponseDto,
  DeleteModelItemCategoryResponseDto,
} from '@infra/http/dtos/modelItemCategory';
import { ModelItemCategoryMapper } from '@infra/http/mappers/modelItemCategory.mapper';
import {
  CreateModelItemCategoryUseCase,
  GetModelItemCategoryUseCase,
  FetchModelItemCategoryUseCase,
  DeleteModelItemCategoryUseCase,
} from '@application/use-cases/modelItemCategory';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

@Controller('/ModelItemCategory')
export class ModelItemCategoryController {
  constructor(
    private createModelItemCategoryUseCase: CreateModelItemCategoryUseCase,
    private getModelItemCategoryUsecase: GetModelItemCategoryUseCase,
    private fetchModelItemCategorysUseCase: FetchModelItemCategoryUseCase,
    private deleteModelItemCategoryUseCase: DeleteModelItemCategoryUseCase,
  ) {}

  @Post()
  async createModelItemCategory(
    @Body() modelItemCategoryDto: CreateModelItemCategoryDto,
  ): Promise<CreateModelItemCategoryResponseDto | ErrorResponseDto> {
    try {
      const createdModelItemCategory =
        await this.createModelItemCategoryUseCase.createModelItemCategory(
          modelItemCategoryDto,
        );

      return createdModelItemCategory;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getModelItemCategory(
    @Param() parameters: GetModelItemCategoryIdDto,
  ): Promise<GetModelItemCategoryResponseDto | ErrorResponseDto> {
    try {
      const ModelItemCategoryEntity =
        await this.getModelItemCategoryUsecase.getModelItemCategory(
          Number(parameters.id),
        );
      return ModelItemCategoryEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchModelItemCategory(
    @Body() filters: FetchModelItemCategorysDto,
  ): Promise<FetchModelItemCategorysResponseDto | ErrorResponseDto> {
    try {
      const fetchModelItemCategorysList =
        await this.fetchModelItemCategorysUseCase.fetchModelItemCategory(
          filters,
        );

      return ModelItemCategoryMapper.fetchModelItemCategoryToController(
        fetchModelItemCategorysList,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteModelItemCategory(
    @Param() parameters: GetModelItemCategoryIdDto,
  ): Promise<DeleteModelItemCategoryResponseDto | ErrorResponseDto> {
    try {
      const deleteModelItemCategory =
        await this.deleteModelItemCategoryUseCase.deleteModelItemCategory(
          Number(parameters.id),
        );

      return ModelItemCategoryMapper.deleteModelItemCategoryToController(
        deleteModelItemCategory,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
