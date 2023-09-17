import { ItemProposal } from '@application/core/entities';
import {
  ItemProposalRepository,
  ProposalServiceRepository,
} from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchItemProposalUseCase {
  constructor(
    private itemProposalRepository: ItemProposalRepository,
    private proposalServiceRepository: ProposalServiceRepository,
  ) {}

  async fetchItemProposal(
    filters: Omit<ItemProposal, 'id'>,
  ): Promise<ItemProposal[]> {
    const { proposalServiceId } = filters;

    if (proposalServiceId) {
      const proposal = await this.proposalServiceRepository.get(
        proposalServiceId,
      );

      if (!proposal) {
        throw new BadRequestException('proposal service not found.');
      }
    }

    const fetchItemProposal = await this.itemProposalRepository.fetch(filters);

    return fetchItemProposal;
  }
}
