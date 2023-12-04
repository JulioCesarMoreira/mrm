import { ItemProposal, ProposalService } from '@application/core/entities';
import {
  ItemProposalRepository,
  ProposalServiceRepository,
} from '@application/core/repositories/database';
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

    let proposalService: ProposalService;

    if (proposalServiceId) {
      proposalService = await this.proposalServiceRepository.get(
        proposalServiceId,
      );

      if (!proposalService) {
        throw new BadRequestException('proposal service not found.');
      }

      delete filters.proposalServiceId;
    }

    const fetchItemProposal = await this.itemProposalRepository.fetch(
      filters,
      proposalService.proposalId,
    );

    return fetchItemProposal;
  }
}
