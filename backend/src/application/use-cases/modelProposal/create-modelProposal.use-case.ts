import { Injectable } from '@nestjs/common';
import { ModelProposalRepository } from '@application/core/repositories';
import { ModelProposal } from '@application/core/entities';

@Injectable()
export class CreateModelProposalUseCase {
  constructor(
    private modelProposalRepository: ModelProposalRepository, // private proposalServiceRepository: ProposalServiceRepository,
  ) {}

  async createModelProposal(
    modelProposal: Omit<ModelProposal, 'id'>,
  ): Promise<ModelProposal> {
    const createdModelProposal = await this.modelProposalRepository.create(
      modelProposal,
    );

    return createdModelProposal;
  }
}
