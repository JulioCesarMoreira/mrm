import { Injectable } from '@nestjs/common';
import { ProposalRepository } from '@application/core/repositories';

@Injectable()
export class DeleteProposalUseCase {
  constructor(private proposalRepository: ProposalRepository) {}

  async deleteProposal(id: number, tenantId: string): Promise<boolean> {
    const deletedProposal = await this.proposalRepository.delete(id, tenantId);

    return deletedProposal;
  }
}
