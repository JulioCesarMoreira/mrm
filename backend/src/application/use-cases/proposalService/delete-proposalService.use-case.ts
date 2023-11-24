import { Injectable } from '@nestjs/common';
import { ProposalServiceRepository } from '@application/core/repositories/database';

@Injectable()
export class DeleteProposalServiceUseCase {
  constructor(private proposalServiceRepository: ProposalServiceRepository) {}

  async deleteProposalService(id: number): Promise<boolean> {
    const deletedProposalService = await this.proposalServiceRepository.delete(
      id,
    );

    return deletedProposalService;
  }
}
