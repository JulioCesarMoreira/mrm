import { ItemProposalService } from '@application/core/entities';
import { ItemProposalServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateItemProposalServiceUseCase {
  constructor(
    private itemProposalServiceRepository: ItemProposalServiceRepository,
  ) {}

  async updateItemProposalService(
    itemProposalServiceId: number,
    itemProposalServiceFields: Omit<
      ItemProposalService,
      'id' | 'proposalServiceId'
    >,
  ): Promise<ItemProposalService> {
    const updatedItemProposalService =
      await this.itemProposalServiceRepository.update(
        itemProposalServiceId,
        itemProposalServiceFields,
      );
    return updatedItemProposalService;
  }
}
