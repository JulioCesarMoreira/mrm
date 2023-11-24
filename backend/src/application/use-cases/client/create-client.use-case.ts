import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@application/core/repositories/database';
import { Client } from '@application/core/entities';

@Injectable()
export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async createClient(client: Omit<Client, 'id'>): Promise<Client> {
    const createdClient = await this.clientRepository.create(client);

    return createdClient;
  }
}
