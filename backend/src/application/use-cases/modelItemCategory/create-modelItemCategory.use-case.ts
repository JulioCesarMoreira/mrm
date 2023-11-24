import { Injectable } from '@nestjs/common';
import { ModelItemCategoryRepository } from '@application/core/repositories/database';
import { ModelItemCategory } from '@application/core/entities';

@Injectable()
export class CreateModelItemCategoryUseCase {
  constructor(
    private ModelItemCategoryRepository: ModelItemCategoryRepository,
  ) {}

  async createModelItemCategory(
    modelItemCategory: Omit<ModelItemCategory, 'id'>,
  ): Promise<ModelItemCategory> {
    const createdModelItemCategory =
      await this.ModelItemCategoryRepository.create(modelItemCategory);

    return createdModelItemCategory;
  }
}
