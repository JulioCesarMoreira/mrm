import { Injectable } from '@nestjs/common';
import { ItemProposalRepository } from '@application/core/repositories';
import { ItemProposal } from '@application/core/entities';

@Injectable()
export class CreateItemProposalUseCase {
  constructor(
    private itemProposalRepository: ItemProposalRepository, // private proposalRepository: ProposalRepository,
  ) {}

  async createItemProposal(
    itemProposal: Omit<ItemProposal, 'id'>,
  ): Promise<ItemProposal> {
    const createdItemProposal = await this.itemProposalRepository.create(
      itemProposal,
    );

    return createdItemProposal;
  }
}
