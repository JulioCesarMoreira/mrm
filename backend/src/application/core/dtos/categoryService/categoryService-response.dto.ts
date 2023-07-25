import { CategoryService, SubCategory } from '@application/core/entities';

export class CreateCategoryServiceResponseDto {
  sucess: boolean;

  createdCategoryService: CategoryService;
}

export class GetCategoryServiceResponseDto {
  CategoryService: {
    id: number;

    subCategory: SubCategory;

    name: string;
  };
}

export class FetchCategoryServicesResponseDto {
  categoryServices: {
    id: number;

    subCategory: SubCategory;

    name: string;
  }[];
}

export class DeleteCategoryServiceResponseDto {
  sucess: boolean;
}

export class UpdateCategoryServiceResponseDto extends CategoryService {}
