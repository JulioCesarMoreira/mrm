import { ProposalService } from '@application/core/entities';
import { ProposalServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetProposalServiceUseCase {
  constructor(private proposalServiceeRepository: ProposalServiceRepository) {}

  async getProposalService(id: number): Promise<ProposalService> {
    const getProposalService = await this.proposalServiceeRepository.get(id);

    return getProposalService;
  }
}
