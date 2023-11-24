import { CategoryService } from '@application/core/entities';
import { CategoryServiceRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchCategoryServiceUseCase {
  constructor(private categoryServiceRepository: CategoryServiceRepository) {}

  async fetchCategoryService(
    filters: Omit<CategoryService, 'id'>,
    tenantId: string,
  ): Promise<CategoryService[]> {
    const fetchCategoryService = await this.categoryServiceRepository.fetch(
      filters,
      tenantId,
    );

    return fetchCategoryService;
  }
}
