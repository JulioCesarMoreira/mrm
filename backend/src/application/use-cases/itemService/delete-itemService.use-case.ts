import { Injectable } from '@nestjs/common';
import { ItemServiceRepository } from '@application/core/repositories/database';

@Injectable()
export class DeleteItemServiceUseCase {
  constructor(private itemServiceRepository: ItemServiceRepository) {}

  async deleteItemService(id: number): Promise<boolean> {
    const deletedItemService = await this.itemServiceRepository.delete(id);

    return deletedItemService;
  }
}
