import { Injectable } from '@nestjs/common';
import { ProposalServiceRepository } from '@application/core/repositories';
import { ProposalService } from '@application/core/entities';

@Injectable()
export class CreateProposalServiceUseCase {
  constructor(private proposalServiceRepository: ProposalServiceRepository) {}

  async createProposalService(
    proposalService: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService> {
    const createdProposalService = await this.proposalServiceRepository.create(
      proposalService,
    );

    return createdProposalService;
  }
}
