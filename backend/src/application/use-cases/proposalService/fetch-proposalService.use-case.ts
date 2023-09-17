import { ProposalService } from '@application/core/entities';
import { ProposalServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchProposalServiceUseCase {
  constructor(private proposalServiceRepository: ProposalServiceRepository) {}

  async fetchProposalService(
    filters: Omit<ProposalService, 'id' | 'categoryServiceId'>,
  ): Promise<ProposalService[]> {
    const fetchProposalService = await this.proposalServiceRepository.fetch(
      filters,
    );

    return fetchProposalService;
  }
}
