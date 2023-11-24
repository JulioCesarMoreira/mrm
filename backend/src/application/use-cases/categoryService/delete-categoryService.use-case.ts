import { Injectable } from '@nestjs/common';
import { CategoryServiceRepository } from '@application/core/repositories/database';

@Injectable()
export class DeleteCategoryServiceUseCase {
  constructor(private categoryServiceRepository: CategoryServiceRepository) {}

  async deleteCategoryService(id: number, tenantId: string): Promise<boolean> {
    const deletedCategoryService = await this.categoryServiceRepository.delete(
      id,
      tenantId,
    );

    return deletedCategoryService;
  }
}
