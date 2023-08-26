import { Injectable } from '@nestjs/common';
import { CategoryServiceRepository } from '@application/core/repositories';

@Injectable()
export class DeleteCategoryServiceUseCase {
  constructor(private categoryServiceRepository: CategoryServiceRepository) {}

  async deleteCategoryService(id: number): Promise<boolean> {
    const deletedCategoryService = await this.categoryServiceRepository.delete(
      id,
    );

    return deletedCategoryService;
  }
}
