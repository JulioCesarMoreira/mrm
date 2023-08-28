import { ModelProposal } from '@application/core/entities';
import { ModelProposalRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateModelProposalUseCase {
  constructor(private modelProposalRepository: ModelProposalRepository) {}

  async updateModelProposal(
    modelProposalId: number,
    modelProposalFields: Omit<ModelProposal, 'id' | 'tenantId'>,
  ): Promise<ModelProposal> {
    const updatedModelProposal = await this.modelProposalRepository.update(
      modelProposalId,
      modelProposalFields,
    );
    return updatedModelProposal;
  }
}
