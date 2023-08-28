import { Well } from '@application/core/entities';
import { WellRepository } from '@application/core/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GetWellUseCase {
  constructor(private wellRepository: WellRepository) {}

  async getWell(id: number): Promise<Well> {
    const getWell = await this.wellRepository.get(id);

    if (!getWell) {
      throw new BadRequestException('Well not found.');
    }

    return getWell;
  }
}
