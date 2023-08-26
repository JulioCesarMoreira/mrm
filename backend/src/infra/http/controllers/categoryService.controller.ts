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
import { Prisma } from '@prisma/client';

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
  ): Promise<CreateCategoryServiceResponseDto> {
    let createCategoryServiceResponse = new CreateCategoryServiceResponseDto();

    try {
      const createdCategoryService =
        await this.createCategoryServiceUseCase.createCategoryService(
          categoryServiceDto,
        );

      createCategoryServiceResponse = createdCategoryService;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return createCategoryServiceResponse;
  }

  @Get(':id')
  async getCategoryService(
    @Param() parameters: GetCategoryServiceIdDto,
  ): Promise<GetCategoryServiceResponseDto> {
    let getCategoryServiceResponse = {} as GetCategoryServiceResponseDto;

    try {
      const categoryServiceEntity =
        await this.getCategoryServiceUsecase.getCategoryService(
          Number(parameters.id),
        );
      getCategoryServiceResponse = categoryServiceEntity;
    } catch (error) {
      console.log('Error: ', error);
    }
    return getCategoryServiceResponse;
  }

  @Get()
  async fetchCategoryServiceByTenant(
    @Body() filters: FetchCategoryServicesDto,
  ): Promise<FetchCategoryServicesResponseDto> {
    let fetchCLientsResponse = new FetchCategoryServicesResponseDto();

    try {
      const fetchCategoryServicesList =
        await this.fetchCategoryServicesUseCase.fetchCategoryService(filters);

      fetchCLientsResponse =
        CategoryServiceMapper.fetchCategoryServiceToController(
          fetchCategoryServicesList,
        );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return fetchCLientsResponse;
  }

  @Patch(':id')
  async updateCategoryService(
    @Param() parameters: GetCategoryServiceIdDto,
    @Body() body: UpdateCategoryServiceDto,
  ): Promise<UpdateCategoryServiceResponseDto> {
    let updateCategoryServiceResponse = new UpdateCategoryServiceResponseDto();

    try {
      const updateCategoryService =
        await this.updateCategoryServiceUseCase.updateCategoryService(
          Number(parameters.id),
          body,
        );

      updateCategoryServiceResponse = updateCategoryService;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return updateCategoryServiceResponse;
  }

  @Delete(':id')
  async deleteCategoryService(
    @Param() parameters: GetCategoryServiceIdDto,
  ): Promise<DeleteCategoryServiceResponseDto> {
    let deleteCategoryServiceResponse = new DeleteCategoryServiceResponseDto();
    try {
      const deleteCategoryService =
        await this.deleteCategoryServiceUseCase.deleteCategoryService(
          Number(parameters.id),
        );

      deleteCategoryServiceResponse =
        CategoryServiceMapper.deleteCategoryServiceToController(
          deleteCategoryService,
        );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return deleteCategoryServiceResponse;
  }
}
