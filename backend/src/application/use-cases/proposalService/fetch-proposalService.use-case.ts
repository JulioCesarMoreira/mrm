import { ProposalService } from '@application/core/entities';
import { ProposalServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchProposalServiceUseCase {
  constructor(private proposalServiceRepository: ProposalServiceRepository) {}

  async fetchProposalService(
    filters: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService[]> {
    const { periodValidity, sendDate } = filters;

    // converting the received dates in to a DATE type
    filters.periodValidity = periodValidity
      ? new Date(periodValidity)
      : periodValidity;
    filters.sendDate = sendDate ? new Date(sendDate) : sendDate;

    const fetchProposalService = await this.proposalServiceRepository.fetch(
      filters,
    );

    console.log('fetchProposalService', fetchProposalService);

    return fetchProposalService;
  }
}
