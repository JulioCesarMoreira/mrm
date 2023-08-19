import { Injectable } from '@nestjs/common';
import { IClientRepository } from '@application/core/repositories';
import { Client } from '@application/core/entities';
import { CreateClientDto } from '@application/core/dtos/client.dto';

@Injectable()
export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async createClient(client: CreateClientDto): Promise<Client> {
    const createdClient = await this.clientRepository.create(client);

    return createdClient;
  }
}
