import {
  CreateCategoryServiceDto,
  DeleteCategoryServiceResponseDto,
  FetchCategoryServicesResponseDto,
  GetCategoryServiceResponseDto,
  UpdateCategoryServiceResponseDto,
} from '@infra/http/dtos/categoryService';
import { CategoryService } from '@application/core/entities';

export class CategoryServiceMapper {
  public static createCategoryServiceToDomain(
    createCategoryServiceDto: CreateCategoryServiceDto,
  ): CategoryService {
    const categoryService = new CategoryService();

    categoryService.name = createCategoryServiceDto.name;
    categoryService.subCategory = createCategoryServiceDto.subCategory;
    categoryService.tenantId = createCategoryServiceDto.tenantId;

    return categoryService;
  }

  public static getCategoryServiceToController(
    categoryServiceEntity: CategoryService,
  ): GetCategoryServiceResponseDto {
    const getCategoryServiceResponseDto = new GetCategoryServiceResponseDto();

    getCategoryServiceResponseDto.categoryService = {
      id: categoryServiceEntity.id,
      name: categoryServiceEntity.name,
      subCategory: categoryServiceEntity.subCategory,
      tenantId: categoryServiceEntity.tenantId,
    };

    return getCategoryServiceResponseDto;
  }

  public static fetchCategoryServiceToController(
    categoryServicesEntity: CategoryService[],
  ): FetchCategoryServicesResponseDto {
    const fetchCategoryServicesResponseDto =
      new FetchCategoryServicesResponseDto();
    fetchCategoryServicesResponseDto.categoryServices = [];

    for (const categoryServiceEntity of categoryServicesEntity) {
      fetchCategoryServicesResponseDto.categoryServices.push({
        id: categoryServiceEntity.id,
        name: categoryServiceEntity.name,
        subCategory: categoryServiceEntity.subCategory,
        tenantId: categoryServiceEntity.tenantId,
      });
    }

    return fetchCategoryServicesResponseDto;
  }

  public static updateCategoryServiceToController(
    updatedCategoryService: CategoryService,
  ): UpdateCategoryServiceResponseDto {
    const updateCategoryServiceResponseDto =
      new UpdateCategoryServiceResponseDto();

    updateCategoryServiceResponseDto.name = updatedCategoryService.name;
    updateCategoryServiceResponseDto.subCategory =
      updatedCategoryService.subCategory;
    updateCategoryServiceResponseDto.tenantId = updatedCategoryService.tenantId;

    return updateCategoryServiceResponseDto;
  }

  public static deleteCategoryServiceToController(
    resultDelete: boolean,
  ): DeleteCategoryServiceResponseDto {
    const deleteCategoryServiceResponseDto =
      new DeleteCategoryServiceResponseDto();

    deleteCategoryServiceResponseDto.sucess = resultDelete;

    return deleteCategoryServiceResponseDto;
  }
}
