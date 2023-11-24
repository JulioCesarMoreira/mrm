import { Injectable } from '@nestjs/common';
import { ModelItemCategoryRepository } from '@application/core/repositories/database';

@Injectable()
export class DeleteModelItemCategoryUseCase {
  constructor(
    private modelItemCategoryRepository: ModelItemCategoryRepository,
  ) {}

  async deleteModelItemCategory(id: number): Promise<boolean> {
    const deletedModelItemCategory =
      await this.modelItemCategoryRepository.delete(id);

    return deletedModelItemCategory;
  }
}
