import { ItemProposal } from '@application/core/entities';
import { ItemProposalRepository } from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GetItemProposalUseCase {
  constructor(private itemProposalRepository: ItemProposalRepository) {}

  async getItemProposal(id: number): Promise<ItemProposal> {
    const getItemProposal = await this.itemProposalRepository.get(id);

    if (!getItemProposal) {
      throw new BadRequestException('ItemProposal not found.');
    }

    return getItemProposal;
  }
}
