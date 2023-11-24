import { Injectable } from '@nestjs/common';
import { WellRepository } from '@application/core/repositories/database';

@Injectable()
export class DeleteWellUseCase {
  constructor(private wellRepository: WellRepository) {}

  async deleteWell(id: number): Promise<boolean> {
    const deletedWell = await this.wellRepository.delete(id);

    return deletedWell;
  }
}
