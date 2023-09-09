import { ModelItemCategory } from '@application/core/entities';
import {
  ItemServiceRepository,
  ModelItemCategoryRepository,
  ModelProposalRepository,
} from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchModelItemCategoryUseCase {
  constructor(
    private ModelItemCategoryRepository: ModelItemCategoryRepository,
    private modelProposalRepository: ModelProposalRepository,
    private itemServiceRepository: ItemServiceRepository,
  ) {}

  async fetchModelItemCategory(
    filters: Omit<ModelItemCategory, 'id'>,
  ): Promise<ModelItemCategory[]> {
    const { modelProposalId, itemServiceId } = filters;

    if (modelProposalId) {
      const modelProposal = await this.modelProposalRepository.get(
        modelProposalId,
      );

      if (!modelProposal) {
        throw new BadRequestException('modelProposal not found.');
      }
    }

    if (itemServiceId) {
      const itemService = await this.itemServiceRepository.get(itemServiceId);

      if (!itemService) {
        throw new BadRequestException('itemService not found.');
      }
    }

    const fetchModelItemCategory = await this.ModelItemCategoryRepository.fetch(
      filters,
    );

    return fetchModelItemCategory;
  }
}
