import { CategoryService } from '@application/core/entities';
import { CategoryServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCategoryServiceUseCase {
  constructor(private categoryServiceRepository: CategoryServiceRepository) {}

  async updateCategoryService(
    categoryServiceId: number,
    categoryServiceFields: Omit<CategoryService, 'id' | 'tenantId'>,
  ): Promise<CategoryService> {
    const updatedCategoryService = await this.categoryServiceRepository.update(
      categoryServiceId,
      categoryServiceFields,
    );
    return updatedCategoryService;
  }
}
