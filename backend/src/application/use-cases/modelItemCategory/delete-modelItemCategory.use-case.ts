import { Injectable } from '@nestjs/common';
import { ModelItemCategoryRepository } from '@application/core/repositories';

@Injectable()
export class DeleteModelItemCategoryUseCase {
  constructor(
    private ModelItemCategoryRepository: ModelItemCategoryRepository,
  ) {}

  async deleteModelItemCategory(id: number): Promise<boolean> {
    const deletedModelItemCategory =
      await this.ModelItemCategoryRepository.delete(id);

    return deletedModelItemCategory;
  }
}
