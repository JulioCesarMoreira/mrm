import { ItemProposal } from '@application/core/entities';
import { ItemProposalRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateItemProposalUseCase {
  constructor(private itemProposalRepository: ItemProposalRepository) {}

  async updateItemProposal(
    itemProposalId: number,
    itemProposalFields: Omit<ItemProposal, 'id' | 'proposalServiceId'>,
  ): Promise<ItemProposal> {
    const updatedItemProposal = await this.itemProposalRepository.update(
      itemProposalId,
      itemProposalFields,
    );
    return updatedItemProposal;
  }
}
