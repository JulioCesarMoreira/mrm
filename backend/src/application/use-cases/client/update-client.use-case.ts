import { UpdateCategoryServiceDto } from '@application/core/dtos/categoryService.dto';
import { Client } from '@application/core/entities';
import { IClientRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async updateClient(
    clientId: number,
    clientFields: UpdateCategoryServiceDto,
  ): Promise<Client> {
    const updatedClient = await this.clientRepository.update(
      clientId,
      clientFields,
    );
    return updatedClient;
  }
}
