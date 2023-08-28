import { Injectable } from '@nestjs/common';
import { ItemProposalServiceRepository } from '@application/core/repositories';
import { ItemProposalService } from '@application/core/entities';

@Injectable()
export class CreateItemProposalServiceUseCase {
  constructor(
    private itemProposalServiceRepository: ItemProposalServiceRepository, // private proposalServiceRepository: ProposalServiceRepository,
  ) {}

  async createItemProposalService(
    itemProposalService: Omit<ItemProposalService, 'id'>,
  ): Promise<ItemProposalService> {
    const createdItemProposalService =
      await this.itemProposalServiceRepository.create(itemProposalService);

    return createdItemProposalService;
  }
}
