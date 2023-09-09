import { Injectable } from '@nestjs/common';
import { ItemProposalRepository } from '@application/core/repositories';

@Injectable()
export class DeleteItemProposalUseCase {
  constructor(private itemProposalRepository: ItemProposalRepository) {}

  async deleteItemProposal(id: number): Promise<boolean> {
    const deletedItemProposal = await this.itemProposalRepository.delete(id);

    return deletedItemProposal;
  }
}
