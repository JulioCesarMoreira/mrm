import { Proposal } from '@application/core/entities';
import { ProposalRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchProposalUseCase {
  constructor(private proposalRepository: ProposalRepository) {}

  async fetchProposal(filters: Omit<Proposal, 'id'>): Promise<Proposal[]> {
    const { periodValidity, sendDate } = filters;

    // converting the received dates in to a DATE type
    filters.periodValidity = periodValidity
      ? new Date(periodValidity)
      : periodValidity;
    filters.sendDate = sendDate ? new Date(sendDate) : sendDate;

    const fetchProposal = await this.proposalRepository.fetch(filters);

    return fetchProposal;
  }
}