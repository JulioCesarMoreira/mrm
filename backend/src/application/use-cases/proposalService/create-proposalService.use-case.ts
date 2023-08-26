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
    proposalService.periodValidity = new Date(periodValidity);
    proposalService.sendDate = new Date(sendDate);

    const createdProposalService = await this.proposalServiceRepository.create(
      proposalService,
    );

    return createdProposalService;
  }
}
