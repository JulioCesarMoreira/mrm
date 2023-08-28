import { Injectable } from '@nestjs/common';
import { ModelProposalItemServiceRepository } from '@application/core/repositories';
import { ModelProposalItemService } from '@application/core/entities';

@Injectable()
export class CreateModelProposalItemServiceUseCase {
  constructor(
    private modelProposalItemServiceRepository: ModelProposalItemServiceRepository,
  ) {}

  async createModelProposalItemService(
    modelProposalItemService: Omit<ModelProposalItemService, 'id'>,
  ): Promise<ModelProposalItemService> {
    const createdModelProposalItemService =
      await this.modelProposalItemServiceRepository.create(
        modelProposalItemService,
      );

    return createdModelProposalItemService;
  }
}
