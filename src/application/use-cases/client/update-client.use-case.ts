import { Client } from '@application/core/entities';
import { IClientRepository } from '@application/core/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async updateClient(clientEntity: Client): Promise<Client> {
    const updatedClient = await this.clientRepository.update(clientEntity);
    return updatedClient;
  }
}
