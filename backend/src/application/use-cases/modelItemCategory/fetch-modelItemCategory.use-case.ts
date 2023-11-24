import { ModelItemCategory } from '@application/core/entities';
import {
  ItemServiceRepository,
  ModelItemCategoryRepository,
  ModelProposalRepository,
} from '@application/core/repositories/database';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchModelItemCategoryUseCase {
  constructor(
    private modelItemCategoryRepository: ModelItemCategoryRepository,
    private modelProposalRepository: ModelProposalRepository,
    private itemServiceRepository: ItemServiceRepository,
  ) {}

  async fetchModelItemCategory(
    filters: Omit<ModelItemCategory, 'id'>,
    tenantId: string,
  ): Promise<ModelItemCategory[]> {
    const { modelProposalId, itemServiceId } = filters;

    if (modelProposalId) {
      const modelProposal = await this.modelProposalRepository.get(
        modelProposalId,
        tenantId,
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

    const fetchModelItemCategory = await this.modelItemCategoryRepository.fetch(
      filters,
    );

    return fetchModelItemCategory;
  }
}
