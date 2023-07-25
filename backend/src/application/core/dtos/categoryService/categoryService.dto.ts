import { CategoryService } from '@application/core/entities';

export type CreateCategoryServiceDto = Omit<CategoryService, 'id'>;

export type CategoryServiceIdDto = {
  id: number;
};

export type FetchCategoryServicesDto = {
  id?: number;

  name?: string;

  subCategory?: 'SUPLIE' | 'SERVICE';

  tenantId?: string;
};

export type UpdateCategoryServiceDto = {
  subCategory?: 'SUPLIE' | 'SERVICE';

  name?: string;
};
