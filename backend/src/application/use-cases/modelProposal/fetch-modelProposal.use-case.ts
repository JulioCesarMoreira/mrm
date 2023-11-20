import { ModelProposal } from '@application/core/entities';
import { ModelProposalRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchModelProposalUseCase {
  constructor(private modelProposalRepository: ModelProposalRepository) {}

  async fetchModelProposal(
    filters: Omit<ModelProposal, 'id'>,
    tenantId: string,
  ): Promise<ModelProposal[]> {
    const fetchModelProposal = await this.modelProposalRepository.fetch(
      filters,
      tenantId,
    );

    return fetchModelProposal;
  }
}
