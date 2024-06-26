import { ModelProposal } from '@application/core/entities';
import { ModelProposalRepository } from '@application/core/repositories/database';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GetModelProposalUseCase {
  constructor(private modelProposalRepository: ModelProposalRepository) {}

  async getModelProposal(id: number, tenantId: string): Promise<ModelProposal> {
    const getModelProposal = await this.modelProposalRepository.get(
      id,
      tenantId,
    );

    if (!getModelProposal) {
      throw new BadRequestException('ModelProposal not found.');
    }

    return getModelProposal;
  }
}
