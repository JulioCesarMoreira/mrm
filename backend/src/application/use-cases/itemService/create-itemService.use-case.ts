import { Injectable } from '@nestjs/common';
import { ItemServiceRepository } from '@application/core/repositories';
import { ItemService } from '@application/core/entities';

@Injectable()
export class CreateItemServiceUseCase {
  constructor(private itemServiceRepository: ItemServiceRepository) {}

  async createItemService(
    itemService: Omit<ItemService, 'id'>,
  ): Promise<ItemService> {
    const createdItemService = await this.itemServiceRepository.create(
      itemService,
    );

    return createdItemService;
  }
}
