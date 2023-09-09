import { ModelItemCategory } from '@application/core/entities';
import { ModelItemCategoryRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetModelItemCategoryUseCase {
  constructor(
    private ModelItemCategoryRepository: ModelItemCategoryRepository,
  ) {}

  async getModelItemCategory(id: number): Promise<ModelItemCategory> {
    const getModelItemCategory = await this.ModelItemCategoryRepository.get(id);

    return getModelItemCategory;
  }
}
