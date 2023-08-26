import { FetchCategoryServicesDto } from '@infra/http/dtos/categoryService';
import { CategoryService } from '@application/core/entities';
import { CategoryServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchCategoryServiceeUseCase {
  constructor(private categoryServiceRepository: CategoryServiceRepository) {}

  async fetchCategoryService(
    filters: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService[]> {
    const fetchCategoryServicee = await this.categoryServiceRepository.fetch(
      filters,
    );

    return fetchCategoryServicee;
  }
}
