import { Injectable } from '@nestjs/common';
import { ProposalServiceRepository } from '@application/core/repositories';
import { ProposalService } from '@application/core/entities';

@Injectable()
export class CreateProposalServiceUseCase {
  constructor(private proposalServiceRepository: ProposalServiceRepository) {}

  async createProposalService(
    proposalService: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService> {
    const { periodValidity, sendDate } = proposalService;

    // converting the received dates in to a DATE type
    proposalService.periodValidity = periodValidity
      ? new Date(periodValidity)
      : periodValidity;
    proposalService.sendDate = sendDate ? new Date(sendDate) : sendDate;

    const createdProposalService = await this.proposalServiceRepository.create(
      proposalService,
    );

    return createdProposalService;
  }
}
