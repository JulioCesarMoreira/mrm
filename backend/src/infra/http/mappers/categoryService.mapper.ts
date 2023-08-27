import {
  DeleteCategoryServiceResponseDto,
  FetchCategoryServicesResponseDto,
} from '@infra/http/dtos/categoryService';
import { CategoryService } from '@application/core/entities';

export class CategoryServiceMapper {
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

  public static deleteCategoryServiceToController(
    resultDelete: boolean,
  ): DeleteCategoryServiceResponseDto {
    const deleteCategoryServiceResponseDto =
      new DeleteCategoryServiceResponseDto();

    deleteCategoryServiceResponseDto.sucess = resultDelete;

    return deleteCategoryServiceResponseDto;
  }
}
