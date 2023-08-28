import { Injectable } from '@nestjs/common';
import { ItemProposalServiceRepository } from '@application/core/repositories';

@Injectable()
export class DeleteItemProposalServiceUseCase {
  constructor(
    private itemProposalServiceRepository: ItemProposalServiceRepository,
  ) {}

  async deleteItemProposalService(id: number): Promise<boolean> {
    const deletedItemProposalService =
      await this.itemProposalServiceRepository.delete(id);

    return deletedItemProposalService;
  }
}
