import { ItemProposalService } from '@application/core/entities';
import { ItemProposalServiceRepository } from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GetItemProposalServiceUseCase {
  constructor(
    private itemProposalServiceRepository: ItemProposalServiceRepository,
  ) {}

  async getItemProposalService(id: number): Promise<ItemProposalService> {
    const getItemProposalService = await this.itemProposalServiceRepository.get(
      id,
    );

    if (!getItemProposalService) {
      throw new BadRequestException('ItemProposalService not found.');
    }

    return getItemProposalService;
  }
}
