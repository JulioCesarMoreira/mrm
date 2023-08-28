import { ModelProposalItemService } from '@application/core/entities';
import { ModelProposalItemServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetModelProposalItemServiceUseCase {
  constructor(
    private modelProposalItemServiceRepository: ModelProposalItemServiceRepository,
  ) {}

  async getModelProposalItemService(
    id: number,
  ): Promise<ModelProposalItemService> {
    const getModelProposalItemService =
      await this.modelProposalItemServiceRepository.get(id);

    return getModelProposalItemService;
  }
}
