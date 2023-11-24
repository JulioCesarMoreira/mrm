import { ItemService } from '@application/core/entities';
import { ItemServiceRepository } from '@application/core/repositories/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateItemServiceUseCase {
  constructor(private itemServiceRepository: ItemServiceRepository) {}

  async updateItemService(
    itemServiceId: number,
    itemServiceFields: Omit<ItemService, 'id' | 'tenantId'>,
  ): Promise<ItemService> {
    const updatedItemService = await this.itemServiceRepository.update(
      itemServiceId,
      itemServiceFields,
    );
    return updatedItemService;
  }
}
