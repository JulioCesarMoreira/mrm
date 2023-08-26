import { Injectable } from '@nestjs/common';
import { CategoryServiceRepository } from '@application/core/repositories';
import { CategoryService } from '@application/core/entities';

@Injectable()
export class CreateCategoryServiceUseCase {
  constructor(private categoryServiceRepository: CategoryServiceRepository) {}

  async createCategoryService(
    categoryService: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService> {
    const createdCategoryService = await this.categoryServiceRepository.create(
      categoryService,
    );

    return createdCategoryService;
  }
}
