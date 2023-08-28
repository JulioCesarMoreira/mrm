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
  CreateCategoryServiceDto,
  CreateCategoryServiceResponseDto,
  FetchCategoryServicesDto,
  FetchCategoryServicesResponseDto,
  GetCategoryServiceIdDto,
  GetCategoryServiceResponseDto,
  UpdateCategoryServiceDto,
  UpdateCategoryServiceResponseDto,
  DeleteCategoryServiceResponseDto,
} from '@infra/http/dtos/categoryService';
import { CategoryServiceMapper } from '@infra/http/mappers/categoryService.mapper';
import {
  CreateCategoryServiceUseCase,
  GetCategoryServiceUseCase,
  FetchCategoryServiceUseCase,
  UpdateCategoryServiceUseCase,
  DeleteCategoryServiceUseCase,
} from '@application/use-cases/categoryService';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

@Controller('/categoryService')
export class CategoryServiceController {
  constructor(
    private createCategoryServiceUseCase: CreateCategoryServiceUseCase,
    private getCategoryServiceUsecase: GetCategoryServiceUseCase,
    private fetchCategoryServicesUseCase: FetchCategoryServiceUseCase,
    private updateCategoryServiceUseCase: UpdateCategoryServiceUseCase,
    private deleteCategoryServiceUseCase: DeleteCategoryServiceUseCase,
  ) {}

  @Post()
  async createCategoryService(
    @Body() categoryServiceDto: CreateCategoryServiceDto,
  ): Promise<CreateCategoryServiceResponseDto | ErrorResponseDto> {
    try {
      const createdCategoryService =
        await this.createCategoryServiceUseCase.createCategoryService(
          categoryServiceDto,
        );

      return createdCategoryService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getCategoryService(
    @Param() parameters: GetCategoryServiceIdDto,
  ): Promise<GetCategoryServiceResponseDto | ErrorResponseDto> {
    try {
      const categoryServiceEntity =
        await this.getCategoryServiceUsecase.getCategoryService(
          Number(parameters.id),
        );
      return categoryServiceEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchCategoryService(
    @Body() filters: FetchCategoryServicesDto,
  ): Promise<FetchCategoryServicesResponseDto | ErrorResponseDto> {
    try {
      const fetchCategoryServicesList =
        await this.fetchCategoryServicesUseCase.fetchCategoryService(filters);

      return CategoryServiceMapper.fetchCategoryServiceToController(
        fetchCategoryServicesList,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateCategoryService(
    @Param() parameters: GetCategoryServiceIdDto,
    @Body() body: UpdateCategoryServiceDto,
  ): Promise<UpdateCategoryServiceResponseDto | ErrorResponseDto> {
    try {
      const updateCategoryService =
        await this.updateCategoryServiceUseCase.updateCategoryService(
          Number(parameters.id),
          body,
        );

      return updateCategoryService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteCategoryService(
    @Param() parameters: GetCategoryServiceIdDto,
  ): Promise<DeleteCategoryServiceResponseDto | ErrorResponseDto> {
    try {
      const deleteCategoryService =
        await this.deleteCategoryServiceUseCase.deleteCategoryService(
          Number(parameters.id),
        );

      return CategoryServiceMapper.deleteCategoryServiceToController(
        deleteCategoryService,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
