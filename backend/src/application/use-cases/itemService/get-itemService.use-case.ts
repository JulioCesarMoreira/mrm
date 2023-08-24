import { ItemService } from '@application/core/entities';
import { ItemServiceRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetItemServiceUseCase {
  constructor(private itemServiceeRepository: ItemServiceRepository) {}

  async getItemService(id: number): Promise<ItemService> {
    const getItemService = await this.itemServiceeRepository.get(id);

    return getItemService;
  }
}