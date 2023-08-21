import { Injectable } from '@nestjs/common';
import { ICategoryServiceRepository } from '@application/core/repositories';

@Injectable()
export class DeleteCategoryServiceUseCase {
  constructor(private categoryServiceRepository: ICategoryServiceRepository) {}

  async deleteCategoryService(id: number): Promise<boolean> {
    const deletedCategoryService = await this.categoryServiceRepository.delete(
      id,
    );

    return deletedCategoryService;
  }
}
