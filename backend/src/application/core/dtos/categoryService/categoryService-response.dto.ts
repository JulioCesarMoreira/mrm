import { CategoryService } from '@application/core/entities';

export class CreateCategoryServiceResponseDto {
  sucess: boolean;

  createdCategoryService: CategoryService;
}

export class GetCategoryServiceResponseDto {
  CategoryService: {
    id: number;

    subCategory: 'SUPLIE' | 'SERVICE';

    name: string;
  };
}

export class FetchCategoryServicesResponseDto {
  categoryServices: {
    id: number;

    subCategory: 'SUPLIE' | 'SERVICE';

    name: string;
  }[];
}

export class DeleteCategoryServiceResponseDto {
  sucess: boolean;
}

export class UpdateCategoryServiceResponseDto extends CategoryService {}
