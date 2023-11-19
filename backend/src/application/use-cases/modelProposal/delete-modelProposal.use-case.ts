import { Injectable } from '@nestjs/common';
import { ModelProposalRepository } from '@application/core/repositories';

@Injectable()
export class DeleteModelProposalUseCase {
  constructor(private modelProposalRepository: ModelProposalRepository) {}

  async deleteModelProposal(id: number, tenantId: string): Promise<boolean> {
    const deletedModelProposal = await this.modelProposalRepository.delete(
      id,
      tenantId,
    );

    return deletedModelProposal;
  }
}
