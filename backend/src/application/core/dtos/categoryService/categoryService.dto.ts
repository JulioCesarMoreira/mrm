import { CategoryService, SubCategory } from '@application/core/entities';

export type CreateCategoryServiceDto = Omit<CategoryService, 'id'>;

export type CategoryServiceIdDto = {
  id: number;
};

export type FetchCategoryServicesDto = {
  id?: number;

  name?: string;

  subCategory?: SubCategory;

  tenantId?: string;
};

export type UpdateCategoryServiceDto = {
  subCategory?: SubCategory;

  name?: string;
};
