import { Injectable } from '@nestjs/common';
import { IClientRepository } from '@application/core/repositories';
import { Client } from '@application/core/entities';

@Injectable()
export class CreateClientUseCase {
  constructor(private ClientRepository: IClientRepository) {}

  async createClient(client: Client): Promise<Client> {
    const createdClient = await this.ClientRepository.create(client);

    return createdClient;
  }
}
