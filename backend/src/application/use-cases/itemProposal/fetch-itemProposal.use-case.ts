import { ItemProposal } from '@application/core/entities';
import {
  ItemProposalRepository,
  ProposalRepository,
} from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchItemProposalUseCase {
  constructor(
    private itemProposalRepository: ItemProposalRepository,
    private proposalRepository: ProposalRepository,
  ) {}

  async fetchItemProposal(
    filters: Omit<ItemProposal, 'id'>,
  ): Promise<ItemProposal[]> {
    const { proposalId } = filters;

    if (proposalId) {
      const proposal = await this.proposalRepository.get(proposalId);

      if (!proposal) {
        throw new BadRequestException('proposal not found.');
      }
    }

    const fetchItemProposal = await this.itemProposalRepository.fetch(filters);

    return fetchItemProposal;
  }
}
