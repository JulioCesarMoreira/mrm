import { CategoryService } from '@application/core/entities';
import { CategoryServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchCategoryServiceUseCase {
  constructor(private categoryServiceRepository: CategoryServiceRepository) {}

  async fetchCategoryService(
    filters: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService[]> {
    const fetchCategoryService = await this.categoryServiceRepository.fetch(
      filters,
    );

    return fetchCategoryService;
  }
}
