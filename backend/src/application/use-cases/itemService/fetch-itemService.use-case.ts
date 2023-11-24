import { ItemService } from '@application/core/entities';
import { ItemServiceRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchItemServiceUseCase {
  constructor(private itemServiceRepository: ItemServiceRepository) {}

  async fetchItemService(
    filters: Omit<ItemService, 'id'>,
  ): Promise<ItemService[]> {
    const fetchItemService = await this.itemServiceRepository.fetch(filters);

    return fetchItemService;
  }
}
