import { ProposalService } from '@application/core/entities';
import { ProposalServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateProposalServiceUseCase {
  constructor(private proposalServiceRepository: ProposalServiceRepository) {}

  async updateProposalService(
    proposalServiceId: number,
    proposalServiceFields: Omit<ProposalService, 'id' | 'tenantId'>,
  ): Promise<ProposalService> {
    const updatedProposalService = await this.proposalServiceRepository.update(
      proposalServiceId,
      proposalServiceFields,
    );
    return updatedProposalService;
  }
}
