import { ModelProposal } from '@application/core/entities';
import { ModelProposalRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateModelProposalUseCase {
  constructor(private modelProposalRepository: ModelProposalRepository) {}

  async updateModelProposal(
    modelProposalId: number,
    modelProposalFields: Omit<ModelProposal, 'id' | 'tenantId'>,
    tenantId: string,
  ): Promise<ModelProposal> {
    const updatedModelProposal = await this.modelProposalRepository.update(
      modelProposalId,
      modelProposalFields,
      tenantId,
    );
    return updatedModelProposal;
  }
}
