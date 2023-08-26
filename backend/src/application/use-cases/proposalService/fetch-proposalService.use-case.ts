import { ProposalService } from '@application/core/entities';
import { ProposalServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchProposalServiceeUseCase {
  constructor(private proposalServiceRepository: ProposalServiceRepository) {}

  async fetchProposalService(
    filters: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService[]> {
    const fetchProposalServicee = await this.proposalServiceRepository.fetch(
      filters,
    );

    return fetchProposalServicee;
  }
}
