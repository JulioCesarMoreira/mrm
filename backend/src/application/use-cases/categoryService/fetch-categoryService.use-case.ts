import { FetchCategoryServicesDto } from '@infra/http/dtos/categoryService';
import { CategoryService } from '@application/core/entities';
import { ICategoryServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchCategoryServiceeUseCase {
  constructor(private categoryServiceRepository: ICategoryServiceRepository) {}

  async fetchCategoryService(
    filters: FetchCategoryServicesDto,
  ): Promise<CategoryService[]> {
    const fetchCategoryServicee = await this.categoryServiceRepository.fetch(
      filters,
    );

    return fetchCategoryServicee;
  }
}
