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
import {
  RequestTenantDataInterface,
  RequestTentantData,
} from 'src/infra/guard/tenantData.decorator';

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
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<CreateCategoryServiceResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;

      const createdCategoryService =
        await this.createCategoryServiceUseCase.createCategoryService({
          ...categoryServiceDto,
          tenantId,
        });

      return createdCategoryService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getCategoryService(
    @Param() parameters: GetCategoryServiceIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<GetCategoryServiceResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
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
    @Query() filters: FetchCategoryServicesDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<FetchCategoryServicesResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const fetchCategoryServicesList =
        await this.fetchCategoryServicesUseCase.fetchCategoryService(
          filters,
          tenantId,
        );

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
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<UpdateCategoryServiceResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const updateCategoryService =
        await this.updateCategoryServiceUseCase.updateCategoryService(
          Number(parameters.id),
          body,
          tenantId,
        );

      return updateCategoryService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteCategoryService(
    @Param() parameters: GetCategoryServiceIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<DeleteCategoryServiceResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const deleteCategoryService =
        await this.deleteCategoryServiceUseCase.deleteCategoryService(
          Number(parameters.id),
          tenantId,
        );

      return CategoryServiceMapper.deleteCategoryServiceToController(
        deleteCategoryService,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
