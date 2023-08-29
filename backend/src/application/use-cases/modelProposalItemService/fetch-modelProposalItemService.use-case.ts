import { ModelProposalItemService } from '@application/core/entities';
import {
  ItemServiceRepository,
  ModelProposalItemServiceRepository,
  ModelProposalRepository,
} from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchModelProposalItemServiceUseCase {
  constructor(
    private modelProposalItemServiceRepository: ModelProposalItemServiceRepository,
    private modelProposalRepository: ModelProposalRepository,
    private itemServiceRepository: ItemServiceRepository,
  ) {}

  async fetchModelProposalItemService(
    filters: Omit<ModelProposalItemService, 'id'>,
  ): Promise<ModelProposalItemService[]> {
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

    const fetchModelProposalItemService =
      await this.modelProposalItemServiceRepository.fetch(filters);

    return fetchModelProposalItemService;
  }
}
