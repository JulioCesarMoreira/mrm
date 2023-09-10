import { Injectable } from '@nestjs/common';
import { ProposalRepository } from '@application/core/repositories';
import { Proposal } from '@application/core/entities';

@Injectable()
export class CreateProposalUseCase {
  constructor(private proposalRepository: ProposalRepository) {}

  async createProposal(proposal: Omit<Proposal, 'id'>): Promise<Proposal> {
    const { periodValidity, sendDate } = proposal;

    // converting the received dates in to a DATE type
    proposal.periodValidity = periodValidity
      ? new Date(periodValidity)
      : periodValidity;
    proposal.sendDate = sendDate ? new Date(sendDate) : sendDate;

    const createdProposal = await this.proposalRepository.create(proposal);

    return createdProposal;
  }
}
