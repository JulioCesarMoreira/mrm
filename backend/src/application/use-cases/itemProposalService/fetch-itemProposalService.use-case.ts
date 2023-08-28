import { ItemProposalService } from '@application/core/entities';
import {
  ItemProposalServiceRepository,
  ProposalServiceRepository,
} from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FetchItemProposalServiceUseCase {
  constructor(
    private itemProposalServiceRepository: ItemProposalServiceRepository,
    private proposalServiceRepository: ProposalServiceRepository,
  ) {}

  async fetchItemProposalService(
    filters: Omit<ItemProposalService, 'id'>,
  ): Promise<ItemProposalService[]> {
    const { proposalServiceId } = filters;

    if (proposalServiceId) {
      const proposalService = await this.proposalServiceRepository.get(
        proposalServiceId,
      );

      if (!proposalService) {
        throw new BadRequestException('proposalService not found.');
      }
    }

    const fetchItemProposalService =
      await this.itemProposalServiceRepository.fetch(filters);

    return fetchItemProposalService;
  }
}
