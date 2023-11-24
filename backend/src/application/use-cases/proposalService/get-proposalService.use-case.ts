import { ProposalService } from '@application/core/entities';
import { ProposalServiceRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetProposalServiceUseCase {
  constructor(private proposalServiceRepository: ProposalServiceRepository) {}

  async getProposalService(id: number): Promise<ProposalService> {
    const getProposalService = await this.proposalServiceRepository.get(id);

    return getProposalService;
  }
}
