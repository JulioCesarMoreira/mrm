import { ItemService } from '@application/core/entities';
import { ItemServiceRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchItemServiceToProposalUseCase {
  constructor(private itemServiceRepository: ItemServiceRepository) {}

  async fetchItemService(tenantId: string): Promise<ItemService[]> {
    const fetchItemService = await this.itemServiceRepository.fetchToProposal(
      tenantId,
    );
    const itemServices: ItemService[] = [];

    for (const itemService of fetchItemService) {
      const status = itemService.status;

      if (status === 'AVAILABLE') {
        itemServices.push(itemService);
      }
    }

    return itemServices;
  }
}
