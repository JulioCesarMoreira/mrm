import { ItemService } from '@application/core/entities';
import { ItemServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchItemServiceeUseCase {
  constructor(private itemServiceRepository: ItemServiceRepository) {}

  async fetchItemService(
    filters: Omit<ItemService, 'id'>,
  ): Promise<ItemService[]> {
    const fetchItemServicee = await this.itemServiceRepository.fetch(filters);

    return fetchItemServicee;
  }
}
