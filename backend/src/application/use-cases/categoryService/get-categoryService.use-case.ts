import { CategoryService } from '@application/core/entities';
import { CategoryServiceRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCategoryServiceUseCase {
  constructor(private categoryServiceRepository: CategoryServiceRepository) {}

  async getCategoryService(id: number): Promise<CategoryService> {
    const getCategoryService = await this.categoryServiceRepository.get(id);

    return getCategoryService;
  }
}
