import { Proposal } from '@application/core/entities';
import { ProposalRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetProposalUseCase {
  constructor(private proposalRepository: ProposalRepository) {}

  async getProposal(id: number): Promise<Proposal> {
    const getProposal = await this.proposalRepository.get(id);

    return getProposal;
  }
}