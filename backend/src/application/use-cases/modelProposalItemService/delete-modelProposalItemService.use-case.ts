import { Injectable } from '@nestjs/common';
import { ModelProposalItemServiceRepository } from '@application/core/repositories';

@Injectable()
export class DeleteModelProposalItemServiceUseCase {
  constructor(
    private modelProposalItemServiceRepository: ModelProposalItemServiceRepository,
  ) {}

  async deleteModelProposalItemService(id: number): Promise<boolean> {
    const deletedModelProposalItemService =
      await this.modelProposalItemServiceRepository.delete(id);

    return deletedModelProposalItemService;
  }
}
